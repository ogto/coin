"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Compass,
  LineChart,
  Database,
  LifeBuoy,
  Scale,
  MapPin,
  LogIn,
  Menu as MenuIcon,
} from "lucide-react";
import Image from "next/image";

// =========================
// 메뉴 데이터
// =========================

type SubItem = { title: string; href: string; desc?: string };

type Section = {
  key: string;
  title: string;
  icon: React.ReactNode;
  items: SubItem[];
};

const SECTIONS: Section[] = [
  {
    key: "about",
    title: "회사 소개",
    icon: <Building2 className="h-5 w-5" />,
    items: [
      { title: "회사 개요", href: "/about#overview", desc: "연혁·조직·핵심가치" },
      { title: "비전과 미션", href: "/about#vision", desc: "우리가 지향하는 방향" },
      { title: "대표 인사말", href: "/about#greeting", desc: "메시지와 약속" },
      { title: "경영 철학", href: "/about#philosophy", desc: "의사결정 원칙" },
    ],
  },
  {
    key: "services",
    title: "서비스 안내",
    icon: <Compass className="h-5 w-5" />,
    items: [
      { title: "국내주식 정보", href: "/services#kr-equity", desc: "실시간 체결·체크포인트" },
      { title: "해외주식/선물", href: "/services#global", desc: "거시·섹터·상품 연동" },
      { title: "디지털자산", href: "/services#digital", desc: "온체인+마켓 마이닝" },
      { title: "투자교육", href: "/services#edu", desc: "커리큘럼·워크숍" },
    ],
  },
  {
    key: "research",
    title: "리서치 센터",
    icon: <LineChart className="h-5 w-5" />,
    items: [
      { title: "주간/월간 리포트", href: "/research#reports", desc: "핵심지표 요약" },
      { title: "전문가 분석", href: "/research#analysis", desc: "차트·내러티브" },
      { title: "리스크 가이드", href: "/research#risk", desc: "헤지·시나리오" },
      { title: "AI 데이터 분석", href: "/research#ai", desc: "시그널·스코어" },
    ],
  },
  {
    key: "providers",
    title: "시장 데이터 제공처",
    icon: <Database className="h-5 w-5" />,
    items: [
      { title: "국내 증권사", href: "/providers#domestic", desc: "브로커 커버리지" },
      { title: "증권거래소", href: "/providers#exchange", desc: "레퍼런스·지수" },
      { title: "해외선물 거래소", href: "/providers#futures", desc: "글로벌 상품" },
      { title: "디지털자산 거래소", href: "/providers#crypto", desc: "현물·파생" },
    ],
  },
  {
    key: "support",
    title: "고객 지원",
    icon: <LifeBuoy className="h-5 w-5" />,
    items: [
      { title: "공지사항", href: "/support#notice", desc: "업데이트·점검" },
      { title: "자주 묻는 질문", href: "/support#faq", desc: "빠른 해결" },
      { title: "문의하기", href: "/support#contact", desc: "1:1 상담" },
    ],
  },
  {
    key: "legal",
    title: "법적 안내",
    icon: <Scale className="h-5 w-5" />,
    items: [
      { title: "유사투자자문 고지", href: "/legal#advisory", desc: "법·규정 안내" },
      { title: "투자 위험 고지", href: "/legal#risk", desc: "손실 가능성" },
      { title: "개인정보처리방침", href: "/legal#privacy", desc: "데이터 보호" },
      { title: "서비스 이용약관", href: "/legal#tos", desc: "권리·의무" },
    ],
  },
];

// =========================
// 헤더 컴포넌트 (확대/인터랙션 강화)
// =========================

export default function HeaderBankStyle() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [spot, setSpot] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC & 바깥 클릭 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  // 호버 인텐트 (덜 튐)
  useEffect(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    hoverTimer.current = setTimeout(() => setOpen(hovering), hovering ? 60 : 160);
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, [hovering]);

  return (
<header
  className={[
    "fixed inset-x-0 top-0 z-[999] h-16 bg-[#0b1220]/95 backdrop-blur-sm transition-colors",
    scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.45)]" : "",
  ].join(" ")}
