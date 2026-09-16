# GTrails — Quick Context

> What this repo is, how it fits together, and the rules to follow. Written for fast onboarding (human or agent).

## 1. What Is This?

**GTrails is a "website factory"** for an interior-design/architecture web agency. It turns a Google Business Profile (Google Maps) URL into a finished, static client website:

1. **Intake** — admin pastes a Google Maps URL; a Playwright scraper extracts business name, address, phone, rating, reviews, and images.
2. **Data** — stored as `data/{slug}/source.json` (primary, git-committed) with a mirror in **Appwrite** (`gtrails.scraped_data`, doc ID = MD5 of slug).
3. **Edit & Personalize** — password-gated admin UI corrects/overrides all content, including per-template overrides (`templateOverrides` in `source.json`, deep-merged at render time).
4. **Preview** — admin picks from ~13 website templates rendered live with the client's data.
5. **Publish** — chosen template + client data are exported into a **standalone, independently buildable Next.js project under `/build/{slug}`** (static export, all images local, zero DB dependencies).

Current branch: `personalization` — re-theming new templates (11–14, 17) from interior-design copy to architecture/construction copy. See `planandprogress.md` for session tracking.

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16.2.3** (App Router), React 19.2.4, TypeScript 5 |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`, `postcss-nested`) |
| Scraping | **Playwright** (Chromium), Google Maps DOM traversal |
| Primary data | Local JSON: `data/{slug}/source.json` |
| Backup DB / Storage | **Appwrite** (project `6a1cf32a002c668912cc` @ `sgp.cloud.appwrite.io`) |
| Legacy (disabled) | **Supabase** (`@supabase/supabase-js`, `setup_supabase.sql`) — commented out |
| Images | `sharp` (processing/webp), Google photo URL promotion (thumb → w2048) |
| Animation | GSAP, `lenis`, `@gsap/react` |
| Hosting | Vercel (app only; `.vercelignore` excludes `/build`) |

⚠️ **Next.js 16 warning** (AGENTS.md): "This is NOT the Next.js you know" — read `node_modules/next/dist/docs/` before writing code. Notably, middleware is **`proxy.ts`** (exports a `proxy()` function), not `middleware.ts`.

## 3. Directory Map

```
gtrails/
├── app/
│   ├── page.tsx                  # redirects / → /private/admin
│   ├── api/
│   │   ├── intake/route.ts       # POST: GBP URL → Playwright scrape → data/[slug]/source.json (+Appwrite)
│   │   ├── intake/images/route.ts# image scraping phase
│   │   ├── data/route.ts         # GET/PUT/DELETE client JSON (+Appwrite sync; ?refresh=1 restores from Appwrite)
│   │   ├── generate/route.ts     # POST: persist sourceData
│   │   ├── media/route.ts        # GET image: data/[slug]/images first, Appwrite bucket fallback
│   │   ├── publish/route.ts      # POST: set selected_template → export_standalone.js → build/[slug]
│   │   ├── unpublish/route.ts    # POST: clear selected_template + rm -rf build/[slug]
│   │   └── admin/login|logout/   # password auth → gtrails_admin cookie
│   ├── designwebsite/            # ★ THE TEMPLATE LIBRARY (T1–8, T10–14, T17; no 9/15/16)
│   │   └── README.md, agentguide.md  # isolation rules + template contract
│   ├── website/[slug]/[[...segments]]/route.ts  # serves legacy builds in data/[slug]/website/
│   ├── preview/[slug]/page.tsx   # template chooser + Publish/Unpublish buttons
│   └── private/                  # password-gated admin
│       ├── login/page.tsx
│       ├── admin/page.tsx        # URL intake form
│       ├── admin/dashboard/      # "Essential Lead Sites" client list
│       └── admin/edit/[slug]/    # schema-driven JSON editor (+ generated schemas.ts)
├── build/                        # ★ GENERATED OUTPUT: one standalone Next.js project per published client
├── data/                         # ★ 46 client folders: source.json (tracked) + images/ (gitignored)
├── components/                   # shared UI: CountUp, ReviewsSlider, Sidebar, SmoothScrollProvider, DeleteSiteButton
├── lib/
│   ├── scraper.ts                # ~1200-line Playwright Google Maps scraper
│   ├── dataBuilder.ts            # JSON read/write + Appwrite dual-write + slug safety + overrides merge
│   ├── appwrite.ts               # Appwrite client (key from APPWgtrailskey)
│   ├── supabase.ts               # legacy (disabled)
│   ├── adminAuth.ts              # PASSWORD env → sha256 session cookie
│   ├── websiteBuild.ts           # exportStandaloneProject() wrapper; REQUIRED_TEMPLATE_IDS = 1–7,10
│   ├── imageProcessor.ts         # sharp + Google photo hi-res promotion + Appwrite upload
│   ├── interiorContent.ts        # interior default copy + stock (INTERIOR_STOCK, previewMedia())
│   ├── architectureContent.ts    # architecture stock + defaults (new templates)
│   └── copyCleaner.ts            # strips SEO suffixes/boilerplate from scraped text
├── scripts/
│   ├── export_standalone.js      # ★ THE build generator (templates + data → build/[slug])
│   ├── deploy_build.js           # legacy: .next HTML → data/[slug]/website/ + Appwrite CDN
│   ├── prebuild_sync_clients.js  # npm build hook: Appwrite → local JSON refresh
│   ├── sync_clients_to_json.js   # Appwrite → data restore
│   ├── push_json_to_appwrite.js  # local JSON → Appwrite backup
│   ├── generate_template_schemas.js # Playwright DOM-matching → generates admin editor schemas.ts
│   ├── audit_templates.js        # lints templates for hardcoded copy/Unsplash URLs
│   └── download-stock-images.mjs, download-architecture-stock.mjs, convert-ai-images.mjs
├── proxy.ts                      # Next 16 middleware: gates /private/* and mutating APIs
├── template.md                   # template authoring contract
├── planandprogress.md            # session/progress tracker
└── (root one-off scripts — see §7)
```

## 4. Routes

| Route | Purpose |
|---|---|
| `/` | redirect → `/private/admin` |
| `/private/login` | password sign-in |
| `/private/admin` | intake form (paste Google Maps URL) |
| `/private/admin/dashboard` | client list (from local JSON) |
| `/private/admin/edit/[slug]` | schema-driven editor; base vs per-template `templateOverrides` scopes |
| `/preview/[slug]` | template gallery + Confirm & Publish / Unpublish |
| `/designwebsite/template{N}/[slug]` (+ about/services/gallery/contact) | the templates themselves |
| `/website/[slug]/[[...segments]]` | serves packaged legacy builds (path-traversal guarded) |
| `/api/*` | see directory map above |

## 5. The Core Architecture: Templates → Builds

**`/build` is generated output.** Publishing flow (`/api/publish` → `lib/websiteBuild.ts` → `scripts/export_standalone.js`):

1. Validates `templateId` against `ACTIVE_TEMPLATES` (see gotcha §8.2).
2. Reads `data/{slug}/source.json`, injects `selected_template`.
3. **Downloads every image** into `build/{slug}/public/images/`, rewrites all URLs to `/images/...`.
4. **Copies + regex-transforms template source** from `app/designwebsite/{templateId}/[slug]/`:
   - swaps `@/lib/dataBuilder` → local `lib/sourceData.ts` (root `source.json`, no slug, no DB)
   - deletes Appwrite imports and `generateStaticParams`
   - rewrites `basePath = /designwebsite/templateX/${slug}` → `''`
5. Writes fresh `package.json`, `next.config.ts` (`output: 'export'`), `tsconfig.json`, `app/(site)/` structure.
6. Result: `build/{slug}` — fully independent: `cd build/{slug} && npm install && npm run build` → static `out/`.

**Legacy path** (`npm run build:deploy` → `scripts/deploy_build.js`): after `next build`, lifts pre-rendered HTML, rewrites asset/API URLs to relative paths, packages into `data/[slug]/website/{templateId}/`, uploads to Appwrite `templates` bucket (CDN). Served by `app/website/...` route. README documents this; current publishing uses the standalone exporter instead.

### ⚖️ THE ISOLATION LAW (AGENTS.md, CLAUDE.md, agentguide.md)
- `/build` = templates + client data, generated only.
- **No reverse dependency** between templates and builds after generation.
- **Template changes MUST NOT affect builds; build changes MUST NOT affect templates.** Builds are frozen snapshots — to update a live client site, re-run publish/export. Never hand-edit a build expecting template sync (or vice versa).

## 6. Data Flow

```
Lead sources: "Scraped Data*.csv" (url.js parser) OR admin pastes GBP URL
        │
        ▼
POST /api/intake ──► lib/scraper.ts (Playwright: name, address, phone,
        │            rating, reviews, map embed, photo URL promotion)
        ▼
data/{slug}/source.json ◄──dual-write──► Appwrite gtrails.scraped_data (MD5 doc id)
  + data/{slug}/images/  ◄────────────► Appwrite scraped_images bucket
        │        (served via /api/media?slug=&file= — local first, Appwrite fallback)
        ▼
Admin edits: /private/admin/edit/[slug] ──PUT /api/data──► JSON + Appwrite
  (edits land in base data or data.templateOverrides[templateId])
        │
        ▼
Preview: /preview/[slug] — readSourceConfig deep-merges overrides;
  previewMedia() swaps client media → stock imagery (previews only)
        │  "Confirm & Publish"
        ▼
POST /api/publish ──► persist selected_template ──► scripts/export_standalone.js
        │
        ▼
build/{slug}/  (standalone static-export Next.js project)
        ▼
Static hosting (out/). Legacy alt: data/[slug]/website/ + Appwrite CDN.
```

**Reads are always JSON-first.** Appwrite is backup only — but `persistSourceConfig` dual-writes and *fails if either side fails*. `?refresh=1` / `sync_clients_to_json.js` / `prebuild_sync_clients.js` (runs before every `npm run build`) restore from backup.

## 7. Root One-Off Scripts (disposable experiments)

| File | Purpose |
|---|---|
| `download_hero_webp.js`, `download_hero_webp2.js` | Unsplash → sharp webp → `public/images/template8/hero-pool/` |
| `fix-paths.js` | regex fix of numeric path segments in `schemas.ts` |
| `patch.js` | one-off patch for `template7/.../Hero.tsx` |
| `patch_schemas.js`, `patch_t1_schema.js`, `patch_t2_schema.js`, `update_t1_schema.js`, `scripts/fix_schema*.js` | codemods maintaining admin editor schema blocks |
| `screenshot.js` | Playwright screenshots of a running preview |
| `url.js` / `url.md` | RFC-4180 CSV parser for the root `Scraped Data*.csv` (Google Maps lead export) / deployed template4 URLs |
| `fix_scraper.js` | codemod that loosened matching in `generate_template_schemas.js` |
| `test_scraper_debug.js`, `test_getid.js`, `test_promote.js` | scraper experiments |
| `test-carousel.js` | records template7 hero carousel video into `videos/` |
| `step94.json` | exported AI planner step (carousel animation artifact) |

## 8. Conventions & Gotchas

1. **Isolation law is the big one.** Never bleed changes between `app/designwebsite/` and `/build`. Builds are frozen exports; regenerate via publish.
2. **Template registration mismatch (live gotcha):** `export_standalone.js` / `lib/websiteBuild.ts` only accept **template1–7 + template10**, but `/preview/[slug]` offers T8, T11–T14, T17 — publishing those fails with "Invalid template ID" until registered. This is exactly the in-progress work on the `personalization` branch (`planandprogress.md`).
3. **Two build pipelines coexist:** standalone exporter (`build/{slug}`) vs legacy HTML-rewrite+Appwrite-CDN (`data/[slug]/website/`). README documents the legacy path prominently.
4. **Previews show stock imagery, builds show real images** — `readSourceConfig` swaps media via `previewMedia()` for template previews only.
5. **Git/data policy:** `data/**/source.json` tracked; `data/**/images/` and build `.next`/`out` ignored; `.vercelignore` excludes `/build` entirely.
6. **Secrets hygiene:** `.env` (gitignored, present locally) holds Appwrite credentials and `PASSWORD=TEST123` — rotate before any real deploy. The Appwrite key env var is oddly named: **`APPWgtrailskey`**.
7. **Docs drift:** `template.md` still says images are on Supabase storage (now Appwrite); Supabase code/SQL remains but is disabled.
8. **Next.js 16:** middleware is `proxy.ts`; check `node_modules/next/dist/docs/` before assuming APIs.
9. **Slug safety everywhere:** `assertSafeSlug` guards path traversal; Appwrite doc IDs are MD5 of slug.
10. **Canonical template example:** `app/designwebsite/template1/[slug]/page.tsx` — shows `readSourceConfig` + `copyCleaner` + `interiorContent` defaults + local components.
11. **Template authoring contract (`template.md`):** never hardcode client copy; use the documented data paths and image fallback pattern.

## 9. Auth, Env & External Services

**Auth:** single shared admin password. Set `PASSWORD`; sign in at `/private/login`; 7-day httpOnly cookie `gtrails_admin` holding `sha256("gtrails:<password>")`. `proxy.ts` blocks unauthenticated access to `/private/*` and mutating APIs (503 if `PASSWORD` unset). No per-user accounts.

| Env var | Role |
|---|---|
| `PASSWORD` | admin password |
| `APPWgtrailskey` | Appwrite API key (server-side; nonstandard name) |
| `NEXT_PUBLIC_APPWRITE_ENDPOINT/PROJECT_ID/PROJECT_NAME` | Appwrite config (also hardcoded as fallbacks) |
| `GOOGLE_MAPS_STORAGE_STATE_PATH`, `GOOGLE_MAPS_HEADLESS` | optional scraper knobs |
| `APPWRITE_API_KEY` | only for provisioning via `scripts/setup_appwrite.js` |
| `SB_ANONKEY`/`SB_SERVICEROLEKEY`/`SB_PUBLICKEY` | legacy Supabase — disabled |

**External services:** Google Maps (scrape target) · Appwrite SGP (DB `gtrails`, buckets `scraped_images` + `templates`) · Unsplash (stock fallbacks) · Vercel (app hosting) · Supabase (defunct).

## 10. Template Inventory

| ID | Name |
|---|---|
| T1 | Modern Studio (Editorial & Elegant) |
| T2 | Calm Home |
| T3 | Luxe Interiors |
| T4 | Precision Studio |
| T5 | Architecture & Turnkey Civil |
| T6 | Neo-Brutalist Flow |
| T7 | Lumina Interior (richest: team, appointment, context/, lib/) |
| T8 | Property Match (Real Estate) |
| T10 | Industrial Architecture & Construction |
| T11 | Architectural Atelier |
| T12 | Organic Architecture & Villas |
| T13 | Monolithic Luxury |
| T14 | Curated Architectural Monograph |
| T17 | Civic & Residential Architecture (BIM & Civil Turnkey; ThemeContext, Preloader, CostEstimator) |

*(No T9, T15, T16 exist.)*

Standard template skeleton at `app/designwebsite/templateN/[slug]/`: `page.tsx` (home), `about/`, `services/`, `gallery/`, `contact/`, plus shared components (`ClientHeader`, `LeadForm`, `FAQAccordion`, `HeroStats`, `PageNarrative`, `ScopeEstimator`, `Reveal`).
