// app/products/[id]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fetchProductBySlug, type EngineProduct } from "@/lib/products";

type ProductRouteParams = {
  id: string;
};

type ProductPageProps = {
  params: Promise<ProductRouteParams>;
};

function getCategoryLabel(category: EngineProduct["category"]): string {
  switch (category) {
    case "industrial":
      return "산업용 엔진";
    case "power-gen":
      return "발전용 엔진";
    case "marine":
      return "해양용 엔진";
    default:
      return "엔진";
  }
}

function getCategoryDescription(category: EngineProduct["category"]): string {
  switch (category) {
    case "industrial":
      return "플랜트, 인프라, 중공업 설비 등 고부하 환경에서 운전되는 엔진입니다.";
    case "power-gen":
      return "데이터센터, 병원, 공장 비상·상시 발전기를 위한 전용 엔진입니다.";
    case "marine":
      return "선박 추진과 해양 플랜트 보조 동력을 위한 해양용 엔진입니다.";
    default:
      return "";
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductBySlug(id);

  if (!product) {
    notFound();
  }

  const categoryLabel = getCategoryLabel(product.category);

  return (
    <div className="ew-section space-y-10">
      {/* 상단 Hero 섹션 */}
      <ScrollReveal from="up">
        <section className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="ew-tag text-[10px] sm:text-[11px]">
              {categoryLabel}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400">
              슬러그: {product.slug}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              {product.name}
            </h1>
            <p className="ew-section-subtitle max-w-2xl">
              {getCategoryDescription(product.category) ||
                "EngineWorks의 고성능 엔진 라인업 중 하나로, 현장의 운전 조건에 맞추어 유연하게 커스터마이징할 수 있습니다."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-500">출력 범위</span>
              <span className="font-semibold text-slate-900">
                {product.power}
              </span>
            </div>
            <span className="h-3 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-500">연료 타입</span>
              <span className="font-semibold text-slate-900">
                {product.fuel}
              </span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 본문 레이아웃 */}
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
        {/* 좌측: 설명 및 적용 가이드 */}
        <ScrollReveal from="up">
          <div className="space-y-6">
            <article className="ew-card-soft px-5 py-5 sm:px-6 sm:py-6 space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                엔진 소개
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                {product.description_md}
              </p>
            </article>

            <article className="ew-card-soft px-5 py-5 sm:px-6 sm:py-6 space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                적용 및 운전 가이드 (예시)
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  • 예상 부하 패턴(기동·정지 빈도, 피크 부하)을 기반으로 엔진
                  용량과 냉각·윤활 시스템을 함께 검토합니다.
                </li>
                <li>
                  • 설치 환경(실내/실외, 온도, 습도, 해안 인접 여부)에 따라
                  흡·배기 및 방청 사양을 조정할 수 있습니다.
                </li>
                <li>
                  • 원격 모니터링 옵션을 적용하면 운전 데이터에 기반한 예지 정비
                  전략 수립이 가능합니다.
                </li>
                <li>
                  • 실제 프로젝트에서 요구되는 규격(예: IMO, ISO, KS 등)에 맞춘
                  인증 및 시험이 필요할 수 있습니다.
                </li>
              </ul>
              <p className="text-[11px] text-slate-500">
                * 상기 내용은 포트폴리오용 예시이며, 실제 프로젝트에서는 현장
                요구사항에 따라 상세 스펙과 운전 전략이 달라질 수 있습니다.
              </p>
            </article>
          </div>
        </ScrollReveal>

        {/* 우측: 사양 요약 + CTA */}
        <ScrollReveal from="up" delay={100}>
          <aside className="space-y-4">
            <div className="ew-card px-5 py-5 sm:px-6 sm:py-6 space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                주요 사양 요약
              </h2>
              <dl className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-400">카테고리</dt>
                  <dd className="font-medium text-slate-900">
                    {categoryLabel}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-400">출력 범위</dt>
                  <dd className="font-medium text-slate-900">
                    {product.power}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-400">연료 타입</dt>
                  <dd className="font-medium text-slate-900">{product.fuel}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-400">데이터 출처</dt>
                  <dd className="text-[11px] text-slate-500">
                    Supabase engine_product
                  </dd>
                </div>
              </dl>
            </div>

            <div className="ew-card-soft px-5 py-5 sm:px-6 sm:py-6 space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                이 엔진으로 프로젝트 상담하기
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                현재 검토 중인 프로젝트에 이 엔진을 적용하고 싶은 경우, 문의
                페이지를 통해 현장 조건과 요구 사항을 공유해 주세요. 출력, 부하
                패턴, 설치 환경에 맞춘 사양을 함께 검토해 드립니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/contact?engine=${encodeURIComponent(product.name)}`}
                  className="ew-btn-primary text-xs sm:text-sm"
                >
                  이 엔진으로 상담 문의
                </Link>
                <Link
                  href="/products"
                  className="ew-btn-ghost text-xs sm:text-sm"
                >
                  다른 엔진 라인업 보기
                </Link>
              </div>
            </div>
          </aside>
        </ScrollReveal>
      </section>
    </div>
  );
}
