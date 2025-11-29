// app/contact/action.ts
"use server";

import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { sendContactEmail } from "@/lib/email";

export async function submitContact(formData: FormData) {
    const name = (formData.get("name") || "").toString().trim();
    const company = (formData.get("company") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const subject = (formData.get("subject") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    // 간단한 유효성 검사
    if (!name || !email || !subject || !message) {
        const params = new URLSearchParams();
        params.set("status", "error");
        params.set("reason", "missing");
        redirect(`/contact?${params.toString()}`);
    }

    // 1) Supabase DB에 저장
    const { error: dbError } = await supabase.from("contact_message").insert({
        name,
        company: company || null,
        email,
        subject,
        message,
    });

    if (dbError) {
        console.error("[contact] Failed to insert contact_message:", dbError.message);
        const params = new URLSearchParams();
        params.set("status", "error");
        params.set("reason", "db");
        redirect(`/contact?${params.toString()}`);
    }

    // 2) Resend로 이메일 발송 (실패해도 DB는 이미 저장된 상태)
    try {
        await sendContactEmail({ name, company, email, subject, message });
    } catch (err) {
        console.error("[contact] Failed to send contact email:", err);
        // 이메일 에러라고 해서 사용자를 꼭 실패 페이지로 보낼 필요는 없음
    }

    // 3) 성공 redirect
    const params = new URLSearchParams();
    params.set("status", "success");
    redirect(`/contact?${params.toString()}`);
}