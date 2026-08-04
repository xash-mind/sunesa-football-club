# Sunesa Football Club

## Product purpose

The Sunesa Football Club platform is the official public website and administration system for a Bangalore District Football Association registered club established in 2012. It should communicate the club clearly while allowing authorised administrators to manage approved content safely.

## Primary users

- Prospective players and families
- Existing players, supporters, and community members
- Sunesa administrators managing public content and submissions

## Durable principles

- **Public trust:** published information should be accurate, legible, responsive, and clearly attributable to Sunesa.
- **Explicit authorization:** only authenticated administrators with `app_metadata.role = admin` may manage protected content or storage.
- **Private until public:** unpublished content, inactive forms, and protected submissions must not leak.
- **Safe media lifecycle:** upload, replacement, deletion, and failure recovery must preserve valid content and ownership boundaries.
- **Reproducible infrastructure:** database and policy changes use reviewed migrations and documented environment requirements.
- **Cross-project isolation:** shared Supabase infrastructure must not allow Sunesa operations to mutate Phoenix or Arka resources.
- **Privacy-sensitive forms:** submission collection, review, retention, validation, consent, and failure states require explicit treatment.
- **Portable ownership:** code, migrations, content contracts, and provider configuration remain transferable.

## Current scope

The repository documents and implements:

- Public club website with editable homepage sections
- News publishing with rich-text articles and thumbnails
- Categorised gallery management
- Configurable forms and submission review
- Supabase Auth, Database, Storage, and RLS
- Administrator content dashboard
- Vercel deployment from `main`
- Reproducible Supabase migrations

## Explicit exclusions

Unless supported by approved facts and issues:

- Fabricated contacts, coaches, achievements, schedules, prices, affiliations, safety claims, or competition records
- Service-role credentials in browser code
- Undocumented dashboard-only schema changes
- Cross-project table, policy, storage, or content mutation
- Destructive production changes without migration, backup, and rollback evidence

## Technical truth

- Tasks and findings: GitHub Issues
- Accepted current state: `STATUS.md`
- Database and policies: `supabase/migrations/`
- Architecture decisions: `docs/adr/`
- Audits: `docs/audits/`
- Shared rules: `xash-mind/project-operations`

## Current success condition

Visitors can understand and use the approved public site across devices, while authorised administrators can manage content and forms without privacy leaks, media loss, authorization gaps, or cross-project side effects.
