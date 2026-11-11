import { Bricolage_Grotesque, IBM_Plex_Mono, Reenie_Beanie } from "next/font/google";

/*
  Three voices, each with one job.

  Bricolage Grotesque is the printed voice: everything typeset. It has a width
  axis, so headlines can be set condensed and heavy like a poster while the
  running text stays at its natural width, and it has enough irregularity in
  its curves that a page of it does not look machine-neutral.
*/
export const body = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
  variable: "--ff-body",
});

/*
  Reenie Beanie is the pen: margin notes, the marks drawn over the type, and
  what visitors write in the guestbook. It is never used for anything that
  has to be read at length.
*/
export const hand = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--ff-hand",
});

/* Mono is for code and for the small print on the posters. Nothing else. */
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--ff-mono",
});
