import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date || undefined,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="shell pb-16 pt-14 sm:pt-20">
      <Link className="focus-ring eyebrow inline-block transition-colors hover:text-foreground" href="/blog">
        &larr; Writing
      </Link>

      <header className="mt-8">
        <p className="eyebrow">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true"> &middot; </span>
          {post.readingMinutes} min read
        </p>
        <h1 className="mt-3 max-w-[32rem] font-display text-[clamp(2.25rem,7vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground">
          {post.title}
        </h1>
        {post.summary ? <p className="mt-4 max-w-[34rem] text-lg leading-[1.6] text-muted">{post.summary}</p> : null}
      </header>

      <div className="prose mt-10 border-t border-line pt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

      {post.tags.length > 0 ? (
        <footer className="mt-12 flex flex-wrap gap-2 border-t border-line pt-6">
          {post.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </footer>
      ) : null}
    </article>
  );
}
