import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// const MAIN_HOST  = "bunnystock.io";
const MAIN_HOST  = "haegang.io";
// const ADMIN_HOST = "admin.bunnystock.io";
const ADMIN_HOST = "admin.haegang.io";

export const config = {
  matcher: [
    // 정적/이미지/API는 미들웨어 제외 (중요!)
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|public|api).*)",
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0];
  const path = url.pathname;

  const isLocal     = hostname === "localhost" || hostname === "127.0.0.1";
  const isMainHost  = hostname === MAIN_HOST || hostname === `www.${MAIN_HOST}`;
  const isAdminHost = hostname === ADMIN_HOST;

  const isAdminPath = path.startsWith("/admin");
  const isLoginPath = path === "/login" || path === "/admin/login";

  // ─────────────────────────────────────────────
  // 1) 메인 도메인에서 /admin/* 접근 시 → 404 UI
  // ─────────────────────────────────────────────
  if (!isLocal && isMainHost && isAdminPath) {
    const notFound = url.clone();
    notFound.pathname = "/404"; // app/404/page.tsx
    return NextResponse.rewrite(notFound);
  }

  // ─────────────────────────────────────────────
  // 2) ADMIN 서브도메인 정책
  //    - 루트 접근 시 /login 으로
  //    - URL은 /admin 접두사 없이 노출(클린 URL)
  //    - 인증 보호(쿠키 없으면 /login)
  //    - 내부적으로는 /app/admin/* 로 rewrite
  // ─────────────────────────────────────────────
  if (!isLocal && isAdminHost) {
    // 2-1) 루트 -> /login
    if (path === "/" || path === "/admin") {
      const login = url.clone();
      login.pathname = "/login";
      return NextResponse.redirect(login, 308);
    }

    // 2-2) /admin 접두사가 붙어 들어온 경우 → 깔끔한 경로로 정규화
    if (isAdminPath) {
      const to = url.clone();
      to.pathname = path.replace(/^\/admin/, "") || "/";
      return NextResponse.redirect(to, 308);
    }

    // 2-3) 인증 보호 (API는 matcher에서 제외됨)
    const hasSession = Boolean(req.cookies.get("admin_session")?.value);
    if (!hasSession && !isLoginPath) {
      const login = url.clone();
      login.pathname = "/login";
      return NextResponse.redirect(login);
    }

    // 2-4) 내부 라우팅을 위해 /admin 접두사 붙여 rewrite
    const rw = url.clone();
    rw.pathname = `/admin${path}`;
    return NextResponse.rewrite(rw);
  }

  // ─────────────────────────────────────────────
  // 3) 로컬 개발: /admin/* 그대로 사용 + 보호
  // ─────────────────────────────────────────────
  if (isLocal && isAdminPath) {
    const hasSession = Boolean(req.cookies.get("admin_session")?.value);
    if (!hasSession && !isLoginPath) {
      const login = url.clone();
      login.pathname = "/admin/login";
      return NextResponse.redirect(login);
    }
    // 로컬은 /admin/* 경로 그대로 사용
    return NextResponse.next();
  }

  return NextResponse.next();
}
