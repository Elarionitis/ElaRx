/*
  The spine of the site.

  Every entry is a real constraint from real work and the choice that resolved
  it. Nothing here is aspirational or invented — each one traces to a project
  in projects.ts or a role in experience.ts, and the `source` field is what
  links a decision back to its evidence.

  Adding work means adding decisions. A project with no decision worth writing
  down does not belong on the homepage.

  An entry is rewritten when the system it describes changes, which is why
  D-01 to D-03 and D-15 no longer match what they said in earlier versions:
  SignEase moved its landmark tracking into the browser, and Orbit was rebuilt
  as a sharded server. A decision that documents deleted code is worse than no
  decision at all.
*/

export type DecisionDemo =
  | {
      kind: "event-fold";
      label: string;
      events: string[];
      result: string;
    }
  | {
      kind: "baseline-gate";
      label: string;
      threshold: string;
    };

export type Decision = {
  /** Stable reference, printed in the margin. Never renumber a published one. */
  id: string;
  /** The choice, stated as a choice. */
  title: string;
  /** The system constraint that forced it. One sentence. */
  constraint: string;
  /** The architectural rationale, including the rejected alternative. */
  reasoning: string;
  /** What it bought, when that is measurable. */
  outcome?: string;
  /** Slug in projects.ts, or an org name from experience.ts. */
  source: string;
  sourceLabel: string;
  /** System-design lens used by the archive filters. */
  domain: string;
  /*
    Where "See <source>" goes. Defaults to the project's row on /projects,
    which is right for every decision that came out of a project. The ones
    that came out of a job have no row there — before this, those linked to
    `/projects#Webify Design`, a fragment with a space in it and no element
    to match it.
  */
  sourceHref?: string;
  /** A compact, qualitative proof for decisions whose mechanism benefits from interaction. */
  demo?: DecisionDemo;
};

