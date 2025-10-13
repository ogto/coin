// lib/mailer.ts
import nodemailer, { Transporter } from "nodemailer";

declare global {
  // Next.js hot-reload에서도 싱글톤 유지
  // eslint-disable-next-line no-var
  var __MAILER__: Transporter | undefined;
}

function getConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465; // 465:true, 587:false
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.FROM_EMAIL || user;

  if (!host || !user || !pass) {
    // 여기서만 에러를 던짐(요청 시점에만 실행됨)
    throw new Error(
      "SMTP env missing: SMTP_HOST / SMTP_USER / SMTP_PASS"
    );
  }
  return { host, port, secure, user, pass, from };
}

function getTransporter(): Transporter {
  if (!global.__MAILER__) {
    const { host, port, secure, user, pass } = getConfig();
    global.__MAILER__ = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: { minVersion: "TLSv1.2" },
    });
  }
  return global.__MAILER__!;
}

export async function sendInternalMail({
  name,
  phone,
  email,
  message,
  docId,
}: {
  name: string; phone: string; email: string; message: string; docId: string;
}) {
  const t = getTransporter();
  const { from } = getConfig(); // from만 재사용
  return t.sendMail({
    from,
    to: process.env.INTERNAL_MAIL_TO || from,
    subject: `[문의] ${name} / ${phone} (id:${docId})`,
    text: [
      `이름: ${name}`,
      `전화: ${phone}`,
      `이메일: ${email}`,
      `문의: ${message}`,
      `문서ID: ${docId}`,
    ].join("\n"),
  });
}

export async function sendCustomerAckMail({ name, to }: { name: string; to: string }) {
  const t = getTransporter();
  const { from } = getConfig();
  return t.sendMail({
    from,
    to,
    subject: "문의가 접수되었습니다",
    html: `<p>${name}님, 문의가 정상 접수되었습니다. 빠르게 회신드리겠습니다.</p>`,
  });
}
