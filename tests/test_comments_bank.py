from pathlib import Path

ROOT = Path(__file__).parents[1]
INDEX = ROOT / "site" / "index.html"
BANK = ROOT / "site" / "comments-bank.js"
HTML = INDEX.read_text(encoding="utf-8")


def test_comments_bank_asset_is_loaded_before_wizard_code():
    assert BANK.exists(), "comments-bank.js should contain the reusable feedback bank"
    assert '<script src="comments-bank.js"></script>' in HTML
    assert HTML.index('src="comments-bank.js"') < HTML.index("const ACCESS_CODE_HASH")


def test_comments_bank_covers_each_feedback_form_category():
    source = BANK.read_text(encoding="utf-8")
    for category in (
        "requiredElements",
        "collageStory",
        "collageDesign",
        "essayThesis",
        "essayIntroConclusion",
        "essayReading",
        "essayCitations",
        "essayAnalysis",
        "overall",
    ):
        assert f"{category}:" in source


def test_relevant_question_keys_are_mapped_to_feedback_categories():
    source = BANK.read_text(encoding="utf-8")
    for key in (
        "overview_of_neighborhood",
        "two_key_problems",
        "vision_for_the_future",
        "zoning_map",
        "collage_thoughtful_overview",
        "collage_design_quality",
        "essay_thesis",
        "essay_intro_conclusion",
        "essay_reading_interpretation",
        "essay_citations",
        "essay_analysis",
        "collage_comments",
        "essay_comments",
    ):
        assert f'"{key}"' in source


def test_dropdown_selection_appends_feedback_without_locking_textarea():
    assert 'feedbackSelect.className = "feedback-bank-select"' in HTML
    assert 'feedbackSelect.addEventListener("change"' in HTML
    assert 'comment.value = existing ? `${existing}\\n\\n${selected}` : selected' in HTML
    assert 'comment.dispatchEvent(new Event("input", {bubbles: true}))' in HTML
    assert "comment.readOnly" not in HTML
    assert "comment.disabled" not in HTML


def test_feedback_bank_is_not_shown_for_student_name():
    assert 'q.key !== "student_name"' in HTML
    assert 'feedbackGroupsForQuestion(q.key)' in HTML


def test_dropdown_uses_group_labels_and_keeps_placeholder_option():
    source = BANK.read_text(encoding="utf-8")
    assert 'feedbackSelect.appendChild(new Option("Choose feedback to insert…", ""))' in HTML
    assert 'const optgroup = document.createElement("optgroup")' in HTML
    assert 'optgroup.label = group.label' in HTML
    assert 'const CATEGORY_LABELS = {' in source
    assert 'essayThesis: "Thesis"' in source
    assert 'label: `${CATEGORY_LABELS[categoryName]} — ${label}`' in source
