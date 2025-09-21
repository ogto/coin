// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAIN_HOST  = "bunnystock.io";
const ADMIN_HOST = "admin.bunnystock.io";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|public).*)",
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

  // 메인 도메인에서 /admin/* → 404 화면
  if (!isLocal && isMainHost && isAdminPath) {
    const notFound = url.clone();
    notFound.pathname = "/404";      // app/404/page.tsx 필요
    return NextResponse.rewrite(notFound);
  }

  // admin 서브도메인: /admin 접두사 제거(깨끗한 URL) → /login 같은 형태 유지
  if (!isLocal && isAdminHost && isAdminPath) {
    const target = url.clone();
    target.pathname = path.replace(/^\/admin/, "") || "/";
    return NextResponse.redirect(target, 308);
  }

  // admin 서브도메인: 내부 라우팅을 위해 /admin 접두사 붙여 rewrite
  if (!isLocal && isAdminHost && !isAdminPath) {
    const rw = url.clone();
    rw.pathname = `/admin${path}`;
    return NextResponse.rewrite(rw);
  }

  // admin 서브도메인 보호(세션)
  if (!isLocal && isAdminHost) {
    const isLogin = path === "/login" || path === "/admin/login";
    const session = req.cookies.get("admin_session")?.value;
    if (!session && !isLogin) {
      const loginUrl = url.clone();
      loginUrl.pathname = "/login"; // 공개 주소
      return NextResponse.redirect(loginUrl);
    }
  }

  // 로컬: /admin/* 접근 허용 + 보호
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
