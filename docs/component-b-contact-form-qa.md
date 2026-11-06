# Component B QA — contact inquiry form

Component B is the contact inquiry form (`frontend/src/components/cards/ContactForm.tsx`).
It renders on two routes:

- `/contact-us` — `ContactUsPage` → `ContactForm`
- `/` — home page `ContactUsSection` → `ContactForm`

It is **not** rendered on `/book-a-schedule`; the earlier note in
[responsive-accessibility-qa.md](responsive-accessibility-qa.md) that placed the form
on the booking page is corrected here.

## Test environment

| Item | Value |
| --- | --- |
| Frontend | Vite dev server, `http://localhost:5173` |
| API | Local mock on `http://localhost:5000` with `POST /api/ticket/create` |
| Browser | Headless Microsoft Edge via CDP (`component-b-probe.mjs`) |
| Viewports | 320, 375, 768, 1024, 1440 CSS px |
| Routes | `/contact-us`, `/` |
| Mock modes | `success` (200), `error` (500), `rate` (429), `slow` (3 s) |
| Automated suite | Vitest + Testing Library (`src/test/contact-form.test.tsx`) |

Structured evidence: `shots/component-b/probe-results.json` (working tree only).
Probe transcript: `component-b-probe.log`.

## Scenarios

| ID | Scenario | Steps | Expected result |
| --- | --- | --- | --- |
| CB-01 | Default render and field inventory | Open each route at each viewport. | All 8 controls render, each has a programmatic label, no horizontal page scroll, form stays inside its card. |
| CB-02 | Required-field validation | Submit the empty form. | Browser blocks submission, no API call is made, and every required control is reported invalid. |
| CB-03 | Successful submission | Fill required fields with valid data, choose platform/product/category, submit while the mock is in `success` mode. | Request is sent, form is replaced by the confirmation panel, panel has `role="status"` and `aria-live="polite"`, and focus moves to the confirmation. |
| CB-04 | Server failure (500) | Fill the form, submit in `error` mode. | A non-rate-limit error message is shown, the error is announced, and the form stays usable. |
| CB-05 | Rate limit (429) | Fill the form, submit in `rate` mode. | A rate-limit-specific message is shown and announced. |
| CB-06 | Retry after failure | After CB-04, submit again in `success` mode without reloading. | The second request is sent and succeeds; the submit control is never permanently disabled. |
| CB-07 | Error announcement | Inspect the failure feedback in the accessibility tree. | Feedback has `role="alert"` (or an `aria-live` region) and is not conveyed by colour alone. |
| CB-08 | Autofill support | Inspect identity fields for `autocomplete`. | Name, email, phone, and address expose `name`, `email`, `tel`, and `street-address` tokens. |
| CB-09 | Success focus management | Submit successfully, then inspect `document.activeElement`. | Focus lands on the confirmation panel, not `BODY`. |
| CB-10 | Keyboard and focus visibility | Tab through every control and activate submit with the keyboard. | Visible focus ring on each control; submit is reachable and operable. |
| CB-11 | Contrast — submit | Measure computed foreground/background of the submit button in default and hover states. | Text contrast ≥ 4.5:1 at all times. |
| CB-12 | Contrast — placeholder | Measure computed placeholder colour against the field background. | Placeholder contrast ≥ 4.5:1. |
| CB-13 | Long content | Enter very long unbroken name, email, address, and description values. | No page-level horizontal scroll and no clipped field content. |
| CB-14 | Touch targets | Measure control heights at 320–768 px. | Interactive controls are at least 44 × 44 CSS px. |
| CB-15 | Hover treatment | Hover the card at ≥1024 px. | Overlay and button states remain readable; contrast does not regress. |

## Results before fixes

Executed 2026-11-06 across 10 route/viewport combinations (2 routes × 5 widths).
The probe emitted **69 defect signals**; all 7 defect classes reproduced on every
route/viewport combination.

| Defect | Severity | Scenario | Observation | Evidence |
| --- | --- | --- | --- | --- |
| DEF-01 Autocomplete missing | Medium | CB-08 | No `autocomplete` token on any of the 8 controls. | `autocomplete` map is `null` for every field at all 10 combinations. |
| DEF-02 No retry after failure | High | CB-06 | Any failed request sets `disabled` and it is never reset. Button reads "Sorry, please try again later" and no further request can be sent without reloading. | Retry probe: `{"retryable":false,"disabled":true,"before":2,"after":2}` at all 10 combinations. |
| DEF-03 Error not announced | High | CB-07 | Failure toast has no `role` and no `aria-live`. | `toastRole=null`, `toastAriaLive=null` at all 10 combinations. |
| DEF-04 Wrong error message | High | CB-04 | Every failure (including HTTP 500) is shown as "Too many requests. Try again later." because the branch tests `error instanceof Error`, which Axios errors satisfy. | `toast="Too many requests. Try again later."` with mock in `error` (500) mode, 9 of 10 combinations (one timing flake at 768 px `/`). |
| DEF-05 Success focus lost | Medium | CB-09 | After success, focus falls to `BODY`; keyboard and screen-reader users are not moved to the confirmation. | `active=BODY` at all 10 combinations. |
| DEF-06 Submit contrast | High | CB-11 | White text on `#3CBDE6` measures **2.18:1**, below the 4.5:1 requirement for normal text. | Computed ratio `2.18` at all 10 combinations; hover state unchanged. |
| DEF-07 Placeholder contrast | Medium | CB-12 | `placeholder-gray-400` on `bg-gray-50` measures **2.49:1**, below 4.5:1. | Computed ratio `2.49` at all 10 combinations. |

