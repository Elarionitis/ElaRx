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
      "I shipped full-stack features across 5+ production web apps in PHP, MySQL, and JavaScript. A lot of the work was making releases less painful and the database less sleepy: release cycles got about 30% shorter, and query/index work cut DB latency by roughly 35%.",
  },
  {
    role: "Student Developer",
    org: "SQORA — AI-Powered Learning Platform (Winter of Code)",
    dates: "Dec 2025–Apr 2026",
    summary:
      "I built the RAG path for a production learning platform with Gemini API and Qdrant, keeping responses under 500ms while holding retrieval accuracy above 95%. The fun part was making concurrent FastAPI services behave cleanly with async I/O instead of turning every request into a waiting room.",
  },
];
