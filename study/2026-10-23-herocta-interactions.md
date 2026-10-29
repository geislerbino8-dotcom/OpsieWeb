# HeroPage CTA Button — Interaction Annotations
**Date:** 2026-10-23
**Component:** HeroPage CTA button — keyboard map, ARIA, hover, focus behavior, index.css guard, transitions, review checklist.
**Companion to:** `2026-10-23-herocta-redesign.md`

---

## §1 Keyboard Map

Every tab stop → element → Enter/Space state delta for the hero section.

The hero section contributes **ONE** focusable element: the CTA button (tab stop **8** of **45** at 1440×900 in `tab-home-1440.json`; preceding step 7 is `<button>Get Started</button>` in `Navigation.tsx`, box `[126, 40]`; step **4** of **30** at 375×812 in `tab-home-375.json`, box `[173, 104]`). *(Note: Receipt headers carry stale `focusableCount: 36`; steps arrays 45 at 1440 and 30 at 375 are authoritative)*

| Tab stop | Element | Tag | Action key | State delta | U3 measured condition |
|---|---|---|---|---|---|
| 8 | CTA button "SEE HOW IT WORKS" | `<Link to="/book-a-schedule">` (renders `<a>`) | **Tab** → focus | Ring appears (`focus-visible` state via cascade-winning scoped rule) | Ring must be ≥3:1 vs both adjacent surfaces (U5) |
| 8 | CTA button | `<Link to="/book-a-schedule">` | **Enter** | SPA navigate to `/book-a-schedule` without document reload | U3: keyboard-operable; U16: canonical `href` present in DOM |
| 8 | CTA button | `<Link to="/book-a-schedule">` | **Space** | Default browser page scroll (standard anchor behaviour) | **Ruling R-A:** Accepted as standard web anchor specification; no custom `keydown` hack |

> [!NOTE] **Ruling R-A (Space Key Decision):**
> Per supervisor ruling R-A, the component uses standard `<Link to="/book-a-schedule">` with native keyboard activation (**Enter only**). Space key page-scrolling is native browser anchor behavior; no custom `keydown` interceptor or nested button hack ships.

---

## §2 ARIA Deltas Per State

| State | ARIA attribute | Value | Reason |
|---|---|---|---|
| **default** | none beyond tag semantics | — | `<Link>` renders `<a>`, providing `role="link"` implicitly |
| **focus-visible** | no ARIA delta | — | Focus ring is visual CSS-only via cascade-winning rule |
| **hover** | no ARIA delta | — | Visual fill inversion only |
| **active/pressed** | no `aria-pressed` | — | Momentary navigation action, not a toggle |
| **post-navigate** | focus remains in standard SPA flow | — | SPA router updates DOM; no `aria-live` needed |

No `aria-expanded`, `aria-invalid`, or `aria-describedby` needed for this element — it is a simple navigation trigger, not a disclosure, form control, or error state.

---

## §3 Hover Annotations

- **Hover effect:** `hover:bg-white hover:text-black` — purely visual fill inversion; no hover-only information path
- **F11 compliance:** The button is keyboard-operable via Enter regardless of hover state — no content or label is revealed exclusively on hover
- **Hover does NOT reveal:** additional content, tooltip, or label — compliant with F11 (no hover-only paths) ✅
- **Transition:** `transition-all duration-300` = 300ms CSS transition on all properties during hover enter/leave

---

## §4 Focus Behavior — Open/Close (D1 Ruling)

- The CTA button is **NOT** a disclosure widget or overlay — no open/close focus management required
- **Focus lifecycle:**
  1. Tab → focus lands on button (step 8 of 45); dual-tone ring appears
  2. Tab → focus leaves to step 9 onward
  3. Enter → SPA route change triggers navigation to `/book-a-schedule`
- **Post-navigate focus:** In standard React Router v6 SPA navigation without custom focus restoration, focus is not guaranteed to auto-focus target controls; HeroPage does not assert automatic focus transfer.
- **No hamburger-return rule applies here** — that rule specifically governs `MobileMenu` = REG-12, not the CTA button

---

## §5 `index.css:336` Guard & Cascade-Winning Mechanism (REG-21, Ruling R-B)

> [!IMPORTANT] This proposal does **NOT** modify `index.css:336`.

- **Cascade-winning mechanism:** Because `index.css:336` is an unlayered global rule (`*:focus-visible { outline: 2px solid #8B5CF6; outline-offset: 2px; }`), standard Tailwind utility classes in `@layer utilities` lose in cascade specificity.
- Under **Ruling R-B**, an **unlayered element-scoped rule** (or `!` important utilities) is used on the CTA element so it wins the cascade without modifying `index.css:336`:
  ```css
  /* Unlayered element-scoped override */
  .hero-cta-button:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px #8B5CF6;
  }
  ```
