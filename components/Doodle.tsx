"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/*
  The page is a notebook, so a visitor can write in it.

  Picking up the pen lets them draw anywhere on the sheet. The marks belong to
  the page, not the screen: they scroll with it, like ink would. They live in
  the visitor's browser only — nothing is sent anywhere — and they are gone on
  the next page, which is also what makes it safe to hand a pen to strangers.

  The drawing is an SVG laid over the whole document rather than a canvas. A
  canvas the height of a long page at retina density is tens of megabytes of
  pixels; a few hundred points in a path cost nothing.
*/

type Stroke = { id: number; d: string };

export function Doodle() {
  const pathname = usePathname();
  const [drawing, setDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [seenAt, setSeenAt] = useState(pathname);
  const surface = useRef<SVGSVGElement>(null);
  const live = useRef<{ id: number; points: string[] } | null>(null);
  const nextId = useRef(0);

  // A new page is a clean sheet.
  if (seenAt !== pathname) {
    setSeenAt(pathname);
    setStrokes([]);
    setDrawing(false);
  }

  useEffect(() => {
    if (!drawing) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setDrawing(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawing]);

  const point = useCallback((event: React.PointerEvent) => {
    const box = surface.current?.getBoundingClientRect();
    if (!box) return "0 0";
    return `${(event.clientX - box.left).toFixed(1)} ${(event.clientY - box.top).toFixed(1)}`;
  }, []);

  function start(event: React.PointerEvent<SVGSVGElement>) {
    if (!drawing || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const id = nextId.current++;
    const first = point(event);
    // Two identical points, so a tap leaves a dot rather than nothing.
    live.current = { id, points: [first, first] };
    setStrokes((all) => [...all, { id, d: `M${first} L${first}` }]);
  }

  function move(event: React.PointerEvent<SVGSVGElement>) {
    const stroke = live.current;
    if (!stroke) return;
    stroke.points.push(point(event));
    const d = `M${stroke.points[0]} L${stroke.points.slice(1).join(" ")}`;
    setStrokes((all) => all.map((item) => (item.id === stroke.id ? { id: item.id, d } : item)));
  }

  function end() {
    live.current = null;
  }

  return (
    <>
      <svg
        aria-hidden="true"
        className={`doodle-surface ${drawing ? "is-drawing" : ""}`}
        onPointerCancel={end}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        ref={surface}
      >
        {strokes.map((stroke) => (
          <path d={stroke.d} key={stroke.id} />
        ))}
      </svg>

      <div className="doodle-tools">
        {strokes.length > 0 ? (
          <button className="doodle-button focus-ring" onClick={() => setStrokes([])} type="button">
            rub it out
          </button>
        ) : null}
        <button
          aria-pressed={drawing}
          className={`doodle-button doodle-pen focus-ring ${drawing ? "is-on" : ""}`}
          onClick={() => setDrawing((on) => !on)}
          type="button"
        >
          <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M4 20l1-4.5L16.5 4a2.1 2.1 0 0 1 3 3L8 18.5 4 20z" />
            <path d="M14.5 6l3 3" />
          </svg>
          {drawing ? "put the pen down" : "draw on this page"}
        </button>
      </div>
    </>
  );
}
