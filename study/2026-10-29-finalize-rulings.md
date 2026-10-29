# Phase-4 Block 1 — Finalize Rulings Record
**Date opened:** 2026-10-29
**Block:** PLAN:159 — walk the finalized design set (hero CTA redesign + interactions · 5 Block-2 sketches · shared design system · phase-3 feasibility verdicts) with the supervisor; record every accept/amend/reject.
**Pattern:** findings-review §2 (Row | Ruling | Ruler | one-line reason).
**Exit bar:** every proposal in the pack carries a recorded ruling; zero open TBD. **Defer-with-reason is a terminal state**, not a TBD violation (supervisor-confirmed on P-6).
**Batches:** 1 hero CTA ✅ ruled · 2 five sketches ✅ ruled · 3 shared design system ✅ ruled · 4 phase-3 feasibility caveats — posted 2026-10-29, awaiting rulings.
**Commit:** md-only. Batches 2–3 transcription + queue corrections G10 · G11 · G12 · REG-18a (commit `919e2fe`) · EI-C1/C2/C3 + styling-blocks recording ride the batch-3 commit; PLAN:159 flips at block-1 completion (zero TBD across all four batches).

---

## §1 Batch 1 — Hero CTA pack (ruled 2026-10-29)

Sources: `study/2026-10-23-herocta-redesign.md` + `study/2026-10-23-herocta-interactions.md`.

| Row | Ruling (accept / amend / reject) | Ruler | One-line reason |
|-----|----------------------------------|-------|-----------------|
| P-1 | **accept** | supervisor | `bg-[#8B5CF6]` → `bg-violet-700` on the hero CTA — hero-instance only; REG-09 stays open across the other 10 of 11 instances. |
| P-2 | **accept "keep"** (reject violet-900 alternative) | supervisor | Keep `hover:bg-white hover:text-black` — 21:1 receipted; violet-900 is an unmeasured unknown no finding demands. |
| P-3 | **accept as final design** | supervisor | Dual-tone `.hero-cta-button:focus-visible` ring (white 2px outline + 4px `#8B5CF6` shadow, unlayered element-scoped per R-B) — REG-25 closes **only** at the after-capture re-measure, geometry only; ratios already established. |
| P-4 | **accept + amendments** | supervisor | `<button onClick={navigate(...)}> → <Link to="/book-a-schedule">` — hero-instance closure of REG-18. Amendments confirmed 2026-10-29 with two corrections (§2): route cite recorded as `Router.tsx:107–108`; post-hero open count restated **6 navigate sites + Faq:27** (REG-18a). |
| P-5 | **accept removal** (reject padding-hack alternative) | supervisor | Remove `overflow-hidden` (option A) — no clipping-dependent pseudo-element; 🟡 1px latent rides to the 320 re-capture. |
| P-6 | **defer with reason** | supervisor | Zero-content CMS label → empty accessible name: unregistered (no REG row/AC spec covers it) — terminal defer; becomes a candidate finding for the findings track, not this pack. |
| P-7 | **accept as verification scope** | supervisor | Long CMS label (>20 chars) test after overflow removal — folds into the PLAN:171 rendering check (after-capture scope), not a design change. |
| R-A | **carried, certified** | supervisor | Enter-only `<Link>` keyboard behavior — no Space hack; ruling from the redesign track stands unchanged. |
| R-B | **carried, certified** | supervisor | Cascade-winning element-scoped focus ring; `index.css:336` inviolate — ruling from the redesign track stands unchanged. |

**Batch-1 exit: 9/9 rows ruled, 0 open TBD** (the two §2 cite confirmations closed 2026-10-29, same day).

## §2 Batch-1 verification notes — P-4 amendments (CONFIRMED 2026-10-29)

1. **Route cite — confirmed; ruler-side off-by-one acknowledged.** The `/book-a-schedule` route object spans `Router.tsx:106–109` — `:106` `{`, `:107` `path`, `:108` `element: <BookingPage />`, `:109` `}` (verified 2026-10-29). The supervisor confirmed the P-4 micro-cite `:106–107` was the off-by-one and recorded the cite as **`Router.tsx:107–108`** (path + element; full object `:106–109`). Ruled: recorded.
2. **7th live navigate site — confirmed with arithmetic fix.** `pages/ProductPage.tsx:105` (`navigate('/book-a-schedule')`, mounted on `/products` + `/buy-now` + `/Subscribe-now`) is a live booking site absent from REG-18's 6-site list; commit `7818ebd` (2026-05-12) predates the register. Supervisor's re-scan agrees; the total reference count is **9, not 8** (assistant prose miscount — the scan printed 9 lines: 1 route def `Router.tsx:107` + 7 live navigate sites + 1 dead `components/ContactUs.tsx:32` `window.location.href`, a third nav mechanism in a zero-use file). Post-hero open count: **6 navigate sites + Faq:27**. Applied 2026-10-29 as **REG-18a**: dated addendum on register row :83 + a post-hoc verification-log line after :242.

