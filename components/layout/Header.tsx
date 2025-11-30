// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  if (href === "/products")
    return pathname === "/products" || pathname.startsWith("/products/");
  if (href === "/news")
    return pathname === "/news" || pathname.startsWith("/news/");
  return pathname === href;
}

interface IndicatorStyle {
  left: number;
  width: number;
  opacity: number;
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // 공용 인디케이터 바 위치 계산용
  const navRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // 각 링크에 ref를 등록하는 헬퍼
  const registerLinkRef = (href: string) => (el: HTMLAnchorElement | null) => {
    linkRefs.current[href] = el;
  };

  // 스크롤 시 헤더 스타일 변경
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 12) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 활성 메뉴 변경/리사이즈 시 인디케이터 위치 업데이트
  useEffect(() => {
    const updateIndicator = () => {
      const currentPath = pathname ?? "/";
      const activeItem = NAV_ITEMS.find((item) =>
        isActivePath(currentPath, item.href),
      );

      if (!activeItem) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const navEl = navRef.current;
      const linkEl = linkRefs.current[activeItem.href];

      if (!navEl || !linkEl) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const navRect = navEl.getBoundingClientRect();
      const linkRect = linkEl.getBoundingClientRect();

      const left = linkRect.left - navRect.left;
      const width = linkRect.width;

      // 살짝 부드럽게 이동하는 느낌
      setIndicator({
        left,
        width,
        opacity: 1,
      });
    };

    // 레이아웃이 그려진 뒤에 계산되도록
    requestAnimationFrame(updateIndicator);

    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 transition-colors",
        scrolled
          ? "bg-white/90 backdrop-blur border-b border-slate-200"
          : "bg-white/70 backdrop-blur-sm border-b border-transparent",
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

        {/* 네비게이션 + 인디케이터 바 */}
        <nav
          ref={navRef}
          className="relative flex items-center gap-3 sm:gap-5 text-xs sm:text-sm"
        >
          {/* 공용 이동 바 */}
          <span
            className="pointer-events-none absolute -bottom-1 h-[2px] rounded-full bg-slate-900 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.opacity,
            }}
          />

          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname ?? "/", item.href);
            const isContact = item.href === "/contact";

            if (isContact) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={registerLinkRef(item.href)}
                  className={clsx(
                    "inline-flex items-center rounded-full px-4 py-1.5 border text-[11px] sm:text-[13px] font-medium transition-colors",
                    "border-slate-900",
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-900 hover:bg-slate-900 hover:text-white",
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
                ref={registerLinkRef(item.href)}
                className={clsx(
                  "relative px-1 py-1 text-[11px] sm:text-xs font-medium transition-colors",
                  active
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
