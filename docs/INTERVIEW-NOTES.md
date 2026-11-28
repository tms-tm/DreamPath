# DreamPath: Interview Notes (merged scope decisions)

Source for `/to-spec`. Merged from two interviews. Where they conflicted, the Antigravity interview (Interview B) wins.
If SPEC.md and this file disagree, ask the owner.

## Context
- University assignment, solo developer, 2 to 4 weeks.
- Marked on: a polished live demo and user testing with real students.
- Users: Malaysian students aged 13-15 (Nebula tier only). Other tiers are out.

## Decisions

| Area | Decision |
|---|---|
| Core careers (full depth) | Software Engineer, Lawyer, Doctor |
| Content per core career | 10 scenarios, 10 quizzes (~5 questions each), 10 study lessons |
| Other careers in the app | Product Designer, Master Chef (confirm): minimum 2 scenarios, 2 quizzes, 2 lessons each |
| Architecture | Data-driven. No hardcoded career pages. Adding a career = adding data files |
| Languages | English and Bahasa Malaysia. UI and all content in both |
| Accounts | Supabase Auth, email + password |
| Tester sign-in | Pre-made demo accounts, plus registration |
| Registration data | Nickname, email, password only |
| Consent | Checkbox at registration ("I have my parent/guardian's permission") and store the consent timestamp. Report notes that production needs verified parental consent |
| Account deletion | "Delete My Account" in Settings. Confirm with password. Cascading delete of all user data |
| Parent features | Removed entirely: no /parent page, no "Parent Space", no parent view or child/parent switcher, no PIN or passcode, no screen-time limits or tracking, no linked-parent name or email, no parent mentions in Settings or navigation |
| Mock interview | Removed. Not in the spec, the Profile page or the navigation |
| Leaderboard | Username + avatar character only. Seeded fake players. Real students only if they opt in |
| Ask Dreamy | Pre-written answers for career facts (rewritten for the careers above). Gemini via Firebase AI Logic for open-ended follow-ups, built last (stretch) |
| Theme | Light first. Dark mode only after everything else is done |
| Onboarding | 6-step flow with personality quiz and career matching (see section below) |
| Pages in | Home, Career paths, Simulation, Practice modes, Leaderboard, Profile, Settings (basic: sound, reduced motion, delete account), Ask Dreamy, Resume builder, Notifications |
| Pages out | Parent, Achievements. Also out: mock interview prep (old SPEC Profile tab) |
| Test data | Dummy data only in the database. No real children's data in demos or screenshots |

## Conflicts resolved (Interview B wins)

| Topic | Interview A (this chat) | Interview B | Result |
|---|---|---|---|
| Careers | 5 careers, 10/10/10 each | 3 careers | 3 core careers at 10/10/10; the other 2 existing careers at 2/2/2 minimum |
| LLM provider | Not chosen | Gemini via Firebase AI Logic | Firebase AI Logic, built last |
| Parent controls | Remove page and PIN | Remove everything incl. screen time | Remove everything, incl. screen-time and parent fields in the store |
| Consent | Parent consent + ethics check | Checkbox + timestamp | Checkbox + timestamp. Still ask the university about ethics for testing with under-18s |
| Account deletion | Included | Detailed flow | Interview B flow |

Not in Interview B (kept from A): bilingual EN/BM, page list, dark mode timing, content freeze, cut order.
The pasted Interview B ended before the leaderboard answer. The recommended option (username + avatar only) matches A, so A's rule stands.

## Onboarding and career matching (added later)
Source: the owner's Gemini HTML mockup (personality quiz). Replaces the unused 3-question `src/data/aptitude.ts`.

Flow:
1. Entry: log in, register (with consent checkbox), or pick **Demo Student** quick entry.
2. Academic profile: education level (Form 1 to Form 5) and 2 to 3 favourite subjects.
3. Quiz invitation screen (CSS planet).
4. Personality quiz: 8 questions (work preferences, problem-solving style, interests).
5. Career matching: top 3 matches from a scoring matrix (subjects + quiz answers), with personalised match reasons.
6. Confirmation: "Are you sure?" with career summary. Locks `activeCareerId`, then opens the dashboard.

