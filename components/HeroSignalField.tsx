"use client";

import { useEffect, useRef, useState } from "react";

export function HeroSignalField({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`hero-stage ${revealed ? "is-revealed" : ""}`}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--hero-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 2}`);
        ref.current.style.setProperty("--hero-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 2}`);
      }}
      ref={ref}
    >
      {children}
    </div>
  );
}
