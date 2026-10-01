# Page verification — 1 October 2026

This is the original audit before fixes. See `fixes.md` for the subsequent changes and verification results.

Verified the current MPA build in ego-browser. No website source or template files were changed.

## Result

All 14 routes loaded successfully in the local preview and exported production site. Responsive layout checks passed at 320, 390, 768 and 1440 pixels: 56 page/viewport combinations. No broken page images, uncaught page errors, unexpected horizontal page overflow, missing internal routes, or broken internal anchor targets were found in these checks.

The enquiry dialog has usability and validation issues. The Google Form contains a duplicate email question. The development preview has an image URL conflict; that image works in the exported production site.

## Pages checked

| Page | Route | Responsive layout | Local/production HTTP |
|---|---|---|---|
| Home | `/` | Pass at all four widths | 200 / 200 |
| About | `/about/` | Pass at all four widths | 200 / 200 |
| Services overview | `/services/` | Pass at all four widths | 200 / 200 |
| Architectural design | `/services/architectural-design/` | Pass at all four widths | 200 / 200 |
| Residential construction | `/services/residential-construction/` | Pass at all four widths | 200 / 200 |
| Interior design | `/services/interior-design/` | Pass at all four widths | 200 / 200 |
| Turnkey construction | `/services/turnkey-construction/` | Pass at all four widths | 200 / 200 |
| Design packages | `/design-package/` | Pass at all four widths | 200 / 200 |
| Construction packages | `/construction-package/` | Pass at all four widths | 200 / 200 |
| Project gallery | `/gallery/` | Pass at all four widths | 200 / 200 |
| Contact | `/contact/` | Pass at all four widths | 200 / 200 |
| Privacy policy | `/privacy/` | Pass at all four widths | 200 / 200 |
| Terms of use | `/terms/` | Pass at all four widths | 200 / 200 |
| Brand preview (non-indexed) | `/brand-preview/` | Pass at all four widths | 200 / 200 |

## Findings

1. **Construction enquiry dialog: keyboard and accessible labels need improvement.** On `/construction-package/`, open “Get Detailed Specification”. Pressing Escape leaves the dialog open. Focus remains on the opener when the dialog appears. The dialog has no accessible name, and all five inputs have no associated labels (`labels.length === 0`, no `aria-label` or `aria-labelledby`). The visible Close button works. Use the existing native dialog component or provide focus management, Escape handling, an accessible dialog title, and connected field labels. See `app/(site)/ConstructionPackages.tsx:906` and `:961`.
2. **Construction enquiry accepts invalid mobile numbers.** With a name and plot location filled, entering `abc` in WhatsApp Mobile still makes the form pass browser validation. Add phone validation before preparing the WhatsApp enquiry. Empty required fields correctly block submission. See `app/(site)/ConstructionPackages.tsx:991`.
3. **Development sharing image returns HTTP 500.** `/og-image.png` is provided by both `public/og-image.png` and `app/og-image.png/route.tsx`. Next.js reports a conflicting public file and page. Keep one provider for the URL. The production build succeeds and the exported `/og-image.png` returns HTTP 200 with `image/png`; this failure was observed in the development preview.
4. **Google Form requests email twice.** The embedded and standalone forms both show required “Email” and required “e-mail” fields. Remove the redundant question in the Google Form. This change belongs in the external form configuration.

## Interaction checks

- Mobile navigation opens, closes with Escape, exposes both service and package submenus, and closes after navigating to Projects; page scrolling is restored.
- Desktop service and package menus expose the correct destinations. Selecting Design Packages navigates successfully.
- Home hero previous/next controls change slides. The 2D/3D comparison range works at both endpoints with matching accessible value text.
- Gallery filters display 21 exterior renders, 21 interior renders, 13 completed interiors, 61 portfolio images, and 116 images in All Images. Cards match the displayed counts.
- Gallery image previews load at mobile width and close with Escape.
- Architectural drawing and 3D carousels advance, pause, load full images, and their native viewers close with Escape. Their detail panels render correctly in the viewport; blank portions in offscreen captures were animation timing, not missing content.
- Design package deliverables expand. Construction package expand/collapse controls and the enquiry dialog's visible close button work.
- The Google Form loads in the mobile embed and as a standalone page. The studio map loads. No enquiry was sent.
- `robots.txt`, `sitemap.xml`, the manifest and favicon return HTTP 200. An unknown route returns the expected HTTP 404.

## Build checks and scope

- TypeScript check: passed.
- Production build and static export: passed.
- All 14 exported page routes and the generated sharing image: HTTP 200.
- Tested the current local build and its exported output, not a deployed public domain. Mobile checks used Chromium viewport and touch emulation, not physical iOS/Android devices. External enquiry delivery was not tested by sending a message or form submission.

## Evidence

- [Mobile homepage](home-390-top.png)
- [Small-phone homepage](home-320-top.png)
- [Mobile gallery preview](gallery-modal-mobile.png)
- [Construction enquiry dialog](construction-dialog-mobile.png)
- [Loaded mobile enquiry form](contact-enquiry-mobile.png)
- [Page checks](page-checks.json)
- [Small-phone and tablet checks](narrow-tablet.json)
- [Internal links and resource checks](link-checks.json)
- [Exported production checks](production-checks.json)
- [Construction dialog checks](construction-interactions.json)
