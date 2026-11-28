# TICKETS.md — DreamPath Implementation Tickets

## Content Freeze & Cut Order (Per `docs/INTERVIEW-NOTES.md`)

- **Content Freeze Date:** `______` *(Set ~1 week before assignment due date. Only owner-reviewed EN + BM content ships after freeze; unreviewed content does not ship.)*
- **Pre-Agreed Cut Order (if time runs short):**
  1. Dark mode
  2. LLM follow-ups for Ask Dreamy
  3. Core content beyond 6 per type per career
  4. Malay content beyond 3 per type per core career
  5. Resume builder
  6. Notifications
- **Never Cut:** Working core loop (Study → 5-Q Quiz → Scenario → XP/Salary/Profile/Leaderboard), real-student testing, consent & privacy basics, and Vitest tests for game maths.

---

## Phase 1: Cleanup & Tooling

### T-01: Delete root prototype extraction scripts
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Remove unreferenced Stitch extraction scripts from repo root.
- **Files (3):** `extract_explore.js` (delete), `extract_lb_prof.js` (delete), `preview_sections.js` (delete)
- **Blocked by:** None
- **Effort:** Low
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] All 3 listed `.js` files are deleted from the repository root.
  - [ ] `tsc --noEmit` and `eslint` still run without referencing the deleted files.

### T-02: Delete root inspection scripts and Stitch JSON snapshot
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Remove remaining root inspection scripts and raw Stitch JSON artifact.
- **Files (3):** `inspect_explore.js` (delete), `inspect_explore_sections.js` (delete), `stitch_home.json` (delete)
- **Blocked by:** None
- **Effort:** Low
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `inspect_explore.js`, `inspect_explore_sections.js`, and `stitch_home.json` are deleted.
  - [ ] No imports or scripts in `package.json` reference these files.

### T-03: Delete unused `stitch_screens` HTML exports from root
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Remove raw exported Stitch HTML directory from repo root.
- **Files (1 directory):** `stitch_screens/` (delete)
- **Blocked by:** None
- **Effort:** Low
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `stitch_screens/` is removed from the repository root.
  - [ ] Repo root contains only project config, docs, `public/`, `scripts/`, and `src/`.

### T-04: Configure Prettier, ESLint formatting rules, and patch Next.js 16.x
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Set up Prettier + ESLint compatibility and upgrade Next.js past `16.4.4` `SecurityFatalError`.
- **Files (3):** `package.json`, `.prettierrc`, `eslint.config.mjs`
- **Blocked by:** None
- **Effort:** Medium
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `prettier` is installed and `.prettierrc` enforces consistent repo formatting.
  - [ ] `eslint.config.mjs` runs cleanly via `npm run lint` without conflicting with Prettier.
  - [ ] `next` is upgraded to a patched `16.x` release so `npm run build` completes with exit code `0`.

### T-05: Set up Vitest test runner and smoke test
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Add Vitest configuration and verify test execution works.
- **Files (3):** `package.json`, `vitest.config.ts`, `tests/smoke.test.ts`
- **Blocked by:** T-04
- **Effort:** Medium
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `vitest` is installed and configured with `@/` path alias resolution matching `tsconfig.json`.
  - [ ] `npm test` (`vitest run`) executes `tests/smoke.test.ts` and passes.

### T-06: Add GitHub Actions CI gate workflow
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Automate format, lint, typecheck, test, and build checks on push/PR.
- **Files (2):** `.github/workflows/ci.yml`, `package.json`
- **Blocked by:** T-04, T-05
- **Effort:** Medium
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `package.json` defines `format:check`, `lint`, `typecheck`, `test`, and `build` scripts.
  - [ ] `.github/workflows/ci.yml` runs all five checks on `push` and `pull_request` and passes on a clean branch.

### T-07: Remove `/achievements` page, old aptitude quiz, and multi-tier metadata
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Delete removed `/achievements` route and unused `src/data/aptitude.ts`; scope root metadata to Nebula tier.
- **Files (3):** `src/app/achievements/page.tsx` (delete), `src/data/aptitude.ts` (delete), `src/app/layout.tsx`
- **Blocked by:** T-06
- **Effort:** Low
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `/achievements` route and `src/data/aptitude.ts` are deleted (confirming `/parent` is also absent).
  - [ ] `src/app/layout.tsx` metadata mentions only Nebula tier (ages 13–15, Form 1–3) with zero Moonrise/Starlight/Aurora/Galaxy references.
  - [ ] `npm run build` succeeds without broken route references.

