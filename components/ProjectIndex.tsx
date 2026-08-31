"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { Decision } from "@/lib/data/decisions";
import type { Project } from "@/lib/data/projects";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  source: "Source",
  research: "In progress",
};

function Row({
  decisions,
  onToggle,
  open,
  project,
}: {
  decisions: Decision[];
  onToggle: () => void;
  open: boolean;
  project: Project;
}) {
  const panelId = `${project.slug}-body`;

  return (
    <li className="scroll-mt-20 border-t border-rule" id={project.slug}>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        /*
          Three children, two columns on mobile: without explicit placement the
          tagline lands in the 1.5rem toggle column and runs off the screen.
        */
        className="focus-ring group grid w-full grid-cols-[minmax(0,1fr)_1.5rem] items-baseline gap-x-5 gap-y-2 py-6 text-left sm:grid-cols-[13rem_minmax(0,1fr)_1.5rem]"
        onClick={onToggle}
        type="button"
      >
        <span className="col-start-1 row-start-1 min-w-0">
          <span className="block text-[1.05rem] leading-tight tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
            {project.name}
          </span>
          <span className="label mt-1.5 block">
            {project.domain} &middot; {statusLabel[project.status]}
          </span>
        </span>

        <span className="measure col-span-2 row-start-2 text-[0.95rem] leading-[1.6] text-ink-2 sm:col-span-1 sm:col-start-2 sm:row-start-1">
          {project.tagline}
        </span>

        <span
          aria-hidden="true"
          className={`col-start-2 row-start-1 justify-self-end text-ink-3 transition-transform duration-200 sm:col-start-3 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div className={open ? "block" : "hidden"} id={panelId} role="region">
        <div className="grid gap-8 pb-10 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-x-5">
          <div className="flex flex-col gap-5">
            <div>
              <p className="label">Built with</p>
              <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[0.72rem] text-ink-3">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {project.timeframe ? (
              <div>
                <p className="label">Status</p>
                <p className="mt-2 text-[0.85rem] text-ink-2">{project.timeframe}</p>
              </div>
            ) : null}
            {project.links.github || project.links.live ? (
              <div className="flex flex-wrap gap-2">
                {project.links.live ? (
                  <a className="focus-ring btn btn-solid" href={project.links.live} rel="noreferrer" target="_blank">
                    Live
                  </a>
                ) : null}
                {project.links.github ? (
                  <a className="focus-ring btn btn-line" href={project.links.github} rel="noreferrer" target="_blank">
                    Source
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="measure">
            <p className="text-[0.95rem] leading-[1.65] text-ink-2">{project.summary}</p>

            {project.problem ? (
              <p className="mt-5 text-[0.95rem] leading-[1.65] text-ink-2">
                <span className="text-ink">The problem. </span>
                {project.problem}
              </p>
            ) : null}

            {decisions.length > 0 ? (
              <div className="mt-7">
                <p className="label">Decisions from this project</p>
                <ul className="mt-3 grid gap-2.5">
                  {decisions.map((decision) => (
                    <li className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3" key={decision.id}>
                      <span className="ref pt-0.5">{decision.id}</span>
                      <Link className="focus-ring tlink text-[0.95rem] leading-[1.5] text-ink" href={`/#${decision.id}`}>
                        {decision.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-6 text-[0.9rem] leading-[1.6] text-ink-3">
                No decisions written up for this one yet — it was a build, not an argument.
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export function ProjectIndex({
  decisions,
  domains,
  projects,
}: {
  decisions: Decision[];
  domains: string[];
  projects: Project[];
}) {
  const [filter, setFilter] = useState<string>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  /*
    Deep links from the homepage, the palette and an article open the project
    they name. The hash never reaches the server, so this can only run on the
    client — and it runs inside a frame callback so the row exists by the time
    we scroll to it.
  */
  useEffect(() => {
    function openFromHash() {
      const hash = window.location.hash.replace("#", "");
      if (!hash || !projects.some((project) => project.slug === hash)) return;
      setOpenSlug(hash);
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    }

    const frame = window.requestAnimationFrame(openFromHash);
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [projects]);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.domain === filter)),
    [filter, projects],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const project of projects) map.set(project.domain, (map.get(project.domain) ?? 0) + 1);
    return map;
  }, [projects]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule-2 py-4">
        <span className="label">Filter</span>
        {["All", ...domains].map((option) => {
          const isActive = filter === option;
          const count = option === "All" ? projects.length : (counts.get(option) ?? 0);

          return (
            <button
              aria-pressed={isActive}
              className={`focus-ring text-sm transition-colors ${
                isActive ? "text-accent" : "text-ink-2 hover:text-ink"
              }`}
              key={option}
              onClick={() => setFilter(option)}
              type="button"
            >
              {option}
              <span className="num ml-1.5 text-[0.7rem] text-ink-3">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="border-b border-rule">
        {visible.map((project) => (
          <Row
            decisions={decisions.filter((decision) => decision.source === project.slug)}
            key={project.slug}
            onToggle={() => setOpenSlug((current) => (current === project.slug ? null : project.slug))}
            open={openSlug === project.slug}
            project={project}
          />
        ))}
      </ul>

      {visible.length === 0 ? (
        <p className="py-10 text-sm text-ink-2">Nothing in that domain yet.</p>
      ) : null}
    </>
  );
}
