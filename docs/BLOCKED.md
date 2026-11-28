# Blocked Tickets

*(No currently blocked tickets — T-04 through T-12 resolved and verified.)*

## T-20: Deploy initial prototype to Vercel with environment variables and live URL smoke test
- **Error:** `vercel` CLI is not installed (`vercel: The term 'vercel' is not recognized...`) and no Vercel authentication token or linked Vercel project exists in the workspace.
- **What was tried:**
  1. Checked for `vercel` CLI (`vercel whoami`), which is not installed.
  2. Verified `npm run build` passes locally (`next build` 13/13 static pages), but live Vercel deployment and environment variable configuration require manual Vercel account authentication / dashboard linking.
