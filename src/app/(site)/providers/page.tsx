// src/app/providers/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  Info,
  Building2,
  Landmark,
  CandlestickChart,
  Coins,
  Sparkles,
} from "lucide-react";

// 공통 모션
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 } as const;
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT },
};

export default function ProvidersPage() {
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
          <Sparkles className="h-3.5 w-3.5" /> 데이터 소스
        </motion.div>
        <motion.h1
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl"
        >
          시장 데이터<span className="text-amber-300">제공처</span>
        </motion.h1>
      </section>

      {/* 안내 배너 */}
      <section className="relative mx-auto max-w-7xl px-6 py-6">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm text-white/80"
        >
          <Info className="mt-0.5 h-4.5 w-4.5 text-emerald-300" />
          <p>
            <span className="font-semibold text-white">Bunny Stock</span>은 아래 거래소의 퍼블릭/파트너 API 데이터를
            참고하여 시장 정보를 제공합니다. 본 목록은 데이터 출처이며, 공식 제휴 관계가 아님을 명시합니다.
          </p>
        </motion.div>
      </section>

      {/* 2열 레이아웃 */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-12 md:grid-cols-2">
        {/* 국내 증권사 */}
        <ProviderCard id="domestic" icon={<Building2 className="h-4.5 w-4.5" />} title="국내 증권사" accent>
          <ChipGrid
            items={[
              "삼성증권","미래에셋증권","KB증권",
              "NH투자증권","한국투자증권","신한금융투자",
              "하나증권","키움증권","대신증권",
            ]}
          />
        </ProviderCard>

        {/* 증권거래소 */}
        <ProviderCard id="exchange" icon={<Landmark className="h-4.5 w-4.5" />} title="증권거래소" accent>
          <ChipGrid
            items={[
              "KRX(한국거래소)","NYSE(뉴욕증권거래소)","NASDAQ(나스닥)",
              "LSE(런던증권거래소)","SSE(상하이증권거래소)","TSE(도쿄증권거래소)",
              "HKEX(홍콩증권거래소)","FWB(프랑크푸르트증권거래소)",
            ]}
          />
        </ProviderCard>

        {/* 해외선물거래소 */}
        <ProviderCard id="futures" icon={<CandlestickChart className="h-4.5 w-4.5" />} title="해외선물거래소" accent>
          <ChipGrid
            items={[
              "CME Group","CBOE",
              "ICE(Intercontinental Exchange)","EUREX",
              "SGX(Singapore Exchange)","LIFFE",
            ]}
          />
        </ProviderCard>

        {/* 디지털자산거래소 */}
        <ProviderCard id="crypto" icon={<Coins className="h-4.5 w-4.5" />} title="디지털자산거래소" accent>
          <div className="space-y-4">
            <div>
              <div className="mb-2 text-[13px] font-semibold text-emerald-300">국내 디지털자산거래소</div>
              <ChipGrid items={["Upbit(업비트)","Bithumb(빗썸)","Coinone(코인원)","Korbit(코빗)"]} />
            </div>
            <div>
              <div className="mb-2 text-[13px] font-semibold text-cyan-300">해외 디지털자산거래소</div>
              <ChipGrid
                items={[
                  "Binance(바이낸스)","Coinbase(코인베이스)",
                  "OKX(오케이엑스)","Bitget(비트겟)", "OrangeX(오렌지엑스)", "Deepcoin(딥코인)", "Ecobit(에코빗)"
                ]}
              />
            </div>
          </div>
        </ProviderCard>
      </section>

      {/* 하단 고지 */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-3 text-xs text-white/70 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-white/60" />
            거래소 데이터 활용은 공개 API를 통한 참고 목적에 한해 이루어집니다.
          </div>
          <div className="flex items-center gap-2 md:justify-end">
            <Info className="h-4 w-4 text-emerald-300" />
            Bunny Stock은 이들 기관과 공식 파트너십 관계가 아닙니다.
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------- 파츠 -------- */

function ProviderCard({
  id,
  title,
  icon,
  children,
  accent,
}: {
  id?: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5"
    >
      {accent && (
        <span className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-amber-300/90 to-amber-500/60" />
      )}
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10">
          {icon}
        </span>
        <h3 className="text-base font-extrabold tracking-tight text-white">{title}</h3>
      </div>
      {children}
    </motion.section>
  );
}

function ChipGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((t) => (
        <span
          key={t}
          className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-[13px] text-white/80"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
