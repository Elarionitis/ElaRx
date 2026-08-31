"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type CommandItem = {
  group: string;
  label: string;
  hint?: string;
  href?: string;
  /** Non-navigation commands: copy, theme, download. */
  action?: "copy-email" | "toggle-theme";
};

export const OPEN_PALETTE_EVENT = "open-command-palette";

function matches(item: CommandItem, query: string) {
  if (!query) return true;
  return `${item.label} ${item.hint ?? ""} ${item.group}`.toLowerCase().includes(query.toLowerCase());
}

export function CommandPalette({ email, items }: { email: string; items: CommandItem[] }) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => items.filter((item) => matches(item, query)), [items, query]);

  // Groups keep their declared order rather than being re-sorted alphabetically.
  const grouped = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, CommandItem[]>();
    for (const item of results) {
      if (!map.has(item.group)) {
        map.set(item.group, []);
        order.push(item.group);
      }
      map.get(item.group)?.push(item);
    }
    return order.map((group) => ({ group, items: map.get(group) ?? [] }));
  }, [results]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  const run = useCallback(
    (item: CommandItem) => {
      if (item.action === "copy-email") {
        navigator.clipboard?.writeText(email).then(
          () => setCopied(true),
          () => setCopied(false),
        );
        window.setTimeout(() => setCopied(false), 1600);
        close();
        return;
      }
      if (item.action === "toggle-theme") {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        close();
        return;
      }
      if (item.href) {
        if (item.href.startsWith("http") || item.href.endsWith(".pdf")) window.open(item.href, "_blank", "noreferrer");
        else router.push(item.href);
        close();
      }
    },
    [close, email, resolvedTheme, router, setTheme],
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    }
    function onOpen() {
      setOpen(true);
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  // Keep the highlighted row in view while arrowing through a long list.
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>("[data-active='true']")?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  if (!open) {
    return copied ? (
      <div
        className="fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-line-strong bg-surface px-4 py-2 font-mono text-xs text-foreground shadow-lg"
        role="status"
      >
        Email copied
      </div>
    ) : null;
  }

  const flat = grouped.flatMap((section) => section.items);
  const activeIndex = Math.min(cursor, Math.max(flat.length - 1, 0));

  return (
    <div
      className="overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      role="presentation"
    >
      <div aria-label="Command palette" aria-modal="true" className="palette" role="dialog">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span aria-hidden="true" className="font-mono text-sm text-faint">
            &#8250;
          </span>
          <input
            aria-label="Search pages, projects and writing"
            autoFocus
            className="h-12 w-full bg-transparent text-[0.95rem] text-foreground outline-none placeholder:text-faint"
            onChange={(event) => {
              setQuery(event.target.value);
              setCursor(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setCursor((value) => Math.min(value + 1, flat.length - 1));
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setCursor((value) => Math.max(value - 1, 0));
              }
              if (event.key === "Enter" && flat[activeIndex]) {
                event.preventDefault();
                run(flat[activeIndex]);
              }
            }}
            placeholder="Jump to a page, project or post"
            value={query}
          />
          <span className="kbd">esc</span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-2" ref={listRef}>
          {flat.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted">
              Nothing matches &ldquo;{query}&rdquo;.
            </p>
          ) : (
            grouped.map((section) => (
              <div className="mb-1" key={section.group}>
                <p className="eyebrow px-3 py-2">{section.group}</p>
                {section.items.map((item) => {
                  const index = flat.indexOf(item);
                  const isActive = index === activeIndex;

                  return (
                    <button
                      className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        isActive ? "bg-surface-2 text-foreground" : "text-muted hover:bg-surface-2"
                      }`}
                      data-active={isActive}
                      key={`${item.group}-${item.label}`}
                      onClick={() => run(item)}
                      onMouseMove={() => setCursor(index)}
                      type="button"
                    >
                      <span className="truncate">{item.label}</span>
                      {item.hint ? (
                        <span className="shrink-0 font-mono text-[0.7rem] text-faint">{item.hint}</span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.68rem] text-faint">
          <span className="flex items-center gap-1.5">
            <span className="kbd">&uarr;</span>
            <span className="kbd">&darr;</span> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="kbd">&crarr;</span> open
          </span>
        </div>
      </div>
    </div>
  );
}
