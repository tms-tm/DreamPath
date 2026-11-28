# DreamPath — Current Repository State

Factual audit of the codebase at `c:\Users\DELL\Downloads\Projects\DreamPath` as inspected on 2026-11-28. No source files were modified during this audit.

---

## 1. Build & Type-Check Status

- **`npx tsc --noEmit`**: Exited with code `0` (0 TypeScript errors).
- **`npm run build`** (`next build` using Next.js `16.4.4` with Turbopack):
  - Compiled in `614ms`, TypeScript check finished in `3.4s`, and generated all `15/15` static pages (`12` app routes + `/_not-found`).
  - Exited with code `1` after static generation due to `Error [SecurityFatalError]: Your version of Next.js is affected by a known security vulnerability.`
- **`next.config.ts`**: Enables `cacheComponents: true`, `partialPrefetching: true`, and a Turbopack `*.css` loader rule for `@tailwindcss/turbopack`.

---

## 2. Routes & Working Status

There are **12 page routes** under `src/app/` and **0 API routes** (`src/app/api/` does not exist). All pages are `'use client'` components wrapped by `RootLayout` (`src/app/layout.tsx`) and `AppShell` (`src/components/layout/AppShell.tsx`).

### 2.1 Implemented App Routes (`src/app/**/page.tsx`)

