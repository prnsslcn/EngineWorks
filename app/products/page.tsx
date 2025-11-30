// app/products/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllProducts, type EngineProduct } from "@/lib/products";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
    title: "제품 라인업",
    description:
        "EngineWorks가 제공하는 산업용, 발전용, 해양 엔진 라인업을 확인해 보세요.",
};

type CategoryKey = EngineProduct["category"] | "other";

const CATEGORY_META: Record<
    CategoryKey,
    { label: string; description: string }
> = {
    industrial: {
        label: "산업용 엔진",
        description:
            "중공업, 플랜트, 공장 설비 등 고부하 산업 현장을 위한 고출력 엔진입니다.",
    },
    "power-gen": {
        label: "발전용 엔진",
        description:
            "데이터센터, 병원, 공장 비상 발전기셋 전용으로 설계된 엔진입니다.",
    },
    marine: {
        label: "해양 엔진",
        description:
            "선박 추진 및 보조 동력을 위한 해양 환경 최적화 엔진입니다.",
    },
    other: {
        label: "기타 / 커스텀",
        description:
            "특수 용도 또는 프로젝트 맞춤형으로 구성되는 엔진 패키지입니다.",
    },
};

const CATEGORY_ORDER: CategoryKey[] = [
    "industrial",
    "power-gen",
    "marine",
    "other",
];

function mapCategory(cat: EngineProduct["category"] | null): CategoryKey {
    if (cat === "industrial" || cat === "power-gen" || cat === "marine") {
        return cat;
    }
    return "other";
}

function getProductTagline(product: EngineProduct): string {
    switch (product.category) {
        case "industrial":
            return "중공업 · 플랜트용 고출력 산업용 엔진";
        case "power-gen":
            return "데이터센터 · 병원 비상 전원 설비용 엔진";
        case "marine":
            return "선박 추진 · 보조 동력 해양 환경 최적화";
        default:
            return "프로젝트 요구사항에 맞춘 커스텀 엔진 패키지";
    }
}

function getShortDescription(md: string, maxLength = 110): string {
    const text = md.replace(/\s+/g, " ").trim();
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "…";
}

export default async function ProductsPage() {
    const products = await fetchAllProducts();

    const grouped = products.reduce(
        (acc, product) => {
            const key = mapCategory(product.category ?? null);
            if (!acc[key]) acc[key] = [];
            acc[key].push(product);
            return acc;
        },
        {} as Record<CategoryKey, EngineProduct[]>
    );

    const totalCount = products.length;

    return (
        <div className="ew-section space-y-16">
            {/* HERO / INTRO */}
            <ScrollReveal from="up">
                <section className="space-y-6">
                    <div className="space-y-3">
                        <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                            ENGINE LINEUP
                        </p>
                        <h1 className="ew-section-title">
                            EngineWorks 엔진 라인업
                        </h1>
                        <p className="ew-section-subtitle max-w-2xl">
                            산업, 발전, 해양 현장을 위해 설계된 EngineWorks의 엔진 제품들을
                            한 곳에서 확인할 수 있습니다. 각 프로젝트의 부하 패턴과 설치 환경에
                            맞춰 최적의 엔진을 선정할 수 있도록 구성되어 있습니다.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <ScrollReveal from="up">
                            <div className="ew-card-soft p-4 sm:p-5">
                                <p className="text-[11px] text-slate-500 mb-1">
                                    등록된 엔진 수(예시)
                                </p>
                                <p className="text-2xl font-semibold text-slate-900">
                                    {totalCount}{" "}
                                    <span className="text-sm font-normal text-slate-500">
                    models
                  </span>
                                </p>
                                <p className="mt-2 text-xs text-slate-500">
                                    Supabase의 <code>engine_product</code> 테이블에 등록된 엔진 기준입니다.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal from="up" delay={120}>
                            <div className="ew-card-soft p-4 sm:p-5">
                                <p className="text-[11px] text-slate-500 mb-1">
                                    지원 연료 타입
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                    디젤 / 가스 / 듀얼 연료
                                </p>
                                <p className="mt-2 text-xs text-slate-500">
                                    프로젝트 요구에 따라 연료 타입과 배출 규제 수준을 함께 검토합니다.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal from="up" delay={220}>
                            <div className="ew-card-soft p-4 sm:p-5">
                                <p className="text-[11px] text-slate-500 mb-1">
                                    출력 범위 (예시)
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                    500 – 2,000 kW
                                </p>
                                <p className="mt-2 text-xs text-slate-500">
                                    실제 출력 범위는 엔진 라인업 구성에 따라 변경될 수 있습니다.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </ScrollReveal>

            {/* EMPTY STATE */}
            {totalCount === 0 && (
                <section className="space-y-4">
                    <div className="ew-card-soft p-5 flex flex-col gap-3">
                        <p className="text-sm font-semibold text-slate-900">
                            아직 등록된 엔진 제품이 없습니다.
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600">
                            Supabase 대시보드에서 <code>engine_product</code> 테이블에 엔진 데이터를
                            추가하면, 이 페이지에서 자동으로 목록이 표시됩니다.
                        </p>
                    </div>
                </section>
            )}

            {/* CATEGORY GROUPED LIST */}
            {totalCount > 0 &&
                CATEGORY_ORDER.map((catKey) => {
                    const items = grouped[catKey];
                    if (!items || items.length === 0) return null;

                    const meta = CATEGORY_META[catKey];

                    return (
                        <section key={catKey} className="space-y-6">
                            <ScrollReveal from="up">
                                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                                    <div className="space-y-1">
                                        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                                            {meta.label}
                                        </h2>
                                        <p className="ew-section-subtitle max-w-xl">
                                            {meta.description}
                                        </p>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        {items.length}개 엔진 라인업
                                    </p>
                                </div>
                            </ScrollReveal>

                            <div className="grid gap-4 md:grid-cols-3">
                                {items.map((engine, index) => (
                                    <ScrollReveal
                                        key={engine.id}
                                        from="up"
                                        delay={index * 60}
                                        threshold={0.2}
                                    >
                                        <article className="ew-card h-full flex flex-col p-4 sm:p-5 hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)] transition-shadow">
                                            <div className="space-y-2 mb-3">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                                                        {engine.name}
                                                    </h3>
                                                    <span className="ew-tag text-[10px]">
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

                                            <p className="text-xs sm:text-sm text-slate-600 flex-1">
                                                {getShortDescription(engine.description_md ?? "")}
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
                                    </ScrollReveal>
                                ))}
                            </div>
                        </section>
                    );
                })}
        </div>
    );
}