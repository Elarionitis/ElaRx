import { siteConfig } from "@/lib/data/site";

const footerLinks = [
  siteConfig.links.github,
  siteConfig.links.linkedin,
  siteConfig.links.email,
  siteConfig.links.resume,
];

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)]/30 py-8">
      <div className="shell flex flex-col gap-4 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">built by {siteConfig.name}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {footerLinks.map((link) => (
            <a
              className="focus-ring transition hover:text-[color:var(--accent)]"
              href={link.href}
              key={link.label}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
