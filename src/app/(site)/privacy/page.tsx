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
          <span className="text-xs">PRIVACY</span>
        </div>
        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          개인정보처리방침
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
{`개인정보처리방침
해강홀딩스 주식회사(이하 “회사”)는 고객님의 개인정보를 소중히 여기며, 「개인정보 보호법」 등 국내 개인정보 관련 법령을 준수합니다. 본 방침을 통해 회사가 수집하는 개인정보, 이용 목적, 보관 기간, 파기 절차, 이용자 권리 등을 안내드립니다.

1. 수집하는 개인정보 항목 및 방법
회사는 회원가입, 상담, 서비스 신청, 유료 결제, 환불 처리 등을 위해 아래와 같은 개인정보를 수집합니다.
•회원가입 시
o필수항목: 이름, 아이디, 비밀번호, 휴대전화번호, 생년월일, 성별, 본인인증 결과값(CI), 접속 로그, 접속 IP
o선택항목: 이메일, 거주지역
•유료 서비스 결제 시
o현금결제(무통장입금): 은행명, 계좌번호, 입금자명, 휴대전화번호, 이메일
o환불 시: 계좌번호, 은행명, 예금주
•이벤트 및 프로모션(선택)
o이름, 휴대전화번호, 이메일, 마케팅 수신동의 여부
※ 회사는 만 14세 미만 아동의 회원가입은 받지 않습니다.
※ 개인정보는 홈페이지 회원가입, 상담, 결제, 환불요청 시 직접 입력 또는 전자적 수단으로 수집됩니다.

2. 개인정보의 수집 및 이용목적
회사가 수집한 개인정보는 다음 목적에만 사용됩니다.
1.서비스 제공 및 운영(회원 식별, 본인확인, 투자정보 제공)
2.요금 결제 및 정산, 환불 처리
3.민원처리, 고지사항 전달
4.이벤트 및 광고성 정보 제공(선택 동의 시)
5.법령 준수 및 불법 이용 방지

3. 개인정보의 보유 및 이용기간
회사는 회원가입일부터 서비스 이용기간 동안만 개인정보를 보관하며, 탈퇴·동의 철회 시 지체 없이 파기합니다.
다만, 관계 법령에 따라 일정 기간 보관이 필요한 경우는 아래와 같습니다.
•계약·청약철회 기록: 5년 (전자상거래법)
•대금결제 및 공급 기록: 5년 (전자상거래법)
•소비자 불만·분쟁처리 기록: 3년 (전자상거래법)
•접속 로그·IP: 3개월 (통신비밀보호법)

4. 개인정보 파기 절차 및 방법
보유기간이 종료되거나 목적이 달성된 개인정보는 지체 없이 파기합니다.
•전자파일: 복구 불가능한 기술적 방법으로 삭제
•종이 문서: 분쇄 또는 소각 처리

5. 개인정보의 제3자 제공
회사는 원칙적으로 회원의 개인정보를 외부에 제공하지 않습니다. 다만, 아래 경우는 예외로 합니다.
1.법령에 근거한 요청이 있는 경우
2.회원이 사전에 동의한 경우

6. 개인정보 처리의 위탁
회사는 서비스 운영을 위해 일부 업무를 외부에 위탁할 수 있으며, 이 경우 관계 법령에 따라 안전하게 관리되도록 조치합니다. 위탁 발생 시 대상자, 목적, 기간을 별도 공지 또는 동의를 거쳐 안내합니다.

7. 이용자의 권리
회원은 언제든 자신의 개인정보를 조회·수정·삭제하거나 회원탈퇴를 요청할 수 있습니다.
•홈페이지의 [마이페이지] → 개인정보변경 / 회원탈퇴 메뉴 이용
•또는 고객센터(info@bunnystock.io)로 이메일 요청

8. 개인정보 자동수집 장치(쿠키) 운영
회사는 맞춤형 서비스 제공을 위해 쿠키를 사용할 수 있습니다.
회원은 웹브라우저 설정에서 쿠키 저장 거부를 할 수 있으며, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.

9. 개인정보 보호를 위한 기술적·관리적 대책
•비밀번호 암호화 저장
•최신 보안 솔루션 적용 및 해킹·바이러스 방지
•개인정보 접근 권한 최소화 및 정기적 보안 교육

10. 개인정보보호 책임자 및 민원 서비스
회사는 개인정보 보호와 관련 민원을 신속히 처리하기 위해 개인정보보호책임자를 지정하고 있습니다.
•개인정보보호책임자: [성명 기재]
•이메일: info@bunnystock.io
※ 권익침해 관련 문의 기관
•개인정보침해신고센터 (국번없이 118 / privacy.kisa.or.kr)
•개인정보분쟁조정위원회 (1833-6972 / www.kopico.go.kr)
•대검찰청 사이버수사과 (국번없이 1301 / www.spo.go.kr)
•경찰청 사이버수사국 (국번없이 182 / ecrm.cyber.go.kr)

11. 개인정보처리방침 변경
회사가 본 방침을 변경할 경우, 시행 최소 7일 전 홈페이지 공지사항을 통해 알립니다.
시행일자: 2025년 09월 17일`}
          </pre>
        </motion.div>
      </section>
    </main>
  );
}

