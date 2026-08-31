export type ExperienceItem = {
  role: string;
  org: string;
  dates: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Development Engineer Intern",
    org: "Webify Design",
    dates: "May–Jun 2026",
    highlights: [
      "Shipped features across 5+ production web apps in PHP and JavaScript. Reusing existing modules cut release cycles by over 30%.",
      "Reindexed MySQL and cleared N+1 queries from the hot endpoints. Read latency down ~35%.",
      "Root-cause analysis on production incidents, plus the instrumentation we had been missing.",
    ],
  },
  {
    role: "Student Developer",
    org: "SQORA — AI-Powered Learning Platform (Winter of Code)",
    dates: "Dec 2025–Apr 2026",
    highlights: [
      "RAG pipeline on Gemini and Qdrant. 500+ documents, sub-500ms end-to-end retrieval, three workflows.",
      "Async FastAPI layer so four ingestion streams run in parallel without blocking.",
      "Validation and monitoring on ingestion, so bad documents fail loudly instead of degrading retrieval.",
    ],
  },
];
