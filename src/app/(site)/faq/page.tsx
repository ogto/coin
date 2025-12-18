"use client";

import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Search } from "lucide-react";

/* =========================
   스타일/애니메이션 공통
========================= */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT },
};
const VIEWPORT = { once: true, amount: 0.2, margin: "-64px 0px -10% 0px" } as const;

/* =========================
   타입/데이터
========================= */
type FAQ = {
  q: string;
  a: React.ReactNode;
  searchText: string;
};

const FAQS: FAQ[] = [
  {
    q: "Hae Gang은 어떤 회사인가요?",
    a: (
      <p className="text-white/90">
        Hae Gang은 금융위원회에 정식 신고된 유사투자자문업체로, 투자자가 합리적인 의사결정을 할 수 있도록
        시장 정보, 데이터 분석, 투자 교육을 제공하는 전문 기관입니다.
      </p>
    ),
    searchText:
      "Hae Gang 어떤 회사 금융위원회 정식 신고 유사투자자문 시장 정보 데이터 분석 투자 교육",
  },
  {
    q: "제공되는 정보는 투자 추천이나 매수·매도 지시인가요?",
    a: (
      <p className="text-white/90">
        아닙니다. 모든 정보는 <b className="text-white">참고용 자료</b>이며,
        특정 종목 매수·매도 권유나 수익 보장은 하지 않습니다. 투자 판단과 최종 책임은 투자자 본인에게 있습니다.
      </p>
    ),
    searchText:
      "투자 추천 매수 매도 지시 아님 참고용 수익 보장 없음 투자 판단 책임 투자자 본인",
  },
  {
    q: "서비스는 어떤 방식으로 제공되나요?",
    a: (
      <div className="space-y-2 text-white/90">
        <p>리포트, 온라인 강의, 세미나, 데이터 브리핑 등으로 제공됩니다.</p>
        <p>회원 전용 홈페이지·메일·텔레그램 채널 등을 통해 정기적으로 받아보실 수 있습니다.</p>
      </div>
    ),
    searchText:
      "서비스 방식 리포트 온라인 강의 세미나 데이터 브리핑 회원 전용 홈페이지 메일 텔레그램 정기 발송",
  },
  {
    q: "국내주식 외에도 해외주식, 디지털자산 정보도 제공하나요?",
    a: (
      <p className="text-white/90">
        네. 국내 주식 외에도 해외 주요 지수·선물·경제지표 분석과 디지털자산(암호화폐) 시장 동향 및
        온체인 데이터를 객관적으로 정리해 드립니다.
      </p>
    ),
    searchText:
      "해외주식 디지털자산 암호화폐 지수 선물 경제지표 온체인 데이터 시장 동향",
  },
  {
    q: "교육 프로그램은 어떤 과정이 있나요?",
    a: (
      <ul className="space-y-1 text-white/90">
        <li>• 기초 투자 이해</li>
        <li>• 차트 및 기술적 분석 심화</li>
        <li>• 투자심리 및 리스크 관리</li>
        <li className="text-white/80">온라인 강의와 오프라인 세미나를 병행해 다양한 학습 환경을 제공합니다.</li>
      </ul>
    ),
    searchText:
      "교육 프로그램 기초 투자 이해 차트 기술적 분석 심화 투자심리 리스크 관리 온라인 오프라인 세미나",
  },
  {
    q: "서비스 이용은 무료인가요, 유료인가요?",
    a: (
      <div className="space-y-1 text-white/90">
        <p>기본 공지 및 일부 콘텐츠는 <b className="text-white">무료</b>로 제공됩니다.</p>
        <p>심화 리포트·전문 강의·분석 자료는 회원 등급(멤버십)에 따라 <b className="text-white">차등 제공</b>됩니다.</p>
      </div>
    ),
    searchText:
      "무료 유료 멤버십 등급 심화 리포트 전문 강의 분석 자료 차등 제공",
  },
  {
    q: "투자자 보호는 어떻게 이루어지나요?",
    a: (
      <ul className="space-y-1 text-white/90">
        <li>• 금융소비자 보호 규정 준수</li>
        <li>• 자료와 출처를 투명하게 공개</li>
        <li>• 과장·허위 없는 정보 제공</li>
        <li>• 투자 위험 요소 명확 안내</li>
      </ul>
    ),
    searchText:
      "투자자 보호 금융소비자 보호 규정 투명 공개 과장 허위 없음 위험 요소 안내",
  },
  {
    q: "회원 가입 시 어떤 혜택이 있나요?",
    a: (
      <ul className="space-y-1 text-white/90">
        <li>• 주간/월간 리포트 열람</li>
        <li>• 교육 프로그램 참여</li>
        <li>• 전용 자료실 이용</li>
        <li>• 등급별 프리미엄 분석 및 아카데미 과정 제공</li>
      </ul>
    ),
    searchText:
      "회원 가입 혜택 주간 월간 리포트 교육 프로그램 전용 자료실 프리미엄 분석 아카데미",
  },
  {
    q: "상담이나 문의는 어떻게 하나요?",
    a: (
      <p className="text-white/90">
        홈페이지 내 고객센터 문의폼 또는 이메일을 통해 상담하실 수 있으며, 빠른 답변을 위해 전담팀이 운영되고 있습니다.
      </p>
    ),
    searchText:
      "상담 문의 고객센터 문의폼 이메일 전담팀 빠른 답변",
  },
  {
    q: "법적으로 안전한 서비스인가요?",
    a: (
      <p className="text-white/90">
        네. Hae Gang은 금융위원회에 신고된 합법적 유사투자자문업체로,
        법령 범위 내에서 <b className="text-white">정보 제공과 교육</b>만 수행합니다. 투자 권유·수익 보장 행위는 일절 하지 않습니다.
      </p>
    ),
    searchText:
      "법적 안전 금융위원회 신고 합법 유사투자자문 법령 정보 제공 교육 수익 보장 없음",
  },
];

