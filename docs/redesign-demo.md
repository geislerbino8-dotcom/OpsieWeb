# Redesign demonstration runbook (Components B and C)

Prepared 2026-11-24 for the supervisor walkthrough. Total run time about 8 minutes,
plus questions. Everything below runs locally; no production deploy is involved.

## 1. Before the demo

1. Start the frontend:
   ```powershell
   cd frontend
   npm run dev
   ```
   It serves `http://localhost:5173` and proxies `/api` to `http://localhost:5000`.
2. Provide content on `:5000`. Either run the real backend, or the local mock used for
   the QA pass:
   ```powershell
   node C:\Users\kingg\AppData\Local\Temp\opencode\opsie-mock\server.mjs
   ```
   The mock answers `/api/webcontent/get-content` (with `data: [doc]`), the product
   list, and `/api/ticket/create`, so validation and the success panel work without a
   database. It is local and untracked.
3. Open a second window at phone width (or DevTools device mode) for the responsive
   segment.
4. Have `docs/component-integration-notes.md` open for the numbers.

If the CMS is unreachable, `/what-we-do` shows its `No content` guard and the form's
product list shows the catalog notice. That is expected app-level behaviour, not a
Component B/C regression; use the mock for the demo.

## 2. Route order and talking points

### A. `/contact-us` — Component B on the light page (2 min)

- The card is a white "control panel": mono kicker `Opsie Control // Inquiry`, `Form / 01`
  meta, navy heading, blueprint grid, teal corner brackets.
- Every control has a visible label; required fields carry `*` and `aria-required`.
- Submit the empty form: the error summary is announced, the first invalid field is
  focused, and each field shows its own message. Type an invalid email: format error.
- Fill the form and submit: the success panel is focused, the action is 44 px+, and
  "Send another" restores the form.
- Compare with the right-hand cards: the page stays light `#ECEDF1`, the form keeps its
  own surface rather than inheriting card colours.

### B. `/` — the same component on a dark band (1.5 min)

- Scroll to "Request a Demo" (`#0A0F1D`). The form is unchanged: white card, same ink,
  same contrast (minimum 4.76:1), no white text leaking onto white fields.
- The map card sits alongside it; both stay inside the band at 1440 and 768.

### C. `/what-we-do` — Component C (2 min)

- The left column pins 96 px below the fixed header while the list scrolls; the header
  never covers the kicker or heading.
- Open the first question: teal border and glow, index turns teal, icon becomes `×`.
- Open the second: the first closes (single-open model).
- Keyboard only: Tab to a trigger, Enter opens, Space closes, focus ring is a 2 px
  `#0E7490` outline.
- `Reach out to us.` is a router link to `/contact-us` (AC-07).
- At 1024 the heading wraps inside its column instead of clipping (AC-06).

### D. `/who-we-are` — Component C in a second context (0.5 min)

- Same contract, different surrounding rhythm; no style bleed from the map/teal panel.

### E. Responsive sweep (1.5 min)

- 1024: FAQ two-column with a wrapped heading; form two columns.
- 768: form field rows pair; FAQ stacks; no horizontal scrollbar.
- 375/320: form is one column, targets stay 44 px+ (inputs 50, submit 52), FAQ triggers
  72 px, long questions wrap inside the card.
- Mention that the probe checked all four routes × five widths with zero overflow.

### F. Accessibility close (0.5 min)

- `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`, h3-wrapped
  triggers (AC-05). Form landmark is `aria-labelledby` the h2 title.
- Reduced motion collapses transitions to 0.01 ms (`index.css`).
- Contrast minimums: form 4.76:1, FAQ 4.58:1.

## 3. Numbers to quote

| Item | Value |
| --- | --- |
| Integration combinations | 4 routes × 5 widths, 0 defects |
| Tests | 41/41 across 5 files |
| Form card / input / submit | 512 px / 50 px / 52 px at 1440 |
| FAQ sticky offset / travel | 96 px / 213 px at 1440, 233–237 px at 1024 |
| FAQ trigger height | 88 px desktop, 72 px mobile |
| Minimum text contrast | form 4.76:1, FAQ 4.58:1 |
| Empty submit | 0 network calls, 6 invalid fields, first field focused |

## 4. Known limitations to name first

- PR #8 is `mergeable_state: dirty`: this branch is the light/teal redesign while `main`
  is carbon/violet, so the merge is a design-system decision, not a conflict to hand-fix.
- Botpress launcher overlaps the last FAQ card at 320–375 px when scrolled to the bottom.
- `App.fetchContent` has no guard if the CMS request fails (error boundary); the
  components themselves tolerate a missing `faqSection`.
- Other sections on the homepage still emit multiple `h1`s; outside B/C.

## 5. Evidence

- `docs/component-integration-notes.md` — mounts, reconciliation, matrix, corrections.
- `docs/component-c-faq-accordion.md`, `docs/component-c-styling-notes.md`,
  `docs/component-c-responsive-and-states.md` — Component C contract and states.
- `docs/component-b-contact-form-qa.md`, `docs/component-b-styling-notes.md`,
  `docs/component-b-interactions-and-responsive.md` — Component B contract and states.
- `docs/redesign-demo-shots.md` — captured demo states (paths, local/untracked).
