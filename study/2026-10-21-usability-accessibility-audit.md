# Usability & Accessibility Audit — 2026-10-21

**Track:** `study/PLAN.md` lines 85–89 · **Rubric:** U1–U16, defined in
`2026-10-21-usability-accessibility-plan.md` (proposed; executed against as written)
**Scope audited:** `/` · `/what-we-do` · shared chrome · `/contact-us` · `/book-a-schedule`
**Receipts:** `study/receipts/2026-10-21/` (31 files — 30 at close of run + same-day `link-integrity.json`); pass-B re-captures in `study/receipts/2026-10-22/` (7 files — `passb-focus-map-canvas.json` supersedes its same-day first version)
**Severity:** 🔴 blocked-use · 🟠 functional break · 🟡 cosmetic — inherited, unchanged

---

## 0. Method, and four things that changed a verdict

Full harness description is in the plan §0. Four corrections happened *during* the run and
each one flipped a would-be finding, so they are recorded rather than quietly absorbed:

| # | What went wrong | Effect | Fix |
|---|---|---|---|
| 1 | `ua.mjs eval` ignored `--out` | Inventories for `/` and `/what-we-do` went to stdout only — **the receipt files did not exist** while claims rested on them | Flag implemented client-side; both routes re-captured |
| 2 | `pressKey` sent `rawKeyDown` with no `text` | Chromium activates buttons from the *text*-bearing keydown, so synthetic Enter/Space never fired `onClick`. The FAQ accordion looked **keyboard-dead** — a false 🟠 I had drafted | `type:'keyDown'` + `text`; Enter now toggles `0fr→1fr`, Space toggles back. **Finding retracted** |
| 3 | Contrast resolver regex-parsed `getComputedStyle` | Tailwind v4 emits `oklch()`; L/C/H were read as R/G/B, producing the impossible `rgb(0.704, 0.04, 256.88)` and **every ratio garbage** (first run: 37/37 "failures") | Canvas two-base compositing, `alpha = 1 − (onWhite.R − onBlack.R)/183`; verified against knowns (violet-600, gray-300, white-on-purple = 4.23) |
| 4 | Focus sweep ran without keyboard priming | Chromium withholds `:focus-visible` from programmatic `.focus()` under a pointer modality → **every control reported `outlineStyle: none`**, i.e. "no focus indicator anywhere" | Real `Tab` dispatched first, 750 ms settle, then read. Receipt `focus-rings-1440.json` is the authoritative one |

**One inventory discrepancy survives**, and is stated rather than smoothed: `reconcile-*.json`
and `inv-*.json` disagree on unnamed `<select>` count (0 vs 3). `inv.js` delegates to the
daemon's `nameOf` (`ua.mjs:182–199`), which follows the ARIA name order and never treats a
select's own option text as its name; `reconcile.js` inlined a weaker classifier that checks
`textContent` first. **`inv.js` is correct; `reconcile.js` is used below only for structure**
(tabindex, `_blank`/`rel`, hash targets), where both agree.

### 0.1 Pass-B amendments (2026-10-22) — visible deltas, verdicts unchanged

The graded original above is amended in place below; every change is listed here first. All
9 chat corrections + the 4 item-3 deductions (register §7 U-C1…U-C13) are applied. No verdict
changed; only numbers, receipt pointers, tags, and two explanations moved.

