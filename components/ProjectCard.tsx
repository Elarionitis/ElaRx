import Link from "next/link";

import { hasCaseStudy, type Project } from "@/lib/data/projects";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  source: "Source",
  research: "Research",
};

export function ProjectCard({ featured = false, project }: { featured?: boolean; project: Project }) {
  const readable = hasCaseStudy(project);
  const href = `/projects/${project.slug}`;

  return (
    <article className={`card card-hover group relative ${featured ? "p-6 sm:p-7" : "p-5"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className={`font-display font-semibold leading-tight tracking-[-0.025em] text-foreground transition-colors group-hover:text-accent ${
              featured ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {readable ? (
              <Link className="focus-ring before:absolute before:inset-0 before:content-['']" href={href}>
                {project.name}
              </Link>
            ) : (
              project.name
            )}
          </h3>
          <p className="mt-1 text-sm text-muted">{project.tagline}</p>
        </div>
        <span className={`pill shrink-0 ${project.status === "live" ? "pill-live" : ""}`}>
          <span aria-hidden="true" className="dot" />
          {statusLabel[project.status]}
        </span>
      </div>

      <p className={`mt-4 leading-[1.55] text-muted ${featured ? "" : "text-sm"}`}>{project.summary}</p>

      {featured && project.results?.length ? (
        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-5 sm:grid-cols-4">
          {project.results.slice(0, 4).map((metric) => (
            <div key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="figure block text-base text-accent">{metric.value}</span>
                <span className="eyebrow mt-1 block">{metric.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.7rem] text-faint">
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-4 pt-5 font-mono text-xs">
        {readable ? (
          <span className="more">
            Case study
            <span aria-hidden="true" className="chev">
              &rarr;
            </span>
          </span>
        ) : null}
        {project.links.github ? (
          <a
            className="focus-ring relative z-10 text-muted transition-colors hover:text-accent"
            href={project.links.github}
            rel="noreferrer"
            target="_blank"
          >
            Repo <span aria-hidden="true">&#8599;</span>
          </a>
        ) : null}
        {project.links.live ? (
          <a
            className="focus-ring relative z-10 text-muted transition-colors hover:text-accent"
            href={project.links.live}
            rel="noreferrer"
            target="_blank"
          >
            Live <span aria-hidden="true">&#8599;</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
