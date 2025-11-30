// app/news/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const metadata: Metadata = {
    title: "뉴스 & 공지",
    description:
        "EngineWorks의 최신 소식, 기술 소식, 제품 공지 사항을 확인하실 수 있습니다.",
};

interface NewsPost {
    id: number;
    title: string;
    content_md: string;
    published_at: string;
    is_published?: boolean;
}

async function getNewsPosts(): Promise<NewsPost[]> {
    const { data, error } = await supabase
        .from("news_post")
        .select("id, title, content_md, published_at, is_published")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch news posts:", error.message);
        return [];
    }

    if (!data) return [];

    return data.map(
        (item): NewsPost => ({
            id: Number(item.id),
            title: item.title,
            content_md: item.content_md,
            published_at: item.published_at,
            is_published: item.is_published,
        })
    );
}

function formatDate(iso: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(d);
}

function getExcerpt(md: string, maxLength = 120): string {
    if (!md) return "";
    // 간단한 Markdown 기호 제거
    const cleaned = md
        .replace(/[#>*_`]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.slice(0, maxLength) + "…";
}

export default async function NewsPage() {
    const posts = await getNewsPosts();
    const totalCount = posts.length;

    return (
        <div className="ew-section space-y-10">
            {/* 헤더 영역 */}
            <section className="space-y-4">
                <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                        NEWS & NOTICE
                    </p>
                    <h1 className="ew-section-title">EngineWorks 뉴스 & 공지</h1>
                    <p className="ew-section-subtitle max-w-2xl">
                        엔진 라인업 업데이트, 기술 자료, 서비스 공지 등 EngineWorks와 관련된
                        소식을 정리해 제공합니다. 실제 운영 시에는 관리자 페이지를 통해
                        게시글을 관리할 수 있습니다.
                    </p>
                </div>
                <p className="text-xs text-slate-500">
                    총{" "}
                    <span className="font-semibold text-slate-700">{totalCount}</span>개의
                    게시글이 등록되어 있습니다.
                </p>
            </section>

            {/* 게시글 없음 표시 */}
            {totalCount === 0 && (
                <section>
                    <div className="ew-card-soft p-6 space-y-2">
                        <p className="text-sm font-semibold text-slate-900">
                            아직 게시된 뉴스/공지 글이 없습니다.
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600">
                            Supabase의 <code>news_post</code> 테이블에서 <code>is_published</code>가{" "}
                            <code>true</code>인 게시글을 등록하면, 이 페이지에서 자동으로
                            표시됩니다.
                        </p>
                    </div>
                </section>
            )}

            {/* 뉴스 리스트 */}
            {totalCount > 0 && (
                <section className="space-y-4">
                    <div className="ew-card-soft p-2 sm:p-3">
                        <ul className="divide-y divide-slate-100">
                            {posts.map((post) => (
                                <li key={post.id}>
                                    <Link
                                        href={`/news/${post.id}`}
                                        className="flex flex-col gap-2 px-3 py-4 sm:px-4 sm:py-5 hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                            <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                                                {post.title}
                                            </h2>
                                            <span className="text-[11px] text-slate-400">
                        {formatDate(post.published_at)}
                      </span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-600">
                                            {getExcerpt(post.content_md)}
                                        </p>
                                        <span className="mt-1 text-[11px] text-slate-500">
                      자세히 보기 →
                    </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}
        </div>
    );
}