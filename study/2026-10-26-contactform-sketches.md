# ContactForm — Desktop + Mobile Wireframe Sketches
**Date:** 2026-10-26 (Block 2)
**Component:** Contact form (`ContactForm.tsx`) — mounts on **two** routes: `/contact-us` and `/book-a-schedule` (`ContactUsSection.tsx` + the booking page). One component-level fix applies to both mounts; the **field-roster identity across routes is unconfirmed** (§5 pending — G1) *(G1 amended 2026-10-26: header previously said "so one fix clears both" flatly)*
**REG IDs carried:** REG-21, REG-25, REG-26/27 (CMS/owner), REG-28 (parked)
**Findings addressed:** **F2 🟠** (no labels on 8 fields × 2 routes, **U7** 3.3.2)
**Receipts (2026-10-26, same-day):** `study/receipts/2026-10-26/b2-contactform.json` · inherited `inv-contact-1440.json`, `inv-book-1440.json`

> **Convention:** current measurements carry their receipt source in parentheses. Proposed sizes / tokens / structural changes are marked **(proposal)** and are NOT measurements.

---

## Viewports

| Viewport | Reason |
|---|---|
| **1440×900** | Primary desktop; form measured here (b2-contactform.json) |
| **375×812** | Primary mobile; field stacking + touch sweep measured here (19 under-44 this pass) *(G12 corrected 2026-10-29: the 19 are **not** form fields — see the §2 touch-sweep note; receipted field boxes are all ≥44)* |

*(No 320 sketch: the form is a single-column stack at all widths with no wrapping/clipping history — the long CMS strings live in labels/placeholders, not a fixed-width box. 375 covers the mobile stack.)*

---

## 1. 1440×900 — Current State

```
┌────────────────────────── 1440 ──────────────────────────┐
│  Contact Us                                              │
│  ┌────────────────────────────────────────────────┐      │
│  │  Full Name*      [__________ input __________] │      │  name · label-for: NULL (F2)
│  │  Your Email*     [__________ input __________] │      │  email · placeholder-only
│  │  Phone (Opt.)    [__________ input __________] │      │  phone
│  │  Address (Opt.)  [__________ input __________] │      │  address
│  │  Tell us about…  [________________ textarea __] │      │  description "Tell us about your project or inquiry*"
│  │  Platform     [ dropdown ▼ select ]            │      │  select name=platform
│  │  Product      [ dropdown ▼ select ]            │      │  select name=product
│  │  Category     [ dropdown ▼ select ]            │      │  select name=category
│  │                                                │      │
│  │  [ Send Message  button ]                      │      │
│  └────────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────┘
```

- **8 fields** measured live on `/contact-us` @1440 (`b2-contactform.json → vp1440.fields`): `name` (Full Name*), `email` (Your Email*), `phone` (Phone (Optional)), `address` (Address (Optional)), `description` (textarea, "Tell us about your project or inquiry*"), `platform` (select), `product` (select), `category` (select). *(G1 amended 2026-10-26: the earlier roster — Subject · Company · Service · Budget — matches no receipt or source; those four exist nowhere, and `address` + the three real select names were missing.)*
- **Label association:** every field's `label[for=…]` resolves to **null** — fields rely on **placeholder-only** text (F2 / U7 3.3.2 fail). This is the exact F2 defect.
- **Mount routes:** the same `ContactForm` component mounts on `/contact-us` **and** `/book-a-schedule` (`inv-book-1440.json` carries a form on the booking route), but the **field-by-field identity of the two rosters is NOT confirmed** — demoted to §5 pending (G1 amended 2026-10-26: L45 previously asserted "identical 8-field block," contradicting its own §5 unknown; the identical-clears-both claim waits on a `/book-a-schedule` capture).

---

## 2. 375×812 — Current State

```
┌────────────── 375 ──────────────┐
│  Contact Us                     │
│  ┌──────────────────────────┐   │
│  │ Full Name*  [__________] │   │  single-column stack
│  │ Your Email* [__________] │   │  label-for: NULL
│  │ Phone (Opt.)[__________] │   │
│  │ Address (Op)[__________] │   │
│  │ Tell us     [__________] │   │  description textarea
│  │ about…      [__________] │   │
│  │ Platform [▼ select]      │   │
│  │ Product  [▼ select]      │   │
│  │ Category [▼ select]      │   │
│  │ [ Send Message ]         │   │
│  └──────────────────────────┘   │
└──────────────────────────────────┘
```

