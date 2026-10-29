# Shared Design System — Spacing · Typography · UI States
**Date:** 2026-10-26 (Block 3)
**Scope:** consolidated across the **hero CTA** (`2026-10-23-herocta-*.md`) + the **5 Block-2 sketches** (mobilemenu · contactform · faq · reviewarrows · footer)
**Rule:** every token is either **receipt-cited** (a `file:line` or a `study/receipts/…` pointer) or explicitly marked **(proposal)**. No token is presented as measured unless a receipt backs it.

**Source components (receipts):**
- Hero CTA: `study/receipts/2026-10-20/targeted.json` · `focus-hero-ring-1440.json` · `2026-10-23-herocta-redesign.md`
- MobileMenu: `study/receipts/2026-10-26/b2-mobilemenu-375.json`
- ContactForm: `study/receipts/2026-10-26/b2-contactform.json`
- FAQ: `study/receipts/2026-10-26/b2-faq.json`
- ReviewArrows: `study/receipts/2026-10-26/b2-reviewarrows-1440.json`
- Footer: `study/receipts/2026-10-26/b2-footer.json`
- Global rules: `frontend/src/index.css:336` (focus) · `:26-30` (base font) · `:15-16` (font tokens) · `:48-52` (card-side-glow)

---

## 1. Color tokens

| Token | Value | Source | Contrast notes |
|---|---|---|---|
| **canvas** | `#0a0a0a` (carbon black) | `index.css:34` (body bg) | base surface |
| **violet-500 (brand)** | `#8B5CF6` | receipt `rgb(139,92,246)` — `focus-hero-ring-1440.json` | white-on-`#8B5CF6` = **4.23:1** (F8, needs 4.5 for <18px/400 — FAIL for small text, PASS for ≥18px or bold) |
| **violet-600** | `bg-violet-600` (Tailwind) | `HeroPage.tsx:99` card pill | white on violet-600 = **5.9:1** ✅ (ring-vs-surface, §2.3) |
| **violet-700** | `#6D28D9` (hand) / `rgb(112,8,231)` (receipt) | hand value: PLAN:110 · receipt: `contrast-home-1440.json:95` *(G6 amended 2026-10-26: was cited to `targeted.json` — `rgb(112,8,231)` exists in exactly one receipt, `contrast-home-1440.json:95`, not targeted.json)* | white on violet-700 = **7.1:1** hand / **7.3:1** receipt ✅ (REG-09 hero instance) |
| **white** | `#fff` | throughout | on canvas `#0a0a0a` = **19.8:1** ✅ |
| **card-side-glow** | `rgba(139,92,246,0.6)` dual side-shadow | `index.css:48-52` | decorative |

**Established contrast pairs (used throughout, from the accessibility track):** canvas **19.8** · violet-700 **7.3/7.1** · violet-600 **5.9** · `#8B5CF6` **4.23**. These are the locked values; do not re-derive.

---

## 2. Typography scale (D9 — how the fonts actually resolve)

**D9 fact (`index.css:12-16`, `:26-30`):** `tailwind.config.js` (v3-era) is **never loaded** by Tailwind v4 (no `@config`), so `font-poppins` (19 usages) and `font-montserrat` were **never generated** — both silently rendered **Montserrat**. Tokens now live in `@theme`: `--font-poppins` (`:15`), `--font-montserrat` (`:16`); `.font-poiret` at `:98`. A `@layer base` rule (`:26-30`) sets the `*` default to Montserrat, deliberately layered so the utilities win.

| Role | Family | Token / class | Source | Common sizes |
|---|---|---|---|---|
| **Default / body** | Montserrat | `*` default + `.font-montserrat` | `index.css:28` / `:16` | 14–16px |
| **UI / cards / body copy** | Poppins | `.font-poppins` (`--font-poppins`) | `index.css:15`; `Card.tsx:14,23` · `ClientCard:40,47,58` · `WhyChooseUs:45,64` | 12–22px, `font-light`/`medium`/`bold` |
| **Display / headings** | Montserrat | `.font-montserrat` / `heading-glow` | `SuperHeader.tsx:22` (`text-[42→72px]`) · `Header.tsx:6` · `MapDesign:156` | 20–72px |
| **Decorative display** | Poiret One | `.font-poiret` | `index.css:98`; `BookingPage.tsx:38` | booking title only |

**Honest caveat:** because `font-poppins`/`font-montserrat` were ungenerated until 2026-10-09, **any pre-10-09 measurement of "Poppins" text was actually Montserrat.** Current token resolution is fixed; treat the type scale below as **post-token** truth. Poiret is display-only (booking), not a body face.

