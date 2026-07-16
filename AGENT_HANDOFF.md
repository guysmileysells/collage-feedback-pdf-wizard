# Collage Feedback PDF Wizard — Complete Agent Handoff

## 1. Handoff purpose

This document packages the project’s product intent, complete rubric content, implementation details, repository/deployment state, known limitations, operational history, and recommended takeover procedure so another agent can continue without relying on prior chat context.

**Naming clarification:** the repository and application use **Collage Feedback PDF Wizard**. It may be referred to conversationally as “College Feedback PDF Wizard,” but this is a rubric for a neighborhood **collage** and related in-class essay—not a college-admissions essay product.

## 2. Project identity

- **Product name:** Collage Feedback PDF Wizard
- **Browser title:** Collage and Essay Feedback
- **Purpose:** Guide a reviewer through a structured neighborhood-collage and in-class-essay rubric, then generate a standardized PDF containing the completed evaluation.
- **GitHub repository:** `https://github.com/guysmileysells/collage-feedback-pdf-wizard`
- **Live deployment:** `https://guysmileysells.github.io/collage-feedback-pdf-wizard/`
- **Canonical WSL checkout:** `/home/i9-10900kf/projects/collage-feedback-pdf-wizard`
- **Main branch:** `main`
- **Deployment branch:** `gh-pages`
- **Hosting:** GitHub Pages from the root of `gh-pages`
- **Current access code:** `5656`
- **Security classification:** casual client-side access gate only; not real authentication

## 3. Current verified state

Verified on 2026-07-15:

- Live URL returned the application with title `Collage and Essay Feedback`.
- The live PIN screen accepted `5656` and opened Question 1, `Student name`.
- Local `main` was clean and synchronized with `origin/main` before this handoff document was added.
- `main` pointed to `316d62f` (`Update wizard PIN to 5656`).
- `gh-pages` pointed to `e3317f2` (`Deploy PIN update to GitHub Pages`).
- Existing tracked application consisted of six files before this handoff:
  - `.gitignore`
  - `PROJECT_LOG.md`
  - `site/README_DEPLOY.txt`
  - `site/_headers`
  - `site/index.html`
  - `site/robots.txt`
- `site/index.html` was 598 lines / 22,640 bytes with SHA-256:
  - `b99badbda69613e7daf3a54966351fda36765797d83113fbb7e570f1fe5a884b`

## 4. User workflow

1. User opens the hosted site.
2. A four-digit PIN screen appears.
3. Correct code unlocks the wizard for the current browser tab/session using `sessionStorage`.
4. Reviewer moves through 28 questions, one at a time; the two dedicated feedback-comment steps are optional.
5. Text inputs, button selections, ten-position Weak-to-Strong sliders, and optional per-question comments are held in memory.
6. `Back` returns to the previous question while retaining answers.
7. `Clear` removes the answer to the current question.
8. `Next` refuses to advance if a required answer is blank; the two dedicated feedback-comment steps may be blank.
9. On Question 28, the button label becomes `Download PDF`.
10. The browser constructs a PDF locally and shows:
    - Open PDF
    - Download PDF
    - Embedded PDF preview
11. The downloaded filename is based on the student name, normalized to letters/numbers/underscores, with `_Feedback.pdf` appended.

Normal answers and PDF generation remain local. AI copy-editing is the sole exception: when the reviewer explicitly clicks **Ask AI / Copy edit**, only that optional comment is sent to the Cloudflare Worker. Student name, grades, rubric answers, prompts, and other answer context are not included.

Every question except Student name also displays an optional comments box. These comments are retained while navigating. A comment is added beneath its related item in the generated PDF only when text was entered; blank optional comments produce no PDF label or empty box.

## 5. Complete rubric/question inventory

There are **28 questions** after the owner-approved July 15 revision: 26 required and two optional feedback-comment steps.

### A. Submission details — Question 1

1. Student name — free text

### B. Required elements — Questions 2–17

Unless otherwise noted, options are:

- Included
- Missing
- Needs Improvement
- Not Applicable

Questions:

2. Overview of neighborhood
3. The feel
4. Housing
5. Commercial districts and economy
6. People and Community
7. Transportation
8. Public space and Art
9. 2 key problems — options: Yes / No
10. Vision for the future
11. Map of neighborhood from bird's eye view
12. Zoning map
13. A selfie of you in the neighborhood
14. At least 10 pictures or videos taken by you
15. At least two statistics or pieces of data
16. Works cited list for your statistics
17. Multiple pages

