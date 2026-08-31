import { Section } from "@/components/Section";
import { projects, type Project } from "@/lib/data/projects";

function ProjectCard({ project }: { project: Project }) {
  const isLive = Boolean(project.live);

  return (
    <article className="card card-hover group p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold leading-tight tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
          {project.name}
        </h3>
        <span className={`pill shrink-0 ${isLive ? "pill-live" : ""}`}>
          <span aria-hidden="true" className="dot" />
          {isLive ? "Live" : "Source"}
        </span>
      </div>

      <p className="mt-2 text-sm leading-[1.55] text-muted">{project.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.7rem] text-faint">
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="mt-auto flex gap-4 pt-5 font-mono text-xs">
        <a
          className="focus-ring text-muted transition-colors hover:text-accent"
          href={project.github}
          rel="noreferrer"
          target="_blank"
        >
          Repo <span aria-hidden="true">&#8599;</span>
        </a>
        {project.live ? (
          <a
            className="focus-ring text-muted transition-colors hover:text-accent"
            href={project.live}
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

export function Projects() {
  return (
    <Section aside={`${projects.length} shipped`} id="work" label="Work">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}