/* =========================
   컴포넌트
========================= */
export default function FAQPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter(
      (f) =>
        f.q.toLowerCase().includes(q) || f.searchText.toLowerCase().includes(q)
    );
  }, [query]);

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

      {/* 상단 히어로 이미지 */}
      <section className="relative">
        <div className="relative h-60 w-full sm:h-80 md:h-[30rem]">
          <Image
            src="/new_images/15.png"
            alt="자주 묻는 질문"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* 가독성 오버레이 */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.55))]" />
          <div className="absolute inset-0 [background:radial-gradient(60%_40%_at_50%_60%,rgba(0,0,0,0),rgba(0,0,0,0.35))]" />
          {/* 타이틀 */}
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/85 backdrop-blur">
                <HelpCircle className="h-5 w-5" />
                자주 묻는 질문
              </div>
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                FAQ
              </h1>
              <p className="mt-2 text-base text-white/85 sm:text-lg">
                서비스 이용 전, 꼭 확인해 보세요.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="relative mx-auto max-w-4xl px-6 py-12">
        {/* 검색바 */}
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="mb-8 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3"
        >
          <Search className="h-6 w-6 text-white/65" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="질문을 검색하세요 (예: 회원, 교육, 해외, 무료)"
            className="w-full bg-transparent text-base text-white placeholder:text-white/45 focus:outline-none sm:text-lg"
          />
        </motion.div>

        {/* 리스트 */}
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04]">
          {filtered.map((item, idx) => (
            <FAQItem key={idx} idx={idx} q={item.q} a={item.a} />
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-base text-white/70">
              검색 결과가 없습니다. 다른 키워드로 검색해 보세요.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function FAQItem({
  idx,
  q,
  a,
}: {
  idx: number;
  q: string;
  a: React.ReactNode;
}) {
  const [open, setOpen] = useState(idx < 2); // 처음 2개는 펼쳐두기
  const panelId = `faq-panel-${idx}`;
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="px-5 sm:px-7">
      <button
        className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
          {q}
        </span>
        <span
          className={[
            "grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden
        >
          <ChevronDown className="h-6 w-6 text-white/75" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="pb-6 text-base leading-8 sm:text-lg sm:leading-9">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 아이템 구분선 */}
      <div className="h-px bg-white/10" />
    </div>
  );
}
