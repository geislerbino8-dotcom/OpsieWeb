# Responsive inspection plan — 2026-10-20

**Track:** PLAN.md "Responsive review track (2026-10-20)" · **Item 1 of 4**
**Assigned pages:** Homepage (`/`) + WhatWeDo (`/what-we-do`, `Router.tsx`)
**Status:** ⏳ **PROPOSED — awaiting your lock-in** (viewport set + rubric R1…R11). Items 2–4 are being executed against the proposed set; if you change the set or rubric on lock-in, the affected cells are re-run before grading.

**Inherited standards this plan must reconcile with (citable, not re-argued):**

| Inherited item | Source | What it forces here |
|---|---|---|
| 0px horizontal overflow at 320/375/768/1024 | legacy site standard, re-stated in `study/PLAN.md:80–82` | R1 pass condition = `documentElement.scrollWidth − clientWidth === 0` at those widths |
| Desktop track 1440×900 primary + 1280×800 sanity | `study/PLAN.md:74` (D-track, graded 9.5/10) | the two desktop cells stay in the matrix as regression cells |
| D1–D10 desktop findings | `study/2026-10-19-layout-typography-content-audit.md` | cited as baseline, never resubmitted |
| 2026-10-19 fix batch, commit `2adbee7` (nav persistent `top:0`) | git log + `Navigation.tsx` | R2/R10/R11 check its **mobile** implications (new work), not its existence |
| Severity scale 🔴 overflow/blocked-use · 🟠 functional break · 🟡 cosmetic | agreed for this track (`PLAN.md:81`) | every finding in items 2–4 uses these three |

---

## 1. Breakpoint inventory from code

Method (re-runnable): PowerShell `Select-String -Pattern '(?<![\w-])(sm|md|lg|xl|2xl):' -AllMatches` over `frontend/src/**/*.{tsx,ts,css}` (word-boundary regex so `xmlns:`/`font-sm` noise is excluded), plus `Select-String -Pattern '@media|innerWidth|matchMedia|resize'` and `grep` for CSS imports. Counts below are pasted from that output, not asserted.

### 1a. Tailwind prefix usage — whole `frontend/src` (.tsx/.ts, all matches)

| prefix | matches | notes |
|---|---:|---|
| `md:` | 382 | by far the dominant boundary |
| `lg:` | 195 | |
| `sm:` | 108 | |
| `xl:` | 31 | mostly `Footer.tsx:19` background text + admin/CMS pages |
| `2xl:` | **0** | no file uses the 1536px tier |
| `.css` files | **0** | prefix usage is 100% TSX; the CSS files use raw `@media` px only |

Top files (line counts, strict regex): `WhoWeAre.tsx` 93 · `WhatWeDo.tsx` 23 · `UpdateProductModal.tsx` 19 · `ProductCMS.tsx` 19 · `ContactUsPage.tsx` 15 · `ProductItemPage.tsx` 14 · `WhyChooseUs.tsx` 13 · `WhyChooseUsSection.tsx` 13 · `Footer.tsx` 10 · `ClientReviewsSection.tsx` 8.

### 1b. Prefix usage inside the two page closures only

Closure = the files `Homepage.tsx:1–12` and `WhatWeDo.tsx:1–9` import, plus shared chrome `Layout.tsx:1–4` (`ChatHelp`, `Navigation`, `Footer`).

| file | lines with a prefix | file | lines with a prefix |
|---|---:|---|---:|
| `pages/WhatWeDo.tsx` | 23 | `pages/sections/ContactUsSection.tsx` | 6 |
| `pages/sections/WhyChooseUsSection.tsx` | 13 | `components/HeroPage.tsx` | 5 |
| `components/sections/WhyChooseUs.tsx` | 13 | `components/FaqSection/Faq.tsx` | 5 |
| `components/sections/ClientReviewsSection.tsx` | 8 | `components/cards/ProductItemCTA.tsx` | 5 |
| `types/components/SuperHeader.tsx` | 6 | `components/sections/OperationalStructure.tsx` | 5 |
| `pages/sections/AboutUsSection.tsx` | 6 | `pages/sections/ServicesSection.tsx` | 4 |
| `components/Footer.tsx` | 10 | `pages/sections/ProductSection.tsx` | 4 |
| `pages/sections/ContactProcessSection.tsx` | 2 | `components/sections/ServicesSections.tsx` | 4 |
| `components/Navigation.tsx` | 4 | | |
| **total** | **123 lines / 187 occurrences → `md:` 132 · `lg:` 38 · `sm:` 16 · `xl:` 1** | | |

