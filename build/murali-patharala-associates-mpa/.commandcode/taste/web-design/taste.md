# Taste

## Web design & UI

- Rejects heavy rounding as "bubbly-consumer"; wants an architectural, sharp-cornered system — big card radii reduced to ~8px (`rounded-lg`), buttons/inputs/tiles ~6px (`rounded-md`), image containers fully square, pill shapes kept only for tiny badges. Confidence: 0.9

- When given a reference site (client points to a competitor/similar business), mirrors its content structure and section flow as inspiration but never clones it outright — omit features the client doesn't actually have (e.g., no android-app badges, no multi-office sections if there's one office) and keep the site's own identity. Confidence: 0.85
- Derives the color palette from client-supplied brand assets (e.g., a photo of their name board) and echoes it thematically across bands, CTAs, and accents — inspired-by, not a literal copy of any single asset. Confidence: 0.75
- Does NOT want complete dark-theme designs — prefers light/warm-white canvases where dark charcoal appears only as anchor elements, with bright hero imagery visible through lightened overlays. Confidence: 0.85
- Expects an explicit visual verification loop during UI work: open the local dev site in the ego browser, screenshot full pages and per-section viewports, analyze what looks wrong, fix, re-screenshot. Stated as "use ego browser for visuals, see page, think, analyse, improve". Confidence: 0.9
- Prefers image-forward, dynamic pages: lots of real images plus motion elements — hero sliders, project carousels, auto-scrolling marquees. Static text-only sections are undesirable. Confidence: 0.85
- Demands clean, symmetric layouts with generous whitespace — no crammed sections stuffed with junk details; copy should be clear, concise, readable. Feature lists get trimmed (e.g., 9 spec rows → 5-6 key checks). Confidence: 0.9
- The design aesthetic must be applied as a whole system (consistent heading treatments, band styles, card language) — not just a few scattered accent colors on an otherwise plain page. Confidence: 0.9
- When told shades/colors are off, doesn't trust eyeballing — programmatically samples exact pixel values from the client's reference asset (crop regions → quantize dominant colors → filter by channel range and average) to derive true brand hexes, iterating on the extraction until measurements are reliable. Confidence: 0.85
- Brand accuracy beats framework defaults: overrides the design system's built-in color ramps in the global theme (e.g., Tailwind `--color-orange-50…950` and warm-neutral stone/zinc steps) with brand-sampled values so utility classes match too — and specifically avoids blue-cast neutrals clashing with warm brand palettes. Confidence: 0.8
- Wants images large and dominant, not trapped small inside padded/chromed cards: widen marquee/carousel card slots, switch thumbnails to taller 4:3 ratios, and strip borders/shadows/rounding from image frames so imagery runs edge-to-edge (hero pushed to ~95vh full-bleed). Confidence: 0.85
