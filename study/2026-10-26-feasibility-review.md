# Feasibility Review — Design Iteration Pack against Existing Code

**Date:** 2026-10-26 (Phase 3)  
**Scope:** Review every proposal in the design-iteration pack against `frontend/src`:
- Hero CTA Redesign (`study/2026-10-23-herocta-redesign.md` + `study/2026-10-23-herocta-interactions.md`)
- MobileMenu Sheet Sketch (`study/2026-10-26-mobilemenu-sketches.md`)
- ContactForm Sketch (`study/2026-10-26-contactform-sketches.md`)
- FAQ Accordion Sketch (`study/2026-10-26-faq-sketches.md`)
- ClientReview Arrows Sketch (`study/2026-10-26-reviewarrows-sketches.md`)
- Footer Links/Nav Sketch (`study/2026-10-26-footer-sketches.md`)
- Shared Design System (`study/2026-10-26-shared-design-system.md`)

**Standards:** Every proposal receives an explicit verdict (**feasible / feasible-with-caveat / blocked-owner / infeasible**) supported by direct `file:line` citations to code and receipts. Shared touchpoints and cascade interactions are explicitly mapped. No code changes are made in this document.

---

## 1. Per-Proposal Feasibility Verdicts

### 1.1 Hero CTA Card/Button Redesign & Interactions
*Proposals: `study/2026-10-23-herocta-redesign.md:57–104` & `study/2026-10-23-herocta-interactions.md:8–60`*

| Proposed Item | Verdict | Source Evidence & Technical Constraints | Blast Radius / Shared Touchpoints |
|---|---|---|---|
| **Fill Token:** `bg-[#8B5CF6]` → `bg-violet-700` (`#6D28D9`) | **feasible** | `frontend/src/components/HeroPage.tsx:111` carries `bg-[#8B5CF6]`. Tailwind v4 imports `@import "tailwindcss";` (`frontend/src/index.css:7`), which natively provides standard palette utilities including `bg-violet-700`. Also `HeroPage.tsx:101` already mounts `bg-violet-700` cleanly on the badge circle. | Local to `HeroPage.tsx:111`. No cross-component collision. |
| **Focus-Visible Spec:** Dual-tone ring via unlayered element-scoped CSS rule (Ruling R-B) | **feasible-with-caveat** | `frontend/src/index.css:336` declares unlayered `*:focus-visible { outline: 2px solid #8B5CF6; outline-offset: 2px; }`. A standard layered utility (`focus-visible:ring-*`) fails to override this rule. **Caveat:** To win specificity without modifying `index.css:336` (REG-21 guard), the rule must be an unlayered element-scoped selector (`.hero-cta-button:focus-visible` at the root/unlayered level) or use Tailwind `!` important utility classes (`!outline-white`). | Requires creating `.hero-cta-button` class or `!` utilities in `HeroPage.tsx:111`. Zero edits to `index.css:336`. |
| **Navigation Mechanism:** `<button onClick={() => navigate(...) }>` → `<Link to="/book-a-schedule">` (Ruling R-A) | **feasible** | `HeroPage.tsx:2` already imports `useNavigate` *(P3-C3 corrected 2026-10-27: was `HeroPage.tsx:1` — line 1 is `import { useContext } from "react"`)* from `react-router-dom`. Swapping to `<Link to="/book-a-schedule">` (`HeroPage.tsx:109-114`) requires adding `Link` to the `react-router-dom` import. Native anchor activation natively operates via Enter (Space scrolls page, accepted per Ruling R-A). | Local to `HeroPage.tsx:109-114`. Eliminates synthetic click-routing. |
| **320px Box:** Remove `overflow-hidden` or reduce horizontal padding | **feasible-with-caveat** | `HeroPage.tsx:111` applies `overflow-hidden px-14 py-5 text-xs`. Removing `overflow-hidden` prevents synthetic clipping, but `px-14` (56px left/right = 112px padding alone) on a 320px container (`HeroPage.tsx:99 max-w-md w-full`) risks lateral pushing unless responsive padding (`px-6 sm:px-14`) is considered. **Caveat:** Geometry requires pass-B live capture to confirm `de.scrollWidth - de.clientWidth === 0` at 320px. | Local to `HeroPage.tsx:111`. |