| Route | File | Compiles & Renders | Interactive Behavior & Store Wiring | Known Gaps / Broken Behavior |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Yes (Static) | Reads `completedQuests` and calls `completeQuest('quest-btn-1', 80)` when clicking `Start Quest` → `Deploy & Claim +80 XP`. | `profile`, `totalXp`, `simulatedSalary`, and `skills` are destructured from `useProgressionStore` (lines 9–14) but unused in JSX. Top 3 stat cards (`1,280 XP`, `Lv. 4`, `RM 2,160 /mo`, `+RM 120`, `7-Day Streak`), Career Roadmap (`Software Engineer`, `35%`), and Skill Progress (`JavaScript 75%`, `React 40%`, `System Design 15%`) are hardcoded. `'quest-btn-1'` is already in initial `completedQuests`, so the daily quest appears completed on initial load. |
| `/paths` | `src/app/paths/page.tsx` | Yes (Static) | Calls `setActiveCareer(...)` on 4 "Try Other Careers" cards. | `profile` is destructured but unused. Roadmap (`Junior Full-Stack Developer`, `78%`), market trends (`4,820+`, `RM 3,500 - 4,800`), and NOSS skills are hardcoded. The 4 `Switch Track →` buttons pass IDs (`'career-data-analyst'`, `'career-cyber-analyst'`, `'career-cloud-associate'`, `'career-ai-specialist'`) that do not exist in `CAREER_PATHS` (`src/types/career.ts`), causing `Header.tsx` to fall back to `CAREER_PATHS[0]` (`software-engineer`). `Explore 16+ Roles →` is a static `<span>` with no handler. |
| `/modes` | `src/app/modes/page.tsx` | Yes (Static) | Displays `profile.streakDays` and `totalXp` (out of hardcoded `1,500 XP` in "Upcoming Milestone"). | Study Mode CTA (`Read Interactive Notes`) links to `/paths`; Quiz Mode CTA (`Start Quiz Challenge`) links to `/simulation`; Simulation Mode CTA (`Launch Simulation`) links to `/simulation`. No `/modes/study` or `/modes/quiz` pages exist. Daily target (`180 / 250 XP`, `72%`), active modules, mastered skills, and weekly lab challenge are hardcoded. |
| `/simulation` | `src/app/simulation/page.tsx` | Yes (Static) | Interactive 1-step, 3-option decision exercise. `Commit Decision & Run Simulation` reveals feedback and calls `applyReward` + (for Option A) `applySkillImpacts`. | Single hardcoded scenario (`Software Engineer: Stop the Silent Breach`); does not import `SCENARIO_DATABASE` from `src/data/scenarios.ts` and has no multi-node branching. `profile` is destructured but unused. Non-optimal Options B & C both call `applyReward({ xp: 40, salaryDelta: 0, missionCountDelta: 1 })` despite UI badges showing `-RM 50/mo` (Option B) and `+20 XP` (Option C). The debrief banner always prints `+120 XP Awarded` regardless of choice. For Option A, calling `applySkillImpacts` immediately after `applyReward` overwrites `simulatedSalary` with the `applySkillImpacts` formula. |
| `/leaderboard` | `src/app/leaderboard/page.tsx` | Yes (Static) | Displays `simulatedSalary`, `profile.avatarChar`, `profile.name`, and `totalXp` in hardcoded row `#14`. Timeframe tabs (`activeTab`) and filter pills (`activeFilter`) toggle local state only. | Does not import `LEADERBOARD_ENTRIES` from `src/data/leaderboard.ts`. Top 4 stat cards (`#14`, `Top 12% in Aurora Tier`, `+RM 120`, `RM 340`), podium `#1`–`#3`, rows `#4`–`#13` and `#15`, and row `#14`'s school (`St. Xavier National Academy`), track (`Software Engineer`), and tier (`Aurora Tier · Lv. 4`) are hardcoded. Tabs/filters do not change displayed rows. `Filter Tracks`, `Export`, and pagination buttons (`Prev`, `1`, `2`, `3`, `Next`) have no `onClick` handlers. |
| `/profile` | `src/app/profile/page.tsx` | Yes (Static) | Displays `profile.avatarChar`, `profile.name`, `totalXp`, `simulatedSalary`, `profile.missionsCompleted`, and `profile.streakDays`. | Tier/level badge (`Galaxy Tier · Lv. 4`), school (`SMK Bandar Utama Damansara`), target career (`Software Engineer`), XP bar (`75%`, `220 XP to Level 5`), all 5 `skillEntries`, `Earned badges`, and `Recent simulation highlights` are hardcoded rather than read from `skills` or `achievements` in the store. |
| `/resume-builder` | `src/app/resume-builder/page.tsx` | Yes (Static) | Initializes `name` from `profile.name`. Local inputs, skill/language toggles and sliders, `Include Certificate` toggle, and live A4 preview work in local component state; `Download Resume (PDF)` calls `window.print()`. | Does not read `skills`, `achievements`, or `educationTier` from the store, and edits do not persist to the store or `localStorage`. `Change photo`, `Suggest with Career Counsellor`, all 4 `Add another` / `Add a skill` buttons, `Page Setup`, and `zoom_out` / `zoom_in` buttons have no `onClick` handlers. Uses `slate`/`blue` Tailwind classes instead of warm oat tokens. |
| `/ask-dreamy` | `src/app/ask-dreamy/page.tsx` | Yes (Static) | Interactive chat with regex-based `detectIntent`, 750ms simulated delay, `DreamyMascot` (Three.js + `/models/dreamy.glb`), `DreamyBackdrop`, and structured cards (`CareerMatchesCard`, `CourseRouteCard`, `SalaryCard`). | Not linked in `Sidebar`, `MobileNav`, or `Header` (accessible only by direct URL). Uses simulated regex intent matching (no LLM/API) over the 3 careers in `src/types/dreamy.ts` (`se`, `da`, `ux`). `AppShell` hides `Header` and `AskDreamyOverlay` on this route. |
| `/achievements` | `src/app/achievements/page.tsx` | Yes (Static) | Reads `profile`, `achievements`, `totalXp` from store; `Export Certificate` calls `window.print()`. | Not linked in `Sidebar`, `MobileNav`, or `Header` (accessible only by direct URL). Uses dark-mode styling (`bg-[#0e1224]`, `text-white`). No route or UI action in the app calls `unlockAchievement`. |
| `/notifications` | `src/app/notifications/page.tsx` | Yes (Static) | Linked from `Header` bell icon. Category filters (`all`, `unread`, `job`, `fair`, `uni`) and `Mark all as read` work on local `NOTIFICATIONS` array. | `In-Tab Preferences`, per-card CTA buttons, and the floating `Ask Career Counsellor` button have no `onClick` handlers. |
| `/parent` | `src/app/parent/page.tsx` | Yes (Static) | Reads `profile` and `setSettings`; Child/Parent view switcher works; Parent view unlocks with passcode `'1234'` or `'parent'` and updates `screenTimeMaxMinutes` (`45`/`60`/`90`/`120`). | Not linked in `Sidebar`, `MobileNav`, or `Header` (accessible only by direct URL). Uses dark-mode styling (`bg-[#0e1224]`, `text-white`). `addScreenTime` is destructured but unused; weekly progress report text is hardcoded. |
| `/settings` | `src/app/settings/page.tsx` | Yes (Static) | Linked from `Sidebar` bottom link. Tier picker updates `profile.educationTier` via `updateProfile`; `Read questions aloud` updates `profile.readAloudEnabled` via `setSettings`. | `soundEffects` and `reduceMotion` toggles update local `useState` only and do not persist to `profile.soundEffectsEnabled` or `profile.reduceMotion`. `Age: 17`, `School / Academy: SMK Bandar Utama Damansara`, `Upper Secondary (...)`, and `alex.rivera@example.com` are hardcoded. `Change Password`, `Edit`, and `Sign Out` buttons have no `onClick` handlers. |

