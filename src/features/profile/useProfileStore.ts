import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

      setActiveCareer: (careerId) => set({ activeCareerId: careerId }),
      setAcademicProfile: (educationLevel, favouriteSubjects) =>
        set({ educationLevel, favouriteSubjects }),
      setLeaderboardOptIn: (optIn) => set({ leaderboardOptIn: optIn }),
      updateProfile: (updated) => set((state) => ({ ...state, ...updated })),
    }),
    {
      name: 'dreampath-profile',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