`MobileMenu.tsx`, `ChatHelp.tsx`, `Layout.tsx`, `Homepage.tsx`, `WhatWeDo`'s `SoftAurora` wrapper: **0** prefix lines — the mobile sheet is driven by JS state, not by extra prefix rules.

### 1c. Are the breakpoints customized? — **No**

- `frontend/package.json:34,40` → `tailwindcss ^4.2.1` + `@tailwindcss/vite ^4.3.3` (Tailwind **v4**, config-by-CSS).
- `frontend/src/index.css:7` → `@import "tailwindcss";`; `@theme {` at `index.css:11` (fonts/colors) and `@theme inline {` at `index.css:143` (radius/colors). **No `--breakpoint-*` token anywhere in `frontend/src`** (grep `--breakpoint` → 0 matches), and no `@config` directive.
- ⇒ effective breakpoints are the **v4 defaults: sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536**.
- `frontend/tailwind.config.js` exists (fonts only, no `theme.screens`) but Tailwind v4 never loads it without `@config` — it is a dead file for breakpoint purposes (`index.css:13` comment: "no @config directive").

### 1d. Explicit px boundaries in classes/styles on the assigned pages

| boundary | where | live? |
|---|---|---|
| **550px** | `index.css:134` `@media (min-width: 550px) { }` — **empty block** (135–136) | loaded (`main.tsx:2`) but no-op |
| **550px** | `styles/ServicesSection.css:43–55` — `.services-container` → `width:70%`, `margin:1em auto`, `padding:2em`, card shadow/radius | **live** — imported at `pages/sections/ServicesSection.tsx:3` |
| **550px** | `styles/ProductSection.css:90–115` — `.product-section-container{height:80vh}`, `.product-content{flex-direction:row}`, `.upper-prod img{width:20%}` | **live** — imported at `pages/sections/ProductSection.tsx:3` |
| **550px** | `styles/HeroPage.css:53–69` — `.hero-content{width:70%}`, `.hero-visual{left:25%}` | **DEAD** — `HeroPage.css` is imported nowhere (grep `HeroPage.css` → only the file itself) |
| **550px** | `styles/AboutUsSection.css:61–73` — container 70%, wrapper `flex-direction:row` | **DEAD** — imported nowhere |
| **768px / 480px** | `components/CardSwap.css:26,32` (`max-width`, scale 0.75/0.55) | **DEAD** — `CardSwap.tsx:15` imports the CSS, but `CardSwap.tsx` itself is imported nowhere |
| px sizes in TSX | `WhatWeDo.tsx:32` `w-[600px] h-[600px] md:w-[900px] md:h-[900px]` · `WhatWeDo.tsx:67` `text-[40px] md:text-[60px] lg:text-[75px]` · `HeroPage.tsx:76` `text-[48px] md:text-[80px] lg:text-[90px]` · `Footer.tsx:19` `text-[120px] sm:text-[180px] md:text-[260px] lg:text-[380px] xl:text-[500px]` | live |
| `min-[1440px]:` arbitrary variants | `BookingPage.tsx:27,30,66` only — **not on the assigned pages** (out of scope) | live but out of scope |

⇒ The only non-Tailwind viewport boundary the assigned pages actually sit on is **550px**, and it exists in two live stylesheets + two dead ones. That is what the 549/550 probe pair exists to test.

### 1e. JS-side breakpoint logic (the paths that do not exist in CSS)

| logic | file:line | boundary |
|---|---|---|
| Carousel narrow-mode flag + live listener | `components/sections/ServicesSections.tsx:19–29` — `window.innerWidth < 768` (line 22), `handleResize` → `setIsNarrow` (26), subscribe/unsubscribe (27–28) | **768** |
| Sheet auto-close on layout flip | `components/Navigation.tsx:64–72` — `if (window.innerWidth >= 768) setNavIsOpen(false)` (66–68); comment at 61–3 explicitly ties it to the `md:` rules | **768** |
| Sheet close on route change (state, not width) | `Navigation.tsx:74–76` | n/a |
| Resize-driven sizing (no breakpoint decision) | `SoftAurora.tsx:203–211,270` · `LineWaves.tsx:187–195,254` · `ShapeGrid.tsx:48–56,397` · `RippleGrid.tsx:187–239` · `CircularGallery.tsx:358–633` · `LogoLoop.tsx:50–65,270` (`ResizeObserver`) · `LiquidEther.tsx:1142–1157` | size-only |
| `matchMedia` | `useTheme.ts:7`, `Header.tsx:14` — `prefers-color-scheme`, **theme not layout** | n/a |

