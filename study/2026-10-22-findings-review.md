# Findings review — 2026-10-22

Chain block 2 of `study/PLAN.md` (:124). Input: `study/2026-10-22-findings-register.md` (block 1).
Ruler = supervisor (the user) by default; workplace mentor receives the same brief. Rulings are recorded
faithfully — accept / amend / reject + ruler + one-line reason, no paraphrase drift.

## §1 Review brief (≤ 1 page)

**Counts (register summary line, verbatim):** **22 open · 3 provisional · 2 blocked-owner · 1 parked · 6 closed — 34 rows**

Pointer verification behind those rows: `checks 157 pass / 0 fail · table rows 34 · unresolved 0` (raw paste = register §5).
Batches proposed: **BATCH-A FE** = REG-04…22 (19 rows, one say-the-word) · **BATCH-B BE** = REG-01…03 (separate thread, PLAN:76) · PASS-B (3) · OWNER (2) · PARKED (1) · SHIPPED (6).

**Decision rows (9):**

| # | Row(s) | Question for the ruler | Filed state |
|---|--------|------------------------|-------------|
| D1 | REG-12 (U-F11, Escape on mobile menu) | Severity: keep filed 🟠, or re-tier to **🔴** per locked rubric U4 (accessible component)? Register filed 🟠 but rubric letter = 🔴. | ⚠ contested severity |
| D2 | REG-17 (U-F6, `target="_blank"` no `rel`) | Severity: keep filed 🟡, or re-tier to **🟠** per locked rubric U14? | ⚠ contested severity |
| D3 | REG-18 (U-F9, FAQ /contact-us raw link + unaddressable booking) | Severity: U13 part is 🟡 ✓; U16 letter = **🟠** — file the row 🟡 or 🟠? | ⚠ contested severity |
| D4 | REG-23 (responsive F1, hero CTA below fold @320) | Rewrite-with-true-numbers or drop (amended 🟠→🟡 under §7.2)? PROVISIONAL until pass B. | PROVISIONAL call |
| D5 | REG-24 (responsive F4, footer link min-size) | Accept provisional 🟡 (pass-B re-measure) or escalate pending measurement? | PROVISIONAL call |
| D6 | REG-25 (U-F4, FocusHero 1.66:1 ring) | Accept provisional 🟠 (U-C10 ratio re-measure) or hold row until re-measured? | PROVISIONAL call |
| D7 | REG-01…03 (A-1/A-2/A-3) | BATCH-B boundary: confirm backend stays its own thread/ship unit per PLAN:76, not folded into BATCH-A FE. | batch boundary |
| D8 | §1 namespace | Guide text says "desktop F1–F8"; the desktop track actually carries D1–D10 + N-01…N-04 (real collision = responsive F1–F6 vs U F1–F12). Accept the recorded scheme as-is, or amend the guide wording? | author-uncertain |
| D9 | REG-22 (R-DQ3, prod-build hang re-test) | Approve as an action row that **creates** its receipt (env-confounded dev observation, no defect claimed), or drop it from OPEN-CODE? | author-uncertain |

**Decisions needed:** D1, D2, D3 (severity rulings) · D4, D5, D6 (provisional calls) · D7 (batch boundary) · D8 (namespace) · D9 (action row). All nine need an explicit accept/amend/reject before block 3 (priorities) can run.

## §2 Rulings record

| Row | Ruling (accept / amend / reject) | Ruler | One-line reason |
|-----|----------------------------------|-------|-----------------|
| D1 | **amend** (re-tier to 🔴) | supervisor | Re-tier to 🔴 per locked rubric U4 letter — mobile menu traps/escapes focus behind overlay with non-inert background. |
| D2 | **amend** (re-tier to 🟠) | supervisor | Re-tier to 🟠 per locked rubric U14 letter — external links target="_blank" missing rel attribute. |
| D3 | **accept** — keep 🟡 + U16 N/A-by-letter | supervisor | U16 N/A by letter — the FAQ raw `<a>` is a U13 (🟡) issue only; keep the row 🟡 as filed, scope clarified to both raw `<a>` reloads. *(F-C1 corrected 2026-10-26: this cell previously read "**amend** (clarify dual scope, file 🟠)" — the ruling of record was recorded inverted; severity letters are cited, never re-derived.)* |
| D4 | **amend** (rewrite with true numbers) | supervisor | Rewrite with true receipt numbers (118×104, scrollW 173, all words visible); retain as 🟡 latent (1px margin), PROVISIONAL pending pass-B re-measure. |
| D5 | **accept** | supervisor | Accept PROVISIONAL 🟡 status and 17–29/cell count; sweep sizes in pass-B re-measure. |
| D6 | **accept** | supervisor | Accept PROVISIONAL 🟠 status; dual-tone ring design approved, ratio re-measurement required in pass-B. |
| D7 | **accept** | supervisor | BATCH-B backend security ship remains independent thread per PLAN:76 and PLAN:6. |
| D8 | **accept** | supervisor | Accept namespace scheme as-is; collision on disk is responsive F1–F6 vs U F1–F12. |
| D9 | **accept** (with batch note) | supervisor | Approve prod-build hang re-test action row in OPEN-CODE; batch note: executed during pass-B/prod preview. |

## §3 Register delta

Applied to `study/2026-10-22-findings-register.md` §10 (dated delta log):

- **REG-12 (U-F11):** Severity amended from 🟠 to **🔴** per locked rubric U4 letter (D1 ruling).
- **REG-17 (U-F6):** Severity amended from 🟡 to **🟠** per locked rubric U14 letter (D2 ruling).
- **REG-18 (U-F9):** Severity **kept 🟡** (D3 ruling of record: keep 🟡 + U16 N/A-by-letter — the FAQ raw `<a>` is U13 only, so the U16 letter does not apply); scope clarified to include both raw `<a>` document reloads and unaddressable booking path. *(F-C1 corrected 2026-10-26: this delta previously read "Severity amended from 🟡 to 🟠 (tracking U16 🟠 / U13 🟡)" — inverted; restored to the ruling of record.)*
- **REG-23 (RESP-F1):** Rewritten with true receipt numbers (118×104 px, scrollW 173 px, clientW 118 px, all words visible, span x269 vs clip x270, 1px latent clip margin); status remains PROVISIONAL 🟡 latent pending pass-B (D4 ruling).
- **REG-22 (R-DQ3):** Confirmed in OPEN-CODE with batch note: action row creates receipt in prod-build pass-B (`hangtest.mjs` against `npm run build && preview`) (D9 ruling).
- **PLAN:94 re-points:** References updated to `PLAN:6` standing ship pipeline rule (lines 67, 69, 132).
- **Provenance:** `link-integrity.json` provenance added in §0/§5.
- **Pointer verification:** Machine re-verified on 2026-10-23 (157 checks pass / 0 fail · 0 unresolved · 0 contested).
- **Counts line post-amendment:** `22 open · 3 provisional · 2 blocked-owner · 1 parked · 6 closed — 34 rows` · **0 contested severities**.
