// components/layout/Footer.tsx

import Link from "next/link";

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-slate-800/80 bg-slate-950">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    {/* 회사 소개 간단 텍스트 */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-50">
                EngineWorks
              </span>
                            <span className="text-[11px] text-slate-500">
                Industrial Engine Manufacturer
              </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                            EngineWorks는 발전, 해양, 중공업 현장을 위한 고성능 산업용 엔진을
                            설계·제조하며, 설계부터 애프터서비스까지 전 과정을 책임집니다.
                        </p>
                    </div>

                    {/* 링크 영역 */}
                    <div className="flex flex-wrap gap-6 text-xs sm:text-sm">
                        <div className="space-y-1">
                            <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.16em]">
                                Sitemap
                            </h3>
                            <div className="flex flex-col gap-0.5">
                                <Link
                                    href="/about"
                                    className="text-slate-300 hover:text-slate-50"
                                >
                                    회사 소개
                                </Link>
                                <Link
                                    href="/products"
                                    className="text-slate-300 hover:text-slate-50"
                                >
                                    제품 라인업
                                </Link>
                                <Link
                                    href="/news"
                                    className="text-slate-300 hover:text-slate-50"
                                >
                                    뉴스 & 공지
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-slate-300 hover:text-slate-50"
                                >
                                    문의하기
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.16em]">
                                Contact
                            </h3>
                            <div className="flex flex-col gap-0.5 text-slate-300">
                                <span>Tel. 000-0000-0000</span>
                                <span>Email. contact@engineworks.example</span>
                                <span className="text-slate-500 text-[11px] sm:text-xs">
                  실제 운영 시 정확한 연락처 정보로 교체하세요.
                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 하단 라인 */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-slate-800/80">
                    <p className="text-[11px] sm:text-xs text-slate-500">
                        © {new Date().getFullYear()} EngineWorks. All rights reserved.
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-500">
                        본 사이트는 예시용 데모 페이지이며, 실제 기업 정보가 아닙니다.
                    </p>
                </div>
            </div>
        </footer>
    );
};