// components/layout/Footer.tsx

import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white/80 mt-10">
            <div className="ew-page-container py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1 text-xs text-slate-500">
                    <p className="font-medium text-slate-600">EngineWorks</p>
                    <p>고성능 산업용 엔진 및 운영 솔루션을 제공하는 가상의 엔진 제조 기업입니다.</p>
                    <p>© {new Date().getFullYear()} EngineWorks. All rights reserved.</p>
                </div>
                <div className="flex gap-4 text-xs text-slate-500">
                    <Link href="/about" className="hover:text-slate-900">
                        회사 소개
                    </Link>
                    <Link href="/news" className="hover:text-slate-900">
                        뉴스
                    </Link>
                    <Link href="/contact" className="hover:text-slate-900">
                        문의</Link>
                </div>
            </div>
        </footer>
    );
}