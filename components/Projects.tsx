import { projects, type Project } from "@/lib/data/projects";

function hasProjectLink(value: string | null) {
  return Boolean(value && value !== "[ADD_LINK]");
}

function ProjectLinks({ project }: { project: Project }) {
  const links = [
    { label: "repo", url: project.github },
    { label: "live", url: project.live },
  ].filter((link): link is { label: string; url: string } => hasProjectLink(link.url));

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 font-mono text-xs">
      {links.map((link) => (
        <a
          className="focus-ring rounded-full bg-surface px-3 py-2 text-foreground transition-colors hover:bg-accent hover:text-white motion-reduce:transition-none"
          href={link.url}
          key={link.url}
          rel="noreferrer"
          target="_blank"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-t border-line/70 py-14">
      <p className="eyebrow text-accent">projects</p>

      <div className="mt-8 space-y-6">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <article
              className={`group border-y border-line/70 px-0 py-8 transition-colors hover:bg-panel/55 motion-reduce:transition-none sm:px-6 sm:py-10 ${
                isEven ? "bg-surface/70" : "bg-panel/35"
              }`}
              key={project.title}
            >
              <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:items-start">
                <div className={isEven ? "" : "lg:order-2"}>
                  <p className="font-mono text-xs text-accent-alt">{`0${index + 1}`}</p>
                  <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                    <span className="border-b-2 border-transparent transition-colors group-hover:border-accent motion-reduce:transition-none">
                      {project.title}
                    </span>
                  </h2>
                  <div className="mt-5">
                    <ProjectLinks project={project} />
                  </div>
                </div>

                <div>
                  <p className="max-w-3xl text-lg leading-8 text-muted">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span className="chip transition-opacity group-hover:opacity-100 motion-reduce:transition-none" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
