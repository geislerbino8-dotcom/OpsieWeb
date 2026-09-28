# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-09-28

### Fixed

- **`C:\OJT\OpsieWebsite\frontend\src\index.css`** — Removed duplicate `@import` statements (Google Fonts and Tailwind CSS were imported twice)
- **`C:\OJT\OpsieWebsite\frontend\src\components\Form.tsx`** — Added controlled form state with `useState`, `onSubmit` handler, and success state; inputs now have proper `value`/`onChange` bindings and validation
- **`C:\OJT\OpsieWebsite\frontend\src\components\MobileMenu.tsx`** — Fixed missing `useLocation` import (was referencing `location` undefined); fixed `closeMenu(true)` call to `closeMenu()`; replaced index-based keys with stable `item.link` keys; added `MobileMenuProps` type; added `aria-label` to close button
- **`C:\OJT\OpsieWebsite\frontend\src\components\Navigation.tsx`** — Replaced `window.location.href` with React Router `<Link>` for product dropdown navigation; fixed scroll-hide logic to only trigger after 80px scroll threshold; added `useRef` for proper timeout cleanup; replaced index-based keys with `item.link` keys; added `aria-label` to mobile menu toggle; added `{ passive: true }` to scroll listener
- **`C:\OJT\OpsieWebsite\frontend\src\components\HeroPage.tsx`** — Removed empty `div` with `data-aos="zoom-in"` that served no purpose
- **`C:\OJT\OpsieWebsite\frontend\src\components\Footer.tsx`** — Fixed stray backtick in className; replaced `<a href>` with React Router `<Link>` for internal navigation; replaced HTML entity `&copy;` with literal character; fixed empty `href=""` links
- **`C:\OJT\OpsieWebsite\frontend\src\components\Header.tsx`** — Removed empty `<a href=""></a>` element; replaced `alert()` with `useNavigate` for "Get Started" button; added `alt` attribute to icon image
