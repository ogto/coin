// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAIN_HOST  = "bunnystock.io";
const ADMIN_HOST = "admin.bunnystock.io";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0]; // 포트 제거
  const path = url.pathname;

  const isLocal     = hostname === "localhost" || hostname === "127.0.0.1";
  const isMainHost  = hostname === MAIN_HOST || hostname === `www.${MAIN_HOST}`;
  const isAdminHost = hostname === ADMIN_HOST;
  const isAdminPath = path.startsWith("/admin");

  const isSystem = path.startsWith("/_next")
                || path.startsWith("/api")
                || path === "/favicon.ico"
                || path === "/robots.txt"
                || path === "/sitemap.xml";

  // === 서버(프로덕션) 정책 ===
  // 메인 도메인에서 /admin/* 접근 시 → 404 페이지로 재작성(보여주기)
  if (!isLocal && isMainHost && isAdminPath) {
    const notFound = url.clone();
    notFound.pathname = "/404";     // 커스텀 404 페이지로
    return NextResponse.rewrite(notFound); // (상태코드는 200이지만 UI는 404 화면)
  }

  // admin 서브도메인: 깔끔한 경로로 표준화(/admin 접두사 제거)
  if (!isLocal && isAdminHost && isAdminPath) {
    const target = url.clone();
    target.pathname = path.replace(/^\/admin/, "") || "/";
    return NextResponse.redirect(target, 308);
  }

  // admin 서브도메인: 내부 라우팅을 위해 /admin 접두사 붙여 rewrite (앱의 /app/admin/* 라우트로 매칭)
  if (!isLocal && isAdminHost && !isAdminPath && !isSystem) {
    const rw = url.clone();
    rw.pathname = `/admin${path}`;
    return NextResponse.rewrite(rw);
  }

  // admin 서브도메인 보호(세션 쿠키)
  if (!isLocal && isAdminHost) {
    const isLogin = path === "/login" || path === "/admin/login";
    const session = req.cookies.get("admin_session")?.value;
    if (!session && !isLogin) {
      const loginUrl = url.clone();
      loginUrl.pathname = "/login"; // 표준 경로
      return NextResponse.redirect(loginUrl);
    }
  }

  // === 로컬 개발 ===
  // 로컬은 /admin/* 경로로 접근 허용 + 보호
  if (isLocal && isAdminPath) {
    const isLogin = path === "/admin/login";
    const session = req.cookies.get("admin_session")?.value;
    if (!session && !isLogin) {
      const loginUrl = url.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
