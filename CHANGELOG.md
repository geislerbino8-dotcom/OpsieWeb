# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-10-01

### Added

- **`C:\OJT\OpsieWebsite\frontend\src\components\LayoutPractice.tsx`** — new practice component with 6 Flexbox/Grid layout exercises: flex fundamentals, grow/shrink/basis, intrinsic sizing via `auto-fit`, responsive grid columns, sidebar/content/aside with `min-w-0` overflow guard, and a `items-start` / `items-center` / `items-stretch` alignment audit
- **`/layout-practice` route** — `C:\OJT\OpsieWebsite\frontend\src\Router.tsx` — registers the practice component so it can be inspected at different viewport widths

### Fixed

- **Invalid `xs:` breakpoint** — `C:\OJT\OpsieWebsite\frontend\src\components\LayoutPractice.tsx` — `xs:grid-cols-2` referenced a breakpoint not defined in `tailwind.config.js` (silently ignored); replaced with the `sm` → `md` → `xl` chain

### Verified

- **Responsive check at 360 / 753 / 1265px** — no horizontal overflow (`scrollWidth === clientWidth` at all three widths); grid columns step 1 → 3 → 4; flex direction flips `column` → `row` at `sm`; section gaps hold at a consistent 24px with a single left edge per viewport; alignment audit confirms `flex-start` / `center` / `stretch` behave distinctly at every width

---

## [Unreleased] - 2026-10-01 (error audit)

Full project audit: `tsc -b`, `vite build` and `eslint` were run across `frontend/`, then every reported problem was triaged into *real bug*, *safe fix*, or *out of scope*. Note: the root `tsconfig.json` declares `"files": []`, so `npx tsc --noEmit` type-checks nothing — the authoritative check is `npx tsc -b`, which surfaced two build-breaking errors that had gone unnoticed.

### Fixed

- **Crash: undefined `navigate`** — `frontend/src/pages/WhatWeDo.tsx` — the "Book a Consultation" button called `navigate("/book-a-schedule")` but the hook variable was declared as `Navigate`, so clicking it threw `ReferenceError` (build error TS2552). Renamed the hook variable to the conventional `navigate`.
- **Build error: implicit `any`** — `frontend/src/components/Navigation.tsx` — `products.map((prod) => …)` had no parameter type while every other consumer of `products` annotates it; annotated `{ name: string }` (build error TS7006).
- **Duplicate `/buy-now` route** — `frontend/src/Router.tsx` — removed the second identical route entry.
- **Duplicate CSS import** — `frontend/src/App.tsx` — `import './App.css'` appeared twice.
- **Non-breaking spaces** — `frontend/src/pages/WhoWeAre.tsx` — 7 × U+00A0 replaced with normal spaces (`no-irregular-whitespace`).
- **Unresolved-asset build warning** — `frontend/src/styles/ProductSection.css` — deleted the dead `.product-section-container` block that referenced a non-existent `ProductSection.png`; the build warning is gone.
- **Dead code** — `frontend/src/components/Navigation.tsx` — removed unused `directToHome` left over from the accessibility pass.
- **CMS Cancel buttons did nothing** — `frontend/src/components/webcontent/sections/FaqSectionCMS.tsx` (`handleCancel;` → `handleCancel();`) and `ClientSectionCMS.tsx` (preview `onClick` never entered edit mode, and Cancel discarded edits instead of reverting them).
- **CMS crash on Cancel** — `frontend/src/components/webcontent/sections/AboutPageCMS.tsx` — `content?.draftSection…` referenced a field that does not exist (`draftSection`), throwing on Cancel; corrected to `draftContent`.
- **CMS save silently discarded** — `frontend/src/components/webcontent/sections/EncourageCTACMS.tsx` — saved to top-level `path: "encouragecard"`; `WebContentSchema` only declares `publishedContent` / `draftContent`, so Mongoose strict mode stripped the `$set` and the edit never persisted. Now `draftContent.encouragecard`.
- **CMS state-sync anti-pattern** — 15 CMS components (`WhatWeDoCMS`, `AboutPageCMS`, `ClientSectionCMS`, `ContactUsSectionCMS`, `EncourageCTACMS`, `FaqSectionCMS`, `FooterCMS`, `HeroPageCMS`, `PartnerSectionCMS`, `ProductItemCTACMs`, `ProductSectionCMS`, `ProductsPageCMS`, `ServicesPageCMS`, `WhoWeAreCMS`, `ViewProductModal`) — replaced the `useEffect` that copied context/props into state with React's render-time state-adjustment pattern (`react-hooks/set-state-in-effect`).
- **`useAuth` set-state-in-effect** — `frontend/src/hooks/useAuth.tsx` — replaced the mount effect with a lazy `useState` initializer reading `localStorage`.
- **`useToast` impure call** — `frontend/src/hooks/useToast.ts` — `Date.now()` for toast IDs replaced with a module-level monotonic counter (also guarantees unique IDs for toasts created in the same millisecond).
- **Use-before-declaration** — `frontend/src/components/MapBox.tsx`, `admin/pages/DashboardPage.tsx`, `charts/AnalyticsLineChart.tsx` — moved function declarations above the effects that call them.
- **Unused code / lint cleanups** — removed unused `setIsDarkMode` (`admin/common/useTheme.ts`); `let` → `const` in `App.tsx`, `webcontent/WebContentFrom.tsx`, `data/usePageContent.ts`; logged the swallowed error in `admin/ticketing/TicketTimeline.tsx`; documented the intentionally-empty `catch` blocks in `SplitText.tsx`.
- **ESLint config** — `frontend/eslint.config.js` — `@typescript-eslint/no-unused-vars` now honours the standard `_` prefix (`argsIgnorePattern`, `caughtErrorsIgnorePattern`, `varsIgnorePattern`) so intentionally-unused params are not reported.

