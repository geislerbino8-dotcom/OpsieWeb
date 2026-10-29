# Desktop layout, typography, and content audit — 2026-10-19

## Scope and method

- Routes: `/` (Homepage) and `/what-we-do` (WhatWeDo).
- Viewport: **1440 × 900 CSS px** (`innerWidth=1440`, `innerHeight=900`), local Vite at `http://localhost:5173`.
- Sections were inspected at the page top and while scrolling through their content; the services carousel was read at its initial desktop position. The evidence below is DOM/computed-style output, not an inference from source alone.
- New findings are separated from inherited D-matrix findings. D3, D5, and D4 are re-evidenced below for Item B, but are **not resubmitted as new Item A findings**.
- Severity meanings carried forward: 🔴 blocker · 🟠 major · 🟡 minor.
- Backend fixes A-1/A-2/A-3 are outside this ranking.

## Item A — issue log

| ID | Dimension | Page · section | What is wrong | File:line | Status | Raw evidence paste (1440 × 900) |
|---|---|---|---|---|---|---|
| N-01 | Content | WhatWeDo · Services carousel / Cloud Solutions | The rendered service description joins “secure” and “backup” into the single misspelling `securebackup`. | [`ServicesSections.tsx:8`](../frontend/src/components/sections/ServicesSections.tsx#L8) | **Observed** text; typo classification is direct. | `{"viewport":[1440,900],"route":"/what-we-do","scrollY":973,"text":"Cloud hosting, remote access systems, centralized database management, securebackup solutions, and scalable SaaS deployment.","box":[243,414,262,72]}` |
| N-02 | Content | WhatWeDo · Services carousel / Cybersecurity, Web and Mobile Development, UI / UX Design | Three mounted carousel descriptions end with doubled punctuation (`infrastructure..`, `applications..`, `experience..`). The latter two are on later carousel cards, not in the initial desktop frame. | [`ServicesSections.tsx:10,12,13`](../frontend/src/components/sections/ServicesSections.tsx#L10) | **Observed** DOM strings; punctuation error is direct. | `{"viewport":[1440,900],"route":"/what-we-do","scrollY":973,"copy":["Data encryption, access control, firewall protection, backup security, user authentication, and secure cloud infrastructure..","Android and iOS mobile applications, web-based systems, custom portals, ERP platforms, and responsive business applications..","User-focused and responsive designs that enhance usability, engagement, and overall digital experience.."]}` |
| N-03 | Content | Homepage · Hero mini-card | The text ends in `---`, which reads as unfinished placeholder punctuation. The exact string is observed; whether the dashes are intentional brand copy is **inferred / owner-unconfirmed**, so it is not ranked as a confirmed defect. | [`HeroPage.tsx:106`](../frontend/src/components/HeroPage.tsx#L106) | **Observed string; inferred defect.** | `{"viewport":[1440,900],"route":"/","scrollY":0,"selector":".max-w-md","text":"O Opsie Operate The Opsie Way --- SEE HOW IT WORKS","box":[491,700,448,104]}` |
| N-04 | Content | Both pages · shared Footer | The social links target the Facebook and Instagram root pages, and the email link is `hello@opsie.com`; the page does not identify specific official profiles. These hrefs are observed, but whether they are approved business destinations cannot be established without the owner’s real URLs/email. **Unverifiable as wrong links; excluded from ranking.** | [`Footer.tsx:140,148,156,157`](../frontend/src/components/Footer.tsx#L140) | **Observed targets; validity unverifiable.** | `{"viewport":[1440,900],"route":"/","scrollY":9686,"links":[["Follow us on Facebook","https://facebook.com"],["Follow us on Instagram","https://instagram.com"],["Email us at hello@opsie.com","mailto:hello@opsie.com"]]}` |

### Layout and typography disposition

No new layout or typography defect met the evidence threshold in this pass. The section-by-section receipt below makes that “none” explicit rather than treating an omitted section as clean by default. The live type samples were consistent with the stated hierarchy: the WhatWeDo hero heading computed to Montserrat, 75px / 300 / 80px; the services-card headings computed to Poppins, 20px / 500 / 31.11px. No `.font-poiret` node was present on either assigned route. Different section sizes were observed, but no concrete clipping, wrapping failure, or hierarchy break was reproduced and therefore no typographic finding is inferred from scale variation alone.

### Coverage receipt — every assigned section

“None” means no new issue was verified in that dimension for that section at the stated desktop viewport. Inherited items are named rather than counted as new findings.

| Page | Section | Layout | Typography | Content | Inherited D-matrix |
|---|---|---|---|---|---|
| Homepage | Shared header / navigation | None | None | None | D5 |
| Homepage | Hero | None | None | N-03 candidate (copy intent unverified) | None |
| Homepage | About Us | None | None | None | None |
| Homepage | Why Choose Us | None | None | None | None |
| Homepage | Services | None | None | None | None |
| Homepage | Products | None | None | None | None |
| Homepage | Operational Structure | None | None | None | D3 |
| Homepage | Client Reviews | None | None | None | None |
| Homepage | Contact Process | None | None | None | None |
| Homepage | Contact Us | None | None | None | None |
| Homepage | Product CTA | None | None | None | None |
| Homepage | FAQ | None | None | None | D4 |
| Homepage | Footer | None | None | N-04 pending owner validation | None |
| WhatWeDo | Shared header / navigation | None | None | None | D5 |
| WhatWeDo | Hero | None | None | None | None |
| WhatWeDo | Intro (“We built Opsie for you”) | None | None | None | None |
| WhatWeDo | Services carousel | None | None | N-01, N-02 | None |
| WhatWeDo | Consultation CTA | None | None | None | None |
| WhatWeDo | Why Choose Us | None | None | None | None |
| WhatWeDo | Client Reviews | None | None | None | None |
| WhatWeDo | FAQ | None | None | None | D4 |
| WhatWeDo | Footer | None | None | N-04 pending owner validation (same shared finding) | None |

## Item B — evidence pass

Each confirmed finding above has a viewport, route, target, scroll position, and raw browser output. The inherited D-matrix items were also re-evidenced here:

| Inherited ID | Severity | Evidence / interpretation |
|---|---|---|
| D5 — desktop nav autohides while scrolling down | 🟠 | **Observed:** at `/`, 1440 × 900, after downward scroll to `scrollY=950`, computed nav `top=-80px` and rendered `navY=-80`. It does reappear on its timer, but that does not meet the agreed “sticky desktop nav” criterion during the hide interval. Source: [`Navigation.tsx:99,102,125`](../frontend/src/components/Navigation.tsx#L99). |
| D3 — sky-blue tokens remain in Operational Structure | 🟠 | **Observed:** at `/`, 1440 × 900, the live tree contains 9 elements with `sky-` classes. A `text-sky-600` element computes to `oklch(0.588 0.158 241.966)`; the accent gradient ends at the same sky color. The implicated component locations are [`OperationalStructure.tsx:14,65,69,77,91`](../frontend/src/components/sections/OperationalStructure.tsx#L14). |
| D4 — FAQ trigger computes to square corners | 🟠 by the agreed literal criterion | **Observed:** at `/what-we-do`, 1440 × 900, the first FAQ trigger computes to `borderRadius=0px`; box `[604,406,606,88]` at `scrollY=3909`. The rounded-2xl parent card supplies the visible outer corners, so the visual impact is lower than the literal criterion failure; see the waiver recommendation below. Source: [`Faq.tsx:39,45`](../frontend/src/components/FaqSection/Faq.tsx#L39). |

### Repro steps and raw browser pastes

1. **N-01:** Set viewport to 1440 × 900; load `/what-we-do`; paste this in DevTools Console. It scrolls the misspelled paragraph to center and returns the N-01 evidence:

   ```js
   (() => {
     const e = [...document.querySelectorAll("p")].find(x => x.innerText.includes("securebackup"));
     e?.scrollIntoView({ block: "center" });
     const r = e?.getBoundingClientRect();
     return JSON.stringify({ viewport: [innerWidth, innerHeight], route: location.pathname, scrollY, text: e?.innerText.trim().replace(/\s+/g, " "), box: r && [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] });
   })()
   ```

2. **N-02:** On `/what-we-do`, scroll to the services carousel (`scrollY=973`) and paste:

   ```js
   (() => JSON.stringify({ viewport: [innerWidth, innerHeight], route: location.pathname, scrollY, copy: [...document.querySelectorAll("p")].map(e => e.innerText.trim().replace(/\s+/g, " ")).filter(t => /infrastructure\.\.|applications\.\.|experience\.\./.test(t)) }))()
   ```

3. **N-03:** Set viewport to 1440 × 900; load `/`; keep `scrollY=0`; paste:

   ```js
   (() => { const e = document.querySelector(".max-w-md"), r = e.getBoundingClientRect(); return JSON.stringify({ viewport: [innerWidth, innerHeight], route: location.pathname, scrollY, selector: ".max-w-md", text: e.innerText.trim().replace(/\s+/g, " "), box: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] }); })()
   ```

4. **N-04:** Set viewport to 1440 × 900; load `/`; paste:

   ```js
   (() => { document.querySelector("footer").scrollIntoView({ block: "end" }); return JSON.stringify({ viewport: [innerWidth, innerHeight], route: location.pathname, scrollY, links: [...document.querySelectorAll('footer a[aria-label^="Follow us"],footer a[aria-label^="Email us"]')].map(a => [a.getAttribute("aria-label"), a.getAttribute("href")]) }); })()
   ```

5. **D5:** Load `/`, wait for route scroll restoration to finish, scroll down past 80px, and paste:

   ```js
   (() => { const n = document.querySelector("nav"); return JSON.stringify({ viewport: [innerWidth, innerHeight], route: location.pathname, scrollY, navTop: getComputedStyle(n).top, navY: Math.round(n.getBoundingClientRect().y) }); })()
   ```

   Raw result: `{"viewport":[1440,900],"route":"/","scrollY":950,"navTop":"-80px","navY":-80}`.

6. **D3:** Load `/`; paste:

   ```js
   (() => { const xs = [...document.querySelectorAll('#root [class*="sky-"]')], p = xs.find(x => x.className.includes("text-sky-600")), g = xs.find(x => x.className.includes("to-sky-600")); return JSON.stringify({ viewport: [innerWidth, innerHeight], route: location.pathname, skyClassCount: xs.length, textClass: p?.className, color: p && getComputedStyle(p).color, gradientClass: g?.className, gradient: g && getComputedStyle(g).backgroundImage }); })()
   ```

   Raw result: `{"viewport":[1440,900],"route":"/","skyClassCount":9,"textClass":"p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600","color":"oklch(0.588 0.158 241.966)","gradientClass":"h-1 w-20 bg-gradient-to-r from-violet-500 to-sky-600 rounded-full","gradient":"linear-gradient(to right, oklch(0.606 0.25 292.717) 0%, oklch(0.588 0.158 241.966) 100%)"}`.

7. **D4:** Load `/what-we-do`; paste:

   ```js
   (() => { const h = [...document.querySelectorAll("h1,h2,h3")].find(e => e.innerText.trim().startsWith("Got Questions")), s = h?.closest("section"), b = s?.querySelector("button"); b?.scrollIntoView({ block: "center" }); const r = b?.getBoundingClientRect(); return JSON.stringify({ viewport: [innerWidth, innerHeight], route: location.pathname, scrollY, faqHeading: h?.innerText.trim(), buttonText: b?.innerText.trim().replace(/\s+/g, " "), buttonRadius: b && getComputedStyle(b).borderRadius, buttonBox: r && [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] }); })()
   ```

   Raw result: `{"viewport":[1440,900],"route":"/what-we-do","scrollY":3909,"faqHeading":"Got Questions? We've Got Answers","buttonText":"What services do you offer","buttonRadius":"0px","buttonBox":[604,406,606,88]}`.

Unranked / excluded: N-04’s destinations cannot be judged without approved business contact details. N-03’s dashes may be intentional copy. Both are explicitly excluded from the punch list until their owner intent is known. The AOS item below is a parked decision, not a newly verified runtime defect; the prior open note does not specify a reproducible failing post-animation state, so it is not ranked as a defect.

## Severity and ranking rule

Severity follows the agreed D-matrix labels: 🔴 blocker, 🟠 major, 🟡 minor. Priority score is **user impact (1–3) × breadth (1–3) ÷ fix effort (1–3)**, where 1 is low/local/quick and 3 is high/wide/expensive. P1 is the highest immediate score/criterion risk; P2 is worthwhile but lower impact; P3 is low-impact cleanup or a decision that needs clarification. A high literal severity does not imply a visually high-impact defect: that distinction is called out for D4.

## Ranked punch list and decision queue

| Rank | Item | Severity | Impact × breadth ÷ effort | Justification / recommendation |
|---|---|---|---|---|
| **P1** | **D5 — Autohide: fix or waive** | 🟠 | 2 × 3 ÷ 1 = **6** | Shared navigation on both assigned pages disappears during downward scroll, violating the accepted sticky-nav criterion. **Recommend fix**: keep the desktop bar visible while scrolling; do not waive the criterion unless the product explicitly wants auto-hide. |
| **P2** | **N-01 + N-02 — WhatWeDo service copy cleanup** | 🟡 | 1 × 2 ÷ 1 = **2** | One misspelling plus three doubled full stops affect copy in multiple carousel cards (two require advancing the carousel to view). Correct `securebackup` to `secure backup`; remove the extra terminal periods. Small, contained edit. |
| **P2** | **D4 — FAQ radius: letter vs visual** | 🟠 literal / low visual impact | 1 × 2 ÷ 1 = **2** | The trigger is a full-width accordion control inside a rounded card; only the parent’s corners are visually exposed. **Recommend waive the blanket rounded-full rule for this accordion trigger** rather than pill-rounding a row-sized control. Preserve the literal 0px as a documented exception. |
| **P3** | **D3 — Sky-token cleanup scope** | 🟠 by inherited criterion | 1 × 1 ÷ 1 = **1** | The brand leak is localized to one Homepage component. **Recommend a component-scoped cleanup only** in OperationalStructure: replace its five distinct sky-token uses with the existing violet/neutral palette; do not launch a repo-wide token cleanup from this evidence. |
| **P3** | **AOS — completion-rule verdict** *(decision only)* | — | Not scored as a defect | Current configuration: [`App.tsx:39,41,42`](../frontend/src/App.tsx#L39). **Recommendation:** if “GO” is selected, it means **apply the completion-rule fix**, not leave the current behavior as-is. However, defer implementation until the exact expected post-animation state and a reproducible failure are supplied; the open note alone does not establish a live defect. |

### Not ranked

- **N-03:** confirm whether `---` is intentional brand copy before changing it.
- **N-04:** obtain the approved Facebook URL, Instagram URL, and contact email before calling the observed destinations broken or replacing them.
- No new layout or typography issue was demonstrated, so neither category has speculative ranking entries.

## Decision outcomes recommended

1. **D5 autohide:** fix.
2. **Sky-token cleanup:** targeted to OperationalStructure only.
3. **AOS:** a GO means apply the completion-rule fix; hold execution until the rule and failing case are concrete.
4. **FAQ radius:** waive the literal rounded-full requirement for the FAQ row trigger; retain the rounded outer card.
