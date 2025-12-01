// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "ew_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin 아래는 모두 보호 (단 /admin/login 은 예외)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET ?? "default-secret";
    const expectedToken = Buffer.from(sessionSecret).toString("base64");

    const isAuthed = token && token === expectedToken;

    if (!isAuthed) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
