from pathlib import Path

HTML = (Path(__file__).parents[1] / "site" / "index.html").read_text(encoding="utf-8")


def test_every_optional_comment_gets_copy_edit_controls_and_privacy_notice():
    assert 'comment.maxLength = MAX_COMMENT_LENGTH' in HTML
    assert 'copyEditButton.textContent = "Ask AI / Copy edit"' in HTML
    assert 'Only this comment is sent to Cloudflare Workers AI' in HTML
    assert 'Do not include student names or other identifying information.' in HTML


def test_copy_edit_preview_requires_explicit_acceptance():
    assert 'Original' in HTML
    assert 'Suggested' in HTML
    assert 'acceptButton.textContent = "Accept"' in HTML
    assert 'retryButton.textContent = "Try again"' in HTML
    assert 'keepButton.textContent = "Keep original"' in HTML
    assert 'comment.value = suggestion' in HTML
    assert 'acceptButton.addEventListener("click"' in HTML


def test_copy_edit_request_only_contains_selected_comment_and_times_out():
    assert 'JSON.stringify({comment: original})' in HTML
    assert 'AbortSignal.timeout(COPY_EDIT_TIMEOUT_MS)' in HTML
    assert 'const MAX_COMMENT_LENGTH = 3000' in HTML
    request_fragment = HTML.split('JSON.stringify({comment: original})')[0].rsplit('fetch(', 1)[-1]
    assert 'student_name' not in request_fragment
    assert 'answers' not in request_fragment
