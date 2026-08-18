export type SiteLink = {
  label: string;
  url: string;
  visible: boolean;
};

export type SiteConfig = {
  name: string;
  handle: string;
  tagline: string;
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
  proof: string[];
};

export const siteConfig: SiteConfig = {
  name: "Suhan Ramani",
  handle: "Elarx.dev",
  tagline: "I build systems and AI tools where latency, retrieval, and reliability all matter.",
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
    "JEE Advanced 2024 AIR 397 (General-EWS)",
    "JEE Main 2024 99.55 percentile",
    "GUJCET 2024 Gujarat State Rank 3",
  ],
};
