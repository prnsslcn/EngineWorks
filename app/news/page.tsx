// app/news/page.tsx

import { supabase } from "@/lib/supabaseClient";
import { NewsCard, NewsPost } from "@/components/NewsCard";

export const revalidate = 60; // 60초마다 ISR 재검증 (선택)

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

    // Supabase Row 타입 명시
    return data.map((item): NewsPost => ({
        id: Number(item.id),
        title: item.title,
        content_md: item.content_md,
        published_at: item.published_at,
    }));
}

export default async function NewsPage() {
    const posts = await getNewsPosts();

    return (
        <section className="ew-section space-y-8">
            {/* 상단 헤더 */}
            <header className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-ew-accent/40 bg-ew-accent/10 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-ew-accent" />
                    <span className="text-[11px] font-medium text-ew-accent">
            EngineWorks News & Notice
          </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                            뉴스 & 공지
                        </h1>
                        <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                            제품 출시, 유지보수 정책 변경, 기술 세미나 및 회사 소식을
                            한 곳에서 확인하실 수 있습니다.
                        </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400">
                        총{" "}
                        <span className="font-semibold text-slate-100">
              {posts.length}
            </span>
                        건의 게시글
                    </p>
                </div>
            </header>

            {/* 목록 영역 */}
            {posts.length === 0 ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-8 text-center">
                    <p className="text-sm text-slate-300 mb-1">
                        등록된 뉴스/공지 게시글이 아직 없습니다.
                    </p>
                    <p className="text-xs text-slate-500">
                        운영 준비 중이거나, 추후 공지사항이 등록될 예정입니다.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {posts.map((post) => (
                        <NewsCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </section>
    );
}