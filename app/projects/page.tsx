import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, type ProjectCategory } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Distributed systems research, machine learning services and the smaller things in between.",
  alternates: { canonical: "/projects" },
};

const groups: { key: ProjectCategory; title: string; blurb: string }[] = [
  { key: "featured", title: "Featured", blurb: "The three with the most engineering behind them." },
  { key: "work", title: "More work", blurb: "Full builds, shorter stories." },
  { key: "experiment", title: "Experiments", blurb: "Written to understand something rather than to ship it." },
];

export default function ProjectsPage() {
  return (
    <div className="shell pb-8">
      <PageHeader
        description="Ordered by how much of the difficulty was interesting. The first three have full write-ups."
        label={`${projects.length} projects`}
        title="Projects"
      />

      <div className="flex flex-col gap-14 pt-12 sm:gap-16">
        {groups.map((group) => {
          const items = projects.filter((project) => project.category === group.key);
          if (items.length === 0) return null;

          return (
            <section key={group.key}>
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h2 className="eyebrow text-foreground">{group.title}</h2>
                <p className="eyebrow shrink-0">{items.length}</p>
              </div>
              <p className="mt-3 text-sm text-muted">{group.blurb}</p>

              <div className={`mt-6 grid gap-3 ${group.key === "featured" ? "" : "sm:grid-cols-2"}`}>
                {items.map((project) => (
                  <ProjectCard featured={group.key === "featured"} key={project.slug} project={project} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