### 2.2 Global Navigation & Shell (`src/components/layout/` & `src/components/dreamy/`)

- **`Sidebar.tsx`** (desktop `md:block`): Links to `/` (`Home`), `/paths` (`Explore Careers`), `/modes` (`Practice`), `/leaderboard` (`Leaderboard`), `/profile` (`Profile`), and `/settings` (`Settings`). Reads `profile.avatarChar`, `profile.name`, `profile.educationTier`, and `profile.currentLevel`.
- **`MobileNav.tsx`** (mobile `< md`): Links to `/`, `/paths`, `/modes`, `/leaderboard`, `/profile`.
- **`Header.tsx`**: Hidden on `/ask-dreamy`. Displays `Good evening, {profile.name}` (or `Profile` on `/profile`), a career `<select>` bound to `profile.activeCareerId` (`CAREER_PATHS`), a Read Aloud toggle (`speakText` / `stopSpeaking` from `src/utils/sound.ts`), a notification bell link to `/notifications` (with static red dot), and an avatar link to `/profile`.
- **`AskDreamyOverlay.tsx`**: Rendered on all routes except `/ask-dreamy`. Draggable 3D mascot (`DreamyMascot` loading `/models/dreamy.glb`, position saved in `localStorage` key `'dreampath_dreamy_pos'`) and popup chatbox with the same regex `detectIntent` and 3 cards (`CareerMatchesCard`, `CourseRouteCard`, `SalaryCard`) as `/ask-dreamy`.

### 2.3 Routes in `SPEC.md` That Do Not Exist

The following routes specified in `SPEC.md` are not implemented in `src/app/`:
- `/onboarding`, `/onboarding/login`, `/onboarding/register`, `/onboarding/career-quiz`, `/onboarding/education`, `/onboarding/career-select`
- `/home` (the dashboard is at `/` instead)
- `/modes/study`, `/modes/quiz`, `/modes/simulation`
- `/quests/daily`
- `/api/mentor`, `/api/quests` (no API routes exist)

---

## 3. `src/data/` Import Audit

There are **5 files** in `src/data/`. **None of them are imported anywhere in `src/`.**

