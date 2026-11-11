import Link from "next/link";

export default function NotFound() {
  return (
    <div className="sheet flex min-h-[60vh] flex-col justify-center py-20">
      <p className="label">404</p>
      <h1 className="page-title">
        This page does not exist
      </h1>
      <p className="measure mt-5 text-[1.05rem] leading-[1.6] text-ink-2">
        The link is either wrong or something moved. Both are fixable.
      </p>
      <div className="mt-8 flex gap-6 text-sm">
        <Link className="tlink text-ink" href="/">
          Home
        </Link>
        {/* Writing 404s until the first post exists, so a 404 never offers it. */}
        <Link className="tlink text-ink" href="/projects">
          Projects
        </Link>
      </div>
    </div>
  );
}
