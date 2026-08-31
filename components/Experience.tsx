import { Section } from "@/components/Section";
import { experience } from "@/lib/data/experience";

export function Experience() {
  return (
    <Section id="experience" label="Experience">
      <div className="grid gap-3">
        {experience.map((item) => (
          <article className="card p-5" key={`${item.org}-${item.role}`}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-foreground">{item.role}</h3>
                <p className="mt-0.5 text-sm text-accent">{item.org}</p>
              </div>
              <p className="figure shrink-0 text-xs text-faint">{item.dates}</p>
            </div>

            <ul className="mt-4 grid gap-2 border-t border-line pt-4 text-sm leading-[1.55] text-muted">
              {item.highlights.map((highlight) => (
                <li className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-2" key={highlight}>
                  <span aria-hidden="true" className="mt-[0.6em] h-px w-2 bg-line-strong" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
