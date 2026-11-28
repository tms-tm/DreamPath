import { create } from "zustand";
import type { SubjectId } from "@/content/schemas";

export type FormLevel = "Form 1" | "Form 2" | "Form 3";

interface OnboardingDraftState {
  nickname: string;
  consentAcceptedAt: string | null;
  educationLevel: FormLevel;
  favouriteSubjects: SubjectId[];
  quizAnswers: Record<string, string>;
  selectedCareerId: string | null;

  setAuthDraft: (payload: { nickname: string; consentAcceptedAt: string | null }) => void;
  setAcademicProfile: (payload: {
    educationLevel: FormLevel;
    favouriteSubjects: SubjectId[];
  }) => void;
  setQuizAnswer: (questionId: string, optionId: string) => void;
  resetQuizAnswers: () => void;
  setSelectedCareerId: (careerId: string | null) => void;
  loadDemoStudent: () => void;
  resetDraft: () => void;
}

export const useOnboardingDraft = create<OnboardingDraftState>((set) => ({
  nickname: "",
  consentAcceptedAt: null,
  educationLevel: "Form 2",
  favouriteSubjects: [],
  quizAnswers: {},
  selectedCareerId: null,

  setAuthDraft: ({ nickname, consentAcceptedAt }) =>
    set({ nickname, consentAcceptedAt }),

  setAcademicProfile: ({ educationLevel, favouriteSubjects }) =>
    set({ educationLevel, favouriteSubjects }),

  setQuizAnswer: (questionId, optionId) =>
    set((state) => ({
      quizAnswers: { ...state.quizAnswers, [questionId]: optionId },
    })),

  resetQuizAnswers: () => set({ quizAnswers: {} }),

  setSelectedCareerId: (selectedCareerId) => set({ selectedCareerId }),

  loadDemoStudent: () =>
    set({
      nickname: "Demo Student",
      consentAcceptedAt: new Date().toISOString(),
      educationLevel: "Form 2",
      favouriteSubjects: ["Mathematics", "Computing & Tech"],
      quizAnswers: {},
      selectedCareerId: null,
    }),

  resetDraft: () =>
    set({
      nickname: "",
      consentAcceptedAt: null,
      educationLevel: "Form 2",
      favouriteSubjects: [],
      quizAnswers: {},
      selectedCareerId: null,
    }),
}));
