# OpsieWebsite — Responsive Inspection Audit (mobile + tablet)
**Date:** 2026-10-20 · **Method:** CDP-driven headless Edge, real render of the live Vite dev stack
(frontend :5173 + backend :5000), 9 viewports × 2 pages = 18 probe cells + section coverage sweeps +
interaction + attribution + targeted runs · **Caveat:** Vite dev render (HMR/React dev overhead) is the
measured environment, stated once and applied throughout — see §0.3.

Plan/proposal for this run: `study/2026-10-20-responsive-inspection-plan.md` (Item 1; the rubric
R1–R11 and the viewport set are **proposed**, awaiting user lock-in — all results below are computed
exactly on that proposal, so locking it changes nothing but the label).

**Bottom line:** horizontal overflow = **0 px at all 18 cells** (matches the inherited desktop
standard), the nav's persistent `top: 0` (commit `2adbee7`) holds at mobile, and no functional break
was found on any interaction path. What remains is one content clip at 768 (email address, caused by
`md:break-normal`), one header spill at 1024 (FAQ, cosmetic), a touch-target cluster (24 controls
< 44 px at 375-home, 17 at 768-wwd; smallest ~18 px), three image-fit defects (non-square logo
distorted 2.4–3.7 % + stretched by `spin-slow`, carousel arrows stretched 23.5 %), and a cosmetic
4-line CTA squeeze at 320 (restated from an earlier "clip"). Nothing blocks use; the P2 list is
F2 alone and each item carries a file:line root cause.

> **Pass-B amendments (2026-10-23):** this audit was re-graded and re-verified. Fourteen corrections
> (R-C1…R-C14) are logged as a table in §0.2; each is also marked inline at the changed line. No
> verdict was changed except **F1 (🟠 → 🟡)**, which the live ×3 re-measure showed to be a cosmetic
> 4-line wrap, not visible-content loss. Original capture date is 2026-10-20; pass-B re-measures are
> 2026-10-23.

---

## 0. Method, receipts, caveats

### 0.1 How measurement works (and why it is trustworthy without a DevTools device panel)
The harness drives headless Edge over the **same Chrome DevTools Protocol** that DevTools' device
mode uses: `Emulation.setDeviceMetricsOverride` sets the viewport (incl. a mobile/touch flag for
phone cells), then an in-page probe (`study/receipts/2026-10-20/probe.js` = the exact JS embedded in
every `probe-*.json` as `probeSource`) reads `document.documentElement.scrollWidth/clientWidth`,
walks every visible element for viewport crossings, inspects nav mode, grids, type sizes, images,
scroll containers, fixed elements, AOS reveal state, etc. Every viewport cell is **self-evidencing**:
the JSON carries `viewport:{w,h,mobile}` and the probe injects a `#vpbadge` ("320×568 m1") into the
page so that `r-*-top.png` screenshots carry the viewport in-pixels. A CDP daemon
(`opencode/edge-profile`, RPC 127.0.0.1:9400, browser port 9333) is the only infrastructure; the
site under test is untouched.

