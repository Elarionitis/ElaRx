"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DecisionDemo } from "@/components/DecisionDemo";
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
            <div className="thinking-step thinking-consequence">
              <p className="label">Consequence</p>
              <p>{decision.outcome ?? "Implementation detail documented in the linked project."}</p>
            </div>
          </div>
          {decision.demo ? <DecisionDemo demo={decision.demo} /> : null}
          <div className="thinking-links">
            <Link className="focus-ring tlink" href={`/projects#${decision.source}`}>
              See {decision.sourceLabel}
            </Link>
            <button className="focus-ring" onClick={onCopy} type="button">
              {copied ? "Link copied" : `Copy ${decision.id}`}
            </button>
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

  const applyUrlState = useCallback((scroll: boolean) => {
    const params = new URLSearchParams(window.location.search);
    const requestedDomain = params.get("topic");
    const hash = window.location.hash.replace("#", "");
    const linkedDecision = items.find((item) => item.id === hash);
    const nextOpenId = linkedDecision?.id ?? null;
    // A permalink always wins over a stale or manually edited filter, so the
    // requested decision cannot be hidden by the list that is meant to show it.
    const nextDomain = linkedDecision?.domain
      ?? (requestedDomain && domains.includes(requestedDomain) ? requestedDomain : "All");

    setDomain(nextDomain);
    setOpenId(nextOpenId);
    if (nextOpenId && scroll) {
      window.requestAnimationFrame(() => document.getElementById(nextOpenId)?.scrollIntoView({ block: "start" }));
    }
  }, [domains, items]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => applyUrlState(true));
    const onNavigation = () => applyUrlState(true);
    window.addEventListener("hashchange", onNavigation);
    window.addEventListener("popstate", onNavigation);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", onNavigation);
      window.removeEventListener("popstate", onNavigation);
    };
  }, [applyUrlState]);

  const updateUrl = useCallback((nextDomain: string, nextOpenId: string | null, mode: "push" | "replace" = "push") => {
    const url = new URL(window.location.href);
    if (nextDomain === "All") url.searchParams.delete("topic");
    else url.searchParams.set("topic", nextDomain);
    url.hash = nextOpenId ?? "";
    window.history[`${mode}State`](null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const toggle = useCallback((id: string) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    updateUrl(domain, next);
  }, [domain, openId, updateUrl]);

  const changeDomain = useCallback((nextDomain: string) => {
    const nextOpenId = nextDomain === "All" || items.find((item) => item.id === openId)?.domain === nextDomain ? openId : null;
    setDomain(nextDomain);
    setOpenId(nextOpenId);
    updateUrl(nextDomain, nextOpenId);
  }, [items, openId, updateUrl]);

  const copy = useCallback((id: string) => {
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}#${id}`;
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
    updateUrl(domain, next.id);
    window.setTimeout(() => document.getElementById(next.id)?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
  }, [domain, openId, updateUrl, visibleItems]);

  return (
    <div>
      <div className="thinking-controls">
        <div aria-label="Filter decisions by topic" className="thinking-filters" role="group">
          {["All", ...domains].map((option) => (
            <button
              aria-pressed={domain === option}
              className={`focus-ring ${domain === option ? "is-active" : ""}`}
              key={option}
              onClick={() => changeDomain(option)}
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
