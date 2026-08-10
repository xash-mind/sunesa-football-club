# Sunesa Football Club — Robust Audit — 2026-08-10

## Scope

Independent audit of `xash-mind/sunesa-football-club` under the repository instructions and the shared Project Operations robust testing playbook.

Requested coverage:

- public functionality
- admin functionality
- UI / UX
- accessibility
- responsiveness
- authorization
- publication privacy
- RLS
- storage and media ownership
- forms and submissions
- cross-project isolation
- performance
- release readiness

No product code was changed. Provider mutations used for security/lifecycle verification were transaction-scoped and rolled back. A final residue query confirmed zero audit news rows, forms, or submissions remained.

## Target state

- Source repository: `xash-mind/sunesa-football-club`
- Source branch: `main`
- Source commit audited: `8c19adc2fa1268b48fde54cec5ca3bd00c56f919`
- Production alias declared by repository: `https://sunesa-football-club.vercel.app`
- Shared Supabase project: live and healthy during the audit
- Canonical shared-provider source: `xash-mind/project-operations/infrastructure/shared-supabase`

## Method and evidence

### Repository and CI

Reviewed `AGENTS.md`, `PROJECT.md`, `STATUS.md`, recent PRs/commits, issue state, audit history, route/service/components, migrations, CI configuration, and shared Project Operations instructions.

GitHub Actions run `31322582843` completed successfully on the current product code path:

- exact dependency install: passed
- production build: passed
- TypeScript: passed
- ESLint: passed with 7 warnings and 0 errors

One lint warning is directly relevant to submissions: `SubmissionsManager.tsx` has a missing `useEffect` dependency. The remaining warnings are Fast Refresh warnings in shared UI files.

The current `main` commit has a successful Vercel status. The connected Vercel account could see the team but not the Sunesa project, and the audit runtime had no external DNS, so the canonical production alias could not be independently browser-fetched. Deployment success is therefore verified at commit-status level; canonical-alias visual/runtime parity remains Untested.

### Live Supabase verification

Inspected live RLS, policies, storage buckets, membership model, migration ledger, advisors, and current row/object counts.

Live Sunesa table state at audit time:

- news: 1 row, published
- gallery: 6 rows
- pages: 7 rows
- forms: 0 rows
- form submissions: 0 rows

RLS is enabled on all Sunesa public tables.

Rollback-only / role-simulation tests covered:

- anonymous public visibility
- unpublished-news privacy using a temporary draft
- inactive-form submission rejection
- active-form anonymous submission
- anonymous submission-read denial
- Sunesa-admin submission review
- Sunesa-admin write allowance
- non-Sunesa project-admin write denial
- Sunesa vs Arka storage/table visibility

All temporary test rows were rolled back; post-test residue count was zero.

### Browser / visual limitation

A live visual/browser session against the canonical production alias was not available from the connected environment. This audit therefore does **not** claim field-tested responsive layout, keyboard behavior, Core Web Vitals, production console cleanliness, or canonical-alias route status codes. Source-level responsive/a11y review and build/provider evidence are recorded separately from live-browser evidence.

## Executive result

**Verdict: BLOCKED for verified client handover.**

No Critical finding and no confirmed cross-project/publication/submission data leak were found. The current provider authorization and privacy boundary is substantially stronger than the frontend/local migration history.

Handover is blocked by three High findings:

1. project authorization is not enforced by the Sunesa admin route before rendering the admin shell — #4
2. Sunesa's local migration history does not reproduce the current canonical shared-provider authorization state — #5
3. forms are not ready for activation because publication placement, trusted validation, privacy/retention UX, and failure recovery are incomplete — #6

Secondary findings:

- individual submission deletion UI does not render — #7
- core public/admin accessibility semantics are incomplete — #8
- above-the-fold image payload is unnecessarily large — #9
- four historical Sunesa media objects are unreferenced — #10
- shared Supabase Auth leaked-password protection remains disabled — `project-operations#9`

The production public site does not require emergency takedown based on this audit: public RLS, draft privacy, submission privacy, storage isolation, and cross-project denial all passed the provider-level tests performed here.

## Quality scores

