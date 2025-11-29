// app/products/page.tsx

import Link from "next/link";
import {
    FEATURED_PRODUCTS,
    EngineProduct,
    CATEGORY_LABEL,
} from "@/lib/products";

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
                {FEATURED_PRODUCTS.map((product: EngineProduct) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="block group"
                        aria-label={`엔진 상세 페이지로 이동: ${product.name}`}
                    >
                        <article className="ew-card p-4 sm:p-5 flex flex-col gap-3 transition border-slate-800 group-hover:border-ew-accent/60 group-hover:bg-slate-900/80">
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-0.5 text-[11px] font-medium text-slate-200">
                    {CATEGORY_LABEL[product.category]}
                  </span>
                                    <h2 className="text-base sm:text-lg font-semibold text-slate-50 group-hover:text-ew-accent">
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

                            {/* 액션/안내 영역 */}
                            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/70 mt-2">
                                <p className="text-[11px] sm:text-xs text-slate-500">
                                    카드를 클릭하면 상세 스펙 페이지로 이동합니다.
                                </p>
                                <span className="text-[11px] text-ew-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition">
                  →
                </span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}