import type { Metadata } from "next";
import Link from "next/link";

import { formatPostDate, getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Writing",
  description: siteConfig.writingIntro,
  alternates: { canonical: "/writing" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="shell max-w-[48rem] pb-16 pt-14 sm:pt-20">
      <header className="max-w-[34rem]">
        <h1 className="font-display text-[clamp(2.5rem,8vw,3.5rem)] font-semibold leading-[1] tracking-[-0.035em] text-foreground">
          Writing
        </h1>
        <p className="mt-4 text-muted">{siteConfig.writingIntro}</p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-12 border-t border-line pt-8 text-muted">Nothing published yet.</p>
      ) : (
        <ol className="mt-12 divide-y divide-line border-t border-line">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link className="focus-ring group block py-7" href={`/writing/${post.slug}`}>
                <p className="eyebrow">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true"> &middot; </span>
                  {post.readingMinutes} min
                  {post.draft ? <span className="text-accent"> &middot; draft</span> : null}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-[-0.025em] text-foreground transition-colors group-hover:text-accent sm:text-[1.6rem]">
                  {post.title}
                </h2>
                {post.summary ? <p className="mt-2 leading-[1.65] text-muted">{post.summary}</p> : null}
                {post.tags.length > 0 ? (
                  <p className="mt-3 font-mono text-xs text-faint">{post.tags.join("  ·  ")}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
