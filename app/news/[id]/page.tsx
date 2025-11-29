// app/news/[id]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface NewsDetailPageProps {
    // ✅ Next 16: params는 Promise로 들어옴
    params: Promise<{
        id: string;
    }>;
}

interface NewsPostDetail {
    id: number;
    title: string;
    content_md: string;
    published_at: string | null;
}

async function getNewsPostById(id: string): Promise<NewsPostDetail | null> {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
        console.error("[news] Invalid id:", id);
        return null;
    }

    const { data, error } = await supabase
        .from("news_post")
        .select("id, title, content_md, published_at, is_published")
        .eq("id", numericId)
        .single();

    if (error) {
        console.error("[news] Failed to fetch post:", error.message);
        return null;
    }

    if (!data || !data.is_published) {
        return null;
    }

    // Supabase Row를 명시적으로 캐스팅
    const row = data as {
        id: number;
        title: string;
        content_md: string;
        published_at: string | null;
        is_published: boolean;
    };

    return {
        id: Number(row.id),
        title: row.title,
        content_md: row.content_md,
        published_at: row.published_at,
    };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const { id } = await params;
    const post = await getNewsPostById(id);

    if (!post) {
        notFound();
    }

    const publishedDate = post.published_at
        ? new Date(post.published_at).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        : "날짜 미정";

    const publishedTime = post.published_at
        ? new Date(post.published_at).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : "";

    return (
        <section className="ew-section max-w-3xl space-y-6">
            {/* 상단 네비게이션 / 배지 */}
            <div className="flex flex-col gap-3">
                <Link
                    href="/news"
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 hover:underline w-fit"
                >
                    <span>←</span>
                    <span>뉴스 & 공지 목록으로 돌아가기</span>
                </Link>

                <div className="inline-flex items-center gap-2 rounded-full border border-ew-accent/40 bg-ew-accent/10 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-ew-accent" />
                    <span className="text-[11px] font-medium text-ew-accent">
            EngineWorks News & Notice
          </span>
                </div>
            </div>

            {/* 제목 & 메타 정보 */}
            <header className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-400">
          <span>
            게시일 {publishedDate}
              {publishedTime && <span className="ml-1">· {publishedTime}</span>}
          </span>
                    <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-slate-600" />
                    <span className="text-slate-500">
            본 게시글의 내용과 수치는 예고 없이 변경될 수 있습니다.
          </span>
                </div>
            </header>

            <div className="h-px bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />

            {/* 본문 영역 */}
            <article className="space-y-4">
                {/*
          지금은 Markdown을 별도 파서 없이 그대로 출력합니다.
          content_md를 나중에 진짜 Markdown으로 렌더링하고 싶으면
          remark/rehype 등을 붙여도 됩니다.
        */}
                <div className="text-sm sm:text-base text-slate-100 leading-relaxed whitespace-pre-wrap">
                    {post.content_md}
                </div>
            </article>

            {/* 하단 안내 영역 */}
            <footer className="pt-4 border-t border-slate-800/70">
                <p className="text-[11px] sm:text-xs text-slate-500">
                    제품 사양, 납기, 서비스 정책 관련 상세 문의는{" "}
                    <a
                        href="/contact"
                        className="text-ew-accent hover:underline font-medium"
                    >
                        문의하기
                    </a>{" "}
                    페이지를 통해 남겨 주세요.
                </p>
            </footer>
        </section>
    );
}