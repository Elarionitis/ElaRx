import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AllNotes } from "@/components/AllNotes";
import { guestbookIsConfigured } from "@/lib/guestbook-store";

export const metadata: Metadata = {
  title: "Notes",
  description: "Every note visitors have left on Suhan Ramani's site.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  if (!guestbookIsConfigured) notFound();

  return (
    <div className="sheet pb-4">
      <header className="pt-14 sm:pt-20" data-reveal>
        <h1 className="page-title">Notes</h1>
        <p className="page-lead">
          Every note people have left here, newest first.{" "}
          <Link className="focus-ring tlink" href="/#guestbook">
            Leave yours
          </Link>
          .
        </p>
      </header>

      <AllNotes />
    </div>
  );
}