| File | Exported Symbols | Imported in `src/`? | Notes |
| :--- | :--- | :--- | :--- |
| `src/data/aptitude.ts` | `AptitudeQuestion`, `APTITUDE_QUESTIONS` | **No** (0 imports) | 3-question aptitude quiz matching `'software-engineer'`, `'junior-lawyer'`, `'future-doctor'`. |
| `src/data/leaderboard.ts` | `LeaderboardEntry`, `LEADERBOARD_ENTRIES` | **No** (0 imports) | 8 mock entries using `earningsUsd`. `/leaderboard` renders inline hardcoded rows instead. |
| `src/data/quizzes.ts` | `QuizQuestion`, `CareerQuiz`, `QUIZ_DATABASE` | **No** (0 imports) | 3 career quizzes (`'software-engineer'`, `'junior-lawyer'`, `'future-doctor'`), 3 questions each, `xpReward: 60`. |
| `src/data/scenarios.ts` | `ScenarioChoice`, `ScenarioNode`, `CareerScenario`, `SCENARIO_DATABASE` | **No** (0 imports) | Imports `SkillId` from `@/types/career`. Contains branching graphs for `'software-engineer'`, `'junior-lawyer'`, `'future-doctor'`. `/simulation` does not use it. |
| `src/data/studies.ts` | `StudyArticle`, `STUDY_DATABASE` | **No** (0 imports) | 3 study articles (`'software-engineer'`, `'junior-lawyer'`, `'future-doctor'`), `xpReward: 30`. |

**Data files outside `src/data/` that ARE imported:**
- `src/types/career.ts`: Exports `EDUCATION_TIERS` (5 tiers: `moonrise`, `starlight`, `aurora`, `nebula`, `galaxy`) and `CAREER_PATHS` (5 careers: `software-engineer`, `junior-lawyer`, `future-doctor`, `product-designer`, `master-chef`). Imported by `useProgressionStore.ts`, `Header.tsx`, `Sidebar.tsx`, `achievements/page.tsx`, `parent/page.tsx`, `settings/page.tsx`.
- `src/types/dreamy.ts`: Exports `UNIS` (`um`, `uitm`, `sunway`, `mmu`), `SPM_REQUIREMENTS` (`sciPublic`, `sciDiploma`, `sciPrivate`, `artPublic`, `artPrivate`), and `CAREERS` (`se` Software Engineer, `da` Data Analyst, `ux` UX Designer). Imported by `ask-dreamy/page.tsx`, `AskDreamyOverlay.tsx`, `CareerMatchesCard.tsx`, `CourseRouteCard.tsx`, `SalaryCard.tsx`.

---

## 4. Zustand Store Real Fields & Actions

Only one Zustand store exists: `useProgressionStore` in `src/stores/useProgressionStore.ts`, persisted to `localStorage` under key `'dreampath-user-state'` via `createJSONStorage(() => localStorage)` (no `partialize`).

### 4.1 State Fields & Initial Default Values

- **`profile: UserProfile`**:
  - `name`: `'Alex Rivera'` (`string`)
  - `handle`: `'@alexdreams'` (`string`)
  - `avatarChar`: `'A'` (`string`)
  - `age`: `11` (`number`)
  - `joinedDate`: `'12 January 2025'` (`string`)
  - `currentLevel`: `4` (`number`)
  - `educationTier`: `'aurora'` (`TierId`: `'moonrise' | 'starlight' | 'aurora' | 'nebula' | 'galaxy'`)
  - `activeCareerId`: `'software-engineer'` (`string`)
  - `screenTimeUsedMinutes`: `38` (`number`)
  - `screenTimeMaxMinutes`: `60` (`number`)
  - `readAloudEnabled`: `true` (`boolean`)
  - `soundEffectsEnabled`: `true` (`boolean`)
  - `reduceMotion`: `false` (`boolean`)
  - `colorMode`: `'dark'` (`'dark' | 'light'`)
  - `parentName`: `'Maria Rivera'` (`string`)
  - `parentEmail`: `'maria.rivera@example.com'` (`string`)
  - `streakDays`: `7` (`number`)
  - `missionsCompleted`: `24` (`number`)
  - `learningTimeMinutes`: `272` (`number`)