- **Touch sweep @375** (`b2-contactform.json → vp375`): **19 interactive elements under 44px** on the contact route. *(G12 corrected 2026-10-29: the parenthetical "(inputs + selects + the send button)" is **false** — the receipted field boxes @375 are inputs `[309,50]` ×4, selects `[309,47]` ×3, textarea `[309,128]`, all ≥44, and the send button is `py-4` (~56px), so none of the three named classes is sub-44. The 19 is `vp375.touchUnder44`, a route-wide count with no itemized list in the receipt — it belongs to the footer/nav cluster (the REG-24 rows: 18-tall links, 40×40 socials, 22-tall FAQ link), not the form. The "Inputs are typically ~40px tall" line is an unmeasured assertion contradicted by the receipt.)* These are **inline text links**, not icon buttons, so their *visual* size is the text; the *touch* box is what R5 measures.
- Fields stack to one column; no horizontal overflow (0px bar PASS).

---

## 3. Proposal (F2 fix)

> All values below are **(proposal)** — not measurements.

**Goal:** give every field a real programmatically-associated `<label>` so U7 (3.3.2) passes — applied in the single shared component so it reaches every mount point (route-roster identity pending §5 — *(G1)*).

```
┌────────────────────────── 1440 ──────────────────────────┐
│  Contact Us                                              │
│  ┌────────────────────────────────────────────────┐      │
│  │  <label for="full-name">Full Name*</label>     │      │  (proposal) real <label for>
│  │  [ <input id="full-name" ________________ ]    │      │  + id on the input
│  │  <label for="email">Your Email*</label>        │      │
│  │  [ <input id="email" ___________________ ]     │      │
│  │  … phone · address · description (textarea) ·  │      │  same pattern each —
│  │     platform (select) · product · category     │      │  the receipted 8, in DOM order
│  │                                                │      │
│  │  [ Send Message ]                              │      │
│  └────────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────┘
```

- **Label association (proposal):** for each of the 8 fields, add `<label for="<id>">` + a matching `id` on the `<input>`/`<select>`/`<textarea>`. Keep the visible text (placeholder can stay as a hint, but the label is the accessible name). This is the F2 fix in the shared component; whether it **clears both routes** depends on §5 (route-roster identity unconfirmed — *(G1 amended 2026-10-26: was "clears both routes because ContactForm is shared", contradicting §5)*).
- **Required marking (proposal):** keep the `*` in the label text + add `aria-required="true"` (or the native `required`) so required state is programmatically exposed (supports U7 + the F7 error-affordance family).
- **Touch ≥44 (proposal):** bump input/select vertical padding (`py-3`) so fields reach ≥44px tall, reducing the 19 sub-44 cluster (R5). Send button already ≥44 in most cases — verify in pass-B. *(G12 ruled 2026-10-29: this `py-3` proposal is **superseded** — rejected by ruling B2-CF-3 (`2026-10-29-finalize-rulings.md` §3); the receipted field boxes are all already ≥44, so the proposal's premise is false and no padding change ships.)*
- **Error affordance (proposal, ties to F7/REG):** pair each field with `aria-invalid` + `aria-describedby` pointing at its error text when validation fails (the F2/F7 pattern from the U-track). Not a new finding — a co-fix while the labels are being added.
- **No `index.css:336` change** (REG-21 intact).

---

## 4. Bars check

| Bar | Current | Proposal | Verdict |
|---|---|---|---|
| 0px overflow @375 | PASS (b2) | unchanged | PASS |
| R5 touch ≥44 | 19 under-44 @375 (b2, route-wide — **not** the fields) *(G12)* | ~~inputs `py-3` → ≥44~~ **superseded** — rejected by ruling B2-CF-3 (fields already ≥44: `[309,50]`/`[309,47]`/`[309,128]`) | no change ships; F4 stays with its owning elements (footer → ruling B2-FT-1) |
| U7 labels/instructions | **FAIL (F2)** — label-for null ×8 (measured @`/contact-us` ×2 vps; ×2-route identity pending §5) | `<label for>` ×8 | closes F2 on `/contact-us`; `/book-a-schedule` pending §5 *(G1)* |
| Contrast of field text | white-on-#8B5CF6 submit 4.23 (F8, inherited) | not in scope (token fix) | noted |

---

## 5. Honest Unknowns

| Unknown | Reason | Needed for | Status |
|---|---|---|---|
| `/book-a-schedule` field-by-field diff vs `/contact-us` | b2 measured `/contact-us`; booking route inherited via `inv-book-1440.json` | confirm the 8 fields are identical on both before claiming "one fix clears both" | Pass-B re-capture on `/book-a-schedule` |
| Select dropdown expanded-state touch size | b2 measured collapsed selects only | R5 on the open dropdown | Pass-B (native select open state) |
| Placeholder vs visible-label duplication | current uses placeholder-only; adding labels changes visual layout | confirm no double-text visual once labels render | Pass-B visual check |
