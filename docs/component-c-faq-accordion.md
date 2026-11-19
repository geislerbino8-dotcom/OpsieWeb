# Component C — FAQ accordion requirements, states, and implementation

**Date:** 2026-11-19
**Component C:** FAQ accordion (`frontend/src/components/FaqSection/Faq.tsx`)
**Content:** `frontend/src/data/faqData.ts`
**Mounts:** `/` (`Homepage.tsx:82`), `/what-we-do` (`WhatWeDo.tsx:185`), `/who-we-are` (`WhoWeAre.tsx:519`)

> The 2026-10-26 sketches named two routes (`/` and `/what-we-do`). The component also
> mounts on `/who-we-are`, so every fix was checked against the shared component rather
> than a single page.

## 1. Requirements reviewed

Source material: `study/2026-10-26-faq-sketches.md`, the findings register (**F3 🟠**),
the usability audit (**U6**, WCAG 4.1.2 Name/Role/Value), and the shared design-system
state/contrast bars.

| ID | Requirement | Status before |
| --- | --- | --- |
| F3 / U6 | Every trigger exposes its open/closed state to assistive tech (`aria-expanded`) and points at its panel (`aria-controls`). | **Failing** — `aria-expanded` read `null` before *and* after toggling; `aria-controls` absent. |
| 1.3.1 | The panel is programmatically associated with its trigger. | Missing region/label wiring. |
| Keyboard (U3) | Enter/Space operate the trigger. | Already passing (native `<button>`); kept. |
| R5 | Touch targets ≥ 44 px. | Passing (full-width triggers); kept. |
| 0 px overflow | No horizontal spill at 320/375/1440. | Passing; re-checked. |
| REG-21 | Do not edit the unlayered global focus rule. | Honoured — no `index.css` focus-rule change. |
| REG-25/26/27 | FAQ copy is CMS/owner-managed; do not restructure the content model. | Honoured — `faqData.ts` shape unchanged (`question`, `answer: string \| string[]`). |
| REG-28 | CMS wiring is parked. | Not touched. |

## 2. Structure and state plan

**Structure**

- Each item is a card: `rounded-2xl border bg-white`, teal border + soft teal shadow when open, hairline navy border when closed.
- The trigger is wrapped in an `<h3>` so the question list is navigable by heading.
- Trigger: native `<button type="button">` with `id="faq-trigger-<i>"`, `aria-expanded`, `aria-controls="faq-answer-<i>"`.
- Panel: `id="faq-answer-<i>"`, `role="region"`, `aria-labelledby="faq-trigger-<i>"`, `aria-hidden={!isOpen}`.
- Panel reveal uses the existing CSS-grid technique: `grid-template-rows: 0fr → 1fr` inside an `overflow-hidden` wrapper, so height animates without measuring.
- Decorative pieces (`01` numbering, plus/minus icon) are `aria-hidden="true"`.

**States**

| State | Treatment |
| --- | --- |
| Closed | White card, `border-[#0B1622]/10`, navy question, `#ECEDF1` icon chip with a `+`. |
| Closed hover | Border shifts to `#3CBDE6/50` — colour only, no hover-only information. |
| Open | `border-[#3CBDE6]/50`, teal shadow, question in `#0E7490`, icon chip `#3CBDE6` with the `+` rotated 45°. |
| Focus-visible | `outline-2 outline-offset-2 outline-[#0E7490]` on the trigger and on the “Reach out to us” link. |
| Keyboard | Enter opens, Space closes/opens; single-open model retained (opening one closes the previous). |
| Reduced motion | The global `@media (prefers-reduced-motion: reduce)` rule (`index.css:102`) collapses the transition to 0.01 ms. |

**Single-open model:** `openIndex: number | null` is unchanged. Only the previously open
trigger flips back to `aria-expanded="false"`, which is what the state model already did
visually.

## 3. Implementation notes

- Rewrote `Faq.tsx` around the structure above. IDs are stable per index (`faq-trigger-0`,
  `faq-answer-0`, …), which keeps `aria-controls`/`aria-labelledby` resolvable.
