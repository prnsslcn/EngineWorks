// app/products/page.tsx
import Link from "next/link";
import {
    fetchAllProducts,
    CATEGORY_LABEL,
    EngineProduct,
} from "@/lib/products";

export default async function ProductsPage() {
    const products: EngineProduct[] = await fetchAllProducts();

    return (
        <section className="ew-section">
            <div className="ew-page-container space-y-8">
                <header className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        EngineWorks 엔진 라인업
                    </h1>
                    <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                        산업용, 발전용, 해양용 등 다양한 현장에 적용 가능한 EngineWorks의
                        고성능 엔진 포트폴리오입니다.
                    </p>
                </header>

                {products.length === 0 ? (
                    <p className="text-sm text-slate-400">
                        아직 등록된 엔진 제품이 없습니다. Supabase의{" "}
                        <code>engine_product</code> 테이블에 데이터를 추가해 주세요.
                    </p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="ew-card p-4 sm:p-5 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-lg transition-transform"
                            >
                                <div className="space-y-3">
                  <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-2.5 py-0.5 text-[11px] text-slate-200">
                    {CATEGORY_LABEL[product.category]}
                  </span>
                                    <h2 className="text-base sm:text-lg font-semibold text-slate-50">
                                        {product.name}
                                    </h2>
                                    <dl className="space-y-1 text-xs sm:text-sm text-slate-300">
                                        <div className="flex justify-between gap-2">
                                            <dt className="text-slate-400">출력 범위</dt>
                                            <dd className="font-medium">{product.power}</dd>
                                        </div>
                                        <div className="flex justify-between gap-2">
                                            <dt className="text-slate-400">연료 타입</dt>
                                            <dd className="font-medium">{product.fuel}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className="mt-4 text-xs text-ew-accent flex items-center justify-between">
                                    <span>상세 정보 보기</span>
                                    <span>→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}