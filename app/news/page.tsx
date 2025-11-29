// app/news/page.tsx

import { supabase } from "@/lib/supabaseClient";
import { NewsCard, NewsPost } from "@/components/NewsCard";

export const revalidate = 60; // 60초마다 ISR로 재검증 (선택)

async function getNewsPosts(): Promise<NewsPost[]> {
    const { data, error } = await supabase
        .from("news_post")
        .select("id, title, content_md, published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch news posts:", error.message);
        return [];
    }

    // Supabase가 `bigint`를 string으로 줄 수 있으므로 Number 변환
    return (data ?? []).map((item: any) => ({
        id: Number(item.id),
        title: item.title,
        content_md: item.content_md,
        published_at: item.published_at,
    }));
}

export default async function NewsPage() {
    const posts = await getNewsPosts();

    return (
        <section className="ew-section">
            <header className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                    뉴스 & 공지
                </h1>
                <p className="text-slate-300 text-sm sm:text-base">
                    EngineWorks의 제품 출시 소식, 기술 업데이트, 공지사항을 확인하실 수
                    있습니다.
                </p>
            </header>

            {posts.length === 0 ? (
                <p className="text-slate-400 text-sm">
                    등록된 뉴스/공지 게시글이 아직 없습니다.
                </p>
            ) : (
                <div className="grid gap-4 sm:gap-5">
                    {posts.map((post) => (
                        <NewsCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </section>
    );
}