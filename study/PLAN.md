# Study Track — Opsie

> Maintained 2026-10-19.
> Graded work is posted in chat; assistant-authored docs (like this one) are not gradeable.

## ✅ Closed (previous track — 2026-10-14)

- [x] React block, items 1–3 — taskboard / form-validation / service-list (7.5 · 10 · built)
- [x] Tailwind block, items 1–3 — inspection + `components.html` reference set + site fixes (7.5 · 9.5 passed · shipped)
- [x] Tailwind item 4 — site consistency audit ✅ 9.5/10 (13/13 rows verified)
- [x] React item 4 — TaskBoard QA ✅ 9/10 (8/8 rows verified)
- [x] Demo block — redo ✅ 8.5/10 · b one-liner ✅ closed
- [x] Corrections block — C1 ✅ · C2 ✅ · E1 ✅ 9/10
- [x] Tracker item 4 — verification log ✅ (taskboard 0px×4 verified, collapse control verified)
- [x] Tracker item 5 — learning summary ✅ 9.5/10
- [x] Ship pass — 2026-10-14 (`775aad4` study batch + `45ec000` hygiene batch, CI green on both remotes)

## ✅ Closed — Entry points & rendering block (2026-10-15)

- [x] Item 1 — Entry points & routing ✅ **9/10** — boot chain 4/4 hops exact; route count 22 = 10 public + 4 admin + 7 CMS + /login, all verified; 5/5 posted findings true. Deductions: full table + remaining 6 findings never posted; F-4 understates the root errorElement.
- [x] Item 2 — WhoWeAre render trace ✅ **9/10** — receipt independently reproduced (GET → 201 direct + proxy; whoWeArePage keys exact; draftContent leak live-confirmed); crash-chain analysis exact; auth gap confirmed. Deductions: only 2 file:line citations (spec = every hop); context handoff never cited; getPublicUrl mislabeled a fetch.

## ✅ Closed — Components/assets/styles + architecture block (2026-10-15, partial)

- [x] Item 1 — Inspect components/assets/styles ✅ **8.5/10** — massive verified set: counts exact (api 31 · hooks 7 · admin 19 · webcontent 29 · pages 8 top-level), zero-byte trio ✓, duplicate SVGs hash-identical + `data:image` base64 ✓, LogoLoop 16,583/16,583 + gap 24/32 ✓, all 4 section sizes byte-exact + every import citation exact, 12 picsum URLs exact range, fonts story exact (incl. ghost config L8–13 + dev note L12–14), @plugin-before-@import order as cited, house styles (card-side-glow 48–52 + **13 instances** ✓, heading-glow 386–390, booking-intro 110–122, OKLCH 185–254, spin 265–281), Button OOP verbatim + Buttons.ts:16, all package.json versions/lines exact, 7 animation libs exact, LiquidEther 42KB exact. **Corrections:** (1) `Card/ClientCard/Card.tsx` is NOT dead — live via ClientReviewsSection:2 → WhatWeDo:2/212 (only `cards/ClientCard.tsx` is dead); (2) psd is `ai_automation.psd`, not `sp.psd`; (3) legacy classes not all unused — `vw100` used at EncourageSection:5; (4) `.card-side-glow` not in MapDesign.tsx (WhoWeAre:511 wraps it); (5) BookingPage booking-* lines are 30/38/41, not 30/44/47; (6) LogoLoop gap line is :204 not :25 (values right). Pass A command output never pasted.
- [~] Item 2 — Architecture notes graded ✅ **9.5/10** (every checked claim exact: versions/lines, 3 contexts, Server:36 + error handler:83–96, 6 models 1:1, workflow/compose/certbot, Supabase orphan story). Discussion questions **posted 2026-10-15: 6 questions with positions → set graded 9/10** (Q1 premise half-inverted — ticket limiter actually runs via pass-through, appointment limiter genuinely skipped; Q2's `PERMISSIONS.CONTENT_UPDATE` doesn't exist — permissions.ts only has USER_*/TICKET_*; Q5's login-bug claim masked by LoginPage's forced `window.location.href` reload; all citations otherwise exact incl. AdminRoutes:8–12 mounted via Admin.tsx:3/9). **Live discussion open — follow-through grade pending.**

