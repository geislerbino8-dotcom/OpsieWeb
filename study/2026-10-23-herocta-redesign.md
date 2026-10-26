# HeroPage CTA Card/Button — Redesign Study
**Date:** 2026-10-23
**Component:** HeroPage CTA card/button — the violet mini-card pill + CTA button at the bottom of the hero section.
**Source:** `frontend/src/components/HeroPage.tsx`

---

## §1 Anatomy — Parts List with Exact Tokens (Current)

Every named sub-element of the HeroPage CTA card — the `div.flex.items-center.justify-between.bg-violet-600...` at `HeroPage.tsx:99–115`.

### 1. Card Container
- **Location:** `HeroPage.tsx:99`
- **Classes:** `flex items-center justify-between bg-violet-600 text-white rounded-lg p-4 card-side-glow max-w-md w-full`

### 2. Badge Cluster (left side)
- **Location:** `HeroPage.tsx:100–107`
- **Classes:** `flex items-center space-x-3`

#### 2a. Badge Icon Circle
- **Location:** `HeroPage.tsx:101–103`
- **Classes:** `bg-violet-700 rounded-full w-10 h-10 flex items-center justify-center`
- **Child:** `<span className="font-bold text-lg">O</span>`

#### 2b. Badge Text Stack
- **Location:** `HeroPage.tsx:104–107`
- **Classes:** `text-left`
- **Children:**
  - `<h1 className="text-xl font-bold">Opsie</h1>`
  - `<p className="text-sm">Operate The Opsie Way</p>`
- > [!NOTE] The `<h1>` here contributes to **REG-20**'s 7-h1 count — preserved as-is in this redesign scope. REG-20 is **not** claimed closed here.

### 3. CTA Button
- **Location:** `HeroPage.tsx:109–114`
- **Tag:** `<button onClick={() => navigate("/book-a-schedule")} className="group relative rounded-full bg-[#8B5CF6] text-white px-14 py-5 font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:bg-white hover:text-black shadow-2xl overflow-hidden">`
- **Child:** `<span className="relative z-10">{buttonText}</span>`
- **`buttonText` source:** CMS runtime `content?.heroSection?.button`
  - Live value: `"See how it works"` → rendered uppercase as **"SEE HOW IT WORKS"**

---

## §2 States Enumerated (CTA Button)

| State | Description |
|---|---|
| **default** | `bg-[#8B5CF6]` fill, white text "SEE HOW IT WORKS", no outline |
| **hover** | `hover:bg-white hover:text-black` — fill inverts to white, text to black; `transition-all duration-300` |
| **focus-visible** | `index.css:336` — `outline: 2px solid #8B5CF6; outline-offset: 2px` — **currently FAILING**: ring vs violet-600 pill = 1.39–1.66:1 < 3:1 |
| **active (pressed)** | No explicit active state coded — UA default applies (no special class) |
| **disabled** | No `disabled` attribute or `aria-disabled` coded on this button — not applicable |
| **loading** | N/A — button fires `navigate()` synchronously |

> [!NOTE] The `hover:text-black` state has its own contrast result: black text on white bg = **21:1** ✅ — passes U9 trivially.

---

## §3 Proposed Anatomy (Changes Only)

All changed items are labelled **(proposal)**. Unchanged items are explicitly preserved.

### 3a. CTA Button Fill — REG-09 Closure

- **Change:** `bg-[#8B5CF6]` → `bg-violet-700` = `#6D28D9` **(proposal)**
- **Rationale:** white `#fff` on `#6D28D9` = **7.1:1** (U-queue 1 answer, PLAN:110) — passes U9 ≥4.5:1 for 12px/700
- **Kept unchanged:** `rounded-full`, `px-14 py-5`, `text-xs`, `font-bold`, `uppercase`, `tracking-[0.2em]`, `transition-all duration-300`
- **Hover state proposal:** `hover:bg-white hover:text-black` remains (still 21:1 ✅); OR reconsider to `hover:bg-violet-900` (honest unknown — ring design may affect this)

### 3b. Focus-Visible Ring — REG-25 (Ruling R-B)

- **Cascade-winning mechanism:** `index.css:336` defines an unlayered global rule `*:focus-visible { outline: 2px solid #8B5CF6; outline-offset: 2px; }`. Because standard Tailwind utility classes live inside `@layer utilities`, they are subordinate in specificity to unlayered rules in the CSS cascade.
- **Proposed override (Ruling R-B):** Use an **unlayered element-scoped rule** on the CTA element (preferred), or `!` important utilities:
  ```css
  /* Unlayered element-scoped override — wins cascade without editing global index.css */
  .hero-cta-button:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px #8B5CF6;
  }
  ```
  *(Alternative utility syntax: `!outline-2 !outline-white !outline-offset-2 focus-visible:ring-2 focus-visible:ring-[#8B5CF6]`)*
