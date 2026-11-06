# Responsive and accessibility QA

## Component test scenarios

| Component or flow | Scenario | Expected result |
| --- | --- | --- |
| Main navigation | At 320, 375, 768, 1024, 1280, and 1536 CSS px, inspect header controls and navigation mode | No clipped controls or horizontal page scroll; compact menu remains available until the full navigation fits |
| Mobile navigation | Open the menu, expand each section, scroll the longest product list, and close with the close button, backdrop, and Escape | Menu remains scrollable; each close action dismisses it; body scrolling is restored |
| Breakpoint change | Open the compact menu and resize to 1536 CSS px | The compact menu closes, body scrolling is restored, and focus is not left on the hidden menu trigger |
| Mobile navigation keyboard | Open from the hamburger using the keyboard; tab and Shift+Tab through the dialog | Focus moves into the dialog, stays inside at either end, and returns to the hamburger after close |
| Mobile navigation semantics | Inspect dialog and menu buttons with a screen reader or accessibility tree | Dialog is named and modal; menu buttons expose expanded state and controls; decorative icons are hidden |
| FAQ accordion | Open one answer, open a different answer, and close the active answer | Only the selected answer is shown; `aria-expanded` and `aria-hidden` match the visible state |
| Contact inquiry form | Navigate every field by keyboard, submit with missing required fields, then submit valid values against success and failure responses | Every field has an accessible name; browser validation blocks incomplete submits; submit state prevents duplicate requests; success is announced; failures remain understandable |
| Long content | Use long headings, product names, email addresses, and multi-paragraph answers at phone and tablet widths | Text wraps without clipping; cards and dialogs remain scrollable; footer and forms remain reachable |
| Contact map | Inspect 768, 1024, 1280, and 1536 CSS px widths | Details and map stack until the wide layout; the map stays inside its column without forcing horizontal overflow |
| Motion preferences | Enable reduced motion and inspect menu/FAQ transitions | Motion is reduced while controls and content remain usable |
| Page zoom | Zoom the phone page up to 500% | Text and controls remain available without viewport metadata limiting zoom |

## Changes included in the QA pass

- The mobile navigation moves focus into its modal, traps Tab and Shift+Tab, closes with Escape, restores prior focus, restores body scrolling, and closes if the viewport crosses into the desktop navigation breakpoint.
- FAQ controls expose `aria-expanded` and `aria-controls`; collapsed answers are hidden from assistive technology.
- Contact form fields have programmatic labels, submission state is exposed with `aria-busy`, duplicate submission is disabled while sending, and success is announced.
- The chat launcher now has a visible, keyboard-focusable button with an accessible name that opens the Botpress conversation and the `bp-toggle-chat` ID for Botpress custom-launcher configuration.
- The contact map no longer forces a 600px minimum width beside contact details at tablet sizes.
- Navigation controls use normal responsive row layout, and the viewport metadata no longer restricts zoom to 2×.
- Long FAQ questions, mobile product links, product card titles, contact email addresses, and the catalog-unavailable alert can wrap instead of forcing a fixed-width layout.
- Route pages and admin screens now load as separate chunks. The initial JavaScript bundle dropped from about 3.23 MB to 650 KB before gzip; the 1.70 MB Mapbox library remains isolated to the contact-map route.
- Removed duplicate stylesheet imports and an import of an unused stylesheet that referenced a missing image.

## Verification evidence

- Component tests: `npm test -- --reporter=verbose` passed (6 tests): mobile dialog focus and keyboard handling, menu disclosure, breakpoint close and scroll restoration, FAQ state, accessible chat launcher behavior, contact field names, native required-field validation, duplicate-submit protection, and success announcement.
- axe-core scans passed for rendered menu, FAQ, and form component trees. Color-contrast checks are disabled in jsdom because the test environment does not load the browser stylesheets.
- Production build: `npm run build` passed. The CSS import-order and missing-image warnings are resolved. Vite still warns about the 1.70 MB Mapbox chunk; it loads separately from the 650 KB initial JavaScript bundle.
- Focused ESLint for changed interactive/layout components and tests passed with no findings.
- Full frontend ESLint currently fails with 186 errors and 32 warnings across the codebase; findings include `any` types, hook rules, and refresh-export rules. A focused lint run on the responsive/accessibility changes now passes.
- Browser interaction: phone-sized checks confirmed mobile menu, FAQ, labeled form, and chat behavior. At the connected browser's wider view, the compact navigation still opened and the Products disclosure expanded. The supplied screenshot and live page both show the centered catalog-unavailable alert; the API was unavailable, so no long live product list could be inspected. The default Botpress launcher remains visible underneath/alongside the custom control and appears as an unnamed button in the accessibility tree. The custom button now has the `bp-toggle-chat` ID, but Botpress requires the Chat Launcher setting to be changed to Custom element and published in its external dashboard to suppress the default bubble.
- Exact viewport overrides and screen-reader checks remain outstanding. The available browser control did not expose viewport sizing, and the desktop browser test session could not safely determine the active URL after a timeout. Component tests cover the 1536px navigation breakpoint and long product labels, but do not replace visual checks at specific phone, tablet, and desktop widths.
- Installing test dependencies reported 30 npm audit vulnerabilities across the dependency tree (2 low, 16 moderate, 12 high); no automatic audit fix was applied.

## Follow-up verification (2026-11-05)

- `npm test -- --reporter=verbose`: passed, 6 tests.
- `npm run build`: passed; the initial JavaScript chunk is 650.31 kB and Mapbox remains a separate 1,703.49 kB chunk, so Vite reports the existing large-chunk warning.
- `npm run lint`: still fails across the full frontend (186 errors, 32 warnings). Focused ESLint for the changed responsive/accessibility files passes after typing the product, service, and benefit lists.
- GitHub review threads were checked on the repository's open PRs #2, #6, and #7; all returned no comments. The current `codex/pr-duke` branch has no matching PR, so the PR corresponding to this responsive/accessibility work remains unidentified. The draft above is ready to use once the target PR is identified.

## PR description draft

### Title

Improve responsive layouts and accessible interactions

### Summary

- Refine phone and tablet layouts across the main public pages, cards, forms, footer, and navigation.
- Keep the contact map within its responsive column and avoid tablet-width overflow.
- Make the mobile navigation keyboard-operable as a modal dialog and expose accordion state to assistive technology.
- Add accessible names and submission feedback to the contact inquiry form, and allow full page zoom.
- Add Vitest, Testing Library, and axe-core checks for key interactive components.

### Validation

- Component tests, axe semantic checks, production build, and focused lint pass.
- Initial JavaScript bundle is about 650 KB before gzip; Mapbox loads as a separate route chunk.
- Full-project lint, screen-reader checks, and exact tablet/desktop viewport checks have outstanding items listed above.
- 2026-11-06 Component B follow-up: the contact inquiry form now has 8 regression tests; the full frontend suite is 14/14 passing. See [component-b-contact-form-qa.md](component-b-contact-form-qa.md).

### Evidence

- Component scenarios and results: this document.
- Automated checks: 6 component tests passed; production build and focused lint passed. The 2026-11-06 contact-form follow-up adds 8 tests for 14 total.
- Browser evidence: phone-sized view confirmed mobile menu, FAQ interaction, labeled form controls, and chat launch; catalog API was unavailable during the check. The default Botpress launcher still needs dashboard-side custom-toggle setup to remove its duplicate unnamed control.
