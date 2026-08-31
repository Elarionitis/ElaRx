"use client";

import { useState } from "react";

const ZOOM_STEPS = [75, 100, 125, 150] as const;

/*
  PDF embedding is reliable on desktop browsers and genuinely is not on mobile
  Safari, which frequently renders a blank frame or only the first screen. So
  the embed is desktop-only and small screens get a purposeful card instead of
  a broken viewer. Download stays visible at every size.
*/
export function ResumeViewer({ name, path }: { name: string; path: string }) {
  const [zoom, setZoom] = useState<number>(100);

  const zoomIndex = ZOOM_STEPS.indexOf(zoom as (typeof ZOOM_STEPS)[number]);
  const canZoomOut = zoomIndex > 0;
  const canZoomIn = zoomIndex < ZOOM_STEPS.length - 1;
  const fileName = `${name.replace(/\s+/g, "-")}-Resume.pdf`;

  return (
    <div className="pt-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <a className="focus-ring btn btn-solid" download={fileName} href={path}>
            Download PDF
          </a>
          <a className="focus-ring btn btn-line" href={path} rel="noreferrer" target="_blank">
            Open in new tab
            <span aria-hidden="true" className="arrow">
              &#8599;
            </span>
          </a>
        </div>

        <div className="hidden items-center gap-1 rounded-full border border-rule p-1 md:flex">
          <button
            aria-label="Zoom out"
            className="focus-ring grid size-7 place-items-center rounded-full text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canZoomOut}
            onClick={() => setZoom(ZOOM_STEPS[Math.max(zoomIndex - 1, 0)])}
            type="button"
          >
            <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14" strokeLinecap="round" />
            </svg>
          </button>
          <span aria-live="polite" className="num w-12 text-center text-xs text-ink-2">
            {zoom}%
          </span>
          <button
            aria-label="Zoom in"
            className="focus-ring grid size-7 place-items-center rounded-full text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canZoomIn}
            onClick={() => setZoom(ZOOM_STEPS[Math.min(zoomIndex + 1, ZOOM_STEPS.length - 1)])}
            type="button"
          >
            <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop: the document itself, at A4 proportions. */}
      <div className="mt-5 hidden overflow-hidden border border-rule bg-paper-2 md:block">
        <object
          aria-label={`${name} resume`}
          className="block h-[min(80vh,52rem)] w-full"
          data={`${path}#zoom=${zoom}&toolbar=0&navpanes=0&view=FitH`}
          key={zoom}
          type="application/pdf"
        >
          <div className="p-10 text-center">
            <p className="text-ink-2">Your browser will not display the PDF inline.</p>
            <a className="focus-ring btn btn-solid mt-4" href={path} rel="noreferrer" target="_blank">
              Open the resume
            </a>
          </div>
        </object>
      </div>

      {/* Small screens: an honest card rather than a frame that may render blank. */}
      <div className="mt-5 border border-rule p-6 text-center md:hidden">
        <div aria-hidden="true" className="mx-auto grid h-16 w-12 place-items-center border border-rule-2 bg-paper-2">
          <span className="font-mono text-[0.6rem] tracking-widest text-ink-3">PDF</span>
        </div>
        <p className="mt-4 text-base font-semibold tracking-[-0.02em] text-ink">{fileName}</p>
        <p className="mt-1 text-sm text-ink-2">
          One page, A4. Inline PDF preview is unreliable on phones, so open or download it instead.
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
