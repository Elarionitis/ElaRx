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
    items: ["PostgreSQL", "MySQL", "Qdrant", "Firebase", "Cloud Firestore"],
  },
  {
    title: "Tooling",
    items: ["Git", "Linux", "Docker", "REST APIs"],
  },
  {
    title: "Areas",
    items: ["Distributed systems", "Concurrency", "Retrieval and RAG"],
  },
];