### T-08: Strip removed tier, achievement, dark-default, and parent/screen-time remnants from store and career types
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Clean `useProgressionStore` and `career.ts` to Nebula-only light-first defaults with zero parent, screen-time, mock-interview, or achievement state.
- **Files (2):** `src/stores/useProgressionStore.ts`, `src/types/career.ts`
- **Blocked by:** T-07
- **Effort:** Low
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `AchievementItem`, `INITIAL_ACHIEVEMENTS`, `unlockAchievement`, `colorMode`, and non-Nebula tiers (`moonrise`, `starlight`, `aurora`, `galaxy`) are removed from store and types.
  - [ ] Zero `parent*`, `screenTime*`, or `mockInterview*` fields/actions exist in the store.
  - [ ] Default profile does not hardcode `Alex Rivera` or `age: 11`.

### T-09: Clean Settings, Profile, and Sidebar of removed tiers and hardcoded Alex Rivera persona
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Remove multi-tier stage selector, hardcoded `Alex Rivera` email/age/school, and any parent/mock-interview/achievement references from Settings, Profile, and Sidebar.
- **Files (3):** `src/app/settings/page.tsx`, `src/app/profile/page.tsx`, `src/components/layout/Sidebar.tsx`
- **Blocked by:** T-08
- **Effort:** Low
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Settings no longer renders a 5-tier Moonrise–Galaxy picker, hardcoded `Age: 17`, `SMK Bandar Utama Damansara`, or `alex.rivera@example.com`.
  - [ ] `soundEffectsEnabled` and `reduceMotion` toggles in Settings persist to the store.
  - [ ] Profile and Sidebar display Nebula-only defaults and have zero `/parent`, `/achievements`, or mock-interview links/tabs.

### T-10: Delete `.playwright-mcp/` directory and add to `.gitignore`
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Remove obsolete `.playwright-mcp/` testing artifact directory from repository root and ignore it.
- **Files (2):** `.gitignore`, `.playwright-mcp/` (delete)
- **Blocked by:** T-03
- **Effort:** Low
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `.playwright-mcp/` directory is deleted from repo root.
  - [ ] `.gitignore` contains `.playwright-mcp/`.
  - [ ] `git status` shows `.playwright-mcp/` is clean and ignored.

### T-11: Verify complete removal of parent and screen-time features
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Verify `src/app/parent/` and all parent/screen-time state, UI components, imports, and navigation links are completely removed; delete any remaining remnants.
- **Files (3):** `src/app/parent/` (delete if present), `src/stores/useProgressionStore.ts`, `src/app/settings/page.tsx`
- **Blocked by:** T-07, T-08, T-09
- **Effort:** Low
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `src/app/parent/` route directory is completely removed and returns 404 in Next.js.
  - [ ] Zero references to `parentName`, `parentEmail`, `screenTimeUsedMinutes`, `screenTimeMaxMinutes`, or `addScreenTime` exist in the codebase.
  - [ ] Settings, Profile, Sidebar, and Header contain zero parent, PIN, or screen-time controls or text.

### T-12: Rewrite README.md with setup, scripts, folder structure, and career guide
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Replace legacy prototype README with clear developer documentation for setup, scripts, folder structure, and how to add a career.
- **Files (1):** `README.md`
- **Blocked by:** T-06, T-09
- **Effort:** Medium
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `README.md` documents prerequisite setup and all npm scripts (`dev`, `build`, `test`, `lint`, `typecheck`).
  - [ ] Explains directory folder structure (`src/app/`, `src/content/`, `src/features/`, `src/lib/`, `tests/`).
  - [ ] Outlines step-by-step guide for adding a new career (Zod schema, career catalog, scenarios, quizzes, studies, and match matrix weights).

---

## Phase 2: Game Math Tests & Unified XP / Salary Formula