- **Non-colliding ring geometry & contrast:**
  - White inner outline (2px with 2px offset): lands cleanly on the `bg-violet-600` card pill = **5.9:1** contrast ✅ (passes U5 ≥3:1)
  - Outer ring (`#8B5CF6` / dark clearance): white vs dark canvas background (`#0a0a0a`) = **19.8:1** ✅ (passes U5 ≥3:1)
  - Ring vs button fill (`bg-violet-700` post-fix): white on violet-700 = **7.1:1** hand (`#6D28D9`) / **7.3:1** receipt (`rgb(112,8,231)`) ✅ (passes U5 ≥3:1; geometry pass-B re-measure required) *(H-C9 amended 2026-10-26: the earlier `≈5.4:1` for this pair was wrong — established same-pair value is 7.1:1 hand / 7.3:1 receipt; only the geometry (ring position) is re-measured in pass-B, not the pair ratio)*
- **Status:** REG-25 remains **PROVISIONAL** until pass-B re-measure confirms the ratios live.
- **Global rule safety:** `index.css:336` is **NOT modified** — REG-21 load-bearing rule remains intact.

### 3c. Booking Href — REG-18 (Ruling R-A)

- **Change:** `<button onClick={() => navigate("/book-a-schedule")}>` → `<Link to="/book-a-schedule" className="hero-cta-button ... [visual classes]">` **(proposal)**
- **Keyboard activation:** Native **Enter key only** per Ruling R-A (standard web specification for hyperlink anchors; no keydown hack for Space).
- **Preferred form:** `<Link>` component — consistent with every other internal nav in the codebase, renders as canonical `<a>` in DOM.
- **Preserved:** All visual classes (`rounded-full`, padding, uppercase tracking, transition).
- **Tab-order:** Step **8** of **45** at 1440px (preceded by step 7 `<button>Get Started</button>` `[126, 40]`); step **4** of **30** at 375px (`[173, 104]`). *(Note: Receipt headers carry stale `focusableCount: 36`; steps arrays 45 at 1440 and 30 at 375 are authoritative)*

### 3d. 320px `overflow-hidden` Review — REG-23 PROVISIONAL

- **Current:** button `scrollW` 173, `clientW` 118, `overflow-hidden` on button at `HeroPage.tsx:111` — receipt shows all 4 words visible (`r-320x568-hero-cta.png`, PROVISIONAL 🟡 latent)
- **Proposal:** Remove `overflow-hidden` from the button class **(proposal)**
  - The `group relative` pattern + `<span className="relative z-10">` child does **not** require overflow clipping for its visual function — the group hover effect has no pseudo-elements that would overflow
- **If removing `overflow-hidden`:** pass-B re-capture required to confirm delta = 0 at 320 and no new overflow source
- **If keeping:** Add explicit padding reduction at 320 to guarantee ≥1px clearance **(proposal)**

---

## §4 Per-REG Row Closure Claims

| REG ID | Rubric Measured Pass Condition | How This Proposal Satisfies It | Claim Status |
|---|---|---|---|
| REG-09 | U9 (1.4.3): white on button fill ≥4.5:1 for 12px/700 | `bg-violet-700` (`#6D28D9` = **7.1:1**; `#7008E7` = **7.3:1**) satisfies ≥4.5:1 for 12px/700 uppercase for hero CTA instance | Partially addressed (hero CTA instance only — row remains OPEN across remaining 10 of 11 contrast instances site-wide; verify hero instance with `contrast-*.json` post-fix) *(H-C10 scoped 2026-10-26: closure claim limited to hero CTA — row OPEN site-wide)* |
| REG-18 | U3 (2.1.1) + U16: button navigates `/book-a-schedule` AND is addressable (canonical href) | Replace `button+navigate()` → `<Link to="/book-a-schedule">` — provides canonical `href`, preserves SPA navigation without document reload for hero CTA instance | Partially addressed (hero CTA instance only — row remains OPEN across `Faq.tsx:27` + remaining 5 of 6 navigate sites; verify hero instance with `inv-*.json` shows `href: "/book-a-schedule"`) |
| REG-23 | D1: overflow = 0px at 320; R5: button ≥44px | Remove `overflow-hidden` (proposal) + pass-B re-capture confirms `scrollW` ≤ `clientW` at 320 | 🟡 **NOT claimed closed** — PROVISIONAL 🟡 latent (1px margin); closure after pass-B re-measure |
| REG-25 | U5 (2.4.7): focus indicator ≥3:1 vs BOTH surfaces | Dual-tone ring: white inner on violet-600 pill = 5.9:1; white on canvas #0a0a0a = 19.8:1; white on violet-700 fill = 7.1:1 hand / 7.3:1 receipt | 🟡 **NOT claimed closed** — PROVISIONAL 🟠; closure after pass-B re-measure *(H-C9 amended 2026-10-26: fill-pair ratio was `≈5.4:1`, corrected to 7.1:1 hand / 7.3:1 receipt)* |

