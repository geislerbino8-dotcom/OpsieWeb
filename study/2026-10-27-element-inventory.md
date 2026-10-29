# Element Inventory — 2026-10-27 (PLAN:59)

**Scope:** element-level UI (buttons · cards · fields · modals · charts · wrappers) reachable from the
**3 previously assigned pages**: **Homepage `/`** + **WhatWeDo `/what-we-do`** (assigned at PLAN:64) and
**ContactUs `/contact-us` + `/book-a-schedule`** (assigned in the Block-2 contactform sketch roster,
PLAN:145). Elements mounting on other routes (`/who-we-are`, `/products`, `/products/:id`, admin) are
included when they share a system with an assigned-page element — every such row names its extra pages.
**No code changes** (md-only deliverable). Category counts from the 2026-10-26/27 conventions work
(`study/2026-10-27-component-practices.md`) are cited, not resubmitted.

## 1. Method & call-site counting rule

Call-site counts come **only from the pasted command output in §3** (re-runnable script
`C:\Users\kingg\AppData\Local\Temp\opencode\inv2.mjs`). Per the CP-C1-R lesson, the output itself carries
its scope header: **case-sensitive** literal scan of `frontend/src/**/*.{ts,tsx}`
(node_modules excluded, 190 files, scanned 2026-10-27); `imports` = lines whose `from "…"` source ends
with the element's path tail; `renders` = `<Name` word-boundary matches anywhere in a line. Local binding
aliases are enumerated per element (a default export can be imported under any name — e.g.
`FAQAccordion` also imported as `Faq`, `SuperHeader` as `HighlightedText`, `BookingCalendar` as `Calendar`).
Commented-out JSX (`{/* … */}` / `{/** … */}` blocks) matches the render regex but is **not live** —
every such case is named in the row or in §4.

## 2. Element rows (20 elements)

Shared = currently-shared reusable component (yes/no); Props API cited `file:line`.

