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
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] All 3 listed `.js` files are deleted from the repository root.
  - [ ] `tsc --noEmit` and `eslint` still run without referencing the deleted files.

### T-02: Delete root inspection scripts and Stitch JSON snapshot
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Remove remaining root inspection scripts and raw Stitch JSON artifact.
- **Files (3):** `inspect_explore.js` (delete), `inspect_explore_sections.js` (delete), `stitch_home.json` (delete)
- **Blocked by:** None
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `inspect_explore.js`, `inspect_explore_sections.js`, and `stitch_home.json` are deleted.
  - [ ] No imports or scripts in `package.json` reference these files.

### T-03: Delete unused `stitch_screens` HTML exports from root
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Remove raw exported Stitch HTML directory from repo root.
- **Files (1 directory):** `stitch_screens/` (delete)
- **Blocked by:** None
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `stitch_screens/` is removed from the repository root.
  - [ ] Repo root contains only project config, docs, `public/`, `scripts/`, and `src/`.

### T-04: Configure Prettier, ESLint formatting rules, and patch Next.js 16.x
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Set up Prettier + ESLint compatibility and upgrade Next.js past `16.4.4` `SecurityFatalError`.
- **Files (3):** `package.json`, `.prettierrc`, `eslint.config.mjs`
- **Blocked by:** None
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
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `vitest` is installed and configured with `@/` path alias resolution matching `tsconfig.json`.
  - [ ] `npm test` (`vitest run`) executes `tests/smoke.test.ts` and passes.

### T-06: Add GitHub Actions CI gate workflow
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Automate format, lint, typecheck, test, and build checks on push/PR.
- **Files (2):** `.github/workflows/ci.yml`, `package.json`
- **Blocked by:** T-04, T-05
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `package.json` defines `format:check`, `lint`, `typecheck`, `test`, and `build` scripts.
  - [ ] `.github/workflows/ci.yml` runs all five checks on `push` and `pull_request` and passes on a clean branch.

### T-07: Remove `/achievements` page, old aptitude quiz, and multi-tier metadata
- **Phase:** 1 — Cleanup & Tooling
- **Concern:** Delete removed `/achievements` route and unused `src/data/aptitude.ts`; scope root metadata to Nebula tier.
- **Files (3):** `src/app/achievements/page.tsx` (delete), `src/data/aptitude.ts` (delete), `src/app/layout.tsx`
- **Blocked by:** T-06
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
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Settings no longer renders a 5-tier Moonrise–Galaxy picker, hardcoded `Age: 17`, `SMK Bandar Utama Damansara`, or `alex.rivera@example.com`.
  - [ ] `soundEffectsEnabled` and `reduceMotion` toggles in Settings persist to the store.
  - [ ] Profile and Sidebar display Nebula-only defaults and have zero `/parent`, `/achievements`, or mock-interview links/tabs.

---

## Phase 2: Game Math Tests & Unified XP / Salary Formula

### T-10: Write pure game-math unit tests and domain module
- **Phase:** 2 — Game Math & Formulas
- **Concern:** Create pure functions and Vitest coverage for XP, level, quiz stars, idempotency, and unified RM salary formula.
- **Files (2):** `src/features/progression/math.ts`, `tests/progression.test.ts`
- **Blocked by:** T-05, T-08
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `src/features/progression/math.ts` exports pure functions (`computeLevel`, `computeQuizXp`, `computeQuizStars`, `computeSimulatedSalary`, `applyActivityCompletion`) with zero React or Supabase imports.
  - [ ] Formulas match `SPEC.md` Section 6.1–6.2 (`Study = 30 XP`, `Quiz = 20 + correctCount * 8`, `3★ >= 80%`, `2★ >= 60%`, `Level = max(1, floor(totalXp / 300) + 1)`, `Salary = round(baseSalary * 0.30 + totalXp * 1.0 + sum(competency * 3))`).
  - [ ] `tests/progression.test.ts` verifies worked examples, skill clamping (`0..100`), and idempotent replay (`0 XP` on duplicate `activityId`).

### T-11: Route all store XP, level, and salary updates through `features/progression/math.ts`
- **Phase:** 2 — Game Math & Formulas
- **Concern:** Replace the 3 inconsistent salary/XP calculation paths in `useProgressionStore` with the single tested pure formula.
- **Files (2):** `src/stores/useProgressionStore.ts`, `tests/progression.test.ts`
- **Blocked by:** T-10
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `applySkillImpacts`, `applyReward`, `completeQuest`, and career switching all compute `currentLevel` and `simulatedSalary` exclusively via `src/features/progression/math.ts`.
  - [ ] Store tracks `completedActivityIds` so replaying a lesson, quiz, scenario, or daily quest never awards duplicate XP.
  - [ ] No action adds an ad-hoc `salaryDelta`; `tests/progression.test.ts` passes.

---

## Phase 3: Feature Folders, Design Tokens & Shared UI Components

### T-12: Define warm oat-and-sky design tokens in CSS and Tailwind config
- **Phase:** 3 — Feature Folders, Tokens & Shared UI
- **Concern:** Establish `DESIGN.md` light-theme tokens (`surface`, `surface-container-lowest`, `primary-container`, `secondary-container`, `on-surface`, `hairline`) and `cn` helper.
- **Files (3):** `src/app/globals.css`, `tailwind.config.js`, `src/lib/utils.ts`
- **Blocked by:** T-06
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] All semantic color, radius, and shadow tokens from `DESIGN.md` are exposed as CSS variables and Tailwind utilities.
  - [ ] No raw clinical blue (`#2563EB`, `#F1F5F9`) or dark `#0e1224` defaults are defined in `globals.css`.
  - [ ] `cn` in `src/lib/utils.ts` is ready for UI primitives.

### T-13: Build `Button`, `Card`, and `Badge` shared UI primitives
- **Phase:** 3 — Feature Folders, Tokens & Shared UI
- **Concern:** Create the first 3 shared primitives in `src/components/ui/` using design tokens only.
- **Files (3):** `src/components/ui/Button.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/Badge.tsx`
- **Blocked by:** T-12
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `Button` supports primary (`sky`), secondary (`white` + `hairline`), ghost/link, disabled, and loading states.
  - [ ] `Card` and `Badge` use warm oat/pastel tokens with accessible contrast and zero ad-hoc hex colors.
  - [ ] Components compile cleanly under `tsc --noEmit`.

