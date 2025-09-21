"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RouteKey({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const search = useSearchParams();
  useEffect(() => { document.body.style.overflow = ""; }, [pathname, search]);
  return <div key={pathname + "?" + search.toString()}>{children}</div>;
}