>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* 좌: 로고 + 전체메뉴(데스크탑 전용) */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="BUNNY STOCK"
              width={120}
              height={32}
              priority                 // 로고는 퍼스트 로드 최적화
            />
          </Link>

          <button
            ref={btnRef}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/90 px-4 py-2.5 text-[14px] font-semibold text-[#0b1220] shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
          >
            <MenuIcon className="h-4.5 w-4.5 opacity-70" /> 전체메뉴
          </button>
        </div>

        {/* 우: 로그인 + 모바일 메뉴 묶음 */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white/90 px-3.5 py-2 text-[14px] font-semibold text-[#0b1220] shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
          >
            <LogIn className="h-4.5 w-4.5" /> 로그인
          </Link>

          <MobileTrigger onOpen={() => setOpen(true)} />
        </div>
      </div>

      {/* Mega Panel (크고 인터랙티브) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mega"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative hidden sm:block"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <motion.div
                ref={panelRef}
                onMouseMove={(e) => {
                  const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  setSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
                }}
                className="mt-3 overflow-hidden rounded-3xl border border-black/10 bg-white/95 shadow-[0_32px_100px_rgba(8,15,40,0.18)] backdrop-blur"
                style={{
                  backgroundImage: `radial-gradient(220px 180px at ${spot.x}px ${spot.y}px, rgba(16,185,129,0.13), transparent 60%)`,
                }}
              >
                <motion.div layoutId="menu-highlight" className="h-[5px] w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400" />

                {/* 섹션 카드 스타일: 더 크게, 터치/클릭 영역 확대 */}
                <motion.div
                  className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: { transition: { staggerChildren: 0.04 } }, show: { transition: { staggerChildren: 0.06 } } }}
                >
                  {SECTIONS.map((sec) => (
                    <motion.div
                      key={sec.key}
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[0_2px_10px_rgba(8,15,40,0.06)] transition hover:shadow-[0_14px_36px_rgba(8,15,40,0.12)]"
                    >
                      <div className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-[#0b1220]">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600">{sec.icon}</span>
                        {sec.title}
                      </div>
                      <ul className="space-y-1.5">
                        {sec.items.map((it) => (
                          <li key={it.href}>
                            <Link
                              href={it.href}
                              className="group block rounded-xl px-3 py-2.5 transition hover:bg-black/5"
                              onClick={() => setOpen(false)}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="truncate text-[14.5px] font-medium text-[#0b1220]">{it.title}</div>
                                  {it.desc && <div className="mt-0.5 line-clamp-1 text-[12.5px] text-black/55">{it.desc}</div>}
                                </div>
                                <motion.span
                                  aria-hidden
                                  initial={{ x: -2, opacity: 0 }}
                                  whileHover={{ x: 0, opacity: 1 }}
                                  className="ml-2 inline-block text-[#0b1220]/50"
                                >
                                  →
                                </motion.span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 모바일 드로워: 독립 상태 관리 + 바디 스크롤 락 */}
      <MobileDrawer sections={SECTIONS} />
    </header>
  );
}

// =========================
// 모바일 트리거 (우측에만 노출)
// =========================
function MobileTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      className="md:hidden inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/90 px-3 py-2 text-[14px] font-semibold text-[#0b1220] shadow-sm"
      onClick={onOpen}
      aria-label="모바일 전체메뉴 열기"
    >
      <MenuIcon className="h-5 w-5" /> 메뉴
    </button>
  );
}

// =========================
// 모바일 드로워 (터치 개선, 바디 스크롤 락)
// =========================
function MobileDrawer({ sections }: { sections: Section[] }) {
  const [open, setOpen] = useState(false);

  // 바디 스크롤 락
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* 고정된 우측 하단 플로팅 트리거 (선택적): 필요시 주석 해제 */}
      {/* <button className="fixed bottom-4 right-4 z-[60] rounded-full bg-emerald-500 p-3 text-white shadow-lg md:hidden" onClick={() => setOpen(true)}>메뉴</button> */}

      <AnimatePresence>
        {open && (
          <motion.div key="mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden">
            <div className="fixed inset-0 z-[70] h-screen bg-black/40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed inset-y-0 right-0 z-[80] h-screen w-[90%] max-w-sm overflow-auto border-l border-black/10 bg-white p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-[16px] font-semibold">전체메뉴</div>
                <button onClick={() => setOpen(false)} aria-label="닫기" className="rounded-full border border-black/10 bg-white p-2">
                  <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              {/* 섹션 카드 리스트 (터치 영역 확대) */}
              <nav className="space-y-4">
                {sections.map((sec) => (
                  <div key={sec.key} className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-[#0b1220]">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600">{sec.icon}</span>
                      {sec.title}
                    </div>
                    <ul className="divide-y divide-black/5 text-[14.5px]">
                      {sec.items.map((it) => (
                        <li key={it.href}>
                          <Link href={it.href} className="block px-1 py-3 text-[#0b1220]/90" onClick={() => setOpen(false)}>
                            <div className="font-medium">{it.title}</div>
                            {it.desc && <div className="text-[12.5px] text-black/55">{it.desc}</div>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 헤더의 모바일 버튼과 연결 */}
      <HeaderMobileBridge onOpen={() => setOpen(true)} />
    </>
  );
}

// 헤더의 모바일 트리거와 드로워 상태를 연결하기 위한 브릿지
function HeaderMobileBridge({ onOpen }: { onOpen: () => void }) {
  useEffect(() => {
    const btn = document.querySelector("button[aria-label='모바일 전체메뉴 열기']");
    if (!btn) return;
    const handler = () => onOpen();
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, [onOpen]);
  return null;
}