### Verified

- `npx tsc -b --force` — **0 errors** (previously 2 build-breaking errors).
- `npm run build` (`tsc -b && vite build`) — **succeeds**; the `ProductSection.png` unresolved-asset warning no longer appears.
- `npx eslint` — **196 → 151 errors**; 139 of the remainder are `no-explicit-any` (explicitly out of scope), leaving **12 non-`any` errors**.

### Not changed (per scope decision)

- **139 × `@typescript-eslint/no-explicit-any`** across 54 files — deliberately left alone.
- **20 × `react-hooks/exhaustive-deps`** warnings and **13 × `react-hooks/unsupported-syntax`** (inline `class` declarations in `LiquidEther.tsx`, which the React Compiler simply skips) — left alone.
- **Remaining errors (batch 1)**: 4 × `react-refresh/only-export-components` (`App.tsx`, `ConfirmContext.tsx`, `WebContentFrom.tsx`, `useAuth.tsx` — fixed in batch 2 below), 4 × `set-state-in-effect` (`Carousel.tsx` ×2 [never imported] — fixed in batch 2 below; `DashboardPage.tsx`, `AnalyticsLineChart.tsx`), 2 × `prefer-const` (`LineWaves.tsx`, `SoftAurora.tsx` — `program` is read by `resize()` before its assignment, so converting to `const` requires reordering WebGL init), 1 × `react-hooks/refs` (`TextType.tsx` — fixed in batch 2 below), 1 × `preserve-manual-memoization` (`CardSwap.tsx`, never imported — still open, see batch 2).
- **~40 never-imported files** (including 4 with broken asset/CSS imports and 2 empty files) — left in place, not deleted.

### Known issue (needs a decision)

- **`frontend/src/components/webcontent/sections/FooterCMS.tsx` reads `draftContent.faqSection` but saves to top-level `heroSection`.** Because `WebContentSchema` has no top-level `heroSection`, Mongoose strict mode strips the update, so Save is currently a no-op (harmless but broken). The component is clearly an unfinished stub: heading says "Edit Hero Section", it has **no input fields**, and the schema does define an unused `footerSection`. Not auto-fixed — pointing it at `draftContent.faqSection` would make it a second FAQ editor that could overwrite FAQ edits with stale data, and pointing it at `footerSection` would change what is displayed. Needs the intended target confirmed.

