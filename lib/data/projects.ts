/*
  Project content. Case-study sections are optional by design: a project only
  renders the sections it actually has material for, so a thin entry reads as
  brief rather than as unfinished.

  Everything here comes from the resume or the repositories. Where a section is
  absent it is because the information does not exist yet, not because it was
  skipped — see README for which projects still need write-ups.
*/

export type ProjectCategory = "featured" | "work" | "experiment";
export type ProjectStatus = "live" | "source" | "research";

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
    slug: "leader-election",
    name: "Communication-Efficient Leader Election",
    tagline: "Byzantine fault-tolerant consensus with zero-communication committee selection",
    summary:
      "A hybrid distributed-systems framework for leader election in a Byzantine-faulty network, co-authored under Prof. Nitin Awathare at IIT Jodhpur CSE.",
    category: "featured",
    status: "research",
    role: "Co-author",
    timeframe: "In progress, targeting Dec 2026 submission",
    stack: ["Distributed systems", "Byzantine consensus", "Cryptography", "PKI"],
    links: {},
    problem:
      "Leader election in a Byzantine setting normally costs a round of communication just to agree on who is eligible to vote. That selection traffic is pure overhead: it carries no application payload, and it grows with the size of the network.",
    approach:
      "Derive committee membership locally instead of agreeing on it. Every node computes the same committee from a shared pseudorandom function and the public round number, so selection costs nothing on the wire.",
    architecture: [
      {
        title: "Byzantine fault tolerance",
        body: "The framework tolerates f < N/3 static faults, the standard bound for Byzantine agreement, using cryptographic digital signatures over a public-key infrastructure to authenticate messages between nodes.",
      },
      {
        title: "Local committee derivation",
        body: "Committee membership is a function of a shared pseudorandom function and the public round number. Every honest node evaluates it independently and arrives at the same answer, so no messages are exchanged to form the committee.",
      },
    ],
    decisions: [
      {
        title: "Why a PRF over a coordination round",
        body: "A coordination round is the obvious way to agree on a committee and the expensive one. Deriving membership from a value every node already holds moves the cost from the network to local computation, which is the cheaper side of the trade in a wide network.",
      },
    ],
    results: [
      { value: "Zero", label: "Messages for selection" },
      { value: "f < N/3", label: "Static faults tolerated" },
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
    category: "work",
    status: "source",
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