export const decisions: Decision[] = [
  {
    id: "D-01",
    title: "Move landmark tracking into the browser",
    constraint:
      "Extracting hand landmarks on the server meant a shared CPU had to sample a few frames per clip to avoid timing out.",
    reasoning:
      "The obvious reading was that the model had got worse in production. It had not — it was being handed a sparse, stuttering version of the recording. Running MediaPipe client-side gives it the full frame rate, as it has locally, and what crosses the network is 94 rows of coordinates rather than video. The server stops doing the expensive part, which is also the part it was worst at.",
    outcome: "Confidence on the same sample went from 30% back to 74%, with roughly 6x less data uploaded.",
    source: "signease",
    sourceLabel: "SignEase",
    domain: "Real-time systems",
  },
  {
    id: "D-02",
    title: "Re-express the webcam as the camera the model was trained on",
    constraint:
      "MediaPipe coordinates are fractions of the frame, and the training videos are portrait phone recordings at roughly 3:4.",
    reasoning:
      "A 4:3 laptop webcam therefore squeezes every hand shape to about half its width before the model sees it — a mismatch that looks like a model problem and is entirely a recording problem. Rather than retrain on webcam video there is none of, the browser reports its aspect ratio and the backend re-expresses the landmarks in a 3:4 frame. Fixing the input is cheaper than teaching the model a second geometry.",
    source: "signease",
    sourceLabel: "SignEase",
    domain: "Model behaviour",
  },
  {
    id: "D-03",
    title: "Show calibrated confidence, not the model's score",
    constraint:
      "The model was trained with smoothed labels, so its raw score rarely passes about 75% even when the prediction is right.",
    reasoning:
      "A confidence that never reaches certainty teaches people to ignore it, which quietly removes the one signal telling them when to trust the answer. Temperature scaling, fitted on held-out video, makes the displayed number mean what it says: 60% confident should be right about 60% of the time. The scaling is refitted whenever the model changes, because a calibration from an older model is a lie with a decimal point.",
    source: "signease",
    sourceLabel: "SignEase",
    domain: "Model behaviour",
  },
  {
    id: "D-04",
    title: "Model shared state as an event log",
    constraint: "Several people editing one shared ledger at once, on mobile clients that may be offline mid-edit.",
    reasoning:
      "Mutable balances need locking, and locking assumes connectivity and a coordinator — neither of which a phone reliably has. Storing every expense as an immutable event and folding the log into a balance removes the race condition rather than defending against it. There is nothing to contend over, so there is nothing to lock.",
    outcome: "Zero data conflicts in testing across 5+ concurrent users per session.",
    source: "spendly",
    sourceLabel: "Spendly",
    domain: "Distributed state",
    demo: {
      kind: "event-fold",
      label: "Fold an event log",
      events: ["Expense recorded", "Payment recorded", "Settlement recorded"],
      result: "Net positions",
    },
  },
  {
    id: "D-05",
    title: "Settle net positions, not individual debts",
    constraint: "Settling a shared ledger pairwise generates far more transfers than the group actually needs.",
    reasoning:
      "Who owes whom is a graph problem, not an accounting one. A minimum cash flow pass runs in O(n log n) and reduces any group of n people to at most n-1 transactions, which is the floor. The naive pairwise version is correct and asks people to make payments that cancel each other out.",
    outcome: "Up to 70% fewer payments than settling pairwise.",
    source: "spendly",
    sourceLabel: "Spendly",
    domain: "Distributed state",
  },
  {
    id: "D-06",
    title: "Repair the read path before adding a cache",
    constraint: "High-traffic endpoints were slow and a cache was the obvious first move.",
    reasoning:
      "A cache in front of an N+1 query hides the problem and adds an invalidation bug to maintain. Restructuring the indexes and eliminating the N+1 patterns made the underlying reads fast, which is a smaller system to reason about than the same reads plus a cache layer.",
    outcome: "Around 35% lower data-retrieval latency.",
    source: "Webify Design",
    sourceLabel: "Webify Design",
    sourceHref: "/about#experience",
    domain: "Data access",
  },
  {
    id: "D-07",
    title: "Make I/O-bound ingestion concurrent",
    constraint: "Four parallel document-ingestion streams were serialising behind synchronous I/O.",
    reasoning:
      "The work was almost entirely waiting — on the embedding API and on the vector store — so threads were sitting idle rather than computing. Async I/O in FastAPI let the streams interleave their waiting, which is where the bottleneck actually was.",
    source: "SQORA",
    sourceLabel: "SQORA",
    sourceHref: "/about#experience",
    domain: "Pipeline reliability",
  },
  {
    id: "D-08",
    title: "Turn partial ingestion into an explicit failure",
    constraint: "A document that fails to embed still leaves the pipeline running, just with worse retrieval.",
    reasoning:
      "Silent degradation is the worst failure mode in a retrieval system: nothing errors, results simply get less relevant, and you find out weeks later from a user. Validating at ingestion turns an invisible quality problem into a visible failure someone can fix.",
    outcome: "Every observed embedding failure eliminated in testing.",
    source: "SQORA",
    sourceLabel: "SQORA",
    sourceHref: "/about#experience",
    domain: "Pipeline reliability",
  },
  {
    id: "D-09",
    title: "Design triage as a continuous monitoring system",
    constraint:
      "A model trained to agree with the triage nurse learns to reproduce the nurse's misses, and in the 2022 NHAMCS data 45.8% of critical outcomes came from patients triaged level 3, 4 or 5.",
    reasoning:
      "Optimising for agreement optimises for the wrong target. The engine is trained on outcomes rather than on assigned levels, and it keeps watching patients while they wait — because triage is a moment and deterioration is a process. Repeat observations re-run the assessment and escalate on their own.",
    outcome:
      "56.7% of critical outcomes placed at level 1-2 against 39.0% for the recorded triage level, at the same share of arrivals.",
    source: "carequeue",
    sourceLabel: "CareQueue",
    domain: "Decision systems",
  },
  {
    id: "D-10",
    title: "Make the escalation policy an explicit cost function",
    constraint: "Under-triage and over-triage are not equally bad, but taking the most likely level treats them as if they are.",
    reasoning:
      "Missing a critical patient can kill them; escalating a well one costs a bed and some attention. So the level is chosen from the probability distribution with an explicitly asymmetric loss function rather than by argmax. The price of that choice is stated rather than hidden, because a triage assistant that over-triages everything gets worked around within a week.",
    outcome:
      "50.6% of under-triaged critical patients rescued, for 18.9% of non-critical patients escalated.",
    source: "carequeue",
    sourceLabel: "CareQueue",
    domain: "Decision systems",
  },
  {
    id: "D-11",
    title: "Normalize signals against age-aware baselines",
    constraint: "A heart rate of 152 is unremarkable in a one-year-old and an emergency in a seventy-year-old.",
    reasoning:
      "Passing age in as one more column asks the model to learn that relationship from scarce paediatric data. Instead vital signs enter as deviations from ten age bands, estimated from the survey's own low-acuity discharged population so the reference describes well physiology at that age rather than the ED case-mix. Where a band is too thin to estimate the artifact records that it fell back to published values, and the assistant lowers its own confidence there.",
    source: "carequeue",
    sourceLabel: "CareQueue",
    domain: "Decision systems",
  },
  {
    id: "D-12",
    title: "Constrain attribution to actionable outputs",
    constraint: "An attribution model is free to report that traffic contributed negatively to the air quality in a ward, which means nothing to the person deciding where to send an inspector.",
    reasoning:
      "Ordinary least squares will happily produce that, and it fits better for it. Non-negative least squares constrains every coefficient at or above zero, so the breakdown stays physically interpretable and can be defended when it sends someone somewhere. Fit quality is worth less here than being able to explain the answer.",
    source: "aeris",
    sourceLabel: "Aeris",
    domain: "Model behaviour",
  },
  {
    id: "D-13",
    title: "Make the baseline a deployment gate",
    constraint: "A forecast can look impressive in isolation and still be worse than assuming the next hour looks like this one.",
    reasoning:
      "Persistence is the honest baseline for anything time-series, so it is in the test suite: mean RMSE has to come in at least 10% under it or the build fails. The evaluation report leads with the caveat that the holdout is synthetic rather than with the headline improvement, because a number nobody qualified is a number that will be quoted back wrongly.",
    source: "aeris",
    sourceLabel: "Aeris",
    domain: "Honest measurement",
    demo: {
      kind: "baseline-gate",
      label: "Compare to persistence",
      threshold: "Forecast must beat persistence by at least 10%.",
    },
  },
  {
    id: "D-14",
    title: "Separate protocol traffic from observability",
    constraint: "An MCP server speaks JSON-RPC over stdio, so a single stray print statement corrupts the stream and the client disconnects.",
    reasoning:
      "There is no way to have both a debug log and a working server on the same channel. Every diagnostic goes to stderr, which the host shows and the parser never reads. The README is also truncated to 2,000 characters before it is returned — context is the scarce resource for an agent, and spending it on the back half of a readme leaves less for the task.",
    source: "repo-context-mcp",
    sourceLabel: "Repo Context MCP",
    domain: "Service reliability",
  },
  {
    id: "D-15",
    title: "Give every room exactly one writer",
    constraint: "Members of a chat room have to agree on the order of messages, and a mutex around the room makes that a runtime property you have to keep getting right.",
    reasoning:
      "Rooms are hashed onto threads, and a thread owns the rooms that land on it; everything crossing threads travels through FIFO queues. Two members cannot disagree about the order because there is no second writer to disagree with — ordering stops being something the code defends and becomes something the structure guarantees. Joining travels the same queues, which is what makes the handover from replayed history to the live stream exact. The price is that one very hot room cannot spread across cores.",
    outcome: "A total order per room with no locks on the message path, and 17.4M deliveries/s peak fan-out over loopback.",
    source: "orbit",
    sourceLabel: "Orbit",
    domain: "Distributed state",
  },
  {
    id: "D-16",
    title: "Cut the stalled client instead of buffering it",
    constraint: "A client that stops reading does not stop the server from having messages to send it.",
    reasoning:
      "Buffering without a bound lets one dead connection consume the memory of every connection sharing its thread, so a single bad client becomes everyone's outage. Output queues are bounded and an over-full one is disconnected. One reader loses its session, which is a cost paid by the party that caused it, and nobody else notices.",
    source: "orbit",
    sourceLabel: "Orbit",
    domain: "Service reliability",
  },
  {
    id: "D-17",
    title: "Benchmark open-loop, so a stall cannot hide",
    constraint: "A load generator that waits for the server before sending the next request lowers its own offered load whenever the server slows down.",
    reasoning:
      "That is coordinated omission, and it is why so many benchmarks report a good p99 for a server that periodically stops answering: the stall never appears, because during it nothing was being measured. Given a rate the generator keeps to it regardless, so a pause shows up as latency where it belongs. Every run also audits sequence numbers and delivery counts, and exits non-zero if a message went missing — a throughput figure from a run that lost messages is not a throughput figure.",
    outcome: "p50 0.08ms and p99 0.20ms at 1,000 clients and 200k deliveries/s, with zero messages lost.",
    source: "orbit",
    sourceLabel: "Orbit",
    domain: "Honest measurement",
  },
  {
    id: "D-18",
    title: "Measure a strategy against buy and hold, not against zero",
    constraint: "A long-only strategy spends most of its time owning a market that trends upward, so beating zero is not evidence that the strategy does anything.",
    reasoning:
      "On ten years of SPY the best moving-average crossover reaches a deflated Sharpe of 98.4% against zero, which reads as a discovery worth trading. Against buy and hold the same result is 2.5%. The first number measures the market; only the second measures the strategy. So the benchmark runs through the same simulator and pays the same commission and slippage, and the significance that gets reported is the one against it.",
    outcome: "Across 5 strategies and 6 ETFs from 2007 to 2025: 0 of 30 runs significant against buy and hold.",
    source: "tradstrat",
    sourceLabel: "TradStrat",
    domain: "Honest measurement",
  },
  {
    id: "D-19",
    title: "Make look-ahead bias a property test",
    constraint: "Look-ahead bias is a class of bug, not a bug — there is a new way to introduce it in every strategy anyone adds.",
    reasoning:
      "Reviewing each strategy for it by hand works until the reviewer is tired. Instead a property-based test runs against every registered strategy and asserts that signals computed on a truncated history match the full-history signals exactly, and other tests rewrite a bar's high, low and close and assert that what was bought at its open does not change. Writing a new strategy gets that coverage without asking for it, so the honest version is the default rather than the disciplined one.",
    source: "tradstrat",
    sourceLabel: "TradStrat",
    domain: "Honest measurement",
  },
  {
    id: "D-20",
    title: "Check that the test suite is able to fail",
    constraint: "A green suite over code the tests never actually exercise is indistinguishable from a green suite over correct code.",
    reasoning:
      "That is the most expensive kind of false confidence, because it is the kind you act on. A script injects 20 realistic bugs — an off-by-one in a fill, a leaked future price, a sign flip in the accounting — and confirms the suite catches each one. The result is evidence about the tests rather than about the code, which is the thing a backtester most needs and almost never has.",
    source: "tradstrat",
    sourceLabel: "TradStrat",
    domain: "Honest measurement",
  },
  {
    id: "D-21",
    title: "Pick the signing hand by confidence, not by frame count",
    constraint: "The model reads one hand, and the obvious choice — the hand tracked in more frames — is in a two-handed sign often the still base hand.",
    reasoning:
      "Tracking quality and relevance are not the same signal, and the first was standing in for the second. When both hands are tracked the backend now scores each on its own and keeps the more confident result. The guard against fooling myself was holding back video: the change was tuned on 120 dictionary clips and then checked on 127 added later, which it had never seen.",
    outcome:
      "6 predictions fixed and none broken on the tuning set, and the same shape on the unseen set — 6 fixed, none broken.",
    source: "signease",
    sourceLabel: "SignEase",
    domain: "Model behaviour",
  },
];

export const domains = [...new Set(decisions.map((decision) => decision.domain))].sort();

export function decisionsForSource(source: string) {
  return decisions.filter((decision) => decision.source === source);
}
