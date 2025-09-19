"use client";

import { motion } from "framer-motion";

const HEADER_H = 64; // px (h-16)

export default function Hero() {
  return (
    <section
      className="
        relative w-full overflow-hidden bg-black
        mt-16                        // 헤더 높이만큼 아래로 내림 (h-16 = 64px)
        h-[calc(100dvh-64px)]        // 보이는 화면에서 헤더 높이만큼 뺀 높이
        md:h-[calc(100vh-64px)]      // 데스크탑 폴백
      "
    >
      {/* 폴백: 일부 브라우저에서 svh 미지원 시 */}
      <div
        className="absolute inset-0"
        style={{ height: `calc(100vh - ${HEADER_H}px)` }}
        aria-hidden
      />

      {/* 비디오 배경 */}
      <video
        className="absolute inset-0 h-full w-full object-cover [filter:contrast(1.1)_saturate(1.15)]"
        src="/videos/main.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 가독성 오버레이 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45),rgba(0,0,0,0.25)_30%,rgba(0,0,0,0.25)_70%,rgba(0,0,0,0.55))]" />
        <div className="absolute inset-0 [background:radial-gradient(80%_60%_at_50%_40%,rgba(0,0,0,0.0),rgba(0,0,0,0.35))]" />
      </div>

      {/* 콘텐츠: 상단 고정 헤더 높이만큼 패딩을 줄 필요 없음(이미 높이에서 제외) */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-4xl text-white">
          {/* 라벨 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-sm tracking-wide"
            style={{ backdropFilter: "blur(4px)" }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            NEXT-GEN INVESTING
          </motion.div>

          {/* 헤드라인 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.55 }}
            className="mt-6 text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl"
            style={{ textShadow: "0 20px 45px rgba(0,0,0,.5), 0 6px 16px rgba(0,0,0,.4), 0 1px 0 rgba(0,0,0,.7)" }}
          >
            데이터로 신뢰를 <br /> 설계하는 <br />
            당신의 투자 파트너
          </motion.h1>

          {/* 브랜드 라인 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
            className="mt-6 flex items-center gap-4"
            style={{ textShadow: "0 10px 28px rgba(0,0,0,.45), 0 3px 10px rgba(0,0,0,.35)" }}
          >
            <div className="grid h-12 w-12 place-items-center rounded-full border border-white/50 bg-white/20">
              <span className="text-xl font-bold">BS</span>
            </div>
            <div className="leading-tight">
              <div className="text-3xl font-semibold tracking-wide">BUNNY STOCK</div>
              <div className="text-sm opacity-90">버니스탁</div>
            </div>
          </motion.div>

          {/* 보조 문구 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
            className="mt-5 max-w-2xl text-base text-white/90 sm:text-lg lg:text-xl"
            style={{ textShadow: "0 12px 30px rgba(0,0,0,.5), 0 3px 8px rgba(0,0,0,.4)" }}
          >
            우리는 시장의 신호를 가장 먼저 포착하고, 데이터와 인텔리전스로 불확실성을 관리합니다.
            전문적이고 체계적인 분석을 바탕으로, 변동성 속에서도 흔들리지 않는 투자 경험을 제공합니다.
          </motion.p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <motion.a
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              href="#consult"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-400/95 px-6 py-4 text-base font-semibold text-[#0b1220] shadow-[0_12px_32px_rgba(0,0,0,.3)] sm:text-lg"
            >
              상담 신청
            </motion.a>
            {/* <motion.a
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.65 }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              href="#"
              className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/15 px-6 py-4 text-base font-semibold text-white backdrop-blur sm:text-lg"
            >
              투자 전략 보기
            </motion.a> */}
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 (원한다면 유지) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex items-center gap-3 text-white/85" style={{ textShadow: "0 6px 20px rgba(0,0,0,.5)" }}>
          <span className="text-lg font-medium">Scroll</span>
          <span className="relative inline-block h-10 w-5 rounded-full border-2 border-white/70">
            <span className="absolute left-1/2 top-2 h-2.5 w-2.5 -translate-x-1/2 animate-bounce rounded-full bg-white/90" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
