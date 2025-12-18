// src/app/research/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  FileText,
  BarChart3,
  Cpu,
  Network,
  Globe2,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// ==== Motion 공통 ====
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 } as const;
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT },
};

export default function ResearchPage() {
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
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
        >
          <Sparkles className="h-3.5 w-3.5" /> 연구/분석
        </motion.div>
        <motion.h1
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl"
        >
          연구/분석 자료<span className="text-amber-300">구성안</span>
        </motion.h1>
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-2 h-1 w-28 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"
        />
      </section>

      {/* 상단 2열: 리포트 서비스 / AI 데이터 분석 시스템 */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 md:grid-cols-2">
        {/* 리포트 서비스 */}
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-amber-300">
            <BookOpen className="h-4.5 w-4.5" />
            <span className="text-lg font-semibold">리포트 서비스</span>
          </div>

          <div className="rounded-xl border border-amber-200/20 bg-[#0f1628]/70 p-4">
            <div className="mb-2 flex items-center gap-2 text-amber-300">
              <FileText className="h-4 w-4" />
              <span className="text-base font-bold text-white">정기 리포트</span>
            </div>
            <ul className="space-y-1.5 text-sm text-white/85">
              <Bullet>주간 리포트: 시장 동향 및 주요 이슈 분석</Bullet>
              <Bullet>월간 리포트: 섹터별 트렌드 및 거시경제 분석</Bullet>
              <Bullet>특별 리포트: 중요 이벤트 및 정책 변화 분석</Bullet>
            </ul>
          </div>
        </motion.div>

        {/* AI 데이터 분석 시스템 */}
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-emerald-300">
            <Cpu className="h-4.5 w-4.5" />
            <span className="text-lg font-semibold text-white">AI 데이터 분석 시스템</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0f1628]/70 p-4">
            <div className="mb-2 flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-base font-bold text-white">시스템 특징</span>
            </div>
            <ul className="space-y-1.5 text-sm text-white/85">
              <Bullet>빅데이터 기반 시장 패턴 인식</Bullet>
              <Bullet>머신러닝 기반 데이터 분석</Bullet>
              <Bullet>Hae Gang 자체 개발 트레이딩 시그널</Bullet>
              <Bullet>실시간 데이터 수집·정제·스코어링</Bullet>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* 리포트 샘플 미리보기 (차트 포함) */}
      <section className="relative mx-auto max-w-7xl px-6 pb-10">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="mb-3 text-lg font-semibold text-white"
        >
          리포트 샘플 미리보기
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {/* 1. 주간 리포트 - 글로벌 시장 동향 (라인 차트) */}
          <SampleCard
            title="주간 리포트"
            subtitle="글로벌 시장 동향"
            helper="주요 지수 주간 흐름"
            icon={<Globe2 className="h-4 w-4 text-emerald-300" />}
          >
            <MiniLineChart
              dataA={[100, 104, 102, 106, 110, 113, 112]}
              dataB={[100, 101, 103, 102, 104, 106, 108]}
            />
          </SampleCard>

          {/* 2. 월간 리포트 - 산업별 분석 (막대 차트) */}
          <SampleCard
            title="월간 리포트"
            subtitle="산업별 분석"
            helper="섹터별 성과 비교"
            icon={<BarChart3 className="h-4 w-4 text-cyan-300" />}
          >
            <MiniBarChart
              labels={["IT", "헬스", "에너지", "금융", "산업재", "소비재"]}
              values={[8, 5, -2, 3, 1, 6]}
            />
          </SampleCard>

          {/* 3. 특별 리포트 - 신기술 동향 (에어리어 차트) */}
          <SampleCard
            title="특별 리포트"
            subtitle="신기술 동향"
            helper="신규 트렌드 심층 분석"
            icon={<Network className="h-4 w-4 text-amber-300" />}
          >
            <MiniAreaChart data={[20, 28, 31, 29, 36, 42, 40]} />
          </SampleCard>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs text-white/70">
          <AlertTriangle className="h-4 w-4 text-amber-300" />
          모든 리포트 및 분석 샘플은 참고용 예시이며, 실제 콘텐트는 정기적으로 업데이트됩니다.
        </div>
      </section>

      {/* 제공 정보 / 중요 안내 */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-16 md:grid-cols-2">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
        >
          <div className="mb-3 flex items-center gap-2 text-emerald-300">
            <BarChart3 className="h-4.5 w-4.5" />
            <span className="text-base font-semibold text-white">제공 정보</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoItem icon={<LineChart className="h-4 w-4" />} text="시장 데이터 시각화" />
            <InfoItem icon={<Globe2 className="h-4 w-4" />} text="상관관계 분석" />
            <InfoItem icon={<FileText className="h-4 w-4" />} text="뉴스 영향 분석" />
            <InfoItem icon={<ShieldCheck className="h-4 w-4" />} text="리스크 평가" />
            <InfoItem icon={<Cpu className="h-4 w-4" />} text="감성분석 데이터" />
            <InfoItem icon={<Network className="h-4 w-4" />} text="글로벌 시장 연관성" />
          </div>
        </motion.div>

        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
        >
          <div className="mb-3 flex items-center gap-2 text-amber-300">
            <AlertTriangle className="h-4.5 w-4.5" />
            <span className="text-base font-semibold text-white">중요 안내</span>
          </div>
          <ul className="space-y-1.5 text-sm text-white/85">
            <Bullet>Hae Gang의 AI 분석 시스템은 <span className="text-white">참고용 데이터</span>를 제공합니다.</Bullet>
            <Bullet>제공되는 모든 정보는 <span className="text-white">교육·학습 목적</span>으로 활용하시기 바랍니다.</Bullet>
            <Bullet>최종 투자 결정은 반드시 <span className="text-white">투자자 본인의 판단</span>으로 이루어져야 합니다.</Bullet>
          </ul>
        </motion.div>
      </section>
    </main>
  );
}

