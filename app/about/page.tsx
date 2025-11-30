// app/about/page.tsx

import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
    title: "회사 소개",
    description:
        "EngineWorks는 발전 · 해양 · 중공업 현장을 위한 고성능 산업용 엔진과 운영 솔루션을 제공하는 가상의 엔진 제조 기업입니다.",
};

const TIMELINE = [
    {
        year: "2012",
        title: "EngineWorks 설립",
        body: "산업용 디젤 엔진 설계 엔지니어 3인으로 구성된 R&D 팀에서 출발했습니다.",
    },
    {
        year: "2015",
        title: "발전용 엔진 패키지 론칭",
        body: "데이터센터, 병원, 공장 비상 발전 설비를 위한 엔진-제너레이터 통합 패키지를 출시했습니다.",
    },
    {
        year: "2019",
        title: "해양 엔진 라인업 확대",
        body: "연안 여객선, 예인선, 작업선 등 다양한 선박에 적용 가능한 엔진 시리즈를 개발했습니다.",
    },
    {
        year: "2024",
        title: "플릿 모니터링 플랫폼 공개",
        body: "실시간 상태 모니터링과 예방 정비를 지원하는 클라우드 기반 플랫폼을 선보였습니다.",
    },
];

const VALUES = [
    {
        label: "01",
        title: "안정성 중심 설계",
        body: "엔진은 한 번 멈추면 전체 설비가 멈춥니다. EngineWorks는 항상 '멈추지 않는 시스템'을 기준으로 설계합니다.",
    },
    {
        label: "02",
        title: "데이터 기반 의사결정",
        body: "부하, 연료, 진동, 온도 데이터를 기반으로 설계·운전·정비까지 전 과정을 데이터로 설명할 수 있어야 한다고 믿습니다.",
    },
    {
        label: "03",
        title: "현장과 함께하는 엔지니어링",
        body: "카탈로그에 없는 조건, 실제 운전 패턴, 작업자의 경험을 설계와 서비스에 반영합니다.",
    },
];

const FACILITY_POINTS = [
    "엔진 조립 라인 및 시험동(테스트셀)",
    "연료 시스템 · 냉각 시스템 통합 테스트",
    "진동 · 소음 측정 장비",
    "장기 내구 시험 및 부품 분석",
];