---

### 1.2 MobileMenu Sheet
*Proposal: `study/2026-10-26-mobilemenu-sketches.md:63–93`*

| Proposed Item | Verdict | Source Evidence & Technical Constraints | Blast Radius / Shared Touchpoints |
|---|---|---|---|
| **Escape Key Dismiss:** Add `keydown` handler listening for `Escape` to call `closeMenu` | **feasible** | `frontend/src/components/MobileMenu.tsx:14` receives `closeMenu: () => void`. Adding a `useEffect` attaching a `keydown` listener for `e.key === "Escape"` cleanly executes `closeMenu()` on Escape. | Local to `MobileMenu.tsx`. Does not affect desktop nav. |
| **Focus Containment & Inert Background:** Trap focus inside sheet / set background inert | **feasible-with-caveat** | `MobileMenu.tsx:18` mounts as a fixed overlay when open. **Caveat:** Setting `inert` on sibling roots requires either mounting `MobileMenu` in a portal (`createPortal` to `document.body`) or querying `#root > *:not([data-mobile-menu])`. Alternatively, a tab-cycle wrap hook over the focusable elements (`Close button` + 4 links at `MobileMenu.tsx:41, 52-61`) can trap Tab navigation within the menu without risking browser compatibility with older HTML `inert` implementations. | Sibling containers in `App.tsx` / `Homepage.tsx` if using `inert`; self-contained if using focus-loop key listener. |
| **Close Button ≥44px:** Resize close button from `text-2xl` to `h-11 w-11` | **feasible** | `MobileMenu.tsx:36-42` defines `<button onClick={closeMenu} className="self-end text-white text-2xl font-bold focus:outline-none" aria-label="Close menu">×</button>`. Adding `min-h-[44px] min-w-[44px] flex items-center justify-center` satisfies R5 directly. | Local to `MobileMenu.tsx:36-42`. |
| **Dialog Semantics:** `role="dialog" aria-modal="true" aria-label="Site menu"` | **feasible** | Panel container `MobileMenu.tsx:24-35` can directly take `role="dialog"`, `aria-modal="true"`, and `aria-label="Site menu"`. | Local to `MobileMenu.tsx:24-35`. |

---

### 1.3 ContactForm
*Proposal: `study/2026-10-26-contactform-sketches.md:73–102`*

| Proposed Item | Verdict | Source Evidence & Technical Constraints | Blast Radius / Shared Touchpoints |
|---|---|---|---|
| **Form Labels & IDs:** Add real `<label for="...">` and matching `id`s for all 8 fields | **feasible-with-caveat** | `frontend/src/components/cards/ContactForm.tsx:86-182` renders 8 form controls (`name`, `email`, `phone`, `address`, `description`, `platform`, `product`, `category`). None currently have `<label>` tags or `id` attributes. Adding `<label htmlFor="...">` and `id` to each element is structurally trivial. **Caveat:** Layout impact — adding visible `<label>` elements inside the compact card (`max-w-lg`) will increase card height. If visually hidden labels (`sr-only`) are used, accessible names are provided without altering the card's visual balance. If visible labels are requested, the grid rhythm must accommodate them. | Mounts on `/contact-us` and `/book-a-schedule` — the component is imported at **3 sites**: `pages/ContactUsPage.tsx:4`, `ContactUs.tsx:5`, `pages/sections/ContactUsSection.tsx:5` *(P3-C4 corrected 2026-10-27: was "(via `ContactUsSection.tsx`)" — imprecise; all three importers verified)*. Both routes updated simultaneously. |
| **Touch ≥44px Target Heights:** Increase inputs/selects to `py-3` | **feasible** | Current inputs already use `py-3` (`ContactForm.tsx:93, 102, 114, 122, 133, 143, 159, 174` *(P3-C4 corrected 2026-10-27: the textarea row `:133` was missing — `py-3` verified at exactly these 8 lines)*), but bounding client rect measurements at mobile yielded sub-44px due to line-height/font metrics. Adding explicit `min-h-[44px]` or `h-11` ensures compliance across all user agents. | Local to `ContactForm.tsx`. |
| **Error Affordance:** `aria-invalid` & `aria-describedby` wiring | **feasible** | `ContactForm.tsx:35-52` (`handleCreateInquiry`) handles validation via native browser `required` attributes and API error toast (`useToast`). Adding state for field validation errors allows wiring `aria-invalid={!!errors[name]}` cleanly. | Local to `ContactForm.tsx`. |

