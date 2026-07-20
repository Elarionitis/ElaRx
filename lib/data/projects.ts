export type Project = {
  title: string;
  stack: string[];
  summary: string;
  github: string;
  live: string | null;
};

// Add more projects by appending another object in this exact shape — no other file needs to change.
export const projects: Project[] = [
  {
    title: "Real-Time Sign Language Detection",
    stack: ["Python", "TensorFlow", "FastAPI", "React.js", "MediaPipe"],
    summary:
      "I built transformer-based ASL recognition across 26 gesture classes, with 96%+ accuracy and sub-100ms WebSocket inference so the feedback still feels live.",
    github: "[ADD_LINK]",
    live: null,
  },
  {
    title: "Spendly — Expense Ledger",
    stack: ["Flutter", "Dart", "Riverpod", "Cloud Firestore"],
    summary:
      "I built Spendly as an event-sourced group expense ledger with real-time sync for 5+ users and an O(n log n) settlement-minimization path for cleaner final payments.",
    github: "[ADD_LINK]",
    live: null,
  },
];
