// app/news/page.tsx

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { supabase } from "@/lib/supabaseClient";

interface NewsPost {
  id: number;
  title: string;
  content_md: string;
  published_at: string;
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
    }),
  );
}

function formatDate(publishedAt: string): string {
  const date = new Date(publishedAt);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getExcerpt(content: string, maxLength = 110): string {
  const plain = content.replace(/\s+/g, " ").trim();
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength)}...`;
}

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <div className="ew-section space-y-10">
      <ScrollReveal from="up">
        <section className="space-y-5">
          <p className="ew-tag">News & Updates</p>
          <div className="space-y-3">
            <h1 className="ew-section-title">EngineWorks 소식</h1>
            <p className="ew-section-subtitle max-w-2xl">
              신규 제품, 프로젝트 레퍼런스, 기술 업데이트 등 EngineWorks와
              관련된 다양한 소식을 모아 제공합니다.
            </p>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500">
            이 페이지의 데이터는 Supabase의{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded">
              news_post
            </code>{" "}
            테이블에서 조회되며, 관리자 페이지(/admin/news)를 통해 관리할 수
            있습니다.
          </p>
        </section>
      </ScrollReveal>

      {posts.length === 0 ? (
        <ScrollReveal from="up">
          <section className="ew-card-soft px-5 py-6 text-sm text-slate-600">
            아직 등록된 뉴스/공지 게시글이 없습니다. Supabase 대시보드나 관리자
            페이지(/admin/news)를 통해 새 게시글을 추가해 보세요.
          </section>
        </ScrollReveal>
      ) : (
        <ScrollReveal from="up" delay={60}>
          <section className="space-y-4">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
              <span>총 {posts.length}건의 소식</span>
            </div>

            <div className="space-y-3">
              {posts.map((post, index) => (
                <Link key={post.id} href={`/news/${post.id}`} className="block">
                  <article className="ew-card ew-card-interactive px-4 py-4 sm:px-5 sm:py-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span>{formatDate(post.published_at)}</span>
                        <span className="h-3 w-px bg-slate-200" />
                        <span>뉴스 #{String(index + 1).padStart(2, "0")}</span>
                      </div>
                    </div>
                    <h2 className="mt-1 text-sm sm:text-base font-semibold text-slate-900">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600">
                      {getExcerpt(post.content_md)}
                    </p>
                    <div className="mt-3 text-[11px] sm:text-xs text-slate-500">
                      <span className="ew-link-underline">자세히 보기 →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}
    </div>
  );
}
