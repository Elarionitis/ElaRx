import type { ReactNode } from "react";

/*
  Every section shares one frame: a mono label in a narrow left column and the
  content in a wider right column, separated from the previous section by a
  single hairline. The label column collapses above the content on small
  screens.
*/
export function Section({
  children,
  id,
  label,
}: {
  children: ReactNode;
  id?: string;
  label: string;
}) {
  return (
    <section className="scroll-mt-16 border-t border-line py-12 sm:py-16" id={id}>
      <div className="grid gap-5 sm:grid-cols-[8rem_minmax(0,44rem)] sm:gap-10">
        <h2 className="eyebrow sm:pt-[0.45rem]">{label}</h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
