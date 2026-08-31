/*
  Project content. Case-study sections are optional by design: a project only
  renders the sections it actually has material for, so a thin entry reads as
  brief rather than as unfinished.

  Everything here comes from the resume or the repositories. Where a section is
  absent it is because the information does not exist yet, not because it was
  skipped — see README for which projects still need write-ups.
*/

import type { Decision } from "@/lib/data/decisions";

export type ProjectCategory = "featured" | "work" | "experiment";
export type ProjectStatus = "live" | "source" | "research" | "prototype";

export type Detail = {
  title: string;
  body: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  name: string;
  /** One line, shown under the name on cards. */
  tagline: string;
  /** Two lines maximum. Card body and case-study intro. */
  summary: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** Shared vocabulary with decisions.ts, so the two can be cross-filtered. */
  domain: Decision["domain"];
  role: string;
  timeframe?: string;
  stack: string[];
  links: { github?: string; live?: string; paper?: string };
  /** Everything below is optional and renders only when present. */
  problem?: string;
  approach?: string;
  architecture?: Detail[];
  decisions?: Detail[];
  challenges?: Detail[];
  results?: Metric[];
  relatedWriting?: string;
};

export const projects: Project[] = [
  {
    slug: "carequeue",
    name: "CareQueue",
    tagline: "Continuous triage and queue surveillance for emergency departments",
    summary:
      "A triage assistant built around the patients who are missed rather than the ones who are obvious: it scores risk from outcomes instead of from assigned levels, and keeps watching everyone in the waiting room for deterioration.",
    category: "featured",
    status: "prototype",
    domain: "Risk modelling",
    role: "Team lead, Team InnovX",
    timeframe: "Accenture Innovation Challenge, round 2",
    stack: ["TypeScript", "Next.js", "React", "NHAMCS 2022"],
    links: {},
    problem:
      "Triage is usually built as classification — a nurse assigns a severity level and the model learns to agree. But in the 2022 NHAMCS data, 45.8% of critical-care outcomes came from patients triaged level 3, 4 or 5. They were correctly processed, and then they waited. A model that agrees with the nurse learns to miss exactly the same people.",
    results: [
      { value: "56.7%", label: "Critical outcomes caught, vs 39.0%" },
      { value: "50.6%", label: "Under-triage rescued" },
      { value: "6,410", label: "Held-out visits evaluated" },
    ],
  },
  {
    slug: "signease",
    name: "SignEase",
    tagline: "Real-time ASL recognition over WebSocket",
    summary:
      "A sequence-aware Transformer that reads American Sign Language from a webcam, served by a low-latency inference microservice and streamed back to the browser frame by frame.",
    category: "featured",
    status: "live",
    domain: "Machine learning",
    role: "Solo",
    stack: ["Python", "TensorFlow", "FastAPI", "React", "MediaPipe", "WebSocket"],
    links: { github: "https://github.com/Elarionitis/SignEase", live: "https://sign-ease-eight.vercel.app" },
    problem:
      "Sign language is sequential. Classifying single frames throws away the movement that distinguishes one gesture from another, and anything that recognises a sign after it has finished is too slow to feel like a conversation.",
    approach:
      "Extract hand landmarks in the browser, send sequences rather than frames to a dedicated inference service, and keep the round trip under the threshold where the delay becomes noticeable.",
    architecture: [
      {
        title: "Landmark extraction in the browser",
        body: "MediaPipe pulls hand landmarks client-side, so what crosses the network is a small vector of coordinates rather than video. Features are normalised, which decouples accuracy from lighting conditions.",
      },
      {
        title: "Sequence-aware Transformer",
        body: "The model is trained on 30,000+ landmark frames across 26 ASL gesture classes and reads a window of frames rather than one, so it can tell apart gestures that differ only in movement.",
      },
      {
        title: "Streaming inference service",
        body: "A FastAPI microservice holds the model and talks to the React frontend over a WebSocket, which keeps the connection open instead of paying handshake cost on every frame.",
      },
    ],
    decisions: [
      {
        title: "Why WebSocket rather than HTTP polling",
        body: "At sub-100ms per frame, HTTP request overhead is a meaningful fraction of the budget. A persistent connection removes it and makes the latency predictable rather than bursty.",
      },
      {
        title: "Why quantise the model",
        body: "Batch processing and quantisation lifted throughput 40% and cut model size 4x, at under 2% accuracy loss. For an interactive demo, responsiveness was worth more than the last two points of accuracy.",
      },
    ],
    results: [
      { value: "96%+", label: "Accuracy, 26 classes" },
      { value: "<100ms", label: "Per frame" },
      { value: "+40%", label: "Throughput" },
      { value: "4x", label: "Smaller model" },
    ],
  },
  {
    slug: "spendly",
    name: "Spendly",
    tagline: "Event-sourced shared expense ledger",
    summary:
      "A group expense tracker built as an append-only ledger, so concurrent edits from several people cannot conflict, and a settlement algorithm that minimises the number of payments.",
    category: "featured",
    status: "source",
    domain: "Concurrency",
    role: "Solo",
    stack: ["Flutter", "Dart", "Riverpod", "Cloud Firestore"],
    links: { github: "https://github.com/Elarionitis/Spendly" },
    problem:
      "Several housemates editing the same shared ledger at once is a concurrency problem wearing a consumer-app costume. Mutable balances need locking, and locking on a mobile client with intermittent connectivity does not work.",
    approach:
      "Never mutate a balance. Append immutable events and derive balances from them, which removes the race condition rather than defending against it.",
    architecture: [
      {
        title: "Append-only event log",
        body: "Every expense is an event appended to the ledger; balances are a fold over the log. With no in-place writes there is nothing to contend over, so no locking is needed and there were zero data conflicts in testing across 5+ concurrent users per session.",
      },
      {
        title: "Reactive state across 20+ screens",
        body: "16 concurrent Firestore listeners are orchestrated with Riverpod, so screens update from the same source of truth without each one running its own query.",
      },
    ],
    decisions: [
      {
        title: "Why event sourcing over locking",
        body: "Locking assumes connectivity and a coordinator. An append-only log gives synchronisation guarantees equivalent to CRDT patterns without either, which suits a mobile client that may be offline mid-edit.",
      },
      {
        title: "Minimising settlements",
        body: "Naively, n members settling pairwise generates far more transfers than necessary. A Minimize Cash Flow pass runs in O(n log n) and reduces a group to at most n-1 transactions, up to 70% fewer payments than the naive approach.",
      },
    ],
    results: [
      { value: "0", label: "Data conflicts in testing" },
      { value: "n-1", label: "Max settlements for n members" },
      { value: "70%", label: "Fewer payments than naive" },
    ],
  },
  {
    slug: "aeris",
    name: "Aeris",
    tagline: "Air-quality intelligence platform",
    summary:
      "Ward-level AQI forecasting with source attribution and inspection ranking, served by a FastAPI backend behind a React dashboard.",
    category: "featured",
    status: "source",
    domain: "Machine learning",
    role: "Solo",
    stack: ["Python", "FastAPI", "React", "XGBoost", "Docker"],
    links: { github: "https://github.com/Elarionitis/aeris" },
  },
  {
    slug: "repo-context-mcp",
    name: "Repo Context MCP",
    tagline: "Repository context server for coding agents",
    summary:
      "An MCP server that hands a coding agent repository metadata, README content and stack signals as structured data, instead of making it ask.",
    category: "work",
    status: "source",
    domain: "Systems",
    role: "Solo",
    stack: ["TypeScript", "Node.js", "MCP SDK", "GitHub REST API"],
    links: { github: "https://github.com/Elarionitis/repo-context-mcp" },
  },
  {
    slug: "orbit",
    name: "Orbit",
    tagline: "Multi-client TCP chat server",
    summary:
      "A threaded chat server in C++17 that holds many clients at once, one thread per connection, with a terminal client to talk to it.",
    category: "experiment",
    status: "source",
    domain: "Concurrency",
    role: "Solo",
    stack: ["C++17", "POSIX Sockets", "Multithreading", "CMake"],
    links: { github: "https://github.com/Elarionitis/Orbit" },
  },
];

export const featuredProjects = projects.filter((project) => project.category === "featured");

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}

/** True when there is enough written up to justify a case-study page. */
export function hasCaseStudy(project: Project) {
  return Boolean(project.problem || project.architecture?.length || project.decisions?.length);
}
