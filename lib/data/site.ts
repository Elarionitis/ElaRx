export type SiteLink = {
  label: string;
  url: string;
  visible: boolean;
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
      url: "https://github.com/suhanramani",
      visible: true,
    },
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/suhan-ramani-b82291323/",
      visible: true,
    },
    leetcode: {
      label: "LeetCode",
      url: "https://leetcode.com/suhanramani/",
      visible: false,
    },
    codeforces: {
      label: "Codeforces",
      url: "https://codeforces.com/profile/suhanramani",
      visible: false,
    },
    email: {
      label: "Email",
      url: "mailto:suhanramani09@gmail.com",
      visible: true,
    },
    resume: {
      label: "Resume",
      url: "/Resume.pdf",
      visible: true,
    },
  },
};
