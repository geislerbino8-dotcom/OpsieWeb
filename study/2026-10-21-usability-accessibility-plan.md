# Usability & Accessibility Inspection Plan — 2026-10-21

**Track:** `study/PLAN.md` lines 85–89 (Usability & accessibility review track)
**Scope:** `/` · `/what-we-do` · shared chrome · `/contact-us` · `/book-a-schedule`
**Status:** criteria **PROPOSED** (lock-in pending) — executed against in `2026-10-21-usability-accessibility-audit.md`

This is the track's criteria-agreement item (the D-criteria / B1 / R-rubric analogue): the
"basic" bar is selected here, each row is given a **measured** pass condition, and items 2–3
are executed against the locked rows rather than against an ad-hoc notion of "accessible".

---

## 0. Method and harness

All receipts come from a persistent CDP session (Edge headless) driven by
`Temp/opencode/ua.mjs`. The browser tool's tab has no viewport control and its own fixed
size, so every viewport-dependent measurement goes through the daemon, which holds
`Emulation.setDeviceMetricsOverride` for the life of the session.

| Property | Value |
|---|---|
| Desktop viewport | 1440×900 (primary, matching the responsive track) |
| Mobile viewport | 375×812 |
| Dev stack | frontend `:5173` + backend `:5000` (MongoDB connected) |
| Receipt dir | `study/receipts/2026-10-21/` |

**Two harness bugs were found and fixed during the run, and both changed verdicts.** They are
recorded here because they are method facts, not incidental:

1. **`eval` ignored `--out`.** Inventory receipts for `/` and `/what-we-do` were silently
   written to stdout only; the files did not exist until the flag was implemented. Any
   "measured" claim made before the fix was unbacked.
2. **`pressKey` sent `rawKeyDown` with no `text`.** Chromium performs button activation from
   the *text*-bearing keydown, so synthetic Enter/Space never fired `onClick`. This produced a
   **false negative**: the FAQ accordion appeared keyboard-dead. After the fix
   (`type: 'keyDown'` + `text`), Enter toggles it `0fr → 1fr` and Space toggles it back. The
   FAQ is keyboard-operable; the original reading was a harness artifact, and it was
   retracted before any finding was written.

**Color measurement.** Tailwind v4 emits `oklch()`/`oklab()`, which a regex over
`getComputedStyle` mis-parses as RGB (first attempt produced the impossible
`rgb(0.704, 0.04, 256.88)` — L/C/H read as R/G/B, and every ratio was garbage). The shipped
resolver composites the color onto two known 1×1 canvas bases and recovers
`alpha = 1 − (onWhite.R − onBlack.R)/183`. Verified against knowns before use:
`oklch(0.541 0.281 293.009) → rgb(127,34,254)` = violet-600 ✓,
`oklch(0.872 0.01 258.338) → rgb(209,213,220)` = gray-300 ✓,
white-on-`#8B5CF6` = **4.23** ✓.

**Focus measurement.** Chromium applies `:focus-visible` to programmatic `.focus()` only when
the input modality is already keyboard — a sweep run without a priming Tab reports
`outlineStyle: none` for every control (a false "no focus indicator anywhere"). All focus
receipts below are **keyboard-primed**: a real `Tab` is dispatched first, then the target is
focused and the computed style is read after a 750 ms settle so CSS transitions are not
captured mid-flight. (The tab chains captured mid-transition outline colours such as
`rgb(36,44,67)`; the settled sweep is the authoritative one.)

**What cannot be measured here** is stated per-row rather than assumed: true screen-reader
output, and genuine focus *traps* (as opposed to focus *escape*, which is observable).

---

## 1. The proposed rubric — U1 … U16

Severity scale, inherited from the responsive track and unchanged:
🔴 **blocked-use** · 🟠 **functional break** · 🟡 **cosmetic**.

