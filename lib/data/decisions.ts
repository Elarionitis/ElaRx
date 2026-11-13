// The choices behind each project and job. Each one links back to its source.

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
    title: "Move hand tracking into the browser",
    constraint:
      "Tracking hands on the server was too slow on a shared CPU, so it could only look at a few frames of each clip.",
    reasoning:
      "It looked as if the model had got worse once it was online. It had not. It was only getting a few frames of each recording. Running MediaPipe in the browser gives it every frame, the same as on my own machine, and only the tracked points are uploaded, not the video.",
    outcome:
      "Confidence on the same sample went from 30% back to 74%, with about six times less data uploaded.",
    source: "signease",
    sourceLabel: "SignEase",
    domain: "Real-time systems",
  },
  {
    id: "D-02",
    title: "Reshape the webcam picture to match the training videos",
    constraint:
      "The training videos are upright phone recordings, about 3:4. A laptop webcam is wide, 4:3.",
    reasoning:
      "MediaPipe gives positions as a fraction of the frame, so a wide webcam makes every hand look about half as wide as it should. That looks like a model problem, but it is a recording problem. The browser sends the camera's shape, and the backend converts the points to a 3:4 frame before the model sees them.",
    source: "signease",
    sourceLabel: "SignEase",
    domain: "Model behaviour",
  },
  {
    id: "D-03",
    title: "Show a confidence number that can be trusted",
    constraint:
      "Because of how the model was trained, its raw score rarely goes above about 75%, even when it is right.",
    reasoning:
      "If the number never gets high, people stop looking at it. So the score is adjusted using real webcam recordings from signers the models never saw, until the number on screen matches how often the answer is right. It is refitted every time the model changes.",
    outcome:
      "Answers shown at 90% or more are right 96% of the time.",
    source: "signease",
    sourceLabel: "SignEase",
    domain: "Model behaviour",
  },
  {
    id: "D-04",
    title: "Store expenses as a list that only grows",
    constraint:
      "Several people edit one shared group at the same time, on phones that may lose connection halfway.",
    reasoning:
      "If the app stored one balance and changed it, two edits at once could overwrite each other, and locking does not work well on a phone with a bad connection. So every expense is saved as a new record that is never edited, and balances are worked out from the list. There is nothing for two people to fight over.",
    outcome:
      "No conflicts in testing, with five or more people editing at once.",
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
    title: "Settle the totals, not every single debt",
    constraint:
      "Paying back every debt one by one means far more payments than a group needs.",
    reasoning:
      "Many of those payments cancel each other out. The app first works out what each person owes or is owed overall, then matches people up. A group of n people never needs more than n-1 payments.",
    outcome:
      "Up to 70% fewer payments than settling each debt one by one.",
    source: "spendly",
    sourceLabel: "Spendly",
    domain: "Distributed state",
  },
  {
    id: "D-06",
    title: "Fix the slow queries before adding a cache",
    constraint:
      "The busiest pages were slow, and a cache looked like the quick fix.",
    reasoning:
      "A cache would have hidden the real problem and added one more thing to keep correct. The reads were slow because of missing indexes and the same query being run again and again. Fixing those made the pages fast without a cache.",
    outcome:
      "Data loads about 35% faster.",
    source: "Webify Design",
    sourceLabel: "Webify Design",
    sourceHref: "/about#experience",
    domain: "Data access",
  },
  {
    id: "D-07",
    title: "Let the loading jobs wait at the same time",
    constraint:
      "Four document-loading jobs were running one after another.",
    reasoning:
      "Almost all of their time was spent waiting, on the embedding API and on the vector store. With async FastAPI the four jobs wait at the same time and none of them blocks the others.",
    source: "SQORA",
    sourceLabel: "SQORA",
    sourceHref: "/about#experience",
    domain: "Pipeline reliability",
  },
  {
    id: "D-08",
    title: "Report a failed document straight away",
    constraint:
      "When a document failed to load, the system kept running, with worse answers.",
    reasoning:
      "Nothing showed an error. The answers only got a little less useful, and nobody would notice for weeks. Checking each document as it comes in turns that into an error someone can see and fix.",
    outcome:
      "Every loading failure seen in testing was caught.",
    source: "SQORA",
    sourceLabel: "SQORA",
    sourceHref: "/about#experience",
    domain: "Pipeline reliability",
  },
  {
    id: "D-09",
    title: "Keep watching patients after the first check",
    constraint:
      "In the 2022 data, 45.8% of critical outcomes came from patients who had been marked level 3, 4 or 5.",
    reasoning:
      "A tool trained to agree with the nurse will miss the same patients the nurse missed. So the model learns from what actually happened to each patient. It also keeps watching people while they wait, and a new reading runs the check again.",
    outcome:
      "56.7% of critical patients placed at level 1 or 2, against 39.0% for the level recorded at the time, with the same share of arrivals.",
    source: "carequeue",
    sourceLabel: "CareQueue",
    domain: "Decision systems",
  },
  {
    id: "D-10",
    title: "Treat a missed patient as worse than a false alarm",
    constraint:
      "Marking a sick patient as fine and marking a well patient as urgent are not equally bad.",
    reasoning:
      "Missing a critical patient can cost a life. Raising the level of a well patient costs a bed and some attention. So the level is chosen with those two costs written down, not by taking the most likely level. The cost of a false alarm is set per hospital, because a tool that raises everything gets ignored within a week.",
    outcome:
      "42 of 83 critical patients who had been marked less urgent were caught.",
    source: "carequeue",
    sourceLabel: "CareQueue",
    domain: "Decision systems",
  },
  {
    id: "D-11",
    title: "Compare vital signs with what is normal at that age",
    constraint:
      "A heart rate of 152 is normal for a one-year-old and an emergency for a seventy-year-old.",
    reasoning:
      "Giving the model age as one more number asks it to learn this from very little data on children. So each reading goes in as how far it is from normal for that age, across ten age groups. Where there is too little data for a group, the tool uses published values and lowers its own confidence.",
    source: "carequeue",
    sourceLabel: "CareQueue",
    domain: "Decision systems",
  },
  {
    id: "D-12",
    title: "Only allow sources to add pollution, never remove it",
    constraint:
      "A normal model can report that traffic made the air in a ward cleaner, which means nothing to someone deciding where to send an inspector.",
    reasoning:
      "The fit is a little better that way, but the answer cannot be explained. So every source is limited to zero or more. The breakdown stays something a person can read and defend.",
    source: "aeris",
    sourceLabel: "Aeris",
    domain: "Model behaviour",
  },
  {
    id: "D-13",
    title: "The forecast has to beat the simplest guess",
    constraint:
      "A forecast can look good and still be worse than assuming the next hour will be like this one.",
    reasoning:
      "That simple guess is in the tests. The forecast's error has to be at least 10% lower, or the build fails. The report also says first that the test data is simulated.",
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
    title: "Keep debug messages out of the channel the assistant reads",
    constraint:
      "An MCP server talks to the assistant over standard output, so one stray print breaks the connection.",
    reasoning:
      "Every debug message goes to standard error, which the assistant never reads. The README is also cut to 2,000 characters before it is returned, so it does not use up the space the assistant needs for the actual task.",
    source: "repo-context-mcp",
    sourceLabel: "Repo Context MCP",
    domain: "Service reliability",
  },
  {
    id: "D-15",
    title: "Give every room exactly one writer",
    constraint:
      "Everyone in a room has to agree on the order of messages. A lock around the room works, but it is easy to get wrong and it is slow.",
    reasoning:
      "Each room belongs to one thread, and anything passing between threads goes through queues. Two members cannot disagree about the order, because only one thread ever writes it. The cost is that one very busy room cannot be spread over several cores.",
    outcome:
      "The same order for everyone with no locks, and 17.4 million deliveries per second at peak.",
    source: "orbit",
    sourceLabel: "Orbit",
    domain: "Distributed state",
  },
  {
    id: "D-16",
    title: "Disconnect a stuck client",
    constraint:
      "A client that stops reading still has messages waiting to be sent to it.",
    reasoning:
      "Holding those messages without a limit lets one dead connection use up memory that everyone else on that thread needs. So each client has a limit, and a client that goes over it is disconnected. One person has to reconnect, and nobody else notices.",
    source: "orbit",
    sourceLabel: "Orbit",
    domain: "Service reliability",
  },
  {
    id: "D-17",
    title: "Keep sending at a fixed rate when measuring speed",
    constraint:
      "A test tool that waits for the server before sending the next message slows down whenever the server does.",
    reasoning:
      "That hides every pause, because nothing is being measured while the server is stuck. My load generator keeps to its rate no matter what, so a pause shows up as slow messages. Every run also checks that no message went missing, and fails if one did.",
    outcome:
      "Half of all messages arrive within 0.08 ms and 99% within 0.20 ms, at 1,000 clients, with none lost.",
    source: "orbit",
    sourceLabel: "Orbit",
    domain: "Honest measurement",
  },
  {
    id: "D-18",
    title: "Compare a strategy with buy and hold, not with zero",
    constraint:
      "A strategy that only buys spends most of its time holding a market that goes up anyway.",
    reasoning:
      "On ten years of SPY, the best moving-average strategy looks 98.4% certain to be better than nothing. Compared with buy and hold, that drops to 2.5%. The first number measures the market, and only the second measures the strategy. So buy and hold runs through the same engine, pays the same costs, and is what every result is compared with.",
    source: "tradstrat",
    sourceLabel: "TradStrat",
    domain: "Honest measurement",
  },
  {
    id: "D-19",
    title: "Test every strategy for using future prices",
    constraint:
      "Using a price from the future by accident is easy, and every new strategy is a new chance to do it.",
    reasoning:
      "Checking by hand works until you are tired. So a test runs on every strategy: it cuts the history short and checks that the signals up to that point stay the same. Other tests change a day's later prices and check that the order at that day's open does not change. A new strategy gets these tests without any extra work.",
    source: "tradstrat",
    sourceLabel: "TradStrat",
    domain: "Honest measurement",
  },
  {
    id: "D-20",
    title: "Check that the tests can fail",
    constraint:
      "Tests that pass tell you nothing if they never touch the code that matters.",
    reasoning:
      "A script puts 20 realistic bugs into the code, one at a time, such as an order filled one day early or a sign flipped in the accounts. It then checks that the tests catch each one.",
    source: "tradstrat",
    sourceLabel: "TradStrat",
    domain: "Honest measurement",
  },
  {
    id: "D-21",
    title: "Choose the signing hand by confidence",
    constraint:
      "Each model mainly follows one hand. In a two-handed sign, the hand seen in the most frames is often the one that stays still.",
    reasoning:
      "When both hands are tracked, the backend now scores each hand by itself and keeps the more confident answer. I tuned this on 120 dictionary videos, then checked it on 127 more that it had never seen.",
    outcome:
      "Six predictions fixed and none broken on the first set, and the same on the second.",
    source: "signease",
    sourceLabel: "SignEase",
    domain: "Model behaviour",
  },
];

export const domains = [...new Set(decisions.map((decision) => decision.domain))].sort();

export function decisionsForSource(source: string) {
  return decisions.filter((decision) => decision.source === source);
}
