"use client";

import { motion } from "framer-motion";

const HEADER_H = 64; // 헤더 높이 (고정)

export default function Hero() {
  return (
    <section
      className="
        relative w-full overflow-hidden bg-black
        h-[calc(100dvh-64px)]
        md:h-[calc(100vh-64px)]
      "
    >
      {/* 폴백 높이 */}
      <div
        className="absolute inset-0"
        style={{ height: `calc(100vh - ${HEADER_H}px)` }}
        aria-hidden
      />

      {/* 비디오 배경 */}
      <video
        className="absolute inset-0 h-full w-full object-cover [filter:contrast(1.15)_saturate(1.25)]"
        src="/videos/main.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 오버레이 (가독성 보정) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.25)_30%,rgba(0,0,0,0.25)_70%,rgba(0,0,0,0.6))]" />
        <div className="absolute inset-0 [background:radial-gradient(80%_60%_at_50%_40%,rgba(0,0,0,0.0),rgba(0,0,0,0.4))]" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-4xl text-white">
          {/* 라벨 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-5 py-2 text-sm font-semibold tracking-wide"
            style={{ backdropFilter: "blur(4px)" }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            NEXT-GEN INVESTING
          </motion.div>

          {/* 헤드라인 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="mt-6 text-3xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
            style={{
              textShadow:
                "0 20px 45px rgba(0,0,0,.6), 0 6px 16px rgba(0,0,0,.45), 0 1px 0 rgba(0,0,0,.9)",
            }}
          >
            데이터로 신뢰를 <br /> 설계하는 <br />
            당신의 투자 파트너
          </motion.h1>

          {/* 브랜드 라인 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
            className="mt-6 flex items-center gap-4"
            style={{
              textShadow:
                "0 10px 28px rgba(0,0,0,.5), 0 3px 10px rgba(0,0,0,.4)",
            }}
          >
            <div className="grid h-12 w-12 place-items-center rounded-full border border-white/60 bg-white/20">
              <span className="text-xl font-bold">BS</span>
            </div>
            <div className="leading-tight">
              <div className="text-3xl font-semibold tracking-wide">
                Hae Gang
              </div>
              <div className="text-sm opacity-90">버니스탁</div>
            </div>
          </motion.div>

          {/* 보조 문구 (제목과 24px 간격) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
            className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-white/95"
            style={{
              textShadow:
                "0 12px 30px rgba(0,0,0,.55), 0 3px 8px rgba(0,0,0,.4)",
            }}
          >
            시장의 흐름을 누구보다 빠르게 읽고,<br />
            데이터와 인텔리전스로 불확실성을 분석합니다.<br />
            체계적인 리서치를 바탕으로, 변동성 속에서도 합리적인 투자 판단을 지원합니다.
          </motion.p>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="pointer-events-none absolute bottom-8 sm:bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div
          className="flex items-center gap-3 text-white/90"
          style={{ textShadow: "0 6px 20px rgba(0,0,0,.6)" }}
        >
          <span className="text-lg font-semibold">Scroll</span>
          <span className="relative inline-block h-11 w-4 rounded-full border-2 border-white/70">
            <span className="absolute left-1/2 top-2 h-2.5 w-2.5 -translate-x-1/2 animate-bounce rounded-full bg-white/90" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
