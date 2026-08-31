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

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Both icons render; the dark class picks one, so the correct icon is present
  // on first paint rather than after hydration.
  return (
    <button
      aria-label="Toggle theme"
      className="focus-ring grid size-8 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      type="button"
    >
      <svg aria-hidden="true" className="hidden size-4 dark:block" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.6 5.4l-1.6 1.6M7 17l-1.6 1.6M18.6 18.6L17 17M7 7 5.4 5.4" strokeLinecap="round" />
      </svg>
      <svg aria-hidden="true" className="size-4 dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // The header only grows a border once content has moved under it.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-background/80 backdrop-blur-md transition-colors ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <nav className="shell flex h-14 items-center justify-between gap-4">
        <Link
          className="focus-ring font-display text-[0.95rem] font-semibold tracking-[-0.02em] text-foreground"
          href="/"
        >
          {siteConfig.handle}
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 sm:flex">
            {routes.map((route) => (
              <li key={route.href}>
                <Link
                  aria-current={isActive(pathname, route.href) ? "page" : undefined}
                  className={`focus-ring rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                    isActive(pathname, route.href)
                      ? "bg-surface-2 text-foreground"
                      : "text-muted hover:bg-surface-2 hover:text-foreground"
                  }`}
                  href={route.href}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            aria-label="Open command palette"
            className="focus-ring ml-1 hidden items-center gap-2 rounded-md border border-line px-2.5 py-1.5 text-xs text-faint transition-colors hover:border-line-strong hover:text-muted md:flex"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            type="button"
          >
            Search
            <span className="kbd">&#8984;K</span>
          </button>

          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile route bar: the four routes stay reachable without a drawer. */}
      <div className="border-t border-line sm:hidden">
        <ul className="shell flex h-11 items-center gap-1 overflow-x-auto">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                aria-current={isActive(pathname, route.href) ? "page" : undefined}
                className={`focus-ring block rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                  isActive(pathname, route.href) ? "bg-surface-2 text-foreground" : "text-muted"
                }`}
                href={route.href}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
