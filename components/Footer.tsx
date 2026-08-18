import { siteConfig } from "@/lib/data/site";

const footerLinks = [
  siteConfig.links.github,
  siteConfig.links.linkedin,
  siteConfig.links.x,
  siteConfig.links.email,
].filter((link) => link.visible);

export function Footer() {
  return (
    <footer className="border-t border-line/70 py-8">
      <div className="shell flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs">{siteConfig.handle}</p>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          {footerLinks.map((link) => (
            <a
              className="focus-ring rounded-full px-2 py-1 transition-colors hover:bg-panel hover:text-foreground"
              href={link.url}
              key={link.url}
              rel={link.url.startsWith("http") ? "noreferrer" : undefined}
              target={link.url.startsWith("http") ? "_blank" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