### Batch 2 — context splits & remaining hook fixes

Continues the same audit. Root cause of the 4 `react-refresh/only-export-components` errors was that each of these modules exported a React context/hook alongside a component, which prevents Fast Refresh from preserving component state (every edit did a full page reload).

- **Split contexts out of component modules** — one new file per context, so each module now exports exactly one kind of thing:
  - `ContentContext` (+ `ContentType`) moved from `frontend/src/App.tsx` → **`frontend/src/ContentContext.ts`** (16 importers).
  - `WebContentContext` moved from `frontend/src/components/webcontent/WebContentFrom.tsx` → **`frontend/src/components/webcontent/WebContentContext.ts`** (14 importers).
  - `useConfirm` (+ `ConfirmContext`, `ConfirmOptions`) moved from `frontend/src/components/admin/context/ConfirmContext.tsx` → **`frontend/src/components/admin/context/useConfirm.ts`** (3 importers). `ConfirmContext.tsx` now exports only `ConfirmProvider`.
  - `useAuth` (+ `AuthContext`) moved from `frontend/src/hooks/useAuth.tsx` → **`frontend/src/hooks/authContext.ts`** (4 importers). `useAuth.tsx` now exports only `AuthProvider`.
  - All **37 import sites** rewritten to the new module paths; `AuthProvider` / `ConfirmProvider` importers were left untouched.
  - Side benefit: the 34 consumer modules no longer pull in `App.tsx` / `WebContentFrom.tsx` just to read a context, which decouples them from the app shell.
- **`react-hooks/refs` false positive** — `frontend/src/components/TextType.tsx` — the compiler could not prove that the `ref` passed to `createElement(Component, …)` was attached to a host element rather than a custom component that might read it during render. Replaced `createElement(...)` with equivalent JSX, narrowed `as` from `ElementType` to `keyof React.JSX.IntrinsicElements` (neither caller ever passes `as`, so it is always a DOM tag), and typed `containerRef` as `HTMLDivElement` to match. **Behaviour unchanged.**
- **`set-state-in-effect` ×2** — `frontend/src/components/Carousel.tsx` (never imported) — the two effects that clamped/reset the slide index were converted to React's render-time state-adjustment pattern; only the `x.set(...)` sync on the external motion value remains in an effect (dropping `items.length` from its deps is a no-op, since `x.set` only reads `loop` and `trackItemOffset`).

### Batch 2 — Verified

- `npx tsc -b --force` — **0 errors**.
- `npm run build` — **succeeds** (only the pre-existing >500 kB chunk-size warning).
- `npx eslint` — **147 → 140 errors**, 33 warnings. Of the 140, **139 are `no-explicit-any`** (out of scope), leaving **1 non-`any` error**:
  - 1 × `react-hooks/preserve-manual-memoization` in `CardSwap.tsx` line 99 — `useMemo(…, [childArr.length])` where the React Compiler infers `childArr`. **Not auto-fixed**: the file is never imported, and widening the dependency to `childArr` would recreate the GSAP card refs on every parent re-render — a behaviour change in untestable code. It is a "compiler skipped optimising this component" notice, not a correctness bug.

### Batch 2 — Not changed (per scope decision)

- **139 × `no-explicit-any`**, **20 × `react-hooks/exhaustive-deps`**, **13 × `react-hooks/unsupported-syntax`** — untouched as agreed.
- **`CardSwap.tsx` `preserve-manual-memoization`** — see above; needs a decision if that component is ever wired up.
- **`FooterCMS.tsx`** — still awaiting the decision described above.

---

## [Unreleased] - 2026-09-30

### Changed

