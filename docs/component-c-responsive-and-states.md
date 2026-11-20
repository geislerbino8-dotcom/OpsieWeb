# Component C — responsive and state requirements

**Date:** 2026-11-20
**Component C:** FAQ accordion (`frontend/src/components/FaqSection/Faq.tsx`)
**Content:** `frontend/src/data/faqData.ts` (static import; heading is CMS via `ContentContext`)
**Mounts:** `/` (`Homepage.tsx:82`), `/what-we-do` (`WhatWeDo.tsx:185`), `/who-we-are` (`WhoWeAre.tsx:519`)

> This pass reviews the responsive and state requirements after the accessible rebuild
> ([component-c-faq-accordion.md](component-c-faq-accordion.md)) and the styling pass
> ([component-c-styling-notes.md](component-c-styling-notes.md)). The disclosure contract is
> unchanged. Two gaps were found and fixed: an inert sticky column, and a missing empty
> content state.

## 1. Requirements reviewed

Source material: `study/2026-10-26-shared-design-system.md` §4 (state matrix), §5 (focus),
§6 (no hover-only path), §7 (touch targets); `study/2026-10-26-faq-sketches.md`;
`study/2026-10-22-acceptance-criteria.md` (AC-05, AC-06, AC-07); R5 (44 px targets);
REG-21 (do not edit the unlayered global focus rule).

| Requirement | Constraint carried into this pass |
| --- | --- |
| DS §4 | Every enumerated state is either implemented or explicitly ruled not applicable. |
| DS §4 empty | An empty list must render a **text fallback**, not a blank box. |
| DS §6 | No state is the only path to an action; hover is decoration. |
| DS §7 / R5 | Every trigger stays ≥44 px tall at every breakpoint. |
| AC-05 | Accordion semantics stay intact in every state, including empty. |
| AC-06 | The `<h2>` wraps at 1024 px without overflow. |
| AC-07 | The contact action stays `<Link to="/contact-us">`. |
| REG-21 | No change to the global focus rule. |

## 2. State applicability

| State | Applies? | Treatment / reason |
| --- | --- | --- |
| Default (closed) | Yes | White card, hairline navy border, `+` chip. |
| Hover | Yes | Card tint `#F8FAFC` + `#3CBDE6/60` border. Colour only — no lift, no information revealed. |
| Focus-visible | Yes | `outline-2 outline-offset-2 outline-[#0E7490]` on triggers and the contact link; 5.36:1 on white, 4.58:1 on the page. |
| Pressed | Yes | Trigger fill `#F1F5F9`; the row does not move. |
| Open | Yes | Teal `/60` border + soft teal shadow, question/index `#0E7490`, icon rotated 45°. |
| Keyboard | Yes | Enter/Space via the native `<button>`; single-open model retained. |
| Reduced motion | Yes | The global `prefers-reduced-motion` rule (`index.css:102`) collapses transitions to 0.01 ms; the `0fr → 1fr` reveal snaps open instead of animating. |
| **Empty** | **Yes — added** | `faqs.length === 0` renders a text-fallback card with a `contact the team` link. |
| Array answer | Yes — content state | `answer: string[]` renders a `list-disc` list; now covered by a test (the shipped data only has strings). |
| Disabled | **No** | There is no disabled control. A disclosure that cannot be operated would be a defect, not a state. |
| Loading | **No** | The toggle is synchronous and local; nothing is fetched when an item opens. The CMS header fetch is handled by the heading fallback, not by a loading state here. |

Disabled and loading are recorded as **not applicable** rather than implemented, matching the
DS §4 ruling that pressed/disabled/loading are documented norms without an implementation
requirement for this component.

## 3. Responsive review

Breakpoints come from Tailwind's defaults and the classes already in the component. All
values below were measured in the 2026-11-20 browser pass.

| Width band | Layout | Measured behaviour |
| --- | --- | --- |
| 320–639 | Single column, `px-4` | Kicker only (meta and index hidden below `sm`); full-width cards; answers wrap without overflow. |
| 640 (`sm`) | Single column, `px-6` | `Answers / 05` meta and the `01`–`05` indices appear; `gap-12`. |
| 768 (`md`) | Single column, `px-10`, `py-24` | Intro centres (`text-center md:text-left` keeps the copy readable); no layout change to the list. |
| 1023 | Single column | Still stacked — one pixel below `lg`, as designed. |
| 1024 (`lg`) | Two columns: `w-1/3` header + `w-2/3` list, `gap-20` | Header column becomes `sticky` at `top-24` (96 px). |
| 1280+ | Capped at `max-w-[1280px]`, centred | Section spans the full viewport; content stays inside the 1280 px grid. |

### 3.1 Sticky column was inert (fixed)

The header column carried `lg:sticky lg:top-10` but never stuck. Two independent causes:

1. **An ancestor scroll container.** `position: sticky` is resolved against the nearest
   scroll container. Each host page wrapped its content in an overflow-clipping div, and any
   `overflow: hidden` (or `overflow-x: hidden`, which computes `overflow-y` to `auto`) turns
   that div into a scroll container:

   | Route | Ancestor before | File |
   | --- | --- | --- |
   | `/` | `div.overflow-hidden` | `pages/Homepage.tsx:18` |
   | `/what-we-do` | `div.w-full.overflow-hidden` | `pages/WhatWeDo.tsx:19` |
   | `/who-we-are` | `div.w-full.overflow-x-hidden` | `pages/WhoWeAre.tsx:29` |

   All three now use `overflow-x-clip`. `clip` keeps the horizontal clip without creating a
   scroll container, so the column can stick. `html` and `body` already use
   `overflow-x: clip` (`index.css:27,38`), so horizontal clipping is still guaranteed
   globally.