### T-13: Write pure game-math unit tests and domain module
- **Phase:** 2 — Game Math & Formulas
- **Concern:** Create pure functions and Vitest coverage for XP, level, quiz stars, idempotency, and unified RM salary formula.
- **Files (2):** `src/features/progression/math.ts`, `tests/progression.test.ts`
- **Blocked by:** T-05, T-08
- **Effort:** High
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `src/features/progression/math.ts` exports pure functions (`computeLevel`, `computeQuizXp`, `computeQuizStars`, `computeSimulatedSalary`, `applyActivityCompletion`) with zero React or Supabase imports.
  - [ ] Formulas match `SPEC.md` Section 6.1–6.2 (`Study = 30 XP`, `Quiz = 20 + correctCount * 8`, `3★ >= 80%`, `2★ >= 60%`, `Level = max(1, floor(totalXp / 300) + 1)`, `Salary = round(baseSalary * 0.30 + totalXp * 1.0 + sum(competency * 3))`).
  - [ ] `tests/progression.test.ts` verifies worked examples, skill clamping (`0..100`), and idempotent replay (`0 XP` on duplicate `activityId`).

### T-14: Route all store XP, level, and salary updates through `features/progression/math.ts`
- **Phase:** 2 — Game Math & Formulas
- **Concern:** Replace the 3 inconsistent salary/XP calculation paths in `useProgressionStore` with the single tested pure formula.
- **Files (2):** `src/stores/useProgressionStore.ts`, `tests/progression.test.ts`
- **Blocked by:** T-13
- **Effort:** High
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `applySkillImpacts`, `applyReward`, `completeQuest`, and career switching all compute `currentLevel` and `simulatedSalary` exclusively via `src/features/progression/math.ts`.
  - [ ] Store tracks `completedActivityIds` so replaying a lesson, quiz, scenario, or daily quest never awards duplicate XP.
  - [ ] No action adds an ad-hoc `salaryDelta`; `tests/progression.test.ts` passes.

---

## Phase 3: Feature Folders, Design Tokens & Shared UI Components

### T-15: Define warm oat-and-sky design tokens in CSS and Tailwind config
- **Phase:** 3 — Feature Folders, Tokens & Shared UI
- **Concern:** Establish `DESIGN.md` light-theme tokens (`surface`, `surface-container-lowest`, `primary-container`, `secondary-container`, `on-surface`, `hairline`) and `cn` helper.
- **Files (3):** `src/app/globals.css`, `tailwind.config.js`, `src/lib/utils.ts`
- **Blocked by:** T-06
- **Effort:** Medium
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] All semantic color, radius, and shadow tokens from `DESIGN.md` are exposed as CSS variables and Tailwind utilities.
  - [ ] No raw clinical blue (`#2563EB`, `#F1F5F9`) or dark `#0e1224` defaults are defined in `globals.css`.
  - [ ] `cn` in `src/lib/utils.ts` is ready for UI primitives.

### T-16: Build `Button`, `Card`, and `Badge` shared UI primitives
- **Phase:** 3 — Feature Folders, Tokens & Shared UI
- **Concern:** Create the first 3 shared primitives in `src/components/ui/` using design tokens only.
- **Files (3):** `src/components/ui/Button.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/Badge.tsx`
- **Blocked by:** T-15
- **Effort:** Medium
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `Button` supports primary (`sky`), secondary (`white` + `hairline`), ghost/link, disabled, and loading states.
  - [ ] `Card` and `Badge` use warm oat/pastel tokens with accessible contrast and zero ad-hoc hex colors.
  - [ ] Components compile cleanly under `tsc --noEmit`.

### T-17: Build `ProgressBar`, `PageHeader`, and `Modal` shared UI primitives
- **Phase:** 3 — Feature Folders, Tokens & Shared UI
- **Concern:** Create the remaining 3 required shared primitives (`ProgressBar`, `PageHeader`, `Modal`) with keyboard/ARIA support.
- **Files (3):** `src/components/ui/ProgressBar.tsx`, `src/components/ui/PageHeader.tsx`, `src/components/ui/Modal.tsx`
- **Blocked by:** T-15
- **Effort:** Medium
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `ProgressBar` sets proper `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.
  - [ ] `PageHeader` renders consistent title, subtitle, eyebrow/badge, and optional action slot.
  - [ ] `Modal` supports Escape-key close, backdrop click, focus management, and `aria-modal="true"`.

### T-18: Add `ui` barrel export and align `Sidebar` and `Header` to tokens and shared primitives
- **Phase:** 3 — Feature Folders, Tokens & Shared UI
- **Concern:** Export all 6 UI primitives from `src/components/ui/index.ts` and clean `Sidebar` / `Header` styling to tokens only.
- **Files (3):** `src/components/ui/index.ts`, `src/components/layout/Sidebar.tsx`, `src/components/layout/Header.tsx`
- **Blocked by:** T-09, T-16, T-17
- **Effort:** Medium
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `src/components/ui/index.ts` exports `Button`, `Card`, `ProgressBar`, `Badge`, `PageHeader`, and `Modal`.
  - [ ] `Sidebar` keeps the 5-item nav (`Home`, `Explore Careers`, `Practice`, `Leaderboard`, `Profile` + `Settings`).
  - [ ] `Header` and `Sidebar` use design tokens and shared UI components without changing existing navigation behavior.

### T-19: Extract `/` and `/paths` views into `src/features/careers/`
- **Phase:** 3 — Feature Folders, Tokens & Shared UI
- **Concern:** Thin out `src/app/page.tsx` and `src/app/paths/page.tsx` into feature views using shared UI primitives and tokens (no clinical blue).
- **Files (3):** `src/features/careers/DashboardView.tsx`, `src/features/careers/CareerExplorerView.tsx`, `src/app/page.tsx`
- **Blocked by:** T-18
- **Effort:** Medium
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `src/app/page.tsx` is a thin wrapper rendering `DashboardView`.
  - [ ] `DashboardView` and `CareerExplorerView` eliminate clinical blue (`#0E86D4`, `#2563EB`, `bg-blue-*`) and undefined `text-charcoal-muted` classes.
  - [ ] Existing interactive behavior (daily quest claim, career track switcher) remains intact.

