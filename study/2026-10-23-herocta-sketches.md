# HeroPage CTA — Desktop + Mobile Wireframe Sketches
**Date:** 2026-10-23  
**Component:** HeroPage mini-card pill + CTA button  
**REG IDs covered:** REG-09, REG-23, REG-25 (+ REG-18 structural note)

> **Convention:** All current measurements are labelled with their receipt source in parentheses.  
> All proposed sizes, tokens, or structural changes are labelled **(proposal)** and are NOT measurements.

---

## Viewports

Three viewports are sketched:

| Viewport | Reason |
|---|---|
| **1440×900** | Primary desktop receipt width |
| **375×812** | Common mobile; button 173×104 px (tab-home-375.json step 4) + card anchor [343, 488] receipted (see §2); card width at 1440 only is unknown *(H-C5 amended 2026-10-26: the earlier "no receipt for card/button size at this width" was wrong — both 375 sizes are receipted; only 1440 card width is unknown)* |
| **320×568** | Narrowest locked viewport; REG-23 has wrapping/clipping history here |

---

## 1. 1440×900 — Current State

### What's measured (receipts cited)

- **CTA button:** `244×72 px` (`tab-home-1440.json step 8 box:[244,72]`)
- **Tab stop:** Step **8** of **45** focusable elements on `/` (`tab-home-1440.json`); preceding step 7 is `<button>Get Started</button>` (`Navigation.tsx`, box `[126, 40]`). *(Note: Receipt headers carry stale `focusableCount: 36`; steps arrays 45 at 1440 and 30 at 375 are authoritative)*
- **Focus ring:** `2px solid rgb(139,92,246)`, `outline-offset: 2px` — painted on the violet-600 pill  
  → ring-vs-pill = **1.39:1** (grader) / **1.66:1** (stored) — both FAIL U5 ≥3:1  
  (`study/receipts/2026-10-21/focus-hero-ring-1440.json`)
- **Text contrast:** white on `#8B5CF6` = **4.23:1** — FAIL U9 ≥4.5:1  
  (`contrast-home-1440.json: tag SPAN text "See how it works" fg rgb(255,255,255) bg rgb(139,92,246) ratio 4.23`)
- **Button padding:** `px-14 py-5` = 56px horizontal, 20px vertical (Tailwind default)
- **Card container bg:** `bg-violet-600` (`HeroPage.tsx:99`)
- **Card width at 1440:** ⚠️ **UNKNOWN** — no receipt captures the rendered card width at 1440px. The class `max-w-md w-full` gives a theoretical max of ~448px, but the actual rendered width inside the `max-w-5xl` content area is not confirmed by a receipt. Flagged as honest unknown.

### ASCII Wireframe — 1440×900 Current

```
┌─────────────────────────────────── viewport: 1440px ────────────────────────────────────┐
│                                                                                          │
│   [NAV: logo · links · links · links · links · links]  (steps 1–7 in tab chain)        │
│                                                                                          │
│                  ┌─ max-w-5xl mx-auto px-12 ──────────────────────┐                    │
│                  │                                                   │                   │
│                  │   "Operate The Opsie Way"  (CMS: headerText)     │                   │
│                  │   "Make your day-to-day..."  (CMS: subHeaderText)│                   │
│                  │                                                   │                   │
│                  │  ┌─ bg-violet-600 rounded-lg p-4 ──────────────┐ │                   │
│                  │  │  [Opsie badge]  ·  [pill content text]       │ │                   │
│                  │  │                                               │ │                   │
│                  │  │  ┌──────────────────────────────────────┐    │ │                   │
│                  │  │  │   SEE HOW IT WORKS                   │    │ │                   │
│                  │  │  │   bg:#8B5CF6 · white text            │    │ │                   │
│                  │  │  │   244×72 px  [tab-home-1440 step 8]  │    │ │                   │
│                  │  │  │   text contrast: 4.23:1 ❌ (need 4.5) │    │ │                   │
│                  │  │  └──────────────────────────────────────┘    │ │                   │
│                  │  │                                               │ │                   │
│                  │  │  card width: UNKNOWN (no 1440 receipt) ⚠️    │ │                   │
│                  │  └───────────────────────────────────────────────┘ │                   │
│                  └────────────────────────────────────────────────────┘                  │
│                                                                                          │
└──────────────────────────────────────────────────────────────────────────────────────────┘

FOCUS STATE (current — FAIL):
  button outline: 2px solid rgb(139,92,246) offset:2px
  ring painted on bg-violet-600 pill → ratio 1.39–1.66:1 ❌ (need ≥3:1 U5)
  [focus-hero-ring-1440.json: ringVsOutside:1.66, meets3to1:false]
```

