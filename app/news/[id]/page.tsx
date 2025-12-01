// app/news/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient";
import { renderSafeMarkdown } from "@/lib/markdown";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type NewsRouteParams = {
  id: string;
};

interface NewsPost {
  id: number;
  title: string;
  content_md: string;
  published_at: string | null;
  is_published: boolean;
}

/** 단일 게시글 조회 (RLS: is_published=true 만) */
async function getNewsPostById(id: number): Promise<NewsPost | null> {
  const { data, error } = await supabaseClient
    .from("news_post")
    .select("id, title, content_md, published_at, is_published")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[news] failed to fetch post:", error.message);
    return null;
  }

  if (!data || !data.is_published) {
    return null;
  }

  return data as NewsPost;
}

export const dynamic = "force-dynamic";

/** SEO용 메타데이터 */
export async function generateMetadata({
  params,
}: {
  params: Promise<NewsRouteParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return {
      title: "뉴스 | EngineWorks",
    };
  }

  const post = await getNewsPostById(numericId);

  if (!post) {
    return {
      title: "뉴스 | EngineWorks",
    };
  }

  return {
    title: `${post.title} | EngineWorks 뉴스`,
    description: post.content_md.slice(0, 100),
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<NewsRouteParams>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    console.warn("[news] Invalid id:", id);
    notFound();
  }

  const post = await getNewsPostById(numericId);

  if (!post) {
    notFound();
  }

  const publishedAtLabel = post.published_at
    ? new Date(post.published_at).toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      })
    : "게시일 미정";

  // ✅ 여기서 Markdown → HTML → Sanitize
  const safeHtml = renderSafeMarkdown(post.content_md || "");

  return (
    <div className="ew-section">
      <div className="ew-page-container max-w-3xl">
        <ScrollReveal from="up">
          <header className="mb-8 space-y-3">
            <p className="ew-tag">EngineWorks 뉴스</p>
            <h1 className="ew-section-title">{post.title}</h1>
            <p className="text-xs sm:text-sm text-slate-500">
              게시일&nbsp;&middot;&nbsp;{publishedAtLabel}
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal from="up" delay={80}>
          <article className="ew-card-soft px-5 py-5 sm:px-6 sm:py-6 space-y-6">
            {/* ✅ sanitize 된 HTML만 dangerouslySetInnerHTML로 렌더링 */}
            <div
              className="text-sm sm:text-base leading-relaxed space-y-3 text-slate-800"
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />

            <hr className="border-slate-200/80" />

            <div className="text-[11px] sm:text-xs text-slate-500 space-y-1.5">
              <p>
                본 뉴스/공지 내용은 포트폴리오용 예시이며, EngineWorks의 실제
                상용 서비스는 아닙니다.
              </p>
              <p>
                엔진 적용 또는 프로젝트와 관련된 구체적인 문의가 있다면{" "}
                <a href="/contact" className="ew-link-underline text-slate-800">
                  문의 페이지
                </a>
                를 통해 상세 내용을 남겨 주세요.
              </p>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </div>
  );
}
