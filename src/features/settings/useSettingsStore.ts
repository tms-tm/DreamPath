import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Locale } from '@/lib/i18n';

export interface SettingsState {
  locale: Locale;
  readAloudEnabled: boolean;
  soundEffectsEnabled: boolean;
  reduceMotion: boolean;
  setLocale: (locale: Locale) => void;
  setSettings: (
    settings: Partial<
      Pick<SettingsState, 'locale' | 'readAloudEnabled' | 'soundEffectsEnabled' | 'reduceMotion'>
    >
  ) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      locale: 'en',
      readAloudEnabled: true,
      soundEffectsEnabled: true,
      reduceMotion: false,
      setLocale: (locale) => set({ locale }),
      setSettings: (settings) => set((state) => ({ ...state, ...settings })),
    }),
    {
      name: 'dreampath-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
