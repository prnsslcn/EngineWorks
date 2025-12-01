// lib/markdown.ts
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

// marked 기본 옵션 (GitHub 스타일 + 줄바꿈 처리)
marked.setOptions({
  gfm: true,
  breaks: true,
});

export function renderSafeMarkdown(md: string): string {
  if (!md) return "";

  // 1) Markdown → HTML
  const rawHtml = marked.parse(md) as string;

  // 2) HTML sanitize (XSS 방어)
  const cleanHtml = sanitizeHtml(rawHtml, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2", "img"],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false, // //example.com 같은 걸 막기
  });

  return cleanHtml;
}
