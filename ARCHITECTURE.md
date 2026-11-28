# ARCHITECTURE.md — DreamPath Codebase Architecture

This document defines how DreamPath is structured so a solo developer can build, test, and extend careers and features cleanly without accumulating hardcoded pages or spaghetti state.

---

## 1. Feature-Folder Structure

```text
src/
├── app/                          # Next.js App Router: thin route entrypoints + API routes ONLY
│   ├── onboarding/
│   │   ├── page.tsx              # Step 1 Entry (Login, Register + Consent, Demo Student)
│   │   ├── profile/page.tsx      # Step 2 Academic Profile (Form 1-3 + subjects)
│   │   ├── invite/page.tsx       # Step 3 Quiz Invitation (CSS planet + dev shortcut flag)
│   │   ├── quiz/page.tsx         # Step 4 8-question Personality Quiz
│   │   ├── results/page.tsx      # Step 5 Top 3 Career Matches
│   │   └── confirm/page.tsx      # Step 6 Confirmation -> locks activeCareerId
│   ├── api/
│   │   └── account/delete/route.ts  # Server-only cascading delete (uses service-role key)
│   ├── ask-dreamy/page.tsx
│   ├── leaderboard/page.tsx
│   ├── modes/
│   │   ├── page.tsx
│   │   ├── quiz/page.tsx
│   │   └── study/page.tsx
│   ├── paths/page.tsx
│   ├── profile/page.tsx
│   ├── settings/page.tsx
│   ├── simulation/page.tsx
│   ├── layout.tsx
│   └── page.tsx                  # Home dashboard
│
├── components/
│   ├── ui/                       # THE ONLY shared UI primitive set (Button, Card, Badge, Input, Modal, ProgressBar, Tabs)
│   └── layout/                   # AppShell, Sidebar, MobileNav, Header
│
├── content/                      # Static, Zod-validated bilingual (en/ms) data files
│   ├── i18n/
│   │   ├── types.ts              # Shared UI dictionary interface
│   │   ├── en.ts
│   │   └── ms.ts
│   ├── careers.ts                # Master career definitions + registry
│   ├── dreamy-kb.ts              # Ask Dreamy structured answers & Malaysian uni/SPM routes
│   ├── onboarding-quiz.ts        # 8-question quiz, trait/subject weights matrix, EN/BM match templates
│   ├── scenarios/                # One file per career (<careerId>.ts) + index registry
│   ├── quizzes/                  # One file per career (<careerId>.ts) + index registry
│   ├── studies/                  # One file per career (<careerId>.ts) + index registry
│   └── schemas.ts                # Zod schemas validating all content at test/build time
│
├── features/                     # Self-contained domain slices
│   ├── auth/                     # Auth forms, consent checkbox, session hooks, Demo Student entry
│   ├── careers/                  # Career explorer cards, roadmap renderer, SPM/uni pathway view
│   ├── dreamy/                   # AskDreamyOverlay, DreamyMascot (Three.js), intent matcher, cards
│   ├── leaderboard/              # Public leaderboard query, podium, filterable table
│   ├── onboarding/               # 6-step onboarding views (Entry, AcademicProfile, Invite, Quiz, Results, Confirm)
│   ├── practice/                 # StudyReader, QuizPlayer, ScenarioPlayer (graph walker)
│   ├── profile/                  # Student profile stats, skills breakdown, opt-in, retake-quiz & switch-career
│   ├── progression/              # Pure XP, level, star, and salary math + Zustand store + Supabase sync
│   └── settings/                 # Language switch, audio/motion prefs, DeleteAccountModal
│
└── lib/
    ├── supabase/
    │   ├── client.ts             # Browser anon client
    │   ├── server.ts             # Server component / route handler client
    │   └── admin.ts              # Server-ONLY service-role client (never imported by 'use client')
    ├── career-matching.ts        # Pure deterministic scoring & bilingual match-reason builder
    ├── i18n.ts                   # Locale selector helper
    └── cn.ts                     # clsx + tailwind-merge helper

supabase/
├── migrations/                   # Versioned SQL DDL + RLS policies + public leaderboard view
└── seed.ts                       # Dummy test accounts & seeded fake leaderboard players

tests/                            # Unit & content-integrity tests (Vitest)
├── career-matching.test.ts       # Deterministic top-3 ranking, tie-breaking, bilingual reasons
├── progression.test.ts           # XP, level, stars, salary formula tests
├── scenario-graph.test.ts        # Reachability, valid nextNodeId, terminal node checks
└── content-schema.test.ts        # Validates every career/scenario/quiz/lesson with Zod & EN/BM parity
```

---

## 2. Architectural Rules

1. **Thin Routes:** Files under `src/app/**/page.tsx` must stay tiny — read route/search params or server session, then render a feature view from `src/features/*`. Never put business logic, SQL queries, or hardcoded mock arrays inside `page.tsx`.
2. **One Direction of Dependencies:**
   `src/app/` → `src/features/` → `src/components/ui/` + `src/content/` + `src/lib/`.
   Features must **not** import internals from other features except public exports from `features/progression` (e.g., `useProgressionStore`, `awardXp`) or `lib/`.