### T-14: Build `ProgressBar`, `PageHeader`, and `Modal` shared UI primitives
- **Phase:** 3 — Feature Folders, Tokens & Shared UI
- **Concern:** Create the remaining 3 required shared primitives (`ProgressBar`, `PageHeader`, `Modal`) with keyboard/ARIA support.
- **Files (3):** `src/components/ui/ProgressBar.tsx`, `src/components/ui/PageHeader.tsx`, `src/components/ui/Modal.tsx`
- **Blocked by:** T-12
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `ProgressBar` sets proper `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.
  - [ ] `PageHeader` renders consistent title, subtitle, eyebrow/badge, and optional action slot.
  - [ ] `Modal` supports Escape-key close, backdrop click, focus management, and `aria-modal="true"`.

### T-15: Add `ui` barrel export and align `Sidebar` and `Header` to tokens and shared primitives
- **Phase:** 3 — Feature Folders, Tokens & Shared UI
- **Concern:** Export all 6 UI primitives from `src/components/ui/index.ts` and clean `Sidebar` / `Header` styling to tokens only.
- **Files (3):** `src/components/ui/index.ts`, `src/components/layout/Sidebar.tsx`, `src/components/layout/Header.tsx`
- **Blocked by:** T-09, T-13, T-14
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `src/components/ui/index.ts` exports `Button`, `Card`, `ProgressBar`, `Badge`, `PageHeader`, and `Modal`.
  - [ ] `Sidebar` keeps the 5-item nav (`Home`, `Explore Careers`, `Practice`, `Leaderboard`, `Profile` + `Settings`).
  - [ ] `Header` and `Sidebar` use design tokens and shared UI components without changing existing navigation behavior.

### T-16: Extract `/` and `/paths` views into `src/features/careers/`
- **Phase:** 3 — Feature Folders, Tokens & Shared UI
- **Concern:** Thin out `src/app/page.tsx` and `src/app/paths/page.tsx` into feature views using shared UI primitives and tokens (no clinical blue).
- **Files (3):** `src/features/careers/DashboardView.tsx`, `src/features/careers/CareerExplorerView.tsx`, `src/app/page.tsx`
- **Blocked by:** T-15
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `src/app/page.tsx` is a thin wrapper rendering `DashboardView`.
  - [ ] `DashboardView` and `CareerExplorerView` eliminate clinical blue (`#0E86D4`, `#2563EB`, `bg-blue-*`) and undefined `text-charcoal-muted` classes.
  - [ ] Existing interactive behavior (daily quest claim, career track switcher) remains intact.

---

## Phase 4: Content Layer, ScenarioPlayer, i18n & Core Loop Wiring

### T-17: Define Zod content schemas and schema validation test harness
- **Phase:** 4 — Content Layer & Core Loop Wiring
- **Concern:** Install `zod` and define strict schemas for `Career`, `Scenario`, `Quiz` (5 questions), `StudyLesson`, and EN/BM parity.
- **Files (3):** `package.json`, `src/content/schemas.ts`, `tests/content-schema.test.ts`
- **Blocked by:** T-05
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `zod` is installed and `src/content/schemas.ts` validates `Career`, `Scenario`, `Quiz` (exact length 5 questions), and `StudyLesson` with required `en` and `ms` blocks.
  - [ ] `tests/content-schema.test.ts` runs in Vitest and fails on missing `ms` translations or malformed content.

### T-18: Create EN/BM UI dictionary structure and locale helper
- **Phase:** 4 — Content Layer & Core Loop Wiring
- **Concern:** Build typed `en` and `ms` UI string dictionaries and locale helper (`src/lib/i18n.ts`).
- **Files (3):** `src/content/i18n/types.ts`, `src/content/i18n/en.ts`, `src/content/i18n/ms.ts`
- **Blocked by:** T-17
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `en.ts` and `ms.ts` both implement `UiDictionary` from `types.ts` so missing keys fail `tsc --noEmit`.
  - [ ] Dictionary covers navigation, dashboard, practice modes, leaderboard, profile, settings, and onboarding labels.

### T-19: Create master career catalog (`src/content/careers.ts`) and `src/lib/i18n.ts`
- **Phase:** 4 — Content Layer & Core Loop Wiring
- **Concern:** Move career definitions into Zod-validated bilingual `src/content/careers.ts` with `"Estimated (MY)"` salary bands, `salarySource`, SPM/Pre-U/uni paths, and add `src/lib/i18n.ts`.
- **Files (3):** `src/content/careers.ts`, `src/lib/i18n.ts`, `tests/content-schema.test.ts`
- **Blocked by:** T-17, T-18
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `CAREERS` registry in `src/content/careers.ts` includes all 5 careers (`software-engineer`, `junior-lawyer`, `future-doctor`, `product-designer`, `master-chef`) with `baseSalary`, `salaryRange`, `salarySource`, `coreSkills`, and `en`/`ms` metadata.
  - [ ] `tests/content-schema.test.ts` validates every career with Zod.

### T-20: Create scenario registry and graph-integrity Vitest suite
- **Phase:** 4 — Content Layer & Core Loop Wiring
- **Concern:** Establish `src/content/scenarios/index.ts` and automated scenario graph checks (valid `startNodeId`, reachable nodes, valid `nextNodeId`, terminal outcomes).
- **Files (2):** `src/content/scenarios/index.ts`, `tests/scenario-graph.test.ts`
- **Blocked by:** T-17, T-19
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `src/content/scenarios/index.ts` exports lookup helpers (`getScenariosByCareer`, `getScenarioById`).
  - [ ] `tests/scenario-graph.test.ts` verifies every registered scenario has reachable nodes, no dangling `nextNodeId`, at least one terminal node, and complete `en`/`ms` strings.

### T-21: Build data-driven `ScenarioPlayer` and delete hardcoded `/simulation` page
- **Phase:** 4 — Content Layer & Core Loop Wiring
- **Concern:** Replace the single hardcoded `Incident #42` simulation page with a generic multi-node graph walker powered by `ScenarioPlayer`.
- **Files (3):** `src/features/practice/logic.ts`, `src/features/practice/ScenarioPlayer.tsx`, `src/app/simulation/page.tsx`
- **Blocked by:** T-11, T-13, T-14, T-20
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Hardcoded `Incident #42` JSX is completely removed from `src/app/simulation/page.tsx`.
  - [ ] `ScenarioPlayer` traverses `decision`, `mentor`, and `terminal` nodes from `src/content/scenarios/`, shows skill impacts & explanations, and awards XP idempotently via `features/progression/math.ts`.
  - [ ] Replaying a completed scenario awards `0 XP` while allowing exploration.

### T-22: Build quiz registry and data-driven `/modes/quiz` player
- **Phase:** 4 — Content Layer & Core Loop Wiring
- **Concern:** Create `src/content/quizzes/index.ts` and build the 5-question interactive quiz player at `/modes/quiz`.
- **Files (3):** `src/content/quizzes/index.ts`, `src/features/practice/QuizPlayer.tsx`, `src/app/modes/quiz/page.tsx`
- **Blocked by:** T-11, T-13, T-14, T-17
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `/modes/quiz` renders quizzes from `src/content/quizzes/index.ts` filtered by `activeCareerId` (or `?career=&id=`).
  - [ ] Shows immediate answer feedback + explanation, calculates `20 + correctCount * 8` XP and `1★/2★/3★` rating via `math.ts`, and updates the store idempotently.

