import fs from "node:fs";
import path from "node:path";

import { siteConfig } from "@/lib/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Vendored rather than fetched at build time so the image renders the same
// with or without a network connection.
const face = fs.readFileSync(path.join(process.cwd(), "assets", "Archivo-SemiBold.ttf"));

export const ogFonts = [{ name: "Archivo", data: face, style: "normal" as const, weight: 600 as const }];

const paper = "#faf7f2";
const ink = "#15120e";
const muted = "#4c463c";
const accent = "#c2371d";

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
          fontFamily: "Archivo",
          fontSize: title.length > 52 ? 62 : 82,
          lineHeight: 1.05,
          letterSpacing: -2.5,
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
