export type Credential = {
  label: string;
  value: string;
};

export type SiteLink = {
  label: string;
  url: string;
  visible: boolean;
};

export type SiteConfig = {
  /** Canonical origin, no trailing slash. Override per environment. */
  url: string;
  name: string;
  handle: string;
  tagline: string;
  lead: string;
  intro: string;
  about: string;
  contact: string;
  writingIntro: string;
  location: string;
  email: string;
  profileImage: string | null;
  resumePath: string;
  discordUserId: string;
  links: {
    github: SiteLink;
    linkedin: SiteLink;
    x: SiteLink;
    leetcode: SiteLink;
    codeforces: SiteLink;
    email: SiteLink;
    resume: SiteLink;
  };
  proof: Credential[];
};

const CANONICAL_URL = "https://elarx.dev";

/*
  Preview deploys have to describe themselves rather than claim the canonical
  domain, or every branch ends up competing for the same URL in search results.
  Vercel exposes both of these to the client bundle by default.
*/
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

export const siteConfig: SiteConfig = {
  url: resolveSiteUrl(),
  name: "Suhan Ramani",
  handle: "Elarx.dev",
  tagline:
    "CS undergrad at IIT Jodhpur building backend systems and AI tooling: retrieval pipelines, APIs, and the parts that get slow first.",
  lead:
    "I build backend systems, and lately most of them have a model somewhere in the middle. That changes what fast means.",
  intro:
    "Most of my work sits behind the interface: retrieval, APIs, the queries that get slow first. I would rather a system stay readable than clever.",
  about:
    "B.Tech Computer Science at IIT Jodhpur, class of 2028. I work mostly on the backend, on distributed systems and retrieval pipelines and anything that has to hold up under load. Most of what I know came from building something, watching it break, and going to find out why.",
  contact: "Looking for SDE and AI/ML engineering internships. Email reaches me fastest.",
  writingIntro: "Notes on what I am building, and on what broke while I built it.",
  location: "IIT Jodhpur CSE",
  email: "suhanramani@gmail.com",
  profileImage: "/pfp.jpg",
  resumePath: "/Resume.pdf",
  discordUserId: "1369332498042982564",
  links: {
    github: {
      label: "GitHub",
      url: "https://github.com/Elarionitis",
      visible: true,
    },
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/suhan-ramani-b82291323/",
      visible: true,
    },
    x: {
      label: "X",
      url: "https://x.com/SuhanRamani09",
      visible: true,
    },
    leetcode: {
      label: "LeetCode",
      url: "https://leetcode.com/u/suhanramani/",
      visible: false,
    },
    codeforces: {
      label: "Codeforces",
      url: "https://codeforces.com/profile/suhanramani",
      visible: false,
    },
    email: {
      label: "Email",
      url: "mailto:suhanramani@gmail.com",
      visible: true,
    },
    resume: {
      label: "Resume",
      url: "/Resume.pdf",
      visible: true,
    },
  },
  proof: [
    { label: "JEE Advanced 2024", value: "AIR 397 (General-EWS)" },
    { label: "JEE Main 2024", value: "99.55 percentile" },
    { label: "GUJCET 2024", value: "Gujarat state rank 3" },
  ],
};
