// app/admin/login/page.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "ew_admin_session";

async function verifyPassword(formData: FormData) {
  "use server";

  const password = formData.get("password");
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET ?? "default-secret";
  const from = (formData.get("from") as string | null) ?? "/admin/news";

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is not set");
  }

  if (password !== adminPassword) {
    redirect("/admin/login?error=1");
  }

  const token = Buffer.from(sessionSecret).toString("base64");

  // ✅ Next 16: cookies()는 Promise이므로 await 필요
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8시간
  });

  redirect(from);
}

interface AdminLoginPageProps {
  searchParams?: {
    error?: string;
    from?: string;
  };
}

export default function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const hasError = searchParams?.error;
  const from = searchParams?.from ?? "/admin/news";

  return (
    <div className="ew-page-container min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm ew-card-soft space-y-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            관리자 로그인
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            EngineWorks 및 이후 항공학교 사이트의 뉴스/문의 관리를 위한 관리자
            전용 페이지입니다.
          </p>
        </div>

        {hasError && (
          <p className="text-xs text-red-500">
            비밀번호가 올바르지 않습니다. 다시 시도해 주세요.
          </p>
        )}

        <form action={verifyPassword} className="space-y-4">
          {/* 로그인 후 돌아갈 경로 */}
          <input type="hidden" name="from" value={from} />

          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-600">
              관리자 비밀번호
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="ew-btn-primary w-full justify-center text-sm"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
