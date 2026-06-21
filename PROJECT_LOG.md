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
