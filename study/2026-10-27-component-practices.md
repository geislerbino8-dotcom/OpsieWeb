# Shared Component Practices & Conventions Review

**Date:** 2026-10-27  
**Track Item:** PLAN:58 (Review shared component conventions)  
**Deliverable:** `study/2026-10-27-component-practices.md`  
**Scope:** Deep inspection of shared UI component practices across the codebase. Evaluates at least 5 reusable components across 6 architectural dimensions, identifies real rules vs single-instance patterns, conducts a compliance audit with verified grep proof, and flags anti-patterns and consolidation opportunities.

---

## 1. Examined Reusable Components (≥5 Components)

To extract real codebase conventions, the following five widely-imported UI components were examined across their definition, exports, and call-sites:

1. **`Button` (`frontend/src/components/Button/Button.tsx`)**
   - Paired logic/type file: `frontend/src/types/components/Buttons.ts`
   - Barrel export: `frontend/src/components/Button/index.ts`
   - Role: OOP-backed configurable generic button with icons, variant styles, and custom class extensions.
2. **`SuperHeader` (`frontend/src/types/components/SuperHeader.tsx`)**
   - Role: Multi-route display heading component with markdown-style `*highlight*` text splitting into violet brand text and responsive alignment.
3. **`ScrollAnimatedSection` (`frontend/src/ScrollAnimationSection.tsx`)**
   - Role: Generic viewport-observer wrapper animating children upon scrolling into view using `IntersectionObserver`.
4. **`TestimonialCard` (`frontend/src/components/Card/ClientCard/Card.tsx`)**
   - Barrel export: `frontend/src/components/Card/ClientCard/index.ts`
   - Role: Customer review card displaying client avatar, name, role, review copy, star rating, and card-side-glow styling.
5. **`ToastContainer` (`frontend/src/components/admin/common/ToastComponent.tsx`)**
   - Paired hook: `frontend/src/hooks/useToast.ts`
   - Role: Portal-style alert notification toast renderer consumed in admin modals and public contact forms.

---

## 2. Review Across Six Architectural Dimensions

### 2.1 File Structure & Organization
- **Observed Pattern:**
  - Highly fragmented directory taxonomy. Components are scattered across `components/`, `components/Button/`, `components/buttons/`, `components/Card/ClientCard/`, `components/cards/`, `components/admin/common/`, and `types/components/`.
  - Types are frequently placed outside `types/` (e.g., component code located inside `types/components/SuperHeader.tsx` and `types/components/Buttons.ts`), blurring the distinction between declarations and implementations.
  - Sub-directories alternate between PascalCase folder names (`Card/ClientCard/Card.tsx`) and lowercase folders (`cards/ContactForm.tsx`).

### 2.2 Naming Conventions
- **Observed Pattern:**
  - PascalCase for React component definitions (`Button`, `SuperHeader`, `TestimonialCard`, `ToastContainer`).
  - Filename collisions and dual implementations exist across the codebase:
    - `Button/Button.tsx` (generic OOP button) vs `buttons/PrimaryButton.tsx` vs `buttons/BlackButton.tsx`.
    - `Card/ClientCard/Card.tsx` (live reviews card) vs `cards/ClientCard.tsx` (dead asset-only stub).
    - `Header.tsx` (mounted in `AdminGuard.tsx:4` for authenticated admin routes) vs `admin/header/Header.tsx` (admin-specific dashboard header).

### 2.3 TypeScript Interfaces & Typing
- **Observed Pattern:**
  - Interfaces and type aliases are mixed: `type ButtonOptions = { ... }` in `Buttons.ts:3`, `interface ScrollAnimatedSectionProps` in `ScrollAnimationSection.tsx:3`, and inline anonymous object types in `SuperHeader.tsx:1`.
  - HTML element prop inheritance is absent: none of the interactive components (`Button`, `PrimaryButton`, `BlackButton`, `SuperHeader`) extend standard React attributes (`React.ButtonHTMLAttributes<HTMLButtonElement>` or `React.HTMLAttributes<HTMLHeadingElement>`).
  - Consequently, standard accessibility and testing attributes (`aria-label`, `aria-expanded`, `data-testid`) are not forwarded unless explicitly declared on the bespoke props interface.

