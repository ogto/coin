"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#0b1220]">
      {/* 은은한 배경 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 35% at 0% 0%, rgba(16,185,129,.14), transparent), radial-gradient(50% 30% at 100% 0%, rgba(56,189,248,.12), transparent)",
        }}
      />

      {/* 헤더 */}
      <section className="relative mx-auto max-w-5xl px-6 pt-20 sm:pt-24">
        <div className="mb-6 flex items-center gap-2 text-white/80">
          <ShieldCheck className="h-4.5 w-4.5 text-emerald-300" />
          <span className="text-xs">Legal notice</span>
        </div>
        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          법적고지
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/60">
        </div>
      </section>

      {/* 큰 네모 박스 */}
      <section className="relative mx-auto max-w-5xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_10px_40px_rgba(0,0,0,.25)] sm:p-8"
        >
          <pre className="whitespace-pre-wrap text-sm leading-7 text-white/80">
{`법적고지
본 법적고지는 주식회사 해강홀딩스(이하 “회사”)가 운영하는 웹사이트 및 온라인 서비스(이하 “본 사이트”) 이용자에게 적용됩니다.
본 사이트는 회원가입 없이 일부 서비스를 열람할 수 있으나, 게시글 작성·유료정보 열람 등 주요 서비스는 회원약관에 동의한 회원에게만 제공됩니다.
본 법적고지의 세부사항에 대해 문의가 있으시면 아래 고객센터로 연락 바랍니다.
📩 고객센터 이메일: info@bunnystock.io

1. 저작권 및 지적재산권
본 사이트에서 제공되는 모든 서비스, 데이터, 콘텐츠, 화면구성, 분석자료 등에 관한 저작권 및 기타 지식재산권은 회사에 귀속됩니다.
이용자는 회사의 사전 서면동의 없이 이를 무단 복제, 배포, 전송, 출판, 방송, 변형, 수정, 2차적 저작, 기타 방법으로 사용하거나 제3자에게 제공할 수 없습니다.

2. 투자정보의 성격
회사가 제공하는 데이터 및 분석자료는 투자판단에 참고할 수 있는 일반적인 정보 제공을 목적으로 하며, 특정 금융투자상품의 매수·매도·보유를 권유하거나 투자중개·일임을 수행하는 것이 아닙니다.
본 사이트에서 제공되는 정보에는 지연·오류가 발생할 수 있으며, 회사 및 제휴 정보제공자는 이에 대해 어떠한 책임도 부담하지 않습니다.

3. 투자책임의 한계
이용자가 본 사이트를 통해 제공된 정보에 의존하여 투자 결정을 내릴 경우, 손실이 발생할 수 있습니다.
최종적인 투자판단 및 책임은 전적으로 이용자 본인에게 있으며, 회사는 그로 인하여 발생하는 직접·간접적 손해에 대해 일체 책임을 지지 않습니다.

4. 금지행위
이용자는 본 사이트를 통해 다음과 같은 행위를 해서는 안 됩니다.
욕설, 비방, 외설, 폭력적 내용, 허위사실, 불법 정보의 게시 및 유포
악성코드·바이러스·스팸성 정보 전송
동일 또는 유사한 내용의 반복 게시, 다량 정보 전송 등 서비스 운영 방해
타인의 동의 없는 광고성 정보 발송
서버·네트워크를 방해하거나 정책·절차 위반
위반 게시물이나 링크는 회사가 수정·삭제할 수 있으며, 위반 정도에 따라 회원탈퇴 등 제재가 가해질 수 있습니다.

5. 게시물 및 면책
본 사이트의 게시판에 게재된 글, 의견, 자료 등은 작성자의 책임으로 하며, 회사와 직접적인 관련이 없습니다.
게시물로 인해 발생한 법적 책임은 전적으로 게시자 또는 열람자가 부담합니다.
또한 회사는 이용자 간, 혹은 이용자와 제3자 간 발생한 분쟁에 개입할 의무가 없으며, 이에 대해 책임을 지지 않습니다.`}
          </pre>
        </motion.div>
      </section>
    </main>
  );
}

