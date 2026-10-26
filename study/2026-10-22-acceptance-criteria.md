# Acceptance Criteria — Selected Components (BATCH-A & BATCH-B)
**Chain Block 4 of `study/PLAN.md` (:128)**  
**Input:** `study/2026-10-22-priorities.md` · `study/2026-10-22-findings-register.md` · `study/2026-10-23-herocta-redesign.md` (Hero CTA closure criteria feed in).  
**Protocol:** Validation-only testing protocol strictly enforced — no live email submissions, no credentials input, no valid appointment or message sent (PLAN:90).

---

## §1 Scope & Component Selection

This document covers all components touched by **BATCH-A (Frontend Accessibility & Responsive Ship)** and **BATCH-B (Backend Security Ship)**:

| Component | Source File(s) | REG IDs Covered | Scope In | Scope Out |
|---|---|---|---|---|
| **Buttons & Hero CTA** | `frontend/src/components/HeroPage.tsx`<br>`frontend/src/components/Button/Button.tsx` | REG-09, REG-18, REG-21, REG-25 | Token swap to violet-700, `<Link>` anchor, cascade-winning ring | Layout animations, SplitText, SoftAurora |
| **Mobile Menu** | `frontend/src/components/MobileMenu.tsx`<br>`frontend/src/components/Navigation.tsx` | REG-12 | `Escape` key listener, focus trap, background inert, focus return to burger | Desktop menu layout, autohide mechanics (closed D5) |
| **FAQ Accordion** | `frontend/src/components/FaqSection/Faq.tsx`<br>`frontend/src/types/components/SuperHeader.tsx` | REG-06, REG-15, REG-18 | Native trigger `aria-expanded` + `aria-controls`, panel `id`, raw `<a>` → `<Link>`, header wrap | Accordion border-radius waiver (closed D4) |
| **Contact Form** | `frontend/src/components/cards/ContactForm.tsx`<br>`frontend/src/pages/sections/ContactUsSection.tsx` | REG-05, REG-13, REG-17 | Explicit `<label for>` + `id` on all 8 fields × 2 routes, `target="_blank"` `rel` attributes, email overflow | Form submit endpoint payload, backend email sender |
| **Booking Component** | `frontend/src/components/BookingCalendar.tsx`<br>`frontend/src/components/BookingPage.tsx` | REG-08, REG-11, REG-18 | `canBook` disabled affordance + aria error reason, gray text contrast lift | Booking appointment persistence, payment processing |
| **Review & Service Carousels** | `frontend/src/components/sections/ClientReviewsSection.tsx`<br>`frontend/src/components/sections/ServicesSections.tsx` | REG-04, REG-14 | Carousel arrow accessible names (`aria-label`), mobile SVG intrinsic aspect | Drag interactions, review copy content |
| **Structural & Content Hygiene** | `frontend/src/pages/WhatWeDo.tsx`<br>`frontend/src/pages/sections/ProductSection.tsx`<br>`frontend/src/components/sections/OperationalStructure.tsx` | REG-07, REG-10, REG-16, REG-19, REG-20, REG-22 | Nested `<main>` demotion, violet label contrast, logo aspect, logo alt, `<h1>` re-leveling, prod hang test | CMS data pipeline, 3D Canvas / Gallery |
| **Backend Server & Routes** | `backend/src/server.ts`<br>`backend/src/routes/webContentRoute.ts`<br>`backend/src/routes/productRoute.ts` | REG-01, REG-02, REG-03 | Rate limiter ordering, router deduplication, auth middleware on mutation routes | Database schema, permission table redesign |

---

## §2 Measurable Acceptance Criteria by Component

### 1. Buttons & Hero CTA (`HeroPage.tsx`, `Button.tsx`)
- **AC-01 (REG-09 / U9 Contrast):**  
  - *Condition:* All text-bearing filled buttons (including hero CTA "SEE HOW IT WORKS") compute to contrast ratio **≥ 4.5:1** against their background fill.  
  - *Verification spec:* `contrast-home-1440.json` (and all routes) reports `ratio >= 4.5` on all button text labels; zero failures for filled violet buttons.
- **AC-02 (REG-18 / U16 Semantic Link):**  
  - *Condition:* Hero CTA renders as an anchor element `<a href="/book-a-schedule">` via React Router `<Link>`, allowing bookmarking, middle-click, and native Enter-key navigation without document reload.  
  - *Verification spec:* `inv-home-1440.json` reports `"href": "/book-a-schedule"` on the hero CTA element; `link-integrity.json` confirms link resolution.