| Area | Score | Rationale |
|---|---:|---|
| Public functionality | 7/10 | Core routes/data sources and publication filters are coherent; live browser journey remains unverified. |
| Admin / content lifecycle | 5/10 | CRUD code and RLS are present, but frontend authorization is weaker than provider authorization and live UI journeys were not browser-tested. |
| Forms / submissions | 3/10 | RLS privacy is sound, but activation semantics, trusted validation, privacy UX, error recovery, and individual deletion are incomplete. |
| UI / UX | 6/10 | Clear hierarchy and responsive utility usage in source; silent error paths and incomplete form/admin states create user waste. |
| Accessibility | 4/10 | Visible labels, dialog semantics, state announcements, and menu state are inconsistent. |
| Responsiveness | 7/10 source-level | Mobile/desktop Tailwind breakpoints are used throughout; live visual/device QA is Untested. |
| Security / privacy | 8/10 provider, 5/10 frontend | Project-scoped live RLS/storage isolation passed; frontend admin authorization and Auth password hardening remain incomplete. |
| Data / media ownership | 7/10 | Current cleanup code is defensive and storage paths are isolated; 4 historical Sunesa objects are unreferenced. |
| Performance | 5/10 | JS/CSS build sizes are moderate, but hero/logo source images impose a large initial visual payload; field metrics Untested. |
| Release readiness | 4/10 | CI and Vercel status pass, but migration reproducibility, form readiness, frontend auth, and live canonical-browser parity block handover. |

## Feature / state matrix

| Test area | Result | Evidence / notes |
|---|---|---|
| Clean dependency install | Passed | GitHub Actions run `31322582843`. |
| Production build | Passed | Vite/Nitro production build completed successfully. |
| TypeScript | Passed | `tsc --noEmit` completed successfully. |
| Lint | Passed with warnings | 0 errors, 7 warnings. |
| Automated product tests | Not Implemented | No product test script/suite is present; current CI validates install/build/type/lint. |
| Vercel deployment for audited main commit | Passed | `main` commit has Vercel status `success`. |
| Canonical production alias parity | Untested | Vercel project/fetch unavailable to connector; external DNS blocked. |
| Public homepage render | Untested live / source reviewed | Route and component structure reviewed; no live browser claim. |
| Public navigation / mobile menu | Source reviewed | Responsive menu exists; `aria-expanded` missing. |
| Public news query | Passed | `getPublishedNews()` filters published rows; live anon policy also restricts news to published rows. |
| Unpublished news privacy | Passed | Temporary unpublished row was invisible to anonymous role in rollback-only test. |
| Public gallery visibility | Passed at provider layer | Anonymous role saw current gallery rows; bucket object listing remained hidden. |
| Public page sections | Passed at provider layer | Anonymous role saw all 7 public page rows. |
| Root 404 / error UI | Passed source-level | Explicit root NotFound and retry/home error components exist. |
| News missing-slug UX/status | Partial | Route shows `Article not found`; live HTTP status and browser UX Untested. |
| Admin session authentication | Implemented | Supabase password sign-in/sign-out present. |
| Admin project authorization | Failed | Frontend accepts any authenticated session before Sunesa-specific authorization — #4. |
| Non-Sunesa read isolation | Passed | Simulated Arka admin saw 0 Sunesa rows and 0 Sunesa media metadata. |
| Non-Sunesa write isolation | Passed | Rollback-only Arka-admin insert into Sunesa news was rejected by RLS. |
| Sunesa admin write permission | Passed provider-level | Rollback-only Sunesa-admin news insert succeeded and rolled back. |
| Cross-project storage visibility | Passed | Sunesa admin saw Sunesa media metadata and 0 Arka metadata; Arka admin saw 0 Sunesa metadata. |
| Storage bucket constraints | Passed configuration-level | Managed buckets are public-object buckets with 10 MB limit and image MIME allowlist; SVG is not allowed. |
| Public media object listing | Passed | Anonymous role saw 0 storage metadata rows despite public direct-object delivery model. |
| Gallery lifecycle code | Passed source-level / live mutation Untested | Upload rollback and row-first deletion cleanup are present; no live file was created/deleted. |
| News thumbnail lifecycle code | Passed source-level / live mutation Untested | Unsaved/replaced-thumbnail cleanup is defensive; no live file was created/deleted. |
| Media hygiene | Failed | 1 unreferenced gallery object + 3 unreferenced news objects — #10. |
| Form default privacy | Passed | Production currently has 0 forms and 0 submissions; new forms default inactive. |
| Inactive-form anonymous insert | Passed | RLS rejected rollback-only submission to inactive/nonexistent form. |
| Active-form anonymous insert | Passed | Rollback-only active form accepted a public submission. |
| Anonymous submission read privacy | Passed | Anonymous role could not read the rollback-only submission. |
| Sunesa submission review | Passed provider-level | Sunesa admin role could read the rollback-only submission. |
| Form required-field enforcement | Failed | Empty JSON could be submitted directly to an active form configured with a required field — #6. |
| Form supported placements | Failed | Builder offers `contact`, `homepage`, and `standalone`; public code only consumes `trials` placement — #6. |
| Public submission error recovery | Failed source-level | Failure is console-only; no user-visible retry/error state — #6. |
| Form privacy / consent / retention UX | Failed | No approved privacy/retention/consent step before arbitrary configured data collection — #6. |
| Individual submission deletion | Failed | Delete button JSX is unreachable/not returned in `SubmissionsManager` — #7. |
| Accessibility — field labels | Failed | Repeated detached labels without `htmlFor`/matching `id` — #8. |
| Accessibility — modal/state | Failed | Gallery overlay lacks dialog/focus semantics; async status handling is inconsistent — #8. |
| Responsive source structure | Passed source-level | Core public/admin layouts use mobile-first breakpoints/flex/grid wrapping. |
| Responsive live visual QA | Untested | Browser unavailable. |
| Main public image payload | Failed | Hero ~2.10 MB + logo ~1.46 MB from build output — #9. |
| Field performance / Core Web Vitals | Untested | No live browser/Lighthouse access. |
| Supabase security advisor | Warning | Leaked-password protection disabled; tracked centrally in Project Operations #9. |
| Supabase performance advisor | Passed for release blockers | No Sunesa-critical warning; unused submissions index is expected with zero submissions. |
| Migration/source-provider reproducibility | Failed | Local migration timestamps/security model diverge from current shared-provider ledger — #5. |

