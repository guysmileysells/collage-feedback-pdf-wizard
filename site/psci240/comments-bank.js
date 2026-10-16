(function () {
  "use strict";

  const FEEDBACK_COMMENTS_BANK = {
    thesis: {
      "Strong": [
        "You take a clear position on the essay question and explain why you are taking that position. Nice work.",
        "Your thesis directly answers the essay question and provides the essay with a clear direction.",
        "You have developed an interesting thesis that provides a clear response to the essay question."
      ],
      "Developing": [
        "You take a position on the essay question, but the thesis would be stronger if it briefly explained why you are taking that position.",
        "Your thesis needs to respond to the essay question more directly.",
        "The thesis describes what the paper will discuss rather than making a clear argument.",
        "It is unclear whether this is your position or the position of the author you cite. State your own answer directly in the thesis.",
        "The thesis answers part of the question but does not address the question as a whole.",
        "Use the key language from the essay question so that your answer is precise and unmistakable."
      ],
      "Missing": [
        "The introductory paragraph must include a thesis statement that directly answers the essay question.",
        "A thesis should take a position on the question and briefly explain the reasoning behind that position."
      ]
    },
    introduction: {
      "Strong": [
        "You do a good job of introducing the main themes of the essay before stating your thesis.",
        "Nice use of a path statement to show the reader how the essay will proceed.",
        "The introductory paragraph provides useful context and leads clearly to the thesis."
      ],
      "Developing": [
        "Spend a little more time introducing the main themes of the paper before stating your thesis.",
        "Introduce the theorist and the relevant political context before stating the thesis, since both are central to the essay.",
        "Assume that the reader has no prior knowledge of the case and provide the necessary context.",
        "For next time, consider including a path statement that previews the organization of the essay.",
        "The introduction moves into detailed analysis too quickly. Save quotations and detailed evidence for the body of the paper.",
        "The thesis should not be the first sentence. Begin by introducing the question's central themes."
      ]
    },
    theorist: {
      "Strong": [
        "You demonstrate a strong understanding of the theorist's arguments and their implications. Nice work.",
        "Your interpretation is accurate and engages with important details and nuances.",
        "You explain the theorist's position clearly rather than simply listing points."
      ],
      "Developing": [
        "This is a good start, but keep working toward a deeper engagement with the theorist's ideas.",
        "You capture the broad argument, but important details and nuances are missing.",
        "Some claims about the theorist are inaccurate or incomplete and need to be reconsidered.",
        "Explain how the different parts of the theorist's argument fit together, especially where they appear to conflict.",
        "The essay lists some of the theorist's points without explaining their context or implications.",
        "Bring in additional parts of the theorist's argument that speak directly to the claims you make about the case."
      ]
    },
    argument: {
      "Strong": [
        "You develop a thoughtful and layered argument that applies the theory effectively to the political case.",
        "The essay moves beyond summary and develops a clear critical assessment from your own perspective.",
        "You draw out the implications of your position and engage with its difficult or controversial aspects."
      ],
      "Developing": [
        "Keep working through the logic of your argument and make the links among your claims more explicit.",
        "The question asks you to apply the theorist's ideas and critically assess them from your own perspective. The latter part needs more development.",
        "Develop your own position more fully rather than stopping after explaining what the theorist would say.",
        "Draw on more than one assigned article to support the argument.",
        "The argument would be stronger if it considered objections, complications, or evidence that does not fit neatly with your position.",
        "Some factual claims about the political case are inaccurate or unsupported, which weakens the argument.",
        "Explain the implications of your position. What would accepting this argument mean in practice?",
        "The analysis is on the right track but remains at the surface level. Go further in explaining why the evidence matters."
      ]
    },
    structureWriting: {
      "Strong": [
        "The essay has a clear structure and is easy to follow. Nice work.",
        "Your paragraphs are organized around clear ideas and build the argument effectively.",
        "The writing is clear and the progression of the argument is easy to follow."
      ],
      "Developing": [
        "The essay structure needs more attention. Divide very long paragraphs so that each develops one main idea.",
        "The body of the paper reads as one long paragraph. Clear paragraph breaks would make the argument easier to follow.",
        "Issues with phrasing and word choice sometimes make the argument difficult to follow.",
        "Clarify the transitions among your claims so the reader can see how the argument develops.",
        "Some paragraphs contain several different ideas. Dividing and reorganizing them would produce a clearer structure.",
        "A final proofreading pass would improve sentence clarity, grammar, and word choice."
      ]
    },
    quotationsCitations: {
      "Strong": [
        "The required quotations are included, correctly cited, and explained in context. Nice work.",
        "The quotations support the argument and are integrated smoothly into your own sentences.",
        "Citation formatting is consistent and the source of each quotation is clear."
      ],
      "Requirements": [
        "The essay does not include the required two direct quotations from the thinker.",
        "The essay does not include the required two direct quotations from the assigned articles.",
        "Paraphrases do not count as direct quotations; direct quotations must reproduce the source's words inside quotation marks.",
        "Draw on more than one assigned article rather than relying on a single source.",
        "One or more quotations are missing an in-text citation."
      ],
      "Integration and explanation": [
        "Provide more context before introducing the quotation so the reader understands what it is responding to.",
        "Explain the quotation more fully after presenting it and connect it directly to your argument.",
        "Some quotations do not fit clearly with the point made immediately before them.",
        "Avoid very long quotations. Select the most relevant language and explain its significance.",
        "The quotations say more than the essay currently acknowledges. Draw out their implications more completely."
      ],
      "Citation formatting": [
        "Place the final quotation mark before the in-text citation.",
        "Use the author's last name in the citation rather than the name of the person quoted within the article.",
        "Include the page number in the in-text citation where one is available.",
        "Do not include 'pg.' or the publication year in the in-text citation unless the assigned citation style requires it.",
        "Use one citation format consistently throughout the essay."
      ]
    },
    conclusion: {
      "Strong": [
        "The conclusion provides a clear and concise summary of the argument. Nice work.",
        "You effectively restate the thesis and reinforce the essay's central points.",
        "The conclusion brings the argument together without introducing new material."
      ],
      "Developing": [
        "Do not introduce new arguments or evidence in the conclusion. Develop those points in the body of the paper.",
        "The conclusion should restate the thesis and briefly emphasize the key points already made.",
        "Avoid introducing new quotations in the conclusion; analyze them in the body of the essay.",
        "The concluding paragraph needs to provide a clearer final answer to the essay question.",
        "A shorter and more focused conclusion would be more effective."
      ]
    },
    overall: {
      "Strong performance": [
        "This is a thoughtful, well-developed essay that demonstrates strong engagement with the theorist and the political case.",
        "Strong work overall. The thesis, interpretation, evidence, and analysis reinforce one another effectively.",
        "You develop an interesting argument and communicate it clearly. Nice work."
      ],
      "Solid but developing": [
        "This is a solid start with several strong elements. Greater depth and precision would strengthen the analysis.",
        "The essay demonstrates a general understanding of the material, but several important ideas need fuller explanation.",
        "You have a promising argument, but the theorist's ideas and your own critical position need deeper development.",
        "The essay meets many of the assignment requirements, but structure, quotation use, or depth of analysis limits its effectiveness."
      ],
      "Major requirements": [
        "Several major assignment requirements are missing, including a clear thesis or the required direct quotations.",
        "The essay contains relevant ideas, but missing requirements and limited explanation prevent them from forming a complete argument.",
        "For future assignments, reviewing thesis construction, quotation requirements, and citation format before writing would help you demonstrate your ideas more effectively."
      ]
    }
  };

  const CATEGORY_LABELS = {
    thesis: "Thesis",
    introduction: "Introduction",
    theorist: "Interpretation of theorist(s)",
    argument: "Content of argument",
    structureWriting: "Structure and writing",
    quotationsCitations: "Quotations and citations",
    conclusion: "Conclusion",
    overall: "Overall feedback"
  };

  const QUESTION_FEEDBACK_MAP = {
    "thesis_included": ["thesis"],
    "thesis_quality": ["thesis"],
    "structured_introduction": ["introduction"],
    "theorist_interpretation": ["theorist"],
    "argument_content": ["argument"],
    "argument_structure": ["structureWriting"],
    "thinker_quotes": ["quotationsCitations"],
    "article_quotes": ["quotationsCitations"],
    "citation_format": ["quotationsCitations"],
    "quotation_quality": ["quotationsCitations"],
    "structured_conclusion": ["conclusion"],
    "essay_grade": ["overall"],
    "overall_comments": ["thesis", "introduction", "theorist", "argument", "structureWriting", "quotationsCitations", "conclusion", "overall"]
  };

  window.feedbackGroupsForQuestion = function feedbackGroupsForQuestion(key) {
    const categories = QUESTION_FEEDBACK_MAP[key] || [];
    return categories.flatMap((category) => Object.entries(FEEDBACK_COMMENTS_BANK[category] || {}).map(([group, comments]) => ({
      label: `${CATEGORY_LABELS[category]} — ${group}`,
      comments: comments.slice()
    })));
  };
})();
