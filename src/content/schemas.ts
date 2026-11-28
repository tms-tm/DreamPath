import { z } from "zod";

export const LocaleSchema = z.enum(["en", "ms"]);
export type Locale = z.infer<typeof LocaleSchema>;

export const SkillIdSchema = z.enum([
  "html-css",
  "javascript",
  "problem-solving",
  "communication",
  "accessibility",
]);
export type ContentSkillId = z.infer<typeof SkillIdSchema>;

export const CareerFamilySchema = z.enum([
  "technology",
  "law",
  "healthcare",
  "design",
  "culinary",
]);

export const CareerI18nSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  spmSubjects: z.array(z.string().min(1)).min(1),
  preUPaths: z.array(z.string().min(1)).min(1),
  uniExamples: z.array(z.string().min(1)).min(1),
});

const SalaryBandSchema = z.tuple([z.number().positive(), z.number().positive()]);

export const CareerSchema = z.object({
  id: z.string().min(1),
  family: CareerFamilySchema,
  icon: z.string().min(1),
  baseSalary: z.number().positive(),
  salaryRange: z.object({
    entry: SalaryBandSchema,
    mid: SalaryBandSchema,
    senior: SalaryBandSchema,
  }),
  salarySource: z.string().min(1),
  coreSkills: z.array(SkillIdSchema).min(1),
  i18n: z.object({
    en: CareerI18nSchema,
    ms: CareerI18nSchema,
  }),
});

export type CareerContent = z.infer<typeof CareerSchema>;

export const ScenarioSkillImpactSchema = z.object({
  skillId: SkillIdSchema,
  xp: z.number().min(0),
  competencyDelta: z.number(),
});

export const ScenarioChoiceSchema = z.object({
  choiceId: z.string().min(1),
  nextNodeId: z.string().min(1),
  isCorrect: z.boolean(),
  skillImpacts: z.array(ScenarioSkillImpactSchema),
  i18n: z.object({
    en: z.object({
      label: z.string().min(1),
      explanation: z.string().min(1),
    }),
    ms: z.object({
      label: z.string().min(1),
      explanation: z.string().min(1),
    }),
  }),
});

export type ScenarioChoiceContent = z.infer<typeof ScenarioChoiceSchema>;

const ScenarioNodeI18nSchema = z.object({
  prompt: z.string().min(1),
  npcName: z.string().min(1).optional(),
  npcRole: z.string().min(1).optional(),
  npcDialogue: z.string().min(1).optional(),
});

export const ScenarioNodeSchema = z.object({
  nodeId: z.string().min(1),
  type: z.enum(["decision", "mentor", "terminal"]),
  codeSnippet: z
    .object({
      filename: z.string().min(1),
      code: z.string().min(1),
      badge: z.string().min(1).optional(),
    })
    .optional(),
  i18n: z.object({
    en: ScenarioNodeI18nSchema,
    ms: ScenarioNodeI18nSchema,
  }),
  choices: z.array(ScenarioChoiceSchema).optional(),
  terminalOutcome: z
    .object({
      stars: z.union([z.literal(1), z.literal(2), z.literal(3)]),
      xpReward: z.number().min(0),
      i18n: z.object({
        en: z.object({
          title: z.string().min(1),
          summary: z.string().min(1),
        }),
        ms: z.object({
          title: z.string().min(1),
          summary: z.string().min(1),
        }),
      }),
    })
    .optional(),
});

export type ScenarioNodeContent = z.infer<typeof ScenarioNodeSchema>;

export const ScenarioSchema = z.object({
  id: z.string().min(1),
  careerId: z.string().min(1),
  startNodeId: z.string().min(1),
  i18n: z.object({
    en: z.object({
      title: z.string().min(1),
      categoryBadge: z.string().min(1),
      description: z.string().min(1),
    }),
    ms: z.object({
      title: z.string().min(1),
      categoryBadge: z.string().min(1),
      description: z.string().min(1),
    }),
  }),
  nodes: z.array(ScenarioNodeSchema).min(1),
});

export type ScenarioContent = z.infer<typeof ScenarioSchema>;

export const QuizLabelSchema = z.enum(["A", "B", "C", "D"]);

export const QuizOptionSchema = z.object({
  label: QuizLabelSchema,
  text: z.string().min(1),
  explanation: z.string().min(1),
});

const QuizQuestionI18nSchema = z.object({
  question: z.string().min(1),
  options: z.array(QuizOptionSchema).min(2).max(4),
});

export const QuizQuestionSchema = z.object({
  id: z.string().min(1),
  skillId: SkillIdSchema,
  correctLabel: QuizLabelSchema,
  i18n: z.object({
    en: QuizQuestionI18nSchema,
    ms: QuizQuestionI18nSchema,
  }),
});

export type QuizQuestionContent = z.infer<typeof QuizQuestionSchema>;

export const QuizSchema = z.object({
  id: z.string().min(1),
  careerId: z.string().min(1),
  i18n: z.object({
    en: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
    ms: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  }),
  questions: z.array(QuizQuestionSchema).length(5),
});

export type QuizContent = z.infer<typeof QuizSchema>;

