import { createClient } from '@supabase/supabase-js';

interface SeedUser {
  email: string;
  password: string;
  username: string;
  avatarChar: string;
  educationLevel: 'Form 1' | 'Form 2' | 'Form 3';
  favouriteSubjects: string[];
  activeCareerId: string;
  totalXp: number;
  simulatedSalary: number;
  leaderboardOptIn: boolean;
  isDemoSeed: boolean;
}

const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'DemoStudent123!';

const SEED_USERS: SeedUser[] = [
  {
    email: process.env.NEXT_PUBLIC_DEMO_EMAIL || 'demo.student@dreampath.example',
    password: DEMO_PASSWORD,
    username: 'Demo Student',
    avatarChar: 'D',
    educationLevel: 'Form 2',
    favouriteSubjects: ['Mathematics', 'Computing & Tech'],
    activeCareerId: 'software-engineer',
    totalXp: 0,
    simulatedSalary: 1860,
    leaderboardOptIn: false,
    isDemoSeed: false,
  },
  {
    email: 'tester.form1@dreampath.example',
    password: DEMO_PASSWORD,
    username: 'Student A (F1)',
    avatarChar: 'A',
    educationLevel: 'Form 1',
    favouriteSubjects: ['Science', 'Languages'],
    activeCareerId: 'future-doctor',
    totalXp: 0,
    simulatedSalary: 2250,
    leaderboardOptIn: false,
    isDemoSeed: false,
  },
  {
    email: 'tester.form2@dreampath.example',
    password: DEMO_PASSWORD,
    username: 'Student B (F2)',
    avatarChar: 'B',
    educationLevel: 'Form 2',
    favouriteSubjects: ['Mathematics', 'Computing & Tech'],
    activeCareerId: 'software-engineer',
    totalXp: 0,
    simulatedSalary: 1860,
    leaderboardOptIn: false,
    isDemoSeed: false,
  },
  {
    email: 'tester.form3@dreampath.example',
    password: DEMO_PASSWORD,
    username: 'Student C (F3)',
    avatarChar: 'C',
    educationLevel: 'Form 3',
    favouriteSubjects: ['Art & Design', 'Business & Economics'],
    activeCareerId: 'product-designer',
    totalXp: 0,
    simulatedSalary: 1650,
    leaderboardOptIn: false,
    isDemoSeed: false,
  },
  {
    email: 'seed.pixel_aiman@dreampath.example',
    password: DEMO_PASSWORD,
    username: '@pixel_aiman',
    avatarChar: 'A',
    educationLevel: 'Form 3',
    favouriteSubjects: ['Mathematics', 'Computing & Tech'],
    activeCareerId: 'software-engineer',
    totalXp: 1420,
    simulatedSalary: 3250,
    leaderboardOptIn: true,
    isDemoSeed: true,
  },
  {
    email: 'seed.nurul_lex@dreampath.example',
    password: DEMO_PASSWORD,
    username: '@nurul_lex',
    avatarChar: 'N',
    educationLevel: 'Form 3',
    favouriteSubjects: ['Languages', 'Business & Economics'],
    activeCareerId: 'junior-lawyer',
    totalXp: 1310,
    simulatedSalary: 2980,
    leaderboardOptIn: true,
    isDemoSeed: true,
  },
  {
    email: 'seed.dr_farah@dreampath.example',
    password: DEMO_PASSWORD,
    username: '@dr_farah',
    avatarChar: 'F',
    educationLevel: 'Form 2',
    favouriteSubjects: ['Science', 'Mathematics'],
    activeCareerId: 'future-doctor',
    totalXp: 1240,
    simulatedSalary: 3420,
    leaderboardOptIn: true,
    isDemoSeed: true,
  },
  {
    email: 'seed.ux_mei@dreampath.example',
    password: DEMO_PASSWORD,
    username: '@ux_mei',
    avatarChar: 'M',
    educationLevel: 'Form 2',
    favouriteSubjects: ['Art & Design', 'Computing & Tech'],
    activeCareerId: 'product-designer',
    totalXp: 1080,
    simulatedSalary: 2680,
    leaderboardOptIn: true,
    isDemoSeed: true,
  },
  {
    email: 'seed.chef_danial@dreampath.example',
    password: DEMO_PASSWORD,
    username: '@chef_danial',
    avatarChar: 'D',
    educationLevel: 'Form 1',
    favouriteSubjects: ['Art & Design', 'Business & Economics'],
    activeCareerId: 'master-chef',
    totalXp: 960,
    simulatedSalary: 2410,
    leaderboardOptIn: true,
    isDemoSeed: true,
  },
  {
    email: 'seed.coder_syafiq@dreampath.example',
    password: DEMO_PASSWORD,
    username: '@coder_syafiq',
    avatarChar: 'S',
    educationLevel: 'Form 2',
    favouriteSubjects: ['Computing & Tech', 'Mathematics'],
    activeCareerId: 'software-engineer',
    totalXp: 840,
    simulatedSalary: 2390,
    leaderboardOptIn: true,
    isDemoSeed: true,
  },
  {
    email: 'seed.lex_kavita@dreampath.example',
    password: DEMO_PASSWORD,
    username: '@lex_kavita',
    avatarChar: 'K',
    educationLevel: 'Form 3',
    favouriteSubjects: ['Languages', 'Science'],
    activeCareerId: 'junior-lawyer',
    totalXp: 760,
    simulatedSalary: 2210,
    leaderboardOptIn: true,
    isDemoSeed: true,
  },
  {
    email: 'seed.med_hariz@dreampath.example',
    password: DEMO_PASSWORD,
    username: '@med_hariz',
    avatarChar: 'H',
    educationLevel: 'Form 1',
    favouriteSubjects: ['Science', 'Languages'],
    activeCareerId: 'future-doctor',
    totalXp: 680,
    simulatedSalary: 2540,
    leaderboardOptIn: true,
    isDemoSeed: true,
  },
];

