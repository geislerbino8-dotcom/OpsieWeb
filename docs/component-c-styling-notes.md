# Component C — visual requirements and styling notes

**Date:** 2026-11-19
**Component C:** FAQ accordion (`frontend/src/components/FaqSection/Faq.tsx`)
**Content:** `frontend/src/data/faqData.ts` (static import; heading is CMS via `ContentContext`)
**Mounts:** `/` (`Homepage.tsx:82`), `/what-we-do` (`WhatWeDo.tsx:185`), `/who-we-are` (`WhoWeAre.tsx:519`)

> This is the styling pass that follows the accessible rebuild. The disclosure contract
> (`aria-expanded`/`aria-controls`, `role="region"`/`aria-labelledby`, `<h3>`-wrapped
> triggers, single-open model, Enter/Space) is unchanged. The visual language is the same
> Figma **"Redesign banner"** (node `26-3`) recipe used by Component B: white cards, navy
> ink `#0B1622`, teal `#3CBDE6`/`#0E7490`, and mono micro-labels.

## 1. Requirements reviewed

Source material: `study/2026-10-26-faq-sketches.md`, `study/2026-10-26-shared-design-system.md`
(§1 tokens, §2 type, §3 spacing/radius, §4 state matrix, §5 focus, §6 no-hover-only, §7 touch),
`study/2026-10-22-acceptance-criteria.md` (AC-05, AC-06, AC-07), the D4 radius waiver in
`study/2026-10-19-layout-typography-content-audit.md`, and `docs/component-b-styling-notes.md`
§7 for the current Figma recipe.

| Requirement | Constraint carried into the styling |
| --- | --- |
| AC-05 | Accordion semantics stay intact; the trigger is a native `<button>` inside `<h3>`. |
| AC-06 | The `<h2>` wraps at 1024 px without overflow. |
| AC-07 | The contact action must be `<Link to="/contact-us">`, not a raw `<a>`. |
| R5 / touch | Every trigger stays ≥44 px tall (full-width row). |
| REG-25 | Focus indicator ≥3:1 against **both** the card and the page surface. |
| DS §6 | No hover-only path: every action is reachable by click/keyboard. |
| D4 waiver | The full-width trigger keeps the accordion radius exception (no pill radius). |
| REG-21 | The unlayered global focus rule is not edited (absent on this branch anyway). |

## 2. Visual value list

Measured from computed styles in the 2026-11-19 browser pass
(`shots/faq-style/style-results.json`, local/untracked).

| Element | Value | Measured / note |
| --- | --- | --- |
| Kicker | `Opsie Support // FAQ`, `.font-mono-label`, 9 px → 10 px at `sm`, `tracking-[0.14em]`, `#0E7490` | 4.58:1 on `#ECEDF1`; ui-monospace wins over the global Montserrat rule |
| Kicker dot | 6 px `#3CBDE6` circle, `aria-hidden` | decorative |
| Kicker meta | `Answers / 05`, mono 10 px `#475569`, `hidden sm:inline`, `aria-hidden` | 6.48:1; hidden below 640 px so the row fits |
| Section heading | CMS `faqSection.header`, gray-900, 48 px | 15.17:1 on `#ECEDF1`; fallback “Frequently asked questions” |
| Intro | 18 px `font-light` `#475569`, `max-w-sm` | 6.48:1 on `#ECEDF1` (was `text-gray-500` at 4.13:1) |
| Contact link | `<Link to="/contact-us">`, `#0E7490`, `font-medium`, hover underline | 4.58:1 on `#ECEDF1` |
| Optional emphasized heading words | `SuperHeader` `emphasisColor="#0E7490"` | 4.58:1 on `#ECEDF1`; default brand teal remains available on dark surfaces |
| Card surface | `bg-white`, `rounded-2xl` | radius supplies the D4 visible corners |
| Card border | `border-[#0B1622]/10` | hairline navy |
| Card shadow (closed) | `shadow-sm` | keeps the list quiet |
| Closed question | 16 px → 18 px at `sm`, `font-semibold`, `#0B1622` | 18.23:1 on white |
| Closed index | `01`–`05`, mono 11 px `tabular-nums`, `#64748B`, `aria-hidden`, hidden below `sm` | 4.76:1 |
| Closed icon chip | 32 px circle, `bg-[#ECEDF1]`, `#0B1622`, `ring-1 ring-inset ring-[#0B1622]/5` | — |
| Closed hover | card `hover:bg-[#F8FAFC]`, `hover:border-[#3CBDE6]/60` | colour only, no lift |
| Pressed trigger | `active:bg-[#F1F5F9]` | measured `rgb(241,245,249)` |
| Open card | `border-[#3CBDE6]/60`, `shadow-[0_20px_40px_rgba(60,189,230,0.14)]` | softer than B's single-card shadow |
| Open question / index | `#0E7490` | 5.36:1 on white |
| Open icon chip | `bg-[#3CBDE6]`, icon `#06212E`, `rotate-45` | 7.6:1; `+` becomes `×` |
| Answer | 15 px → 16 px, `#475569`, `leading-relaxed` | 7.58:1 on white |
| Answer indent | `sm:pl-[26px]` | aligns with the question text past the 2-digit index |
| Answer divider | `border-t border-[#0B1622]/10` | matches the card border |
| Focus-visible | `outline-2 outline-offset-2 outline-[#0E7490]` | 5.36:1 on white, 4.58:1 on the page |

