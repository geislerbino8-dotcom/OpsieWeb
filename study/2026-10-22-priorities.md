# Backlog Prioritization — 2026-10-22
**Chain Block 3 of `study/PLAN.md` (:127)**  
**Input:** `study/2026-10-22-findings-register.md` (amended 2026-10-23) · `study/2026-10-22-findings-review.md` (rulings D1–D9).  
**Done condition:** Every `OPEN-CODE` row lands in exactly one batch or not-now; every rank justified by explicit rule output.

---

## §1 Prioritization Rule

Reused from Desktop Audit §"Severity and ranking rule" and PLAN:119:

$$\text{Score} = \frac{\text{Impact} (1–3) \times \text{Breadth} (1–3)}{\text{Effort} (1–3)}$$

**Tie-break rule (added 2026-10-26 — F-C1):** rows with equal Score keep their **previously graded order** (stable ranking — scores and order are cited from the 2026-10-23 grading, never re-derived); so the **4.00 tie REG-06 (rank 3) → REG-04 (rank 4) stands as graded**, as do the 2.00, 1.00 and 0.50 tie groups below.

### Scoring Rubric

| Dimension | 1 (Low / Local / Quick) | 2 (Medium / Sectional / Moderate) | 3 (High / Wide / Complex) |
|---|---|---|---|
| **Impact** | 🟡 Minor cosmetic, aspect stretch, label typo | 🟠 Major functional break, contrast failure, unannounced control, layout overflow | 🔴 Blocker, security vulnerability, inaccessible component (keyboard trap / non-inert overlay) |
| **Breadth** | Single page/section, isolated viewport | Multiple pages (2 routes) or shared component (FAQ, ContactForm) | Site-wide, all public routes, global chrome (Nav, Footer, theme tokens) |
| **Effort** | ≤ 0.5h (one-line fix, token swap, attribute addition) | 1–2h (component adjustment, labels + ids, aria state wiring) | ≥ 2h (architectural refactor, focus containment, multi-component rewrite) |

### Status Awareness Rules
- `BLOCKED-OWNER` (REG-26, REG-27) never outranks shippable code work; deferred pending owner inputs.
- `PROVISIONAL` (REG-23, REG-24, REG-25) rows are flagged **"pass-B recheck before ship"** and do not enter shippable batches until cleared by measurement.
- `PARKED` (REG-28) stays out of batches until a failing case is reproduced.
- `CLOSED-SHIPPED` (REG-29…34) carries no work; retained for traceability.
- `BE` security fixes (REG-01…03) remain an independent say-the-word thread per PLAN:76/PLAN:6; not merged into the frontend ranking.

---

## §2 Prioritized Backlog Table

All 22 `OPEN-CODE` rows ordered by score within their respective delivery streams.

### Stream 1: BATCH-A Frontend (`FE`) — 19 Rows

