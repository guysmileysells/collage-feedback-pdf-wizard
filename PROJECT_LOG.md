# Collage Feedback PDF Wizard — Project Log

## 2026-10-02 — PSCI 240 in-class essay form
- Added a separate PSCI 240 form at `site/psci240/` without changing the PSCI 252 collage-and-essay workflow.
- Derived the PSCI 240 rubric from three instructor-supplied marking corpora (Summer 2024, Winter 2025, and Fall 2025): thesis presence/quality, structured introduction, theorist interpretation, content of argument, argument structure/writing, direct-quotation requirements and quality, structured conclusion, percentage grade, and overall comments.
- Added 14 steps: student name; thesis-present choice; seven 10-point Weak–Strong rubric sliders; three quotation/citation requirement choices; percentage grade; and optional overall comments.
- Added an editable PSCI 240 comments bank organized into thesis, introduction, theorist interpretation, argument, structure/writing, quotations/citations, conclusion, and overall feedback. The language reflects recurring instructor comments but remains editable and does not automate substantive evaluation.
- Preserved the guarded mechanical copy-edit workflow, dynamic PDF comment boxes, PDF preview/download, optional per-item comments, and one-click blank reset.
- Added focused source tests in `tests/test_psci240_requirements.py` and JavaScript syntax checks.

## 2026-07-26
- Recovered `Khushi_Feedback.pdf` after pages 1, 2, and 4 printed blank. The source contained all four pages' text but MuPDF reported a malformed page tree (`too many kids in page tree`). Rebuilt a clean four-page page tree without changing extracted text and saved `C:\Users\I9-10900KF\Documents\Khushi_Feedback_Repaired.pdf` plus a plain-text recovery copy. This establishes a remaining generator/printing compatibility risk requiring a source-level PDF-structure fix.
- Narrowed the optional AI feature to mechanical copy editing only. The Worker now permits corrections to spelling, grammar, punctuation, capitalization, and obvious sentence-level clarity while explicitly prohibiting new feedback, examples, praise, criticism, recommendations, explanations, meaning changes, or substantive removal. The interface now says “Copy edit” and explains this limitation before use.
- Added an optional “Tell the copy editor what to preserve or avoid” field that persists while the current form is open and is sent only with the selected comment. Added server-side scope checks that refuse to show copy edits which expand substantially, change paragraph count, alter the number of questions, or produce disproportionate word-count changes. A rejected rewrite leaves the original untouched and asks the reviewer to add guidance and retry.
- Upgraded copy editing from the 3B model to Cloudflare's catalogued `@cf/meta/llama-3.3-70b-instruct-fp8-fast` model for stronger instruction adherence, while retaining deterministic scope checks as the final safety gate.

## 2026-07-24
- Integrated the instructor-approved constructive comments bank into the existing wizard as `site/comments-bank.js`.
- Added question-specific **Comments bank** dropdowns beside the editable optional-comments box. Selecting an item inserts it immediately; selecting additional items appends them with paragraph spacing, and the resulting text remains fully editable.
- Organized 165 reusable comments into nine rubric categories: required elements, collage storytelling, collage design, thesis, introduction/conclusion, reading interpretation, citations, analysis, and overall feedback.
- Required-element questions show concise general feedback plus comments specific to the requirement where available. Collage and essay summary-comment steps expose the full relevant category sets.
- Added focused automated coverage for the comments-bank asset, category/key mapping, grouped dropdown rendering, insertion/appending behavior, and editable textarea requirement.
- Added an 18-point blank line between every rubric prompt and its Weak-to-Strong scale, including the long “Collage conveys…” prompt.
- Fixed comment-box sizing to calculate height from the exact same wrapped lines used for rendering, including paragraph breaks. Long comments such as “Quality of Design Work” now remain inside their borders; overall collage and essay comment boxes also expand as needed.
- Added 18 points of blank space before both collage and essay percentage grades. A short-lived horizontal grade rule was removed after instructor review; no extra line is drawn.
- Increased PDF comment wrapping from 86 to 102 characters per line so feedback uses nearly the full width of each bordered box while retaining inner padding and automatic height expansion.
- Removed the “Overview of neighborhood” checklist question while retaining the “Required elements” section heading. “The feel of the neighbourhood” is now the first required-elements question.
- Added a “New blank form” button to the completed-PDF page. It reloads the unlocked app with empty in-memory answers and comments so feedback for the next student can begin immediately.

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

## 2026-07-16
- Added opt-in AI copy-edit controls to every optional comment textarea. The browser sends only the selected comment, caps it at 3,000 characters, times out after 12 seconds, and keeps the original unchanged until the reviewer explicitly accepts a displayed suggestion.
- Added a plain-language privacy notice warning reviewers not to enter names or identifying information into comments sent for copy-editing.
- Added a Cloudflare Worker at `worker/src/index.js` with only `POST /copy-edit` (plus CORS preflight), exact JSON-shape validation, strict production/localhost origin checks, generic errors, no logging, security headers, Workers AI via `@cf/meta/llama-3.2-3b-instruct`, and a native free-compatible rate-limit binding (10 requests/minute/IP).
- Added `wrangler.toml`, dependency-free Node Worker tests, and frontend/config source-presence tests.
- Connected the free Cloudflare account, registered the `guysmileysells.workers.dev` subdomain, and deployed `collage-feedback-copy-edit` with Workers AI and the native 10-requests-per-minute/IP rate-limit binding.
- Replaced the unavailable initial model identifier with the current lightweight `@cf/meta/llama-3.2-3b-instruct`, then live-verified the browser-to-Worker-to-AI path: a real suggestion appeared beside the unchanged original and was applied only after explicit acceptance.
- Deployed the AI-enabled frontend to GitHub Pages and verified the complete public path at `https://guysmileysells.github.io/collage-feedback-pdf-wizard/`: the PIN unlocked the 28-question wizard, Question 2 displayed the AI controls and privacy notice, and a live copy-edit suggestion appeared without changing the original comment.

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
- Increased the PDF gap before collage rubric item `2)` from 12 to 24 points so it is more clearly separated from the required-elements section.
