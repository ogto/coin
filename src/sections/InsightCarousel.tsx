"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Newspaper,
  BarChart3,
  ShieldCheck,
  Cpu,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
} from "lucide-react";

type Slide = {
  icon: React.ReactNode;
  title: string;
  subtitle: string; // \n 줄바꿈 가능
  tag?: string;
  bg: string;
};

const AUTOPLAY_MS = 4200;
const EASE = [0.22, 1, 0.36, 1] as const;
const CARD_MAX_W = 680; // px: 카드 기준 폭(화살표 정렬과 동일 기준)

const SLIDES: Slide[] = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "주간/월간 리서치 리포트",
    subtitle:
      "매주, 매월 발간되는 정밀 분석 리포트\n시장 흐름을 한눈에 읽고,\n앞서가는 기회를 포착하세요.",
    tag: "RESEARCH",
    bg: "/images/1.jpg",
  },
  {
    icon: <Newspaper className="h-6 w-6" />,
    title: "전문가 인사이트",
    subtitle:
      "경험과 데이터가 결합된 인사이트\n단순한 뉴스가 아닌,\n시장의 본질을 꿰뚫는 해석을 제공합니다.",
    tag: "FEATURED",
    bg: "/images/2.jpg",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "리스크 관리 자료",
    subtitle:
      "불확실성 속에서도 안전한 길을 제시합니다.\n변동성을 분석하고, 위험을 관리하는 전략적 자료.",
    tag: "RISK",
    bg: "/images/3.jpg",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "AI 기반 분석 시스템",
    subtitle:
      "AI 알고리즘과 자체 개발 프로그램을 통한 정밀 분석\n누구보다 빠르고 깊이 있는 시장 이해를 제공합니다.",
    tag: "AI",
    bg: "/images/4.jpg",
  },
];

export default function InsightCarouselSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SLIDES.length;

  // ── autoplay
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((n) => (n + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, count]);

  // ── swipe
  const startX = useRef(0);
  const deltaX = useRef(0);
  const dragging = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    deltaX.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setPaused(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    deltaX.current = e.clientX - startX.current;
  };
  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const th = 60;
    if (deltaX.current > th) prev();
    else if (deltaX.current < -th) next();
    setPaused(false);
  };

  const next = () => setIndex((n) => (n + 1) % count);
  const prev = () => setIndex((n) => (n - 1 + count) % count);

  // 헤더 진행률
  const progress = useMemo(() => (index + 1) / count, [index, count]);

  return (
    <section
      className="relative overflow-hidden bg-white py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 배경 밀도 보강 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 60% at 0% 0%, rgba(16,185,129,0.14), transparent 60%), radial-gradient(80% 50% at 100% 0%, rgba(56,189,248,0.12), transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* 헤더 */}
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] text-black/45">
              <FlaskConical className="h-3.5 w-3.5" />
              HAEGANG LAB
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
              HaeGang Lab
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-black/60 sm:text-base">
              인사이트·리포트·리스크·AI 분석을 한 곳에서.
            </p>
          </div>

          <div className="hidden w-56 sm:block">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                key={index}
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>
            <div className="mt-2 text-right text-xs text-black/45">
              {index + 1} / {count}
            </div>
          </div>
        </div>

        {/* ───────────────────────── Centered Carousel ───────────────────────── */}
        <div className="relative">
          {/* 트랙: 각 슬라이드가 '전체폭'을 차지 → 항상 중앙에 카드 */}
          <motion.div
            className="flex"
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            animate={{ x: `${-index * 100}%` }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {SLIDES.map((s, i) => {
              const active = i === index;
              return (
                <div key={i} className="w-full flex-[0_0_100%]">
                  {/* 카드 컨테이너: 중앙 정렬 + 카드와 동일 max-w */}
                  <div className="relative mx-auto w-full px-3" style={{ maxWidth: CARD_MAX_W }}>
                    <SlideCard slide={s} active={active} />

                    {/* 화살표: 카드 컨테이너 기준으로 양옆에 딱 붙임 */}
                    {active && (
                      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between">
                        <button
                          onClick={prev}
                          className="pointer-events-auto -ml-6 grid h-10 w-10 place-items-center rounded-full bg-white shadow ring-1 ring-black/10 hover:-translate-y-[1px] transition cursor-pointer"
                          aria-label="이전 슬라이드"
                        >
                          <ChevronLeft className="h-5 w-5 text-black/70" />
                        </button>
                        <button
                          onClick={next}
                          className="pointer-events-auto -mr-6 grid h-10 w-10 place-items-center rounded-full bg-white shadow ring-1 ring-black/10 hover:-translate-y-[1px] transition cursor-pointer"
                          aria-label="다음 슬라이드"
                        >
                          <ChevronRight className="h-5 w-5 text-black/70" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* 도트 네비 */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                i === index ? "w-6 bg-emerald-500" : "w-2.5 bg-black/20 hover:bg-black/30"
              }`}
              aria-label={`${i + 1}번 슬라이드로 이동`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SlideCard({ slide, active }: { slide: Slide; active: boolean }) {
  const topPad = slide.tag ? "pt-12 sm:pt-14" : "";

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_12px_40px_rgba(8,15,40,0.10)] backdrop-blur"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {/* 오른쪽 배경 이미지 */}
      <div className="absolute inset-y-0 right-0 w-1/2">
        <Image
          src={slide.bg}
          alt=""
          fill   // 부모 relative에서 꽉 채우기
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0  from-white/80 to-transparent" />
      </div>

      {/* 라벨칩 */}
      {slide.tag && (
        <div className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/95 px-3 py-1 text-[11px] font-semibold tracking-wide text-black/70 shadow-sm">
          {slide.tag}
        </div>
      )}

      {/* 본문 */}
      <div
        className={`relative z-10 grid min-h-[260px] grid-rows-[auto_1fr_auto] p-6 sm:p-8 ${topPad}`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 ring-1 ring-inset ring-emerald-200 text-emerald-600">
            {slide.icon}
          </div>
          <h3 className="text-lg font-extrabold tracking-tight text-black sm:text-xl">
            {slide.title}
          </h3>
        </div>

        <p className="whitespace-pre-line text-[13px] leading-6 text-black/70 sm:text-sm max-w-[60%]">
          {slide.subtitle}
        </p>

        {/* 진행 인디케이터 */}
        <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-black/10">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            key={active ? "active" : "inactive"}
            initial={{ width: 0 }}
            animate={{ width: active ? "100%" : "0%" }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
          />
        </div>
      </div>
    </motion.article>
  );
}

