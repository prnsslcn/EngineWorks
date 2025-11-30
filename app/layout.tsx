// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/theme/SmoothScrollProvider"; // ⬅ 추가

const siteUrl = "https://engine-works-jurg.vercel.app";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "EngineWorks | 고성능 산업용 엔진 제조 기업",
        template: "%s | EngineWorks",
    },
    description:
        "EngineWorks는 발전·해양·중공업 현장을 위한 고성능 산업용 엔진과 운영 솔루션을 제공하는 가상의 엔진 제조 회사입니다.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
        <body className="bg-[#f5f5f7] text-slate-900 antialiased">
        <SmoothScrollProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <div className="ew-page-container">{children}</div>
                </main>
                <Footer />
            </div>
        </SmoothScrollProvider>
        </body>
        </html>
    );
}