- **Calendly → Timekit** — `C:\OJT\OpsieWebsite\frontend\src\components\BookingPage.tsx` — replaced `react-calendly` `InlineWidget` with Timekit booking-js v3 loaded from CDN, mounting the `opsie-schedule-a-meeting` project into `#timekit-booking`
- **Removed `react-calendly`** — `C:\OJT\OpsieWebsite\frontend\package.json` — dependency uninstalled, no longer used
- **Navigation DateTimeDisplay** — `C:\OJT\OpsieWebsite\frontend\src\components\Navigation.tsx` — resized into a smaller tab beside Products / Get Started

### Added

- **Skip navigation link** — `C:\OJT\OpsieWebsite\frontend\src\Layout.tsx` — "Skip to main content" link for keyboard users
- **Semantic `<main>` element** — `C:\OJT\OpsieWebsite\frontend\src\Layout.tsx` — wraps page content with `id="main-content"` and `tabIndex={-1}`
- **Focus-visible styles** — `C:\OJT\OpsieWebsite\frontend\src\index.css` — purple outline on keyboard focus
- **Reduced motion support** — `C:\OJT\OpsieWebsite\frontend\src\index.css` — `@media (prefers-reduced-motion: reduce)` disables animations

### Fixed

- **Navigation logo accessibility** — `C:\OJT\OpsieWebsite\frontend\src\components\Navigation.tsx` — `<div onClick>` → `<Link>` for keyboard navigation
- **Navigation ARIA attributes** — `C:\OJT\OpsieWebsite\frontend\src\components\Navigation.tsx` — added `aria-current="page"`, `aria-expanded`, `aria-haspopup`, `aria-label` on dropdown
- **Mobile menu accessibility** — `C:\OJT\OpsieWebsite\frontend\src\components\Navigation.tsx` — added `aria-expanded` to toggle button
- **Footer link accessibility** — `C:\OJT\OpsieWebsite\frontend\src\components\Footer.tsx` — added `<Link>` to "Our Story", "Our Mission", "Our Vision"
- **Social icon sizing** — `C:\OJT\OpsieWebsite\frontend\src\components\Footer.tsx` — fixed inconsistent `text-3xl md:w-4 md:h-4 lg:w-8 lg:h-8` → `w-5 h-5`
- **MobileMenu nav label** — `C:\OJT\OpsieWebsite\frontend\src\components\MobileMenu.tsx` — added `aria-label="Mobile navigation"`

---

## [2026-09-29]

### Fixed

- **`C:\OJT\OpsieWebsite\frontend\src\pages\WhatWeDo.tsx`** — Replaced `window.location.href` with `useNavigate()` for "Book a Consultation" button
- **`C:\OJT\OpsieWebsite\frontend\src\pages\sections\WhyChooseUsSection.tsx`** — Replaced `window.location.href` with `useNavigate()` for "See how we work" button; added `useNavigate` import
- **`C:\OJT\OpsieWebsite\frontend\src\pages\sections\ContactProcessSection.tsx`** — Replaced `window.location.href` with `useNavigate()` for "Start Your Journey" button; added `useNavigate` import
- **`C:\OJT\OpsieWebsite\frontend\src\pages\WhoWeAre.tsx`** — Fixed invalid Tailwind classes: `md:bg-black/60` (removed), `lg:ml-50` → `lg:ml-12`, `lg:leading-16` → `lg:leading-[4rem]`
- **`C:\OJT\OpsieWebsite\frontend\src\pages\ContactUsPage.tsx`** — Removed conflicting `bg-[#ECEDF1]` class (kept `bg-[#FAFBFF]`)
- **`C:\OJT\OpsieWebsite\frontend\src\pages\ProductPage.tsx`** — Removed duplicate `AOS.init()` call (already initialized in App.tsx); removed unused AOS import

### Added

