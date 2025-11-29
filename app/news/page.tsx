// app/news/page.tsx

export default function NewsPage() {
    return (
        <section className="ew-section">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                뉴스 & 공지
            </h1>
            <p className="text-slate-300">
                Supabase의 <code>news_post</code> 테이블에서 불러온 공지/뉴스 목록이
                표시될 페이지입니다.
            </p>
        </section>
    );
}