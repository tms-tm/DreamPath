export interface UniversityInfo {
  short: string;
  name: string;
  type: string;
  apply: string;
}

export interface CareerRoute {
  spm: string;
  preU: [string, string];
  degree: [string, string];
  total: string;
}

export interface CareerSalary {
  entry: [number, number];
  mid: [number, number];
  senior: [number, number];
}

export interface CareerData {
  id: string;
  name: string;
  icon: string;
  tint: string;
  job: string;
  matched: number;
  reason: string;
  salary: CareerSalary;
  routes: Record<string, CareerRoute>;
}

export const UNIS: Record<string, UniversityInfo> = {
  um: {
    short: 'UM',
    name: 'Universiti Malaya',
    type: 'Public university',
    apply: 'Apply through UPU after your SPM results.',
  },
  uitm: {
    short: 'UiTM',
    name: 'Universiti Teknologi MARA',
    type: 'Public university',
    apply: 'Apply through UPU after your SPM results.',
  },
  sunway: {
    short: 'Sunway',
    name: 'Sunway University',
    type: 'Private university',
    apply: 'Apply directly to Sunway University.',
  },
  mmu: {
    short: 'MMU',
    name: 'Multimedia University',
    type: 'Private university',
    apply: 'Apply directly to Multimedia University.',
  },
};

export const SPM_REQUIREMENTS: Record<string, string[]> = {
  sciPublic: [
    'Credit in Mathematics',
    'Credit in Additional Mathematics',
    'Credit in Physics or Chemistry',
    'Pass in Bahasa Melayu and Sejarah',
  ],
  sciDiploma: [
    'Credit in Mathematics',
    'Credit in a science subject',
    'Pass in English',
    'Pass in Bahasa Melayu and Sejarah',
  ],
  sciPrivate: [
    '5 credits, including Mathematics',
    'Credit in Additional Mathematics or a science',
    'Pass in English',
    'Pass in Bahasa Melayu and Sejarah',
  ],
  artPublic: [
    'Credit in Pendidikan Seni Visual, or a portfolio',
    'Credit in Mathematics',
    'Pass in English',
    'Pass in Bahasa Melayu and Sejarah',
  ],
  artPrivate: [
    '5 credits, including Mathematics',
    'A small portfolio of your drawings',
    'Pass in English',
    'Pass in Bahasa Melayu and Sejarah',
  ],
};

export const CAREERS: Record<string, CareerData> = {
  se: {
    id: 'se',
    name: 'Software Engineer',
    icon: 'code',
    tint: 'lilac',
    job: 'Junior Software Engineer',
    matched: 4,
    reason: 'Uses your problem solving, logical thinking and attention to detail.',
    salary: { entry: [3500, 5000], mid: [6000, 9000], senior: [10000, 15000] },
    routes: {
      um: {
        spm: 'sciPublic',
        preU: ['Asasi Sains UM, Matrikulasi or STPM', '1 to 2 years'],
        degree: ['Bachelor of Computer Science (Software Engineering)', 'About 4 years'],
        total: 'About 5 to 6 years after SPM',
      },
      uitm: {
        spm: 'sciDiploma',
        preU: ['Diploma in Computer Science', 'About 3 years'],
        degree: ['Bachelor of Computer Science (Hons.)', 'About 3 years'],
        total: 'About 6 years after SPM',
      },
      sunway: {
        spm: 'sciPrivate',
        preU: ['Foundation in Science and Technology', 'About 1 year'],
        degree: ['Bachelor of Software Engineering (Hons)', 'About 3 years'],
        total: 'About 4 years after SPM',
      },
      mmu: {
        spm: 'sciPrivate',
        preU: ['Foundation in Information Technology', 'About 1 year'],
        degree: ['Bachelor of Computer Science (Hons.) Software Engineering', 'About 3 years'],
        total: 'About 4 years after SPM',
      },
    },
  },
  da: {
    id: 'da',
    name: 'Data Analyst',
    icon: 'data_usage',
    tint: 'mint',
    job: 'Junior Data Analyst',
    matched: 3,
    reason: 'Uses your logical thinking and attention to detail with numbers.',
    salary: { entry: [3000, 4500], mid: [5000, 7500], senior: [8000, 12000] },
    routes: {
      um: {
        spm: 'sciPublic',
        preU: ['Asasi Sains UM, Matrikulasi or STPM', '1 to 2 years'],
        degree: ['Bachelor of Computer Science (Data Science)', 'About 4 years'],
        total: 'About 5 to 6 years after SPM',
      },
      uitm: {
        spm: 'sciDiploma',
        preU: ['Diploma in Statistics', 'About 3 years'],
        degree: ['Bachelor of Science (Hons.) Statistics', 'About 3 years'],
        total: 'About 6 years after SPM',
      },
      sunway: {
        spm: 'sciPrivate',
        preU: ['Foundation in Science and Technology', 'About 1 year'],
        degree: ['Bachelor of Science (Hons) Data Analytics', 'About 3 years'],
        total: 'About 4 years after SPM',
      },
      mmu: {
        spm: 'sciPrivate',
        preU: ['Foundation in Information Technology', 'About 1 year'],
        degree: ['Bachelor of Computer Science (Hons.) Data Science', 'About 3 years'],
        total: 'About 4 years after SPM',
      },
    },
  },
  ux: {
    id: 'ux',
    name: 'UX Designer',
    icon: 'palette',
    tint: 'pink',
    job: 'Junior UX Designer',
    matched: 3,
    reason: 'Uses your creativity and communication to design apps people enjoy.',
    salary: { entry: [3000, 4500], mid: [5000, 8000], senior: [9000, 13000] },
    routes: {
      um: {
        spm: 'sciPublic',
        preU: ['Asasi Sains UM, Matrikulasi or STPM', '1 to 2 years'],
        degree: ['Bachelor of Computer Science (Multimedia Computing)', 'About 4 years'],
        total: 'About 5 to 6 years after SPM',
      },
      uitm: {
        spm: 'artPublic',
        preU: ['Diploma in Graphic Design', 'About 3 years'],
        degree: ['Bachelor of Art and Design (Hons.) Graphic Design', 'About 3 years'],
        total: 'About 6 years after SPM',
      },
      sunway: {
        spm: 'artPrivate',
        preU: ['Foundation in Arts', 'About 1 year'],
        degree: ['Bachelor of Design (Hons) Interface Design', 'About 3 years'],
        total: 'About 4 years after SPM',
      },
      mmu: {
        spm: 'artPrivate',
        preU: ['Foundation in Creative Multimedia', 'About 1 year'],
        degree: ['Bachelor of Multimedia (Hons.) Interface Design', 'About 3 years'],
        total: 'About 4 years after SPM',
      },
    },
  },
};

export type CardType = 'matches' | 'route' | 'salary';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'dreamy';
  text?: string;
  cardType?: CardType;
  careerKey?: string;
  uniKey?: string;
}
