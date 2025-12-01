// components/ContactForm.tsx
"use client";

import { useFormStatus } from "react-dom";
import { submitContact } from "@/app/contact/action";

interface ContactFormProps {
  defaultEngineName?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="ew-btn-primary w-full sm:w-auto text-sm"
      disabled={pending}
    >
      {pending ? "전송 중..." : "문의 보내기"}
    </button>
  );
}

export default function ContactForm({ defaultEngineName }: ContactFormProps) {
  return (
    <form action={submitContact} className="space-y-4">
      {/* 🔒 Honeypot 필드 (봇 방지용, 사용자에게는 숨김) */}
      <div className="mb-2">
        <label htmlFor="hp_check" className="block text-xs text-slate-500">
          회사 홈페이지 (채우지 마세요)
          <input type="text" name="hp_check" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* 제품 상세에서 넘어온 엔진명 (있다면 hidden으로 전달) */}
      {defaultEngineName && (
        <input type="hidden" name="engine" value={defaultEngineName} />
      )}

      {/* 이름 */}
      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="block text-xs font-medium text-slate-700"
        >
          이름 <span className="text-rose-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          placeholder="홍길동"
        />
      </div>

      {/* 회사명 (옵션) */}
      <div className="space-y-1.5">
        <label
          htmlFor="company"
          className="block text-xs font-medium text-slate-700"
        >
          회사명 (선택)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          placeholder="회사명 또는 기관명"
        />
      </div>

      {/* 이메일 */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs font-medium text-slate-700"
        >
          이메일 <span className="text-rose-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          placeholder="you@example.com"
        />
        <p className="text-[11px] text-slate-400">
          회신을 받으실 이메일 주소를 정확히 입력해 주세요.
        </p>
      </div>

      {/* 제목 */}
      <div className="space-y-1.5">
        <label
          htmlFor="subject"
          className="block text-xs font-medium text-slate-700"
        >
          제목 <span className="text-rose-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          placeholder="예) 데이터센터 비상 발전 설비 검토 문의"
        />
      </div>

      {/* 메시지 */}
      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="block text-xs font-medium text-slate-700"
        >
          문의 내용 <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 resize-y"
          placeholder={`프로젝트 개요, 설비 용도, 예상 일정, 참고하셨으면 하는 내용을 자유롭게 작성해 주세요.`}
        />
      </div>

      <div className="pt-2 flex items-center justify-between gap-3">
        <p className="text-[11px] text-slate-400">
          버튼을 누르시면 문의 내용이 DB에 저장되고 담당자에게 메일로
          전달됩니다.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
