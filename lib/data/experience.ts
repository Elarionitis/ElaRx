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
      "I shipped full-stack features across 5+ production web apps in PHP, MySQL, and JavaScript. The useful work was tightening the release loop by about 30% and cutting database latency around 35% through query and index cleanup.",
  },
  {
    role: "Student Developer",
    org: "SQORA — AI-Powered Learning Platform (Winter of Code)",
    dates: "Dec 2025–Apr 2026",
    summary:
      "I built the production RAG path with Gemini API and Qdrant, keeping retrieval at 95%+ accuracy while the app stayed under 500ms. I also worked on concurrent FastAPI services with async I/O so the model-facing parts could stay responsive.",
  },
];