- **AC-03 (REG-25 / U5 Focus Indicator — PROVISIONAL closure target):**  
  - *Condition:* Focus ring on hero CTA clears **≥ 3:1** against adjacent card surface (`oklch(0.541 0.281 293.009)`) and against button fill (`#6D28D9`).  
  - *Verification spec:* `focus-hero-ring-1440.json` post-fix reports **`ringVsOutside >= 3.0`** with **`meets3to1: true`** — graded on the receipt's existing keys (`route`, `text`, `ringColor`, `offset`, `bgOutside`, `ringVsOutside`, `meets3to1`; current pre-fix values `ringVsOutside: 1.66`, `meets3to1: false`). *(F-C3 amended 2026-10-26: spec previously demanded `ringVsInside >= 3.0` — that key exists nowhere in the receipt.)*
  - **Harness-extension note (F-C3):** the condition's against-**fill** leg (ring vs `#6D28D9`) has no key in the current schema. Before AC-03 can fully close, the capture must be extended to emit a `ringVsInside` field alongside `ringVsOutside`; until that extension lands, the fill leg is a **declared harness gap** and closure is graded on the outside leg only.

### 2. Mobile Menu Sheet (`MobileMenu.tsx`, `Navigation.tsx`)
- **AC-04 (REG-12 / U4 Keyboard Containment & Escape):**  
  - *Condition:* While mobile menu sheet is open:
    1. Pressing `Escape` closes the menu and immediately returns focus to the hamburger trigger button.
    2. Background content is marked `inert` or focus is trapped within the sheet (Tab from 5th item cycles back to close button; cannot land on content behind overlay).  
  - *Verification spec:* `kbd-mobile-menu-focus-escape.json` — **flat schema** (keys: `capturedAt`, `activeLabel`, `activeInsideSheet`, `activeInsideMainContent`, `burgerExpanded`, `sheetStillMounted`, `sheetFocusables`, `backgroundInert`); post-fix, **at the existing Tab-cycle capture point** (`capturedAt: "post-Tab past sheet last link"`) report:
    - `backgroundInert: true` (while open)
    - `activeInsideSheet: true` and `activeInsideMainContent: false` (Tab from the last sheet item cycles back inside the sheet — cannot land on content behind the overlay)
  - *(F-C3 amended 2026-10-26: spec previously demanded `afterEscape.sheetOpen`, `afterEscape.activeElement`, `tabCycle.focusEscapedBackground` — no `afterEscape`/`tabCycle` objects exist in the receipt; also the expected hamburger label was `'Toggle Menu'`, while every receipt + `Navigation.tsx:204` read **`"Toggle menu"`**.)*
  - **Harness-extension note (F-C3):** condition 1 (Escape closes + focus returns to the hamburger) needs a **second capture point** — re-run the same flat schema with `capturedAt: "post-Escape"` reporting `sheetStillMounted: false`, `burgerExpanded: "false"`, `activeLabel: "Toggle menu"`. Until that capture point exists, condition 1 is verifiable only by harness extension, not by the current receipt.

### 3. FAQ Accordion (`Faq.tsx`, `SuperHeader.tsx`)
- **AC-05 (REG-06 / U6 Accordion Semantics):**  
  - *Condition:* Accordion trigger `<button>` carries `aria-expanded="false"` when collapsed and flips to `"true"` when expanded; trigger carries `aria-controls="<panel-id>"` matching the collapsible panel's unique `id`.  
  - *Verification spec:* `inv-home-1440.json` and `inv-wwd-1440.json` report `ariaExpanded: "false"` before toggle, `"true"` after click/Enter, matching panel `id`.
- **AC-06 (REG-15 / RESP-F3 Header Wrap):**  
  - *Condition:* FAQ `<h2>` ("Got Questions? We've Got Answers") wraps cleanly within its column at 1024px viewport without overflowing its container or encroaching on column gap.  
  - *Verification spec:* `targeted.json → faqH2` at 1024×768 reports `overflow: 0px` and bounding box right edge $\le$ container boundary.
- **AC-07 (REG-18 / U13 SPA Navigation):**  
  - *Condition:* Contact link inside FAQ section (`Faq.tsx:27`) renders as React Router `<Link to="/contact-us">` rather than raw `<a href>`.  
  - *Verification spec:* `inv-home-1440.json` reports internal link using client-side routing; network panel verifies 0 document reloads on activation.

### 4. Contact Form (`ContactForm.tsx`, `ContactUsSection.tsx`)
- **AC-08 (REG-05 / U7 Form Field Association):**  
  - *Condition:* All 8 fields across both mount routes (`/` and `/contact-us`) have explicit `<label for="<id>">` elements matching unique `<input id="<id>">` or `<select id="<id>">`. Zero placeholder-only fields.  
  - *Verification spec:* `sem-home-1440.json` and `sem-contact-1440.json` report `labelElements.length >= 8` with valid `for` matching input `id`; `inv-contact-1440.json` reports `placeholderOnlyFields: 0`.
