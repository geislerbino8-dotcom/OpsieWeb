# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-10-02 (responsive pass: mobile & tablet adjustments)

Reviewed every public route at 320/375/768/1024px and fixed the mobile/tablet problems the sweep turned up: clipped product cards, a three-way nav breakpoint split, a non-reactive carousel step, and several smaller defects.

### Fixed

- **Product cards were clipped on phones.** `ProductCard` was fixed `w-[18rem]` (288px) + `flex-shrink-0`, and its wrapper flex items had a `min-width: auto` floor of 288px too — but `/products` leaves only a **232px content box** at 375px (`p-10` inside `px-6`), so `overflow-hidden` cut **28px off each side of every card**, unreachable by scroll (`overflow-hidden` on mobile; `md:overflow-x-auto` only from 768px). The homepage grid clipped the same way at 320px. The card is now `w-full max-w-[18rem]` and both wrappers (`ProductPage`, `pages/sections/ProductSection`) are `w-full max-w-[18rem]`, so the flex basis resolves to `min(available, 288px)` deterministically — desktop still renders identical 288px cards, phones get the full column (232px @375, 177px @320).
- **Nav breakpoint split three ways.** The desktop container hid at `max-[865px]`, the mobile bar at `md:hidden` (768), and the JS close handler ran at `>= 860` — so from 768–859 the desktop nav could show *while* a sheet opened below 767 stayed on top of it. All three signals are now **768**: `max-md:hidden` + `md:hidden` + JS `window.innerWidth >= 768`.
- **`SuperHeader` dynamic class** — `md:text-${position}` is composed at runtime, so Tailwind never generates it; it emitted `md:text-undefined` whenever `position` was omitted and only aligned correctly because the literal `md:text-left`/`md:text-right` happened to exist elsewhere in the source. Replaced with an explicit `position` → class map (omitted position keeps the base `text-center`).
- **`/what-we-do` carousel step was read from `window.innerWidth` during render**, so the slide distance went stale when a phone/tablet rotated across 768px. Now a reactive `isNarrow` state updated by a resize listener. Also fixed the invalid `cubic-bezier(0.25, 1, 0.5, 1)` class — not a Tailwind utility, so the custom slide easing had never applied → `ease-[cubic-bezier(0.25,1,0.5,1)]`.
- **`Faq.tsx` typo `tect-center` → `text-center`** — the support paragraph was left-aligned on mobile (it only had `md:text-left`, whose base class was misspelled).
- **`ContactsCard` dead `bg-[${color}]`** — a runtime-composed arbitrary class Tailwind can never emit; moved to an inline `style={{ backgroundColor: color }}`. No visual change (callers never pass `color`, and `bg-[undefined]` never applied anyway).
- **`ChatHelp` pill intercepted taps** — the decorative teaser sits fixed bottom-right over the footer links and the bottom edge of the booking calendar, but has no click handler; added `pointer-events-none` so taps pass through.
- **Burger tap target 32×32 → 44×44** (`-m-1.5 p-1.5`, negative margin so the icon stays exactly where it was).
- **Body scroll lock while the mobile sheet is open** (`overflow: hidden`, restored on close) and **the sheet now closes on route change** — the link handlers already closed it, but browser back/forward bypassed them and left the sheet (and the lock) over a new page.

### Verified

- **Overflow sweep: 9 routes × 320/375/768/1024 = `0px` horizontal overflow everywhere**; `.p-cards-container` clip `0` at every width (was 28px @375 on `/products`).
- Nav states: 375/700/767 → burger only; 768/800 → desktop nav only (previously 768–859 was ambiguous).
- Sheet E2E at 375: open → body locked → backdrop closes (unlocks) → reopen → menu link click → **navigates to `/products`, sheet gone, scroll released**. Route-change close verified via popstate (`aria-expanded` false, sheet unmounted, lock released).
- Handlers keyed on `resize` were verified by dispatching the event — this harness never fires `resize` on iframe resize in a hidden tab (measured `hits: 0` after 3.5s), but a synthetic dispatch closes the sheet at ≥768 and recomputes the carousel from `translateX(-100%)` to `translateX(-33.33%)`. Real browsers fire `resize` on window/orientation changes.
- `SuperHeader`: **0 × `md:text-undefined`** in the DOM across the whole sweep; `position="left"` instances render `text-align: center` @375 → `left` @768.
- FAQ paragraph: `center` @375 → `left` @800. Burger rect measured **44×44**. ChatHelp computed `pointer-events: none`.
- `npx tsc -b --force` — **0 errors**; `npm run build` — succeeds; `npx eslint` — **140 errors / 32 warnings** (unchanged from baseline).

---

## [Unreleased] - 2026-10-02 (booking layout: make the calendar fill the space)