### T-23: Build study registry and data-driven `/modes/study` reader
- **Phase:** 4 — Content Layer & Core Loop Wiring
- **Concern:** Create `src/content/studies/index.ts` and build the interactive study lesson reader at `/modes/study`.
- **Files (3):** `src/content/studies/index.ts`, `src/features/practice/StudyReader.tsx`, `src/app/modes/study/page.tsx`
- **Blocked by:** T-11, T-13, T-14, T-17
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `/modes/study` renders lessons from `src/content/studies/index.ts` with sections, key terms, read-aloud toggle (`speakText`), and "Mark Complete" (`+30 XP` idempotently).
  - [ ] Displays localized `en`/`ms` text based on current locale.

### T-24: Wire `/modes`, `/paths`, and `/` dashboard to live store & content registries
- **Phase:** 4 — Content Layer & Core Loop Wiring
- **Concern:** Replace remaining hardcoded metrics/links on `/`, `/paths`, and `/modes` with live progression state and `/modes/study`, `/modes/quiz`, `/simulation` routes.
- **Files (3):** `src/app/modes/page.tsx`, `src/app/paths/page.tsx`, `src/features/careers/DashboardView.tsx`
- **Blocked by:** T-16, T-19, T-21, T-22, T-23
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `/modes` links Study CTA to `/modes/study`, Quiz CTA to `/modes/quiz`, and Simulation CTA to `/simulation` with live completion counts.
  - [ ] `/paths` switches cleanly across all 5 valid `careerId`s (`CAREERS`) and displays `"Estimated (MY)"` salary + `salarySource` + SPM/uni paths.
  - [ ] `/` renders live `totalXp`, `currentLevel`, `simulatedSalary`, active career progress, and uncompleted daily quest state.

### T-25: Wire `/leaderboard` to `src/data/leaderboard.ts`
- **Phase:** 4 — Content Layer & Core Loop Wiring
- **Concern:** Replace the 15 hardcoded named student rows in `/leaderboard` with `src/data/leaderboard.ts` (MYR currency, `username` + `avatarChar` only, working track filter).
- **Files (3):** `src/data/leaderboard.ts`, `src/features/leaderboard/LeaderboardView.tsx`, `src/app/leaderboard/page.tsx`
- **Blocked by:** T-13, T-14, T-19
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `src/data/leaderboard.ts` uses MYR (`simulatedSalary`) and exposes only `username`, `avatarChar`, `totalXp`, `simulatedSalary`, and `activeCareerId` (no school names or real names).
  - [ ] `/leaderboard` imports `LEADERBOARD_ENTRIES`, merges the current opted-in user dynamically, and filters by career track.

---

## Phase 5: Onboarding Flow & Career Matching

### T-26: Implement pure career-matching scoring & bilingual match reasons in `src/lib`
- **Phase:** 5 — Onboarding & Career Matching
- **Concern:** Build deterministic top-3 scoring matrix evaluator and template-based EN/BM reason generator with comprehensive Vitest tests.
- **Files (2):** `src/lib/career-matching.ts`, `tests/career-matching.test.ts`
- **Blocked by:** T-05, T-19
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `matchCareers` implements the exact `SPEC.md` Section 6.3 formula (`+2` primary / `+1` secondary traits, `0.6 * traitNorm + 0.4 * subjectNorm`, clamp `60..97`, tie-break + strict `#1 > #2 > #3` decrement).
  - [ ] Builds personalized `en` and `ms` match reasons from top matching subjects and highest-product trait without any LLM calls.
  - [ ] `tests/career-matching.test.ts` verifies determinism, worked example, tie-breaking, and both `en` and `ms` output.

### T-27: Author 8-question onboarding quiz & 5-career matrix in EN and BM
- **Phase:** 5 — Onboarding & Career Matching
- **Concern:** Create `src/content/onboarding-quiz.ts` with 8 bilingual questions (4 options each), `careerWeights` for all 5 app careers, and EN/BM `matchReasonTemplates`, validated by Zod.
- **Files (3):** `src/content/onboarding-quiz.ts`, `src/content/schemas.ts`, `tests/content-schema.test.ts`
- **Blocked by:** T-17, T-19, T-26
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `onboarding-quiz.ts` contains exactly 8 questions with 4 options each (`primaryTrait`, `secondaryTrait` in `AN|CR|SO|BU|EN`), in both `en` and `ms`.
  - [ ] `careerWeights` includes entries for all 5 careers in `src/content/careers.ts`.
  - [ ] `tests/content-schema.test.ts` asserts 8×4 structure, full EN/BM coverage, and 100% career matrix coverage.

### T-28: Build ephemeral onboarding draft state and Step 1 Entry screen (`/onboarding`)
- **Phase:** 5 — Onboarding & Career Matching
- **Concern:** Create client-only onboarding draft state (never persisting raw quiz answers) and Step 1 Login / Register (+ parental consent checkbox) / Demo Student entry screen.
- **Files (3):** `src/features/onboarding/useOnboardingDraft.ts`, `src/features/onboarding/EntryView.tsx`, `src/app/onboarding/page.tsx`
- **Blocked by:** T-15, T-27
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Register tab collects only `nickname`, `email`, `password`, and mandatory parental-consent checkbox (capturing timestamp).
  - [ ] "Continue as Demo Student" pre-fills demo academic profile (`Form 2`, `["Mathematics", "Computing & Tech"]`) and routes to `/onboarding/invite`.
  - [ ] `useOnboardingDraft` stores transient quiz answers in memory only (never in `localStorage`).

### T-29: Build onboarding shell and Step 2 Academic Profile screen (`/onboarding/profile`)
- **Phase:** 5 — Onboarding & Career Matching
- **Concern:** Create shared 6-step progress shell and Academic Profile view (Form 1, Form 2, Form 3 only + 2–3 favourite subjects).
- **Files (3):** `src/features/onboarding/OnboardingShell.tsx`, `src/features/onboarding/AcademicProfileView.tsx`, `src/app/onboarding/profile/page.tsx`
- **Blocked by:** T-28
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Only `Form 1`, `Form 2`, and `Form 3` (`Nebula` tier) are selectable (no Form 4–5 or Pre-U).
  - [ ] Enforces selecting 2 to 3 of the 6 subjects before enabling "Continue" to `/onboarding/invite`.
  - [ ] `OnboardingShell` renders step progress dots/label in warm pastel tokens.

