(function () {
  "use strict";
  const FEEDBACK_COMMENTS_BANK = {
    requiredElements: {
  "Complete / strong": [
    "All required elements are present. Nice work following the assignment instructions carefully.",
    "You have included the required overview, two problems, future vision, maps, original photographs, statistics, and works cited information.",
    "The required elements are complete, and the collage provides a solid foundation for your analysis."
  ],
  "Missing or incomplete elements": [
    "You have included some of the required elements, but several are missing or not clearly identifiable. This limits how fully the collage meets the assignment criteria.",
    "Your overview introduces the neighborhood, but it does not fully address its feel, housing, commercial activity, people and community, transportation, and public space or art. More complete coverage would have provided a stronger picture of the area.",
    "You point to concerns in the neighborhood, but the two key problems are not clearly identified. Naming them directly would have made the collage’s central message easier to follow.",
    "You clearly identify `[problem]`; however, the second required problem is not clear enough for the viewer to recognize.",
    "You identify the problems clearly, but the discussion of possible responses or solutions is brief. More development would have strengthened the future vision.",
    "The collage describes current conditions, but it does not provide the required overall vision of what the neighborhood should be like in approximately 20 years.",
    "Your future vision responds to `[one problem]`, which is a useful starting point, but it does not present a broader vision for the neighborhood as a whole.",
    "The future vision is present but does not clearly show how the neighborhood would look, function, or feel differently.",
    "A bird’s-eye or satellite map showing the built form of the neighborhood is required.",
    "The map included does not clearly show the built form of your particular neighborhood.",
    "The zoning material is incomplete: the required map from the assigned source or the relevant zoning code is missing. As a result, this requirement is not fully met.",
    "You include the zoning code, but it would be more meaningful if the collage showed what `[code]` zoning permits or why that matters for the neighborhood.",
    "The required selfie taken in the neighborhood is not included.",
    "You include some original visual material, but the submission does not meet the requirement of ten photographs or videos taken by you in the neighborhood.",
    "The submission includes limited data and does not meet the requirement of two pieces of neighborhood-specific evidence in addition to zoning information.",
    "The statistics provide useful broader context for `[Surrey/Metro Vancouver/Canada]`, but they are not specific to your neighborhood. More local evidence would have made the analysis more relevant.",
    "The statistics are included, but the works cited information is not complete enough for the sources to be located and verified.",
    "Some outside images, quotations, or statistics are not acknowledged. Consistent quotation marks and citations would have made the use of sources clearer and more academically responsible."
  ]
},
    collageStory: {
  "Strong": [
    "The collage tells a clear and coherent story about how you experience your neighborhood. Nice work.",
    "Your captions guide the viewer effectively and make the significance of the images clear.",
    "You have selected strong images and organized them in a way that communicates a thoughtful argument about the neighborhood.",
    "The collage draws effectively on the 29 Questions exercise and conveys a strong sense of place.",
    "Your discussion of `[topic/page]` is especially effective because the images, captions, and evidence reinforce one another.",
    "You do more than describe the neighborhood: you evaluate its strengths, problems, and possibilities. This adds depth to the collage."
  ],
  "Developing": [
    "You collected some useful images that begin to establish a sense of place. However, the connections among them are not always clear, so the final collage does not communicate a fully coherent story.",
    "Some pages tell a clear story, especially `[page/topic]`. Other pages provide less interpretation and visual direction, making their significance harder to understand.",
    "The images provide a useful foundation, but more short captions or visual cues were needed to explain what the viewer should notice and why it matters.",
    "The collage includes relevant information, but its significance is not always interpreted. A clearer point of view would have made the material more meaningful.",
    "The collage presents a collection of relevant images, but the connections among the pages are not developed enough to create a complete story.",
    "The main message of some pages is unclear, leaving the viewer uncertain about the intended takeaway.",
    "The title introduces the promising idea of `[theme]`, but that theme is not carried through consistently across the collage.",
    "The organization would have been clearer if related material—such as zoning and housing or transportation and traffic—had been grouped together.",
    "The amount of writing on `[page]` exceeds the assignment’s one-sentence guideline and reduces the visual impact of the collage.",
    "The balance between images and interpretation is uneven: some pages need more explanation, while others contain more text than the visual format supports."
  ],
  "Problems, causes, and solutions": [
    "You identify `[problem]` as an important concern, but its effects on people in the neighborhood are not fully explained.",
    "The analysis identifies `[problem]` but does not examine or visually represent its causes.",
    "The evidence on `[page]` appears to complicate your claim about `[problem]`, but the apparent contradiction is not explained.",
    "Your proposed solution is relevant, but its connection to the identified problem is not fully established.",
    "The collage does not establish whether `[issue]` is a significant problem in itself or a symptom of a larger concern.",
    "The future vision responds to one concern more clearly than the other, so its connection to both identified problems is incomplete.",
    "The inspiration for the future vision and the changes needed to achieve it remain unclear.",
    "The vision remains abstract because it does not establish who would act, what would change, or how residents would experience the result.",
    "The analysis does not address the proposal’s trade-offs, including who might benefit and who might face costs or disadvantages."
  ],
  "Evidence and specificity": [
    "The collage focuses too broadly on `[city]` rather than consistently examining your particular neighborhood.",
    "One source appears to concern `[different location]` rather than your neighborhood, weakening the relevance of the evidence.",
    "The statistics on `[page]` are included without enough explanation of what is noteworthy about them.",
    "The image used to demonstrate `[problem]` does not clearly show it, so the visual evidence does not fully support the claim.",
    "The collage provides limited evidence of how residents actually experience `[transportation/housing/public space]`.",
    "The collage shows `[parks/shops/transit services/housing]` but does not evaluate their sufficiency, accessibility, affordability, or quality."
  ]
},
    collageDesign: {
  "Strong": [
    "The collage is visually engaging and generally well organized. Nice work.",
    "You have taken and selected some excellent photographs of the neighborhood.",
    "The layout, typography, and image choices create a consistent visual identity.",
    "The pages make effective use of space and maintain a good balance between images and text.",
    "The design supports the story rather than distracting from it."
  ],
  "Layout and organization": [
    "Some pages have substantial empty space, which makes the design feel unfinished and reduces the amount of visual evidence presented.",
    "Several pages contain only one or two images. As a result, they read more like individual slides than fully curated collage pages.",
    "The design has a clear foundation, but uneven image spacing and alignment make some placements look less intentional.",
    "Related pages and content are separated, which interrupts the visual flow.",
    "Some captions obscure important parts of the images.",
    "Some images or text are cut off at the edges of the page.",
    "Template text such as `[“your text here”]` remains in the final submission, suggesting that the final proofreading pass was incomplete."
  ],
  "Readability and consistency": [
    "Some captions are too small to read comfortably, which limits the accessibility of the information.",
    "The text-background contrast is too low on `[page]`; the `[black/light]` text blends into the image.",
    "Inconsistencies in capitalization, punctuation, fonts, and bullet formatting reduce the overall polish of the presentation.",
    "Spelling, missing words, and formatting errors suggest that the submission would have benefited from a more thorough final proofreading pass.",
    "Some text appears messy because of spacing or punctuation. A final editing pass would improve the presentation.",
    "Some wording appears to come directly from a source but is not identified as a quotation or accompanied by a citation."
  ],
  "Image and data quality": [
    "Several images, especially screenshots, have low resolution and appear fuzzy, which reduces their visual effectiveness.",
    "The chart on `[page]` is difficult to read and includes information that is not directly relevant, so the key finding is not communicated clearly.",
    "The video is not playable in the submitted file format, so this part of the collage could not be assessed.",
    "The generic listing or screenshot does not clearly represent the claim being made."
  ]
},
    essayThesis: {
  "Strong": [
    "Your thesis takes a clear position, directly answers the question, and explains why. Nice work.",
    "This is a strong thesis: it identifies the relationship between your vision and Metro 2050 and previews the reasons for your position.",
    "The thesis is specific, arguable, and well connected to the body of the essay."
  ],
  "Developing": [
    "You take a clear position, which gives the essay direction. However, the thesis does not yet explain the reasons supporting that position.",
    "Your thesis communicates a general position, but it does not identify the specific neighborhood features or Metro 2050 goals that support it.",
    "The thesis contains the main idea, but its length makes the argument less direct and precise.",
    "The thesis previews the topic, but it describes what the paper will discuss rather than stating an arguable position.",
    "The thesis addresses part of the question but does not answer whether you would adjust your vision to align more closely with Metro 2050.",
    "Your thesis discusses whether Metro 2050 would improve the neighborhood, but the question asks whether your own future vision is consistent with the strategy.",
    "The introductory paragraph does not contain a clear thesis. Without a direct answer to the question, the essay’s overall position is difficult to determine.",
    "The essay’s thesis is difficult to support because the collage did not include a developed future vision to compare with Metro 2050."
  ],
  "Adaptable thesis prompt": [
    "A stronger thesis could have followed a structure such as: “I argue that my vision for `[neighborhood]` is `[fully/partly/not]` consistent with Metro 2050 because `[reason 1]` and `[reason 2]`; however, I would adjust `[part of vision]` to better support `[goal]`.”"
  ]
},
    essayIntroConclusion: {
  "Strong": [
    "The introduction clearly presents the neighborhood, Metro 2050, and the central themes of the paper before stating the thesis. Good job!",
    "Nice use of a path statement to preview the organization of the essay. You provide the reader with a clear idea of what the paper will cover and how.",
    "The conclusion effectively restates the thesis and summarizes the main argument without introducing new material. Well done.",
    "The introductory and concluding paragraphs give the essay a clear structure."
  ],
  "Introduction — developing": [
    "The thesis appears before the main themes—neighborhood development, your particular neighborhood, and Metro 2050—are adequately introduced, so the reader receives limited context for the argument.",
    "The introduction does not identify where `[neighborhood]` is located or what distinguishes it.",
    "The introduction refers to Metro 2050’s goals without first explaining what the regional growth strategy is.",
    "The first paragraph moves directly into detailed comparison and reads more like a body paragraph because it lacks broader context.",
    "The introduction includes a lot of detailed description that would have been better suited to the body paragraphs.",
    "The introduction provides some context but does not include a thesis that directly answers the essay question.",
    "The absence of a path statement makes it less clear which goals or issues the essay examines."
  ],
  "Conclusion — developing": [
    "The conclusion summarizes the neighborhood’s needs but does not restate the thesis or answer to the essay question.",
    "The conclusion is on the right track but does not state whether your vision aligns with Metro 2050 or whether you would modify it.",
    "The conclusion is not sufficiently concise and does not effectively restate the thesis and principal reasons without introducing new ideas.",
    "No clearly defined concluding paragraph is present.",
    "The conclusion repeats earlier points but does not bring them together into a final answer to the question."
  ]
},
    essayReading: {
  "Strong": [
    "You identify and explain the relevant Metro 2050 goals accurately. Nice work.",
    "The essay engages thoughtfully with the plan rather than simply summarizing it.",
    "You connect the plan’s concepts effectively to concrete features of your neighborhood.",
    "Your interpretation demonstrates a good understanding of both the plan’s goals and their practical implications."
  ],
  "Developing": [
    "You demonstrate a basic understanding of the reading, but the engagement remains limited in depth and completeness.",
    "The Metro 2050 goals are named or quoted but not adequately explained.",
    "Key terms such as `[complete communities/transit-oriented growth/urban containment/affordable housing]` are used without being defined in your own words.",
    "The quotations are not adequately explained or connected to the argument about the neighborhood.",
    "Much of this section paraphrases the plan without analyzing why its goals matter or how they would operate locally.",
    "The essay engages primarily with the plan’s introductory pages rather than the specific sections explaining its major goals.",
    "Some factual information required by the assignment instructions is missing from the discussion of the reading.",
    "The discussion of `[topic]` shows some engagement with the plan, but it either misrepresents the source or does not clearly distinguish the plan’s proposals from your interpretation.",
    "The discussion does not examine the policies, construction, funding, or behavioural changes required to achieve the goal.",
    "The essay treats the plan’s goals as automatically compatible and does not examine tensions or trade-offs among them."
  ]
},
    essayCitations: {
  "Strong": [
    "The required direct quotations are included and the in-text citations are correctly formatted. Nice work.",
    "Quotations are integrated smoothly into your sentences and followed by clear explanation.",
    "Citation style is consistent throughout the essay."
  ],
  "Missing requirements": [
    "The essay does not include the required number of direct quotations.",
    "The essay includes cited paraphrases, which appropriately acknowledge the source, but these do not satisfy the requirement for direct quotations—word-for-word passages from the plan placed in quotation marks.",
    "One quotation is missing an in-text citation.",
    "Some outside wording is presented without quotation marks or acknowledgment."
  ],
  "MLA-style formatting and integration": [
    "The source is acknowledged, but the citation punctuation is not in the required format. The correct order is: “quoted words” (Metro Vancouver 31).",
    "The citation format is incorrect: it should use the author or organization and page number in parentheses without the word “page.”",
    "The same source is identified inconsistently across the citations.",
    "Some citations are not placed at the end of the sentence containing the borrowed material.",
    "A quotation is inserted as a disconnected sentence rather than integrated grammatically into the writing.",
    "The quotations provide relevant evidence, but some are not followed by an explanation of the concept or its relevance to the argument.",
    "The quotation on `[topic]` is relevant, but its logical relationship to the sentence that follows is not made clear.",
    "One quotation is missing an opening or closing quotation mark, which makes the boundary of the borrowed wording unclear."
  ]
},
    essayAnalysis: {
  "Strong": [
    "The essay provides a clear overview of the neighborhood and connects its strengths and problems thoughtfully to Metro 2050.",
    "You apply the plan to specific neighborhood spaces rather than discussing the city only in general terms.",
    "The analysis moves beyond description to consider causes, consequences, feasibility, and trade-offs.",
    "You make a strong connection between the vision presented in the collage and the argument developed in the essay.",
    "Your discussion of `[topic]` is especially effective because it explains both the present condition and the changes required."
  ],
  "Neighborhood focus and required content": [
    "The discussion of `[city]` provides useful broader context, but the essay does not consistently apply the analysis to your particular neighborhood.",
    "The essay moves into the future vision without first providing a sufficiently clear overview of the neighborhood as it exists today.",
    "The essay does not clearly distinguish current neighborhood conditions from the future vision.",
    "The essay compares the collage with Metro 2050 without first explaining the future vision.",
    "The essay cannot fully make the required comparison because the collage did not contain a developed future vision.",
    "The collage and essay are inconsistent in their presentation of the zoning, statistics, problems, or future vision."
  ],
  "Depth and critical thinking": [
    "The analysis remains at the surface level because it identifies the issue without examining why it exists.",
    "The essay explains why the proposed change is desirable but not how it would work in practice.",
    "The proposal does not identify where new housing, businesses, transit infrastructure, or public space could realistically be located.",
    "The call for more affordable housing is relevant, but the proposal does not specify the housing type, likely cost, or role of subsidies and public policy.",
    "The call for more transit is relevant, but the analysis does not consider density, demand, route frequency, nearby employment, walking access, or residents’ travel preferences.",
    "The goal of reducing car dependence is clear, but the essay does not identify which alternatives would need to become safer, faster, or more convenient.",
    "The mixed-use proposal has potential, but the essay does not address whether existing land would be redeveloped or how residents and businesses might be affected.",
    "The environmental goal is relevant, but the source of the problem and the actors responsible for addressing it are not identified.",
    "The analysis does not consider who benefits, who pays, or whether any groups could be displaced or disadvantaged.",
    "The proposal is not tested against existing facts or regulations; the recommended policy may already exist, making enforcement the actual issue.",
    "The argument shows promise, but an inaccurate price, zoning code, or population figure reduces its credibility.",
    "The links among density, local employment, transit frequency, and car dependence are not made explicit.",
    "The essay does not explore possible objections or limitations to the preferred vision."
  ]
},
    overall: {
  "Strong performance": [
    "This is thoughtful and well-developed work. You meet the assignment requirements and communicate a clear understanding of your neighborhood and its relationship to Metro 2050.",
    "Strong work overall. Your evidence, organization, and analysis reinforce one another effectively.",
    "You created an engaging collage and a focused essay. Greater precision and depth of analysis would have made the final submission even stronger."
  ],
  "Solid but developing": [
    "The submission contains several strong elements and identifies relevant neighborhood features. Its effectiveness is limited, however, because their significance, causes, and possible solutions are not consistently explained.",
    "You gathered useful material and established a promising argument, but limited neighborhood-specific evidence and depth reduced its effectiveness.",
    "The work demonstrates a general understanding of the assignment and introduces relevant ideas, but several remain only briefly explained or developed.",
    "Several required elements are missing, making it difficult for the collage and essay to answer the central question fully."
  ],
  "Major requirements not met": [
    "The submission shows an initial understanding of the task, but several required components are missing. These omissions prevent the work from presenting a complete story and argument.",
    "The submission contains a number of potentially useful ideas, but limited explanation and connections among them prevent those ideas from forming a fully developed argument.",
    "For future assignments, discussing the requirements, thesis construction, direct quotations, and citation format during office hours may help you demonstrate your ideas more effectively."
  ]
}
  };
  const REQUIRED_ELEMENT_KEYS = new Set(["overview_of_neighborhood", "the_feel", "housing", "commercial_districts_and_economy", "people_and_community", "transportation", "public_space_and_art", "two_key_problems", "vision_for_the_future", "birdseye_map", "zoning_map", "selfie_in_neighborhood", "ten_pictures_or_videos", "two_statistics_or_data", "works_cited_statistics", "multiple_pages"]);
  const REQUIRED_GENERAL_COMMENTS = [
  "This required element is clearly included and contributes useful evidence to the collage.",
  "This required element is present, but its significance is not fully explained.",
  "This required element is not clearly identifiable in the final collage."
];
  const REQUIRED_SPECIFIC_COMMENTS = {
  "overview_of_neighborhood": [
    "Your overview introduces the neighborhood, but it does not fully address its feel, housing, commercial activity, people and community, transportation, and public space or art. More complete coverage would have provided a stronger picture of the area."
  ],
  "two_key_problems": [
    "You point to concerns in the neighborhood, but the two key problems are not clearly identified. Naming them directly would have made the collage’s central message easier to follow.",
    "You clearly identify `[problem]`; however, the second required problem is not clear enough for the viewer to recognize."
  ],
  "vision_for_the_future": [
    "You have included the required overview, two problems, future vision, maps, original photographs, statistics, and works cited information.",
    "You identify the problems clearly, but the discussion of possible responses or solutions is brief. More development would have strengthened the future vision.",
    "The collage describes current conditions, but it does not provide the required overall vision of what the neighborhood should be like in approximately 20 years.",
    "Your future vision responds to `[one problem]`, which is a useful starting point, but it does not present a broader vision for the neighborhood as a whole.",
    "The future vision is present but does not clearly show how the neighborhood would look, function, or feel differently."
  ],
  "birdseye_map": [
    "A bird’s-eye or satellite map showing the built form of the neighborhood is required.",
    "The map included does not clearly show the built form of your particular neighborhood."
  ],
  "zoning_map": [
    "The zoning material is incomplete: the required map from the assigned source or the relevant zoning code is missing. As a result, this requirement is not fully met.",
    "You include the zoning code, but it would be more meaningful if the collage showed what `[code]` zoning permits or why that matters for the neighborhood."
  ],
  "selfie_in_neighborhood": [
    "The required selfie taken in the neighborhood is not included."
  ],
  "ten_pictures_or_videos": [
    "You include some original visual material, but the submission does not meet the requirement of ten photographs or videos taken by you in the neighborhood."
  ],
  "two_statistics_or_data": [
    "The submission includes limited data and does not meet the requirement of two pieces of neighborhood-specific evidence in addition to zoning information.",
    "The statistics provide useful broader context for `[Surrey/Metro Vancouver/Canada]`, but they are not specific to your neighborhood. More local evidence would have made the analysis more relevant."
  ],
  "works_cited_statistics": [
    "You have included the required overview, two problems, future vision, maps, original photographs, statistics, and works cited information.",
    "The statistics are included, but the works cited information is not complete enough for the sources to be located and verified.",
    "Some outside images, quotations, or statistics are not acknowledged. Consistent quotation marks and citations would have made the use of sources clearer and more academically responsible."
  ]
};
  const CATEGORY_LABELS = {
    requiredElements: "Required elements",
    collageStory: "Collage storytelling",
    collageDesign: "Collage design",
    essayThesis: "Thesis",
    essayIntroConclusion: "Introduction and conclusion",
    essayReading: "Interpretation of reading",
    essayCitations: "Quotations and citations",
    essayAnalysis: "Analysis",
    overall: "Overall feedback",
  };
  const QUESTION_FEEDBACK_MAP = {
  "collage_thoughtful_overview": [
    "collageStory"
  ],
  "collage_design_quality": [
    "collageDesign"
  ],
  "collage_grade": [
    "overall"
  ],
  "collage_comments": [
    "requiredElements",
    "collageStory",
    "collageDesign",
    "overall"
  ],
  "essay_thesis": [
    "essayThesis"
  ],
  "essay_intro_conclusion": [
    "essayIntroConclusion"
  ],
  "essay_reading_interpretation": [
    "essayReading"
  ],
  "essay_citations": [
    "essayCitations"
  ],
  "essay_analysis": [
    "essayAnalysis"
  ],
  "essay_grade": [
    "overall"
  ],
  "essay_comments": [
    "essayThesis",
    "essayIntroConclusion",
    "essayReading",
    "essayCitations",
    "essayAnalysis",
    "overall"
  ]
};

  function categoryGroups(categoryName) {
    const category = FEEDBACK_COMMENTS_BANK[categoryName] || {};
    return Object.entries(category).map(([label, comments]) => ({
      label: `${CATEGORY_LABELS[categoryName]} — ${label}`,
      comments: comments.slice(),
    }));
  }

  function feedbackGroupsForQuestion(questionKey) {
    if (REQUIRED_ELEMENT_KEYS.has(questionKey)) {
      const groups = [{label: "General required-element feedback", comments: REQUIRED_GENERAL_COMMENTS.slice()}];
      const specific = REQUIRED_SPECIFIC_COMMENTS[questionKey] || [];
      if (specific.length) groups.push({label: "Feedback specific to this requirement", comments: specific.slice()});
      return groups;
    }
    return (QUESTION_FEEDBACK_MAP[questionKey] || []).flatMap(categoryGroups);
  }

  window.FEEDBACK_COMMENTS_BANK = FEEDBACK_COMMENTS_BANK;
  window.feedbackGroupsForQuestion = feedbackGroupsForQuestion;
})();
