"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
  One observer for every `data-reveal` element on the page.

  The hidden state is applied by CSS only while `html[data-reveal-ready]` is
  set, and that attribute is written by the blocking script in the layout head
  — before first paint, and never under reduced motion. Without JavaScript the
  attribute never appears and every section renders at full opacity, so a
  reveal that will not arrive can never swallow the content.

  A MutationObserver picks up rows that appear later: filtered decisions, an
  opened panel, anything a client component swaps in after the first paint.
*/
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.documentElement.dataset.revealReady) return;

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
