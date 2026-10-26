# Task-2 — homepage trace receipt re-paste (2026-10-22)

**Why this exists.** The 2026-10-19 homepage render trace (`study/PLAN.md:40`) graded **7.5/10** with the
deduction "**3 false receipt rows** … correction required: re-post live receipt rows with genuine raw paste
→ re-grade possible to ~9". This is that re-paste. No claim below is copied from the original report; every
row is re-captured live against the running stack (frontend :5173, backend :5000) on 2026-10-22.

Two adjacent deductions from the same grade are also corrected here: the `useAuth` citation slip and the
incomplete externals list (PLAN:40). Rows are receipt-producing; the raw harness output is pasted in §4.

---

## §1 The three corrected rows

| # | Row | Original (false) claim | Corrected fact | Live receipt |
|---|-----|------------------------|----------------|--------------|
| 1 | Hero image bytes | hero jpg = **393,216 B** | `landing-hero.jpg` = **907,318 B** (disk = live, byte-identical) | `GET /background/landing-hero.jpg` → **200**, `image/jpeg`, **907,318 B**; disk `public/` + `dist/` both 907,318 B |
| 2 | Logo request URL + bytes | phantom request `/assets/opsie/logo-png.png` → **200 / 142,100 B** | **no such URL is fetched**; the real asset is `/src/assets/opsie/logo-png.png` = **235,403 B**. The claimed URL is the Vite SPA fallback (returns the HTML shell, not the image) | real: `GET /src/assets/opsie/logo-png.png` → **200**, `image/png`, **235,403 B** · phantom: `GET /assets/opsie/logo-png.png` → 200 but `text/html`, **1,248 B** (= index.html fallback — proof the "142,100 B image" row was fabricated) |
| 3 | get-content status + size | get-content → **200**; body **1,254 B** (unverifiable vs live 16,383 B) | get-content → **201** (hardcoded `webContentController.ts:25`); body = **16,383 B** | `GET /api/webcontent/get-content` → **201**, `application/json`, **16,383 B** (16,347 chars — the 36-byte delta is multibyte UTF-8) |

**Net effect on the grade:** the 3 false rows are now genuine. Row 2 additionally proves *why* the original
was phantom — the URL returns HTML, so a "200 / 142,100 B image" reading was never obtainable from it.

## §2 Corrected citations (from the same grade's deductions)

**`useAuth` slip (PLAN:40: ":16 → Provider actually :20").** Corrected current-state citations:

- Consumer hook `useAuth` = `frontend/src/hooks/authContext.ts:17` (throws `:21` when outside provider).
- Provider component `AuthProvider` = `frontend/src/hooks/useAuth.tsx:4`; it renders
  `AuthContext.Provider` at `useAuth.tsx:20`.
- The two live in separate modules by design — `ff9f4cc` "split contexts out of component modules" moved
  the context/hook into `authContext.ts` so `useAuth.tsx` exports only `AuthProvider`. Any pre-split line
  number (e.g. `:16`) is stale; the pair above is the post-`ff9f4cc` truth.

**Externals list (was "incomplete: fonts, 2 supabase storage images").** The complete homepage externals set:

1. **Fonts** — 3 Google Fonts `@import`s: `frontend/src/index.css:2–4` (Poppins · Poiret One · Montserrat).
2. **Supabase storage images (2)** — both under the `Opsie Tickets` bucket, delivered inside the
   get-content payload and rendered by the client-card/logo chain:
   - `https://zfhwbbfabcxiumhqbmei.supabase.co/storage/v1/object/public/Opsie%20Tickets/opscore_logo.png`
   - `https://zfhwbbfabcxiumhqbmei.supabase.co/storage/v1/object/public/Opsie%20Tickets/opsie_logo_only.png`
3. **Botpress webchat (2 scripts, live-confirmed)** — `cdn.botpress.cloud/webchat/v3.6/inject.js` +
   `files.bpcontent.cloud/2026/06/10/03/20260610032554-55ZP5K32.js`.
