import { describe, expect, it } from "vitest";
import { CAREERS } from "@/content/careers";
import { DREAMY_KB } from "@/content/dreamy-kb";
import { ONBOARDING_QUIZ } from "@/content/onboarding-quiz";
import { en } from "@/content/i18n/en";
import { ms } from "@/content/i18n/ms";
import {
  CareerSchema,
  DreamyKBSchema,
  OnboardingQuizSchema,
  QuizSchema,
  ScenarioSchema,
  StudyLessonSchema,
} from "@/content/schemas";

describe("content schemas & bilingual parity", () => {
  it("validates all 5 careers in src/content/careers.ts with Zod", () => {
    expect(CAREERS).toHaveLength(5);
    const ids = CAREERS.map((c) => c.id);
    expect(ids).toEqual([
      "software-engineer",
      "junior-lawyer",
      "future-doctor",
      "product-designer",
      "master-chef",
    ]);

    for (const career of CAREERS) {
      const parsed = CareerSchema.safeParse(career);
      expect(parsed.success, `Career ${career.id} failed schema validation`).toBe(true);
    }
  });

  it("ensures en and ms UI dictionaries share identical key shapes", () => {
    const extractShape = (obj: Record<string, unknown>, prefix = ""): string[] =>
      Object.keys(obj)
        .sort()
        .flatMap((key) => {
          const val = obj[key];
          const path = prefix ? `${prefix}.${key}` : key;
          if (val && typeof val === "object" && !Array.isArray(val)) {
            return extractShape(val as Record<string, unknown>, path);
          }
          return [path];
        });

    expect(extractShape(en as unknown as Record<string, unknown>)).toEqual(
      extractShape(ms as unknown as Record<string, unknown>)
    );
  });

  it("rejects missing ms translations on CareerSchema", () => {
    const broken = {
      ...CAREERS[0],
      i18n: {
        en: CAREERS[0].i18n.en,
        ms: { ...CAREERS[0].i18n.ms, title: "" },
      },
    };
    const result = CareerSchema.safeParse(broken);
    expect(result.success).toBe(false);
  });

  it("rejects quizzes that do not have exactly 5 questions and validates valid quizzes", () => {
    const baseQuestion = {
      id: "q1",
      skillId: "javascript" as const,
      correctLabel: "A" as const,
      i18n: {
        en: {
          question: "Sample EN question?",
          options: [
            { label: "A" as const, text: "Yes", explanation: "Correct" },
            { label: "B" as const, text: "No", explanation: "Wrong" },
          ],
        },
        ms: {
          question: "Contoh soalan BM?",
          options: [
            { label: "A" as const, text: "Ya", explanation: "Betul" },
            { label: "B" as const, text: "Tidak", explanation: "Salah" },
          ],
        },
      },
    };

    const fourQuestions = {
      id: "quiz-invalid",
      careerId: "software-engineer",
      i18n: {
        en: { title: "Title", description: "Desc" },
        ms: { title: "Tajuk", description: "Huraian" },
      },
      questions: [baseQuestion, baseQuestion, baseQuestion, baseQuestion],
    };

    expect(QuizSchema.safeParse(fourQuestions).success).toBe(false);

    const fiveQuestions = {
      ...fourQuestions,
      id: "quiz-valid",
      questions: [
        baseQuestion,
        { ...baseQuestion, id: "q2" },
        { ...baseQuestion, id: "q3" },
        { ...baseQuestion, id: "q4" },
        { ...baseQuestion, id: "q5" },
      ],
    };

    expect(QuizSchema.safeParse(fiveQuestions).success).toBe(true);
  });

  it("validates StudyLessonSchema and ScenarioSchema enforce en and ms blocks", () => {
    const validStudy = {
      id: "study-test-1",
      careerId: "software-engineer",
      readMinutes: 4,
      xpReward: 30 as const,
      skillId: "html-css" as const,
      i18n: {
        en: {
          title: "Web Basics",
          sections: [{ heading: "Intro", body: ["Paragraph 1"] }],
        },
        ms: {
          title: "Asas Web",
          sections: [{ heading: "Pengenalan", body: ["Perenggan 1"] }],
        },
      },
    };
    expect(StudyLessonSchema.safeParse(validStudy).success).toBe(true);

    const missingMsScenario = {
      id: "scen-1",
      careerId: "software-engineer",
      startNodeId: "n1",
      i18n: {
        en: { title: "T", categoryBadge: "B", description: "D" },
      },
      nodes: [],
    };
    expect(ScenarioSchema.safeParse(missingMsScenario).success).toBe(false);
  });

  it("validates 8x4 onboarding quiz, bilingual parity, and 100% 5-career matrix coverage", () => {
    const parsed = OnboardingQuizSchema.safeParse(ONBOARDING_QUIZ);
    expect(parsed.success).toBe(true);
    expect(ONBOARDING_QUIZ.questions).toHaveLength(8);
    for (const q of ONBOARDING_QUIZ.questions) {
      expect(q.options).toHaveLength(4);
    }

    for (const career of CAREERS) {
      expect(ONBOARDING_QUIZ.careerWeights[career.id]).toBeDefined();
    }
  });

  it("validates DREAMY_KB covers all 5 careers with Estimated (MY) salary & bilingual routes", () => {
    const parsed = DreamyKBSchema.safeParse(DREAMY_KB);
    expect(parsed.success, `Dreamy KB failed schema validation: ${JSON.stringify(parsed.error)}`).toBe(true);

    const requiredIds = [
      "software-engineer",
      "junior-lawyer",
      "future-doctor",
      "product-designer",
      "master-chef",
    ];

    for (const id of requiredIds) {
      const entry = DREAMY_KB[id];
      expect(entry, `Missing dreamy-kb entry for ${id}`).toBeDefined();
      expect(entry.estimatedBadge).toBe("Estimated (MY)");
      expect(entry.salarySource).toBeTruthy();
      expect(entry.i18n.en.title).toBeTruthy();
      expect(entry.i18n.ms.title).toBeTruthy();
      expect(entry.routes.length).toBeGreaterThanOrEqual(1);

      for (const route of entry.routes) {
        expect(route.i18n.en.spmRequirements.length).toBeGreaterThanOrEqual(1);
        expect(route.i18n.ms.spmRequirements.length).toBeGreaterThanOrEqual(1);
        expect(route.i18n.en.preU.name).toBeTruthy();
        expect(route.i18n.ms.preU.name).toBeTruthy();
        expect(route.i18n.en.degree.name).toBeTruthy();
        expect(route.i18n.ms.degree.name).toBeTruthy();
      }
    }
  });
});
