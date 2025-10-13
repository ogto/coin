// lib/mailer.ts
import nodemailer from "nodemailer";

const reqEnv = (k: string) => {
  const v = process.env[k];
  if (!v) throw new Error(`ENV ${k} is missing`);
  return v;
};

const SMTP_HOST = reqEnv("SMTP_HOST");          // 예: smtp.gmail.com / email-smtp.ap-northeast-2.amazonaws.com / smtp.sendgrid.net
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = process.env.SMTP_SECURE === "true" || SMTP_PORT === 465; // 465:true, 587:false(STARTTLS)
const SMTP_USER = reqEnv("SMTP_USER");
const SMTP_PASS = reqEnv("SMTP_PASS");
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;

// nodemailer는 Edge에서 동작 안 하니, API 라우트에서 runtime="nodejs" 선언 필수(이미 하셨음)
export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  tls: { minVersion: "TLSv1.2" },
});

// 서버 기동 시 1회 연결 확인(배포 환경 로그에서 확인용)
let verifiedOnce: Promise<boolean> | null = null;
export async function ensureSmtpReady() {
  if (!verifiedOnce) {
    verifiedOnce = transporter.verify()
      .then((ok) => {
        console.log(`[mailer] verify ok=${ok} host=${SMTP_HOST} port=${SMTP_PORT} secure=${SMTP_SECURE}`);
        return ok;
      })
      .catch((e) => {
        console.error("[mailer] verify failed:", e?.message || e);
        throw e;
      });
  }
  return verifiedOnce;
}

type InternalMailInput = {
  name: string;
  phone: string;
  email: string;
  message: string;
  docId: string;
};

export async function sendInternalMail(input: InternalMailInput) {
  await ensureSmtpReady();
  const { name, phone, email, message, docId } = input;

  return transporter.sendMail({
    from: FROM_EMAIL,
    to: process.env.INTERNAL_MAIL_TO || FROM_EMAIL, // 예: cs@yourdomain.com
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
  await ensureSmtpReady();

  return transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject: "문의가 접수되었습니다",
    html: `<p>${name}님, 문의가 정상 접수되었습니다. 빠르게 회신드리겠습니다.</p>`,
  });
}
