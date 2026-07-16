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
