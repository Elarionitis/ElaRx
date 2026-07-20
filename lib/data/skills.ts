export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["C/C++", "Python", "JavaScript", "TypeScript", "Java", "PHP", "Dart", "SQL"],
  },
  {
    title: "Frameworks",
    items: ["FastAPI", "React.js", "Flutter", "Node.js", "TensorFlow"],
  },
  {
    title: "Systems",
    items: ["distributed systems", "concurrency", "PostgreSQL", "MySQL", "Vector DBs", "Firebase"],
  },
  {
    title: "Tools",
    items: ["Git", "Linux", "REST APIs"],
  },
];
