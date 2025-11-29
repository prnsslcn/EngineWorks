// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const navLinks = [
    { href: "/", label: "홈" },
    { href: "/about", label: "회사 소개" },
    { href: "/products", label: "제품" },
    { href: "/news", label: "뉴스" },
    { href: "/contact", label: "문의" },
];

export const Header: React.FC = () => {
    const pathname = usePathname();

    const activePath = useMemo(() => {
        // /products/industrial-diesel 같은 상세 페이지도 /products로 묶어서 active 처리
        if (!pathname) return "/";
        if (pathname.startsWith("/products")) return "/products";
        if (pathname.startsWith("/news")) return "/news";
        if (pathname.startsWith("/about")) return "/about";
        if (pathname.startsWith("/contact")) return "/contact";
        return pathname;
    }, [pathname]);

    return (
        <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
                {/* 로고 영역 */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ew-accent/20 border border-ew-accent/50">
                        <span className="text-xs font-bold text-ew-accent">EW</span>
                    </div>
                    <div className="flex flex-col leading-tight">
            <span className="text-sm sm:text-base font-semibold">
              EngineWorks
            </span>
                        <span className="hidden sm:block text-[11px] text-slate-400">
              Industrial Engine Manufacturer
            </span>
                    </div>
                </Link>

                {/* 네비게이션 + CTA */}
                <div className="flex items-center gap-3">
                    <nav className="hidden md:flex items-center gap-2 text-xs sm:text-sm">
                        {navLinks.map((link) => {
                            const isActive = activePath === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={[
                                        "relative rounded-full px-3 py-1 transition",
                                        isActive
                                            ? "text-ew-accent"
                                            : "text-slate-300 hover:text-slate-50",
                                    ].join(" ")}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="pointer-events-none absolute inset-x-3 -bottom-[2px] h-[2px] rounded-full bg-ew-accent/80" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* 모바일 간단 네비 (필요시 더 확장 가능) */}
                    <nav className="md:hidden flex items-center gap-1 text-xs">
                        {navLinks.slice(0, 3).map((link) => {
                            const isActive = activePath === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={[
                                        "px-2 py-1 rounded-full transition",
                                        isActive
                                            ? "text-ew-accent bg-slate-900/80"
                                            : "text-slate-300 hover:text-slate-50",
                                    ].join(" ")}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* 문의 CTA 버튼 */}
                    <Link
                        href="/contact"
                        className="hidden sm:inline-flex items-center gap-1 rounded-full border border-ew-accent/60 bg-ew-accent/10 px-3 py-1 text-xs sm:text-sm font-medium text-ew-accent hover:bg-ew-accent/20 transition"
                    >
                        <span>문의하기</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};