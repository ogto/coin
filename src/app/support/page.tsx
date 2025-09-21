// src/app/support/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Megaphone,
  CircleHelp,
  MessageSquare,
  LifeBuoy,
  AlertTriangle,
  Scale,
  ShieldCheck,
  FileText,
  Info,
} from "lucide-react";

// 공통 모션
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 } as const;
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT },
};

export default function SupportCompliancePage() {
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
          <Sparkles className="h-3.5 w-3.5" /> 고객 지원 & 컴플라이언스
        </motion.div>

        <motion.h1
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl"
        >
          고객 지원<span className="text-amber-300">&</span>법적 컴플라이언스
        </motion.h1>

        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-2 h-1 w-28 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"
        />
      </section>

      {/* 2열 레이아웃 */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 md:grid-cols-2">
        {/* ===== 좌: 고객 지원 ===== */}
        <div className="space-y-6">
          <SectionTitle icon={<LifeBuoy className="h-4.5 w-4.5" />} title="고객 지원" color="emerald" />

          {/* 공지사항 */}
          <Card id="notice" accent="amber" icon={<Megaphone className="h-4.5 w-4.5" />} title="공지사항">
            <Bullets>
              <Bullet>서비스 공지, 업데이트 안내</Bullet>
              <Bullet>시장 이벤트, 세미나 일정</Bullet>
              <Bullet>시스템 점검, 서비스 일시중단 안내</Bullet>
            </Bullets>
          </Card>

          {/* FAQ */}
          <Card id="faq" icon={<CircleHelp className="h-4.5 w-4.5" />} title="자주 묻는 질문 (FAQ)">
            <Bullets>
              <Bullet>서비스 이용 관련 FAQ</Bullet>
              <Bullet>회원가입/결제 관련 질문</Bullet>
              <Bullet>정보 서비스 이용 안내</Bullet>
            </Bullets>
          </Card>

          {/* 문의 & 상담 */}
          <Card id="contact" icon={<MessageSquare className="h-4.5 w-4.5" />} title="문의 & 상담">
            <Bullets>
              <Bullet>온라인 문의 양식 (24시간)</Bullet>
              <Bullet>정보상담 예약 시스템</Bullet>
              <Bullet>교육 프로그램 상담</Bullet>
            </Bullets>
          </Card>

          <SmallNote icon="info">
            고객 지원 채널은 간결하고 직관적으로 구성해야 합니다.
          </SmallNote>
        </div>

        {/* ===== 우: 법적 컴플라이언스 ===== */}
        <div className="space-y-6">
          <SectionTitle icon={<Scale className="h-4.5 w-4.5" />} title="법적 컴플라이언스" color="amber" />

          {/* 유사투자자문업 법적 고지 */}
          <Card id="advisory" accent="amber" icon={<AlertTriangle className="h-4.5 w-4.5 text-amber-300" />} title="유사투자자문업 법적 고지">
            <Bullets>
              <Bullet>버니스탁은 ‘유사투자자문업자’로 정식 금융투자업자가 아님</Bullet>
              <Bullet>개별 1:1 투자자문 불가 (불특정 다수 대상 정보제공만 가능)</Bullet>
              <Bullet>금융위원회 신고된 유사투자자문업자임을 명시</Bullet>
            </Bullets>
          </Card>

          {/* 투자 위험 고지 */}
          <Card id="risk" icon={<FileText className="h-4.5 w-4.5" />} title="투자 위험 고지">
            <Bullets>
              <Bullet>투자는 원금 손실 가능성이 있음</Bullet>
              <Bullet>투자 결정과 책임은 고객 본인에게 있음</Bullet>
              <Bullet>과거 수익률이 미래 수익을 보장하지 않음</Bullet>
            </Bullets>
          </Card>

          {/* 개인정보 & 이용약관 */}
          <Card id="privacy" icon={<ShieldCheck className="h-4.5 w-4.5" />} title="개인정보 & 이용약관">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <div className="mb-1 text-[13px] font-semibold text-emerald-300">개인정보처리방침</div>
                <Bullets tight>
                  <Bullet>정보 수집 및 이용 목적</Bullet>
                  <Bullet>보관 기간 및 파기 절차</Bullet>
                  <Bullet>제3자 제공 여부</Bullet>
                </Bullets>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <div className="mb-1 text-[13px] font-semibold text-amber-300">서비스 이용약관</div>
                <Bullets tight>
                  <Bullet>서비스 이용 조건</Bullet>
                  <Bullet>회원 의무 사항</Bullet>
                  <Bullet>서비스 제한 및 책임</Bullet>
                </Bullets>
              </div>
            </div>
          </Card>

          <SmallNote icon="law">
            법적 고지사항은 모든 페이지의 하단에 명시해야 합니다.
          </SmallNote>
        </div>
      </section>
    </main>
  );
}

/* ====== UI 파츠 ====== */
function SectionTitle({ icon, title, color }: { icon: React.ReactNode; title: string; color: "emerald" | "amber" }) {
  return (
    <div className={`mb-1 flex items-center gap-2 ${color === "emerald" ? "text-emerald-300" : "text-amber-300"}`}>
      {icon}
      <span className="text-lg font-semibold text-white">{title}</span>
    </div>
  );
}

function Card({
  id,
  icon,
  title,
  children,
  accent,
}: {
  id?: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accent?: "amber";
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
      {accent === "amber" && (
        <span className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-amber-300/90 to-amber-500/60" />
      )}
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10">
          {icon}
        </span>
        <h3 className="text-base font-extrabold tracking-tight text-white">{title}</h3>
      </div>
      <div className="text-sm text-white/85">{children}</div>
    </motion.section>
  );
}

function Bullets({ children, tight = false }: { children: React.ReactNode; tight?: boolean }) {
  return <ul className={`space-y-${tight ? "[6px]" : "2"} mt-1` as any}>{children}</ul>;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
      <span>{children}</span>
    </li>
  );
}

function SmallNote({ children, icon }: { children: React.ReactNode; icon: "info" | "law" }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs text-white/70">
      {icon === "info" ? (
        <Info className="h-4 w-4 text-white/60" />
      ) : (
        <Scale className="h-4 w-4 text-amber-300" />
      )}
      {children}
    </div>
  );
}
