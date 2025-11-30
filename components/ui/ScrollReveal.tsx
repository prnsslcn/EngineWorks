// components/ui/ScrollReveal.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
    children: ReactNode;
    /**
     * 애니메이션 시작 방향 (기본: 'up' – 아래에서 위로 살짝 떠오르는 느낌)
     */
    from?: Direction;
    /**
     * 애니메이션 지연 시간 (ms)
     */
    delay?: number;
    /**
     * 뷰포트에 얼마나 들어왔을 때 트리거할지 (0 ~ 1, 기본 0.15)
     */
    threshold?: number;
}

export function ScrollReveal({
                                 children,
                                 from = "up",
                                 delay = 0,
                                 threshold = 0.15,
                             }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const target = ref.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    // 살짝 늦게 반응하는 느낌을 위해 delay 적용
                    timeoutRef.current = window.setTimeout(() => {
                        setIsVisible(true);
                    }, delay);

                    observer.unobserve(entry.target);
                });
            },
            {
                threshold,
            }
        );

        observer.observe(target);

        return () => {
            observer.disconnect();
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, [delay, threshold]);

    const initialTransform = (() => {
        // 이동 거리를 살짝 줄여서 더 미묘한 모션으로 (4 → 6보다 덜 튐)
        switch (from) {
            case "up":
                return "translate-y-4";
            case "down":
                return "-translate-y-4";
            case "left":
                return "translate-x-4";
            case "right":
                return "-translate-x-4";
            default:
                return "translate-y-4";
        }
    })();

    return (
        <div
            ref={ref}
            className={clsx(
                "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
                // 초기 상태: 살짝 투명 + 살짝 이동
                !isVisible && "opacity-0 pointer-events-none",
                !isVisible && initialTransform,
                // 보이는 상태: 원래 자리 + 완전 불투명
                isVisible && "opacity-100 translate-x-0 translate-y-0"
            )}
        >
            {children}
        </div>
    );
}