- **`totalXp`**: `1280` (`number`)
- **`simulatedSalary`**: `2160` (`number`)
- **`skills`**: `Record<SkillId, SkillProgress>` (`{ xp: number; competency: number }`), where `SkillId` is `'html-css' | 'javascript' | 'problem-solving' | 'communication' | 'accessibility'`:
  - `'html-css'`: `{ xp: 450, competency: 78 }`
  - `javascript`: `{ xp: 320, competency: 55 }`
  - `'problem-solving'`: `{ xp: 510, competency: 82 }`
  - `communication`: `{ xp: 260, competency: 64 }`
  - `accessibility`: `{ xp: 190, competency: 48 }`
- **`achievements`**: `AchievementItem[]` (6 items from `INITIAL_ACHIEVEMENTS`: 4 unlocked — `'cyber-guardian'`, `'sharp-advocate'`, `'careful-clinician'`, `'streak-master'`; 2 locked — `'master-architect'`, `'plan-b-strategist'`)
- **`careerProgress`**: `Record<string, number>`:
  - `'software-engineer': 38`, `'junior-lawyer': 12`, `'future-doctor': 25`, `'product-designer': 20`, `'master-chef': 10`
- **`completedQuests`**: `string[]` — initialized to `['quest-btn-1']`

### 4.2 Store Actions

- `setColorMode(mode)` / `toggleColorMode()` — updates `profile.colorMode` (not read by any component or layout).
- `setEducationTier(tier)` — updates `profile.educationTier`.
- `setActiveCareer(careerId)` — updates `profile.activeCareerId`.
- `setSettings(settings)` — partial update of `readAloudEnabled | soundEffectsEnabled | reduceMotion | screenTimeMaxMinutes`.
- `updateProfile(updated)` — partial update of `profile`.
- `addScreenTime(mins)` — increments `profile.screenTimeUsedMinutes`, clamped to `profile.screenTimeMaxMinutes`.
- `applySkillImpacts(impacts)` — updates `skills`, `totalXp`, `simulatedSalary`, and `profile.currentLevel`.
- `applyReward({ xp, salaryDelta, missionCountDelta })` — updates `totalXp`, `simulatedSalary`, `profile.currentLevel`, and `profile.missionsCompleted`.
- `completeQuest(questId, xpReward)` — if `questId` is not in `completedQuests`, appends `questId`, adds `xpReward` to `totalXp`, adds `80` to `simulatedSalary`, and increments `profile.missionsCompleted` by `1`.
- `unlockAchievement(id)` — sets `unlocked: true` and `unlockedAt: 'Just now'` on matching achievement.
- `calculateSalary()` — returns computed salary number without mutating state (not called anywhere in `src/`).

---

## 5. Real Salary, XP, and Level Formulas

### 5.1 Implemented Formulas (`src/stores/useProgressionStore.ts`)

1. **Level Calculation** (in `applySkillImpacts` line 213 and `applyReward` line 238):
   ```ts
   newLevel = Math.max(1, Math.floor(newTotalXp / 300) + 1)
   ```
   - `completeQuest` does **not** recalculate `profile.currentLevel`.
   - Initial store values (`totalXp: 1280`, `currentLevel: 4`) do not match this formula (`Math.floor(1280 / 300) + 1 = 5`).

2. **XP Updates**:
   - `applySkillImpacts(impacts)`: `gainedXp = sum(Math.max(0, impact.xp))`; `newTotalXp = state.totalXp + gainedXp`; each skill's `xp` increases by `impact.xp` and `competency` is clamped to `[0, 100]` after adding `impact.competencyDelta ?? 0`.
   - `applyReward({ xp = 0 })`: `newXp = state.totalXp + xp`.
   - `completeQuest(questId, xpReward)`: `newXp = state.totalXp + xpReward`.
   - Note: `EDUCATION_TIERS` in `src/types/career.ts` defines `xpPerQuiz` (`10, 20, 30, 40, 50`) and `checkpointXp` (`20, 40, 60, 80, 100`), which are **never read** in any calculation.

