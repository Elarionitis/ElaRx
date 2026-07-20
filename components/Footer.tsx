import { siteConfig } from "@/lib/data/site";

const footerLinks = [
  siteConfig.links.github,
  siteConfig.links.linkedin,
  siteConfig.links.email,
];

export function Footer() {
  return (
    <footer className="border-t border-line/70 py-8">
      <div className="shell flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs">{siteConfig.handle}</p>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          {footerLinks.map((link) => (
            <a
              className="focus-ring rounded-full px-2 py-1 transition-colors hover:bg-panel hover:text-foreground"
              href={link.href}
              key={link.href}
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
