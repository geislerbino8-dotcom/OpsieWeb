# Opsie — Main User Journeys

> Documented 2026-10-15 (Oct 14 shipped no user-facing changes, so these are the current journeys).
> **Method:** traced from source with file:line citations, then verified by a live render pass on
> local dev (`:5173` + API `:5000`). **No analytics exist in this repo** — these are the *designed*
> journeys from code, not measured traffic.
> Severity marks: 🔴 critical · 🟡 notable · 🟢 cosmetic.

## Global frame (applies to every journey)

- Boot: `index.html:19` → `main.tsx:7–12` (`AuthProvider` → `RouterProvider`) → `Router.tsx:72`.
- Page chrome: `Layout.tsx:17,21` renders `Navigation` + `Footer` + `ChatHelp`; public nav links are correct (`Navigation.tsx:11–16`, mirrored in `MobileMenu.tsx:3–8`).
- Content: one fetch per full page load — `App.tsx:16–23` → `getContent()` (`api/getContent.ts:6`, returns `undefined` on error :12–15) → `GET /api/webcontent/get-content` via `axiosClient` (`api/axiosClient.ts:4` baseURL `/api`) → Vite proxy (`vite.config.ts:12–14`) → `server.ts:66` → controller returns **HTTP 201** with full docs **including `draftContent`** (`webContentController.ts:24–26`, 🟡 leak) → `ContentContext` (`App.tsx:59`) → consumed per page (e.g. `WhoWeAre.tsx:24`).
- Cross-site: BotPress chat injected from `index.html:13–15`; AOS initialized `App.tsx:38–45`; scroll-reset `App.tsx:28–35`; a dead Supabase `sample.pdf` URL build runs every load (`App.tsx:47–56`, 🟢).
- 🟡 **No loading state anywhere** — content slots render empty until the CMS fetch lands (`App.tsx:13,59`).

## Live render receipts (2026-10-15, dev server)

| Route | textLen | Heading seen | Result |
|---|---|---|---|
| `/` | 5407 | (hero markup) | ✅ |
| `/what-we-do` | 4881 | "When your systems work…" | ✅ |
| `/who-we-are` | 4053 | hero + CMS sections | ✅ |
| `/contact-us` | 1130 | "Visit Our Office" | ✅ |
| `/products` | 2363 | product listing | ✅ |
| `/products/OpsCore` | 1950 | "PRODUCT SUMMARY" | ✅ |
| `/products/NonexistentXX` | 412 | "Product parameters not found." | ✅ graceful, no crash |
| `/book-a-schedule` | 837 | "Let's Discuss Your Vision." + "October 2026" | ✅ |
| `/login` | 13 | "Sign in" | ✅ |
| `/admin` (no token) | 13 | "Sign in" | ✅ guard falls back to login |
| `/layout-practice` | 1555 | "Layout Practice" | 🟡 dev page live in prod |
| `/totally-bogus` | 68 | **"404 Not Found — No route matches URL"** | ✅ ErrorPage via root `errorElement` (`Router.tsx:76`) |
| `/whatWeDo` (dead Header path) | 63 | "404 Not Found" | ✅ proves the dead Header's links would 404 |

API receipts: `GET /api/products/get-all` → **200**, 3 items (OpsCore, OpSync, OpStudios) ·
`GET /api/products/get-product?name=nonexistent` → **200 `null`** · `GET /api/webcontent/get-content` → **201**, `whoWeArePage` keys = `header, subHeader, section2…5`, `draftContent` present.

---

## Journey 1 — Browse the site (first-time visitor)

**Goal:** understand the company and offerings. **No account, no data sent.**

1. Land on `/` → hero + section stack; CMS-driven text from the global fetch (frame above).
2. Move via public nav: Why Opsie → `/what-we-do` · About Us → `/who-we-are` · Contact Us → `/contact-us` · Products → `/products` (`Navigation.tsx:11–16`; Products has a hover dropdown `:152–185` built from **static** `data/productsData` 🟡 — menu can drift from the live DB).
3. Section CTAs cross-link: `ProductSection.tsx:87` → `/products` · `Team.tsx:154` → `/who-we-are` · `AboutUsSection.tsx:93`, `MapDesign.tsx:185`, `ContactUsSection.tsx:50`, `ContactProcessSection.tsx:87`, `WhatWeDo.tsx:80` → `/contact-us` · `HeroPage.tsx:110`, `WhatWeDo.tsx:181` → `/book-a-schedule`.
4. Footer: About Us/Our Products/Contact Us/Why Opsie (`Footer.tsx:88–103`); FAQ/Our Team/Story/Mission/Vision all point at `/who-we-are` (`:106–119`, 🟢 no dedicated anchors).
5. Unknown URL → ErrorPage 404 with "Go Home" (receipt above). No `path: '*'` route — the `errorElement` (`Router.tsx:76`) does the job (🟡 SPA-only 404, no real HTTP status).

