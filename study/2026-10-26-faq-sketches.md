# FAQ Accordion — Desktop + Mobile Wireframe Sketches
**Date:** 2026-10-26 (Block 2)
**Component:** FAQ accordion (`FaqSection/Faq.tsx`) — mounts on `/` and `/what-we-do`
**REG IDs carried:** REG-21, REG-25, REG-26/27 (CMS/owner), REG-28 (parked)
**Findings addressed:** **F3 🟠** (no `aria-expanded`/`aria-controls`, **U6** 4.1.2)
**Receipts (2026-10-26, same-day):** `study/receipts/2026-10-26/b2-faq.json` · inherited `passb-faq-toggle.json` (2026-10-22, Enter 0px→109/110px + `aria-expanded` null before **and** after)

> **Convention:** current measurements carry their receipt source in parentheses. Proposed sizes / tokens / structural changes are marked **(proposal)** and are NOT measurements.

---

## Viewports

| Viewport | Reason |
|---|---|
| **375×812** | Primary mobile; 5 triggers measured (b2-faq.json → vp375) |
| **320×568** | Narrowest locked viewport; included for the FAQ **header wrap history** (REG-23 family — the FAQ h2 spilled 51px at 1024 on wwd per the responsive track; 320 covers the narrow trigger/label wrap) |

*(No 1440 sketch: the accordion mechanism is identical at desktop; the only desktop-specific item is the two-column `lg:flex-row` header layout, which is a SuperHeader concern, not the accordion trigger. 375 + 320 cover the trigger stack + wrap.)*

---

## 1. 375×812 — Current State

FAQ h2 header sits above a stacked list of `<button>` triggers. **5 triggers** measured (@375, b2-faq.json).

```
┌────────────── 375 ──────────────┐
│  Got Questions? We've           │  h2 (wrap note: see 320)
│  Got Answers                    │
│                                │
│  ┌──────────────────────────┐  │
│  │ What services do you… ▼  │  │  <button> trigger
│  └──────────────────────────┘  │  aria-expanded: NULL (F3)
│  ┌──────────────────────────┐  │
│  │ How do you ensure…    ▼  │  │  next trigger
│  └──────────────────────────┘  │
│  … 3 more triggers             │
│                                │
│  Reach out to us.  (inline <a>)│  Faq.tsx:27
└──────────────────────────────────┘
```

- **Trigger mechanism (measured, `passb-faq-toggle.json` 10-22):** Enter opens the panel — CSS grid `grid-template-rows` animates `0px → 109/110px` (the `0fr → 1fr` reveal); Space closes it. The trigger is a native `<button>` (good — keyboard operable).
- **The F3 defect (measured):** `aria-expanded` reads **null both before and after** the toggle. The panel opens/closes visually but exposes **no state to AT** — a screen-reader user cannot tell whether an item is open. `aria-controls` is also absent. This is U6 (4.1.2 name/role/value), not a keyboard-operability break (keyboard works).

---

## 2. 320×568 — Current State

Same trigger stack; 320 is included for wrap history (REG-23 family).

```
┌──────────── 320 ────────────┐
│  Got Questions? We've       │  h2 wraps to 3-4 lines
│  Got Answers                │  at 320 (narrow column)
│                            │
│  ┌──────────────────────┐  │
│  │ What services do  ▼  │  │  trigger label may wrap
│  │ you offer?           │  │  to 2 lines @320
│  └──────────────────────┘  │
│  …                          │
└──────────────────────────────┘
```

- **Trigger labels @320:** 5 triggers measured (b2-faq.json → vp320). Long labels ("What services do you offer?") wrap within the trigger button; the button grows in height (no clip — the accordion button is `w-full`, auto-height). **0px bar: PASS** (the panel is inside the section's overflow, no horizontal spill).
- **Header:** the FAQ h2 is the responsive-track F3-at-1024 subject on wwd; at 320 the header column is full-width so the 51px desktop spill does not apply (that was the `lg:w-1/3` narrow column at 1024). Noted, not re-filed.

---

## 3. Proposal (F3 fix)

> All values below are **(proposal)** — not measurements.

**Goal:** expose accordion state to AT via `aria-expanded` + wire the panel with `aria-controls`/region semantics — U6 (4.1.2). Mechanism already keyboard-operable; this is a state-exposure fix, not an operability fix.

```
┌────────────── 375 ──────────────┐
│  Got Questions? We've Got…      │
│                                │
│  ┌──────────────────────────┐  │
│  │ What services… ▼  [btn]  │  │  (proposal)
│  │  aria-expanded="false"   │  │  toggles false↔true
│  │  aria-controls="faq-0"   │  │
│  └──────────────────────────┘  │
│  <div id="faq-0"               │  (proposal) panel =
│       role="region"            │  region labelled by
│       aria-labelledby="faq-0-b">│  the trigger button
│    … answer …                  │
│  </div>                        │
│  …                             │
└──────────────────────────────────┘
```

- **`aria-expanded` (proposal):** add `aria-expanded={isOpen}` to each trigger `<button>` — `false` when collapsed, `true` when open, driven by the existing `openIndex` state (`Faq.tsx`). This is the core F3 fix; `passb-faq-toggle.json` will re-measure it flipping `false → true` on Enter (currently null → null).
- **`aria-controls` + region (proposal):** give each panel a stable `id` (`faq-<index>`), point the trigger's `aria-controls` at it, and mark the panel `role="region"` + `aria-labelledby` = the trigger's id. Announces the open region and its source (U6 + 1.3.1 relationship).
- **Single-open behavior:** current uses a single `openIndex` (one panel open at a time). Keep it — but the `aria-expanded` on the *previously* open trigger must flip to `false` when another opens (the state model already does this; just reflect it in ARIA).
- **No `index.css:336` change** (REG-21). Trigger focus rings come from the global rule.
- **Note the contrast caveat:** the panel background transitions from `oklch(… / 0.04)` (closed) to `rgb(10,10,10)` (open) (`passb-faq-ratio.json`). This sketch fixes **state exposure**, not contrast — the FAQ-trigger ring ratio (4.36) is a §2.3 pass, not a defect here.

---

## 4. Bars check

| Bar | Current | Proposal | Verdict |
|---|---|---|---|
| 0px overflow @320/375 | PASS (b2) | unchanged | PASS |
| R5 touch ≥44 | triggers are full-width, ≥44 tall (b2) | unchanged | PASS |
| U6 name/role/value (state exposed) | **FAIL (F3)** — `aria-expanded` null | `aria-expanded` + `aria-controls` + region | closes F3 |
| Keyboard operability (U3) | PASS (Enter/Space, native `<button>`) | unchanged | PASS |

---

## 5. Honest Unknowns

| Unknown | Reason | Needed for | Status |
|---|---|---|---|
| Exact `aria-expanded` flip timing mid-transition | `passb-faq-toggle.json` sampled settled state; mid-animation value unmeasured | confirm no transient wrong state announced | Pass-B re-capture (sample at 0ms + settled) |
| `/` FAQ identical to `/what-we-do` FAQ | b2 measured `/what-we-do`; `/` mounts the same `Faq.tsx` (inherited) | confirm one fix clears both routes | Pass-B re-capture on `/` |
| Panel `role="region"` announcement in real SR | no screen-reader harness | confirm AT reads the region | Stated method-limit (no SR in harness) |
