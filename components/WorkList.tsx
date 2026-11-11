"use client";

import Link from "next/link";

import { usePoster } from "@/components/PosterCard";
import { ProjectPoster } from "@/components/ProjectPoster";
import type { Project } from "@/lib/data/projects";

/*
  The projects, as a list: a name, and one sentence saying what the thing is.

  Nothing else. The figures, the architecture and the reasoning are one click
  away on /projects, which is where someone who wants them will look; a
  homepage that carries all of it reads as documentation for the projects
  rather than as an introduction to the person who made them.

  Pointing at a row brings up its poster through the shared PosterCard, and
  dims the other rows so the list itself says which project the card belongs
  to. Touch has no hover, so there the poster sits in the row as a thumbnail.
*/
export function WorkList({ projects }: { projects: Project[] }) {
  const { active, bind } = usePoster();
  const inList = projects.some((project) => project.slug === active);

  return (
    <ul className={`work-list ${inList ? "has-active" : ""}`}>
      {projects.map((project, index) => (
        <li
          data-reveal
          key={project.slug}
          style={{ "--reveal-delay": `${Math.min(index, 5) * 60}ms` } as React.CSSProperties}
        >
          <Link
            className={`work-row focus-ring ${active === project.slug ? "is-active" : ""}`}
            href={`/projects/${project.slug}`}
            {...bind(project.slug)}
          >
            <span aria-hidden="true" className="work-thumb">
              <ProjectPoster slug={project.slug} />
            </span>
            <span aria-hidden="true" className="pen work-no">{index + 1}.</span>
            <span className="work-name">
              {project.name}
              {project.links.live ? <span className="pen work-live">it&rsquo;s live, try it</span> : null}
            </span>
            <span className="work-intro">{project.intro}</span>
            <span aria-hidden="true" className="work-arrow">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
