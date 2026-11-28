# SPEC.md — DreamPath Specification

## 1. Goal
Build a working, maintainable, bilingual (English & Bahasa Malaysia) career exploration web app for **Malaysian secondary school students aged 13–15 (Nebula tier only)** within a 2–4 week solo university assignment. Every career and learning activity is data-driven, backed by Supabase accounts tested strictly with dummy data, and validated through a polished live demo and real-student testing.

---

## 2. Scope

### In Scope
- **Single Tier:** Nebula only (ages 13–15, Form 1–3).
- **Careers (Data-Driven):**
  - **3 Core Careers** (*Software Engineer, Junior Lawyer, Future Doctor*): **3 scenarios, 3 quizzes (5 questions each), 3 study lessons** per language in Milestone 1; expanding toward **10 / 10 / 10** per language in rounds.
  - **2 Secondary Careers** (*Product Designer, Master Chef*): **2 scenarios, 2 quizzes (5 questions each), 2 study lessons** per language.
- **Core Loop:** Study Lesson → 5-Question Quiz → Branching Scenario Simulation → XP, Skill Competency & Virtual Salary (RM) progression → Leaderboard & Profile.
- **Languages:** Full UI and learning content in **English (`en`)** and **Bahasa Malaysia (`ms`)**.
- **Accounts & Safety:** Supabase Auth (email + password), pre-made demo tester accounts, registration (`nickname`, `email`, `password`, parental-consent checkbox + timestamp), cascading account deletion, anonymized leaderboard (`username` + `avatarChar` only).
- **Ask Dreamy:** Pre-written bilingual responses + structured cards (career matches, Malaysian university/SPM routes, estimated salaries) rewritten for the 5 careers.
- **Quality & Ops:** Feature folders, one shared UI component set, design tokens only (light theme first), Zod content validation, Vitest unit tests for game math, ESLint/Prettier, GitHub Actions CI.

### Out of Scope (Removed or Deferred to `IDEAS.md`)
- **Removed:** Moonrise, Starlight, Aurora, Galaxy tiers; `/parent` page, parent PIN/lock, screen-time timers, `parentName`/`parentEmail` fields; `/achievements` page; old 3-question aptitude quiz (`src/data/aptitude.ts`, replaced by the 8-question onboarding personality quiz).
- **Deferred (see `IDEAS.md`):** Dark mode, Ask Dreamy Gemini/Firebase LLM follow-ups, real O*NET/ESCO API sync, verified parent email workflow.
- **Pre-Agreed Cut Order (if short on time):** (1) Dark mode → (2) Ask Dreamy LLM → (3) Core content >6/6/6 → (4) Malay content >3/3/3 for core → (5) Resume Builder → (6) Notifications. **Never cut:** core learning loop, real-student testing, consent/privacy basics, game-math tests.

---

## 3. Personas (Malaysian Lower Secondary, Ages 13–15)
1. **Aiman Hakim (14, Form 2, Kuala Lumpur):** Curious about Software Engineering vs. Law; learns best through short interactive scenarios and seeing how SPM subject choices connect to careers.
2. **Nurul Izzah / Mei Ling (15, Form 3, Penang):** Choosing Form 4 Science vs. Arts stream soon; switches between English and Bahasa Malaysia and checks estimated Malaysian university routes and salaries with Ask Dreamy.

---

## 4. Tech Stack
- **Framework:** Next.js 16 App Router (upgrade from `16.4.4` to patched `16.x` to clear `SecurityFatalError`), React 19, TypeScript 5.
- **Styling & UI:** Tailwind CSS v4 + design tokens from `DESIGN.md`; one shared UI primitive set (`src/components/ui/`); `lucide-react` icons; Three.js (`DreamyMascot`) kept as-is or lightweight fallback.
- **State & Validation:** Zustand 5 (thin client/session cache synced with Supabase) + Zod (schema validation for forms, API payloads, and content files).
- **Backend:** Supabase (Auth, PostgreSQL, Row-Level Security, server-side route handlers for account deletion). Hosting: Vercel + Supabase free tier.
- **Testing & CI:** Vitest (game math, scenario traversal, content schema validation), ESLint, Prettier, `tsc --noEmit`, GitHub Actions workflow.

---

## 5. Routes Table (Per `docs/CURRENT-STATE.md`)