### 2.4 Props API & Composition
- **Observed Pattern:**
  - Inconsistent children pattern:
    - Container components like `ScrollAnimatedSection` (`ScrollAnimationSection.tsx:10`) use `children: React.ReactNode`.
    - Display and control components like `SuperHeader` (`SuperHeader.tsx:1`) and `Button` (`Buttons.ts:4`) do not accept `children`, relying on string props (`text`, `label`).
  - Class name composition:
    - `className` is accepted as an optional string prop and concatenated in `Buttons.ts:60` and `ScrollAnimationSection.tsx:43`. *(CP-C3 corrected 2026-10-27: was cited as `Button.tsx:60` — `Button.tsx` is 36 lines; the class concatenation logic is `Buttons.ts:60`)*.
    - `SuperHeader.tsx:20-22` conditionally overrides `className` using a ternary based on `type === 'hero'` without supporting custom `className` injection. *(CP-C5 corrected 2026-10-27: was cited as `:17`)*.

### 2.5 Styling Patterns & Tailwind Usage
- **Observed Pattern:**
  - Primary UI buttons follow the site-wide rule **"buttons are rounded-full"** (`Buttons.ts:55`, `PrimaryButton.tsx:44`, `HeroPage.tsx:111`, `ProductItemCTA.tsx:31, 39`). *(CP-C7 corrected 2026-10-27: PrimaryButton is :44; ProductItemCTA classes are :31/:39 with tags at :29/:35)*.
  - Inline style objects are frequently combined with Tailwind classes:
    - `Button.tsx:12`: inline `style={{ borderRadius: '9999px', transition: 'all 0.4s ease-in-out' }}` redundant with `rounded-full` in `Buttons.ts:55`. *(CP-C3 corrected 2026-10-27: was cited as `:11`)*.
    - `SuperHeader.tsx:17-19`: inline `style={{ color: defColor && defColor }}`. *(CP-C5 corrected 2026-10-27: was cited as `:15`)*.
    - `Card/ClientCard/Card.tsx:24`: inline `boxShadow: "-24px 0 48px -20px ..."` mirroring the `.card-side-glow` utility.
  - Arbitrary values in Tailwind classes: `text-[42px] leading-[46px] md:text-[72px]` (`SuperHeader.tsx:22`) alongside standard scale classes (`text-4xl md:text-5xl`).

### 2.6 Import / Export Strategy
- **Observed Pattern:**
  - Both default exports and named exports are used without clear consistency:
    - `Button.tsx:5` uses named `export const Button = ...` re-exported via `Button/index.ts:1`.
    - `SuperHeader.tsx:36` uses `export default SuperHeader`. *(CP-C5 corrected 2026-10-27: was cited as `:34`)*.
    - `ScrollAnimationSection.tsx:51` uses `export default ScrollAnimatedSection`. *(CP-C6 corrected 2026-10-27: was cited as `:49`)*.
    - `Card/ClientCard/Card.tsx:12` uses named `export const TestimonialCard = ...` re-exported via `index.ts`. *(CP-C7 corrected 2026-10-27: was cited as `:13`)*.
  - Path alias `@/` is used interchangeably with relative paths `../../` across identical component imports (e.g. `import SuperHeader from "@/types/components/SuperHeader"` vs `import { Button } from "../components/Button/Button"`).

---

## 3. Real Conventions vs Single-Instance Patterns

