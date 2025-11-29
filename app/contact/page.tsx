// app/contact/page.tsx

import { submitContact } from "./action";

interface ContactPageProps {
    // ✅ Next.js 16: searchParams가 Promise로 들어옴
    searchParams: Promise<{
        status?: string;
        reason?: string;
    }>;
}

// ✅ async 컴포넌트 + searchParams await
export default async function ContactPage({ searchParams }: ContactPageProps) {
    const { status, reason } = await searchParams;

    let alertBox: React.ReactNode = null;

    if (status === "success") {
        alertBox = (
            <div className="mb-6 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                문의가 정상적으로 접수되었습니다. 빠른 시일 내에 담당자가 연락드리겠습니다.
            </div>
        );
    } else if (status === "error") {
        const msg =
            reason === "missing"
                ? "필수 입력 항목이 누락되었습니다. 다시 한 번 확인해 주세요."
                : "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
        alertBox = (
            <div className="mb-6 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {msg}
            </div>
        );
    }

    return (
        <section className="ew-section max-w-xl">
            <header className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                    문의하기
                </h1>
                <p className="text-slate-300 text-sm sm:text-base">
                    EngineWorks 엔진 및 프로젝트 관련 문의를 남겨주시면 담당자가 확인 후
                    연락드립니다.
                </p>
            </header>

            {alertBox}

            <form action={submitContact} className="ew-card p-5 sm:p-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    {/* 이름 */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-sm font-medium text-slate-100">
                            이름 <span className="text-rose-400">*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-ew-accent focus:ring-1 focus:ring-ew-accent"
                            placeholder="홍길동"
                        />
                    </div>

                    {/* 회사명 (옵션) */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="company"
                            className="text-sm font-medium text-slate-100"
                        >
                            회사명
                        </label>
                        <input
                            id="company"
                            name="company"
                            className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-ew-accent focus:ring-1 focus:ring-ew-accent"
                            placeholder="EngineWorks Inc."
                        />
                    </div>
                </div>

                {/* 이메일 */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-slate-100">
                        이메일 <span className="text-rose-400">*</span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-ew-accent focus:ring-1 focus:ring-ew-accent"
                        placeholder="you@example.com"
                    />
                </div>

                {/* 제목 */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="subject"
                        className="text-sm font-medium text-slate-100"
                    >
                        제목 <span className="text-rose-400">*</span>
                    </label>
                    <input
                        id="subject"
                        name="subject"
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-ew-accent focus:ring-1 focus:ring-ew-accent"
                        placeholder="산업용 엔진 견적 문의"
                    />
                </div>

                {/* 메시지 */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="message"
                        className="text-sm font-medium text-slate-100"
                    >
                        문의 내용 <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-ew-accent focus:ring-1 focus:ring-ew-accent resize-y"
                        placeholder="필요하신 엔진 타입, 적용 분야, 예상 운전 조건 등을 함께 적어주시면 더욱 정확한 상담이 가능합니다."
                    />
                </div>

                {/* 버튼 */}
                <div className="pt-2 flex justify-end">
                    <button type="submit" className="ew-btn-primary">
                        문의 보내기
                    </button>
                </div>
            </form>
        </section>
    );
}