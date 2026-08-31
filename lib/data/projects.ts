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
      "Forecasts AQI at ward level, attributes it to likely sources, and ranks which sites are worth inspecting first. FastAPI backend, React dashboard, XGBoost doing the forecasting, and advisories for people who just want to know whether to go outside.",
    stack: ["Python", "FastAPI", "React", "XGBoost", "Docker"],
    github: "https://github.com/Elarionitis/aeris",
    live: null,
  },
  {
    name: "SignEase",
    tagline: "Real-time sign language detection",
    summary:
      "Records ASL signs from a webcam and predicts them as you go. MediaPipe pulls the hand landmarks, a Flask service runs the TensorFlow Lite model, and the Next.js frontend handles the capture loop.",
    stack: ["Next.js", "TypeScript", "Flask", "TensorFlow Lite", "MediaPipe"],
    github: "https://github.com/Elarionitis/SignEase",
    live: "https://sign-ease-eight.vercel.app",
  },
  {
    name: "Repo Context MCP",
    tagline: "Repository context server for coding agents",
    summary:
      "An MCP server that hands a coding agent the context it would otherwise have to ask you for: repository metadata, the README, and a read on the stack, returned as structured data.",
    stack: ["TypeScript", "Node.js", "MCP SDK", "GitHub REST API"],
    github: "https://github.com/Elarionitis/repo-context-mcp",
    live: null,
  },
  {
    name: "Spendly",
    tagline: "Shared expense ledger",
    summary:
      "Group expense tracking that works out who owes whom and helps settle it. Flutter on both platforms, Firebase for auth and real-time sync, Riverpod holding the state together.",
    stack: ["Flutter", "Dart", "Riverpod", "Firebase", "Cloud Firestore"],
    github: "https://github.com/Elarionitis/Spendly",
    live: null,
  },
  {
    name: "Orbit",
    tagline: "Multi-client TCP chat",
    summary:
      "A TCP chat server in C++17 that holds many clients at once, one thread per connection, with a terminal client to talk to it. Server-side timestamps, and disconnects that do not take the server down with them.",
    stack: ["C++17", "POSIX Sockets", "Multithreading", "CMake"],
    github: "https://github.com/Elarionitis/Orbit",
    live: null,
  },
];
