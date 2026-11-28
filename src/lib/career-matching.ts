import { CAREERS } from "@/content/careers";
import { ONBOARDING_QUIZ } from "@/content/onboarding-quiz";
import type { CareerContent, SubjectId, TraitId } from "@/content/schemas";

export type TraitScores = Record<TraitId, number>;

export interface CareerMatchResult {
  career: CareerContent;
  matchPercent: number;
  traitDot: number;
  subjectPts: number;
  reasons: {
    en: string;
    ms: string;
  };
}

const TRAIT_KEYS: TraitId[] = ["AN", "CR", "SO", "BU", "EN"];

/** Tallies +2 for primaryTrait and +1 for secondaryTrait from selected option IDs. */
export function computeTraitScoresFromAnswers(
  selectedOptionIds: Record<string, string>
): TraitScores {
  const scores: TraitScores = { AN: 0, CR: 0, SO: 0, BU: 0, EN: 0 };

  for (const question of ONBOARDING_QUIZ.questions) {
    const pickedId = selectedOptionIds[question.id];
    if (!pickedId) continue;
    const option = question.options.find((o) => o.id === pickedId);
    if (!option) continue;

    scores[option.primaryTrait] += 2;
    scores[option.secondaryTrait] += 1;
  }

  return scores;
}

function formatTemplate(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, value),
    template
  );
}

function buildLocalizedReason(
  locale: "en" | "ms",
  topSubjects: SubjectId[],
  topTrait: TraitId
): string {
  const tpl = ONBOARDING_QUIZ.matchReasonTemplates[locale];
  const traitPhrase = tpl.traitPhrases[topTrait];

  if (topSubjects.length >= 2) {
    return formatTemplate(tpl.twoSubjects, {
      subject1: tpl.subjectLabels[topSubjects[0]],
      subject2: tpl.subjectLabels[topSubjects[1]],
      trait: traitPhrase,
    });
  }

  if (topSubjects.length === 1) {
    return formatTemplate(tpl.oneSubject, {
      subject1: tpl.subjectLabels[topSubjects[0]],
      trait: traitPhrase,
    });
  }

  return formatTemplate(tpl.traitOnly, { trait: traitPhrase });
}

/**
 * Deterministic top-3 career matcher following SPEC.md Section 6.3:
 * - traitDot = sum(userTraits[t] * career.traitWeights[t])
 * - traitNorm = maxTraitDot > 0 ? traitDot / maxTraitDot : 0
 * - subjectPts = sum(career.subjectWeights[s] ?? 0) for selectedSubjects
 * - subjectNorm = selectedSubjects.length > 0 ? subjectPts / (3 * selectedSubjects.length) : 0
 * - match = clamp(round(60 + 37 * (0.6 * traitNorm + 0.4 * subjectNorm)), 60, 97)
 * - Sort descending by (match, traitDot, subjectPts, catalogOrder), take top 3,
 *   and ensure strictly decreasing match percentages (#1 > #2 > #3, min 60).
 */
export function matchCareers(input: {
  selectedSubjects: SubjectId[];
  userTraits: TraitScores;
  weightsOverride?: typeof ONBOARDING_QUIZ.careerWeights;
}): CareerMatchResult[] {
  const weights = input.weightsOverride ?? ONBOARDING_QUIZ.careerWeights;
  const uniqueSubjects = Array.from(new Set(input.selectedSubjects));

  const rawScored = CAREERS.map((career, catalogIndex) => {
    const entry = weights[career.id] ?? { subjectWeights: {}, traitWeights: {} };
    const traitDot = TRAIT_KEYS.reduce(
      (sum, t) => sum + (input.userTraits[t] ?? 0) * (entry.traitWeights?.[t] ?? 0),
      0
    );
    const subjectPts = uniqueSubjects.reduce(
      (sum, subj) => sum + (entry.subjectWeights?.[subj] ?? 0),
      0
    );
    return { career, catalogIndex, entry, traitDot, subjectPts };
  });

  const maxTraitDot = rawScored.reduce((max, item) => Math.max(max, item.traitDot), 0);

  const computed = rawScored.map((item) => {
    const traitNorm = maxTraitDot > 0 ? item.traitDot / maxTraitDot : 0;
    const subjectNorm =
      uniqueSubjects.length > 0 ? item.subjectPts / (3 * uniqueSubjects.length) : 0;
    const rawMatch = Math.round(60 + 37 * (0.6 * traitNorm + 0.4 * subjectNorm));
    const matchPercent = Math.max(60, Math.min(97, rawMatch));

    // Top matching subjects sorted by weight descending
    const matchingSubjects = uniqueSubjects
      .filter((subj) => (item.entry.subjectWeights?.[subj] ?? 0) > 0)
      .sort(
        (a, b) =>
          (item.entry.subjectWeights?.[b] ?? 0) - (item.entry.subjectWeights?.[a] ?? 0)
      )
      .slice(0, 2);

    // Highest-product trait (fallback to highest career trait weight)
    let topTrait: TraitId = TRAIT_KEYS[0];
    let bestProduct = -1;
    for (const t of TRAIT_KEYS) {
      const w = item.entry.traitWeights?.[t] ?? 0;
      const product = (input.userTraits[t] ?? 0) * w;
      if (product > bestProduct) {
        bestProduct = product;
        topTrait = t;
      }
    }

    return {
      career: item.career,
      catalogIndex: item.catalogIndex,
      matchPercent,
      traitDot: item.traitDot,
      subjectPts: item.subjectPts,
      reasons: {
        en: buildLocalizedReason("en", matchingSubjects, topTrait),
        ms: buildLocalizedReason("ms", matchingSubjects, topTrait),
      },
    };
  });

  computed.sort((a, b) => {
    if (b.matchPercent !== a.matchPercent) return b.matchPercent - a.matchPercent;
    if (b.traitDot !== a.traitDot) return b.traitDot - a.traitDot;
    if (b.subjectPts !== a.subjectPts) return b.subjectPts - a.subjectPts;
    return a.catalogIndex - b.catalogIndex;
  });

  const top3 = computed.slice(0, 3).map((item) => ({
    career: item.career,
    matchPercent: item.matchPercent,
    traitDot: item.traitDot,
    subjectPts: item.subjectPts,
    reasons: item.reasons,
  }));

  for (let i = 1; i < top3.length; i++) {
    if (top3[i].matchPercent >= top3[i - 1].matchPercent) {
      top3[i].matchPercent = Math.max(60, top3[i - 1].matchPercent - 1);
    }
  }

  return top3;
}