| Rank | Reg ID | Orig ID | Sev | Page / Route | Element | Impact | Breadth | Effort | Score | Effort Band | Risk | Dependency | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **1** | **REG-09** | U-F8 | 🟠 | All 4 routes | Button filled text contrast (`bg-[#8B5CF6]` → violet-700) | 2 | 3 | 1 | **6.00** | Quick (0.5h) | Low | Token pass (U-DQ1) | OPEN-CODE |
| **2** | **REG-12** | U-F11 | 🔴 | All public (mobile) | MobileMenu Escape key, background inert, focus return | 3 | 3 | 2 | **4.50** | Mod (1.5h) | Med | Ruling D1 (🔴) | OPEN-CODE |
| **3** | **REG-06** | U-F3 | 🟠 | `/` + `/what-we-do` | FAQ accordion native trigger `aria-expanded` + controls | 2 | 2 | 1 | **4.00** | Quick (0.5h) | Low | U-C3 toggle | OPEN-CODE |
| **4** | **REG-04** | U-F1 | 🟠 | `/` + `/what-we-do` | Review carousel arrows accessible name (`aria-label`) | 2 | 2 | 1 | **4.00** | Quick (0.5h) | Low | None | OPEN-CODE |
| **5** | **REG-21** | U-DQ5 | 🟡 | Site-wide | `index.css:336` unlayered `*:focus-visible` warning guard | 1 | 3 | 1 | **3.00** | Quick (0.2h) | Low | None | OPEN-CODE |
| **6** | **REG-10** | U-F8b | 🟠 | `/` | OperationalStructure violet text contrast (`rgb(127,34,254)`) | 2 | 1 | 1 | **2.00** | Quick (0.3h) | Low | Fold with REG-09 | OPEN-CODE |
| **7** | **REG-11** | U-F8c | 🟠 | `/book-a-schedule` | Booking page gray text contrast lift (≥4.5:1) | 2 | 1 | 1 | **2.00** | Quick (0.5h) | Low | None | OPEN-CODE |
| **8** | **REG-05** | U-F2 | 🟠 | `/` + `/contact-us` | ContactForm real `<label for>` + `id` on all 8 fields | 2 | 2 | 2 | **2.00** | Mod (1.5h) | Low | U-DQ3 | OPEN-CODE |
| **9** | **REG-07** | U-F5 | 🟠 | `/what-we-do` | Nested second `<main>` element demotion to `<div>` | 2 | 1 | 1 | **2.00** | Quick (0.2h) | Low | None | OPEN-CODE |
| **10** | **REG-13** | RESP-F2 | 🟠 | `/` (768px) | Contact card email overflow (drop `md:break-normal`) | 2 | 1 | 1 | **2.00** | Quick (0.3h) | Low | None | OPEN-CODE |
| **11** | **REG-17** | U-F6 | 🟠 | `/` | 3 links `target="_blank"` missing `rel="noopener noreferrer"` | 2 | 1 | 1 | **2.00** | Quick (0.2h) | Low | Ruling D2 (🟠) | OPEN-CODE |
| **12** | **REG-18** | U-F9 | 🟡 | Site-wide | Raw `<a>` reload → `<Link>` + booking canonical `href` | 1 | 3 | 2 | **1.50** | Mod (1.0h) | Low | Ruling D3 (kept 🟡 — U16 N/A-by-letter)/R-A | OPEN-CODE |
| **13** | **REG-14** | RESP-F6 | 🟡 | `/what-we-do` (≤640) | Services carousel arrow SVG aspect stretch (23.5%) | 1 | 1 | 1 | **1.00** | Quick (0.3h) | Low | R-C5 | OPEN-CODE |
| **14** | **REG-15** | RESP-F3 | 🟡 | `/what-we-do` (1024) | FAQ `h2` column header overflow into column gap | 1 | 1 | 1 | **1.00** | Quick (0.4h) | Low | R-C12 | OPEN-CODE |
| **15** | **REG-16** | RESP-F5 | 🟡 | `/` | Spinning logo PNG aspect distortion (2.4–3.7%) | 1 | 1 | 1 | **1.00** | Quick (0.3h) | Low | R-C12 | OPEN-CODE |
| **16** | **REG-19** | U-F10 | 🟡 | `/` | `alt="OpSync"` on Opsie logo (decorative / correct alt) | 1 | 1 | 1 | **1.00** | Quick (0.2h) | Low | None | OPEN-CODE |
| **17** | **REG-08** | U-F7 | 🟠 | `/book-a-schedule` | Booking disabled submit reason affordance & announcement | 2 | 1 | 2 | **1.00** | Mod (1.5h) | Med | BookingCalendar | OPEN-CODE |
| **18** | **REG-20** | U-F12 | 🟡 | `/` | 7 `<h1>` headings + heading level skips demotion | 1 | 1 | 2 | **0.50** | Mod (1.0h) | Low | None | OPEN-CODE |
| **19** | **REG-22** | R-DQ3 | ℹ | `/` | Prod-build hang re-test action row (`hangtest.mjs`) | 1 | 1 | 2 | **0.50** | Mod (1.0h) | Low | Ruling D9/Pass-B | OPEN-CODE |

### Stream 2: BATCH-B Backend Security (`BE`) — 3 Rows (Independent Thread)

| Rank | Reg ID | Orig ID | Sev | Page / Route | Element | Impact | Breadth | Effort | Score | Effort Band | Risk | Dependency | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **1** | **REG-03** | A-3 | 🔴 | API mounts (`server.ts`) | Reorder limiter before router; dedupe ticket/products | 3 | 3 | 1 | **9.00** | Quick (0.5h) | Med | PLAN:6 pipeline | OPEN-CODE |
| **2** | **REG-01** | A-1 | 🔴 | API `/api/webcontent` | Auth middleware on `update-content` & `publish-content` | 3 | 2 | 1 | **6.00** | Quick (0.5h) | Med | PLAN:6 pipeline | OPEN-CODE |
| **3** | **REG-02** | A-2 | 🔴 | API `/api/products` | Auth middleware on `POST /create` product route | 3 | 1 | 1 | **3.00** | Quick (0.3h) | Med | PLAN:6 pipeline | OPEN-CODE |

