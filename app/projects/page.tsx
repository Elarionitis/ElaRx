import type { Metadata } from "next";

import { LegacyProjectHash } from "@/components/LegacyProjectHash";
import { PosterProvider } from "@/components/PosterCard";
import { WorkList } from "@/components/WorkList";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Suhan Ramani has built, each with what it is, how it works and why it is built that way.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const slugs = projects.map((project) => project.slug);

  return (
    <PosterProvider slugs={slugs}>
      <LegacyProjectHash slugs={slugs} />
      <div className="sheet pb-4">
        <header className="pt-14 sm:pt-20" data-reveal>
          <h1 className="page-title">Projects</h1>
          <p className="page-lead">
            Everything I have built that is worth showing. Each one opens on its own page: what it is, how it
            works, and the decisions I had to make along the way.
          </p>
        </header>

        <div className="mt-10">
          <WorkList projects={projects} />
        </div>
      </div>
    </PosterProvider>
  );
}
