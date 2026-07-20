"use client";

import { useEffect, useMemo, useState } from "react";

import { projects, type Project } from "@/lib/data/projects";

function hasProjectLink(value: string | null) {
  return Boolean(value && value !== "[ADD_LINK]");
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3 font-mono text-xs">
      {hasProjectLink(project.github) ? (
        <a
          className="focus-ring rounded-full px-2 py-1 text-foreground transition-colors hover:bg-panel hover:text-accent motion-reduce:transition-none"
          href={project.github}
          rel="noreferrer"
          target="_blank"
        >
          repo
        </a>
      ) : null}
      {hasProjectLink(project.live) ? (
        <a
          className="focus-ring rounded-full px-2 py-1 text-foreground transition-colors hover:bg-panel hover:text-accent motion-reduce:transition-none"
          href={project.live ?? undefined}
          rel="noreferrer"
          target="_blank"
        >
          live
        </a>
      ) : null}
    </div>
  );
}

function projectInterestingBit(project: Project) {
  if (project.title === "Real-Time Sign Language Detection") {
    return "The tricky part was making recognition feel immediate, so the WebSocket path matters as much as the model score.";
  }

  return "The interesting bit is the ledger shape: keeping events auditable while minimizing the actual settlement payments.";
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const selectedProject = projects[activeIndex];
  const selectedStack = useMemo(() => selectedProject.stack.join(" / "), [selectedProject]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);

    return () => media.removeEventListener("change", updatePreference);
  }, []);

  const motionClass = prefersReducedMotion
    ? "motion-reduce:transition-none motion-reduce:transform-none"
    : "transition duration-200 ease-out motion-reduce:transition-none motion-reduce:transform-none";

  return (
    <section id="projects" className="scroll-mt-24 border-t border-line/70 py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-accent">projects</p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            Two project notes for now: each one gets room to explain what mattered, without pretending this is a
            gallery.
          </p>
        </div>
        <p className="font-mono text-xs text-accent-alt">{projects.length} shipped notes</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(320px,0.94fr)]">
        <div className="divide-y divide-line/70 border-y border-line/70">
          {projects.map((project, index) => (
            <article
              className={`focus-ring grid cursor-default gap-4 py-8 sm:grid-cols-[2rem_1fr] ${motionClass} ${
                activeIndex === index ? "bg-panel/45" : ""
              }`}
              key={project.title}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              tabIndex={0}
            >
              <p
                className={`font-mono text-sm ${motionClass} ${
                  activeIndex === index ? "text-accent-alt" : "text-accent"
                }`}
              >
                {activeIndex === index ? ">" : `0${index + 1}`}
              </p>
              <div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className={`font-display text-2xl font-semibold text-foreground ${motionClass}`}>
                    {project.title}
                  </h2>
                  <ProjectLinks project={project} />
                </div>
                <p className="mt-3 max-w-2xl leading-7 text-muted">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="status-strip min-h-80 p-5 font-mono text-xs text-muted lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center justify-between gap-4 border-b border-line/70 pb-3">
            <p className="text-accent">$ inspect project</p>
            <p className="text-accent-alt">{`active=0${activeIndex + 1}`}</p>
          </div>
          <div className={`mt-5 space-y-4 ${motionClass}`}>
            <div>
              <p className="text-accent-alt">title</p>
              <p className="mt-1 text-sm text-foreground">{selectedProject.title}</p>
            </div>
            <div>
              <p className="text-accent-alt">why</p>
              <p className="mt-1 leading-6">{selectedProject.summary}</p>
            </div>
            <div>
              <p className="text-accent-alt">interesting bit</p>
              <p className="mt-1 leading-6">{projectInterestingBit(selectedProject)}</p>
            </div>
            <div>
              <p className="text-accent-alt">stack</p>
              <p className="mt-1 leading-6">{selectedStack}</p>
            </div>
            <div>
              <p className="text-accent-alt">links</p>
              <div className="mt-2">
                <ProjectLinks project={selectedProject} />
                {!hasProjectLink(selectedProject.github) && !hasProjectLink(selectedProject.live) ? (
                  <p className="leading-6">repo link pending</p>
                ) : null}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