- **Ratios achieved:**
  - White outline (2px with 2px offset) on `bg-violet-600` card = **5.9:1** ✅
  - Outer ring clearance on dark canvas (`#0a0a0a`) = **19.8:1** ✅
  - Ring vs button fill (`bg-violet-700` post-fix): white on violet-700 = **7.1:1** hand (`#6D28D9`) / **7.3:1** receipt (`rgb(112,8,231)`) ✅ (passes U5 ≥3:1; geometry pass-B re-measure required) *(H-C9 amended 2026-10-26: fill-pair ratio was `≈5.4:1`, corrected to 7.1:1 hand / 7.3:1 receipt)*
- Therefore the REG-21 unlayered-warning comment requirement does **NOT** ship here because `index.css:336` remains untouched.
- **Verify post-fix:** `index.css:336` must still read `*:focus-visible { outline: 2px solid #8B5CF6; outline-offset: 2px; }` with **0 edits**.

---

## §6 Transitions Summary

| Transition | Duration | Trigger | Applies To |
|---|---|---|---|
| `transition-all duration-300` | 300ms | Hover enter/leave | All CSS properties on button (fill, text color, shadow) |
| None (instant) | — | `focus-visible` | Ring appears/disappears instantly; no transition on outline/box-shadow proposed |
| SPA route change | Depends on router | Enter / click | Navigates to `/book-a-schedule`; no custom transition animation specified |

---

## §7 Review Checklist (Supervisor Verification)

Use this checklist to sign off on the redesign proposal before pass-B work begins.

- [x] **Pointer check:** All cited `file:line` references are verified on disk (`HeroPage.tsx:109, 111`; `Router.tsx:79–80`; `Homepage.tsx:21`; `App.tsx:17–19`; `index.css:336`; receipts cited exist non-zero)
- [x] **Sketch ↔ proposal consistency:** 1440/375/320 sketches in `2026-10-23-herocta-sketches.md` reference the identical token changes (`bg-violet-700`, cascade-winning white dual-tone ring, `<Link to="/book-a-schedule">`, removal of `overflow-hidden`)
- [x] **REG-09 closure scope:** Pass condition = WCAG 1.4.3 (U9) contrast ≥ 4.5:1. `bg-violet-700` (`#6D28D9` = **7.1:1**; `#7008E7` = **7.3:1**) satisfies condition for 12px/700 uppercase for hero CTA instance only — row remains OPEN site-wide across remaining 10 of 11 contrast instances ✅ *(H-C10 scoped 2026-10-26: hero CTA instance only; other 10 instances open)*
- [x] **REG-18 closure scope:** Pass condition = U3+U16 addressable link. `<Link to="/book-a-schedule">` provides canonical `href` in DOM; Enter-only navigation accepted under **Ruling R-A** for hero CTA instance only — row remains OPEN across `Faq.tsx:27` + remaining 5 navigate sites ✅ *(H-C10 scoped 2026-10-26: hero CTA instance only; 6 navigate sites open)*
- [x] **REG-23 status:** Explicitly marked **PROVISIONAL 🟡 latent** (1px margin); not claimed closed; pass-B re-measure required before ship
- [x] **REG-25 status:** Explicitly marked **PROVISIONAL 🟠**; cascade-winning mechanism adopted under **Ruling R-B**; pass-B ring ratio re-measure required before ship
- [x] **`index.css:336` not edited** — REG-21 guard satisfied (§5 above)
- [x] **No AOS dependence introduced** — ring/contrast fixes are static CSS changes
- [x] **No hover-only paths** — F11 compliant (§3 above)
- [x] **Touch targets:** 118×104 at 320px ✅, 173×104 at 375px ✅, 244×72 at 1440px ✅ — all ≥44px (R5)
- [x] **CMS dependency named:** `buttonText` = `content?.heroSection?.button` (runtime source documented)
- [x] **All review rulings certified:** Ruling R-A (Enter-only `<Link>`) and Ruling R-B (cascade-winning element-scoped ring) recorded. Open TBDs = 0

### Decisions Record & Pass-B Scope

| Item | Ruling / Status | Action |
|---|---|---|
| **Space-on-`<a>` behavior** | **Ruling R-A: ACCEPT** | `<Link>` with native Enter-only activation; Space scrolls page; no custom keydown hack |
| **Focus ring cascade** | **Ruling R-B: ACCEPT** | Unlayered element-scoped rule `.hero-cta-button:focus-visible` overrides global ring without editing `index.css:336` |
| **REG-25 ring ratios** | **PROVISIONAL 🟠** | Measure dual-tone ring ratio on violet-700 fill live during pass-B |
| **REG-23 overflow removal** | **PROVISIONAL 🟡 latent** | Removing `overflow-hidden` re-captured at 320px during pass-B |
| **Long CMS button label** | Edge case (pass-B) | Test strings > 20 characters during pass-B re-capture session |
