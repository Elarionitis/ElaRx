import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";
import { decisions } from "@/lib/data/decisions";
import { projects } from "@/lib/data/projects";

type PageProps = { params: Promise<{ slug: string }> };

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
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date || undefined,
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const others = getAllPosts().filter((item) => item.slug !== post.slug).slice(0, 2);
  // A post about a project links back to it, and to the decisions it produced.
  const project = projects.find((item) => post.tags.includes(item.slug));
  const related = project ? decisions.filter((decision) => decision.source === project.slug) : [];

  return (
    <div className="sheet pb-4">
      <div className="mx-auto max-w-[38rem]">
        <div className="pt-12 sm:pt-16">
          <Link className="focus-ring label transition-colors hover:text-ink" href="/writing">
            &larr; Writing
          </Link>
        </div>

        <header className="mt-10">
          <p className="label">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true"> &middot; </span>
            <span className="num">{post.readingMinutes}</span> min read
          </p>
          <h1 className="mt-4 text-[clamp(1.9rem,5vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.035em] text-ink">
            {post.title}
          </h1>
          {post.summary ? (
            <p className="mt-5 text-[1.15rem] leading-[1.55] text-ink-2">{post.summary}</p>
          ) : null}
        </header>

        <article className="prose mt-10 border-t border-rule-2 pt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

        {project ? (
          <aside className="mt-14 border-t border-rule-2 pt-6">
            <p className="label">Related project</p>
            <Link
              className="focus-ring group mt-4 block"
              href={`/projects#${project.slug}`}
            >
              <span className="block text-[1.05rem] leading-tight tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
                {project.name}
              </span>
              <span className="mt-1.5 block text-[0.95rem] text-ink-2">{project.tagline}</span>
            </Link>
            {related.length > 0 ? (
              <ul className="mt-5 grid gap-2">
                {related.map((decision) => (
                  <li className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3" key={decision.id}>
                    <span className="ref pt-0.5">{decision.id}</span>
                    <Link className="focus-ring tlink text-[0.95rem] text-ink-2" href={`/#${decision.id}`}>
                      {decision.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </aside>
        ) : null}

        {others.length > 0 ? (
          <nav aria-label="More writing" className="mt-14 border-t border-rule-2 pt-6">
            <p className="label">More writing</p>
            <ul className="mt-4 grid gap-4">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link className="focus-ring group block" href={`/writing/${item.slug}`}>
                    <span className="label block">{formatPostDate(item.date)}</span>
                    <span className="mt-1 block text-[1.05rem] leading-tight tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </div>
  );
}
