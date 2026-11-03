# Enquiry fixes — 1 October 2026

The Google Form now appears inside all three construction-package enquiry popups and remains on the Contact page. Both locations use the same shared form component and include a link to open the form separately.

The package popup now uses the existing native dialog component. It has an accessible name, moves focus inside on opening, contains keyboard focus, locks background scrolling, restores focus and scrolling on closing, and supports Escape from the popup's own controls. The Close button has a 44 × 44 pixel target and stays visible while scrolling. The dialog appears above the floating WhatsApp button.

The previous custom WhatsApp enquiry form, including its unlabelled fields and unvalidated phone input, has been removed as requested. The Google Form handles enquiry inputs instead. The selected package and instructions to include project details remain visible above it.

Removed the old static `public/og-image.png` that conflicted with the existing generated image route. `/og-image.png` now returns HTTP 200 and `image/png` in both development and production.

## Verification

- Production build and TypeScript checks passed.
- All 14 exported page routes return HTTP 200; the exported sharing image also returns HTTP 200.
- Package popup and Contact page checked at 320, 390, 768 and 1440 pixels. No horizontal page or popup overflow was found.
- All three package buttons open the matching package enquiry. Close, backdrop dismissal, focus return, background scroll restoration and focus containment were exercised.
- The embedded form loads its email, name and message fields. The Submit control and separate-window link are reachable by scrolling. No enquiry was submitted.
- The browser evidence is saved beside this report in `fix-responsive-checks.json`, `fix-contact-checks.json`, `fix-production-checks.json` and the `fixed-*.png` screenshots.
- Only this generated build was changed; no template files were edited.

## Replacement Google Form

The user supplied a replacement form, which is now used in both enquiry locations and their separate-window links: `1FAIpQLSf5Nw637wAR9PPdKnAKgcFdgfmmTaXFDVtUP8WgKSfvf13gEg`. The embed uses the supplied 961-pixel height, with responsive width capped at 640 pixels. The previous form is no longer used by the website.

The replacement shows one Email field, along with Name, Phone number and Address. Google currently requires visitors to sign in before completing this form. No submission or Google Form configuration change was made.

The updated production build, including TypeScript checks, passed. The Contact embed was checked at 320 pixels and the package popup at 320, 390 and 1440 pixels. The correct form URL and separate-window URL are present, with no horizontal page or dialog overflow. New screenshots are saved as `new-form-*.png`.

Escape pressed while focus is inside Google's cross-origin iframe is handled by that iframe and does not reach the outer dialog. The visible sticky Close button and backdrop continue to close the popup; Escape works from the popup's own controls.
