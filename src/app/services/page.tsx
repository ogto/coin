"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CandlestickChart,
  Globe2,
  Bitcoin,
  GraduationCap,
  Info,
  ShieldCheck,
} from "lucide-react";

// 공통 이징
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT },
};
const VIEWPORT = { once: true, amount: 0.2, margin: "64px 0px -8% 0px" } as const;



export default function ServicesPage() {
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

      {/* 제목 */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 sm:pt-24">
        <motion.h1
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="text-3xl font-extrabold leading-tight text-white sm:text-4xl"
        >
          서비스<span className="text-amber-300">안내</span>
        </motion.h1>
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
          className="mt-2 h-1 w-28 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"
        />
      </section>

      {/* 법적 안내 배너 */}
      <section className="relative mx-auto max-w-7xl px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm text-white/80"
        >
          <AlertTriangle className="mt-0.5 h-4.5 w-4.5 text-amber-300" />
          <p>
            <span className="font-semibold text-white">법적 안내:</span> Bunny Stock은 유사투자자문업체로,
            제공되는 모든 정보는 참고용입니다. 투자 결정과 책임은 고객 본인에게 있습니다.
          </p>
        </motion.div>
      </section>

      {/* 서비스 카드 2열 */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-10 md:grid-cols-2">
        {CARDS.map((c, i) => (
          <ServiceCard key={c.title} {...c} delay={i * 0.06} />
        ))}
      </section>

      {/* 하단 안내 라인 */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-4 text-xs text-white/70 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-white/60" />
            서비스는 회원 등급에 따라 이용 범위가 다를 수 있습니다.
          </div>
          <div className="flex items-center gap-2 md:justify-end">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            안전한 투자정보 제공이 최우선 가치입니다.
          </div>
        </div>
      </section>
    </main>
  );
}

type Card = {
  icon: React.ReactNode;
  accent?: "emerald" | "amber";
  title: string;
  desc: string;
  bullets: string[];
  delay?: number;
};

function ServiceCard({ icon, title, desc, bullets, delay = 0, accent = "amber" }: Card) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5"
    >
      {/* 좌측 강조 바 */}
      <span
        className={[
          "absolute inset-y-0 left-0 w-[3px]",
          accent === "amber"
            ? "bg-gradient-to-b from-amber-300/90 to-amber-500/60"
            : "bg-gradient-to-b from-emerald-300/90 to-cyan-400/60",
        ].join(" ")}
      />

      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 text-emerald-300">
          {icon}
        </span>
        <h3 className="text-lg font-extrabold tracking-tight text-white">{title}</h3>
      </div>

      <p className="text-sm text-white/80">{desc}</p>

      <ul className="mt-4 space-y-2 text-sm text-white/80">
        {bullets.map((b) => (
          <Bullet key={b}>{b}</Bullet>
        ))}
      </ul>
    </motion.div>
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

const CARDS: Card[] = [
  {
    icon: <CandlestickChart className="h-5 w-5" />,
    title: "국내주식 정보 서비스",
    desc: "코스피·코스닥 시장에 대한 체계적 데이터 분석과 시장 동향 정보를 제공합니다.",
    bullets: ["일일/주간 시장 브리핑", "업종별 심층 리서치 자료", "기술적 분석 데이터 제공"],
    accent: "amber",
  },
  {
    icon: <Globe2 className="h-5 w-5" />,
    title: "해외주식·해외선물 정보",
    desc: "글로벌 시장 데이터 분석과 주요국 경제지표 해석 자료를 제공합니다.",
    bullets: ["글로벌 시장 일일 동향", "주요 해외지수 기술적 분석", "글로벌 경제 지표 해설"],
    accent: "emerald",
  },
  {
    icon: <Bitcoin className="h-5 w-5" />,
    title: "디지털자산 정보 서비스",
    desc: "암호화폐 시장 데이터와 블록체인 기술 동향 정보를 제공합니다.",
    bullets: ["주요 코인 시장 동향 분석", "온체인 데이터 통계 자료", "코인 선물시장 포지션 분석"],
    accent: "amber",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "투자교육 프로그램",
    desc: "투자 원리부터 시장 분석 방법까지, 단계별 교육 콘텐츠를 제공합니다.",
    bullets: ["온라인 강의 및 세미나", "차트 분석 기초/심화 과정", "투자심리 및 리스크 관리 교육"],
    accent: "emerald",
  },
];
