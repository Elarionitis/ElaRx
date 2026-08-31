import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/data/site";

const contactKeys = ["github", "linkedin", "x"] as const;

export function Contact() {
  const elsewhere = contactKeys.map((key) => siteConfig.links[key]).filter((link) => link.visible);

  return (
    <Section id="contact" label="Contact">
      <p className="text-lg leading-[1.7] text-foreground">{siteConfig.contact}</p>

      <a className="link mt-6 inline-block font-display text-3xl text-foreground sm:text-4xl" href={`mailto:${siteConfig.email}`}>
        {siteConfig.email}
      </a>

      <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        {elsewhere.map((link) => (
          <a
            className="focus-ring inline-flex items-baseline gap-1 transition-colors hover:text-foreground"
            href={link.url}
            key={link.url}
            rel="noreferrer"
            target="_blank"
          >
            <span className="border-b border-transparent hover:border-current">{link.label}</span>
            <span aria-hidden="true" className="text-[0.7em] text-faint">&#8599;</span>
          </a>
        ))}
      </div>
    </Section>
  );
}
