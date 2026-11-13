import type { Metadata } from "next";

import { LegacyProjectHash } from "@/components/LegacyProjectHash";
import { PosterProvider } from "@/components/PosterCard";
import { WorkList } from "@/components/WorkList";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Suhan Ramani has built, each with what it is, what it can do and how it works.",
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
            Each project has its own page: what it is, who it is for, what it can do and how it works.
          </p>
        </header>

        <div className="mt-10">
          <WorkList projects={projects} />
        </div>
      </div>
    </PosterProvider>
  );
}
