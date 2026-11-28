import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TierId, SkillId, CAREER_PATHS } from '@/types/career';

export interface SkillProgress {
  xp: number;
  competency: number; // 0 - 100
}

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
  careerProgress: Record<string, number>; // careerId -> progressPercent
  completedQuests: string[];
  
  // Actions
  setEducationTier: (tier: TierId) => void;
  setActiveCareer: (careerId: string) => void;
  setSettings: (settings: Partial<Pick<UserProfile, 'readAloudEnabled' | 'soundEffectsEnabled' | 'reduceMotion'>>) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  
  applySkillImpacts: (impacts: Array<{ skillId: SkillId; xp: number; competencyDelta?: number }>) => void;
  applyReward: (reward: { xp?: number; salaryDelta?: number; missionCountDelta?: number }) => void;
  completeQuest: (questId: string, xpReward: number) => void;
  calculateSalary: () => number;
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
      simulatedSalary: 1860,
      skills: {
        'html-css': { xp: 0, competency: 0 },
        javascript: { xp: 0, competency: 0 },
        'problem-solving': { xp: 0, competency: 0 },
        communication: { xp: 0, competency: 0 },
        accessibility: { xp: 0, competency: 0 },
      },
      careerProgress: {
        'software-engineer': 0,
        'junior-lawyer': 0,
        'future-doctor': 0,
        'product-designer': 0,
        'master-chef': 0,
      },
      completedQuests: [],

      setEducationTier: (tier) =>
        set((state) => ({ profile: { ...state.profile, educationTier: tier } })),

      setActiveCareer: (careerId) =>
        set((state) => ({ profile: { ...state.profile, activeCareerId: careerId } })),

      setSettings: (settings) =>
        set((state) => ({ profile: { ...state.profile, ...settings } })),

      updateProfile: (updated) =>
        set((state) => ({ profile: { ...state.profile, ...updated } })),

      applySkillImpacts: (impacts) =>
        set((state) => {
          const nextSkills = { ...state.skills };
          let gainedXp = 0;
          for (const impact of impacts) {
            const current = nextSkills[impact.skillId] ?? { xp: 0, competency: 0 };
            nextSkills[impact.skillId] = {
              xp: current.xp + impact.xp,
              competency: Math.max(0, Math.min(100, current.competency + (impact.competencyDelta ?? 0))),
            };
            gainedXp += Math.max(0, impact.xp);
          }

          const newTotalXp = state.totalXp + gainedXp;
          const newLevel = Math.max(1, Math.floor(newTotalXp / 300) + 1);

          // Recalculate salary
          const activeCareer = CAREER_PATHS.find((c) => c.id === state.profile.activeCareerId);
          const base = activeCareer?.baseSalary ?? 5000;
          const competencySum = Object.values(nextSkills).reduce(
            (acc, curr) => acc + (curr.competency / 100) * 150,
            0
          );
          const calculatedSalary = Math.round(base * 0.25 + newTotalXp * 0.8 + competencySum);

          return {
            skills: nextSkills,
            totalXp: newTotalXp,
            simulatedSalary: calculatedSalary,
            profile: {
              ...state.profile,
              currentLevel: newLevel,
            },
          };
        }),

      applyReward: ({ xp = 0, salaryDelta = 0, missionCountDelta = 0 }) =>
        set((state) => {
          const newXp = state.totalXp + xp;
          const newLevel = Math.max(1, Math.floor(newXp / 300) + 1);
          return {
            totalXp: newXp,
            simulatedSalary: state.simulatedSalary + salaryDelta,
            profile: {
              ...state.profile,
              currentLevel: newLevel,
              missionsCompleted: state.profile.missionsCompleted + missionCountDelta,
            },
          };
        }),

      completeQuest: (questId, xpReward) =>
        set((state) => {
          if (state.completedQuests.includes(questId)) return state;
          const newXp = state.totalXp + xpReward;
          return {
            completedQuests: [...state.completedQuests, questId],
            totalXp: newXp,
            simulatedSalary: state.simulatedSalary + 80,
            profile: {
              ...state.profile,
              missionsCompleted: state.profile.missionsCompleted + 1,
            },
          };
        }),

      calculateSalary: () => {
        const state = get();
        const activeCareer = CAREER_PATHS.find((c) => c.id === state.profile.activeCareerId);
        const base = activeCareer?.baseSalary ?? 5000;
        return Math.round(base * 0.25 + state.totalXp * 0.8);
      },
    }),
    {
      name: 'dreampath-user-state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

