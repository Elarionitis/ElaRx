import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { ResumeViewer } from "@/components/ResumeViewer";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `One-page resume for ${siteConfig.name} — education, experience, research and projects.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="shell pb-8">
      <PageHeader
        description="One page. Education, experience, research and projects, with the numbers attached."
        label="PDF · 1 page · A4"
        title="Resume"
      />
      <ResumeViewer name={siteConfig.name} path={siteConfig.resumePath} />
    </div>
  );
}