### Open Issues at 1440

| Issue | REG | Status |
|---|---|---|
| Text contrast 4.23:1 < 4.5:1 | REG-09 | OPEN-CODE |
| Focus ring 1.39/1.66:1 < 3:1 | REG-25 | PROVISIONAL |
| `onClick→navigate()` — no `<a href>` | REG-18 | OPEN-CODE |
| Card rendered width at 1440 | — | ⚠️ UNKNOWN |

---

## 2. 375×812 — Current State

### What's measured (receipts cited)

- **CTA button:** `173×104 px` (`study/receipts/2026-10-21/tab-home-375.json step 4 box:[173, 104]`)
- **Tab stop:** Step **4** of **30** focusable elements on `/` at 375px (`tab-home-375.json`)
- **Touch target:** `173×104 px` ≥ 44×44px — PASS R5 ✅
- **D1 horizontal overflow:** delta = 0px at 375px (`sweep-375x812-home.json` / `probe-375x812-home.json`) — PASS D1 ✅
- **Card container:** `max-w-md w-full` constrained within viewport minus `px-6` margin
- **Text contrast & focus ring:** Structurally identical to 1440px (same tokens: text contrast 4.23:1 ❌; focus ring 1.39–1.66:1 ❌)

### ASCII Wireframe — 375×812 Current

```
┌────────────── viewport: 375px ──────────────┐
│                                              │
│  [NAV: Hamburger] (steps 1–3 in mobile)      │
│                                              │
│  ┌─ px-6 content area ───────────────────┐  │
│  │  "Operate The Opsie Way"              │  │
│  │  "Make your day-to-day..."            │  │
│  │                                       │  │
│  │  ┌─ bg-violet-600 rounded-lg p-4 ──┐  │  │
│  │  │  [Opsie badge]                  │  │  │
│  │  │                                  │  │  │
│  │  │  ┌──────────────────────────┐   │  │  │
│  │  │  │  SEE HOW IT WORKS        │   │  │  │
│  │  │  │  bg:#8B5CF6 white text   │   │  │  │
│  │  │  │  173×104 px [tab-375 s4] │   │  │  │
│  │  │  │  contrast: 4.23:1 ❌     │   │  │  │
│  │  │  │  touch target ≥44px ✅   │   │  │  │
│  │  │  └──────────────────────────┘   │  │  │
│  │  │                                  │  │  │
│  │  │  card: constrained w-full        │  │  │
│  │  └──────────────────────────────────┘  │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘

Receipt: tab-home-375.json step 4 confirmed (173×104 px).
         Overflow D1 delta = 0 confirmed via sweep-375x812-home.json.
         Touch target R5 passes (173×104 ≥ 44×44).
```

### Open Issues at 375

| Issue | REG | Status |
|---|---|---|
| Text contrast structurally same as 1440 (4.23:1 < 4.5:1) | REG-09 | OPEN-CODE |
| Focus ring structurally same as 1440 (1.39/1.66:1 < 3:1) | REG-25 | PROVISIONAL |
| `onClick→navigate()` — no `<a href>` | REG-18 | OPEN-CODE |

---

## 3. 320×568 — Current State

### What's measured (receipts cited)

- **Button:** `118×104 px` at `rect=[152,270,118,104]`  
  (`study/receipts/2026-10-20/interactions.json → hero320`)
- **Card:** `262×136 px` at `card=[24,286,262,136]`  
  (`study/receipts/2026-10-20/interactions.json → hero320`)
- **Card (targeted):** `parent rect=[24,336,262,136]` — same 262×136  
  (`study/receipts/2026-10-20/targeted.json → heroBtn parent`)