### T-20: Deploy initial prototype to Vercel with environment variables and live URL smoke test
- **Phase:** 3 — Feature Folders, Tokens & Shared UI
- **Concern:** Deploy project to Vercel with configured environment variables and perform live URL smoke test.
- **Files (2):** `package.json`, `.env.example`
- **Blocked by:** T-19
- **Effort:** Medium
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] Repository builds and deploys successfully on Vercel with clean production build.
  - [ ] Production environment variables (`NEXT_PUBLIC_DEV_SHORTCUTS`, etc.) are configured in Vercel project settings.
  - [ ] Live Vercel URL loads cleanly, routes navigate as expected, and browser console displays zero fatal errors.

---

## MVP Vertical Slices (`T-21` – `T-31`)

### T-21: Content Schemas, EN/BM Dictionary & 5-Career Catalog
- **Phase:** 4 — Content Layer & Core Loop Wiring
- **Concern:** Install `zod`, define strict bilingual schemas (`Career`, `Scenario`, `Quiz` with exact 5 questions, `StudyLesson`), build typed `en`/`ms` UI dictionaries, and create the 5-career catalog (`software-engineer`, `junior-lawyer`, `future-doctor`, `product-designer`, `master-chef`) with `"Estimated (MY)"` salary bands, `salarySource`, and SPM/Pre-U/uni paths.
- **Files (8):** `package.json`, `src/content/schemas.ts`, `src/content/i18n/types.ts`, `src/content/i18n/en.ts`, `src/content/i18n/ms.ts`, `src/content/careers.ts`, `src/lib/i18n.ts`, `tests/content-schema.test.ts`
- **Blocked by:** T-13, T-15
- **Effort:** High
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `zod` is installed and `src/content/schemas.ts` validates `Career`, `Scenario`, `Quiz` (exact length 5 questions), and `StudyLesson` with required `en` and `ms` blocks.
  - [ ] `en.ts` and `ms.ts` both implement `UiDictionary` from `src/content/i18n/types.ts` (covering navigation, dashboard, practice modes, leaderboard, profile, settings, and onboarding) so missing keys fail `tsc --noEmit`.
  - [ ] `CAREERS` in `src/content/careers.ts` includes all 5 careers (`software-engineer`, `junior-lawyer`, `future-doctor`, `product-designer`, `master-chef`) with `baseSalary`, `salaryRange`, `salarySource`, `coreSkills`, and `en`/`ms` metadata.
  - [ ] `tests/content-schema.test.ts` validates every career with Zod and fails on missing `ms` translations or malformed content.

