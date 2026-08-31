import { Section } from "@/components/Section";
import { experience } from "@/lib/data/experience";

export function Experience() {
  return (
    <Section id="experience" label="Experience">
      <div className="space-y-10">
        {experience.map((item) => (
          <article key={`${item.org}-${item.role}`}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-display text-2xl leading-tight text-foreground">{item.role}</h3>
              <p className="shrink-0 font-mono text-xs text-faint">{item.dates}</p>
            </div>
            <p className="mt-1 text-sm text-accent">{item.org}</p>
            <ul className="mt-4 space-y-2.5 text-muted">
              {item.highlights.map((highlight) => (
                <li className="relative pl-5 leading-[1.65]" key={highlight}>
                  <span aria-hidden="true" className="absolute left-0 top-[0.65em] size-1 rounded-full bg-line ring-1 ring-faint/50" />
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
