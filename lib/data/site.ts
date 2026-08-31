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
  name: string;
  handle: string;
  tagline: string;
  lead: string;
  intro: string;
  about: string;
  contact: string;
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

export const siteConfig: SiteConfig = {
  name: "Suhan Ramani",
  handle: "Elarx.dev",
  tagline: "I build systems and AI tools where latency, retrieval, and reliability all matter.",
  lead: "I am a CS undergrad at IIT Jodhpur, into distributed systems and building things that talk to models in real time.",
  intro:
    "I like the parts where clean interfaces meet messy reality: retrieval that stays relevant, inference that stays responsive, and systems you can still reason about after they start growing.",
  about:
    "I am studying B.Tech Computer Science at IIT Jodhpur, class of 2028. I like building end-to-end software where the backend has real constraints: distributed systems, AI-integrated workflows, and features that need to feel fast without turning into a black box.",
  contact: "Open to SDE and AI/ML engineering internships. Email is the fastest way to reach me.",
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
