# Footer Links/Nav — Desktop + Mobile Wireframe Sketches
**Date:** 2026-10-26 (Block 2)
**Component:** Footer navigation + links (`Footer.tsx` — the `nav[aria-label="Footer navigation"]` grid + the 9 link items)
**REG IDs carried:** REG-21, REG-25, REG-26/27 (CMS/owner), REG-28 (parked)
**Findings addressed:** **N-04 (inherited)** (6 of 9 hrefs resolve to `/who-we-are` — 5 registered stand-ins + About Us's own target) · **F4 🟡** (touch targets < 44, **R5**) *(G4 amended 2026-10-26: was "5 placeholder hrefs" — the receipt's links array shows 6 `/who-we-are` hrefs)*
**Receipts (2026-10-26, same-day):** `study/receipts/2026-10-26/b2-footer.json` · inherited `passb-touch-375.json` (24 under-44 of 52), `Footer.tsx:88–119`

> **Convention:** current measurements carry their receipt source in parentheses. Proposed sizes / tokens / structural changes are marked **(proposal)** and are NOT measurements.

---

## Viewports

| Viewport | Reason |
|---|---|
| **1440×900** | Primary desktop; footer nav grid measured here (b2-footer.json → vp1440) |
| **375×812** | Primary mobile; footer stacks to 1 column, link touch sweep measured here (24 under-44) |

*(No 320 sketch: the footer stacks identically at 320 and 375 — `sm:grid-cols-3` collapses to 1 col below 640 at both. The responsive track already measured the footer-stack boundary at 549/550; 375 covers the mobile stack.)*

---

## 1. 1440×900 — Current State

The footer is a `nav[aria-label="Footer navigation"]` grid, `md:w-2/3 grid sm:grid-cols-3` (`Footer.tsx:82`), **9 links** across 3 groups.

```
┌────────────────────────── 1440 ──────────────────────────┐
│  ┌──────── card (bg-[#0a0a0a], border #8B5CF6/25) ─────┐ │
│  │                                                    │ │
│  │   Opsie      Quick Links    Company     Connect     │ │
│  │   (logo)     About Us ▸     Why Opsie ▸  (socials) │ │
│  │              Our Products ▸ Our Team ▸             │ │
│  │              Contact Us ▸   FAQ's ▸                │ │
│  │                            Our Story ▸             │ │
│  │                            Our Mission ▸           │ │
│  │                            Our Vision ▸            │ │
│  └────────────────────────────────────────────────────┘ │
│            ░░ big "Opsie" watermark (Footer.tsx:19) ░░   │
└──────────────────────────────────────────────────────────┘
```

- **9 links** measured @1440 (`b2-footer.json → vp1440.links`): About Us, Our Products, Contact Us (Quick Links) · Why Opsie, Our Team, FAQ's, Our Story, Our Mission, Our Vision (Company) · socials (Connect).
- **The nav box** (`b2-footer.json → vp1440.navBox`) is the `sm:grid-cols-3` grid; 3 columns at ≥640, 1 column below (responsive R9, inherited).
- **N-04 (inherited):** **6 of the 9 hrefs resolve to `/who-we-are`** — the 5 registered stand-ins "Our Team", "FAQ's", "Our Story", "Our Mission", "Our Vision" (`Footer.tsx:106,109,117,118,119`, per REG-26) **plus About Us's own target at `Footer.tsx:88`**, which also points to `/who-we-are`. **Cited as inherited, not re-filed** (parked Q6 decision). *(G4 amended 2026-10-26: doc + receipt note both said "5 hrefs"; the receipted links array carries 6 `/who-we-are` hrefs.)*
- **Touch @1440:** links are text-size line boxes — **18 tall × 39–94 wide** (receipted `[65,18]`…`[94,18]`, `b2-footer.json → vp1440.links`); at desktop the pointer target matters less, but the height is the same as mobile. *(G4 amended 2026-10-26: the earlier "~28px line" matches no receipt — every receipted link box is 18 tall; no 28 exists in any receipt.)*

---

## 2. 375×812 — Current State

Footer stacks to a single column below 640; link text remains the same line-height.

```
┌────────────── 375 ──────────────┐
│  ┌──────────────────────────┐   │
│  │  Opsie (logo)            │   │  stacked
│  │  Quick Links             │   │
│  │   About Us ▸             │   │  18 tall × 39–94 wide
│  │   Our Products ▸         │   │  (sub-44, F4)
│  │   Contact Us ▸           │   │
│  │  Company                 │   │
│  │   Why Opsie ▸ … Vision ▸ │   │
│  │  Connect (socials)       │   │
│  └──────────────────────────┘   │
└──────────────────────────────────┘
```

