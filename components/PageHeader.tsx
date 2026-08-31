import type { ReactNode } from "react";

/*
  Route-level header. Each page gets the same opening shape — label, title,
  one line of description — so moving between routes feels like one product.
*/
export function PageHeader({
  actions,
  description,
  label,
  title,
}: {
  actions?: ReactNode;
  description?: string;
  label: string;
  title: string;
}) {
  return (
    <header className="flex flex-col gap-6 border-b border-line pb-8 pt-10 sm:flex-row sm:items-end sm:justify-between sm:pt-14">
      <div className="min-w-0">
        <p className="eyebrow">{label}</p>
        <h1 className="mt-3 font-display text-[clamp(2.25rem,6vw,3.25rem)] font-semibold leading-[1] tracking-[-0.035em] text-foreground">
          {title}
        </h1>
        {description ? <p className="mt-4 max-w-xl text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}