### T-30: Build Step 3 Quiz Invitation screen (`/onboarding/invite`) with dev-only shortcut
- **Phase:** 5 — Onboarding & Career Matching
- **Concern:** Create CSS planet invitation screen with profile recap, Start Quiz / Skip CTAs, and dev-only `NEXT_PUBLIC_DEV_SHORTCUTS` jump shortcut.
- **Files (3):** `src/features/onboarding/InviteView.tsx`, `src/app/onboarding/invite/page.tsx`, `.env.example`
- **Blocked by:** T-29
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Displays CSS planet artwork, 3 summary tiles, and recap pills for selected Form level and subjects.
  - [ ] "Start Personality Quiz" navigates to `/onboarding/quiz`; "Skip to Dashboard" routes to `/onboarding/confirm` (unselected state) or `/`.
  - [ ] "Jump to Step 3" dev shortcut renders strictly when `process.env.NEXT_PUBLIC_DEV_SHORTCUTS === 'true'` and is absent in production builds.

### T-31: Build Step 4 Personality Quiz screen (`/onboarding/quiz`)
- **Phase:** 5 — Onboarding & Career Matching
- **Concern:** Build the 8-question bilingual quiz player with progress bar, keyboard arrow navigation, Back/Next, and brief matching transition.
- **Files (2):** `src/features/onboarding/QuizView.tsx`, `src/app/onboarding/quiz/page.tsx`
- **Blocked by:** T-27, T-29
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Renders all 8 questions in `en` or `ms` with 4 selectable option cards, progress bar (`0%..100%`), and arrow-key radiogroup navigation.
  - [ ] Supports Back/Next without losing answers in memory, and transitions to `/onboarding/results` after question 8.
  - [ ] Supports direct entry from `/profile` ("Retake Quiz") using saved `educationLevel` and `favouriteSubjects`.

### T-32: Build Step 5 Top-3 Career Results screen (`/onboarding/results`)
- **Phase:** 5 — Onboarding & Career Matching
- **Concern:** Display ranked top-3 career matches from `matchCareers`, showing `%` match, `"Estimated (MY)"` salary, top skills, bilingual reason, and Retake option.
- **Files (2):** `src/features/onboarding/ResultsView.tsx`, `src/app/onboarding/results/page.tsx`
- **Blocked by:** T-26, T-31
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Renders `#1 Best Match`, `#2`, and `#3` strictly ordered with match %, `"Estimated (MY)"` salary range + `salarySource`, top 3 skills, and personalized EN/BM reason.
  - [ ] "Choose This Career" passes the selected career to `/onboarding/confirm`; "Retake the quiz" clears transient answers and returns to `/onboarding/quiz`.

### T-33: Build Step 6 Confirmation screen (`/onboarding/confirm`) and Profile retake/switch entry
- **Phase:** 5 — Onboarding & Career Matching
- **Concern:** Confirm chosen career, commit `educationLevel`, `favouriteSubjects`, and `activeCareerId` to store, launch `/`, and wire Retake Quiz / Switch Career on `/profile`.
- **Files (3):** `src/features/onboarding/ConfirmView.tsx`, `src/app/onboarding/confirm/page.tsx`, `src/app/profile/page.tsx`
- **Blocked by:** T-32
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Displays "Are you sure?" career summary (or unselected state if skipped) with "Yes, Launch My Dashboard" and "Go Back & Change".
  - [ ] Confirming commits only `educationLevel`, `favouriteSubjects`, and `activeCareerId` (never raw quiz answers) and navigates to `/`.
  - [ ] `/profile` exposes working "Retake Personality Quiz" (`/onboarding/quiz`) and "Switch Career" (`/paths`) actions.

---

## Phase 6: Secondary Careers Content (`2/2/2` Each in EN & BM)

### T-34: Author `product-designer` content (2 scenarios, 2 quizzes, 2 lessons in EN & BM)
- **Phase:** 6 — Secondary Careers Content (`2/2/2`)
- **Concern:** Write Nebula-level (ages 13–15) EN and BM learning content for `product-designer`.
- **Files (3):** `src/content/scenarios/product-designer.ts`, `src/content/quizzes/product-designer.ts`, `src/content/studies/product-designer.ts`
- **Blocked by:** T-20, T-22, T-23
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Contains 2 branching scenarios, 2 quizzes (5 questions each), and 2 study lessons, all with complete `en` and `ms` text.
  - [ ] Content is reviewed by the owner for factual accuracy and natural Bahasa Malaysia phrasing.

### T-35: Author `master-chef` content (2 scenarios, 2 quizzes, 2 lessons in EN & BM)
- **Phase:** 6 — Secondary Careers Content (`2/2/2`)
- **Concern:** Write Nebula-level (ages 13–15) EN and BM learning content for `master-chef`.
- **Files (3):** `src/content/scenarios/master-chef.ts`, `src/content/quizzes/master-chef.ts`, `src/content/studies/master-chef.ts`
- **Blocked by:** T-20, T-22, T-23
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Contains 2 branching scenarios, 2 quizzes (5 questions each), and 2 study lessons, all with complete `en` and `ms` text.
  - [ ] Content is reviewed by the owner for factual accuracy and natural Bahasa Malaysia phrasing.

### T-36: Register secondary careers in content indices and run full validation
- **Phase:** 6 — Secondary Careers Content (`2/2/2`)
- **Concern:** Export `product-designer` and `master-chef` arrays from all three content registries and pass automated validation.
- **Files (3):** `src/content/scenarios/index.ts`, `src/content/quizzes/index.ts`, `src/content/studies/index.ts`
- **Blocked by:** T-34, T-35
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] All 3 registries serve `product-designer` and `master-chef` content (`2/2/2` each).
  - [ ] `content-schema.test.ts` and `scenario-graph.test.ts` pass with zero missing `ms` fields or broken node links.

---

## Phase 7: Core Careers Content (`3/3/3` → `10/10/10` in Rounds)