| # | What changed | Was → now | Receipt |
|---|---|---|---|
| 1 | Header receipt count | 34 → 31 (+8 pass-B) | disk count |
| 2 | F1 rubric tags | U2/U6/U11 → **U6/U11** (U2 dropped, rubric lock annotation b; REG-04) | — |
| 3 | F8 claim + tallies | "every instance is a control label" false; tallies 7/2/2/5 → **5/2/2/2** after split to F13/F14; NaN `01` dropped as resolver artifact (REG-09/10/11) | `contrast-*-1440.json` |
| 4 | Required-field count | "Five" → **Six** (the sentence always listed six names; REG-05) | `form-contact-empty-submit.json` |
| 5 | Skip-Enter | prose claim → receipted | `passb-skip-enter.json` |
| 6 | FAQ toggle `0fr→1fr` | prose claim → receipted (`0px → 109px/110px`) | `passb-faq-toggle.json` |
| 7 | Mega live-open | hover receipt only → live-open receipted (`aria-expanded false→true`, aside absent→present, 3 links) | `passb-mega-open.json` |
| 8 | F11 element identity | prose "hero SEE HOW IT WORKS" vs receipt "Talk to us" → **both, consecutive stops** (9 and 10); nav logo/burger (2–3) also behind overlay | `passb-f11-identity.json` |
| 9 | §2.3 FAQ-trigger row | 4.95 → **4.36** (4%-white card over `#0a0a0a` = `rgb(20,20,20)`) | `passb-faq-ratio.json` |
| 10 | §2.3 form-input row | 4.95 → **4.68** (receipt value reproduced exactly) | `passb-faq-ratio.json` |
| 11 | F4 ratio | 1.66 → **1.39** (receipt's stored colors don't give 1.66; grader's hand-math reproduced live; ring-vs-fill = 1.00) | `passb-f4-ring.json` |
| 12 | Failed canvas captures | unexplained → explained: probe targeted the CircularGallery three.js canvas (`tabIndex:-1`), not the Mapbox "Map" canvas | `passb-focus-map-canvas.json` |

---

## 1. Item 2 — navigation, links, buttons, forms

### 1.1 Inventory (1440×900, machine-pasted)

| Route | total | visible | hidden | `a` | `button` | `input` | `textarea` | `select` | `[tabindex]` | receipt |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 64 | 57 | 7 | 28 | 26 | 4 | 1 | 3 | 2 | `inv-home-1440.json` |
| `/what-we-do` | 40 | 34 | 6 | 21 | 18 | 0 | 0 | 0 | 1 | `inv-wwd-1440.json` |
| `/contact-us` | 43 | 38 | 5 | 26 | 7 | 4 | 1 | 3 | 2 | `inv-contact-1440.json` |
| `/book-a-schedule` | 72 | 70 | 2 | 21 | 47 | 2 | 1 | 0 | 1 | `inv-book-1440.json` |

`role="button"` count is **0 on every route** — nothing invents a button role; every control
is a real `<button>`. `[tabindex]` is always `MAIN#main-content` at `-1` (the skip-link
target, `Layout.tsx:18`) plus, on the two routes that actually mount the Mapbox canvas
(`/` and `/contact-us` — `inv-home`/`inv-contact` show `canvas role="region" name="Map"
tabindex="0"`; `/what-we-do` inventories none), the Mapbox canvas at `0`.
Hidden elements are the desktop/mobile nav duplicates and the off-screen skip link — expected,
not gaps.

### 1.2 Coverage reconciliation — 1:1, no silent gaps

Every visible element lands in a pass list **or** a finding:

| Route | visible | flagged | passes clean | flagged breakdown |
|---|---|---|---|---|
| `/` | 57 | 13 | 44 | F1 ×2 arrows · F2 ×3 selects · F2 ×5 placeholder-only · F6 ×3 `_blank`-no-`rel` |
| `/what-we-do` | 34 | 4 | 30 | F1 ×4 arrows |
| `/contact-us` | 38 | 8 | 30 | F2 ×3 selects · F2 ×5 placeholder-only |
| `/book-a-schedule` | 70 | 0 | 70 | *(no name-level findings; F7/F8 are state- and colour-level)* |

13+44=57 · 4+30=34 · 8+30=38 · 0+70=70. ✔

### 1.3 Link integrity vs `Router.tsx:72–128`

Union of every `href` across all four routes resolves to six internal targets —
`/`, `/contact-us`, `/products`, `/what-we-do`, `/who-we-are`, `#main-content` — **all present
in the route table**. `#main-content` exists on all four routes (`deadHash: []` on every
receipt). **No dead internal links found.**

Mega-menu targets (`Navigation.tsx:153` → `` `/products/${prod.name}` ``) resolve against
`/products/:id` (`Router.tsx:102`); opened live by real CDP mouse move and verified rendering
(`/products/OpsCore` → 1 940 chars of product content, not a 404). `aria-expanded` flips
`false→true` on hover — inherited as a *code* fact; **pass-B live-open receipted 2026-10-22**
(`passb-mega-open.json`: `aside[aria-label="Product submenu"]` absent→present, trigger
`aria-expanded` false→true per `Navigation.tsx:131`, 3 links → `/products/{OpsCore,OpSync,OpStudios}`).
Mechanism per register §8 (U-C12): React hover-state + conditional render (`:124–125`, `:141`),
not a CSS `group-hover` — conclusion (hover-only, keyboard-unreachable sub-links) unchanged.

`target="_blank"` audit: **3 violations, all on `/`** — the EMAIL US / VISIT US / CALL US
contact links (`ContactUsSection.tsx:111–114`) open a new tab with no `rel`. The two Mapbox
attribution links and the two footer socials all carry `rel`.

**Latent, not reachable (recorded, not counted as a finding):** `OpsieHRIS.tsx:117`
navigates to `/subscribe-now` while the router defines `/Subscribe-now`
(`Router.tsx:117`, capital S). Both `OpsieHRIS.tsx` and `Opsync.tsx` are **unimported** —
repo-wide grep returns 0 import matches — so no user can reach the mismatch. Filed for the
owner because it will fire the day either file is wired up.

### 1.4 Findings

**F1 — Review carousel arrows have no accessible name** · 🟠 · U6/U11
2 arrows on `/`, 4 on `/what-we-do`. `Button.tsx:24` renders `<img … alt="">` and passes
neither children nor `aria-label` (`ClientReviewsSection.tsx:41–53`). Accessible name is empty
(`nameSrc: NONE`). **They are keyboard-operable** — focused + Enter moves the track
`translateX(0%) → translateX(-100%)` — so this is an *announcement* break, not an operability
break. Observed: `tab-home-1440.json` steps 15–16 (empty `name`), inventory rows i=17,18.

**F2 — Contact form has no label association on any field** · 🟠 · U7
`ContactForm.tsx:86–182`: all 8 fields carry `placeholder` and **no `<label>`, no `id`, no
`aria-label`** — 5 are *placeholder-only* (a name that vanishes the moment the user types)
and the **3 `<select>`s have no accessible name at all** (`:138`, `:154`, `:169` — a select
has no placeholder attribute to fall back on). `sem-*.json`: `labels=0` on every route;
every field `hasForLabel: false`. This is a **two-route** finding — the same component mounts
on `/` via `ContactUsSection.tsx`, and the inventories confirm identical counts on both.

**F3 — FAQ accordion exposes no expanded state** · 🟠 · U6
`Faq.tsx:49–63` is a native `<button>` (inherited fact, correct) but carries no
`aria-expanded` and no `aria-controls`; the panel is a `grid-template-rows` div with no id.
Live read: `ariaExpanded: null` before **and after** Enter/Space toggle. State changes
visually (`0fr → 1fr`, 0 → 110 px) and is invisible to assistive tech.

**F4 — Hero focus ring is invisible against its own backdrop** · 🟠 · U5
The primary "SEE HOW IT WORKS" button (`bg-[#8B5CF6]`) sits inside a `bg-violet-600` pill.
Its focus ring is `2px solid #8B5CF6` at `outline-offset: 2px`, so the ring lands *on the
violet*: **1.39:1** — far below the 3:1 bar, and the ring colour equals the button fill
(ring-vs-fill 1.00:1). *(Ratio amended 2026-10-22 per U-C10: the original receipt stored
1.66, which does not reproduce from its own stored colours; pass-B settled re-measure gives
1.39 from ring `rgb(139,92,246)` vs pill `rgb(127,34,254)` — verdict unchanged.)*
Receipt `focus-hero-ring-1440.json`, re-measure `passb-f4-ring.json`. Every *other* control
class reaches 4.36–19.8:1, so this is one component, not the design system.

**F5 — Nested `<main>` landmark on `/what-we-do`** · 🟠 · U8
`WhatWeDo.tsx:139` opens a second `<main>` inside the one `Layout.tsx:18` already opened.
`sem-wwd-1440.json` lists two `MAIN` entries, the inner one unlabelled — landmark navigation
now offers two "main" targets, one meaningless.

**F6 — `target="_blank"` without `rel`** · 🟡 · U14
`ContactUsSection.tsx:111–114`, three links, all on `/`. Low practical risk (two are
`mailto:`/`tel:`), but the VISIT US link is a real external `maps.app.goo.gl` hop.

**F7 — Booking form has no error affordance** · 🟠 · U15
`BookingCalendar.tsx:146–150` gates `canBook` on name + email-regex + time; `:393–400`
renders `disabled={!canBook}` with **no inline reason, no per-field validation state, no
`aria-invalid`, no `aria-describedby`**. `role="alert"` exists only for *server* errors
(`:388`). A user who cannot submit is told nothing about which of the three conditions is
unsatisfied. Contrast this with the contact form, whose native constraint validation names
the field and the reason (§1.5).

**F8 — White on brand purple misses the text minimum** · 🟠 (controls) / 🟡 (display) · U9
`#8B5CF6` behind white text measures **4.23:1** against the 4.5:1 minimum for normal-size
text. **Amended (U-C5):** not every instance is a control label — the instances are the
control labels below *plus* body copy and display text, and three receipt-listed failures had
no finding. Corrected route tallies after the split (register REG-09): `/` 5/51 ·
`/contact-us` 2/21 · `/what-we-do` 2/20 · `/book-a-schedule` 2/20. Control-label instances:
"Send Message", "Get Direction", "Discover Detail", "See how it works",
"Executive & Client Management", and on booking "21" + "Make Appointment". Also on
`/what-we-do`: `#8B5CF6` on violet-900 `rgb(76,29,149)` = **2.59:1** for 75 px display text
(needs 3:1). One token change clears most of it (U-queue 1: token-fix). The split-out
failures are F13 (2.95 body copy) and F14 (booking grays); the home `01` row was a resolver
artifact (NaN) and is dropped from the tally (REG-09), not a failure.

**F9 — Raw `<a>` inside the SPA** · 🟡 · U13/U16
`Faq.tsx:27` uses `<a href="/contact-us">` where every other internal navigation is a React
Router `Link` — clicking it triggers a full document reload. Also: **`/book-a-schedule` is
never an `href`** anywhere; it is reachable only via `navigate()` buttons
(`Header.tsx:67`, `HeroPage.tsx:110`, `Navigation.tsx:190`, `WhatWeDo.tsx:181`,
`ContactUsPage.tsx:103`, `ProductItemCTA.tsx:30`). Not a dead link, but the booking route
cannot be bookmarked or middle-clicked from any anchor on the site.

**F10 — Decorative image carries a product name as alt text** · 🟡 · U11
`sem-home-1440.json`: `alt='OpSync'` on `opsie_logo_only.png` — the OpSync card reuses the
Opsie logo image while announcing itself as a different product. No image anywhere is *missing*
the `alt` attribute (0 across all four routes), which is the stronger half of U11 passing.

**F13 — Body copy below the text minimum** · 🟠 · U9 *(added 2026-10-22, U-C5 / REG-10)*
`/` "Operational Structure": violet label text `rgb(127,34,254)` on `#1a1a1a` = **2.95:1** at
14 px/600 — present in `contrast-home-1440.json` (`"ratio": 2.95`) but never filed; worse
than F8's own ratio and on body copy, not a label. Source `OperationalStructure.tsx:78`.
Folded into the same token pass (U-queue 1).

**F14 — Booking gray text misses the minimum** · 🟠 · U9 *(added 2026-10-22, U-C7 / REG-11)*
`/book-a-schedule`: day button `1` = **2.34:1**, "Free. No credit card required" = **3.81:1**,
"Prefer a different way to connect?" = **4.1:1** — receipt-listed (`contrast-book-1440.json`),
never filed. Source `BookingPage.tsx:54`, `:89`. Lift the gray tokens to ≥4.5:1 — separate
from the violet token pass.

### 1.5 Form protocol — validation-only ✅

No valid submission was attempted; no credentials, no outbound message.

**Empty submit** (`/contact-us`, `form-contact-empty-submit.json`):
`novalidate: false` → native constraint validation fires. `activeElement` jumps to
`INPUT "Full Name*"`, `validationMessage: "Please fill out this field."`, URL unchanged at
`/contact-us`. **Six** required fields identified (`name`, `email`, `description`, `platform`,
`product`, `category` — the last three selects; count amended 2026-10-22 per U-C8 — the
sentence said five while listing six).

**Malformed email** (`form-contact-bademail-submit.json`): name filled with "Receipt Test",
email set to `not-an-email`. `validity.typeMismatch: true`; submit moves focus to
`INPUT "Your Email*"` with *"Please include an '@' in the email address…"*. Still no
navigation, no request.

**`aria-invalid` is `null` on every field in both runs** — the browser's own invalid state is
not mirrored into ARIA. Native validation is doing the work U15 asks for; the ARIA half is
not. Booking was exercised up to the disabled-submit state only.

---

## 2. Item 3 — keyboard access, labels, focus visibility

### 2.1 Tab chains (receipts `tab-home-1440.json` 45 steps, `tab-home-375.json` 30 steps)

- **Skip link is first stop on both viewports**, visible when focused
  (`sr-only focus:not-sr-only`, purple fill). **Enter moves focus to `MAIN#main-content`**
  (`activeIsMain: true`, `tabindex="-1"`) — **U1 PASS**, measured on both; the Enter step is
  **pass-B receipted 2026-10-22** (`passb-skip-enter.json`: first stop = the skip link,
  after Enter `activeElement` = `main#main-content`, `activeIsMain: true` — the field that
  grading found in 0 of 30 original receipts now exists).
- **Burger** (mobile, step 3): "Toggle menu", 44×44, `aria-expanded` `false → true` on Enter,
  close button returns it to `false`. Inherited claim, keyboard-path receipt only.
- **Mobile sheet** — see F11 below.
- **FAQ accordion**: Enter opens (`gridTemplateRows 0fr → 1fr`, 110 px), Space closes. Pass,
  and see §0 #2 for the retraction. **Toggle mechanism pass-B receipted 2026-10-22**
  (`passb-faq-toggle.json`: grid `0px → 109px`, panel height `0 → 110px` mid-transition,
  settled `109px/110px`; card bg closed `oklab(… / 0.04)` → open `rgb(10,10,10)`; and
  `aria-expanded` = `null` before **and** after — F3 still OPEN).
- **Carousel arrows**: Enter advances the track. Pass on operability; fails naming (F1).
- **Mapbox canvas**: `tabindex="0"` + `aria-label="Map"`, and it **does** receive the global
  ring when tabbed to (`tab-home-1440.json` step 28: `2px solid #8B5CF6`). Its attribution
  control is a real labelled `<button>`. Pass. **Pass-B route precision (2026-10-22):** the
  Mapbox canvas mounts on `/` and `/contact-us` only (`inv-*` show `role="region" name="Map"
  tabindex="0"`; `/what-we-do` inventories zero canvases — its map never renders one).
  The two *failed* canvas captures in the original run targeted
  `document.querySelector('canvas')` on `/what-we-do`, which is the CircularGallery three.js
  canvas (bare, `tabIndex:-1`, unlabelled, 900×900) — it refuses programmatic focus and is
  never a Tab stop (70-stop sweep, zero canvas stops). Probe-target error, not a defect;
  explained in §4 #7 (`passb-focus-map-canvas.json`).
- **ChatHelp**: `pointer-events-none` (`ChatHelp.tsx:7`) — decorative, not focusable, not
  announced. **U3 N-A** under the rubric's rule. It presents as an interactive chat affordance
  and does nothing for anyone; noted 🟡, not scored as a keyboard failure.

**F11 — Mobile menu: no Escape, and focus escapes behind the overlay** · 🟠 · U4
Measured in sequence: burger Enter opens the sheet; Tab walks `Close menu → Why Opsie →
About Us → Contact Us → Products` (5 focusables, all with visible rings); **the next Tab lands
on the hero's "SEE HOW IT WORKS" — outside the sheet, behind an opaque overlay, menu still
open** (`burgerExpanded: "true"`, background not `inert`/`aria-hidden`). Escape does nothing
(`key Escape` → state unchanged). Source confirms no `keydown` handler anywhere in
`MobileMenu.tsx` (repo-wide `Escape` match is admin-only, `TicketModal.tsx:71`). Escape is the
documented dismissal for any overlay; its absence plus invisible focus is a functional break,
not a blocker — the links remain reachable and the close button works.

**Element identity, pass-B (2026-10-22, U-C11):** a full 14-stop walk with the sheet open
(`passb-f11-identity.json`, every stop `coveredByOverlay`-tested via `elementFromPoint`)
resolves the prose-vs-receipt disagreement: **both named elements are real, and they are
consecutive stops.** With the sheet open the focusables are — stops 1–3 = skip link, nav logo
"Opsie Home", nav burger (all three *already behind the overlay*: `coveredByOverlay: true`),
stops 4–8 = the sheet's 5 items, stop 9 = hero **"See how it works"** (the first element behind
the overlay *after* the sheet's own items; the prose's element), stop 10 = **"Talk to us"**
(the original receipt's `activeLabel`; also behind the overlay). Escape pressed while the
sheet is open leaves `burgerExpanded: "true"` — the sheet stays open. The finding is therefore
*broader* than either single element suggested: focus escapes the sheet at stop 9 onward, and
the fixed nav itself (stops 2–3) sits under the overlay before the sheet's items are even
reached. Verdict unchanged (F11 / U4 stands).

### 2.2 Labels & semantics — one JSON per route

| Route | `lang` | `h1` | heading skips | landmarks | `label` elements | dup ids | receipt |
|---|---|---|---|---|---|---|---|
| `/` | `en` ✓ | **7** | h1→h3 ×3, h1→h4 | NAV, MAIN, CANVAS(region,"Map"), FOOTER, NAV("Footer navigation") | 0 | 0 | `sem-home-1440.json` |
| `/what-we-do` | `en` ✓ | **2** | h1→h3 | NAV, **MAIN ×2**, FOOTER, NAV("Footer navigation") | 0 | 0 | `sem-wwd-1440.json` |
| `/contact-us` | `en` ✓ | 1 ✓ | none ✓ | NAV, MAIN, CANVAS(region,"Map"), FOOTER, NAV("Footer navigation") | 0 | 0 | `sem-contact-1440.json` |
| `/book-a-schedule` | `en` ✓ | 1 ✓ | none ✓ | NAV, MAIN, FOOTER, NAV("Footer navigation") | 0 | 0 | `sem-book-1440.json` |

**U12 PASS** on all four. Every landmark is identifiable (the footer nav is the only labelled
one; the header nav relies on being the only nav at that position — acceptable, not a fail).
**F12 — heading structure** · 🟡 · U8: seven `<h1>` on `/` means the document outline carries
no ranking signal, and the level skips (h1→h3 at "OpsCore", "Contact us", "Not sure where to
start?", h1→h4 at "Email Us") break the sequential read. `/contact-us` and
`/book-a-schedule` are clean.

### 2.3 Focus visibility — settled computed styles

Every control class measured keyboard-primed with a 750 ms settle
(`focus-rings-1440.json`), contrast taken against the composited background the ring actually
lands on:

| Control class | Indicator | vs adjacent bg | Verdict |
|---|---|---|---|
| nav link | 2px solid `#8B5CF6` / 2px offset | 4.68:1 | ✅ |
| footer link | 2px solid `#8B5CF6` / 2px | 4.68:1 | ✅ |
| form input / select / textarea | 2px solid `#8B5CF6` / 2px | 4.68:1 *(amended 2026-10-22: was 4.95)* | ✅ |
| FAQ trigger | 2px solid `#8B5CF6` / 2px | 4.36:1 *(amended 2026-10-22: was 4.95)* | ✅ |
| review arrow | 2px solid `#8B5CF6` / 2px | 4.68:1 | ✅ |
| "Talk to us" | 2px solid `rgb(147,103,247)` / 1px | 5.21:1 | ✅ |
| form submit | 3px solid `#fff` / 0 | 19.8:1 | ✅ |
| mobile sheet link + close | 2px solid `#8B5CF6` | 4.68:1 | ✅ |
| Mapbox canvas | global ring on tab | — | ✅ |
| **hero primary CTA** | 2px solid `#8B5CF6` / 2px | **1.39:1** *(amended 2026-10-22: was 1.66)* | ❌ **F4** |

**U5 PASS everywhere except F4.** Two source-level notes worth keeping:

- `index.css:336–338` is an **unlayered** `*:focus-visible { outline: 2px solid #8B5CF6;
  outline-offset: 2px }`. Unlayered CSS outranks Tailwind's layered utilities, so the
  `focus:outline-none` classes sprinkled through the codebase — including the mobile close
  button (`MobileMenu.tsx:38`) and every `ContactForm` field (`:93`, `:102`, `:114`, `:122`,
  `:133`, `:143`, `:159`, `:174`) — **do not take effect on keyboard focus**. Live proof: the
  close button, tabbed to, computes `2px solid rgb(139,92,246)`. This *corrects the code-only
  reading*, which would have filed "outline suppressed, no replacement" against nine controls.
  The global rule is load-bearing; removing it "for cleanup" would silently break focus
  visibility site-wide.
- The tab chains capture outline colours mid-transition (`rgb(36,44,67)`, `rgb(77,63,138)`)
  because those buttons carry `transition`. The settled sweep is authoritative; the transient
  values are animation frames, not low-contrast states.

**Pass-B settled re-measure (2026-10-22, U-C10):** all three disputed numbers re-measured
live with real keyboard Tab focus, read 550 ms after focus (the hero CTA carries
`transition-all duration-300`, so an immediate read catches the UA baseline — white, 3 px —
which is what produced an earlier contradictory pass-B reading; discarded). Ring colours come
from the settled global rule; the pill's `oklch(0.541 0.281 293.009)` was resolved by an in-page
oklch→sRGB converter whose self-check reproduces the hand-conversion `→ rgb(127,34,254)`.

- **hero CTA** (`passb-f4-ring.json`): settled ring `rgb(139,92,246) solid 2px` /
  offset 2px vs pill `rgb(127,34,254)` = **1.39:1**. The original receipt's stored `1.66`
  does not reproduce from its own stored colours (grader's hand-math 1.39, now measured);
  ring vs button fill = **1.00** (the ring colour *is* the fill). FAIL unchanged.
- **FAQ trigger** (`passb-faq-ratio.json`): **4.36:1** — the ring lands on the card's 4 %-white
  over `#0a0a0a` = `rgb(20,20,20)`, not on pure black. Pass unchanged; the 4.95 in both this
  row and the next was a resolver-fallback transcription (4.959), not a measurement.
- **form input** (`passb-faq-ratio.json`): **4.68:1** against `rgb(10,10,10)` — the value the
  10-21 contrast receipts already carried for `#8B5CF6`-on-dark, reproduced exactly. Pass
  unchanged.

---

## 3. Severity summary

| ID | Finding | Severity | Rubric |
|---|---|---|---|
| F1 | Review arrows unnamed (2 + 4 controls) | 🟠 | U6/U11 *(U2 dropped 2026-10-22, U-C9)* |
| F2 | Contact form: no labels, 3 selects nameless, 2 routes | 🟠 | U7 |
| F3 | FAQ: no `aria-expanded`/`aria-controls` | 🟠 | U6 |
| F4 | Hero CTA focus ring 1.39:1 *(was 1.66)* | 🟠 | U5 |
| F5 | Nested `<main>` on `/what-we-do` | 🟠 | U8 |
| F6 | 3 × `_blank` without `rel` | 🟡 | U14 |
| F7 | Booking: no error affordance | 🟠 | U15 |
| F8 | White on `#8B5CF6` = 4.23:1 on control labels | 🟠 | U9 |
| F9 | Raw `<a>` + booking route has no href | 🟡 | U13/U16 |
| F10 | `alt='OpSync'` on the Opsie logo | 🟡 | U11 |
| F11 | Mobile menu: no Escape, focus escapes overlay | 🟠 | U4 |
| F12 | 7 × `h1` on `/` + heading skips | 🟡 | U8 |
| F13 | Body copy 2.95:1 on `/` (Operational Structure) | 🟠 | U9 *(added 2026-10-22, U-C5)* |
| F14 | Booking grays 2.34 / 3.81 / 4.1:1 | 🟠 | U9 *(added 2026-10-22, U-C7)* |

*(The home `01` row that the original F8 tally counted is a resolver artifact — `NaN` ratio —
and is dropped, not filed: U-C6 / REG-09.)*

No 🔴. The rubric's blocker bar — a function with no keyboard path at all — was approached
once (mega-menu product sub-links are hover-only, `Navigation.tsx:124–125`, no `onFocus`) and
deliberately **not** filed at 🔴: the same three products are reachable by keyboard through
the parent `/products` link, so the function exists by another route. Filed as a U3 note.

**Scoreboard:** U1 ✅ · **U2 ✅** *(F1 re-tagged to U6/U11 2026-10-22, U-C9)* · U3 ✅ ·
U4 ❌(F11) · U5 ❌(F4) · U6 ❌(F1,F3) · U7 ❌(F2) · U8 ❌(F5,F12) · U9 ❌(F8,F13,F14) ·
U10 inherited · U11 ❌(F10) · U12 ✅ · U13 ❌(F9) · U14 ❌(F6) · U15 ❌(F7) · U16 ✅

---

## 4. Method limits (stated, not assumed)

1. **Screen-reader-only semantics** — actual announcement order and verbosity cannot be
   produced by this harness. Measured instead: accessible name, role, and state as the
   accessibility tree computes them (`ax-*.json`, 837/504/289/337 nodes). A name that *is*
   computed is verifiable; a name that *announces well* is not.
2. **Focus trap vs focus escape** — escape is observable and was measured (F11). A component
   that prevented escape entirely would need containment the harness cannot force; none
   exists in scope (the only true modal is the admin `TicketModal`, out of scope).
3. **Image/gradient backgrounds** — 90 elements across the four routes sit on background
   images the compositor cannot resolve (`/` 48, `/what-we-do` 34, `/contact-us` 5, booking 3).
   These are recorded as **method limits, never as passes**; U9 verdicts rest on the 116
   elements with composited backgrounds.
4. **External link liveness** — `http(s)` targets were not crawled. Only `rel` completeness
   and internal resolution were checked.
5. **axe-core** — permitted as cross-check, not used as a verdict source; full AX trees are
   pasted and every verdict above derives from DOM + computed style.
6. **Dropped as non-reproducible** (R-track rule): none. Every candidate finding either
   reproduced live or was retracted with the reason recorded in §0.
7. **Two failed canvas captures, explained** *(added 2026-10-22, U-C13)* — the original run's
   `focus-map-canvas` attempt and the focus-rings canvas row both recorded `outline: none` /
   `activeTag: BODY` and were left unexplained. Cause: both probes targeted
   `document.querySelector('canvas')` on `/what-we-do`, which resolves to the CircularGallery
   three.js renderer canvas (`CircularGallery.tsx:453` — bare canvas, empty `className`, no
   `tabindex`, no label, 900×900). `canvas.tabIndex` is `-1` by default, so it is never a Tab
   stop (70-stop sweep 2026-10-22: zero canvas stops) and `.focus()` is refused
   (`activeElement` stays `BODY`). The Mapbox "Map" canvas claim (§2.1) is separately receipted
   (`tab-home-1440.json` step 28 + `inv-home`/`inv-contact`) and is unaffected. Probe-target
   selection error, not a site defect; no verdict rests on the failed captures.
   Receipt: `passb-focus-map-canvas.json` (supersedes the same-day first version).

---

## 5. Inherited cites (not re-found)

R5/F4 touch-target sizes · N-04 placeholder footer hrefs (`Footer.tsx:106,109,117,118,119` —
"Our Team", "FAQ's", "Our Story", "Our Mission", "Our Vision" all point at `/who-we-are`;
present in this run's inventories and **attributed to N-04, not re-filed**) · burger
`aria-expanded` (R2) · skip-link presence (R5) — here upgraded from *presence* to
*function*, which is a different and stronger claim · FAQ trigger = native `<button>`.

---

## 6. Decision queue

1. **F8 (contrast)** — one design-token change (darken `#8B5CF6` for button fills, or lift
   white to a darker plate) clears 6 of 7 route-level failures. Approve as a token fix, or
   accept as a documented brand exception?
2. **F4 (hero ring)** — smallest fix in the set: a neutral or white ring on that one button.
   Approve?
3. **F2 (contact form labels)** — the only finding that needs new markup rather than an
   attribute edit; 8 fields × 2 routes. Schedule, or fold into the next form touch?
4. **F11 (mobile menu)** — Escape handler + `inert` on the background, or accept the current
   close-button path as sufficient for now?
5. **The `focus-visibility` global rule** — flagged as load-bearing (§2.3). Worth a comment
   in `index.css:336` so nobody strips it?