2. **Offset under the fixed header.** `lg:top-10` is 40 px, but the fixed header is
   `h-20` (80 px) and slides back into view after scrolling. The column now uses
   `lg:top-24` (96 px), leaving 15 px of clearance below the header.

**Measured after the fix** (3 routes × 1440/1024, `sticky-pin-faq.mjs`, local/untracked):

| Route | Width | `position` | `top` | Column top | Header bottom | Pinned |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 1440 | sticky | 96 px | **96 px** | 81 px | yes |
| `/` | 1024 | sticky | 96 px | **96 px** | 81 px | yes |
| `/what-we-do` | 1440 | sticky | 96 px | **96 px** | 81 px | yes |
| `/what-we-do` | 1024 | sticky | 96 px | **96 px** | 81 px | yes |
| `/who-we-are` | 1440 | sticky | 96 px | **96 px** | 81 px | yes |
| `/who-we-are` | 1024 | sticky | 96 px | **96 px** | 81 px | yes |

The kicker and `<h2>` both start at 96 px in the pinned state, i.e. below the header. The
column releases at the end of its containing row; the travel range is
`rowHeight − columnHeight` (514 − 301 = 213 px at 1440), which is expected sticky behaviour,
not a defect.

### 3.2 Overflow and bounds

3 routes × 9 widths (1440, 1280, 1024, 1023, 768, 640, 639, 375, 320) = **27 combinations**:

| Check | Result |
| --- | --- |
| Horizontal page overflow (`scrollWidth > clientWidth`) | none at any combination |
| Section bounds inside the viewport | yes at any combination |
| Triggers rendered | 5 at any combination |
| 639 → 640 / 1023 → 1024 boundaries | stacked below, two-column from `lg`; no reflow artefacts |

The `overflow-x-clip` change was re-checked against the same 27 combinations, so it did not
introduce horizontal scrolling on any host page.

## 4. Content states added

### 4.1 Empty state (DS-4)

`faqs.length === 0` now renders a single white card in the list column:

> Our FAQ is being updated. If you need an answer now, **contact the team** and we will reply
> directly.

- `border-[#0B1622]/10`, `rounded-2xl`, `shadow-sm` — same surface as a closed card, so the
  column keeps its shape.
- Body copy `#475569` on white = **7.58:1**; the link reuses the `#0E7490` treatment
  (**4.58:1** on `#ECEDF1`, focus-visible outline included).
- The kicker still renders and the meta reads `Answers / 00`; no list markup is emitted, so
  no empty `<ul>` or orphan region is exposed.
- Verified visually at 1440 and 375 by temporarily emptying `faqData.ts` (restored
  immediately; see `shots/faq-responsive/empty-{1440,375}.png`, local/untracked).

### 4.2 Array answers

`answer` is typed `string | string[]`, but every shipped item uses a string, so the list
branch had no coverage. A mocked dataset now asserts that an array answer renders
`ul.list-disc` with one `li` per entry inside the disclosure region, and that a string answer
still renders a paragraph with no `<ul>`.

## 5. Tests added

| File | Cases | Covers |
| --- | --- | --- |
| `frontend/src/test/faq-empty-state.test.tsx` | 3 | No triggers when empty; fallback copy + `Answers / 00` + contact link; heading survives; axe clean. |
| `frontend/src/test/faq-array-answer.test.tsx` | 2 | Array answer renders `ul`/`li` inside the open region; string answer stays a paragraph. |

Suite: **38/38** across 5 files (15 FAQ cases).

## 6. Verification

| Gate | Result |
| --- | --- |
| `npm test` | **38/38** pass, 5 files |
| `npx tsc -b` | clean |
| Focused ESLint (`Faq.tsx`, 3 page files, 2 new tests) | clean |
| `npm run build` | pass |
| Browser overflow pass | 27/27 combinations, no overflow, 5 triggers each |
| Browser sticky pass | 6/6 pinned at 96 px, header bottom 81 px |

Method note: the FAQ sits inside `ScrollAnimatedSection`, which fades in over 700 ms after a
300–700 ms delay. Measurements taken immediately after a programmatic scroll can read a
partial opacity (0.40 observed), so the probe waits ~1 s before sampling.

## 7. Known limitations

- **Sticky is only useful when the list outgrows the viewport.** With five closed items the
  row is 514 px tall, so on a 900 px-tall viewport the column pins only briefly before its
  row scrolls past. Opening an item grows the row and lengthens the pinned range.
- **Page-level clipping now uses `overflow-x-clip`.** Supported in current Edge, Chrome,
  Firefox, and Safari 16+. Older Safari would fall back to no clipping on that wrapper;
  `html`/`body` still clip horizontally.
- **Shared `SuperHeader` teal emphasis** (2.36:1 on light) remains latent — the current CMS
  FAQ heading contains no `*…*` span.
- **Floating chat launcher** overlaps the last card at 320–375 px; global, outside Component C.