- **Touch sweep @375** (`b2-footer.json → vp375`, cross-checked `passb-touch-375.json`): **24 interactive elements under 44px of 52 total** on the home route. The footer links are the smallest cluster — receipted link boxes are **18 tall × 39–94 wide** (`[65,18]` About Us … `[94,18]`, `b2-footer.json → vp1440.links`) *(G4 amended 2026-10-26: the earlier "~18×28" matches no receipt — no 28 appears in any receipted box)*. These are **inline text links**, not icon buttons, so their *visual* size is the text; the *touch* box is what R5 measures.
- 1-column stack, no horizontal overflow (0px bar PASS).

---

## 3. Proposal (N-04 + F4)

> All values below are **(proposal)** — not measurements.

**Goal:** enlarge the footer link touch targets to ≥44 (F4/R5) **without** changing the visual text size — and record N-04's placeholder hrefs as a decision item (not fixed here; it's the parked Q6).

```
┌────────────────────────── 1440 ──────────────────────────┐
│   Quick Links     Company        Connect                 │
│   [ About Us  ]   [ Why Opsie ]  (socials 44×44)         │
│   [ Our Prod. ]   [ Our Team  ]                          │
│   [ Contact  ]    [ FAQ's     ]   (proposal) link hit    │
│                   [ Our Story ]   box = block, py-2.5    │
│                   [ Mission   ]   → ≥44 tall, text size  │
│                   [ Vision    ]   unchanged              │
└──────────────────────────────────────────────────────────┘
```

- **Touch ≥44 (proposal — F4/R5):** wrap each footer link's hit area with `block py-2.5` (or add vertical padding on the `<a>`/`<li>`) so the tappable box reaches ≥44px tall while the **visible text stays `text-sm`** (no visual-size change). This is the standard inline-link touch fix and reduces the 24 sub-44 cluster without altering the design.
- **Socials (proposal):** the Connect socials are 40×40 — sourced from `passb-touch-375.json:248–273`, **not** b2 (`b2-footer.json` has no socials entry; *(G4 amended 2026-10-26: the earlier "b2 measured ~40" was mis-attributed)*) — bump to `h-11 w-11` (44×44) to clear R5 fully.
- **N-04 (NOT fixed here — decision item):** **6 of the 9 hrefs resolve to `/who-we-are`** — the 5 placeholder stand-ins plus About Us's own target (`Footer.tsx:88`). These are **inherited**, and correcting them is a content/routing decision (parked Q6), not a sketch-level fix. This doc **records** them (5 stand-ins cited to `Footer.tsx:106,109,117,118,119` per REG-26 + About Us at `:88`) so the redesign of the footer doesn't silently inherit broken targets. The touch fix (above) is independent of the href fix. *(G4 amended 2026-10-26: count corrected 5 → 6 of 9.)*
- **No `index.css:336` change** (REG-21). Footer link focus rings come from the global rule (contrast 4.68, §2.3 pass).

---

## 4. Bars check

| Bar | Current | Proposal | Verdict |
|---|---|---|---|
| 0px overflow @375 | PASS (b2) | unchanged | PASS |
| R5 touch ≥44 | **FAIL (F4)** — links 18 tall × 39–94 wide, socials 40×40 (`passb-touch-375.json:248–273`) | `block py-2.5` links, `h-11 w-11` socials | closes F4 |
| Link integrity (U14/N-04) | 6 of 9 hrefs → `/who-we-are` (5 stand-ins + About Us `:88`, inherited) | **not fixed here** (Q6 decision) | recorded, not closed |
| Contrast of link text | gray-300 on #0a0a0a (pass, §2.3) | unchanged | PASS |

---

## 5. Honest Unknowns

| Unknown | Reason | Needed for | Status |
|---|---|---|---|
| Exact per-link box after `py-2.5` | b2 measured current **18 tall × 39–94 wide** (receipted; G4 amended 2026-10-26 — was "~18×28", which matches no receipt); proposal padding not yet applied | confirm ≥44 after fix | Pass-B re-capture |
| N-04 real destinations | **6 of 9 links** resolve `/who-we-are` (5 stand-ins + About Us `:88`); true targets unknown (Q6 parked) | link-integrity closure | Parked (Q6), not a sketch unknown |
| Social icon touch after resize | socials 40×40 per `passb-touch-375.json:248–273` (G4: not b2 — no socials entry there); proposal 44 | confirm R5 | Pass-B re-capture |
