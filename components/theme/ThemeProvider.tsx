// components/theme/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"      // html class에 dark 붙이는 방식
            defaultTheme="dark"    // 기본 다크
            enableSystem           // 시스템 테마도 반영
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    );
}