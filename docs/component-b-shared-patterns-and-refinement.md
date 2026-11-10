# Component B — shared UI patterns and design refinement

**Date:** 2026-11-10
**Component B:** contact inquiry form (`frontend/src/components/cards/ContactForm.tsx`)
**Mounts:** `/contact-us` (`ContactUsPage`) and `/` (`ContactUsSection`).

This note covers the two follow-up tasks: **apply shared UI patterns** and **compare against the design and refine**. The visual value list and cascade findings live in [component-b-styling-notes.md](component-b-styling-notes.md).

## 1. Shared UI patterns applied

The shared patterns are the ones the codebase already uses, as recorded in `study/components.html` and `study/2026-10-26-shared-design-system.md` (DS). Component B now uses them instead of local one-off styling.

| Pattern | Source | Applied as | Why this form |
| --- | --- | --- | --- |
| **Card recipe** — carbon surface + violet hairline + `.card-side-glow` + `transition-all duration-500` + lift | `study/components.html` §2; DS §3; `index.css:48-52` (main) | `bg-[#0a0a0a] border border-[#8B5CF6]/25 card-side-glow transition-all duration-500 hover:-translate-y-1 hover:border-[#8B5CF6]/60` | The form was missing the recipe's lift and border intensification. |
| **Pill button** — `rounded-full`, violet fill, white/black hover flip, violet glow shadow | `study/components.html` §1; `Buttons.ts:55`; `HeroPage.tsx:111` | `rounded-full ... shadow-[0_0_24px_-6px_rgba(139,92,246,0.7)] hover:bg-[#6D28D9] group-hover:hover:bg-white group-hover:hover:text-black` | Submit was using `shadow-lg` instead of the shared violet glow; pill shape was already present. |
| **Pressed state** — darken fill one step, instant | DS §4 (DS-1 norm) | `active:translate-y-0 active:bg-[#5B21B6]` (violet-800) | Adds the documented pressed state without layout shift. |
| **Disabled / loading state** — opacity + `cursor-not-allowed`, stays in tab order | DS §4 (DS-2 ruling) | `aria-disabled={loading} aria-busy={loading} opacity-50 cursor-not-allowed` plus an in-flight guard in `handleCreateInquiry` | Keeps the submit focusable and announces busy state; the guard prevents duplicate requests without native `disabled`. |
| **Field recipe** — dark translucent surface, hairline border, violet focus ring, red error state | `study/components.html` §4 | `bg-white/[0.04] border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:ring-[#8B5CF6] aria-invalid:border-[#EF4444]/70` | Already ported in the styling pass; placeholder utilities now use the canonical v4 `placeholder:text-*` form. |
| **Touch targets** — every interactive target ≥44×44 | DS §7 (R5) | Submit stays `py-4` (56 px); the success action gets `inline-flex min-h-11 items-center justify-center rounded-full px-4` | The success "Send Another Inquiry" control was a bare `text-xs` button (~16 px tall). |
| **Focus-visible** — ring clears both adjacent surfaces | DS §5 (R-B) | Fields keep the violet `focus:ring-2`; submit keeps the white `focus-visible:outline`; success action keeps the violet outline | This branch has no unlayered global `*:focus-visible` rule, so the Tailwind utilities win normally. |
| **No-hover-only** — hover is decoration only | DS §6 | The card wash, lift, label colour shifts, and submit flip all have non-hover base states; every action works by click/Enter | The form remains fully operable on touch and keyboard. |
| **4 px spacing / type scale** | DS §2-§3 | `space-y-4`, `gap-4`, `p-6 md:p-10`, `text-sm` labels/errors, `text-3xl` heading | No off-scale spacing was introduced. |

### Patterns deliberately not applied

| Pattern | Reason |
| --- | --- |
| Shared `Button` (`components/Button/Button.tsx`) for submit | It hard-codes `type="button"` and does not forward native button attributes, so it cannot be a form submit control. Changing it is a cross-cutting refactor. |
| Shared field component | None exists (`study/2026-10-27-element-inventory.md` records this as an honest gap). Admin/CMS forms use inconsistent light-theme input classes (`CreateUserModal.tsx:21`, `LoginPage.tsx:66`, etc.), so there is nothing to reuse. The local `Field` wrapper stays. |
| `ScrollAnimatedSection` instead of `data-aos` | The study recommends it as a future consolidation, but Component B is already inside `ContactUsSection`, and AOS is initialised globally (`App.tsx:45`). Swapping the wrapper is a cross-cutting animation change with an invisible-content risk if the observer never fires. |
| `hover:shadow-2xl` from the card recipe | `.card-side-glow` is unlayered, so it outranks layered shadow utilities. The glow intentionally owns the shadow; the lift and border intensification carry the hover feedback. |

