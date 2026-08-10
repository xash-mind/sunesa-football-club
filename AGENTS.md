# Agent Instructions — Sunesa Football Club

## Required reading

For routine work, read only what is needed to orient accurately:

1. `PROJECT.md`
2. `STATUS.md`
3. Relevant open issues and recent pull requests
4. Relevant repository docs or migrations for the subsystem being changed
5. Relevant shared playbook in `xash-mind/project-operations`
6. Applicable Shared Engineering Standards sections; use the Run Checklist at completion

Do not reread `README.md`, all docs/migrations, or unrelated shared governance on every run. Perform a broader read when first orienting, changing architecture/governance, crossing a high-risk boundary, or when current instructions appear stale or contradictory.

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

- Maximize verified useful progress inside a safe coherent boundary; do not optimize for the smallest possible diff.
- Select the largest safe coherent work bundle based on priority, dependencies, user impact, context overlap, rollback, and verification scope.
- Multiple related issues may share one bundle, branch, pull request, preview, and deployment when they share a subsystem, user journey, implementation context, dependency chain, verification setup, or release boundary.
- Verify current source, affected Supabase contracts/migrations, production deployment, and resource ownership before changing affected behaviour.
- Use a bundle-specific branch and preserve links to every included issue.
- Continue iterating after the first completed issue or internal subtask when adjacent ready work is directly related and benefits from the loaded context.
- Do not combine unrelated work merely for throughput; stop at a blocker, human decision, materially different risk/rollback domain, material context switch, disproportionate verification cost, deployment/provider-action budget, or natural release boundary.
- Run cheap targeted checks during internal subtasks and the complete risk-proportional verification set at the coherent bundle boundary.
- Preserve public/admin separation and administrator authorization.
- Keep unpublished or inactive content private across queries, routes, fallbacks, caches, and direct navigation.
- Make media changes non-destructive and ownership-aware; never delete an object that is not demonstrably owned by the affected record and project.
- Treat forms and submissions as privacy-sensitive data with explicit validation, consent, retention, authorization, and failure recovery.
- Use reproducible migrations rather than undocumented dashboard-only schema changes.
- Keep technical truth in GitHub: issues, pull requests, ADRs, audits, migrations, and `STATUS.md`.
- Create follow-up issues only for material actionable gaps; do not create issue noise for every incidental observation.
- Use `xash-mind/project-operations/playbooks/final-notion-update.md` only when the final accepted run materially changed a compact Sunesa fact represented on the mapped Notion page; otherwise skip Notion.
- Never query a Notion database, search the workspace, or update another project's page during ordinary work.

## Required verification

- Run typecheck, lint, and production build for accepted changes.
- Verify public routes, direct refresh, metadata/assets, responsive layouts, keyboard/focus, and console/network state when those areas are affected.
- For authenticated changes, test administrator enforcement and ordinary-user rejection.
- Test affected content lifecycle, public propagation, storage ownership, failed save/replacement recovery, and cross-project isolation when those systems are affected.
- Test form activation, submission access, validation, consent, error handling, and data privacy when affected.
- Verify the exact deployed commit when production state is claimed.

Verification is proportional to changed risk. Project-specific mandatory checks still apply, but do not add unrelated test categories merely to increase ceremony.

## Human escalation

Surface a decision for official content, access, provider ownership, destructive migrations, sensitive submission data, privacy/legal wording, billing, domains, or material release risk.

## Vercel deployment hygiene

- Keep LoopForge work on `agent/*` branches. Vercel intentionally does not auto-deploy those branches, so fine-grained protocol commits remain safe and cheap.
- Continue running local and GitHub verification at the normal risk-appropriate boundaries.
- When a coherent bundle needs a hosted exact-head preview, create or update `preview/<bundle>` to the candidate SHA only after the relevant checks pass. Do not advance a preview branch for protocol-only state or evidence commits.
- Merge an approved candidate to `main`; that merge remains the normal production deployment.
- For any other deploy-enabled branch, batch pushes at coherent verification boundaries and avoid protocol-only pushes.
