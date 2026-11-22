from pathlib import Path

HTML = Path(__file__).resolve().parents[1] / "site" / "psci240" / "index.html"


def test_score_block_reserves_space_before_prompt():
    source = HTML.read_text(encoding="utf-8")
    assert "const scoreBlockTopGap = 14;" in source
    score_block = source.split("function scoreBlock", 1)[1].split("function gradeLine", 1)[0]
    assert "const blockH = scoreBlockTopGap" in score_block
    assert "y -= scoreBlockTopGap;" in score_block
    assert score_block.index("y -= scoreBlockTopGap;") < score_block.index("promptLines.forEach")