---

## §3 Batch Crystallization

### BATCH-A: Frontend Accessibility & Responsiveness Fix Ship
- **Total Rows:** 19 (`OPEN-CODE`)
- **Estimated Total Coding Effort:** ~11.9 hours *(F-C5 cross-ref added 2026-10-26: this is the **effort-band sum** for the same 19 FE rows; `study/2026-10-22-implementation-plan.md` estimates the identical roster at **10.1h coding + 3.0h harness = 13.1h** per-task (its §3) — the two figures use different bases (band midpoints vs per-task basis statements), so they are not expected to match; see that doc's §3 cross-reference note.)*
- **Execution Units:**
  1. **Sub-batch A1 (Core Accessibility & Tokens — Ranks 1, 4, 5, 6, 7):** REG-09 (buttons token), REG-04 (carousel arrows aria-label), REG-21 (index.css comment), REG-10 (operational text), REG-11 (booking gray text). *(F-C1 reranked 2026-10-26: was "Ranks 1, 4, 6, 7, 8" — REG-18 left rank 5, rows above it shifted up.)*
  2. **Sub-batch A2 (Interactive Components & Navigation — Ranks 2, 3, 9, 11, 12):** REG-12 (MobileMenu Escape/inert), REG-06 (FAQ aria-expanded), REG-07 (demote duplicate main), REG-17 (target="_blank" rel), REG-18 (Link booking href / Ruling R-A). *(F-C1 reranked 2026-10-26: was "Ranks 2, 3, 5, 10, 12" with REG-18 at 5 — REG-18 now rank 12 🟡/1.50; IDs re-ordered to rank order.)*
  3. **Sub-batch A3 (Forms & Feedback — Ranks 8, 17):** REG-05 (ContactForm label/id pairs), REG-08 (BookingCalendar validation reason). *(F-C1 reranked 2026-10-26: was "Ranks 9, 17".)*
  4. **Sub-batch A4 (Responsive Geometries & Asset Hygiene — Ranks 10, 13, 14, 15, 16, 18, 19):** REG-13 (email break-all), REG-14 (mobile arrow aspect), REG-15 (FAQ h2 width), REG-16 (spinning logo aspect), REG-19 (logo alt), REG-20 (demote section h1s), REG-22 (prod-build hang re-test). *(F-C1 reranked 2026-10-26: was "Ranks 11, 13, 14, 15, 16, 18, 19".)*

### BATCH-B: Backend Security Fix Ship (Independent Thread)
- **Total Rows:** 3 (`OPEN-CODE`)
- **Estimated Total Effort:** ~1.3 hours + test verification
- **Roster:** REG-03, REG-01, REG-02 (+ dead-OR cleanup optional tail)
- **Pipeline:** Full fix pipeline per PLAN:6 (`npx tsc -b --force` · lint · test · CI).

---

## §4 Explicit Not-Now / Parked / Owner List

| Reg ID | Track | Reason for Exclusion from Active Batches | Next Trigger |
|---|---|---|---|
| **REG-23** | PROVISIONAL | Hero CTA 320px 1px latent clip (118×104, scrollW 173) | Pass-B re-measurement clears rewrite-vs-drop (Ruling D4) |
| **REG-24** | PROVISIONAL | Touch targets 17–29/cell <44px | Pass-B size sweep clears final roster (Ruling D5) |
| **REG-25** | PROVISIONAL | Hero CTA focus ring dual-tone ratio on violet-700 | Pass-B ratio measurement clears U5 ≥3:1 (Ruling D6/R-B) |
| **REG-26** | BLOCKED-OWNER | Footer social URLs target root domains; email hello@opsie.com | Owner supplies live FB/IG handles and verified email |
| **REG-27** | BLOCKED-OWNER | Email tails dead without `EMAIL_USER`/`EMAIL_PASS` in `backend/.env` | Owner injects SMTP credentials |
| **REG-28** | PARKED | AOS `.aos-animate` completion-rule DEFER verdict (2026-10-19) | Stays parked until reproducible failing case supplied |
| **REG-29…34** | CLOSED-SHIPPED | Landed in commit `2adbee7` (D5, D3, D4, N-01, N-02, N-03) | Closed — historical traceability |
