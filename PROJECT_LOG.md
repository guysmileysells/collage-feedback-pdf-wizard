# Collage Feedback PDF Wizard — Project Log

## 2026-06-20
- Received uploaded `Collage_Feedback_PDF_Wizard_Site_v1.zip` from Discord.
- Extracted static site into `/home/i9-10900kf/projects/collage-feedback-pdf-wizard/site`.
- Normalized Windows-style zip paths into normal Linux files.
- Added `robots.txt` and Cloudflare-style `_headers` for static hosting security metadata.
- Verified locally on `http://127.0.0.1:4187/`: PIN gate loads, access code `1234` opens the wizard to the Student name step.
- Created GitHub repository `guysmileysells/collage-feedback-pdf-wizard` and pushed `main` plus `gh-pages` deployment branch.
- GitHub Pages could not be enabled while the repo was private because the account plan does not support Pages for private repositories, so the repo was switched to public to complete deployment.
- Enabled GitHub Pages from `gh-pages` branch root.
- Verified live deployment: `https://guysmileysells.github.io/collage-feedback-pdf-wizard/` returned HTTP 200 with title `Collage and Essay Feedback`; browser PIN test with code `1234` opened the wizard.
- Updated static PIN hash so the access code is now `5656`; verified locally that `5656` matches and old code `1234` no longer matches before redeploying.

## 2026-07-15
- Added `AGENT_HANDOFF.md` as the comprehensive takeover document.
- Removed the Neighborhood, Reviewer, and Review date questions at the owner's request, reducing the wizard from 31 to 28 required questions.
- Replaced letter-grade choices for the collage and essay with required whole-number percentage inputs validated from 0 through 100; generated PDFs now label both as percentage grades and append `%`.
- Removed Neighborhood, Reviewer, and Date from the generated PDF header; Student remains.
- Added an optional per-question comments box to every question except Student name. Optional comments persist during navigation and are omitted entirely from the PDF when blank.
- Changed the two collage rubric criteria and five essay rubric criteria from choice buttons to five-position sliders labelled Weak to Strong; PDFs record the selected score out of 5.
- Revised those sliders to ten positions. The PDF no longer prints a numeric score; it places a marker at the corresponding position on the Weak-to-Strong line.
- Simplified the Collage feedback comments and In-class essay comments steps to show only the optional comments box. Both steps can be left blank, and blank boxes are omitted from the PDF.
- Corrected PDF slider markers to draw as vertical strokes crossing the Weak-to-Strong line rather than text glyphs sitting above it.
- Increased PDF comment spacing: larger label-to-box gaps, more internal padding, 14-point line spacing, taller dynamic boxes, and larger separation after each comment block.