| Dimension | Real Convention (≥3 Instances) | Single-Instance Pattern (Do Not Promote) |
|---|---|---|
| **Class Architecture** | Functional components with Hooks throughout (`ScrollAnimationSection`, `SuperHeader`, `ToastContainer`, `ContactForm`). | OOP class logic abstraction (`class ButtonLogic` in `Buttons.ts:16` and `class CardLogic` in `ServicesCard/Card.ts`). Used in only 2 components; adds unnecessary indirection. |
| **Animation Trigger** | `IntersectionObserver` via React refs & state (`ScrollAnimationSection.tsx:17-35`). *(CP-C6 corrected 2026-10-27: was cited as `:13-33`)*. | Bare `data-aos` HTML attributes with global `AOS.init()` side-effects. |
| **Button Shape** | `rounded-full` pill buttons across all public CTAs (`Buttons.ts:55`, `PrimaryButton.tsx:44`, `HeroPage.tsx:111`, `WhatWeDo.tsx:81, 182`). | Full-width squared triggers (`Faq.tsx:49`) — explicitly documented waiver. *(CP-C7 corrected 2026-10-27: Faq button tag is :49)*. |
| **Accent Formatting** | Markdown asterisk split `*highlight*` for dual-tone headings (`SuperHeader.tsx:3-28`). | Hardcoded colored spans directly in page JSX (`HeroPage.tsx`, `Team.tsx`). |
| **Styling Abstraction** | Tailwind utility classes in `className`. | Custom em-based inline styling props (`BlackButton.tsx:17` and `Book.tsx:21`). *(CP-C7 corrected 2026-10-27: BlackButton is em-based `:17`, not raw pixel; Book button is `:21`)*. |

---

## 4. Compliance Pass & Universality Claims

### 4.1 Site-Wide Button Rule: "All buttons are `rounded-full`"
- **Claim Under Test:** Every button in public routes satisfies `rounded-full`.
- **Grep Evidence Across Exact Repository Scopes:** *(CP-C1 corrected 2026-10-27: replaced fabricated numbers with exact repo-wide verified grep counts)*
  - **All `frontend/src` (`.tsx` + `.ts`), case-insensitive:** 162 `<button`-spelling occurrences, 154 `rounded-full` occurrences across 65 and 56 files respectively. *(CP-C1-R corrected 2026-10-27: the 162 was a case-insensitive count; split by case-sensitive scan — **152 native `<button` tags + 10 `<Button…` matches**, of which only **8 are live `<Button>` JSX usages** (`Header.tsx:63` · `ClientReviewsSection.tsx:41,48,118,125` · `MapDesign.tsx:175` · `ServicesSections.tsx:43,49`), 1 is commented-out JSX (`WhoWeAre.tsx:156`, inside the `{/** … */}` block starting :154), and 1 is the TS generic `<ButtonOptions>` (`Button/Button.tsx:5`).)*
  - **Non-admin scope (`frontend/src` excluding `components/admin/` and `pages/admin/`):** 120 `<button` occurrences, 139 `rounded-full` occurrences.
  - **Components-only scope (`frontend/src/components/`):** 137 `<button` occurrences, 91 `rounded-full` occurrences.
- **Split Breakdown (Violations vs Documented Waivers vs Compliant Confirmations):** *(CP-C9 corrected 2026-10-27: cleanly separated violations from compliant confirmations)*
  - **Non-rounded-full Violations & Unstyled Targets:**
    1. `MobileMenu.tsx:36`: `<button onClick={closeMenu} className="self-end text-white text-2xl font-bold focus:outline-none" aria-label="Close menu">×</button>` — Unstyled square hit box (F11 touch target defect).
    2. `BookingCalendar.tsx:198, 207, 235, 295, 322, 361, 393`: Calendar day and navigation buttons use squared/rounded-lg shapes specific to grid day tiles.
  - **Documented Waivers:**
    1. `Faq.tsx:49`: `<button onClick={() => toggle(index)} className="flex justify-between items-center w-full py-7 px-8 text-left group">` — **Documented waiver**: Faq.tsx:45-48 explicitly notes: *"Site rule 'buttons are rounded-full' is waived for this full-width accordion trigger by documented exception (2026-10-19 desktop audit decision — the rounded-2xl wrapper supplies the visible corners)."*
  - **Compliant Public Confirmations:**
    1. `ContactForm.tsx:184`: `<button type="submit" ... className="w-full py-4 rounded-full font-bold ...">` (tag at :184, class at :187).
    2. `ProductItemCTA.tsx:29, 35`: Both buttons carry `rounded-full` in `className` (:31, :39).
    3. `HeroPage.tsx:109`: `<button ... className="group relative rounded-full ...">` (tag at :109, class at :111).
    4. `WhatWeDo.tsx:79, 180`: Standalone public CTAs carry `rounded-full` (:81, :182).
