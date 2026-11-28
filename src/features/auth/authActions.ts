import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { hydrateFromSupabase } from '@/features/progression/sync';

export interface AuthActionResult {
  ok: boolean;
  error?: string;
  usedSupabase: boolean;
  userId?: string;
}

const DEMO_EMAIL =
  process.env.NEXT_PUBLIC_DEMO_EMAIL || 'demo.student@dreampath.example';
const DEMO_PASSWORD =
  process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'DemoStudent123!';

export async function signUpStudent(params: {
  nickname: string;
  email: string;
  password: string;
  consentAcceptedAt: string;
}): Promise<AuthActionResult> {
  if (!params.consentAcceptedAt) {
    return {
      ok: false,
      usedSupabase: false,
      error: 'Parent or guardian permission is required to create an account.',
    };
  }

  if (!isSupabaseConfigured()) {
    return { ok: true, usedSupabase: false };
  }

  const supabase = createSupabaseBrowserClient();
  if (!supabase) {
    return { ok: true, usedSupabase: false };
  }

  const { data, error } = await supabase.auth.signUp({
    email: params.email.trim(),
    password: params.password,
  });

  if (error) {
    return { ok: false, usedSupabase: true, error: error.message };
  }

  const userId = data.user?.id;
  if (userId) {
    const avatarChar = params.nickname.trim().charAt(0).toUpperCase() || 'D';
    await supabase.from('profiles').upsert(
      {
        id: userId,
        username: params.nickname.trim(),
        avatar_char: avatarChar,
        education_level: 'Form 2',
        favourite_subjects: ['Mathematics', 'Computing & Tech'],
        active_career_id: 'software-engineer',
        consent_accepted_at: params.consentAcceptedAt,
        leaderboard_opt_in: false,
        locale: 'en',
        is_demo_seed: false,
      },
      { onConflict: 'id' }
    );

    await supabase.from('user_progress').upsert(
      {
        id: userId,
        total_xp: 0,
        simulated_salary: 1860,
        current_level: 1,
        streak_days: 0,
        missions_completed: 0,
        completed_quests: [],
        completed_activity_ids: [],
      },
      { onConflict: 'id' }
    );
  }

  return { ok: true, usedSupabase: true, userId };
}

export async function signInStudent(params: {
  email: string;
  password: string;
}): Promise<AuthActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, usedSupabase: false };
  }

  const supabase = createSupabaseBrowserClient();
  if (!supabase) {
    return { ok: true, usedSupabase: false };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: params.email.trim(),
    password: params.password,
  });

  if (error || !data.user) {
    return {
      ok: false,
      usedSupabase: true,
      error: error?.message ?? 'Invalid email or password.',
    };
  }

  await hydrateFromSupabase(data.user.id);
  return { ok: true, usedSupabase: true, userId: data.user.id };
}

export async function signInDemoStudent(): Promise<AuthActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, usedSupabase: false };
  }

  const supabase = createSupabaseBrowserClient();
  if (!supabase) {
    return { ok: true, usedSupabase: false };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
  });

  if (error || !data.user) {
    // Graceful local demo fallback if remote project hasn't run seed yet
    return { ok: true, usedSupabase: false };
  }

  await hydrateFromSupabase(data.user.id);
  return { ok: true, usedSupabase: true, userId: data.user.id };
}

export async function signOutStudent(): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}