3. **Salary Calculation** (three inconsistent paths in `src/stores/useProgressionStore.ts`):
   - **`applySkillImpacts` (lines 216–222)**:
     ```ts
     const base = CAREER_PATHS.find((c) => c.id === state.profile.activeCareerId)?.baseSalary ?? 5000;
     const competencySum = Object.values(nextSkills).reduce(
       (acc, curr) => acc + (curr.competency / 100) * 150,
       0
     );
     const calculatedSalary = Math.round(base * 0.25 + newTotalXp * 0.8 + competencySum);
     ```
     *(With initial values for `'software-engineer'` where `base = 6200`, `totalXp = 1280`, and initial competencies `[78, 55, 82, 64, 48]`, this evaluates to `3065`, whereas initial `simulatedSalary` is hardcoded to `2160`.)*
   - **`calculateSalary()` (lines 272–277, unused)**:
     ```ts
     Math.round(base * 0.25 + state.totalXp * 0.8)
     ```
     *(Omits `competencySum`.)*
   - **`applyReward`**: Adds `salaryDelta` directly to `state.simulatedSalary`.
   - **`completeQuest`**: Adds hardcoded `80` to `state.simulatedSalary` regardless of `xpReward`.

4. **Static Career Salary Ranges (`src/types/dreamy.ts`, used by `SalaryCard.tsx`)**:
   - `'se'` (Software Engineer): entry `RM 3,500–5,000`, mid `RM 6,000–9,000`, senior `RM 10,000–15,000`
   - `'da'` (Data Analyst): entry `RM 3,000–4,500`, mid `RM 5,000–7,500`, senior `RM 8,000–12,000`
   - `'ux'` (UX Designer): entry `RM 3,000–4,500`, mid `RM 5,000–8,000`, senior `RM 9,000–13,000`

### 5.2 Discrepancy vs. `SPEC.md`

`SPEC.md` (lines 155–165) specifies star accuracy thresholds (`>= 90%`, `60%–89%`), `Quiz XP = 10 * Tier Level Number`, and `Simulated Salary = Base Salary + (Total XP * 15) + sum(Skill Competency Level * 250)`. None of those formulas are implemented in `src/`.

---

## 6. Installed Dependencies & Versions

From `package.json` and `node_modules/<pkg>/package.json`:

### 6.1 `dependencies`

| Package | Declared (`package.json`) | Installed (`node_modules`) | Used in `src/`? |
| :--- | :--- | :--- | :--- |
| `@types/three` | `^0.187.0` | `0.187.0` | Yes (`DreamyMascot.tsx` types) |
| `canvas-confetti` | `^1.9.4` | `1.9.4` | **No** |
| `clsx` | `^2.1.1` | `2.1.1` | Yes (`src/lib/utils.ts` `cn`, though `cn` itself is unused) |
| `framer-motion` | `^14.9.0` | `14.9.0` | **No** |
| `lucide-react` | `^1.67.0` | `1.67.0` | Yes (`achievements/page.tsx`, `parent/page.tsx`) |
| `next` | `16.4.4` | `16.4.4` | Yes |
| `react` | `19.3.0` | `19.3.0` | Yes |
| `react-dom` | `19.3.0` | `19.3.0` | Yes |
| `tailwind-merge` | `^3.7.0` | `3.7.0` | Yes (`src/lib/utils.ts` `cn`, though `cn` itself is unused) |
| `three` | `^0.187.0` | `0.187.0` | Yes (`DreamyMascot.tsx`) |
| `zustand` | `^5.0.16` | `5.0.16` | Yes (`src/stores/useProgressionStore.ts`) |

### 6.2 `devDependencies`

