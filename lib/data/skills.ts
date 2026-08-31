export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["C/C++", "Python", "TypeScript", "JavaScript", "Java", "PHP", "Dart", "SQL"],
  },
  {
    title: "Frameworks",
    items: ["FastAPI", "React", "Next.js", "Node.js", "Flutter", "TensorFlow"],
  },
  {
    title: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Qdrant", "Firebase", "Cloud Firestore"],
  },
  {
    title: "AI and LLM",
    items: [
      "Retrieval-augmented generation",
      "Prompt engineering",
      "LLM context management",
      "Gemini API",
    ],
  },
  {
    title: "Tooling",
    items: ["Git", "Linux", "Docker", "REST APIs", "Agile/Scrum"],
  },
  {
    title: "Systems",
    items: [
      "Distributed systems",
      "Multithreading",
      "Concurrency and synchronisation",
      "Async I/O",
      "Event-sourced architectures",
      "Cloud-native development",
    ],
  },
  {
    title: "Domains",
    items: [
      "System architecture",
      "Machine learning",
      "Cryptography",
      "AI-integrated systems",
      "Performance analysis and debugging",
    ],
  },
];
