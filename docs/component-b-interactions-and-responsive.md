# Component B — required interactions and responsive layouts

**Date:** 2026-11-11
**Component:** contact inquiry form (`frontend/src/components/cards/ContactForm.tsx`)
**Routes:** `/contact-us` and `/` (home page section); not `/book-a-schedule`
**Task list:** review required interactions — 0.5 h · implement interactive behavior — 2.5 h · add responsive layouts — 2.5 h

Design authority: the shared design-system state matrix (§4) and no-hover-only/touch/focus rules (§5–§7), the contact-form sketches, and rulings **B2-CF-1…5** in the 2026-10-29 finalized record. Component-level approved state from `main`'s `ContactForm` still wins on conflicts.

## 1. Required-interactions checklist

Every state the phase-1 docs enumerate is covered or explicitly marked not applicable.

| State / behavior | Requirement | Implementation | Evidence |
| --- | --- | --- | --- |
| **Default** | All 8 controls visible with a programmatic label | `<label htmlFor>` + `id` on every field; native `required` on the 6 required fields | Probe: all 8 labels resolve; `invalidIds` lists the 6 required controls |
| **Hover** | Decoration only, never the sole path to an action | Card lift + violet wash, field/button hover colours; every action also works by click/tap/keyboard | Probe hover: overlay `1`, card `translate 0px -4px`, border α `0.6` |
| **Focus-visible** | Visible ring that clears both surfaces | Fields: `focus:ring-2` violet `#8B5CF6`; invalid fields: red `#EF4444`. Buttons: `focus-visible:outline-*` | Live computed: valid field `0 0 0 2px #8B5CF6`, invalid field `0 0 0 2px #EF4444`; both ≥3:1 vs the `#0a0a0a` card |
| **Pressed** | Instant feedback, no layout shift | Submit `active:bg-[#5B21B6] active:translate-y-0`; success action `active:opacity-70` | Class assertions in `contact-form.test.tsx` |
| **Disabled** | `opacity-50` + `cursor-not-allowed`, `aria-disabled`, stays in tab order (DS-2) | Submit uses `aria-disabled` + `aria-busy` while sending; never native `disabled` | Probe/test: `aria-disabled=true`, `disabled=false` while sending |
| **Loading** | Label swap + `aria-busy` | Label becomes “Sending…”, form `aria-busy`, handler guard blocks duplicate requests | Test: duplicate submit keeps `createTicket` at 1 call |
| **Empty** | Render a text fallback, not a blank box | Not applicable — the form is static markup and never renders an empty data set | — |
| **Validation error** | Per-field message, `aria-invalid`, `aria-describedby`, focus first invalid | `validate()` per submit; summary `role="alert"`; focus moves to the first invalid control; errors clear on edit and re-check on blur after a failed attempt | Probe: 0 API calls, 6 invalid, focus on `inquiry-name`; blur check `before=true → afterBlur=null` |
| **Success** | Announced and focused | `role="status"` + `aria-live="polite"`, `tabIndex={-1}` panel focused on render | Probe: `statusFocused=true`, `active=DIV`, form removed |
| **Failure / retry** | Distinct message, announced, retry without reload | `isAxiosError` status classifier (429 / 5xx / 400·422 / network); inline `role="alert"`; submit stays enabled | Probe: 500 → server message; retry `before=2 after=3`, `disabled=false` |
| **Keyboard** | All actions operable without hover | Native `input`/`select`/`textarea`/`button`; Enter submits; Space activates buttons; logical DOM order | DOM order matches the visual order; no `role="button"` stand-ins |
| **Touch** | ≥44 px targets | Inputs 50 px, selects 47 px, textarea 128 px, submit 56 px, success action 215×44 px | Probe at all five widths |
| **No-hover-only** | Every hover path also click/tap/keyboard | No action is revealed only on hover; the card wash and colour shifts are decorative | Manual pass over the interaction inventory |
| **Reduced motion** | Honour `prefers-reduced-motion` | Global `index.css` rule collapses transitions/animations to `0.01 ms` | Existing global rule; card lift is a transition, so it is neutralised |

