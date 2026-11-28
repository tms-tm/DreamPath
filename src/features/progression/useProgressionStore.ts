import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TierId, SkillId, CAREER_PATHS } from '@/types/career';
import {
  applyActivityCompletion,
  clampCompetency,
  computeLevel,
  computeSimulatedSalary,
  type ActivityCompletionInput,
  type ActivityCompletionResult,
  type SkillProgress,
} from '@/features/progression/math';
import { syncProfileToSupabase, syncProgressToSupabase } from '@/features/progression/sync';

export type { SkillProgress };

export interface UserProfile {
  name: string;
  handle: string;
  avatarChar: string;
  joinedDate: string;
  currentLevel: number;
  educationTier: TierId;
  activeCareerId: string;
  readAloudEnabled: boolean;
  soundEffectsEnabled: boolean;
  reduceMotion: boolean;
  streakDays: number;
  missionsCompleted: number;
  learningTimeMinutes: number;
}

interface ProgressionState {
  profile: UserProfile;
  totalXp: number;
  simulatedSalary: number;
  skills: Record<SkillId, SkillProgress>;
  careerProgress: Record<string, number>;
  completedQuests: string[];
  completedActivityIds: string[];

  setEducationTier: (tier: TierId) => void;
  setActiveCareer: (careerId: string) => void;
  setSettings: (
    settings: Partial<Pick<UserProfile, 'readAloudEnabled' | 'soundEffectsEnabled' | 'reduceMotion'>>
  ) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;

  applySkillImpacts: (
    impacts: Array<{ skillId: SkillId; xp: number; competencyDelta?: number }>,
    activityId?: string
  ) => void;
  applyReward: (reward: {
    xp?: number;
    salaryDelta?: number;
    missionCountDelta?: number;
    activityId?: string;
  }) => void;
  completeQuest: (questId: string, xpReward: number) => void;
  completeActivity: (
    input: ActivityCompletionInput & { missionCountDelta?: number }
  ) => ActivityCompletionResult;
  calculateSalary: () => number;
}

function getBaseSalaryForCareer(careerId: string): number {
  return CAREER_PATHS.find((c) => c.id === careerId)?.baseSalary ?? 5000;
}

const INITIAL_SKILLS: Record<SkillId, SkillProgress> = {
  'html-css': { xp: 0, competency: 0 },
  javascript: { xp: 0, competency: 0 },
  'problem-solving': { xp: 0, competency: 0 },
  communication: { xp: 0, competency: 0 },
  accessibility: { xp: 0, competency: 0 },
};

function scheduleProgressSync(state: ProgressionState) {
  void syncProgressToSupabase({
    totalXp: state.totalXp,
    simulatedSalary: state.simulatedSalary,
    currentLevel: state.profile.currentLevel,
    streakDays: state.profile.streakDays,
    missionsCompleted: state.profile.missionsCompleted,
    completedQuests: state.completedQuests,
    completedActivityIds: state.completedActivityIds,
    skills: state.skills,
  });
}

