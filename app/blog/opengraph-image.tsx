import { ImageResponse } from "next/og";

import { OgCard, ogContentType, ogFonts, ogSize } from "@/lib/og";
import { siteConfig } from "@/lib/data/site";

export const alt = `Writing — ${siteConfig.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function BlogOpengraphImage() {
  return new ImageResponse(<OgCard eyebrow="Writing" title="Notes and build logs" />, {
    ...size,
    fonts: ogFonts,
  });
}
