"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { Decision } from "@/lib/data/decisions";
import type { Project } from "@/lib/data/projects";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  source: "Source",
  research: "In progress",
};

/*
  Master and detail rather than an accordion.

  An accordion puts the variable-height panel inside the row you are pointing
  at, so opening one row moves every row beneath it — which is what made
  moving between projects land on the wrong one. Here the list and the detail
  are separate columns, so nothing the detail does can shift the list.

  That buys the interaction its responsiveness back: because there is no
  reflow to guard against, selection is instant on hover instead of waiting
  out a dwell delay, and one project is always shown rather than the page
  flickering between empty and full.
*/
export function ProjectIndex({
  decisions,
  projects,
}: {
  decisions: Decision[];
  projects: Project[];
}) {
  const domains = useMemo(
    () => [...new Set(projects.map((project) => project.domain))].sort(),
    [projects],
  );

  const [filter, setFilter] = useState("All");
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.domain === filter)),
    [filter, projects],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const project of projects) map.set(project.domain, (map.get(project.domain) ?? 0) + 1);
    return map;
  }, [projects]);

  // Deep links from the homepage, the palette and articles select a project.
  useEffect(() => {
    function selectFromHash() {
      const hash = window.location.hash.replace("#", "");
      if (hash && projects.some((project) => project.slug === hash)) setActiveSlug(hash);
    }

    const frame = window.requestAnimationFrame(selectFromHash);
    window.addEventListener("hashchange", selectFromHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", selectFromHash);
    };
  }, [projects]);

  const changeFilter = useCallback(
    (option: string) => {
      setFilter(option);
      const next = option === "All" ? projects : projects.filter((project) => project.domain === option);
      // Never leave the detail showing something the list no longer offers.
      if (next.length > 0 && !next.some((project) => project.slug === activeSlug)) {
        setActiveSlug(next[0].slug);
      }
    },
    [activeSlug, projects],
  );

  /*
    Stacked layouts put the detail below the whole list, so a tap selects
    something the reader cannot see. Bring it to them.
  */
  const select = useCallback((slug: string) => {
    setActiveSlug(slug);
    if (typeof window === "undefined" || window.matchMedia("(min-width: 1024px)").matches) return;

    window.requestAnimationFrame(() => {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document
        .getElementById(slug)
        ?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    });
  }, []);

  const active = projects.find((project) => project.slug === activeSlug) ?? visible[0] ?? null;
  const activeDecisions = active
    ? decisions.filter((decision) => decision.source === active.slug)
    : [];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-14">
      <div className="lg:sticky lg:top-20 lg:self-start">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule-2 py-3">
          <span className="label">Filter</span>
          {["All", ...domains].map((option) => (
            <button
              aria-pressed={filter === option}
              className={`focus-ring text-sm transition-colors ${
                filter === option ? "text-accent" : "text-ink-2 hover:text-ink"
              }`}
              key={option}
              onClick={() => changeFilter(option)}
              type="button"
            >
              {option}
              <span className="num ml-1.5 text-[0.7rem] text-ink-3">
                {option === "All" ? projects.length : (counts.get(option) ?? 0)}
              </span>
            </button>
          ))}
        </div>

        <ul className="border-b border-rule">
          {visible.map((project) => {
            const selected = active?.slug === project.slug;

            return (
              <li className="relative border-t border-rule" key={project.slug}>
                <span
                  aria-hidden="true"
                  className={`absolute -left-4 top-0 h-full w-px origin-top bg-accent transition-transform duration-200 ${
                    selected ? "scale-y-100" : "scale-y-0"
                  }`}
                />
                <button
                  aria-current={selected ? "true" : undefined}
                  className="focus-ring group block w-full py-4 text-left"
                  onClick={() => select(project.slug)}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setActiveSlug(project.slug);
                  }}
                  type="button"
                >
                  <span
                    className={`block text-[1.05rem] leading-tight tracking-[-0.015em] transition-colors ${
                      selected ? "text-accent" : "text-ink group-hover:text-accent"
                    }`}
                  >
                    {project.name}
                  </span>
                  <span className="label mt-1.5 block">
                    {project.domain} &middot; {statusLabel[project.status]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {visible.length === 0 ? (
          <p className="py-8 text-sm text-ink-2">Nothing in that domain yet.</p>
        ) : null}
      </div>

      {/*
        The detail sits in its own column with a floor under its height, so
        switching between a long project and a short one neither moves the list
        nor collapses the page beneath you.
      */}
      {active ? (
        <div className="scroll-mt-28 min-h-[22rem] lg:min-h-[30rem]" id={active.slug}>
          <article className="panel-in" key={active.slug}>
            <div className="clause flex items-baseline justify-between gap-4">
              <h2 className="text-[1.4rem] leading-tight tracking-[-0.025em] text-ink sm:text-[1.6rem]">
                {active.name}
              </h2>
              <p className="label shrink-0">{statusLabel[active.status]}</p>
            </div>

            <p className="measure mt-5 text-[1.05rem] leading-[1.65] text-ink-2">{active.summary}</p>

            {active.problem ? (
              <div className="mt-7">
                <p className="label">The problem</p>
                <p className="measure mt-3 text-[0.95rem] leading-[1.65] text-ink-2">{active.problem}</p>
              </div>
            ) : null}

            <div className="mt-7">
              <p className="label">Built with</p>
              <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.75rem] text-ink-3">
                {active.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {activeDecisions.length > 0 ? (
              <div className="mt-7">
                <p className="label">Decisions from this project</p>
                <ul className="mt-3 grid gap-2.5">
                  {activeDecisions.map((decision) => (
                    <li className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3" key={decision.id}>
                      <span className="ref pt-0.5">{decision.id}</span>
                      <Link
                        className="focus-ring tlink text-[0.95rem] leading-[1.5] text-ink"
                        href={`/#${decision.id}`}
                      >
                        {decision.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="measure mt-7 text-[0.9rem] leading-[1.6] text-ink-3">
                No decisions written up for this one — it was a build, not an argument.
              </p>
            )}

            {active.links.github || active.links.live ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {active.links.live ? (
                  <a className="focus-ring btn btn-solid" href={active.links.live} rel="noreferrer" target="_blank">
                    Live
                  </a>
                ) : null}
                {active.links.github ? (
                  <a className="focus-ring btn btn-line" href={active.links.github} rel="noreferrer" target="_blank">
                    Source
                  </a>
                ) : null}
              </div>
            ) : null}
          </article>
        </div>
      ) : null}
    </div>
  );
}
