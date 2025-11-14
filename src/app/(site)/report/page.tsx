"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CalendarDays, Users2, ShieldCheck, Bot } from "lucide-react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT },
};
const VIEWPORT = { once: true, amount: 0.2, margin: "64px 0px -8% 0px" } as const;

export default function BunnyStockReportPage() {
  return (
    <main className="relative min-h-screen bg-[#0b1220]">
      {/* 배경 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 35% at 0% 0%, rgba(16,185,129,.14), transparent), radial-gradient(50% 30% at 100% 0%, rgba(56,189,248,.12), transparent)",
        }}
      />

      {/* 상단 타이틀 */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 sm:pt-24">
        <motion.h1
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="text-4xl font-extrabold leading-tight text-white sm:text-5xl"
        >
          인사이트 <span className="text-amber-300">센터</span>
        </motion.h1>
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.12 }}
          className="mt-3 h-1.5 w-32 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"
        />
      </section>

      {/* 📅 주간/월간 시장 리포트 */}
      <SectionBlock
        icon={<CalendarDays className="h-6 w-6" />}
        title="📅 주간/월간 시장 리포트"
        image="/new_images/18.jpg"
      >
        <p>Bunny Stock은 정기적으로 발간되는 시장 리포트를 통해 국내외 금융시장의 주요 흐름과 변화를 종합적으로 제공합니다.</p>

        {/* 🗓 주간 브리핑 */}
        <SubTitle>주간 브리핑</SubTitle>
        {/* <CardSubImage src="/new_images/17.jpg" alt="주간 브리핑 이미지" /> */}
        <Bullet>코스피·코스닥 및 글로벌 주요 지수 주간 흐름 요약</Bullet>
        <Bullet>산업별 섹터 리포트 (반도체, 2차전지, IT, 바이오 등)</Bullet>
        <Bullet>주요 기업 실적 발표 및 공시 모니터링</Bullet>
        <Bullet>글로벌 매크로 이벤트(금리·고용지표·정책 발표) 정리</Bullet>

        {/* 🗓 월간 리포트 */}
        <SubTitle>월간 리포트</SubTitle>
        {/* <CardSubImage src="/new_images/18.jpg" alt="월간 리포트 이미지" /> */}
        <Bullet>한 달간 주요 시장 트렌드 요약</Bullet>
        <Bullet>글로벌 경제지표와 한국 경제 동향 종합 분석</Bullet>
        <Bullet>기관 투자자 중심 자금 흐름 및 자산 배분 추세 정리</Bullet>
        <Bullet>다음 달 예상 주요 이벤트 캘린더 제공</Bullet>

        <p>투자자는 이 리포트를 통해 시장의 큰 흐름을 이해하고, 스스로 투자 전략을 설계할 수 있습니다.</p>
      </SectionBlock>

      {/* 👨‍💼 전문가 시장분석 */}
      <SectionBlock
        icon={<Users2 className="h-6 w-6" />}
        title="👨‍💼 전문가 시장분석"
        // image="/new_images/19.jpg"
      >
        <p>전문가 그룹이 심층적이고 입체적인 시장 해석을 제시합니다.</p>
        <Bullet>전문가 코멘트: 글로벌 거시경제, 산업별 주요 트렌드에 대한 전문가 해설</Bullet>
        <Bullet>산업 분석: 반도체 사이클, 에너지·원자재 가격 동향, 신산업(블록체인, AI 등) 연구</Bullet>
        <Bullet>정책/규제 분석: 미국·유럽·중국 등 주요국 정책 변화가 금융시장에 미치는 영향</Bullet>
        <Bullet>기업 리서치: 재무 데이터, IR 발표, 신규 비즈니스 모델 분석</Bullet>
        <p>데이터 기반의 분석과 전문가 인사이트가 결합되어 시장에 대한 입체적 이해를 돕습니다.</p>
      </SectionBlock>

      {/* 🛡 리스크 관리 가이드 */}
      <SectionBlock
        icon={<ShieldCheck className="h-6 w-6" />}
        title="🛡 리스크 관리 가이드"
        // image="/new_images/20.png"
      >
        <p>Bunny Stock은 투자 과정에서 발생할 수 있는 다양한 위험 요소를 체계적으로 관리할 수 있도록 가이드를 제공합니다.</p>
        <Bullet>시장 리스크 점검: 금리, 환율, 원자재 가격 등 주요 리스크 요인 분석</Bullet>
        <Bullet>자산별 리스크 관리: 주식·채권·원자재·디지털자산 등 자산군별 특성에 따른 위험 관리</Bullet>
        <Bullet>투자 심리 분석: 과도한 공포·탐욕이 투자 결정에 미치는 영향 소개</Bullet>
        <Bullet>리스크 대응 전략: 분산 투자 원리, 손절/분할 매수, 장기·단기 전략 차이</Bullet>
        <p>단순한 기법 전달이 아니라, 투자자가 위험을 인식하고 스스로 방어할 수 있는 역량을 기르는 데 중점을 둡니다.</p>
      </SectionBlock>

      {/* 🤖 AI 기반 데이터 분석 */}
      <SectionBlock
        icon={<Bot className="h-6 w-6" />}
        title="🤖 AI 기반 데이터 분석"
        // image="/new_images/10.jpg"
      >
        <p>빅데이터와 인공지능 기술을 활용한 정밀 분석으로 시장의 변화를 빠르게 포착합니다.</p>
        <Bullet>시장 신호 포착: 거래량 급증, 변동성 확대, 수급 패턴 변화 자동 감지</Bullet>
        <Bullet>기술적 지표 분석: RSI, MACD, 이동평균선, 볼린저밴드 등 주요 지표를 AI로 종합 분석</Bullet>
        <Bullet>빅데이터 매크로 분석: 글로벌 뉴스·정책 발표·SNS 데이터까지 크롤링하여 정량화</Bullet>
        <Bullet>예측 모델링: 머신러닝 기반의 단기·중기 시장 시나리오 제시</Bullet>
        <Bullet>시각화 리포트: 복잡한 데이터를 차트·대시보드 형태로 가독성 있게 제공</Bullet>
        <p>AI 분석은 사람의 직관과 결합될 때 가장 큰 효과를 발휘합니다. Bunny Stock은 데이터 기반 사고방식을 지원하여 투자자의 의사결정을 강화합니다.</p>
      </SectionBlock>
    </main>
  );
}

/* 컴포넌트 */
/* 컴포넌트 */
function SectionBlock({
  icon,
  title,
  image,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  image?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-10">
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
      >
        {/* 이미지가 있을 때만 렌더링 */}
        {image && (
          <CardTopImage
            src={image}
            alt={title}
            className="h-72 sm:h-106 md:h-[840px]"
          />
        )}

        <div className="p-6 space-y-3 text-white/90">
          <div className="flex items-center gap-2 text-emerald-300">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-white/5 ring-1 ring-inset ring-white/10">
              {icon}
            </span>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          </div>
          {children}
        </div>
      </motion.article>
    </section>
  );
}


function CardTopImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative w-full ${className}`}>
      <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}

/* 📸 서브 이미지 (섹션 내부용) */
function CardSubImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mt-4 mb-2 w-full overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={600}
        className="h-72 w-full object-cover ring-1 ring-inset ring-white/10"
      />
    </div>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-5 text-[16px] font-semibold text-white">{children}</h3>;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-white/90">
      <span className="mt-2 h-2 w-2 flex-none rounded-full bg-emerald-400" />
      <span>{children}</span>
    </li>
  );
}
