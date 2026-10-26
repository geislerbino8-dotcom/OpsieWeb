# ClientReview Arrows — Desktop + Mobile Wireframe Sketches
**Date:** 2026-10-26 (Block 2)
**Component:** Client-review slider arrows (`sections/ClientReviewsSection.tsx`, desktop prev/next pair)
**REG IDs carried:** REG-21, REG-25, REG-26/27 (CMS/owner), REG-28 (parked)
**Findings addressed:** **F1 🟠** (arrows unnamed, **U6/U11** 4.1.2 + 1.1.1) · **F4-family 🟡 (new R5 instance)** (32×32 < 44px, **R5**) *(G3 amended 2026-10-26: F6/REG-14 is registered against the ServicesSections mobile arrows on `/what-we-do` (`ServicesSections.tsx:109,:120`, imgs 17×21 forced 24×24, aspDeltaPct 23.5, `probe-320x568-wwd.json`) — a different component; these ClientReview arrows' icon aspect is unmeasured, so their size issue is an F4-family/R5 new instance, not F6)*
**Receipts (2026-10-26, same-day):** `study/receipts/2026-10-26/b2-reviewarrows-1440.json` · inherited `passb-touch-375.json`, `interactions.json`

> **Convention:** current measurements carry their receipt source in parentheses. Proposed sizes / tokens / structural changes are marked **(proposal)** and are NOT measurements.

---

## Viewports

| Viewport | Reason |
|---|---|
| **1440×900** | Primary desktop; the arrows are `hidden md:flex` — visible here (b2-reviewarrows-1440.json) |
| **375×812** | Primary mobile; the arrows are `md:hidden` here, so 375 documents the **swipe-only** mobile path (inherited `passb-touch-375.json`) |

*(No 320 sketch: the arrows are display:none at ≤767, so 320 renders the same mobile state as 375 — no distinct 320 behavior. 375 covers mobile.)*

---

## 1. 1440×900 — Current State

The desktop prev/next pair sits in the "Real business, real results" reviews section, `hidden md:flex`, rendered at 1440.

```
┌────────────────────────── 1440 ──────────────────────────┐
│           Real business, real results                     │
│                                                        │
│   [◀]  ────────────  ────────────  [▶]                  │
│  32×32    hr 100px     hr 100px   32×32                  │
│  (prev)                          (next)                  │
│                                                        │
│        ┌─ TestimonialCard ─┐                            │
│        │  quote …          │                            │
│        └───────────────────┘                            │
└──────────────────────────────────────────────────────────┘
```

- **Two visible arrows** @1440 (`b2-reviewarrows-1440.json → arrows`): each a `<Button variant="shadow">` with an icon `img`, class `px-2 py-1 rounded-full flex items-center justify-center` (`Buttons.ts:55` base), `w-8 h-8` (`ClientReviewsSection.tsx:44,:51`).
- **Box = 32×32** each — **under the 44px R5 bar** (F4-family/R5 new instance) *(G3 amended 2026-10-26: was tagged F6; F6/REG-14 belongs to the ServicesSections arrows)*.
- **`aria-label = null`** on both (measured) — the buttons have **no accessible name** (F1 / U6 4.1.2 + U11 1.1.1). The only "name" is the decorative icon `img` (which itself carries no meaningful `alt`).
- The icon `img` sits inside the 32×32 box. *(G3 amended 2026-10-26: the earlier "F6 flags the icon as stretched" line here was an unmeasured assertion in a Current-State section — the icon's rendered aspect on THIS component is not receipted; moved to §5 unknowns. F6's stretch evidence is `probe-320x568-wwd.json` for the Services arrows only.)*
- **Mobile pair** (@375): the same arrows are `md:hidden` → `display:none`, box `[0,0]`; mobile uses native horizontal scroll-snap on the track (no buttons). Inherited from `passb-touch-375.json`.

---

## 2. 375×812 — Current State

```
┌────────────── 375 ──────────────┐
│  Real business, real results    │
│                                │
│   ┌─ TestimonialCard ─┐  ←swipe│
│   │  quote …          │        │  native scroll-snap
│   └───────────────────┘        │  arrows: display:none
│        (drag / swipe)          │  (md:hidden)
└──────────────────────────────────┘
```

- At 375 the desktop arrows are hidden (`hidden md:flex` fails below `md`); the track is a native horizontal scroller. **No arrow touch target exists at mobile** — so F1/F4-family apply to the desktop arrows only. The mobile R5 surface is the scroll track itself (inherited).

---

## 3. Proposal (F1 + F4-family/R5 fix)

> All values below are **(proposal)** — not measurements.

**Goal:** give each arrow an accessible name (F1/U6/U11) + enlarge the hit box to ≥44 (F4-family/R5 new instance) — desktop only. The icon-aspect item is a proposal conditioned on the §5 unknown (not a measured defect here).

```
┌────────────────────────── 1440 ──────────────────────────┐
│           Real business, real results                     │
│                                                        │
│  [ ◀ prev ]  ────────────  ────────────  [ next ▶ ]      │
│  44×44                              44×44                │
│  aria-label="Previous review"       aria-label="Next review"│
│  icon: object-contain, natural AR   icon: object-contain │
└──────────────────────────────────────────────────────────┘
```

- **Accessible name (proposal — F1):** add `aria-label="Previous review"` / `"Next review"` to the two `<Button>`s (they currently have no text and no label). This clears F1/U6 (4.1.2 name) + U11 (1.1.1, the icon becomes decorative with a named control). Precedent: the mobile-menu close/links and other named buttons across the site already carry `aria-label` or text.
- **Hit box ≥44 (proposal — F4-family/R5):** change `w-8 h-8` → `h-11 w-11` (44×44) on both arrows so they meet the R5 bar. The `px-2 py-1` base (`Buttons.ts:55`) stays; the `w-8`/`h-8` are overridden at the call site.
- **Icon aspect (proposal — conditioned on §5 unknown):** if the SVG's intrinsic aspect (unmeasured on this component — §5) differs from the box, apply `object-contain` or an explicit `size-…` matching the natural aspect. This is *not* a re-tagging of F6: F6/REG-14's stretch evidence (`probe-320x568-wwd.json`, aspDeltaPct 23.5) is the ServicesSections arrows; closing it is untouched by this proposal.
- **Contrast:** the arrow ring/focus contrast is a §2.3 concern (review arrows already pass at 4.68 per the accessibility audit). The `hover:bg-[#8B5CF6]` is hover-only decoration — **not** a hover-only *path* (the buttons are fully operable via click/Enter without hover, so no hover-only violation per the F11/R-B rule).
- **No `index.css:336` change** (REG-21). Focus rings come from the global rule.

---

## 4. Bars check

| Bar | Current | Proposal | Verdict |
|---|---|---|---|
| 0px overflow @1440 | PASS (b2) | unchanged | PASS |
| R5 touch ≥44 | **FAIL (F4-family/R5, new instance)** — 32×32 | `h-11 w-11` (44×44) | closes this row's R5 fail; **REG-14 unchanged** *(G3 amended 2026-10-26: was "closes F6" — F6/REG-14 is the ServicesSections arrows' row, which this component's fix does not touch)* |
| U6/U11 name (4.1.2 + 1.1.1) | **FAIL (F1)** — `aria-label` null ×2 | `aria-label` prev/next review | closes F1 |
| Hover-only path | none (operable w/o hover) | unchanged | PASS |

---

## 5. Honest Unknowns

| Unknown | Reason | Needed for | Status |
|---|---|---|---|
| Mobile swipe discoverability (no visible arrows) | mobile uses scroll-snap, no buttons | whether mobile needs visible prev/next (UX, not a rubric fail) | Not a finding — noted as a design question |
| Icon natural aspect at source | b2 measured the box (32×32), not the SVG intrinsic size — **this component's icon aspect is unmeasured** *(G3 amended 2026-10-26: the Current-State claim that the icon is stretched here was moved to this row — the only stretch receipt is `probe-320x568-wwd.json` for the ServicesSections arrows, aspDeltaPct 23.5, which is F6/REG-14, not this component)* | exact `object-contain` size proposal; whether an R5-box fix alone suffices here | Pass-B re-capture of the SVG natural dims |
| Focus-ring contrast after enlarging to 44 | ring measured at 32 (`focus-rings` inherited) | confirm ≥3:1 still holds at 44×44 box | Pass-B re-measure |
