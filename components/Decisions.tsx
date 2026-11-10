"use client";

import { useState } from "react";

import { DecisionDemo } from "@/components/DecisionDemo";
import type { Decision } from "@/lib/data/decisions";

/*
  The decisions behind one project or one job, as an accordion.

  These used to be a twenty-row log on the homepage. Read there, without the
  project around them, they turned the front page into documentation; read
  here, under the thing they explain, they are the interesting part of it.

  A decision reads as one line until you open it. Native <details> would be
  simpler but cannot animate the disclosure, so this is a button plus a region
  with the equivalent semantics.
*/
function DecisionRow({
  decision,
  onToggle,
  open,
}: {
  decision: Decision;
  onToggle: () => void;
  open: boolean;
}) {
  const panelId = `${decision.id}-body`;

  return (
    <li
      className={`thinking-row ${open ? "is-open" : ""}`}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className="thinking-trigger focus-ring group"
        onClick={onToggle}
        type="button"
      >
        <span className="ref">{decision.id.replace("D-", "")}</span>
        <span className="label thinking-domain">{decision.domain}</span>
        <span className="thinking-title">{decision.title}</span>
        <span aria-hidden="true" className="thinking-toggle">+</span>
      </button>

      <div aria-hidden={!open} className={`thinking-panel-frame ${open ? "is-open" : ""}`} id={panelId} inert={!open} role="region">
        <div className="thinking-panel">
          <div className="thinking-flow">
            <div className="thinking-step">
              <p className="label">Constraint</p>
              <p>{decision.constraint}</p>
            </div>
            <div className="thinking-step">
              <p className="label">Decision</p>
              <p>{decision.reasoning}</p>
            </div>
            {/*
              Only when there is one. The placeholder that used to stand in
              here — "implementation detail documented in the linked project"
              — said nothing, and said it in the slot reserved for the part
              that matters most.
            */}
            {decision.outcome ? (
              <div className="thinking-step thinking-consequence">
                <p className="label">Consequence</p>
                <p>{decision.outcome}</p>
              </div>
            ) : null}
          </div>
          {decision.demo ? <DecisionDemo demo={decision.demo} /> : null}
        </div>
      </div>
    </li>
  );
}

export function Decisions({ items }: { items: Decision[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="thinking-list">
      {items.map((decision) => (
        <DecisionRow
          decision={decision}
          key={decision.id}
          onToggle={() => setOpenId((current) => (current === decision.id ? null : decision.id))}
          open={openId === decision.id}
        />
      ))}
    </ul>
  );
}
