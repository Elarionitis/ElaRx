export type ExperienceItem = {
  role: string;
  org: string;
  dates: string;
  summary: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Development Engineer Intern",
    org: "Webify Design",
    dates: "May–Jun 2026",
    summary:
      "I shipped full-stack features across 5+ production web applications using PHP, JavaScript, and HTML5/CSS3 for desktop and mobile, reusing existing modules and components where possible to improve release-cycle speed by over 30%. I optimized MySQL schemas and queries by restructuring indexes and eliminating N+1 patterns on high-traffic endpoints, reducing data-retrieval latency by around 35%. I also partnered with cross-functional teams on root-cause analysis for production incidents to improve observability, availability, and infrastructure reliability across deployed systems.",
  },
  {
    role: "Student Developer",
    org: "SQORA — AI-Powered Learning Platform (Winter of Code)",
    dates: "Dec 2025–Apr 2026",
    summary:
      "I architected a production-grade RAG pipeline integrating the Gemini API with Qdrant vector DB, indexing 500+ documents at under 500ms end-to-end latency and serving 3 engineering workflows with consistently relevant retrieval results. I built concurrent RESTful APIs in FastAPI with async I/O, removing bottlenecks across 4 parallel ingestion streams, and added validation and monitoring checks to support product quality, observability, and high availability at scale.",
  },
];