### T-22: Scenario, Quiz & Study Registries + Data-Driven Players
- **Phase:** 4 — Content Layer & Core Loop Wiring
- **Concern:** Build content registries (`scenarios`, `quizzes`, `studies`), graph-integrity tests, and data-driven players (`ScenarioPlayer`, `QuizPlayer`, `StudyReader`), replacing the hardcoded `Incident #42` `/simulation` page and building `/modes/quiz` and `/modes/study`.
- **Files (11):** `src/content/scenarios/index.ts`, `src/content/quizzes/index.ts`, `src/content/studies/index.ts`, `src/features/practice/logic.ts`, `src/features/practice/ScenarioPlayer.tsx`, `src/features/practice/QuizPlayer.tsx`, `src/features/practice/StudyReader.tsx`, `src/app/simulation/page.tsx`, `src/app/modes/quiz/page.tsx`, `src/app/modes/study/page.tsx`, `tests/scenario-graph.test.ts`
- **Blocked by:** T-14, T-16, T-17, T-21
- **Effort:** High
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Hardcoded `Incident #42` JSX is completely removed from `src/app/simulation/page.tsx`.
  - [ ] `ScenarioPlayer` traverses `decision`, `mentor`, and `terminal` nodes from `src/content/scenarios/`, shows skill impacts & explanations, and awards XP idempotently via `features/progression/math.ts` (`0 XP` on replay).
  - [ ] `/modes/quiz` renders 5-question quizzes from `src/content/quizzes/index.ts` filtered by `activeCareerId` (or `?career=&id=`), shows immediate feedback + explanation, and computes `20 + correctCount * 8` XP and `1★/2★/3★` (`3★ >= 80%`, `2★ >= 60%`) via `math.ts` idempotently.
  - [ ] `/modes/study` renders lessons from `src/content/studies/index.ts` with sections, key terms, read-aloud toggle (`speakText`), and "Mark Complete" (`+30 XP` idempotently) in `en`/`ms`.
  - [ ] `tests/scenario-graph.test.ts` verifies every registered scenario has valid `startNodeId`, reachable nodes, no dangling `nextNodeId`, at least one terminal node, and complete `en`/`ms` strings.

### T-23: Wire Core Loop Routes (`/`, `/paths`, `/modes`, `/leaderboard`)
- **Phase:** 4 — Content Layer & Core Loop Wiring
- **Concern:** Replace remaining hardcoded metrics, broken career IDs, and 15 hardcoded named student rows with live progression state, valid 5-career switching, working `/modes/*` CTAs, and `src/data/leaderboard.ts`.
- **Files (6):** `src/app/modes/page.tsx`, `src/app/paths/page.tsx`, `src/features/careers/DashboardView.tsx`, `src/data/leaderboard.ts`, `src/features/leaderboard/LeaderboardView.tsx`, `src/app/leaderboard/page.tsx`
- **Blocked by:** T-19, T-21, T-22
- **Effort:** Medium
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `/modes` links Study CTA to `/modes/study`, Quiz CTA to `/modes/quiz`, and Simulation CTA to `/simulation` with live completion counts.
  - [ ] `/paths` switches cleanly across all 5 valid `careerId`s (`CAREERS`) and displays `"Estimated (MY)"` salary + `salarySource` + SPM/uni paths.
  - [ ] `/` (`DashboardView`) renders live `totalXp`, `currentLevel`, `simulatedSalary`, active career progress, and uncompleted daily quest state.
  - [ ] `src/data/leaderboard.ts` uses MYR (`simulatedSalary`) and exposes only `username`, `avatarChar`, `totalXp`, `simulatedSalary`, and `activeCareerId` (no school names or real names); `/leaderboard` merges the current opted-in user dynamically and filters by career track.

### T-24: Career Matching Engine & 8-Question Bilingual Onboarding Quiz Data
- **Phase:** 5 — Onboarding & Career Matching
- **Concern:** Implement deterministic top-3 career-matching scoring (`SPEC.md` Section 6.3), template-based EN/BM match reasons (no LLM), and the 8-question bilingual onboarding quiz + 5-career weights matrix.
- **Files (5):** `src/lib/career-matching.ts`, `src/content/onboarding-quiz.ts`, `src/content/schemas.ts`, `tests/career-matching.test.ts`, `tests/content-schema.test.ts`
- **Blocked by:** T-21
- **Effort:** High
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `matchCareers` implements `SPEC.md` Section 6.3 (`+2` primary / `+1` secondary traits across `AN|CR|SO|BU|EN`, `0.6 * traitNorm + 0.4 * subjectNorm`, clamp `60..97`, tie-break + strict `#1 > #2 > #3` decrement) and builds EN/BM match reasons without LLM calls.
  - [ ] `onboarding-quiz.ts` contains exactly 8 questions with 4 options each in `en` and `ms`, plus `careerWeights` for all 5 careers in `src/content/careers.ts`.
  - [ ] `tests/career-matching.test.ts` and `tests/content-schema.test.ts` verify determinism, tie-breaking, 8×4 structure, 100% 5-career matrix coverage, and EN/BM parity.

