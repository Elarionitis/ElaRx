import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";

// Variable grotesque with an optical-size axis. Distinctive at display sizes
// without tipping into a novelty face, which is what the name needs.
export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-display",
});

export const body = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-body",
});

// Every piece of metadata on the site: labels, dates, figures, stack, code.
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-mono",
});
