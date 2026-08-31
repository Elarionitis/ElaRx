import { ImageResponse } from "next/og";

import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";
import { OgCard, ogContentType, ogFonts, ogSize } from "@/lib/og";

export const alt = "Blog post";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return new ImageResponse(
    <OgCard
      eyebrow="Writing"
      footnote={post ? formatPostDate(post.date) : undefined}
      title={post?.title ?? "Writing"}
    />,
    { ...size, fonts: ogFonts },
  );
}
