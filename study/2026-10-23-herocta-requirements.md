# HeroPage CTA — Requirements Document
**Date:** 2026-10-23  
**Assigned by:** Instructor 2026-10-23  
**Component:** HeroPage — CTA card/button sub-elements  
**REG IDs covered:** REG-09, REG-18, REG-23, REG-25 (four open/provisional FE rows for hero CTA)

---

## 1. Component Identification

**HeroPage** is the full-viewport hero section rendered as the first child of `Homepage.tsx`.

The specific sub-elements being redesigned are:

1. **The mini-card pill** — a violet-600 card containing the Opsie badge + CTA button  
   Source: `HeroPage.tsx:99–115`
2. **The CTA button** — labelled "SEE HOW IT WORKS"  
   Source: `HeroPage.tsx:109–114`

---

## 2. Current-State Fact Table

| Dimension | Fact | Source |
|---|---|---|
| Source file | `frontend/src/components/HeroPage.tsx` | disk |
| Mount route | `Router.tsx:79–80` → index route `path: '/'`, `element: <Homepage />` | `frontend/src/Router.tsx` |
| Mounted by | `Homepage.tsx:21` → `<HeroPage bgImage={'/background/landing-hero.jpg'} />` | `frontend/src/pages/Homepage.tsx` |
| `bgImage` prop | `'/background/landing-hero.jpg'` — root-relative public asset (hardcoded at call site) | `Homepage.tsx:21` |
| Content source — `headerText` | `content?.heroSection?.header` — **CMS runtime** via `ContentContext` (App.tsx:17–19 fetches `getContent()`, publishes via `ContentContext.Provider`) | `HeroPage.tsx:16`, `App.tsx:7–22` |
| Content source — `subHeaderText` | `content?.heroSection?.subHeader` — **CMS runtime** | `HeroPage.tsx:17` |
| Content source — `buttonText` | `content?.heroSection?.button` — **CMS runtime** | `HeroPage.tsx:18` |
| Live CMS values (api_content_dump.json) | `header: "Operate The Opsie Way"`, `subHeader: "Make your day-to-day operations easier with Opsie.\n"`, `button: "See how it works"` | `study/api_content_dump.json → data[0].publishedContent.heroSection` |
| CTA button rendered text | `"SEE HOW IT WORKS"` (uppercased via CSS `uppercase` class) — source value `"See how it works"` | `HeroPage.tsx:113` + `contrast-home-1440.json: tag SPAN text "See how it works" fg rgb(255,255,255) bg rgb(139,92,246) ratio 4.23` |
| Button bg token | `bg-[#8B5CF6]` = `rgb(139, 92, 246)` = violet-500 | `HeroPage.tsx:111` |
| Card container bg | `bg-violet-600` = `oklch(0.541 0.281 293.009)`; badge circle uses `bg-violet-700` (`rgb(112, 8, 231)`), which receipt `contrast-home-1440.json` samples with white text at **7.3:1** (hand-computed `#6D28D9` = 7.1:1) | `HeroPage.tsx:99`, `contrast-home-1440.json` (passesSample "O") |
| Button size at 1440×900 | `244×72 px` (tab chain step 8 box) | `tab-home-1440.json step 8 box:[244,72]` |
| Button size at 375×812 | `173×104 px` (tab chain step 4 box) | `study/receipts/2026-10-21/tab-home-375.json step 4 box:[173,104]` |
| Button size at 320×568 | `118×104 px` (`rect=[152,270,118,104]`) | `study/receipts/2026-10-20/interactions.json → hero320` |
| Card size at 320×568 | `262×136 px` (`card=[24,286,262,136]`) | `study/receipts/2026-10-20/interactions.json → hero320` |
| Card size at 320 — targeted.json | `parent rect=[24,336,262,136]` — same 262×136 | `study/receipts/2026-10-20/targeted.json → heroBtn parent` |
| Button scrollWidth at 320 | 173 px; clientW 118 px → **overflow-hidden clips 55 px of button content** | `study/receipts/2026-10-20/targeted.json → heroBtn scrollW:173 clientW:118 ovf:hidden` |
| Focus ring (current, measured) | `outline: 2px solid rgb(139,92,246)` (= `#8B5CF6`), `outline-offset: 2px` — ring vs violet-600 pill = **1.66:1** (stored) / **1.39:1** (grader hand-recompute, PLAN:104) — **both below 3:1** | `study/receipts/2026-10-21/focus-hero-ring-1440.json` |
| Ring backdrop | `bgOutside: oklch(0.541 0.281 293.009)` = the violet-600 pill | `study/receipts/2026-10-21/focus-hero-ring-1440.json` |
| Tab-order position | Step **8** of **45** focusable elements on `/` at 1440×900 (`tab-home-1440.json`); preceding step 7 is `<button>Get Started</button>` (`Navigation.tsx`, box `[126, 40]`); at 375×812 it is Step **4** of **30** (`tab-home-375.json`). *(Note: Receipt headers carry stale `focusableCount: 36`; the steps arrays — 45 stops at 1440 and 30 stops at 375 — are authoritative)* | `tab-home-1440.json step 7, 8` · `tab-home-375.json step 4` |
| CTA text contrast | white `rgb(255,255,255)` on `rgb(139,92,246)` = **4.23:1**; need 4.5:1 for 12px/700 → **FAIL** | `contrast-home-1440.json failure: text "See how it works" ratio 4.23` |
| Button click action | `onClick={() => navigate("/book-a-schedule")}` — uses `useNavigate`, no `<a href>` | `HeroPage.tsx:110` |
| `overflow-hidden` class | On the button at `HeroPage.tsx:111` — clips scrollWidth 173 down to clientW 118 | `HeroPage.tsx:111` |
| Hover state | `hover:bg-white hover:text-black` — inverts fill; also has `group relative` for the `<span className="relative z-10">` child | `HeroPage.tsx:111` |
| Transition | `transition-all duration-300` on the button | `HeroPage.tsx:111` |
| AOS on subheader | `data-aos="fade-up"` `data-aos-delay="800"` `data-aos-duration="1000"` on the `<p>` subheader | `HeroPage.tsx:91–93` |
| Index.css focus rule | `index.css:336` `*:focus-visible { outline: 2px solid #8B5CF6; outline-offset: 2px; }` — **unlayered**, load-bearing (REG-21); this rule produces the failing 1.39:1 ring | `frontend/src/index.css:336–338` |

