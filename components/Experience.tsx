import { experience } from "@/lib/data/experience";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-line/70 py-14">
      <p className="eyebrow text-accent">experience</p>
      <div className="mt-6 divide-y divide-line/70 border-y border-line/70">
        {experience.map((item) => (
          <article className="grid gap-3 py-6 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.65fr)]" key={item.org}>
            <div>
              <p className="font-display text-xl font-semibold text-foreground">{item.role}</p>
              <p className="mt-1 font-mono text-xs text-accent-alt">{item.dates}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">{item.org}</p>
              <p className="mt-2 leading-7 text-muted">{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
