import { experience } from "@/lib/data/experience";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-[color:var(--line)]/30 py-14">
      <p className="mono-label text-[color:var(--accent)]">experience</p>
      <div className="mt-6 divide-y divide-[color:var(--line)]/25 border-y border-[color:var(--line)]/25">
        {experience.map((item) => (
          <article className="grid gap-3 py-6 lg:grid-cols-[220px_1fr]" key={`${item.org}-${item.role}`}>
            <div className="font-mono text-xs text-[color:var(--muted)]">
              <p className="text-[color:var(--accent-alt)]">{item.dates}</p>
              <p className="mt-2 text-[color:var(--muted)]">{item.org}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">{item.role}</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-[color:var(--muted)]">{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