*(Note: One ticket per career and content type. Round 1 (`T-37`–`T-45`, `3/3/3` per core career) satisfies Milestone 1 and gates Phase 9 seeding/testing. Rounds 2–3 (`T-46`–`T-63`, expanding to `6/6/6` and `10/10/10`) do not block Phases 8–10 and respect Cut #3 & Cut #4.)*

### Round 1 — Core Careers at `3/3/3` (EN & BM)

### T-37: `software-engineer` scenarios at 3 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 1: `3/3/3`)
- **Concern:** Migrate/expand `software-engineer` scenarios to 3 bilingual branching graphs in `src/content/scenarios/`.
- **Files (3):** `src/content/scenarios/software-engineer.ts`, `src/content/scenarios/index.ts`, `src/data/scenarios.ts` (remove migrated legacy file or re-export cleanly)
- **Blocked by:** T-20
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 3 `software-engineer` scenarios with full `en` and `ms` text.
  - [ ] Passes `content-schema.test.ts` and `scenario-graph.test.ts`.

### T-38: `software-engineer` quizzes at 3 (5 Q each, EN & BM)
- **Phase:** 7 — Core Careers Content (Round 1: `3/3/3`)
- **Concern:** Migrate/expand `software-engineer` quizzes to 3 five-question bilingual quizzes in `src/content/quizzes/`.
- **Files (3):** `src/content/quizzes/software-engineer.ts`, `src/content/quizzes/index.ts`, `src/data/quizzes.ts` (remove migrated legacy file)
- **Blocked by:** T-22
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 3 `software-engineer` quizzes, each with exactly 5 questions in `en` and `ms`.
  - [ ] Passes `content-schema.test.ts`.

### T-39: `software-engineer` study lessons at 3 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 1: `3/3/3`)
- **Concern:** Migrate/expand `software-engineer` study lessons to 3 bilingual lessons in `src/content/studies/`.
- **Files (3):** `src/content/studies/software-engineer.ts`, `src/content/studies/index.ts`, `src/data/studies.ts` (remove migrated legacy file)
- **Blocked by:** T-23
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 3 `software-engineer` study lessons (`30 XP` each) in `en` and `ms`.
  - [ ] Passes `content-schema.test.ts`.

### T-40: `junior-lawyer` scenarios at 3 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 1: `3/3/3`)
- **Concern:** Author/migrate 3 bilingual branching scenarios for `junior-lawyer`.
- **Files (2):** `src/content/scenarios/junior-lawyer.ts`, `src/content/scenarios/index.ts`
- **Blocked by:** T-37
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 3 `junior-lawyer` scenarios in `en` and `ms`.
  - [ ] Passes `content-schema.test.ts` and `scenario-graph.test.ts`.

### T-41: `junior-lawyer` quizzes at 3 (5 Q each, EN & BM)
- **Phase:** 7 — Core Careers Content (Round 1: `3/3/3`)
- **Concern:** Author/migrate 3 five-question bilingual quizzes for `junior-lawyer`.
- **Files (2):** `src/content/quizzes/junior-lawyer.ts`, `src/content/quizzes/index.ts`
- **Blocked by:** T-38
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 3 `junior-lawyer` quizzes (5 questions each) in `en` and `ms`.
  - [ ] Passes `content-schema.test.ts`.

### T-42: `junior-lawyer` study lessons at 3 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 1: `3/3/3`)
- **Concern:** Author/migrate 3 bilingual study lessons for `junior-lawyer`.
- **Files (2):** `src/content/studies/junior-lawyer.ts`, `src/content/studies/index.ts`
- **Blocked by:** T-39
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 3 `junior-lawyer` lessons (`30 XP` each) in `en` and `ms`.
  - [ ] Passes `content-schema.test.ts`.

### T-43: `future-doctor` scenarios at 3 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 1: `3/3/3`)
- **Concern:** Author/migrate 3 bilingual branching scenarios for `future-doctor`.
- **Files (2):** `src/content/scenarios/future-doctor.ts`, `src/content/scenarios/index.ts`
- **Blocked by:** T-40
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 3 `future-doctor` scenarios in `en` and `ms`.
  - [ ] Passes `content-schema.test.ts` and `scenario-graph.test.ts`.

### T-44: `future-doctor` quizzes at 3 (5 Q each, EN & BM)
- **Phase:** 7 — Core Careers Content (Round 1: `3/3/3`)
- **Concern:** Author/migrate 3 five-question bilingual quizzes for `future-doctor`.
- **Files (2):** `src/content/quizzes/future-doctor.ts`, `src/content/quizzes/index.ts`
- **Blocked by:** T-41
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 3 `future-doctor` quizzes (5 questions each) in `en` and `ms`.
  - [ ] Passes `content-schema.test.ts`.

### T-45: `future-doctor` study lessons at 3 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 1: `3/3/3`)
- **Concern:** Author/migrate 3 bilingual study lessons for `future-doctor`.
- **Files (2):** `src/content/studies/future-doctor.ts`, `src/content/studies/index.ts`
- **Blocked by:** T-42
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 3 `future-doctor` lessons (`30 XP` each) in `en` and `ms`.
  - [ ] Passes `content-schema.test.ts`.

### Round 2 — Expand Core Careers from `3/3/3` to `6/6/6` (EN & BM; BM >3 subject to Cut #4)

### T-46: Expand `software-engineer` scenarios to 6 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 2: `6/6/6`)
- **Concern:** Add 3 owner-reviewed `software-engineer` scenarios (total 6) in EN & BM.
- **Files (1):** `src/content/scenarios/software-engineer.ts`
- **Blocked by:** T-37
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 6 valid `software-engineer` scenarios in EN & BM passing `scenario-graph.test.ts`.

### T-47: Expand `software-engineer` quizzes to 6 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 2: `6/6/6`)
- **Concern:** Add 3 owner-reviewed 5-question `software-engineer` quizzes (total 6) in EN & BM.
- **Files (1):** `src/content/quizzes/software-engineer.ts`
- **Blocked by:** T-38
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 6 valid `software-engineer` quizzes (5 questions each) in EN & BM passing `content-schema.test.ts`.

### T-48: Expand `software-engineer` study lessons to 6 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 2: `6/6/6`)
- **Concern:** Add 3 owner-reviewed `software-engineer` study lessons (total 6) in EN & BM.
- **Files (1):** `src/content/studies/software-engineer.ts`
- **Blocked by:** T-39
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 6 valid `software-engineer` lessons in EN & BM passing `content-schema.test.ts`.

### T-49: Expand `junior-lawyer` scenarios to 6 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 2: `6/6/6`)
- **Concern:** Add 3 owner-reviewed `junior-lawyer` scenarios (total 6) in EN & BM.
- **Files (1):** `src/content/scenarios/junior-lawyer.ts`
- **Blocked by:** T-40
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 6 valid `junior-lawyer` scenarios in EN & BM passing `scenario-graph.test.ts`.

### T-50: Expand `junior-lawyer` quizzes to 6 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 2: `6/6/6`)
- **Concern:** Add 3 owner-reviewed 5-question `junior-lawyer` quizzes (total 6) in EN & BM.
- **Files (1):** `src/content/quizzes/junior-lawyer.ts`
- **Blocked by:** T-41
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 6 valid `junior-lawyer` quizzes (5 questions each) in EN & BM passing `content-schema.test.ts`.

### T-51: Expand `junior-lawyer` study lessons to 6 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 2: `6/6/6`)
- **Concern:** Add 3 owner-reviewed `junior-lawyer` study lessons (total 6) in EN & BM.
- **Files (1):** `src/content/studies/junior-lawyer.ts`
- **Blocked by:** T-42
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 6 valid `junior-lawyer` lessons in EN & BM passing `content-schema.test.ts`.

### T-52: Expand `future-doctor` scenarios to 6 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 2: `6/6/6`)
- **Concern:** Add 3 owner-reviewed `future-doctor` scenarios (total 6) in EN & BM.
- **Files (1):** `src/content/scenarios/future-doctor.ts`
- **Blocked by:** T-43
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 6 valid `future-doctor` scenarios in EN & BM passing `scenario-graph.test.ts`.

### T-53: Expand `future-doctor` quizzes to 6 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 2: `6/6/6`)
- **Concern:** Add 3 owner-reviewed 5-question `future-doctor` quizzes (total 6) in EN & BM.
- **Files (1):** `src/content/quizzes/future-doctor.ts`
- **Blocked by:** T-44
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 6 valid `future-doctor` quizzes (5 questions each) in EN & BM passing `content-schema.test.ts`.

### T-54: Expand `future-doctor` study lessons to 6 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 2: `6/6/6`)
- **Concern:** Add 3 owner-reviewed `future-doctor` study lessons (total 6) in EN & BM.
- **Files (1):** `src/content/studies/future-doctor.ts`
- **Blocked by:** T-45
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 6 valid `future-doctor` lessons in EN & BM passing `content-schema.test.ts`.

### Round 3 — Expand Core Careers from `6/6/6` to `10/10/10` (Subject to Cut #3 & Cut #4)

### T-55: Expand `software-engineer` scenarios to 10 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 3: `10/10/10`)
- **Concern:** Add 4 owner-reviewed `software-engineer` scenarios (total 10) in EN & BM.
- **Files (1):** `src/content/scenarios/software-engineer.ts`
- **Blocked by:** T-46
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 10 valid `software-engineer` scenarios in EN & BM passing `scenario-graph.test.ts`.

### T-56: Expand `software-engineer` quizzes to 10 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 3: `10/10/10`)
- **Concern:** Add 4 owner-reviewed 5-question `software-engineer` quizzes (total 10) in EN & BM.
- **Files (1):** `src/content/quizzes/software-engineer.ts`
- **Blocked by:** T-47
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 10 valid `software-engineer` quizzes (5 questions each) in EN & BM passing `content-schema.test.ts`.

### T-57: Expand `software-engineer` study lessons to 10 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 3: `10/10/10`)
- **Concern:** Add 4 owner-reviewed `software-engineer` study lessons (total 10) in EN & BM.
- **Files (1):** `src/content/studies/software-engineer.ts`
- **Blocked by:** T-48
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 10 valid `software-engineer` lessons in EN & BM passing `content-schema.test.ts`.

### T-58: Expand `junior-lawyer` scenarios to 10 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 3: `10/10/10`)
- **Concern:** Add 4 owner-reviewed `junior-lawyer` scenarios (total 10) in EN & BM.
- **Files (1):** `src/content/scenarios/junior-lawyer.ts`
- **Blocked by:** T-49
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 10 valid `junior-lawyer` scenarios in EN & BM passing `scenario-graph.test.ts`.

### T-59: Expand `junior-lawyer` quizzes to 10 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 3: `10/10/10`)
- **Concern:** Add 4 owner-reviewed 5-question `junior-lawyer` quizzes (total 10) in EN & BM.
- **Files (1):** `src/content/quizzes/junior-lawyer.ts`
- **Blocked by:** T-50
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 10 valid `junior-lawyer` quizzes (5 questions each) in EN & BM passing `content-schema.test.ts`.

### T-60: Expand `junior-lawyer` study lessons to 10 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 3: `10/10/10`)
- **Concern:** Add 4 owner-reviewed `junior-lawyer` study lessons (total 10) in EN & BM.
- **Files (1):** `src/content/studies/junior-lawyer.ts`
- **Blocked by:** T-51
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 10 valid `junior-lawyer` lessons in EN & BM passing `content-schema.test.ts`.

### T-61: Expand `future-doctor` scenarios to 10 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 3: `10/10/10`)
- **Concern:** Add 4 owner-reviewed `future-doctor` scenarios (total 10) in EN & BM.
- **Files (1):** `src/content/scenarios/future-doctor.ts`
- **Blocked by:** T-52
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 10 valid `future-doctor` scenarios in EN & BM passing `scenario-graph.test.ts`.

### T-62: Expand `future-doctor` quizzes to 10 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 3: `10/10/10`)
- **Concern:** Add 4 owner-reviewed 5-question `future-doctor` quizzes (total 10) in EN & BM.
- **Files (1):** `src/content/quizzes/future-doctor.ts`
- **Blocked by:** T-53
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 10 valid `future-doctor` quizzes (5 questions each) in EN & BM passing `content-schema.test.ts`.

### T-63: Expand `future-doctor` study lessons to 10 (EN & BM)
- **Phase:** 7 — Core Careers Content (Round 3: `10/10/10`)
- **Concern:** Add 4 owner-reviewed `future-doctor` study lessons (total 10) in EN & BM.
- **Files (1):** `src/content/studies/future-doctor.ts`
- **Blocked by:** T-54
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Exports 10 valid `future-doctor` lessons in EN & BM passing `content-schema.test.ts`.

---

## Phase 8: Split Monolithic Store into Small Domain Stores

### T-64: Extract `useSettingsStore` (`locale`, audio, motion)
- **Phase:** 8 — Store Split
- **Concern:** Separate locale and accessibility preferences into `src/features/settings/useSettingsStore.ts` and rewire Settings + Header.
- **Files (3):** `src/features/settings/useSettingsStore.ts`, `src/app/settings/page.tsx`, `src/components/layout/Header.tsx`
- **Blocked by:** T-11, T-15
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `useSettingsStore` persists `locale` (`'en' | 'ms'`), `readAloudEnabled`, `soundEffectsEnabled`, and `reduceMotion`.
  - [ ] Switching `en`/`ms` or toggling audio/motion in `/settings` and `Header` updates UI immediately without touching progression state.

### T-65: Extract `useProfileStore` (`nickname`, `educationLevel`, `favouriteSubjects`, `activeCareerId`, `leaderboardOptIn`)
- **Phase:** 8 — Store Split
- **Concern:** Separate student identity & academic profile into `src/features/profile/useProfileStore.ts` and wire Profile + Onboarding confirmation.
- **Files (3):** `src/features/profile/useProfileStore.ts`, `src/app/profile/page.tsx`, `src/features/onboarding/ConfirmView.tsx`
- **Blocked by:** T-33, T-64
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `useProfileStore` holds only minimal non-PII fields (`nickname`, `avatarChar`, `educationLevel`, `favouriteSubjects`, `activeCareerId`, `leaderboardOptIn`).
  - [ ] Profile and onboarding confirmation read/write `useProfileStore` cleanly.

### T-66: Move `useProgressionStore` into `src/features/progression/` and delete legacy `src/stores/`
- **Phase:** 8 — Store Split
- **Concern:** Relocate lean XP/skill/salary progression store into `src/features/progression/` and remove `src/stores/useProgressionStore.ts`.
- **Files (3):** `src/features/progression/useProgressionStore.ts`, `src/stores/useProgressionStore.ts` (delete), `src/features/practice/logic.ts`
- **Blocked by:** T-65
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] Zero imports from `@/stores/useProgressionStore` remain anywhere in `src/` or `tests/`.
  - [ ] All Vitest tests, `tsc --noEmit`, and `next build` pass.

