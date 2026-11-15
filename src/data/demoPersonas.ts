import type { AchievementItem, UserProfile } from '@/stores/useProgressionStore';
import type { SkillId, TierId } from '@/types/career';

export interface DemoPersona {
  id: string;
  name: string;
  education: string;
  educationTier: TierId;
  careerInterests: string[];
  primaryCareerId: string | null;
  exploringCareers?: boolean;
  profile: Omit<UserProfile, 'name' | 'handle' | 'avatarChar' | 'educationTier' | 'educationDisplay' | 'careerInterests' | 'primaryCareerId' | 'exploringCareers' | 'activeCareerId'>;
  initialProgress: {
    totalXp: number;
    simulatedSalary: number;
    skills: Record<SkillId, { xp: number; competency: number }>;
    achievements: AchievementItem[];
    careerProgress: Record<string, number>;
    completedQuests: string[];
  };
}

const defaultSkills = {
  'html-css': { xp: 0, competency: 0 },
  javascript: { xp: 0, competency: 0 },
  'problem-solving': { xp: 0, competency: 0 },
  communication: { xp: 0, competency: 0 },
  accessibility: { xp: 0, competency: 0 },
};

function makePersona(
  details: Omit<DemoPersona, 'profile' | 'initialProgress'> & { age: number; currentLevel: number },
): DemoPersona {
  const { age, currentLevel, ...persona } = details;
  return {
    ...persona,
    profile: {
      age,
      joinedDate: '15 November 2026',
      currentLevel,
      screenTimeUsedMinutes: 0,
      screenTimeMaxMinutes: 60,
      readAloudEnabled: true,
      soundEffectsEnabled: true,
      reduceMotion: false,
      colorMode: 'dark',
      parentName: '',
      parentEmail: '',
      streakDays: 0,
      missionsCompleted: 0,
      learningTimeMinutes: 0,
    },
    initialProgress: {
      totalXp: 0,
      simulatedSalary: 0,
      skills: { ...defaultSkills },
      achievements: [],
      careerProgress: {},
      completedQuests: [],
    },
  };
}

// Add new demo personas here; their profile and progress always start from clean defaults.
export const DEMO_PERSONAS: DemoPersona[] = [
  makePersona({
    id: 'aiman-hakim',
    name: 'Aiman Hakim',
    education: 'Form 4 · Fully Residential School (SBP)',
    educationTier: 'nebula',
    careerInterests: ['Lawyer'],
    primaryCareerId: 'junior-lawyer',
    age: 16,
    currentLevel: 1,
  }),
  makePersona({
    id: 'noor-aisyah',
    name: 'Noor Aisyah',
    education: 'Form 5 · Secondary School (SMK)',
    educationTier: 'galaxy',
    careerInterests: ['Software Engineer', 'Doctor', 'Teacher'],
    primaryCareerId: null,
    age: 17,
    currentLevel: 1,
  }),
  makePersona({
    id: 'tan-mei-ling',
    name: 'Tan Mei Ling',
    education: 'Diploma student · Polytechnic',
    educationTier: 'galaxy',
    careerInterests: ['Finance / Business'],
    primaryCareerId: null,
    age: 19,
    currentLevel: 1,
  }),
  makePersona({
    id: 'priya-devi',
    name: 'Priya Devi',
    education: "Bachelor's Degree student · Undergraduate",
    educationTier: 'galaxy',
    careerInterests: [],
    primaryCareerId: null,
    exploringCareers: true,
    age: 21,
    currentLevel: 1,
  }),
];

export function getDemoPersona(id: string): DemoPersona | undefined {
  return DEMO_PERSONAS.find((persona) => persona.id === id);
}
