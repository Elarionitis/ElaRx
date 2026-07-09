import { ExternalLink, Github } from "lucide-react";

import { projects, type Project } from "@/lib/data/projects";

function hasProjectLink(value: string | null) {
  return Boolean(value && value !== "[ADD_LINK]");
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3 font-mono text-xs">
      {hasProjectLink(project.github) ? (
        <a
          className="focus-ring inline-flex items-center gap-1 text-[color:var(--foreground)] transition hover:text-[color:var(--accent)]"
          href={project.github}
          rel="noreferrer"
          target="_blank"
        >
          <Github size={14} />
          repo
        </a>
      ) : null}
      {hasProjectLink(project.live) ? (
        <a
          className="focus-ring inline-flex items-center gap-1 text-[color:var(--foreground)] transition hover:text-[color:var(--accent)]"
          href={project.live ?? undefined}
          rel="noreferrer"
          target="_blank"
        >
          <ExternalLink size={14} />
          live
        </a>
      ) : null}
    </div>
  );
}

export function Projects() {
  const selectedProject = projects[0];

  return (
    <section id="projects" className="scroll-mt-24 border-t border-[color:var(--line)]/30 py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mono-label text-[color:var(--accent)]">projects</p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            I keep project notes short: what I built, what made it tricky, and where the code lives.
          </p>
        </div>
        <p className="font-mono text-xs text-[color:var(--accent-alt)]">{projects.length} active notes</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)]">
        <div className="divide-y divide-[color:var(--line)]/25 border-y border-[color:var(--line)]/25">
          {projects.map((project, index) => (
            <article className="grid gap-4 py-7 sm:grid-cols-[32px_1fr]" key={project.title}>
              <p className="font-mono text-sm text-[color:var(--accent)]">{`0${index + 1}`}</p>
              <div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">
                    {project.title}
                  </h2>
                  <ProjectLinks project={project} />
                </div>
                <p className="mt-3 max-w-2xl text-base leading-7 text-[color:var(--muted)]">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      className="border border-[color:var(--line)]/35 bg-[color:var(--surface)] px-2.5 py-1.5 font-mono text-xs text-[color:var(--muted)]"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="border border-[color:var(--line)]/35 bg-[color:var(--surface)] p-5 font-mono text-xs text-[color:var(--muted)]">
          <p className="text-[color:var(--accent)]">$ inspect project</p>
          <div className="mt-5 space-y-4">
            <div>
              <p className="text-[color:var(--accent-alt)]">title</p>
              <p className="mt-1 text-sm text-[color:var(--foreground)]">{selectedProject.title}</p>
            </div>
            <div>
              <p className="text-[color:var(--accent-alt)]">why</p>
              <p className="mt-1 leading-6">{selectedProject.summary}</p>
            </div>
            <div>
              <p className="text-[color:var(--accent-alt)]">stack</p>
              <p className="mt-1 leading-6">{selectedProject.stack.join(" / ")}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
