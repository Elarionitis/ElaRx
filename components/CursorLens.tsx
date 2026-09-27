"use client";

import { useEffect } from "react";

/* A pointer lens, not a cursor replacement. It only exists for precise pointers. */
export function CursorLens() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let frame = 0;
    let target: HTMLElement | null = null;
    let point = { x: 0, y: 0 };

    function clearTarget() {
      if (target) target.removeAttribute("data-lens-active");
      target = null;
    }

    function render() {
      frame = 0;
      root.style.setProperty("--lens-x", `${point.x}px`);
      root.style.setProperty("--lens-y", `${point.y}px`);
      root.dataset.lensActive = "true";
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      point = { x: event.clientX, y: event.clientY };
      const nextTarget = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-lens-target]") : null;

      if (nextTarget !== target) {
        clearTarget();
        target = nextTarget;
        if (target) target.setAttribute("data-lens-active", "");
      }

      if (target) {
        const bounds = target.getBoundingClientRect();
        target.style.setProperty("--lens-local-x", `${point.x - bounds.left}px`);
        target.style.setProperty("--lens-local-y", `${point.y - bounds.top}px`);
      }

      if (!frame) frame = window.requestAnimationFrame(render);
    }

    function disable() {
      root.removeAttribute("data-lens-enabled");
      root.removeAttribute("data-lens-active");
      clearTarget();
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    }

    function enable() {
      if (!finePointer.matches || reducedMotion.matches) return disable();
      root.dataset.lensEnabled = "true";
    }

    enable();
    finePointer.addEventListener("change", enable);
    reducedMotion.addEventListener("change", enable);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", disable);
    window.addEventListener("focus", enable);

    return () => {
      finePointer.removeEventListener("change", enable);
      reducedMotion.removeEventListener("change", enable);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", disable);
      window.removeEventListener("focus", enable);
      disable();
    };
  }, []);

  return <div aria-hidden="true" className="cursor-lens" />;
}
