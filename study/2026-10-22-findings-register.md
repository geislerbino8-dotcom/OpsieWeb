# Findings consolidation register — 2026-10-22

**Role:** the single open-findings register across all graded tracks — desktop 2026-10-19 ·
responsive 2026-10-20 · usability/accessibility 2026-10-21 · backend A-1/A-2/A-3 · owner inputs.
This register is the **source of truth** for the whole findings-to-plan chain
(register → review rulings → priorities → acceptance criteria → implementation plan).
Downstream docs reference rows **by REG ID only** — never restate a finding's facts, so
pass-B edits and review amendments auto-track through the ID.

**Assembled:** 2026-10-22, from the graded docs (`study/PLAN.md` grades are the authority for
severity and status), the three audit reports, `docs/user-journeys.md` Appendix A, and the
receipt dirs (`study/receipts/2026-10-20/` 89 files · `study/receipts/2026-10-21/` 31 files).

**Append convention (dated):**
- New findings → new `REG-##` row appended in §2 (next free ID), dated note in §10.
- Amendments from a ruling or pass-B → edit the row in place **and** add a dated one-line
  entry in §10 (delta log). The register is never rewritten wholesale.
- Rows carry status; status changes are deltas, not row deletions. Deletion only via a
  recorded ruling (rewrite-or-drop rows), and the deletion itself is logged in §10.

---

## Summary counts (mirrors §2 row-for-row — §9 does the arithmetic)

**22 open · 3 provisional · 2 blocked-owner · 1 parked · 6 closed — 34 rows (REG-01…REG-34)**

Sub-flags: **0 contested severities** (resolved by supervisor review rulings D1–D3: REG-12→🔴, REG-17→🟠, REG-18 kept 🟡 — D3: U16 N/A-by-letter, *(F-C1 corrected 2026-10-26: was "REG-18→🟠", inverted)*) ·
**0 unresolved pointer checks** (§5) · **0 phantom pointers** (anti-phantom guard passed).

---

## §1 Namespace scheme

Three track F-series collide on disk; every row therefore gets a register ID plus an
**Orig ID** that names its track, and a source-doc pointer.

| Track | Source doc (graded) | Original ID series | Orig-ID form used here |
|---|---|---|---|
| Desktop 2026-10-19 | `study/2026-10-19-layout-typography-content-audit.md` | `D1–D10` (rubric), `N-01…N-04` (issue log) | `D5`, `N-01` … |
| Responsive 2026-10-20 | `study/2026-10-20-responsive-audit.md` | `F1–F6` (**collides with U**) | `RESP-F1` … `RESP-F6` |
| Usability 2026-10-21 | `study/2026-10-21-usability-accessibility-audit.md` | `F1–F12` (**collides with R**) | `U-F1` … `U-F12` |
| Backend | `docs/user-journeys.md` Appendix A | `A-1…A-9` | `A-1`, `A-3`, `A-7` |
| Decision queues | audit §6/§7 + PLAN answered queues | numbered queue items | `U-DQ5`, `R-DQ3` |
| Owner inputs | PLAN blocked list + audits "not ranked" | descriptive | `N-04`, `A-7`, `AOS` |

**Namespace note (author-uncertain, flagged for review):** the register guide (PLAN:118) originally said "three colliding F-series: desktop F1–F8, responsive F1–F6, U F1–F12". **Amended 2026-10-22 by ruling D8:** the desktop track's findings are `D1–D10` + `N-01…N-04` — there is no desktop F-series (verified: CHANGELOG @ `2adbee7` cites D5/D3/D4/N-01/N-02/N-03). The real collision is **two** series (responsive F1–F6 vs U F1–F12). The guide's parenthetical is corrected; this register uses what is on disk.

---

## §2 Register table

