-- DreamPath Nebula Schema & Row-Level Security
-- Privacy-minimal schema for ages 13-15 (PDPA / ethics aligned)

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  avatar_char TEXT NOT NULL DEFAULT 'D',
  education_level TEXT NOT NULL DEFAULT 'Form 2' CHECK (education_level IN ('Form 1', 'Form 2', 'Form 3')),
  favourite_subjects TEXT[] NOT NULL DEFAULT ARRAY['Mathematics', 'Computing & Tech']::TEXT[],
  active_career_id TEXT NOT NULL DEFAULT 'software-engineer',
  consent_accepted_at TIMESTAMPTZ,
  leaderboard_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
  locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'ms')),
  is_demo_seed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp INTEGER NOT NULL DEFAULT 0 CHECK (total_xp >= 0),
  simulated_salary INTEGER NOT NULL DEFAULT 1860 CHECK (simulated_salary >= 0),
  current_level INTEGER NOT NULL DEFAULT 1 CHECK (current_level >= 1),
  streak_days INTEGER NOT NULL DEFAULT 0 CHECK (streak_days >= 0),
  missions_completed INTEGER NOT NULL DEFAULT 0 CHECK (missions_completed >= 0),
  completed_quests TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  completed_activity_ids TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_skills (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL CHECK (
    skill_id IN ('html-css', 'javascript', 'problem-solving', 'communication', 'accessibility')
  ),
  xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
  competency INTEGER NOT NULL DEFAULT 0 CHECK (competency >= 0 AND competency <= 100),
  PRIMARY KEY (id, skill_id)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;

-- Profiles RLS: user can only read/write own row
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_delete_own"
  ON public.profiles FOR DELETE
  USING (auth.uid() = id);

-- User Progress RLS
CREATE POLICY "user_progress_select_own"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "user_progress_insert_own"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "user_progress_update_own"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "user_progress_delete_own"
  ON public.user_progress FOR DELETE
  USING (auth.uid() = id);

-- User Skills RLS
CREATE POLICY "user_skills_select_own"
  ON public.user_skills FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "user_skills_insert_own"
  ON public.user_skills FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "user_skills_update_own"
  ON public.user_skills FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "user_skills_delete_own"
  ON public.user_skills FOR DELETE
  USING (auth.uid() = id);

-- Public Leaderboard View: exposes ONLY anonymized public columns
-- Excludes email, consent_accepted_at, and non-opted-in real accounts.
CREATE OR REPLACE VIEW public.public_leaderboard AS
SELECT
  p.username,
  p.avatar_char,
  up.total_xp,
  up.simulated_salary,
  p.active_career_id
FROM public.profiles AS p
INNER JOIN public.user_progress AS up ON up.id = p.id
WHERE p.leaderboard_opt_in = TRUE OR p.is_demo_seed = TRUE
ORDER BY up.total_xp DESC;

GRANT SELECT ON public.public_leaderboard TO anon, authenticated;
