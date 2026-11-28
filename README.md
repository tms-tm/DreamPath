# DreamPath

A bilingual (English & Bahasa Malaysia) career exploration web app for Malaysian secondary school students aged 13–15 (Nebula tier). Built with Next.js App Router, React 19, TypeScript, Tailwind CSS v4, Zustand, Zod, and Supabase.

## Setup

### Prerequisites
- Node.js `>= 20`
- npm

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in your environment variables (Supabase URL/anon key, optional `NEXT_PUBLIC_DEV_SHORTCUTS=true`).
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Start Next.js development server |
| `build` | `npm run build` | Build production bundle |
| `start` | `npm run start` | Start production server |
| `lint` | `npm run lint` | Run ESLint across the repository |
| `typecheck` | `npm run typecheck` | Run TypeScript compiler check (`tsc --noEmit`) |
| `test` | `npm test` | Run Vitest unit and content-validation tests (`vitest run`) |
| `format:check` | `npm run format:check` | Verify Prettier formatting |

## Folder Structure

```text
src/
├── app/            # Next.js App Router pages and API routes (thin route entrypoints only)
├── components/
│   ├── ui/         # Shared UI primitives (Button, Card, Badge, ProgressBar, PageHeader, Modal)
│   └── layout/     # AppShell, Sidebar, MobileNav, Header
├── content/        # Zod-validated bilingual (en/ms) data (careers, scenarios, quizzes, studies, i18n, onboarding)
├── features/       # Domain slices (auth, careers, dreamy, leaderboard, onboarding, practice, profile, progression, settings)
└── lib/            # Pure utilities, career matching, i18n helper, Supabase clients
tests/              # Vitest unit, scenario-graph, and Zod content-schema tests
```

## How to Add a Career

Adding a new career requires no changes to routes, UI components, or database migrations:

1. **Validate against Zod schemas (`src/content/schemas.ts`):** Ensure your career, scenario, quiz (5 questions), and study lesson objects match the Zod schemas and include both `en` and `ms` blocks.
2. **Register Career Metadata (`src/content/careers.ts`):** Add a new entry to `CAREERS` with a unique kebab-case `id`, `family`, `icon`, `baseSalary`, `salaryRange` + `salarySource`, `coreSkills`, and complete `i18n.en` / `i18n.ms` metadata (including Malaysian SPM subjects and university pathways).
3. **Add Career Matching Weights (`src/content/onboarding-quiz.ts`):** Add `subjectWeights` and `traitWeights` for the new `careerId` in `careerWeights`.
4. **Add Ask Dreamy Knowledge (`src/content/dreamy-kb.ts`):** Add salary bands, Malaysian public/private university routes, and EN/BM keyword triggers.
5. **Author Content Files (EN + BM):**
   - `src/content/studies/<careerId>.ts` — study lessons (`30 XP` each).
   - `src/content/quizzes/<careerId>.ts` — 5-question quizzes.
   - `src/content/scenarios/<careerId>.ts` — branching scenario graphs with valid `startNodeId`, decision/mentor nodes, and terminal outcomes.
6. **Export from Registries:** Register the new arrays in `src/content/studies/index.ts`, `src/content/quizzes/index.ts`, and `src/content/scenarios/index.ts`.
7. **Verify:** Run `npm test` (`vitest run`) to validate Zod schemas, exact 5-question quizzes, scenario graph reachability, career-matching coverage, and EN/BM parity.
