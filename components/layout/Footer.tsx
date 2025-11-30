// components/layout/Footer.tsx

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="ew-page-container py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* 왼쪽: 브랜드 + 카피 */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="h-5 w-5 rounded-full bg-slate-900 flex items-center justify-center text-[9px] font-bold text-white tracking-tight">
              EW
            </span>
            <span className="text-xs font-semibold text-slate-800">
              EngineWorks
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            © {currentYear} EngineWorks. Fictional industrial engine company
            website for learning & portfolio.
          </p>
        </div>

        {/* 오른쪽: 링크들 */}
        <div className="flex flex-col items-center gap-2 text-[11px] text-slate-500 md:items-end">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="hover:text-slate-800 transition-colors"
            >
              제품 보기
            </Link>
            <span className="h-3 w-px bg-slate-200" aria-hidden />
            <Link
              href="/news"
              className="hover:text-slate-800 transition-colors"
            >
              뉴스 & 공지
            </Link>
            <span className="h-3 w-px bg-slate-200" aria-hidden />
            <Link
              href="/contact"
              className="hover:text-slate-800 transition-colors"
            >
              문의하기
            </Link>
          </div>

          <a
            href="mailto:contact@example.com"
            className="text-[11px] text-slate-400 hover:text-slate-700 transition-colors"
          >
            contact@example.com
          </a>
        </div>
      </div>
    </footer>
  );
}
