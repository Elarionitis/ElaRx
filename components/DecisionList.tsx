"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { Decision } from "@/lib/data/decisions";

/*
  A decision reads as one line until you open it. Collapsed it is a claim;
  expanded it is the reasoning behind the claim. Native <details> would be
  simpler but cannot animate the disclosure or carry the margin reference,
  so this is a button plus a region with the equivalent semantics.
*/
function DecisionRow({
  copied,
  decision,
  onCopy,
  onToggle,
  open,
}: {
  copied: boolean;
  decision: Decision;
  onCopy: () => void;
  onToggle: () => void;
  open: boolean;
}) {
  const panelId = `${decision.id}-body`;

  return (
    <li className="scroll-mt-24 border-t border-rule first:border-t-0" id={decision.id}>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className="focus-ring group grid w-full grid-cols-[3.25rem_minmax(0,1fr)_1.5rem] items-baseline gap-x-3 py-5 text-left sm:grid-cols-[4rem_minmax(0,1fr)_9rem_1.5rem] sm:gap-x-5"
        onClick={onToggle}
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

      <div className={open ? "panel-in block" : "hidden"} id={panelId} role="region">
        {/*
          The domain sits above the body rather than in the 4rem reference
          column — a label like "Distributed systems" is far wider than the
          column and used to run straight over the text beside it.
        */}
        <div className="grid gap-6 pb-8 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-5">
          <span aria-hidden="true" className="hidden sm:block" />
          <div className="measure">
            <p className="label">{decision.domain}</p>
            <p className="mt-3 text-[0.95rem] leading-[1.6] text-ink-2">
              <span className="text-ink">Design constraint. </span>
              {decision.constraint}
            </p>
            <p className="mt-4 text-[0.95rem] leading-[1.6] text-ink-2">
              <span className="text-ink">Design rationale. </span>
              {decision.reasoning}
            </p>
            {decision.outcome ? (
              <p className="mt-5 border-l-2 border-accent pl-4 text-[0.95rem] leading-[1.6] text-ink">
                {decision.outcome}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link className="focus-ring tlink text-sm text-ink-2" href={`/projects#${decision.source}`}>
                See {decision.sourceLabel}
              </Link>
              <button
                className="focus-ring text-sm text-ink-3 transition-colors hover:text-accent"
                onClick={onCopy}
                type="button"
              >
                {copied ? "Link copied" : `Copy link to ${decision.id}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function DecisionList({ items }: { items: Decision[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [domain, setDomain] = useState("All");
  const domains = useMemo(() => [...new Set(items.map((item) => item.domain))], [items]);
  const visibleItems = domain === "All" ? items : items.filter((item) => item.domain === domain);

  /*
    A decision id is a permalink. Arriving at /#D-04 opens that decision and
    scrolls to it, and opening one rewrites the hash so the address bar always
    points at what is on screen.
  */
  useEffect(() => {
    function openFromHash() {
      const hash = window.location.hash.replace("#", "");
      if (!hash || !items.some((item) => item.id === hash)) return;
      setOpenId(hash);
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    }

    const frame = window.requestAnimationFrame(openFromHash);
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [items]);

  const toggle = useCallback((id: string) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    // This must live outside the state updater: React can call an updater while rendering.
    window.history.replaceState(null, "", next ? `#${next}` : window.location.pathname);
  }, [openId]);

  const copy = useCallback((id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard?.writeText(url).then(
      () => {
        setCopiedId(id);
        window.setTimeout(() => setCopiedId(null), 1800);
      },
      () => setCopiedId(null),
    );
  }, []);

  const surprise = useCallback(() => {
    const pool = visibleItems.filter((item) => item.id !== openId);
    const next = pool[Math.floor(Math.random() * pool.length)] ?? visibleItems[0];
    if (!next) return;
    setOpenId(next.id);
    window.history.replaceState(null, "", `#${next.id}`);
    window.setTimeout(() => document.getElementById(next.id)?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
  }, [openId, visibleItems]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-y border-rule py-3">
        <div aria-label="Filter notes by topic" className="flex flex-wrap gap-x-3 gap-y-1" role="group">
          {["All", ...domains].map((option) => (
            <button
              aria-pressed={domain === option}
              className={`focus-ring text-xs transition-colors ${domain === option ? "text-accent" : "text-ink-3 hover:text-ink"}`}
              key={option}
              onClick={() => setDomain(option)}
              type="button"
            >
              {option === "All" ? `All notes · ${items.length}` : option}
            </button>
          ))}
        </div>
        <button className="focus-ring tlink text-sm text-ink-2" onClick={surprise} type="button">
          Surprise me <span aria-hidden="true">↗</span>
        </button>
      </div>
      <ul className="border-b border-rule">
        {visibleItems.map((decision) => (
          <DecisionRow
            copied={copiedId === decision.id}
            decision={decision}
            key={decision.id}
            onCopy={() => copy(decision.id)}
            onToggle={() => toggle(decision.id)}
            open={openId === decision.id}
          />
        ))}
      </ul>
    </div>
  );
}
