"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
  One observer for every `data-reveal` element on the page.

  This component owns the decision, not the inline script in the layout. The
  script is only an optimisation: it sets `data-reveal-ready` before first
  paint so nothing flashes in and back out. If it has not run yet — or at all —
  this effect sets the attribute itself.

  The distinction matters more than it looks. An earlier version read the
  attribute to decide whether to run, which meant that any ordering where the
  effect went first left every observer unarmed and every section below the
  fold hidden for good. A reveal must fail towards showing the content.

  A MutationObserver picks up rows that appear later: filtered decisions, an
  opened panel, anything a client component swaps in after the first paint.
*/
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // No animation wanted, or no way to tell when an element arrives: drop the
    // hidden state entirely and leave the document as written.
    if (reduced || typeof IntersectionObserver === "undefined") {
      delete root.dataset.revealReady;
      return;
    }

    root.dataset.revealReady = "true";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal-in", "");
          observer.unobserve(entry.target);
        }
      },
      // Fire a little before the element lands so the motion reads as the
      // section arriving, not as it correcting itself once it is already read.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    let frame = 0;
    function scan() {
      frame = 0;
      for (const node of document.querySelectorAll("[data-reveal]:not([data-reveal-in])")) {
        observer.observe(node);
      }
    }

    scan();
    const mutations = new MutationObserver(() => {
      if (!frame) frame = window.requestAnimationFrame(scan);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
