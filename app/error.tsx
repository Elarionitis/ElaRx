"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="shell flex min-h-[60vh] flex-col justify-center py-20">
      <p className="eyebrow">Error</p>
      <h1 className="mt-3 font-display text-[clamp(2.5rem,8vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground">
        Something broke
      </h1>
      <p className="mt-4 max-w-md text-muted">
        This one is on my end. Reloading usually clears it.
      </p>
      <button
        className="focus-ring mt-8 inline-flex h-10 w-fit items-center rounded border border-foreground px-4 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