- **Verdict:** Holds true for all standalone action CTAs and navigation buttons on public routes. Explicitly waived for the FAQ accordion triggers and specialized booking grid cells.

### 4.2 Shared Layer Fragmentation: `Button/` vs `buttons/` Split
- **Grep Evidence:**
  - `components/Button/Button.tsx`: Imported by `ClientReviewsSection.tsx:3`, `ServicesSections.tsx:3`, `MapDesign.tsx:1`, and `Header.tsx:3`.
  - `components/buttons/PrimaryButton.tsx`: Imported by `Navigation.tsx:5` only.
  - `components/buttons/BlackButton.tsx`: Imported by `MapCard.tsx:1` only (which itself has 1 consumer).
  - `components/buttons/Book.tsx`: **0 imports repo-wide** (dead component).
- **Verdict:** Proves significant fragmentation and duplicate button implementations. A single consolidated `<Button>` component supporting variants (`primary`, `outline`, `ghost`, `shadow`) can replace all 4 separate files.

---

## 5. Violations & Anti-Patterns Identified

1. **Dead & Orphaned Components:**
   - `frontend/src/components/buttons/Book.tsx`: 0 references across the repository.
   - `frontend/src/components/cards/ClientCard.tsx`: 0 references across the repository (distinct from `Card/ClientCard/Card.tsx` which is actively used in `ClientReviewsSection.tsx`).
   - `frontend/src/components/ContentContext.tsx`: 0 references across the repository (dead duplicate shadowing the live `frontend/src/ContentContext.ts`).
2. **Active vs Misattributed Components:** *(CP-C2 corrected 2026-10-27: Header.tsx is NOT dead)*
   - `frontend/src/components/Header.tsx` is **not dead**: it is imported by `AdminGuard.tsx:4` and rendered at `AdminGuard.tsx:22` across all authenticated admin routes (as well as consuming `Button.tsx:3`). It is absent only from public routes.
3. **Type/Component Directory Inversion:**
   - Code components placed in `frontend/src/types/components/SuperHeader.tsx` and `frontend/src/types/components/Buttons.ts`. TypeScript typings and JSX implementations should reside in standard component directories.
4. **Missing Prop Forwarding (`Button.tsx:6-33`):**
   - The shared `Button` does not accept standard HTML button attributes or `aria-label`, which led to accessibility finding F1 (unnamed review arrow controls).
5. **Hardcoded CSS Duplicate Rules:**
   - `Card/ClientCard/Card.tsx:24` declares manual inline box-shadow offsets identical to `.card-side-glow` defined in `index.css:48-52`.

---

## 6. Recommendations for Component Reusability & Consolidation

1. **Consolidate Button Hierarchy:**
   - Retire `components/buttons/PrimaryButton.tsx`, `BlackButton.tsx`, and dead `Book.tsx`.
   - Update `components/Button/Button.tsx` to accept `React.ButtonHTMLAttributes<HTMLButtonElement>`, remove OOP class indirection (`ButtonLogic`), and support variant props (`variant="primary" | "secondary" | "shadow" | "outline"`).
2. **Move Components Out of `types/`:**
   - Relocate `types/components/SuperHeader.tsx` to `components/common/SuperHeader.tsx` and update path references across all 11 consuming files (`WhoWeAre`, `Faq`, `WhatWeDo`, `ContactUsPage`, `ProductPage`, `EncourageCard`, `Team`, `ClientReviewsSection`, `PartnerSection`, `SolutionSection`, `WhyChooseUs`). *(CP-C8 corrected 2026-10-27: was cited as "9 consuming pages" — exactly 11 consuming files exist across pages and sections)*.
3. **Purge Dead Duplicates:**
   - Remove orphaned files: `components/buttons/Book.tsx`, `components/cards/ClientCard.tsx`, and `components/ContentContext.tsx`.
4. **Standardize Export Strategy:**
   - Adopt named exports with barrel `index.ts` files for compound components (`Button`, `Card`, `Modal`).
5. **Enforce Semantic Container Wrapping:**
   - Standardize animation wrappers like `ScrollAnimatedSection` as the sole scroll-reveal abstraction, phasing out loose `data-aos` declarations.
