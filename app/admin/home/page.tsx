// app/admin/home/page.tsx

import { fetchGaSummaryLast7Days } from "@/lib/ga";

function formatDateLabel(date: string): string {
  // GA 기본 포맷: 'YYYYMMDD'
  if (date.length !== 8) return date;
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  return `${year}.${month}.${day}`;
}

// GA 응답 타입 (이 파일에서만 사용하는 로컬 타입)
type GaRow = {
  date: string;
  sessions: number;
  totalUsers: number;
  screenPageViews: number;
};

type GaTotals = {
  totalSessions: number;
  totalUsers: number;
  totalPageViews: number;
};

// GA 데이터가 자주 바뀌니, 매번 서버에서 새로 가져오도록
export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  let rows: GaRow[] = [];
  let totals: GaTotals = {
    totalSessions: 0,
    totalUsers: 0,
    totalPageViews: 0,
  };
  let hasError = false;

  try {
    const result = await fetchGaSummaryLast7Days();
    rows = result.rows as GaRow[];
    totals = result.totals as GaTotals;
  } catch (e) {
    console.error("[admin/home] GA fetch error:", e);
    hasError = true;
  }

  return (
    <section className="ew-section">
      <div className="ew-page-container space-y-8">
        {/* 헤더 */}
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            Admin 대시보드
          </h1>
          <p className="text-sm text-slate-500">
            최근 7일 기준 Google Analytics 4 데이터를 기반으로
            방문/세션/페이지뷰를 요약한 화면입니다.
          </p>
        </header>

        {/* 에러 안내 */}
        {hasError && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs sm:text-sm text-rose-800">
            GA4 데이터 조회 중 오류가 발생했습니다. 환경 변수(GA4 설정) 또는
            서비스 계정 권한을 확인해 주세요.
          </div>
        )}

        {/* 요약 카드 3개 */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="ew-card-soft px-4 py-4 space-y-1">
            <p className="text-[11px] font-medium text-slate-500">
              최근 7일 총 세션 수
            </p>
            <p className="text-xl font-semibold text-slate-900">
              {totals.totalSessions.toLocaleString("ko-KR")}
            </p>
            <p className="text-[11px] text-slate-400">
              홈, 제품, 뉴스 등 모든 페이지를 합산한 세션 수입니다.
            </p>
          </div>

          <div className="ew-card-soft px-4 py-4 space-y-1">
            <p className="text-[11px] font-medium text-slate-500">
              최근 7일 총 사용자 수
            </p>
            <p className="text-xl font-semibold text-slate-900">
              {totals.totalUsers.toLocaleString("ko-KR")}
            </p>
            <p className="text-[11px] text-slate-400">
              중복을 제거한 순 방문자(유저) 수입니다.
            </p>
          </div>

          <div className="ew-card-soft px-4 py-4 space-y-1">
            <p className="text-[11px] font-medium text-slate-500">
              최근 7일 총 페이지뷰
            </p>
            <p className="text-xl font-semibold text-slate-900">
              {totals.totalPageViews.toLocaleString("ko-KR")}
            </p>
            <p className="text-[11px] text-slate-400">
              모든 페이지의 조회 수 합계입니다.
            </p>
          </div>
        </div>

        {/* 일자별 표 */}
        <div className="ew-card-soft px-4 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              최근 7일 일자별 트래픽
            </h2>
            <p className="text-[11px] text-slate-400">
              latest → earliest 순으로 정렬 (GA 기본 정렬 기준)
            </p>
          </div>

          {rows.length === 0 ? (
            <p className="text-xs text-slate-400">
              아직 GA 데이터가 존재하지 않거나, 조회에 실패했습니다.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] text-slate-500">
                    <th className="py-2 pr-4 text-left font-medium">날짜</th>
                    <th className="py-2 px-4 text-right font-medium">세션</th>
                    <th className="py-2 px-4 text-right font-medium">사용자</th>
                    <th className="py-2 pl-4 text-right font-medium">
                      페이지뷰
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.date}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="py-2 pr-4 text-left text-slate-700">
                        {formatDateLabel(row.date)}
                      </td>
                      <td className="py-2 px-4 text-right text-slate-800">
                        {row.sessions.toLocaleString("ko-KR")}
                      </td>
                      <td className="py-2 px-4 text-right text-slate-800">
                        {row.totalUsers.toLocaleString("ko-KR")}
                      </td>
                      <td className="py-2 pl-4 text-right text-slate-800">
                        {row.screenPageViews.toLocaleString("ko-KR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