---

### 1.4 FAQ Accordion
*Proposal: `study/2026-10-26-faq-sketches.md:71–101`*

| Proposed Item | Verdict | Source Evidence & Technical Constraints | Blast Radius / Shared Touchpoints |
|---|---|---|---|
| **State Exposure:** Add `aria-expanded={isOpen}` to trigger buttons | **feasible** | `frontend/src/components/FaqSection/Faq.tsx:34` defines `const isOpen = openIndex === index;`. The trigger button at `Faq.tsx:49-63` can immediately receive `aria-expanded={isOpen}` and `aria-controls={`faq-answer-${index}`}`. | Local to `Faq.tsx:49-63`. Clears F3 / **REG-06** directly *(P3-C2 corrected 2026-10-27: was "REG-10" — the FAQ `aria-expanded` row is REG-06 (register:71, cites `Faq.tsx:49–63`); REG-10 is the OperationalStructure contrast row)*. |
| **Panel Semantics:** Add `id`, `role="region"`, `aria-labelledby` | **feasible** | `Faq.tsx:66-85` contains the expandable container. Adding `id={`faq-answer-${index}`}`, `role="region"`, and `aria-labelledby={`faq-trigger-${index}`}` is straightforward and does not affect the CSS grid animation (`grid-template-rows: isOpen ? "1fr" : "0fr"`). | Local to `Faq.tsx:66-85`. |
| **Inline Contact Link (`Faq.tsx:27`):** Replace raw `<a href="/contact-us">` with `<Link to="/contact-us">` | **feasible** | `Faq.tsx:27` currently uses raw `<a href="/contact-us">Reach out to us.</a>`. Importing `Link` from `react-router-dom` and converting the anchor eliminates full page reload (addresses REG-18 instance). | Local to `Faq.tsx:27`. |

---

### 1.5 ClientReview Arrows
*Proposal: `study/2026-10-26-reviewarrows-sketches.md:66–88`*

| Proposed Item | Verdict | Source Evidence & Technical Constraints | Blast Radius / Shared Touchpoints |
|---|---|---|---|
| **Accessible Names:** Add `aria-label="Previous review"` / `"Next review"` | **feasible-with-caveat** | The arrows are rendered via shared `<Button>` at `frontend/src/components/sections/ClientReviewsSection.tsx:41-54`. **Caveat:** `frontend/src/components/Button/Button.tsx:6-33` renders the native `<button>`, but `ButtonOptions` (`frontend/src/types/components/Buttons.ts:3-14`) does **not** declare `ariaLabel?: string` or pass through ARIA attributes (`props["aria-label"]`). Either `ButtonOptions` must be updated to pass `aria-label` to the underlying `<button>`, or `aria-label` must be passed via rest props. | **Shared component blast radius:** Modifying `Buttons.ts` / `Button.tsx` touches a shared layer used by `ClientReviewsSection.tsx`, `ServicesSections.tsx:3`, `MapDesign.tsx:1`, and `Header.tsx:3`. |
| **Enlarge Hit Box to ≥44px (`h-11 w-11`):** Resize from `w-8 h-8` | **feasible** | `ClientReviewsSection.tsx:44, 51` specifies `className="w-8 h-8 ..."`. Replacing `w-8 h-8` with `w-11 h-11` (or `min-w-[44px] min-h-[44px]`) directly enlarges the button container. `Buttons.ts:55` base sets `px-2 py-1 rounded-full` *(P3-C3 corrected 2026-10-27: was `Button.tsx:55` — phantom pointer; `Button.tsx` is 36 lines total, the base class is `Buttons.ts:55`)*, which cleanly absorbs custom width/height overrides. | Local to call site `ClientReviewsSection.tsx:44, 51`. |
| **Icon Aspect / Distortion Guard:** `object-contain` on SVG icon | **feasible** | `Button.tsx:24` renders `<img src={props.iconImage} alt="" className={props.iconClassName} />` *(P3-C3 corrected 2026-10-27: was `:22` — the img is at `:24`; `:23` is `{props.iconImage && (`)*. Supplying `iconClassName="object-contain w-5 h-5"` preserves natural image aspect. | Local to `ClientReviewsSection.tsx`. |

