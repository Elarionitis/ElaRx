"use client";

import Link from "next/link";
import { useState } from "react";

import type { Decision } from "@/lib/data/decisions";

/*
  A decision reads as one line until you open it. Collapsed it is a claim;
  expanded it is the reasoning behind the claim. Native <details> would be
  simpler but cannot animate the disclosure or carry the margin reference,
  so this is a button plus a region with the equivalent semantics.
*/
function DecisionRow({ decision, index }: { decision: Decision; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `${decision.id}-body`;

  return (
    <li className="border-t border-rule first:border-t-0">
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className="focus-ring group grid w-full grid-cols-[3.25rem_minmax(0,1fr)_1.5rem] items-baseline gap-x-3 py-5 text-left sm:grid-cols-[4rem_minmax(0,1fr)_9rem_1.5rem] sm:gap-x-5"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="ref">{decision.id}</span>

        <span className="min-w-0">
          <span className="block text-[1.05rem] leading-[1.35] tracking-[-0.015em] text-ink transition-colors group-hover:text-accent sm:text-[1.15rem]">
            {decision.title}
          </span>
          <span className="label mt-2 block sm:hidden">{decision.sourceLabel}</span>
        </span>

        <span className="label hidden text-right sm:block">{decision.sourceLabel}</span>

        <span
          aria-hidden="true"
          className={`justify-self-end text-ink-3 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>

      <div className={open ? "block" : "hidden"} id={panelId} role="region">
        <div className="grid gap-6 pb-8 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-5">
          <p className="label hidden sm:block">{decision.domain}</p>
          <div className="measure">
            <p className="text-[0.95rem] leading-[1.6] text-ink-2">
              <span className="text-ink">Constraint. </span>
              {decision.constraint}
            </p>
            <p className="mt-4 text-[0.95rem] leading-[1.6] text-ink-2">
              <span className="text-ink">Why this. </span>
              {decision.reasoning}
            </p>
            {decision.outcome ? (
              <p className="mt-5 border-l-2 border-accent pl-4 text-[0.95rem] leading-[1.6] text-ink">
                {decision.outcome}
              </p>
            ) : null}
            <Link
              className="focus-ring tlink mt-5 inline-block text-sm text-ink-2"
              href={`/projects#${decision.source}`}
            >
              See {decision.sourceLabel}
            </Link>
          </div>
        </div>
      </div>
      <span className="sr-only">{index}</span>
    </li>
  );
}

export function DecisionList({ items }: { items: Decision[] }) {
  return (
    <ul className="border-b border-rule">
      {items.map((decision, index) => (
        <DecisionRow decision={decision} index={index} key={decision.id} />
      ))}
    </ul>
  );
}