## 3. State matrix

| State | Treatment |
| --- | --- |
| Closed | White card, navy hairline, navy question, grey index, grey icon chip with `+`. |
| Closed hover | `#F8FAFC` card tint + teal `/60` border. Decoration only. |
| Pressed | Trigger fills `#F1F5F9`; the row does not move. |
| Open | Teal `/60` border + soft teal glow, teal question/index, teal icon chip with `×`. |
| Focus-visible | 2 px `#0E7490` outline at 2 px offset on the trigger and the contact link. |
| Keyboard | Enter/Space operate the native button; single-open model unchanged. |
| Empty | Text-fallback card with a `/contact-us` link; `Answers / 00` remains visible from `faqs.length`. |
| Reduced motion | `index.css:102` collapses every transition to 0.01 ms. |

## 4. Shared patterns

**Applied**

- Mono kicker row with a teal dot and a right-aligned `Answers / 05` meta — the same
  `font-mono-label` 9/10 px `tracking-[0.14em]` recipe as Component B's
  `Opsie Control // Inquiry` / `Form / 01`.
- White card + navy ink + teal accent; `border-[#0B1622]/10`; `rounded-2xl`; teal
  `hover:border-[#3CBDE6]/60` — identical tokens to B's card.
- `#475569` secondary copy; `#0E7490` interactive accent; `focus-visible:outline-2
  outline-offset-2`.
- No hover-only paths; the row is a full-width native button.

**Skipped, with reason**

| Pattern | Why it is not on the FAQ |
| --- | --- |
| Card hover lift (`hover:-translate-y-1`) | Five stacked rows would shift under the pointer as the user moves down the list; the tint + border carry hover without layout movement or pointer flicker. |
| Corner brackets | They frame B's single form card. Repeating four brackets on five rows would read as noise and compete with the index/icon. |
| Blueprint grid | A single-card decoration; not meaningful on a list of rows. |
| Deep navy card shadow | Five large shadows would be heavy. The open row gets a softer teal glow so the expanded item is the only elevated surface. |
| Meta colour `#64748B` (B) | B's meta sits on the white card (4.76:1). C's meta sits on `#ECEDF1`, where `#64748B` is **4.07:1**; `#475569` is **6.48:1**. |
| Pill trigger radius | The D4 waiver keeps the full-width accordion row out of the site's `rounded-full` button rule; `rounded-2xl` matches the card. |

## 5. Refinements after comparing with the design

1. **Kicker row** added above the heading so the FAQ matches B's eyebrow rhythm and
   gives the otherwise plain left column a Figma-native anchor.
2. **Closed hover tint** (`#F8FAFC`) added to the existing teal border; previously hover
   only changed the border.
3. **Pressed fill** (`#F1F5F9`) added so pointer-down has feedback without moving the row.
4. **Open index turns teal** with the question; previously it stayed grey while the
   question changed colour.
5. **Icon inset ring** added to the closed chip so the grey disc has an edge on white.
6. **Answer indent** (`sm:pl-[26px]`) added so prose aligns with the question text rather
   than the index column.
7. **Raw `<a>` → `<Link>`** closes AC-07; the tests now render inside `MemoryRouter`.
8. **Emphasis border aligned to `/60`** to match B's teal emphasis token exactly.

## 6. Rendering check (2026-11-19)

**Automated gates**