---

## Phase 9: Supabase Backend, Auth, RLS, Seed, Consent & Account Deletion

### T-67: Install Supabase SDK and create browser & server clients
- **Phase:** 9 — Supabase Backend
- **Concern:** Add `@supabase/supabase-js` & `@supabase/ssr` and implement anon browser and server clients.
- **Files (3):** `package.json`, `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`
- **Blocked by:** T-06
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `client.ts` and `server.ts` use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` only.
  - [ ] `tsc --noEmit` and `next build` succeed.

### T-68: Add server-only Supabase admin client and env template
- **Phase:** 9 — Supabase Backend
- **Concern:** Isolate `SUPABASE_SERVICE_ROLE_KEY` in `src/lib/supabase/admin.ts` so it never enters client bundles.
- **Files (2):** `src/lib/supabase/admin.ts`, `.env.example`
- **Blocked by:** T-67
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `admin.ts` uses `import 'server-only'` (or server runtime guard) and reads `SUPABASE_SERVICE_ROLE_KEY`.
  - [ ] `.env.example` documents required Supabase and `NEXT_PUBLIC_DEV_SHORTCUTS` variables without real secrets.

### T-69: Author Supabase SQL schema, RLS policies, and `public_leaderboard` view
- **Phase:** 9 — Supabase Backend
- **Concern:** Create `profiles`, `user_progress`, and `user_skills` tables with strict `auth.uid() = id` RLS and anonymized public leaderboard view.
- **Files (1):** `supabase/migrations/001_init.sql`
- **Blocked by:** T-67
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `profiles` stores only `id`, `username`, `avatar_char`, `education_level`, `favourite_subjects`, `active_career_id`, `consent_accepted_at`, `leaderboard_opt_in`, `locale`, `created_at` (zero real name, school, age, phone, or parent fields).
  - [ ] RLS restricts `profiles`, `user_progress`, and `user_skills` rows to `auth.uid() = id` with `ON DELETE CASCADE` from `auth.users`.
  - [ ] `public_leaderboard` view exposes **only** `username`, `avatar_char`, `total_xp`, `simulated_salary`, `active_career_id` where `leaderboard_opt_in = true` (or `is_demo_seed = true`).

### T-70: Build Supabase dummy seed script (`supabase/seed.ts`)
- **Phase:** 9 — Supabase Backend
- **Concern:** Seed dummy demo student accounts (e.g. Demo Student) and fake leaderboard players using zero real student data.
- **Files (2):** `supabase/seed.ts`, `package.json`
- **Blocked by:** T-36, T-45, T-68, T-69
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] `npm run seed` idempotently seeds demo auth accounts + anonymized fake leaderboard rows.
  - [ ] Zero real children's names, emails, or school names exist in `supabase/seed.ts`.

### T-71: Wire Supabase Auth, parental-consent timestamp, and Demo Student login
- **Phase:** 9 — Supabase Backend
- **Concern:** Connect `/onboarding` Entry screen and session hook to real Supabase Auth sign-in, registration (`consent_accepted_at`), and Demo Student entry.
- **Files (3):** `src/features/auth/authActions.ts`, `src/features/auth/useSession.ts`, `src/features/onboarding/EntryView.tsx`
- **Blocked by:** T-28, T-66, T-69, T-70
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Registration is blocked unless parental-consent checkbox is checked; upon sign-up, `profiles.consent_accepted_at` is persisted.
  - [ ] Sign In and Demo Student authenticate against Supabase Auth and load the user's session.

### T-72: Sync `useProfileStore` and `useProgressionStore` with Supabase tables
- **Phase:** 9 — Supabase Backend
- **Concern:** Persist profile edits, onboarding confirmation, and idempotent activity XP/skills to Supabase `profiles`, `user_progress`, and `user_skills`.
- **Files (3):** `src/features/progression/sync.ts`, `src/features/progression/useProgressionStore.ts`, `src/features/profile/useProfileStore.ts`
- **Blocked by:** T-66, T-71
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Completing a lesson, quiz, scenario, or onboarding confirmation persists to Supabase and hydrates cleanly on page reload.
  - [ ] Client and server remain consistent via `features/progression/math.ts`.

### T-73: Implement password-verified cascading Delete My Account (`POST /api/account/delete`)
- **Phase:** 9 — Supabase Backend
- **Concern:** Allow signed-in students to permanently delete their account from `/settings` after re-entering their password.
- **Files (3):** `src/app/api/account/delete/route.ts`, `src/features/settings/DeleteAccountModal.tsx`, `src/app/settings/page.tsx`
- **Blocked by:** T-68, T-69, T-71
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `POST /api/account/delete` validates the session, re-verifies the user's password via Supabase Auth, and deletes `auth.users` using `admin.ts` (cascading `profiles`, `user_progress`, `user_skills`).
  - [ ] Wrong password returns `401` with a clear error; success signs out client and redirects to `/onboarding`.
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` never appears in client bundle output.

