"use client";

import { useCallback, useEffect, useState } from "react";

import { PAGE_SIZE, type Entry } from "@/lib/guestbook";

// Every note, newest first, loaded a page at a time.

type Status = "loading" | "ready" | "unreachable";

function when(at: number) {
  return new Date(at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

export function AllNotes() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<Status>("loading");

  const load = useCallback(async (offset: number) => {
    setStatus("loading");
    try {
      const response = await fetch(`/api/guestbook?offset=${offset}&limit=${PAGE_SIZE}`);
      if (!response.ok) throw new Error();
      const data = (await response.json()) as { entries?: Entry[]; total?: number };
      const page = data.entries ?? [];
      // A note signed while the list is open shifts the pages by one, so drop repeats.
      setEntries((current) => {
        const seen = new Set(current.map((entry) => entry.id));
        return [...current, ...page.filter((entry) => !seen.has(entry.id))];
      });
      setTotal(data.total ?? 0);
      setStatus("ready");
    } catch {
      setStatus("unreachable");
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => load(0), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  return (
    <div className="all-notes">
      {total > 0 ? (
        <p className="label">
          <span className="num">{total}</span> {total === 1 ? "note" : "notes"}
        </p>
      ) : null}

      {entries.length > 0 ? (
        <ul className="all-notes-grid">
          {entries.map((entry) => (
            <li className="note" key={entry.id}>
              <p className="note-message">{entry.message}</p>
              <p className="note-name">
                {entry.name}
                <span className="note-date">{when(entry.at)}</span>
              </p>
            </li>
          ))}
        </ul>
      ) : status === "ready" ? (
        <p className="guestbook-empty">Nobody has signed yet.</p>
      ) : null}

      {status === "unreachable" ? (
        <p className="guestbook-empty">The notes are not reachable right now.</p>
      ) : status === "loading" ? (
        <p className="guestbook-empty">Reading the book…</p>
      ) : entries.length < total ? (
        <button className="focus-ring btn btn-line" onClick={() => load(entries.length)} type="button">
          Show more
        </button>
      ) : null}
    </div>
  );
}
