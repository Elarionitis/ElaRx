/*
  Marks made by hand, on top of the type.

  Each one is a single SVG path stretched over the words it belongs to. The
  paths are drawn the way a pen moves rather than the way a shape tool does:
  a circle overshoots where it closes, an underline is two passes that do not
  quite agree, and nothing is symmetrical. The #rough filter in the layout
  then pushes every stroke around by a little noise.

  A mark draws itself when its section arrives, by animating the dash offset
  of a path whose length has been normalised to 1. With motion reduced, or
  with no script, it is simply there.

  They are decoration around real text, so the text stays in the document and
  every svg is hidden from assistive technology.
*/

type Mark = { children: React.ReactNode; delay?: number };

function delayStyle(delay = 0) {
  return { "--ink-delay": `${delay}ms` } as React.CSSProperties;
}

/** A word ringed in red pencil. */
export function Circled({ children, delay }: Mark) {
  return (
    <span className="ink ink-circle" style={delayStyle(delay)}>
      {children}
      <svg aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 50">
        <path
          d="M56 5C30 1 6 11 4 26c-2 15 26 22 52 21 25-1 42-10 41-24C96 9 70 2 40 6c-9 1-16 3-21 6"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/** Underlined twice, the second pass slightly off the first. */
export function Underlined({ children, delay }: Mark) {
  return (
    <span className="ink ink-underline" style={delayStyle(delay)}>
      {children}
      <svg aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 12">
        <path
          d="M2 5C22 2 44 8 66 4c12-2 22-1 32 1C78 7 50 6 30 9 20 10 12 10 6 9"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/** A line of handwriting: an aside, never the main text. */
export function Pen({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`pen ${className}`}>{children}</span>;
}

/*
  An arrow from a note to the thing it is about. `flip` mirrors it, so one
  drawing serves a note on either side.
*/
export function PenArrow({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`pen-arrow ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      viewBox="0 0 80 50"
    >
      <path d="M4 40C18 18 42 8 72 12" pathLength={1} />
      <path d="M58 4c5 3 10 5 15 8-5 2-9 6-12 11" pathLength={1} />
    </svg>
  );
}
