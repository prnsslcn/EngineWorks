// app/admin/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "ew_admin_session";

export async function GET(request: Request) {
  const cookieStore = await cookies();

  // 쿠키 제거 (만료)
  cookieStore.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 0,
  });

  // ✅ 절대 URL 객체로 리다이렉트
  const redirectUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(redirectUrl);
}