---

## 3. REG Mapping

| REG ID | Status | Applies to |
|---|---|---|
| REG-09 | OPEN-CODE | CTA button fill `bg-[#8B5CF6]` white text = 4.23:1 (need ≥4.5:1); also `buttonText` span inside |
| REG-18 | OPEN-CODE | `onClick→navigate("/book-a-schedule")` — no `<a href>` on the button, cannot be bookmarked/middle-clicked |
| REG-23 | PROVISIONAL | Hero CTA at 320px: scrollW 173 vs clientW 118 with `overflow-hidden`; 4-line wrap all words visible, span ends x269 vs clip 270 — 🟡 latent (1px margin); rewrite-or-drop pending pass-B |
| REG-25 | PROVISIONAL | Focus ring 1.39:1 (grader) / 1.66:1 (stored) on the violet-600 pill — FAIL U5 ≥3:1; pass-B re-measure required before ship |

---

## 4. Applicable Locked Rubric Rows

| Rubric anchor | Criterion | Measured pass condition (from locked rubric) |
|---|---|---|
| U9 (1.4.3) | Text contrast | ≥4.5:1 for 12px/700 CTA label; ≥3:1 for large display text |
| U5 (2.4.7 + 1.4.11) | Focus visible / indicator contrast | Focus indicator ≥3:1 vs BOTH adjacent surfaces (ring-vs-fill AND ring-vs-backdrop) |
| U3 (2.1.1) | Keyboard: Enter/Space fires the button action | Tab to element → Enter → navigates to `/book-a-schedule` |
| U16 (no-context-shift) | Internal navigation = SPA Link or `<a href>` | `navigate()` button → REG-18 open; booking path has no anchor target |
| D1 (overflow = 0px) | Horizontal overflow at all locked viewports | `scrollWidth − clientWidth = 0` at 320/375/768/1024/1440 (site-wide D1 bar) |
| R5 (2.5.5) | Touch target ≥44px | Button 118×104 at 320 = ✅ passes; 173×104 at 375 = ✅ passes; 244×72 at 1440 = ✅ passes |

---

## 5. Pointer Verification (all verified 2026-10-23)

All inline checks passed:

- `HeroPage.tsx:109` → `<button` ✓
- `HeroPage.tsx:111` → `bg-[#8B5CF6]` ✓ `overflow-hidden` ✓
- `Router.tsx:79–80` → `index: true, element: <Homepage />` ✓
- `Homepage.tsx:21` → `<HeroPage bgImage` ✓
- `App.tsx:17–19` → `getContent()` + `setContent` ✓
- `index.css:336` → `*:focus-visible` ✓
- `focus-hero-ring-1440.json` → `ringVsOutside: 1.66, meets3to1: false` ✓
- `tab-home-1440.json step 8` → `"SEE HOW IT WORKS"` box `[244,72]` ✓
- `interactions.json → hero320` → heroBtn `[152,270,118,104]` ✓
- `targeted.json → heroBtn` → `scrollW:173, clientW:118, ovf:hidden` ✓
- `contrast-home-1440.json` → `"See how it works" ratio 4.23 pass:false` ✓

**Unresolved: 0**
