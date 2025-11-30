// app/products/page.tsx

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fetchAllProducts, type EngineProduct } from "@/lib/products";

const CATEGORY_TITLE: Record<EngineProduct["category"], string> = {
  industrial: "산업용 엔진",
  "power-gen": "발전용 엔진",
  marine: "해양용 엔진",
};

function getCategoryDescription(category: EngineProduct["category"]): string {
  switch (category) {
    case "industrial":
      return "플랜트, 중공업, 인프라 설비에 적용되는 고출력 엔진 라인업입니다.";
    case "power-gen":
      return "데이터센터, 병원, 공장 등의 비상·상시 발전용 엔진입니다.";
    case "marine":
      return "선박 추진 및 해양 플랜트 보조 동력에 특화된 해양용 엔진입니다.";
    default:
      return "다양한 현장을 위한 고성능 엔진 라인업입니다.";
  }
}

export default async function ProductsPage() {
  const products = await fetchAllProducts();

  // 카테고리별 그룹화
  const grouped: Partial<Record<EngineProduct["category"], EngineProduct[]>> =
    products.reduce(
      (acc, product) => {
        const list = acc[product.category] ?? [];
        list.push(product);
        acc[product.category] = list;
        return acc;
      },
      {} as Partial<Record<EngineProduct["category"], EngineProduct[]>>,
    );

  return (
    <div className="ew-section space-y-14">
      {/* 헤더 섹션 */}
      <ScrollReveal from="up">
        <section className="space-y-5">
          <p className="ew-tag">Engine Lineup</p>
          <div className="space-y-3">
            <h1 className="ew-section-title">
              산업 현장을 위한 EngineWorks 엔진 라인업
            </h1>
            <p className="ew-section-subtitle max-w-2xl">
              발전용, 해양용, 산업용 등 다양한 환경에서 운전되는 엔진들을 하나의
              라인업으로 관리합니다. 이 페이지에서는 Supabase에 등록된 엔진
              데이터를 기반으로 대표 제품들을 확인할 수 있습니다.
            </p>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500">
            실제 프로젝트에서는 이 데이터를 기반으로 상세 스펙, 옵션, 도면 링크,
            인증 정보 등을 추가해 사용할 수 있습니다.
          </p>
        </section>
      </ScrollReveal>

      {/* 데이터 없는 경우 안내 */}
      {products.length === 0 ? (
        <ScrollReveal from="up">
          <section className="ew-card-soft px-5 py-6 text-sm text-slate-600">
            아직 등록된 엔진 제품이 없습니다. Supabase의{" "}
            <code className="text-[11px] bg-slate-100 px-1.5 py-0.5 rounded">
              engine_product
            </code>{" "}
            테이블에 데이터를 추가하면, 이 페이지에 자동으로 표시됩니다.
          </section>
        </ScrollReveal>
      ) : (
        <>
          {/* 카테고리별 섹션 */}
          {(Object.keys(grouped) as EngineProduct["category"][])
            .filter(
              (category) => grouped[category] && grouped[category]!.length,
            )
            .map((category, idx) => {
              const engines = grouped[category] ?? [];
              return (
                <ScrollReveal from="up" delay={idx * 80} key={category}>
                  <section className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                      <div className="space-y-1">
                        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                          {CATEGORY_TITLE[category]}
                        </h2>
                        <p className="text-sm text-slate-500">
                          {getCategoryDescription(category)}
                        </p>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-400">
                        등록된 제품: {engines.length}종
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      {engines.map((engine) => (
                        <Link
                          key={engine.id}
                          href={`/products/${engine.slug}`}
                          className="block h-full"
                        >
                          <article className="ew-card ew-card-interactive h-full flex flex-col p-4 sm:p-5 cursor-pointer">
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
                                {CATEGORY_TITLE[category]}
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

                            <p className="text-xs sm:text-sm text-slate-600 flex-1 whitespace-pre-wrap line-clamp-4">
                              {engine.description_md}
                            </p>

                            <div className="mt-4 flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
                              <span className="ew-link-underline">
                                상세 페이지 열기 →
                              </span>
                              <span>상담 가능</span>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </section>
                </ScrollReveal>
              );
            })}
        </>
      )}
    </div>
  );
}
