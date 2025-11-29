// app/admin/news/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface AdminNewsPost {
    id: number;
    title: string;
    content_md: string;
    published_at: string | null;
    is_published: boolean;
}

async function getPost(id: number): Promise<AdminNewsPost | null> {
    const { data, error } = await supabase
        .from("news_post")
        .select("id, title, content_md, published_at, is_published")
        .eq("id", id)
        .single();

    if (error) {
        console.error("[admin/news/:id] failed to fetch post:", error.message);
        return null;
    }

    return data as AdminNewsPost;
}

/** 수정 */
export async function updateNewsPost(id: number, formData: FormData) {
    "use server";

    const title = String(formData.get("title") || "").trim();
    const content_md = String(formData.get("content_md") || "").trim();
    const is_published = formData.get("is_published") === "on";

    if (!title || !content_md) {
        console.error("[admin/news/:id] title or content empty");
        return;
    }

    const { error } = await supabase
        .from("news_post")
        .update({
            title,
            content_md,
            is_published,
        })
        .eq("id", id);

    if (error) {
        console.error("[admin/news/:id] failed to update:", error.message);
        return;
    }

    redirect("/admin/news");
}

/** 삭제 */
export async function deleteNewsPost(id: number) {
    "use server";

    const { error } = await supabase.from("news_post").delete().eq("id", id);

    if (error) {
        console.error("[admin/news/:id] failed to delete:", error.message);
        return;
    }

    redirect("/admin/news");
}

interface AdminNewsDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminNewsDetailPage({
                                                      params,
                                                  }: AdminNewsDetailPageProps) {
    const { id } = await params;
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
        notFound();
    }

    const post = await getPost(numericId);

    if (!post) {
        notFound();
    }

    const publishedDate = post.published_at
        ? new Date(post.published_at).toLocaleString("ko-KR")
        : "날짜 미정";

    async function updateAction(formData: FormData) {
        "use server";
        await updateNewsPost(numericId, formData);
    }

    async function deleteAction() {
        "use server";
        await deleteNewsPost(numericId);
    }

    return (
        <section className="ew-section">
            <div className="ew-page-container space-y-6">
                <header className="space-y-1">
                    <h1 className="text-2xl font-bold">뉴스 수정 / 삭제</h1>
                    <p className="text-xs text-slate-400">
                        ID: {post.id} · 게시일: {publishedDate}
                    </p>
                </header>

                {/* 수정 폼 */}
                <div className="ew-card p-6 space-y-4">
                    <form action={updateAction} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium">제목</label>
                            <input
                                name="title"
                                type="text"
                                defaultValue={post.title}
                                className="w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium">
                                본문 (Markdown 또는 일반 텍스트)
                            </label>
                            <textarea
                                name="content_md"
                                defaultValue={post.content_md}
                                className="w-full min-h-[160px] rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between gap-4 text-sm">
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="is_published"
                                    defaultChecked={post.is_published}
                                    className="h-4 w-4 rounded border-slate-600 bg-slate-900"
                                />
                                <span>공개 여부 (is_published)</span>
                            </label>

                            <button
                                type="submit"
                                className="ew-btn-primary text-xs sm:text-sm"
                            >
                                수정 내용 저장
                            </button>
                        </div>
                    </form>
                </div>

                {/* 삭제 버튼 */}
                <form
                    action={deleteAction}
                    className="flex justify-end"
                >
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full border border-red-500/60 bg-red-500/10 px-4 py-2 text-xs sm:text-sm font-medium text-red-300 hover:bg-red-500/20 transition"
                    >
                        이 뉴스 삭제
                    </button>
                </form>
            </div>
        </section>
    );
}