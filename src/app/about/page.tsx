// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Building2,
  MessageSquareQuote,
  ShieldCheck,
  LineChart,
  Handshake,
  Info,
  Sparkles,
} from "lucide-react";

// ---- Framer Motion 공통 이징/바리언트
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#0b1220]">
      {/* 배경 글로우 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 35% at 0% 0%, rgba(16,185,129,.14), transparent), radial-gradient(50% 30% at 100% 0%, rgba(56,189,248,.12), transparent)",
        }}
      />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 sm:pt-24">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={{ once: true, margin: "-10%" }}
          transition={fadeUp.transition}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
        >
          <Sparkles className="h-3.5 w-3.5" /> 회사소개
        </motion.div>

        <motion.h1
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl"
        >
          Bunny Stock 주식회사
        </motion.h1>

        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-2 h-1 w-28 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"
        />
      </section>

      {/* 개요 + 인사말 */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2">
        {/* 회사 개요 */}
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={{ once: true, margin: "-10%" }}
          transition={fadeUp.transition}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_10px_40px_rgba(0,0,0,.25)]"
        >
          <div className="mb-3 flex items-center gap-2 text-emerald-300">
            <Info className="h-4.5 w-4.5" />
            <span className="text-sm font-semibold">회사 개요</span>
          </div>
          <p className="text-sm leading-7 text-white/85">
            Bunny Stock은 다양한 금융시장에 대한 전문적인 투자정보 서비스와 체계적인 교육을 제공하는 유사투자자문업체입니다.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-white/80">
            <Bullet>설립: 20XX년</Bullet>
            <Bullet>사업영역: 유사투자자문업 (금융위원회 신고)</Bullet>
            <Bullet>주요서비스: 투자정보, 시장분석, 투자교육</Bullet>
          </ul>
        </motion.div>

        {/* 대표 인사말 */}
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-amber-300">
            <MessageSquareQuote className="h-4.5 w-4.5" />
            <span className="text-sm font-semibold">대표 인사말</span>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-amber-300/30 bg-white/5">
              <Building2 className="h-9 w-9 text-amber-300" />
            </div>
            <div className="text-sm leading-6 text-white/80">
              “복잡한 금융시장에서 올바른 정보를 찾는 것이 중요합니다.{" "}
              <span className="font-semibold text-white">Bunny Stock</span>은 투자자가 스스로 판단할 수 있는 역량을
              기를 수 있도록 체계적인 교육과 정보를 제공합니다. 신뢰할 수 있는 파트너로서 여러분의 투자 여정에
              함께하겠습니다.”
              <div className="mt-3 text-right text-xs text-white/60">Bunny Stock 대표이사 OOO</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 경영 철학 */}
      <section className="relative mx-auto max-w-7xl px-6 py-6">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={{ once: true, margin: "-10%" }}
          transition={fadeUp.transition}
          className="mb-4 flex items-center gap-2 text-emerald-300"
        >
          <LineChart className="h-4.5 w-4.5" />
          <span className="text-sm font-semibold">경영 철학</span>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_OUT }}
              className="group rounded-2xl border border-white/10 bg-white/[0.06] p-5 hover:border-emerald-300/30"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50/10 text-emerald-300 ring-1 ring-inset ring-emerald-300/20">
                  {p.icon}
                </span>
                <div className="text-lg font-extrabold tracking-tight text-white">{p.title}</div>
              </div>
              <p className="text-sm text-white/75">{p.desc1}</p>
              {p.desc2 && <p className="mt-1 text-sm text-white/60">{p.desc2}</p>}

              <div className="mt-4 h-1 w-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300 group-hover:w-24" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 비전 & 미션 */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={{ once: true, margin: "-10%" }}
          transition={fadeUp.transition}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
        >
          <div className="mb-3 text-sm font-semibold text-emerald-300">비전과 미션</div>

          <div className="mb-4">
            <div className="text-[13px] font-semibold text-amber-300">VISION</div>
            <p className="mt-1 text-sm text-white/80">
              “투명한 정보와 전문적 교육으로 건전한 투자 문화를 선도합니다”
            </p>
          </div>

          <div>
            <div className="text-[13px] font-semibold text-emerald-300">MISSION</div>
            <div className="mt-2 grid gap-2 text-sm text-white/80">
              <Bullet>정확한 시장 정보 제공</Bullet>
              <Bullet>체계적 투자교육 운영</Bullet>
              <Bullet>AI 기반 정밀 분석</Bullet>
              <Bullet>투자자 보호 중심 경영</Bullet>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
        >
          <div className="text-xs text-white/60">
            * 유사투자자문업자 (금융위원회 신고번호: 제0000호)
          </div>
        </motion.div>
      </section>

      {/* 고지 문구 */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="flex items-center gap-2 text-[12px] text-white/55">
          <ShieldCheck className="h-4 w-4 text-white/60" />
          투자는 원금 손실 가능성이 있으며, 그 결과는 투자자 본인에게 귀속됩니다.
        </div>
      </section>
    </main>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
      <span>{children}</span>
    </li>
  );
}

const PILLARS = [
  {
    title: "TRUST",
    icon: <ShieldCheck className="h-5 w-5" />,
    desc1: "투명한 정보 공개",
    desc2: "정직한 소통",
  },
  {
    title: "PROFESSIONALISM",
    icon: <LineChart className="h-5 w-5" />,
    desc1: "지속적인 연구개발",
    desc2: "데이터 기반 분석",
  },
  {
    title: "RESPONSIBILITY",
    icon: <Handshake className="h-5 w-5" />,
    desc1: "고객 이익 최우선",
    desc2: "투자 위험 명확 안내",
  },
] as const;
