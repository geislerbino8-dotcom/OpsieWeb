# Draft PR: Fix Critical Style & Navigation Issues

## Summary
Resolves critical styling inconsistencies and navigation issues across all public pages.

## Changes Made

### 1. Fixed `window.location.href` → `useNavigate()` (SPA navigation)
- `C:\OJT\OpsieWebsite\frontend\src\pages\WhatWeDo.tsx` — "Book a Consultation" button
- `C:\OJT\OpsieWebsite\frontend\src\pages\sections\WhyChooseUsSection.tsx` — "See how we work" button
- `C:\OJT\OpsieWebsite\frontend\src\pages\sections\ContactProcessSection.tsx` — "Start Your Journey" button

### 2. Fixed Invalid Tailwind Classes in WhoWeare
- `md:bg-black/60` → removed (invalid class with space)
- `lg:ml-50` → `lg:ml-12` (invalid class)
- `lg:leading-16` → `lg:leading-[4rem]` (invalid class)

### 3. Fixed Conflicting Background Classes
- `C:\OJT\OpsieWebsite\frontend\src\pages\ContactUsPage.tsx` — removed duplicate `bg-[#ECEDF1]`

### 4. Removed Duplicate AOS Initialization
- `C:\OJT\OpsieWebsite\frontend\src\pages\ProductPage.tsx` — removed `AOS.init()` (already in App.tsx)

## Files Changed
| File | Changes |
|---|---|
| `C:\OJT\OpsieWebsite\frontend\src\pages\WhatWeDo.tsx` | 1 line |
| `C:\OJT\OpsieWebsite\frontend\src\pages\ContactUsPage.tsx` | 1 line |
| `C:\OJT\OpsieWebsite\frontend\src\pages\WhoWeAre.tsx` | 4 lines |
| `C:\OJT\OpsieWebsite\frontend\src\pages\ProductPage.tsx` | 5 lines |
| `C:\OJT\OpsieWebsite\frontend\src\pages\sections\WhyChooseUsSection.tsx` | 4 lines |
| `C:\OJT\OpsieWebsite\frontend\src\pages\sections\ContactProcessSection.tsx` | 4 lines |

## Testing
- [x] TypeScript compilation passes (`npx tsc --noEmit`)
- [ ] Visual regression testing on desktop
- [ ] Visual regression testing on mobile
- [ ] Cross-browser testing

## Next Steps
1. Review and approve PR
2. Test on staging environment
3. Address any feedback
4. Merge to main
