import { Archivo, IBM_Plex_Mono } from "next/font/google";

/*
  Archivo is a grotesque built for signage and documents — tight, even colour,
  a real width axis. It holds a specification sheet the way Inter does not.
*/
export const body = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-body",
});

/*
  Mono is the margin apparatus only: decision numbers, dates, labels, code.
  It never sets running text.
*/
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--ff-mono",
});

export const display = body;
