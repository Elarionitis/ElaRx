import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/data/site";

const elsewhereKeys = ["github", "linkedin", "x"] as const;

export function Contact() {
  const elsewhere = elsewhereKeys.map((key) => siteConfig.links[key]).filter((link) => link.visible);

  return (
    <Section aside="Available" id="contact" label="Contact">
      <div className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="min-w-0">
          <p className="text-muted">{siteConfig.contact}</p>
          <a
            className="focus-ring mt-1 block truncate font-display text-2xl font-semibold tracking-[-0.02em] text-foreground transition-colors hover:text-accent sm:text-3xl"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>
        </div>

        <div className="flex shrink-0 gap-4 font-mono text-xs">
          {elsewhere.map((link) => (
            <a
              className="focus-ring text-muted transition-colors hover:text-accent"
              href={link.url}
              key={link.url}
              rel="noreferrer"
              target="_blank"
            >
              {link.label} <span aria-hidden="true">&#8599;</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
