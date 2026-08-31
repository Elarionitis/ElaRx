"use client";

import { useState } from "react";

/*
  Zoom levels. "Fit" is the default and the point of this component: A4 is
  taller than it is wide, so fitting to container width (the usual default)
  pushes the bottom of the page below the fold. The frame is A4-shaped and
  sized off the viewport height instead, so the whole page is visible at rest
  and scrolling only starts once you deliberately zoom in.
*/
const ZOOM_STEPS = ["Fit", "100", "125", "150"] as const;
type Zoom = (typeof ZOOM_STEPS)[number];

function fragmentFor(zoom: Zoom) {
  const base = "toolbar=0&navpanes=0&scrollbar=0";
  return zoom === "Fit" ? `#view=Fit&${base}` : `#zoom=${zoom}&${base}`;
}

export function ResumeViewer({ name, path }: { name: string; path: string }) {
  const [zoom, setZoom] = useState<Zoom>("Fit");

  const index = ZOOM_STEPS.indexOf(zoom);
  const fileName = `${name.replace(/\s+/g, "-")}-Resume.pdf`;

  return (
    <div className="pt-6">
      <div className="hidden items-center justify-between gap-4 border border-rule border-b-0 px-3 py-2 md:flex">
        <p className="num truncate text-xs text-ink-3">{fileName}</p>

        <div className="flex items-center gap-1">
          <button
            aria-label="Zoom out"
            className="focus-ring grid size-7 place-items-center text-ink-3 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-35"
            disabled={index === 0}
            onClick={() => setZoom(ZOOM_STEPS[Math.max(index - 1, 0)])}
            type="button"
          >
            <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path d="M5 12h14" strokeLinecap="round" />
            </svg>
          </button>

          <span aria-live="polite" className="num w-12 text-center text-xs text-ink-2">
            {zoom === "Fit" ? "Fit" : `${zoom}%`}
          </span>

          <button
            aria-label="Zoom in"
            className="focus-ring grid size-7 place-items-center text-ink-3 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-35"
            disabled={index === ZOOM_STEPS.length - 1}
            onClick={() => setZoom(ZOOM_STEPS[Math.min(index + 1, ZOOM_STEPS.length - 1)])}
            type="button"
          >
            <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </button>

          <span aria-hidden="true" className="mx-2 h-4 w-px bg-rule" />

          <a
            aria-label="Open in a new tab"
            className="focus-ring grid size-7 place-items-center text-ink-3 transition-colors hover:text-ink"
            href={path}
            rel="noreferrer"
            target="_blank"
          >
            <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a className="focus-ring btn btn-solid ml-2 h-8 min-h-0 text-xs" download={fileName} href={path}>
            Download
          </a>
        </div>
      </div>

      {/* A4 is 1:√2. The frame keeps that ratio off the viewport height, so the
          page lands whole rather than cropped at the fold. */}
      <div className="hidden justify-center border border-rule bg-paper-2 p-3 md:flex">
        <object
          aria-label={`${name} resume`}
          className="block h-[min(calc(100dvh-15rem),52rem)] w-auto border border-rule bg-paper"
          data={`${path}${fragmentFor(zoom)}`}
          key={zoom}
          style={{ aspectRatio: "1 / 1.4142", maxWidth: "100%" }}
          type="application/pdf"
        >
          <div className="grid h-full place-content-center p-10 text-center">
            <p className="text-ink-2">Your browser will not display the PDF inline.</p>
            <a className="focus-ring btn btn-solid mx-auto mt-4" href={path} rel="noreferrer" target="_blank">
              Open the resume
            </a>
          </div>
        </object>
      </div>

      {/* Small screens: inline PDF preview is unreliable on mobile Safari, so
          this is a deliberate card rather than a frame that may render blank. */}
      <div className="border border-rule p-6 text-center md:hidden">
        <div aria-hidden="true" className="mx-auto grid h-16 w-12 place-items-center border border-rule-2 bg-paper-2">
          <span className="font-mono text-[0.6rem] tracking-widest text-ink-3">PDF</span>
        </div>
        <p className="num mt-4 text-sm text-ink">{fileName}</p>
        <p className="mt-2 text-sm text-ink-2">
          One page, A4. Phones do not preview PDFs reliably, so open or download it instead.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <a className="focus-ring btn btn-solid" href={path} rel="noreferrer" target="_blank">
            Open resume
          </a>
          <a className="focus-ring btn btn-line" download={fileName} href={path}>
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