### T-74: Wire opt-in leaderboard toggle and `public_leaderboard` Supabase query
- **Phase:** 9 — Supabase Backend
- **Concern:** Default `leaderboard_opt_in` to `false`, let students toggle opt-in in `/profile`, and query `public_leaderboard` in `/leaderboard`.
- **Files (3):** `src/features/leaderboard/LeaderboardView.tsx`, `src/features/profile/ProfileView.tsx`, `src/app/profile/page.tsx`
- **Blocked by:** T-25, T-69, T-72
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] New accounts default to `leaderboard_opt_in = false` and do not appear on `/leaderboard` until opted in on `/profile`.
  - [ ] `/leaderboard` displays only `username`, `avatar_char`, `total_xp`, `simulated_salary`, and `active_career_id`.

---

## Phase 10: Real-Student Testing Round

### T-75: Prepare student testing protocol, demo accounts, and ethics/PDPA checklist
- **Phase:** 10 — Real-Student Testing Round
- **Concern:** Document testing script, dummy demo credentials, and university ethics / PDPA checklist before testing with 13–15-year-old students.
- **Files (2):** `docs/TESTING-PROTOCOL.md`, `supabase/seed.ts`
- **Blocked by:** T-70, T-73, T-74
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] Protocol uses only dummy demo accounts (zero real student PII stored or screenshotted).
  - [ ] Includes EN and BM task walkthroughs covering onboarding, study, quiz, simulation, and Ask Dreamy.