const StudyKeyTermSchema = z.object({
  term: z.string().min(1),
  definition: z.string().min(1),
});

const StudySectionSchema = z.object({
  heading: z.string().min(1),
  body: z.array(z.string().min(1)).min(1),
  keyTerms: z.array(StudyKeyTermSchema).optional(),
});

const StudyLessonI18nSchema = z.object({
  title: z.string().min(1),
  sections: z.array(StudySectionSchema).min(1),
});

export const StudyLessonSchema = z.object({
  id: z.string().min(1),
  careerId: z.string().min(1),
  readMinutes: z.number().int().positive(),
  xpReward: z.literal(30),
  skillId: SkillIdSchema,
  i18n: z.object({
    en: StudyLessonI18nSchema,
    ms: StudyLessonI18nSchema,
  }),
});

export type StudyLessonContent = z.infer<typeof StudyLessonSchema>;

export const TraitIdSchema = z.enum(["AN", "CR", "SO", "BU", "EN"]);
export type TraitId = z.infer<typeof TraitIdSchema>;

export const SubjectIdSchema = z.enum([
  "Mathematics",
  "Science",
  "Computing & Tech",
  "Languages",
  "Art & Design",
  "Business & Economics",
]);
export type SubjectId = z.infer<typeof SubjectIdSchema>;

export const WeightValueSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);

export const OnboardingOptionSchema = z.object({
  id: z.string().min(1),
  icon: z.string().min(1),
  primaryTrait: TraitIdSchema,
  secondaryTrait: TraitIdSchema,
  i18n: z.object({
    en: z.object({ label: z.string().min(1) }),
    ms: z.object({ label: z.string().min(1) }),
  }),
});

export const OnboardingQuestionSchema = z.object({
  id: z.string().min(1),
  i18n: z.object({
    en: z.object({ prompt: z.string().min(1) }),
    ms: z.object({ prompt: z.string().min(1) }),
  }),
  options: z.array(OnboardingOptionSchema).length(4),
});

export const CareerWeightEntrySchema = z.object({
  subjectWeights: z.partialRecord(SubjectIdSchema, WeightValueSchema).optional(),
  traitWeights: z.partialRecord(TraitIdSchema, WeightValueSchema).optional(),
});

const MatchReasonLocaleTemplateSchema = z.object({
  twoSubjects: z.string().min(1),
  oneSubject: z.string().min(1),
  traitOnly: z.string().min(1),
  traitPhrases: z.record(TraitIdSchema, z.string().min(1)),
  subjectLabels: z.record(SubjectIdSchema, z.string().min(1)),
});

export const OnboardingQuizSchema = z.object({
  questions: z.array(OnboardingQuestionSchema).length(8),
  careerWeights: z.record(z.string().min(1), CareerWeightEntrySchema),
  matchReasonTemplates: z.object({
    en: MatchReasonLocaleTemplateSchema,
    ms: MatchReasonLocaleTemplateSchema,
  }),
});

export type OnboardingQuizData = z.infer<typeof OnboardingQuizSchema>;
export type OnboardingQuestionContent = z.infer<typeof OnboardingQuestionSchema>;
export type CareerWeightEntry = z.infer<typeof CareerWeightEntrySchema>;

export const DreamyUniversityRouteSchema = z.object({
  uniKey: z.string().min(1),
  uniName: z.string().min(1),
  uniType: z.enum(["public", "private"]),
  i18n: z.object({
    en: z.object({
      applicationNote: z.string().min(1),
      spmRequirements: z.array(z.string().min(1)).min(1),
      preU: z.object({ name: z.string().min(1), duration: z.string().min(1) }),
      degree: z.object({ name: z.string().min(1), duration: z.string().min(1) }),
    }),
    ms: z.object({
      applicationNote: z.string().min(1),
      spmRequirements: z.array(z.string().min(1)).min(1),
      preU: z.object({ name: z.string().min(1), duration: z.string().min(1) }),
      degree: z.object({ name: z.string().min(1), duration: z.string().min(1) }),
    }),
  }),
});

export const DreamyCareerEntrySchema = z.object({
  careerId: z.string().min(1),
  salaryRange: z.object({
    entry: SalaryBandSchema,
    mid: SalaryBandSchema,
    senior: SalaryBandSchema,
  }),
  salarySource: z.string().min(1),
  estimatedBadge: z.literal("Estimated (MY)"),
  i18n: z.object({
    en: z.object({
      title: z.string().min(1),
      subtitle: z.string().min(1),
      summary: z.string().min(1),
      matchReason: z.string().min(1),
    }),
    ms: z.object({
      title: z.string().min(1),
      subtitle: z.string().min(1),
      summary: z.string().min(1),
      matchReason: z.string().min(1),
    }),
  }),
  routes: z.array(DreamyUniversityRouteSchema).min(1),
});

export const DreamyKBSchema = z.record(z.string().min(1), DreamyCareerEntrySchema);
export type DreamyUniversityRoute = z.infer<typeof DreamyUniversityRouteSchema>;
export type DreamyCareerEntry = z.infer<typeof DreamyCareerEntrySchema>;
export type DreamyKBData = z.infer<typeof DreamyKBSchema>;