| # | Element | Purpose | Source path | Pages it mounts on (assigned pages bold) | Shared | Props API | Call-sites (§3 output) |
|---|---|---|---|---|---|---|---|
| 1 | `Button` | Generic CTA button (label + optional icon, variant/weight classes) | `components/Button/Button.tsx:5` | **WhatWeDo** (ServicesSections:43,49 + ClientReviewsSection:41,48,118,125), **Homepage** + `/products` (ClientReviewsSection via Homepage:8, ProductPage:7), `/who-we-are` (MapDesign:175), admin routes (Header:63 via AdminGuard) | yes | `ButtonOptions` `types/components/Buttons.ts:3-14` | 5 imports (1 = barrel `Button/index.ts:1`), 9 render tags = **8 live** + 1 commented (WhoWeAre:156) |
| 2 | `PrimaryButton` | Nav-bar "Get Started" CTA | `components/buttons/PrimaryButton.tsx:13` | **all 4 assigned/public pages** via Navigation (Layout:17 → App:60) | yes (single system, single consumer) | `PrimaryButtonProps` `PrimaryButton.tsx:3-10` (text, onClick?, variant?, size?) | 1 import, 1 render (Navigation:189) |
| 3 | `BlackButton` | Violet CTA inside the map contact card | `components/buttons/BlackButton.tsx:14` | **/contact-us** (MapCard:49 ← ContactUsPage:137), **Homepage** (MapCard:66 ← ContactUsSection:66 ← Homepage:5) | no — app-coupled, 1 consumer chain | `BlackButtonProps` `BlackButton.tsx:2-11` (text, fontSize, borderRadius, margin, image, onPress) | 1 import, 1 render |
| 4 | `ContactForm` | Inquiry/ticket form (posts via `createTicket`) | `components/cards/ContactForm.tsx:11` | **/contact-us** (ContactUsPage:59), **Homepage** (ContactUsSection:62 ← Homepage:5) + dead-file render (ContactUs.tsx:63) | no — app-coupled (API + toast + data imports) | none (`function ContactForm()` `:11`) | 3 imports, 3 renders (**2 live** + 1 in dead `ContactUs.tsx`) |
| 5 | `ContactsCard` | Parametrized contact-info card (icon/title/body) | `components/cards/ContactsCard.tsx:11` | **/contact-us** ×2 (ContactUsPage:64,80) | yes (parametrized) | `ContactsCardType` `ContactsCard.tsx:3-11` (title, children, className, color, textColor) | 1 import, 2 renders |
| 6 | `MapCard` | Embedded office map + hours card | `components/cards/MapCard.tsx:8` | **/contact-us** (ContactUsPage:137), **Homepage** (ContactUsSection:66) | yes (2 page-mounts, no props) | none (`:8`) | 2 imports, 2 renders |
| 7 | `ProductItemCTA` | Product promo CTA band | `components/cards/ProductItemCTA.tsx:7` | **Homepage** (78), `/products` (ProductPage:225), `/products/:id` (ProductItemPage:360) | yes (3 pages) | none (`:7`) | 3 imports, 3 renders |
| 8 | `AnalyticsCards` | Stat card (CountUp number + unit + desc) | `components/cards/AnalyticsCards.tsx:9` | `/products` ×4 (ProductPage:149-152), `/products/:id` ×1 (ProductItemPage:197) + dead-file ×4 (`pages/sections/Analytics.tsx:56-68`) | yes (5 live renders) | `AnalyticsCardsProps` `AnalyticsCards.tsx:3-9` (numbers, unit, desc) | 3 imports (1 = dead file), 9 renders (**5 live**) |
| 9 | `TestimonialCard` | Customer-review card | `components/Card/ClientCard/Card.tsx:12` | **Homepage**, `/products`, **WhatWeDo** (ClientReviewsSection:65,99 ← Homepage:8, ProductPage:7, WhatWeDo:2) | yes (3 pages) | `ClientCard` `Card/ClientCard/Card.tsx:3-12` | 1 import, 2 renders |
| 10 | `SuperHeader` | Section heading with `*highlight*` dual-tone spans | `types/components/SuperHeader.tsx:1` | **Homepage** (via AboutUsSection:60 + ServicesSection:20, both aliased `HighlightedText`), **WhatWeDo** (:145), **/contact-us** (ContactUsPage:30), `/products` (:84,:161), `/who-we-are` (:80,:146,:311), + dead files (PartnerSection:31, SolutionSection:10, Team:90) | yes — most-consumed shared component | inline anon type `SuperHeader.tsx:1` (text, type?, defColor?, position?) | 13 imports, 16 renders (**13 live**) |
| 11 | `ScrollAnimatedSection` | Scroll-reveal wrapper (`children`) | `src/ScrollAnimationSection.tsx:9` | **Homepage** only (:23–:81) | yes (sole scroll-reveal abstraction per CP §6.5, but 1-page usage) | `ScrollAnimatedSectionProps` `ScrollAnimationSection.tsx:3` (children) | 1 import, 10 renders |
| 12 | `ToastContainer` | Toast notification list | `components/admin/common/ToastComponent.tsx:7` | admin routes ×7 (LoginPage:89, UserMenu:161, Ticketing:500, UserMgmt:269, ProductCMS:229, UpdateProductModal:570, WebContentLayout:336) + **/contact-us** + **Homepage** (ContactForm:218) | yes (admin + public) | `Props` `ToastComponent.tsx:3-7` (toasts) | 8 imports, 8 renders |
| 13 | `ConfirmationModal` | Destructive-action confirm dialog (context-wrapped) | `components/admin/modals/ConfirmationModal.tsx:13` | admin routes only (ConfirmContext:35) | yes (admin-scoped, context-mediated) | `ConfirmationModalProps` `ConfirmationModal.tsx:3-21` | 1 import, 1 render |
| 14 | `LoadingOverlay` | Full-screen loading spinner | `components/admin/common/LoadingOverlay.tsx:1` | admin routes ×5 + webcontent CMS ×2 | yes (7 consumers) | none (`:1`) | 7 imports, 7 renders |
| 15 | `FAQAccordion` (bound as `Faq` on Homepage) | FAQ accordion | `components/FaqSection/Faq.tsx:8` | **Homepage** (:82), **WhatWeDo** (:219), `/who-we-are` (:516) | yes (3 pages) | none (`:8`) | 3 imports, 3 renders |
| 16 | `Footer` | Site footer (links, socials, EncourageCard) | `components/Footer.tsx:171` | **all public routes** (Layout:21) | yes | none | 1 import, 1 render |
| 17 | `MobileMenu` | Mobile nav sheet | `components/MobileMenu.tsx:71` | **all public routes** (Navigation:215) | yes | `MobileMenuProps` `MobileMenu.tsx:10` ({closeMenu} :14) — only roster component with props | 1 import, 1 render |
| 18 | `BookingCalendar` (bound as `Calendar`) | Booking date picker | `components/BookingCalendar.tsx:25` | **/book-a-schedule** (BookingPage:82) | no — 1 consumer, but generic-looking | none (`:25`) | 1 import, 1 render |
| 19 | `CountUp` | Animated number counter | `src/CountUp.tsx:4` (component ~:24-29) *(EI-C2 corrected 2026-10-29: `src/CountUp.tsx` is a **phantom path** — real file `frontend/src/components/CountUp.tsx`; the `src/` prefix implied a nonexistent subdirectory)* | `/who-we-are` ×3 (WhoWeAre:217,235,255) + via AnalyticsCards:21 → `/products`, `/products/:id` | yes | `CountUpProps` `CountUp.tsx:4-29` | 2 imports, 4 renders |
| 20 | `LogoLoop` | Scrolling logo marquee | `src/LogoLoop.tsx:21` (props interface) *(EI-C2 corrected 2026-10-29: `src/LogoLoop.tsx` is a **phantom path** — real file `frontend/src/components/LogoLoop.tsx`)* | `/who-we-are` ×1 **live** (WhoWeAre:198); PartnerSection:41 (dead file); WhatWeDo:124 + Footer:51 = **commented out** | nominally yes — effectively 1 live consumer | `LogoLoopProps` `LogoLoop.tsx:21`, `LogoItem` `:3` | 2 imports, 4 renders (**2 live**) |