## 🔓 Open — Entry points & routing review (2026-10-16)

- [ ] Review application entry points & routing — 1h. Deliverables posted in chat:
  1. **Cold recall first** (write it before opening any file): boot chain + full route inventory grouped (public/admin/CMS/login) + guard mechanism → then open the files, verify each item, and post the recall-vs-reality diff with ✓/✗ per claim
  2. **Close yesterday's Item 1 deductions**: the full findings table that was never posted (every finding: severity + file:line — from notes if written, derived fresh if not) and the corrected F-4 (root `errorElement` understated — real line `Router.tsx:76`)
  3. **Fresh receipt**: one live pass showing route behavior on the running stack + `git log -1` proving the runtime is unchanged since `45ec000` (only md files uncommitted)
  - Graded on: recall accuracy vs disk, table truth (every row re-verified), receipt freshness

## 🔓 Open — Page rendering trace (2026-10-16)

- [x] Trace the rendering of an assigned page — 2h — graded **7.5/10** (2026-10-19) — **ASSIGNED: Homepage (`/`, index route `Router.tsx:79–80`)** — **substance near-flawless** (route→tree ~40 citations all exact incl. every import/JSX/delay/dead-JSX line, provider stack, ClientCard chain 4/4 + live cards reproduced, all 11 data-flow classifications true, S.A.S. mechanism verbatim, AOS.init exact, console paste reproduced, DOM 11 children exact, getPublicUrl correctly labeled utility) — **deductions: 3 false receipt rows** (hero jpg claimed 393,216 B = actual **907,318 B** disk+live; phantom request `/assets/opsie/logo-png.png` 200/142,100 B — no such URL fetched, real = `/src/assets/opsie/logo-png.png` 235,403 B; get-content claimed 200 = actually **201 hardcoded** `webContentController.ts:25`, size 1,254 B unverifiable vs live 16,383 B) + useAuth citation slip (:16 → Provider actually **:20**) + externals list incomplete (fonts, 2 supabase storage images) — **correction required: re-post live receipt rows with genuine raw paste → re-grade possible to ~9**
  1. **Route → tree**: which Router line matches the path and every wrapper/guard/layout/errorElement between router and page (file:line); App-level provider stack the page renders inside; full component tree **in render order** — every Homepage child incl. its ScrollAnimatedSection wrappers, each cited by import line + JSX usage line; commented-out children flagged as dead JSX. Continuity: the ClientCard chain from yesterday's Item 1 correction runs through this page — it must appear in your tree.
  2. **Data flow**: classify each rendered section's data source (static prop / context value / own API call) with file:line; then the complete list of API requests the browser fires on `/` (network panel) matched to their call sites in code.
  3. **Post-paint behavior**: the scroll-animation mechanism (what `ScrollAnimatedSection` actually does), hero background request path, any animation-library init on this route (feeds the parked AOS `.aos-animate` go/no-go), console errors — or an explicit "none, console clean" receipt.
  4. **Live receipt**: hard reload on `:5173` — raw request list with statuses + DOM evidence of the rendered sections.
  - Standards (carried from yesterday's deductions): **a citation for every hop** — not two sample lines; utilities not mislabeled as fetches; observed vs inferred marked as such; raw paste, no asserted numbers.

## 🔓 Open — Page inspection (2026-10-16)

- [ ] Inspect its components, assets, and styles — 3h — **scope: the assigned page's tree (Homepage), NOT a redo of yesterday's site-wide sweep** (site findings F-12..F-18 are inherited/citable, not re-submitted). Deliverables:
  1. **Component inventory** — every component in Homepage's render tree, categorized, counts from real pasted listings; per-component notes on reuse/cross-route sharing, coupling, dead imports/commented JSX — file:line each
  2. **Asset inventory** — every asset reachable from these components: imported (bundled) vs root-relative (public, unhashed), raw measured byte sizes, external hotlinks with grep proof, any inline data/backgrounds — file:line + command output
  3. **Style map** — house styles from index.css this tree consumes, Tailwind patterns in real use (arbitrary values, responsive prefixes, inline style props), any theme-boundary violations — each claim with file:line examples
  4. **Findings list** — severity-marked, page-revealed only: duplication inside the tree, dead code, heavy/unoptimized assets, coupling risks — each with file:line
  - Receipts standard: counts/sizes from pasted command output (yesterday's Pass A process deduction), every citation checked against disk

## 🔓 Open — Shared components track (2026-10-16)

- [ ] Review shared component conventions — 1h — extract the real rules the shared layer follows: structure/naming/exports, component API + typing, styling (incl. the `rounded-full` button site-rule), composition/wrapper patterns, data access — each rule cited from ×2–3 examples with file:line; then a compliance pass listing violations with file:line; universality claims ("all buttons…") only with grep proof. Inherited: the Button/ vs buttons/ split from yesterday's Pass A is citable evidence, not a new finding.
- [ ] Inventory reusable UI elements — 2h — catalog of **element-level** UI (buttons, cards, fields, modals, badges, charts, wrappers — page sections belong to the inspection item): per element → path, props API, **call-site count from pasted grep output**, where used, generic vs app-coupled; findings: zero-use elements, duplicate/near-duplicate clusters, markup copy-pasted when an existing element already covers it. Inherited: yesterday's category counts citable, not resubmitted.
  - Shared receipts standard: counts only from pasted command output; every row re-verified by assistant greps.

## 🔓 Open — Cross-page variant comparison (2026-10-16)

- [ ] Compare component variants across assigned pages — 2.5h — **assigned pages: Homepage (`/`) + WhatWeDo (`/what-we-do`, `Router.tsx:93–94`)**. Deliverables:
  1. **Variant matrix** — every UI role appearing on both pages → which implementation each side mounts (import line + JSX usage line per page)
  2. **Static diff per pair** — API/props, structure, styling, content differences cited `file:line` on BOTH sides; classify each pair: single component parameterized (healthy reuse) / forked duplicate files (drift risk) / same file wrapped differently per page (behavioral variant)
  3. **Live comparison** — both routes rendered on `:5173` with receipts showing each paired role's rendered evidence per page
  4. **Findings** — severity-marked: drift a user would actually see, an authoritative-version position per forked pair (this feeds the still-parked Q6 decision), consolidation candidates
  - Inherited: the forked pairs and sizes are already proven (WhyChooseUs 4,877/4,398 · Services 6,050/1,954 — yesterday's F-14) — cite them; the NEW work is the both-sides content/behavior diff and WhatWeDo's side of the matrix

## 🔓 Open — Desktop review track (2026-10-19)

- [x] Agree on desktop review criteria — 0.5h — **CLOSED 2026-10-19 ("accept" in chat)** — rubric locked = **D1–D10**, scope 1440×900 primary + 1280×800 sanity × both pages:
  D1 overflow = 0px 🔴 · D2 layout containment 🟠 · D3 theme violet-family/`#0a0a0a`, zero legacy cyan-blue 🟠 · D4 buttons rounded-full by computed radius 🟠 · D5 sticky desktop nav, no hamburger, full links 🟠 · D6 images undistorted (natural vs displayed) 🟠 · D7 console clean + zero failed requests + all >1 MB requests listed (dev-server caveat) 🟠 · D8 scroll reveals fire, nothing permanently hidden 🟠 · D9 fonts resolve (Montserrat/Poppins/Poiret) 🟡 · D10 hover + focus-visible affordance 🟡
  Receipt method: raw pastes, **viewport stated in every receipt**, PASS/FAIL/N-A per cell
- [x] Inspect assigned desktop pages — 2.5h — graded **9.5/10** (2026-10-19) — **assigned: Homepage (`/`) + WhatWeDo (`/what-we-do`)** — matrix of **every agreed criterion (D1–D10) × both pages** → PASS / FAIL / N-A with a raw receipt (viewport width stated in each); findings severity-marked under the agreed severities; receipt caveat: Vite dev server ≠ prod build (no production FCP claims from dev network timings) — **verification notes**: D3 sky-leak 5/5 lines exact (14/65/69/77/91) + isolation whole-`src` verified; D7 sizes exact vs `.vite/deps` files + 0 errors / 0 transport fails / 0 4xx-5xx reproduced live across 465 requests; D6 PNG IHDR exact; D5 autohide mechanics exact (:99/:102/:125) but ruled **FAIL by criterion letter** (header does not persist visibly on down-scroll) — fix-or-waive decision open
- [x] Record layout, typography, and content issues — 2h — graded **9.5/10** (2026-10-19, delivered as `study/2026-10-19-layout-typography-content-audit.md`) — **scope: the two assigned desktop pages (Homepage + WhatWeDo), full section-by-section sweep at 1440×900** — convert the pass/fail matrix into an **issue log** across three dimensions: **layout** (spacing/alignment/consistency, container & width rhythm, wrapping risks, section padding patterns), **typography** (family/size/weight/leading hierarchy under the Montserrat-default + `.font-poppins` + Poiret rules, heading-scale drift, tracking/uppercase consistency), **content** (copy errors, placeholder/duplicated text, label inconsistencies, broken or stub links, CMS-vs-hardcoded drift). Deliverable: issues table — ID · dimension · page+section · what's wrong · file:line (code-attributable) · raw evidence paste (computed style / DOM excerpt / bounding box, **viewport stated**) · observed vs inferred marked. Coverage receipt: sweep checklist of every section on both pages with "issues found / none" per section. **Inherited (citable, NOT resubmitted): D3 sky-leak (OperationalStructure), D5 nav autohide, D4 FAQ trigger radius 0** — the log records NEW observations. Graded on: every row re-verified live/on disk, citations exact, **raw paste per row — no asserted numbers**
- [x] Capture evidence and prioritize findings — 2.5h — graded **9.5/10** (2026-10-19, same report §Item B — every snippet rerun by assistant: D3 exact (skyClassCount 9 + oklch), N-03 box 448×104 identical, N-01/N-02 pass with backend up; ranking math transparent; AOS answer recorded) — inputs: your Issue Log (item above) + inherited D-matrix findings. Deliverables: 1. **Evidence pass** — every finding (new + inherited) gets one raw, re-runnable artifact: exact paste with viewport + repro steps (route / selector / scroll position); anything you can't re-evidence gets marked unverifiable and dropped from ranking (stated explicitly); 2. **Prioritization** — agreed severities (🔴 blocker · 🟠 major · 🟡 minor) applied to every finding, then a ranked P1/P2/P3 punch list with per-row justification (user impact × breadth × fix effort — state the rule you use); 3. **Decision queue** — the parked site decisions ranked in the same list with your recommendation each: D5 autohide fix-or-waive · sky-token cleanup scope · AOS verdict (Task-2 question still open: does GO mean "leave as-is" or "apply the completion-rule fix"?) · FAQ radius letter-vs-visual call. Note: the backend fix batch (A-1/A-2/A-3) is a separate thread — do not merge it into this ranking. Graded on: evidence completeness (every ranked row has a passing artifact), severity consistency with the agreed rubric, transparent ranking logic, no silently dropped findings

## 🚧 Blocked on your inputs (site threads, outside the study track)

- [ ] Booking email — `EMAIL_USER` / `EMAIL_PASS` in `backend/.env`
- [ ] Footer social links — real FB/IG URLs + email
- [x] AOS `.aos-animate` completion-rule fix — go/no-go — **resolved 2026-10-19 (audit verdict: DEFER)** — GO defined as *apply* the fix; held because no reproducible failing post-animation state is documented; re-open with a concrete failing case
