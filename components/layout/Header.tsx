// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";

const NAV_ITEMS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "회사 소개" },
    { href: "/products", label: "제품" },
    { href: "/news", label: "뉴스" },
    { href: "/contact", label: "문의" },
];

function isActivePath(pathname: string, href: string): boolean {
    if (href === "/") return pathname === "/";
    // /products, /products/slug... 모두 활성으로 처리
    if (href === "/products") return pathname === "/products" || pathname.startsWith("/products/");
    if (href === "/news") return pathname === "/news" || pathname.startsWith("/news/");
    return pathname === href;
}

export default function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 12) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        handleScroll(); // 초기 상태 반영
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={clsx(
                "sticky top-0 z-40 transition-colors",
                scrolled ? "bg-white/90 backdrop-blur border-b border-slate-200" : "bg-white/70 backdrop-blur-sm border-b border-transparent"
            )}
        >
            <div className="ew-page-container flex items-center justify-between gap-4 py-3 sm:py-4">
                {/* 로고 / 브랜드 */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white tracking-tighter">
              EW
            </span>
                        <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-900">
                EngineWorks
              </span>
                            <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                Industrial Engines
              </span>
                        </div>
                    </Link>
                </div>

                {/* 네비게이션 */}
                <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm">
                    {NAV_ITEMS.map((item) => {
                        const active = isActivePath(pathname ?? "/", item.href);
                        const isContact = item.href === "/contact";

                        if (isContact) {
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={clsx(
                                        "inline-flex items-center rounded-full px-4 py-1.5 border text-xs sm:text-[13px] font-medium transition-colors",
                                        "border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "relative px-1 py-1 text-[11px] sm:text-xs font-medium text-slate-500 hover:text-slate-900",
                                    active && "text-slate-900"
                                )}
                            >
                                {item.label}
                                {active && (
                                    <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-[2px] w-full rounded-full bg-slate-900" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}