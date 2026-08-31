"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="sheet flex min-h-[60vh] flex-col justify-center py-20">
      <p className="label">Error</p>
      <h1 className="mt-3 font-display text-[clamp(2.5rem,8vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground">
        Something broke
      </h1>
      <p className="measure mt-5 text-[1.05rem] leading-[1.6] text-ink-2">
        This one is on my end. Reloading usually clears it.
      </p>
      <button
        className="focus-ring btn btn-solid mt-8 w-fit"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
