# Agent Instructions — Sunesa Football Club

## Required reading

1. `PROJECT.md`
2. `STATUS.md`
3. `README.md`
4. Relevant documents and migrations in `docs/` and `supabase/`
5. Relevant open issues and recent pull requests
6. Relevant playbook, Engineering Standards, and Run Checklist in `xash-mind/project-operations`

## Boundaries

- Repository: `xash-mind/sunesa-football-club`
- Production: `https://sunesa-football-club.vercel.app`
- Product role: official public club website and Supabase-backed content-management dashboard
- Shared provider risk: Supabase authentication and infrastructure may be shared with Arka Vega and Phoenix.
- Protect Sunesa tables, policies, forms, submissions, and media ownership while never mutating Phoenix or Arka resources during Sunesa work.
- Administrator access requires `app_metadata.role = admin`.
- Never expose a service-role key in browser configuration.
- Never invent club contacts, coaches, achievements, schedules, prices, affiliations, safety credentials, competition records, or legal/privacy claims.

## Commands

```text
Install: npm ci
Develop: npm run dev
Typecheck: npm run typecheck
Lint: npm run lint
Build: npm run build
Start: npm run start
Preview: npm run preview
```

## Work rules

- Verify current source, Supabase contracts, migrations, production deployment, and resource ownership before changing behaviour.
- Preserve public/admin separation and administrator authorization.
- Keep unpublished or inactive content private across queries, routes, fallbacks, caches, and direct navigation.
- Make media changes non-destructive and ownership-aware; never delete an object that is not demonstrably owned by the affected record and project.
- Treat forms and submissions as privacy-sensitive data with explicit validation, consent, retention, authorization, and failure recovery.
- Use reproducible migrations rather than undocumented dashboard-only schema changes.
- Use GitHub Issues, issue-specific branches, pull requests, ADRs, audits, migrations, and `STATUS.md` as technical truth.
- At the very end, follow `xash-mind/project-operations/playbooks/final-notion-update.md` and update only Sunesa's mapped Notion page.

## Required verification

- Run typecheck, lint, and production build for accepted changes.
- Verify public routes, direct refresh, metadata/assets, responsive layouts, keyboard/focus, and console/network state.
- For authenticated changes, test administrator enforcement and ordinary-user rejection.
- Test affected content lifecycle, public propagation, storage ownership, failed save/replacement recovery, and cross-project isolation.
- Test form activation, submission access, validation, consent, error handling, and data privacy when affected.
- Verify the exact deployed commit when production state is claimed.

## Human escalation

Surface a decision for official content, access, provider ownership, destructive migrations, sensitive submission data, privacy/legal wording, billing, domains, or material release risk.