## 2. Design comparison

Compared the rendered component against the finalized record at the sketch's named viewports (1440×900 desktop, 375×812 mobile) plus 320 px for the overflow bar.

| Element | Design value | Rendered value | Verdict |
| --- | --- | --- | --- |
| Card surface | `#0a0a0a` | `#0a0a0a` | Match |
| Card border | `#8B5CF6/25` → `/60` on hover | Same; hover border resolves to violet at 0.6 alpha | Match |
| Card glow | `.card-side-glow` dual side shadow | Same; visible in the 24 px-padded captures | Match |
| Card lift | `hover:-translate-y-1` | Computed `translate: 0px -4px` on hover | Match |
| Field surface / border | `white/[0.04]` / `white/10` | Same | Match |
| Field focus | violet `ring-2` | Same | Match |
| Error border / text | `#EF4444/70` / `#EF4444` | Same; hover lifts to `red-200` | Match (contrast-safe variant) |
| Submit | violet pill, white text, ≥44 px | 56 px, 5.7:1 | Match |
| Submit shadow | violet glow | `shadow-[0_0_24px_-6px_rgba(139,92,246,0.7)]` | Match |
| Pressed | darken one step | `active:bg-[#5B21B6]` | Match |
| Loading | dim + not-allowed + busy | `opacity-50`, `cursor-not-allowed`, `aria-disabled`, `aria-busy` | Match |
| Success action | ≥44 px touch target | 215×44 px at every width | Match |
| Heading / sub-copy | `text-3xl` white / `text-sm` gray | Same | Match |
| Labels | `text-sm` muted | `text-sm` `#9aa0aa` | Match |
| Card radius | `rounded-xl` (component-approved `main`) vs `rounded-2xl` (shared recipe) | `rounded-xl` | Accepted deviation (component-level approved state) |
| Card padding | `p-6` / `md:p-10` | Same | Match |
| Submit fill | violet-600 (contrast) vs `main` violet-500 | `#7C3AED` | Accepted deviation (5.7:1 vs 4.23:1) |
| Hover wash | violet-700 top (contrast) vs `main` violet-500 | `#6D28D9` | Accepted deviation (7.1:1) |
| Select hover | translucent violet vs `main` solid violet-600 | `#7C3AED/40` | Accepted deviation (keeps text contrast) |

The three contrast-driven deviations are the only intentional visual differences from `main`'s approved form. They preserve the 2026-11-06 DEF-06 fix and are recorded in [component-b-styling-notes.md](component-b-styling-notes.md) §6.

## 3. Refinements made in this pass

1. Added the shared card lift and hover border intensification.
2. Replaced `shadow-lg` on the submit with the shared violet glow shadow.
3. Added the documented pressed state (`active:bg-[#5B21B6]`, `active:translate-y-0`).
4. Moved the loading state to the DS-2 `aria-disabled` + `aria-busy` pattern (stays focusable, guard prevents duplicate submits) and aligned the dim to `opacity-50`.
5. Made the success action a ≥44 px target without changing its text-link look.
6. Switched placeholder utilities to the canonical `placeholder:text-*` form.
7. Added regression tests for the card lift, the success-action target, and the focusable loading state.

## 4. Verification

- `npm test` — **19/19 passing** (2 files): the 11 Component B cases plus the new shared-pattern cases, and the existing responsive/accessibility suite.
- `npx tsc --noEmit` — clean.
- `npm run build` — passes (only the pre-existing chunk-size warning).
- Focused `eslint` on `ContactForm.tsx`, `contact-form.test.tsx`, and `components.test.tsx` — clean.
- Browser probe — both routes at 320/375/768/1024/1440 px (10 combinations): **0 defect signals**.
  - Placeholder contrast **7.08:1**; submit contrast **5.7:1**; submit 56 px tall.
  - Success action **215×44 px** at every width.
  - Card hover computes `translate: 0px -4px` and a violet hover border.
  - Empty submit 0 API calls; success focus, failure alert, and retry unchanged.
- Screenshots — 30 local/untracked captures in `shots/component-b/`, now with 24 px padding on the card/hover shots so the glow and lift are visible.

The floating chat launcher still overlaps the form at 320 px; it is the site-wide Botpress affordance, outside Component B.
