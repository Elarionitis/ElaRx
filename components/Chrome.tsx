"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { OPEN_PALETTE_EVENT } from "@/components/CommandPalette";
import { siteConfig } from "@/lib/data/site";

const routes = [
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
];

function active(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/*
  The masthead of a document rather than an app bar: a rule under it, the name
  set as a wordmark, routes as plain text with the current one marked by a
  vermillion rule rather than a filled pill.
*/
export function Chrome() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const isArticle = pathname.startsWith("/writing/");

  useEffect(() => {
    if (!isArticle) return;

    let frame = 0;
    function update() {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isArticle]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/92 backdrop-blur-sm">
      <div className="sheet flex h-14 items-center justify-between gap-4">
        <Link className="focus-ring flex items-baseline gap-2.5" href="/">
          <span className="text-[0.95rem] font-semibold tracking-[-0.02em] text-ink">{siteConfig.name}</span>
          <span className="label hidden sm:inline">{siteConfig.role}</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-4 sm:gap-5">
              {routes.map((route) => (
                <li key={route.href}>
                  <Link
                    aria-current={active(pathname, route.href) ? "page" : undefined}
                    className={`focus-ring relative block py-1 text-sm transition-colors hover:text-ink ${
                      active(pathname, route.href) ? "text-ink" : "text-ink-2"
                    }`}
                    href={route.href}
                  >
                    {route.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-px left-0 h-px w-full bg-accent transition-transform duration-150 ${
                        active(pathname, route.href) ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            aria-label="Search"
            className="focus-ring hidden items-center gap-2 border border-rule px-2 py-1 text-xs text-ink-3 transition-colors hover:border-rule-2 hover:text-ink-2 md:flex"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            style={{ borderRadius: "var(--radius-sheet)" }}
            type="button"
          >
            Search <span className="kbd">&#8984;K</span>
          </button>

          <button
            aria-label="Toggle theme"
            className="focus-ring grid size-7 place-items-center text-ink-3 transition-colors hover:text-ink"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            type="button"
          >
            <svg aria-hidden="true" className="hidden size-4 dark:block" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 3v2M12 19v2M21 12h-2M5 12H3M18.4 5.6 17 7M7 17l-1.4 1.4M18.4 18.4 17 17M7 7 5.6 5.6" strokeLinecap="round" />
            </svg>
            <svg aria-hidden="true" className="size-4 dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
              <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Reading progress, articles only. A rule that fills, not a bar that floats. */}
      {isArticle ? (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
        />
      ) : null}
    </header>
  );
}