Reworked `/book-a-schedule` so the calendar comes out landscape instead of a tall narrow column, and removed the dead card that sat under it.

### Changed

- **Two-column breakpoint raised `min-[1000px]` → `min-[1440px]`, and below it the intro stacks above a full-width calendar.** The old breakpoint put the widget on the wrong side of a reflow cliff in Cal.com's embed — measured by loading the page in same-origin iframes of increasing width and reading the auto-reported iframe height:

  | card width | embed height | layout |
  |---|---|---|
  | 677 | 1100 | stacked, portrait |
  | 717 | 1134 | stacked, portrait |
  | 757 | 1168 | stacked, portrait |
  | **787** | **538** | **two-pane, landscape** |
  | 817 | 538 | two-pane, landscape |

  Below ~780px the widget gets *taller* the more you widen it; above it, it snaps to two-pane and **halves in height**. Side by side, `480` intro + `48` gap + `780` calendar needs 1308px of content, which only exists from 1440px up — so below that the columns stack and the calendar takes the whole row, where it clears the threshold on its own (a full row reaches 780px at ~875px viewport width).
- **`C:\OJT\OpsieWebsite\frontend\src\components\BookingPage.tsx` container `max-w-[1240px]` → `max-w-[1500px]`** — the old cap left the booking column at ~579px even on a wide screen, i.e. permanently portrait. Intro `max-w-[540px]` → `max-w-[480px]` and `basis-[46%]` → `basis-[42%]` (only binds above the breakpoint), booking `min-w-[500px]` → `min-w-[780px]` so two-column mode can never land under the reflow threshold.
- **The `<Cal>` wrapper's `minHeight: 640` → `480`** — this was the actual dead space in the card. The widget reports **538px** in two-pane mode at every width tested, so a 640px floor left **102px of empty card** beneath it. 480px sits below Cal.com's shortest layout (zero gap in every state measured) while still holding the card's shape during the embed's load, when the iframe is only at its 300px default.

### Verified

- **Gap between the widget and the bottom of the card is `0px` at every width** — was `102px` at card 817 and card 892 before the floor was lowered.
- **Landscape from 1024px up**; 320/480/768 stay portrait as expected for phone and tablet, where a single stacked picker is the right answer:

  | viewport | columns | intro | card | embed H | gap | shape | heading ratio | h-overflow |
  |---|---|---|---|---|---|---|---|---|
  | 320 | stacked | 257 | 257 | 664 | 0 | portrait | 0.88 | none |
  | 480 | stacked | 417 | 417 | 789 | 0 | portrait | 0.88 | none |
  | 768 | stacked | 480 | 673 | 1008 | 0 | portrait | 0.88 | none |
  | 1024 | stacked | 480 | 929 | 538 | 0 | landscape | 0.88 | none |
  | 1280 | stacked | 480 | 1185 | 570 | 0 | landscape | 0.88 | none |
  | 1440 | two-col | 480 | 817 | 538 | 0 | landscape | 0.88 | none |
  | 1920 | two-col | 480 | 892 | 538 | 0 | landscape | 0.88 | none |

- **The intro is capped at every size its children care about** (headline `clamp` ceiling 102px, body 440px), so it renders identically in both column modes — only the calendar changes across the breakpoint, and the headline ink ratio stays at the design's **0.88** on one line at all seven widths.
- `npx tsc -b --force` — **0 errors**; `npx eslint` — **140 errors / 32 warnings** (unchanged from baseline).

---

## [Unreleased] - 2026-10-02 (Timekit → Cal.com, Poiret One heading)

Swapped the booking widget from Timekit to Cal.com and changed the headline accent line from blackletter to Poiret One. **This supersedes the Timekit and blackletter specifics in the section immediately below**, which is left in place as the record of how the redesign was built.

### Added

- **`C:\OJT\OpsieWebsite\frontend\src\styles\BookingCal.css`** — replaces `BookingTimekit.css` (451 lines, deleted). Cal.com renders inside a cross-origin `<iframe>` and ships its own dark palette through `config.theme`, so the ID-prefixed override layer Timekit needed (to win the stylesheet-order race) is unnecessary. All that is left is the card shell: make the embed wrapper fill the card and strip the iframe border, both scoped under `.booking-card` on the card div.
- **`@calcom/embed-react`** added to `frontend` — supplies the `<Cal>` component and `getCalApi`.

### Changed

