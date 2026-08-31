import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/data/site";

export function About() {
  return (
    <Section id="about" label="About">
      <p className="text-lg leading-[1.7] text-foreground">{siteConfig.about}</p>

      {siteConfig.proof.length > 0 ? (
        <dl className="mt-8 space-y-2 border-t border-line pt-6 font-mono text-xs text-muted">
          {siteConfig.proof.map((item) => (
            <div className="flex gap-3" key={item.label}>
              <dt className="w-[7.5rem] shrink-0 text-faint">{item.label}</dt>
              <dd className="min-w-0">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </Section>
  );
}
