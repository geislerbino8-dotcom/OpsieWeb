# Component B and C integration notes

Recorded 2026-11-24. Covers the integration phase: review of the mount points, the
reconciliation of the shared surface, the browser pass across all four host pages, and
the corrections applied during the pass.

## 1. Where the components mount

| Route | Component B (contact form) | Component C (FAQ) | Host wrapper and surface |
| --- | --- | --- | --- |
| `/` | `pages/sections/ContactUsSection.tsx:62` | `pages/Homepage.tsx:84` | `overflow-x-clip`; form lives in the dark `#0A0F1D` "Request a Demo" band, both components inside `ScrollAnimatedSection` (delays 700 ms / 650 ms) |
| `/contact-us` | `pages/ContactUsPage.tsx:59` | — | `overflow-x-clip`; light `#ECEDF1` page, form paired with contact cards in a `lg:grid-cols-2` |
| `/what-we-do` | — | `pages/WhatWeDo.tsx:187` | `overflow-x-clip`; FAQ is the last block before the footer |
| `/who-we-are` | — | `pages/WhoWeAre.tsx:521` | `overflow-x-clip`; FAQ follows the map panel |

`components/ContactUs.tsx` also renders the form, but nothing imports it, so it is dead
code rather than a fourth mount.

Both light and dark mounts work because the form and the FAQ cards carry their own
surface (`bg-white`), ink (`#0B1622`, `#475569`), accents (`#3CBDE6` / `#0E7490`), and
borders. No host class leaks in: the minimum text contrast inside the form measured
4.76:1 on the dark band and 5.36:1 at phone widths, identical to the light page.

## 2. Shared-surface reconciliation

The branch and `origin/main` describe different design languages (light/teal here,
carbon/violet there), so the integration pass wanted the hosts to match the components,
not the reverse.

- **Page roots.** `/`, `/what-we-do`, and `/who-we-are` already used `overflow-x-clip`.
  `/contact-us` still used `overflow-x-hidden`; it now uses `overflow-x-clip` so all four
  pages share the same rule. This page has no sticky column today, but the rule keeps a
  future sticky from silently dying.
- **Heading outline.** The form card title was an `h3`, producing `h1 → h3` on every
  mount (the homepage band's own header is an `h1`; `/contact-us` leads with the hero
  `h1`). It is now an `h2` with the same `id` and `aria-labelledby`, matching the FAQ's
  `SuperHeader` level. The accessible name and the form landmark are unchanged.
- **Shared heading emphasis.** `SuperHeader` renders `*…*` fragments as `#3CBDE6`, which
  is 2.36:1 on the light page. It gained an optional `emphasisColor` prop (default
  unchanged); the FAQ passes `#0E7490` so an emphasised word in the CMS heading stays at
  4.58:1. Dark-surface users keep the brand teal.
- **Adjacent-section animation.** `/what-we-do`'s testimonial section used
  `data-aos="slide-up"`, which starts translated down by its own height and could
  hit-test over the FAQ triggers for ~1.2 s. It now uses an opacity-only `fade`, keeping
  the entrance but never covering the accordion.
- **Mono micro-labels.** `.font-mono-label` resolves to the ui-monospace stack on all
  four pages (measured; no Montserrat fallback) for the form kicker, the form meta, the
  FAQ kicker, the `Answers / 05` counter, and the accordion index numbers.

## 3. Verification pass

Method: Vite dev server against a minimal local CMS mock (`:5000`) that returns
`{ data: [{ publishedContent }] }` plus a product list, so no page depends on the real
backend. Headless Edge via CDP, `Page.captureScreenshot` used to force frames before
sampling, AOS/scroll-entrance transforms neutralised, all four routes × five widths
(1440/1024/768/375/320) = 20 combinations.

Result: **0 defect signals**. Recorded in `shots/integration/integration.json`
(local/untracked).

