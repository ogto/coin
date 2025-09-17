"use client";

import CryptoInteractiveHero from "@/sections/Hero";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-[#05070B] text-white">
      {/* Hero Section */}
      <CryptoInteractiveHero />

      {/* About Section (placeholder) */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-6 text-center text-3xl font-semibold sm:text-4xl"
        >
          우리의 비전
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center text-white/70"
        >
          우리는 블록체인 데이터, 뉴스 시그널, 퀀트 인디케이터를 결합해
          시장을 한눈에 볼 수 있는 차세대 투자 플랫폼을 만듭니다.
        </motion.p>
      </section>

      {/* Features Section (placeholder) */}
      <section className="relative z-10 bg-gradient-to-b from-[#0A0D12] to-[#05070B] px-6 py-24">
        <div className="mx-auto max-w-6xl grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "온체인 데이터",
              desc: "실시간 네트워크 트랜잭션과 지갑 분석 제공",
            },
            {
              title: "AI 뉴스 분석",
              desc: "자연어 처리 기반 시장 뉴스 시그널",
            },
            {
              title: "퀀트 인디케이터",
              desc: "변동성 지표, 펀딩비율, 고급 전략 제공",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur"
            >
              <h3 className="mb-3 text-xl font-semibold">{f.title}</h3>
              <p className="text-sm text-white/70">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 border-t border-white/10 bg-[#05070B] px-6 py-12 text-center text-sm text-white/50">
        © {new Date().getFullYear()} ogto. All rights reserved.
      </footer>
    </main>
  );
}
