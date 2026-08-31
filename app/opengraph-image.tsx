import { ImageResponse } from "next/og";

import { OgCard, ogContentType, ogFonts, ogSize } from "@/lib/og";
import { siteConfig } from "@/lib/data/site";

export const alt = `${siteConfig.name} — Software Engineer`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return new ImageResponse(<OgCard byline="Software engineer" eyebrow={siteConfig.location} title={siteConfig.name} />, {
    ...size,
    fonts: ogFonts,
  });
}
