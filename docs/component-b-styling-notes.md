# Component B — visual requirements and styling notes

**Date:** 2026-11-10 (updated 2026-11-19)
**Component B:** contact inquiry form (`frontend/src/components/cards/ContactForm.tsx`)
**Mounts:** `/contact-us` (`ContactUsPage`) and `/` (`ContactUsSection`).

> **2026-11-19:** the card now follows the linked Figma **"Redesign banner"** (node `26-3`): light surface, navy ink, teal accent, mono micro-labels, blueprint grid, and corner brackets. §1–§6 remain the record of the earlier dark/violet pass and are superseded; **§7 is the current recipe**.

## 1. Approved visual state

The styling target is the approved dark/violet recipe already shipped on `main`:

- `main:frontend/src/components/cards/ContactForm.tsx` — the styled form (carbon card, violet hairline, dark fields, violet submit).
- `study/components.html` §2 — card recipe; §4 — field recipe and error state.
- `study/2026-10-26-shared-design-system.md` §1 (tokens) · §2 (type) · §3 (spacing/radius) · §4 (state matrix) · §5 (focus) · §6 (no-hover-only) · §7 (touch).
- `study/2026-10-26-contactform-sketches.md` §3 — visible labels, required marking, error affordance.
- `study/2026-10-29-finalize-rulings.md` §3 — B2-CF-1…B2-CF-5 (labels, required, aria-invalid/describedby, placeholder-as-hint).
- `frontend/src/index.css` — current branch cascade facts.

## 2. Visual value list

Every value below is cited. Where the approved docs disagree, the component-level `main` state wins and the conflict is recorded in §6.

| Element | Value | Source |
| --- | --- | --- |
| Card surface | `bg-[#0a0a0a]` | DS §1 canvas (`index.css:34` on main); `main` ContactForm |
| Card border | `border border-[#8B5CF6]/25` | `components.html` §2 Opsie recipe; `main` ContactForm |
| Card radius | `rounded-xl` | `main` ContactForm (component-level approved state) |
| Card glow | `.card-side-glow` | DS §3 / `index.css:48-52` on main; `components.html` §2 |
| Card padding | `p-6` mobile · `md:p-10` desktop | `main` ContactForm |
| Card motion | `transition-all duration-500` + `hover:-translate-y-1 hover:border-[#8B5CF6]/60` | DS §3 card rhythm; `components.html` §2 (lift + border intensification) |
| Hover wash | `bg-gradient-to-t from-black to-[#6D28D9]`, `opacity-0 → 100`, `duration-700` | `main` ContactForm (violet stop darkened to violet-700 for white-text contrast; DS §1 violet-700 7.1:1 ✅) |
| Heading | `text-3xl font-bold text-white tracking-tight` | `main` ContactForm; DS §2 display scale |
| Sub-copy | `text-sm text-gray-400` | `main` ContactForm; DS §2 |
| Labels | `text-sm font-medium text-[#9aa0aa]` | DS §2 (form labels = `text-sm`); `components.html` §4 label color |
| Required mark | `*` in `#EF4444`, `aria-hidden` | contactform sketch §3; `components.html` §4 error-only red |
| Optional text | `(optional)` in `gray-400`, normal weight | contactform sketch §3 (label text); `main` muted copy |
| Field surface | `bg-white/[0.04]` | `components.html` §4; `main` ContactForm |
| Field border | `border-white/10` | `components.html` §4; `main` ContactForm |
| Field radius | `rounded-xl` | `components.html` §4; `main` ContactForm |
| Field padding | `px-4 py-3` (≥44 px tall) | `components.html` §4; sketch §4 (receipted boxes already ≥44) |
| Field text | `text-white` | `components.html` §4; `main` ContactForm |
| Placeholder | `placeholder-gray-400` | `components.html` §4; DS §1 contrast check |
| Select text | `text-gray-300` | `main` ContactForm |
| Field focus | `focus:ring-2 focus:ring-[#8B5CF6]`, `focus:outline-none` | `components.html` §4; DS §5 (violet-500 ≥3:1 on the dark field) |
| Error border | `aria-invalid:border-[#EF4444]/70` | `components.html` §4 error state |
| Error focus ring | `aria-invalid:focus:ring-[#EF4444]` | `components.html` §4 error state |
| Error text | `text-sm font-medium text-[#EF4444]`, hover `red-200` | `components.html` §4; DS §1 (validation-only red); red-200 keeps ≥4.5:1 on the violet-700 hover wash |
| Submit shape | `rounded-full` (pill) | `components.html` §1 house rule; `main` ContactForm |
| Submit fill | `bg-[#7C3AED]`, hover `#6D28D9` | DS §1 violet-600 5.9:1 ✅ / violet-700 7.1:1 ✅ (see §6) |
| Submit text | `text-white font-bold`, `py-4` (≥44 px) | `main` ContactForm; sketch §4 touch bar |
| Submit motion | `hover:-translate-y-0.5`, `duration-300` | `components.html` §1; DS §4 pressed/hover norms |
| Submit shadow | `shadow-[0_0_24px_-6px_rgba(139,92,246,0.7)]` | `components.html` §1 shared violet CTA glow |
| Submit pressed | `active:translate-y-0 active:bg-[#5B21B6]` | DS §4 pressed norm (DS-1) |
| Submit disabled/loading | `opacity-50 cursor-not-allowed`, `aria-disabled` + `aria-busy`, stays focusable | DS §4 disabled/loading norm (DS-2/DS-3) |
| Success action touch | `inline-flex min-h-11 items-center justify-center rounded-full px-4` | DS §7 (R5 ≥44×44) |
| Submit focus | `focus-visible:outline-2 outline-offset-2 outline-white` | DS §5 R-B (white clears the violet fill 5.7:1 and the card 19.8:1) |
| Server-error box | `border-red-400/40 bg-red-500/10 text-red-300` | DS §1 (validation-only red); dark-surface adaptation of the prior box |
| Success icon | `bg-green-500/15 text-green-400 border-white/20` | `main` ContactForm |
| Success text | `text-white` heading · `text-gray-400` body | `main` ContactForm |
| Success action | `text-[#8B5CF6]` hover `#A78BFA` | `main` ContactForm; DS §1 violet-500 4.65:1 on canvas |
| Type family | Montserrat default | DS §2 (`index.css:26-30`) |
| Spacing | 4 px scale | DS §3; `components.html` header |

