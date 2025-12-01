// app/contact/action.ts
"use server";

import { supabaseClient } from "@/lib/supabaseClient";
import { createEmail } from "@/lib/email";
import sanitizeHtml from "sanitize-html";
import { redirect } from "next/navigation";

// ===== 스팸 키워드 =====
const SPAM_WORDS = [
  "http://",
  "https://",
  "viagra",
  "casino",
  "loan",
  "bitcoin",
];

// ===== HTML 제거 함수 =====
function stripHTML(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

export async function submitContact(formData: FormData) {
  // -------- 0) Honeypot 검사 (봇 차단) --------
  const hp = String(formData.get("hp_check") || "");
  if (hp.trim() !== "") {
    console.warn("[SPAM] honeypot triggered");
    // 봇에겐 성공인 것처럼 보이게 처리 (사용자 UX는 동일)
    redirect("/contact?status=success");
  }

  // -------- 1) 필드 수집 + HTML 제거 --------
  const name = stripHTML(String(formData.get("name") || "").trim());
  const company = stripHTML(String(formData.get("company") || "").trim());
  const email = stripHTML(String(formData.get("email") || "").trim());
  const subject = stripHTML(String(formData.get("subject") || "").trim());
  const message = stripHTML(String(formData.get("message") || "").trim());

  // -------- 2) Validation --------
  if (name.length < 2 || name.length > 40) {
    redirect("/contact?status=error&reason=invalid_name");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    redirect("/contact?status=error&reason=invalid_email");
  }

  if (subject.length < 3) {
    redirect("/contact?status=error&reason=invalid_subject");
  }

  if (message.length < 10) {
    redirect("/contact?status=error&reason=invalid_message");
  }

  // -------- 3) 스팸 키워드 차단 --------
  const msgLower = message.toLowerCase();
  if (SPAM_WORDS.some((w) => msgLower.includes(w))) {
    console.warn("[SPAM] keyword detected:", message);
    redirect("/contact?status=error&reason=spam_word");
  }

  // -------- 4) Supabase 저장 --------
  const { error } = await supabaseClient.from("contact_message").insert({
    name,
    company,
    email,
    subject,
    message,
  });

  if (error) {
    console.error("[contact] DB insert failed:", error.message);
    redirect("/contact?status=error&reason=db_error");
  }

  // -------- 5) 이메일 알림 (실패해도 사용자에겐 성공 처리) --------
  try {
    await createEmail({
      to: "prnsslcn@gmail.com",
      subject: `[EngineWorks] 새 문의: ${subject}`,
      html: `
        <h2>새 문의 도착</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>회사명:</strong> ${company || "-"}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>제목:</strong> ${subject}</p>
        <p><strong>내용:</strong><br>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
  } catch (e) {
    console.error("[contact] email send failed:", e);
    // 메일만 실패한 경우: 굳이 사용자에게 에러를 노출하지 않고 성공 처리
  }

  // -------- 6) 최종 성공 리다이렉트 --------
  redirect("/contact?status=success");
}
