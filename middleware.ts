// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "ew_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) /admin 아래만 처리
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // 2) 로그인/로그아웃 페이지는 항상 허용
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/logout")
  ) {
    return NextResponse.next();
  }

  // 3) ✅ 서버 액션 요청은 건들지 않기
  //    Next.js 서버 액션 요청에는 Next-Action 헤더가 붙습니다.
  const isServerAction =
    req.method !== "GET" && req.headers.get("Next-Action") != null;

  if (isServerAction) {
    // 서버 액션은 별도의 보호 로직을 서버 액션 내부에서 처리할 수 있음
    return NextResponse.next();
  }

  // 4) 그 외 /admin/** 는 쿠키로 보호
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET ?? "default-secret";
  const expectedToken = Buffer.from(sessionSecret).toString("base64");

  const isAuthed = token && token === expectedToken;

  if (!isAuthed) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
