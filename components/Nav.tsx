"use client";

import { useTheme } from "next-themes";

import { siteConfig } from "@/lib/data/site";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-background/90 backdrop-blur">
      <nav className="shell flex min-h-16 items-center justify-between gap-4">
        <a className="focus-ring font-mono text-sm font-semibold text-foreground" href="#top">
          {siteConfig.handle}
        </a>

        <div className="flex items-center gap-1 sm:gap-3">
          {navItems.map((item) => (
            <a
              className="focus-ring hidden rounded-full px-3 py-2 font-mono text-xs text-muted transition-colors hover:bg-panel hover:text-foreground sm:inline-flex"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
          <button
            aria-label="Toggle theme"
            className="focus-ring inline-flex h-9 min-w-16 items-center justify-center rounded-full border border-line bg-surface px-3 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            type="button"
          >
            {isDark ? "light" : "dark"}
          </button>
        </div>
      </nav>
    </header>
  );
}
