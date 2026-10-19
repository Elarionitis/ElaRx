"use client";

import Link from "next/link";
import { useRef } from "react";

type MagneticLinkProps = {
  children: React.ReactNode;
  className: string;
  href: string;
  rel?: string;
  target?: string;
};

/* Isolated by design: removing magnetic CTAs only means replacing this wrapper with Link/a. */
export function MagneticLink({ children, className, href, rel, target }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--magnet-x", `${(event.clientX - bounds.left - bounds.width / 2) * 0.1}px`);
    ref.current.style.setProperty("--magnet-y", `${(event.clientY - bounds.top - bounds.height / 2) * 0.1}px`);
  };
  const props = { className: `${className} magnetic-link`, onPointerLeave: () => ref.current?.style.setProperty("--magnet-x", "0px"), onPointerMove: onMove, ref, rel, target };
  return href.startsWith("/") ? <Link href={href} {...props}>{children}</Link> : <a href={href} {...props}>{children}</a>;
}