### C. Collage rubric — Questions 18–21

Questions 18–19 use a ten-position slider labelled **Weak** at the low end and **Strong** at the high end. The PDF shows the selection as a vertical marker crossing that line without printing a number.

Questions:

18. `2) Collage conveys a thoughtful and informative overview`
19. `3) Quality of Design Work`
20. Collage percentage grade — required whole number from 0 to 100
21. Collage feedback comments — optional comments box only; may be left blank

The generated PDF expands Question 18 to the fuller prompt:

> Collage conveys a thoughtful and informative overview of your neighbourhood through the images included and the way they have been curated (carefully gathered, sifted, chosen, and organized). It should tell a story through the images and information included.

### D. In-class essay — Questions 22–28

Questions 22–26 use the same ten-position Weak-to-Strong slider and non-numeric marker crossing the PDF line.

Questions:

22. THESIS STATEMENT
23. STRUCTURED INTRODUCTORY AND CONCLUDING PARAGRAPH
24. INTERPRETATION OF READING
25. IN-TEXT CITATIONS
26. ANALYSIS
27. Essay percentage grade — required whole number from 0 to 100
28. In-class essay comments — optional comments box only; may be left blank

**Source-count history:** the source originally contained 31 entries. On 2026-07-15, the owner explicitly removed Neighborhood, Reviewer, and Review date, leaving 28 entries.

## 6. PDF output structure

The PDF is generated directly in JavaScript without jsPDF or another external library. It manually creates a PDF 1.4 byte structure with Helvetica and Helvetica-Bold fonts, content streams, page objects, cross-reference table, trailer, and Blob URL.

### Page/section 1: Collage Feedback

- Student
- Required Elements table
- Thoughtful/informative overview score block
- Design quality score block
- Collage percentage grade
- Collage feedback comments
- Footer page number

### Page/section 2: In-class Essay

- Thesis statement score block
- Structured introductory/concluding paragraph score block
- Interpretation of reading score block
- In-text citations score block
- Analysis score block
- Essay percentage grade
- In-class essay comments
- Footer page number

The generator can create additional internal pages if content exceeds available space, but the page footer calls are hard-coded around the two primary sections. Long comment overflow and pagination should be regression-tested before relying on unusually long feedback.

## 7. Architecture and data behavior

### Stack

- Static HTML5
- Inline CSS
- Vanilla browser JavaScript
- No frontend package manager or build system; `package.json` only exposes the dependency-free Node Worker test command
- Cloudflare Worker backend for opt-in copy-editing only
- `POST /copy-edit` JSON API (plus browser CORS preflight)
- No database
- No external runtime dependencies
- No analytics
- No account system

### State

- PIN-unlocked state: `sessionStorage` key `collageFeedbackUnlocked=1`
- Form answers: in-memory `answers` JavaScript object
- Current step: in-memory numeric `index`
- Refresh behavior:
  - PIN may remain unlocked for the current tab/session.
  - Form answers are lost because they are not stored in localStorage, IndexedDB, or a backend.

### Navigation and validation

- All questions are required to advance.
- Text values are trimmed.
- Choice answers are set when an option button is clicked.
- Pressing Enter advances except inside long-text fields.
- No final review screen exists before PDF creation.
- After PDF creation, normal navigation and editing controls are disabled.

### PDF character behavior

The `ascii()` helper normalizes curly quotes and long dashes, then strips characters outside printable ASCII and newline. Consequences:

- Accented characters may be removed.
- Non-English scripts are removed.
- Some names and neighborhood labels may be degraded.
- This is a known quality limitation, not a security feature.

## 8. Access control and privacy reality

The access gate hashes the four-digit code in browser JavaScript and compares it client-side. The current source comment explicitly identifies code `5656`.

This means:

- It is useful only as casual friction.
- Anyone who can inspect/download the public JavaScript can recover or bypass the gate.
- GitHub Pages is public because private-repository Pages was unavailable on the account plan during setup.
- It must not be described as secure authentication.
- It should not be used as a confidential student-record system without server-side identity/access controls and an approved privacy/data-retention design.

Privacy-positive aspects of the current implementation:

- No full form submission to a server; only a selected comment is sent after an explicit copy-edit action.
- No database persistence.
- No analytics in source.
- PDF generation occurs locally in the browser.

### AI copy-edit privacy and security (added 2026-07-16)