**Honest gap:** no badge or chip components exist in `frontend/src` — the badge role is served by inline
spans in section files, so no badge row can be produced. Fields exist only inside `ContactForm`
(native `<input>`/`<select>`, `ContactForm.tsx:86-182`) — there is no shared field component.

## 3. Pasted command output (call-site counts)

```
SCOPE: case-sensitive scan, frontend/src/**/*.{ts,tsx} (node_modules excluded), 2026-10-27
RULE: import = from-source path tail match; render = <Name word-boundary anywhere in a line (aliases listed per element)

[Button (shared)] imports=5 -> components/Button/index.ts:1 , components/Header.tsx:3 , components/sections/ClientReviewsSection.tsx:3 , components/sections/MapDesign.tsx:1 , components/sections/ServicesSections.tsx:3
[Button (shared)] renders=9 -> components/Header.tsx:63 <Button , components/sections/ClientReviewsSection.tsx:41 <Button , components/sections/ClientReviewsSection.tsx:48 <Button , components/sections/ClientReviewsSection.tsx:118 <Button , components/sections/ClientReviewsSection.tsx:125 <Button , components/sections/MapDesign.tsx:175 <Button , components/sections/ServicesSections.tsx:43 <Button , components/sections/ServicesSections.tsx:49 <Button , pages/WhoWeAre.tsx:156 <Button
[PrimaryButton] imports=1 -> components/Navigation.tsx:5
[PrimaryButton] renders=1 -> components/Navigation.tsx:189 <PrimaryButton
[BlackButton] imports=1 -> components/cards/MapCard.tsx:1
[BlackButton] renders=1 -> components/cards/MapCard.tsx:49 <BlackButton
[Book (dead)] imports=0
[Book (dead)] renders=0
[ContactForm] imports=3 -> components/ContactUs.tsx:5 , pages/ContactUsPage.tsx:4 , pages/sections/ContactUsSection.tsx:5
[ContactForm] renders=3 -> components/ContactUs.tsx:63 <ContactForm , pages/ContactUsPage.tsx:59 <ContactForm , pages/sections/ContactUsSection.tsx:62 <ContactForm
[ContactsCard] imports=1 -> pages/ContactUsPage.tsx:5
[ContactsCard] renders=2 -> pages/ContactUsPage.tsx:64 <ContactsCard , pages/ContactUsPage.tsx:80 <ContactsCard
[MapCard] imports=2 -> pages/ContactUsPage.tsx:7 , pages/sections/ContactUsSection.tsx:4
[MapCard] renders=2 -> pages/ContactUsPage.tsx:137 <MapCard , pages/sections/ContactUsSection.tsx:66 <MapCard
[ProductItemCTA] imports=3 -> pages/Homepage.tsx:10 , pages/ProductItemPage.tsx:6 , pages/ProductPage.tsx:11
[ProductItemCTA] renders=3 -> pages/Homepage.tsx:78 <ProductItemCTA , pages/ProductItemPage.tsx:360 <ProductItemCTA , pages/ProductPage.tsx:225 <ProductItemCTA
[AnalyticsCards] imports=3 -> pages/ProductItemPage.tsx:7 , pages/ProductPage.tsx:12 , pages/sections/Analytics.tsx:3
[AnalyticsCards] renders=9 -> pages/ProductItemPage.tsx:197 <AnalyticsCards , pages/ProductPage.tsx:149 <AnalyticsCards , pages/ProductPage.tsx:150 <AnalyticsCards , pages/ProductPage.tsx:151 <AnalyticsCards , pages/ProductPage.tsx:152 <AnalyticsCards , pages/sections/Analytics.tsx:56 <AnalyticsCards , pages/sections/Analytics.tsx:60 <AnalyticsCards , pages/sections/Analytics.tsx:64 <AnalyticsCards , pages/sections/Analytics.tsx:68 <AnalyticsCards
[ClientCard.tsx (dead)] imports=0
[ClientCard.tsx (dead)] renders=1 -> pages/WhatWeDo.tsx:212 <ClientCard
[TestimonialCard] imports=1 -> components/sections/ClientReviewsSection.tsx:2
[TestimonialCard] renders=2 -> components/sections/ClientReviewsSection.tsx:65 <TestimonialCard , components/sections/ClientReviewsSection.tsx:99 <TestimonialCard
[SuperHeader] imports=13 -> components/cards/EncourageCard.tsx:2 , components/FaqSection/Faq.tsx:5 , components/sections/ClientReviewsSection.tsx:9 , components/sections/WhyChooseUs.tsx:2 , components/Team.tsx:1 , pages/ContactUsPage.tsx:10 , pages/ProductPage.tsx:22 , pages/sections/AboutUsSection.tsx:3 , pages/sections/PartnerSection.tsx:3 , pages/sections/ServicesSection.tsx:1 , pages/sections/SolutionSection.tsx:2 , pages/WhatWeDo.tsx:8 , pages/WhoWeAre.tsx:7
[SuperHeader] renders=16 -> components/cards/EncourageCard.tsx:25 <SuperHeader , components/FaqSection/Faq.tsx:23 <SuperHeader , components/sections/ClientReviewsSection.tsx:34 <SuperHeader , components/sections/WhyChooseUs.tsx:18 <SuperHeader , components/Team.tsx:90 <SuperHeader , pages/ContactUsPage.tsx:30 <SuperHeader , pages/ProductPage.tsx:84 <SuperHeader , pages/ProductPage.tsx:161 <SuperHeader , pages/sections/AboutUsSection.tsx:60 <HighlightedText , pages/sections/PartnerSection.tsx:31 <SuperHeader , pages/sections/ServicesSection.tsx:20 <HighlightedText , pages/sections/SolutionSection.tsx:10 <SuperHeader , pages/WhatWeDo.tsx:145 <SuperHeader , pages/WhoWeAre.tsx:80 <SuperHeader , pages/WhoWeAre.tsx:146 <SuperHeader , pages/WhoWeAre.tsx:311 <SuperHeader
[ScrollAnimatedSection] imports=1 -> pages/Homepage.tsx:6
[ScrollAnimatedSection] renders=10 -> pages/Homepage.tsx:23 <ScrollAnimatedSection , pages/Homepage.tsx:27 <ScrollAnimatedSection , pages/Homepage.tsx:35 <ScrollAnimatedSection , pages/Homepage.tsx:39 <ScrollAnimatedSection , pages/Homepage.tsx:45 <ScrollAnimatedSection , pages/Homepage.tsx:51 <ScrollAnimatedSection , pages/Homepage.tsx:63 <ScrollAnimatedSection , pages/Homepage.tsx:69 <ScrollAnimatedSection , pages/Homepage.tsx:74 <ScrollAnimatedSection , pages/Homepage.tsx:81 <ScrollAnimatedSection
[ToastContainer] imports=8 -> components/admin/header/UserMenu.tsx:13 , components/admin/pages/LoginPage.tsx:9 , components/admin/pages/TicketingSupportSystemPage.tsx:22 , components/admin/pages/UserManagementPage.tsx:13 , components/cards/ContactForm.tsx:4 , components/webcontent/sections/ProductCMS.tsx:7 , components/webcontent/sections/UpdateProductModal.tsx:6 , components/webcontent/WebContentLayout.tsx:18
[ToastContainer] renders=8 -> components/admin/header/UserMenu.tsx:161 <ToastContainer , components/admin/pages/LoginPage.tsx:89 <ToastContainer , components/admin/pages/TicketingSupportSystemPage.tsx:500 <ToastContainer , components/admin/pages/UserManagementPage.tsx:269 <ToastContainer , components/cards/ContactForm.tsx:218 <ToastContainer , components/webcontent/sections/ProductCMS.tsx:229 <ToastContainer , components/webcontent/sections/UpdateProductModal.tsx:570 <ToastContainer , components/webcontent/WebContentLayout.tsx:336 <ToastContainer
[ConfirmationModal] imports=1 -> components/admin/context/ConfirmContext.tsx:2
[ConfirmationModal] renders=1 -> components/admin/context/ConfirmContext.tsx:35 <ConfirmationModal
[LoadingOverlay] imports=7 -> components/admin/header/UserMenu.tsx:12 , components/admin/pages/LoginPage.tsx:8 , components/admin/pages/TicketingSupportSystemPage.tsx:21 , components/admin/pages/UserManagementPage.tsx:12 , components/webcontent/sections/ProductCMS.tsx:6 , components/webcontent/sections/UpdateProductModal.tsx:7 , components/webcontent/WebContentLayout.tsx:19
[LoadingOverlay] renders=7 -> components/admin/header/UserMenu.tsx:159 <LoadingOverlay , components/admin/pages/LoginPage.tsx:87 <LoadingOverlay , components/admin/pages/TicketingSupportSystemPage.tsx:499 <LoadingOverlay , components/admin/pages/UserManagementPage.tsx:268 <LoadingOverlay , components/webcontent/sections/ProductCMS.tsx:228 <LoadingOverlay , components/webcontent/sections/UpdateProductModal.tsx:569 <LoadingOverlay , components/webcontent/WebContentLayout.tsx:333 <LoadingOverlay
[FAQAccordion/Faq] imports=3 -> pages/Homepage.tsx:7 , pages/WhatWeDo.tsx:3 , pages/WhoWeAre.tsx:4
[FAQAccordion/Faq] renders=3 -> pages/Homepage.tsx:82 <Faq , pages/WhatWeDo.tsx:219 <FAQAccordion , pages/WhoWeAre.tsx:516 <FAQAccordion
[Footer] imports=1 -> Layout.tsx:4
[Footer] renders=1 -> Layout.tsx:21 <Footer
[MobileMenu] imports=1 -> components/Navigation.tsx:6
[MobileMenu] renders=1 -> components/Navigation.tsx:215 <MobileMenu
[BookingCalendar] imports=1 -> components/BookingPage.tsx:1
[BookingCalendar] renders=0    (bound as `Calendar`: render = BookingPage.tsx:82 <Calendar />)
[CountUp] imports=2 -> components/cards/AnalyticsCards.tsx:1 , pages/WhoWeAre.tsx:5
[CountUp] renders=4 -> components/cards/AnalyticsCards.tsx:21 <CountUp , pages/WhoWeAre.tsx:217 <CountUp , pages/WhoWeAre.tsx:235 <CountUp , pages/WhoWeAre.tsx:255 <CountUp
[LogoLoop] imports=2 -> pages/sections/PartnerSection.tsx:2 , pages/WhoWeAre.tsx:3
[LogoLoop] renders=4 -> components/Footer.tsx:51 <LogoLoop , pages/sections/PartnerSection.tsx:41 <LogoLoop , pages/WhatWeDo.tsx:124 <LogoLoop , pages/WhoWeAre.tsx:198 <LogoLoop
[root Card.tsx (dead)] imports=2 -> components/Card/ClientCard/index.ts:1 , components/Card/ServicesCard/index.ts:1
[root Card.tsx (dead)] renders=0
```