- **AC-09 (REG-13 / RESP-F2 Email Overflow):**  
  - *Condition:* Email address `inquiry@opsiesoftwaresolutions.com` wraps without truncation or card clipping across 768px viewport.  
  - *Verification spec:* `targeted.json → emailText` at 768×1024 reports `clientW >= scrollW` and zero visual text truncation (`r-768x1024-email-card.png`).
- **AC-10 (REG-17 / U14 Safe External Links):**  
  - *Condition:* All links targeting `_blank` carry `rel="noopener noreferrer"`.  
  - *Verification spec:* `inv-home-1440.json` reports `blankNoRel: 0`.

### 5. Booking Schedule Page (`BookingCalendar.tsx`, `BookingPage.tsx`)
- **AC-11 (REG-08 / U15 Form Error Affordance):**  
  - *Condition:* When `canBook` is false, disabled submit button provides clear visible instruction and programmatic description naming the missing requirement(s) (date, time slot, contact details), announced via `aria-describedby` or `role="alert"`.  
  - *Verification spec:* `inv-book-1440.json` reports `aria-describedby` pointing to visible validation hint when submit is disabled.
- **AC-12 (REG-11 / U9 Text Contrast on Dark):**  
  - *Condition:* Day button labels ("1"), "Free. No credit card required", and "Prefer a different way to connect?" compute to contrast **≥ 4.5:1** against canvas.  
  - *Verification spec:* `contrast-book-1440.json` reports 0 failures; ratios for these 3 elements exceed 4.5:1.

### 6. Carousels & Media (`ClientReviewsSection.tsx`, `ServicesSections.tsx`, `ProductSection.tsx`)
- **AC-13 (REG-04 / U6 Carousel Arrow Names):**  
  - *Condition:* Client review carousel Previous/Next buttons have non-empty accessible names (`aria-label="Previous review"` / `aria-label="Next review"`).  
  - *Verification spec:* `inv-wwd-1440.json` reports `unnamedVisible: 0`; `tab-home-1440.json` reports `nameSrc != "NONE"`.
- **AC-14 (REG-14 / RESP-F6 Arrow Aspect Ratio):**  
  - *Condition:* Mobile navigation arrow icons in Services carousel maintain their natural 17:21 aspect ratio without geometric distortion (distortion $\le 2\%$).  
  - *Verification spec:* `probe-320x568-wwd.json → probe.R6.distorted` reports `aspDeltaPct < 2.0`.
- **AC-15 (REG-16 / RESP-F5 Logo Aspect Ratio):**  
  - *Condition:* Spinning logo asset renders with preserved 423:413 aspect ratio (`aspect-square object-contain`).  
  - *Verification spec:* `matrix-raw.json → r6distList` reports aspect delta $\le 2.0\%$ across all 9 viewports.
- **AC-16 (REG-19 / U11 Logo Alt Text):**  
  - *Condition:* Opsie logo image carries accurate brand alt text `alt="Opsie"` or `alt=""` where decorative.  
  - *Verification spec:* `sem-home-1440.json` reports 0 instances of `alt="OpSync"` on Opsie logo asset.

### 7. Layout & Landmarks (`WhatWeDo.tsx`, `OperationalStructure.tsx`, `index.css`)
- **AC-17 (REG-07 / U8 Landmark Uniqueness):**  
  - *Condition:* Exactly one `<main id="main-content">` landmark exists on `/what-we-do`. Nested inner `<main>` is demoted to `<div>`.  
  - *Verification spec:* `sem-wwd-1440.json` reports `"tag": "MAIN"` count = 1.
- **AC-18 (REG-10 / U9 Label Contrast):**  
  - *Condition:* Violet label text in OperationalStructure computes to **≥ 4.5:1** contrast on `#1a1a1a` background.  
  - *Verification spec:* `contrast-home-1440.json` reports `ratio >= 4.5` on OperationalStructure label text.
- **AC-19 (REG-20 / U8 Heading Hierarchy):**  
  - *Condition:* Exactly one `<h1>` per route on `/`; section headers demoted to `<h2>` or `<h3>` following valid heading order (0 level skips).  
  - *Verification spec:* `sem-home-1440.json` reports `h1Count: 1` and `headingLevelSkips: []`.
- **AC-20 (REG-21 / Preventative Focus Guard):**  
  - *Condition:* `index.css:336` remains unlayered and unmodified, preceded by documented warning comment explaining its site-wide load-bearing status.  
  - *Verification spec:* `git diff frontend/src/index.css` shows 0 modifications to `*:focus-visible` selector/rules; warning comment present.
