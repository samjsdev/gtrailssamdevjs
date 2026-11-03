# Asset cleanup

The public asset folder is 71% smaller: **116.9 MB → 34.2 MB**, saving 82.7 MB. It contains 204 files, down from 394, after removing unused files and adding optimized replacements.

- Removed 198 unused or redundant files, including unused JPEG/PNG source exports, old stock photographs, unused preview variants and exact duplicate images.
- Moved four original source documents/brand files into `artifacts/source-materials` and three font source/attribution files into `assets/fonts`. These files are retained without being copied into the public deployment.
- Updated image references to use one canonical file for each exact duplicate. Removed the unused stock-image catalog and its library, and deduplicated the source media list.
- Converted enlarged drawings, full-resolution renders, client logos and the office photograph to WebP. All content raster images now use WebP; favicons and the sharing image retain their required formats, and vector drawings remain SVG.
- Preserved the original resolution and every decoded pixel of the four floor plans. PNG icon/social-logo compression also preserves decoded pixels, verified against the originals.
- Small navigation/footer logos now use the existing 128-pixel image. Render popups use the optimized 1920-pixel preview; the full-resolution WebP remains available through the separate link.
- Updated the asset-generation command to use the current branding and avoid recreating legacy assets or conflicting sharing images.

## Verification

The production build and TypeScript checks passed. All 14 routes were checked at desktop and mobile widths, with no broken displayed images or horizontal page overflow. All 116 gallery images and their stable IDs remain. All four enlarged floor plans and four render popups load, and their full-resolution links return HTTP 200.

The final public folder and exported image/font assets contain no byte-identical duplicate files. Removed asset paths are absent from the export. Static image references have no missing targets. Every remaining public asset, the generated sharing image and bundled fonts were checked in ego-browser. The relocated fonts load correctly.

Optimization happens before export, so the standalone site serves compressed local images without needing a runtime image server. Changes are confined to this generated build; templates were not edited.

The complete removal list and measurements are in `manifest.json`. Browser checks, pixel comparisons and screenshots are saved beside this report.

## Follow-up image preservation check

All page images were checked again against the saved files from before cleanup. All 116 gallery images are unchanged, and all 14 pages passed desktop/mobile checks. Three pre-existing decorative SVG rendering errors were also repaired. See `../image-preservation/report.md` for the full comparison and browser results.