### T-25: Onboarding Flow Steps 1–3 (`/onboarding`, `/onboarding/profile`, `/onboarding/invite`)
- **Phase:** 5 — Onboarding & Career Matching
- **Concern:** Create in-memory onboarding draft state (never persisting raw quiz answers) and Steps 1–3: Entry (Login / Register + parental consent / Demo Student), Academic Profile (Form 1–3 only + 2–3 subjects), and Quiz Invitation (CSS planet + dev-only shortcut flag).
- **Files (9):** `src/features/onboarding/useOnboardingDraft.ts`, `src/features/onboarding/EntryView.tsx`, `src/features/onboarding/OnboardingShell.tsx`, `src/features/onboarding/AcademicProfileView.tsx`, `src/features/onboarding/InviteView.tsx`, `src/app/onboarding/page.tsx`, `src/app/onboarding/profile/page.tsx`, `src/app/onboarding/invite/page.tsx`, `.env.example`
- **Blocked by:** T-18, T-24
- **Effort:** Medium
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Register tab collects only `nickname`, `email`, `password`, and mandatory parental-consent checkbox (capturing timestamp); "Continue as Demo Student" pre-fills `Form 2`, `["Mathematics", "Computing & Tech"]` → `/onboarding/invite`.
  - [ ] `useOnboardingDraft` stores transient quiz answers in memory only (never in `localStorage`).
  - [ ] `/onboarding/profile` allows only `Form 1`, `Form 2`, and `Form 3` (`Nebula` tier) and enforces selecting 2 to 3 of 6 subjects.
  - [ ] `/onboarding/invite` displays CSS planet artwork, profile recap, Start Quiz / Skip CTAs, and "Jump to Step 3" dev shortcut strictly when `process.env.NEXT_PUBLIC_DEV_SHORTCUTS === 'true'`.

### T-26: Onboarding Flow Steps 4–6 (`/onboarding/quiz`, `/results`, `/confirm`) & Profile Retake/Switch
- **Phase:** 5 — Onboarding & Career Matching
- **Concern:** Build the 8-question bilingual quiz player, ranked top-3 career results screen, confirmation screen (persisting only `educationLevel`, `favouriteSubjects`, `activeCareerId`), and `/profile` Retake Quiz / Switch Career actions.
- **Files (7):** `src/features/onboarding/QuizView.tsx`, `src/features/onboarding/ResultsView.tsx`, `src/features/onboarding/ConfirmView.tsx`, `src/app/onboarding/quiz/page.tsx`, `src/app/onboarding/results/page.tsx`, `src/app/onboarding/confirm/page.tsx`, `src/app/profile/page.tsx`
- **Blocked by:** T-24, T-25
- **Effort:** Medium
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `/onboarding/quiz` renders 8 questions in `en`/`ms` with 4 option cards, progress bar (`0%..100%`), arrow-key radiogroup navigation, Back/Next, and direct entry from `/profile` ("Retake Quiz").
  - [ ] `/onboarding/results` renders `#1 Best Match`, `#2`, and `#3` strictly ordered with match %, `"Estimated (MY)"` salary range + `salarySource`, top 3 skills, bilingual reason, and Retake option.
  - [ ] `/onboarding/confirm` commits only `educationLevel`, `favouriteSubjects`, and `activeCareerId` (never raw quiz answers) and navigates to `/`; `/profile` exposes working "Retake Personality Quiz" (`/onboarding/quiz`) and "Switch Career" (`/paths`).

