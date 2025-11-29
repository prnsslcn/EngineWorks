// app/page.tsx

import Link from "next/link";

const FEATURED_PRODUCTS = [
    {
        id: "industrial-diesel",
        name: "산업용 디젤 엔진",
        power: "250–1,200 kW",
        fuel: "디젤 / 바이오디젤",
        description:
            "대형 공장, 건설 장비, 압축기 등 고부하 환경에서 안정적인 출력을 제공하는 플래그십 디젤 엔진 라인업입니다.",
    },
    {
        id: "power-gen",
        name: "발전용 엔진",
        power: "500–2,500 kW",
        fuel: "디젤 / 천연가스",
        description:
            "데이터센터, 병원, 공공 인프라를 위한 비상·상용 발전 설비용 엔진으로, 장시간 운전과 뛰어난 연비를 제공합니다.",
    },
    {
        id: "marine",
        name: "해양·선박용 엔진",
        power: "300–1,800 kW",
        fuel: "중유 / 경유",
        description:
            "어선, 상선, 작업선 등 다양한 선박 환경에서 높은 내구성과 신뢰성을 보장하는 해양용 엔진 솔루션입니다.",
    },
];

const HIGHLIGHTS = [
    {
        title: "엔진 설계·제조 통합",
        body: "기초 설계부터 가공, 조립, 성능 시험까지 한 곳에서 수행하여 품질과 납기를 동시에 확보합니다.",
    },
    {
        title: "24/7 서비스 네트워크",
        body: "국내외 서비스 스테이션과 부품 물류망을 통해 긴급 상황에도 빠르게 대응합니다.",
    },
    {
        title: "커스터마이징 엔지니어링",
        body: "사용 환경, 연료 조건, 규제 요구사항에 맞추어 맞춤형 엔진 패키지를 설계·제안합니다.",
    },
];

export default function HomePage() {
    return (
        <div className="ew-section space-y-16">
            {/* Hero Section */}
            <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
                {/* Left: Text */}
                <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-ew-accent/40 bg-ew-accent/10 px-3 py-1 text-xs font-medium text-ew-accent">
            High-Performance Industrial Engine Manufacturer
          </span>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        고성능&nbsp;
                        <span className="text-ew-accent">산업용 엔진</span>으로
                        <br className="hidden sm:block" />
                        산업 현장의 심장을 만듭니다.
                    </h1>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                        EngineWorks는 발전설비, 해양, 중공업, 인프라 현장을 위한
                        고출력·고효율 산업용 엔진을 설계·제조합니다.
                        설계부터 애프터서비스까지 전 과정을 책임지는 파트너로서
                        안정적인 운전을 지원합니다.
                    </p>

                    {/* CTA 버튼 */}
                    <div className="flex flex-wrap gap-3">
                        <Link href="/products" className="ew-btn-primary">
                            제품 라인업 보기
                        </Link>
                        <Link href="/contact" className="ew-btn-ghost text-sm">
                            프로젝트 상담 문의
                        </Link>
                    </div>

                    {/* 하단 하이라이트 텍스트 */}
                    <div className="mt-4 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-400">
                        <span>• 250–2,500 kW 출력 범위</span>
                        <span>• 디젤 / 가스 / 해양 엔진</span>
                        <span>• 설계 · 제조 · 서비스 일원화</span>
                    </div>
                </div>

                {/* Right: Visual / Stats */}
                <div className="relative">
                    <div className="absolute -inset-6 -z-10 bg-gradient-to-br from-ew-accent/10 via-slate-900 to-slate-950 blur-3xl opacity-70" />

                    <div className="ew-card p-5 sm:p-6 lg:p-7 space-y-5">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                            ENGINE LINEUP SNAPSHOT
                        </p>

                        <div className="grid gap-4">
                            <div className="flex items-baseline justify-between">
                                <div className="text-sm text-slate-300">설치된 엔진 수</div>
                                <div className="text-2xl sm:text-3xl font-semibold">
                                    1,200<span className="text-base text-slate-400">+ units</span>
                                </div>
                            </div>

                            <div className="flex items-baseline justify-between">
                                <div className="text-sm text-slate-300">지원 산업 분야</div>
                                <div className="text-xl font-semibold text-ew-accent">
                                    발전 · 해양 · 중공업
                                </div>
                            </div>

                            <div className="h-px bg-gradient-to-r from-slate-700/40 via-slate-600/40 to-slate-700/40" />

                            <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm">
                                <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2">
                                    <div className="text-slate-400 mb-1">발전용</div>
                                    <div className="font-semibold">99.97%</div>
                                    <div className="text-[11px] text-slate-500">
                                        평균 가동률
                                    </div>
                                </div>
                                <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2">
                                    <div className="text-slate-400 mb-1">정비 리드타임</div>
                                    <div className="font-semibold">48h</div>
                                    <div className="text-[11px] text-slate-500">
                                        긴급 출동 기준
                                    </div>
                                </div>
                                <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2">
                                    <div className="text-slate-400 mb-1">연료 효율</div>
                                    <div className="font-semibold">최대 8%</div>
                                    <div className="text-[11px] text-slate-500">
                                        기존 대비 절감
                                    </div>
                                </div>
                            </div>

                            <p className="text-[11px] text-slate-500">
                                * 모든 수치는 예시 데이터이며, 실제 프로젝트 요구 조건에 따라
                                달라질 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-1">
                            주요 엔진 라인업
                        </h2>
                        <p className="text-sm text-slate-400">
                            다양한 산업 현장에서 검증된 EngineWorks의 대표 엔진 제품군입니다.
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="text-xs sm:text-sm text-ew-accent hover:underline"
                    >
                        전체 제품 보기 →
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {FEATURED_PRODUCTS.map((engine) => (
                        <article
                            key={engine.id}
                            className="ew-card h-full flex flex-col p-4 sm:p-5"
                        >
                            <h3 className="text-base sm:text-lg font-semibold mb-2">
                                {engine.name}
                            </h3>
                            <dl className="mb-3 space-y-1 text-xs sm:text-sm text-slate-300">
                                <div className="flex items-center justify-between gap-2">
                                    <dt className="text-slate-400">출력 범위</dt>
                                    <dd className="font-medium">{engine.power}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <dt className="text-slate-400">연료 타입</dt>
                                    <dd className="font-medium">{engine.fuel}</dd>
                                </div>
                            </dl>
                            <p className="text-xs sm:text-sm text-slate-300 flex-1">
                                {engine.description}
                            </p>
                            <div className="mt-4">
                                <Link
                                    href="/products"
                                    className="text-xs font-medium text-ew-accent hover:underline"
                                >
                                    상세 스펙 문의 →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Technology / Service Section */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-1">
                        기술·서비스 역량
                    </h2>
                    <p className="text-sm text-slate-400">
                        엔진만 공급하는 것이 아니라, 현장 조건과 운영 전략을 함께 고민하는
                        기술 파트너를 지향합니다.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {HIGHLIGHTS.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4 sm:px-5 sm:py-5"
                        >
                            <h3 className="text-sm sm:text-base font-semibold mb-2 text-slate-50">
                                {item.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                {item.body}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}