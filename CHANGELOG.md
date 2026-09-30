# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-09-30

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
