export type Stat = { value: string; label: string };
export type SiteLink = { label: string; url: string; visible: boolean };

export type EducationItem = {
  institution: string;
  qualification: string;
  dates: string;
  location?: string;
  detail?: string;
};

export type Position = {
  role: string;
  org: string;
  dates: string;
  detail: string;
};

export type Achievement = {
  title: string;
  detail?: string;
};

/*
  Canonical origin. Preview deployments describe themselves rather than claim
  the production domain; NEXT_PUBLIC_SITE_URL overrides everything.
*/
const CANONICAL_URL = "https://elarx.dev";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  if (process.env.NEXT_PUBLIC_VERCEL_ENV && process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
    const deployment = process.env.NEXT_PUBLIC_VERCEL_URL;
    if (deployment) return `https://${deployment}`;
  }

  if (process.env.NODE_ENV === "development") return "http://localhost:3000";

  return CANONICAL_URL;
}

export const siteConfig = {
  url: resolveSiteUrl(),
  name: "Suhan Ramani",
  handle: "Elarx.dev",
  role: "Backend and distributed systems",
  location: "IIT Jodhpur",
  hometown: "Surat, Gujarat",
  email: "suhanramani@gmail.com",
  profileImage: "/pfp.jpg",
  resumePath: "/Resume.pdf",
  discordUserId: "1369332498042982564",

  tagline:
    "CS undergrad at IIT Jodhpur working on distributed systems, Byzantine consensus and retrieval pipelines.",
  lead: "I build backend systems that stay fast once they get big.",
  intro: "Distributed systems, retrieval pipelines, and the queries that get slow first.",
  contact: "Open to SDE and AI/ML internships.",
  writingIntro: "What I am building, and what broke while I built it.",

  /** Four figures for the homepage. Each is stated again in context elsewhere. */
  stats: [
    { value: "<500ms", label: "RAG retrieval" },
    { value: "96%+", label: "ASL model accuracy" },
    { value: "400+", label: "CP problems solved" },
    { value: "AIR 397", label: "JEE Advanced 2024" },
  ] satisfies Stat[],

  /** Longer form, /about only. */
  bio: [
    "I am a Computer Science undergraduate at IIT Jodhpur, class of 2028. I came in expecting to like the theory and ended up liking the failure modes more — what happens to a system when the network partitions, when four writers hit the same record, when a query that was fine at a thousand rows stops being fine at a million.",
    "That is most of what I work on now. A Byzantine consensus framework with a professor here, a RAG pipeline that had to answer in under half a second, an expense ledger where the interesting problem turned out to be concurrency rather than arithmetic. The through line is that they all get slower or wronger under load, and finding out exactly where is the part I enjoy.",
    "Away from the terminal I play badminton, cycle, and set algorithmic contest problems for the programming society here, which is a good reminder that a problem is only as good as its edge cases.",
  ],

  education: [
    {
      institution: "Indian Institute of Technology, Jodhpur",
      qualification: "B.Tech, Computer Science and Engineering",
      dates: "Aug 2024 – Jul 2028",
      location: "Jodhpur, Rajasthan",
      detail:
        "CGPA 7.85/10. Coursework in data structures and algorithms, software design, pattern recognition and machine learning, probability and statistics, and mathematics for computing.",
    },
    {
      institution: "Ashadeep Vidyalaya",
      qualification: "Class XII (GSEB)",
      dates: "2022 – 2024",
      detail: "94.00% in Class XII, 92.50% in Class X.",
    },
  ] satisfies EducationItem[],

  positions: [
    {
      role: "Core Team Member",
      org: "Programming Society (P-Club), IIT Jodhpur",
      dates: "Aug 2025 – Present",
      detail: "Set 10+ algorithmic contest problems and mentor juniors on competitive programming.",
    },
    {
      role: "Core Team Member",
      org: "Office of Training and Placement, IIT Jodhpur",
      dates: "Oct 2025 – Present",
      detail: "Corporate outreach to tier-1 firms and coordination of placement pipelines.",
    },
    {
      role: "Core Team Member",
      org: "Entrepreneurship Cell, IIT Jodhpur",
      dates: "Sep 2024 – Present",
      detail: "Ran 5+ campus events reaching 300+ students; mentored a team for Vandre, the annual fest.",
    },
  ] satisfies Position[],

  achievements: [
    { title: "JEE Advanced 2024", detail: "AIR 397 (General-EWS)" },
    { title: "JEE Main 2024", detail: "99.55 percentile" },
    { title: "GUJCET 2024", detail: "State rank 3 in Gujarat" },
    {
      title: "Competitive programming",
      detail: "400+ problems across LeetCode, GeeksforGeeks and Codeforces. Codeforces max rating 1319.",
    },
    { title: "Vandre Entrepreneurship Fest", detail: "Best Pitch and 2nd Runner-Up" },
    { title: "FLY-Scholar", detail: "Certified by the Competitiveness Mindset Institute, USA" },
    { title: "Swami Dayanand Education Foundation", detail: "National merit-cum-means scholarship" },
  ] satisfies Achievement[],

  links: {
    github: { label: "GitHub", url: "https://github.com/Elarionitis", visible: true },
    linkedin: { label: "LinkedIn", url: "https://www.linkedin.com/in/suhan-ramani-b82291323/", visible: true },
    x: { label: "X", url: "https://x.com/SuhanRamani09", visible: true },
    leetcode: { label: "LeetCode", url: "https://leetcode.com/u/nA5jvAJ1P6/", visible: true },
    codeforces: { label: "Codeforces", url: "https://codeforces.com/profile/Suhan_Ramani", visible: true },
    email: { label: "Email", url: "mailto:suhanramani@gmail.com", visible: true },
    resume: { label: "Resume", url: "/resume", visible: true },
  } satisfies Record<string, SiteLink>,
};

export type SiteConfig = typeof siteConfig;