**Render-vs-live reconciliation (each verified by reading the cited line):**
- `Button`: WhoWeAre:156 is inside `{/** … */}` (:154) → **8 live** renders.
- `SuperHeader`: 16 renders − 3 in dead files (Team:90, PartnerSection:31, SolutionSection:10) = **13 live**;
  13 imports include 2 aliased `HighlightedText` (AboutUsSection:3, ServicesSection:1).
- `AnalyticsCards`: 9 renders − 4 in dead `pages/sections/Analytics.tsx` = **5 live**.
- `LogoLoop`: 4 renders − 2 commented (`Footer.tsx:51` block starts :48, `WhatWeDo.tsx:124` block starts
  :121) − 1 in dead `PartnerSection.tsx:41` = **1 live** (WhoWeAre:198).
- `ClientCard.tsx (dead)`: the `WhatWeDo.tsx:212 <ClientCard` render is a **local alias** — WhatWeDo:2
  imports `ClientReviewsSection` bound as `ClientCard`; the file `cards/ClientCard.tsx` itself has **0
  importers**.
- `root Card.tsx`: the 2 import matches are the two barrel `index.ts` files — but their
  `export * from "./Card"` is **sibling-relative**, resolving to each directory's own `Card.tsx`
  (`Card/ClientCard/Card.tsx` · `Card/ServicesCard/Card.tsx`, both present), NOT the root file.
  *(EI-C1 corrected 2026-10-29: the earlier "barrels re-export it" attribution is false — the
  scan's path-tail regex matched `./Card` as `/Card`; an exact-scan for root-Card imports
  (`@/components/Card` · `../Card` · `../../Card`) returns **0 hits**, so `components/Card.tsx`
  has **0 importers** and is fully zero-use.)*
