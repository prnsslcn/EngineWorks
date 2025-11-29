// components/NewsCard.tsx

import Link from "next/link";

export interface NewsPost {
    id: number;
    title: string;
    content_md: string;
    published_at: string | null;
}

interface NewsCardProps {
    post: NewsPost;
}

export const NewsCard: React.FC<NewsCardProps> = ({ post }) => {
    const publishedDate = post.published_at
        ? new Date(post.published_at).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        : "날짜 미정";

    // 간단한 본문 요약 (앞부분 120자 정도)
    const excerpt =
        post.content_md.length > 120
            ? post.content_md.slice(0, 120) + "..."
            : post.content_md;

    return (
        <article className="ew-card p-5 sm:p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-50 line-clamp-2">
                    {post.title}
                </h2>
                <span className="text-xs text-slate-400 whitespace-nowrap">
          {publishedDate}
        </span>
            </div>
            <p className="text-sm text-slate-300 line-clamp-3">{excerpt}</p>
            <div className="mt-2">
                <Link
                    href={`/news/${post.id}`}
                    className="text-sm font-medium text-ew-accent hover:underline"
                >
                    자세히 보기 →
                </Link>
            </div>
        </article>
    );
};