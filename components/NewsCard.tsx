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

    const publishedTime = post.published_at
        ? new Date(post.published_at).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : "";

    // 간단한 본문 요약
    const excerpt =
        post.content_md.length > 140
            ? post.content_md.slice(0, 140) + "..."
            : post.content_md;

    return (
        <article className="ew-card h-full flex flex-col p-4 sm:p-5">
            {/* 상단 메타 정보 */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-200">
            News & Notice
          </span>
                    <span className="text-[11px] text-slate-400">
            {publishedDate}
                        {publishedTime && <span className="ml-1">· {publishedTime}</span>}
          </span>
                </div>
            </div>

            {/* 제목 */}
            <h2 className="text-base sm:text-lg font-semibold text-slate-50 mb-2 line-clamp-2">
                {post.title}
            </h2>

            {/* 요약 */}
            <p className="text-xs sm:text-sm text-slate-300 mb-3 line-clamp-3">
                {excerpt}
            </p>

            <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-800/70">
                <p className="text-[11px] text-slate-500">
                    자세한 내용은 상세 페이지에서 확인하실 수 있습니다.
                </p>
                <Link
                    href={`/news/${post.id}`}
                    className="text-xs font-medium text-ew-accent hover:underline"
                >
                    자세히 보기 →
                </Link>
            </div>
        </article>
    );
};