// ---------- 재사용 작은 컴포넌트들 ----------
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
      <span>{children}</span>
    </li>
  );
}

function InfoItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80">
      <span className="text-emerald-300">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function SampleCard({
  title,
  subtitle,
  helper,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  helper: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-amber-300">{title}</div>
          <div className="truncate text-base font-bold tracking-tight text-white">{subtitle}</div>
        </div>
        <span className="ml-2 grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10">
          {icon}
        </span>
      </div>
      <div className="relative h-36 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f1628] p-2">
        {children}
      </div>
      <div className="mt-2 text-[12px] text-white/60">{helper}</div>
    </motion.div>
  );
}

// ---------- 미니 차트 (순수 SVG) ----------
function MiniLineChart({ dataA, dataB }: { dataA: number[]; dataB: number[] }) {
  const w = 420, h = 120, pad = 16;
  const max = Math.max(...dataA, ...dataB);
  const min = Math.min(...dataA, ...dataB);
  const sx = (i: number, n: number) => pad + (i * (w - pad * 2)) / (n - 1);
  const sy = (v: number) => pad + (h - pad * 2) * (1 - (v - min) / (max - min || 1));

  const path = (arr: number[]) =>
    arr.map((v, i) => `${i ? "L" : "M"} ${sx(i, arr.length)} ${sy(v)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(16,185,129)" />
          <stop offset="100%" stopColor="rgb(56,189,248)" />
        </linearGradient>
        <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,.55)" />
        </linearGradient>
      </defs>

      <g opacity={0.15}>
        <line x1="0" y1={h - pad} x2={w} y2={h - pad} stroke="white" />
        <line x1="0" y1={pad} x2={w} y2={pad} stroke="white" />
      </g>

      <path d={path(dataB)} fill="none" stroke="url(#lg2)" strokeWidth={2} />
      <path d={path(dataA)} fill="none" stroke="url(#lg1)" strokeWidth={3} />
    </svg>
  );
}

function MiniBarChart({ labels, values }: { labels: string[]; values: number[] }) {
  const w = 420, h = 120, pad = 18;
  const max = Math.max(0, ...values);
  const min = Math.min(0, ...values);
  const span = max - min || 1;
  const bw = (w - pad * 2) / values.length - 8;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full">
      <defs>
        <linearGradient id="bgBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(16,185,129)" />
          <stop offset="100%" stopColor="rgb(56,189,248)" />
        </linearGradient>
      </defs>

      <g opacity={0.12}>
        <rect x="0" y={h / 2} width={w} height="1" fill="white" />
      </g>

      {values.map((v, i) => {
        const x = pad + i * ((w - pad * 2) / values.length) + 4;
        const y = pad + (h - pad * 2) * (v > 0 ? (max - v) / span : max / span);
        const hh = Math.max(2, (h - pad * 2) * Math.abs(v) / span);
        return <rect key={i} x={x} y={y} width={bw} height={hh} rx={4} fill="url(#bgBar)" />;
      })}

      {/* x 라벨 */}
      {labels.map((l, i) => (
        <text key={l} x={pad + i * ((w - pad * 2) / values.length) + bw / 2 + 4} y={h - 4}
          textAnchor="middle" fontSize="9" fill="rgba(255,255,255,.65)">{l}</text>
      ))}
    </svg>
  );
}

function MiniAreaChart({ data }: { data: number[] }) {
  const w = 420, h = 120, pad = 16;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const sx = (i: number, n: number) => pad + (i * (w - pad * 2)) / (n - 1);
  const sy = (v: number) => pad + (h - pad * 2) * (1 - (v - min) / (max - min || 1));

  const line = data.map((v, i) => `${i ? "L" : "M"} ${sx(i, data.length)} ${sy(v)}`).join(" ");
  const area = `${line} L ${pad + (w - pad * 2)} ${h - pad} L ${pad} ${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full">
      <defs>
        <linearGradient id="ga1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(251,191,36)" />
          <stop offset="100%" stopColor="rgb(16,185,129)" />
        </linearGradient>
        <linearGradient id="gaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(251,191,36,.30)" />
          <stop offset="100%" stopColor="rgba(16,185,129,.06)" />
        </linearGradient>
      </defs>

      <g opacity={0.12}>
        <line x1="0" y1={h - pad} x2={w} y2={h - pad} stroke="white" />
      </g>

      <path d={area} fill="url(#gaFill)" />
      <path d={line} fill="none" stroke="url(#ga1)" strokeWidth={2.5} />
      {data.map((v, i) => (
        <circle key={i} cx={sx(i, data.length)} cy={sy(v)} r={2.2} fill="white" opacity={0.9} />
      ))}
    </svg>
  );
}