- `BookingCalendar`/`FAQAccordion`/`CountUp`/`LogoLoop`: zero same-name renders are alias artifacts
  (`Calendar` BookingPage:82; `Faq` Homepage:82; `CountUp`/`LogoLoop` renders listed).

## 4. Findings

### 4.1 Zero-use elements (0 live importers, verified 2026-10-27)

| File | Evidence |
|---|---|
| `components/buttons/Book.tsx` | 0 imports, 0 renders (§3) — also CP §5.1 |
| `components/cards/ClientCard.tsx` | 0 imports (§3); the `WhatWeDo:212 <ClientCard` match is the ClientReviewsSection alias (WhatWeDo:2) — also CP §5.1 |
| `components/ContentContext.tsx` | 0 importers (CP §5.1; live context = `src/ContentContext.ts`, 17 importers, App.tsx:9) |
| `components/Card.tsx` (root) | only the 2 barrel index.ts files reference it (§3); no component imports it |
| `components/Form.tsx` | 0 importers (grep `from "./Form"`/`"../Form"`/`"@/components/Form"` = 0 hits) |
| `components/CardSwap.tsx` | 0 importers (only self-references) |
| `components/ContactUs.tsx` | 0 importers (grep `…/ContactUs"` = 0 hits; it renders live ContactForm at :63, so ContactForm's 3-import count includes this dead chain) |
| `pages/sections/Analytics.tsx` | 0 importers (grep `…/Analytics"` = 0 hits; renders AnalyticsCards :56-68) |
| `pages/sections/PartnerSection.tsx` · `pages/sections/SolutionSection.tsx` · `components/Team.tsx` | 0 importers each; their only JSX references are commented out in Homepage (`{/**<SolutionSection /> */}` :31, `{/**<Team /> */}` :54, `{/**<PartnerSection /> */}` :70) |

**11 zero-use files** — 4 of them (PartnerSection, SolutionSection, Team, Analytics) are "commented-out
page sections", a distinct dead-code class from the orphan components CP §5.1 listed.

### 4.2 Duplicate / near-duplicate clusters

1. **Three button systems** — `Button/` (8 live renders) vs `PrimaryButton` (1) vs `BlackButton` (1) + dead
   `Book.tsx` (CP §4.2, cited not re-derived). The inventory adds the render-count asymmetry: the shared
   system carries 8/10 live button renders yet two components bypass it.
2. **Two content contexts** — `components/ContentContext.tsx` (0) vs `src/ContentContext.ts` (17) — CP §5.1.
3. **ClientCard pair** — dead `cards/ClientCard.tsx` (0) vs live `Card/ClientCard/Card.tsx`
   (TestimonialCard, 2 renders) — the alias collision at WhatWeDo:2 (`ClientCard` = ClientReviewsSection)
   is a third, unrelated meaning of the same name in the same page.
4. **PartnerSection pair** — dead `pages/sections/PartnerSection.tsx` vs live CMS twin
   `webcontent/sections/PartnerSectionCMS.tsx` (PartnerSectionCMS.tsx:14, rendered `HomepageContent.tsx:22`)
   *(EI-C3 corrected 2026-10-29: the bare "rendered :22" read as `PartnerSectionCMS.tsx:22` — the render
   site is `webcontent/HomepageContent.tsx:22` (`<PartnerSectionCMS />`)*).
5. **ServicesSection vs ServicesSections** — `pages/sections/ServicesSection.tsx` (Homepage:3,
   ProductPage) vs `components/sections/ServicesSections.tsx` (WhatWeDo:1) — one letter apart, split by
   route; both import SuperHeader (ServicesSection.tsx:1 as `HighlightedText`, ServicesSections.tsx:3
   uses shared Button).
6. **WhyChooseUs vs WhyChooseUsSection** — `components/sections/WhyChooseUs.tsx` (WhatWeDo:4) vs
   `pages/sections/WhyChooseUsSection.tsx` (Homepage:9) — same route-split pattern as #5.

### 4.3 Markup copy-pasted where an existing element covers it

1. **Native `<button>` dominates despite the shared Button** — §3 shows the shared component carries only
   8 live renders, while the conventions review counts **152 native `<button` tags** repo-wide
   (case-sensitive split per CP-C1-R, `2026-10-27-component-practices.md` §4.1). Public-page examples
   hand-rolling button markup the shared element already covers: `HeroPage.tsx:109`, `ContactForm.tsx:184`,
   `ProductItemCTA.tsx:29,35`, `WhatWeDo.tsx:79,180`.
2. **Commented LogoLoop blocks duplicated twice** — the dead markup in `Footer.tsx:48-56` and
   `WhatWeDo.tsx:121-130` is a copy of the live `LogoLoop` usage (props `logos/speed/direction/logoHeight…`
   at WhoWeAre:198 vs Footer:51-56, WhatWeDo:124-130) — left as commented forks instead of removal.
3. **MobileMenu close control** — `MobileMenu.tsx:36` hand-rolls a square close button where the shared
   Button exists (also F11 touch-target defect, CP §4.1 violation list).

## 5. Citations & re-runnability

- Scan script: `C:\Users\kingg\AppData\Local\Temp\opencode\inv2.mjs` (Node 22, plain `fs` walk; scope
  header printed by the script itself). Mount-chain checks: `mount.mjs`, `evid6.mjs` (same directory).
- Page-assignment provenance: PLAN:64 (Homepage + WhatWeDo), PLAN:145 contactform sketch roster
  (/contact-us + /book-a-schedule).
- Category counts (162/154 buttons, 120/139 non-admin, 137/91 components) inherited from
  `study/2026-10-27-component-practices.md` §4.1 (CP-C1 split) — cited, not resubmitted.
