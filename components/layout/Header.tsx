// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { href: "/about", label: "회사 소개" },
    { href: "/products", label: "엔진 라인업" },
    { href: "/news", label: "뉴스" },
    { href: "/contact", label: "문의" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
            <div className="ew-page-container flex h-16 items-center justify-between gap-4">
                {/* 로고 / 브랜드 영역 */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-semibold">
                        EW
                    </div>
                    <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">
              EngineWorks
            </span>
                        <span className="text-[11px] text-slate-500">
              Industrial Engine Platform
            </span>
                    </div>
                </Link>

                {/* 내비게이션 */}
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {NAV_ITEMS.map((item) => {
                        const isActive =
                            item.href === "/"
                                ? pathname === "/"
                                : pathname?.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative text-sm ${
                                    isActive ? "text-slate-900" : "text-slate-500"
                                }`}
                            >
                                <span>{item.label}</span>
                                {isActive && (
                                    <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-slate-900" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* 우측 CTA */}
                <div className="hidden sm:flex items-center gap-2">
                    <Link
                        href="/contact"
                        className="inline-flex items-center rounded-full border border-slate-300 px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-100"
                    >
                        프로젝트 상담
                    </Link>
                </div>
            </div>
        </header>
    );
}