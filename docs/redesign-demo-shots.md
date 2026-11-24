# Redesign demo captures

Nine screenshots of the states walked through in [redesign-demo.md](redesign-demo.md).
Captured 2026-11-24 with the local CMS mock and the Vite dev server, headless Edge over
CDP. **Local and untracked:** they live in
`C:\Users\kingg\AppData\Local\Temp\opencode\opsie-mock\shots\demo\`, produced by
`demo-shots.mjs` in the same folder. Re-run that script to regenerate them.

Entrance animations are neutralised in the captures (`[data-aos]` / `ScrollAnimatedSection`
transforms forced to `none`), and the Botpress launcher is hidden, so every shot shows the
settled layout rather than a mid-transition frame.

| # | File | Viewport | Shows | What to point at |
| --- | --- | --- | --- | --- |
| 1 | `01-contact-us-default-1440.png` | 1440 × 1000 | Component B at rest on the light `/contact-us` page | White card on `#ECEDF1`; mono kicker `Opsie Control // Inquiry`; `Form / 01` meta; visible labels and `*` on required fields |
| 2 | `02-contact-us-validation-1440.png` | 1440 × 1000 | Empty submit | Error summary above the fields, per-field messages, first invalid field focused, zero network calls |
| 3 | `03-contact-us-success-1440.png` | 1440 × 1000 | Successful submit against the mock | Focused success panel, 52 px `Send another` action restoring the form |
| 4 | `04-home-form-dark-band-1440.png` | 1440 × 1000 | The same form inside the dark `#0A0F1D` "Request a Demo" band on `/` | Identical card, ink and contrast (4.76:1) — no white-on-white or inherited dark styling |
| 5 | `05-faq-closed-1440.png` | 1440 × 900 | Component C at rest on `/what-we-do` | Sticky header column at 96 px below the fixed header; five collapsed cards; `Answers / 05` counter |
| 6 | `06-faq-open-1440.png` | 1440 × 900 | First question open | Teal border/glow, index turns teal, icon becomes `×`, answer readable at 7.58:1 |
| 7 | `07-faq-closed-1024.png` | 1024 × 900 | FAQ at the `lg` breakpoint | Header column 295 px wide, `Frequently questions` wraps between words — no mid-word split (AC-06) |
| 8 | `08-contact-us-form-375.png` | 375 × 812 | Component B at phone width | Single column, inputs 50 px, submit 52 px, no horizontal scrollbar |
| 9 | `09-faq-open-375.png` | 375 × 812 | Component C open at phone width on `/who-we-are` | 72 px triggers, question text wrapping inside the card, no overflow |

## Notes for the walkthrough

- Shot 7 is the one that caught a real defect during demo prep: the heading previously
  broke as "Frequen / tly" at 1024. The `lg` split is now 42/58 (`Faq.tsx`), and the
  integration probe checks every FAQ heading for words split across lines.
- The mock answers `/api/webcontent/get-content`, the product list, and
  `/api/ticket/create`, so shots 3 and 4 do not need the real backend or a database.
- These are screen captures of a local dev build, not a deployed environment; no build
  artefact or bundle was published for them.
