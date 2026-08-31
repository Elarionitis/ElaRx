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
  domain: "Machine learning" | "Risk modelling" | "Concurrency" | "Databases" | "Systems";
};

export const decisions: Decision[] = [
  {
    id: "D-01",
    title: "Send landmark vectors, not video",
    constraint: "Streaming webcam frames to a server for inference puts the whole video payload on the network path.",
    reasoning:
      "MediaPipe can extract hand landmarks in the browser, so what actually crosses the network is a small vector of coordinates rather than an image. Normalising those features also decouples accuracy from lighting, which a server-side pipeline would have had to correct for anyway.",
    source: "signease",
    sourceLabel: "SignEase",
    domain: "Machine learning",
  },
  {
    id: "D-02",
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
    id: "D-03",
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
    id: "D-04",
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
    id: "D-05",
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
    id: "D-06",
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
    id: "D-07",
    title: "Let ingestion streams run without blocking each other",
    constraint: "Four parallel document-ingestion streams were serialising behind synchronous I/O.",
    reasoning:
      "The work was almost entirely waiting — on the embedding API and on the vector store — so threads were sitting idle rather than computing. Async I/O in FastAPI let the streams interleave their waiting, which is where the bottleneck actually was.",
    source: "SQORA",
    sourceLabel: "SQORA",
    domain: "Systems",
  },
  {
    id: "D-08",
    title: "Fail loudly on a bad document rather than degrade quietly",
    constraint: "A document that fails to embed still leaves the pipeline running, just with worse retrieval.",
    reasoning:
      "Silent degradation is the worst failure mode in a retrieval system: nothing errors, results simply get less relevant, and you find out weeks later from a user. Validating at ingestion turns an invisible quality problem into a visible failure someone can fix.",
    outcome: "Every observed embedding failure eliminated in testing.",
    source: "SQORA",
    sourceLabel: "SQORA",
    domain: "Systems",
  },
  {
    id: "D-09",
    title: "Treat triage as surveillance, not classification",
    constraint:
      "A model trained to agree with the triage nurse learns to reproduce the nurse's misses, and in the 2022 NHAMCS data 45.8% of critical outcomes came from patients triaged level 3, 4 or 5.",
    reasoning:
      "Optimising for agreement optimises for the wrong target. The engine is trained on outcomes rather than on assigned levels, and it keeps watching patients while they wait — because triage is a moment and deterioration is a process. Repeat observations re-run the assessment and escalate on their own.",
    outcome:
      "56.7% of critical outcomes placed at level 1-2 against 39.0% for the recorded triage level, at the same share of arrivals.",
    source: "carequeue",
    sourceLabel: "CareQueue",
    domain: "Risk modelling",
  },
  {
    id: "D-10",
    title: "Price the two kinds of mistake differently",
    constraint: "Under-triage and over-triage are not equally bad, but taking the most likely level treats them as if they are.",
    reasoning:
      "Missing a critical patient can kill them; escalating a well one costs a bed and some attention. So the level is chosen from the probability distribution with an explicitly asymmetric loss function rather than by argmax. The price of that choice is stated rather than hidden, because a triage assistant that over-triages everything gets worked around within a week.",
    outcome:
      "50.6% of under-triaged critical patients rescued, for 18.9% of non-critical patients escalated.",
    source: "carequeue",
    sourceLabel: "CareQueue",
    domain: "Risk modelling",
  },
  {
    id: "D-11",
    title: "Make age the frame of reference, not a feature",
    constraint: "A heart rate of 152 is unremarkable in a one-year-old and an emergency in a seventy-year-old.",
    reasoning:
      "Passing age in as one more column asks the model to learn that relationship from scarce paediatric data. Instead vital signs enter as deviations from ten age bands, estimated from the survey's own low-acuity discharged population so the reference describes well physiology at that age rather than the ED case-mix. Where a band is too thin to estimate the artifact records that it fell back to published values, and the assistant lowers its own confidence there.",
    source: "carequeue",
    sourceLabel: "CareQueue",
    domain: "Risk modelling",
  },
  {
    id: "D-12",
    title: "Constrain attribution to non-negative contributions",
    constraint: "An attribution model is free to report that traffic contributed negatively to the air quality in a ward, which means nothing to the person deciding where to send an inspector.",
    reasoning:
      "Ordinary least squares will happily produce that, and it fits better for it. Non-negative least squares constrains every coefficient at or above zero, so the breakdown stays physically interpretable and can be defended when it sends someone somewhere. Fit quality is worth less here than being able to explain the answer.",
    source: "aeris",
    sourceLabel: "Aeris",
    domain: "Machine learning",
  },
  {
    id: "D-13",
    title: "Gate the forecast on beating persistence",
    constraint: "A forecast can look impressive in isolation and still be worse than assuming the next hour looks like this one.",
    reasoning:
      "Persistence is the honest baseline for anything time-series, so it is in the test suite: mean RMSE has to come in at least 10% under it or the build fails. The evaluation report leads with the caveat that the holdout is synthetic rather than with the headline improvement, because a number nobody qualified is a number that will be quoted back wrongly.",
    source: "aeris",
    sourceLabel: "Aeris",
    domain: "Machine learning",
  },
  {
    id: "D-14",
    title: "Log to stderr, because stdout is the protocol",
    constraint: "An MCP server speaks JSON-RPC over stdio, so a single stray print statement corrupts the stream and the client disconnects.",
    reasoning:
      "There is no way to have both a debug log and a working server on the same channel. Every diagnostic goes to stderr, which the host shows and the parser never reads. The README is also truncated to 2,000 characters before it is returned — context is the scarce resource for an agent, and spending it on the back half of a readme leaves less for the task.",
    source: "repo-context-mcp",
    sourceLabel: "Repo Context MCP",
    domain: "Systems",
  },
  {
    id: "D-15",
    title: "Give each socket exactly one owner",
    constraint: "A copied server object means two objects holding the same file descriptor, and the second destructor closes a socket that is already gone.",
    reasoning:
      "The copy constructor and copy assignment are deleted outright and move semantics provided instead, so ownership transfers rather than duplicates. The compiler then refuses the bug at the point it would be written, which is cheaper than finding it as an intermittent failure once several clients are connected.",
    source: "orbit",
    sourceLabel: "Orbit",
    domain: "Concurrency",
  },
];

export const domains = [...new Set(decisions.map((decision) => decision.domain))].sort();

export function decisionsForSource(source: string) {
  return decisions.filter((decision) => decision.source === source);
}