| Package | Declared (`package.json`) | Installed (`node_modules`) |
| :--- | :--- | :--- |
| `@tailwindcss/turbopack` | `^4` | `4.3.4` |
| `@types/canvas-confetti` | `^1.9.0` | `1.9.0` |
| `@types/node` | `^20` | `20.19.43` |
| `@types/react` | `^19` | `19.3.0` |
| `@types/react-dom` | `^19` | `19.3.0` |
| `eslint` | `^9` | `9.39.5` |
| `eslint-config-next` | `16.4.4` | `16.4.4` |
| `tailwindcss` | `^4` | `4.3.4` |
| `typescript` | `^5` | `5.9.3` |

*Note: `SPEC.md` references `shadcn/ui`, `@radix-ui/*`, `zod`, `ajv`, `@supabase/*`, `openai`, and `ai`; none of these are installed.*

---

## 7. Hardcoded Values, Personal Data, & Unused Assets

### 7.1 Hardcoded Persona & Fake Personal Data

- **Store defaults (`useProgressionStore.ts`)**: `name: 'Alex Rivera'`, `handle: '@alexdreams'`, `avatarChar: 'A'`, `age: 11`, `joinedDate: '12 January 2025'`, `educationTier: 'aurora'`, `parentName: 'Maria Rivera'`, `parentEmail: 'maria.rivera@example.com'`.
- **`AskDreamyOverlay.tsx` & `ask-dreamy/page.tsx`**: Initial greeting hardcodes `"Hi Alex! I'm Dreamy..."`.
- **`profile/page.tsx`**: Hardcodes `Galaxy Tier · Lv. 4`, `SMK Bandar Utama Damansara`, `Target career: Software Engineer`, `220 XP to Level 5`, `75%` XP bar, 5 `skillEntries`, 3 `Earned badges`, and 2 `Recent simulation highlights`.
- **`resume-builder/page.tsx`**: Hardcodes initial states `'Alex Rivera'`, `'Aspiring Software Engineer'`, `'SMK Bandar Utama Damansara'`, `'alex.rivera@student.edu.my'`, `'+60 12-345 6789'`, `'Science Stream (SPM Candidate)'`, `'2025'`, `'Kuala Lumpur, Malaysia'`, `Coding Club — Vice-President`, `National Robotic Olympiad — Finalist`, `DreamPath Web Foundations Certificate (Issued 2026)`, and an external profile photo URL (`lh3.googleusercontent.com/aida-public/...`).
- **`settings/page.tsx`**: Hardcodes `Age: 17`, `School / Academy: SMK Bandar Utama Damansara`, `Upper Secondary (...)`, and `alex.rivera@example.com`.
- **`leaderboard/page.tsx`**: Hardcodes 14 named Malaysian/international student entries (ranks `#1`–`#13` and `#15`, with school names like `Penang Free School`, `Victoria Institution`, `SMK Convent Bukit Nanas`, etc.) and row `#14` school `St. Xavier National Academy`, `Software Engineer`, `Aurora Tier · Lv. 4`, plus top KPI cards (`#14`, `Top 12% in Aurora Tier`, `+RM 120`, `RM 340`, `Season 4 Reset in 3d 14h`).
- **`parent/page.tsx`**: Hardcodes linked parent avatar `'M'`, demo passcode `'1234'` / `'parent'`, and weekly breakdown (`Technology 65%`, `Civics & Law 20%`, `Healthcare 15%`).

### 7.2 Hardcoded UI Metrics & Content by Page