- **Button scrollWidth:** 173 px; **clientWidth:** 118 px  
  → `overflow-hidden` clips **55 px** of button content  
  (`study/receipts/2026-10-20/targeted.json → heroBtn scrollW:173 clientW:118 ovf:hidden`)
- **Span child of button:** `rect=[208,372,61,63]`, scrollW:0, clientW:0 — child is NOT clipping; clip is on the button element itself
- **h1 font-size at 320:** `16px` (`targeted.json: h1Font:"16px"`)
- **Card children overflow:** `cardChildrenOverflow: []` — no children overflow the card itself
- **Card fits viewport:** card clientW 262 < viewport 320 ✓
- **Touch target (button at 320):** 118×104 px — both dims ≥44px ✅ passes R5
- **Screenshot:** `r-320x568-hero-cta.png` shows 4-line wrap with all words visible;  
  span ends at x269 vs clip edge x270 → ≤1px gap  
  → REG-23 verdict: 🟡 **PROVISIONAL latent** (rewrite-or-drop pending pass-B re-measure)

### ASCII Wireframe — 320×568 Current

```
┌──────── viewport: 320px ────────┐
│                                  │
│  [NAV]                           │
│                                  │
│  "Operate The Opsie Way"         │  ← h1 font-size: 16px
│  (CMS: headerText)               │    [targeted.json: h1Font:"16px"]
│                                  │
│  "Make your day-to-day           │
│   operations easier..."          │
│                                  │
│  ┌── card [24,286,262,136] ───┐  │  ← 262×136 px [interactions.json hero320]
│  │  [Opsie badge]             │  │    [targeted.json: parent rect=[24,336,262,136]]
│  │                             │  │
│  │  ┌── button [152,270,118,104] ┐│  ← 118×104 px [interactions.json hero320]
│  │  │  SEE              [CLIPPED]││    scrollW:173 clientW:118 overflow-hidden
│  │  │  HOW              [55px   ]││    clips 55px [targeted.json scrollW:173]
│  │  │  IT               [hidden ]││
│  │  │  WORKS            ↑ clip  ││    span ends x269; clip edge x270
│  │  │  (4-line wrap visible)     ││    → ≤1px margin → REG-23 🟡 PROVISIONAL
│  │  └────────────────────────────┘│
│  │                             │  │
│  └─────────────────────────────┘  │
│                                  │
└──────────────────────────────────┘

OVERFLOW BAR (D1 check at 320):
  button: scrollW 173 − clientW 118 = 55px ❌ (clipped by overflow-hidden)
  card children overflow: [] ✓ (card itself does not overflow viewport)
  span child: scrollW:0 clientW:0 (not individually clipping)

TOUCH TARGET (R5):
  button 118×104 px → both dims ≥ 44px ✅

REG-23: 🟡 PROVISIONAL — latent 1px clip risk; pass-B re-measure required
```

### Open Issues at 320

| Issue | REG | Status |
|---|---|---|
| scrollW 173 vs clientW 118 → 55px clipped | REG-23 | 🟡 PROVISIONAL |
| span ends x269 vs clip x270 → ≤1px gap | REG-23 | 🟡 PROVISIONAL (latent) |
| Text contrast: same `#8B5CF6` bg | REG-09 | OPEN-CODE |
| No focus ring receipt at 320 | REG-25 | ⚠️ UNKNOWN at this viewport |

---

## 4. Proposed Changes

> ⚠️ Everything in this section is a **(proposal)**. No proposed values are measurements.  
> All proposals require pass-B re-measure before ship.

---

### 4.1 Contrast Fix — REG-09 (proposal)

**Problem:** Button fill `bg-[#8B5CF6]` = `rgb(139,92,246)` with white text = **4.23:1** FAIL (need ≥4.5:1 for 12px/700).

**Proposed fix:**
- Change button fill: `bg-[#8B5CF6]` → `bg-violet-700` (= `#6D28D9`) **(proposal)**
- Rationale: white-on-violet-700 ≈ 7.1:1 per answered U-queue 1, PLAN:110 **(proposal, not a new measurement)**
- Keep `#8B5CF6` as a border or accent element if visual identity requires it **(proposal)**

**What's preserved:**
- `hover:bg-white hover:text-black` hover inversion — unchanged
- `transition-all duration-300` — unchanged
- `group relative` / `<span className="relative z-10">` pattern — unchanged

