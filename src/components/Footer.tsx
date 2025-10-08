import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0b1220]">
      {/* 은은한 배경 글로우 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 40% at 10% 0%, rgba(16,185,129,0.12), transparent), radial-gradient(60% 40% at 90% 0%, rgba(56,189,248,0.10), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* 상단: 브랜드 + 네비 */}
        <div className="grid gap-10 py-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex flex-col items-start gap-3">
              <Image
                src="/images/logo.png"
                alt="BUNNY STOCK"
                width={128}
                height={128}
                className="rounded-xl"
                priority
              />
              <div className="text-sm text-white/70">데이터 기반 투자 인텔리전스</div>
            </div>

            <p className="mt-4 max-w-lg text-sm leading-6 text-white/60">
              신뢰할 수 있는 데이터와 절제된 인터랙션으로, 변동성 속에서도 흔들리지 않는 결정을 돕습니다.
            </p>

            {/* 소셜 (외부 링크는 a 태그 유지) */}
            {/* <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                aria-label="YouTube"
                className="rounded-full border border-white/20 bg-[#0b1220] p-2 text-white/70 transition hover:-translate-y-0.5 hover:shadow-md hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.8 15.5v-7L16 12l-6.2 3.5z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="X"
                className="rounded-full border border-white/20 bg-[#0b1220] p-2 text-white/70 transition hover:-translate-y-0.5 hover:shadow-md hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2H22l-7 8.1L23.5 22H17l-5-6.5L6 22H1.9l7.6-8.8L.8 2H7l4.5 6L18.9 2zM6.9 3.7H4.7l12.6 16.7h2.2L6.9 3.7z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="rounded-full border border-white/20 bg-[#0b1220] p-2 text-white/70 transition hover:-translate-y-0.5 hover:shadow-md hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5A12 12 0 0 0 0 12.7c0 5.4 3.4 10 8.2 11.6.6.1.8-.3.8-.6v-2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.5-1.8-1.5-1.8-1.2-.8 0-.8.1-.8 1.3.1 2 1.3 2 1.3 1.2 2 3.1 1.4 3.9 1.1.1-.9.5-1.4.8-1.8-2.7-.3-5.6-1.4-5.6-6.3 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.3 1-.3 2-.4 3-.4s2 .1 3 .4c2.4-1.6 3.4-1.3 3.4-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2.1 1.3 3.5 0 4.9-2.9 6-5.6 6.3.5.4.9 1.2.9 2.4v3.6c0 .3.2.7.8.6A12 12 0 0 0 24 12.7 12 12 0 0 0 12 .5z"/>
                </svg>
              </a>
            </div> */}
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <div className="mb-3 text-sm font-semibold text-white">회사</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link className="hover:text-white" href="/about">소개</Link></li>
                <li><Link className="hover:text-white" href="/careers">채용</Link></li>
                <li><Link className="hover:text-white" href="/newsroom">뉴스룸</Link></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-sm font-semibold text-white">고객지원</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link className="hover:text-white" href="/consult">상담신청</Link></li>
                <li><Link className="hover:text-white" href="/faq">자주 묻는 질문</Link></li>
                <li><Link className="hover:text-white" href="/guide">가이드</Link></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-sm font-semibold text-white">정책</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link className="hover:text-white" href="/terms">이용약관</Link></li>
                <li><Link className="hover:text-white" href="/privacy">개인정보처리방침</Link></li>
                <li><Link className="hover:text-white" href="/legalNotice">법적고지</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-px w-full bg-white/10" />

        {/* 회사 정보 + 카피라이트 */}
        <div className="grid gap-4 py-8 md:grid-cols-2">
          <div className="text-xs leading-6 text-white/60">
            <div>상호: 버니스탁 주식회사 / Bunny Stock Co, Ltd. | 대표: 이서우 | 사업자등록번호: 110-86-19547</div>
            <div>주소: 서울특별시 강남구 도곡로 7길, 5층 | Email. info@Bunnystock.io</div>
          </div>
          <div className="flex items-end justify-start md:justify-end">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} BUNNY STOCK. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