⇒ **Two** width decisions exist in JS on the whole site, both at 768. 320/375/550/640/1024/1280 are CSS-only; anything wrong at those widths is a CSS problem, which makes file:line attribution deterministic.

---

## 2. Proposed viewport set (9 cells × 2 pages = 18 probe cells)

Every size is tied to a boundary found in §1 or to an inherited standard. Viewport emulation: CDP `Emulation.setDeviceMetricsOverride` — the identical protocol DevTools device mode uses (receipt caveat in §4).

| # | viewport | boundary it probes | why this exact size |
|---|---|---|---|
| 1 | **320×568** | inherited floor standard (320) | smallest supported phone width; reflow floor for `px-6` (24px) containers — 272px of content box |
| 2 | **375×812** | inherited standard (375) | the primary phone class and the width earlier receipts used; 327px content box |
| 3 | **549×700** | just **below** the custom 550px boundary (`ServicesSection.css:43`, `ProductSection.css:90`) | catches the pre-flip state: containers full-width, `.product-content` column |
| 4 | **550×700** | exactly **at** the boundary (min-width inclusive) | catches the flip: 70% containers, `flex-direction:row`, `height:80vh` — and proves the empty `index.css:134` block does nothing |
| 5 | **640×900** | `sm:` = 640 (default, unmodified per §1c) | first multi-column state: `Footer.tsx:82` `sm:grid-cols-3`, `WhyChooseUs.tsx:36,96` `sm:col-span-2` — while nav is still mobile (`md:` = 768 not reached) |
| 6 | **768×1024** | `md:` = 768 **and** both JS rules (`ServicesSections.tsx:22`, `Navigation.tsx:66`) | the single most loaded boundary: nav mobile→desktop swap, sheet-close rule, carousel `isNarrow` flip, 2-column grids, `md:w-1/3` text columns |
| 7 | **1024×768** | inherited standard (1024) + `lg:` = 1024 | legacy desktop floor; `lg:grid-cols-3`, `lg:text-[90px]` hero, tablet-landscape |
| 8 | **1280×800** | desktop-track sanity cell + `xl:` = 1280 | regression-only: proves nothing reflows when `xl` (31 uses, `Footer.tsx:19`) kicks in |
| 9 | **1440×900** | desktop-track primary cell | regression baseline vs the D1–D10 receipts; also the width where `max-w-[1280px]` containers center with gutters |

Dropped deliberately: 480 (only boundary is in dead `CardSwap.css:32`), 860 (comment at `Navigation.tsx:62` says it was the *old* dead-zone value, removed), 1536/2xl (0 uses), any `min-[1440px]` cell (out-of-scope page).

---

## 3. Proposed inspection rubric R1…R11

Severity per agreed scale: **🔴 overflow/blocked-use · 🟠 functional break · 🟡 cosmetic.** "N-A" is used only where the criterion structurally cannot occur at that width (stated per cell).