## 3. Cascade findings on this branch

1. **`button { border-radius: 0 }` is unlayered** (`frontend/src/index.css:106-108`). Unlayered CSS outranks Tailwind's `@layer utilities`, so `rounded-full` on the submit rendered square (confirmed in the 2026-11-09 screenshots). `main` removed this rule for exactly this reason. Fix: remove it.
2. **`.card-side-glow` does not exist on this branch.** `main` defines it as an unlayered rule (`index.css:48-52`). Fix: add the same rule.
3. **No global `*:focus-visible` rule on this branch** (the study's `index.css:336` rule is a `main`-only line). Tailwind `focus:*` utilities therefore work normally here; the form uses them directly and does not need an R-B override.
4. **`* { font-family: Montserrat }` is unlayered here**, so `font-poppins` would not win. The form uses the default Montserrat, which is the DS body face — no change needed.

## 4. Implementation

- Ported `main`'s card, hover wash, field, select, submit, success, and link styling into the branch's form.
- Kept the 2026-11-09 visible labels, per-field validation, `aria-invalid`/`aria-describedby`, focus-to-first-invalid, retry, and success focus.
- Added `.card-side-glow` to `index.css` and removed the unlayered `button { border-radius: 0 }` reset.
- Submit fill uses violet-600/violet-700 instead of `main`'s violet-500 so white text clears 4.5:1 (see §6).
- Error and server-error surfaces were adapted for the dark card; the validation-only red token is unchanged.

## 5. Rendering check

**Automated**

- `npm test` — **19/19 passing** (2 files). The contrast test asserts `placeholder:text-gray-400`, `bg-[#7C3AED]`, `text-white`, `rounded-full`, and the shared violet shadow; new cases cover the card lift, the success-action touch target, and the focusable loading state.
- `npx tsc --noEmit` — clean.
- `npm run build` — passes (only the pre-existing chunk-size warning).
- Focused `eslint` on `ContactForm.tsx` and `contact-form.test.tsx` — clean.

**Browser probe** — both mount routes at 320/375/768/1024/1440 px (10 combinations): **0 defect signals.**

| Check | Result |
| --- | --- |
| Horizontal overflow | `false` on all 10 combinations, including the long-content pass. |
| Visible labels / required / autocomplete | Unchanged from 2026-11-09: all 8 labels visible; 6 required; `name`/`email`/`tel`/`street-address` present. |
| Empty submit | 0 API calls; 6 fields marked invalid; focus moves to `inquiry-name`. |
| Placeholder contrast | **7.08:1** on the composited `white/[0.04]` field over the carbon card. |
| Submit contrast | **5.7:1** (violet-600 fill, white text), 56 px tall at every width. |
| Success action | **215×44 px** at every width (R5 touch bar). |
| Card hover | Computed `translate: 0px -4px`; hover border resolves to violet at 0.6 alpha. |
| Success | `role="status"`, `aria-live="polite"`, form removed, focus moved to the panel. |
| Failure / retry | Inline `role="alert"`, submit stays enabled, retry reaches the API (`before=2`, `after=3`). |
| Hover wash | Overlay reaches opacity 1 on desktop hover; submit contrast remains 5.7:1. |

**Screenshots** — 30 local/untracked captures in `shots/component-b/`: `after_{320,375,768,1024,1440}_{form,card,hover,validation,success,error}.png`. Visual review confirms the carbon card with violet hairline and glow, dark translucent fields, violet pill submit, red error borders/text, and a readable violet-700 hover wash.

**Note** — the floating chat launcher overlaps the form clip at 320 px. It is the site-wide Botpress affordance (already recorded in the 2026-11-06 QA doc as outside Component B), not a form element.

## 6. Recorded deviations

| Deviation | Reason |
| --- | --- |
| Submit `bg-[#7C3AED]` (violet-600) instead of `main`'s `bg-[#8B5CF6]` (violet-500) | DS §1: white on violet-500 is **4.23:1** (fails <18 px/400); violet-600 is **5.9:1** ✅ and violet-700 hover is **7.1:1** ✅. This preserves the 2026-11-06 DEF-06 contrast fix instead of regressing it. |
| Labels use `text-sm` rather than `components.html`'s `text-[13px]` | DS §2 lists `text-sm` as the form-label size; 14 px is the approved scale token. |
| Card radius `rounded-xl` / padding `md:p-10 p-6` rather than DS §3's `rounded-lg` / `p-4` | DS §3 derives card radius/padding from the hero CTA (`HeroPage.tsx:99`); the component-level approved state for Component B is `main`'s ContactForm, which uses `rounded-xl` and `md:p-10 p-6`. |
| Error text `text-sm` rather than `components.html`'s `text-[11px]` | 11 px is below the DS type scale; `text-sm` matches the approved form-label token and keeps the error readable. |
| Hover-wash top `#6D28D9` (violet-700) instead of `main`'s `#8B5CF6` (violet-500) | White labels/headings sit on the wash top on hover; violet-500 gives 4.23:1, violet-700 gives 7.1:1 ✅. The wash stays violet and the bottom remains black. |
| Hover error/asterisk `red-200` instead of `red-300` | On the violet-700 wash, red-300 is ~3.75:1; red-200 is ~4.9:1 ✅. The default error color stays `#EF4444` (5.24:1 on the card). |
| Submit uses `aria-disabled` instead of native `disabled` | DS-2 ruled that the disabled state stays in tab order via `aria-disabled`; the handler guard prevents duplicate in-flight requests. The prior native `disabled` was removed. |

## 7. Figma redesign pass — current recipe (2026-11-19)

Source: Figma **"Redesign banner"**, node `26-3` (light frame, teal accent `#3CBDE6`, navy panel `#0B1622`, mono uppercase micro-labels, blueprint grid, corner brackets). The contact page is already light (`#ECEDF1`) with teal and `#242424` panels, so the banner's language maps directly onto the form. All measured values below come from the 2026-11-19 browser pass (`shots/redesign/verify-results.json`, local/untracked).

| Element | Value | Measured / note |
| --- | --- | --- |
| Card surface | `bg-white` | 18.23:1 for the heading |
| Card border / radius | `border-[#0B1622]/10`, `rounded-2xl` | — |
| Card shadow | `shadow-[0_24px_60px_-28px_rgba(11,22,34,0.35)]` | navy-tinted, replaces the violet side-glow |
| Card motion | `hover:-translate-y-1`, `hover:border-[#3CBDE6]/60`, teal shadow | measured `translate: 0px -4px` |
| Blueprint grid | 32 px lines at `rgba(11,22,34,0.05)`, radial mask to 80 % | decorative, `aria-hidden` |
| Corner brackets | 16 px, 2 px `#3CBDE6`, four corners | decorative, `aria-hidden` |
| Eyebrow | `Opsie Control // Inquiry`, `font-mono-label` 9–10 px uppercase, `#0E7490` | 5.36:1 on white |
| Eyebrow meta | `Form / 01`, mono 10 px `#64748B`, `hidden sm:inline` | hidden at 320 so the row fits |
| Heading | `text-3xl font-bold text-[#0B1622]` | 18.23:1 |
| Sub-copy | `text-sm text-[#475569]` | 7.58:1 |
| Labels | `font-mono-label` 11 px uppercase, `tracking-[0.14em]`, `#475569` | 7.58:1 |
| Required mark | `*` in `#B91C1C` | 6.52:1 |
| Optional text | `(optional)` in `#5B6B7A`, normal weight | 5.47:1 on white |
| Field surface | `bg-[#F4F7F9]` | — |
| Field border | `border-[#C9D5DE]` | — |
| Field text | `text-[#0B1622]` | 18.23:1 |
| Placeholder | `placeholder:text-[#5B6B7A]` | **5.1:1** on `#F4F7F9` |
| Field focus | `focus:ring-2 focus:ring-[#0E7490]`, `focus:border-[#0E7490]` | 5.36:1 on white |
| Error border / ring | `#B91C1C` | 6.52:1 |
| Error text | `text-[#B91C1C]` | 6.52:1 |
| Submit fill | `bg-[#3CBDE6]`, text `#06212E` | **7.6:1** |
| Submit hover | `hover:bg-[#29A6CC]`, same text | 5.87:1 |
| Submit pressed | `active:bg-[#1F93B5]`, same text | **4.66:1** (the first draft `#1E8FB0` measured 4.44:1 and was lightened) |
| Submit shape / motion | `rounded-full`, `py-4` (52 px), `hover:-translate-y-0.5`, `active:translate-y-0` | touch target 52 px |
| Submit focus | `focus-visible:outline-2 outline-offset-2 outline-[#0B1622]` | 18.23:1 on white |
| Loading | `bg-[#3CBDE6] opacity-50 cursor-not-allowed`, `aria-disabled` + `aria-busy` | disabled state is contrast-exempt |
| Server-error box | `border-[#B91C1C]/30 bg-[#B91C1C]/5 text-[#B91C1C]` | 6.2:1 composited |
| Success icon | `bg-[#3CBDE6]/15 text-[#0E7490] border-[#3CBDE6]/30` | 5.36:1 |
| Success eyebrow | `Transmission complete`, mono 10 px `#0E7490` | 5.36:1 |
| Success heading / body | `#0B1622` / `#475569` | 18.23:1 / 7.58:1 |
| Success action | `text-[#0E7490]`, hover `#0B5E73`, `min-h-11` | 5.36:1, 44 px tall |

### What was removed

- The violet hover wash (`bg-gradient-to-t from-black to-[#6D28D9]`) and every `group-hover:text-white` swap. On a white card those swaps would have produced white text on white.
- `.card-side-glow` from `index.css` (only Component B used it); the card now uses a navy-tinted Tailwind shadow.
- The `group-hover:hover:active:bg-[#5B21B6]` specificity workaround. With the white-fill hover recipe gone, the pressed fill no longer competes with an ancestor hover rule.

### Mono type and the cascade

`font-mono` cannot be used directly: `index.css:20` has an unlayered `* { font-family: 'Montserrat', sans-serif }`, which outranks Tailwind's layered utilities. A scoped unlayered `.font-mono-label` class was added next to the removed `.card-side-glow` rule. No global focus rule was touched (the study's `index.css:336` rule is absent on this branch).

