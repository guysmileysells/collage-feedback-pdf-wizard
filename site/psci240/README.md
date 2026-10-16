# PSCI 240 In-class Essay Feedback Form

This directory contains a separate feedback wizard for PSCI 240 in-class essays.

## Form structure

1. Student name
2. Thesis statement included? — Yes / No / Unclear
3. Thesis statement quality — 10-point Weak–Strong scale
4. Structured introductory paragraph — 10-point Weak–Strong scale
5. Interpretation of theorist(s) — 10-point Weak–Strong scale
6. Content of argument — 10-point Weak–Strong scale
7. Structure of argument and writing — 10-point Weak–Strong scale
8. Two direct quotations from the thinker — Yes / one of two / No
9. Two direct quotations from assigned articles — Yes / one of two / No
10. Citation formatting — Yes / mostly / No / not applicable
11. Quotation integration, context, and explanation — 10-point Weak–Strong scale
12. Structured concluding paragraph — 10-point Weak–Strong scale
13. Percentage grade — whole number from 0 to 100
14. Overall feedback comments — optional

Every item except student name can carry an optional editable comment. The comments bank inserts reusable feedback into that textarea; it never locks or automatically submits the wording.

## Comment-bank categories

- Thesis
- Introduction
- Interpretation of theorist(s)
- Content of argument
- Structure and writing
- Quotations and citations
- Conclusion
- Overall feedback

The bank was synthesized from instructor-supplied PSCI 240 feedback from Summer 2024, Winter 2025, and Fall 2025. It preserves recurring feedback patterns without adding student-specific factual claims.

## Output and privacy

- Generates a client-side PDF; form content is not sent to a server for PDF creation.
- Optional copy editing sends only the selected comment and reviewer instructions to the configured Cloudflare Worker.
- Copy editing is limited to mechanics and clarity; the instructor must explicitly accept a suggestion.
- Do not place student names or identifying information in comments submitted for copy editing.
- A **New blank form** button resets the form for the next student while preserving the unlocked browser session.

## Route

When deployed with the existing static site, the form is available at `/psci240/`.
