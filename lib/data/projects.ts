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
      "I built this around transformer-based ASL recognition: 26 gesture classes, 96%+ accuracy, and WebSocket inference that stays under 100ms.",
    github: "[ADD_LINK]",
    live: null,
  },
  {
    title: "Spendly — Expense Ledger",
    stack: ["Flutter", "Dart", "Riverpod", "Cloud Firestore"],
    summary:
      "I made Spendly as an event-sourced group ledger with real-time sync for 5+ users and an O(n log n) settlement-minimization path so the final payments stay sane.",
    github: "[ADD_LINK]",
    live: null,
  },
];