**Broken pieces:** none — this journey renders clean at every step.

## Journey 2 — Products: discovery → detail

**Goal:** evaluate OpsCore / OpSync / OpStudios.

1. Entries: nav "Products", hover dropdown (static list), `ProductSection.tsx:87`.
2. `/products` → `ProductPage` → `getProducts()` → `GET /api/products/get-all` — **public, no auth** (`productRoute.ts:24–27`) ✅ live 200 ×3.
3. Card click → `/products/{name}` (`ProductCard.tsx:30` — the `:id` param actually carries the **name**, URL-encoded).
4. `ProductItemPage` → `getProduct(name)` → `GET /api/products/get-product?name=…` (`getProduct.ts:5–12`, public `productRoute.ts:29–32`) → `setContent` (`ProductItemPage.tsx:65–81`). Bad name → API `200 null` → page renders "Product parameters not found." (receipt ✅ no crash).
5. Conversion CTAs: `ProductItemCTA.tsx:30` → `/book-a-schedule`; pricing cards `OpsieHRIS.tsx:105,117` → `/buy-now` + `/subscribe-now` (both alias `ProductPage`, `Router.tsx:111–119`; matching is case-insensitive).

**Known issues:** 🟢 `/buy-now` and `/Subscribe-now` render the plain product list (no checkout); 🟡 static dropdown vs DB drift; 🟡 `ProductPage` shows CMS analytics counters (start at 0).

## Journey 3 — Booking a consultation (primary conversion)

**Goal:** book a 30-min slot. Seven entry points: `Navigation.tsx:213` "Get Started", `HeroPage.tsx:110`, `ProductPage.tsx:105`, `ContactUsPage.tsx:103`, `ProductItemCTA.tsx:30`, `WhatWeDo.tsx:181`, `Navigation.tsx:214` — all → `/book-a-schedule`.

1. `BookingCalendar` picks date + time; submits `{name, email, date, time, message?}` (`BookingCalendar.tsx:167`, shape `createAppointment.ts:3–12`).
2. `POST /api/appointments/create` (`createAppointment.ts:15`) → proxy → `server.ts:67–71`.
   - 🟡 **`appointmentLimiter` sits AFTER the router** (`server.ts:69–70`) — rate limit never fires; bookings are unlimited.
3. `appointmentController.create`: validates (`:10–15`) → `AppointmentModel.create` (`:17`) → **email is fire-and-forget** — `sendAppointmentBookedEmail(appointment).catch(console.error)` (`:29`, comment: "an email hiccup must not fail the booking") → **201 booked** (`:31`).
4. ⚠️ **Email tail is dead in practice:** `nodemailer` transport (`emailService.ts:12,91`) needs `EMAIL_USER`/`EMAIL_PASS` in `backend/.env` — still missing (blocked thread). **Booking persists; confirmation silently never sends** (`.catch(console.error)` swallows it).

**Net:** journey completes (201 + row in DB) ✅ live-rendered; the confirmation-email half is silently broken until creds land.

## Journey 4 — Contact / support ticket

**Goal:** send a message to Opsie.

1. Entries: nav Contact Us, section CTAs (Journey 1 step 3), map widget `MapDesign.tsx:185`.
2. `/contact-us` → `ContactForm` mounted at `ContactUsPage.tsx:59` (also `ContactUs.tsx:63`, `ContactUsSection.tsx:62`).
3. Submit → `createTicket({name, email, description, platform, category})` (`ContactForm.tsx:40`, `createTicket.ts:3–16`) → `POST /api/ticket/create`.
4. `server.ts:61` mounts it **with `limiter` AFTER the router** (🟡 never fires — and `server.ts:62` mounts the same router again without any limiter path, 🔴 spam-capable public endpoint).
5. `ticketController.create` saves → `sendTicketCreatedEmail(ticket).catch(console.error)` (`ticketController.ts:25`) — same fire-and-forget pattern: **ticket lands; notification email silently fails without creds**.
6. Cross-link: the form page also pushes → `/book-a-schedule` (`ContactUsPage.tsx:103`).

