from pathlib import Path

ROOT = Path(__file__).parents[1]
HTML = (ROOT / "site" / "psci240" / "index.html").read_text(encoding="utf-8")
BANK = (ROOT / "site" / "psci240" / "comments-bank.js").read_text(encoding="utf-8")


def test_psci240_is_separate_form_with_expected_title():
    assert "PSCI 240 In-class Essay Feedback" in HTML
    assert "Collage rubric" not in HTML


def test_questions_match_recurring_psci240_feedback_categories():
    required = {
        "student_name": "Student name",
        "thesis_included": "Thesis statement included?",
        "thesis_quality": "THESIS STATEMENT",
        "structured_introduction": "STRUCTURED INTRODUCTORY PARAGRAPH",
        "theorist_interpretation": "INTERPRETATION OF THEORIST(S)",
        "argument_content": "CONTENT OF ARGUMENT",
        "argument_structure": "STRUCTURE OF ARGUMENT AND WRITING",
        "thinker_quotes": "Two direct quotations from the thinker included?",
        "article_quotes": "Two direct quotations from the assigned articles included?",
        "citation_format": "Citation formatting correct?",
        "quotation_quality": "DIRECT QUOTATIONS: INTEGRATION, CONTEXT, AND EXPLANATION",
        "structured_conclusion": "STRUCTURED CONCLUDING PARAGRAPH",
        "essay_grade": "Essay percentage grade",
        "overall_comments": "Overall essay feedback comments",
    }
    for key, prompt in required.items():
        assert f'["{key}", "{prompt}"' in HTML


def test_rubric_categories_use_ten_point_weak_strong_sliders():
    for key in ("thesis_quality", "structured_introduction", "theorist_interpretation", "argument_content", "argument_structure", "quotation_quality", "structured_conclusion"):
        line = next(line for line in HTML.splitlines() if f'["{key}"' in line)
        assert '"scale"' in line
    assert 'slider.min = "1"' in HTML
    assert 'slider.max = "10"' in HTML


def test_requirement_choices_match_marking_documents():
    assert 'const includedChoices = ["Yes", "No", "Unclear"]' in HTML
    assert 'const quoteChoices = ["Yes — 2 or more", "Partly — 1 of 2", "No"]' in HTML
    assert 'const citationChoices = ["Yes", "Mostly / minor issues", "No", "Not applicable"]' in HTML


def test_pdf_contains_all_psci240_sections_and_no_collage_section():
    for marker in (
        'title("PSCI 240 In-class Essay Feedback")',
        'scoreBlock("THESIS STATEMENT"',
        'scoreBlock("STRUCTURED INTRODUCTORY PARAGRAPH"',
        'scoreBlock("INTERPRETATION OF THEORIST(S)"',
        'scoreBlock("CONTENT OF ARGUMENT"',
        'scoreBlock("STRUCTURE OF ARGUMENT AND WRITING"',
        'sectionHeading("DIRECT QUOTATION REQUIREMENTS")',
        'scoreBlock("DIRECT QUOTATIONS: INTEGRATION, CONTEXT, AND EXPLANATION"',
        'scoreBlock("STRUCTURED CONCLUDING PARAGRAPH"',
        'gradeLine("Percentage grade"',
        'commentBox("Overall Essay Feedback Comments"',
    ):
        assert marker in HTML
    assert 'title("Collage Feedback")' not in HTML


def test_comment_bank_maps_every_feedback_category():
    for category in ("thesis", "introduction", "theorist", "argument", "structureWriting", "quotationsCitations", "conclusion", "overall"):
        assert f"{category}:" in BANK
    for key in ("thesis_quality", "structured_introduction", "theorist_interpretation", "argument_content", "argument_structure", "quotation_quality", "structured_conclusion", "overall_comments"):
        assert f'"{key}"' in BANK


def test_form_keeps_copy_edit_and_repeat_student_workflows():
    assert 'copyEditButton.textContent = "Copy edit"' in HTML
    assert "will not add or change your evaluation" in HTML
    assert 'id="new-blank-form"' in HTML
    assert "window.location.reload()" in HTML


def test_pdf_layout_uses_dynamic_wrapped_comment_boxes():
    assert "function wrappedLines(value, maxChars)" in HTML
    assert "lines.length * commentLineHeight + 24" in HTML
    assert "commentMaxChars = 102" in HTML
