// components/layout/Footer.tsx

import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-white/80">
            <div className="ew-page-container flex flex-col gap-3 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <p className="font-medium text-slate-700">
                        EngineWorks <span className="text-[9px] align-middle">·</span>{" "}
                        High-Performance Industrial Engines
                    </p>
                    <p className="text-[11px] text-slate-400">
                        © {currentYear} EngineWorks. This is a fictional company website
                        built for learning & portfolio purposes.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                    <Link
                        href="/products"
                        className="hover:text-slate-800 transition-colors"
                    >
                        제품 보기
                    </Link>
                    <Link
                        href="/news"
                        className="hover:text-slate-800 transition-colors"
                    >
                        뉴스
                    </Link>
                    <Link
                        href="/contact"
                        className="hover:text-slate-800 transition-colors"
                    >
                        문의하기
                    </Link>
                    <a
                        href="mailto:prnsslcn@gmail.com"
                        className="text-[11px] text-slate-400 hover:text-slate-700 transition-colors"
                    >
                        prnsslcn@gmail.com
                    </a>
                </div>
            </div>
        </footer>
    );
}