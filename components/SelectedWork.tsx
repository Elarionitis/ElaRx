"use client";

import Link from "next/link";
import { useState } from "react";

import { ProjectDiagram } from "@/components/ProjectDiagram";
import type { Project } from "@/lib/data/projects";

function OrbitVisual() {
  return (
    <svg aria-hidden="true" className="project-visual-svg" fill="none" viewBox="0 0 420 180">
      <path className="project-route" d="M51 90H90M124 90h30M188 90l34-28M188 90l34 28M256 62h40M256 118h40M312 62h14M312 118h14" />
      <path className="project-route project-route-accent" d="M342 62l14 28M342 118l14-28" />
      <circle className="project-shape" cx="40" cy="90" r="11" />
      <rect className="project-shape" height="38" rx="2" width="34" x="90" y="71" />
      <rect className="project-shape" height="38" rx="2" width="34" x="154" y="71" />
      <path className="project-shape" d="M160 118h22m-22 9h22" />
      <rect className="project-shape" height="26" rx="2" width="34" x="222" y="49" />
      <rect className="project-shape" height="26" rx="2" width="34" x="222" y="105" />
      <circle className="project-shape" cx="304" cy="62" r="8" />
      <circle className="project-shape" cx="334" cy="62" r="8" />
      <circle className="project-shape" cx="304" cy="118" r="8" />
      <circle className="project-shape" cx="334" cy="118" r="8" />
      <path className="project-result" d="m362 85 8 8 16-18" />
      <circle className="project-signal project-signal-orbit" cx="40" cy="90" r="4" />
      <g className="project-visual-labels">
        <text x="22" y="152">PUBLISH</text><text x="86" y="152">INGRESS</text><text x="156" y="152">LOG</text><text x="218" y="38">SHARDS</text><text x="294" y="152">MEMBERS</text>
      </g>
    </svg>
  );
}

function SignEaseVisual() {
  return (
    <svg aria-hidden="true" className="project-visual-svg" fill="none" viewBox="0 0 420 180">
      <path className="project-route" d="M61 90h67m38 0h62m38 0h69" />
      <rect className="project-shape" height="54" rx="2" width="54" x="34" y="63" />
      <circle className="project-dot" cx="61" cy="90" r="11" />
      <path className="project-shape" d="M141 68h30v44h-30zM149 76h14m-14 10h14m-14 10h14" />
      <path className="project-shape" d="M201 67h42v46h-42zM209 76h26m-26 10h26m-26 10h26" />
      <rect className="project-shape" height="54" rx="27" width="54" x="303" y="63" />
      <path className="project-result" d="m321 90 10 10 17-20" />
      <circle className="project-signal project-signal-signease" cx="61" cy="90" r="4" />
      <g className="project-visual-labels">
        <text x="34" y="144">CAMERA</text><text x="125" y="144">LANDMARKS</text><text x="198" y="144">SEQUENCE</text><text x="298" y="144">RESULT</text>
      </g>
    </svg>
  );
}

/*
  The whole TradStrat result in one picture: a curve that climbs on the data
  it was tuned on, falls on the data it was not, and a deflated Sharpe that
  does not reach the line it would have to clear to mean anything. An earlier
  version ended on a tick, which told the opposite of the story.
*/
function TradStratVisual() {
  return (
    <svg aria-hidden="true" className="project-visual-svg" fill="none" viewBox="0 0 420 180">
      <path className="project-axis" d="M40 128h252M40 36v92" />
      <path className="project-shape project-window" d="M40 36h104v92H40z" />
      <path className="project-forecast" d="M44 118c22-20 34-8 52-30s30-26 48-38" />
      <path className="project-forecast project-forecast-dashed" d="M144 50c24 14 32 2 50 16s32 8 52 20" />
      <path className="project-route" d="M292 94h22" />
      <path className="project-bars" d="M330 118V64m30 54V100" />
      <path className="project-forecast project-forecast-dashed" d="M316 72h76" />
      <circle className="project-signal project-signal-tradstrat" cx="44" cy="118" r="4" />
      <g className="project-visual-labels">
        <text x="40" y="152">TUNED</text><text x="150" y="152">UNSEEN</text><text x="316" y="152">DEFLATED</text><text x="316" y="30">THRESHOLD</text>
      </g>
    </svg>
  );
}