| Gate | Result |
| --- | --- |
| Vitest | **33/33** pass across 3 files (10 FAQ cases) |
| `npx tsc -b` | clean |
| Focused ESLint (`Faq.tsx`, `faq-accordion.test.tsx`, `components.test.tsx`) | clean |
| `npm run build` | pass |
| axe (`faq-accordion.test.tsx`) | 0 violations (colour-contrast disabled in axe; measured below) |

**Browser pass** (`audit-faq-style.mjs` / `open-faq.mjs` / `focus-active-faq.mjs`,
local/untracked; Edge via CDP)

All three mounts × 1440/1024/768/375/320 = **15 combinations**.

| Check | Result |
| --- | --- |
| Triggers rendered | 5 on every combination |
| Horizontal overflow | none on any combination |
| Trigger heights | 72–112 px (all ≥44 px) |
| Heading-wrapped triggers | 5/5 |
| `role="region"` + `aria-labelledby` | 5/5 |
| Kicker / meta | present at every width; meta hidden below 640 px as designed |
| CMS heading | “Frequently asked questions” everywhere; fallback holds with the CMS request blocked |

**Interaction states** (`open-faq.mjs`, settled by polling computed values)

| State | 1440 px | 375 px | 320 px |
| --- | --- | --- | --- |
| Open: `aria-expanded` / `aria-hidden` | `true` / `false` | `true` / `false` | `true` / `false` |
| Open: answer height | 135 px | 195 px | 220 px |
| Open: question + index | `rgb(14,116,144)` | `rgb(14,116,144)` | `rgb(14,116,144)` |
| Open: icon | `rgb(60,189,230)`, `45deg` | same | same |
| Open: border / shadow | teal `/60` + `rgba(60,189,230,0.14)` | same | same |
| Closed hover | card `rgb(249,251,252)` → `#F8FAFC` | `#F8FAFC` | `#F8FAFC` |
| Pressed | `:active` true | `rgb(241,245,249)` | `rgb(241,245,249)` |
| Focus-visible (keyboard Tab) | 2 px `#0E7490`, offset 2 px | 2 px `#0E7490`, offset 2 px | — |

**Contrast**

| Element | Ratio | Bar |
| --- | --- | --- |
| Heading gray-900 on `#ECEDF1` | **15.17:1** | 4.5:1 ✅ |
| Kicker `#0E7490` on `#ECEDF1` | **4.58:1** | 4.5:1 ✅ |
| Kicker meta `#475569` on `#ECEDF1` | **6.48:1** | 4.5:1 ✅ |
| Intro `#475569` on `#ECEDF1` | **6.48:1** | 4.5:1 ✅ |
| Contact link `#0E7490` on `#ECEDF1` | **4.58:1** | 4.5:1 ✅ |
| Closed question `#0B1622` on white | **18.23:1** | 4.5:1 ✅ |
| Closed index `#64748B` on white | **4.76:1** | 4.5:1 ✅ |
| Open question/index `#0E7490` on white | **5.36:1** | 4.5:1 ✅ |
| Answer `#475569` on white | **7.58:1** | 4.5:1 ✅ |
| Open icon `#06212E` on `#3CBDE6` | **7.6:1** | 4.5:1 ✅ |
| Focus outline `#0E7490` on white / `#ECEDF1` | **5.36:1 / 4.58:1** | 3:1 ✅ |

Screenshots: `shots/faq-style/c-home-*.png`, `c-what-we-do-*.png`,
`c-who-we-are-*.png` (closed, five widths) and `c-home-open-*.png` (five widths).
Structured results: `shots/faq-style/style-results.json` and `open-results.json`
(local/untracked).

## 7. Known limitations

- **Resolved: emphasized FAQ heading words use contrast-safe teal.** Component C passes
  `emphasisColor="#0E7490"` to `SuperHeader` (4.58:1 on `#ECEDF1`); the default
  `#3CBDE6` remains unchanged on other surfaces.
- **App-level CMS failure.** With the content request blocked, `App.fetchContent` throws an
  unhandled `TypeError` on `res.data`; the FAQ still renders its fallback heading.
- **Floating chat launcher.** Botpress's `#fab-root` overlaps the FAQ at 320–375 px when
  scrolled to the bottom. It is a global affordance, hidden in the QA captures.
- **Empty state.** The DS-4 text fallback is implemented and covered by the responsive/state
  pass; the statically imported FAQ data means it appears only if that data array is empty.