## §3 Batch 2 — five Block-2 sketches (ruled 2026-10-29, "all as recommended" + 3 precision notes)

Sources: `study/2026-10-26-{mobilemenu,contactform,faq,reviewarrows,footer}-sketches.md` + same-day receipts `study/receipts/2026-10-26/`. Every feasibility cite re-verified against the receipt JSONs before posting; two sketch-cite defects surfaced (B2-CF-3 premise, B2-MM-4 refinement) and both were ruled on.

| Row | Ruling (accept / amend / reject) | Ruler | One-line reason |
|-----|----------------------------------|-------|-----------------|
| B2-MM-1 | **accept** | supervisor | Focus containment — `inert` + `aria-hidden` on the page behind the panel + Tab cycle; closes F11's escape-at-stop-9 break (`passb-f11-identity.json`). |
| B2-MM-2 | **accept** | supervisor | Escape handler on panel root → existing close path + focus returns to burger; first public-site Escape (repo sole prior: `TicketModal.tsx:71`, admin). |
| B2-MM-3 | **accept** | supervisor | Panel `role="dialog"` + `aria-modal="true"` + `aria-label="Site menu"` — supports U4 + U6. |
| B2-MM-4 | **accept with refinement** | supervisor | Close → `h-11 w-11`; the receipted sweep entry `{"t":"×","aria":"Close menu","box":[14,32]}` (`b2-mobilemenu-375.json` links[3]) is **the measurement of record** — sub-44 both dims, strengthening the sketch's "unmeasured" claim. |
| B2-MM-5 | **accept "cycle is the fallback, no polyfill"** | supervisor | MM-1's focus cycle traps focus without `inert`; inert stays progressive enhancement — no dependency added. |
| B2-CF-1 | **accept** | supervisor | `<label for>` + `id` ×8 receipted fields — closes F2 on `/contact-us`; `/book-a-schedule` pending the roster capture (G1 → B2-SEQ-1). |
| B2-CF-2 | **accept** | supervisor | Keep `*` in label + `aria-required="true"` — required state programmatically exposed. |
| B2-CF-3 | **reject** (premise disproven) | supervisor | `py-3` touch bump rejected — receipted field boxes (inputs `[309,50]` ×4 · selects `[309,47]` ×3 · textarea `[309,128]`) are all ≥44; the sketch's own L69 attribution ("inputs + selects + the send button") is disproven (send is `py-4` ≈56px); the 19 belongs to the footer/nav cluster (REG-24 rows). Consequence **G12** applied: dated corrections at contactform-sketch L17/L69/L98/L109, `py-3` row superseded. |
| B2-CF-4 | **accept as in-scope co-fix** | supervisor | `aria-invalid` + `aria-describedby` per field (F7-family) while the field markup is open. |
| B2-CF-5 | **accept "placeholder stays as hint; label is the accessible name"** | supervisor | Double-text visual unknown → pass-B visual check; amend then only if it reads badly. |
| B2-CF-6 | **pending → B2-SEQ-1** | supervisor | `/book-a-schedule` roster identity (G1): terminal pending-verification, its capture folded into block 4. |
| B2-FAQ-1 | **accept** | supervisor | `aria-expanded={isOpen}` driven by existing `openIndex` — core F3 fix (null→null receipted `passb-faq-toggle.json` + `b2-faq.json`). |
| B2-FAQ-2 | **accept** | supervisor | Panel `id` + `aria-controls` + `role="region"` + `aria-labelledby` — U6 + 1.3.1 relationship. |
| B2-FAQ-3 | **accept** | supervisor | Keep single-open behavior; ARIA reflects the prior trigger flipping to false — no behavior change. |
| B2-RA-1 | **accept** | supervisor | `aria-label="Previous review"/"Next review"` — closes F1 (aria null ×2 receipted; precedent receipted in b2-mobilemenu). |
| B2-RA-2 | **accept** | supervisor | `w-8 h-8` → `h-11 w-11` call-site override (`Buttons.ts:55` base stays) — closes this R5 instance; REG-14 untouched (G3). |
| B2-RA-3 | **amend (incorporated)** | supervisor | Icon-aspect fix made **unconditional** — `object-contain` at 44×44 (no-op if aspect matches; removes an implementation-time TBD); dims captured at pass-B. |
| B2-RA-4 | **defer with reason** | supervisor | Mobile visible-arrows question — UX design question, no rubric fail; terminal (P-6 pattern). |
| B2-FT-1 | **accept** | supervisor | Link hit area `block py-2.5` (text stays `text-sm`) — closes F4 (links 18 tall × 39–94 wide receipted). |
| B2-FT-2 | **accept** | supervisor | Socials → `h-11 w-11` (40×40 receipted `passb-touch-375.json:248–273`). |
| B2-FT-3 | **defer with reason** | supervisor | N-04 placeholder hrefs (6 of 9 → `/who-we-are`, incl. About Us `:88`) — true destinations are owner/CMS content (Q6 parked, REG-26/27); recorded so the footer work doesn't silently inherit broken targets; terminal (P-6 pattern). |
| B2-SEQ-1 | **accept** | supervisor | Fold the three missing captures into phase-4 block-4 baselines: open sheet panel + close-button box @375/320 (G2) and `/book-a-schedule` form roster (G1); dev stack restarts right before block 4 anyway (restart context receipted per pass-B precedent). |