- **`src/app/page.tsx`**: Hardcodes `1,280 XP`, `Lv. 4`, `to Lv. 5` (`65%`), `RM 2,160 /mo`, `+RM 120`, `7-Day Streak`, `Job Galaxy`, Daily Quest `#42` (`Fix the Missing Button`, `+80 XP`, `1/3 Quests`), Roadmap (`Software Engineer`, `35%`), Skills (`JavaScript 75%`, `React 40%`, `System Design 15%`), and 3 static recommendation items.
- **`src/app/modes/page.tsx`**: Hardcodes `Daily Target: 180 / 250 XP` (`72% Completed Today`, `+70 XP needed`), `Lesson 4 of 12` (`Software Engineering: Clean Code`, `33%`), `Quiz Mode` copy referencing `Aurora educational tier (Ages 10–12 / Upper Primary)` and `96% High Score`, `Scenario #42: The Disappearing Checkout Button`, `Recently Mastered Skills` (`HTML/CSS Box Model 100%`, `Git Branching 85%`, `JavaScript Functions 60%`), `Aurora Rank Certification` (`1,500 XP` denominator), and `Weekly Lab Challenge` (`2/3 done`, `+100 XP`).
- **`src/app/paths/page.tsx`**: Hardcodes `Junior Full-Stack Developer` (`78% Roadmap Mastered`, `Est. Readiness: 4 Months`, 4 steps), 4 alternative career cards (`RM 3,800–4,500/mo`), `Mission #14` (`+120 XP`, `Aurora Tier Certificate`), Malaysian job market stats (`4,820+`, `RM 3,500 - 4,800`), and Software Engineer NOSS requirements.
- **`src/app/simulation/page.tsx`**: Hardcodes single scenario `Incident #42 — Unusual Outbound Traffic` with 3 static decision objects.
- **`src/app/notifications/page.tsx`**: Hardcodes 4 Malaysian student opportunity alerts (`Grab Malaysia`, `KL STEM & Tech Career Fair 2026`, `Universiti Malaya Open Day`, `Axiata Digital`).
- **`src/components/dreamy/cards/CareerMatchesCard.tsx`**: Hardcodes `matchKeys = ['se', 'da', 'ux']` and static `"X of 5 skills"` values from `CAREERS` (`4`, `3`, `3`) rather than reading user skill progress.

### 7.3 External Assets, Styling & Unused Utilities

- **External URLs**:
  - `src/app/layout.tsx`: Loads Google Fonts `Plus Jakarta Sans` and `Material Symbols Outlined` via `<link>` tags.
  - `AskDreamyOverlay.tsx`, `ask-dreamy/page.tsx`, `DreamyMascot.tsx`, `leaderboard/page.tsx`, `resume-builder/page.tsx`: Use `https://lh3.googleusercontent.com/aida-public/...` image URLs.
- **Local 3D Model**: `public/models/dreamy.glb` (`1,146,968` bytes) is loaded at runtime by `DreamyMascot.tsx`.
- **Theme Mixing**:
  - Global canvas in `layout.tsx` and `globals.css` is light warm oat (`#fbf9f2` / `bg-surface`), and `Sidebar`, `Header`, `MobileNav`, `paths`, `modes`, `leaderboard`, `profile`, `settings`, `simulation`, `notifications`, `ask-dreamy` use light styling.
  - `/achievements` and `/parent` use dark-mode hardcoded colors (`bg-[#0e1224]`, `text-white`), which render as dark cards on the light `#fbf9f2` page background.
  - `src/app/page.tsx` and `src/app/resume-builder/page.tsx` use bright clinical blue classes (`#0E86D4`, `#2563EB`, `bg-blue-100`, `text-blue-900`) and undefined `text-charcoal-muted` in `src/app/page.tsx` (not defined in `tailwind.config.js` or `globals.css`).
- **Unused Source Files & Exports**:
  - `src/lib/utils.ts` (`cn`) — never imported.
  - `src/utils/sound.ts` (`playSound`) — `playSound` is never imported (`speakText` and `stopSpeaking` are used in `Header.tsx`).
  - Root prototype/helper scripts (`extract_explore.js`, `extract_lb_prof.js`, `inspect_explore.js`, `inspect_explore_sections.js`, `preview_sections.js`), `stitch_home.json`, and `stitch_screens/*.html` — not imported by `src/`.
