import fs from "node:fs";
import path from "node:path";

import { siteConfig } from "@/lib/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Vendored rather than fetched at build time so the image renders the same
// with or without a network connection.
const serif = fs.readFileSync(path.join(process.cwd(), "assets", "InstrumentSerif-Regular.ttf"));

export const ogFonts = [{ name: "Instrument Serif", data: serif, style: "normal" as const, weight: 400 as const }];

const paper = "#f7f8f8";
const ink = "#14181a";
const muted = "#586265";
const accent = "#0c7268";

export function OgCard({
  byline,
  eyebrow,
  footnote,
  title,
}: {
  byline?: string;
  eyebrow: string;
  footnote?: string;
  title: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: paper,
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, color: muted, fontSize: 22, letterSpacing: 2 }}>
        <div style={{ width: 40, height: 2, background: accent }} />
        {eyebrow.toUpperCase()}
      </div>

      <div
        style={{
          display: "flex",
          fontFamily: "Instrument Serif",
          fontSize: title.length > 52 ? 76 : 96,
          lineHeight: 1.05,
          letterSpacing: -1.5,
          color: ink,
        }}
      >
        {title}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", color: muted, fontSize: 24 }}>
        <div style={{ display: "flex", color: ink }}>{byline ?? siteConfig.name}</div>
        <div style={{ display: "flex" }}>{footnote ?? siteConfig.url.replace(/^https?:\/\//, "")}</div>
      </div>
    </div>
  );
}
