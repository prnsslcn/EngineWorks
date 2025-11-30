// components/theme/SmoothScrollProvider.tsx
"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProviderProps {
    children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    useEffect(() => {
        const lenis = new Lenis({
            // 스크롤이 "느리게 따라오는" 정도 (1.2 ~ 1.6 사이로 튜닝 가능)
            duration: 0.8,
            // 감성 곡선 (부드럽게 감쇠되는 느낌)
            easing: (t: number) => 1 - Math.pow(1 - t, 3),

            // 마우스 휠/트랙패드 스크롤은 부드럽게
            smoothWheel: true,

            // 세로 스크롤 기준
            gestureOrientation: "vertical",

            // 스크롤 속도 미세 조정 (1보다 작으면 더 무거운 느낌)
            wheelMultiplier: 1.2,
            touchMultiplier: 1, // 터치는 거의 기본 느낌 유지
            // ⚠️ smoothTouch 같은 옵션은 없습니다. (LenisOptions에 없음)
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}