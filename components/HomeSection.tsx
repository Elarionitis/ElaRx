import Link from "next/link";
import type { ReactNode } from "react";

/*
  Homepage section: label on the left, a "view all" route on the right, content
  below. The link is the point — every homepage block is a preview of a route.
*/
export function HomeSection({
  children,
  id,
  label,
  more,
  moreHref,
  title,
}: {
  children: ReactNode;
  id?: string;
  label: string;
  more?: string;
  moreHref?: string;
  title?: string;
}) {
  return (
    <section className="scroll-mt-20 py-10 sm:py-14" id={id}>
      <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
        <div className="min-w-0">
          <p className="eyebrow">{label}</p>
          {title ? (
            <h2 className="mt-2 font-display text-xl font-semibold tracking-[-0.025em] text-foreground sm:text-2xl">
              {title}
            </h2>
          ) : null}
        </div>
        {more && moreHref ? (
          <Link className="focus-ring more shrink-0" href={moreHref}>
            {more}
            <span aria-hidden="true" className="chev">
              &rarr;
            </span>
          </Link>
        ) : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