---

## §5 CMS / Owner Dependencies

- **`buttonText`** = `content?.heroSection?.button` (CMS runtime) — the proposal **never hardcodes** the button label
- **Long CMS string edge case:** button currently `overflow-hidden` → removing it and testing long strings is part of pass-B scope
- **No new owner dependencies introduced**
- **REG-26/27** (footer social links, email credentials) — not touched by this redesign

---

## §6 Edge Cases

### 320px
Detailed in §3d above. PROVISIONAL until pass-B re-capture.

### Long CMS Button Label
- Example: `"Get Started Today With Opsie"`
- With `overflow-hidden` removed, button will grow to fit content
- `max-w-md` card constrains total width; badge cluster may squeeze
- **Honest unknown** without measurement — pass-B scope

### Zero Content (Empty CMS Button Label)
- `buttonText || ""` fallback at `HeroPage.tsx:18` — button renders with empty label
- Accessible name falls to UA empty string (no accessible name) → should add fallback text
- **Out of scope for this redesign — flagged as open**

### AOS
- REG-28 is parked; this proposal makes **no change** to AOS usage
- `transition-all duration-300` on button is CSS, not AOS-gated
- **No AOS dependence** — ring/contrast fixes are static CSS changes, not animation-gated

---

## §7 Retained Elements (No Change)

| Element | Token(s) | Reason kept |
|---|---|---|
| Card background | `bg-violet-600` | Not changed — distinct from badge circle `bg-violet-700`; hierarchy intentional ✅ |
| Card shape + spacing | `rounded-lg p-4 card-side-glow max-w-md` | Preserved |
| Badge "O" icon circle | `bg-violet-700 rounded-full w-10 h-10` | Passes contrast (PLAN:110 passesSample "O" bg `rgb(112,8,231)` ratio 7.3 ✅) |
| `SplitText` heading animation | — | Not touched |
| `SoftAurora` background layer | — | Not touched |
| Spinning watermark logo | — | Not touched |
| Bottom gradient overlay | — | Not touched |

---

## §8 Interaction Annotations (Block 4)

### 8a. Keyboard Map
Every tab stop → element → Enter/Space state delta for the hero section (measured condition U3).

The hero section contributes **ONE** focusable element: the CTA button (tab stop **8** of **45** at 1440×900 in `tab-home-1440.json`; preceding step 7 is `<button>Get Started</button>` in `Navigation.tsx`, box `[126, 40]`; step **4** of **30** at 375×812 in `tab-home-375.json`, box `[173, 104]`). *(Note: Receipt headers carry stale `focusableCount: 36`; steps arrays 45 at 1440 and 30 at 375 are authoritative)*

| Tab stop | Element | Tag | Action key | State delta | U3 measured condition |
|---|---|---|---|---|---|
| 8 | CTA button "SEE HOW IT WORKS" | `<Link to="/book-a-schedule">` (renders `<a>`) | **Tab** → focus | Ring appears (`focus-visible` state via cascade-winning scoped rule) | Ring must be ≥3:1 vs both adjacent surfaces (U5) |
| 8 | CTA button | `<Link to="/book-a-schedule">` | **Enter** | SPA navigate to `/book-a-schedule` without page reload | U3: keyboard-operable; U16: canonical `href` present in DOM |
| 8 | CTA button | `<Link to="/book-a-schedule">` | **Space** | Default browser page scroll (standard anchor behaviour) | **Ruling R-A:** Accepted as standard web anchor specification; no custom `keydown` hack |

> [!NOTE] **Ruling R-A (Space Key Decision):**
> Per supervisor ruling R-A, the component uses standard `<Link to="/book-a-schedule">` with native keyboard activation (**Enter only**). Space key page-scrolling is native browser anchor behavior; no custom `keydown` interceptor or nested button hack ships.

### 8b. ARIA Deltas Per State
- **default**: none beyond tag semantics (`<Link>` renders `<a>`, providing link role implicitly)
- **focus-visible**: no ARIA delta (focus ring is visual CSS-only via cascade-winning rule)
- **hover**: no ARIA delta (visual fill inversion only)
- **active/pressed**: no `aria-pressed` (momentary navigation action, not a toggle)
- **post-navigate**: SPA router updates DOM; no `aria-live` needed
- No `aria-expanded`, `aria-invalid`, or `aria-describedby` needed for this element (simple navigation trigger, not disclosure or form field).