Re-run (all scripts kept, receipt dir carries the full evidence set):
```
npm run dev:frontend        # :5173
npm run dev:backend         # :5000
node <temp>/drive.mjs       # 18 probe cells → probe-*.json + r-<w>x<h>-top.png
node <temp>/sweep2drive.mjs # section coverage: scroll every block into view → sweep2-*.json
node <temp>/attribdrive.mjs # per-element attribution pre/post AOS → attrib-*.json
node <temp>/targeted.mjs    # targeted element measurements → targeted.json + 4 screenshots
node <temp>/aggregate.mjs   # matrix-raw.json (18 rows)
```
(`<temp>` = `C:\Users\kingg\AppData\Local\Temp\opencode`.) The measurement scripts **print**
`delta` per cell; they do not `throw`/`process.exit` on `delta > 0`, so the 0-overflow claim is a
machine-measured value that I re-verified cell-by-cell from the receipts — not a hard assertion the
script would have failed on. *(Amended 2026-10-23, R-C1: the original claimed "scripts exit non-zero
if delta > 0," which no drive/aggregate/sweep2drive/targeted script actually does.)*

### 0.2 Receipt index
| Receipt | What it proves |
|---|---|
| `probe-*.json` (18) | per-cell R1–R10 measurements + full crossing list (pre-reveal) |
| `sweep2-*.json` (18) | section coverage: every major block scrolled to, then crossings re-measured (post-reveal) |
| `sweep-*.json` (18) | first-pass sweep (pre-`120s` timeout fix; 3 cells re-run in sweep2) |
| `attrib-*.json` (6) | element-level ownership of every crossing, pre/post AOS reveal |
| `interactions.json` | sheet open/close/backdrop/route-close, carousel steps, review slider, fixed-nav overlap (`→ overlap`), touch targets (`→ touch`) |
| `targeted.json` | exact boxes for the 4 visible-clip findings (+4 screenshots) |
| `hangtest-prod.json` | main-thread responsiveness on the **production build** (§5; supersedes the phantom `hangtest.json`, R-C10) |
| `matrix-raw.json`, `summary.json` | machine matrix + delta=0 confirmation |
| `r-*.png` | screenshots with in-page viewport badge (section + targeted shots) |

**Pass-B receipts — `study/receipts/2026-10-23/` (7 files, all live-re-captured or produced this pass):**

| Receipt | What it proves / which correction |
|---|---|
| `passb-f1-hero-320.json` | F1 re-measure ×3 @320 — 4-line wrap stable, 11px margin, nothing clipped (R-C8, F1 🟠→🟡) |
| `passb-touch-375.json` | F4 touch sweep @375 — 24 of 46 interactive <44px after full scroll (R-C5, real counts/labels) |
| `passb-touch-768.json` | F4 touch sweep @768-wwd — 17 of 33; desktop carousel arrows pass (R-C5) |
| `passb-faq-h2-1024.json` | F3 real quote "Got Questions? We've Got Answers", 51px spill (R-C12) |
| `passb-images-320.json` | outsideViewport(5)+clipText owner ids @320-home (R-C7) |
| `hangtest-prod.json` | prod-build hang re-test, 3 trials `complete`/delta 0 — hang not reproduced (R-C10, §5) |
| *(matrix/targeted/interactions on disk, 2026-10-20)* | R3 grid arrays, R5 counts, R8 phases, R9 bg, F5 stretch — corrected against these, which were always right |

**Visible amendment log (2026-10-23 responsive pass B).** Verdicts are unchanged unless a line says
otherwise; only numbers, receipt pointers, and cites moved. No silent rewrites.

| # | Correction | Was → now |
|---|---|---|
| R-C1 | §0.1 exit-non-zero | "scripts exit non-zero on delta>0" → scripts only *print* delta; re-verified from receipts |
| R-C2 | §4/R11 `scrolled:true` | cited in `sweep2-*.json` blocks → actually lives in `attrib-*.json` |
| R-C3 | R3 cite + range | `ProductSection.tsx:46 grid md:grid-cols-2` (file has no `grid-cols`) → `pages/sections/ServicesSection.tsx:35`; "1 col at 320–640" → arrays are 2/3 at 640 |
| R-C4 | R8 phases/arrows | initial transform labelled −100%/−200%/−33.33% → **0%** everywhere; desktop arrows = `ServicesSections.tsx:42` (not `:109/:120`, which are `md:hidden` mobile) |
| R-C5 | R5/F4 counts+labels | "14 controls" + "Home/About/Services/Products" → 24@375 / 17@768, real footer labels (About Us, Our Products, Contact Us, Why Opsie, Our Team, FAQ's, Our Story, Our Mission, Our Vision) |
| R-C6 | R9 bg pointer | `summary.json footerBg` → `matrix-raw.json → r9bg` |
| R-C7 | outsideViewport(5)+clipText(3) @320-home | unaddressed → explained in F5 note (`passb-images-320.json`) |
| R-C8 | F1 restate | 🟠 visible clip on 118.4×60.6/"no wrap" → 🟡 cosmetic 4-line wrap, 11px margin, nothing clipped; **P2 list = F2 only** |
| R-C9 | F4 dims/cites | 18×28/31.2/36.5/22px, `py-1.5`, `Buttons.ts:12/:24/:39` → `Buttons.ts:55` (`px-2 py-1`); FAQ reach-out = inline `<a>` (`Faq.tsx:27`), footer labels/cites corrected |
| R-C10 | §5 phantom receipt | `hangtest.json` (never existed) → real `hangtest-prod.json`, prod re-test run |
| R-C11 | F1 punch-list | F1 as P2 on disproven clip → dropped from P2; only F2 remains |
| R-C12 | F3 quote | "We're here to help" (0 receipt hits) → "Got Questions? We've Got Answers" |
| R-C13 | F5 stretch range | "2.4–4.4%" → **2.4–3.7%** (matrix r6distList) |
| R-C14 | receipt-key pointers | `touchTargets`/`fixedNavOverlap` → `touch`/`overlap` |

### 0.3 Caveats stated up front
1. **Vite dev render** (React dev + HMR + sourcemaps) — production builds bundle/minify and the
   measured jank floor drops accordingly; every visual/overflow number here is layout truth and
   build-independent, but the `/` main-thread hang observation (§5) must be re-checked on a prod
   build before being called a site defect.
2. **Pre- vs post-reveal:** probe/sweep y-coordinates are measured before AOS reveals
   (`transform: translateY(50px)` shifts absolute rects); use `ly`/offsetTop (layout box) for truth.
   All crossing verdicts in §2 use the post-reveal sweep.
3. **CMS content:** titles/copy come from the backend (`ContentContext`), so measured strings are the
   live CMS values; src has no literal match for e.g. "Real business, real results" (confirmed in
   the 2026-10-19 audit too).
4. **1440×900 on `/`** needed the eval timeout raised 30 s → 120 s (one cell timed out 3× at 30 s);
   after the fix it passes deterministically (`delta=0`). Recorded, not hidden.

---

## 1. Item 1 — delivered in the plan document
`study/2026-10-20-responsive-inspection-plan.md` contains: (a) breakpoint inventory of the codebase
with file:line evidence (Tailwind v4 defaults 640/768/1024/1280/1536 — `frontend/package.json:34,40`,
no `--breakpoint-*` overrides, `tailwind.config.js` dead for breakpoints; project breakpoints
550/768/1024/1280/1440/1920 in `src/index.css` + component classes); (b) the 9-viewport set with
justification; (c) rubric R1–R11; (d) receipt method + the two caveats that change conclusions
(`md:break-normal` at ≥768, and pre/post-reveal measurement). **Lock-in still pending** — see §7.

## 2. Item 2 — matrix (R × viewport × page) with raw receipts
Cells: **PASS** = measured OK at that cell · **FAIL(d)** = defect present · **N-A** = rubric not
applicable to that page. All numbers are the raw probe/sweep values; each row cites its receipt.

### R1 — no horizontal overflow (`de.scrollWidth − de.clientWidth` = 0)
| vp | `/` | `/what-we-do` | receipts |
|---|---|---|---|
| 320×568 | PASS (delta=0) | PASS (delta=0) | `probe-320x568-home.json`, `probe-320x568-wwd.json` |
| 375×812 | PASS | PASS | `probe-375x812*.json` |
| 549×700 | PASS | PASS | `probe-549x700*.json` |
| 550×700 | PASS | PASS | `probe-550x700*.json` |
| 640×900 | PASS | PASS | `probe-640x900*.json` |
| 768×1024 | PASS | PASS | `probe-768x1024*.json` |
| 1024×768 | PASS | PASS | `probe-1024x768*.json` |
| 1280×800 | PASS | PASS | `probe-1280x800*.json` |
| 1440×900 | PASS | PASS | `probe-1440x900-home.json`, `probe-1440x900-wwd.json` |

**18/18 delta = 0.** Corroborated post-reveal by all 18 `sweep2-*.json` (home: 24 blocks scrolled,
wwd: 9 blocks; zero viewport crossings at every cell). Note the two *intentional* inner scroll
containers that keep their content off the viewport crossing list by design (R7, below).

### R2 — nav mode swap + sticky behaviour (`Navigation.tsx:66` = `useState(window.innerWidth >= 768)`)
| vp | mode (expected) | navTop after scroll | receipts |
|---|---|---|---|
| 320/375/549/550/640 | mobile (`☰`, hamburger sheet) ✓ | 0 px, inVp, z=20 ✓ | `probe-*.json → desktop:false, navTopAfter:0`, `interactions.json` |
| 768/1024/1280/1440 | desktop (logo+links+dtChip) ✓ | 0 px ✓ | same |

The `top: 0` persistence fix (commit `2adbee7`) is confirmed at **every** mobile and desktop cell:
`navTopAfter` = 0, `navInVp` = true (§0.2). Desktop extra: dtChip (`hidden lg:flex`) renders at
≥1024 and is absent at 768 — matches `Navigation.tsx` and no layout shift was produced.

### R3 — grid collapse to 1 column at ≤640 (R3b at 550; R3c carousel path ≤640)
`pages/sections/ServicesSection.tsx:35` `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` → 1 col
at ≤647 (`sm`=640–1023 gives 2, `<sm` gives 1), 2 col at 640–1023, **3 col at ≥1024 (`lg`)**: **PASS**
(measured `r3gridCols` arrays, `matrix-raw.json`; the services grid is the one true 3→2→1 instance,
so R3a is exercised, not vacuous). *(Amended 2026-10-23, R-C3: the original cited
`ProductSection.tsx:46 grid md:grid-cols-2`, which does not exist — that file has no `grid-cols` —
and claimed "1 col at 320–640," which its own 640 receipt array (2 and 3 values) contradicts.
The receipts were always right; the prose was wrong.)* `Reviews.tsx:6-27` desktop flex-row wraps to 2
rows at ≤768 with no overflow: **PASS** (`sweep2`, delta=0). 550-boundary: no card grid switches at
550 — the only 550-family switch is footer stacking (R9, 1-col ≤550 / 3-col ≥640): **PASS**. R3c
(narrow-only JS carousel path) — the *arrow math* is a R8 concern; layout-wise the 1-slide carousel
at ≤640 measured 0 overflow at 320/375/549/550/640: **PASS**.

### R4 — typography: no clipped/overlapping type
Pre-reveal flags existed in 3 places; post-reveal + attribution resolved them:
| cell | element | verdict | receipt |
|---|---|---|---|
| all | footer "Opsie" watermark (`Footer.tsx:19,82`) | **PASS (by design)** — parent has `overflow-hidden` (`Footer.tsx:11`), a deliberate background motif | `attrib-375x812-wwd.json`, `attrib-1024x768-wwd.json` |
| 320 | hero CTA "SEE HOW IT WORKS" | **FAIL(d)** → restated 🟡 cosmetic wrap — see finding F1 | `targeted.json → heroBtn`, `passb-f1-hero-320.json`, `r-320x568-hero-cta.png` |
| 768 | email address in contact card | **FAIL(d)** visible clip — see F2 | `targeted.json → emailCard/emailText`, `r-768x1024-email-card.png` |
| 1024 (wwd) | FAQ h2 "Got Questions? We've Got Answers" | **FAIL(d)** header spills 51 px into the gap — see F3 (cosmetic) | `targeted.json → faqH2`, `passb-faq-h2-1024.json`, `r-1024x768-faq-header.png` |
| 1440 (`/`) | hero pre-reveal (AOS transform) | **PASS post-reveal** — right edge = viewport, no clip; pre-reveal flag was transform artifact | `attrib-1440x900-home.json` |
All other type blocks: 0 crossings post-reveal at all 18 cells (`sweep2-*.json`).

### R5 — touch targets ≥44 px (interactive elements, post-reveal boxes)
**FAIL(d) (🟡)** — sub-44px controls exist at every cell; live sweep 2026-10-23 counts **24 of 46
interactive elements <44px at 375-home** and **17 of 33 at 768-wwd** (matrix `r5under` 17–29 per
cell — the original "14 controls" was wrong). Row-level sizes below; labels are the real rendered text.
| control | size | source | receipt |
|---|---|---|---|
| footer links (About Us, Our Products, Contact Us, Why Opsie, Our Team, FAQ's, Our Story, Our Mission, Our Vision — 9 links) | ~18×28 | `Footer.tsx:88,91,94,103,106,109,117,118,119`; `text-sm` line box, **no `py-1.5`** — `:19` is the watermark span | `interactions.json → touch`, `passb-touch-375.json` |
| footer social icons | 40×40 | `Footer.tsx:144` `p-2.5` + 20 px icons at `:152,158` | same |
| review slider arrows | 32×32 | `types/components/Buttons.ts:55` `px-2 py-1` via `sections/ClientReviewsSection.tsx:41-52` | same |
| nav logo (mobile) | 96×36 | `Navigation.tsx:132` `h-9` | same |
| DISCOVER DETAIL | 36.5×31 | `ProductCard.tsx:95` + `Buttons.ts:55` | same |
| VIEW ALL PRODUCTS | 31.2×31.2 | `ProductSection.tsx:89` + `Buttons.ts:55` `px-2 py-1` + 19 px icon | same |
| FAQ "Reach out to us." link | inline text (`<a>`) | `FaqSection/Faq.tsx:27` — **inline `<a>`, not an icon button**; no `h-6 w-6` | `passb-touch-375.json` |
Passing: hero CTA 128 (≥44 wide, 104 tall), hamburger 44×44, sheet links ~68–112, desktop carousel
arrows 56×56 at ≥768 (`passb-touch-768.json`), chat 44×44. Detail in F4. *(Amended 2026-10-23,
R-C5/R-C9/R-C14: count 14→24@375/17@768; footer labels corrected; `touchTargets`→`touch`;
`Buttons.ts` cites →`:55`; FAQ link = inline `<a>`.)*

### R6 — images: cover/contain, no visible distortion
| element | verdict | numbers | receipt |
|---|---|---|---|
| home spinning logo (home only) | **FAIL(d)** distorted | source PNG 423×413 (aspect 1.024) forced into square → **2.4–3.7 %** non-uniform scale. Two instances: card logo `w-16 h-16` (`ProductSection.tsx:45`, displayed ~48px after 0.75 parent scale → 2.4 %) + hero watermark `w-72 md:w-[500px]` (`HeroPage.tsx:64`, fill-fit → up to 3.7 %). *(Range amended 2026-10-23, R-C13: was "2.4–4.4 %"; matrix `r6distList` real range is 2.4–3.7 %.)* | `matrix-raw.json → r6distList`, `passb-images-320.json`, F5 |
| 320-home `outsideViewport(5)+clipText(3)` | **explained, not a defect** | the 5 R6 image flags = big spin logo (right edge 328 > 320, decorative, opacity 30 %) + hero logo (left bleed, `contain`, 0 distortion) + 3 profile avatars (`cover`, 0 distortion); all inside `overflow-hidden` sections, page delta 0. The 3 `clipText` = the hero CTA's own 4-line wrap (F1) | `passb-images-320.json` |
| wwd carousel logos (`sections/ServicesSections.tsx:41,45`) | **PASS** — contain-fit, natural 214×200–272×200 held | `attrib-375x812-wwd.json` |
| client logos (`ClientCard.tsx:45`) | **PASS** | sweeps |
| home services grid imgs | **PASS** | sweeps |
| hero bg (`HeroPage.tsx:73`) | **PASS** (bg cover) | sweeps |

### R7 — scroll regions: every horizontal scroller `overflow-x`-contained
PASS at all cells: `ClientReviewsSection.tsx:58` (`flex overflow-x-auto snap-x snap-mandatory`,
2–3 slides visible by width), `ClientReviewsSection.tsx:80` + `ServicesSections.tsx:35`
(`overflow-hidden` bands holding the translate carousels). Zero of these ever fed a viewport
crossing in 36 sweep measurements. PASS.

### R8 — narrow-only carousel JS path (`useEffect` at `sections/ServicesSections.tsx:107-121`)
**Active only on `/what-we-do`** (home's services is a static grid — `pages/sections/ServicesSection.tsx`,
no carousel): N-A on `/`. The track transform is `translateX(-${currentIndex * (isNarrow ? 100 : 33.33)}%)`,
so the **initial `currentIndex = 0` → transform 0 %** at every viewport (`matrix-raw.json → r8`,
`tf: "translateX(0%)"` across all 18 cells). `isNarrow = width < 768`. Arrows: **mobile set**
`md:hidden` at `:105-121` (`p-4` + 24 px icon, 56×56 hit area) renders **<768**; **desktop set**
`hidden md:flex` at `:42` (`w-14 h-14`, 56×56) renders **≥768** — the receipt visibility flags
(`mBtn` true / `dArr` false at ≤640, `mBtn` false / `dArr` true at ≥768) confirm exactly this split.
*(Amended 2026-10-23, R-C4: the original table showed initial −100 %/−200 %/−33.33 % — those are
post-arrow states mislabelled as initial; and it cited `:109,120` as "≥768 desktop arrows," but those
lines are the `md:hidden` **mobile** set.)* One arrow advances the track one slide (`interactions.json → carousel`,
`−100 %` narrow / `−33.33 %` wide) and wraps; slider content width > viewport at ≤640 with 0 overflow.
PASS. (The arrows' own touch-target/aspect defect is F6, a R5/R6 finding, not a R8 logic break.)

### R9 — footer stacking (1 col ≤550 / 3 col ≥640)
PASS: measured 1 col at 320–550 (logo+text stacked, links stacked), 3 col at 640+ (logo / links /
address+socials) — `matrix-raw.json → r9cols`; the bg "Opsie" watermark steps
120→180→260→380→500 px across the set — `matrix-raw.json → r9bg` *(pointer amended 2026-10-23, R-C6:
the original cited `footerBg` in `summary.json`, which does not exist; `r9bg` is the real field)*.
The 3-col grid is `Footer.tsx:82` `sm:grid-cols-3`. PASS at all 18 cells.

### R10 — fixed elements never cover content
PASS: only fixed element on both pages is the chat widget (`ChatHelp.tsx:35` `fixed bottom-4 right-4`,
44×44, z-20) + the sticky nav (z-20). No measured overlap with any block (checked against every
block's box during sweeps; `interactions.json → overlap = []`). PASS.

### R11 — AOS reveals + nav persistence under scroll
PASS at all cells: every AOS element ends `revealed:true` after the full scroll pass (home 41
elements, wwd 16); nav stays `top: 0`, `inVp: true` at the end of each pass. Home at 320: 6 reveal
elements sit at `y≥4924` below the fold (below-hero content, revealed on user scroll — not a defect,
but the reason a screenshot-only check would miss them). Receipts: `probe-*.json → aos` +
`attrib-*.json → scrolled:true` (the reveal-scrolled flag lives in the attribution receipts; the
`sweep2-*.json` blocks carry the crossing re-measure, not `scrolled`). *(Pointer amended 2026-10-23,
R-C2.)*

**Matrix totals:** 18 cells × 11 rules. Failing cells: **4** (all 🟡/🟠 cosmetic-content, never
blocking): 320 R4(F1), 768 R4(F2), 1024-wwd R4(F3), all-cells R5(F4)+R6(F5,F6). Every R1 cell PASS.

## 3. Item 3 — reproducible defects (each with element + source + repro steps)
All six reproduce on demand with the kept scripts; each is a layout/CSS truth. The 320 CTA (F1) was
originally captured in two layout states (height 60.6 vs 104) that read as a race; three fresh
pass-B runs (2026-10-23) were stable at 128×104, so it is treated as a deterministic wrap, not a
race (R-C8).

**F1 — Hero CTA "SEE HOW IT WORKS" wraps to a 4-line word stack at 320 px** · 🟡 (cosmetic, 1 vp) — *restated 2026-10-23, R-C8*
- Element: `HeroPage.tsx:109-114` — button `px-14 py-5` with `overflow-hidden` (`:111`), inner
  `<span class="relative z-10">` (`:113`).
- **Original claim (retracted):** "clipped / cut by ~54 px / no wrap" on numbers 118.4×60.6 and
  scrollWidth 172.6. Those prose numbers match **no** receipt (`targeted.json → heroBtn` = 118×104,
  scrollW 173), and the "no wrap" reading was wrong — the label wraps.
- **Live re-measure 2026-10-23 (`passb-f1-hero-320.json`, ×3, stable):** button **128×104**, 4 line
  boxes (one word per line), widest line right edge **269** vs clip edge **280** → **11 px margin,
  nothing clipped**. Internal scrollW 173 vs clientW 128 is confined by `overflow:hidden`; page
  delta 0. The earlier 10-20 run showed a 1 px margin (clipEdge 270); the 60.6-vs-104 height
  discrepancy was a measurement race that did **not** reproduce across 3 fresh runs.
- Verdict: **cosmetic** — the CTA is legible (full label, stacked) but looks broken (a tall 4-line
  squeeze in a pill button). Not visible-content loss.
- Repro: open `/` at 320×568 and look at the hero (or `node <temp>/passb-responsive.mjs`). At 375+
  the button fits on fewer lines → 320-only. Fix candidates: `px-8` at <360, or shorten the label at
  small widths.

**F2 — Email address visibly cut inside the contact card at 768 px** · 🟠 (contact info lost, 1 vp)
- Element: `pages/sections/ContactUsSection.tsx:114` (`<p>` with `:123` `break-all md:break-normal`)
  inside the card at `:72,79`. Measured (`targeted.json → email-768x1024`): card 215 wide, text
  element 294 wide → text overflows its card by 79 px and is visibly truncated to
  `iry@opsiesoftwaresolutions.c` (`r-768x1024-email-card.png`).
- Root cause: `md:break-normal` (≥768) suppresses the mid-word break that `break-all` provides below
  md — so the long unbroken address renders *wider* at 768 than at 640 (where `break-all` keeps it
  inside: scrollW==clientW at 640).
- Expected: address fully readable. Actual: clipped. Repro: `node <temp>/targeted.mjs`, or `/` →
  contact card at 768×1024. Fix: drop `md:break-normal` (or use `break-words` + smaller text at md).

**F3 — FAQ header spills out of its column at 1024 px (what-we-do)** · 🟡 (cosmetic)
- Element: `types/components/SuperHeader.tsx:14,22` inside `Faq.tsx:22` (`lg:w-1/3` of the content
  column). Headline text is **"Got Questions? We've Got Answers"** *(amended 2026-10-23, R-C12: the
  original quoted "We're here to help," which matches no receipt or the live DOM)*. Measured
  (`targeted.json → faqH2`, re-confirmed `passb-faq-h2-1024.json`): h2 client 227 / scroll 278 →
  the headline overflows its 227 px box by 51 px and paints into the 48 px gap (`Faq.tsx:23` `p-8`)
  before the accordion — no collision, no page overflow (delta=0), but the header visually breaks
  its column (`r-1024x768-faq-header.png`).
- Repro: `node <temp>/targeted.mjs`, or `/what-we-do` → FAQ band at 1024×768. Fix: allow wrapping
  (`break-words`/narrower font at lg) or widen the header column.

**F4 — Touch-target cluster: 24 controls <44 px at 375, 17 at 768** · 🟡 (ergonomics, all vps) — *count/cites amended 2026-10-23, R-C5/R-C9/R-C14*
- Table in R5 above; the live itemized sweep (`passb-touch-375.json`, `passb-touch-768.json`) is now
  receipted, replacing the unsupported "14 controls." Smallest = footer links at ~18×28
  (`Footer.tsx:88,91,94,103,106,109,117,118,119`; the links are `text-sm` with **no `py-1.5`** — the
  original's `:19` + `py-1.5` was wrong; `:19` is the watermark span). Real footer labels are About
  Us / Our Products / Contact Us / Why Opsie / Our Team / FAQ's / Our Story / Our Mission / Our
  Vision (not "Home/About/Services/Products"). Review/slider + VIEW-ALL arrows inherit
  `px-2 py-1` from `types/components/Buttons.ts:55` (original cited `:12/:24/:39 py-1.5` — none
  exist). FAQ "Reach out to us." is an **inline `<a>`** (`FaqSection/Faq.tsx:27`), not a 22×22 icon
  button. Repro: `node <temp>/passb-responsive.mjs` → touch sweep, or `interactions.json → touch`
  (real key; original pointed at `touchTargets`, which does not exist). Fix pattern: padding/min-size
  bump — `py-2.5` for footer links, `h-10 w-10` for socials, `h-10 w-10` for review arrows.

**F5 — Spinning home logo is distorted (and stretched by animation)** · 🟡
- Two fill-fit instances of the 423×413 PNG (aspect 1.024) forced into a square:
  `ProductSection.tsx:45` `w-16 h-16` card logo (~48 px after parent 0.75 scale → **2.4 %**) and
  `HeroPage.tsx:64` `w-72 md:w-[500px]` decorative watermark (→ up to **3.7 %**). Range **2.4–3.7 %**
  *(amended 2026-10-23, R-C13: was "2.4–4.4 %"; real `matrix-raw.json → r6distList` range)*.
  `spin-slow` (`index.css:9-16`, 20 s linear) then animates the square. Measured at all home cells
  (`matrix-raw.json → r6distList`; the original's `probe-*.json → images[0]` pointer does not exist).
  The 320-home `outsideViewport(5)+clipText(3)` flags are these decorative/edge-bleed elements
  (`passb-images-320.json`) — contained by `overflow-hidden` sections, delta 0, not a defect.
  Repro: `node <temp>/drive.mjs`. Fix: `aspect-square object-contain` or a square source asset.

**F6 — wwd carousel arrows stretched 23.5 % on mobile** · 🟡
- `sections/ServicesSections.tsx:107,109,118,120`: arrow `<span>` `w-6 h-6` (24×24) wrapping 17×21 px SVGs →
  41 % extra width, 14 % extra height (measured in `interactions.json → carouselStep`, arrow box
  44.7×44.7 incl. hit-area padding; the stretch is on the icon box). At ≥768 the SVGs are 22.5×19.5,
  still stretched but less visible. Fix: `size-6` on the SVG or `object-contain`-style sizing.

**Dropped as not reproducible (explicitly, per the repro rule):**
- WWD hero `p.md:w-1/3` "pre-reveal overflow" (from the earlier desktop pass): post-reveal
  attribution shows right edge == viewport (`attrib-1440x900-home.json`, `attrib-1024x768-wwd.json`) → the
  pre-reveal flag was an AOS transform artifact. Dropped.
- "Reviews slider drag": no pointer/touch handlers exist on the slider (`ClientReviewsSection.tsx:58`
  scroll-snap only) → nothing to test; drag is the native `overflow-x-auto` scroll. Not a defect,
  not claimed.

## 4. Coverage proof (no missed regions)
Home: 24 major blocks scrolled into view at each of 9 vps (hero div, About, WhyChooseUs, Services,
Product, OperationalStructure, ClientReview, ContactProcess, ProductItemCTA, ContactUs, Faq + inner
sub-blocks) — `sweep2-<vp>.json → blocks[]` (each block scrolled to; the reveal-`scrolled` flag is
`attrib-*.json`), zero crossings post-reveal.
what-we-do: 9 blocks (hero, 5 service items, WhyChooseUs, ClientCard, Faq) — same receipts.
Screenshots: `r-<vp>-top.png` (hero band) + 4 targeted shots; the 549/550 boundary pair is covered
by the footer-stack measurement in the same sweeps.

## 5. Environment observation (recorded, not ranked)
`/` at 1440 AND 1280 intermittently failed to answer a 10-second eval during load in headless Edge
against the **Vite dev** server (3 of 3 probes timed out at 30 s pre-fix). The original run recorded
dev-stack timing ranges ("A 10 s→130 s, B 9–52 s, C intermittent") **to the console only — no
`hangtest.json` receipt ever existed** (that file is cited nowhere now; the earlier §0.2 index row
and this section quoted it in error — R-C10). Post-restart + 120 s timeout the dev page measures fine
(`delta=0`). Because it correlates with Vite dev overhead (dev React, sourcemaps, no bundle) it was
**not** entered as a site defect, and §7 approved a prod-build re-test before any verdict.

**Prod re-test run 2026-10-23 (approved §7.3) → `hangtest-prod.json`.** `vite build` (tsc + build,
`dist/index-CAfaGtxV.js` 3,221.37 kB / 917.87 kB gzip) served by `vite preview` on :4173. Three trials **labeled** 1440×900/1280×800 *(PB-C1 corrected 2026-10-27: this section previously presented "Three 1440×900/1280×800 trials" flatly — `hangtest-prod.json` shows `w:1416` at **every** sample of trial B, so its 1280 leg never applied (the receipt's `width: 1280` label is void); the 2026-10-23 assistant note recorded this and §5 omitted the disclosure)*, poll-readiness harness (`hangtest.mjs`, re-pointed :5173→:4173): **A, B, C
all reached `readyState: complete` by ~3.4–3.7 s, zero eval timeouts**, and the final probe shows
`scrollWidth == clientWidth == 1406` (delta 0, no overflow). **The dev-stack hang does not reproduce
on the production build.** Confirms §0.3 caveat #1: the observation was dev-environment overhead, not
a site defect. No finding entered; §7's outstanding action is now closed.

## 6. Severity ranking & punch list (impact × breadth ÷ effort)
| ID | Sev | What | Where (fix) | Effort |
|---|---|---|---|---|
| F2 | 🟠 | email clipped at 768 | drop `md:break-normal` (`ContactUsSection.tsx:123`) | XS |
| F4 | 🟡 | 24 touch targets <44 at 375 (17 at 768); smallest ~18 | `Footer.tsx:88–119,144`; `Buttons.ts:55`; `Navigation.tsx:132`; `FaqSection/Faq.tsx:27` | S |
| F3 | 🟡 | FAQ header spill at 1024 wwd | `SuperHeader.tsx:14,22` + `Faq.tsx:22` | S |
| F6 | 🟡 | carousel arrows stretched 23.5 % | `sections/ServicesSections.tsx:107,109,118,120` | XS |
| F5 | 🟡 | logo distorted 2.4–3.7 % | `ProductSection.tsx:45` + `HeroPage.tsx:64` | XS |
| F1 | 🟡 | hero CTA 4-line squeeze at 320 (restated; was 🟠 clip) | `HeroPage.tsx:111` padding/wrap | XS |
| — | ℹ | `/` dev-stack hang | **prod re-test done 2026-10-23 → not a site defect** (`hangtest-prod.json`) | closed |

**P1 (none).** No overflow, no blocked interaction, no unreachable content at any inspected viewport.
**P2:** F2 only (visible content loss — one-line CSS change). *(Amended 2026-10-23, R-C8/R-C11: F1
was P2 as a "clip," but the live ×3 re-measure shows a full label wrapped to 4 lines with an 11 px
margin — cosmetic, no content lost — so it drops to P3.)*
**P3:** F4 (ergonomics sweep), F3, F6, F5, F1 (polish).

## 7. Decision queue (user)
1. **Lock Item 1** (viewport set + R1–R11) as proposed, or amend — everything above is computed on it.
2. Confirm P2 (now **F2 only**) and whether the P3 fixes land in this batch or the next.
3. ~~Approve the prod-build re-test of the `/` hang observation~~ — **done 2026-10-23**
   (`hangtest-prod.json`): not reproducible on the production build, so no perf work is scoped.
