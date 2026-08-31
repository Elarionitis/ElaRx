export type ExperienceItem = {
  role: string;
  org: string;
  /** What the org actually does, for anyone who has not heard of it. */
  context: string;
  dates: string;
  stack: string[];
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Development Engineer Intern",
    org: "Webify Design",
    context: "Web development and e-commerce agency",
    dates: "May – Jun 2026",
    stack: ["PHP", "MySQL", "JavaScript", "HTML5/CSS3", "Shopify"],
    highlights: [
      "Shipped features across 5+ production web apps in PHP and JavaScript, reusing existing modules across similar client requirements rather than rebuilding cart and checkout flows from scratch.",
      "Reindexed MySQL and cleared N+1 queries from the hot endpoints. Read latency down ~35%.",
      "Root-cause analysis on production incidents, plus the instrumentation we had been missing.",
    ],
  },
  {
    role: "Student Developer",
    org: "SQORA",
    context: "AI-powered learning platform, Winter of Code",
    dates: "Dec 2025 – Apr 2026",
    stack: ["Python", "FastAPI", "Qdrant", "Gemini API"],
    highlights: [
      "RAG pipeline on Gemini and Qdrant, with prompt engineering and LLM context management. 500+ documents indexed, sub-500ms end-to-end retrieval across three engineering workflows.",
      "Async FastAPI layer so four ingestion streams run in parallel without blocking.",
      "Validation pipelines that eliminated every embedding failure observed in testing, so bad documents fail loudly instead of quietly degrading retrieval.",
    ],
  },
];
