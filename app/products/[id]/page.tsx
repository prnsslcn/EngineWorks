// app/products/[id]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    getProductById,
    CATEGORY_LABEL,
    EngineProduct,
} from "@/lib/products";

// ✅ generateMetadata 에서 쓰는 params 타입 (Promise 아님)
type ProductRouteParams = {
    id: string;
};

// ✅ 동적 메타데이터
export async function generateMetadata(
    { params }: { params: Promise<ProductRouteParams> }
): Promise<Metadata> {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        return {
            title: "제품을 찾을 수 없습니다",
        };
    }

    const title = product.name;
    const description =
        product.description ||
        `${CATEGORY_LABEL[product.category]} 엔진 라인업에 대한 상세 정보입니다.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
        },
        twitter: {
            title,
            description,
        },
    };
}

function getUsageHint(product: EngineProduct): string {
    switch (product.category) {
        case "industrial":
            return "압축기, 펌프, 건설장비 등 고부하 산업 설비의 구동용으로 적합합니다.";
        case "power-gen":
            return "데이터센터, 병원, 공공 인프라의 비상·상용 발전 설비에 적합합니다.";
        case "marine":
            return "어선, 화물선, 관공선 등 다양한 선박의 추진 및 보조 동력으로 활용됩니다.";
        default:
            return "";
    }
}

// ✅ 페이지 컴포넌트 쪽은 Next 16 때문에 params가 Promise
export default async function ProductDetailPage({
                                                    params,
                                                }: {
    params: Promise<ProductRouteParams>;
}) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    const usageHint = getUsageHint(product);

    return (
        <section className="ew-section">
            <div className="mx-auto max-w-3xl space-y-8">
                {/* 상단 네비게이션 */}
                <div className="flex flex-col gap-3">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 hover:underline w-fit"
                    >
                        <span>←</span>
                        <span>제품 라인업 목록으로 돌아가기</span>
                    </Link>

                    <div className="inline-flex items-center gap-2 rounded-full border border-ew-accent/40 bg-ew-accent/10 px-3 py-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-ew-accent" />
                        <span className="text-[11px] font-medium text-ew-accent">
              EngineWorks Engine Lineup
            </span>
                    </div>
                </div>

                {/* 헤더 영역 */}
                <header className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-0.5 text-[11px] font-medium text-slate-200">
              {CATEGORY_LABEL[product.category]}
            </span>
                        <span className="text-[11px] text-slate-400">
              제품 ID: <span className="font-mono">{product.id}</span>
            </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
                        {product.name}
                    </h1>
                    <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                        {product.description}
                    </p>
                </header>

                <div className="h-px bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />

                {/* 스펙 섹션 */}
                <section className="grid gap-4 md:grid-cols-2">
                    <article className="ew-card p-4 sm:p-5 space-y-2">
                        <h2 className="text-sm sm:text-base font-semibold text-slate-50">
                            기본 사양
                        </h2>
                        <dl className="space-y-2 text-xs sm:text-sm text-slate-300">
                            <div className="flex items-center justify-between gap-2">
                                <dt className="text-slate-400">출력 범위</dt>
                                <dd className="font-medium">{product.power}</dd>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <dt className="text-slate-400">연료 타입</dt>
                                <dd className="font-medium">{product.fuel}</dd>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <dt className="text-slate-400">적용 분야</dt>
                                <dd className="font-medium">
                                    {CATEGORY_LABEL[product.category]} 엔진 애플리케이션
                                </dd>
                            </div>
                        </dl>
                        <p className="text-[11px] sm:text-xs text-slate-500 mt-2">
                            * 실제 엔진 모델별 정격 출력, 회전수, 배출 규제 등급은 프로젝트
                            요구사항에 따라 별도로 제안됩니다.
                        </p>
                    </article>

                    {/* 사용 환경/운영 가이드 */}
                    <article className="ew-card p-4 sm:p-5 space-y-2">
                        <h2 className="text-sm sm:text-base font-semibold text-slate-50">
                            적용 및 운영 가이드
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {usageHint}
                        </p>
                        <ul className="mt-2 text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
                            <li>실제 부하 패턴(정격/부분부하 비율)에 따른 엔진 용량 선정</li>
                            <li>주변 온도, 설치 고도, 연료 품질에 따른 성능 보정 필요</li>
                            <li>정기점검 및 예방 정비 주기 설정을 통한 가동률 최적화</li>
                        </ul>
                    </article>
                </section>

                {/* 하단 CTA */}
                <section className="ew-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="text-sm sm:text-base font-semibold text-slate-50 mb-1">
                            이 엔진 기반으로 프로젝트를 검토하고 계신가요?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300">
                            예상 부하, 운전 시간, 설치 환경 정보를 알려주시면
                            상세 모델 및 예상 사양을 함께 검토해 드립니다.
                        </p>
                    </div>
                    <Link href="/contact" className="ew-btn-primary text-xs sm:text-sm">
                        이 엔진으로 상담 문의하기
                    </Link>
                </section>
            </div>
        </section>
    );
}