- **`C:\OJT\OpsieWebsite\frontend\src\components\DateTimeBar.tsx`** — New breaking news style date/time bar component with dark date section and yellow time section
- **`C:\OJT\OpsieWebsite\frontend\src\Layout.tsx`** — Integrated DateTimeBar below Navigation header
- **`C:\OJT\OpsieWebsite\frontend\src\components\BookingPage.tsx`** — Added dark mode toggle with Moon/Sun icons, smooth transitions, and Calendly widget color adaptation

### Changed

- **`C:\OJT\OpsieWebsite\frontend\src\index.css`** — Removed duplicate `@import` statements (Google Fonts and Tailwind CSS were imported twice)
- **`C:\OJT\OpsieWebsite\frontend\src\components\Form.tsx`** — Added controlled form state with `useState`, `onSubmit` handler, and success state; inputs now have proper `value`/`onChange` bindings and validation
- **`C:\OJT\OpsieWebsite\frontend\src\components\MobileMenu.tsx`** — Fixed missing `useLocation` import; fixed `closeMenu(true)` call to `closeMenu()`; replaced index-based keys with stable `item.link` keys; added `MobileMenuProps` type; added `aria-label` to close button
- **`C:\OJT\OpsieWebsite\frontend\src\components\Navigation.tsx`** — Replaced `window.location.href` with React Router `<Link>` for product dropdown navigation; fixed scroll-hide logic to only trigger after 80px scroll threshold; added `useRef` for proper timeout cleanup; replaced index-based keys with `item.link` keys; added `aria-label` to mobile menu toggle; added `{ passive: true }` to scroll listener
- **`C:\OJT\OpsieWebsite\frontend\src\components\HeroPage.tsx`** — Removed empty `div` with `data-aos="zoom-in"` that served no purpose
- **`C:\OJT\OpsieWebsite\frontend\src\components\Footer.tsx`** — Fixed stray backtick in className; replaced `<a href>` with React Router `<Link>` for internal navigation; fixed empty `href=""` links
- **`C:\OJT\OpsieWebsite\frontend\src\components\Header.tsx`** — Removed empty `<a href=""></a>` element; replaced `alert()` with `useNavigate` for "Get Started" button; added `alt` attribute to icon image

---

## [2026-09-28]

### Fixed

- **`C:\OJT\OpsieWebsite\frontend\src\index.css`** — Removed duplicate `@import` statements (Google Fonts and Tailwind CSS were imported twice)
- **`C:\OJT\OpsieWebsite\frontend\src\components\Form.tsx`** — Added controlled form state with `useState`, `onSubmit` handler, and success state; inputs now have proper `value`/`onChange` bindings and validation
- **`C:\OJT\OpsieWebsite\frontend\src\components\MobileMenu.tsx`** — Fixed missing `useLocation` import (was referencing `location` undefined); fixed `closeMenu(true)` call to `closeMenu()`; replaced index-based keys with stable `item.link` keys; added `MobileMenuProps` type; added `aria-label` to close button
- **`C:\OJT\OpsieWebsite\frontend\src\components\Navigation.tsx`** — Replaced `window.location.href` with React Router `<Link>` for product dropdown navigation; fixed scroll-hide logic to only trigger after 80px scroll threshold; added `useRef` for proper timeout cleanup; replaced index-based keys with `item.link` keys; added `aria-label` to mobile menu toggle; added `{ passive: true }` to scroll listener
- **`C:\OJT\OpsieWebsite\frontend\src\components\HeroPage.tsx`** — Removed empty `div` with `data-aos="zoom-in"` that served no purpose
- **`C:\OJT\OpsieWebsite\frontend\src\components\Footer.tsx`** — Fixed stray backtick in className; replaced `<a href>` with React Router `<Link>` for internal navigation; replaced HTML entity `&copy;` with literal character; fixed empty `href=""` links
- **`C:\OJT\OpsieWebsite\frontend\src\components\Header.tsx`** — Removed empty `<a href=""></a>` element; replaced `alert()` with `useNavigate` for "Get Started" button; added `alt` attribute to icon image
