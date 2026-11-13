// Project content. Every claim here comes from the project's own repository.

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
  /*
    What the thing is, in one sentence a stranger would understand. This is
    all the homepage says about a project, so it carries no figures and no
    vocabulary that needs the case study to decode.
  */
  intro: string;
  /** One line, used as the hint in the command palette. */
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
  /** What it is and who it is for, in plain words. Opens the project page. */
  about: string[];
  /** The handful of things it can do that matter most. */
  features: string[];
  /** Everything below is optional and renders only when present. */
  problem?: string;
  approach?: string;
  architecture?: Detail[];
  results?: Metric[];
  relatedWriting?: string;
};

export const projects: Project[] = [
  {
    slug: "orbit",
    name: "Orbit",
    intro: "A real-time chat server written from the socket up, where everyone in a room sees the same messages in the same order.",
    tagline: "A chat server written from the socket up",
    summary:
      "A real-time chat server in C++ with its own event loop, message format and storage. Everyone in a room sees the same messages in the same order, and a saved message survives a crash.",
    category: "featured",
    status: "source",
    domain: "Systems",
    role: "Solo",
    stack: ["C++20", "epoll / kqueue", "OpenSSL", "CMake"],
    links: { github: "https://github.com/Elarionitis/Orbit" },
    about: [
      "Orbit is a chat server: the part of a messaging app that sits in the middle and passes messages between people. I wrote it in C++ without any framework, so the networking, the message format and the storage are all my own code.",
      "It keeps two promises. Everyone in a room sees the same messages in the same order. And once the server says it has your message, that message is still there even if the server is killed a moment later. Both are checked by tests.",
    ],
    features: [
      "Rooms, direct messages, and a list of who is online",
      "Joining a room gives you its history and then the live messages, with nothing missing in between",
      "A client that loses its connection reconnects by itself and catches up from the last message it saw",
      "Messages are saved to disk and recovered after a crash",
      "Encrypted connections with TLS",
      "One slow or stuck client is disconnected without anyone else noticing",
    ],
    problem:
      "Two things are hard to get together in a chat server. Everyone in a room should read the same messages in the same order, and a message the server accepted should survive a crash. The usual fix for the first is a lock around each room, which slows everything down. The usual fix for the second is to write every message to disk before answering, which makes each one slow.",
    approach:
      "I gave each room to exactly one thread, so the order comes from the design and no lock is needed. For saving to disk, the person running the server chooses how strict to be, from fastest to safest.",
    architecture: [
      {
        title: "One event loop per thread",
        body: "Each thread runs its own loop, over epoll on Linux and kqueue on macOS. There are no locks on the path a message takes. A message for a room is built once and shared by everyone receiving it on that thread.",
      },
      {
        title: "Each room has one writer",
        body: "Rooms are spread across threads, and only one thread ever writes to a given room. Anything passing between threads goes through first-in, first-out queues. That is why every member sees the same order. Joining a room goes through the same queues, so the switch from old history to live messages has no gap.",
      },
      {
        title: "A log on disk",
        body: "Every message is added to a write-ahead log with a checksum. There are three settings for how often the log is flushed to disk. After a crash the server reads the log back and drops a half-written last record. TLS runs in its own layer, so the event loop never waits inside OpenSSL.",
      },
    ],
    results: [
      { value: "17.4M/s", label: "Messages delivered per second at peak, with 100 clients in one room" },
      { value: "0.20 ms", label: "99% of messages arrive within this, at 1,000 clients" },
      { value: "0", label: "Saved messages lost after killing the server again and again" },
      { value: "185", label: "Tests" },
    ],
  },
  {
    slug: "signease",
    name: "SignEase",
    intro: "Sign language recognition in the browser: sign in front of your webcam and it tells you the sign, in text and out loud.",
    tagline: "Sign language recognition in the browser",
    summary:
      "Sign in front of a webcam and the page reads the sign back as text and speech. It knows 250 American Sign Language signs and has a dictionary and a practice mode.",
    category: "featured",
    status: "live",
    domain: "Machine learning",
    role: "Solo",
    stack: ["Next.js", "TypeScript", "MediaPipe", "Flask", "TensorFlow Lite"],
    links: { github: "https://github.com/Elarionitis/SignEase", live: "https://sign-ease-eight.vercel.app" },
    about: [
      "I made SignEase for people who use sign language in their daily life. You sign in front of a webcam, and the page reads the sign back as text and speech, so someone who does not know sign language can follow.",
      "Right now it knows 250 American Sign Language signs, such as hello, thank you, mom, water and please. It also has a dictionary and a practice mode for anyone who wants to learn the signs. It is free to use and needs nothing but a browser and a camera.",
    ],
    features: [
      "Record a sign with your webcam and get the sign back, along with the next most likely answers",
      "The answer is spoken out loud, and the signs from one session can be read back as a sentence",
      "A dictionary of the signs it knows, with demo videos",
      "Practice mode: watch a demo in slow motion, copy it, and get feedback straight away",
      "A guide before recording that asks you to move back if your hands would be out of view",
      "Recording stops by itself when you lower your hands",
    ],
    problem:
      "The models learned from phone videos held upright. A visitor shows up with a wide laptop webcam, sits too close, and lifts their hands before the sign starts. Each of these makes the recording look different from what the models learned, and together they hurt accuracy more than the models themselves did.",
    approach:
      "I fixed the recording first, so it looks like what the models expect. Then I trained the models further on real webcam recordings, and adjusted the confidence so the number on screen matches how often the answer is right.",
    architecture: [
      {
        title: "Hand tracking runs in the browser",
        body: "MediaPipe Holistic runs on every camera frame, inside the browser. Only the hand, face and body points are uploaded, not the video. That is about six times less data, and the predictions are the same.",
      },
      {
        title: "The server only classifies",
        body: "The Flask backend resamples the points to 30 frames per second, finds the part of the recording where the sign happens, and runs three TensorFlow Lite models whose answers are combined.",
      },
      {
        title: "When it is busy, it says so",
        body: "If every copy of the models is busy and the queue is full, the server answers straight away and asks the page to try again shortly. The page retries by itself and tells the visitor it is retrying.",
      },
    ],
    results: [
      { value: "250", label: "Signs it knows" },
      { value: "87%", label: "Right on the first guess, on 3,247 webcam recordings by 11 signers the models had never seen" },
      { value: "96%", label: "Right within the top three guesses, on the same recordings" },
      { value: "6x", label: "Less data uploaded than sending video" },
    ],
  },
  {
    slug: "tradstrat",
    name: "TradStrat",
    intro: "A backtester for trading strategies, built to tell you when not to believe the result.",
    tagline: "A backtester that tries to prove your strategy wrong",
    summary:
      "Tests a trading strategy on past prices and then checks whether the result can be believed: settings chosen without hindsight, a range around the result, and a correction for how many settings were tried.",
    category: "featured",
    status: "research",
    domain: "Quantitative research",
    role: "Solo",
    stack: ["Python", "pandas", "NumPy", "Streamlit", "Plotly"],
    links: { github: "https://github.com/Elarionitis/TradStrat" },
    about: [
      "TradStrat tests a trading strategy on past prices. Most tools like this tell you how much a strategy would have made. This one also asks whether you should believe that number.",
      "I used it to run five well-known strategies on six ETFs from 2007 to 2025, with realistic trading costs. They made the falls smaller, but none of them reliably beat simply buying and holding.",
    ],
    features: [
      "Orders are filled at the next day's opening price, so a strategy can never use a price it could not have known",
      "Trading costs are counted: commission, slippage and whole shares only",
      "Stop-losses, and position sizes based on how much the price moves",
      "Walk-forward testing: settings are chosen on past data, then tried on data they have not seen",
      "A range around every result, and the chance of beating buy and hold",
      "Five built-in strategies, a dashboard and a command line",
    ],
    problem:
      "A backtest that is slightly wrong is worse than none, because its numbers look sure of themselves. Fill an order at the same price that created the signal, tune the settings on the whole history, and compare against zero, and almost any strategy looks good.",
    approach:
      "I built the engine so those mistakes cannot happen. Orders fill at the next bar's open, and settings are picked from past data only. The result is then reported with statistics that take into account how many settings were tried.",
    architecture: [
      {
        title: "The engine acts in the order a live system would",
        body: "At the open it acts on the signal from the previous close. During the bar it checks stops against the low. At the close it values the position. The buy-and-hold comparison runs through the same engine and pays the same costs.",
      },
      {
        title: "Walk-forward testing",
        body: "Settings are chosen on one stretch of history and traded on the next, then the window moves forward. Joining the unseen stretches gives a result built only from choices that could have been made at the time.",
      },
      {
        title: "Statistics that count the search",
        body: "Deflated and probabilistic Sharpe ratios, block bootstrap confidence intervals, and the chance of beating buy and hold instead of the chance of beating zero.",
      },
    ],
    results: [
      { value: "5", label: "Strategies tested" },
      { value: "6", label: "ETFs, from 2007 to 2025" },
      { value: "20 of 30", label: "Runs where the falls were smaller than buy and hold" },
    ],
  },
  {
    slug: "carequeue",
    name: "CareQueue",
    intro: "A triage assistant for emergency rooms that keeps watching the people who are still waiting.",
    tagline: "Triage help for emergency rooms that keeps watching the queue",
    summary:
      "A prototype that helps a triage nurse decide who needs to be seen first, and keeps watching everyone in the waiting room in case they get worse.",
    category: "featured",
    status: "prototype",
    domain: "Risk modelling",
    role: "Team lead, Team InnovX",
    timeframe: "Accenture Innovation Challenge, round 2",
    stack: ["TypeScript", "Next.js", "React", "NHAMCS 2022"],
    links: { github: "https://github.com/Elarionitis/CareQueue" },
    about: [
      "CareQueue is a prototype my team built for the Accenture Innovation Challenge. It helps a triage nurse in an emergency room decide who needs to be seen first.",
      "It started from one fact in real US emergency room data from 2022: 45.8% of the patients who went on to die or need critical care had first been marked as less urgent. They did not look very sick at the door, and then they waited. So CareQueue does not stop after the first check. It keeps watching everyone in the waiting room.",
    ],
    features: [
      "A nurse types what the patient said and gets a suggested urgency level, which updates as readings are entered",
      "Every suggestion shows how sure it is, and which one measurement would change it the most",
      "Everyone waiting is tracked against a safe waiting time, and a patient getting worse raises an alert that a person has to clear",
      "The nurse always decides: nothing takes effect until a clinician sets the level, and overriding takes one click",
      "Every action goes into a log that shows if anyone has changed it afterwards",
    ],
    problem:
      "Triage tools are usually trained to agree with the level the nurse gave. But the patients who were missed are exactly the ones the nurse marked as less urgent, so a tool that learns to agree with the nurse learns to miss the same people.",
    approach:
      "The risk model learns from what actually happened to each patient, not from the level they were given. Fixed medical rules come first, and the model is only allowed to raise the urgency, never lower it.",
    results: [
      { value: "56.7%", label: "Critical patients flagged as urgent, against 39.0% for the level recorded at the time" },
      { value: "42 of 83", label: "Critical patients who had been marked less urgent, and were caught" },
      { value: "6,410", label: "Real visits it was tested on, none of which it had seen" },
    ],
  },
  {
    slug: "spendly",
    name: "Spendly",
    intro: "A shared expense app where several people can edit the same group at once without overwriting each other.",
    tagline: "A shared expense app",
    summary:
      "A mobile app for splitting expenses in a group. Several people can add expenses at the same time, and it settles the group with the fewest payments.",
    category: "work",
    status: "source",
    domain: "Concurrency",
    role: "Solo",
    stack: ["Flutter", "Dart", "Riverpod", "Cloud Firestore"],
    links: { github: "https://github.com/Elarionitis/Spendly" },
    about: [
      "Spendly is a mobile app for shared expenses, for flatmates splitting bills or friends on a trip. Everyone adds what they paid, and the app works out who owes whom.",
      "It also tracks your own spending, with charts that show where the money goes.",
    ],
    features: [
      "Create a group and add shared expenses, with a photo of the receipt",
      "Settle up with the fewest payments possible",
      "Changes show up on everyone's phone straight away",
      "Personal expense tracking with charts",
      "Comments on an expense, to sort out what it was for",
      "Sign in with email or Google",
    ],
    problem:
      "Several people can edit the same group at the same moment, sometimes on a bad connection. If the app kept one balance and changed it in place, two edits could overwrite each other.",
    approach:
      "The app never changes a balance. Each expense is added as a new record that is never edited, and the balances are worked out from the full list.",
    architecture: [
      {
        title: "A list that only grows",
        body: "Every expense is a new entry, and balances are calculated from all the entries. Since nothing is edited in place, two people cannot overwrite each other. In testing with five or more people editing at once there were no conflicts.",
      },
      {
        title: "One source of data for every screen",
        body: "The app has more than 20 screens. They all read from the same 16 live Firestore listeners, managed with Riverpod, so each screen does not run its own query.",
      },
    ],
    results: [
      { value: "0", label: "Conflicts in testing, with five or more people editing at once" },
      { value: "n-1", label: "The most payments needed to settle a group of n people" },
      { value: "70%", label: "Fewer payments, at best, than settling every debt one by one" },
    ],
  },
  {
    slug: "aeris",
    name: "Aeris",
    intro: "Air-quality forecasting for a city, ward by ward, with a read on where the pollution is coming from.",
    tagline: "Air-quality forecasts, ward by ward",
    summary:
      "Forecasts air quality for each ward of a city, estimates where the pollution comes from, and ranks where to inspect first.",
    category: "work",
    status: "source",
    domain: "Machine learning",
    role: "Solo",
    stack: ["Python", "FastAPI", "React", "XGBoost", "Docker"],
    links: { github: "https://github.com/Elarionitis/aeris" },
    about: [
      "Aeris forecasts air quality for a city, one ward at a time. It also estimates where the pollution in a ward is coming from, and ranks which places are worth inspecting first.",
      "It started as a hackathon project.",
    ],
    features: [
      "An air-quality forecast for each ward",
      "An estimate of how much each source adds to the pollution",
      "A ranked list of where to send inspectors",
      "A dashboard that shows all of it",
    ],
  },
  {
    slug: "repo-context-mcp",
    name: "Repo Context MCP",
    intro: "A small server that hands a coding assistant what it needs to know about a repository.",
    tagline: "Repository context for coding assistants",
    summary:
      "An MCP server that gives a coding assistant a repository's details, README and main frameworks, so nobody has to explain the project by hand.",
    category: "work",
    status: "source",
    domain: "Developer tooling",
    role: "Solo",
    stack: ["TypeScript", "Node.js", "MCP SDK", "GitHub REST API"],
    links: { github: "https://github.com/Elarionitis/repo-context-mcp" },
    about: [
      "An AI coding assistant does not know your project until you explain it: what it does, which frameworks it uses, how it is set up. You end up explaining the same things again in every conversation.",
      "Repo Context MCP does that step for you. Give it a GitHub repository and it hands the assistant a short summary. It works with tools that support MCP, such as Cursor and Claude Code. I built it to learn how MCP servers work.",
    ],
    features: [
      "Fetches a repository's description, main language and other details from GitHub",
      "Reads the README",
      "Detects the main languages and frameworks",
      "Returns a short summary the assistant can use",
      "Works with any public repository",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
