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
      <header className="flex flex-col gap-6 pt-16 sm:flex-row sm:items-end sm:justify-between sm:pt-20">
        <div className="min-w-0">
          <h1 className="text-[clamp(1.85rem,4.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.035em] text-ink">
            Resume
          </h1>
          <p className="measure mt-5 text-[1.05rem] leading-[1.6] text-ink-2">
            The complete professional record, on one page. The rest of this site is the curated version.
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
