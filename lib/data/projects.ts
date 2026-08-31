export type Project = {
  /** Short product name — used as the heading. */
  name: string;
  /** One line under the name saying what the thing is. */
  tagline: string;
  summary: string;
  stack: string[];
  github: string;
  live: string | null;
};

// Adding a project means appending one object here. No component changes.
export const projects: Project[] = [
  {
    name: "Aeris",
    tagline: "Air-quality intelligence platform",
    summary:
      "Ward-level AQI forecasting with source attribution and inspection ranking.",
    stack: ["Python", "FastAPI", "React", "XGBoost", "Docker"],
    github: "https://github.com/Elarionitis/aeris",
    live: null,
  },
  {
    name: "SignEase",
    tagline: "Real-time sign language detection",
    summary:
      "Webcam ASL recognition. Landmarks in the browser, inference on a Flask service.",
    stack: ["Next.js", "TypeScript", "Flask", "TensorFlow Lite", "MediaPipe"],
    github: "https://github.com/Elarionitis/SignEase",
    live: "https://sign-ease-eight.vercel.app",
  },
  {
    name: "Repo Context MCP",
    tagline: "Repository context server for coding agents",
    summary:
      "Hands a coding agent repo metadata, README and stack signals as structured data.",
    stack: ["TypeScript", "Node.js", "MCP SDK", "GitHub REST API"],
    github: "https://github.com/Elarionitis/repo-context-mcp",
    live: null,
  },
  {
    name: "Spendly",
    tagline: "Shared expense ledger",
    summary:
      "Group expense ledger that works out who owes whom, and settles it.",
    stack: ["Flutter", "Dart", "Riverpod", "Firebase", "Cloud Firestore"],
    github: "https://github.com/Elarionitis/Spendly",
    live: null,
  },
  {
    name: "Orbit",
    tagline: "Multi-client TCP chat",
    summary:
      "Threaded TCP chat server, one thread per connection, plus a terminal client.",
    stack: ["C++17", "POSIX Sockets", "Multithreading", "CMake"],
    github: "https://github.com/Elarionitis/Orbit",
    live: null,
  },
];