## Confirmed findings

### High — #4 — Enforce Sunesa-specific authorization before rendering `/admin`

Affected user: operators with accounts on the shared provider.

Expected: authentication is followed by Sunesa-specific authorization before admin UI renders.

Actual: `admin.tsx` treats any session as logged in. Live RLS prevents the tested data access, but the frontend boundary is wrong and causes unauthorized admin-shell exposure/confusing failure states.

Root cause: frontend retained the older global-auth model after provider authorization became project-scoped.

Issue: https://github.com/xash-mind/sunesa-football-club/issues/4

### High — #5 — Reconcile Sunesa migrations with canonical shared Supabase state

Affected user: maintainers/deployers.

Expected: version-controlled migrations clearly reproduce or safely advance the current shared provider.

Actual: Sunesa's local timestamps do not match the live migration ledger, and the final local authorization migration encodes the obsolete global-admin / bucket-wide media policy model. The current project-scoped policy source is canonical in Project Operations.

Supabase migration tooling compares local timestamps with remote migration history, so the current histories are not a clean deploy path.

Issue: https://github.com/xash-mind/sunesa-football-club/issues/5

### High — #6 — Finish form publication, validation, and privacy gates before activation

Affected user: applicants and club operators.

Expected: only supported placements activate; required/type rules are trusted-boundary validated; privacy/retention is clear; failure is recoverable.

Actual: only `trials` placement is consumed publicly, direct clients can bypass required fields, privacy/retention/consent is absent, and public submit failure is console-only.

Provider RLS itself passed activation/submission privacy tests.

Issue: https://github.com/xash-mind/sunesa-football-club/issues/6

### Medium — #7 — Restore individual submission deletion in admin

The delete handler exists, but the intended button expression is placed inside a field-map callback and is never returned/rendered. This blocks the intended per-record deletion/retention workflow.

Issue: https://github.com/xash-mind/sunesa-football-club/issues/7

### Medium — #8 — Fix core form/admin accessibility semantics

Confirmed detached labels, missing dialog/focus semantics, incomplete async announcements, and missing mobile-menu expanded state.