function CareQueueVisual() {
  return (
    <svg aria-hidden="true" className="project-visual-svg" fill="none" viewBox="0 0 420 180">
      <path className="project-route" d="M38 114h184c30 0 36-51 67-51h88" />
      {[60, 95, 130, 165].map((x, index) => <circle className="project-shape" cx={x} cy="114" key={x} r={index === 2 ? 10 : 7} />)}
      <path className="project-shape" d="M234 114V64m-10 10 10-10 10 10" />
      <circle className="project-shape" cx="289" cy="63" r="21" />
      <path className="project-result" d="M281 64h16m-8-8v16" />
      <path className="project-result" d="M346 63h32m-16-16v32" />
      <circle className="project-signal project-signal-carequeue" cx="60" cy="114" r="4" />
      <g className="project-visual-labels"><text x="36" y="145">QUEUE</text><text x="188" y="145">OBSERVE</text><text x="258" y="30">RISK</text><text x="330" y="145">ESCALATE</text></g>
    </svg>
  );
}

/*
  One diagram per featured project, drawn rather than screenshotted so it
  carries the theme and stays legible at card size. A project without one
  falls back to the pipeline it most resembles.
*/
function Visual({ slug }: { slug: string }) {
  if (slug === "orbit") return <OrbitVisual />;
  if (slug === "signease") return <SignEaseVisual />;
  if (slug === "tradstrat") return <TradStratVisual />;
  return <CareQueueVisual />;
}

export function SelectedWork({ projects }: { projects: Project[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <div className="selected-work">
      <p className="work-transition label"><span aria-hidden="true" />Systems, in practice</p>
      <div className="selected-work-grid">
        {projects.map((project, index) => (
          /*
            The reveal lives on a shell rather than on the card. Both want to
            own `transform`, and the finished reveal state is the more
            specific rule — put them on one element and the card loses its
            hover lift the moment it has been seen.
          */
          <div
            className="project-card-shell"
            data-reveal
            key={project.slug}
            style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
          >
          <Link
            className={`project-card project-card-${project.slug} focus-ring ${activeSlug === project.slug ? "is-active" : ""}`}
            data-lens-target
            href={`/projects#${project.slug}`}
            onFocus={() => setActiveSlug(project.slug)}
            onMouseEnter={() => setActiveSlug(project.slug)}
            onMouseLeave={() => setActiveSlug(null)}
            onPointerMove={(event) => {
              if (event.pointerType !== "mouse") return;
              const bounds = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty("--tilt-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 3}deg`);
              event.currentTarget.style.setProperty("--tilt-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * -3}deg`);
              event.currentTarget.style.setProperty("--spot-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
              event.currentTarget.style.setProperty("--spot-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty("--tilt-x", "0deg");
              event.currentTarget.style.setProperty("--tilt-y", "0deg");
            }}
          >
            <span aria-hidden="true" className="project-frame" />
            <div className="project-card-top">
              <span className="ref">/{String(index + 1).padStart(2, "0")}</span>
              <span className="label project-status" data-status={project.status}>
                {project.domain}
              </span>
            </div>
            <div className="project-visual"><ProjectDiagram><Visual slug={project.slug} /></ProjectDiagram></div>
            <div className="project-card-copy">
              <h3>{project.name}</h3>
              <p className="project-value">{project.tagline}</p>
              {project.results?.[0] ? (
                <p className="project-metric">
                  <span className="num">{project.results[0].value}</span>
                  {project.results[0].label}
                </p>
              ) : null}
              <ul aria-label={`${project.name} technologies`} className="project-stack">
                {project.stack.slice(0, 4).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <span className="project-card-link">Explore the system <span aria-hidden="true">→</span></span>
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
