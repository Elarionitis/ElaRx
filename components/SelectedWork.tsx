import Link from "next/link";

import type { Project } from "@/lib/data/projects";

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

function SpendlyVisual() {
  return (
    <svg aria-hidden="true" className="project-visual-svg" fill="none" viewBox="0 0 420 180">
      <path className="project-route" d="M71 55 178 90 71 125M178 90l109-35m-109 35 109 35" />
      <circle className="project-shape" cx="71" cy="55" r="15" />
      <circle className="project-shape" cx="71" cy="125" r="15" />
      <circle className="project-shape" cx="178" cy="90" r="25" />
      <path className="project-shape" d="M164 82h28m-28 8h28m-28 8h28" />
      <circle className="project-shape" cx="287" cy="55" r="15" />
      <circle className="project-shape" cx="287" cy="125" r="15" />
      <path className="project-route project-route-accent" d="M304 90h65" />
      <path className="project-result" d="m355 82 9 8 17-18" />
      <circle className="project-signal project-signal-spendly" cx="71" cy="55" r="4" />
      <g className="project-visual-labels"><text x="42" y="160">USERS</text><text x="145" y="160">LEDGER</text><text x="253" y="160">NET POSITIONS</text><text x="344" y="160">SETTLE</text></g>
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

function AerisVisual() {
  return (
    <svg aria-hidden="true" className="project-visual-svg" fill="none" viewBox="0 0 420 180">
      <path className="project-axis" d="M42 132h218M42 39v93" />
      <path className="project-forecast" d="M48 116c24-15 31-42 53-37s26 21 47 5 29-45 50-33 25 35 55 10" />
      <path className="project-forecast project-forecast-dashed" d="M48 124c26-12 34-30 54-26s28 20 45 9 30-30 54-26 28 20 52 7" />
      <path className="project-route project-route-accent" d="M280 90h80" />
      <path className="project-bars" d="M284 112V81m17 31V61m17 51V73m17 39V48" />
      <path className="project-result" d="m356 90 9 8 17-18" />
      <circle className="project-signal project-signal-aeris" cx="48" cy="116" r="4" />
      <g className="project-visual-labels"><text x="40" y="157">SIGNALS</text><text x="168" y="157">FORECAST</text><text x="280" y="157">ATTRIBUTION</text><text x="346" y="157">ACTION</text></g>
    </svg>
  );
}

function Visual({ slug }: { slug: string }) {
  if (slug === "signease") return <SignEaseVisual />;
  if (slug === "spendly") return <SpendlyVisual />;
  if (slug === "carequeue") return <CareQueueVisual />;
  return <AerisVisual />;
}

export function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <div className="selected-work">
      <p className="work-transition label"><span aria-hidden="true" />Systems, in practice</p>
      <div className="selected-work-grid">
        {projects.map((project, index) => (
          <Link className={`project-card project-card-${project.slug} focus-ring`} data-lens-target href={`/projects#${project.slug}`} key={project.slug}>
            <div className="project-card-top">
              <span className="ref">/{String(index + 1).padStart(2, "0")}</span>
              <span className="label">{project.domain}</span>
            </div>
            <div className="project-visual"><Visual slug={project.slug} /></div>
            <div className="project-card-copy">
              <h3>{project.name}</h3>
              <p className="project-value">{project.tagline}</p>
              <ul aria-label={`${project.name} technologies`} className="project-stack">
                {project.stack.slice(0, 4).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <span className="project-card-link">Explore the system <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