Columns: Register ID · Orig ID · Severity (**cited from the track's locked rubric or graded
punch list — never re-derived here**) · Route/page · Element · File:line (machine-verified §5)
· Receipt pointer (machine-verified §5) · Status · Fix batch · Fix spec (= the answered
decision queues inlined, or the audit's own fix candidate where no queue existed).

Status classes: `OPEN-CODE` · `PROVISIONAL` (evidence under pass-B; corrections named §7) ·
`BLOCKED-OWNER` · `PARKED` · `CLOSED-SHIPPED`.
Fix batches (preliminary — crystallized in priorities): `FE` = frontend say-the-word ·
`BE` = backend say-the-word (separate thread, PLAN:76) · `PASS-B` · `OWNER` · `PARKED` ·
`SHIPPED`.

<!-- REGISTER-TABLE-START -->
| Reg ID | Orig ID | Severity (cited) | Route/page | Element | File:line | Receipt pointer | Status | Batch | Fix spec |
|---|---|---|---|---|---|---|---|---|---|
| REG-01 | A-1 | 🔴 (user-journeys App. A) | API `/api/webcontent` | `update-content` / `publish-content` routes mounted with no auth middleware | `backend/src/routes/webContentRoute.ts:31–39` | `docs/user-journeys.md` App. A row A-1 (inline) | OPEN-CODE | BE | Add auth middleware to both routes (mirror the guarded `create` at `:19–24`); run through the full fix pipeline (PLAN:6) |
| REG-02 | A-2 | 🔴 (user-journeys App. A) | API `/api/products` | `POST /create` unauthenticated while update/delete are guarded | `backend/src/routes/productRoute.ts:19–22` | `docs/user-journeys.md` App. A row A-2 (inline) | OPEN-CODE | BE | Auth on `create` (mirror guarded update/delete `:34–46`); full pipeline |
| REG-03 | A-3 | 🔴 (user-journeys App. A) | API mounts (`server.ts`) | limiters mounted after their routers (never fire); ticket router double-mounted; products double-mounted | `backend/src/server.ts:61–62,67–71` (+ double mount `:65,:72`) | `docs/user-journeys.md` App. A row A-3 (inline) | OPEN-CODE | BE | Reorder limiter-before-router; remove double mounts; appointments-limiter swap (PLAN:6); **+ dead-OR cleanup optional** (`requirePermission(X) \|\| adminMiddleware` never reaches the OR's right side — 10 sites: `ticketRoute.ts:27/34/41/48/55/61/68`, `productRoute.ts:37/44`, `webContentRoute.ts:22`, source `study/2026-10-15.md:70`) |
| REG-04 | U-F1 | 🟠 (U6; U11) | `/` + `/what-we-do` | review carousel arrows — accessible name empty (`nameSrc: NONE`), 2 + 4 controls | `frontend/src/components/Button/Button.tsx:24` (`alt=""` icon render), `sections/ClientReviewsSection.tsx:41–53` | `inv-wwd-1440.json` (`unnamedVisible: 4`) · `tab-home-1440.json` (`nameSrc: NONE` ×5) | OPEN-CODE | FE | Name the controls (`aria-label` or real children on the icon `Button`) — announcement break only; operability already passes. **Orig tags amended: U6/U11 (U2 dropped, rubric annotation b)** |
| REG-05 | U-F2 | 🟠 (U7) | `/` + `/contact-us` (`ContactForm` mounts twice via `ContactUsSection.tsx`) | all 8 fields: no `<label>`, no `id`, no `aria-label`; 5 placeholder-only; 3 `<select>` nameless; **6 required** fields (correction U-C8: the audit prose said "five") | `frontend/src/components/cards/ContactForm.tsx:86–182` (selects `:138,:154,:169`) | `sem-*-1440.json` (`labelElements: []` ×4) · `inv-contact-1440.json` (`placeholderOnlyFields: 5`) | OPEN-CODE | FE | **Answered U-queue 3:** real `<label for>` + matching ids on all 8 fields × both routes — not aria-label-only (also closes the 3.1.5 autofill gap) |
| REG-06 | U-F3 | 🟠 (U6) | `/` + `/what-we-do` | FAQ accordion trigger: native `<button>` (inherited, correct) but no `aria-expanded`/`aria-controls`; panel div has no id | `frontend/src/components/FaqSection/Faq.tsx:49–63` (file contains 0 `aria-expanded`) | `inv-home-1440.json` (FAQ-trigger row, `ariaExpanded: null` before and after toggle) | OPEN-CODE | FE | Add `aria-expanded` + `aria-controls`↔panel `id`; state must track the measured `0fr→1fr` toggle (toggle-behavior receipt = pass-B, correction U-C3) |
| REG-07 | U-F5 | 🟠 (U8 landmark rule) | `/what-we-do` | second `<main>` nested inside Layout's | `frontend/src/pages/WhatWeDo.tsx:139` inside `frontend/src/Layout.tsx:18` | `sem-wwd-1440.json` (`"tag": "MAIN"` ×2, inner unlabelled) | OPEN-CODE | FE | Demote the inner element to `<div>` — exactly one `main` per route |
| REG-08 | U-F7 | 🟠 (U15) | `/book-a-schedule` | submit gated by `canBook` with no reason shown: no inline message, no per-field state, no `aria-invalid`/`aria-describedby`; `role=alert` only for server errors | `frontend/src/components/BookingCalendar.tsx:146–150` (gate), `:388` (server alert), `:393–400` (disabled submit) | `inv-book-1440.json` (`"disabled": true` rows) | OPEN-CODE | FE | Visible + programmatically announced reason naming which of the three conditions is unmet; contrast with contact form's native validation (audit §1.5) |
| REG-09 | U-F8 | 🟠 controls / 🟡 display (U9) | all 4 routes | white on `#8B5CF6` = **4.23:1** on 11–19px control labels (11 rows: home 5, contact 2, wwd 2, book 2) + `#8B5CF6` on violet-900 = **2.59:1** on 75px display; **tally corrected** (U-C5/U-C6: NaN artifact `01` dropped from the failure list; body copy + grays split to REG-10/REG-11) | token-level `bg-[#8B5CF6]` fills (anchor `frontend/src/components/HeroPage.tsx:111`) | `contrast-{home,wwd,contact,book}-1440.json` (`failing` 7/2/2/5 → after split 5/2/2/2 under this row; ratios hand-reproduced in grading) | OPEN-CODE | FE | **Answered U-queue 1:** token-fix — deeper surface token for text-bearing filled buttons (violet-700 `#6D28D9` = **7.1:1** hand-computed); keep `#8B5CF6` for borders/accents/large display; no brand exception |
| REG-10 | U-F8b | 🟠 (U9 body copy) | `/` (Operational Structure) | violet-600 `rgb(127,34,254)` label text on `#1a1a1a` = **2.95:1** at 14px/600 — receipt-listed but never filed (grading correction U-C5: "worse than F8 itself") | `frontend/src/components/sections/OperationalStructure.tsx:78` | `contrast-home-1440.json` (`"ratio": 2.95`) | OPEN-CODE | FE | Folded into the same token pass per answered U-queue 1 |
| REG-11 | U-F8c | 🟠 (U9 body copy) | `/book-a-schedule` | gray text on dark: day button `1` = **2.34:1**, "Free. No credit card required" = **3.81:1**, "Prefer a different way to connect?" = **4.1:1** — receipt-listed, never filed (correction U-C7) | `frontend/src/components/BookingPage.tsx:54`, `:89` (day button = receipt-level, `contrast-book`) | `contrast-book-1440.json` (`2.34` / `3.81` / `4.1`) | OPEN-CODE | FE | Lift the gray text tokens on booking to ≥4.5:1 (separate from the violet token pass) |
| REG-12 | U-F11 | 🔴 (U4, amended by ruling D1) | mobile sheet (all public routes) | no `Escape` handler anywhere; focus walks past the 5th sheet item onto content **behind** the opaque overlay; background not inert; menu stays open | `frontend/src/components/MobileMenu.tsx` (0 `Escape`/`keydown` in file; close button `:38`) | `kbd-mobile-menu-focus-escape.json` (`burgerExpanded: "true"`, `backgroundInert: false`, `activeLabel: "Talk to us"` — **receipt label used, audit prose misnamed the element, correction U-C11**) | OPEN-CODE | FE | **Answered U-queue 4:** Escape closes + focus returns to burger + background inert (or full trap) |
| REG-13 | RESP-F2 | 🟠 (R4 🟠 — copy unreadable) | `/` at 768 | email address overflows its card by 79px, truncated to `iry@opsiesoftwaresolutions.c`; root cause `md:break-normal` suppresses the mid-word break | `frontend/src/pages/sections/ContactUsSection.tsx:123` (`break-all md:break-normal` on the `<p>`; audit's `:114` line cite corrected) | `targeted.json → emailText` · `r-768x1024-email-card.png` | OPEN-CODE | FE | Drop `md:break-normal` (or `break-words` + smaller text at md) — **responsive P2, the only P2 row after §7.2 amendment** |
| REG-14 | RESP-F6 | 🟡 (R6) | `/what-we-do` ≤640 (mobile arrows) | arrow `<img>` forced `w-6 h-6` (24×24) over 17×21 SVGs = **23.5%** aspect stretch | `frontend/src/components/sections/ServicesSections.tsx:109,:120` (imgs; buttons `:107,:118` — lines verified; these are the `md:hidden` mobile arrows, correction R-C5 context) | `probe-320x568-wwd.json → probe.R6.distorted` (`17,21→24,24`, `aspDeltaPct: 23.5` ×2) | OPEN-CODE | FE | Size the SVG to its natural box (`object-contain`-style sizing / intrinsic sizing) |
| REG-15 | RESP-F3 | 🟡 (R4) | `/what-we-do` at 1024 | FAQ `h2` overflows its 227px column by 51px, paints into the 48px gap (no collision, delta=0) — description quote corrected (R-C12): headline is **"Got Questions? We've Got Answers"**, not the phantom "We're here to help" | `frontend/src/types/components/SuperHeader.tsx:14,:22` + `frontend/src/components/FaqSection/Faq.tsx:22` (`lg:w-1/3`) | `targeted.json → faqH2` · `r-1024x768-faq-header.png` | OPEN-CODE | FE | Allow wrapping (`break-words`/narrower at lg) or widen the header column |
| REG-16 | RESP-F5 | 🟡 (R6) | `/` | spinning logo PNG 423×413 forced toward square: aspect delta **2.4–3.7%** across the 9 home cells (correction R-C12 applied: prior prose "2.4–4.4%" retracted; 320-cell = 3.6%/2.4% as graded) | `frontend/src/pages/sections/ProductSection.tsx:45` (`spin-slow w-16 h-16`) | `probe-*.json → probe.R6.distorted` + `matrix-raw.json → r6distList` | OPEN-CODE | FE | `aspect-square object-contain` or a square source asset |
| REG-17 | U-F6 | 🟠 (U14, amended by ruling D2) | `/` | 3 links `target="_blank"` with no `rel` (EMAIL/VISIT/CALL cards; VISIT is a real external hop) | `frontend/src/pages/sections/ContactUsSection.tsx:111–114` | `inv-home-1440.json` (`blankNoRel: 3`) | OPEN-CODE | FE | Add `rel="noopener noreferrer"` to all three |
| REG-18 | U-F9 | 🟡 (U13; U16 N/A-by-letter, kept by ruling D3 — *(F-C1 corrected 2026-10-26: was "🟠 (U16 / U13 🟡, amended by ruling D3)", recorded inverted)*) | `/` + site-wide | raw `<a href="/contact-us">` inside the SPA (full document reload) where every other internal nav is a `Link`; `/book-a-schedule` is never an `href` — 6 `navigate()` buttons only, so booking can't be bookmarked/middle-clicked | `frontend/src/components/FaqSection/Faq.tsx:27`; navigate sites `Header.tsx:67`, `HeroPage.tsx:110`, `Navigation.tsx:190`, `pages/WhatWeDo.tsx:181`, `pages/ContactUsPage.tsx:103`, `cards/ProductItemCTA.tsx:30` (all 6 verified) | `inv-*` — no `"href": "/book-a-schedule"` on any route · `link-integrity.json` (all internal hrefs resolve) | OPEN-CODE | FE | `<a>` → `Link`; give booking a real anchor target (canonical `Link` or nav href) |
| REG-19 | U-F10 | 🟡 (U11 decorative mislabelled) | `/` | `alt='OpSync'` on `opsie_logo_only.png` — OpSync card reuses the Opsie logo but announces a different product; no image anywhere is *missing* alt (0/4 routes — the passing half of U11) | n/a — runtime CMS value, 0 source hits (graded exact) | `sem-home-1440.json` (`OpSync`) | OPEN-CODE | FE | Correct the alt (decorative `alt=""` or the right product name) at the CMS/source that renders it |
| REG-20 | U-F12 | 🟡 (U8 heading rule) | `/` | 7 `<h1>` + skips (h1→h3 ×3, h1→h4); `/contact-us` + `/book-a-schedule` clean | n/a — outline-level finding (receipt is the evidence) | `sem-home-1440.json` (`h1Count: 7`, `headingLevelSkips`) | OPEN-CODE | FE | One `h1` per route + re-level the skipped headings (demote section h1s to h2/h3 per hierarchy) |
| REG-21 | U-DQ5 | 🟡 (preventive guard; no rubric fail — from answered U-queue 5) | site-wide | `*:focus-visible` at `index.css:336` is **unlayered** and load-bearing: it outranks Tailwind's layered `focus:outline-none` on 9 controls incl. the mobile close button and every `ContactForm` field | `frontend/src/index.css:336–338` | `focus-rings-1440.json` (`meets3to1: true` rows — settled keyboard-primed sweep) | OPEN-CODE | FE | **Answered U-queue 5:** warning comment: rule must stay unlayered; removing it silently breaks focus site-wide |
| REG-22 | R-DQ3 | ℹ (re-test action; no defect claimed — responsive §5/§7.3) | `/` | main-thread hang observation on dev render; **env-confounded, approved for prod-build re-test**; the prior §5 receipt pointer and the numbers quoted from it are phantom (correction R-C11: the cited file exists nowhere) and are dropped | n/a (action row) | none yet — pass-B/prod run **creates** the receipt (`hangtest.mjs` re-run against `npm run build && preview`) | OPEN-CODE | FE | Prod-build re-test, approved §7.3/D9; batch note: executed during pass-B/prod preview (creates receipt). Outcome enters register as delta. |
| REG-23 | RESP-F1 | 🟡 latent (D1 latent / R-C9, amended by ruling D4) · PROVISIONAL | `/` at 320 | hero CTA "SEE HOW IT WORKS" — audit's numbers (118.4×60.6, scrollW 172.6) match **no receipt**; receipt truth = 118×104, scrollW 173; screenshot shows a 4-line wrap with **all words visible**, span ends x269 vs clip edge 270 → likely no character lost; 60.6 vs 104 = two layout states (race) | `frontend/src/components/HeroPage.tsx:109–114` (`overflow-hidden` `:111`) | `targeted.json → heroBtn` · `interactions.json → hero320` · `r-320x568-hero-cta.png` | PROVISIONAL | PASS-B | **Ruling D4:** rewrite with true numbers (118×104 px, scrollW 173 px, clientW 118 px, all words visible, span x269 vs clip 270, 1px latent clip margin); provisional status confirmed; pass-B re-capture resolves rewrite vs drop. |
| REG-24 | RESP-F4 | 🟡 (R5) · PROVISIONAL | all viewports, both pages | touch targets <44px: count is **17–29 per cell** (audit said "14" — R-C6), real labels are footer/nav links like "Why Opsie", "About Us", "Our Products" (audit's "Home/About/Services/Products" wrong — R-C10); dims re-read from receipts: footer links 65–177×**18**, socials 40×40, review arrows 32×32, DISCOVER 230×36.5, VIEW ALL 144×31.2, FAQ link 146.5×22, logo 96×36.2, Mapbox ctrl 24×24 | verified pointers only: `Footer.tsx:106,109,117,118,119,133` (18px-high links), `Footer.tsx:144` (`w-10 h-10` socials), `Buttons.ts:55` (`px-2 py-1` arrows), `Faq.tsx:27` (22px-high link). **Dropped as unsupported (R-C10): `Footer.tsx:19 py-1.5`, `Buttons.ts:12/24/39`, `Navigation.tsx:132`-as-logo** | `probe-*.json → probe.R5.under44` (per-cell lists) · `matrix-raw.json → r5under` (17–29) · `interactions.json → touch` (subset; corrected key — R-C13) | PROVISIONAL | PASS-B | Padding/min-size sweep after pass-B re-measure; corrections touching it: **R-C6** (count), **R-C10** (labels+dims+cites), **R-C13** (repro key). Note: `Faq.tsx:27` element is shared with REG-18 (same control, different defect) — kept distinct |
| REG-25 | U-F4 | 🟠 (U5) · PROVISIONAL | `/` | hero primary CTA focus ring `2px solid #8B5CF6` lands on the `bg-violet-600` pill: stored ratio **1.66:1**, hand-recompute in grading gives **1.39** — verdict (<3:1) unchanged either way, number must be re-measured; the sibling FAQ ratio (4.95 in §2.3 vs 4.68 in receipt) same class of drift | `frontend/src/components/HeroPage.tsx:109` (button) | `focus-hero-ring-1440.json` (`ringVsOutside: 1.66`, `meets3to1: false`) | PROVISIONAL | PASS-B | **Answered U-queue 2:** dual-tone focus ring (2px `#fff` outer + existing violet) so the indicator clears ≥3:1 against **both** the button fill and the violet-600 pill (white-on-violet-600 = **5.9:1** hand-computed). Corrections touching it: **U-C10** (ratio re-measure; §2.3 4.95-vs-4.68 row) |
| REG-26 | N-04 (desktop) + U-inherited footer cite | — (desktop audit: excluded from ranking pending owner — "not ranked") | shared footer, all routes | social links target FB/IG **root** pages; email `mailto:hello@opsie.com`; plus the footer nav stand-ins "Our Team / FAQ's / Our Story / Our Mission / Our Vision" all → `/who-we-are` (U-cited as inherited, not re-filed) | `frontend/src/components/Footer.tsx:140,:148,:156,:157` (social+email) **and** `:106,:109,:117,:118,:119` (stand-ins) | desktop audit §Item A N-04 inline paste · U audit §5 (both citations) · `inv-home-1440.json` (`/who-we-are` ×7) | BLOCKED-OWNER | OWNER | Owner supplies real FB URL + IG URL + contact email, and confirms the intended destinations of the five footer nav stand-ins. **Merged row (§6): desktop N-04 + U-inherited cite → one row, both citations** |
| REG-27 | A-7 | 🟡 (blocked) (user-journeys App. A) | booking + ticket email tails | all notification emails silently dead until `EMAIL_USER`/`EMAIL_PASS` exist in `backend/.env` | `backend/src/services/emailService.ts:15,:29,:46` (`EMAIL_USER`) + `backend/.env` (values absent; file exists — contents not read) | `docs/user-journeys.md` App. A row A-7 · PLAN:131 blocked list | BLOCKED-OWNER | OWNER | Owner sets `EMAIL_USER` / `EMAIL_PASS`; then send-path smoke test. **Estimate deferred pending owner input** |
| REG-28 | AOS | — (decision, "not scored as a defect" — desktop audit P3) | `/` scroll reveals | `.aos-animate` completion-rule fix: **DEFER** verdict resolved 2026-10-19 — no reproducible failing post-animation state exists; GO is defined as *apply* the fix when un-parked | `frontend/src/App.tsx:39` (`AOS.init`) | PLAN:133 ("resolved 2026-10-19 (audit verdict: DEFER)") | PARKED | PARKED | Stays parked until a concrete failing case is supplied; re-open = apply completion-rule fix, not leave as-is |
| REG-29 | D5 | 🟠 (D-rubber D5, desktop) | `/` + `/what-we-do` | desktop nav autohidied on down-scroll (criterion FAIL by letter) | `frontend/src/components/Navigation.tsx` (machinery `showNav`/`lastScroll`/`hideTimeout` + `top:-80px` removed) | CHANGELOG @ `2adbee7` "Desktop nav no longer autohides" · git `2adbee7` | CLOSED-SHIPPED | SHIPPED | Done — commit `2adbee7` (2026-10-19); corroborated responsive R2/R11 `navTopAfter: 0` at all 18 cells |
| REG-30 | D3 | 🟠 (inherited criterion D3) | `/` (Operational Structure) | legacy sky tokens in the violet theme | `frontend/src/components/sections/OperationalStructure.tsx` (5 uses replaced; **0 `sky-` matches remain in `frontend/src`**) | CHANGELOG @ `2adbee7` "Legacy sky tokens removed" | CLOSED-SHIPPED | SHIPPED | Done — commit `2adbee7`; cleanup scoped to this component per the answered queue |
| REG-31 | D4 | 🟠 by literal criterion / low visual impact (desktop) | `/` + `/what-we-do` FAQ | FAQ trigger `borderRadius: 0px` vs the site's rounded-full button rule | `frontend/src/components/FaqSection/Faq.tsx:45` (waiver comment) | CHANGELOG @ `2adbee7` "FAQ trigger `rounded-full` waiver documented" | CLOSED-SHIPPED | SHIPPED | Done — decision = waive + document; comment shipped in `2adbee7`, no visual change |
| REG-32 | N-01 | 🟡 (desktop P2) | `/what-we-do` | `securebackup` misspelling in Cloud Solutions copy | `frontend/src/components/sections/ServicesSections.tsx:8` (`secure backup` now) | desktop audit §Item A N-01 inline paste (historical) · CHANGELOG @ `2adbee7` | CLOSED-SHIPPED | SHIPPED | Done — commit `2adbee7` |
| REG-33 | N-02 | 🟡 (desktop P2) | `/what-we-do` | three doubled terminal periods in carousel descriptions | `frontend/src/components/sections/ServicesSections.tsx:10,:12,:13` | desktop audit §Item A N-02 inline paste · CHANGELOG @ `2adbee7` | CLOSED-SHIPPED | SHIPPED | Done — commit `2adbee7` |
| REG-34 | N-03 | — (candidate, owner-unconfirmed — desktop "not ranked") | `/` hero mini-card | trailing `---` placeholder punctuation | `frontend/src/components/HeroPage.tsx:106` (`Operate The Opsie Way</p>` — dashes gone) | desktop audit §Item A N-03 inline paste · CHANGELOG @ `2adbee7` | CLOSED-SHIPPED | SHIPPED | Done — commit `2adbee7` **with recorded revert path**: revert if the dashes are intentional brand copy (owner check) |
<!-- REGISTER-TABLE-END -->

---

## §3 Status classes

| Class | Meaning | Rules |
|---|---|---|
| `OPEN-CODE` | evidence settled; fix is code work with no external dependency | must land in exactly one batch or in not-now (priorities step) |
| `PROVISIONAL` | row survives, but a stated number/verdict is under pass-B correction — **no provisional number may be quoted as final** | §7 names the corrections touching each; flagged "pass-B recheck before ship" in priorities |
| `BLOCKED-OWNER` | cannot be coded without owner input (real URLs/email, `EMAIL_*` values) | never outranks shippable code work; estimate = "deferred pending owner input" |
| `PARKED` | decision explicitly deferred (AOS DEFER) | stays out of every batch until a ruling un-parks it |
| `CLOSED-SHIPPED` | fix landed; kept for traceability | pointer = commit + CHANGELOG entry; no work |

---

## §4 Batch proposal (preliminary — priorities owns the ordered ranking)

**Rule (stated, reused from the desktop audit §"Severity and ranking rule"):**
`score = impact (1–3) × breadth (1–3) ÷ effort (1–3)` — 1 = low/local/quick, 3 = high/wide/
expensive. Per-row scoring with pasted outputs happens in `2026-10-22-priorities.md`; here the
rule only justifies **batch membership**, and status classes gate membership.

- **BATCH-A "frontend fix ship" (`FE`) — 19 rows:** REG-04…REG-22 (all frontend `OPEN-CODE`).
  One coherent unit: shared components (ContactForm, Faq, MobileMenu, Footer cards, token
  pass) touched by the usability + responsive rows, all verifiable by the same harness in one
  pass-B capture session. Status-aware: PROVISIONAL rows (REG-23/24/25) are **not** members —
  they join only after pass-B re-measure clears them.
- **BATCH-B "backend security ship" (`BE`) — 3 rows:** REG-01, REG-02, REG-03 (+ dead-OR
  cleanup as the optional tail of REG-03's spec). Kept as its **own say-the-word** because the
  2026-10-19 ruling says the backend fix batch is a separate thread and must not merge into the
  frontend ranking (PLAN:76); it is 🔴-severity and needs the full-pipeline pass (PLAN:6).
- Outside batches: `PASS-B` (REG-23/24/25), `OWNER` (REG-26/27), `PARKED` (REG-28),
  `SHIPPED` (REG-29…34).

Both batches are candidate "say-the-word" ships; crystallization (one vs two, exact rosters,
execution order) is the priorities step's done-condition.

---

## §5 Pointer-verification receipt (hard rule — anti-phantom)

**Rule:** every `File:line` and every receipt pointer in §2 is machine-verified same-day:
file exists + token present **at the cited line** (or the cited range), receipt file exists and
is non-zero (+ key token where the pointer names one); negative checks used where a finding
*is* an absence (`Escape`, `aria-expanded`); shipped rows verified as post-fix state + CHANGELOG
entry. Anti-phantom guard: the §2 table must contain none of the known phantom lineage
(`touchTargets`, `hangtest.json`, `activeIsMain`).

**Receipt provenance:** `study/receipts/2026-10-21/link-integrity.json` generated during U-track Item 2 link integrity audit, cross-checking all internal hrefs against the `Router.tsx` route table (0 dead links across all 4 public routes).

Script: `C:\Users\kingg\AppData\Local\Temp\opencode\verify-register.mjs` — raw output pasted below,
run 2026-10-23.

```
verify-register.mjs — run 2026-10-23 04:51:36 (same-day pointer verification)
----------------------------------------------------------------------------------------------------
PASS  REG-01  range backend/src/routes/webContentRoute.ts:31-39 ~ "'/update-content'"
PASS  REG-01  range backend/src/routes/webContentRoute.ts:31-39 ~ "'/publish-content'"
PASS  REG-01  count docs/user-journeys.md ~ "webContentRoute.ts:31" >= 1
PASS  REG-02  line backend/src/routes/productRoute.ts:19 ~ "this.router.post("
PASS  REG-02  line backend/src/routes/productRoute.ts:20 ~ "'/create'"
PASS  REG-02  count docs/user-journeys.md ~ "productRoute.ts:19" >= 1
PASS  REG-03  line backend/src/server.ts:61 ~ "ticket/create"
PASS  REG-03  line backend/src/server.ts:62 ~ "ticketRoute.router"
PASS  REG-03  range backend/src/server.ts:67-71 ~ "appointmentLimiter"
PASS  REG-03  line backend/src/server.ts:65 ~ "productRoute.router"
PASS  REG-03  line backend/src/server.ts:72 ~ "productRoute.router"
PASS  REG-03  count docs/user-journeys.md ~ "server.ts:61" >= 1
PASS  REG-04  line frontend/src/components/Button/Button.tsx:24 ~ "alt=\"\""
PASS  REG-04  line frontend/src/components/sections/ClientReviewsSection.tsx:41 ~ "<Button"
PASS  REG-04  count study/receipts/2026-10-21/inv-wwd-1440.json ~ "\"unnamedVisible\": 4" >= 1
PASS  REG-04  count study/receipts/2026-10-21/tab-home-1440.json ~ "\"nameSrc\": \"NONE\"" >= 5
PASS  REG-05  line frontend/src/components/cards/ContactForm.tsx:86 ~ "<input"
PASS  REG-05  line frontend/src/components/cards/ContactForm.tsx:138 ~ "<select"
PASS  REG-05  line frontend/src/components/cards/ContactForm.tsx:154 ~ "<select"
PASS  REG-05  line frontend/src/components/cards/ContactForm.tsx:169 ~ "<select"
PASS  REG-05  count study/receipts/2026-10-21/sem-home-1440.json ~ "\"labelElements\": []" >= 1
PASS  REG-05  count study/receipts/2026-10-21/sem-wwd-1440.json ~ "\"labelElements\": []" >= 1
PASS  REG-05  count study/receipts/2026-10-21/sem-contact-1440.json ~ "\"labelElements\": []" >= 1
PASS  REG-05  count study/receipts/2026-10-21/sem-book-1440.json ~ "\"labelElements\": []" >= 1
PASS  REG-05  count study/receipts/2026-10-21/inv-contact-1440.json ~ "\"placeholderOnlyFields\": 5" >= 1
PASS  REG-06  line frontend/src/components/FaqSection/Faq.tsx:49 ~ "<button"
PASS  REG-06  line frontend/src/components/FaqSection/Faq.tsx:63 ~ "</button>"
PASS  REG-06  absent frontend/src/components/FaqSection/Faq.tsx ~ "aria-expanded" (want 0)
PASS  REG-06  count study/receipts/2026-10-21/inv-home-1440.json ~ "\"What services do you offer\"" >= 1
PASS  REG-06  count study/receipts/2026-10-21/inv-home-1440.json ~ "\"ariaExpanded\": null" >= 1
PASS  REG-07  line frontend/src/pages/WhatWeDo.tsx:139 ~ "<main"
PASS  REG-07  line frontend/src/Layout.tsx:18 ~ "<main id=\"main-content\""
PASS  REG-07  count study/receipts/2026-10-21/sem-wwd-1440.json ~ "\"tag\": \"MAIN\"" >= 2
PASS  REG-08  line frontend/src/components/BookingCalendar.tsx:146 ~ "const canBook"
PASS  REG-08  line frontend/src/components/BookingCalendar.tsx:388 ~ "role=\"alert\""
PASS  REG-08  line frontend/src/components/BookingCalendar.tsx:393 ~ "<button"
PASS  REG-08  count study/receipts/2026-10-21/inv-book-1440.json ~ "\"disabled\": true" >= 1
PASS  REG-09  line frontend/src/components/HeroPage.tsx:111 ~ "bg-[#8B5CF6]"
PASS  REG-09  count study/receipts/2026-10-21/contrast-home-1440.json ~ "\"ratio\": 4.23" >= 5
PASS  REG-09  count study/receipts/2026-10-21/contrast-contact-1440.json ~ "\"ratio\": 4.23" >= 2
PASS  REG-09  count study/receipts/2026-10-21/contrast-book-1440.json ~ "\"ratio\": 4.23" >= 2
PASS  REG-09  count study/receipts/2026-10-21/contrast-wwd-1440.json ~ "\"ratio\": 2.59" >= 2
PASS  REG-10  line frontend/src/components/sections/OperationalStructure.tsx:78 ~ "Our collaborative operational model"
PASS  REG-10  count study/receipts/2026-10-21/contrast-home-1440.json ~ "\"ratio\": 2.95" >= 1
PASS  REG-11  line frontend/src/components/BookingPage.tsx:54 ~ "Prefer a different way to connect"
PASS  REG-11  line frontend/src/components/BookingPage.tsx:89 ~ "Free. No credit card required"
PASS  REG-11  re study/receipts/2026-10-21/contrast-book-1440.json ~ /"ratio": 2\.34/ >= 1
PASS  REG-11  re study/receipts/2026-10-21/contrast-book-1440.json ~ /"ratio": 3\.81/ >= 1
PASS  REG-11  re study/receipts/2026-10-21/contrast-book-1440.json ~ /"ratio": 4\.1[^0-9]/ >= 1
PASS  REG-12  absent frontend/src/components/MobileMenu.tsx ~ "Escape" (want 0)
PASS  REG-12  line frontend/src/components/MobileMenu.tsx:38 ~ "focus:outline-none"
PASS  REG-12  count study/receipts/2026-10-21/kbd-mobile-menu-focus-escape.json ~ "\"backgroundInert\": false" >= 1
PASS  REG-12  count study/receipts/2026-10-21/kbd-mobile-menu-focus-escape.json ~ "\"activeLabel\": \"Talk to us\"" >= 1
PASS  REG-13  line frontend/src/pages/sections/ContactUsSection.tsx:123 ~ "break-all md:break-normal"
PASS  REG-13  count study/receipts/2026-10-20/targeted.json ~ "\"emailText\"" >= 1
PASS  REG-13  file study/receipts/2026-10-20/r-768x1024-email-card.png exists non-zero (225355b)
PASS  REG-14  line frontend/src/components/sections/ServicesSections.tsx:107 ~ "md:hidden"
PASS  REG-14  line frontend/src/components/sections/ServicesSections.tsx:109 ~ "alt=\"Previous\""
PASS  REG-14  line frontend/src/components/sections/ServicesSections.tsx:118 ~ "md:hidden"
PASS  REG-14  line frontend/src/components/sections/ServicesSections.tsx:120 ~ "alt=\"Next\""
PASS  REG-14  re study/receipts/2026-10-20/probe-320x568-wwd.json ~ /"aspDeltaPct": 23\.5/ >= 2
PASS  REG-15  line frontend/src/types/components/SuperHeader.tsx:14 ~ "<h2"
PASS  REG-15  line frontend/src/types/components/SuperHeader.tsx:22 ~ "max-w-[850px]"
PASS  REG-15  line frontend/src/components/FaqSection/Faq.tsx:22 ~ "lg:w-1/3"
PASS  REG-15  count study/receipts/2026-10-20/targeted.json ~ "\"faqH2\"" >= 1
PASS  REG-15  file study/receipts/2026-10-20/r-1024x768-faq-header.png exists non-zero (147574b)
PASS  REG-16  line frontend/src/pages/sections/ProductSection.tsx:45 ~ "spin-slow w-16 h-16"
PASS  REG-16  count study/receipts/2026-10-20/matrix-raw.json ~ "opsie_logo_only.png" >= 9
PASS  REG-16  count study/receipts/2026-10-20/matrix-raw.json ~ "\"r6distList\"" >= 18
PASS  REG-16  re study/receipts/2026-10-20/probe-375x812-home.json ~ /"aspDeltaPct": 3\.3/ >= 1
PASS  REG-17  range frontend/src/pages/sections/ContactUsSection.tsx:111-114 ~ "target=\"_blank\""
PASS  REG-17  count study/receipts/2026-10-21/inv-home-1440.json ~ "\"blankNoRel\": 3" >= 1
PASS  REG-18  line frontend/src/components/FaqSection/Faq.tsx:27 ~ "<a href=\"/contact-us\""
PASS  REG-18  line frontend/src/components/Header.tsx:67 ~ "navigate(\"/book-a-schedule\")"
PASS  REG-18  line frontend/src/components/HeroPage.tsx:110 ~ "navigate(\"/book-a-schedule\")"
PASS  REG-18  line frontend/src/components/Navigation.tsx:190 ~ "navigate(\"/book-a-schedule\")"
PASS  REG-18  line frontend/src/pages/WhatWeDo.tsx:181 ~ "navigate(\"/book-a-schedule\")"
PASS  REG-18  line frontend/src/pages/ContactUsPage.tsx:103 ~ "navigate(\"/book-a-schedule\")"
PASS  REG-18  line frontend/src/components/cards/ProductItemCTA.tsx:30 ~ "navigate(\"/book-a-schedule\")"
PASS  REG-18  absent study/receipts/2026-10-21/inv-home-1440.json ~ "\"href\": \"/book-a-schedule\"" (want 0)
PASS  REG-18  absent study/receipts/2026-10-21/inv-wwd-1440.json ~ "\"href\": \"/book-a-schedule\"" (want 0)
PASS  REG-18  absent study/receipts/2026-10-21/inv-contact-1440.json ~ "\"href\": \"/book-a-schedule\"" (want 0)
PASS  REG-18  absent study/receipts/2026-10-21/inv-book-1440.json ~ "\"href\": \"/book-a-schedule\"" (want 0)
PASS  REG-18  count study/receipts/2026-10-21/link-integrity.json ~ "\"dead\"" >= 4
PASS  REG-18  count study/receipts/2026-10-21/link-integrity.json ~ "\"allResolve\":" >= 1
PASS  REG-18  json study/receipts/2026-10-21/link-integrity.json ~ every perRoute dead[] empty
PASS  REG-19  count study/receipts/2026-10-21/sem-home-1440.json ~ "OpSync" >= 1
PASS  REG-20  count study/receipts/2026-10-21/sem-home-1440.json ~ "\"h1Count\": 7" >= 1
PASS  REG-20  count study/receipts/2026-10-21/sem-home-1440.json ~ "headingLevelSkips" >= 1
PASS  REG-21  line frontend/src/index.css:336 ~ "*:focus-visible"
PASS  REG-21  count study/receipts/2026-10-21/focus-rings-1440.json ~ "\"meets3to1\": true" >= 1
PASS  REG-22  file-absent study/receipts/2026-10-20/hangtest.json
PASS  REG-22  file-absent study/receipts/2026-10-21/hangtest.json
PASS  REG-23  line frontend/src/components/HeroPage.tsx:109 ~ "<button"
PASS  REG-23  line frontend/src/components/HeroPage.tsx:111 ~ "overflow-hidden"
PASS  REG-23  count study/receipts/2026-10-20/targeted.json ~ "\"heroBtn\"" >= 1
PASS  REG-23  count study/receipts/2026-10-20/interactions.json ~ "\"hero320\"" >= 1
PASS  REG-23  file study/receipts/2026-10-20/r-320x568-hero-cta.png exists non-zero (164510b)
PASS  REG-24  line frontend/src/components/Footer.tsx:106 ~ "Our Team"
PASS  REG-24  line frontend/src/components/Footer.tsx:109 ~ "FAQ's"
PASS  REG-24  line frontend/src/components/Footer.tsx:117 ~ "Our Story"
PASS  REG-24  line frontend/src/components/Footer.tsx:118 ~ "Our Mission"
PASS  REG-24  line frontend/src/components/Footer.tsx:119 ~ "Our Vision"
PASS  REG-24  line frontend/src/components/Footer.tsx:133 ~ "Opsie Software Solutions."
PASS  REG-24  line frontend/src/components/Footer.tsx:144 ~ "w-10 h-10"
PASS  REG-24  line frontend/src/types/components/Buttons.ts:55 ~ "px-2 py-1 rounded-full"
PASS  REG-24  count study/receipts/2026-10-20/probe-375x812-home.json ~ "\"under44Count\": 24" >= 1
PASS  REG-24  count study/receipts/2026-10-20/matrix-raw.json ~ "\"r5under\"" >= 18
PASS  REG-24  count study/receipts/2026-10-20/interactions.json ~ "\"touch\"" >= 1
PASS  REG-25  line frontend/src/components/HeroPage.tsx:109 ~ "<button"
PASS  REG-25  count study/receipts/2026-10-21/focus-hero-ring-1440.json ~ "\"ringVsOutside\": 1.66" >= 1
PASS  REG-25  count study/receipts/2026-10-21/focus-hero-ring-1440.json ~ "\"meets3to1\": false" >= 1
PASS  REG-26  line frontend/src/components/Footer.tsx:140 ~ "href=\"https://facebook.com\""
PASS  REG-26  line frontend/src/components/Footer.tsx:148 ~ "href=\"https://instagram.com\""
PASS  REG-26  line frontend/src/components/Footer.tsx:156 ~ "mailto:hello@opsie.com"
PASS  REG-26  line frontend/src/components/Footer.tsx:157 ~ "aria-label=\"Email us at hello@opsie.com\""
PASS  REG-26  count study/2026-10-19-layout-typography-content-audit.md ~ "Follow us on Facebook" >= 1
PASS  REG-26  count study/2026-10-21-usability-accessibility-audit.md ~ "Footer.tsx:106,109,117,118,119" >= 1
PASS  REG-26  count study/receipts/2026-10-21/inv-home-1440.json ~ "\"/who-we-are\"" >= 5
PASS  REG-27  line backend/src/services/emailService.ts:15 ~ "EMAIL_USER"
PASS  REG-27  line backend/src/services/emailService.ts:29 ~ "EMAIL_USER"
PASS  REG-27  line backend/src/services/emailService.ts:46 ~ "EMAIL_USER"
PASS  REG-27  file backend/.env exists non-zero (99b)
PASS  REG-27  count docs/user-journeys.md ~ "A-7" >= 1
PASS  REG-27  count docs/user-journeys.md ~ "EMAIL_USER" >= 1
PASS  REG-27  count study/PLAN.md ~ "EMAIL_USER" >= 1
PASS  REG-28  line frontend/src/App.tsx:39 ~ "AOS.init"
PASS  REG-28  count study/PLAN.md ~ "resolved 2026-10-19" >= 1
PASS  REG-28  count study/PLAN.md ~ "(audit verdict: DEFER)" >= 1
PASS  REG-29  absent frontend/src/components/Navigation.tsx ~ "showNav" (want 0)
PASS  REG-29  absent frontend/src/components/Navigation.tsx ~ "lastScroll" (want 0)
PASS  REG-29  absent frontend/src/components/Navigation.tsx ~ "hideTimeout" (want 0)
PASS  REG-29  count CHANGELOG.md ~ "Desktop nav no longer autohides" >= 1
PASS  REG-29  git 2adbee7 resolves
PASS  REG-30  dir-absent frontend/src (202 files) ~ "sky-" (want 0)
PASS  REG-30  count CHANGELOG.md ~ "Legacy sky tokens removed" >= 1
PASS  REG-31  line frontend/src/components/FaqSection/Faq.tsx:45 ~ "waived for this"
PASS  REG-31  count CHANGELOG.md ~ "waiver" >= 1
PASS  REG-32  line frontend/src/components/sections/ServicesSections.tsx:8 ~ "secure backup"
PASS  REG-32  dir-absent frontend/src (202 files) ~ "securebackup" (want 0)
PASS  REG-32  count CHANGELOG.md ~ "securebackup" >= 1
PASS  REG-33  line frontend/src/components/sections/ServicesSections.tsx:10 ~ "infrastructure.\""
PASS  REG-33  line frontend/src/components/sections/ServicesSections.tsx:12 ~ "applications.\""
PASS  REG-33  line frontend/src/components/sections/ServicesSections.tsx:13 ~ "experience.\""
PASS  REG-33  count CHANGELOG.md ~ "doubled terminal periods" >= 1
PASS  REG-34  line frontend/src/components/HeroPage.tsx:106 ~ "Operate The Opsie Way</p>"
PASS  REG-34  count CHANGELOG.md ~ "Hero mini-card tagline" >= 1
PASS  TABLE  register has START/END markers
PASS  TABLE  table rows starting "| REG-xx |" == 34
PASS  TABLE  status count OPEN-CODE == 22
PASS  TABLE  status count PROVISIONAL == 3
PASS  TABLE  status count BLOCKED-OWNER == 2
PASS  TABLE  status count PARKED == 1
PASS  TABLE  status count CLOSED-SHIPPED == 6
PASS  TABLE  summary counts line present verbatim
PASS  PHANTOM  anti-phantom guard over 34 table rows ~ touchTargets|hangtest.json|activeIsMain (want 0)
PASS  COVERAGE  every row REG-01..REG-34 has >=1 check
----------------------------------------------------------------------------------------------------
checks 157 pass / 0 fail · table rows 34 · statuses {"OPEN-CODE":22,"PROVISIONAL":3,"BLOCKED-OWNER":2,"PARKED":1,"CLOSED-SHIPPED":6} · unresolved 0
```

Counts line (must be): `checks: N pass / 0 fail · table rows: 34 · unresolved: 0`.

---

## §6 Merge log

**Merged into single rows (cross-track duplicates):**
1. **Footer placeholder hrefs → REG-26.** Desktop N-04 (`Footer.tsx:140,148,156,157` —
   social roots + `hello@opsie.com`) and the U-track inherited cite (`Footer.tsx:106,109,117,118,119`
   — five nav stand-ins → `/who-we-are`) are the same owner-input blocker on the same component:
   one row, both citations, both file:line sets (the guide's explicit example).
2. **Touch targets = one row across two tracks.** Responsive F4 (R5 fail) is U10's inherited
   measurement — the U plan's inheritance map cites it, the U audit re-cites it as inherited
   (audit §5). One row: REG-24; U10 never re-finds it.

**Kept distinct (same component, different defect — not duplicates):**
- REG-09/REG-10/REG-11 (text contrast) vs REG-25 (focus-ring contrast) — hero CTA contrast ≠
  hero focus ring (guide's explicit example).
- REG-18 (raw `<a>`/no href) vs REG-24's FAQ-link row (22px target) — `Faq.tsx:27` is the same
  element but a naming/reload defect and a size defect; separate fixes, separate criteria.
- REG-06 (FAQ `aria-expanded`) vs REG-15 (FAQ header spill) vs REG-31 (FAQ radius, shipped) —
  three tracks, three defects, one component.
- REG-04 (arrow naming) vs REG-14 (arrow stretch) — announcement vs geometry.

**Inherited cites that create no row (passes/notes, §8):** R5 skip-link presence → U1
function (stronger claim, passed); burger `aria-expanded` (R2) — keyboard-path receipt only;
mega-menu hover-only (U3 note, deliberately not 🔴); ChatHelp `pointer-events-none` (U3 N-A,
noted 🟡).

---

## §7 Provisional rule + corrections ledger

**Rule:** no provisional number is final. A PROVISIONAL row's flagged value may not be quoted
in any downstream doc until pass-B re-capture clears it; the row still carries its fix spec so
batching can plan around it.

The register guide names **13 responsive + 9 U corrections**. The chat-issued numbered lists
are not on disk, so they are **reconstructed from the PLAN grading entries** (responsive:
PLAN:81–83; U: PLAN:101, merged with the same-topic items at PLAN:103) — mapped by content;
each entry says which rows it touches and what the register did about it. Item-3-only U
deductions beyond the reconstruction's nine are listed after, so nothing is silently dropped.

**Responsive (13):**
1. R-C1 — §0.1 "scripts exit non-zero on delta>0" is false → audit-doc prose (no row).
2. R-C2 — `scrolled:true` lives in `attrib-*.json`, not sweep2 → audit R11 prose (no row; R11 passed).
3. R-C3 — R3's only cite `ProductSection.tsx:46 grid md:grid-cols-2` does not exist → audit R3 prose (no row; R3 passed).
4. R-C4 — R3 "1 at 320–640" contradicts its own 640 data → audit R3 prose (no row).
5. R-C5 — R8 phase labels inverted; `:109/:120` are the `md:hidden` **mobile** arrows, desktop set `:42` → audit R8 prose; touches **REG-14** — line identity verified: REG-14 targets the mobile arrows by design (fix applies at `:109,:120`), no change needed.
6. R-C6 — R5 "14 controls" vs measured 17–29 → **REG-24 APPLIED** (count now `under44Count`/`r5under` 17–29/cell).
7. R-C7 — `footerBg` key wrong (real `r9bg` in matrix) → audit R9 prose (no row; R9 passed).
8. R-C8 — outsideViewport(5)+clipText(3) at 320-home unaddressed in prose → touches **REG-23** + **REG-16** (named in REG-23's fix spec; pass-B must address them).
9. R-C9 — F1 cited numbers match no receipt; wrap-all-words; race → **REG-23: the core of its PROVISIONAL status (rewrite-or-drop)**.
10. R-C10 — F4 count/labels/dims + `Buttons.ts:12/24/39`, `py-1.5` cites unsupported → **REG-24 APPLIED** (receipt-true labels/dims; pointers re-verified; three unsupported cites dropped and named in the row).
11. R-C11 — `hangtest.json` receipt + §5 numbers exist nowhere → **REG-22 APPLIED** (pointer removed, numbers dropped, row = approved re-test that creates its own receipt).
12. R-C12 — phantom FAQ quote → **REG-15 APPLIED** (row now quotes "Got Questions? We've Got Answers").
13. R-C13 — `touchTargets`/`fixedNavOverlap` wrong keys (real `touch`/`overlap`) → **REG-24 APPLIED** (repro pointer = `probe.R5` + `matrix-raw r5under` + `interactions.touch`); also fixes the audit's R7/R10 prose keys.
    *(The separate "F1 kept as P2 on disproven evidence" and "2.4–4.4%" grading items are folded into R-C9 and REG-16's applied correction respectively — §2 rows carry the dispositions.)*

**U (9):**
1. U-C1 — receipts header "(34 files)" vs 30 on disk (31 today incl. this track's new `link-integrity.json`) → audit §0 header prose (no row).
2. U-C2 — skip-Enter/`activeIsMain` present in 0 receipts → U1 **pass** evidence (no register row — passes aren't rows); re-capture is pass-B scope.
3. U-C3 — FAQ-toggle claim (0fr→1fr, 110px) has no receipt file → touches **REG-06**: finding stands on `inv-*` (`ariaExpanded: null`); toggle-behavior receipt named as pass-B in the row's fix spec.
4. U-C4 — mega live-open claim has no receipt file → touches the mega-menu **note** (§8), not a row.
5. U-C5 — F8's "every instance is a control label" is false; 2.95:1 body copy unreported → **REG-10 ADDED** + REG-09 tally split APPLIED.
6. U-C6 — home `01` NaN resolver artifact filed as a failure → **REG-09 APPLIED** (dropped from the tally; noted as resolver artifact).
7. U-C7 — booking grays 2.34/3.81/4.1 unreported → **REG-11 ADDED**.
8. U-C8 — "Five required fields" lists six → **REG-05 APPLIED** (row says 6 required, names them).
9. U-C9 — U2 mis-tagged on F1 → **REG-04 APPLIED** (tags now U6/U11, per rubric lock annotation b).

**U item-3 deductions beyond the nine (PLAN:103) — recorded, mapped:**
- U-C10 — F4 1.66 and FAQ 4.95 don't reproduce by hand (1.39 / ~4.36); §2.3 form-input row says 4.95 vs receipt 4.68 → **REG-25 PROVISIONAL core** (ratio re-measure) + note for the acceptance-criteria regression table.
- U-C11 — F11's prose element ("SEE HOW IT WORKS") contradicts its receipt (`activeLabel: "Talk to us"`) → **REG-12 APPLIED** (row quotes the receipt label; pass-B re-capture confirms identity).
- U-C12 — Navigation note described CSS `group-hover`; mechanism is React hover-state (`:124–125`, conditional render `:141`) → mega-menu note (§8) APPLIED; conclusion (hover-only, no `onFocus`) unchanged.
- U-C13 — `focus-map-canvas` + the focus-rings hero/canvas rows are failed captures (`found: false`) left unexplained → method-limit note (§8); **REG-21's receipt pointer uses the passing rows** (`meets3to1: true`), REG-25 uses `focus-hero-ring` (separate, complete file).

---

## §8 Exclusions and non-row notes (named so nothing is silently dropped)

- **Backend A-4…A-9** (user-journeys App. A, 🟡) — **outside this register**: the register
  guide's input list names A-1/A-2/A-3 only. Rows exist at `docs/user-journeys.md:109–114`
  (A-4 draftContent leak + HTTP 201 · A-5 swallowed errors · A-6 products double-mount — note
  A-6 overlaps REG-03's `:65/:72` fix · A-7 → REG-27 · A-8 static dropdown drift · A-9 no CMS
  loading states).
- **Repo artifacts** (live_check.mjs, HTML dumps, temp scripts) = infrastructure, not findings.
- **Re-grading** — grades live in PLAN; nothing here re-grades a track. **Code fixes** are the
  implementation plan's job, not register rows' content beyond fix specs.
- **Latent, unreachable:** `/subscribe-now` vs router's `/Subscribe-now` (capital S) in
  `OpsieHRIS.tsx:117` / `Opsync.tsx` — both files unimported (0 import matches), so no user can
  hit it; recorded by the U audit as latent, **not a finding**, will fire if either file is wired.
- **Mega-menu hover-only sub-links** (`Navigation.tsx:124–125`, no `onFocus`) — deliberately
  **not** filed at 🔴 (U3 note): the three products are reachable by keyboard via parent
  `/products`. Not a row; if a ruling wants it, it appends with a fresh ID.
- **ChatHelp** (`pointer-events-none`, `ChatHelp.tsx:7`) — U3 N-A by rule; noted 🟡 as a dead
  interactive affordance; not scored, not a row.
- **U plan annotation (a)** — the plan §3 homepage-assembly table wrongly lists `MapDesign` as a
  Homepage import (it is imported only by `WhoWeAre.tsx:6`): a **doc fix**, not a finding; live
  inventories covered the true DOM so no rubric cell is affected.
- **N-04 social/email validity** and **N-03 dash intent** remain owner questions — carried as
  REG-26 (blocked) and REG-34's revert note (closed) respectively.

---

## §9 Counts reconciliation

| Status | Rows | Reg IDs |
|---|---|---|
| OPEN-CODE | **22** | REG-01…REG-22 |
| PROVISIONAL | **3** | REG-23, REG-24, REG-25 |
| BLOCKED-OWNER | **2** | REG-26, REG-27 |
| PARKED | **1** | REG-28 |
| CLOSED-SHIPPED | **6** | REG-29…REG-34 |
| **Total** | **34** | REG-01…REG-34 |

**Summary line (authoritative): `22 open · 3 provisional · 2 blocked-owner · 1 parked · 6 closed — 34 rows`.**
Batch arithmetic: 19 `FE` + 3 `BE` = 22 open ✓ · 3 `PASS-B` + 2 `OWNER` + 1 `PARKED` + 6 `SHIPPED` = 12 non-open ✓ · 34 total ✓.

---

## §10 Dated delta log

- **2026-10-22 — assembly (this document):** 34 rows created from graded sources; corrections
  applied as named in §7 (R-C6/9/10/11/12/13 · U-C5/6/7/8/9/11 dispositioned); three
  unsupported desktop-era pointers dropped from REG-24 (`Footer.tsx:19 py-1.5`,
  `Buttons.ts:12/24/39`, `Navigation.tsx:132`-as-logo); `ContactUsSection.tsx:114`→`:123`
  line correction on REG-13; namespace discrepancy (guide's "desktop F1–F8") recorded §1.
  Pointer verification: see §5 (0 unresolved).
- **2026-10-23 — Supervisor rulings D1–D9 applied (`study/2026-10-22-findings-review.md`):**
  - REG-12 amended from 🟠 to **🔴** per locked rubric U4 letter (D1).
  - REG-17 amended from 🟡 to **🟠** per locked rubric U14 letter (D2).
  - REG-18 severity **kept 🟡** (D3 ruling of record: keep 🟡 + U16 N/A-by-letter — FAQ raw `<a>` is U13 only); scope clarified to include both raw `<a>` document reloads and unaddressable booking path. *(F-C1 corrected 2026-10-26: previously read "amended from 🟡 to 🟠 (tracking U16 🟠 / U13 🟡)" — recorded inverted; severity letters are cited, never re-derived.)*
  - REG-23 rewritten with true receipt numbers (118×104 px, scrollW 173 px, clientW 118 px, all words visible, span x269 vs clip 270, 1px latent clip margin); status confirmed as PROVISIONAL 🟡 latent pending pass-B re-measure (D4).
  - REG-22 confirmed in OPEN-CODE with batch note: action row creates receipt in prod-build pass-B (`hangtest.mjs` against `npm run build && preview`) (D9).
  - References to dead `PLAN:94` re-pointed to `PLAN:6` standing ship pipeline rule (REG-01, REG-03, §4 BATCH-B).
  - `link-integrity.json` provenance added to §5.
  - Same-day machine verification re-run 2026-10-23 (157 pass / 0 fail · 0 unresolved).
  - Contested severities sub-flag cleared: **0 contested severities**.
- *(later deltas append here — pass-B re-captures, new rows from Friday's guides)*