Rules:
- Matching runs on the careers that exist in the app (3 core + 2 other). Every career needs scores in the matrix.
- Scoring is a pure function in `src/lib` with Vitest tests (same answers always give the same result).
- Match reasons are bilingual templates filled from the top scoring subjects and traits. No LLM.
- Quiz questions, options and reasons exist in English and Bahasa Malaysia.
- Store only what is needed: education level, favourite subjects, chosen career. Do not store raw quiz answers unless a feature needs them.
- The "jump to Step 3" shortcut is for development only. Hide it behind a dev flag so students never see it.
- Education level: the mockup allows ages 13 to 18, but content is written for 13 to 15. Decide in /to-spec: either limit selection to Form 1 to Form 3, or allow all and show a note.
- Students can retake the quiz and switch career later from Profile.
- New ticket group (after the content layer and before Supabase): onboarding screens, scoring matrix and tests, quiz content (EN/BM), confirmation step.

## Removal checklist (parent features and mock interview)
Found in the code:
- `src/app/parent/page.tsx` (delete the route).
- `useProgressionStore.ts`: `parentName`, `parentEmail`, `screenTimeUsedMinutes`, `screenTimeMaxMinutes`, `addScreenTime`, and `screenTimeMaxMinutes` in `setSettings`.
- Any link to `/parent` and any parent or screen-time text in Settings, Profile, Home or navigation.
- Old SPEC items: "Adult/parent override lock", "Parent Controls overlay", Profile "Mock Interview Prep" tab. Do not carry these into the new spec.
Not found in the code: a mock interview feature. Only the old SPEC mentions it.
Kept: the registration consent checkbox ("I have my parent/guardian's permission"). It is legal consent, not a parent feature. Remove it only if you decide so.
Check: the notifications page has email and phone fields. Keep them only if a notification feature needs them. Otherwise remove them (privacy rule: collect the minimum).

## Content volume
- Core: 3 careers x 30 items = 90 per language.
- Other: 2 careers x 6 items = 12 per language.
- Total 102 per language, 204 with Bahasa Malaysia (down from 300).
- Existing data already covers Software Engineer, Lawyer and Doctor (scenarios.ts, quizzes.ts, studies.ts). Ask Dreamy data (dreamy.ts) covers different careers and must be rewritten.
- Product Designer and Master Chef have no content yet.

## Assumptions (not asked, change if wrong)
- Hosting: Vercel plus Supabase free tier.
- Salaries and career facts are labelled "estimates" with a source.
- Content is AI-drafted in a strict schema, validated automatically, and every piece is read by the owner before it ships.
- A "quiz" is about 5 questions. Decide the exact number in /to-spec.

## Risks
1. **Content volume:** 204 pieces to write, review and translate.
2. **Review time:** a wrong fact or salary reaches students. Unreviewed content does not ship.
3. **Malay quality:** machine-translated career terms may read oddly. Get a fluent speaker to spot-check.
4. **Minors:** check the university ethics process before testing with under-18s. Check PDPA and cite it in the report.
5. **Account deletion:** removing an auth user needs a server-side route with the service-role key. Never expose that key to the browser.
6. **Two platforms:** Firebase (LLM) alongside Supabase. Do it last. Never send personal data to the LLM.
7. **Solo, 2 to 4 weeks:** backend plus refactor plus bilingual content.

## Build order (each phase leaves a working app)
1. Clean the repo, set up tooling (Prettier, ESLint, Vitest, CI). Remove the Parent and Achievements pages, all parent and screen-time fields, and any mock interview references (see the removal checklist).
2. Tests for game maths, then one agreed XP and salary formula.
3. Feature folders, shared UI components, tokens.
4. Content layer: Zod schema, `ScenarioPlayer`, i18n structure (EN/BM).
5. Other 2 careers at 2/2/2 (done early), plus the 3 core careers at 3/3/3, in both languages.
6. Supabase: auth, profile, progress, RLS, seed script, consent, delete account.
7. Real-student testing round.
8. Fill the 3 core careers toward 10/10/10 in rounds.
9. Ask Dreamy LLM follow-ups, dark mode, polish, `/animate`, `/ste`.

## Content freeze
Set the date about 1 week before the due date: ______. Only reviewed content ships.

## Pre-agreed cut order if time runs short
1. Dark mode
2. LLM follow-ups for Ask Dreamy
3. Core content beyond 6 per type per career
4. Malay content beyond 3 per type per core career
5. Resume builder
6. Notifications

Do not cut: working core loop, real-student testing, consent and privacy basics, tests for game maths.