- **`C:\OJT\OpsieWebsite\frontend\src\components\BookingPage.tsx`** — the whole Timekit loader is gone (`loadTimekitScript`, the `Window.TimekitBooking` global declaration, the `TIMEKIT_CSS` / `TIMEKIT_JS` / `TIMEKIT_PROJECT_SLUG` constants, and the mount `useEffect` with its `widgetRef` bookkeeping). The widget is now declarative:

  ```tsx
  <Cal calLink={CAL_LINK} namespace="booking"
       config={{ theme: "dark", layout: "month_view" }}
       style={{ width: "100%", minHeight: 640 }} />
  ```

  A second effect awaits `getCalApi({ namespace: "booking" })` and applies `cssVarsPerTheme` + `styles.branding.brandColor` in `#8B5CF6` so the embed picks up the site violet instead of Cal.com's default indigo. `Cal` initialises the namespace in its own effect, and React runs a child's effects before its parent's, so the branding call always lands after init. Failures are caught rather than left as an unhandled rejection.
- **`CAL_LINK`** — `dionizen-geisler-bino-ilohkz/opsie-bookings`, the event type created for this page (15 minutes, Google Meet, `Asia/Manila`). Team events would use `org/team/event-type` instead. Only the path after `cal.com/` lives in this constant, so the earlier `opsie/30min` placeholder and the intermediate `opsie-appointment` slug were single-line swaps; `opsie-appointment` now 404s, so it was renamed rather than duplicated.
- **`C:\OJT\OpsieWebsite\frontend\src\index.css`** — headline accent line moved from UnifrakturMaguntia to **Poiret One**: the Google Font `@import` was swapped, `.font-fraktur` → `.font-poiret` (`'Poiret One', 'Century Gothic', 'Futura', sans-serif` — Poiret ships weight 400 only, so a light geometric face leads the fallback stack), and `.booking-title-fraktur` → `.booking-title-poiret`.
- **`.booking-title-poiret` retuned to `clamp(42px, 18.63cqi, 102px)`** (was `clamp(40px, 16.24cqi, 84px)`). At the old size the ink ratio dropped to **0.767** against "Your Vision."'s 0.963 — Poiret is a thin, small-capped face and needs a larger point size to sit level with a black-weight sans, which is ordinary optical sizing. `18.63cqi` restores the design's **0.88** exactly, and the ceiling is `540 × 0.1863 = 100.6px` — the intro column's `max-w-[540px]` — so the cap never engages before the column does. Floors were kept low (42px) so the pair still fits a 320px screen.

### Verified

- **Heading ink ratio across 320 / 480 / 768 / 1000 / 1440px** — accent line **0.88** at every width (design: 0.88), display line 0.915–0.963 (design: 0.98; its pre-existing 80px ceiling engages only on the widest layouts). One line each, both fit the column, `font-family` resolves to `"Poiret One"` everywhere, and no horizontal overflow at any width. Two-column layout engages at 1000px and 1440px as designed.
- **Embed mechanics** — `https://app.cal.com/embed/embed.js` loads; the iframe mounts at `https://app.cal.com/dionizen-geisler-bino-ilohkz/opsie-bookings/embed?theme=dark&layout=month_view&embedType=inline&embed=booking` (both `theme=dark` and `layout=month_view` present as chosen) at `498px` wide, filling the `500px` card edge to edge and auto-sizing to Cal.com's reported content height — **992px inside a 994px card** — over the 640px floor. Two-column layout active, document height 2173px, no horizontal overflow.
- **Live booking page** — opened at the embed URL as a top-level document: dark body `color(srgb 0.068…)` ≈ `#111`, the full **October 2026** month grid (35 day buttons, prev/next month controls, `12h`/`24h` toggle), today (Fri 2 Oct) marked, and **real availability** at `4:00pm 4:15pm 4:30pm 4:45pm` for `Asia/Manila`.
- **The branding config is valid, not merely accepted** — `cal-brand` and `cal-brand-emphasis` are real custom properties in Cal.com's shipped `embed.js` (`.bg-brand-default{background-color:var(--cal-brand)}`, with `--cal-brand` / `--cal-brand-emphasis` declared on the theme scopes), and `cssVarsPerTheme` is the documented `ui` option for the React embed — so the violet cannot be silently ignored.
- `npx tsc -b --force` — **0 errors**; `npm run build` — **succeeds**; `npx eslint` — **140 errors / 32 warnings** (identical to the baseline — the 139 `no-explicit-any` and the one `preserve-manual-memoization` are out of scope).

### Known issue (not a code bug)

- **The widget is cross-origin** (`app.cal.com` vs `localhost:5173`), so nothing inside it can be inspected or screenshotted from the app — only the wrapper, the iframe URL and its box. Verification therefore comes from opening the embed URL as a top-level document, which is how the live booking page above was checked. On the same basis the `cssVarsPerTheme` violet is validated against Cal.com's own bundle rather than observed in the rendered widget.

---

## [Unreleased] - 2026-10-02 (booking page redesign)

