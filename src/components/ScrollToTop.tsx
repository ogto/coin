"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const el = (document.scrollingElement instanceof HTMLElement
      ? document.scrollingElement
      : document.documentElement) as HTMLElement;

    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "auto";

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() =>
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    );

    el.style.scrollBehavior = prev;
  }, [pathname]);

  return null;
}
