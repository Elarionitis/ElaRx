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
      "Shipped full-stack features across 5+ production web applications in PHP, JavaScript and HTML5/CSS3, reusing existing modules where I could and cutting release-cycle time by over 30%.",
      "Restructured MySQL indexes and removed N+1 queries on the highest-traffic endpoints, which took roughly 35% off data-retrieval latency.",
      "Sat in on root-cause analysis for production incidents with the wider team and helped tighten observability across deployed systems.",
    ],
  },
  {
    role: "Student Developer",
    org: "SQORA — AI-Powered Learning Platform (Winter of Code)",
    dates: "Dec 2025–Apr 2026",
    highlights: [
      "Built a production RAG pipeline on the Gemini API and Qdrant, indexing 500+ documents and keeping end-to-end retrieval under 500ms across three engineering workflows.",
      "Wrote the FastAPI layer with async I/O so four ingestion streams could run in parallel without blocking each other.",
      "Added validation and monitoring around ingestion so bad documents failed loudly instead of quietly degrading retrieval.",
    ],
  },
];