**Dead code, not a journey:** `api/createInquiry.ts:17–18` posts to `/api/inquiry/create` — **imported by nobody** (grep) **and the backend has no inquiry route at all** (full mount list `server.ts:61–72`). Two-layer dead; contact traffic correctly flows through tickets instead.

## Journey 5 — Admin login → CMS publish

**Goal:** staff logs in, edits and publishes page content.

1. `/login` (or `/admin` without token — guard `Router.tsx:132` falls back to login ✅ live) → `LoginPage` form.
2. `login()` → `POST /api/auth/login` (`login.ts:5–6`) → token → `loginUser(data.token)` (`LoginPage.tsx:32`) → `localStorage` (`useAuth.tsx:10`).
3. `window.location.href = '/admin'` (`LoginPage.tsx:35`) — **full reload**, which re-evaluates the module-level guard `const token = localStorage.getItem('token')` (`Router.tsx:26`) so the admin shell renders. (The `navigate('/')` on `:36` never effectively runs. 🟡 F-1's stale-guard bug is *masked* by the hard reload, not fixed.)
4. Admin shell (`/admin` index dashboard, `tickets`, `users`, `content` + 7 CMS sub-routes `Router.tsx:134–154,28–70`).
5. CMS edits → `api/updateContent.ts` → `PATCH /api/webcontent/update-content` → controller `findOneAndUpdate({}, {$set: {[path]: value}}, {upsert: true})` (`webContentController.ts:38–46`) → publish → `PATCH /api/webcontent/publish-content` copies `draftContent` → `publishedContent` (`:74–81`).
6. 🔴 **Auth gap:** `/update-content` and `/publish-content` have **no middleware** (`webContentRoute.ts:31–39`) — the admin UI is behind login, **the API is not**. Anyone can overwrite or publish site content directly. (By contrast `/create` is guarded `:19–24`.)
7. 🔴 Same class: `POST /api/products/create` has **no auth** (`productRoute.ts:19–22`) while update/delete are guarded (`:34–46`).
8. Logout → `/login` (`UserMenu.tsx:97`).

## Appendix A — Security/correctness findings surfaced while documenting

| # | Finding | Where | Sev |
|---|---|---|---|
| A-1 | CMS `update`/`publish` endpoints unauthenticated (site takeover) | `webContentRoute.ts:31–39` | 🔴 |
| A-2 | Product `create` endpoint unauthenticated | `productRoute.ts:19–22` | 🔴 |
| A-3 | Rate limiters mounted after their routers — never fire; ticket router double-mounted (2nd mount has no limiter at all) | `server.ts:61–62,67–71` | 🔴 |
| A-4 | `GET /webcontent/get-content` returns **full docs incl. `draftContent`** with **HTTP 201** | `webContentController.ts:24–26` | 🟡 |
| A-5 | `getContent()` swallows errors → returns `undefined` → `App.tsx:19` would throw | `getContent.ts:12–15` | 🟡 |
| A-6 | Products router mounted twice | `server.ts:65,72` | 🟡 |
| A-7 | All notification emails silently dead until `EMAIL_USER`/`EMAIL_PASS` exist (bookings + tickets) | `emailService.ts` | 🟡 (blocked) |
| A-8 | Static products dropdown can drift from DB | `Navigation.tsx:8,174–183` | 🟡 |
| A-9 | No loading states for CMS content | `App.tsx:13,59` | 🟡 |

## Appendix B — Dead code encountered (never renders / never calls)

- `components/Header.tsx` + `pages/AdminGuard.tsx` — no importers anywhere (grep). The Header's nav paths (`/whatWeDo`, `/whoWeAre`, `/contact`, `Header.tsx:14–19`) **do not match real routes** — live-proven `/whatWeDo` → 404 (receipt above). The live header is `Navigation.tsx`.
- `api/createInquiry.ts` — unused by any component; its endpoint `/api/inquiry/create` does not exist server-side.
- `App.tsx:47–56` — Supabase `sample.pdf` URL built and `console.log`'d every load, never used.
- `main.tsx:9,13` — `<StrictMode>` commented out (dev double-render checks disabled site-wide).