### Interaction changes in this pass

1. **`aria-required="true"`** added to all six required controls (B2-CF-2) alongside the native `required` attribute. Optional fields deliberately do not expose it.
2. **Blur re-validation after a failed submit.** A new `hasAttemptedSubmit` flag turns on per-field re-checks on blur. Correcting a field and leaving it clears that field’s error immediately; leaving an invalid field keeps or restores its message. Before the first submit attempt, blur is silent so the form does not scold a user who is still filling it in.
3. **Pressed feedback on the success action** (`active:opacity-70`) so “Send Another Inquiry” matches the DS pressed norm already used by the submit button.
4. **`min-w-0` on every `Field` wrapper** so long labels/messages cannot force a grid column wider than its track.

## 2. Responsive layouts

The parent pages place the card in a `max-w-lg` shell. The internal field grid is `grid-cols-1 md:grid-cols-2`; the category row stays full width.

| Viewport | Page context | Form width | Internal grid | Field width | Overflow | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| **320** | single column (`ContactUsPage`/home) | 238 px | 1 column | 238 px | none (`scrollWidth=320`) | Heading wraps to two lines; submit 238×56; success action 215×44 |
| **375** | single column | 293 px | 1 column | 293 px | none (`scrollWidth=375`) | Chat launcher overlaps the textarea while the form is near the viewport bottom (global Botpress affordance, outside Component B) |
| **768** | single column until `lg` | 430 px | 2 columns (`md`) | 207 px | none (`scrollWidth=768`) | Rows pair cleanly; long values do not widen the card |
| **1024** | parent `lg:grid-cols-2` | 374 px | 2 columns | 179 px | none (`scrollWidth=1024`) | Narrowest paired layout; example placeholders shortened to “you@email.com” and “Street, city” so they no longer clip |
| **1440** | parent `lg:grid-cols-2` | 430 px | 2 columns | 207 px | none (`scrollWidth=1440`) | Desktop reference layout |

Long-content stress (unbroken name/email/address/description) was re-run at every width: `overflow=false` and `scrollWidth == viewport` in all 10 route/viewport combinations.

### Screenshot-clipping note

Earlier form-only captures at 768/1024 looked clipped on the right edge. The card captures and the probe both show the complete card (`scrollWidth == viewport`), so this was a capture-clip artefact, not layout overflow. The screenshot script now includes padding around the card so the glow and borders are visible.

## 3. Verification

Run on 2026-11-11 against the Vite dev server (`:5173`) and the local mock (`:5000`).

| Gate | Result |
| --- | --- |
| Vitest | **23/23** pass (2 files; 4 new interaction tests) |
| `tsc -b` | clean |
| Production build | pass |
| Focused ESLint (`ContactForm.tsx`, `contact-form.test.tsx`) | clean |
| Browser probe | **0 defect signals** across 10 route/viewport combinations |
| Empty submit | 0 API calls; 6 fields invalid; focus `inquiry-name` |
| Success | `role="status"`, `aria-live="polite"`, `statusFocused=true`, `active=DIV` |
| Failure / retry | 500 → server message; retry `before=2 after=3`, `disabled=false` |
| `aria-required` | `name`, `email`, `description`, `platform`, `product`, `category` |
| Blur re-validation | `before=true → afterBlur=null`, `errorStill=false` |
| Focus ring | valid `2px #8B5CF6`; invalid `2px #EF4444` |
| Contrast | placeholder **7.08:1**; submit **5.7:1** |
| Touch | inputs 50 px, selects 47 px, textarea 128 px, submit 56 px, success action 215×44 px |
| Card hover | `translate: 0px -4px`, border α `0.6`, overlay `1` |

Screenshots (30 files) and `probe-results.json` are local/untracked in `shots/component-b/`.

## 4. Deliberate scope boundaries

- The floating chat launcher overlap at 320/375 is a global Botpress affordance, not part of Component B; it is recorded rather than restyled.
- The unlayered global focus rule is absent on this branch, so the field `focus:ring-*` utilities are the actual indicator. No global CSS was added or changed for focus.
- No hover-only path was introduced; all new feedback is additive.
