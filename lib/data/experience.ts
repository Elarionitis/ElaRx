export type ExperienceItem = {
  role: string;
  org: string;
  /** What the org actually does, for anyone who has not heard of it. */
  context: string;
  dates: string;
  stack: string[];
  highlights: string[];
};

// Newest first.
export const experience: ExperienceItem[] = [
  {
    role: "Software Development Engineer Intern",
    org: "Webify Design",
    context: "Web development and e-commerce agency",
    dates: "May – Jun 2026",
    stack: ["PHP", "MySQL", "JavaScript", "HTML5/CSS3", "Shopify"],
    highlights: [
      "Built features for more than five live client websites in PHP and JavaScript, reusing existing cart and checkout code where clients needed the same thing.",
      "Made the busiest pages load data about 35% faster by fixing the MySQL indexes and removing repeated queries.",
      "Found the root cause of problems on live sites, and added the logging that was missing.",
    ],
  },
  {
    role: "Student Developer",
    org: "SQORA",
    context: "AI-powered learning platform, Winter of Code",
    dates: "Dec 2025 – Apr 2026",
    stack: ["Python", "FastAPI", "Qdrant", "Gemini API"],
    highlights: [
      "Built the search behind the AI answers with Gemini and Qdrant. It covers more than 500 documents and finds what it needs in under half a second.",
      "Made four document-loading jobs run at the same time with async FastAPI, so one does not wait for another.",
      "Added checks so a document that fails to load is reported straight away, not silently skipped.",
    ],
  },
];
