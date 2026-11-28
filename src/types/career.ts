export type TierId = 'nebula';

export interface EducationTier {
  id: TierId;
  name: string;
  targetAge: string;
  gradeDesc: string;
  phase: string;
  description: string;
  quizQuestionsCount: number;
  xpPerQuiz: number;
  checkpointXp: number;
}

export const EDUCATION_TIERS: Record<TierId, EducationTier> = {
  nebula: {
    id: 'nebula',
    name: 'Nebula',
    targetAge: 'Ages 13–15',
    gradeDesc: 'Lower Secondary (Form 1–3)',
    phase: 'Explore & Plan',
    description: 'Goal-setting roadmaps, realistic case studies, and Malaysian SPM subject path mapping.',
    quizQuestionsCount: 5,
    xpPerQuiz: 40,
    checkpointXp: 80,
  },
};

export type SkillId = 'html-css' | 'javascript' | 'problem-solving' | 'communication' | 'accessibility';

export interface Career {
  id: string;
  title: string;
  subtitle: string;
  family: 'technology' | 'law' | 'healthcare' | 'design' | 'culinary';
  tierLevel: number;
  stageInfo: string;
  progressPercent: number;
  description: string;
  baseSalary: number; // in MYR/USD, e.g. 5200
  onetCode?: string;
  escoUri?: string;
  tags: string[];
  icon: string; // lucide icon identifier
}

export const CAREER_PATHS: Career[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    subtitle: 'Build a friendly study app & secure digital systems',
    family: 'technology',
    tierLevel: 3,
    stageInfo: 'Stage 3 of 8',
    progressPercent: 38,
    description: 'Design interactive web apps, squash security vulnerabilities, and solve logic algorithms.',
    baseSalary: 6200,
    onetCode: '15-1252.00',
    escoUri: 'http://data.europa.eu/esco/occupation/2512',
    tags: ['Web Dev', 'Cybersecurity', 'Algorithm'],
    icon: 'Code2',
  },
  {
    id: 'junior-lawyer',
    title: 'Junior Lawyer',
    subtitle: 'Solve a fair playground case & review citizen contracts',
    family: 'law',
    tierLevel: 2,
    stageInfo: 'Stage 1 of 8',
    progressPercent: 12,
    description: 'Advocate for justice, analyze legal evidence, debate ethically, and uphold community fairness.',
    baseSalary: 5500,
    onetCode: '23-1011.00',
    escoUri: 'http://data.europa.eu/esco/occupation/2611',
    tags: ['Advocacy', 'Evidence', 'Ethics'],
    icon: 'Scale',
  },
  {
    id: 'future-doctor',
    title: 'Future Doctor',
    subtitle: 'Help a patient feel better & diagnose clinical cases',
    family: 'healthcare',
    tierLevel: 2,
    stageInfo: 'Stage 2 of 8',
    progressPercent: 25,
    description: 'Investigate symptoms, select patient treatments, and understand medical sciences.',
    baseSalary: 7500,
    onetCode: '29-1229.00',
    escoUri: 'http://data.europa.eu/esco/occupation/2212',
    tags: ['Diagnosis', 'Care', 'Biology'],
    icon: 'Stethoscope',
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    subtitle: 'Craft accessible interfaces and delightful prototypes',
    family: 'design',
    tierLevel: 2,
    stageInfo: 'Stage 2 of 8',
    progressPercent: 20,
    description: 'Form user wireframes, research accessibility criteria, and test UX interactions.',
    baseSalary: 5000,
    onetCode: '27-1024.00',
    escoUri: 'http://data.europa.eu/esco/occupation/2163',
    tags: ['UI/UX', 'Figma', 'Accessibility'],
    icon: 'Palette',
  },
  {
    id: 'master-chef',
    title: 'Master Chef',
    subtitle: 'Balance nutritional culinary recipes & kitchen pace',
    family: 'culinary',
    tierLevel: 1,
    stageInfo: 'Stage 1 of 6',
    progressPercent: 10,
    description: 'Lead culinary creation, balance taste with nutrition, and run sustainable kitchen operations.',
    baseSalary: 4500,
    onetCode: '35-1011.00',
    tags: ['Culinary', 'Nutrition', 'Management'],
    icon: 'UtensilsCrossed',
  },
];

