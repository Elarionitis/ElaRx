"use client";

import { useEffect, useState } from "react";

/*
  The long version of a project, folded away.

  Most people who open a project want to know what it is and whether it
  works, and that fits above this. The problem, the design and the decisions
  are for the reader who wants to go further, so they are one click away
  rather than in everyone's path.

  A link straight to #decisions opens it, since that reader has already asked.
*/
export function Longer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (window.location.hash === "#decisions") setOpen(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="longer">
      <button aria-expanded={open} className="longer-toggle focus-ring" onClick={() => setOpen((value) => !value)} type="button">
        <span aria-hidden="true" className="longer-sign">{open ? "–" : "+"}</span>
        {open ? "Hide the details" : "Read how it works and why"}
      </button>
      {open ? <div className="longer-body">{children}</div> : null}
    </div>
  );
}
