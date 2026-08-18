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
    title: "Aeris — Air-Quality Intelligence Platform",
    stack: ["Python", "FastAPI", "React", "XGBoost", "Docker"],
    summary:
      "Full-stack decision-support platform for air quality that combines ward-level AQI forecasting, source-attribution signals, inspection prioritization, and citizen advisories through a FastAPI backend and interactive React dashboard.",
    github: "https://github.com/Elarionitis/aeris",
    live: null,
  },
  {
    title: "Real-Time Sign Language Detection",
    stack: ["Next.js", "TypeScript", "Flask", "TensorFlow Lite", "MediaPipe"],
    summary:
      "Web application for webcam-based sign recording and AI-assisted prediction, using a Next.js frontend with a Flask backend that extracts MediaPipe landmarks and runs TensorFlow Lite inference for ASL recognition.",
    github: "https://github.com/Elarionitis/SignEase",
    live: "https://sign-ease-eight.vercel.app",
  },
  {
    title: "Spendly — Expense Ledger",
    stack: ["Flutter", "Dart", "Riverpod", "Firebase", "Cloud Firestore"],
    summary:
      "Feature-first Flutter expense management app with Firebase-backed authentication and real-time sync, focused on shared group ledgers, debt settlement flows, analytics, and cross-platform delivery.",
    github: "https://github.com/Elarionitis/Spendly",
    live: null,
  },
];
