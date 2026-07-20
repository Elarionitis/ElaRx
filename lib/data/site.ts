export type SiteLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  handle: string;
  tagline: string;
  bio: string;
  email: string;
  resumePath: string;
  discordUserId: string;
  links: {
    github: SiteLink;
    linkedin: SiteLink;
    leetcode: SiteLink;
    codeforces: SiteLink;
    email: SiteLink;
    resume: SiteLink;
  };
};

export const siteConfig: SiteConfig = {
  name: "Suhan Ramani",
  handle: "suhan.dev",
  tagline: "I build systems and AI tools where latency, retrieval, and reliability all matter.",
  bio: "I am an undergrad engineer who likes the parts of software where clean interfaces meet messy reality: distributed systems, RAG pipelines, and real-time ML inference that has to feel instant.",
  email: "suhanramani09@gmail.com",
  resumePath: "/Resume.pdf",
  discordUserId: "DISCORD_USER_ID",
  links: {
    github: {
      label: "GitHub",
      href: "https://github.com/suhanramani",
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/suhan-ramani-b82291323/",
    },
    leetcode: {
      label: "LeetCode",
      href: "https://leetcode.com/suhanramani/",
    },
    codeforces: {
      label: "Codeforces",
      href: "https://codeforces.com/profile/suhanramani",
    },
    email: {
      label: "Email",
      href: "mailto:suhanramani09@gmail.com",
    },
    resume: {
      label: "Resume",
      href: "/Resume.pdf",
    },
  },
};