**What changes:**
- Button fill token only: `bg-[#8B5CF6]` → `bg-violet-700` **(proposal)**

---

### 4.2 Focus Ring Fix — REG-25 (proposal)

**Problem:** Current `outline: 2px solid rgb(139,92,246)` painted on `bg-violet-600` pill = **1.39–1.66:1** — fails U5 ≥3:1 on both stored and grader values.

**Source of rule:** `index.css:336` — `*:focus-visible { outline: 2px solid #8B5CF6; outline-offset: 2px; }` — **unlayered**, load-bearing (REG-21).

**Proposed fix (reconciled with Redesign §3b under Ruling R-B):**
- **Cascade-winning mechanism:** Because `index.css:336` is an unlayered global rule, Tailwind utility classes in `@layer utilities` lose in cascade specificity. An **unlayered element-scoped rule** (or `!` important utilities) is used on the CTA element so it wins the cascade without touching `index.css:336`:
  ```css
  /* Unlayered element-scoped override (preferred) */
  .hero-cta-button:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px #8B5CF6;
  }
  ```
  *(Alternative utility form: `!outline-2 !outline-white !outline-offset-2 focus-visible:ring-2 focus-visible:ring-[#8B5CF6]`)*
- **Non-colliding ring geometry:**
  - White inner ring (2px with 2px offset): lands cleanly on the `bg-violet-600` pill = **5.9:1** contrast ✅ (passes U5 ≥3:1)
  - Outer ring (`#8B5CF6` / dark clearance): white vs `#0a0a0a` canvas = **19.8:1** ✅
- **`index.css:336` is NOT modified:** The global unlayered rule stays intact; REG-21 load-bearing protection is preserved.
- **Status:** REG-25 remains **PROVISIONAL** until pass-B re-measurement confirms the final ratios in the live environment.

**Wireframe — focus state (all viewports, proposal):**

```
PROPOSED FOCUS STATE (non-colliding dual-tone ring):
  ┌───────────────────────────────────────┐
  │ bg-violet-600 card (pill)             │
  │   ╔═══ 2px white outline (offset 2px) ═╗  ← white ring on violet-600 = 5.9:1 (proposal)
  │   ║ ╔═ outer accent / dark clearance ╗ ║  ← white vs canvas #0a0a0a = 19.8:1
  │   ║ ║   SEE HOW IT WORKS             ║ ║
  │   ║ ╚════════════════════════════════╝ ║
  │   ╚════════════════════════════════════╝
  └───────────────────────────────────────┘
  (proposal — requires pass-B re-measure for U5 confirmation; REG-25 PROVISIONAL)
```

---

### 4.3 320px Overflow Investigation — REG-23 (proposal)

**Current state:** scrollW 173 − clientW 118 = 55px clipped by `overflow-hidden`. Span ends x269 vs clip x270 → ≤1px gap. REG-23 is 🟡 PROVISIONAL latent.

**Proposal Option A:** Remove `overflow-hidden` if it is not load-bearing **(proposal)**
- The `group relative` / `<span className="relative z-10">` hover pattern may not require `overflow-hidden`
- Removing it may allow the button to render its full scrollWidth without clipping
- Risk: unknown visual side-effects — needs visual QA pass

**Proposal Option B:** Add `overflow-visible` or shrink padding at 320 **(proposal)**
- Example: add a `max-[320px]:px-4` or similar Tailwind variant to reduce `px-14` at the narrowest viewport
- Goal: guarantee scrollWidth − clientWidth = 0px at 320 (D1 requirement)

**Wireframe — 320px after fix (proposal):**

```
┌──────── viewport: 320px ────────┐
│                                  │
│  ┌── card ~262px ─────────────┐  │
│  │                             │  │
│  │  ┌── button (full width) ──┐│  │  ← overflow-hidden removed OR padding reduced (proposal)
│  │  │  SEE HOW IT WORKS       ││  │    scrollW = clientW (target) (proposal)
│  │  │  (may wrap to 2–3 lines)││  │    D1: scrollW − clientW = 0px (proposal)
│  │  └────────────────────────┘│  │
│  │                             │  │
│  └─────────────────────────────┘  │
│                                  │
└──────────────────────────────────┘
(proposal — pass-B re-measure required to confirm D1 pass at 320)
```

