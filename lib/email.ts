// lib/email.ts
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

if (!resendApiKey) {
  console.warn(
    "[email] RESEND_API_KEY is not set. Contact emails will not be sent.",
  );
}

if (!receiverEmail) {
  console.warn(
    "[email] CONTACT_RECEIVER_EMAIL is not set. Contact emails will not be sent.",
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

/**
 * 기존 Contact 전용 메일 발송 함수
 * - 텍스트 기반 본문
 * - 수신자는 CONTACT_RECEIVER_EMAIL 사용
 */
export async function sendContactEmail(payload: ContactEmailPayload) {
  if (!resend || !resendApiKey || !receiverEmail) {
    console.warn(
      "[email] RESEND_API_KEY or CONTACT_RECEIVER_EMAIL missing. Skip sending email.",
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
    to: [receiverEmail],
    subject: `[EngineWorks 문의] ${subject}`,
    text: textBody,
    replyTo: email,
  });

  if (error) {
    console.error("[email] Resend error (sendContactEmail):", error);
  } else {
    console.log("[email] Resend sent (sendContactEmail):", data);
  }
}

/**
 * Contact 이외에서도 쓸 수 있는 공용 이메일 발송 함수
 * - app/contact/action.ts에서 사용 중인 형태와 맞추기 위해 추가
 */
export async function createEmail(args: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!resend || !resendApiKey) {
    console.warn(
      "[email] RESEND_API_KEY missing. Skip sending email in createEmail.",
    );
    return;
  }

  const { to, subject, html, replyTo } = args;

  const { data, error } = await resend.emails.send({
    from: "EngineWorks Contact <onboarding@resend.dev>",
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    console.error("[email] Resend error (createEmail):", error);
  } else {
    console.log("[email] Resend sent (createEmail):", data);
  }
}
