# Component B — visual requirements and styling notes

**Date:** 2026-11-10
**Component B:** contact inquiry form (`frontend/src/components/cards/ContactForm.tsx`)
**Mounts:** `/contact-us` (`ContactUsPage`) and `/` (`ContactUsSection`).

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
| Card motion | `transition-all duration-500` | DS §3 card rhythm; `components.html` §2 |
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
| Submit disabled/loading | `opacity-60 cursor-not-allowed` | DS §4 disabled norm (opacity + cursor) |
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

- `npm test` — **17/17 passing** (2 files). The contrast test now asserts `placeholder-gray-400`, `bg-[#7C3AED]`, `text-white`, and `rounded-full`.
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
