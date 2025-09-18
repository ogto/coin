"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={[
        "fixed inset-x-0 top-0 z-50",
        "backdrop-blur-sm transition-all",
        scrolled ? "bg-white/85 shadow-[0_6px_30px_rgba(15,23,42,0.08)]" : "bg-white/65",
      ].join(" ")}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
        {/* Left: brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[#34d399] text-[#0b1220] font-bold">N</div>
          <span className="text-[15px] font-semibold tracking-tight text-[#0b1220]">ogto Invest</span>
        </Link>

        {/* Right: nav */}
        <nav className="hidden items-center gap-6 sm:flex">
          <a href="#features" className="text-sm text-[#0b1220]/80 hover:text-[#0b1220]">기능</a>
          <a href="#how" className="text-sm text-[#0b1220]/80 hover:text-[#0b1220]">작동방식</a>
          <a href="#cases" className="text-sm text-[#0b1220]/80 hover:text-[#0b1220]">레퍼런스</a>
          <a
            href="#contact"
            className="rounded-lg bg-[#34d399] px-4 py-2 text-sm font-semibold text-[#0b1220] shadow-sm hover:brightness-105"
          >
            데모요청
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