| ID | criterion | pass condition (measured, not asserted) | 🔴/🟠/🟡 if failed |
|---|---|---|---|
| **R1** | Horizontal overflow | `documentElement.scrollWidth − clientWidth === 0` (legacy standard); every element whose rect crosses the viewport edge must be attributed to a source line or to an intentional scroll container | 🔴 |
| **R2** | Nav mode + sheet pre-state | <768: desktop link block `display:none`, burger visible with `aria-expanded="false"`; ≥768: inverse; nav `top:0` and z-index ≥ content at **every** width (mobile implication of `2adbee7`) | 🟠 |
| **R3** | Grid/stack collapse | each grid's computed `grid-template-columns` degrades monotonically with width (3→2→1 etc.); flex rows carrying `sm:/md:/lg:flex-row` compute to `column` below their prefix | 🟠 |
| **R4** | Typography scaling + clipping | heading font sizes follow the declared responsive scale (`HeroPage.tsx:76`, `WhatWeDo.tsx:67`, `Footer.tsx:19`); no text node with `scrollWidth > clientWidth + 2` and no text box past the viewport outside an intentional overflow container | 🟡 (🟠 if copy becomes unreadable/unreachable) |
| **R5** | Touch targets | every visible `a/button/[role=button]/input` ≥ 44×44 px (WCAG 2.5.5); misses recorded with element + measured size | 🟡 (🟠 when the target cannot be hit at all) |
| **R6** | Images | `naturalWidth > 0` (loaded); aspect delta ≤2% unless `object-fit` is `cover/contain` (crop/letterbox = by design); no image crossing the viewport edge outside a scroll container | 🟡 |
| **R7** | Horizontal scroll regions | document itself never scrolls horizontally; every `overflow-x` container is an intentional slider (track wider than viewport **and** controls present) | 🟠 when a region clips content with no controls, else recorded as by-design |
| **R8** | Narrow-carousel JS path | <768: mobile controls visible, step 100%, card ≈ container; ≥768: desktop arrows visible, step ≈33.33%; live resize across 768 flips both (exercises `ServicesSections.tsx:22`) | 🟠 |
| **R9** | Footer stacking | link grid computes 1 column below `sm`, 3 at/above; background text clipped by `Footer.tsx:11` `overflow-hidden`; socials measured | 🟡 |
| **R10** | Fixed elements | fixed nav + `ChatHelp` widget (`ChatHelp.tsx:7`) fully inside viewport, sane z-order vs the sheet, nav never covers an interactive control after scroll | 🟡 (🟠 if a control is unreachable) |
| **R11** | Scroll reveals + nav persistence | full scroll pass: 0 `[data-aos]` elements remain `opacity:0` inside the viewport; nav still at `top:0` afterwards (baseline `2adbee7`) | 🟠 |

Rubric ↔ PLAN.md:80 checklist: horizontal overflow (R1) · nav swap + sheet (R2) · grid/stack (R3) · typography (R4) · touch targets (R5) · image/aspect (R6) · scroll regions incl. Client Reviews slider (R7) · narrow-carousel JS path (R8) · footer stacking (R9) · fixed elements (R10) · reveals/nav persistence (R11).

---

## 4. Receipt method + caveats (binding for items 2–4)

1. **Emulation source.** No DevTools device-mode tool exists on my side, so receipts come from a scripted CDP client: `Emulation.setDeviceMetricsOverride({width,height,deviceScaleFactor:1,mobile:false})` on headless Edge — this is the same protocol command DevTools device mode sends. Every JSON receipt embeds `vp:[w,h]` (self-evidencing), and every screenshot carries an injected `#vpbadge` reading `WxH | dpr | /route | sw=… cw=…` so the viewport is legible in the image itself.
2. **Raw pastes, no asserted numbers.** Every number in items 2–4 comes from a pasted receipt in `study/receipts/2026-10-20/` (`probe-*.json`, `sweep-*.json`, `interactions.json`, `r-*.png`).
3. **Vite-dev ≠ prod.** All cells run against `npm run dev:frontend` (:5173). No production performance/FCP claim is made from these runs.
4. **Pre-reveal vs post-reveal.** R1–R10 are measured **before** the scroll pass (AOS-initial state), R11 *is* the scroll pass. AOS-pending elements are measured (`opacity:0` + `[data-aos]` ancestor exempted from visibility filtering) and any element that only misbehaves pre-reveal is re-measured post-reveal before it is called a finding.
5. **No touch input emulation.** "Tap" receipts are `dispatchEvent(new PointerEvent('pointerdown'…))` sequences with the resulting DOM state pasted; where a gesture cannot be emulated (e.g. slider drag), the claim is checked against source for handlers and, if the code has none, dropped as not-reproducible rather than argued.
6. **Main-thread responsiveness.** `/` intermittently stops answering `Runtime.evaluate` during load in headless (dev-server + software rendering). Command timeouts were raised 30s→120s and every cell that timed out was re-run to completion; timeouts are recorded as an observation, not as a site defect, unless reproduced in a production build (decision queue in item 4).
7. **Assistant rerun path** (for your verification without a viewport tool): `node C:\Users\kingg\AppData\Local\Temp\opencode\drive.mjs` replays all 18 cells + 6 interaction phases into `study/receipts/2026-10-20/`; `aggregate.mjs` rebuilds `matrix-raw.json`; individual cells can be replayed via `node cdp.mjs do vp 375x812 --mobile` etc. Every citation in this plan can be re-checked with `Select-String -Pattern '<class-or-keyword>' <file>`.
