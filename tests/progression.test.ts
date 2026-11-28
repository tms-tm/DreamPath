import { beforeEach, describe, expect, it } from 'vitest';
import {
  DAILY_QUEST_XP,
  STUDY_LESSON_XP,
  applyActivityCompletion,
  clampCompetency,
  computeLevel,
  computeQuizStars,
  computeQuizXp,
  computeSimulatedSalary,
  type ProgressionMathState,
} from '@/features/progression/math';
import { useProgressionStore } from '@/stores/useProgressionStore';

describe('progression math', () => {
  describe('computeLevel', () => {
    it('starts at Level 1 and increments every 300 XP', () => {
      expect(computeLevel(0)).toBe(1);
      expect(computeLevel(272)).toBe(1);
      expect(computeLevel(299)).toBe(1);
      expect(computeLevel(300)).toBe(2);
      expect(computeLevel(302)).toBe(2);
      expect(computeLevel(600)).toBe(3);
      expect(computeLevel(-50)).toBe(1);
    });
  });

  describe('computeQuizXp and computeQuizStars', () => {
    it('computes 20 + correctCount * 8 across 0..5 correct answers', () => {
      expect(computeQuizXp(0)).toBe(20);
      expect(computeQuizXp(1)).toBe(28);
      expect(computeQuizXp(2)).toBe(36);
      expect(computeQuizXp(3)).toBe(44);
      expect(computeQuizXp(4)).toBe(52);
      expect(computeQuizXp(5)).toBe(60);
    });

    it('clamps out-of-range correctCount', () => {
      expect(computeQuizXp(-2)).toBe(20);
      expect(computeQuizXp(9)).toBe(60);
    });

    it('assigns 3★ >= 80%, 2★ >= 60%, and 1★ < 60%', () => {
      expect(computeQuizStars(5, 5)).toBe(3);
      expect(computeQuizStars(4, 5)).toBe(3);
      expect(computeQuizStars(3, 5)).toBe(2);
      expect(computeQuizStars(2, 5)).toBe(1);
      expect(computeQuizStars(0, 5)).toBe(1);
    });
  });

  describe('computeSimulatedSalary', () => {
    it('matches SPEC.md Section 6.2 worked examples for baseSalary = 4500', () => {
      expect(
        computeSimulatedSalary(4500, 0, {
          'problem-solving': { competency: 0 },
          javascript: { competency: 0 },
        })
      ).toBe(1350);

      expect(
        computeSimulatedSalary(4500, 302, {
          'problem-solving': { competency: 15 },
          javascript: { competency: 10 },
          'html-css': { competency: 0 },
          communication: { competency: 0 },
          accessibility: { competency: 0 },
        })
      ).toBe(1727);
    });

    it('clamps competency values between 0 and 100 when computing salary', () => {
      expect(clampCompetency(-10)).toBe(0);
      expect(clampCompetency(140)).toBe(100);
      expect(
        computeSimulatedSalary(4500, 0, {
          javascript: { competency: 150 },
        })
      ).toBe(1650);
    });
  });

  describe('applyActivityCompletion', () => {
    const initialState: ProgressionMathState = {
      totalXp: 0,
      baseSalary: 4500,
      skills: {
        'html-css': { xp: 0, competency: 0 },
        javascript: { xp: 0, competency: 0 },
        'problem-solving': { xp: 0, competency: 0 },
        communication: { xp: 0, competency: 0 },
        accessibility: { xp: 0, competency: 0 },
      },
      completedActivityIds: [],
    };

    it('reproduces SPEC.md Section 6.1 worked XP progression example', () => {
      const s1 = applyActivityCompletion(initialState, {
        activityId: 'study-se-1',
        xpReward: STUDY_LESSON_XP,
        skillImpacts: [{ skillId: 'html-css', xp: STUDY_LESSON_XP, competencyDelta: 5 }],
      });
      expect(s1.totalXp).toBe(30);
      expect(s1.currentLevel).toBe(1);

      const quizXp = computeQuizXp(4);
      expect(quizXp).toBe(52);
      expect(computeQuizStars(4, 5)).toBe(3);

      const s2 = applyActivityCompletion(s1, {
        activityId: 'quiz-se-1',
        xpReward: quizXp,
        skillImpacts: [{ skillId: 'javascript', xp: quizXp, competencyDelta: 10 }],
      });
      expect(s2.totalXp).toBe(82);

      const s3 = applyActivityCompletion(s2, {
        activityId: 'scenario-se-1',
        xpReward: 110,
        skillImpacts: [{ skillId: 'problem-solving', xp: 110, competencyDelta: 15 }],
      });
      expect(s3.totalXp).toBe(192);

      const s4 = applyActivityCompletion(s3, {
        activityId: 'quest-1',
        xpReward: DAILY_QUEST_XP,
      });
      expect(s4.totalXp).toBe(272);
      expect(s4.currentLevel).toBe(1);

      const s5 = applyActivityCompletion(s4, {
        activityId: 'study-se-2',
        xpReward: STUDY_LESSON_XP,
      });
      expect(s5.totalXp).toBe(302);
      expect(s5.currentLevel).toBe(2);
      expect(s5.simulatedSalary).toBe(1350 + 302 + (5 + 10 + 15) * 3);
    });

    it('awards 0 XP and preserves state on duplicate activityId replay', () => {
      const first = applyActivityCompletion(initialState, {
        activityId: 'study-se-1',
        xpReward: STUDY_LESSON_XP,
        skillImpacts: [{ skillId: 'javascript', xp: 30, competencyDelta: 10 }],
      });

      const replay = applyActivityCompletion(first, {
        activityId: 'study-se-1',
        xpReward: STUDY_LESSON_XP,
        skillImpacts: [{ skillId: 'javascript', xp: 30, competencyDelta: 10 }],
      });

      expect(replay.alreadyCompleted).toBe(true);
      expect(replay.awardedXp).toBe(0);
      expect(replay.totalXp).toBe(first.totalXp);
      expect(replay.simulatedSalary).toBe(first.simulatedSalary);
      expect(replay.skills.javascript).toEqual({ xp: 30, competency: 10 });
      expect(replay.completedActivityIds).toEqual(['study-se-1']);
    });

    it('clamps skill competency between 0 and 100 across updates', () => {
      const boosted = applyActivityCompletion(initialState, {
        activityId: 'act-1',
        xpReward: 50,
        skillImpacts: [
          { skillId: 'javascript', xp: 50, competencyDelta: 130 },
          { skillId: 'accessibility', xp: 0, competencyDelta: -20 },
        ],
      });

      expect(boosted.skills.javascript.competency).toBe(100);
      expect(boosted.skills.accessibility.competency).toBe(0);
    });
  });

  describe('useProgressionStore integration', () => {
    beforeEach(() => {
      useProgressionStore.setState({
        totalXp: 0,
        simulatedSalary: 1860,
        completedQuests: [],
        completedActivityIds: [],
        skills: {
          'html-css': { xp: 0, competency: 0 },
          javascript: { xp: 0, competency: 0 },
          'problem-solving': { xp: 0, competency: 0 },
          communication: { xp: 0, competency: 0 },
          accessibility: { xp: 0, competency: 0 },
        },
        profile: {
          ...useProgressionStore.getState().profile,
          currentLevel: 1,
          activeCareerId: 'software-engineer',
          missionsCompleted: 0,
        },
      });
    });

    it('recalculates salary on career switch using unified math formula', () => {
      useProgressionStore.getState().setActiveCareer('master-chef');
      // master-chef baseSalary = 4500 -> round(4500 * 0.30) = 1350
      expect(useProgressionStore.getState().simulatedSalary).toBe(1350);

      useProgressionStore.getState().setActiveCareer('future-doctor');
      // future-doctor baseSalary = 7500 -> round(7500 * 0.30) = 2250
      expect(useProgressionStore.getState().simulatedSalary).toBe(2250);
    });

    it('ignores ad-hoc salaryDelta in applyReward and uses math formula', () => {
      useProgressionStore.getState().applyReward({
        xp: 120,
        salaryDelta: 9999,
        missionCountDelta: 1,
      });

      const state = useProgressionStore.getState();
      expect(state.totalXp).toBe(120);
      // software-engineer baseSalary = 6200 -> round(6200 * 0.30 + 120) = 1980
      expect(state.simulatedSalary).toBe(1980);
      expect(state.profile.missionsCompleted).toBe(1);
    });

    it('awards quest XP and activity XP idempotently', () => {
      useProgressionStore.getState().completeQuest('quest-1', DAILY_QUEST_XP);
      useProgressionStore.getState().completeQuest('quest-1', DAILY_QUEST_XP);

      expect(useProgressionStore.getState().totalXp).toBe(80);
      expect(useProgressionStore.getState().completedActivityIds).toEqual(['quest-1']);
      expect(useProgressionStore.getState().simulatedSalary).toBe(1860 + 80);

      const first = useProgressionStore.getState().completeActivity({
        activityId: 'study-1',
        xpReward: STUDY_LESSON_XP,
        skillImpacts: [{ skillId: 'javascript', xp: 30, competencyDelta: 10 }],
      });
      const replay = useProgressionStore.getState().completeActivity({
        activityId: 'study-1',
        xpReward: STUDY_LESSON_XP,
        skillImpacts: [{ skillId: 'javascript', xp: 30, competencyDelta: 10 }],
      });

      expect(first.awardedXp).toBe(30);
      expect(replay.awardedXp).toBe(0);
      expect(useProgressionStore.getState().totalXp).toBe(110);
      expect(useProgressionStore.getState().simulatedSalary).toBe(1860 + 110 + 30);
    });
  });
});
