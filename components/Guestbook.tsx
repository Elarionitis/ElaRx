"use client";

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

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

function relative(at: number): string {
  const seconds = Math.round((Date.now() - at) / 1000);
  const format = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  for (const [unit, size] of UNITS) {
    if (seconds >= size) return format.format(-Math.round(seconds / size), unit);
  }
  return "just now";
}

type Status = "loading" | "ready" | "sending" | "unreachable";

export function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [signed, setSigned] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/guestbook")
      .then((response) => response.json())
      .then((data: { entries?: Entry[] }) => {
        if (cancelled) return;
        setEntries(data.entries ?? []);
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
              placeholder="Say hello, or tell me what you are building."
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
        <ul className="guestbook-list">
          {entries.map((entry) => (
            <li className="guestbook-entry" key={entry.id}>
              <p className="guestbook-message">{entry.message}</p>
              <p className="guestbook-byline label">
                {entry.name}
                <span aria-hidden="true"> · </span>
                <time dateTime={new Date(entry.at).toISOString()}>{relative(entry.at)}</time>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
