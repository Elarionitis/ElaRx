import { Section } from "@/components/Section";
import { projects, type Project } from "@/lib/data/projects";

function ProjectLinks({ project }: { project: Project }) {
  const links = [
    { label: "Repo", url: project.github },
    { label: "Live", url: project.live },
  ].filter((link): link is { label: string; url: string } => Boolean(link.url));

  return (
    <div className="flex shrink-0 gap-4 font-mono text-xs">
      {links.map((link) => (
        <a
          className="focus-ring inline-flex items-baseline gap-0.5 text-muted transition-colors hover:text-accent"
          href={link.url}
          key={link.url}
          rel="noreferrer"
          target="_blank"
        >
          <span className="border-b border-transparent hover:border-current">{link.label}</span>
          <span aria-hidden="true">&#8599;</span>
        </a>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <Section id="work" label="Work">
      <ol className="divide-y divide-line">
        {projects.map((project) => (
          <li className="py-7 first:pt-0 last:pb-0" key={project.name}>
            <div className="flex items-baseline justify-between gap-5">
              <h3 className="font-display text-2xl leading-tight text-foreground">{project.name}</h3>
              <ProjectLinks project={project} />
            </div>
            <p className="mt-0.5 text-sm text-muted">{project.tagline}</p>
            <p className="mt-3 leading-[1.65] text-muted">{project.summary}</p>
            <p className="mt-3 font-mono text-xs text-faint">{project.stack.join("  ·  ")}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