---

### 4.4 Booking Href Fix — REG-18 (proposal)

**Problem:** `onClick={() => navigate("/book-a-schedule")}` — no `<a href>`, cannot be bookmarked or middle-clicked. Fails U16 (no-context-shift / semantic nav).

**Decision / Ruling R-A recorded:**
- **Adopt `<Link to="/book-a-schedule">`** with native keyboard activation (**Enter only**; standard web specification for hyperlink anchors; no keydown hack for Space).
- Preserves all visual styling via Tailwind classes (`rounded-full`, padding, uppercase, etc.).
- Renders as canonical `<a>` in DOM, satisfying REG-18 and rubric U16.
- Space key scrolling the page is native standard anchor behavior; no custom `keydown` hack ships.

**Wireframe — structural change (proposal):**

```
CURRENT:
  <button onClick={() => navigate("/book-a-schedule")} className="...">
    <span>SEE HOW IT WORKS</span>
  </button>

PROPOSED (Ruling R-A adopted):
  <Link to="/book-a-schedule" className="hero-cta-button group relative rounded-full bg-violet-700 text-white px-14 py-5 font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:bg-white hover:text-black shadow-2xl">
    <span className="relative z-10">{buttonText}</span>
  </Link>

Visual appearance: identical.
DOM semantics: renders <a> with canonical href="/book-a-schedule" → resolves REG-18.
Keyboard: Enter activates link natively; Space retains default browser page scroll per Ruling R-A.
```

**What's preserved:**
- All visual Tailwind classes, hover state, transition, group/span pattern
- Touch target dimensions (≥44px confirmed at 320, 375, and 1440 — R5 ✅)
- AOS animation on subheader (`data-aos="fade-up"`) — unrelated, unchanged

**What changes:**
- Element type: `<button>` → `<Link>` (renders `<a>`) **(proposal)**
- `onClick` + `useNavigate` hook usage on this element → removed **(proposal)**

---

## 5. Summary Table — All Viewports

| Viewport | Button Size (current) | Card Size (current) | Text Contrast | Focus Ring | D1 (overflow) | Touch R5 |
|---|---|---|---|---|---|---|
| **1440×900** | 244×72 px ¹ | UNKNOWN ⚠️ | 4.23:1 ❌ | 1.39–1.66:1 ❌ | 0px delta ✅ | 244×72 ✅ |
| **375×812** | 173×104 px ² | constrained w-full | 4.23:1 ❌ | 1.39–1.66:1 ❌ | 0px delta ✅ | 173×104 ✅ ² |
| **320×568** | 118×104 px ³ | 262×136 px ³ | 4.23:1 ❌ | UNKNOWN ⚠️ | 55px clipped ❌ ⁴ | 118×104 ✅ ³ |

¹ `tab-home-1440.json step 8 box:[244,72]`  
² `study/receipts/2026-10-21/tab-home-375.json step 4 box:[173,104]`  
³ `study/receipts/2026-10-20/interactions.json → hero320`  
⁴ `study/receipts/2026-10-20/targeted.json → heroBtn scrollW:173 clientW:118 ovf:hidden`  

---

## 6. Honest Unknowns Register

| Unknown | Reason | Needed for | Status / Resolution |
|---|---|---|---|
| Card rendered width at 1440×900 | No receipt captures card pixel width at 1440 | Layout containment check | Inferred ~448px (`max-w-md`) |
| Focus ring ratio at 320×568 | No `focus-hero-ring` receipt at 320 | REG-25 at narrow viewport | Pass-B re-measure |
| Final dual-tone ratio on violet-700 | Pair ratio established: 7.1:1 hand (#6D28D9) / 7.3:1 receipt (rgb(112,8,231)); geometry live check | REG-25 closure | Pass-B re-measure (REG-25 PROVISIONAL) *(H-C9 amended 2026-10-26: pair ratio was `≈5.4:1`, corrected to 7.1:1 hand / 7.3:1 receipt — only geometry is pass-B)* |
| Space-on-`<a>` design decision | UA scrolls page on Space | Keyboard interaction spec | **RESOLVED by Ruling R-A:** Enter-only, no keydown hack |