### T-27: Author Bilingual Content for All 5 Careers
- **Phase:** 6–7 — Bilingual Content (`2/2/2` Secondary & `3/3/3` Core)
- **Concern:** Author and register owner-reviewed Nebula-level (ages 13–15) EN & BM content: `2/2/2` for `product-designer` & `master-chef`, and `3/3/3` for `software-engineer`, `junior-lawyer`, & `future-doctor`, removing migrated legacy `src/data/{scenarios,quizzes,studies}.ts`.
- **Files (21):** `src/content/scenarios/{product-designer,master-chef,software-engineer,junior-lawyer,future-doctor}.ts`, `src/content/scenarios/index.ts`, `src/content/quizzes/{product-designer,master-chef,software-engineer,junior-lawyer,future-doctor}.ts`, `src/content/quizzes/index.ts`, `src/content/studies/{product-designer,master-chef,software-engineer,junior-lawyer,future-doctor}.ts`, `src/content/studies/index.ts`, `src/data/{scenarios,quizzes,studies}.ts` (delete)
- **Blocked by:** T-22
- **Effort:** Medium
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `product-designer` and `master-chef` each export 2 branching scenarios, 2 five-question quizzes, and 2 study lessons in EN & BM.
  - [ ] `software-engineer`, `junior-lawyer`, and `future-doctor` each export 3 branching scenarios, 3 five-question quizzes, and 3 study lessons (`30 XP` each) in EN & BM.
  - [ ] Content is reviewed by the owner for factual accuracy and natural Bahasa Malaysia phrasing; `content-schema.test.ts` and `scenario-graph.test.ts` pass with zero missing `ms` fields or broken node links.

### T-28: Split Monolithic Store (`useSettingsStore`, `useProfileStore`, `useProgressionStore`)
- **Phase:** 8 — Store Split
- **Concern:** Separate locale/audio/motion preferences (`useSettingsStore`), minimal non-PII identity (`useProfileStore`), and XP/skill/salary progression (`useProgressionStore` in `src/features/progression/`), deleting legacy `src/stores/useProgressionStore.ts`.
- **Files (9):** `src/features/settings/useSettingsStore.ts`, `src/features/profile/useProfileStore.ts`, `src/features/progression/useProgressionStore.ts`, `src/stores/useProgressionStore.ts` (delete), `src/app/settings/page.tsx`, `src/components/layout/Header.tsx`, `src/app/profile/page.tsx`, `src/features/onboarding/ConfirmView.tsx`, `src/features/practice/logic.ts`
- **Blocked by:** T-18, T-26
- **Effort:** Low
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `useSettingsStore` persists `locale` (`'en' | 'ms'`), `readAloudEnabled`, `soundEffectsEnabled`, and `reduceMotion`.
  - [ ] `useProfileStore` holds only minimal non-PII fields (`nickname`, `avatarChar`, `educationLevel`, `favouriteSubjects`, `activeCareerId`, `leaderboardOptIn`).
  - [ ] Zero imports from `@/stores/useProgressionStore` remain anywhere in `src/` or `tests/`; all Vitest tests, `tsc --noEmit`, and `next build` pass.

### T-29: Supabase Setup, Schema/RLS, Seed, Auth & Account Deletion
- **Phase:** 9 — Supabase Backend
- **Concern:** Install `@supabase/supabase-js` & `@supabase/ssr`, create anon + server-only admin clients, author RLS schema & `public_leaderboard` view, build dummy seed script, wire Auth + consent + progression sync + opt-in leaderboard, and implement password-verified cascading account deletion.
- **Files (19):** `package.json`, `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/admin.ts`, `.env.example`, `supabase/migrations/001_init.sql`, `supabase/seed.ts`, `src/features/auth/authActions.ts`, `src/features/auth/useSession.ts`, `src/features/onboarding/EntryView.tsx`, `src/features/progression/sync.ts`, `src/features/progression/useProgressionStore.ts`, `src/features/profile/useProfileStore.ts`, `src/app/api/account/delete/route.ts`, `src/features/settings/DeleteAccountModal.tsx`, `src/app/settings/page.tsx`, `src/features/leaderboard/LeaderboardView.tsx`, `src/features/profile/ProfileView.tsx`, `src/app/profile/page.tsx`
- **Blocked by:** T-23, T-27, T-28
- **Effort:** High
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `admin.ts` uses `import 'server-only'` and `SUPABASE_SERVICE_ROLE_KEY` never enters client bundles.
  - [ ] `001_init.sql` creates `profiles` (only `id`, `username`, `avatar_char`, `education_level`, `favourite_subjects`, `active_career_id`, `consent_accepted_at`, `leaderboard_opt_in`, `locale`, `created_at`), `user_progress`, and `user_skills` with `auth.uid() = id` RLS + `ON DELETE CASCADE`, plus `public_leaderboard` view exposing only `username`, `avatar_char`, `total_xp`, `simulated_salary`, `active_career_id` where `leaderboard_opt_in = true` or `is_demo_seed = true`.
  - [ ] `npm run seed` (`supabase/seed.ts`) idempotently seeds dummy demo accounts + anonymized fake leaderboard rows with zero real student PII.
  - [ ] Registration requires parental-consent checkbox (`consent_accepted_at` persisted); progression & profile edits persist to Supabase; `leaderboard_opt_in` defaults to `false`.
  - [ ] `POST /api/account/delete` validates session, re-verifies password (`401` on wrong password), deletes `auth.users` via `admin.ts` (cascading all tables), signs out client, and redirects to `/onboarding`.

