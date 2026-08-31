"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/data/site";

const navItems = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "about", label: "About", href: "/#about" },
  { id: null, label: "Writing", href: "/blog" },
] as const;

/*
  Lights the nav item whose section is currently under a thin band near the top
  of the viewport. The band is what keeps exactly one item lit — tracking plain
  visibility lights every section tall enough to overlap the next.
*/
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    // Off the home page there are no sections to track, and the caller already
    // gates on the route, so a stale value here is never read.
    if (!enabled) return;

    const sections = navItems
      .map((item) => (item.id ? document.getElementById(item.id) : null))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const inOrder = navItems.filter((item) => item.id && visible.has(item.id));
        setActive(inOrder.length > 0 ? (inOrder[inOrder.length - 1].id as string) : null);
      },
      { rootMargin: "-12% 0px -76% 0px" },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  /*
    Both icons are rendered and CSS picks one off the `dark` class that
    next-themes writes before first paint. Deciding in React would mean
    waiting for hydration, and the server cannot know what the browser
    resolves "system" to.
  */
  return (
    <button
      aria-label="Toggle theme"
      className="focus-ring -mr-1.5 grid size-9 place-items-center rounded-full text-muted transition-colors hover:text-foreground"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      type="button"
    >
      <svg
        aria-hidden="true"
        className="hidden size-4 dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path
          d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.6 5.4l-1.6 1.6M7 17l-1.6 1.6M18.6 18.6L17 17M7 7 5.4 5.4"
          strokeLinecap="round"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="size-4 dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const activeSection = useActiveSection(onHome);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/85 backdrop-blur-sm">
      <nav className="shell flex h-14 items-center justify-between gap-4">
        <Link className="focus-ring font-display text-lg leading-none text-foreground" href="/">
          {siteConfig.handle}
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {navItems.map((item) => {
            const isActive = item.id
              ? onHome && activeSection === item.id
              : pathname.startsWith("/blog");

            return (
              <Link
                className={`focus-ring group relative text-sm transition-colors hover:text-foreground ${
                  isActive ? "text-foreground" : "text-muted"
                } ${item.id === "experience" ? "hidden sm:inline-block" : "inline-block"}`}
                href={item.href}
                key={item.href}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-200 group-hover:scale-x-100 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
