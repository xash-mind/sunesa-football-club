# Sunesa Football Club — Current Status

**Updated:** 10 August 2026  
**Repository:** `xash-mind/sunesa-football-club`  
**Production:** `https://sunesa-football-club.vercel.app`  
**Audited main commit:** `8c19adc2fa1268b48fde54cec5ca3bd00c56f919`  
**Latest robust audit:** `docs/audits/2026-08-10-robust-audit.md`

## Current state

The public club site and administration system are deployed, and current source passes dependency install, production build, TypeScript, and ESLint validation in GitHub Actions. The audited `main` commit also has a successful Vercel deployment status.

Live Supabase verification confirmed that Sunesa tables have RLS enabled, anonymous publication rules are enforced, unpublished news remains private, submissions are private from anonymous readers, Sunesa/Arka/Phoenix project data is isolated, and Sunesa/Arka storage metadata is path-isolated. Rollback-only audit mutations left no persistent test rows.

Verified client handover is **blocked** by confirmed High findings; see Issues #4, #5, and #6.

## Verified health

- Clean dependency install, production build, TypeScript, and lint: passed in GitHub Actions.
- Vercel status for audited `main` commit: success.
- Public news publication RLS: passed.
- Rollback-only unpublished-news privacy test: passed.
- Sunesa vs non-Sunesa table authorization: passed at RLS layer.
- Sunesa vs Arka storage visibility: passed at RLS layer.
- Inactive-form submission rejection: passed.
- Active-form anonymous insert + anonymous-read denial + Sunesa-admin review: passed in rollback-only testing.
- Supabase performance advisor: no Sunesa release-blocking finding.

## Confirmed blockers

### High

- **#4 — Frontend admin authorization:** `/admin` treats any authenticated session as sufficient before Sunesa-specific project authorization is checked. Backend RLS contains the data-access impact, but the UI authorization boundary is incorrect.
- **#5 — Migration reproducibility:** repository-local migration history and authorization SQL do not represent the current canonical shared-provider state. The shared authorization source is now maintained in Project Operations and must be reconciled with the Sunesa operator path before future provider DDL.
- **#6 — Forms readiness:** forms remain inactive in production, which is safe. Before activation, supported placements, trusted-boundary validation, privacy/retention/consent, abuse handling, and visible submit failure/retry must be completed.

### Secondary findings

- **#7 — Submissions:** individual delete control is implemented incorrectly and does not render.
- **#8 — Accessibility:** core field labels, modal focus/dialog semantics, menu state, and async announcements need correction.
- **#9 — Performance:** production build emits a ~2.10 MB hero PNG and ~1.46 MB logo JPEG used above the fold.
- **#10 — Media hygiene:** 4 current Sunesa `news/` / `gallery/` storage objects have no matching database reference; no objects were deleted by the audit.
- **Project Operations #9:** shared Supabase Auth leaked-password protection is disabled and requires the documented dashboard-only action.

## Remaining uncertainty

- Canonical production alias visual/runtime parity was not independently browser-tested because the connected Vercel tooling could not access the Sunesa project and the audit runtime had no external DNS.
- Live mobile/tablet/desktop visual QA, keyboard traversal, production console/network inspection, admin browser CRUD/media workflows, and field Core Web Vitals remain Untested.
- Production currently has zero forms and zero submissions, so no persistent live applicant workflow was created for testing.

## Current milestone

Close the confirmed High blockers, then complete live-browser acceptance for public/admin journeys, responsive/accessibility behavior, media lifecycle, failure recovery, and production parity before declaring client handover ready.

## Next recommended action

1. Fix #4 and re-test authorized vs authenticated-but-unauthorized admin access.
2. Resolve #5 before any further shared-provider migration work.
3. Keep forms inactive while implementing #6; fix #7 as part of the submissions lifecycle.
4. Address #8 and #9, then run a live-browser robust re-audit.
5. Classify #10 objects before any deletion and keep cleanup Sunesa-scoped.

## Release state

**Not ready for verified handover.**

The audit found no reason for emergency public-site takedown: current provider-level publication privacy, submission privacy, RLS, and cross-project isolation passed. Release acceptance is blocked by the High findings above and by missing live-browser parity evidence.

## Needs Sash

Before public forms are activated, confirm with the club:

- approved personal fields to collect
- privacy/consent wording
- retention/deletion period
- which public form placements should be supported

No other ordinary engineering work from this audit needs to move into Notion.