export const useProgressionStore = create<ProgressionState>()(
  persist(
    (set, get) => ({
      profile: {
        name: 'Demo Student',
        handle: '@demostudent',
        avatarChar: 'D',
        joinedDate: '2026',
        currentLevel: 1,
        educationTier: 'nebula',
        activeCareerId: 'software-engineer',
        readAloudEnabled: true,
        soundEffectsEnabled: true,
        reduceMotion: false,
        streakDays: 0,
        missionsCompleted: 0,
        learningTimeMinutes: 0,
      },
      totalXp: 0,
      simulatedSalary: computeSimulatedSalary(
        getBaseSalaryForCareer('software-engineer'),
        0,
        INITIAL_SKILLS
      ),
      skills: INITIAL_SKILLS,
      careerProgress: {
        'software-engineer': 0,
        'junior-lawyer': 0,
        'future-doctor': 0,
        'product-designer': 0,
        'master-chef': 0,
      },
      completedQuests: [],
      completedActivityIds: [],

      setEducationTier: (tier) =>
        set((state) => ({ profile: { ...state.profile, educationTier: tier } })),

      setActiveCareer: (careerId) => {
        set((state) => ({
          simulatedSalary: computeSimulatedSalary(
            getBaseSalaryForCareer(careerId),
            state.totalXp,
            state.skills
          ),
          profile: { ...state.profile, activeCareerId: careerId },
        }));
        void syncProfileToSupabase({ active_career_id: careerId });
        scheduleProgressSync(get());
      },

      setSettings: (settings) =>
        set((state) => ({ profile: { ...state.profile, ...settings } })),

      updateProfile: (updated) =>
        set((state) => ({ profile: { ...state.profile, ...updated } })),

      applySkillImpacts: (impacts, activityId) => {
        set((state) => {
          const baseSalary = getBaseSalaryForCareer(state.profile.activeCareerId);

          if (activityId) {
            const totalImpactXp = impacts.reduce((sum, i) => sum + Math.max(0, i.xp), 0);
            const res = applyActivityCompletion(
              {
                totalXp: state.totalXp,
                baseSalary,
                skills: state.skills,
                completedActivityIds: state.completedActivityIds,
              },
              { activityId, xpReward: totalImpactXp, skillImpacts: impacts }
            );
            if (res.alreadyCompleted) return state;

            return {
              skills: res.skills as Record<SkillId, SkillProgress>,
              totalXp: res.totalXp,
              simulatedSalary: res.simulatedSalary,
              completedActivityIds: res.completedActivityIds,
              profile: {
                ...state.profile,
                currentLevel: res.currentLevel,
              },
            };
          }

          const nextSkills = { ...state.skills };
          let gainedXp = 0;
          for (const impact of impacts) {
            const current = nextSkills[impact.skillId] ?? { xp: 0, competency: 0 };
            nextSkills[impact.skillId] = {
              xp: current.xp + Math.max(0, impact.xp),
              competency: clampCompetency(current.competency + (impact.competencyDelta ?? 0)),
            };
            gainedXp += Math.max(0, impact.xp);
          }

          const nextTotalXp = state.totalXp + gainedXp;

          return {
            skills: nextSkills,
            totalXp: nextTotalXp,
            simulatedSalary: computeSimulatedSalary(baseSalary, nextTotalXp, nextSkills),
            profile: {
              ...state.profile,
              currentLevel: computeLevel(nextTotalXp),
            },
          };
        });
        scheduleProgressSync(get());
      },

      applyReward: (reward) => {
        set((state) => {
          const { xp = 0, missionCountDelta = 0, activityId } = reward;
          const baseSalary = getBaseSalaryForCareer(state.profile.activeCareerId);

          if (activityId) {
            const res = applyActivityCompletion(
              {
                totalXp: state.totalXp,
                baseSalary,
                skills: state.skills,
                completedActivityIds: state.completedActivityIds,
              },
              { activityId, xpReward: xp }
            );
            if (res.alreadyCompleted) return state;

            return {
              totalXp: res.totalXp,
              simulatedSalary: res.simulatedSalary,
              completedActivityIds: res.completedActivityIds,
              profile: {
                ...state.profile,
                currentLevel: res.currentLevel,
                missionsCompleted: state.profile.missionsCompleted + missionCountDelta,
              },
            };
          }

          const nextTotalXp = state.totalXp + Math.max(0, xp);
          return {
            totalXp: nextTotalXp,
            simulatedSalary: computeSimulatedSalary(baseSalary, nextTotalXp, state.skills),
            profile: {
              ...state.profile,
              currentLevel: computeLevel(nextTotalXp),
              missionsCompleted: state.profile.missionsCompleted + missionCountDelta,
            },
          };
        });
        scheduleProgressSync(get());
      },

      completeQuest: (questId, xpReward) => {
        set((state) => {
          if (
            state.completedQuests.includes(questId) ||
            state.completedActivityIds.includes(questId)
          ) {
            return state;
          }

          const res = applyActivityCompletion(
            {
              totalXp: state.totalXp,
              baseSalary: getBaseSalaryForCareer(state.profile.activeCareerId),
              skills: state.skills,
              completedActivityIds: state.completedActivityIds,
            },
            { activityId: questId, xpReward }
          );

          return {
            completedQuests: [...state.completedQuests, questId],
            completedActivityIds: res.completedActivityIds,
            totalXp: res.totalXp,
            simulatedSalary: res.simulatedSalary,
            profile: {
              ...state.profile,
              currentLevel: res.currentLevel,
              missionsCompleted: state.profile.missionsCompleted + 1,
            },
          };
        });
        scheduleProgressSync(get());
      },

      completeActivity: (input) => {
        const state = get();
        const result = applyActivityCompletion(
          {
            totalXp: state.totalXp,
            baseSalary: getBaseSalaryForCareer(state.profile.activeCareerId),
            skills: state.skills,
            completedActivityIds: state.completedActivityIds,
          },
          input
        );

        if (!result.alreadyCompleted) {
          set({
            totalXp: result.totalXp,
            simulatedSalary: result.simulatedSalary,
            skills: result.skills as Record<SkillId, SkillProgress>,
            completedActivityIds: result.completedActivityIds,
            profile: {
              ...state.profile,
              currentLevel: result.currentLevel,
              missionsCompleted:
                state.profile.missionsCompleted + (input.missionCountDelta ?? 0),
            },
          });
          scheduleProgressSync(get());
        }

        return result;
      },

      calculateSalary: () => {
        const state = get();
        return computeSimulatedSalary(
          getBaseSalaryForCareer(state.profile.activeCareerId),
          state.totalXp,
          state.skills
        );
      },
    }),
    {
      name: 'dreampath-user-state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
