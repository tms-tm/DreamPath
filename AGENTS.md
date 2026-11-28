<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

- Read SPEC.md, ARCHITECTURE.md and TICKETS.md before starting. Work on one ticket at a time and edit only the files it lists.
- If code and SPEC.md disagree, stop and ask. Update SPEC.md status in the same ticket as any change.
- Colours, fonts and spacing come from DESIGN.md tokens. No raw hex values. Icons: lucide-react only.
- Route files only compose components. Game maths lives in src/lib or src/features/progression with tests. Content lives in src/content. All student-facing text exists in English and Bahasa Malaysia.
- Never store or log personal data beyond what SPEC.md allows. Never send personal data to an LLM. Secrets stay in environment variables.
- Before finishing a ticket, run tsc, eslint, tests and build. If anything fails, stop and report. Commit only when green.
