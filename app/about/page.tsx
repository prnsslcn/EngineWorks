// app/about/page.tsx

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const HISTORY = [
  {
    year: "2012",
    title: "EngineWorks 설립",
    body: "발전 설비용 산업용 디젤 엔진 시제품 개발을 시작했습니다.",
  },
  {
    year: "2015",
    title: "생산 라인 확장",
    body: "해양 엔진과 중공업용 엔진을 위한 전용 조립 라인을 증설했습니다.",
  },
  {
    year: "2019",
    title: "원격 모니터링 플랫폼 런칭",
    body: "실시간 상태 모니터링 및 예지 정비 기능을 제공하는 플랫폼을 도입했습니다.",
  },
  {
    year: "2024",
    title: "글로벌 프로젝트 확대",
    body: "데이터센터, 병원, 해양 플랜트 등 다양한 글로벌 프로젝트에 엔진을 공급하고 있습니다.",
  },
];

const CORE_VALUES = [
  {
    label: "신뢰할 수 있는 출력",
    title: "안정적인 전력과 동력 공급",
    body: "엔진은 멈추지 않아야 합니다. EngineWorks는 출력을 수치가 아닌 '가동률'로 정의하고, 실제 운전 시간과 부하 패턴을 기준으로 설계를 검증합니다.",
  },
  {
    label: "데이터 기반",
    title: "데이터로 설계하고, 데이터로 유지보수",
    body: "부하, 온도, 진동, 연료 사용량 데이터를 기반으로 설계 단계부터 유지보수 전략까지 함께 구성합니다.",
  },
  {
    label: "현장 중심",
    title: "현장 엔지니어와 함께 만드는 엔진",
    body: "도면이 아닌 현장을 먼저 봅니다. 실제 작업 환경, 운전 스케줄, 접근성까지 고려해 배관, 정비 공간, 인터페이스를 설계합니다.",
  },
];

const FACILITIES = [
  {
    title: "엔진 조립 라인",
    body: "모듈형 조립 시스템으로 다양한 출력대의 엔진을 유연하게 생산합니다.",
    meta: "월 최대 80대 조립",
  },
  {
    title: "성능 시험실",
    body: "부하 시험, 연료 소비, 배기 성능을 실 운전 조건과 유사하게 검증합니다.",
    meta: "최대 3MW급 엔진 시험 가능",
  },
  {
    title: "품질·계측 센터",
    body: "주요 부품에 대해 3D 측정과 비파괴 검사로 품질을 관리합니다.",
    meta: "전 공정 품질 추적",
  },
];

