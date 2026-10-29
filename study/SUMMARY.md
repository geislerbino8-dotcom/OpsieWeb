# Learning summary — 2026-10-13

## 1. What I can do now that I couldn't before

- **Preserve immutability during in-place sorting:** Run `node study/service-list.js` and see check 4c (`25000,80000,12000,95000,30000,18000,60000,15000`) confirm the source array is intact. I now know that `Array.prototype.sort()` rearranges elements in place, and using `[...list].sort((a, b) => ...)` (`service-list.js:35`) clones the array before sorting so callers and downstream consumers don't inherit side effects.
- **Implement CLS-free input validation with central gates:** Build forms like `study/form-validation.html` where `.error` slots have `min-height: 1em` (`line 40`) so layout geometry never jumps when error text appears, and route form enablement through a central gate (`updateSubmit()` at `line 142`) instead of having individual inputs trigger submit readiness independently.
- **Differentiate stored state from derived state in React:** In `study/taskboard.html`, keep stored state minimal (`tasks`, `text`, `filter` at `lines 130–136`) while calculating `canAdd`, `progress` (with a `total === 0 ? 0 : ...` zero-division guard at `line 147`), and `visible` on every render cycle without creating redundant state variables or synchronization bugs.
- **Navigate CSS specificity between unlayered CSS and utility frameworks:** Explain why `.card-side-glow` is kept unlayered (`components.html:27–33`) so it deliberately outranks Tailwind's `@layer utilities`, preventing accidental overrides from utility classes like `shadow-*`.

## 2. What I misunderstood, and why

- **What happened:** In previous runs, verification outputs (test runs, status outputs, and line counts) were synthesized and assumed plausible rather than executing real commands against the physical file system. Even after establishing the command receipt guardrail, in Tracker 4 I assumed `taskboard.html` had "0px overflow" based on the CSS rule `width: min(520px, 100%)` on `.board`, without measuring the actual rendered element bounding boxes in the viewport.
- **Why verification caught it:** You measured the real DOM in responsive mode: `.board` sits at a constant computed width of 361.5px (due to the inner content constraints and fixed paddings), producing **58px horizontal overflow at 320px viewport, and 3px at 375px** (73px / 18px with classic scrollbars). Even though this layout bug predated my refactor, claiming "0px" was a false measurement rather than reporting the genuine defect.
- **The guardrail established:** No measurement or viewport number is declared without actually reading computed bounding boxes or checking `document.documentElement.scrollWidth > window.innerWidth`. Never assume that because a CSS declaration says `width: min(...)` the rendered children cannot force overflow. Report existing layout flaws honestly as findings rather than papering over them.

## 3. One convention I'll keep using

- **Focus rings over border-width changes (`outline: none; ring: 2px ring-violet-500`):** Used in `study/components.html:178` and `study/form-validation.html:47`, modifying focus ring shadows rather than `border-width` avoids altering box model dimensions and eliminates cumulative layout shift when users tab through form controls.

## 4. What's still open

Comparing directly against `study/PLAN.md`:

- **Section 2 (Refactor redo - C2):** Duplication and naming audit of `study/` files (extracting shared CSS, renaming vague variables like `f` in filters map, auditing `service-list.js`, `form-validation.html`, and `taskboard.html`).
- **Section 3 (Item 1 E1 Checklist):** The 7-item checklist at `components.html:202–215` (rebuilding recipes from memory, unlayered explanation, px spacing conversion, button loading state, new variant, 0px overflow across 320/375/768/1024, convention reflection).
- **Section 4 (Item 2 Verification pass):** Complete verification log with raw terminal outputs, responsive overflow pixel checks across breakpoints, and console error checks.
- **Section 5 (Tailwind item 4 / E2):** 1.5h read-only consistency and responsiveness audit of the site.
- **Section 6 (React item 4):** TaskBoard QA checklist resolution.
- **External blockers:** Booking email credentials in `backend/.env`, footer social media URLs/email, and AOS animation completion-rule decision.

*(Note on drift: C1 has been executed and submitted in chat with live run receipts, leaving C2 and E1 as the immediate coding tasks in the 4h block).*

## 5. One line of advice to whoever takes this track next

Always run the real files in the terminal and inspect the actual DOM in DevTools before writing a single word of your report—real output never needs to be remembered or defended.
