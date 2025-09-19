"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type MenuItem = { href: string; title: string; desc?: string; icon?: string };
const MENU: MenuItem[] = [
  { href: "#features", title: "기능", desc: "온체인·뉴스·퀀트 실시간 분석", icon: "⚙️" },
  { href: "#how", title: "작동방식", desc: "수집 → 정제 → 스코어링 → 알림", icon: "🧭" },
  { href: "#cases", title: "레퍼런스", desc: "인사이트 적용 사례", icon: "📊" },
  { href: "#contact", title: "상담신청", desc: "비대면 무료 컨설팅", icon: "💬" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // desktop
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // ✅ 타이머 타입을 cross-env 안전하게
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // spotlight
  const [spot, setSpot] = useState({ x: 0, y: 0 });

  // mobile
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 바깥 클릭 닫기
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  // ESC 닫기
  useEffect(() => {
    if (!open && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mobileOpen]);

  // ✅ 호버 인텐트 (항상 cleanup 함수 반환)
  useEffect(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    hoverTimer.current = setTimeout(() => {
      setOpen(hovering);
    }, hovering ? 80 : 180);

    return () => {
      if (hoverTimer.current) {
        clearTimeout(hoverTimer.current);
        hoverTimer.current = null;
      }
    };
  }, [hovering]);

  const measureAnchor = () => {
    const el = btnRef.current;
    if (!el) return;
    setAnchorRect(el.getBoundingClientRect());
  };
  useEffect(() => {
    measureAnchor();
    window.addEventListener("resize", measureAnchor);
    return () => window.removeEventListener("resize", measureAnchor);
  }, []);

  const connectorStyle =
    anchorRect && typeof window !== "undefined"
      ? { left: anchorRect.left + window.scrollX, width: anchorRect.width }
      : { left: 0, width: 0 };

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[999] h-16",
        "backdrop-blur-sm transition-colors",
        scrolled ? "bg-white/85 shadow-[0_6px_30px_rgba(15,23,42,0.08)]" : "bg-white/70",
      ].join(" ")}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-400 font-bold text-[#0b1220]">N</div>
          <span className="text-[15px] font-semibold tracking-tight text-[#0b1220]">BUNNY STOCK</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* mobile trigger */}
          <button
            className="sm:hidden rounded-lg border border-black/10 bg-white/80 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="전체메뉴 열기"
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"/></svg>
          </button>

          {/* desktop trigger (hover) */}
          <button
            ref={btnRef}
            onMouseEnter={() => { setHovering(true); measureAnchor(); }}
            onMouseLeave={() => setHovering(false)}
            aria-expanded={open}
            aria-haspopup="menu"
            className="group hidden cursor-pointer items-center gap-2 rounded-lg border border-black/10 bg-white/85 px-3 py-2 text-sm font-semibold text-[#0b1220] shadow-sm transition hover:-translate-y-[1px] hover:shadow-md sm:inline-flex"
          >
            전체메뉴
            <svg width="16" height="16" viewBox="0 0 24 24" className={`transition ${open ? "rotate-180" : ""}`}>
              <path fill="currentColor" d="M12 15l-6-6h12z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop connector + dropdown */}
      <div className="absolute inset-x-0 top-16 hidden sm:block">
        {/* connector bar */}
        <AnimatePresence>
          {open && anchorRect && (
            <motion.div key="connector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative mx-auto max-w-7xl">
              <motion.div
                layoutId="menu-connector"
                style={{ position: "absolute", height: 4, top: -3, ...connectorStyle }}
                className="rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 shadow-[0_0_28px_rgba(16,185,129,0.55)]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <motion.div
                  ref={panelRef}
                  // ✅ 패널 자체에 호버 유지 핸들러 부착
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  onMouseMove={(e) => {
                    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                    setSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
                  }}
                  layout
                  className="pointer-events-auto mt-3 overflow-hidden rounded-2xl border border-black/10 bg-white/95 shadow-[0_28px_80px_rgba(8,15,40,0.16)] backdrop-blur"
                  style={{
                    backgroundImage: `radial-gradient(180px 160px at ${spot.x}px ${spot.y}px, rgba(16,185,129,0.12), transparent 60%)`,
                  }}
                >
                  <motion.div layoutId="menu-highlight" className="h-[4px] w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400" />

                  <motion.div
                    className="grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-4"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                      show:   { transition: { staggerChildren: 0.06 } },
                    }}
                  >
                    {MENU.map((m) => (
                      <motion.div
                        key={m.href}
                        variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                      >
                        <Link
                          href={m.href}
                          onClick={() => setOpen(false)}
                          className="group block rounded-xl border border-black/10 bg-white/80 p-4 shadow-[0_2px_10px_rgba(8,15,40,0.06)] transition hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(8,15,40,0.12)]"
                          style={{
                            background:
                              "linear-gradient(0deg, rgba(255,255,255,0.9), rgba(255,255,255,0.9)) padding-box, linear-gradient(135deg, rgba(16,185,129,0.25), rgba(56,189,248,0.25)) border-box",
                            border: "1px solid transparent",
                          }}
                        >
                          <div className="mb-3 flex items-center gap-3">
                            <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-emerald-50 to-cyan-50 text-[18px]">
                              {m.icon ?? "•"}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-[16px] font-semibold text-[#0b1220]">{m.title}</div>
                              {m.desc && <div className="line-clamp-2 text-[13px] text-black/60">{m.desc}</div>}
                            </div>
                          </div>

                          <div className="relative mt-2 h-[3px] w-full overflow-hidden rounded-full bg-black/5">
                            <span className="absolute inset-y-0 left-0 w-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div key="mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="sm:hidden">
            <div className="fixed inset-0 z-[70] bg-black/30 h-screen" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed inset-y-0 right-0 z-[80] h-screen w-[88%] max-w-sm overflow-auto border-l border-black/10 bg-white p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-base font-semibold">전체메뉴</div>
                <button onClick={() => setMobileOpen(false)} aria-label="닫기" className="rounded-full border border-black/10 bg-white p-2">
                  <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <nav className="space-y-2">
                {MENU.map((m) => (
                  <Link
                    key={m.href}
                    href={m.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-black/10 bg-white p-4"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-[#0b1220]">{m.title}</div>
                      {m.desc && <div className="line-clamp-1 text-xs text-black/55">{m.desc}</div>}
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" className="text-black/50"><path fill="currentColor" d="M10 17l5-5-5-5v10z" /></svg>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
