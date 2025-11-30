// app/page.tsx

import Link from "next/link";
import { fetchAllProducts, EngineProduct } from "@/lib/products";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const HIGHLIGHTS = [
  {
    title: "엔진·제어 통합 플랫폼",
    body: "엔진 본체, 제어기, 모니터링까지 하나의 플랫폼에서 설계·제공하여 복잡한 산업 현장을 단순하게 만듭니다.",
  },
  {
    title: "실시간 상태 모니터링",
    body: "부하, 온도, 진동, 연료 사용량을 실시간으로 수집하고 이상 징후를 사전에 감지합니다.",
  },
  {
    title: "데이터 기반 유지보수",
    body: "운전 데이터를 바탕으로 점검 시기와 부품 교체 타이밍을 예측하여 다운타임을 줄입니다.",
  },
];

function getProductTagline(product: EngineProduct): string {
  switch (product.category) {
    case "industrial":
      return "중공업 · 플랜트용 고출력 산업용 엔진";
    case "power-gen":
      return "데이터센터 · 병원용 발전기 셋 전용 엔진";
    case "marine":
      return "해양 환경에 최적화된 선박 추진 및 보조 동력";
    default:
      return "다양한 현장을 위한 고성능 엔진";
  }
}

export const revalidate = 600; // 10분마다 재생성

export default async function HomePage() {
  const allProducts: EngineProduct[] = await fetchAllProducts();
  const featuredEngines = allProducts.slice(0, 3);

  return (
    <div className="ew-section space-y-20">
      {/* HERO 섹션 */}
      <ScrollReveal from="up">
        <section className="space-y-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
            {/* Left Copy */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>High-Performance Industrial Engine Platform</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                  고성능&nbsp;
                  <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                    산업용 엔진
                  </span>
                  으로
                  <br className="hidden sm:block" />
                  산업 현장의 심장을 설계합니다.
                </h1>
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
                  EngineWorks는 발전설비, 해양, 중공업, 인프라 현장을 위한
                  고출력·고효율 엔진과 운영 솔루션을 제공합니다. 설계부터
                  시운전, 예방 정비까지 전 과정을 함께하는 엔지니어링
                  파트너입니다.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/products" className="ew-btn-primary">
                  엔진 라인업 보기
                </Link>
                <Link href="/contact" className="ew-btn-ghost">
                  프로젝트 상담 문의
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-400">
                <span>• 500–2,000 kW급 디젤/가스 엔진</span>
                <span>• 실시간 상태 모니터링 · 원격 제어</span>
                <span>• 글로벌 서비스 네트워크</span>
              </div>
            </div>

            {/* Right: 하이엔드 카드 (요약 콘솔) */}
            <ScrollReveal from="up" delay={150}>
              <div className="relative">
                <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white via-white to-slate-100 shadow-[0_30px_80px_rgba(15,23,42,0.12)] -z-10" />
                <div className="ew-card-soft rounded-[24px] p-5 sm:p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-500">
                        실시간 엔진 플릿 스냅샷 (예시)
                      </p>
                      <p className="text-sm text-slate-400">
                        실제 구축 시 각 현장의 엔진 데이터를 연동할 수 있습니다.
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-900 text-white text-[11px] px-3 py-1">
                      Demo View
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                        <div>
                          <p className="text-[11px] text-slate-500">
                            플랜트 #03
                          </p>
                          <p className="text-sm font-medium text-slate-900">
                            발전기 셋 A
                          </p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-600">
                          운전 중
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                        <div>
                          <p className="text-[11px] text-slate-500">
                            조선소 #12
                          </p>
                          <p className="text-sm font-medium text-slate-900">
                            시운전 베이
                          </p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                          대기
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                        <p className="text-[11px] text-slate-500 mb-1">
                          평균 부하율 (전 플릿)
                        </p>
                        <p className="text-lg font-semibold text-slate-900">
                          76%
                        </p>
                        <p className="text-[11px] text-emerald-600">
                          정상 범위, 추가 여유 있음
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                        <p className="text-[11px] text-slate-500 mb-1">
                          예상 유지보수까지
                        </p>
                        <p className="text-lg font-semibold text-slate-900">
                          12일
                        </p>
                        <p className="text-[11px] text-amber-600">
                          예방 점검 일정 검토 권장
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 space-y-1.5">
                    <p className="text-[11px] text-slate-500">
                      에이전트 코멘트
                    </p>
                    <p className="text-xs text-slate-700">
                      플랜트 #03 엔진의 냉각수 온도가 기준치보다 3℃ 높습니다.
                      부하 패턴과 냉각 라인 상태를 함께 점검하는 것을
                      추천합니다.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* 대표 엔진 라인업 */}
      <ScrollReveal from="up">
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div className="space-y-1">
              <h2 className="ew-section-title">EngineWorks 대표 엔진 라인업</h2>
              <p className="ew-section-subtitle max-w-xl">
                Supabase에 등록된 엔진 데이터 중 대표적인 3종을 스냅샷 형태로
                보여줍니다. (데이터는 언제든지 확장·수정 가능)
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 ew-link-underline"
            >
              전체 엔진 목록 보기 →
            </Link>
          </div>

          {featuredEngines.length === 0 ? (
            <p className="text-sm text-slate-400">
              아직 등록된 엔진 제품이 없습니다. Supabase의{" "}
              <code>engine_product</code> 테이블에 데이터를 추가해 주세요.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {featuredEngines.map((engine) => (
                <article
                  key={engine.id}
                  className="ew-card ew-card-interactive h-full flex flex-col p-4 sm:p-5"
                >
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                        {engine.name}
                      </h3>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
                        {engine.slug}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {getProductTagline(engine)}
                    </p>
                  </div>
                  <dl className="mb-3 space-y-1 text-xs sm:text-sm text-slate-600">
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-slate-400">출력 범위</dt>
                      <dd className="font-medium">{engine.power}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-slate-400">연료 타입</dt>
                      <dd className="font-medium">{engine.fuel}</dd>
                    </div>
                  </dl>
                  <p className="text-xs sm:text-sm text-slate-600 flex-1 whitespace-pre-wrap">
                    {engine.description_md}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-[11px] sm:text-xs">
                    <Link
                      href={`/products/${engine.slug}`}
                      className="font-medium text-slate-900 hover:underline"
                    >
                      상세 페이지 열기 →
                    </Link>
                    <Link
                      href="/contact"
                      className="text-slate-500 hover:text-slate-900 hover:underline"
                    >
                      이 엔진으로 상담
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </ScrollReveal>

      {/* 기술 / 서비스 소개 */}
      <ScrollReveal from="up" delay={100}>
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="ew-section-title">
              엔진 그 이상을 제공하는 기술·서비스
            </h2>
            <p className="ew-section-subtitle max-w-2xl">
              EngineWorks는 단순 납품이 아니라, 현장의 안정성과 수익성을 함께
              설계하는 파트너입니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <article
                key={item.title}
                className="ew-card-soft px-4 py-4 sm:px-5 sm:py-5"
              >
                <h3 className="text-sm sm:text-base font-semibold mb-2 text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
