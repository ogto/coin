"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  MessageSquareQuote,
  ShieldCheck,
  LineChart,
  Handshake,
  Info,
  Sparkles,
  MapPin,
  ExternalLink,
} from "lucide-react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT },
};
const VIEWPORT = { once: true, amount: 0.2, margin: "-64px 0px -10% 0px" } as const;

const ADDRESS = "서울 강남구 도곡로 7길 7, 5층";
const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps?q=" + encodeURIComponent(ADDRESS) + "&output=embed";
const GOOGLE_MAPS_LINK = "https://maps.google.com/?q=" + encodeURIComponent(ADDRESS);
const NAVER_MAPS_LINK = "https://map.naver.com/v5/search/" + encodeURIComponent(ADDRESS);

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
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
        >
          <Sparkles className="h-3.5 w-3.5" /> 회사소개
        </motion.div>

        <motion.h1
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mt-3 text-4xl font-extrabold leading-tight text-white sm:text-5xl"
        >
          Bunny Stock 주식회사
        </motion.h1>

        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-3 h-1.5 w-32 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"
        />
      </section>

      {/* 개요 + 인사말 (상단 이미지 포함 카드) */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2">
        {/* 회사 개요 */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,.25)]"
        >
          <CardTopImage
            src="/new_images/1.jpg"
            alt="회사 개요"
            className="h-64 sm:h-80 md:h-[360px]"
          />

          <div className="p-6">
            <div className="mb-3 flex items-center gap-2 text-emerald-300">
              <Info className="h-5 w-5" />
              <span className="text-base font-semibold text-white">회사 개요</span>
            </div>

            <p className="whitespace-pre-line text-[15px] leading-7 text-white/90 md:text-base">
              {`Bunny Stock은 글로벌 금융 환경의 변화 속에서 투자자가 올바른 의사결정을 내릴 수 있도록,
객관적 투자정보 제공·시장분석·교육 서비스에 집중하는 유사투자자문업체입니다.
우리는 단순한 투자 팁이나 예측을 제공하지 않고, 체계적이고 데이터 기반의 분석 결과를 토대로
투자자가 합리적 선택을 할 수 있는 환경과 도구를 마련합니다.`}
            </p>

            <ul className="mt-5 space-y-2 text-[15px] text-white/90 md:text-base">
              <Bullet>설립연도: 2022년</Bullet>
              <Bullet>본사 위치: 서울특별시 강남구 도곡로 7길 7</Bullet>
              <Bullet>
                사업영역: 온라인정보제공업 · 기업리서치 자료 모바일 서비스업 · 유사투자자문업(금융위원회 신고 완료)
              </Bullet>
            </ul>

            <div className="mt-5">
              <div className="text-[13.5px] font-semibold text-emerald-300">주요 서비스</div>
              <ul className="mt-2 space-y-2 text-[15px] text-white/90 md:text-base">
                <Bullet>투자정보 제공: 글로벌 경제 이슈, 업종·종목별 동향, 주요 이벤트 분석</Bullet>
                <Bullet>시장 분석: 기술적 지표·거시경제 데이터·리스크 요인 평가</Bullet>
                <Bullet>투자 교육: 온라인/오프라인 강의, 정기 세미나, 기초~심화 단계별 커리큘럼</Bullet>
                <Bullet>AI 기반 분석 리포트: 머신러닝·빅데이터 기반의 투자 시나리오 제공</Bullet>
              </ul>
            </div>
          </div>
        </motion.article>

        {/* 대표 인사말 */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.05 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
        >
          <CardTopImage
            src="/new_images/2.png"
            alt="대표 인사말"
            className="h-64 sm:h-80 md:h-[360px]"
          />

          <div className="p-6">
            <div className="mb-4 flex items-center gap-2 text-amber-300">
              <MessageSquareQuote className="h-5 w-5" />
              <span className="text-base font-semibold text-white">대표 인사말</span>
            </div>

            <blockquote className="text-[15px] leading-7 text-white/90 md:text-base">
              {`"Bunny Stock은 단순히 정보를 전달하는 회사를 넘어, 투자자가 스스로 분석하고 판단할 수 있는 힘을 길러주는 동반자입니다.
복잡하고 변동성이 큰 금융시장에서 중요한 것은 '누구의 말'이 아니라 '객관적인 데이터와 스스로의 판단'입니다.
우리는 정보의 투명성, 분석의 전문성, 운영의 책임성을 바탕으로 건전한 투자 문화를 만들어가고자 합니다.
앞으로도 Bunny Stock은 투자자의 권익을 보호하고, 장기적 성장을 지원하는 신뢰할 수 있는 파트너로 함께 하겠습니다."`}
            </blockquote>

            <div className="mt-3 text-right text-xs text-white/60">— 대표이사 이서우</div>
          </div>
        </motion.article>
      </section>

      {/* 경영 철학 (상단 이미지 포함) */}
      <section className="relative mx-auto max-w-7xl px-6 py-6">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="mb-4 flex items-center gap-2 text-emerald-300"
        >
          <LineChart className="h-5 w-5" />
          <span className="text-base font-semibold text-white">경영 철학</span>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_OUT }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] hover:border-emerald-300/30"
            >
              {/* <CardTopImage src={p.image} alt={p.title} className="h-56 sm:h-64" /> */}

              <div className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50/10 text-emerald-300 ring-1 ring-inset ring-emerald-300/20">
                    {p.icon}
                  </span>
                  <div className="text-lg font-extrabold tracking-tight text-white">{p.title}</div>
                </div>

                <ul className="space-y-2 text-[15px] text-white/90 md:text-base">
                  {p.points.map((txt) => (
                    <Bullet key={txt}>{txt}</Bullet>
                  ))}
                </ul>

                <div className="mt-4 h-1 w-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300 group-hover:w-24" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 차별화 포인트 (대표 이미지 + 불릿 요약) */}
      <section className="relative mx-auto max-w-7xl px-6 py-8">
        <motion.h3
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="mb-3 flex items-center gap-2 text-2xl font-extrabold text-white"
        >
          <span className="text-[20px]">📌</span> 차별화 포인트
        </motion.h3>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
        >
          {/* 대표 이미지 (크게) */}
          {/* <CardTopImage
            src="/new_images/8.png"
            alt="차별화 포인트"
            className="h-64 sm:h-80 md:h-[420px]"
          /> */}

          {/* 불릿 요약 */}
          <div className="p-6">
            <ul className="space-y-3 text-[15px] leading-7 text-white/90 md:text-base">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-[3px] bg-emerald-300" />
                <p>
                  <span className="font-semibold text-white">합법적 신고업체</span>
                  <span className="text-white/85">
                    : 금융위원회에 신고 완료된 유사투자자문업체로서 법적 신뢰 확보
                  </span>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-[3px] bg-emerald-300" />
                <p>
                  <span className="font-semibold text-white">전문 리서치팀 운영</span>
                  <span className="text-white/85">: 글로벌/국내 금융시장 전문 분석 인력 보유</span>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-[3px] bg-emerald-300" />
                <p>
                  <span className="font-semibold text-white">AI & 빅데이터 활용</span>
                  <span className="text-white/85">: 데이터 기반의 정밀 분석과 시장 예측 지원</span>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-[3px] bg-emerald-300" />
                <p>
                  <span className="font-semibold text-white">교육 중심 모델</span>
                  <span className="text-white/85">: 단기 수익보다 지속 가능한 투자 문화 형성을 목표</span>
                </p>
              </li>
            </ul>
          </div>
        </motion.article>
      </section>

      {/* 비전 & 미션 + 오시는 길 (분리된 카드, 상단 이미지 포함) */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-3">
        {/* VISION */}
        <motion.article
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
        >
          <CardTopImage src="/new_images/6.png" alt="VISION" className="h-56 sm:h-72 md:h-60" />
          <div className="p-6">
            <div className="mb-3 text-sm font-semibold text-emerald-300">비전 (VISION)</div>

            <p className="text-[15px] text-white/90 md:text-base">
              “투명한 정보와 전문적 교육으로 건전하고 지속 가능한 투자 문화를 선도합니다.”
            </p>

            <ul className="mt-4 space-y-2 text-[15px] text-white/90 md:text-base">
              <Bullet>불확실성이 높은 시장에서 투자자 스스로 설계할 수 있는 역량을 강화</Bullet>
              <Bullet>글로벌 기준의 분석 체계를 갖춘 차세대 투자 자문 플랫폼으로 성장</Bullet>
              <Bullet>정보 비대칭을 해소하여 투명한 금융 생태계 정착에 기여</Bullet>
            </ul>
          </div>
        </motion.article>

        {/* MISSION */}
        <motion.article
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
        >
          <CardTopImage src="/new_images/7.png" alt="MISSION" className="h-56 sm:h-72 md:h-60" />
          <div className="p-6">
            <div className="mb-3 text-sm font-semibold text-emerald-300">미션 (MISSION)</div>

            <ol className="list-decimal space-y-3 pl-5 text-[15px] text-white/90 md:text-base">
              <li>
                <div className="font-semibold text-white">정확하고 객관적인 정보 제공</div>
                <ul className="mt-1 space-y-1">
                  <li>글로벌 경제 동향·정책 변화·시장 흐름을 데이터 기반으로 시각화하여 제공</li>
                  <li>누구나 이해하기 쉽게 해설·요약된 리포트 제공</li>
                </ul>
              </li>

              <li>
                <div className="font-semibold text-white">체계적이고 단계적인 투자 교육</div>
                <ul className="mt-1 space-y-1">
                  <li>초보 투자자를 위한 기초 강의부터, 심화 과정 및 전문가 과정까지 운영</li>
                  <li>실전보다는 원리·분석·리스크 관리 중심 교육</li>
                </ul>
              </li>

              <li>
                <div className="font-semibold text-white">AI와 데이터 기반 분석</div>
                <ul className="mt-1 space-y-1">
                  <li>자체 알고리즘을 통한 정량적 분석 및 리스크 요인 점검</li>
                  <li>빅데이터 기반의 시장 시뮬레이션 및 시나리오 제시</li>
                </ul>
              </li>

              <li>
                <div className="font-semibold text-white">투자자 보호와 윤리 경영</div>
                <ul className="mt-1 space-y-1">
                  <li>투자자의 권익 보호를 최우선으로 하는 내부 규정 운영</li>
                  <li>법령 및 금융소비자보호 규정을 철저히 준수</li>
                  <li>과장 없는 광고, 투명한 정보 전달 원칙 준수</li>
                </ul>
              </li>
            </ol>
          </div>
        </motion.article>

        {/* 오시는 길 */}
        <motion.article
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
        >
          <div className="p-6">
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <MapPin className="h-5 w-5" />
              <span className="text-base font-semibold text-white">오시는 길</span>
            </div>

            <div className="mb-4 text-[15px] text-white/90 md:text-base">{ADDRESS}</div>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <iframe
                src={GOOGLE_MAPS_EMBED}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google Map"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs text-white/85 hover:bg-white/[0.1]"
              >
                Google 지도에서 열기 <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={NAVER_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs text-white/85 hover:bg-white/[0.1]"
              >
                Naver 지도에서 열기 <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.article>
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

/* 공통: 카드 상단 이미지 (커스텀 높이 지원) */
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
    <div className={`relative w-full h-40 sm:h-48 shrink-0 ${className}`}>
      <Image src={src} alt={alt} fill priority className="object-cover" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}

/* 공통: 불릿 — `:` 앞부분 자동 볼드 */
function Bullet({ children }: { children: React.ReactNode }) {
  if (typeof children === "string") {
    const i = children.indexOf(":");
    if (i !== -1) {
      const head = children.slice(0, i + 1); // 콜론 포함
      const tail = children.slice(i + 1).trim();
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

/* 경영 철학 데이터 (이미지 경로 포함) */
const PILLARS = [
  {
    title: "TRUST (신뢰)",
    icon: <ShieldCheck className="h-5 w-5" />,
    image: "/new_images/3.png",
    points: [
      "금융위원회에 정식 신고된 합법적 유사투자자문업체로서 신뢰 확보",
      "분석 과정과 정보 출처를 투명하게 공개",
      "고객과의 소통에서 과장이나 허위가 없는 정직한 태도 유지",
    ],
  },
  {
    title: "PROFESSIONALISM (전문성)",
    icon: <LineChart className="h-5 w-5" />,
    image: "/new_images/4.png",
    points: [
      "글로벌 금융시장 연구, 산업별 분석, 최신 경제 지표 연구에 기반한 데이터 제공",
      "AI·빅데이터 기반의 리포트 작성 체계 운영",
      "검증된 리서치 방법론과 전문 인력 확보",
    ],
  },
  {
    title: "RESPONSIBILITY (책임)",
    icon: <Handshake className="h-5 w-5" />,
    image: "/new_images/5.png",
    points: [
      `"투자 위험 고지"를 명확히 전달하며, 투자자의 자기 판단을 존중`,
      "특정 종목·상품 매수 권유 대신, 객관적 정보와 학습 자료 제공",
      "고객의 합리적 의사결정을 돕는 투자자 보호 중심 경영",
    ],
  },
] as const;
