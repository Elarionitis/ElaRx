"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Pen, PenArrow } from "@/components/Ink";

/*
  The page is a notebook, so a visitor can write in it.

  Picking up the pen lets them draw anywhere on the sheet, in three colours.
  A stroke can be undone, the whole thing can be rubbed out, and it can be
  played back: the drawing redraws itself in the order it was made.

  The marks belong to the page, not the screen, so they scroll with it like
  ink would. They are kept in the visitor's own browser, per page, so the
  drawing is still there to carry on with when they come back. Nothing is
  sent anywhere, which is also what makes it safe to hand a pen to strangers.

  The drawing is an SVG laid over the whole document rather than a canvas. A
  canvas the height of a long page at retina density is tens of megabytes of
  pixels; a few hundred points in a path cost nothing. Points are measured
  from the centre line of the page, so a drawing stays on the thing it was
  drawn over when the window is a different width next time.
*/

type Stroke = { id: number; color: string; points: string[] };

const COLORS = [
  { name: "Pen", value: "var(--accent)" },
  { name: "Pencil", value: "var(--accent-2)" },
  { name: "Ink", value: "var(--ink)" },
];

const STEP_MS = 850;

function storageKey(pathname: string) {
  return `elarx:doodle:${pathname}`;
}

function load(pathname: string): Stroke[] {
  try {
    const raw = window.localStorage.getItem(storageKey(pathname));
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is Stroke =>
        typeof item?.id === "number" && typeof item?.color === "string" && Array.isArray(item?.points),
    );
  } catch {
    return [];
  }
}

function save(pathname: string, strokes: Stroke[]) {
  try {
    if (strokes.length === 0) window.localStorage.removeItem(storageKey(pathname));
    else window.localStorage.setItem(storageKey(pathname), JSON.stringify(strokes));
  } catch {
    // Private windows and full storage: the drawing simply does not persist.
  }
}

function path(points: string[]) {
  return `M${points[0]} L${points.slice(1).join(" ")}`;
}

export function Doodle() {
  const pathname = usePathname();
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0].value);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [replay, setReplay] = useState(0);
  const surface = useRef<SVGSVGElement>(null);
  const live = useRef<Stroke | null>(null);

  // Each page has its own sheet; pick up whatever was left on this one.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStrokes(load(pathname));
      setDrawing(false);
      setReplay(0);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!drawing) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setDrawing(false);
      if (event.key === "z" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setStrokes((all) => {
          const next = all.slice(0, -1);
          save(window.location.pathname, next);
          return next;
        });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawing]);

  // Playback ends by itself once the last stroke has been redrawn.
  useEffect(() => {
    if (!replay) return;
    const timer = window.setTimeout(() => setReplay(0), strokes.length * STEP_MS + 800);
    return () => window.clearTimeout(timer);
  }, [replay, strokes.length]);

  const point = useCallback((event: React.PointerEvent) => {
    const box = surface.current?.getBoundingClientRect();
    if (!box) return "0 0";
    const x = event.clientX - box.left - box.width / 2;
    return `${x.toFixed(1)} ${(event.clientY - box.top).toFixed(1)}`;
  }, []);

  function update(next: Stroke[]) {
    setStrokes(next);
    save(pathname, next);
  }

  function start(event: React.PointerEvent<SVGSVGElement>) {
    if (!drawing || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const first = point(event);
    // Two identical points, so a tap leaves a dot rather than nothing.
    const stroke = { id: Date.now(), color, points: [first, first] };
    live.current = stroke;
    setReplay(0);
    setStrokes((all) => [...all, stroke]);
  }

  function move(event: React.PointerEvent<SVGSVGElement>) {
    const stroke = live.current;
    if (!stroke) return;
    const next = { ...stroke, points: [...stroke.points, point(event)] };
    live.current = next;
    setStrokes((all) => all.map((item) => (item.id === next.id ? next : item)));
  }

  function end() {
    if (!live.current) return;
    live.current = null;
    save(pathname, strokes);
  }

  const hasStrokes = strokes.length > 0;

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
        {/* x="50%" puts the origin on the page's centre line. */}
        <svg key={replay} overflow="visible" x="50%">
          {strokes.map((stroke, index) => (
            <path
              className={replay ? "is-replaying" : undefined}
              d={path(stroke.points)}
              key={stroke.id}
              pathLength={1}
              style={{ stroke: stroke.color, animationDelay: `${index * STEP_MS}ms` }}
            />
          ))}
        </svg>
      </svg>

      {!drawing && !hasStrokes ? (
        <p aria-hidden="true" className="doodle-note">
          <Pen>want to draw something? click here</Pen>
          <PenArrow />
        </p>
      ) : null}

      <div className="doodle-tools">
        {drawing ? (
          <>
            <div aria-label="Colour" className="doodle-colors" role="group">
              {COLORS.map((option) => (
                <button
                  aria-label={option.name}
                  aria-pressed={color === option.value}
                  className="doodle-color focus-ring"
                  key={option.value}
                  onClick={() => setColor(option.value)}
                  style={{ background: option.value }}
                  type="button"
                />
              ))}
            </div>
            {hasStrokes ? (
              <button className="doodle-button focus-ring" onClick={() => update(strokes.slice(0, -1))} type="button">
                undo
              </button>
            ) : null}
          </>
        ) : null}
        {hasStrokes ? (
          <>
            <button className="doodle-button focus-ring" onClick={() => update([])} type="button">
              rub it out
            </button>
            <button className="doodle-button focus-ring" onClick={() => setReplay((count) => count + 1)} type="button">
              play it back
            </button>
          </>
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
          {drawing ? "done" : hasStrokes ? "keep drawing" : "draw on this page"}
        </button>
      </div>
    </>
  );
}