### T-30: Bilingual Ask Dreamy Rewrite (All 5 Careers) & Mobile/A11y Pass
- **Phase:** 11 — Ask Dreamy & Polish
- **Concern:** Replace legacy `se`/`da`/`ux` data and `"Hi Alex!"` greeting with Zod-validated bilingual `src/content/dreamy-kb.ts` covering all 5 careers, wire live skills/cards, and complete a 375px mobile & WCAG AA accessibility pass across all pages.
- **Files (12):** `src/content/dreamy-kb.ts`, `src/content/schemas.ts`, `tests/content-schema.test.ts`, `src/features/dreamy/intentMatcher.ts`, `src/components/dreamy/cards/CareerMatchesCard.tsx`, `src/components/dreamy/cards/SalaryCard.tsx`, `src/components/dreamy/cards/CourseRouteCard.tsx`, `src/components/dreamy/AskDreamyOverlay.tsx`, `src/app/ask-dreamy/page.tsx`, `src/components/layout/MobileNav.tsx`, `src/features/onboarding/OnboardingShell.tsx`, `src/app/globals.css`
- **Blocked by:** T-23, T-28
- **Effort:** Medium
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `dreamy-kb.ts` covers all 5 careers (`software-engineer`, `junior-lawyer`, `future-doctor`, `product-designer`, `master-chef`) with `"Estimated (MY)"` salaries, `salarySource`, and Malaysian SPM/Pre-U/university pathways in EN & BM, validated by `tests/content-schema.test.ts`.
  - [ ] `CareerMatchesCard`, `SalaryCard`, `CourseRouteCard`, `AskDreamyOverlay`, and `/ask-dreamy` read live user skills/progress, greet by `nickname` (never `"Alex"`), and work in both `en` and `ms`.
  - [ ] All pages and modals render without horizontal overflow or clipped content at `375px` viewport width, with 44×44px touch targets, visible keyboard focus rings, and WCAG AA contrast.

### T-31: Real-Student Testing Protocol & Report
- **Phase:** 10 — Real-Student Testing Round
- **Concern:** Document testing script, dummy demo credentials, and university ethics / PDPA checklist, then run supervised testing sessions with target-age students (13–15) and log anonymized, prioritized findings.
- **Files (3):** `docs/TESTING-PROTOCOL.md`, `docs/USER-TESTING-REPORT.md`, `supabase/seed.ts`
- **Blocked by:** T-29, T-30
- **Effort:** Medium
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `docs/TESTING-PROTOCOL.md` uses only dummy demo accounts (zero real student PII stored or screenshotted) and includes EN/BM task walkthroughs covering onboarding, study, quiz, simulation, and Ask Dreamy, plus ethics/PDPA checklist.
  - [ ] `docs/USER-TESTING-REPORT.md` summarizes anonymized observations (no student names/emails/photos), task completion rates, and prioritized follow-up fixes.

---

## Deferred / Post-MVP

Per the Cut Order in `docs/INTERVIEW-NOTES.md`, the following stretch/polish items are deferred until after `T-21`–`T-31` are complete:
- **Cut #1 — Warm Dark Mode:** `.dark` palette in `globals.css` and Settings toggle (old `T-86`).
- **Cut #2 — Ask Dreamy Gemini Follow-Ups:** Server-side `POST /api/dreamy` via Firebase AI Logic with minor-safe guardrails and zero PII (old `T-85`).
- **Cut #3 & #4 — Core Content Expansion Beyond `3/3/3`:** Expanding `software-engineer`, `junior-lawyer`, and `future-doctor` from `3/3/3` to `6/6/6` and `10/10/10` (old `T-51`–`T-68`).
- **Cut #5 & #6 — `/resume-builder` & `/notifications`:** Restyling to `DESIGN.md` tokens or cleanly removing both routes and the Header bell link (old `T-89`).
- **Polish — Confetti & Micro-Interactions / Copy Pass:** `CelebrationBurst` (`framer-motion` + `canvas-confetti` respecting `reduceMotion`, old `T-87`) and final Standard Technical English / BM copy pass (old `T-88`).
