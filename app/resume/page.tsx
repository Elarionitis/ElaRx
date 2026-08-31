import type { Metadata } from "next";

import { ResumeViewer } from "@/components/ResumeViewer";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `One-page resume for ${siteConfig.name} — education, experience, research and projects.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="sheet pb-4">
      {/* Compact on purpose: every row here is a row the document loses. */}
      <header className="flex flex-col gap-3 pt-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:pt-12">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h1 className="text-[clamp(1.6rem,3.4vw,2.1rem)] font-medium leading-[1.1] tracking-[-0.035em] text-ink">
            Resume
          </h1>
          <p className="text-[0.95rem] text-ink-2">
            The complete record. The rest of this site is the curated version.
          </p>
        </div>
        <p className="label shrink-0">
          PDF &middot; <span className="num">1</span> page &middot; A4
        </p>
      </header>

      <ResumeViewer name={siteConfig.name} path={siteConfig.resumePath} />
    </div>
  );
}
