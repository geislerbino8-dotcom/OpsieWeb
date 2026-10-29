# MobileMenu Sheet — Desktop + Mobile Wireframe Sketches
**Date:** 2026-10-26 (Block 2)
**Component:** Mobile navigation sheet — burger-triggered full-height panel (`MobileMenu.tsx` + the `Navigation.tsx` burger that opens it)
**REG IDs carried:** REG-21 (unlayered `index.css:336` untouched), REG-25 (focus-visible vs BOTH surfaces), REG-26/27 (CMS/owner deps), REG-28 (no AOS dependence, parked)
**Findings addressed:** **F11 🟠** (no Escape + focus escapes the opaque overlay, **U4** 2.1.2)
**Receipts (2026-10-26, same-day):** `study/receipts/2026-10-26/b2-mobilemenu-375.json` · inherited `passb-f11-identity.json` (2026-10-22, 14-stop walk), `tab-home-375.json` (burger = step 3)

> **Convention:** current measurements carry their receipt source in parentheses. Proposed sizes / tokens / structural changes are marked **(proposal)** and are NOT measurements.

---

## Viewports

Two named viewports (the sheet is mobile-only, `<768`):

| Viewport | Reason |
|---|---|
| **375×812** | Primary mobile; sheet measured here (b2-mobilemenu-375.json) |
| **320×568** | Narrowest locked viewport; sheet panel + link wrapping checked against the 0px bar |

*(No 1440 sketch: the burger and sheet are `md:hidden` — at 1440 the desktop nav renders instead, and the sheet is display:none. Sketching it at desktop would present a non-existent state.)*

---

## 1. 375×812 — Current State

Burger is tab stop **3** at 375 (`tab-home-375.json`). Enter/Space opens the sheet.

```
┌────────────────────────────── 375 ─┐  fixed inset-0 z-50 (MobileMenu.tsx:18)
│            ░░ opaque overlay ░░     │  .bg-black/50 backdrop (MobileMenu.tsx:20)
│  ┌────────────────────────────┐     │
│  │  panel bg-[#8B5CF6]        │     │  h-[75vh] (MobileMenu.tsx:27)
│  │  (box not receipted —      │     │  G2: panelBox capture failed,
│  │   see receipt note below)  │     │  see §1 receipt line
│  │                            │     │
│  │   Why Opsie   [327×48]     │     │  /what-we-do
│  │   About Us    [327×48]     │     │  /who-we-are
│  │   Contact Us  [327×48]     │     │  /contact-us
│  │   Products    [327×48]     │     │  /products
│  └────────────────────────────┘     │
└──────────────────────────────────────┘
```

- **What's here:** opaque black/50 overlay covering the page; violet `#8B5CF6` panel `h-[75vh]` anchored to the bottom (`items-end`); a close control + a `<nav aria-label="Mobile navigation">` with 4 links.
- **Receipt (`b2-mobilemenu-375.json`):** links **327×48 each** (receipted, authoritative). Sheet nav = `nav[aria-label="Mobile navigation"]` (`MobileMenu.tsx:44`). **Panel box is NOT receipted (G2, 2026-10-26):** the receipt's `panelBox` field reads `[0,0,375,68]` — that is the fixed nav header, not the sheet panel (selector grabbed the wrong element), and the receipt *note* claiming "327×497 (h-75vh of 662)" is **uncertain and arithmetically broken**: the receipt states vp 375×812, and 75vh of 812 = **609**, not 497 (nor 662). The `[24,309,327,497]` box previously shown here appears **nowhere** in the receipt and is dropped until a re-capture of the open sheet carries it.
- **Touch:** 4 links 327×48 → **height 48 ≥ 44 PASS**, width spans the panel. No sub-44 target inside the sheet this pass.

### The F11 defect (current, measured 2026-10-22 `passb-f11-identity.json`)
With the sheet open, a **14-stop Tab walk** shows focus **escapes the sheet at stop 9 onward** onto content behind the opaque overlay, and the fixed nav (stops 2–3, the logo + burger) already sits *under* the overlay before the sheet's own items are reached. **Escape does nothing** (`burgerExpanded` stays `"true"`); the background is not `inert`/`aria-hidden`. This is a functional break (U4), not a blocker — links stay reachable and close works.

---

## 2. 320×568 — Current State