- Every optional comment has **Ask AI / Copy edit** and a notice that only that comment is sent to Cloudflare Workers AI; reviewers are told not to include names or identifying information.
- Requests contain exactly `{ "comment": "..." }`, with a 3,000-character browser and Worker limit and a 12-second frontend timeout.
- The original and suggestion are displayed together. The textarea is not replaced until **Accept**; **Try again** and **Keep original** are also available.
- The Worker accepts only `POST /copy-edit` plus required `OPTIONS` preflight. It rejects extra JSON keys, invalid JSON/content types, absent/unapproved origins, and over-length/blank comments.
- Allowed origins are exactly `https://guysmileysells.github.io` and loopback localhost origins for development.
- Responses use no-store/CORS/security headers and generic errors. Worker source contains no request/content logging.
- Workers AI binding `AI` uses the currently available, lightweight `@cf/meta/llama-3.2-3b-instruct`. Native `COPY_EDIT_RATE_LIMIT` limits each Cloudflare client-IP key to 10 requests per 60 seconds without a paid storage dependency.
- The configured browser endpoint is `https://collage-feedback-copy-edit.guysmileysells.workers.dev/copy-edit`.
- The Worker and GitHub Pages frontend were deployed and live-verified on 2026-07-16. The public browser integration produced a real suggestion and preserved the original until explicit acceptance.

Privacy/operational risks:

- The generated PDF may remain in browser downloads/history or local storage managed by the browser/OS.
- Users can lose work on refresh or tab closure.
- Public source reveals the gate implementation.

## 9. UI and visual behavior

- Responsive single-column wizard
- Maximum main width: 920px
- Neutral gray/white visual system with blue progress bar
- PIN card maximum width: 420px
- Wizard panel with border, modest radius, and shadow
- One prompt per screen
- Large full-width option buttons
- Progress bar updates from Question 1 through final question
- Mobile breakpoint at 640px
- On mobile, header stacks and controls stretch to full width
- Generated PDF preview iframe height: 620px

## 10. Deployment and repository history

### Original setup history

From `PROJECT_LOG.md`:

- 2026-06-20: uploaded `Collage_Feedback_PDF_Wizard_Site_v1.zip` was received through Discord.
- Static site was extracted into the canonical project’s `site/` directory.
- Windows-style zip paths were normalized for Linux.
- `robots.txt` and `_headers` were added.
- Local validation used `http://127.0.0.1:4187/`.
- Initial access code was `1234`.
- GitHub repository was created and `main` plus `gh-pages` were pushed.
- GitHub Pages could not be enabled while the repository was private under the account plan, so the repository was made public.
- Live deployment was verified with HTTP 200 and browser PIN flow.
- Access code was later changed to `5656`; old code `1234` stopped matching.

### Existing commits before this handoff

1. `f1518d3` — Initial static site import
2. `16077e5` — Document deployment verification
3. `316d62f` — Update wizard PIN to 5656

Deployment branch head:

- `e3317f2` — Deploy PIN update to GitHub Pages

### Deployment options documented in repository

- GitHub Pages — actual current deployment
- Netlify Drop
- Cloudflare Pages
- Any basic static host serving `index.html`

## 11. Static hosting metadata

### `site/_headers`

Declares:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Important: GitHub Pages does not necessarily apply Cloudflare/Netlify-style `_headers` files. Verify response headers on the chosen host rather than assuming this file is enforced.

### `site/robots.txt`

Allows general crawler access:

```text
User-agent: *
Disallow:
```

This is consistent with the current public deployment but not with an expectation of privacy or search exclusion.

## 12. Known inconsistencies and limitations

1. **Naming ambiguity:** “College” is sometimes used conversationally, but source/repo say “Collage.”
2. **Question-count history:** an earlier chat summary said 32, the original source was verified at 31, and the owner-approved removal of three submission-detail questions reduced it to 28.
3. **Outdated deployment README:** `site/README_DEPLOY.txt` still calls `1234` the default code, while source/live use `5656`.
4. **Weak PIN:** client-side hash is bypassable.
5. **Public repository:** source and access mechanism are visible.
6. **No save/resume:** refresh loses form answers.
7. **No history:** completed reviews are not centrally stored.
8. **No accounts/roles:** no teacher identity, authorization, or audit trail.
9. **No roster:** student details are typed manually.
10. **No collaborative review:** one browser session only.
11. **ASCII-only PDF:** Unicode loss can damage names/comments.
12. **No final review step:** PDF is generated immediately after final answer.
13. **Long-text pagination risk:** unusually long feedback may not fit cleanly.
14. **Header enforcement uncertainty:** `_headers` may not affect GitHub Pages.
15. **Limited automated test suite:** Python source-presence tests and dependency-free Node Worker unit tests exist; full browser end-to-end AI testing still requires a deployed or local Worker binding.
16. **No CI/CD workflow:** deployment is branch-based and manually maintained.
17. **No explicit data-retention guidance:** local PDF handling is left to the user.

