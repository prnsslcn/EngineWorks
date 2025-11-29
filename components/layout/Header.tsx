// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "회사 소개" },
    { href: "/products", label: "제품" },
    { href: "/news", label: "뉴스" },
    { href: "/contact", label: "문의" },
];

export const Header: React.FC = () => {
    const pathname = usePathname();

    return (
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
            <div className="ew-page-container flex h-16 items-center justify-between gap-4">
                {/* 로고 */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-ew-accent/90 flex items-center justify-center text-slate-950 font-black text-lg">
                        E
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="font-semibold tracking-tight">EngineWorks</span>
                        <span className="text-xs text-slate-400">
              Industrial Engine Systems
            </span>
                    </div>
                </Link>

                {/* 네비게이션 */}
                <nav className="hidden sm:flex items-center gap-2">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                                    active
                                        ? "bg-ew-accent text-slate-950 font-semibold"
                                        : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-50"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* 우측 CTA (문의하기로 이동) */}
                <Link href="/contact" className="hidden sm:inline-flex ew-btn-primary">
                    문의하기
                </Link>
            </div>
        </header>
    );
};