| ID | Criterion (SC) | Measured pass condition | Severity if failed | N-A rule |
|---|---|---|---|---|
| **U1** | Bypass blocks — **2.4.1** | First `Tab` reveals a skip link; it is in the tab order before chrome; `Enter` moves `document.activeElement` to an existing focusable target (`#main-content`) | 🟠 | N-A if the route has ≤1 landmark and no repeated chrome |
| **U2** | Link purpose in context — **2.4.4** | Every `a` yields a non-empty accessible name (`nameSrc` ≠ `NONE`); names distinguishable within their list | 🟠 (🟡 if unique-in-list but generic) | N-A for links whose only content is decorative with an `aria-label` on the wrapper |
| **U3** | Keyboard — **2.1.1** | Every control is reachable by `Tab` **and** operable: Enter/Space produces a measured state delta (DOM/style/`aria-*` change) | 🔴 if a function has no keyboard path at all; 🟠 if operable but state is silent | N-A for `pointer-events-none` decorative layers |
| **U4** | No keyboard trap — **2.1.2** | Focus can leave every component via Tab / Shift+Tab; an open overlay does not strand focus and does not let focus wander behind it invisibly | 🔴 | N-A for a dialog that restores focus on close *and* documents its dismissal |
| **U5** | Focus visible — **2.4.7** | Keyboard-focused control changes computed `outline`/`box-shadow` **and** the indicator reaches **≥3:1** against the adjacent background | 🟠 if absent; 🟠 if present but <3:1 (the indicator is the sole affordance) | N-A for non-interactive elements that receive focus only via `tabindex="-1"` programmatic targets |
| **U6** | Name / role / value — **4.1.2** | Control exposes a non-empty accessible name, correct role, and state attributes (`aria-expanded`/`aria-pressed`/`disabled`) that track its actual value | 🟠; 🔴 where wrong state actively misleads | N-A for pure presentation |
| **U7** | Labels / instructions — **3.3.2** | Every form field has a **persistent** programmatic label (`label[for]` or `aria-label`); "required" is conveyed in text, not placeholder-only | 🟠 | N-A for fields with no user-facing purpose (honeypots) |
| **U8** | Info & relationships — **1.3.1** | One `h1` per route; no heading-level skips; exactly one `main` and it is not nested; `label[for]`↔`id` pairs resolve; landmarks uniquely identified | 🟡 for heading-order slips; 🟠 for duplicated/nested landmarks that break SR navigation | N-A where the relationship has no markup representation available |
| **U9** | Contrast (minimum) — **1.4.3** | Text ≥ **4.5:1** (≥3:1 if large: ≥24px, or ≥18.66px @700) against its composited background | 🟠 for body copy and controls; 🟡 for brand-accent display text | N-A where the background is a photographic/image layer the method cannot composite — reported as a **method limit**, never as a pass |
| **U10** | Target size — **2.5.5** | *(inherited — measured in the responsive track as R5/F4, not re-run)* | — | — |
| **U11** | Non-text content — **1.1.1** | Every `img` carries `alt` (empty = deliberately decorative); icon-only controls get their name from `aria-label`, not solely from an inner `img[alt=""]` | 🟠 if informative content is unnamed; 🟡 if decorative mislabelled | N-A for background/CSS images |
| **U12** | Language of page — **3.1.1** | `html[lang]` present and a valid BCP-47 tag | 🟡 | — |
| **U13** | Consistent navigation *(non-SC)* | Nav item order and labels identical across all in-scope routes; no route-specific reordering | 🟡 | — |
| **U14** | Link integrity *(non-SC)* | Every internal `href` resolves against the `Router.tsx` route table; `#` anchors resolve to an existing id; every `target="_blank"` carries `rel` | 🟠; 🔴 if a primary nav route 404s | N-A for external `http(s)` links (not crawlable from this harness — recorded as a limit) |
| **U15** | Error affordance *(non-SC)* | An invalid submit produces a visible **and programmatically announced** error identifying the offending field | 🟠 | N-A for forms with no validation |
| **U16** | No unexpected context shift *(non-SC)* | No context change on focus or on typing; any new-context action is user-initiated and announced | 🟠 | — |

### Why these sixteen, and what was consciously excluded

Included because the brief names them: 2.4.1, 2.4.4, 2.1.1, 2.1.2, 2.4.7, 4.1.2, 3.3.2,
1.3.1, 1.4.3, 2.5.5 (U1–U10). U11–U16 are the non-SC usability checks the item names plus the
two the bar implies once forms and a SPA router are in scope (error affordance; context
shift, which a `navigate()`-on-click SPA must be checked for).

**Consciously excluded, with reason:**

- **1.4.11 Non-text contrast (UI components)** — subsumed into U5's ≥3:1 focus-indicator
  test, which is the part of it this site's failure surface actually touches. A separate row
  would re-measure the same borders with a different threshold.
- **1.4.10 Reflow / 1.4.4 Resize text** — the responsive track's R1–R4 own layout and
  overflow; duplicating them here would double-count.
- **1.4.13 Content on hover or focus** — only candidate is the mega-menu (U4/U3 territory).
- **2.2.1 Timing, 2.2.2 Pause/Stop/Hide** — no auto-advancing content in scope; the review
  carousel is manual (verified: no timers drive `currentIndex`).
- **3.3.3 / 3.3.4 Error prevention** — the booking form is the only submit-with-consequence,
  and it is gated by a disabled button rather than by validation; covered by U15's finding
  rather than by a row that cannot fire.
- **Axe-core full scan** — permitted as a cross-check by the item, not used as the verdict
  source. The AX trees are pasted as receipts (`ax-*.json`) and the verdicts below are
  derived from DOM + computed style, so a tool quirk cannot silently decide a cell.

---

## 2. Method per criterion

