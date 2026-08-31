import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPost } from "@/lib/blog";
import { getProject, hasCaseStudy, projects, type Detail } from "@/lib/data/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // Only projects with a write-up get a page; the rest would prerender a 404.
  return projects.filter(hasCaseStudy).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { type: "article", title: project.name, description: project.summary },
  };
}

function DetailList({ items, label }: { items: Detail[]; label: string }) {
  return (
    <section>
      <h2 className="eyebrow border-b border-line pb-3 text-foreground">{label}</h2>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div className="card p-5" key={item.title}>
            <h3 className="font-display text-base font-semibold tracking-[-0.02em] text-foreground">{item.title}</h3>
            <p className="mt-2 leading-[1.6] text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !hasCaseStudy(project)) notFound();

  const related = project.relatedWriting ? await getPost(project.relatedWriting) : null;

  return (
    <div className="shell max-w-[52rem] pb-8">
      <div className="pt-10 sm:pt-14">
        <Link className="focus-ring more" href="/projects">
          <span aria-hidden="true">&larr;</span> All projects
        </Link>
      </div>

      <header className="border-b border-line pb-10 pt-8">
        <p className="eyebrow">
          {project.role}
          {project.timeframe ? (
            <>
              <span aria-hidden="true" className="mx-2 text-line-strong">
                &#9679;
              </span>
              {project.timeframe}
            </>
          ) : null}
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.25rem,6vw,3.25rem)] font-semibold leading-[1] tracking-[-0.035em] text-foreground">
          {project.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-[1.5] text-muted">{project.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.72rem] text-faint">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {project.links.github || project.links.live ? (
          <div className="mt-7 flex flex-wrap gap-2">
            {project.links.live ? (
              <a className="focus-ring btn btn-primary" href={project.links.live} rel="noreferrer" target="_blank">
                Live demo
              </a>
            ) : null}
            {project.links.github ? (
              <a className="focus-ring btn btn-ghost" href={project.links.github} rel="noreferrer" target="_blank">
                Source
                <span aria-hidden="true" className="arrow">
                  &#8599;
                </span>
              </a>
            ) : null}
          </div>
        ) : null}
      </header>

      {project.results?.length ? (
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {project.results.map((metric) => (
            <div className="bg-surface px-4 py-4" key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="figure block text-lg text-accent sm:text-xl">{metric.value}</span>
                <span className="eyebrow mt-1.5 block">{metric.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="flex flex-col gap-12 py-12 sm:gap-14">
        {project.problem ? (
          <section>
            <h2 className="eyebrow border-b border-line pb-3 text-foreground">The problem</h2>
            <p className="mt-6 text-lg leading-[1.65] text-foreground">{project.problem}</p>
          </section>
        ) : null}

        {project.approach ? (
          <section>
            <h2 className="eyebrow border-b border-line pb-3 text-foreground">The approach</h2>
            <p className="mt-6 text-lg leading-[1.65] text-foreground">{project.approach}</p>
          </section>
        ) : null}

        {project.architecture?.length ? <DetailList items={project.architecture} label="How it works" /> : null}
        {project.decisions?.length ? <DetailList items={project.decisions} label="Engineering decisions" /> : null}
        {project.challenges?.length ? <DetailList items={project.challenges} label="What went wrong" /> : null}

        {related ? (
          <section>
            <h2 className="eyebrow border-b border-line pb-3 text-foreground">Technical write-up</h2>
            <Link className="card card-hover group mt-6 block p-5" href={`/writing/${related.slug}`}>
              <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
                {related.title}
              </h3>
              {related.summary ? <p className="mt-2 text-sm text-muted">{related.summary}</p> : null}
            </Link>
          </section>
        ) : null}
      </div>
    </div>
  );
}
