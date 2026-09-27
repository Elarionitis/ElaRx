"use client";

import { useEffect, useRef } from "react";

/*
  A faint colour halo that follows the pointer.

  Kept deliberately quiet: 3% of the accent on paper, 5% on the dark ground,
  and small enough to read as a light source rather than a spotlight.

  Costs nothing to host. It is one fixed element moved with translate3d inside
  an animation frame, so it composites on the GPU and never triggers layout or
  paint; the browser suspends animation frames in a hidden tab, so an idle tab
  does no work at all. No server involvement, so nothing changes at the edge.
*/
export function CursorHalo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Pointless on touch, and unwelcome for anyone who asked for less motion.
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let x = 0;
    let y = 0;

    function paint() {
      frame = 0;
      if (element) element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (element) element.style.opacity = "1";
      if (!frame) frame = window.requestAnimationFrame(paint);
    }

    function hide() {
      if (element) element.style.opacity = "0";
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div aria-hidden="true" className="cursor-halo" ref={ref} />;
}
