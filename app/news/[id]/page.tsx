// app/news/[id]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/lib/supabaseClient";

interface NewsPost {
    id: number;
    title: string;
    content_md: string;
    published_at: string;
    is_published?: boolean;
}

interface NewsRouteParams {
    id: string;
}

async function getNewsPostById(id: number): Promise<NewsPost | null> {
    if (!Number.isFinite(id)) return null;

    const { data, error } = await supabase
        .from("news_post")
        .select("id, title, content_md, published_at, is_published")
        .eq("id", id)
        .single();

    if (error) {
        console.error("[news] Failed to fetch post:", error.message);
        return null;
    }

    if (!data || data.is_published === false) {
        return null;
    }

    return {
        id: Number(data.id),
        title: data.title,
        content_md: data.content_md,
        published_at: data.published_at,
        is_published: data.is_published,
    };
}

function formatDate(iso: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(d);
}

function getExcerpt(md: string, maxLength = 100): string {
    if (!md) return "";
    const cleaned = md
        .replace(/[#>*_`]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.slice(0, maxLength) + "…";
}

/**
 * Next.js 16: params가 Promise로 전달되므로 await 필요
 */
export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<NewsRouteParams>;
}): Promise<Metadata> {
    const { id } = await params;
    const numericId = Number(id);

    if (!Number.isFinite(numericId)) {
        return {
            title: "뉴스 상세",
            description: "EngineWorks 뉴스 상세 페이지",
        };
    }

    const post = await getNewsPostById(numericId);
    if (!post) {
        return {
            title: "게시글을 찾을 수 없습니다",
            description: "요청하신 뉴스/공지 게시글이 존재하지 않습니다.",
        };
    }

    return {
        title: `${post.title} - 뉴스 & 공지`,
        description: getExcerpt(post.content_md),
    };
}

export default async function NewsDetailPage({
                                                 params,
                                             }: {
    params: Promise<NewsRouteParams>;
}) {
    const { id } = await params;
    const numericId = Number(id);

    if (!Number.isFinite(numericId)) {
        console.error("[news] Invalid id:", id);
        notFound();
    }

    const post = await getNewsPostById(numericId);
    if (!post) {
        notFound();
    }

    return (
        <div className="ew-section space-y-10">
            {/* 상단 헤더 + 네비게이션 */}
            <section className="space-y-4">
                <Link
                    href="/news"
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 hover:underline"
                >
                    <span aria-hidden>←</span>
                    <span>뉴스 & 공지 목록으로</span>
                </Link>

                <div className="space-y-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                        NEWS & NOTICE
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                        {post.title}
                    </h1>
                    <p className="text-xs text-slate-500">
                        {formatDate(post.published_at)}
                    </p>
                </div>
            </section>

            {/* 본문 */}
            <section className="space-y-8">
                <div className="ew-card-soft p-5 sm:p-6 space-y-6">
                    <article className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed">
                        <ReactMarkdown>{post.content_md}</ReactMarkdown>
                    </article>
                </div>

                {/* 하단 안내 + CTA */}
                <div className="ew-card-soft p-5 sm:p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <p className="text-[11px] font-medium text-slate-500">
                            PROJECT & SUPPORT
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600">
                            해당 내용과 관련된 프로젝트 상담이나 기술 문의가 필요하신가요?
                            설비 용도와 현장 정보를 공유해 주시면 EngineWorks 엔지니어가 함께
                            검토해 드립니다.
                        </p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                        <Link href="/contact" className="ew-btn-primary text-xs sm:text-sm">
                            문의하기
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}