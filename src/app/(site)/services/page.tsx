"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CandlestickChart,
  Globe2,
  Bitcoin,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

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
          className="text-4xl font-extrabold leading-tight text-white sm:text-5xl"
        >
          서비스<span className="text-amber-300">안내</span>
        </motion.h1>
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
          className="mt-3 h-1.5 w-32 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"
        />
      </section>

      {/* ⚖️ 법적 안내 */}
      <section className="relative mx-auto max-w-7xl px-6 py-6">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
        >
          {/* <CardTopImage
            src="/new_images/9.png"
            alt="법적 안내"
            className="h-52 sm:h-64 md:h-[560px]"  // ← 임의값 유틸
          /> */}
          <div className="p-6">
            <div className="mb-3 flex items-center gap-2 text-emerald-300">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-base font-semibold text-white">법적 안내</span>
            </div>

            <ul className="space-y-2 text-[15px] leading-7 text-white/90 md:text-base">
              <Bullet>
                Bunny Stock은 금융위원회에 정식 신고된 유사투자자문업체로, 제공되는 모든 정보는 참고용 자료입니다.
              </Bullet>
              <Bullet>
                투자 판단과 최종 책임은 고객 본인에게 있으며, 당사는 어떠한 수익 보장도 하지 않습니다.
              </Bullet>
              <Bullet>
                당사는 투자자 보호와 건전한 금융 문화 정착을 최우선 가치로 삼고 있습니다.
              </Bullet>
            </ul>
          </div>
        </motion.article>
      </section>

      {/* 서비스 카드들 */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 px-6 pb-10 md:grid-cols-2">
        <ServiceCard
          icon={<CandlestickChart className="h-5 w-5" />}
          title="국내주식 정보 서비스"
          image="/new_images/10.jpg"
          intro={[
            "코스피·코스닥 시장을 중심으로 데이터 기반 분석과 심층 리서치를 제공합니다.",
            "투자자가 시장 흐름을 이해하고 스스로 판단할 수 있도록 객관적 자료만을 제공합니다.",
          ]}
          bullets={[
            "일일/주간 시장 브리핑: 당일 장세 요약, 섹터별 동향, 주요 이슈 정리",
            "업종별 심층 리서치: 반도체, 2차전지, 바이오 등 주요 산업 분석 리포트",
            "기술적 분석 데이터 제공: 이동평균선, RSI, MACD 등 대표 지표의 객관적 해석 자료",
            "기업 공시 및 정책 모니터링: 주요 상장사의 공시·정부 정책 발표 정리",
          ]}
          accent="amber"
        />

        <ServiceCard
          icon={<Globe2 className="h-5 w-5" />}
          title="해외주식·해외선물 정보 서비스"
          image="/new_images/11.jpg"
          intro={[
            "글로벌 주요 시장의 일일 데이터·경제지표 분석을 통해 국제 금융 흐름을 파악할 수 있는 참고자료를 제공합니다.",
          ]}
          bullets={[
            "글로벌 시장 일일 동향: S&P500, 나스닥, 다우존스, 유럽 주요 지수 브리핑",
            "주요 해외지수 기술적 분석: 변동성 지수(VIX), 거래량, 패턴 데이터 분석",
            "글로벌 경제 지표 해설: 미국 고용지표·소비자물가지수·금리 발표 등 주요 이벤트 요약",
            "해외 선물시장 데이터: 원자재(금·원유), 환율, 국채금리 등 매크로 데이터 제공",
          ]}
          accent="emerald"
        />

        <ServiceCard
          icon={<Bitcoin className="h-5 w-5" />}
          title="디지털자산 정보 서비스"
          image="/new_images/12.png"
          intro={[
            "빠르게 변화하는 블록체인 및 암호화폐 시장의 데이터를 기반으로, 투자자가 트렌드를 이해할 수 있도록 돕습니다.",
          ]}
          bullets={[
            "주요 코인 시장 동향 분석: 비트코인·이더리움 등 주요 코인의 가격·거래량·시총 흐름",
            "온체인 데이터 통계 자료: 거래소 입출금, 활성 지갑 수, 채굴 난이도 등 네트워크 데이터",
            "코인 선물시장 포지션 분석: 롱/숏 포지션 비율, 미결제약정(Open Interest) 통계",
            "블록체인 산업 트렌드 리포트: 글로벌 규제 변화, 기술 업데이트, 프로젝트 동향 정리",
          ]}
          accent="amber"
        />

        <ServiceCard
          icon={<GraduationCap className="h-5 w-5" />}
          title="투자교육 프로그램"
          image="/new_images/13.png"
          intro={[
            "단순한 정보 전달을 넘어, 투자 원리·분석 방법·리스크 관리를 학습할 수 있는 교육 콘텐츠를 제공합니다.",
          ]}
          bullets={[
            "온라인 강의 및 세미나: 실시간 웨비나, 녹화 강의, 업계 전문가 특강",
            "차트 분석 기초/심화 과정: 캔들 차트 이해부터 패턴·지표 활용까지 단계별 학습",
            "투자심리 및 리스크 관리 교육: 심리적 편향, 손실 회피 성향, 분산투자 원리 등 체계적 교육",
            "회원 전용 아카데미: 멤버십 등급에 따라 기초·심화·전문 과정 운영",
          ]}
          accent="emerald"
        />
      </section>

      {/* 🔒 서비스 운영 원칙 */}
      <section className="relative mx-auto max-w-7xl px-6 pb-12">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
        >
          {/* <CardTopImage
            src="/new_images/14.png"
            alt="서비스 운영 원칙"
            className="h-48 sm:h-60 md:h-[560px]"  // ← 임의값 유틸
          /> */}
          <div className="p-6">
            <div className="mb-3 flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-base font-semibold text-white">서비스 운영 원칙</span>
            </div>
            <ul className="space-y-2 text-[15px] leading-7 text-white/90 md:text-base">
              <Bullet>모든 서비스는 정보 제공·교육 목적에 한정됩니다.</Bullet>
              <Bullet>고객의 투자 경험과 이해 수준에 맞춰 단계별 접근이 가능하도록 설계되어 있습니다.</Bullet>
              <Bullet>
                회원 등급(Basic, Premium 등)에 따라 서비스 이용 범위가 다르며, 고급 리서치 자료와 전문 교육 과정은
                멤버십 가입 시 이용 가능합니다.
              </Bullet>
              <Bullet>당사의 모든 자료는 투자자 보호와 안전한 금융 정보 제공을 최우선 가치로 합니다.</Bullet>
            </ul>
          </div>
        </motion.article>
      </section>
    </main>
  );
}

