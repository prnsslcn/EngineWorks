// app/news/[id]/page.tsx

import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

interface NewsDetailPageProps {
    // ✅ Next.js 16: params가 Promise 형태로 들어옴
    params: Promise<{
        id: string;
    }>;
}

async function getNewsPostById(id: string) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
        console.error("Invalid id:", id);
        return null;
    }

    const { data, error } = await supabase
        .from("news_post")
        .select("id, title, content_md, published_at, is_published")
        .eq("id", numericId)
        .single();

    if (error) {
        console.error("Supabase error:", error.message);
        return null;
    }

    if (!data || !data.is_published) {
        return null;
    }

    return {
        id: Number(data.id),
        title: data.title as string,
        content_md: data.content_md as string,
        published_at: data.published_at as string | null,
    };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    // ✅ 여기서 먼저 params를 await 해서 id를 꺼냅니다.
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

    return (
        <section className="ew-section max-w-3xl">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                    {post.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">{publishedDate}</p>
            </div>

            <div className="prose prose-invert max-w-none text-sm sm:text-base text-slate-100 whitespace-pre-wrap">
                {post.content_md}
            </div>
        </section>
    );
}