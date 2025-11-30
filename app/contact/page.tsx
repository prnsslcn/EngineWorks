// app/contact/page.tsx

import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
    title: "문의하기",
    description:
        "EngineWorks 엔진 및 솔루션에 대한 프로젝트 상담, 기술 문의를 남겨주세요.",
};

type ContactSearchParams = {
    status?: string;
    reason?: string;
};

interface ContactPageProps {
    searchParams: Promise<ContactSearchParams>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
    const { status, reason } = await searchParams;

    let alertBox: React.ReactNode = null;

    if (status === "success") {
        alertBox = (
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs sm:text-sm text-emerald-700">
                문의가 정상적으로 접수되었습니다. 담당자가 확인 후 입력하신 이메일로
                회신을 드릴 예정입니다.
            </div>
        );
    } else if (status === "error") {
        alertBox = (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs sm:text-sm text-rose-700">
                문의 등록 중 오류가 발생했습니다.
                <br />
                잠시 후 다시 시도해주시거나, 문제가 지속될 경우 이메일로 직접 연락
                부탁드립니다.
                {reason && (
                    <span className="mt-1 block text-[11px] text-rose-500">
            (오류 정보: {reason})
          </span>
                )}
            </div>
        );
    }

    return (
        <div className="ew-section">
            <div className="ew-page-container grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
                {/* Left: 안내 텍스트 */}
                <section className="space-y-6">
                    <div className="space-y-3">
                        <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                            CONTACT
                        </p>
                        <h1 className="ew-section-title">
                            프로젝트, 기술 문의를
                            <br className="hidden sm:block" />
                            남겨주세요.
                        </h1>
                        <p className="ew-section-subtitle max-w-xl">
                            새로운 설비 구축, 리파워링, 유지보수 전략, 플릿 모니터링 도입 등
                            EngineWorks 엔진과 솔루션이 필요한 내용을 자유롭게 작성해 주세요.
                            가능한 한 구체적인 현장 정보를 함께 남겨주시면 더 정확하게
                            검토할 수 있습니다.
                        </p>
                    </div>

                    <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                        <div>
                            <p className="font-medium text-slate-800 mb-1">예시로 적어주시면 좋은 정보들</p>
                            <ul className="space-y-1.5">
                                <li className="flex gap-2">
                                    <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-slate-400" />
                                    <span>설비 용도 (예: 데이터센터 비상 전원, 연안 여객선 추진 등)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-slate-400" />
                                    <span>예상 부하 패턴 (상시 운전 / 비상용 / 피크 부하 등)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-slate-400" />
                                    <span>설치 환경 (실내/실외, 온도 범위, 소음/배출 규제 조건 등)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="text-[11px] sm:text-xs text-slate-500">
                            입력하신 정보는 문의 응답을 위한 용도 외에는 사용되지 않으며,
                            일정 기간 이후 안전하게 파기됩니다.
                        </div>
                    </div>
                </section>

                {/* Right: 문의 폼 */}
                <section>
                    <div className="ew-card-soft p-5 sm:p-6">
                        {alertBox}
                        <ContactForm />
                    </div>
                </section>
            </div>
        </div>
    );
}