---

### 1.6 Footer Links / Nav
*Proposal: `study/2026-10-26-footer-sketches.md:73–97`*

| Proposed Item | Verdict | Source Evidence & Technical Constraints | Blast Radius / Shared Touchpoints |
|---|---|---|---|
| **Touch ≥44px Target Heights:** Wrap/pad links with `block py-2.5` | **feasible** | `frontend/src/components/Footer.tsx:88-120` contains 9 `<Link>` elements inside `<li>` items. Setting `className="block py-2.5"` on `<Link>` enlarges the tap target from 18px to ≥44px without changing the `text-sm` font size. | Local to `Footer.tsx:86-121`. |
| **Social Media Icon Size:** Enlarge from `w-10 h-10` (40px) to `w-11 h-11` (44px) | **feasible** | `Footer.tsx:144, 152, 158` currently use `w-10 h-10 p-2`. Replacing with `w-11 h-11 p-2.5` (or `min-w-[44px] min-h-[44px]`) satisfies R5. | Local to `Footer.tsx:139-162`. |
| **Placeholder Hrefs (N-04 / REG-26):** Correct the **6 of 9** hrefs resolving to `/who-we-are` — the **5 registered stand-ins** ("Our Team", "FAQ's", "Our Story", "Our Mission", "Our Vision") **plus About Us's own target** *(P3-C4 corrected 2026-10-27: was "6 stand-in hrefs" — only 5 are stand-ins per G4/REG-26; the 6th is About Us's own target at `Footer.tsx:88`)* | **blocked-owner** | `Footer.tsx:88, 106, 109, 117, 118, 119` point to `/who-we-are`. Routing targets for "Our Team", "Our Story", "Our Mission", "Our Vision" do not have dedicated public routes in `Router.tsx:72–128`. Updating these URLs requires either creating section anchor links (`/#team`, etc.) or owner direction. Retained as **blocked-owner** per findings register. | Owner decision required for live route destinations. |

---

### 1.7 Shared Design System
*Proposal: `study/2026-10-26-shared-design-system.md:17–155`*

| Proposed Item | Verdict | Source Evidence & Technical Constraints | Blast Radius / Shared Touchpoints |
|---|---|---|---|
| **Color Tokens:** Standardize `canvas` (`#0a0a0a`), `violet-700` (`#6D28D9` / `rgb(112,8,231)`), `violet-600`, `violet-500` (`#8B5CF6`) | **feasible** | Standard Tailwind v4 palette (`violet-500`, `violet-600`, `violet-700`) is active. `index.css:34` defines body background `#0a0a0a`. Tokens can be referenced directly in classes without config changes. | Global design consistency across components. |
| **Typography Scale:** Montserrat default (`index.css:28`), Poppins (`--font-poppins`, `index.css:15`), Poiret (`.font-poiret`, `index.css:98`) | **feasible** | Verified on disk: `@theme { --font-poppins: "Poppins", sans-serif; --font-montserrat: "Montserrat", sans-serif; }` in `index.css:15-16`, with `@layer base { * { font-family: 'Montserrat', sans-serif; } }` at `index.css:26-30`. Fonts resolve post-token without issues. | Global stylesheet `frontend/src/index.css`. |
| **Focus-Visible Cascade Mechanism (R-B):** Element-scoped unlayered rule or `!` utilities | **feasible** | Tested against `index.css:336`. Layered utilities cannot override `*:focus-visible`. Unlayered scoped rules or `!` important classes succeed without modifying `index.css:336`. | Component-specific styling. Keeps `index.css:336` protected (REG-21). |
| **Shared Button Base (`Buttons.ts:55`):** `px-2 py-1 rounded-full font-medium flex items-center justify-center transition` | **feasible-with-caveat** | `Buttons.ts:55` sets `px-2 py-1`. If padding or sizing is modified globally in `Buttons.ts`, it affects all buttons using `ButtonLogic` (`ClientReviewsSection.tsx`, `ServicesSections.tsx`, `MapDesign.tsx`). **Caveat:** Component-specific sizes must be passed via `className` prop overrides, not hardcoded into `Buttons.ts:55`. | `frontend/src/types/components/Buttons.ts` and `Button.tsx`. |