### Confirmed working before fixes

| Scenario | Result |
| --- | --- |
| CB-01 Default render | No page overflow at any width; form width tracks the card (238 px at 320, 293 px at 375). |
| CB-02 Required validation | 0 API calls on empty submit; `inquiry-name`, `inquiry-email`, `inquiry-description`, `inquiry-platform`, `inquiry-product`, `inquiry-category` flagged invalid. |
| CB-03 Success announcement | Confirmation has `role="status"` and `aria-live="polite"`. |
| CB-10 Labels | All 8 controls have accessible names (`Full name`, `Email address`, `Phone number (optional)`, `Address (optional)`, `Project or inquiry details`, `Platform`, `Product`, `Inquiry category`). |
| CB-13 Long content | No page-level overflow with long unbroken values at any width. |
| CB-14 Touch targets | Controls render 56 px high at all widths. |
| CB-15 Hover | Overlay reaches opacity 1 at ≥1024 px; submit ratio still 2.18 before fixes. |

### Known probe flake

At `768 px /`, the failure probe once read `toast=null` and submit text `"Sending..."`
because the toast had already auto-dismissed when sampled. The defect still reproduced
in the other 9 combinations and was re-checked after the fixes.

## Fix verification

Re-ran the same 10 route/viewport combinations and the automated suites on 2026-11-06.

| Check | After fixes |
| --- | --- |
| Probe defect signals | **0** (was 69) across all 10 combinations |
| Vitest contact-form suite | **8/8** pass |
| Full Vitest suite | **14/14** pass (6 existing + 8 new) |
| Production build | Pass (`tsc -b` + `vite build`) |
| Focused ESLint | Pass on `ContactForm.tsx`, `ToastComponent.tsx`, `contact-form.test.tsx` |
| Screenshots | 15 files in `shots/component-b/` (working tree only) |

| Defect | Resolution | After-fix evidence |
| --- | --- | --- |
| DEF-01 Autocomplete missing | Added `autoComplete="name"`, `"email"`, `"tel"`, and `"street-address"`. | `autocomplete` map populated for all four identity fields at all widths. |
| DEF-02 No retry after failure | Removed the permanent `disabled` state. The button is disabled only while a request is in flight. | Retry probe: `{"retryable":true,"disabled":false,"before":2,"after":3}` at all 10 combinations. |
| DEF-03 Error not announced | Added a persistent inline error with `role="alert"` and `aria-describedby` on submit. Error toasts in `ToastComponent` now use `role="alert"` / `role="status"` with `aria-live`. | `role=alert` on the inline error at all 10 combinations. |
| DEF-04 Wrong error message | Classified failures with `isAxiosError` and the HTTP status: 429 rate limit, 5xx server error, 400/422 validation, network fallback. | 500 mode now shows "Something went wrong on our side. Please try again."; 429 mode shows the rate-limit message. |
| DEF-05 Success focus lost | Added a `tabIndex={-1}` confirmation panel with a ref; focus moves to it when success renders. "Send Another Inquiry" returns focus to the name field. | `active=DIV`, `statusFocused=true` at all 10 combinations. |
| DEF-06 Submit contrast | Changed the submit label to `#0A0F1D` on `#3CBDE6`, darkened the focus ring to `#0B6A86`, and darkened the "Send Another Inquiry" link. | Computed ratio **8.75:1** in default and hover states. |
| DEF-07 Placeholder contrast | Replaced `placeholder-gray-400` with `placeholder-gray-500`. | Computed ratio **4.63:1**. |

### Additional changes

- The redundant toast was removed from `ContactForm` so the error is announced once, inline,
  next to the submit control and persists until the user edits a field.
- `ToastComponent` now uses stable toast IDs as keys, valid `z-[200]` positioning, and
  appropriate live-region roles for its other consumers (admin and CMS screens).

### Observation (not counted as a defect)

At 320 and 375 px the fixed chat launcher overlaps the bottom-right of the form while the
form is near the viewport bottom. The page has content below the form, so the submit control
can be scrolled clear; the launcher is a global affordance rather than part of Component B.

## PR description draft

> **Title:** Fix contact inquiry form accessibility and error handling
>
> **Summary**
>
> Component B QA of the contact inquiry form found seven defects across `/contact-us` and
> the home page section at 320, 375, 768, 1024, and 1440 px. This PR fixes all seven and adds
> an 8-case regression suite.
>
> **Changes**
>
> - Add autocomplete hints (`name`, `email`, `tel`, `street-address`).
> - Allow retry after a failed submission; disable submit only while sending.
> - Classify 429, 5xx, 400/422, and network failures with distinct messages.
> - Announce failures with an inline `role="alert"` region linked to the submit button.
> - Move focus to the success confirmation and back to the first field on reset.
> - Raise submit contrast from 2.18:1 to 8.75:1 and placeholder contrast from 2.49:1 to 4.63:1.
> - Fix toast live-region roles and positioning for other consumers.
>
> **Validation**
>
> - `npm test -- --reporter=verbose`: 14/14 pass.
> - `npm run build`: pass.
> - Focused ESLint: pass.
> - Browser probe: 0 defect signals across 10 route/viewport combinations (was 69).
>
> **Screenshots**
>
> Local, untracked: `shots/component-b/after_{320,375,768,1024,1440}_{form,success,error}.png`.
>
> **Scope**
>
> No backend changes. The mock API and probe scripts are local QA tooling and are not committed.

