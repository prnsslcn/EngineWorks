// lib/email.ts
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

if (!receiverEmail) {
    console.warn(
        "[email] CONTACT_RECEIVER_EMAIL is not set. Contact emails will not be sent."
    );
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface ContactEmailPayload {
    name: string;
    company?: string;
    email: string;
    subject: string;
    message: string;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
    if (!resend || !resendApiKey || !receiverEmail) {
        console.warn(
            "[email] RESEND_API_KEY or CONTACT_RECEIVER_EMAIL missing. Skip sending email."
        );
        return;
    }

    const { name, company, email, subject, message } = payload;

    const textBody = [
        `새로운 문의가 도착했습니다.`,
        "",
        `이름: ${name}`,
        `회사명: ${company || "-"}`,
        `이메일: ${email}`,
        "",
        `제목: ${subject}`,
        "",
        `내용:`,
        message,
    ].join("\n");

    const { data, error } = await resend.emails.send({
        from: "EngineWorks Contact <onboarding@resend.dev>",
        to: ["prnsslcn@gmail.com"],
        subject: `[EngineWorks 문의] ${subject}`,
        text: textBody,
        replyTo: email,
    });

    if (error) {
        console.error("[email] Resend error:", error);
        // 필요하면 여기서 throw 해서 상위에서 처리하게 할 수도 있음
        // throw new Error("Failed to send contact email");
    } else {
        console.log("[email] Resend sent:", data);
    }
}