3. **Pure Game Math:** All XP, level, star-rating, and virtual salary calculations live as pure TypeScript functions in `src/features/progression/math.ts` with zero React or Supabase imports. Both client optimistic state and server persistence call the exact same math.
4. **One UI Component Set:** Always build screens with primitives in `src/components/ui/`. Do not install a second component library or hand-roll inconsistent card/button styles inside features.
5. **Tokens Only:** Colors come strictly from Tailwind theme tokens mapped in `globals.css` / `tailwind.config.js` (`bg-surface`, `bg-surface-container-lowest`, `bg-primary-container`, `text-on-surface`, `border-hairline`). Raw clinical hex values (`#2563EB`, `#F8FAFC`, `#0e1224`) are forbidden and flagged in review/lint.
6. **Zero Hardcoded Career Branches:** Components never write `if (careerId === 'software-engineer')`. All titles, skills, salaries, scenarios, quizzes, and lessons are looked up from `src/content/` registries by `careerId`.
7. **Strict Server/Client Boundary for Privacy:** `SUPABASE_SERVICE_ROLE_KEY` is read only inside `src/lib/supabase/admin.ts` and `src/app/api/**`. `profiles` private columns (`email`, `consent_accepted_at`) are protected by Supabase RLS (`auth.uid() = id`), while `/leaderboard` queries a restricted public SQL view (`username`, `avatar_char`, `total_xp`, `simulated_salary`, `active_career_id`).
8. **CI Gate:** Every pull request / push runs Prettier check, ESLint, `tsc --noEmit`, Vitest (including Zod + EN/BM content validation), and `next build`.
9. **Ephemeral Onboarding State & Dev Flag:** `src/features/onboarding/` holds in-progress 8-question `answers` and transient `top3` match results in client memory only (never written to `localStorage` or Supabase); only `educationLevel`, `favouriteSubjects`, and `activeCareerId` persist upon Step 6 (`/onboarding/confirm`), and `/profile` "Retake Quiz" jumps to `/onboarding/quiz` with saved `educationLevel` and `favouriteSubjects`. The dev-only "jump to Step 3" shortcut must be gated by `process.env.NEXT_PUBLIC_DEV_SHORTCUTS === 'true'`.

---

## 3. How to Add a Career

Adding a new career requires **zero changes** to routes, UI components, or database migrations (assuming skills come from the shared `SkillId` set):

1. **Register Career Metadata (`src/content/careers.ts`):**
   Add a new entry to `CAREERS` with unique `id` (kebab-case), `family`, `icon`, `baseSalary`, `salaryRange` + `salarySource`, `coreSkills`, and complete `i18n.en` and `i18n.ms` metadata (including Malaysian SPM subjects & university pathways).
2. **Add Ask Dreamy Knowledge (`src/content/dreamy-kb.ts`):**
   Add entry/mid/senior salary bands, Malaysian public/private university routes, and keyword triggers (in EN & BM) for the new `careerId`.
3. **Add Career Matching Weights (`src/content/onboarding-quiz.ts`):**
   Add `subjectWeights` and `traitWeights` for the new `careerId` so it can be matched during onboarding.
4. **Author Content Files (EN + BM):**
   - `src/content/studies/<careerId>.ts` — at least 2 study lessons (30 XP each).
   - `src/content/quizzes/<careerId>.ts` — at least 2 quizzes (5 questions each).
   - `src/content/scenarios/<careerId>.ts` — at least 2 branching scenario graphs with valid `startNodeId`, decision/mentor nodes, and terminal outcomes.
5. **Export from Registries:**
   Import and add the career's arrays to `src/content/studies/index.ts`, `quizzes/index.ts`, and `scenarios/index.ts`.
6. **Verify Automatically:**
   Run the test suite (`vitest run`). `content-schema.test.ts`, `scenario-graph.test.ts`, and `career-matching.test.ts` automatically verify Zod shapes, exact 5-question quizzes, no dead scenario links, matrix coverage for every career, and zero missing `en`/`ms` strings. Spot-check all facts and Bahasa Malaysia phrasing before merging.

---

## 4. How to Change a Quiz Question or Add a Career to the Matrix

1. **Change an Onboarding Quiz Question:**
   Edit the question or its 4 options in `src/content/onboarding-quiz.ts`, updating both `i18n.en` and `i18n.ms` plus `primaryTrait` / `secondaryTrait` (`AN | CR | SO | BU | EN`). Keep the total count at **8 questions** and **4 options** each.
2. **Add or Tune a Career in the Matrix:**
   In `src/content/onboarding-quiz.ts`, add or update `careerWeights[careerId]` with `subjectWeights` (`1..3` for relevant subjects) and `traitWeights` (`1..3` for relevant traits). Every `careerId` in `src/content/careers.ts` must have an entry.
3. **Verify:**
   Run `vitest run` so `content-schema.test.ts` and `career-matching.test.ts` validate bilingual parity, trait/subject keys, deterministic top-3 output, and tie-breaking.

---

## 5. How to Add a Feature

1. **Check `SPEC.md` & `IDEAS.md`:** Confirm the feature is in scope and check which existing UI primitives and tokens it uses.
2. **Create a Feature Slice (`src/features/<feature-name>/`):**
   - `types.ts` / `schemas.ts` (Zod validation if handling input/API data)
   - `logic.ts` (pure state/domain helpers, testable without DOM)
   - `<FeatureView>.tsx` + focused child components (using `src/components/ui/*` and `DESIGN.md` tokens only)
3. **Add i18n Keys:** Add all user-visible labels to `src/content/i18n/types.ts`, `en.ts`, and `ms.ts`.
4. **Add Tests:** Write unit tests in `tests/` for `logic.ts` and schema checks before or alongside the UI.
5. **Wire Route & Nav (if needed):** Create a thin `src/app/<route>/page.tsx` rendering `<FeatureView />`. Keep the 5-item sidebar invariant unless `SPEC.md` explicitly changes navigation.
6. **Verify:** Run Prettier, ESLint, `tsc --noEmit`, Vitest, and `next build`.
