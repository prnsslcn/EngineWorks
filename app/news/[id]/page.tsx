// app/news/[id]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { supabase } from "@/lib/supabaseClient";

type NewsRouteParams = {
  id: string;
};

type NewsDetailPageProps = {
  params: Promise<NewsRouteParams>;
};

interface NewsPost {
  id: number;
  title: string;
  content_md: string;
  published_at: string;
}

async function getNewsPostById(id: number): Promise<NewsPost | null> {
  const { data, error } = await supabase
    .from("news_post")
    .select("id, title, content_md, published_at, is_published")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("[news] failed to fetch post:", error.message);
    return null;
  }

  if (!data) return null;

  return {
    id: Number(data.id),
    title: data.title,
    content_md: data.content_md,
    published_at: data.published_at,
  };
}

function formatDateTime(publishedAt: string): string {
  const date = new Date(publishedAt);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export const revalidate = 300; // 5분

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    console.error("[news] Invalid id:", id);
    notFound();
  }

  const post = await getNewsPostById(numericId);

  if (!post) {
    notFound();
  }

  return (
    <div className="ew-section space-y-10">
      {/* 상단 Hero */}
      <ScrollReveal from="up">
        <section className="space-y-4">
          <p className="ew-tag text-[10px] sm:text-[11px]">EngineWorks 소식</p>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-500">
              <span>{formatDateTime(post.published_at)}</span>
              <span className="h-3 w-px bg-slate-200" />
              <span>뉴스 #{String(post.id).padStart(2, "0")}</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 본문 */}
      <ScrollReveal from="up" delay={80}>
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] lg:items-start">
          {/* 본문 내용 */}
          <article className="ew-card-soft px-5 py-5 sm:px-6 sm:py-6">
            <div className="prose prose-sm sm:prose-base max-w-none prose-slate">
              {/* Markdown으로 쓸 수 있지만, 지금은 단순 텍스트 / 프리포맷 */}
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {post.content_md}
              </p>
            </div>
          </article>

          {/* 우측: 안내 / CTA */}
          <aside className="space-y-4">
            <div className="ew-card-soft px-5 py-5 sm:px-6 sm:py-6 space-y-2">
              <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                문의 및 추가 정보
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                해당 뉴스 또는 프로젝트와 관련해 추가적인 기술 정보나 협업
                가능성을 논의하고 싶으시다면, 문의 페이지를 통해 연락을 남겨
                주세요. 가능한 한 빠르게 담당자가 회신 드립니다.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Link
                  href="/contact"
                  className="ew-btn-primary text-xs sm:text-sm"
                >
                  문의 페이지로 이동
                </Link>
                <Link href="/news" className="ew-btn-ghost text-xs sm:text-sm">
                  다른 소식 보기
                </Link>
              </div>
            </div>

            <div className="ew-card-soft px-5 py-4 sm:px-6 sm:py-5 space-y-1.5 text-[11px] sm:text-xs text-slate-500">
              <p>
                * 본 페이지의 내용은 포트폴리오용 예시이며, 실제 기업의 뉴스나
                공지를 대체하지 않습니다.
              </p>
              <p>
                * Supabase 관리 화면 또는 /admin/news를 통해 게시글을
                수정·비공개 처리할 수 있습니다.
              </p>
            </div>
          </aside>
        </section>
      </ScrollReveal>
    </div>
  );
}
