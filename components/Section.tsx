import type { ReactNode } from "react";

/*
  Section frame: a mono label and an optional right-hand slot on one line, a
  hairline under them, then the content. Narrow enough to stay dense.
*/
export function Section({
  aside,
  children,
  id,
  label,
}: {
  aside?: ReactNode;
  children: ReactNode;
  id?: string;
  label: string;
}) {
  return (
    <section className="scroll-mt-16 py-8 sm:py-10" id={id}>
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <h2 className="eyebrow text-foreground">{label}</h2>
        {aside ? <div className="eyebrow shrink-0">{aside}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
