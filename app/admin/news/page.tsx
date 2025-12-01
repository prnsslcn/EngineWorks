// app/admin/news/page.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

interface AdminNewsPost {
  id: number;
  title: string;
  content_md: string;
  published_at: string | null;
  is_published: boolean;
}

/** 목록 조회 (서버용 supabaseServer 사용) */
async function getAllPosts(): Promise<AdminNewsPost[]> {
  const { data, error } = await supabaseServer
    .from("news_post")
    .select("id, title, content_md, published_at, is_published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[admin/news] failed to fetch posts:", error.message);
    return [];
  }

  return (data ?? []) as AdminNewsPost[];
}

/** 새 글 생성 서버 액션 */
export async function createNewsPost(formData: FormData) {
  "use server";

  const title = String(formData.get("title") || "").trim();
  const content_md = String(formData.get("content_md") || "").trim();
  const is_published = formData.get("is_published") === "on";

  if (!title || !content_md) {
    console.error("[admin/news] title or content is empty");
    return;
  }

  const { error } = await supabaseServer.from("news_post").insert({
    title,
    content_md,
    is_published,
  });

  if (error) {
    console.error("[admin/news] failed to create post:", error.message);
  }
}

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const posts = await getAllPosts();

  return (
    <section className="ew-section">
      <div className="ew-page-container space-y-10">
        {/* 상단 헤더 + 로그아웃 */}
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">뉴스 관리</h1>
            <p className="text-sm text-slate-400">
              Supabase <code>news_post</code> 테이블 기반 관리자 화면입니다.
            </p>
          </div>
          <Link
            href="/admin/logout"
            className="text-[11px] text-slate-400 hover:text-slate-600 hover:underline"
          >
            로그아웃
          </Link>
        </header>

        {/* 새 글 작성 폼 */}
        <div className="ew-card p-6 space-y-4">
          <h2 className="text-lg font-semibold">새 뉴스 작성</h2>
          <form action={createNewsPost} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">제목</label>
              <input
                name="title"
                type="text"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="예) EngineWorks 신제품 엔진 라인업 발표"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">
                본문 (Markdown 또는 일반 텍스트)
              </label>
              <textarea
                name="content_md"
                className="w-full min-h-[140px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="본문 내용을 입력하세요."
                required
              />
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_published"
                  defaultChecked
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>공개 여부 (is_published)</span>
              </label>

              <button
                type="submit"
                className="ew-btn-primary text-xs sm:text-sm"
              >
                새 뉴스 등록
              </button>
            </div>
          </form>
        </div>

        {/* 기존 글 목록 */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">뉴스 목록</h2>
          {posts.length === 0 ? (
            <p className="text-sm text-slate-400">
              등록된 뉴스/공지 글이 없습니다.
            </p>
          ) : (
            <ul className="space-y-2">
              {posts.map((post) => {
                const dateStr = post.published_at
                  ? new Date(post.published_at).toLocaleString("ko-KR")
                  : "날짜 미정";
                return (
                  <li
                    key={post.id}
                    className="ew-card px-4 py-3 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {post.title}
                        </span>
                        {!post.is_published && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
                            비공개
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {post.content_md}
                      </p>
                      <p className="text-[11px] text-slate-500">{dateStr}</p>
                    </div>

                    <Link
                      href={`/admin/news/${post.id}`}
                      className="text-xs text-slate-700 hover:underline whitespace-nowrap"
                    >
                      수정 / 삭제
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
