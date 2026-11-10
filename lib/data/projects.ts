/*
  Project content. Case-study sections are optional by design: a project only
  renders the sections it actually has material for, so a thin entry reads as
  brief rather than as unfinished.

  Everything here traces to a repository. Where a section is absent it is
  because the write-up does not exist yet, not because it was skipped.

  Numbers are the ones the repository reports, stated with the conditions that
  produced them. A figure without its conditions is marketing.
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
    slug: "orbit",
    name: "Orbit",
    tagline: "A sharded, durable chat server written from the socket up",
    summary:
      "A real-time chat server in modern C++ with its own event loop, wire protocol and write-ahead log. Every member of a room sees the same messages in the same order, and an acknowledged message survives kill -9.",
    category: "featured",
    status: "source",
    domain: "Systems",
    role: "Solo",
    stack: ["C++20", "epoll / kqueue", "OpenSSL", "CMake"],
    links: { github: "https://github.com/Elarionitis/Orbit" },
    problem:
      "A chat server has two promises that are easy to state and hard to keep together: everyone in a room reads the same history in the same order, and a message the server acknowledged is still there after the power goes out. The usual way to get the first is a lock around the room, which costs you the throughput, and the usual way to get the second is to fsync everything, which costs you the latency.",
    approach:
      "Make the ordering a property of the structure rather than of a lock, and make durability a policy the operator chooses rather than a default somebody has to live with. No frameworks: the reactor, the protocol, the log and the load generator are all in the repository, so every layer is one you can read.",
    architecture: [
      {
        title: "One event loop per thread, no locks on the message path",
        body: "A reactor over epoll on Linux and kqueue on macOS, with a hashed timing wheel giving O(1) connection and handshake deadlines. Writes are vectored and coalesced once per loop iteration, and the frame sent to a room is built once and shared by every recipient on that shard.",
      },
      {
        title: "Rooms sharded across threads, one writer each",
        body: "Each thread owns a set of connections and the rooms that hash to it. Exactly one thread ever writes to a room, and everything crossing shards travels through FIFO queues — so a total order per room falls out of the design and there is nothing to lock. Joining travels the same queues, which is what makes the handover from replayed history to the live stream exact rather than approximate.",
      },
      {
        title: "Segmented write-ahead log with group commit",
        body: "CRC-32C records in segments, three fsync policies from fastest to strictly durable, and recovery that truncates a torn final write and survives damage in older segments. TLS 1.2+ sits on a sans-IO layer so the reactor never blocks inside OpenSSL.",
      },
    ],
    decisions: [
      {
        title: "Why sharding instead of a lock per room",
        body: "A mutex around a room makes ordering a runtime property you have to keep getting right. Giving a room exactly one writer thread makes it a structural one: two members cannot disagree because no second writer exists. The cost is that a hot room cannot spread across cores, which is a trade worth making for a server where fan-out, not per-room ingest, is the scarce resource.",
      },
      {
        title: "Why one slow client is disconnected",
        body: "Output queues are bounded. When a client stops reading, the choice is to buffer it (and let one dead connection consume the memory of the whole shard) or to cut it off. Orbit cuts it off, so a stalled reader is a problem for that reader alone and nobody else notices.",
      },
      {
        title: "Why the benchmark generator is open-loop",
        body: "A closed-loop generator waits for the server before sending the next request, so a stall quietly reduces the offered load instead of showing up as latency. Given a rate, the generator keeps to it, which means coordinated omission cannot hide behind the throughput number. A run exits non-zero if any message went missing.",
      },
    ],
    results: [
      { value: "17.4M/s", label: "Peak deliveries, 100 clients in one room" },
      { value: "0.20ms", label: "p99 at 1,000 clients, 200k deliveries/s" },
      { value: "0", label: "Acknowledged messages lost across repeated SIGKILL" },
      { value: "185", label: "Tests, with ASan, TSan, UBSan and fuzzing" },
    ],
  },
  {
    slug: "signease",
    name: "SignEase",
    tagline: "Sign language recognition that runs the hard part in your browser",
    summary:
      "Record a sign with a webcam and read it back. Landmark tracking happens client-side on every frame, so the model sees the full frame rate and the server does almost no work.",
    category: "featured",
    status: "live",
    domain: "Machine learning",
    role: "Solo",
    stack: ["Next.js", "TypeScript", "MediaPipe", "Flask", "TensorFlow Lite"],
    links: { github: "https://github.com/Elarionitis/SignEase", live: "https://sign-ease-eight.vercel.app" },
    problem:
      "The model was trained on portrait phone video of people signing. A visitor arrives with a 4:3 laptop webcam, sits too close, and raises their hands before the sign starts. Each of those is a mismatch between the recording and the training data, and together they were costing far more accuracy than the model itself was.",
    approach:
      "Treat the gap between a webcam and the training set as the engineering problem, not as a modelling one. Fix the recording to look like what the model expects, then make the confidence it reports mean what it says.",
    architecture: [
      {
        title: "Landmark tracking in the browser",
        body: "MediaPipe Holistic runs on every camera frame over WebAssembly and WebGL, self-hosted rather than fetched from a CDN. What crosses the network is 94 rows of landmark coordinates — about six times less data than full frames, with identical predictions.",
      },
      {
        title: "A backend that only classifies",
        body: "Flask resamples the uploaded sequence to the 30fps the model was trained on, finds the part of the recording where the sign actually happens — leaving out raising, holding and lowering the hands — and runs the TensorFlow Lite classifier.",
      },
      {
        title: "Backpressure instead of timeouts",
        body: "Several copies of the model take requests in parallel, each with a bounded queue. When they are all busy the server answers 503 with Retry-After immediately rather than holding the connection, and the page retries with jittered backoff and says so. The slow video fallback has its own small queue so it cannot starve the fast path.",
      },
    ],
    decisions: [
      {
        title: "Why tracking moved to the browser",
        body: "Running MediaPipe server-side was the bottleneck in production: a starter CPU had to sample only a few frames to avoid timing out, and the model's confidence collapsed on those sparse sequences — 30% against 74% on the same Kaggle sample. Tracking client-side gives the model the full frame rate, as it has locally, at no server cost.",
      },
      {
        title: "Why the backend re-expresses the frame shape",
        body: "MediaPipe coordinates are fractions of the frame's width and height, and the training videos are roughly 3:4. A 4:3 webcam therefore squeezes every hand shape to about half its width before the model ever sees it. The browser sends its aspect ratio and the backend re-expresses the landmarks as a 3:4 frame.",
      },
      {
        title: "Why the signing hand is chosen by confidence",
        body: "The model reads one hand, the one tracked in more frames — which in a two-handed sign is often the still base hand. Scoring each hand separately and keeping the more confident result fixed 6 predictions and broke none on the 120 dictionary videos, and held on the 127 added later, which it was not tuned on.",
      },
      {
        title: "Why the confidence shown is not the model's",
        body: "The model was trained with smoothed labels, so its raw scores rarely pass about 75% even when it is right. A number that never reaches certainty teaches people to ignore it. Temperature scaling fitted on held-out video makes the displayed confidence match how often predictions are actually correct.",
      },
    ],
    results: [
      { value: "250", label: "Signs in the vocabulary" },
      { value: "60% / 68%", label: "Top-1 / top-3 on 120 unseen videos" },
      { value: "6x", label: "Smaller uploads than sending frames" },
      { value: "2x", label: "Throughput from parallel model copies" },
    ],
  },
  {
    slug: "tradstrat",
    name: "TradStrat",
    tagline: "A backtester that tries to prove your strategy wrong",
    summary:
      "Most backtesters tell you what a strategy would have made. This one asks whether you should believe it: parameters tuned without hindsight, confidence intervals on the result, and a correction for how many configurations you tried.",
    category: "featured",
    status: "research",
    domain: "Quantitative research",
    role: "Solo",
    stack: ["Python", "pandas", "NumPy", "Streamlit", "Plotly"],
    links: { github: "https://github.com/Elarionitis/TradStrat" },
    problem:
      "A backtest that is subtly wrong is worse than no backtest, because it produces confident, wrong numbers. Fill a signal at the price that generated it, tune parameters on the whole history, and compare the result against zero, and almost any strategy looks like a discovery.",
    approach:
      "Build the engine so the mistakes are impossible rather than discouraged — fills happen at the next bar's open, parameters are chosen on past data only — and then report the result with the statistics that survive the search you ran to find it.",
    architecture: [
      {
        title: "An event-driven engine, in the order a live system would act",
        body: "At the open it acts on the signal formed at the previous close; during the bar it checks stops against the low; at the close it marks the position to market. Commission, slippage and whole-share sizing are charged, and the benchmark runs through the same simulator and pays the same costs.",
      },
      {
        title: "Walk-forward validation",
        body: "Parameters are chosen on one window and traded on the next, then the window rolls forward. Joining the unseen windows gives an equity curve built only from decisions that could have been made at the time.",
      },
      {
        title: "Statistics that account for the search",
        body: "Deflated and probabilistic Sharpe ratios, block bootstrap confidence intervals, and the probability of beating the benchmark rather than of beating zero.",
      },
    ],
    decisions: [
      {
        title: "Why the benchmark is buy and hold, not zero",
        body: "On ten years of SPY the best moving-average crossover reaches a deflated Sharpe of 98.4% against zero, which reads as a discovery. Against buy and hold it is 2.5%. A long-only strategy clears the first bar simply by owning a rising market, so that bar measures the market, not the strategy.",
      },
      {
        title: "Why look-ahead bias is a property test",
        body: "A property-based test runs against every registered strategy and asserts that signals computed on a truncated history match the full-history signals exactly. Other tests rewrite a bar's high, low and close and assert that what was bought at its open does not change. Writing a new strategy gets you that coverage for free.",
      },
      {
        title: "Why the test suite is itself tested",
        body: "A script injects 20 realistic bugs into the engine and confirms the suite catches each one. A green suite over code that cannot fail is the most expensive kind of false confidence, and the only way to know the difference is to break something on purpose.",
      },
    ],
    results: [
      { value: "0.86 → 0.31", label: "Mean Sharpe, in-sample to out-of-sample" },
      { value: "1 of 30", label: "Runs beating buy and hold on Sharpe" },
      { value: "0 of 30", label: "Significant against buy and hold" },
      { value: "20 of 30", label: "Runs with a shallower drawdown" },
    ],
  },
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
    links: { github: "https://github.com/Elarionitis/CareQueue" },
    problem:
      "Triage is usually built as classification — a nurse assigns a severity level and the model learns to agree. But in the 2022 NHAMCS data, 45.8% of critical-care outcomes came from patients triaged level 3, 4 or 5. They were correctly processed, and then they waited. A model that agrees with the nurse learns to miss exactly the same people.",
    results: [
      { value: "56.7%", label: "Critical outcomes caught, vs 39.0%" },
      { value: "50.6%", label: "Under-triage rescued" },
      { value: "6,410", label: "Held-out visits evaluated" },
    ],
  },
  {
    slug: "spendly",
    name: "Spendly",
    tagline: "Event-sourced shared expense ledger",
    summary:
      "A group expense tracker built as an append-only ledger, so concurrent edits from several people cannot conflict, and a settlement algorithm that minimises the number of payments.",
    category: "work",
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
    category: "work",
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
    domain: "Developer tooling",
    role: "Solo",
    stack: ["TypeScript", "Node.js", "MCP SDK", "GitHub REST API"],
    links: { github: "https://github.com/Elarionitis/repo-context-mcp" },
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
