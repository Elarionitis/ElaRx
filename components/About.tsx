import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/data/site";

export function About() {
  return (
    <Section id="about" label="About">
      <p className="text-lg leading-[1.7] text-foreground">{siteConfig.about}</p>

      {siteConfig.proof.length > 0 ? (
        <dl className="mt-8 space-y-2.5 border-t border-line pt-6 font-mono text-xs text-muted">
          {siteConfig.proof.map((item) => (
            <div className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[9.5rem_minmax(0,1fr)]" key={item.label}>
              <dt className="text-faint">{item.label}</dt>
              <dd className="min-w-0">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </Section>
  );
}
