// lib/ga.ts
// ❗ 서버 전용: 클라이언트 컴포넌트에서 import 하지 마세요.
import { BetaAnalyticsDataClient, protos } from "@google-analytics/data";

type RunReportRequest = protos.google.analytics.data.v1beta.IRunReportRequest;
type RunReportResponse = protos.google.analytics.data.v1beta.IRunReportResponse;
type Row = protos.google.analytics.data.v1beta.IRow;
type DimensionValue = protos.google.analytics.data.v1beta.IDimensionValue;
type MetricValue = protos.google.analytics.data.v1beta.IMetricValue;

// 브라우저에서 잘못 import되면 바로 에러
if (typeof window !== "undefined") {
  throw new Error("lib/ga.ts must not be imported in the browser.");
}

const propertyId = process.env.GA4_PROPERTY_ID;
const clientEmail = process.env.GA4_CLIENT_EMAIL;
const rawPrivateKey = process.env.GA4_PRIVATE_KEY;

if (!propertyId || !clientEmail || !rawPrivateKey) {
  // Vercel 환경변수 설정 안되면 바로 알 수 있게
  throw new Error(
    "Missing GA4_PROPERTY_ID or GA4_CLIENT_EMAIL or GA4_PRIVATE_KEY",
  );
}

// env에 저장된 private key의 \n 문자 복원
const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey,
  },
});

// 일자별 요약 타입
export interface GaDailyMetrics {
  date: string; // '20251203' 형식
  sessions: number;
  totalUsers: number;
  screenPageViews: number;
}

// 전체 합계 타입
export interface GaSummaryTotals {
  totalSessions: number;
  totalUsers: number;
  totalPageViews: number;
}

/**
 * GA4: 최근 7일(오늘 포함) 세션/유저/페이지뷰 일자별 데이터
 * - admin 대시보드 등에서 사용
 */
export async function fetchGaSummaryLast7Days(): Promise<{
  rows: GaDailyMetrics[];
  totals: GaSummaryTotals;
}> {
  const request: RunReportRequest = {
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "7daysAgo",
        endDate: "today",
      },
    ],
    dimensions: [{ name: "date" }],
    metrics: [
      { name: "sessions" },
      { name: "totalUsers" },
      { name: "screenPageViews" },
    ],
  };

  const [response] = await analyticsDataClient.runReport(request);

  const rows: Row[] = response.rows ?? [];

  const parsedRows: GaDailyMetrics[] = rows.map((row: Row) => {
    const dimensionValues: DimensionValue[] = row.dimensionValues ?? [];
    const metricValues: MetricValue[] = row.metricValues ?? [];

    const date = dimensionValues[0]?.value ?? "";

    const sessions = Number(metricValues[0]?.value ?? 0);
    const totalUsers = Number(metricValues[1]?.value ?? 0);
    const screenPageViews = Number(metricValues[2]?.value ?? 0);

    return {
      date,
      sessions,
      totalUsers,
      screenPageViews,
    };
  });

  const totals: GaSummaryTotals = parsedRows.reduce<GaSummaryTotals>(
    (acc, cur) => ({
      totalSessions: acc.totalSessions + cur.sessions,
      totalUsers: acc.totalUsers + cur.totalUsers,
      totalPageViews: acc.totalPageViews + cur.screenPageViews,
    }),
    {
      totalSessions: 0,
      totalUsers: 0,
      totalPageViews: 0,
    },
  );

  return { rows: parsedRows, totals };
}