---

## 2. Shared Touchpoints & Blast Radius Analysis

1. **Shared Button Layer (`frontend/src/types/components/Buttons.ts` & `frontend/src/components/Button/Button.tsx`)**
   - **Consumers:** `ClientReviewsSection.tsx:41, 48`, `ServicesSections.tsx:107, 118`, `MapDesign.tsx:1`, `Header.tsx:3`.
   - **Risk:** The ClientReview proposal requires an accessible name (`aria-label`). `ButtonOptions` currently lacks `ariaLabel?: string`, and `Button.tsx` does not spread extra HTML attributes to `<button>`.
   - **Recommendation:** Add optional `ariaLabel?: string` (or `...rest` props forwarding) to `ButtonOptions` and apply it to `<button aria-label={props.ariaLabel}>`. Do **not** alter `base = "px-2 py-1..."` in `Buttons.ts:55` directly; let call sites pass sizing classes.

2. **Global Focus Ring (`frontend/src/index.css:336`)**
   - **Consumers:** Entire DOM (`*:focus-visible`).
   - **Risk:** Modifying `index.css:336` risks breaking the 9 controls that rely on it for visible focus.
   - **Constraint:** Maintain REG-21 rule: zero edits to `index.css:336`. All specialized focus rings (Hero CTA dual-tone ring) must use unlayered element-scoped CSS rules or `!` utility classes.

3. **Routing / Navigation (`react-router-dom`)**
   - **Consumers:** `HeroPage.tsx`, `Faq.tsx`, `Footer.tsx`, `MobileMenu.tsx`.
   - **Risk:** Converting programmatic `navigate()` calls or raw `<a>` anchors to `<Link>` components requires ensuring `<Link>` is imported and wrapped within Router context *(P3-C1 corrected 2026-10-27: mechanism was misstated as "(`App.tsx` provides `BrowserRouter`)" — no `BrowserRouter` import exists anywhere in `frontend/src`; the app router is `createBrowserRouter` (`Router.tsx:1` import, `:72` routes definition) rendered via `<RouterProvider>` (`main.tsx:11`)*.
   - **Safety:** All target components render inside public route trees under `createBrowserRouter` (`Router.tsx:1/:72`) + `<RouterProvider>` (`main.tsx:11`) *(P3-C1 corrected 2026-10-27: was "wrapped by `BrowserRouter`" — phantom import; the only 2 `BrowserRouter` string matches repo-wide are inside the `createBrowserRouter` calls at `Router.tsx:1/:72`)*.

---

## 3. Summary Feasibility Matrix

| Component / Proposal | Verdict | Primary Dependency / Caveat |
|---|---|---|
| **Hero CTA Button** | **feasible-with-caveat** | Unlayered element-scoped ring rule; 320px padding verification in pass-B |
| **MobileMenu Sheet** | **feasible-with-caveat** | Focus-trap loop or inert sibling handling for modal behavior |
| **ContactForm** | **feasible-with-caveat** | Form height impact if visible labels vs accessible `sr-only` labels |
| **FAQ Accordion** | **feasible** | Direct state-reflection via `aria-expanded` and `aria-controls` |
| **ClientReview Arrows** | **feasible-with-caveat** | Must extend `ButtonOptions` to accept `ariaLabel` without breaking callers |
| **Footer Links / Nav** | **feasible-with-caveat** | Touch targets feasible; placeholder URLs remain `blocked-owner` (N-04) |
| **Shared Design System** | **feasible** | Tailwind v4 palette & tokens fully match; R-B cascade rule proven |
