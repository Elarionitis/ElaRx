"use client";

import { useEffect, useRef, useState } from "react";

/** One visibility controller for every decorative project pipeline. */
export function ProjectDiagram({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.intersectionRatio >= 0.4), { threshold: [0, 0.4] });
    const onVisibility = () => setPageVisible(!document.hidden);
    observer.observe(node);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  return <div aria-hidden="true" className={`project-diagram ${visible && pageVisible ? "is-running" : ""}`} ref={ref}>{children}</div>;
}
