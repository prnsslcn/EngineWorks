// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "EngineWorks | 고성능 산업용 엔진 제조 기업",
    description:
        "EngineWorks는 발전, 해양, 중공업 현장을 위한 고성능 산업용 엔진을 설계·제조하는 기업입니다.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
        <body className="bg-slate-950 text-slate-50 antialiased">
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div className="ew-page-container">{children}</div>
            </main>
            <Footer />
        </div>
        </body>
        </html>
    );
}