from pathlib import Path

ROOT = Path(__file__).parents[1]
WRANGLER = ROOT / "wrangler.toml"
PACKAGE = ROOT / "package.json"


def test_wrangler_config_binds_workers_ai_and_rate_limiter():
    text = WRANGLER.read_text(encoding="utf-8")
    assert 'main = "worker/src/index.js"' in text
    assert '[ai]' in text and 'binding = "AI"' in text
    assert '[[ratelimits]]' in text
    assert 'name = "COPY_EDIT_RATE_LIMIT"' in text
    assert 'simple = { limit = 10, period = 60 }' in text


def test_package_exposes_dependency_free_worker_test_command():
    text = PACKAGE.read_text(encoding="utf-8")
    assert '"test:worker": "node --test tests/worker.test.mjs"' in text
