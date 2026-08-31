import type { Metadata } from "next";

import { ProjectIndex } from "@/components/ProjectIndex";
import { decisions } from "@/lib/data/decisions";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Distributed systems research, machine learning services, and the smaller things in between.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="sheet pb-4">
      <header className="pt-16 sm:pt-20">
        <h1 className="text-[clamp(1.85rem,4.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.035em] text-ink">
          Projects
        </h1>
        <p className="measure mt-5 text-[1.05rem] leading-[1.6] text-ink-2">
          Pick one to read what it is, what was hard about it, and the decisions it produced. Filter by the
          kind of problem rather than the language.
        </p>
      </header>

      <div className="mt-12">
        <ProjectIndex decisions={decisions} projects={projects} />
      </div>
    </div>
  );
}
