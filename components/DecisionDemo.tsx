"use client";

import { useId, useState } from "react";

import type { DecisionDemo as DecisionDemoData } from "@/lib/data/decisions";

function LatencyBudget({ demo }: { demo: Extract<DecisionDemoData, { kind: "latency-budget" }> }) {
  const [latency, setLatency] = useState(72);
  const id = useId();
  const withinBudget = latency < demo.budget;

  return (
    <section aria-labelledby={id} className="decision-demo">
      <div className="decision-demo-heading">
        <p className="label" id={id}>{demo.label}</p>
        <output aria-live="polite" className={withinBudget ? "is-good" : "is-over"} htmlFor={`${id}-input`}>
          {latency}ms <span>{withinBudget ? "within budget" : "over budget"}</span>
        </output>
      </div>
      <input
        aria-describedby={`${id}-hint`}
        id={`${id}-input`}
        max="140"
        min="20"
        onChange={(event) => setLatency(Number(event.target.value))}
        step="1"
        type="range"
        value={latency}
      />
      <div aria-hidden="true" className="decision-budget-track">
        <span className="decision-budget-fill" style={{ width: `${(latency / 140) * 100}%` }} />
        <span className="decision-budget-limit" style={{ left: `${(demo.budget / 140) * 100}%` }} />
      </div>
      <p className="decision-demo-note" id={`${id}-hint`}>
        Drag the frame time across the sub-{demo.budget}ms target. The decision favors a stable interaction budget over unnecessary model precision.
      </p>
    </section>
  );
}

function EventFold({ demo }: { demo: Extract<DecisionDemoData, { kind: "event-fold" }> }) {
  const [visible, setVisible] = useState(1);
  const shownEvents = demo.events.slice(0, visible);
  const complete = visible === demo.events.length;

  return (
    <section className="decision-demo">
      <div className="decision-demo-heading">
        <p className="label">{demo.label}</p>
        <p aria-live="polite" className="decision-demo-status">{visible} / {demo.events.length} events</p>
      </div>
      <ol className="decision-event-log">
        {shownEvents.map((event, index) => <li key={event}><span>{String(index + 1).padStart(2, "0")}</span>{event}</li>)}
      </ol>
      <div className={`decision-fold-result ${complete ? "is-complete" : ""}`}>
        <span aria-hidden="true">↳</span>
        <p><span className="label">Fold</span>{complete ? demo.result : "Awaiting the remaining events"}</p>
      </div>
      <button className="decision-demo-action focus-ring" onClick={() => setVisible((count) => count === demo.events.length ? 1 : count + 1)} type="button">
        {complete ? "Replay fold" : "Append event"}
      </button>
    </section>
  );
}

function BaselineGate({ demo }: { demo: Extract<DecisionDemoData, { kind: "baseline-gate" }> }) {
  const [mode, setMode] = useState<"persistence" | "forecast">("persistence");
  const forecast = mode === "forecast";

  return (
    <section className="decision-demo">
      <div className="decision-demo-heading">
        <p className="label">{demo.label}</p>
        <p aria-live="polite" className="decision-demo-status">{forecast ? "Forecast candidate" : "Persistence baseline"}</p>
      </div>
      <div aria-label="Forecast comparison" className="decision-baseline-chart" role="img">
        <svg aria-hidden="true" viewBox="0 0 320 100">
          <path className="decision-chart-axis" d="M8 82H312" />
          <path className="decision-chart-persistence" d="M8 64 46 57 84 63 122 44 160 51 198 35 236 43 274 25 312 34" />
          <path className={`decision-chart-forecast ${forecast ? "is-visible" : ""}`} d="M8 64 46 54 84 57 122 39 160 46 198 29 236 34 274 20 312 27" />
        </svg>
      </div>
      <div className="decision-demo-toggle" role="group" aria-label="Comparison mode">
        <button aria-pressed={!forecast} className="focus-ring" onClick={() => setMode("persistence")} type="button">Persistence</button>
        <button aria-pressed={forecast} className="focus-ring" onClick={() => setMode("forecast")} type="button">Forecast</button>
      </div>
      <p className="decision-demo-note">{demo.threshold} {forecast ? "The forecast is evaluated against the baseline before deployment." : "The next observation matching the current one is the baseline to beat."}</p>
    </section>
  );
}

export function DecisionDemo({ demo }: { demo: DecisionDemoData }) {
  if (demo.kind === "latency-budget") return <LatencyBudget demo={demo} />;
  if (demo.kind === "event-fold") return <EventFold demo={demo} />;
  return <BaselineGate demo={demo} />;
}
