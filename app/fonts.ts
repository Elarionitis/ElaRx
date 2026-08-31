import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";

// Display face for headings. Instrument Serif ships a single weight by design —
// the size and the leading do the work instead of the weight axis.
export const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--ff-display",
});

export const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-body",
});

// Reserved for metadata: dates, tags, labels, code.
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-mono",
});
