# EngineWorks — 고성능 산업용 엔진 제조 회사 공식 홈페이지

고성능 산업용 엔진을 제조하는 가상의 기업 **EngineWorks**의 공식 웹사이트입니다.  
Next.js 16(App Router) 기반으로 구축된 실제 운영용 웹사이트로,  
제품 라인업, 뉴스 게시 시스템, 문의 폼(DB 저장 + 이메일 알림)을 포함합니다.

---

## 🚀 Tech Stack

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

### Backend / Database
- Supabase (PostgreSQL)
- Supabase Browser Client
- Server Actions

### Email Service
- Resend API

### Deploy
- Vercel (예정)

---

## 📑 주요 기능

### 홈(/)
- Hero 섹션
- 주요 제품 카드
- CTA 버튼 (제품 보기, 문의하기)

### 회사 소개(/about)
- 비전 / 연혁 / 시설 소개
- 정적 UI 기반 소개 페이지

### 제품(/products)
- 산업용 / 발전용 / 해양용 엔진 목록
- 카드 전체 클릭 → 상세 페이지 이동

### 제품 상세(/products/[id])
- 카테고리 배지
- 기본 사양(출력, 연료 타입 등)
- 적용 및 운영 가이드
- “이 엔진으로 상담 문의하기” CTA

### 뉴스(/news)
- Supabase `news_post` 테이블 조회
- 최신순 정렬
- 카드 전체 클릭 → 상세 보기

### 뉴스 상세(/news/[id])
- 게시일, 본문(content_md)
- 하단 문의 안내

### 문의하기(/contact)
- 입력 항목: 이름 / 회사명 / 이메일 / 제목 / 내용
- 제출 시:
    - Supabase DB 저장
    - Resend 이메일 발송
    - 성공/실패 메시지 표시

---

## 📁 폴더 구조
```
project-root/
├─ app/
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ page.tsx
│  ├─ about/
│  │  └─ page.tsx
│  ├─ products/
│  │  ├─ page.tsx
│  │  └─ [id]/
│  │     └─ page.tsx
│  ├─ news/
│  │  ├─ page.tsx
│  │  └─ [id]/
│  │     └─ page.tsx
│  └─ contact/
│     ├─ page.tsx
│     └─ action.ts
│
├─ components/
│  ├─ layout/
│  │  ├─ Header.tsx
│  │  └─ Footer.tsx
│  ├─ ContactForm.tsx
│  ├─ ProductCard.tsx
│  └─ NewsCard.tsx
│
├─ lib/
│  ├─ supabaseClient.ts
│  ├─ email.ts
│  └─ products.ts
│
├─ public/
│  ├─ favicon.ico
│  └─ og-engineworks.png (예정)
│
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```
---

## 🗃 Supabase 테이블 스키마

### 1) contact_message

```
create table if not exists public.contact_message (
  id          bigserial primary key,
  name        text not null,
  company     text,
  email       text not null,
  subject     text not null,
  message     text not null,
  created_at  timestamptz not null default now()
);

alter table public.contact_message enable row level security;
```

### 2) news_post

```
create table if not exists public.news_post (
  id           bigserial primary key,
  title        text not null,
  content_md   text not null,
  published_at timestamptz not null default now(),
  is_published boolean not null default true
);

alter table public.news_post enable row level security;
```

---

📌 향후 확장 계획
	•	관리자용 뉴스 CRUD 페이지
	•	제품 데이터 Supabase 이전
	•	Admin Dashboard
	•	다국어 지원(ko/en)
	•	라이트/다크 테마 재구현
	•	방문자 분석 페이지

---

📝 라이선스

본 프로젝트는 학습 및 포트폴리오 용도로 제작되었습니다.