export default function AboutPage() {
  return (
    <div className="ew-section space-y-16">
      {/* HERO / 소개 */}
      <ScrollReveal from="up">
        <section className="space-y-8">
          <div className="space-y-4">
            <p className="ew-tag">About EngineWorks</p>
            <h1 className="ew-section-title">
              산업 현장의 심장을 만드는
              <br className="hidden sm:block" />
              엔진 전문 기업, EngineWorks
            </h1>
            <p className="ew-section-subtitle max-w-2xl">
              EngineWorks는 발전 설비, 해양, 중공업, 인프라 현장을 위한 고성능
              산업용 엔진을 설계·제조하는 가상의 기업입니다. 설계부터 시운전,
              유지보수까지 전 과정을 하나의 팀으로 운영하는 것을 가장 큰
              강점으로 생각합니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="ew-card-soft px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-[11px] text-slate-500 mb-1">설립</p>
              <p className="text-lg font-semibold text-slate-900">2012년</p>
              <p className="mt-2 text-xs text-slate-500">
                중소형 발전기 셋용 디젤 엔진 개발을 시작으로, 해양·중공업 분야로
                제품 라인업을 확장해 왔습니다.
              </p>
            </div>
            <div className="ew-card-soft px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-[11px] text-slate-500 mb-1">주요 분야</p>
              <p className="text-lg font-semibold text-slate-900">
                발전 · 해양 · 중공업
              </p>
              <p className="mt-2 text-xs text-slate-500">
                데이터센터, 병원, 조선소, 플랜트 등 연속 운전이 중요한 현장을
                중심으로 엔진과 솔루션을 공급합니다.
              </p>
            </div>
            <div className="ew-card-soft px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-[11px] text-slate-500 mb-1">지향점</p>
              <p className="text-lg font-semibold text-slate-900">
                엔진 그 이상의 파트너
              </p>
              <p className="mt-2 text-xs text-slate-500">
                단순 납품이 아닌, 현장의 안정성과 수익성을 함께 설계하는 기술
                파트너를 목표로 합니다.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 핵심 가치 */}
      <ScrollReveal from="up" delay={80}>
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="ew-section-title">
              EngineWorks가 중요하게 생각하는 것
            </h2>
            <p className="ew-section-subtitle max-w-2xl">
              엔진은 한 번 설치되면 오랫동안 현장의 핵심 설비로 운전됩니다.
              EngineWorks는 설계 철학과 운영 방식을 통해 긴 시간 동안 안정적인
              운전을 지원하고자 합니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {CORE_VALUES.map((item) => (
              <article
                key={item.title}
                className="ew-card-soft px-4 py-4 sm:px-5 sm:py-5 space-y-2"
              >
                <p className="text-[11px] font-medium text-slate-500">
                  {item.label}
                </p>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 생산 철학 / 공정 소개 */}
      <ScrollReveal from="up" delay={120}>
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          {/* 텍스트 위주 */}
          <div className="space-y-5">
            <h2 className="ew-section-title">
              설계부터 시험까지, 하나의 플로우로
            </h2>
            <p className="ew-section-subtitle">
              EngineWorks의 생산 라인은 설계, 가공, 조립, 성능 시험까지 하나의
              흐름으로 구성되어 있습니다. 각 공정에서 수집된 데이터는 다음
              공정과 유지보수 과정에 공유되어, 설비의 생애 전주기에 걸친 품질
              관리에 활용됩니다.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm text-slate-600">
              <div className="ew-card-soft px-4 py-4">
                <p className="text-[11px] font-medium text-slate-500 mb-1">
                  설계 단계
                </p>
                <p className="font-semibold text-slate-900 mb-1">
                  운전 조건 기반 설계
                </p>
                <p>
                  정격 출력뿐 아니라, 예상 부하 패턴과 기동·정지 사이클, 환경
                  조건을 반영해 엔진 및 보조 설비를 설계합니다.
                </p>
              </div>
              <div className="ew-card-soft px-4 py-4">
                <p className="text-[11px] font-medium text-slate-500 mb-1">
                  조립·시험 단계
                </p>
                <p className="font-semibold text-slate-900 mb-1">
                  실 운전 조건에 가까운 시험
                </p>
                <p>
                  부하 시험, 온도·진동 계측, 연료 소비 측정을 통해 실제 현장
                  운전과 유사한 조건으로 성능을 검증합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 공장 / 생산 라인 이미지 더미 블록 */}
          <div className="ew-card h-full px-5 py-6 sm:px-6 sm:py-7 space-y-4">
            <p className="text-xs font-medium text-slate-500">
              생산 라인 스냅샷 (예시)
            </p>
            <div className="relative h-40 sm:h-48 rounded-2xl bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 overflow-hidden">
              <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.16),_transparent_55%)]" />
              <div className="absolute inset-4 border border-dashed border-slate-300/70 rounded-2xl" />
              <div className="absolute bottom-4 left-4 space-y-1 text-xs">
                <p className="font-semibold text-slate-900">
                  Engine Assembly & Test Bay
                </p>
                <p className="text-[11px] text-slate-500">
                  실제 구축 시, 공장/설비 사진이나 3D 렌더링 이미지를 이 영역에
                  배치할 수 있습니다.
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              현재 페이지는 포트폴리오용 가상 기업 소개 페이지로, 실제 사진 대신
              더미 레이아웃이 사용되고 있습니다.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* 연혁 / 타임라인 */}
      <ScrollReveal from="up" delay={140}>
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="ew-section-title">주요 연혁</h2>
            <p className="ew-section-subtitle">
              EngineWorks가 어떤 과정을 거쳐 현재의 라인업과 서비스를 갖추게
              되었는지 간단히 소개합니다.
            </p>
          </div>

          <div className="relative">
            {/* 타임라인 수직선 */}
            <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-4">
              {HISTORY.map((item, index) => (
                <div key={item.year} className="relative pl-9 sm:pl-12">
                  {/* 타임라인 dot */}
                  <div className="absolute left-1.5 sm:left-2 top-2 h-3 w-3 rounded-full border-2 border-slate-900 bg-white" />
                  <div className="ew-card-soft px-4 py-3 sm:px-5 sm:py-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <p className="text-xs font-semibold text-slate-900">
                        {item.year}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        #{String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 시설 / 인프라 소개 */}
      <ScrollReveal from="up" delay={160}>
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="ew-section-title">생산·시험 인프라</h2>
            <p className="ew-section-subtitle max-w-2xl">
              실제 프로젝트에서는 이 영역에 공장, 시험실, 서비스 네트워크에 대한
              사진과 설명을 넣어 고객에게 신뢰를 전달할 수 있습니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {FACILITIES.map((facility) => (
              <article
                key={facility.title}
                className="ew-card-soft px-4 py-4 sm:px-5 sm:py-5"
              >
                <p className="text-[11px] text-slate-500 mb-1">
                  {facility.meta}
                </p>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
                  {facility.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {facility.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