| Check | Result |
| --- | --- |
| Mount counts | Form 1× on `/` and `/contact-us`; FAQ section 1× with 5 triggers on `/`, `/what-we-do`, `/who-we-are`; no cross-contamination |
| Page content | No `No content` fallback on any route (CMS document complete) |
| Horizontal overflow | None at any combination; `scrollWidth === innerWidth` |
| Form card | `rgb(255, 255, 255)` on both the dark band (`rgb(10, 15, 29)`) and the light page; `rounded-2xl`; width 512/468/512/343/288 px |
| Form targets | Inputs 50 px, submit 52 px |
| Form text contrast | Minimum 4.76:1 (`Form / 01`, `#64748B` on white); 5.36:1 at 375/320 |
| FAQ h2 | Wraps at 1024 between words, never clipped and never split mid-word: column 380 px on home, 295 px on `/what-we-do`, 373 px on `/who-we-are` (longest word 270 px) |
| FAQ sticky | `position: sticky`, `top: 96px`, pins at 96 px on all three mounts at 1440/1024; travel 213 px at 1440, 233–237 px at 1024 |
| FAQ targets | Trigger heights 88 px desktop, 72 px mobile |
| FAQ text contrast | Minimum 4.58:1 (kicker, meta, contact link on `#ECEDF1`) |
| Disclosure contract | 5/5 triggers inside `h3`; 5/5 panels `role="region"` + `aria-labelledby` = trigger id; all start collapsed |
| Interaction | Click opens item 1; clicking item 2 closes item 1 (single-open); Space toggles; no duplicate ids |
| Contact link (AC-07) | `Reach out to us.` is a router `<Link>` whose `href` is exactly `/contact-us` on all three mounts |
| Console | No component-related errors on any route (only the Mapbox telemetry 404 and the MetaMask extension notice) |

Screenshots: `home-dark-band-form-1440.png`, `contact-us-form-1440.png`,
`what-we-do-faq-open-1440.png`, `who-we-are-faq-open-375.png`.

## 4. Corrections applied

1. `ContactForm.tsx` — card title `h3 → h2` (heading-level skip on both mounts).
2. `SuperHeader.tsx` — optional `emphasisColor`; `Faq.tsx` passes `#0E7490`.
3. `ClientReviewsSection.tsx` — `slide-up → fade` entrance (no transient overlap).
4. `ContactUsPage.tsx` — `overflow-x-hidden → overflow-x-clip`, duplicate `bg-[#FAFBFF]`
   removed.
5. Tests — form heading level, plus the FAQ emphasised-heading contrast case.

A sixth correction came out of the demo capture rather than this pass: at 1024 the
`w-1/3` header column on `/what-we-do` was 217 px and split "Frequently" mid-word. The `lg`
split is now `42% / 58%` (`lg:gap-10`), keeping `xl` at `1/3 / 2/3` (`gap-20`). Measured
after: 380 px on home, 295 px on `/what-we-do`, 373 px on `/who-we-are` at 1024, with the
longest word at 270 px and no splits.

Gates: `npm test` **41/41** (5 files), `npx tsc -b` clean, focused ESLint clean,
`npm run build` pass.

## 5. Remaining limitations (not introduced here)

- **Botpress launcher** overlaps the last FAQ card at 320–375 px when scrolled to the
  bottom. Global affordance, hidden in the QA captures.
- **`App.fetchContent` guard.** If the CMS request fails, `getContent()` resolves
  `undefined` and `res.data[0]` throws; React Router shows the error boundary. A one-line
  guard would remove a real failure mode but changes app-level behaviour, so it is
  recorded rather than changed.
- **Heading outliers elsewhere.** `ProductItemCTA` and the product cards emit additional
  `h1`s on the homepage. They are outside Components B/C and predate this pass.
- **`MapCard` telemetry** posts to `events.mapbox.com` and 404s in the offline probe; it
  does not affect layout or the components.

## 6. Integration state

Branch `codex/pr-duke`: `8c2328c` (integration pass) plus the demo-prep commit on top
(which also carries the 1024 heading fix). PR #8 remains open and `mergeable_state: dirty`
(28 conflicting files against `main`), because this branch and `main` describe different
design systems. Nothing was pushed after `396084a`.
