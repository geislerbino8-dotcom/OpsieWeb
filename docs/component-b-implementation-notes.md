# Component B — requirements, reuse, and implementation notes

**Date:** 2026-11-09
**Component B:** contact inquiry form (`frontend/src/components/cards/ContactForm.tsx`)
**Mounts:** `/contact-us` (`ContactUsPage`) and `/` (`ContactUsSection`); not `/book-a-schedule`.

## 1. Requirements review

Sources:

- `study/2026-10-26-contactform-sketches.md` — field roster, label/error proposal, 0px overflow bar, touch-target bar.
- `study/2026-10-26-shared-design-system.md` — tokens, state matrix, focus rule, no-hover-only rule.
- `study/components.html` §4 — the existing field recipe.
- `docs/component-b-contact-form-qa.md` — defects DEF-01…DEF-07 and their fixes.

### Content roster (8 fields, DOM order)

| Field | Control | Required | Autocomplete | Notes |
| --- | --- | --- | --- | --- |
| Full name | `text` | Yes | `name` | Visible label + `*` |
| Email address | `email` | Yes | `email` | Visible label + `*`; validate format |
| Phone number | `tel` | No | `tel` | Label includes “(optional)” |
| Address | `text` | No | `street-address` | Label includes “(optional)” |
| Project or inquiry details | `textarea` | Yes | — | Visible label + `*` |
| Platform | `select` | Yes | — | Windows/macOS/Linux/Android/iOS/Web |
| Product | `select` | Yes | — | Driven by `productsData` |
| Inquiry category | `select` | Yes | — | Inquiry/Question/Complaint/Bug Report/Feature Request |

### Structure and state requirements

- Real visible `<label for="…">` on all 8 controls, with matching `id` (study §3 proposal; the current implementation uses `sr-only` labels).
- Keep the placeholder as a hint, not the accessible name.
- Required state exposed natively with `required`; the asterisk is decorative.
- Per-field validation feedback: `aria-invalid` and `aria-describedby` pointing at the field's error text (study §3 error-affordance proposal; QA CB-04/CB-07).
- Submit only while the request is in flight; retry after failure (DEF-02).
- Success confirmation focused and announced (DEF-05/CB-03).
- Contrast: labels and error text ≥4.5:1; placeholder ≥4.5:1; submit ≥4.5:1 (DEF-06/DEF-07).
- Touch targets ≥44px (already 56px).
- No horizontal page overflow at 320/375/768/1024; desktop 1440×900 primary.
- Do not edit the unlayered `index.css:336` focus rule; it remains the visible focus indicator.
- No hover-only interaction paths.

## 2. Reuse review

| Existing code | Reuse decision | Reason |
| --- | --- | --- |
| `createTicket` (`src/api/createTicket.ts`) | Reuse as-is | Owns the API call and error surface. |
| `products` (`src/data/productsData.ts`) | Reuse as-is | Product options already come from the catalog. |
| Field recipe (`study/components.html` §4; current `ContactForm` classes) | Reuse | `bg-gray-50`, `border-gray-200`, `rounded-xl`, `px-4 py-3`, `placeholder-gray-500`, focus ring, 56px height. |
| `#3CBDE6` brand + `#0B6A86` contrast-safe accent | Reuse | Established in the prior QA pass. |
| Global focus rule (`index.css:336`) | Reuse, do not override | Unlayered rule outranks layered Tailwind utilities; it is the site-wide visible focus indicator. |
| `getErrorMessage` helper | Keep | Classifies 429/5xx/4xx/network failures. |
| `Button` (`components/Button/Button.tsx`) | Do **not** reuse for submit | It hard-codes `type="button"`, lacks native prop forwarding/`aria-*`, and is used by four other components; changing it is a cross-cutting refactor outside Component B. |
| `PrimaryButton` / `BlackButton` | Do **not** reuse | No `type`, `disabled`, or full-width submit semantics; `BlackButton` is em-based and unused by the form. |
| `Form.tsx` (orphan) | Do **not** import | It has visible-label markup but no styles, validation, or data wiring, and zero importers. Its structure informs the new labels. |
| `useToast` / `ToastContainer` | Not reused in the form | The prior pass replaced the transient toast with a persistent inline `role="alert"`; the shared toast still serves admin/CMS screens. |

### Reuse conclusion

The highest-value reuse is the existing field recipe, catalog data, API helper, error classifier, and focus rule. A shared field abstraction does not exist; the form gets a small local field wrapper instead of a new cross-cutting component.

## 3. Implementation

- Replace the `sr-only` labels with visible labels above each control.
- Add a local `Field` wrapper that renders the label, control slot, and error text consistently.
- Validate on submit with `noValidate` so the form can render per-field messages and move focus to the first invalid field.
- Keep native `required` attributes for semantics and `:invalid` styling/tests.
- Clear a field's error as soon as the user edits it.
- Keep the success panel, server-error alert, retry behavior, autocomplete tokens, and contrast-safe colors from the prior pass.
- Keep the existing two-column desktop grid and single-column mobile stack.

## 4. Rendering check

### Browser probe

A CDP probe (`component-b-probe.mjs`, local/untracked) ran both mount routes (`/contact-us` and `/`) at 320, 375, 768, 1024, and 1440 px — 10 combinations. **0 defect signals.**

| Check | Result |
| --- | --- |
| Horizontal overflow | `false` on all 10 combinations (including a long unbroken string); `scrollWidth` equals the viewport width. |
| Visible labels | All 8 controls have a real visible label in DOM order: `Full name*`, `Email address*`, `Phone number (optional)`, `Address (optional)`, `Project or inquiry details*`, `Platform*`, `Product*`, `Inquiry category*`. |
| Required semantics | `required` on name, email, description, platform, product, category; phone and address optional. |
| Autocomplete | `name`, `email`, `tel`, `street-address` present on the four text inputs. |
| Empty submit | 0 API calls; 6 fields marked invalid and focused first (`inquiry-name`). |
| Placeholder contrast | **4.63:1** (≥4.5:1). |
| Submit contrast | **8.75:1**, 238×56 px at 320 px (≥4.5:1, ≥44 px). |
| Success | Panel announced (`role="status"`, `aria-live="polite"`), form removed, focus moved to the panel (`statusFocused=true`). |
| Failure | Inline `role="alert"` with classified message; submit stays enabled and retryable (`disabled=false`). |
| Retry | Second submit reaches the API and succeeds (`before=2`, `after=3` calls). |

### Automated checks

- `npm test` — **17/17 passing** across the full suite, including 11 Component B cases (success, server errors, retry, autocomplete, contrast classes, per-field validation, email format, error clearing).
- `npm run build` — passes (only the pre-existing chunk-size warning).
- Focused `eslint` on `ContactForm.tsx` and `contact-form.test.tsx` — clean.

### Screenshots

20 local/untracked screenshots in `shots/component-b/` (not committed): `after_{320,375,768,1024,1440}_{form,validation,success,error}.png`. Visual review confirms visible labels, red error borders/text, and no clipped or overflowing content. At 320 px the form measures 238 px wide; the validation state grows vertically (1020 → 1216 px) without horizontal overflow.

### Notes

- The unlayered `index.css:336` focus rule is unchanged and remains the visible focus indicator.
- The success/failure/retry behavior from the 2026-11-06 pass is preserved; this pass only changed label structure and validation presentation.
