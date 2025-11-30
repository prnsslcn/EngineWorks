// app/products/[id]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/lib/supabaseClient";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProductRouteParams {
    id: string; // slug로 사용
}

interface EngineProductDetail {
    id: number;
    name: string;
    slug: string;
    category: string | null;
    power: string | null;
    fuel: string | null;
    description_md: string;
}

function getCategoryMeta(category: string | null) {
    switch (category) {
        case "industrial":
            return {
                label: "산업용 엔진",
                subtitle: "중공업 · 플랜트 · 공장 설비용 고출력 엔진",
            };
        case "power-gen":
            return {
                label: "발전용 엔진",
                subtitle: "데이터센터 · 병원 비상 전원 및 상시 발전 설비용",
            };
        case "marine":
            return {
                label: "해양 엔진",
                subtitle: "선박 추진 및 보조 동력용, 해양 환경 최적화",
            };
        default:
            return {
                label: "커스텀 / 기타",
                subtitle: "프로젝트 요구사항에 맞춘 맞춤형 엔진 패키지",
            };
    }
}

function getOperationGuide(category: string | null) {
    switch (category) {
        case "industrial":
            return {
                title: "산업용 엔진 운전 · 유지보수 가이드 (예시)",
                bullets: [
                    "고부하 장시간 운전이 예상되는 경우, 냉각·윤활 시스템 용량을 넉넉하게 설계합니다.",
                    "분기별로 부하 기록과 오일 분석 결과를 함께 검토하여 오버홀 시기를 결정합니다.",
                    "주요 부품(인젝터, 펌프, 필터류)의 예비품을 현장에 상시 확보해 두는 것을 권장합니다.",
                ],
            };
        case "power-gen":
            return {
                title: "발전용 엔진 운전 · 유지보수 가이드 (예시)",
                bullets: [
                    "비상용 설비인 경우, 월 1회 이상 무부하 또는 저부하 시험 운전을 수행합니다.",
                    "정전 상황에서의 자동 기동 시간을 목표값(예: 10초 이내)으로 유지할 수 있도록 정기 점검이 필요합니다.",
                    "연료 품질과 저장 탱크 상태(침전물, 수분 혼입)를 주기적으로 확인합니다.",
                ],
            };
        case "marine":
            return {
                title: "해양 엔진 운전 · 유지보수 가이드 (예시)",
                bullets: [
                    "염분 환경으로 인한 부식 및 냉각 라인 스케일 발생 여부를 정기적으로 확인합니다.",
                    "항차 별 운전 시간과 부하 로그를 기록해 장기 내구 상태를 관리합니다.",
                    "IMO 배출 규제 수준에 따라 배기가스 후처리 시스템과 함께 패키지로 검토합니다.",
                ],
            };
        default:
            return {
                title: "운전 · 유지보수 가이드 (예시)",
                bullets: [
                    "실제 프로젝트 요구 사항에 맞추어 엔진 선정, 부하 패턴, 정비 전략을 함께 설계합니다.",
                    "설치 후 초기 운전 기간(예: 500시간) 동안의 데이터를 집중적으로 모니터링합니다.",
                    "현장 운영팀 교육과 점검 체크리스트를 함께 제공하는 것을 권장합니다.",
                ],
            };
    }
}

function getExcerpt(text: string, maxLength = 100): string {
    if (!text) return "";
    const cleaned = text.replace(/\s+/g, " ").trim();
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.slice(0, maxLength) + "…";
}

async function getProductBySlug(slug: string): Promise<EngineProductDetail | null> {
    if (!slug) return null;

    const { data, error } = await supabase
        .from("engine_product")
        .select("id, name, slug, category, power, fuel, description_md")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("[products] Failed to fetch product:", error.message);
        return null;
    }

    if (!data) return null;

    return {
        id: Number(data.id),
        name: data.name,
        slug: data.slug,
        category: data.category ?? null,
        power: data.power ?? null,
        fuel: data.fuel ?? null,
        description_md: data.description_md ?? "",
    };
}

/**
 * Next.js 16: params가 Promise로 전달되므로 await 필요
 */
