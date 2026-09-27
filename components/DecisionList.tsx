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
    <li className={`thinking-row scroll-mt-24 ${open ? "is-open" : ""}`} id={decision.id}>
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
        <span className="label thinking-source">{decision.sourceLabel}</span>
        <span aria-hidden="true" className="thinking-toggle">+</span>
      </button>

      <div className={open ? "thinking-panel panel-in" : "hidden"} id={panelId} role="region">
        <div className="thinking-flow">
          <div className="thinking-step">
            <p className="label">Constraint</p>
            <p>{decision.constraint}</p>
          </div>
          <div className="thinking-step">
            <p className="label">Decision</p>
            <p>{decision.reasoning}</p>
          </div>
          <div className="thinking-step thinking-consequence">
            <p className="label">Consequence</p>
            <p>{decision.outcome ?? "Implementation detail documented in the linked project."}</p>
          </div>
        </div>
        <div className="thinking-links">
          <Link className="focus-ring tlink" href={`/projects#${decision.source}`}>
            See {decision.sourceLabel}
          </Link>
          <button className="focus-ring" onClick={onCopy} type="button">
            {copied ? "Link copied" : `Copy ${decision.id}`}
          </button>
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
      <div className="thinking-controls">
        <div aria-label="Filter decisions by topic" className="thinking-filters" role="group">
          {["All", ...domains].map((option) => (
            <button
              aria-pressed={domain === option}
              className={`focus-ring ${domain === option ? "is-active" : ""}`}
              key={option}
              onClick={() => setDomain(option)}
              type="button"
            >{option === "All" ? `All decisions · ${items.length}` : option}</button>
          ))}
        </div>
        <button className="thinking-random focus-ring" onClick={surprise} type="button">
          Surprise me <span aria-hidden="true">↗</span>
        </button>
      </div>
      <ul className="thinking-list">
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