Redesigned `/book-a-schedule` to match the supplied booking-page design: dark two-column hero, blackletter + gradient headline, and the embedded Timekit widget restyled dark to match the card in the mock.

### Added

- **`C:\OJT\OpsieWebsite\frontend\src\styles\BookingTimekit.css`** — dark theme for the Timekit booking widget. Every selector is prefixed with `#timekit-booking` (specificity `1,x,x`) so it beats Timekit's own `.bookingjs` rules regardless of stylesheet order — Timekit appends its CSS to `<head>` at runtime, so equal-specificity overrides would lose the race. Covers the widget shell, toolbar, day header, time grid, slots, footer, booking form and loading/error states, plus the FullCalendar `--fc-*` theme tokens.

### Changed

- **`C:\OJT\OpsieWebsite\frontend\src\components\BookingPage.tsx`** — rewritten around the design: `#0a0a0a` page with blurred purple (top-right) and cyan (bottom-left) glows; intro column with a `30 Min Consultation` pill, blackletter "Let's Discuss" over a purple-gradient "Your Vision.", body copy, purple rule, and a `mailto:` link using the real address `inquiry@opsiesoftwaresolutions.com` (was `support@example.com`); booking column wrapped in a rounded card with a purple/cyan glow halo and the "Free. No credit card required / Instant confirmation" trust note.
- **Layout switched from CSS Grid to Flexbox** — `minmax(500px, 1fr)` as a grid floor left ~50px of dead space in the row (the `fr` track could not absorb the minimum). Flex handles it deterministically: intro `basis-[46%]` shrinks and the booking column's `min-w-[500px]` is honoured, so `357 + 48 + 500` exactly fills the container at every width.
- **Two-column breakpoint at `min-[1000px]`** — chosen because Timekit calls `decideCalendarSize()` and adds `is-small`, switching `timeGridWeek` → `dayGridDay` when the widget root is under **480px**. The booking column carries `min-w-[500px]` so the week view from the design is guaranteed in two-column mode; below the breakpoint the card goes full width (also > 480px).
- **`C:\OJT\OpsieWebsite\frontend\src\index.css`** — added `.booking-intro` (`container-type: inline-size`) and `.booking-title-fraktur` / `.booking-title-display` (`clamp(40px, 16.24cqi, 80px)`). The intro column is ~40% of the page on desktop and full-width when stacked, so fixed sizes either overflowed the narrow case or undershot the wide one; sizing against the column keeps both layouts filling the space.
- **`C:\OJT\OpsieWebsite\frontend\src\components\Navigation.tsx`** — nav background is now route-scoped: `rgba(10,10,10,0.82)` + the existing `backdrop-blur-xl` on `/book-a-schedule` only (per the design), `#4C1D95` everywhere else — every other page is untouched.
- **`C:\OJT\OpsieWebsite\frontend\src\components\buttons\PrimaryButton.tsx`** — primary variant `bg-[#2da9cf] hover:bg-[#242424]` → `bg-[#8B5CF6] hover:bg-[#7C3AED]`. The cyan was a leftover the theme migration missed, and it is the "Get Started" button shown in the design as purple.

### Verified

- **Desktop (1000px)** — intro `357px` / booking `500px` / gap `48px` = `905px` container, no dead space; heading renders on one line each at ratios **0.871** and **0.963** of the column (design: 0.88 / 0.98); paragraph 3 lines; widget root `498px`, `is-small` absent, **7 day columns**, 24 time slots `12am`–`11pm`.
- **Widget chrome** — shell `#0e0e14` radius `16px`; TODAY button `#8B5CF6` at the card's right edge with prev/next ghosted to its left (toolbar chunk reversed); today column has the rose inset marker + purple wash; footer `#12121a` with timezone floated left and "Powered by Timekit" floated right.
- **Mobile (480px iframe)** — stacks to one column, headings still 1 line, no horizontal overflow; widget correctly falls back to its single-day view.
- **Nav routing** — `/book-a-schedule` → `rgba(10, 10, 10, 0.82)`; `/` → `rgb(76, 29, 149)` (`#4C1D95`), unchanged.
- `npx tsc -b --force` — **0 errors**; `npm run build` — **succeeds**; `npx eslint` — **140 errors / 32 warnings** (identical to the pre-change baseline; one `exhaustive-deps` warning on `BookingPage` was cleared by capturing `widgetRef.current` in a local).

### Known issue (not a code bug)

- **The calendar shows no selectable slots.** The widget requests `GET /v2/bookings/groups?search=project.id:918cccdb…` (because the project sets `booking.graph: "group_customer"`) and the API returns `total: 0, data: []`. The Timekit project `opsie-schedule-a-meeting` has no booking groups configured in the Timekit account — slots have to be created there before anything appears on the calendar.

---

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
