import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { syncProfileToSupabase } from '@/features/progression/sync';

export type EducationLevel = 'Form 1' | 'Form 2' | 'Form 3';

export interface MinimalProfileState {
  nickname: string;
  avatarChar: string;
  educationLevel: EducationLevel;
  favouriteSubjects: string[];
  activeCareerId: string;
  leaderboardOptIn: boolean;

  setActiveCareer: (careerId: string) => void;
  setAcademicProfile: (educationLevel: EducationLevel, favouriteSubjects: string[]) => void;
  setLeaderboardOptIn: (optIn: boolean) => void;
  updateProfile: (
    updated: Partial<
      Pick<
        MinimalProfileState,
        | 'nickname'
        | 'avatarChar'
        | 'educationLevel'
        | 'favouriteSubjects'
        | 'activeCareerId'
        | 'leaderboardOptIn'
      >
    >
  ) => void;
}

export const useProfileStore = create<MinimalProfileState>()(
  persist(
    (set) => ({
      nickname: 'Demo Student',
      avatarChar: 'D',
      educationLevel: 'Form 2',
      favouriteSubjects: ['Mathematics', 'Computing & Tech'],
      activeCareerId: 'software-engineer',
      leaderboardOptIn: false,

      setActiveCareer: (careerId) => {
        set({ activeCareerId: careerId });
        void syncProfileToSupabase({ active_career_id: careerId });
      },

      setAcademicProfile: (educationLevel, favouriteSubjects) => {
        set({ educationLevel, favouriteSubjects });
        void syncProfileToSupabase({
          education_level: educationLevel,
          favourite_subjects: favouriteSubjects,
        });
      },

      setLeaderboardOptIn: (optIn) => {
        set({ leaderboardOptIn: optIn });
        void syncProfileToSupabase({ leaderboard_opt_in: optIn });
      },

      updateProfile: (updated) => {
        set((state) => ({ ...state, ...updated }));
        const dbPatch: Record<string, unknown> = {};
        if (updated.nickname !== undefined) dbPatch.username = updated.nickname;
        if (updated.avatarChar !== undefined) dbPatch.avatar_char = updated.avatarChar;
        if (updated.educationLevel !== undefined)
          dbPatch.education_level = updated.educationLevel;
        if (updated.favouriteSubjects !== undefined)
          dbPatch.favourite_subjects = updated.favouriteSubjects;
        if (updated.activeCareerId !== undefined)
          dbPatch.active_career_id = updated.activeCareerId;
        if (updated.leaderboardOptIn !== undefined)
          dbPatch.leaderboard_opt_in = updated.leaderboardOptIn;

        if (Object.keys(dbPatch).length > 0) {
          void syncProfileToSupabase(dbPatch);
        }
      },
    }),
    {
      name: 'dreampath-profile',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