## 13. Product strengths

- Working deployed artifact, not just a mockup
- Very low hosting and maintenance cost
- Fast, focused reviewer workflow
- One-question-at-a-time design reduces visual overload
- Standardized rubric and PDF output
- Mobile-compatible
- No backend data collection
- No external JavaScript dependencies
- Portable to almost any static host
- Small codebase that another agent can fully inspect quickly

## 14. Takeover instructions for another agent

### First actions

1. Open the canonical checkout:
   - `/home/i9-10900kf/projects/collage-feedback-pdf-wizard`
2. Read, in order:
   - `AGENT_HANDOFF.md`
   - `PROJECT_LOG.md`
   - `site/index.html`
   - `site/README_DEPLOY.txt`
   - `site/_headers`
   - `site/robots.txt`
3. Inspect live site:
   - `https://guysmileysells.github.io/collage-feedback-pdf-wizard/`
4. Check git status, current branches, remotes, and latest commits.
5. Do not assume the documented PIN provides security.
6. Do not add a backend, authentication, storage, or student-record persistence without owner approval and explicit privacy requirements.
7. Before changing rubric questions, obtain the owner’s confirmation of the authoritative rubric. The current source contains 28 owner-approved questions.
8. Preserve PDF layout and test all sections after changes.
9. Update `PROJECT_LOG.md` and this handoff when decisions or deployment behavior change.

### Suggested manual regression checklist

- Live page loads.
- Wrong PIN is rejected.
- `5656` unlocks the current deployment.
- Student name is Question 1.
- Every choice option can be selected.
- Back preserves prior answers.
- Clear removes current answer.
- Blank answer blocks Next.
- Enter advances text/choice screens but does not prematurely submit long comments.
- Student name is the only submission-detail question.
- Percentage grades reject blanks, decimals, and values outside 0–100.
- Progress bar reaches the end.
- PDF opens in a new tab.
- PDF downloads with expected student-derived filename.
- Required-elements table is complete.
- Collage score, grade, and comments appear.
- Essay score, grade, and comments appear.
- Long comments do not overlap or disappear.
- Comment labels, boxes, text, and following sections have clear vertical spacing.
- Slider markers cross the Weak-to-Strong line and do not appear as numbers or text above it.
- Collage rubric item `2)` has a 24-point separation from the preceding required-elements content.
- Student names with accents are tested and the current ASCII limitation is documented or fixed.
- Mobile-width layout remains usable.
- Every non-name question shows the copy-edit control and privacy notice.
- Empty comments do not invoke the API; comments stop at 3,000 characters.
- Original text remains unchanged while a suggestion is loading/displayed and after **Try again** or **Keep original**; only **Accept** replaces it.
- Browser request payload contains only `comment`; timeout and generic failure messages leave the original intact.
- Run `python -m pytest -q` and `npm test` before any deployment.

### Sensible next improvements—only after owner approval

1. Correct `site/README_DEPLOY.txt` from `1234` to `5656`.
2. Preserve the owner-approved 28-question rubric unless a later request changes it.
3. Add a review-before-download screen.
4. Add browser-local draft persistence with a prominent clear/delete control.
5. Replace the hand-built ASCII PDF path with a Unicode-capable PDF implementation.
6. Add automated browser regression tests.
7. If confidential student records are required, replace the static PIN with genuine server-side authentication and design retention/access rules before storing any data.

## 15. Scope boundaries for safe continuation

Do not silently reinterpret this as:

- A college admissions essay reviewer
- A full learning-management system
- A student-record database
- A secure teacher portal
- An AI grading product
- A collaborative classroom platform

The current product is a focused rubric-entry and local-PDF-generation wizard. Expansion should be a deliberate owner decision.

## 16. Source-of-truth hierarchy

When documents disagree, use this order and report the conflict:

1. Owner’s latest explicit decision
2. Current `site/index.html` behavior
3. Live deployed behavior
4. `PROJECT_LOG.md`
5. This handoff
6. `site/README_DEPLOY.txt`
7. Older chat summaries

The application source and live deployment currently establish `5656` as the working code; the README’s `1234` statement is stale.
