// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const siteUrl = "https://engineworks.example.com"; // TODO: 나중에 실제 도메인으로 교체

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "EngineWorks | 고성능 산업용 엔진 제조 기업",
        template: "%s | EngineWorks",
    },
    description:
        "EngineWorks는 발전, 해양, 중공업 현장을 위한 고성능 산업용 엔진을 설계·제조하며, 설계부터 애프터서비스까지 전 과정을 책임지는 산업용 엔진 파트너입니다.",
    applicationName: "EngineWorks",
    authors: [{ name: "EngineWorks" }],
    generator: "Next.js",
    keywords: [
        "EngineWorks",
        "산업용 엔진",
        "발전용 엔진",
        "해양 엔진",
        "디젤 엔진",
        "발전기",
    ],
    openGraph: {
        type: "website",
        locale: "ko_KR",
        url: siteUrl,
        siteName: "EngineWorks",
        title: "EngineWorks | 고성능 산업용 엔진 제조 기업",
        description:
            "발전 설비, 해양 선박, 중공업 플랜트를 위한 고성능 산업용 엔진 제조 기업 EngineWorks.",
        images: [
            {
                url: "/og-engineworks.png", // public/og-engineworks.png (나중에 추가)
                width: 1200,
                height: 630,
                alt: "EngineWorks - Industrial Engine Manufacturer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "EngineWorks | 고성능 산업용 엔진 제조 기업",
        description:
            "발전, 해양, 중공업 현장을 위한 고성능 산업용 엔진 제조 기업 EngineWorks.",
        images: ["/og-engineworks.png"],
    },
    icons: {
        icon: "/favicon.ico",
    },
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