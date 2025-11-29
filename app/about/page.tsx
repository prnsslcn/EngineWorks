// app/about/page.tsx

export default function AboutPage() {
    return (
        <section className="ew-section space-y-12">
            {/* Hero / 소개 문구 */}
            <header className="space-y-4 max-w-3xl">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    EngineWorks 소개
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    EngineWorks는 발전 설비, 해양 선박, 중공업 플랜트 등
                    고부하·장시간 운전이 요구되는 산업 현장을 위한
                    고성능 엔진을 설계·제조하는 기업입니다.
                    설계 검토부터 시운전, 사후 서비스까지 전 과정을 책임지는
                    파트너를 지향합니다.
                </p>
            </header>

            {/* 비전 & 핵심 가치 */}
            <section className="space-y-5">
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-1">
                        비전 & 핵심 가치
                    </h2>
                    <p className="text-sm text-slate-400">
                        단순한 엔진 공급사가 아니라, 고객의 비즈니스 연속성을 함께 고민하는
                        장기 파트너가 되는 것이 EngineWorks의 목표입니다.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <article className="ew-card p-4 sm:p-5 space-y-2">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                            Reliability · 신뢰성
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            산업 현장의 멈춤은 곧 손실입니다.
                            EngineWorks는 설계 검증과 철저한 품질 관리를 통해
                            높은 신뢰성과 긴 수명을 갖춘 엔진을 제공합니다.
                        </p>
                    </article>
                    <article className="ew-card p-4 sm:p-5 space-y-2">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                            Efficiency · 효율
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            연료 효율과 유지보수성은
                            총 운전 비용(TCO)을 결정하는 핵심 요소입니다.
                            엔진 효율 개선과 정비 편의성 향상에 지속적으로 투자합니다.
                        </p>
                    </article>
                    <article className="ew-card p-4 sm:p-5 space-y-2">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                            Partnership · 파트너십
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            프로젝트 초기 기획부터 운영 단계까지,
                            고객과 함께 계획을 세우고 데이터를 기반으로
                            장기적인 운영 전략을 제안합니다.
                        </p>
                    </article>
                </div>
            </section>

            {/* 연혁 타임라인 (예시 연도) */}
            <section className="space-y-5">
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-1">
                        회사 연혁
                    </h2>
                    <p className="text-sm text-slate-400">
                        실제 연혁 데이터는 나중에 교체하면 되고, 지금은 구조를 잡기 위한 예시입니다.
                    </p>
                </div>

                <div className="relative border-l border-slate-700/70 pl-4 space-y-5">
                    <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-ew-accent" />

                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-ew-accent">2025</p>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                            차세대 발전용 엔진 플랫폼 개발
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300">
                            데이터센터 및 병원용 비상 발전 설비를 위한
                            고효율·저소음 엔진 플랫폼을 개발하고, 주요 고객사에 공급을 시작합니다.
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-ew-accent">2022</p>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                            해양·선박용 엔진 라인업 확대
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300">
                            연안 화물선, 어선, 관공선 등 다양한 선종을 대상으로
                            해양용 엔진 포트폴리오를 확장하고 서비스 네트워크를 구축했습니다.
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-ew-accent">2018</p>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                            EngineWorks 브랜드 런칭
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300">
                            기존 산업기계 사업부를 분리하여 엔진 전문 브랜드 EngineWorks를
                            런칭하고, 발전·중공업·해양 분야 고객을 대상으로 한
                            전문 엔진 사업을 시작했습니다.
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-ew-accent">2010</p>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                            엔진 설계·시험 설비 구축
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300">
                            중대형 디젤 엔진 설계와 성능 시험을 위한
                            전용 엔지니어링 팀과 시험동(Test Cell)을 구축했습니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 생산/시험 설비 & 품질 시스템 */}
            <section className="space-y-5">
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-1">
                        생산 · 시험 설비
                    </h2>
                    <p className="text-sm text-slate-400">
                        실제 공장/생산 라인 사진이 있다면 이 섹션에 이미지를 배치할 수 있습니다.
                        지금은 텍스트 기반으로만 구조를 잡아두었습니다.
                    </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    {/* 생산 설비 설명 */}
                    <article className="ew-card p-4 sm:p-5 space-y-3">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                            생산 라인 & 설비
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            EngineWorks 생산 라인은 가공, 조립, 성능 시험 단계로 구성되어 있으며,
                            각 공정별 품질 체크리스트를 기반으로 엔진이 출하됩니다.
                        </p>
                        <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
                            <li>중대형 엔진 블록 가공 설비</li>
                            <li>연료 분사계 및 제어계 조립 라인</li>
                            <li>부하 시험이 가능한 엔진 시험동(Test Cell)</li>
                            <li>출하 전 전수 성능·안전 점검 프로세스</li>
                        </ul>
                    </article>

                    {/* 품질/서비스 설명 */}
                    <article className="ew-card p-4 sm:p-5 space-y-3">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                            품질 & 서비스 체계
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            현장의 안정적인 운전이 가장 중요하다는 가정 아래,
                            설치 이후의 서비스까지 고려한 품질 시스템을 운영하고 있습니다.
                        </p>
                        <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
                            <li>설치 후 초기 시운전 및 성능 검증 지원</li>
                            <li>정기점검 및 예방 정비 프로그램 운영</li>
                            <li>원격 모니터링 및 이상 징후 알림(옵션)</li>
                            <li>부품 공급 및 긴급 출동 서비스 네트워크</li>
                        </ul>
                    </article>
                </div>
            </section>

            {/* 연락 유도 문구 */}
            <section className="ew-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h2 className="text-sm sm:text-base font-semibold text-slate-50 mb-1">
                        프로젝트에 맞는 엔진을 찾고 계신가요?
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300">
                        현장 조건과 요구 출력, 운전 패턴만 알려주시면
                        적합한 엔진 라인업과 예상 사양 범위를 함께 검토해 드립니다.
                    </p>
                </div>
                <a href="/contact" className="ew-btn-primary text-xs sm:text-sm">
                    상담 문의하기
                </a>
            </section>
        </section>
    );
}