- **AC-21 (REG-22 / Prod Hang Retest):**  
  - *Condition:* Production build (`npm run build && preview`) passes `hangtest.mjs` with zero long tasks $> 500\text{ms}$ on initial render.  
  - *Verification spec:* Re-run `hangtest.mjs` against the fresh prod build; the receipt (path pattern `study/receipts/<exec-date>/hangtest-prod.json`, as created 2026-10-23) must satisfy its **existing schema**: every `trials[]` entry (A 1440 · B 1280 · C 1440) shows a `timeline` whose last entry has `v.rs: "complete"` and `final.rs: "complete"` — no trial stalling at `interactive` (current receipt: complete at 3.4–3.7s in all 3 trials). *(F-C2 amended 2026-10-26: spec previously demanded `maxTaskDuration < 500ms` — that key exists nowhere in `hangtest-prod.json`; its schema is `trials[].timeline` readyState transitions (`t`/`ok`/`v.rs`/`v.w`/`v.sw`/`v.sh`) plus `trials[].final` — the harness measures readyState, not long tasks.)*
  - **Harness-extension note (F-C2):** the condition's *zero long tasks > 500ms* half is **unsatisfiable on the current harness** — extend `hangtest.mjs` with a `PerformanceObserver({type: "longtask"})` max-duration counter that emits a `maxTaskDuration` key before that half can be graded. Until the extension lands, AC-21 closure rests on the readyState keys alone and the long-task threshold is a declared harness gap.

### 8. Backend Security & Routing (`server.ts`, `webContentRoute.ts`, `productRoute.ts`)
- **AC-22 (REG-01 / A-1 Auth Guard):**  
  - *Condition:* `POST /api/webcontent/update-content` and `POST /api/webcontent/publish-content` are guarded by authentication middleware (401 returned for unauthenticated requests).  
  - *Verification spec:* Automated API test (no token) verifying **401 Unauthorized** on both endpoints; test output is written to a receipt at **`study/receipts/<exec-date>/api-auth-webcontent.json`** (per-endpoint request/response pairs: status code, route, `authenticated: false`) — evidence landing spot declared by F-C4 *(F-C4 amended 2026-10-26: spec previously named no artifact; all three BE rows share the landing pattern `study/receipts/<exec-date>/api-*.json`)*.
- **AC-23 (REG-02 / A-2 Product Create Auth):**  
  - *Condition:* `POST /api/products/create` is guarded by authentication middleware.  
  - *Verification spec:* API test returns **401** for unauthenticated `POST /api/products/create`; output receipt **`study/receipts/<exec-date>/api-auth-product-create.json`** (route, status, `authenticated: false`) — evidence landing spot declared by F-C4.
- **AC-24 (REG-03 / A-3 Limiter & Router Mount Order):**  
  - *Condition:* Rate limiters are mounted before their respective route handlers in `server.ts`; duplicate mounts of `productRoute` and `ticketRoute` are removed.  
  - *Verification spec:* Two-part evidence, one receipt **`study/receipts/<exec-date>/api-limiter-mount-order.json`**: (a) threshold-burst test showing the rate-limit response after N requests with the triggering `count`/`limit` values, (b) source verification block — `grep` output of `server.ts` showing single `productRoute`/`ticketRoute` mounts and limiter-then-handler line order — evidence landing spot declared by F-C4.

---

## §3 Regression Guards (What Must NOT Change)

1. **`index.css:336` Unlayered Specificity:**  
   The rule `*:focus-visible { outline: 2px solid #8B5CF6; outline-offset: 2px; }` must remain unlayered in `index.css`. Moving it into `@layer` breaks focus on 9 critical controls across the application.
2. **First Tab Stop Skip-Link:**  
   `div#root > div > a.sr-only.focus:not-sr-only` must remain the **first tab stop (Step 1)** on all routes at all viewports, activating focus transfer to `main#main-content` on Enter (WCAG 2.4.1 / U1).
3. **Existing Passing Focus Indicators (≥ 3:1):**  
   The settled focus ring sweep (`focus-rings-1440.json`) verified 35 control classes at 4.68–19.8:1 contrast. No token or outline change may regress these passing indicators.
4. **Site-wide 0px Horizontal Overflow:**  
   Horizontal overflow delta ($\text{scrollWidth} - \text{clientWidth}$) must remain **0px** across all 5 locked viewports (320, 375, 768, 1024, 1440) on all routes (D1).
5. **No Hover-Only Navigation Paths:**  
   All interactive triggers and submenus must remain operable by keyboard (Enter/Space) without requiring mouse hover (WCAG 2.1.1 / U3 / F11).