**Batch-2 exit: 22/22 rows ruled, 0 open TBD.** Totals: 16 accept · 1 amend (RA-3) · 1 reject (CF-3) · 2 defer-with-reason (RA-4, FT-3) · 1 pending-verification resolved into SEQ-1 (CF-6) · 1 accept-with-refinement (MM-4). Supervisor's verification pass confirmed every remaining feasibility cite (F11 walk 14 stops/escape step 9 `insideSheet:false` · sole Escape `TicketModal.tsx:71` · FAQ `ariaExpanded:null` ×5 · arrows 2× `[32,32]` aria-null · footer links `[65,18]` · socials `[40,40]` in `passb-touch-375.json` · `panelBox:[0,0,375,68]` = nav header).

## §4 Batch 3 — shared design system (ruled 2026-10-29, "all as recommended" + 2 findings + 1 addition)

Source: `study/2026-10-26-shared-design-system.md` (PLAN:146 · graded 8.5, G6–G9 applied). Receipt-cited documentation rows (§1 tokens · §2 typography · §5 R-B mechanism carried by R-B/P-3 · §6/§7 rules) need no ruling and are carried for the zero-TBD accounting.

| Row | Ruling (accept / amend / reject) | Ruler | One-line reason |
|-----|----------------------------------|-------|-----------------|
| DS-1 | **accept as documented norm — no code** (with §9 correction) | supervisor | Pressed = fill-darken `bg-violet-800` becomes a decided norm; correction applied: "no component ships them" is false — `active:` transform states ship at **16 sites** (supervisor named 6; my re-scan 2026-10-29 found 16 incl. admin/CMS), no receipt measures any `active:` state. Fill-darken doesn't conflict with transform-presses. Markers on §4's pressed row + §9. |
| DS-2 | **accept with fork resolved — `aria-disabled` + stays in tab order** (with divergence note) | supervisor | Disabled norm decided; divergence recorded: shipped shared Button uses **native** `disabled` (`Button.tsx:14` → `Buttons.ts:58` `opacity-50 cursor-not-allowed` — first two norm clauses match `:58`; `aria-disabled` = 0 hits repo-wide, verified) → current code ≠ norm, reconciliation = future **out-of-pack** work. |
| DS-3 | **accept as documented norm — no code** | supervisor | Loading = label swap + `aria-busy="true"`; rides whichever future component needs it. |
| DS-4 | **accept as documented norm — no code** | supervisor | Empty = text fallback, not a blank box; correctly guards the REG-26/27 never-assume-CMS-content rule. |
| DS-5 | **defer with reason** | supervisor | Mega-menu hover-only sub-links (`Navigation.tsx:124–125`) — terminal; hover-only candidate finding for the findings track. Strengthened: `:124–125` is the `onMouseEnter`/`onMouseLeave` pair; `onFocus` = **0 hits repo-wide** (verified). |
| DS-6 | **accept as mechanical** | supervisor | §3 py-3 token row + §7 ContactForm row struck/superseded (L64 + L128 both verified stale) — propagation of the B2-CF-3 reject. |
| DS-7 | **accept as mechanical** | supervisor | §8 REG-18 row corrected: "5 navigate sites" → **6 post-hero** per REG-18a (L138). |
| DS-8 | **accept as mechanical** (supervisor-added) | supervisor | §4 hover row's `hover:bg-violet-900` fork marked rejected — P-2 already ruled it out; for a zero-TBD exit the row must not read as an open option. |

**Batch-3 exit: 8/8 rows ruled, 0 open TBD.** Totals: 4 accept-norms (no code) · 1 defer-with-reason (DS-5, terminal) · 3 accept-mechanical (DS-6/7/8). All eight markers applied to the design-system doc 2026-10-29.

## §5 Batch 4 — phase-3 feasibility caveats (posted 2026-10-29, awaiting rulings)

Item IDs B4-1…B4-6 posted in chat against `study/2026-10-26-feasibility-review.md`; table to be transcribed here on the supervisor's rulings.

## §6 Post-record notes

- **Styling pass (4 blocks, 7.5h)** — recorded 2026-10-29 under the Component-A track (PLAN, after the markup/rendering blocks) with the presumption flagged: same track, inserted between PLAN:170 and PLAN:171, same branch/gates; "Compare against design" disambiguated from PLAN:171 (visual-conformance judgment vs receipted after-capture evidence). Per-block hour splits unset (post stated total only).
- **Queue (2026-10-29):** G10 · G11 · G12 · REG-18a committed `919e2fe`; EI-C1/C2/C3 applied same day (batch-3 commit) — queue genuinely empty after.
