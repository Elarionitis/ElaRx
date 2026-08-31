import { siteConfig } from "@/lib/data/site";

const footerKeys = ["github", "linkedin", "x", "email"] as const;

export function Footer() {
  const links = footerKeys.map((key) => siteConfig.links[key]).filter((link) => link.visible);

  return (
    <footer className="mt-8 border-t border-line py-8">
      <div className="shell flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-faint">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {links.map((link) => (
            <a
              className="focus-ring transition-colors hover:text-foreground"
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
