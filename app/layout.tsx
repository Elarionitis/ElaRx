import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { CommandPalette, type CommandItem } from "@/components/CommandPalette";
import { Chrome } from "@/components/Chrome";
import { Colophon } from "@/components/Colophon";
import { CursorLens } from "@/components/CursorLens";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getAllPosts } from "@/lib/blog";
import { decisions } from "@/lib/data/decisions";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/data/site";

import { body, display, mono } from "./fonts";
import "./globals.css";

const description = siteConfig.tagline;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Software Engineer`,
    template: `%s — ${siteConfig.name}`,
  },
  description,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${siteConfig.url}/writing/rss.xml` },
  },
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Software Engineer`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Software Engineer`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#10131a" },
  ],
};

// Tells search engines the site belongs to a person, not a company.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  jobTitle: "Software Engineer",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Jodhpur" },
  sameAs: Object.values(siteConfig.links)
    .filter((link) => link.visible && link.url.startsWith("http"))
    .map((link) => link.url),
};

function buildCommandItems(): CommandItem[] {
  return [
    { group: "Pages", label: "Home", href: "/" },
    { group: "Pages", label: "Projects", href: "/projects" },
    { group: "Pages", label: "Writing", href: "/writing" },
    { group: "Pages", label: "About", href: "/about" },
    { group: "Pages", label: "Resume", href: "/resume" },
    ...decisions.map((decision) => ({
      group: "Decisions",
      label: decision.title,
      hint: decision.id,
      // Searching "locking" or "cache" should find the decision about it.
      keywords: `${decision.constraint} ${decision.reasoning} ${decision.domain} ${decision.sourceLabel}`,
      href: `/#${decision.id}`,
    })),
    ...projects.map((project) => ({
      group: "Projects",
      label: project.name,
      hint: project.tagline,
      keywords: `${project.summary} ${project.domain} ${project.stack.join(" ")}`,
      href: `/projects#${project.slug}`,
    })),
    ...getAllPosts().map((post) => ({
      group: "Writing",
      label: post.title,
      hint: post.date,
      href: `/writing/${post.slug}`,
    })),
    { group: "Actions", label: "Copy email address", hint: siteConfig.email, action: "copy-email" as const },
    { group: "Actions", label: "Toggle theme", action: "toggle-theme" as const },
    { group: "Actions", label: "Surprise me", hint: "Open a decision", action: "surprise" as const, href: "/#D-04" },
    { group: "Actions", label: "Download resume", hint: "PDF", href: siteConfig.resumePath },
    { group: "Elsewhere", label: "GitHub", href: siteConfig.links.github.url },
    { group: "Elsewhere", label: "LinkedIn", href: siteConfig.links.linkedin.url },
    { group: "Elsewhere", label: "X / @SuhanRamani09", href: siteConfig.links.x.url },
    { group: "Elsewhere", label: "LeetCode", href: siteConfig.links.leetcode.url },
    { group: "Elsewhere", label: "Codeforces", href: siteConfig.links.codeforces.url },
  ];
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-paper text-ink antialiased">
        {/*
          Arms the reveal animations before first paint. Gating them on an
          attribute set here means a visitor who blocks scripts, or who asked
          for reduced motion, gets the document at full opacity rather than a
          page of sections waiting for an observer that will never run.
        */}
        <Script id="reveal-gate" strategy="beforeInteractive">
          {'try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.revealReady="true"}catch(e){}'}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange enableSystem>
          <CursorLens />
          <ScrollReveal />
          <a
            className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:border focus:border-rule-2 focus:bg-paper-2 focus:px-4 focus:py-2 focus:text-sm"
            href="#main"
          >
            Skip to content
          </a>
          <CommandPalette email={siteConfig.email} items={buildCommandItems()} />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Chrome />
            <main className="flex-1" id="main">
              {children}
            </main>
            <Colophon />
          </div>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