- Replaced the dark/violet panel styling with light white cards, navy ink `#0B1622`, and
  the teal `#3CBDE6` / `#0E7490` accent used by Component B and the site chrome.
- Fixed two contrast problems introduced by the old styling: the open question had been
  rendered in a low-contrast accent, and the “Reach out to us” link was below 4.5:1 on the
  light page. Both now use `#0E7490`.
- Added `font-mono-label` for the `01`–`05` index numbers (Tailwind’s layered `font-mono`
  loses to the unlayered `* { font-family: Montserrat }` rule — same fix as Component B).
- Cleaned `faqData.ts`: added the missing `?` to the first question, trimmed trailing
  spaces, and collapsed the single-item answer array for “How do you ensure quality?” to a
  plain string. No question or answer wording was otherwise changed.
- Added `frontend/src/test/faq-accordion.test.tsx` (6 cases) and tightened the shared FAQ
  assertion in `components.test.tsx` (heading wrapper, `role="region"`, `aria-labelledby`).

## 4. Verification (2026-11-19)

**Automated gates**

| Gate | Result |
| --- | --- |
| Vitest | **29/29** pass across 3 files (6 new FAQ cases) |
| `npx tsc -b` | clean |
| Focused ESLint (`Faq.tsx`, `faqData.ts`, `faq-accordion.test.tsx`, `components.test.tsx`) | clean |
| `npm run build` | pass |
| axe (`faq-accordion.test.tsx`) | 0 violations (colour-contrast rule disabled in axe; measured manually below) |

**Browser pass** (`verify-b-c.mjs`, local/untracked; Edge via CDP)

| Check | 1440 px | 375 px | 320 px |
| --- | --- | --- | --- |
| Triggers rendered | 5 | 5 | 5 |
| Horizontal overflow | none | none | none |
| Trigger heights | 88 px each | 72–88 px | 72–112 px |
| Heading-wrapped triggers | 5/5 | 5/5 | 5/5 |
| `role="region"` + `aria-labelledby` | 5/5 | 5/5 | 5/5 |

**Interaction pass**

| Check | Result |
| --- | --- |
| Click opens item 1 | `aria-expanded="true"`, `aria-hidden="false"`, panel 109 px |
| Click item 2 | item 1 closes, item 2 opens (single-open) |
| Enter on a focused trigger | opens |
| Space on the open trigger | closes |
| Focus outline | `2px #0E7490`, offset 2 px |

**Contrast** (measured from computed styles)

| Element | Ratio | Bar |
| --- | --- | --- |
| Closed question `#0B1622` on white | **18.23:1** | 4.5:1 ✅ |
| Open question `#0E7490` on white | **5.36:1** | 4.5:1 ✅ |
| Answer `#475569` on white | **7.58:1** | 4.5:1 ✅ |
| “Reach out to us” `#0E7490` on page background | **4.58:1** | 4.5:1 ✅ |
| Index number `#64748B` on white | **4.76:1** | 4.5:1 ✅ (also `aria-hidden`) |
| Open icon `#06212E` on `#3CBDE6` | **7.6:1** | 4.5:1 ✅ |

Screenshots: `shots/redesign/c-{1440,375,320}.png`, `c-1440-open.png`,
`c-1440-second-open.png`, `c-375-open.png` (local/untracked). Structured results:
`shots/redesign/verify-results.json`.

## 5. Known limitations and out-of-scope items

- **Shared `SuperHeader` teal fragments.** The `*…*` emphasis spans render `#3CBDE6` at
  **2.36:1** on the light section. This is a cross-cutting `SuperHeader` concern (used far
  beyond the FAQ) and was left unchanged; fixing it needs a design decision about the
  emphasis colour on light backgrounds.
- **Floating chat launcher.** The global Botpress launcher overlaps the FAQ at 320–375 px
  when scrolled to the bottom. It is outside this component.
- **Screen-reader announcement of the region.** The harness has no screen-reader emulation;
  region/`aria-labelledby` wiring is verified structurally (attributes and axe), not by a
  live AT.
