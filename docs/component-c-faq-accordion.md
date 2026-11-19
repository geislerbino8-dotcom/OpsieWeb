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

- The left column opens with a mono kicker row: `Opsie Support // FAQ` (teal, dot) and
  `Answers / 05` (hidden below `sm`), mirroring Component B's `Opsie Control // Inquiry`.
- Each item is a card: `rounded-2xl border bg-white`, teal border + soft teal shadow when open, hairline navy border when closed.
- The trigger is wrapped in an `<h3>` so the question list is navigable by heading.
- Trigger: native `<button type="button">` with `id="faq-trigger-<i>"`, `aria-expanded`, `aria-controls="faq-answer-<i>"`.
- Panel: `id="faq-answer-<i>"`, `role="region"`, `aria-labelledby="faq-trigger-<i>"`, `aria-hidden={!isOpen}`.
- Panel reveal uses the existing CSS-grid technique: `grid-template-rows: 0fr → 1fr` inside an `overflow-hidden` wrapper, so height animates without measuring.
- Decorative pieces (`01` numbering, plus/minus icon, kicker dot, meta count) are `aria-hidden="true"`.
- The “Reach out to us” action is a React Router `<Link to="/contact-us">` (AC-07).

**States**

| State | Treatment |
| --- | --- |
| Closed | White card, `border-[#0B1622]/10`, navy question, `#ECEDF1` icon chip with a `+`. |
| Closed hover | Card tint `#F8FAFC` + border `#3CBDE6/60` — colour only, no hover-only information and no row movement. |
| Pressed | Trigger fills `#F1F5F9`; the row stays in place. |
| Open | `border-[#3CBDE6]/60`, teal shadow, question and index in `#0E7490`, icon chip `#3CBDE6` with the `+` rotated 45°. |
| Focus-visible | `outline-2 outline-offset-2 outline-[#0E7490]` on the trigger and on the “Reach out to us” link. |
| Keyboard | Enter opens, Space closes/opens; single-open model retained (opening one closes the previous). |
| Reduced motion | The global `@media (prefers-reduced-motion: reduce)` rule (`index.css:102`) collapses the transition to 0.01 ms. |

**Single-open model:** `openIndex: number | null` is unchanged. Only the previously open
trigger flips back to `aria-expanded="false"`, which is what the state model already did
visually.

## 3. Implementation notes

- Rewrote `Faq.tsx` around the structure above. IDs are stable per index (`faq-trigger-0`,
  `faq-answer-0`, …), which keeps `aria-controls`/`aria-labelledby` resolvable.
- Guarded the CMS heading with `content?.faqSection?.header || "Frequently asked questions"`.
  The previous `content?.faqSection.header` threw when `faqSection` was absent and left an
  empty `<h2>` while the asynchronous CMS fetch was still in flight.
- Replaced the dark/violet panel styling with light white cards, navy ink `#0B1622`, and
  the teal `#3CBDE6` / `#0E7490` accent used by Component B and the site chrome.
- Fixed three contrast problems on the light page: the open question and the “Reach out to
  us” link now use `#0E7490`, and the intro paragraph moved from `text-gray-500`
  (**4.13:1** on the `#ECEDF1` body) to `text-[#475569]` (**6.48:1**).
- Added `font-mono-label` for the `01`–`05` index numbers (Tailwind’s layered `font-mono`
  loses to the unlayered `* { font-family: Montserrat }` rule — same fix as Component B).
- Cleaned `faqData.ts`: added the missing `?` to the first question, trimmed trailing
  spaces, and collapsed the single-item answer array for “How do you ensure quality?” to a
  plain string. No question or answer wording was otherwise changed.
- Added `frontend/src/test/faq-accordion.test.tsx` (6 cases at the rebuild) and tightened the
  shared FAQ assertion in `components.test.tsx` (heading wrapper, `role="region"`,
  `aria-labelledby`).

**Styling pass (2026-11-19).** The visual language now matches Component B's Figma recipe
(white card, navy `#0B1622`, teal `#3CBDE6`/`#0E7490`, mono micro-labels):

- Added the kicker row (`Opsie Support // FAQ` + `Answers / 05`) with the same
  `.font-mono-label` 9/10 px `tracking-[0.14em]` recipe as B.
- Added closed hover tint (`#F8FAFC`), pressed fill (`#F1F5F9`), a teal open index, and an
  inset ring on the closed icon chip.
- Indented the answer (`sm:pl-[26px]`) to align with the question text.
- Converted the contact action to `<Link>` (AC-07); the tests now render inside
  `MemoryRouter`.
- Aligned the emphasis border to B's `#3CBDE6/60` token.
- Deliberately skipped B's card hover lift, corner brackets, blueprint grid, and deep card
  shadow — see `docs/component-c-styling-notes.md` §4 for the rationale.

