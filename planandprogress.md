# Plan & Progress

> Repo-level progress tracker. Keep updated during long tasks so crashed/interrupted requests can resume without rediscovering state.
> Last updated: 2026-08-26 ~23:30 (session after crash)

## Project context (from repo laws)
- `/build/*` is GENERATED from templates (`app/designwebsite/template*/`) + client data. Never bleed changes between templates and builds.
- Typecheck status: `npx tsc --noEmit` passes as of this session start.

## State recovered after crash (2026-08-26)

### Untracked / new work found
- New templates created 2026-08-26: `app/designwebsite/template11`, `template12`, `template13`, `template14`, `template17`
- Also newer: `app/designwebsite/template5`, `build/jayams-interior-decorators/`, `build/murali-patharala-associates-mpa/`, `data/knk-structures-and-designs/`, `lib/architectureContent.ts`, `public/images/architecture/`, `scripts/convert-ai-images.mjs`, `scripts/download-architecture-stock.mjs`

### Modified files (uncommitted)
- template10 `[slug]`: ClientNavbar, CostCalculator, about, contact, gallery, layout, page, services
- `app/preview/[slug]/page.tsx`, `app/private/admin/edit/[slug]/page.tsx` + `schemas.ts`
- `data/murali-patharala-associates-mpa/source.json`, `lib/websiteBuild.ts`, `proxy.ts`
- `scripts/deploy_build.js`, `export_standalone.js`, `generate_template_schemas.js`

### Registration status found
- `lib/websiteBuild.ts` REQUIRED_TEMPLATE_IDS: template1-7, template10 (no 11-17 yet)
- `scripts/generate_template_schemas.js` ACTIVE_TEMPLATES: 1-8, 10 (no 11-17 yet)
- `app/private/admin/edit/[slug]/schemas.ts`: only up to template5 schema block visible
- `app/preview/[slug]/page.tsx`: HAS ids template11, 12, 13, 14, 17

## Current task (this session): fix templates ONE BY ONE — start with template11

User feedback on template11:
1. Lots of leftover "interior design" remnant copy/content (template should not read like an interiors site)
2. Calculator (ScopeEstimator) UI is bad — needs redesign

### TODO checklist
- [x] Recover crash state, create planandprogress.md
- [x] Audit template11 for interior-design remnants (page.tsx, layout, PageNarrative, ClientHeader, LeadForm, subpages)
- [x] Remove/replace interior copy with correct theme content
- [x] Redesign ScopeEstimator calculator UI
- [x] Typecheck + preview render check
- [ ] THEN move to next template (12 → 13 → 14 → 17), updating this file per template

## TEMPLATE 11 — DONE (2026-08-26 ~00:05)

### Interior remnants fixed
- about/page.tsx: removed "storage behind seamless panelling / atelier / tactile permanence" → RCC/IS-code construction copy; "sanctuary" → "dream home"; "spatial consultation" → "plot consultation"; "The Studio"/"Studio Evolution"/"Studio Leadership" → "The Practice"/"Practice Evolution"/"Leadership"; design-studio fallbacks → "architecture & construction practice"; alt "Precision woodworking" → "Structural engineering"
- gallery/page.tsx: category "Structural & Interiors" → "Construction Stages"; "Aesthetic Directions" → "Building Styles We Deliver"; "curated portfolio...spatial planning" → plain engineering copy; "Enquire for Similar Space" → "Enquire for a Similar Home"; swapped interior image living-room-double-height → structural-construction-frame
- services/page.tsx: fallback image modular-kitchen-luxury → structural-construction-frame
- page.tsx: "the atelier" LeadForm fallback → "our architects"; "at our studio" FAQ → "at our office"; studio alts → home/project alts
- ClientHeader.tsx: fallback "Design Studio" → "Architects & Builders"
- layout.tsx: waText "at your studio" → "with your architects"; footer "Studio" → "Architects & Builders"
- LeadForm.tsx: "Dr. Vikramaditya Chandran" placeholder (doctor-era) → "Ramesh Kumar"; "WhatsApp our studio" → "our office"

### ScopeEstimator rewrite
- Old: opaque multipliers (0.18/0.68/1.0 × basePrice), confusing CONFIGS with hardcoded sqft strings, cramped 2-grid + output strip, tier names truncated
- New: 3-step flow (home type cards w/ check indicators → area slider 600–10000 sq.ft → work-scope rows w/ per-sq.ft rates), sticky live summary panel (₹L range, timeline, warranty, rate basis), rates align with services page (~₹2,350/sq.ft turnkey)
- Verified: typecheck clean; page 200 on all 5 routes; interactions update summary live (screenshot confirmed); remaining "interior" strings on rendered page come from client source.json (KNK data), not template

### NOTE for next templates
- `previewMedia` import from `@/lib/interiorContent` is FINE (media helper, not copy)
- Check rendered page vs source.json before editing: client data (tagline/desc/services) intentionally overrides template fallbacks

## TEMPLATE 12 — DONE (2026-08-27 ~00:20)

Theme: sustainable/green architecture (green #0e5a43, orange #f2a007, Bricolage font, rounded cards)

### Interior remnants fixed
- contact/page.tsx: "60-Min Atelier Consultation" → "60-Min Architect Consultation"; "Visit the Atelier" → "Visit Our Office"; "Atelier Hours" → "Office Hours"; waText "your atelier" → "your architects"; LeadForm "the studio" → "our architects"; map title "our studio" → "our office"
- PageNarrative.tsx: "The Atelier Standard" → "Our Build Standard"; "Tactile Generational Permanence" card → "Materials Built for Generations"; footer "Our studio" → "Our practice"
- gallery/page.tsx: "Structural & Interiors" cat → "Construction Stages"; ROOM_SPOTLIGHTS → PROJECT_SPOTLIGHTS; interior fallback img → structural-construction-frame; "smart storage... climate-responsive aesthetics" → engineering copy; "our studio" mark → "our practice"
- about/page.tsx: "About the Atelier" → "About Our Practice"; "the atelier" mark → "our practice"; "visionary spatial morphology" → "thoughtful architectural design"; "Studio Founded" → "Practice Founded"; studio alts fixed
- page.tsx: "modern interiors" pillar → "bright, well-ventilated rooms"; "Atelier Guarantee" → "Our Guarantee"; "design-build atelier" → "design-build practice"; "at our studio" → "at our office"; "Architectural Studio" → "Architects & Builders"; studio alts fixed; LeadForm fallback fixed
- layout.tsx: "Architectural Atelier" → "Architects & Builders"

### Estimator rewrite + MOUNTED
- IMPORTANT: template12's Estimator existed but was NEVER imported/rendered — home #estimator section had a plain request form instead
- Rewrote Estimator in t12 design language (same 3-step + live summary structure as t11: home type cards → area slider → work scope rows w/ per-sq.ft rates; dark-green summary panel, orange CTA)
- Mounted into home page #estimator section (replacing the plain form), wrapped in #faf7f1 rounded card
- NOTE: old form had #a58150 focus color (t11 brown, wrong theme) — replaced entirely
- Verified: tsc clean, all 5 routes 200, interaction updates summary (₹30L–₹38L duplex shell), screenshots saved

## NEXT: template13 audit (has BeforeAfter.tsx component)

### Notes
- t11 mtime clues: page.tsx 23:14, layout/PageNarrative/ClientHeader 23:16, LeadForm 20:52 — was being edited at crash time (~23:16)
