from pathlib import Path

SITE = Path(__file__).parents[1] / "site" / "index.html"
HTML = SITE.read_text(encoding="utf-8")


def test_removed_submission_questions_are_absent_everywhere():
    for key in ("neighborhood", "reviewer", "review_date"):
        assert f'["{key}"' not in HTML
        assert f"answers.{key}" not in HTML


def test_collage_and_essay_grades_are_percentages_out_of_100():
    assert 'const grades = [' not in HTML
    assert '["collage_grade", "Collage percentage grade", "Collage rubric", "percentage"]' in HTML
    assert '["essay_grade", "Essay percentage grade", "In-class essay", "percentage"]' in HTML
    assert 'field.type = "number"' in HTML
    assert 'field.min = "0"' in HTML
    assert 'field.max = "100"' in HTML
    assert 'field.step = "1"' in HTML
    assert '`${label}: ${value}%`' in HTML


def test_percentage_grade_validation_rejects_values_outside_0_to_100():
    assert 'q.kind === "percentage"' in HTML
    assert 'Number(value) < 0 || Number(value) > 100' in HTML
    assert 'Enter a whole-number percentage from 0 to 100.' in HTML


def test_pdf_header_only_keeps_student_name():
    assert 'Student: ${answers.student_name || ""}' in HTML
    for label in ("Neighborhood:", "Reviewer:", "Date:"):
        assert label not in HTML


def test_rubric_feedback_uses_weak_to_strong_sliders():
    slider_keys = (
        "collage_thoughtful_overview",
        "collage_design_quality",
        "essay_thesis",
        "essay_intro_conclusion",
        "essay_reading_interpretation",
        "essay_citations",
        "essay_analysis",
    )
    for key in slider_keys:
        assert f'["{key}"' in HTML
        question_line = next(line for line in HTML.splitlines() if f'["{key}"' in line)
        assert '"scale"' in question_line
    assert 'slider.type = "range"' in HTML
    assert 'slider.min = "1"' in HTML
    assert 'slider.max = "10"' in HTML
    assert 'Weak' in HTML and 'Strong' in HTML


def test_pdf_slider_uses_marker_position_without_printing_number():
    assert 'function scoreBlock(numberedPrompt, score)' in HTML
    assert 'const markerX =' in HTML
    assert 'drawText("|", markerX' in HTML
    assert 'drawText(`Score: ${cleanScore}`' not in HTML


def test_optional_comments_are_saved_for_every_question_except_name():
    assert 'const comments = {}' in HTML
    assert 'q.key !== "student_name"' in HTML
    assert 'optional-comment' in HTML
    assert 'comments[q.key]' in HTML


def test_pdf_only_draws_optional_comments_when_present():
    assert 'function optionalComment(label, value)' in HTML
    assert 'if (!value) return;' in HTML
    assert 'optionalComment(q.prompt, comments[q.key])' in HTML
    assert 'optionalComment("Collage percentage grade", comments.collage_grade)' in HTML
    assert 'optionalComment("Essay percentage grade", comments.essay_grade)' in HTML


def test_feedback_comment_questions_only_use_optional_comment_box():
    assert '["collage_comments", "Collage feedback comments", "Collage rubric", "comments"]' in HTML
    assert '["essay_comments", "In-class essay comments", "In-class essay", "comments"]' in HTML
    assert 'q.kind === "comments"' in HTML
    assert 'if (q.kind !== "comments" && !value)' in HTML
    assert 'commentBox("Collage Feedback Comments", comments.collage_comments' in HTML
    assert 'commentBox("In-class Essay Comments", comments.essay_comments' in HTML
