export type SkillGroup = {
  name: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    items: ["C/C++", "Python", "JavaScript", "TypeScript", "Java", "PHP", "Dart", "SQL"],
  },
  {
    name: "Frameworks",
    items: ["FastAPI", "React.js", "Flutter", "Node.js", "TensorFlow"],
  },
  {
    name: "Systems",
    items: ["Distributed systems", "Concurrency", "PostgreSQL", "MySQL", "Vector DBs", "Firebase"],
  },
  {
    name: "Tools",
    items: ["Git", "Linux", "REST APIs"],
  },
];