const SKILL_IDS = [
  'html-css',
  'javascript',
  'problem-solving',
  'communication',
  'accessibility',
] as const;

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    console.error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Set them in .env.local before running npm run seed.'
    );
    process.exit(1);
  }

  const admin = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: existingList, error: listError } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  if (listError) {
    throw listError;
  }

  const existingByEmail = new Map(
    (existingList?.users ?? [])
      .filter((u) => Boolean(u.email))
      .map((u) => [u.email!.toLowerCase(), u.id])
  );

  for (const seed of SEED_USERS) {
    let userId = existingByEmail.get(seed.email.toLowerCase());

    if (!userId) {
      const { data: created, error: createError } = await admin.auth.admin.createUser({
        email: seed.email,
        password: seed.password,
        email_confirm: true,
      });
      if (createError || !created.user) {
        throw createError ?? new Error(`Failed to create seed user ${seed.email}`);
      }
      userId = created.user.id;
    }

    const { error: profileError } = await admin.from('profiles').upsert(
      {
        id: userId,
        username: seed.username,
        avatar_char: seed.avatarChar,
        education_level: seed.educationLevel,
        favourite_subjects: seed.favouriteSubjects,
        active_career_id: seed.activeCareerId,
        consent_accepted_at: new Date().toISOString(),
        leaderboard_opt_in: seed.leaderboardOptIn,
        locale: 'en',
        is_demo_seed: seed.isDemoSeed,
      },
      { onConflict: 'id' }
    );
    if (profileError) throw profileError;

    const currentLevel = Math.max(1, Math.floor(seed.totalXp / 300) + 1);
    const { error: progressError } = await admin.from('user_progress').upsert(
      {
        id: userId,
        total_xp: seed.totalXp,
        simulated_salary: seed.simulatedSalary,
        current_level: currentLevel,
        streak_days: 0,
        missions_completed: 0,
        completed_quests: [],
        completed_activity_ids: [],
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );
    if (progressError) throw progressError;

    const skillRows = SKILL_IDS.map((skillId) => ({
      id: userId,
      skill_id: skillId,
      xp: 0,
      competency: 0,
    }));
    const { error: skillsError } = await admin
      .from('user_skills')
      .upsert(skillRows, { onConflict: 'id,skill_id' });
    if (skillsError) throw skillsError;
  }

  console.log(`Seeded ${SEED_USERS.length} dummy/demo accounts idempotently.`);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