export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<ProductRouteParams>;
}): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductBySlug(id);

    if (!product) {
        return {
            title: "제품 상세",
            description: "EngineWorks 제품 상세 페이지",
        };
    }

    const catMeta = getCategoryMeta(product.category);

    return {
        title: `${product.name} - ${catMeta.label}`,
        description: getExcerpt(product.description_md),
    };
}

export default async function ProductDetailPage({
                                                    params,
                                                }: {
    params: Promise<ProductRouteParams>;
}) {
    const { id } = await params;
    const product = await getProductBySlug(id);

    if (!product) {
        notFound();
    }

    const catMeta = getCategoryMeta(product.category);
    const opGuide = getOperationGuide(product.category);

    return (
        <div className="ew-section space-y-14">
            {/* 상단 헤더 + 요약 */}
            <ScrollReveal from="up">
                <section className="space-y-4">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 hover:underline"
                    >
                        <span aria-hidden>←</span>
                        <span>제품 라인업으로 돌아가기</span>
                    </Link>

                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
              <span className="ew-tag text-[10px]">
                {catMeta.label}
              </span>
                            <span className="text-[11px] text-slate-400">
                엔진 모델 코드: {product.slug}
              </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                            {product.name}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                            {catMeta.subtitle}
                        </p>
                    </div>
                </section>
            </ScrollReveal>

            {/* 스펙 + 설명 */}
            <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:items-start">
                {/* Left: 상세 설명 (Markdown) */}
                <ScrollReveal from="up">
                    <div className="ew-card-soft p-5 sm:p-6 space-y-4">
                        <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                            엔진 개요
                        </h2>
                        <article className="prose prose-slate max-w-none text-sm leading-relaxed">
                            <ReactMarkdown>{product.description_md}</ReactMarkdown>
                        </article>
                    </div>
                </ScrollReveal>

                {/* Right: 주요 스펙 + 상담 CTA */}
                <ScrollReveal from="up" delay={120}>
                    <div className="space-y-4">
                        <div className="ew-card-soft p-5 sm:p-6 space-y-3">
                            <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                                주요 사양 (요약)
                            </h2>
                            <dl className="space-y-2 text-xs sm:text-sm text-slate-700">
                                <div className="flex items-center justify-between gap-2">
                                    <dt className="text-slate-400">카테고리</dt>
                                    <dd className="font-medium text-slate-800">
                                        {catMeta.label}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <dt className="text-slate-400">출력 범위</dt>
                                    <dd className="font-medium text-slate-800">
                                        {product.power ?? "프로젝트 협의"}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <dt className="text-slate-400">연료 타입</dt>
                                    <dd className="font-medium text-slate-800">
                                        {product.fuel ?? "디젤 / 가스 / 협의"}
                                    </dd>
                                </div>
                            </dl>
                            <p className="mt-2 text-[11px] text-slate-500">
                                ※ 실제 적용 시 출력, 연료, 배출 규제 수준, 부속 기기 구성 등을
                                프로젝트별로 함께 검토합니다.
                            </p>
                        </div>

                        <div className="ew-card-soft p-5 sm:p-6 space-y-3">
                            <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                                이 엔진으로 상담 문의하기
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600">
                                이 엔진을 기반으로 한 패키지가 적합한지, 다른 라인업과 비교해야
                                하는지 등 엔지니어와 함께 검토하실 수 있습니다.
                            </p>
                            <Link href="/contact" className="ew-btn-primary text-xs sm:text-sm">
                                상담 문의 페이지로 이동
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* 운전 / 유지보수 가이드 (예시 섹션) */}
            <ScrollReveal from="up">
                <section className="space-y-4">
                    <div className="ew-card-soft p-5 sm:p-6 space-y-3">
                        <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                            {opGuide.title}
                        </h2>
                        <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-slate-600">
                            {opGuide.bullets.map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-slate-400" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-3 text-[11px] text-slate-500">
                            위 내용은 예시 안내이며, 실제 프로젝트에서는 설비 용도, 운전 시간,
                            환경 조건 등을 기준으로 세부 전략을 다시 설계합니다.
                        </p>
                    </div>
                </section>
            </ScrollReveal>
        </div>
    );
}