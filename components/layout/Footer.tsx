// components/layout/Footer.tsx
import Link from "next/link";

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-slate-800 bg-slate-950/90 mt-12">
            <div className="ew-page-container py-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-xs text-slate-400">
                <div>
                    <span className="font-semibold text-slate-300">EngineWorks</span>{" "}
                    <span>© {new Date().getFullYear()} All rights reserved.</span>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/privacy"
                        className="hover:text-slate-200 transition-colors"
                    >
                        개인정보 처리방침
                    </Link>
                    <Link
                        href="/terms"
                        className="hover:text-slate-200 transition-colors"
                    >
                        이용약관
                    </Link>
                </div>
            </div>
        </footer>
    );
};