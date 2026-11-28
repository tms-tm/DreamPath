import type { SkillId } from '@/types/career';

export const STUDY_LESSON_XP = 30;
export const DAILY_QUEST_XP = 80;
export const XP_PER_LEVEL = 300;

export interface SkillProgress {
  xp: number;
  competency: number;
}

export interface SkillImpact {
  skillId: SkillId | string;
  xp: number;
  competencyDelta?: number;
}

export interface ProgressionMathState {
  totalXp: number;
  baseSalary: number;
  skills: Record<string, SkillProgress>;
  completedActivityIds: string[];
}

export interface ActivityCompletionInput {
  activityId: string;
  xpReward: number;
  skillImpacts?: SkillImpact[];
}

export interface ActivityCompletionResult extends ProgressionMathState {
  awardedXp: number;
  alreadyCompleted: boolean;
  currentLevel: number;
  simulatedSalary: number;
}

/** Clamps a skill competency score to the valid 0..100 range. */
export function clampCompetency(value: number): number {
  return Math.max(0, Math.min(100, value));
}

/** Computes student level from total XP (Level 1 at 0 XP, +1 level every 300 XP). */
export function computeLevel(totalXp: number): number {
  return Math.max(1, Math.floor(totalXp / XP_PER_LEVEL) + 1);
}

/** Computes quiz XP using 20 base XP + 8 XP per correct answer. */
export function computeQuizXp(correctCount: number, totalQuestions = 5): number {
  const safeTotal = Math.max(0, Math.floor(totalQuestions));
  const clampedCorrect = Math.max(0, Math.min(safeTotal, Math.floor(correctCount)));
  return 20 + clampedCorrect * 8;
}

/** Computes star rating (3★ >= 80%, 2★ >= 60%, 1★ < 60%). */
export function computeQuizStars(correctCount: number, totalQuestions = 5): 1 | 2 | 3 {
  if (totalQuestions <= 0) return 1;
  const clampedCorrect = Math.max(0, Math.min(totalQuestions, correctCount));
  const ratio = clampedCorrect / totalQuestions;
  if (ratio >= 0.8) return 3;
  if (ratio >= 0.6) return 2;
  return 1;
}

/**
 * Computes simulated monthly salary (RM) from base salary, total XP, and skill competencies:
 * round(baseSalary * 0.30 + totalXp * 1.0 + sum(competency * 3)).
 */
export function computeSimulatedSalary(
  baseSalary: number,
  totalXp: number,
  skills: Record<string, Pick<SkillProgress, 'competency'>>
): number {
  const skillBonus = Object.values(skills).reduce(
    (sum, skill) => sum + clampCompetency(skill.competency) * 3,
    0
  );
  return Math.round(baseSalary * 0.3 + Math.max(0, totalXp) * 1.0 + skillBonus);
}

/**
 * Applies an activity completion idempotently.
 * First completion awards XP, updates skills (clamped 0..100), and recalculates level & salary.
 * Duplicate completions (activityId already in completedActivityIds) award 0 XP and leave state unchanged.
 */
export function applyActivityCompletion(
  state: ProgressionMathState,
  input: ActivityCompletionInput
): ActivityCompletionResult {
  if (state.completedActivityIds.includes(input.activityId)) {
    return {
      awardedXp: 0,
      alreadyCompleted: true,
      baseSalary: state.baseSalary,
      totalXp: state.totalXp,
      currentLevel: computeLevel(state.totalXp),
      simulatedSalary: computeSimulatedSalary(state.baseSalary, state.totalXp, state.skills),
      skills: state.skills,
      completedActivityIds: state.completedActivityIds,
    };
  }

  const nextSkills: Record<string, SkillProgress> = { ...state.skills };
  for (const impact of input.skillImpacts ?? []) {
    const current = nextSkills[impact.skillId] ?? { xp: 0, competency: 0 };
    nextSkills[impact.skillId] = {
      xp: current.xp + Math.max(0, impact.xp),
      competency: clampCompetency(current.competency + (impact.competencyDelta ?? 0)),
    };
  }

  const awardedXp = Math.max(0, input.xpReward);
  const nextTotalXp = state.totalXp + awardedXp;

  return {
    awardedXp,
    alreadyCompleted: false,
    baseSalary: state.baseSalary,
    totalXp: nextTotalXp,
    currentLevel: computeLevel(nextTotalXp),
    simulatedSalary: computeSimulatedSalary(state.baseSalary, nextTotalXp, nextSkills),
    skills: nextSkills,
    completedActivityIds: [...state.completedActivityIds, input.activityId],
  };
}
