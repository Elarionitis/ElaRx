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
      "Shipped features across 5+ production web apps in PHP, JavaScript and HTML5/CSS3. Reusing the modules that already existed instead of rewriting them cut release-cycle time by over 30%.",
      "Reindexed MySQL and cleared the N+1 queries out of the busiest endpoints. Data-retrieval latency came down by around 35%.",
      "Worked through root-cause analysis on production incidents with the wider team, and added the instrumentation we had been missing.",
    ],
  },
  {
    role: "Student Developer",
    org: "SQORA — AI-Powered Learning Platform (Winter of Code)",
    dates: "Dec 2025–Apr 2026",
    highlights: [
      "Built a production RAG pipeline on the Gemini API and Qdrant. 500+ documents indexed, end-to-end retrieval under 500ms, serving three engineering workflows.",
      "Wrote the FastAPI layer with async I/O so four ingestion streams could run in parallel without blocking each other.",
      "Added validation and monitoring around ingestion so bad documents failed loudly instead of quietly degrading retrieval.",
    ],
  },
];
