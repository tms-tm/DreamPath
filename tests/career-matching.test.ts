import { describe, expect, it } from "vitest";
import { ONBOARDING_QUIZ } from "@/content/onboarding-quiz";
import { computeTraitScoresFromAnswers, matchCareers } from "@/lib/career-matching";

describe("career matching engine", () => {
  it("tallies +2 primary and +1 secondary traits deterministically", () => {
    const answers = Object.fromEntries(
      ONBOARDING_QUIZ.questions.map((q) => [q.id, q.options[0].id])
    );
    const run1 = computeTraitScoresFromAnswers(answers);
    const run2 = computeTraitScoresFromAnswers(answers);
    expect(run1).toEqual(run2);
    expect(Object.values(run1).reduce((a, b) => a + b, 0)).toBe(24); // 8 * (2 + 1)
  });

  it("matches SPEC.md Section 6.3 worked example scores", () => {
    const results = matchCareers({
      selectedSubjects: ["Mathematics", "Computing & Tech"],
      userTraits: { AN: 10, CR: 3, SO: 2, BU: 6, EN: 3 },
      weightsOverride: {
        "software-engineer": {
          subjectWeights: { Mathematics: 2, "Computing & Tech": 3 },
          traitWeights: { AN: 3, BU: 1 },
        },
        "future-doctor": {
          subjectWeights: { Mathematics: 1 },
          traitWeights: { AN: 2, SO: 2 },
        },
      },
    });

    expect(results).toHaveLength(3);
    expect(results[0].career.id).toBe("software-engineer");
    expect(results[0].matchPercent).toBe(95);
    const doctor = results.find((r) => r.career.id === "future-doctor");
    expect(doctor?.matchPercent).toBe(77);
  });

  it("enforces strict descending #1 > #2 > #3 ordering on ties", () => {
    const results = matchCareers({
      selectedSubjects: [],
      userTraits: { AN: 5, CR: 5, SO: 5, BU: 5, EN: 5 },
      weightsOverride: {
        "software-engineer": { subjectWeights: {}, traitWeights: { AN: 2 } },
        "junior-lawyer": { subjectWeights: {}, traitWeights: { AN: 2 } },
        "future-doctor": { subjectWeights: {}, traitWeights: { AN: 2 } },
        "product-designer": { subjectWeights: {}, traitWeights: { AN: 1 } },
        "master-chef": { subjectWeights: {}, traitWeights: { AN: 1 } },
      },
    });

    expect(results).toHaveLength(3);
    expect(results[0].career.id).toBe("software-engineer");
    expect(results[1].career.id).toBe("junior-lawyer");
    expect(results[2].career.id).toBe("future-doctor");
    expect(results[0].matchPercent).toBeGreaterThan(results[1].matchPercent);
    expect(results[1].matchPercent).toBeGreaterThan(results[2].matchPercent);
  });

  it("generates non-empty bilingual EN and BM match reasons", () => {
    const results = matchCareers({
      selectedSubjects: ["Science", "Mathematics"],
      userTraits: { AN: 6, CR: 2, SO: 10, BU: 2, EN: 4 },
    });

    for (const item of results) {
      expect(item.reasons.en.length).toBeGreaterThan(10);
      expect(item.reasons.ms.length).toBeGreaterThan(10);
      expect(item.reasons.en).not.toContain("{");
      expect(item.reasons.ms).not.toContain("{");
    }
  });
});
