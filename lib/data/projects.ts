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
      "Full-stack decision-support platform for air quality that combines ward-level AQI forecasting, source-attribution signals, inspection prioritization, and citizen advisories through a FastAPI backend and interactive React dashboard.",
    stack: ["Python", "FastAPI", "React", "XGBoost", "Docker"],
    github: "https://github.com/Elarionitis/aeris",
    live: null,
  },
  {
    name: "SignEase",
    tagline: "Real-time sign language detection",
    summary:
      "Web application for webcam-based sign recording and AI-assisted prediction, using a Next.js frontend with a Flask backend that extracts MediaPipe landmarks and runs TensorFlow Lite inference for ASL recognition.",
    stack: ["Next.js", "TypeScript", "Flask", "TensorFlow Lite", "MediaPipe"],
    github: "https://github.com/Elarionitis/SignEase",
    live: "https://sign-ease-eight.vercel.app",
  },
  {
    name: "Repo Context MCP",
    tagline: "Repository context server for coding agents",
    summary:
      "Lightweight MCP server that fetches GitHub repository metadata and README content, detects basic stack signals, and returns structured repository context for AI coding assistants.",
    stack: ["TypeScript", "Node.js", "MCP SDK", "GitHub REST API"],
    github: "https://github.com/Elarionitis/repo-context-mcp",
    live: null,
  },
  {
    name: "Spendly",
    tagline: "Shared expense ledger",
    summary:
      "Feature-first Flutter expense management app with Firebase-backed authentication and real-time sync, focused on shared group ledgers, debt settlement flows, analytics, and cross-platform delivery.",
    stack: ["Flutter", "Dart", "Riverpod", "Firebase", "Cloud Firestore"],
    github: "https://github.com/Elarionitis/Spendly",
    live: null,
  },
  {
    name: "Orbit",
    tagline: "Multi-client TCP chat",
    summary:
      "Local multi-client TCP chat system with a threaded server and terminal client, featuring username-based messaging, server-side timestamps, and graceful connection handling.",
    stack: ["C++17", "POSIX Sockets", "Multithreading", "CMake"],
    github: "https://github.com/Elarionitis/Orbit",
    live: null,
  },
];