| Route | Status | Current Gap / Target Work |
|---|---|---|
| `/` | **Partial** | KPIs, roadmap, skills hardcoded. Wire to live progression state, active career, daily quest & `en`/`ms` strings. |
| `/paths` | **Partial** | Broken career-switch IDs, hardcoded roadmap. Drive from career catalog + active career progress + Malaysian SPM/uni summary. |
| `/modes` | **Partial** | Study/Quiz links go to `/paths` or `/simulation`. Wire cards to `/modes/study`, `/modes/quiz`, `/simulation` with real counts. |
| `/modes/study` | **TO BUILD** | Lesson reader (`studies` data) with key terms, read-aloud toggle, and "Mark Complete" XP reward. |
| `/modes/quiz` | **TO BUILD** | 5-question MCQ player (`quizzes` data) with instant feedback, star rating, and XP reward. |
| `/simulation` | **Partial** | Single hardcoded 1-step case. Replace with generic data-driven `ScenarioPlayer` reading multi-node graphs. |
| `/leaderboard` | **Partial** | 15 hardcoded named rows + broken filters. Show seeded dummy Dreamers + opt-in real users (`username` + `avatarChar` only). |
| `/profile` | **Partial** | Hardcoded tier/school/skills. Render real user level, skills, completed activities, leaderboard opt-in, **retake quiz** & **switch career** actions. |
| `/settings` | **Partial** | Hardcodes Alex Rivera & broken toggles. Add `en`/`ms` language toggle, persistent sound/reduce-motion, and Delete Account. |
| `/ask-dreamy` (+ overlay) | **Partial** | Covers wrong careers (`se`/`da`/`ux`). Rewrite pre-written intents & cards for all 5 careers in `en`/`ms`. |
| `/resume-builder` | **Partial** | Clinical blue styling, hardcoded persona. Restyle to oat tokens & wire to store *(Cut #5 if needed)*. |
| `/notifications` | **Partial** | Static list, dead CTAs. Wire or drop cleanly *(Cut #6 if needed)*. |
| `/onboarding` | **TO BUILD** | Step 1 Entry: Supabase email/password login, registration (consent checkbox + timestamp), or **Demo Student** quick entry. |
| `/onboarding/profile` | **TO BUILD** | Step 2 Academic Profile: education level (**Form 1, Form 2, Form 3** only) + 2–3 favourite subjects. |
| `/onboarding/invite` | **TO BUILD** | Step 3 Quiz Invitation: CSS planet intro, profile recap, start quiz or skip; dev-only "jump to Step 3" behind `NEXT_PUBLIC_DEV_SHORTCUTS`. |
| `/onboarding/quiz` | **TO BUILD** | Step 4 Personality Quiz: 8 bilingual questions (work preferences, problem-solving style, interests). |
| `/onboarding/results` | **TO BUILD** | Step 5 Career Matching: top 3 career matches with % score and personalized bilingual match reasons (or retake). |
| `/onboarding/confirm` | **TO BUILD** | Step 6 Confirmation: "Are you sure?" career summary; locks `activeCareerId` and opens `/`. |
| `/api/account/delete` | **TO BUILD** | Server route verifying password + deleting `auth.users` via `SUPABASE_SERVICE_ROLE_KEY` (cascades profile & progress). |
| `/parent`, `/achievements` | **Removed** | Delete routes and remove all parent-lock, screen-time, mock-interview, and achievement dead code. |

*(0 routes are Done today per `docs/CURRENT-STATE.md`; all kept existing routes are Partial.)*

---

## 6. Game Rules (Single Source of Truth)

### 6.1 XP & Level Formula
Every XP gain routes through pure domain functions. Activity completions are **idempotent** (`completedActivityIds`): first completion awards XP; replays award `0 XP`.
- **Study Lesson:** `+30 XP` on completion.
- **Quiz (5 questions):** `Quiz XP = 20 + (correctCount × 8)` → range `20 XP` (0/5) to `60 XP` (5/5).
  - **Star Rating:** `3★` if `>= 80%` (4–5/5), `2★` if `60%–79%` (3/5), `1★` if `< 60%` (0–2/5).
- **Simulation Scenario:** Sum of unique visited choice `xp` + terminal node `xp` (max ~`120 XP` per scenario).
- **Daily Quest:** `+80 XP` once per quest ID.
- **Level Formula:** `Level = Math.max(1, Math.floor(totalXp / 300) + 1)` (next level every `300 XP`).

**Worked XP Example:** A student starts at `0 XP` (**Lv. 1**). They finish 1 Lesson (`+30 XP`), score `4/5` on a Quiz (`20 + 4×8 = +52 XP`, `80%` = `3★`), finish 1 Scenario (`+110 XP`), and claim 1 Daily Quest (`+80 XP`).
- `totalXp = 30 + 52 + 110 + 80 = 272 XP` → `Level = floor(272 / 300) + 1 = 1` (`28 XP` to Lv. 2).
- After 1 more Lesson (`+30 XP`): `totalXp = 302 XP` → `Level = floor(302 / 300) + 1 = 2`.

### 6.2 Virtual Monthly Salary Formula (RM)
One pure formula computes `simulatedSalary` from active career `baseSalary`, `totalXp`, and the 5 skills (`competency` clamped `0..100`). No action ever adds an ad-hoc `salaryDelta`:
$$\text{Simulated Salary (RM)} = \text{round}\Big(\text{baseSalary} \times 0.30 + \text{totalXp} \times 1.0 + \sum_{s \in \text{Skills}} (\text{competency}_s \times 3)\Big)$$

- **Worked Salary Example (Software Engineer, `baseSalary = 4500`):**
  - At start (`totalXp = 0`, all competencies `0`): `round(4500 × 0.30 + 0 + 0) = RM 1,350 /mo`.
  - At `totalXp = 302` with `problem-solving = 15`, `javascript = 10`, others `0`:
    - `BaseShare = 4500 × 0.30 = 1,350`
    - `XpBonus = 302 × 1.0 = 302`
    - `SkillBonus = (15 + 10) × 3 = 75`
    - `Simulated Salary = 1,350 + 302 + 75 = RM 1,727 /mo`.

### 6.3 Onboarding Career Matching Rules
- **Allowed Education Levels:** **Form 1, Form 2, Form 3 only.** *Reason:* All Nebula-tier content is written for ages 13–15 before Form 4 stream selection; excluding Form 4–5 / Pre-U prevents out-of-scope expectations.
- **Subjects & Quiz Inputs:** Student picks 2–3 of 6 subjects (`Mathematics`, `Science`, `Computing & Tech`, `Languages`, `Art & Design`, `Business & Economics`) and answers 8 scenario-style questions covering work preferences, problem-solving style, and interests. Each chosen option adds `+2` to its primary trait and `+1` to its secondary trait across 5 traits: `AN` (Analytical), `CR` (Creative), `SO` (Social), `BU` (Builder), `EN` (Entrepreneurial).
- **Scoring Formula (All 5 App Careers):**
  1. `traitDot = sum(userTraits[t] * career.traitWeights[t])`; `traitNorm = maxTraitDot > 0 ? traitDot / maxTraitDot : 0`.
  2. `subjectPts = sum(career.subjectWeights[s] ?? 0)` for selected subjects; `subjectNorm = subjectPts / (3 * selectedSubjects.length)`.
  3. `match = clamp(round(60 + 37 * (0.6 * traitNorm + 0.4 * subjectNorm)), 60, 97)`.
- **Top 3 & Tie-Breaking:** Sort descending by `(match, traitDot, subjectPts, catalogOrder)` and take the top 3. If `top3[i].match >= top3[i-1].match`, decrement `top3[i].match` by 1 (min `60`) so `#1 > #2 > #3` are strictly ordered.
- **Worked Matching Example:** Student picks `["Mathematics", "Computing & Tech"]` and earns `userTraits = { AN: 10, CR: 3, SO: 2, BU: 6, EN: 3 }`.
  - *Software Engineer* (`traitWeights: { AN: 3, BU: 1 }`, `subjectWeights: { Mathematics: 2, "Computing & Tech": 3 }`): `traitDot = 10×3 + 6×1 = 36` (suppose `maxTraitDot = 36`, so `traitNorm = 1.0`), `subjectPts = 2 + 3 = 5`, `subjectNorm = 5 / (3×2) = 0.833`. `match = round(60 + 37 × (0.6×1.0 + 0.4×0.833)) = round(94.53) = 95%` (#1).
  - *Future Doctor* (`traitWeights: { AN: 2, SO: 2 }`, `subjectWeights: { Mathematics: 1 }`): `traitDot = 24`, `traitNorm = 0.667`, `subjectPts = 1`, `subjectNorm = 0.167` → `match = round(60 + 37 × (0.40 + 0.067)) = 77%`.
- **Persistence & Retake:** Store only `education_level`, `favourite_subjects`, and `active_career_id`; **do not store** raw 8-question quiz answers or trait counts. Students can retake the quiz or switch careers anytime from `/profile`.
- **6-Step Flow & Transitions:**
  1. `/onboarding` (Entry): Sign In / Create Account (`nickname`, `email`, `password`, mandatory parental-consent checkbox) or **Demo Student** quick entry (authenticates seeded demo account, pre-fills `Form 2` + `["Mathematics", "Computing & Tech"]`, and lands on `/onboarding/invite`).
  2. `/onboarding/profile` (Academic Profile): Select `Form 1`, `Form 2`, or `Form 3` (`Nebula` only) and `2–3` favourite subjects.
  3. `/onboarding/invite` (Quiz Invitation): CSS planet intro + profile recap; **Start Personality Quiz** → `/onboarding/quiz`, **Skip to Dashboard** → `/onboarding/confirm` (unselected state) or `/`; dev-only "Jump to Step 3" shortcut renders strictly when `NEXT_PUBLIC_DEV_SHORTCUTS === 'true'`.
  4. `/onboarding/quiz` (Personality Quiz): 8 bilingual questions (4 options each) with progress bar, keyboard arrow navigation, Back/Next, and brief matching transition → `/onboarding/results`.
  5. `/onboarding/results` (Career Matching): Top 3 career cards (`#1 Best Match`, `#2`, `#3`) with `%` match, `"Estimated (MY)"` salary range, top skills, bilingual template match reason, **Choose This Career** → `/onboarding/confirm`, or **Retake the quiz** → `/onboarding/quiz`.
  6. `/onboarding/confirm` (Confirmation): "Are you sure?" summary card; confirming commits `education_level`, `favourite_subjects`, and `active_career_id` and opens `/`. Retaking from `/profile` enters `/onboarding/quiz` directly using saved `education_level` and `favourite_subjects`.

---

## 7. Data Schemas (Validated by Zod)
All content lives in typed data modules (`src/content/`), never hardcoded in page TSX. Every salary figure displays an `"Estimated (MY)"` badge and cites a `salarySource` (e.g., JobStreet MY / DOSM / Glassdoor MY).

- **`Career`** (`src/content/careers.ts`):
  `id`, `family` (`technology|law|healthcare|design|culinary`), `icon`, `baseSalary` (RM/mo), `salaryRange: { entry: [min, max], mid: [min, max], senior: [min, max] }`, `salarySource`, `coreSkills: SkillId[]`, `i18n: Record<'en'|'ms', { title, subtitle, description, spmSubjects, preUPaths, uniExamples }>`.
- **`Scenario`** (`src/content/scenarios/<careerId>.ts`):
  `id`, `careerId`, `startNodeId`, `i18n: Record<'en'|'ms', { title, categoryBadge, description }>`, `nodes: ScenarioNode[]`.
  Each `ScenarioNode` has `nodeId`, `type: 'decision'|'mentor'|'terminal'`, `i18n: Record<'en'|'ms', { prompt, npcName?, npcRole?, npcDialogue? }>`, `choices?: { choiceId, nextNodeId, isCorrect, skillImpacts: { skillId, xp, competencyDelta }[], i18n: Record<'en'|'ms', { label, explanation }> }[]`, `terminalOutcome?: { stars: 1|2|3, xpReward, i18n: Record<'en'|'ms', { title, summary }> }`.
- **`Quiz`** (`src/content/quizzes/<careerId>.ts`):
  `id`, `careerId`, `questions: QuizQuestion[]` (**exactly 5 questions** per quiz).
  Each `QuizQuestion` has `id`, `skillId`, `i18n: Record<'en'|'ms', { question, options: { label: 'A'|'B'|'C'|'D', text, explanation }[] }>`, `correctLabel`.
- **`StudyLesson`** (`src/content/studies/<careerId>.ts`):
  `id`, `careerId`, `readMinutes`, `xpReward: 30`, `skillId`, `i18n: Record<'en'|'ms', { title, sections: { heading, body: string[], keyTerms?: { term, definition }[] }[] }>`.
- **`OnboardingQuiz` & Scoring Matrix** (`src/content/onboarding-quiz.ts`):
  - `questions` (length `8`): `id`, `i18n: Record<'en'|'ms', { prompt }>`, `options` (length `4`: `id`, `icon`, `primaryTrait: TraitId`, `secondaryTrait: TraitId`, `i18n: Record<'en'|'ms', { label }>`).
  - `careerWeights` (keyed by all 5 `careerId`s): `subjectWeights: Partial<Record<SubjectId, 1|2|3>>`, `traitWeights: Partial<Record<TraitId, 1|2|3>>`.
  - `matchReasonTemplates`: `Record<'en'|'ms', { twoSubjects: string, oneSubject: string, traitOnly: string, traitPhrases: Record<TraitId, string>, subjectLabels: Record<SubjectId, string> }>` (template-filled; no LLM).

---

## 8. EN / BM i18n Rules
- Supported locales: `'en'` (English) and `'ms'` (Bahasa Malaysia), persisted per user and switchable in Settings/Header.
- All UI copy lives in `src/content/i18n/en.ts` and `src/content/i18n/ms.ts` with typed keys checked by TypeScript (`en` and `ms` must have identical key shapes).
- All `Career`, `Scenario`, `Quiz`, and `StudyLesson` objects embed both `en` and `ms` fields; automated tests verify zero missing `ms` translations for shipped items.
- Content workflow: AI-drafted in strict Zod schema → automated schema/i18n check → human owner + fluent Bahasa Malaysia spot-check before content freeze (1 week before deadline). Unreviewed content never ships.

---

## 9. Privacy & Data Protection Rules (Minors, Ages 13–15, PDPA)
- **Minimal Collection:** Registration collects only `nickname` (`username`), `email`, `password`, and `consent_accepted_at` (`TIMESTAMPTZ`). Onboarding stores only `education_level`, `favourite_subjects`, and `active_career_id` (**never** raw quiz answers). Zero real-name, school, phone, age, or parent-contact fields in DB or UI.
- **Consent:** Mandatory registration checkbox: *"I confirm I have my parent or guardian's permission to use DreamPath."* Timestamp stored in `profiles.consent_accepted_at`. Report documents that production requires verified parental consent and university ethics sign-off prior to under-18 testing.
- **Account Deletion:** Settings → "Delete My Account" → user re-enters password → `POST /api/account/delete` verifies credentials and deletes the user via server-only `SUPABASE_SERVICE_ROLE_KEY`, cascading `profiles`, `user_progress`, and `user_skills`. Service-role key never enters client bundles.
- **Public vs. Private Data (RLS):** `profiles` private columns (`email`, `consent_accepted_at`) are readable only by `auth.uid() = id`. The leaderboard reads a restricted public view exposing **only `username`, `avatar_char`, `total_xp`, `simulated_salary`, `active_career_id`** for seeded dummy accounts and real users with `leaderboard_opt_in = true` (default `false`).
- **Demo & Testing Hygiene:** Seed scripts populate dummy test accounts only; zero real student data in screenshots, git, or public demos. Never send personal identifiers to any future LLM endpoint.

---

## 10. UI Rules
- **Single Design System (`DESIGN.md`):** Light theme first (`#fbf9f2` warm oat canvas, `#ffffff` cards, `#e8e5dc` hairlines, `#cfe2fa` sky primary, `#d3e8da` sage secondary, `#1b1c18` ink). **Strictly no clinical blue** (`#2563EB`, `#F1F5F9`) and no leftover dark-mode pages.
- **Tokens Only & One Component Set:** All shared controls live in `src/components/ui/` using CSS/Tailwind theme tokens — no inline ad-hoc hex colors in pages.
- **Layout & Typography:** `Plus Jakarta Sans` (`font-sans`), progressive rounding (`rounded-xl`–`rounded-3xl`), fixed 5-item sidebar (`Home`, `Explore Careers`, `Practice`, `Leaderboard`, `Profile` + bottom `Settings`), floating Ask Dreamy mascot/drawer.

---

## 11. Definition of Done
1. Clean repo (`docs/CURRENT-STATE.md` issues resolved: no `/parent`, `/achievements`, unused scripts, or Next.js security error).
2. Supabase Auth + RLS + seeded dummy data + password-confirmed cascading account deletion working end-to-end.
3. Core loop (Study → 5-Q Quiz → Multi-node Scenario → XP/Salary/Level → Profile/Leaderboard) works identically for all 5 data-driven careers (`3` core at `>=3/3/3`, aiming `10/10/10`; `2` secondary at `2/2/2`) in `en` and `ms`.
4. All game-math, scenario-graph integrity, and Zod/i18n content validation tests pass in Vitest; `tsc --noEmit`, ESLint, Prettier, and `next build` pass in GitHub Actions CI.
5. Tested with dummy demo accounts and completed real-student user testing round after owner content review & freeze.
