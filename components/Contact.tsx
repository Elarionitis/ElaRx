import { siteConfig } from "@/lib/data/site";

const contactLinks = [siteConfig.links.email, siteConfig.links.linkedin, siteConfig.links.x, siteConfig.links.github].filter(
  (link) => link.visible,
);

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line/70 py-14">
      <p className="eyebrow text-accent">contact</p>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">Open to SDE/AI-ML Engineer internship opportunities — reach out.</p>
      <div className="mt-5 flex flex-wrap gap-3 font-mono text-sm">
        {contactLinks.map((link) => (
          <a
            className="focus-ring rounded-full bg-surface px-4 py-2 text-foreground transition-colors hover:bg-accent hover:text-white motion-reduce:transition-none"
            href={link.url}
            key={link.url}
            rel={link.url.startsWith("http") ? "noreferrer" : undefined}
            target={link.url.startsWith("http") ? "_blank" : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