### T-76: Execute real-student testing round and log prioritized findings
- **Phase:** 10 — Real-Student Testing Round
- **Concern:** Run supervised testing sessions with target-age students and record prioritized usability, comprehension, and BM phrasing issues.
- **Files (1):** `docs/USER-TESTING-REPORT.md`
- **Blocked by:** T-75
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] Report summarizes anonymized observations (no student names/emails/photos), task completion rates, and prioritized follow-up fixes.

---

## Phase 11: Ask Dreamy Rewrite & Gemini Follow-Ups (Last)

### T-77: Author bilingual Ask Dreamy knowledge base for all 5 app careers
- **Phase:** 11 — Ask Dreamy
- **Concern:** Replace legacy `se`/`da`/`ux` data in `src/types/dreamy.ts` with Zod-validated `src/content/dreamy-kb.ts` covering all 5 careers in EN & BM.
- **Files (3):** `src/content/dreamy-kb.ts`, `src/content/schemas.ts`, `tests/content-schema.test.ts`
- **Blocked by:** T-19
- **Change type:** `no behaviour change`
- **Acceptance criteria:**
  - [ ] Covers `software-engineer`, `junior-lawyer`, `future-doctor`, `product-designer`, and `master-chef` with `"Estimated (MY)"` salaries, `salarySource`, and Malaysian SPM/Pre-U/university pathways in EN & BM.
  - [ ] `tests/content-schema.test.ts` validates 100% coverage of all 5 careers.

### T-78: Rewrite intent matcher and structured cards (`CareerMatchesCard`, `SalaryCard`)
- **Phase:** 11 — Ask Dreamy
- **Concern:** Update intent matching (EN & BM keywords) and career/salary cards to read `src/content/dreamy-kb.ts` and live user skill progress.
- **Files (3):** `src/features/dreamy/intentMatcher.ts`, `src/components/dreamy/cards/CareerMatchesCard.tsx`, `src/components/dreamy/cards/SalaryCard.tsx`
- **Blocked by:** T-66, T-77
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] `CareerMatchesCard` reads live user skills/progress instead of hardcoded `se`/`da`/`ux` counts.
  - [ ] `SalaryCard` displays `"Estimated (MY)"` badge and `salarySource` in `en` or `ms`.

### T-79: Wire `CourseRouteCard`, `AskDreamyOverlay`, and `/ask-dreamy` to bilingual KB
- **Phase:** 11 — Ask Dreamy
- **Concern:** Remove hardcoded `"Hi Alex!"`, legacy `src/types/dreamy.ts` references, and wire EN/BM Ask Dreamy chat views.
- **Files (3):** `src/components/dreamy/cards/CourseRouteCard.tsx`, `src/components/dreamy/AskDreamyOverlay.tsx`, `src/app/ask-dreamy/page.tsx`
- **Blocked by:** T-78
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Greets the signed-in student by `nickname` (never `"Alex"`) in active `en`/`ms` locale.
  - [ ] Pre-written answers and structured cards work for all 5 careers in both languages.

### T-80: Add Ask Dreamy Gemini follow-ups via Firebase AI Logic *(Stretch — Cut #2)*
- **Phase:** 11 — Ask Dreamy
- **Concern:** Add server-side Gemini follow-up endpoint for open-ended questions beyond pre-written intents, with minor-safety guardrails and zero PII.
- **Files (3):** `src/app/api/dreamy/route.ts`, `src/features/dreamy/askDreamyClient.ts`, `src/components/dreamy/AskDreamyOverlay.tsx`
- **Blocked by:** T-79
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Only triggers when pre-written intent matcher finds no confident match, with rate limiting and minor-safe system instructions.
  - [ ] Zero user identifiers (`nickname`, `email`, `userId`) are ever sent to Gemini; falls back gracefully to pre-written suggestions on failure.

---

## Phase 12: Dark Mode, Polish, Animation & Plain-Language Pass

### T-81: Add warm dark mode tokens and Settings toggle *(Stretch — Cut #1)*
- **Phase:** 12 — Polish & Stretch
- **Concern:** Implement `.dark` warm palette paired with `DESIGN.md` (never legacy `#0e1224`) and wire a theme toggle in Settings.
- **Files (3):** `src/app/globals.css`, `src/features/settings/useSettingsStore.ts`, `src/app/settings/page.tsx`
- **Blocked by:** T-12, T-64
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Toggling dark mode in `/settings` updates root class and persists preference.
  - [ ] Contrast meets WCAG AA across cards, buttons, and inputs without clinical-blue or `#0e1224` regressions.

### T-82: Add micro-interaction animations and celebrations respecting `reduceMotion`
- **Phase:** 12 — Polish & Stretch
- **Concern:** Wire `framer-motion` transitions and `canvas-confetti` celebrations for quiz 3★, scenario completion, and level-up while honoring `reduceMotion`.
- **Files (3):** `src/components/ui/CelebrationBurst.tsx`, `src/features/practice/QuizPlayer.tsx`, `src/features/practice/ScenarioPlayer.tsx`
- **Blocked by:** T-21, T-22, T-64
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Confetti and motion effects play on milestones when `reduceMotion` is `false` and are suppressed when `reduceMotion` or `prefers-reduced-motion` is enabled.

### T-83: Plain-language & EN/BM copy pass across UI and Ask Dreamy
- **Phase:** 12 — Polish & Stretch
- **Concern:** Refine EN and BM copy across `en.ts`, `ms.ts`, and `dreamy-kb.ts` for ages 13–15 clarity using Standard Technical English principles and testing feedback.
- **Files (3):** `src/content/i18n/en.ts`, `src/content/i18n/ms.ts`, `src/content/dreamy-kb.ts`
- **Blocked by:** T-76, T-79
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] All UI strings and Ask Dreamy responses read clearly for 13–15-year-old Malaysian students in both English and Bahasa Malaysia.
  - [ ] `tests/content-schema.test.ts` and `tsc --noEmit` pass.

### T-84: Restyle or cut `/resume-builder` (Cut #5) and `/notifications` (Cut #6)
- **Phase:** 12 — Polish & Stretch
- **Concern:** Either restyle `/resume-builder` (remove external photo URL, phone/email PII, clinical blue) and `/notifications` (wire or clean dead CTAs) to `DESIGN.md` tokens, or remove them per the Cut Order if short on time.
- **Files (3):** `src/app/resume-builder/page.tsx`, `src/app/notifications/page.tsx`, `src/components/layout/Header.tsx`
- **Blocked by:** T-76
- **Change type:** `behaviour change`
- **Acceptance criteria:**
  - [ ] Decision applied cleanly per Cut Order #5–#6: either both pages use warm oat tokens, store data, and have zero dead CTAs/PII, or both routes and the Header bell link are cleanly removed.
  - [ ] Final CI check (`format:check`, `lint`, `typecheck`, `test`, `build`) passes.
