"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/*
  Projects used to be addressed as /projects#orbit. Each has its own page now,
  so an old link that arrives with a fragment is sent on to it rather than
  being left at the top of the list.
*/
export function LegacyProjectHash({ slugs }: { slugs: string[] }) {
  const router = useRouter();

  useEffect(() => {
    const slug = window.location.hash.replace("#", "");
    if (slug && slugs.includes(slug)) router.replace(`/projects/${slug}`);
  }, [router, slugs]);

  return null;
}
