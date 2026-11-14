"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { MAX_MESSAGE, MAX_NAME, type Entry } from "@/lib/guestbook";

/*
  The one part of the site a visitor can write to.

  It is deliberately the lightest possible version of the idea: no account, no
  sign-in, no email field. Asking someone to authenticate before they can say
  "nice site" costs more than the sentence is worth, so the defences are on
  the server instead — a length limit, a ban on links, a honeypot and one
  signature per address per ten minutes.

  Entries are fetched after mount rather than rendered on the server, which
  keeps the homepage static and means a slow or unreachable store costs this
  section and nothing else.
*/

/*
  The wall of notes is two rows drifting in opposite directions.

  A row loops seamlessly because it is rendered twice end to end and moved by
  exactly half its own width, so the second copy arrives where the first
  began. That only works if one copy is wider than the screen, so a short row
  is repeated until it is: three notes still fill the track instead of
  leaving a gap that chases itself across the page.
*/
const MIN_PER_ROW = 8;
/** Seconds each note takes to cross, which keeps speed constant as rows grow. */
const SECONDS_PER_NOTE = 7;

function fill(entries: Entry[]): Entry[] {
  if (entries.length === 0) return [];
  const row: Entry[] = [];
  while (row.length < MIN_PER_ROW) row.push(...entries);
  return row;
}

function Row({ direction, entries }: { direction: "left" | "right"; entries: Entry[] }) {
  const row = fill(entries);
  if (row.length === 0) return null;

  return (
    <div className="marquee" data-direction={direction}>
      <div className="marquee-track" style={{ animationDuration: `${row.length * SECONDS_PER_NOTE}s` }}>
        {[0, 1].map((copy) => (
          // The second copy exists only to close the loop; it is the same
          // notes again, so assistive technology is told to skip it.
          <ul aria-hidden={copy === 1} className="marquee-group" key={copy}>
            {row.map((entry, index) => (
              // Notes past the first pass are padding for the loop.
              <li className="note" data-repeat={index >= entries.length || undefined} key={`${entry.id}-${index}`}>
                <p className="note-message">{entry.message}</p>
                <p className="note-name">{entry.name}</p>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

type Status = "loading" | "ready" | "sending" | "unreachable";

export function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [signed, setSigned] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/guestbook")
      .then((response) => response.json())
      .then((data: { entries?: Entry[]; total?: number }) => {
        if (cancelled) return;
        setEntries(data.entries ?? []);
        setTotal(data.total ?? data.entries?.length ?? 0);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("unreachable");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const submit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (status === "sending" || !message.trim()) return;

      setStatus("sending");
      setError(null);

      const form = new FormData(event.currentTarget);

      try {
        const response = await fetch("/api/guestbook", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ company: form.get("company"), message, name }),
        });
        const data = (await response.json()) as { entry?: Entry; error?: string };

        if (!response.ok || !data.entry) {
          setError(data.error ?? "That did not go through.");
          setStatus("ready");
          return;
        }

        setEntries((current) => [data.entry!, ...current]);
        setTotal((count) => count + 1);
        setMessage("");
        setSigned(true);
        setStatus("ready");
      } catch {
        setError("That did not go through. Check your connection and try again.");
        setStatus("ready");
      }
    },
    [message, name, status],
  );

  const remaining = MAX_MESSAGE - message.length;

  return (
    <div className="guestbook">
      <form className="guestbook-form" onSubmit={submit}>
        <div className="guestbook-fields">
          <label className="guestbook-field guestbook-field-name">
            <span className="label">Name</span>
            <input
              autoComplete="nickname"
              maxLength={MAX_NAME}
              onChange={(event) => setName(event.target.value)}
              placeholder="Anonymous"
              type="text"
              value={name}
            />
          </label>
          <label className="guestbook-field guestbook-field-message">
            <span className="label">Message</span>
            <textarea
              maxLength={MAX_MESSAGE}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                // The shortcut everyone already has in their fingers.
                if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="Say hello, or tell me what you are building"
              rows={2}
              value={message}
            />
          </label>
        </div>

        {/*
          Hidden from people and from screen readers, left in the DOM for the
          bots that fill in every field they find.
        */}
        <input
          aria-hidden="true"
          autoComplete="off"
          className="guestbook-trap"
          name="company"
          tabIndex={-1}
          type="text"
        />

        <div className="guestbook-actions">
          <p aria-live="polite" className="guestbook-note">
            {error ? (
              <span className="guestbook-error">{error}</span>
            ) : signed ? (
              "Signed — thank you."
            ) : (
              <>
                <span className="num">{remaining}</span> characters left
              </>
            )}
          </p>
          <button
            className="focus-ring btn btn-solid"
            disabled={status === "sending" || !message.trim()}
            type="submit"
          >
            {status === "sending" ? "Signing…" : "Sign"}
          </button>
        </div>
      </form>

      {status === "unreachable" ? (
        <p className="guestbook-empty">The guestbook is not reachable right now.</p>
      ) : status === "loading" ? (
        <p className="guestbook-empty">Reading the book…</p>
      ) : entries.length === 0 ? (
        <p className="guestbook-empty">Nobody has signed yet. You could be first.</p>
      ) : (
        /*
          Two rows once there are enough notes to make two different ones.
          Below that a second row would only be the first one backwards.
        */
        <div className="guestbook-wall">
          {entries.length >= 4 ? (
            <>
              <Row direction="left" entries={entries.filter((_, index) => index % 2 === 0)} />
              <Row direction="right" entries={entries.filter((_, index) => index % 2 === 1)} />
            </>
          ) : (
            <Row direction="left" entries={entries} />
          )}
        </div>
      )}

      {/* The wall only carries the newest notes; the rest are one click away. */}
      {total > entries.length ? (
        <p className="guestbook-all">
          <Link className="focus-ring tlink" href="/notes">
            See all <span className="num">{total}</span> notes
          </Link>
        </p>
      ) : null}
    </div>
  );
}
