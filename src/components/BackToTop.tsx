"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollTop}
      aria-label="맨 위로"
      className={`fixed bottom-6 right-6 z-[60] cursor-pointer rounded-full border border-black/10 bg-white p-3 shadow-lg transition
      hover:-translate-y-0.5 hover:shadow-xl ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="text-black/70"
      >
        <path
          fill="currentColor"
          d="M12 5l7 7-1.4 1.4L13 8.8V20h-2V8.8L6.4 13.4 5 12z"
        />
      </svg>
    </button>
  );
}
