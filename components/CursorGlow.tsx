"use client";

import { useEffect, useRef } from "react";

/*
  A soft accent light that trails the pointer. Deliberately cheap: one fixed
  layer, moved with translate3d inside a single animation frame, so it stays on
  the compositor and never touches layout or paint.

  Skipped entirely for touch input and for anyone who asked for reduced motion.
*/
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    function paint() {
      frame = 0;
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (el) el.style.opacity = "1";
      if (!frame) frame = window.requestAnimationFrame(paint);
    }

    function onLeave() {
      if (el) el.style.opacity = "0";
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div aria-hidden="true" className="spotlight" ref={ref} />;
}
