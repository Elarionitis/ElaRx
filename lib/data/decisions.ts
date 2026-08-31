/*
  The spine of the site.

  Every entry is a real constraint from real work and the choice that resolved
  it. Nothing here is aspirational or invented — each one traces to a project
  in projects.ts or a role in experience.ts, and the `source` field is what
  links a decision back to its evidence.

  Adding work means adding decisions. A project with no decision worth writing
  down does not belong on the homepage.
*/

export type Decision = {
  /** Stable reference, printed in the margin. Never renumber a published one. */
  id: string;
  /** The choice, stated as a choice. */
  title: string;
  /** The constraint that forced it. One sentence. */
  constraint: string;
  /** Why this and not the obvious alternative. Two or three sentences. */
  reasoning: string;
  /** What it bought, when that is measurable. */
  outcome?: string;
  /** Slug in projects.ts, or an org name from experience.ts. */
  source: string;
  sourceLabel: string;
  domain: "Distributed systems" | "Machine learning" | "Concurrency" | "Databases" | "Systems";
};

export const decisions: Decision[] = [
  {
    id: "D-01",
    title: "Derive the committee locally instead of agreeing on one",
    constraint:
      "Electing a leader in a Byzantine network normally costs a full round of messages just to decide who is allowed to vote.",
    reasoning:
      "That round carries no application payload and grows with the network, so it is pure overhead. If every honest node can compute the same committee from a shared pseudorandom function and the public round number, the selection needs no messages at all — and it stays statistically indistinguishable from a uniformly random committee, even against a static Byzantine adversary. The cost moves from the network to local computation, which is the cheaper side of that trade.",
    outcome: "Zero messages for committee selection, tolerating f < N/3 static faults.",
    source: "leader-election",
    sourceLabel: "Leader Election",
    domain: "Distributed systems",
  },
  {
    id: "D-02",
    title: "Send landmark vectors, not video",
    constraint: "Streaming webcam frames to a server for inference puts the whole video payload on the network path.",
    reasoning:
      "MediaPipe can extract hand landmarks in the browser, so what actually crosses the network is a small vector of coordinates rather than an image. Normalising those features also decouples accuracy from lighting, which a server-side pipeline would have had to correct for anyway.",
    source: "signease",
    sourceLabel: "SignEase",
    domain: "Machine learning",
  },
  {
    id: "D-03",
    title: "Hold the connection open rather than poll",
    constraint: "At a sub-100ms per-frame budget, HTTP request overhead is a meaningful fraction of the budget.",
    reasoning:
      "Every polled request pays connection setup again, which makes latency bursty rather than predictable. A persistent WebSocket removes that cost entirely and makes the frame budget something you can actually reason about, which matters more for an interactive demo than raw throughput does.",
    outcome: "Under 100ms per frame, end to end.",
    source: "signease",
    sourceLabel: "SignEase",
    domain: "Machine learning",
  },
  {
    id: "D-04",
    title: "Trade two points of accuracy for a four-times smaller model",
    constraint: "The model was accurate enough and too slow to feel responsive.",
    reasoning:
      "Batch processing and quantisation lifted throughput 40% and cut the model to a quarter of its size, at under 2% accuracy loss. For something a person interacts with in real time, the delay is the thing they notice; the last two points of accuracy are not.",
    outcome: "96%+ across 26 classes, 40% more throughput, 4x smaller.",
    source: "signease",
    sourceLabel: "SignEase",
    domain: "Machine learning",
  },
  {
    id: "D-05",
    title: "Append events instead of locking balances",
    constraint: "Several people editing one shared ledger at once, on mobile clients that may be offline mid-edit.",
    reasoning:
      "Mutable balances need locking, and locking assumes connectivity and a coordinator — neither of which a phone reliably has. Storing every expense as an immutable event and folding the log into a balance removes the race condition rather than defending against it. There is nothing to contend over, so there is nothing to lock.",
    outcome: "Zero data conflicts in testing across 5+ concurrent users per session.",
    source: "spendly",
    sourceLabel: "Spendly",
    domain: "Concurrency",
  },
  {
    id: "D-06",
    title: "Settle the group, not the pairs",
    constraint: "Settling a shared ledger pairwise generates far more transfers than the group actually needs.",
    reasoning:
      "Who owes whom is a graph problem, not an accounting one. A minimum cash flow pass runs in O(n log n) and reduces any group of n people to at most n-1 transactions, which is the floor. The naive pairwise version is correct and asks people to make payments that cancel each other out.",
    outcome: "Up to 70% fewer payments than settling pairwise.",
    source: "spendly",
    sourceLabel: "Spendly",
    domain: "Concurrency",
  },
  {
    id: "D-07",
    title: "Fix the query shape before reaching for a cache",
    constraint: "High-traffic endpoints were slow and a cache was the obvious first move.",
    reasoning:
      "A cache in front of an N+1 query hides the problem and adds an invalidation bug to maintain. Restructuring the indexes and eliminating the N+1 patterns made the underlying reads fast, which is a smaller system to reason about than the same reads plus a cache layer.",
    outcome: "Around 35% lower data-retrieval latency.",
    source: "Webify Design",
    sourceLabel: "Webify Design",
    domain: "Databases",
  },
  {
    id: "D-08",
    title: "Let ingestion streams run without blocking each other",
    constraint: "Four parallel document-ingestion streams were serialising behind synchronous I/O.",
    reasoning:
      "The work was almost entirely waiting — on the embedding API and on the vector store — so threads were sitting idle rather than computing. Async I/O in FastAPI let the streams interleave their waiting, which is where the bottleneck actually was.",
    source: "SQORA",
    sourceLabel: "SQORA",
    domain: "Systems",
  },
  {
    id: "D-09",
    title: "Fail loudly on a bad document rather than degrade quietly",
    constraint: "A document that fails to embed still leaves the pipeline running, just with worse retrieval.",
    reasoning:
      "Silent degradation is the worst failure mode in a retrieval system: nothing errors, results simply get less relevant, and you find out weeks later from a user. Validating at ingestion turns an invisible quality problem into a visible failure someone can fix.",
    outcome: "Embedding failures taken to zero; retrieval accuracy held above 95%.",
    source: "SQORA",
    sourceLabel: "SQORA",
    domain: "Systems",
  },
];

export const domains = [...new Set(decisions.map((decision) => decision.domain))].sort();

export function decisionsForSource(source: string) {
  return decisions.filter((decision) => decision.source === source);
}