export default function AboutPage() {
    return (
        <div className="ew-section space-y-20">
            {/* HERO / INTRO */}
            <ScrollReveal from="up">
                <section className="space-y-8">
                    <div className="space-y-4">
                        <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                            ABOUT ENGINEWORKS
                        </p>
                        <h1 className="ew-section-title">
                            고성능 산업용 엔진으로
                            <br className="hidden sm:block" />
                            산업 현장의 심장을 설계합니다.
                        </h1>
                        <p className="ew-section-subtitle max-w-2xl">
                            EngineWorks는 발전, 해양, 중공업, 인프라 현장을 위한 산업용 엔진과
                            운영 솔루션을 설계·제조하는 가상의 엔지니어링 기업입니다.
                        </p>
                    </div>

                    {/* 숫자 3카드 */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        {[0, 1, 2].map((i) => (
                            <ScrollReveal from="up" delay={i * 120} key={i}>
                                <div className="ew-card-soft flex flex-col justify-between p-5 space-y-3">
                                    {i === 0 && (
                                        <>
                                            <p className="text-[11px] text-slate-500">설립 연도</p>
                                            <p className="text-xl font-semibold text-slate-900">
                                                2012년
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                중·대형 디젤 엔진 설계 경험을 가진 엔지니어들이 모여 시작했습니다.
                                            </p>
                                        </>
                                    )}
                                    {i === 1 && (
                                        <>
                                            <p className="text-[11px] text-slate-500">
                                                적용 현장 수(예시)
                                            </p>
                                            <p className="text-xl font-semibold text-slate-900">
                                                200+ 사이트
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                발전소, 조선소, 사회 인프라 등 다양한 현장에서 적용되고 있습니다.
                                            </p>
                                        </>
                                    )}
                                    {i === 2 && (
                                        <>
                                            <p className="text-[11px] text-slate-500">
                                                전 과정 엔지니어링
                                            </p>
                                            <p className="text-xl font-semibold text-slate-900">
                                                설계 → 제작 → 서비스
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                엔진 본체부터 제어, 유지보수까지 하나의 팀이 책임집니다.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            </ScrollReveal>

            {/* TIMELINE */}
            <ScrollReveal from="up">
                <section className="space-y-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div className="space-y-1">
                            <h2 className="ew-section-title">엔진과 함께 쌓아 온 시간</h2>
                            <p className="ew-section-subtitle max-w-xl">
                                작은 R&D 팀에서 시작해 산업 현장의 요구를 반영하며 성장해 왔습니다.
                            </p>
                        </div>
                    </div>

                    <div className="ew-card-soft grid gap-6 sm:gap-8 p-5 sm:p-6">
                        {TIMELINE.map((item, index) => (
                            <div
                                key={item.year}
                                className="grid gap-2 sm:grid-cols-[80px_minmax(0,1fr)] sm:items-start"
                            >
                                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-400">
                    {item.year}
                  </span>
                                    <span className="hidden h-px flex-1 bg-slate-200 sm:block" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-slate-900">
                                        {item.title}
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        {item.body}
                                    </p>
                                </div>
                                {index < TIMELINE.length - 1 && (
                                    <div className="col-span-full h-px bg-slate-100" />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </ScrollReveal>

            {/* CORE VALUES */}
            <section className="space-y-6">
                <div className="space-y-1">
                    <h2 className="ew-section-title">우리가 중요하게 생각하는 것들</h2>
                    <p className="ew-section-subtitle max-w-2xl">
                        EngineWorks의 모든 의사 결정은 이 세 가지 가치를 기준으로 이루어집니다.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {VALUES.map((value, i) => (
                        <ScrollReveal key={value.title} from="up" delay={i * 120}>
                            <article className="ew-card-soft px-4 py-4 sm:px-5 sm:py-5">
                <span className="text-[11px] font-medium text-slate-400">
                  {value.label}
                </span>
                                <h3 className="mt-2 text-sm sm:text-base font-semibold text-slate-900">
                                    {value.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    {value.body}
                                </p>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* FACILITY SECTION */}
            <section className="space-y-6">
                <div className="space-y-1">
                    <h2 className="ew-section-title">생산 · 시험 · 엔지니어링</h2>
                    <p className="ew-section-subtitle max-w-2xl">
                        엔진은 생산과 시험, 그리고 실제 운전 데이터를 기반으로 완성됩니다.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-stretch">
                    <ScrollReveal from="up">
                        <div className="ew-card-soft space-y-4 p-5">
                            <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                                통합 생산 · 시험 환경
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                EngineWorks의 생산 라인은 엔진 가공, 조립, 시험을 하나의 흐름 안에서
                                처리하도록 구성되어 있습니다.
                            </p>
                            <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-600">
                                {FACILITY_POINTS.map((p) => (
                                    <li key={p} className="flex gap-2">
                                        <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-slate-400" />
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal from="up" delay={150}>
                        <div className="ew-card-soft p-5 flex flex-col justify-between overflow-hidden">
                            <div className="space-y-3">
                                <p className="text-[11px] font-medium text-slate-500">
                                    ENGINE TEST CELL (DUMMY)
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                    엔진이 실제로 숨 쉬는 공간
                                </p>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    실제 사진 대신, 이 영역은 향후 공장 · 시험 설비 사진으로 대체할 수 있습니다.
                                </p>
                            </div>
                            <div className="mt-4 h-40 rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA SECTION */}
            <ScrollReveal from="up">
                <section className="space-y-4">
                    <div className="ew-card-soft flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-5">
                        <div className="space-y-2">
                            <p className="text-[11px] font-medium text-slate-500">
                                PROJECT & APPLICATION
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-slate-900">
                                새로운 설비나 리파워링 프로젝트를 검토 중이신가요?
                            </p>
                            <p className="text-xs sm:text-sm text-slate-600">
                                설비 용도 · 부하 패턴 · 설치 환경 조건을 공유해 주시면 적합한 엔진 및 패키지를 제안해 드립니다.
                            </p>
                        </div>
                        <a href="/contact" className="ew-btn-primary text-xs sm:text-sm">
                            프로젝트 상담 문의하기
                        </a>
                    </div>
                </section>
            </ScrollReveal>
        </div>
    );
}