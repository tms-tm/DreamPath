import { CAREERS } from '@/content/careers';
import { computeSimulatedSalary, type SkillProgress } from '@/features/progression/math';
import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import type { SkillId } from '@/types/career';
import type { EducationLevel } from '@/features/profile/useProfileStore';

const DEFAULT_SKILLS: Record<SkillId, SkillProgress> = {
  'html-css': { xp: 0, competency: 0 },
  javascript: { xp: 0, competency: 0 },
  'problem-solving': { xp: 0, competency: 0 },
  communication: { xp: 0, competency: 0 },
  accessibility: { xp: 0, competency: 0 },
};

function getBaseSalary(careerId: string): number {
  return CAREERS.find((c) => c.id === careerId)?.baseSalary ?? 5000;
}

export async function syncProfileToSupabase(fields: {
  username?: string;
  avatar_char?: string;
  education_level?: EducationLevel;
  favourite_subjects?: string[];
  active_career_id?: string;
  consent_accepted_at?: string | null;
  leaderboard_opt_in?: boolean;
  locale?: 'en' | 'ms';
}): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('profiles').update(fields).eq('id', user.id);
}

export async function syncProgressToSupabase(payload: {
  totalXp: number;
  simulatedSalary: number;
  currentLevel: number;
  streakDays: number;
  missionsCompleted: number;
  completedQuests: string[];
  completedActivityIds: string[];
  skills: Record<SkillId, SkillProgress>;
}): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('user_progress').upsert(
    {
      id: user.id,
      total_xp: payload.totalXp,
      simulated_salary: payload.simulatedSalary,
      current_level: payload.currentLevel,
      streak_days: payload.streakDays,
      missions_completed: payload.missionsCompleted,
      completed_quests: payload.completedQuests,
      completed_activity_ids: payload.completedActivityIds,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );

  const skillRows = (Object.keys(payload.skills) as SkillId[]).map((skillId) => ({
    id: user.id,
    skill_id: skillId,
    xp: payload.skills[skillId]?.xp ?? 0,
    competency: payload.skills[skillId]?.competency ?? 0,
  }));

  if (skillRows.length > 0) {
    await supabase.from('user_skills').upsert(skillRows, { onConflict: 'id,skill_id' });
  }
}

export async function hydrateFromSupabase(userId: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return;

  const [{ data: profileRow }, { data: progressRow }, { data: skillRows }] = await Promise.all([
    supabase
      .from('profiles')
      .select(
        'username, avatar_char, education_level, favourite_subjects, active_career_id, leaderboard_opt_in, locale'
      )
      .eq('id', userId)
      .maybeSingle(),
    supabase
      .from('user_progress')
      .select(
        'total_xp, simulated_salary, current_level, streak_days, missions_completed, completed_quests, completed_activity_ids'
      )
      .eq('id', userId)
      .maybeSingle(),
    supabase.from('user_skills').select('skill_id, xp, competency').eq('id', userId),
  ]);

  const [{ useProfileStore }, { useSettingsStore }, { useProgressionStore }] = await Promise.all([
    import('@/features/profile/useProfileStore'),
    import('@/features/settings/useSettingsStore'),
    import('@/features/progression/useProgressionStore'),
  ]);

  const nextCareerId = profileRow?.active_career_id ?? 'software-engineer';
  const nextNickname = profileRow?.username ?? 'Student';
  const nextAvatar = profileRow?.avatar_char ?? (nextNickname.charAt(0).toUpperCase() || 'D');

  if (profileRow) {
    useProfileStore.setState({
      nickname: nextNickname,
      avatarChar: nextAvatar,
      educationLevel: (profileRow.education_level as EducationLevel) ?? 'Form 2',
      favouriteSubjects: Array.isArray(profileRow.favourite_subjects)
        ? profileRow.favourite_subjects
        : ['Mathematics', 'Computing & Tech'],
      activeCareerId: nextCareerId,
      leaderboardOptIn: Boolean(profileRow.leaderboard_opt_in),
    });

    if (profileRow.locale === 'en' || profileRow.locale === 'ms') {
      useSettingsStore.setState({ locale: profileRow.locale });
    }
  }

  const nextSkills: Record<SkillId, SkillProgress> = { ...DEFAULT_SKILLS };
  for (const row of skillRows ?? []) {
    const sid = row.skill_id as SkillId;
    if (sid in nextSkills) {
      nextSkills[sid] = { xp: row.xp ?? 0, competency: row.competency ?? 0 };
    }
  }

  if (progressRow) {
    const totalXp = progressRow.total_xp ?? 0;
    const simulatedSalary = computeSimulatedSalary(getBaseSalary(nextCareerId), totalXp, nextSkills);
    useProgressionStore.setState((prev) => ({
      totalXp,
      simulatedSalary,
      skills: nextSkills,
      completedQuests: Array.isArray(progressRow.completed_quests)
        ? progressRow.completed_quests
        : [],
      completedActivityIds: Array.isArray(progressRow.completed_activity_ids)
        ? progressRow.completed_activity_ids
        : [],
      profile: {
        ...prev.profile,
        name: nextNickname,
        avatarChar: nextAvatar,
        activeCareerId: nextCareerId,
        currentLevel: progressRow.current_level ?? 1,
        streakDays: progressRow.streak_days ?? 0,
        missionsCompleted: progressRow.missions_completed ?? 0,
      },
    }));
  }
}