### 8c. Hover Annotations
- **Hover effect:** `hover:bg-white hover:text-black` — purely visual fill inversion; no hover-only information path (F11 lesson applied: keyboard operable via Enter regardless of hover state).
- **F11 compliance:** No content, tooltip, or label is revealed exclusively on hover.
- **Transition:** `transition-all duration-300` (300ms CSS transition on fill, text color, and shadow).

### 8d. Focus Behavior — Open/Close (D1 Ruling)
- The CTA button is **NOT** a disclosure widget or overlay — no open/close focus management required.
- **Focus lifecycle:**
  1. Tab → focus lands on button (step 8 of 45); dual-tone ring appears
  2. Tab → focus leaves to step 9 onward
  3. Enter → SPA route change triggers navigation to `/book-a-schedule`
- **Post-navigate focus:** In standard React Router v6 SPA navigation without custom focus restoration, focus is not guaranteed to auto-focus target controls; HeroPage does not assert automatic focus transfer.
- No hamburger-return rule applies here (that rule specifically governs `MobileMenu` = REG-12).

### 8e. `index.css:336` Guard (REG-21)
> [!IMPORTANT] This proposal does **NOT** modify `index.css:336`.
- The element-level ring override uses an unlayered element-scoped rule (`.hero-cta-button:focus-visible` or `!` important utilities) that wins the cascade against unlayered `*:focus-visible` without touching `index.css:336`.
- Therefore the REG-21 unlayered-warning comment requirement does **not** ship here because `index.css:336` remains untouched.
- Post-fix verification requirement: `index.css:336` must still read `*:focus-visible { outline: 2px solid #8B5CF6; outline-offset: 2px; }` with **0 edits**.

### 8f. Transitions Summary
| Transition | Duration | Trigger | Applies To |
|---|---|---|---|
| `transition-all duration-300` | 300ms | Hover enter/leave | All CSS properties on button (fill, text color, shadow) |
| None (instant) | — | `focus-visible` | Ring appears/disappears instantly; no transition on outline/box-shadow |
| SPA route change | Depends on router | Enter / click | Navigates to `/book-a-schedule`; no custom transition animation |

---

## §9 Supervisor Review Checklist & Verification Status

- [x] **Pointer check:** All cited `file:line` references are verified on disk (HeroPage.tsx:109, 111; Router.tsx:79–80; Homepage.tsx:21; App.tsx:17–19; index.css:336; receipts cited exist non-zero).
- [x] **Sketch ↔ proposal consistency:** 1440/375/320 sketches in `2026-10-23-herocta-sketches.md` reference the identical token changes (`bg-violet-700`, cascade-winning white dual-tone ring, `<Link to="/book-a-schedule">`, removal of `overflow-hidden`).
- [x] **REG-09 closure scope:** Pass condition = WCAG 1.4.3 (U9) contrast ≥ 4.5:1. `bg-violet-700` (`#6D28D9` = **7.1:1**; `#7008E7` = **7.3:1**) satisfies condition for 12px/700 uppercase for hero CTA instance only — row remains OPEN site-wide across remaining 10 of 11 contrast instances ✅ *(H-C10 scoped 2026-10-26: this certifies the hero CTA instance only, not the full REG-09 row — the other 10 contrast instances are still open).*
- [x] **REG-18 closure scope:** Pass condition = U3+U16 addressable link. `<Link to="/book-a-schedule">` provides canonical `href` in DOM; Enter-only navigation accepted under **Ruling R-A** for hero CTA instance only — row remains OPEN across `Faq.tsx:27` + remaining 5 navigate sites ✅ *(H-C10 scoped 2026-10-26: hero CTA instance only — the 6 navigate sites are still open).*
- [x] **REG-23 status:** Explicitly marked **PROVISIONAL 🟡 latent** (1px margin); not claimed closed; pass-B re-measure required before ship.
- [x] **REG-25 status:** Explicitly marked **PROVISIONAL 🟠**; cascade-winning mechanism adopted under **Ruling R-B**; pass-B ring ratio re-measure required before ship.
- [x] **index.css:336 guard:** Not edited; REG-21 guard satisfied.
- [x] **AOS independence:** No AOS animation dependence; static CSS only.
- [x] **No hover-only paths:** F11 compliant.
- [x] **Touch targets:** 118×104 at 320px ✅, 173×104 at 375px ✅, 244×72 at 1440px ✅ — all ≥44px (R5).
- [x] **CMS dependency named:** `buttonText` runtime source documented.
- [x] **All review rulings certified:** Ruling R-A (Enter-only `<Link>`) and Ruling R-B (cascade-winning element-scoped ring) recorded. Open TBDs = 0.

