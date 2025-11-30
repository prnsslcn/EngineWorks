// app/contact/page.tsx

import type { ReactNode } from "react";
import ContactForm from "@/components/ContactForm";

type ContactPageSearchParams = {
  status?: string;
  reason?: string;
  engine?: string;
};

type ContactPageProps = {
  searchParams: Promise<ContactPageSearchParams>;
};

function buildAlertBox({
  status,
  reason,
}: {
  status?: string;
  reason?: string;
}): ReactNode {
  if (status === "success") {
    return (
      <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs sm:text-sm text-emerald-800">
        문의가 정상적으로 접수되었습니다. 담당자가 내용을 확인한 후, 남겨주신
        이메일로 회신 드릴 예정입니다.
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs sm:text-sm text-rose-800">
        문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요. 문제가
        지속될 경우, 관리자에게 직접 문의해 주세요.
        {reason && (
          <div className="mt-1 text-[11px] text-rose-600/80">
            (참고: {reason})
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { status, reason, engine } = await searchParams;
  const alertBox = buildAlertBox({ status, reason });

  return (
    <div className="ew-section">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
        {/* 좌측: 설명 */}
        <section className="space-y-5">
          <div className="space-y-3">
            <p className="ew-tag">Contact</p>
            <h1 className="ew-section-title">
              프로젝트와 엔진 적용에 대해
              <br className="hidden sm:block" />
              함께 이야기해 보겠습니다.
            </h1>
            <p className="ew-section-subtitle max-w-xl">
              구체적인 프로젝트가 있지 않더라도, 검토 중인 설비, 예상 부하, 설치
              환경 등 고민 중인 내용을 자유롭게 남겨 주세요. 가능하다면 현장의
              운전 조건과 요구 사항을 함께 공유해 주시면, 더 구체적인 논의가
              가능합니다.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm text-slate-600">
            <div className="ew-card-soft px-4 py-4">
              <p className="text-[11px] font-medium text-slate-500 mb-1">
                어떤 내용을 남기면 좋을까요?
              </p>
              <ul className="space-y-1.5">
                <li>• 프로젝트 위치 및 용도</li>
                <li>• 예상 출력/부하 범위</li>
                <li>• 운전 패턴(상시/비상, 피크 부하 등)</li>
                <li>• 특이 환경(해안, 고지대, 고온 등)</li>
              </ul>
            </div>
            <div className="ew-card-soft px-4 py-4">
              <p className="text-[11px] font-medium text-slate-500 mb-1">
                엔진 제품과 연계한 상담
              </p>
              <p>
                제품 상세 페이지에서 “이 엔진으로 상담 문의” 버튼을 통해
                접속하신 경우, 해당 엔진명이 자동으로 함께 전달됩니다.
              </p>
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-500">
            * 이 페이지는 포트폴리오용 예시이며, 실제 메일은 설정된 수신자
            이메일로 전송됩니다.
          </p>
        </section>

        {/* 우측: 폼 */}
        <section className="space-y-4">
          {alertBox}
          <div className="ew-card-soft px-5 py-5 sm:px-6 sm:py-6">
            <h2 className="text-sm sm:text-base font-semibold text-slate-900 mb-3">
              문의 내용 작성
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 mb-4">
              아래 항목을 채운 후, 가능한 한 자세히 문의 내용을 남겨 주세요. *
              표시는 필수 항목입니다.
            </p>
            <ContactForm defaultEngineName={engine} />
          </div>
        </section>
      </div>
    </div>
  );
}
