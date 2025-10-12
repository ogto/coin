"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Compass,
  Database,
  LifeBuoy,
  Menu as MenuIcon,
  LogIn,
  X, // ⬅️ 닫기 아이콘 사용
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
      { title: "회사 개요", href: "/about#overview" },
      { title: "비전과 미션", href: "/about#vision" },
      { title: "대표 인사말", href: "/about#greeting" },
      { title: "경영 철학", href: "/about#philosophy" },
    ],
  },
  {
    key: "services",
    title: "서비스 안내",
    icon: <Compass className="h-5 w-5" />,
    items: [
      { title: "국내주식 정보", href: "/services#kr-equity" },
      { title: "해외주식/선물", href: "/services#global" },
      { title: "디지털자산", href: "/services#digital" },
      { title: "투자교육", href: "/services#edu" },
    ],
  },
  {
    key: "providers",
    title: "시장 데이터 제공처",
    icon: <Database className="h-5 w-5" />,
    items: [
      { title: "국내 증권사", href: "/providers#domestic" },
      { title: "증권거래소", href: "/providers#exchange" },
      { title: "해외선물 거래소", href: "/providers#futures" },
      { title: "디지털자산 거래소", href: "/providers#crypto" },
    ],
  },
  {
    key: "insight",
    title: "인사이트 센터",
    icon: <Database className="h-5 w-5" />,
    items: [
      { title: "시장 리포트", href: "/report" },
      { title: "전문가 시장분석", href: "/report" },
      { title: "리스크 관리 가이드", href: "/report" },
      { title: "AI 기반 데이터", href: "/report" },
    ],
  },
  {
    key: "support",
    title: "고객 지원",
    icon: <LifeBuoy className="h-5 w-5" />,
    items: [
      { title: "공지사항", href: "/notice" },
      { title: "자주 묻는 질문", href: "/faq" },
      { title: "문의하기", href: "/consult" },
    ],
  },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// =========================
// 헤더
// =========================
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[999] h-16 bg-[#0b1220]/95 backdrop-blur-sm transition-colors",
        scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.45)]" : "",
      ].join(" ")}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* 좌측: 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="BUNNY STOCK"
            width={60}
            height={62}
            priority
          />
        </Link>

        {/* 가운데: 메뉴 (데스크탑) */}
        {/* 권장 간격: 20px -> gap-5 적용 */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-12">
          {SECTIONS.map((sec) => (
            <div
              key={sec.key}
              className="relative"
              onMouseEnter={() => setActive(sec.key)}
              onMouseLeave={() => setActive(null)}
            >
              <button
                className={`text-[20px] font-semibold transition px-2  /* ⬅️ 시각적 여백 보강 */
                  ${
                    pathname.startsWith(`/${sec.key}`)
                      ? "text-emerald-300"
                      : "text-white/80 hover:text-white"
                  }`}
              >
                {sec.title}
              </button>

              <AnimatePresence>
                {active === sec.key && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: EASE_OUT }}
                    className="absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 w-44 rounded-lg border border-white/10 bg-[#0b1220]/95 shadow-lg backdrop-blur-sm"
                  >
                    <ul className="py-1">
                      {sec.items.map((it) => (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            className="block px-3 py-1.5 text-[18px] leading-5 text-white/75 hover:bg-white/10 hover:text-white text-center"
                          >
                            {it.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* 우측: 상담 버튼 + 모바일 트리거 */}
        <div className="flex items-center gap-2">
          <Link
            href="/consult"
            className="
              inline-flex items-center justify-center gap-2 whitespace-nowrap
              h-11 px-4 text-[15px] leading-none  /* ⬅ 모바일 동일 크기 */
              md:h-9 md:px-3 md:text-[14px]       /* ⬅ 데스크탑에서만 축소 */
              rounded-xl bg-emerald-400/95
              font-semibold text-[#0b1220]
              shadow-[0_6px_18px_rgba(0,0,0,.22)]
              hover:bg-emerald-500 transition
              select-none
            "
          >
            <LogIn className="h-5 w-5 md:h-4 md:w-4 -ml-0.5" />
            상담신청
          </Link>

          <MobileTrigger onOpen={() => setMobileOpen(true)} />
        </div>
      </div>

      {/* 모바일 드로워 */}
      <MobileDrawer
        sections={SECTIONS}
        open={mobileOpen}
        onOpenChange={setMobileOpen}
      />
    </header>
  );
}

// =========================
// 모바일 트리거
// =========================
function MobileTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      aria-label="모바일 전체메뉴 열기"
      className="
        md:hidden inline-flex items-center justify-center gap-2
        h-11 min-w-[44px] rounded-xl
        px-4 text-[15px] font-semibold text-[#0b1220]
        border border-black/10 bg-white/90 shadow-sm
        touch-manipulation select-none
        active:scale-[0.98] transition
        [-webkit-tap-highlight-color:transparent]
      "
    >
      <MenuIcon className="h-5 w-5" />
      메뉴
    </button>
  );
}

// =========================
// 모바일 드로워
// =========================
function MobileDrawer({
  sections,
  open,
  onOpenChange,
}: {
  sections: Section[];
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* 배경 */}
          <div
            className="fixed inset-0 z-[70] h-screen bg-black/40"
            onClick={() => onOpenChange(false)}
          />

          {/* 패널 */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="
              fixed inset-y-0 right-0 z-[80] h-screen w-[90%] max-w-sm
              overflow-auto border-l border-black/10 bg-white
              pt-[calc(env(safe-area-inset-top)+12px)]
              pb-[calc(env(safe-area-inset-bottom)+12px)]
              px-5
            "
          >
            {/* 닫기 버튼 (고정형) */}
            <button
              onClick={() => onOpenChange(false)}
              aria-label="닫기"
              className="
                absolute top-[calc(env(safe-area-inset-top)+8px)] right-5
                z-[90] grid place-items-center
                h-10 w-10 rounded-full
                border border-black/10 bg-white shadow-sm
                text-[#0b1220]/80
                touch-manipulation active:scale-95
                transition
                [-webkit-tap-highlight-color:transparent]
              "
            >
              <X className="h-5 w-5" />
            </button>

            {/* 본문 콘텐츠 */}
            <nav className="mt-12 space-y-4">
              {sections.map((sec) => (
                <div
                  key={sec.key}
                  className="rounded-2xl border border-black/10 bg-white p-4"
                >
                  <div className="mb-2 flex items-center gap-3 text-[15px] font-semibold text-[#0b1220]">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                      {sec.icon}
                    </span>
                    {sec.title}
                  </div>
                  <ul className="divide-y divide-black/5 text-[15px]">
                    {sec.items.map((it) => (
                      <li key={it.href}>
                        <Link
                          href={it.href}
                          onClick={() => onOpenChange(false)}
                          className="
                            block min-h-[48px] py-3.5 px-1 text-[#0b1220]/90
                            touch-manipulation focus:outline-none
                            focus-visible:ring-2 focus-visible:ring-emerald-500/60 rounded-md
                          "
                        >
                          <div className="font-medium">{it.title}</div>
                          {it.desc && (
                            <div className="text-[13px] text-black/55 mt-0.5">
                              {it.desc}
                            </div>
                          )}
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
  );
}
