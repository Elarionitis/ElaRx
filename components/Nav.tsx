"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/data/site";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)]/30 bg-[color:var(--background)]/86 backdrop-blur">
      <nav className="shell flex min-h-16 items-center justify-between gap-4">
        <a className="focus-ring font-mono text-sm text-[color:var(--foreground)]" href="#top">
          {siteConfig.handle}
        </a>

        <div className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <a
              className="focus-ring mono-label text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            className="focus-ring hidden font-mono text-xs text-[color:var(--muted)] transition hover:text-[color:var(--accent)] sm:inline"
            href={siteConfig.links.github.href}
            rel="noreferrer"
            target="_blank"
          >
            {siteConfig.links.github.label}
          </a>
          <button
            aria-label="Toggle theme"
            className="focus-ring grid size-9 place-items-center border border-[color:var(--line)]/40 text-[color:var(--foreground)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            type="button"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