Sheet renders identically; panel is narrower. 320 is included because the sheet is a fixed overlay whose panel + long link labels ("Contact Us") must not overflow the 0px bar.

- **Panel at 320:** `w-full max-w-full` (`MobileMenu.tsx:27`) → panel spans the viewport width minus the card margin; at 375 the **links** measure 327 wide (receipted), so at 320 they follow the narrower panel (~288–300, reasoned not measured). Links `px-4 py-2 text-2xl` — longest label "Contact Us" fits on one line at text-2xl within ~288px (**0px bar: PASS** by reasoning; no 320 capture — pass-B re-capture pending).
- **Overlay:** `inset-0` covers 320 fully. No horizontal overflow from the overlay.

---

## 3. Proposal (F11 fix)

> All values below are **(proposal)** — not measurements.

**Goal:** contain focus inside the sheet while open + make Escape dismiss it — without touching `index.css:336`.

```
┌────────────────────────────── 375 ─┐  fixed inset-0 z-50
│  <div class="inert" aria-hidden>    │  (proposal) page BEHIND sheet
│            ░░ overlay ░░            │
│  ┌────────────────────────────┐     │
│  │  panel  role="dialog"      │     │  (proposal) role + aria-modal
│  │  aria-modal="true"         │     │
│  │  aria-label="Site menu"    │     │
│  │                            │     │
│  │  ✕ close  [44×44] (prop.)  │     │  enlarged to ≥44
│  │   Why Opsie   [327×48]     │     │  unchanged (48 ≥ 44)
│  │   About Us    [327×48]     │     │
│  │   Contact Us  [327×48]     │     │
│  │   Products    [327×48]     │     │
│  └────────────────────────────┘     │
└──────────────────────────────────────┘
```

- **Focus containment (proposal):** on open, set `inert` + `aria-hidden="true"` on the page root siblings outside the panel (the overlay already visually blocks them); wrap the panel's focusables in a cycle so Tab from "Products" returns to the close button and Shift+Tab from close returns to "Products". This closes the "escapes at stop 9" break (F11).
- **Escape (proposal):** add a `keydown` handler on the panel (or the `MobileMenu.tsx` root) that on `Escape` calls the existing close path and returns focus to the burger (`aria-expanded` → `false`). Repo-wide `Escape` exists only in `TicketModal.tsx:71` (admin) — this is the first public-site Escape handler.
- **Panel semantics (proposal):** `role="dialog"` + `aria-modal="true"` + `aria-label` on the panel so AT announces it as a modal surface (supports U4 + U6).
- **Close button (proposal):** size to ≥44×44 (`h-11 w-11`) — b2 could not resolve the close button's live box this pass (selector returned null); its keyboard close path is inherited from `passb-f11-identity.json`. Treat the 44px as a **proposal until a pass-B re-capture measures it**.
- **Escape/containment do NOT touch `index.css:336`** (REG-21 intact). The focus rings on the sheet links come from the existing global rule; no element-scoped override is needed here (unlike the hero CTA, R-B).

---

## 4. Bars check (proposal vs current)

| Bar | Current | Proposal | Verdict |
|---|---|---|---|
| 0px overflow @320/375 | PASS (b2) | unchanged | PASS |
| R5 touch ≥44 | links 48 PASS; close button unmeasured | close → 44×44 | PASS after re-capture |
| U4 keyboard (no trap, Escape dismiss, no invisible focus) | **FAIL (F11)** | inert + focus cycle + Escape | closes F11 |
| Contrast of link text on violet | white on #8B5CF6 = 4.23:1 (F8, inherited) | not in scope here (F8 = token fix, separate) | noted |

---

## 5. Honest Unknowns

| Unknown | Reason | Needed for | Status |
|---|---|---|---|
| Close button exact box @375 | b2 selector returned null this pass | R5 close-target check | Pass-B re-capture (close path still inherited-proven via passb-f11-identity.json) |
| Panel box / height (any vp) | receipt `panelBox` = `[0,0,375,68]` (nav header — wrong element); note's 327×497/662 arithmetic broken (75vh of 812 = 609) — **no reliable panel measurement exists** | confirm panel geometry + the 0px/link-fit reasoning | **Re-capture the open sheet** (G2); links 327×48 remain receipted |
| `inert` support floor | `inert` is baseline-2023; older Safari partial | focus-containment fallback | Needs polyfill decision (proposal: focus-trap fallback if `inert` unsupported) |
