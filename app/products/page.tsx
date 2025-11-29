// app/products/page.tsx

import Link from "next/link";
import { FEATURED_PRODUCTS, EngineProduct } from "@/lib/products";

const CATEGORY_LABEL: Record<EngineProduct["category"], string> = {
    industrial: "산업용",
    "power-gen": "발전용",
    marine: "해양용",
};

export default function ProductsPage() {
    return (
        <section className="ew-section space-y-8">
            {/* 헤더 영역 */}
            <header className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    엔진 제품 라인업
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                    EngineWorks는 산업용, 발전용, 해양용 등 다양한 현장에서 요구되는
                    출력·연료 조건을 만족하는 엔진 라인업을 제공합니다.
                    아래 사양은 예시이며, 실제 프로젝트에 맞추어 커스터마이징된
                    패키지를 제안해 드립니다.
                </p>
            </header>

            {/* 리스트 영역 */}
            <div className="grid gap-4">
                {FEATURED_PRODUCTS.map((product) => (
                    <article
                        key={product.id}
                        className="ew-card p-4 sm:p-5 flex flex-col gap-3"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                            <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-0.5 text-[11px] font-medium text-slate-200">
                  {CATEGORY_LABEL[product.category]}
                </span>
                                <h2 className="text-base sm:text-lg font-semibold text-slate-50">
                                    {product.name}
                                </h2>
                            </div>
                            <div className="text-xs sm:text-sm text-slate-400">
                                제품 ID: <span className="font-mono">{product.id}</span>
                            </div>
                        </div>

                        {/* 스펙 요약 */}
                        <dl className="grid gap-2 text-xs sm:text-sm text-slate-300 sm:grid-cols-2">
                            <div className="flex items-center justify-between gap-2">
                                <dt className="text-slate-400">출력 범위</dt>
                                <dd className="font-medium">{product.power}</dd>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <dt className="text-slate-400">연료 타입</dt>
                                <dd className="font-medium">{product.fuel}</dd>
                            </div>
                        </dl>

                        {/* 설명 */}
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {product.description}
                        </p>

                        {/* 액션 영역 */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/70 mt-2">
                            <p className="text-[11px] sm:text-xs text-slate-500">
                                세부 출력, 회전수, 배출 규제 대응 여부 등은 프로젝트 요구사항에
                                맞추어 별도 스펙 시트를 제공해 드립니다.
                            </p>
                            <Link
                                href="/contact"
                                className="text-xs font-medium text-ew-accent hover:underline"
                            >
                                이 엔진으로 상담 요청 →
                            </Link>
                            {/* 나중에 상세 페이지 만들면 아래처럼 변경 가능
              <Link
                href={`/products/${product.id}`}
                className="text-xs font-medium text-ew-accent hover:underline"
              >
                상세 스펙 보기 →
              </Link>
              */}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}