| ID | How it is measured |
|---|---|
| U1 | `Tab` → read `activeElement`; `Enter` → re-read; assert target id exists |
| U2 | Per-route inventory: accessible-name classifier (`text-content` / `aria-label` / `img-alt` / `placeholder-only` / `NONE`) over every `a` |
| U3 | Tab-chain reaches the control; dispatch fixed Enter/Space; diff DOM state across the event (FAQ `gridTemplateRows`, carousel `translateX`, burger `aria-expanded`) |
| U4 | Open the overlay; tab past its last focusable; read whether `activeElement` is still inside the sheet and whether the background is `inert`/`aria-hidden` |
| U5 | Keyboard-primed focus + 750 ms settle + computed `outline*`/`box-shadow`; contrast of the indicator against the composited adjacent background |
| U6 | Inventory `name`/`nameSrc` + `aria-expanded`/`aria-pressed`/`disabled` read live, cross-checked against the intended state |
| U7 | Inventory per field: `hasLabel` (`label[for]`), `ariaLabel`, `placeholder`, `required`, `validity.*`, `validationMessage` |
| U8 | One JSON per route: heading outline + level-skips + `h1` count, landmark multiset, `label`/`for` pairs, duplicate ids |
| U9 | Composited-background contrast walk over every element with direct text; oklch-safe resolver; image backgrounds reported as limits |
| U10 | *(inherited)* |
| U11 | `img[alt]` census incl. `alt=""` vs missing-attr, plus icon-control name source |
| U12 | `document.documentElement.lang` |
| U13 | Diff the nav inventory across all four routes |
| U14 | Union of all `href`s across routes, set-checked against `Router.tsx:72–128`; mega-menu targets opened live; `target=_blank` ⇔ `rel` |
| U15 | Validation-only protocol: empty submit, then malformed-input submit; read `activeElement`, `validationMessage`, `aria-invalid`, URL before/after |
| U16 | Code pass for `onFocus`/`onChange` navigations + observed route stability during typing |

---

## 3. Scope, argued from code

**Route table — `frontend/src/Router.tsx:72–128`.** Public routes are `/`, `/products`,
`/who-we-are`, `/what-we-do`, `/contact-us`, `/products/:id`, `/book-a-schedule`, `/buy-now`,
`/Subscribe-now`, `/layout-practice`. `/admin/*` and `/login` are token-gated
(`Router.tsx:130–162`) and out of scope.

**In scope, and why:**

| Surface | Owning code |
|---|---|
| `/` | `pages/Homepage.tsx` — assembled from `HeroPage`, `ServicesSection`, `ProductSection`, `ClientReviewsSection`, `ContactUsSection`, `Faq`, `MapDesign` |
| `/what-we-do` | `pages/WhatWeDo.tsx` |
| Shared chrome | `Layout.tsx` (skip link `:13`, `<main id="main-content" tabIndex={-1}>` `:18`), `Navigation.tsx`, `MobileMenu.tsx`, `Footer.tsx`, `ChatHelp.tsx` |
| Form 1 | `components/cards/ContactForm.tsx` — **mounts on two routes**: `/contact-us` *and* `/` via `pages/sections/ContactUsSection.tsx` |
| Form 2 | `components/BookingCalendar.tsx` on `/book-a-schedule` |

The two form routes are in scope because the plan names them; `ContactForm`'s second mount on
`/` means every contact-form finding is a **two-route** finding, and the inventory confirms
it (identical 3 unnamed selects + 5 placeholder-only fields on both).

**Excluded:** `/products`, `/products/:id`, `/who-we-are`, `/buy-now`, `/Subscribe-now`,
`/layout-practice` — reachable from in-scope chrome, so their *hrefs* are checked for
integrity (U14) but their internals are not audited. Admin/CMS excluded entirely.

---

## 4. Inheritance map

Cited, **not** re-found (per the R-track rule):

| Item | Owner | Status |
|---|---|---|
| R5/F4 touch-target sizes | responsive track §3 | inherited |
| N-04 placeholder footer hrefs (`/who-we-are` used as a stand-in for FAQ/Team/Story/Mission/Vision) | owner-parked, `Footer.tsx:106,109,117,118,119` | inherited |
| Burger `aria-expanded` | responsive track R2 (measured) | inherited — **re-confirmed live here only as a keyboard-path receipt** |
| Skip-link presence | responsive track R5 `[1×1]` | inherited as *presence*; U1 tests *function*, which is a different claim |
| FAQ trigger = native `<button>` | responsive track | inherited as *element type*; U3/U6 test operability and state, which are not the same claim |

---

## 5. Receipt inventory

| Receipt | What it backs |
|---|---|
| `inv-{home,wwd,contact,book}-1440.json`, `inv-home-375.json` | U2/U6/U7/U11/U14 inventories |
| `ax-{home,wwd,contact,book}-1440.json` | U8 cross-check (AX trees) |
| `tab-home-1440.json`, `tab-home-375.json` | U3/U4/U5 tab chains |
| `focus-rings-1440.json`, `focus-hero-ring-1440.json`, `focus-map-canvas-1440.json` | U5 settled indicators |
| `sem-{home,wwd,contact,book}-1440.json` | U8 headings/landmarks/labels |
| `contrast-{home,wwd,contact,book}-1440.json` | U9 |
| `form-contact-before-submit.json`, `form-contact-empty-submit.json`, `form-contact-bademail-submit.json` | U15 |
| `kbd-mobile-menu-focus-escape.json` | U4 |
