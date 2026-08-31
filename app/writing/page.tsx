import type { Metadata } from "next";
import Link from "next/link";

import { formatPostDate, getAllPosts, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description: "Write-ups of the decisions behind the work, and notes on what broke along the way.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="sheet pb-4">
      <header className="pt-16 sm:pt-20">
        <h1 className="text-[clamp(1.85rem,4.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.035em] text-ink">
          Writing
        </h1>
        <p className="measure mt-5 text-[1.05rem] leading-[1.6] text-ink-2">
          Mostly write-ups of decisions from the work — the reasoning at full length, rather than the
          summary. Some of it is settled and some of it I am still arguing with myself about.
        </p>
        {tags.length > 0 ? (
          <p className="label mt-6">{tags.join(" · ")}</p>
        ) : null}
      </header>

      <div className="mt-12">
        {posts.length === 0 ? (
          <p className="clause pt-8 text-[0.95rem] text-ink-2">Nothing published yet.</p>
        ) : (
          <ul className="border-b border-rule border-t-rule-2">
            {posts.map((post) => (
              <li className="border-t border-rule first:border-t-2 first:border-t-rule-2" key={post.slug}>
                <Link
                  className="focus-ring group grid gap-x-5 gap-y-2 py-7 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
                  href={`/writing/${post.slug}`}
                >
                  <div>
                    <time className="label block" dateTime={post.date}>
                      {formatPostDate(post.date)}
                    </time>
                    <span className="label mt-1 block text-ink-3">
                      <span className="num">{post.readingMinutes}</span> min
                      {post.draft ? <span className="text-accent"> · draft</span> : null}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-[1.3rem] leading-tight tracking-[-0.025em] text-ink transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    {post.summary ? (
                      <p className="measure mt-2 text-[0.98rem] leading-[1.6] text-ink-2">{post.summary}</p>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