| Size token | px | Typical use | Source |
|---|---|---|---|
| `text-xs` | 12 | hero CTA label (uppercase, `tracking-[0.2em]`) | `HeroPage.tsx:111` *(G9: className line; `:110` is `onClick={navigate}`)* |
| `text-sm` | 14–16 | footer links, card desc, form labels | `Footer.tsx` links · `Card.tsx:23` |
| `text-base` | 16 | body copy | `WhyChooseUs:45` |
| `text-lg/xl` | 18–20 | card headers, sheet links (`text-2xl` on mobile menu) | `Card.tsx:14` · `MobileMenu.tsx:54` |
| `text-2xl→72px` | 24–72 | display headings | `SuperHeader.tsx:22` |

*(The px values for `text-xs/sm/base/lg/xl` are Tailwind defaults — receipt-cited by the class names above; the display range is receipt-cited at `SuperHeader.tsx:22`.)*

---

## 3. Spacing & radius

| Token | Value | Source |
|---|---|---|
| Card padding | `p-4` (16px) | hero CTA card `HeroPage.tsx:99` |
| Button padding (hero CTA) | `px-14 py-5` | `HeroPage.tsx:111` *(G9: className line)* |
| Shared button base | `px-2 py-1` | `Buttons.ts:55` (the review arrows inherit this) |
| Form input padding | ~~`py-3` **(proposal)** → to reach ≥44px~~ **superseded** *(DS-6 mechanical 2026-10-29: rejected by ruling B2-CF-3 — the receipted field boxes are all already ≥44; no padding change ships)* | contactform sketch §3 *(struck)* |
| Footer link hit box | `block py-2.5` **(proposal)** → ≥44px | footer sketch §3 |
| Card radius | `rounded-lg` | `HeroPage.tsx:99` |
| Pill / button radius | `rounded-full` | `HeroPage.tsx:111` *(G9: className line)* · badge `:105` |
| Sheet link radius | `rounded-3xl` | `MobileMenu.tsx:50` |
| Section rhythm | `py-24 md:py-32` / `px-6` | `ProductSection.tsx:17` · review section |
| Grid gap | `gap-8` (footer), `gap-6` (cards) | `Footer.tsx:82` grid · WhyChooseUs cards |
| Socials / icon box | `h-11 w-11` (44×44) **(proposal)** | footer + reviewarrows sketches §3 |

---

## 4. UI state matrix

Every state the phase-1 docs enumerate (default / hover / focus-visible / pressed / disabled / loading / empty). **R-B focus rule** and **no-hover-only rule** are baked into the matrix.