Full recipe, state matrix, shared-pattern audit, and measurements:
`docs/component-c-styling-notes.md`.

## 4. Verification (2026-11-19)

**Automated gates**

| Gate | Result |
| --- | --- |
| Vitest | **33/33** pass across 3 files (10 FAQ cases) |
| `npx tsc -b` | clean |
| Focused ESLint (`Faq.tsx`, `faqData.ts`, `faq-accordion.test.tsx`, `components.test.tsx`) | clean |
| `npm run build` | pass |
| axe (`faq-accordion.test.tsx`) | 0 violations (colour-contrast rule disabled in axe; measured manually below) |

**Browser pass** (`audit-faq-style.mjs` / `open-faq.mjs` / `focus-active-faq.mjs`,
local/untracked; Edge via CDP)

All three mounts × 1440/1024/768/375/320 = **15 combinations**.

| Check | Result |
| --- | --- |
| Triggers rendered | 5 on every combination |
| Horizontal overflow | none on any combination |
| Section bounds | inside the viewport at every width |
| Trigger heights | 72–112 px (all ≥ 44 px) |
| Heading-wrapped triggers | 5/5 on every combination |
| `role="region"` + `aria-labelledby` | 5/5 on every combination |
| Kicker / meta | kicker present at every width; meta hidden below 640 px as designed |
| CMS heading | “Frequently asked questions” on every combination; fallback holds when the CMS request is blocked |

**Interaction pass** (`open-faq.mjs`, settled by polling computed values)

| Check | Result |
| --- | --- |
| Click opens item 1 | `aria-expanded="true"`, `aria-hidden="false"`; answer height 135 px at ≥1024, 195 px at 375, 220 px at 320 |
| Open styling | teal question/index `#0E7490`, icon `#3CBDE6` at `45deg`, teal `/60` border + glow |
| Click item 2 | item 1 closes, item 2 opens (single-open) |
| Enter on a focused trigger | opens |
| Space on the open trigger | closes |
| Closed hover | card tint `#F8FAFC` + teal `/60` border |
| Pressed | trigger `#F1F5F9`; row does not move |
| Focus outline (keyboard Tab) | `2px #0E7490`, offset 2 px; 5.36:1 on white / 4.58:1 on the page |

**Contrast** (measured from computed styles)

| Element | Ratio | Bar |
| --- | --- | --- |
| Section heading (gray-900) on `#ECEDF1` | **15.17:1** | 4.5:1 ✅ |
| Kicker `#0E7490` on `#ECEDF1` | **4.58:1** | 4.5:1 ✅ |
| Kicker meta `#475569` on `#ECEDF1` | **6.48:1** | 4.5:1 ✅ |
| Intro paragraph `#475569` on `#ECEDF1` | **6.48:1** | 4.5:1 ✅ (was `text-gray-500` at **4.13:1**) |
| Closed question `#0B1622` on white | **18.23:1** | 4.5:1 ✅ |
| Open question `#0E7490` on white | **5.36:1** | 4.5:1 ✅ |
| Answer `#475569` on white | **7.58:1** | 4.5:1 ✅ |
| “Reach out to us” `#0E7490` on page background | **4.58:1** | 4.5:1 ✅ |
| Index number `#64748B` on white | **4.76:1** | 4.5:1 ✅ (also `aria-hidden`) |
| Open icon `#06212E` on `#3CBDE6` | **7.6:1** | 4.5:1 ✅ |

Screenshots: `shots/faq-style/c-home-*.png`, `c-what-we-do-*.png`, and
`c-who-we-are-*.png` across the five widths, plus `c-home-open-*.png`
(local/untracked). Structured results: `shots/faq-style/style-results.json` and
`open-results.json`.

## 5. Known limitations and out-of-scope items

- **Shared `SuperHeader` teal fragments (latent).** `SuperHeader` renders `*…*` emphasis
  spans in `#3CBDE6` (**2.36:1** on the light section). The current CMS FAQ heading has no
  emphasis span, so the shipped page passes; adding one would fail. This is a cross-cutting
  `SuperHeader` concern and was left unchanged.
- **App-level CMS failure.** With the content request blocked, `App.fetchContent` throws an
  unhandled `TypeError` on `res.data`; the FAQ still renders with its fallback heading.
  This is an `App.tsx` concern, not Component C.
- **Floating chat launcher.** The global Botpress launcher overlaps the FAQ at 320–375 px
  when scrolled to the bottom. It is outside this component.
- **Screen-reader announcement of the region.** The harness has no screen-reader emulation;
  region/`aria-labelledby` wiring is verified structurally (attributes and axe), not by a
  live AT.
