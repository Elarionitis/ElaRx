export type SocialLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  handle: string;
  tagline: string;
  location: string;
  email: string;
  resumePath: string;
  discordUserId: string;
  links: {
    github: SocialLink;
    linkedin: SocialLink;
    discord: SocialLink;
    email: SocialLink;
    resume: SocialLink;
  };
  proof: string[];
};

export const siteConfig: SiteConfig = {
  name: "Suhan Ramani",
  handle: "suhan.ram",
  tagline: "I build systems and AI tools where latency, retrieval, and reliability all matter.",
  location: "IIT Jodhpur CSE",
  email: "suhanramani09@gmail.com",
  resumePath: "/Resume_BNY.pdf",
  discordUserId: "s_builds",
  links: {
    github: {
      label: "GitHub",
      href: "https://github.com/suhanramani",
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/suhan-ramani-b82291323/",
    },
    discord: {
      label: "Discord",
      href: "https://discord.com/users/s_builds",
    },
    email: {
      label: "Email",
      href: "mailto:suhanramani09@gmail.com",
    },
    resume: {
      label: "Resume",
      href: "/Resume_BNY.pdf",
    },
  },
  proof: [
    "JEE Advanced 2024 AIR 397 (General-EWS)",
    "JEE Main 2024 99.55 percentile",
    "GUJCET 2024 Gujarat State Rank 3",
  ],
};