/* ---------- 재사용 컴포넌트 ---------- */

type CardProps = {
  icon: React.ReactNode;
  title: string;
  image: string;
  intro?: string[];
  bullets: string[];
  accent?: "emerald" | "amber";
};

function ServiceCard({
  icon,
  title,
  image,
  intro = [],
  bullets,
  accent = "amber",
}: CardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
    >
      {/* 상단 이미지 */}
      <CardTopImage src={image} alt={title} className="h-64 sm:h-72 md:h-80 shrink-0" />

      {/* 내용 */}
      <div className="flex-1 p-6">
        {/* 타이틀 */}
        <div className="mb-3 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 text-emerald-300">
            {icon}
          </span>
          <h3 className="text-xl font-extrabold tracking-tight text-white sm:text-[22px]">
            {title}
          </h3>
        </div>

        {/* 인트로 문단 */}
        {intro.length > 0 && (
          <div className="space-y-2 text-[15px] leading-7 text-white/90 md:text-base">
            {intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {/* 불릿 */}
        <ul className="mt-4 space-y-2 text-[15px] leading-7 text-white/90 md:text-base">
          {bullets.map((b) => (
            <Bullet key={b}>{b}</Bullet>
          ))}
        </ul>

        {/* 좌측 강조 바 */}
        <span
          className={[
            "pointer-events-none absolute inset-y-0 left-0 w-[3px]",
            accent === "amber"
              ? "bg-gradient-to-b from-amber-300/90 to-amber-500/60"
              : "bg-gradient-to-b from-emerald-300/90 to-cyan-400/60",
          ].join(" ")}
        />
      </div>
    </motion.article>
  );
}

function CardTopImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full h-36 sm:h-44 ${className}`}>
      <Image src={src} alt={alt} fill priority className="object-cover" sizes="100vw" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}

/* 불릿: `:` 앞부분 자동 볼드 */
function Bullet({ children }: { children: React.ReactNode }) {
  if (typeof children === "string") {
    const idx = children.indexOf(":");
    if (idx !== -1) {
      const head = children.slice(0, idx + 1); // 콜론 포함
      const tail = children.slice(idx + 1).trim();
      return (
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 flex-none rounded-full bg-emerald-400" />
          <span>
            <span className="font-semibold text-white">{head} </span>
            <span className="text-white/90">{tail}</span>
          </span>
        </li>
      );
    }
  }
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 h-2 w-2 flex-none rounded-full bg-emerald-400" />
      <span>{children}</span>
    </li>
  );
}