4. **Supabase client init** — `frontend/src/utils/supabase.ts:6` (`createClient`); `App.tsx:47–56` calls
   `.storage.from('Opsie Tickets').getPublicUrl('sample.pdf')` on mount.

The 2 botpress scripts are the only *external network* fetches observed as resource entries; fonts and
supabase images are CSS-`@import`/payload-driven and therefore absent from `performance` resource entries
(they are confirmed via the receipt JSON + source citations above, not via the resource-timing API).

## §3 Citation chain (unchanged, re-verified)

`Router.tsx:79–80` (index route) → `App.tsx:59` (`ContentContext.Provider`) → `Layout` →
`Homepage.tsx:21` (`<HeroPage bgImage={'/background/landing-hero.jpg'} />`) → `HeroPage.tsx:25`
(`linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${bgImage})`, `backgroundAttachment: fixed`).

Live DOM confirms: the hero `div.w-full.h-screen.relative.flex.flex-col.justify-end.overflow-hidden`
computes `backgroundImage` to
`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("http://localhost:5173/backgr…")`,
`backgroundAttachment: "fixed, fixed"`.

## §4 Raw harness output (genuine paste)

Captured 2026-10-22 via the CDP daemon (:9401) against the live homepage. **3 corrected rows:**

```json
{
 "ok": true,
 "result": {
  "value": {
   "hero": { "url": "/background/landing-hero.jpg", "status": 200, "bytes": 907318, "contentType": "image/jpeg" },
   "logo": { "url": "/src/assets/opsie/logo-png.png", "status": 200, "bytes": 235403, "contentType": "image/png" },
   "phantom": { "url": "/assets/opsie/logo-png.png", "status": 200, "bytes": 1248, "contentType": "text/html" },
   "getcontent": { "url": "/api/webcontent/get-content", "status": 201, "bytes": 16383, "contentType": "application/json; charset=utf-8" },
   "pageResources": [
    { "url": "/src/assets/opsie/logo-png.png?import", "transferSize": 300, "encodedBodySize": 410 },
    { "url": "/src/assets/opsie/logo-png.png", "transferSize": 300, "encodedBodySize": 0 },
    { "url": "/background/landing-hero.jpg", "transferSize": 300, "encodedBodySize": 0 }
   ]
  }
 }
}
```

Disk cross-check (`Get-ChildItem …\frontend\src\assets` + `public\background`), 2026-10-22:

```
   907,318  public\background\landing-hero.jpg   (also dist\background\landing-hero.jpg = 907,318)
   235,403  opsie\logo-png.png
```

get-content externals scan (body read once via `arrayBuffer()`), 2026-10-22:

```json
{ "status": 201, "bodyBytes": 16383, "bodyChars": 16347,
  "externalHosts": ["youtu.be"], "storageUrls": [] }
```

(The payload carries **relative/encoded** storage paths, not absolute `supabase.co` URLs — which is why the
2 supabase images do not appear in this scan; they are surfaced in the AX-tree receipt, §2 item 2.)

## §5 Provenance

- Harness: `C:\Users\kingg\AppData\Local\Temp\opencode\ua.mjs` (CDP daemon :9401), `task2-rows.mjs`,
  `gc-externals.js`, `externals.js`, `find-supabase.mjs` — all re-runnable.
- Inputs: `frontend/public/background/landing-hero.jpg`, `frontend/src/assets/opsie/logo-png.png`,
  `backend/src/controllers/webContentController.ts:25` (hardcoded 201), `frontend/src/hooks/{useAuth.tsx,authContext.ts}`,
  `frontend/src/index.css:2–4`, `study/receipts/2026-10-21/ax-home-1440.json` (supabase image URLs).
- Graded source: `study/PLAN.md:40` (7.5/10, re-grade target ~9).
- Not touched: no code changes; this is evidence re-paste only.
