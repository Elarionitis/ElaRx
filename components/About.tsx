import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/data/site";

export function About() {
  return (
    <Section id="about" label="About">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
        <p className="max-w-[36rem] text-lg leading-[1.6] text-foreground">{siteConfig.about}</p>

        {siteConfig.proof.length > 0 ? (
          <dl className="grid content-start gap-2 md:min-w-[17rem]">
            {siteConfig.proof.map((item) => (
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2" key={item.label}>
                <dt className="eyebrow">{item.label}</dt>
                <dd className="figure text-xs text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </Section>
  );
}
