import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-[clamp(2.5rem,8vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground">
        This page does not exist
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The link is either wrong or something moved. Both are fixable.
      </p>
      <div className="mt-8 flex gap-6 text-sm">
        <Link className="link text-foreground" href="/">
          Home
        </Link>
        <Link className="link text-foreground" href="/blog">
          Writing
        </Link>
      </div>
    </div>
  );
}