| State | Hero CTA (current → proposal) | General rule | Notes |
|---|---|---|---|
| **default** | `bg-[#8B5CF6]` white text → `bg-violet-700` **(proposal)** | fill = brand violet, text = white | violet-700 clears REG-09 (7.1/7.3:1) |
| **hover** | `hover:bg-white hover:text-black` (21:1) **or** `hover:bg-violet-900` (honest unknown) *(DS-8 ruled 2026-10-29: the violet-900 fork is **rejected** — ruling P-2 kept `hover:bg-white hover:text-black` (21:1 receipted); the "or" no longer presents an open option)* | hover is **decoration only** — never the sole path to an action (see no-hover-only below) | reviewarrows `hover:bg-[#8B5CF6]`, footer links `hover:text-[#8B5CF6]` |
| **focus-visible** | dual-tone ring (see §5) | **R-B rule applies** | the F4 lesson: ring must clear vs BOTH surfaces |
| **pressed** | **(proposal)** darken fill one step (`bg-violet-800`) *(DS-1 ruled 2026-10-29: **accepted as documented norm — no implementation in this pack**; the fill-darken does not conflict with the existing `active:` transform-press states)* | instant, no layout shift | no current receipt — no pressed state measured *(DS-1 corrected 2026-10-29: accurate as to receipts — no receipt measures any `active:` state — but `active:` transform states do ship at 16 sites; see §9)* |
| **disabled** | **(proposal)** `opacity-50` + `cursor-not-allowed`, `aria-disabled="true"` *(DS-2 ruled 2026-10-29: **accepted with fork resolved — `aria-disabled` + stays in tab order**. Divergence note: the shipped shared Button uses **native** `disabled` (`Button.tsx:14` → `Buttons.ts:58` `opacity-50 cursor-not-allowed` — the norm's first two clauses match `:58` exactly, but there is **no `aria-disabled` anywhere repo-wide**), so current code ≠ norm — reconciliation recorded as future **out-of-pack** work; implementation must not assume conformance)* | stay in tab order via `aria-disabled` (ruled) | ~~none of the 6 components currently ships a disabled state~~ *(DS-2 corrected 2026-10-29: false — the shared Button ships native `disabled`; see left cell)* |
| **loading** | **(proposal)** label swap + `aria-busy="true"` *(DS-3 ruled 2026-10-29: **accepted as documented norm — no implementation in this pack**; rides whichever future component needs it)* | submit/send buttons (contactform) | not measured — proposal |
| **empty** | **(proposal)** FAQ no-answers, review no-data *(DS-4 ruled 2026-10-29: **accepted as documented norm — no implementation in this pack**; correctly guards the REG-26/27 never-assume-CMS-content rule)* | render a text fallback, not a blank box | FAQ + reviewarrows relevant |

---

## 5. Focus-visible rule (R-B — the mechanism that actually wins the cascade)

**The F4 lesson:** a focus ring must reach **≥3:1 against BOTH adjacent surfaces** — the element's own fill *and* the backdrop it sits on. One ring color rarely clears both.

**R-B mechanism rule:** because `index.css:336` is an **unlayered** global rule (`*:focus-visible { outline: 2px solid #8B5CF6; outline-offset: 2px; }`), it **outranks** layered Tailwind `focus:outline-none` / `focus:ring-*` utilities (they live in `@layer utilities`, subordinate in the cascade). Therefore, to restyle a *specific* control's ring you must use **one of**:
1. an **element-scoped unlayered** CSS override (e.g. `.hero-cta-button:focus-visible { … }`), or
2. **`!`-important utilities** (`!outline-2 !outline-white`), or
3. a `box-shadow`-based ring on an unlayered rule.

You **cannot** win with plain layered `focus:ring-*` utilities against the global rule. This is receipt-backed (`focus-hero-ring-1440.json`, audit §2.3 empirical).

**REG-21 guard:** any change near `index.css:336` must ship the unlayered-warning comment and leave the rule's text intact unless a deliberate global redesign is approved. The hero CTA dual-tone ring **does not touch** `index.css:336` — it adds an element-scoped rule.

**Dual-tone ring spec (hero CTA, `redesign.md:77-84`):** white inner outline (2px/2px-offset) + outer `#8B5CF6` clearance ring. Clears **5.9:1** vs violet-600 pill · **19.8:1** vs canvas · **7.1/7.3:1** vs violet-700 fill — all ≥3:1, both surfaces covered. *(Geometry = pass-B re-measure; ratios are established.)*

---

## 6. No-hover-only rule (F11 lesson)

**Rule:** no interaction path may exist **only** on hover. Every action reachable by hover must also be reachable by **click/tap and keyboard (Enter/Space)**. The mobile-menu F11 finding (hover/keyboard divergence behind an overlay) and the reviewarrows/desktop-hover patterns are governed by this.

**Applied in this system:**
- Review arrows: `hover:bg-[#8B5CF6]` is decoration; the buttons are fully operable via click/Enter without hover → **compliant**.
- Footer links: `hover:text-[#8B5CF6]` is decoration; links navigate on click/Enter → **compliant**.
- Mobile sheet: opens on burger click/Enter (not hover) → **compliant**; the F11 fix (§mobilemenu sketch) restores keyboard containment, which this rule reinforces.
- Mega-menu product sub-links (inherited, `Navigation.tsx:124-125`, hover-only, no `onFocus`) remain a **known exception** — reachable via the parent `/products` link, so not a 🔴, but flagged as a hover-only candidate for a future fix. *(DS-5 ruled 2026-10-29: **defer with reason — terminal** (P-6 pattern); registered as a hover-only candidate finding for the findings track, not this pack. Strengthened cite: `Navigation.tsx:124–125` is the `onMouseEnter`/`onMouseLeave` pair, and `onFocus` has **0 hits repo-wide** (verified 2026-10-29), not just in Navigation.)*

---

## 7. Touch-target rule (R5 bar)

**Bar:** every interactive target ≥44×44 (WCAG 2.5.8 AAA / the site's R5).

| Component | Current | Fix in system |
|---|---|---|
| Hero CTA | 128×104 ✅ | none needed |
| Mobile sheet links | 327×48 ✅ | close button → `h-11 w-11` (proposal) |
| ContactForm fields | ~~19 under-44 @375~~ *(DS-6 mechanical 2026-10-29: disproven — receipted boxes `[309,50]`/`[309,47]`/`[309,128]` all ≥44; the 19 is route-wide, not the fields — G12/B2-CF-3)* | ~~`py-3` inputs (proposal)~~ **superseded** (B2-CF-3 reject) |
| FAQ triggers | full-width ≥44 ✅ | none needed |
| Review arrows | 32×32 **FAIL** (F4-family/R5, new instance) *(G3 propagated 2026-10-26: was "(F6)" — F6/REG-14 is the ServicesSections arrows)* | `h-11 w-11` (proposal) |
| Footer links / socials | links **18 tall × 39–94 wide** (receipted `[65,18]`…`[94,18]`), socials **40×40** (`passb-touch-375.json:248–273`) **FAIL** (F4) *(G8 amended 2026-10-26: was "~18×28, ~40×40" — no 28 in any receipt; socials are not in b2-footer.json)* | `block py-2.5` / `h-11 w-11` (proposal) |

---

## 8. REG references (by ID)

- **REG-09** — white-on-fill ≥4.5:1 (U9). Hero instance closed (violet-700, 7.1/7.3); **10 other instances OPEN site-wide** (H-C10 scope).
- **REG-18** — canonical `<Link href>` (U3+U16). Hero instance closed; **`Faq.tsx:27` + 5 navigate sites OPEN** *(DS-7 mechanical 2026-10-29: stale count — per REG-18a the post-hero open count is **`Faq.tsx:27` + 6 navigate sites**; `pages/ProductPage.tsx:105` was missing from the original 6-site list)*.
- **REG-21** — unlayered `index.css:336` load-bearing; untouched by these designs.
- **REG-23** — 0px overflow at 320 (D1). **PROVISIONAL 🟡** — measured @320: FAQ only (`b2-faq.json → vp320`, triggers 270 wide); reasoned/inherited: the other 5 (mobilemenu = reasoning only "verify in pass-B", contactform/reviewarrows/footer have **no 320 capture at all**, hero carries an open 320 wrap history F1 🟡) — **pass-B re-capture pending** *(G7 amended 2026-10-26: was "All 6 components pass" — presented provisional-as-final; only FAQ has a receipted vp320 measurement)*.
- **REG-25** — focus indicator ≥3:1 vs BOTH surfaces (U5). Dual-tone ring spec §5; **PROVISIONAL** pending pass-B geometry.
- **REG-26/27** — CMS/owner dependencies (button text, FAQ content, reviews) — never assumed present.
- **REG-28** — no AOS dependence (parked).

---

## 9. Open items / honest gaps

| Gap | Reason | Status |
|---|---|---|
| Pressed / disabled / loading states | **(DS-1/DS-2 corrected 2026-10-29:** "no component currently ships them" is false on two counts — **pressed**: `active:` transform/cursor states ship at **16 sites** (public exemplars `PrimaryButton.tsx:47` active:scale-95 · `ServicesSections.tsx:107,118` active:scale-90 · `WhatWeDo.tsx:182` · `EncourageCard.tsx:36` · `ContactProcessSection.tsx:88` · `ContactUsSection.tsx:51` · `Team.tsx:155` · `Carousel.tsx:85` · `WebContentLayout.tsx:104,156`; admin/CMS `DashboardPage.tsx:124` · `UserManagementPage.tsx:128` · `ProductCMS.tsx:194` · `ProductsPageCMS.tsx:125` · `UpdateProductModal.tsx:561`) — **disabled**: the shared Button ships native `disabled` (`Button.tsx:14` → `Buttons.ts:58` opacity-50/cursor-not-allowed). Accurate claim: no component ships a pressed **fill** state, no receipt measures any `active:` state, and no component ships `aria-disabled`/loading states. Ruled: pressed/disabled/loading accepted as documented norms, no implementation in this pack**)** | all **(proposal)** — never measured (pressed fill / loading) |
| Poiret body usage | Poiret is booking-display only | not a body face; excluded from body scale |
| Pre-10-09 "Poppins" measurements | `font-poppins` ungenerated → rendered Montserrat (D9) | post-token truth only |
| Mega-menu hover-only sub-links | inherited exception (`Navigation.tsx:124-125`) | flagged, not fixed here |
| Focus-ring **geometry** at 44×44 (reviewarrows) | ring measured at 32×32 | pass-B re-measure |
