import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Decisions } from "@/components/Decisions";
import { Longer } from "@/components/Longer";
import { hasPoster, ProjectPoster } from "@/components/ProjectPoster";
import { decisions } from "@/lib/data/decisions";
import { getProject, projects } from "@/lib/data/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.intro,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const notes = decisions.filter((decision) => decision.source === project.slug);
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const hasMore = Boolean(project.problem || project.approach || project.architecture?.length || notes.length);

  return (
    <article className="sheet pb-4">
      <header className="project-head" data-reveal>
        <div className="min-w-0">
          <Link className="focus-ring project-back" href="/projects">
            <span aria-hidden="true">←</span> All projects
          </Link>
          <h1 className="page-title mt-5">{project.name}</h1>
          <p className="project-lead">{project.intro}</p>

          <div className="project-meta">
            {project.links.live ? (
              <a className="focus-ring btn btn-solid" href={project.links.live} rel="noreferrer" target="_blank">
                Try it live
              </a>
            ) : null}
            {project.links.github ? (
              <a className="focus-ring btn btn-line" href={project.links.github} rel="noreferrer" target="_blank">
                Read the code
              </a>
            ) : null}
            <p className="project-role">
              {project.role}
              {project.timeframe ? `, ${project.timeframe}` : ""}
            </p>
          </div>
        </div>

        {hasPoster(project.slug) ? (
          <div aria-hidden="true" className="project-poster">
            <ProjectPoster slug={project.slug} />
          </div>
        ) : null}
      </header>

      <div className="project-body">
        <section className="project-part" data-reveal>
          <h2 className="project-part-title">About this project</h2>
          {project.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="project-part" data-reveal>
          <h2 className="project-part-title">What it can do</h2>
          <ul className="project-features">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        {project.results && project.results.length > 0 ? (
          <section className="project-part" data-reveal>
            <h2 className="project-part-title">In numbers</h2>
            <dl className="project-results">
              {project.results.map((result) => (
                <div key={result.label}>
                  <dt>{result.value}</dt>
                  <dd>{result.label}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <section className="project-part" data-reveal>
          <h2 className="project-part-title">Built with</h2>
          <p>{project.stack.join(", ")}</p>
        </section>

        {hasMore ? (
          <div className="project-part scroll-mt-24" data-reveal id="decisions">
            <Longer>
              {project.problem ? (
                <section className="longer-part">
                  <h2 className="project-part-title">The hard part</h2>
                  <p>{project.problem}</p>
                </section>
              ) : null}

              {project.approach ? (
                <section className="longer-part">
                  <h2 className="project-part-title">What I did about it</h2>
                  <p>{project.approach}</p>
                </section>
              ) : null}

              {project.architecture && project.architecture.length > 0 ? (
                <section className="longer-part">
                  <h2 className="project-part-title">How it works</h2>
                  <dl className="project-how">
                    {project.architecture.map((item) => (
                      <div key={item.title}>
                        <dt>{item.title}</dt>
                        <dd>{item.body}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              {notes.length > 0 ? (
                <section className="longer-part">
                  <h2 className="project-part-title">Decisions I had to make</h2>
                  <Decisions items={notes} />
                </section>
              ) : null}
            </Longer>
          </div>
        ) : null}
      </div>

      {next && next.slug !== project.slug ? (
        <Link className="focus-ring project-next" data-reveal href={`/projects/${next.slug}`}>
          <span className="label">Next project</span>
          <span className="project-next-name">
            {next.name} <span aria-hidden="true">→</span>
          </span>
          <span className="project-next-intro">{next.intro}</span>
        </Link>
      ) : null}
    </article>
  );
}
