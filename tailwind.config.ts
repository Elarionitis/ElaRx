import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        packet: {
          navy: "#101820",
        },
        trace: {
          ink: "#1f2933",
        },
        signal: {
          cyan: "#2bb3a3",
        },
        process: {
          warm: "#e0b15a",
        },
        log: {
          paper: "#f6f4ee",
        },
        wire: {
          gray: "#9aa6b2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        line: "0 1px 0 rgb(154 166 178 / 0.24)",
      },
    },
  },
  plugins: [],
};

export default config;