Issue: https://github.com/xash-mind/sunesa-football-club/issues/8

### Medium — #9 — Reduce above-the-fold image payload

Build output shows:

- hero PNG: 2,100.37 kB
- logo JPEG: 1,455.15 kB
- main JS: 82.76 kB gzip
- Supabase client: 24.38 kB gzip
- CSS: 17.91 kB gzip

The two eager/above-fold image assets dominate the initial payload risk.

Issue: https://github.com/xash-mind/sunesa-football-club/issues/9

### Low — #10 — Reconcile four unreferenced Sunesa media objects

Live reference comparison found:

- gallery: 7 objects / 6 row references / 1 unreferenced
- news: 4 objects / 1 row reference / 3 unreferenced

No object was deleted. Current upload/delete code is already defensive, so cleanup should classify ownership first.

Issue: https://github.com/xash-mind/sunesa-football-club/issues/10

### Medium shared-provider hardening — Project Operations #9

Supabase security advisor reports leaked-password protection disabled. This is already documented as the remaining dashboard-only action in the canonical shared-provider README and is now tracked centrally.

Issue: https://github.com/xash-mind/project-operations/issues/9

## First-time-user and time-waste observations

### Public visitor

Positive source-level signals:

- clear single-page navigation
- prominent trials CTA
- responsive breakpoint usage
- meaningful image alt text in several major visual areas
- explicit root 404/recovery component

Risks:

- large hero/logo payload may delay first visual readiness on mobile
- public form errors would provide no visible explanation if forms were activated
- article-not-found UX is minimal and live HTTP status was not verified

### Administrator

Highest waste path:

1. a user with a valid shared-provider session can be admitted by the frontend;
2. the backend then returns no Sunesa resources or denies writes because project-scoped RLS is correct;
3. the user encounters a misleading admin shell rather than a clean authorization rejection.

Forms also expose options that the public site does not render, creating an admin configuration path that can appear successful while producing no reachable public form.

## Untested / not implemented

### Untested because of audit-environment constraints

- canonical production visual render
- live mobile/tablet/desktop screenshots
- keyboard-only browser traversal
- production console/network waterfall
- production route HTTP status validation
- live file upload/replace/delete through the admin UI
- live news/pages/gallery CRUD through the browser
- live form UI submit because production has no configured forms and the audit avoided creating persistent content/PII
- Lighthouse/WebPageTest/Core Web Vitals

Reason: connected Vercel tooling could see the team but not the Sunesa project/fetchable deployment, and the runtime had no external DNS. These are explicitly Untested rather than inferred.

### Not Implemented

- automated product/e2e test suite in repository CI
- trusted-boundary dynamic form-schema validation
- accessible/user-visible form submission failure state
- public rendering for the builder's non-trials form placements

## Repair order

1. **#4** — align frontend admin authorization with project-scoped provider authorization.
2. **#5** — reconcile/document the migration path before any future shared-provider DDL work.
3. **#6** — keep forms inactive until placement, validation, privacy/retention, abuse, and failure-recovery gates are complete.
4. **#7** — restore individual submission deletion and visible failure recovery.
5. **#8** — fix core accessibility semantics and run keyboard/automated checks.
6. **#9** — optimize hero/logo and establish an initial-load image budget.
7. **#10** — classify and safely clean proven Sunesa media orphans.
8. **Project Operations #9** — enable leaked-password protection on the shared Auth provider.
9. Re-run the robust audit with live browser access and verify canonical production parity, responsive visuals, keyboard paths, admin CRUD/media lifecycles, and field performance.

## Release decision

**Do not claim verified client handover yet.**

The provider's current privacy/isolation posture is good enough that this audit does not recommend taking the public site offline. The next acceptance boundary is to close High issues #4, #5, and #6, then execute live-browser acceptance before changing the release state.

## Needs Sash / club decision

Before forms are activated, confirm the business/privacy contract for public submissions:

- which personal fields Sunesa is allowed/expected to collect
- the approved privacy/consent wording
- the intended retention/deletion period
- which form placements should actually be supported publicly

Engineering can address the authorization, migration, UI, accessibility, performance, and cleanup findings without further product-code decisions beyond that form-policy boundary.
