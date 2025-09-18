"use client";

import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7fafc] text-[#0b1220]">

      <Header />
      {/* HERO */}
      <Hero />

      {/* About — A 톤(신뢰/담백) */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-6 text-center text-3xl font-semibold sm:text-4xl"
        >
          우리는 데이터 중심의 투자 파트너
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center text-[rgba(11,18,32,0.72)]"
        >
          빠르게 변하는 블록체인 시장에서, 검증된 지표와 투명한 프로세스로
          기회와 위험을 동시에 관리합니다. 수집→정제→스코어링→알림의
          일관된 파이프라인으로 실행 가능한 인사이트만 제공합니다.
        </motion.p>
      </section>

      {/* Features — C 톤(신기술) */}
      <section className="relative z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,transparent_100%)] px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "온체인 인텔리전스", desc: "트랜잭션·유동성·거래소 플로우를 실시간 감지" },
            { title: "AI 시그널", desc: "뉴스·커뮤니티 센티먼트를 교차 검증해 노이즈를 제거" },
            { title: "퀀트 지표", desc: "변동성·펀딩·모멘텀 스코어로 행동 가능한 신호 제공" },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/90 p-8 shadow-lg backdrop-blur"
            >
              <h3 className="mb-3 text-xl font-semibold">{f.title}</h3>
              <p className="text-sm text-[rgba(11,18,32,0.72)]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works — 단계 애니메이션 강조 */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-10 text-center text-3xl font-semibold sm:text-4xl"
        >
          어떻게 작동하나요
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "수집", d: "온체인/뉴스/커뮤니티/마켓 데이터를 통합 수집" },
            { t: "정제", d: "중복·스팸 제거, 이벤트 라벨링, 시계열 정규화" },
            { t: "스코어링", d: "퀀트 지표/AI 모델로 신호 점수화" },
            { t: "알림", d: "임계치 돌파 시 실시간 푸시/리포트 발행" },
          ].map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/85 p-6"
            >
              <div className="mb-2 text-sm font-medium text-[rgba(11,18,32,0.6)]">Step {i + 1}</div>
              <div className="text-lg font-semibold">{s.t}</div>
              <div className="mt-1 text-sm text-[rgba(11,18,32,0.72)]">{s.d}</div>
              <div
                className="pointer-events-none absolute -right-3 -top-3 h-12 w-12 rounded-full"
                style={{
                  background:
                    i % 2 === 0
                      ? "radial-gradient(circle, rgba(34,211,238,0.35), transparent)"
                      : "radial-gradient(circle, rgba(52,211,153,0.35), transparent)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/90 p-10 text-center shadow-lg">
          <h3 className="text-2xl font-semibold">데이터로 설명되는 투자</h3>
          <p className="mt-2 text-[rgba(11,18,32,0.72)]">
            노이즈를 줄이고 신호에 집중하세요. 지금 데모를 요청하면 샘플 인사이트를 함께 보내드립니다.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl bg-[#34d399] px-6 py-3 text-sm font-semibold text-[#0b1220] shadow-md"
            >
              데모 요청하기
            </a>
            <a
              id="whitepaper"
              href="#"
              className="inline-flex items-center justify-center rounded-xl border border-[rgba(15,23,42,0.08)] bg-white px-6 py-3 text-sm font-semibold"
            >
              화이트페이퍼 보기
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[rgba(15,23,42,0.08)] bg-[#f7fafc] px-6 py-12 text-center text-sm text-[rgba(11,18,32,0.6)]">
        © {new Date().getFullYear()} ogto. All rights reserved.
      </footer>
    </main>
  );
}
