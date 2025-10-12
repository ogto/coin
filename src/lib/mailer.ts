// lib/mailer.ts
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST!;
const SMTP_PORT = Number(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;
export const MAIL_FROM = process.env.MAIL_FROM || "Bunny Stock <noreply@bunnystock.io>";
export const MAIL_TO_INTERNAL = process.env.MAIL_TO_INTERNAL || "info@bunnystock.io";

let _transport: nodemailer.Transporter | null = null;

export function getTransport() {
  if (_transport) return _transport;

  const is465 = SMTP_PORT === 465;

  _transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: is465,            // 465:true, 587:false
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    pool: false,              // 서버리스/호스팅에서 pool 비권장
    requireTLS: !is465,       // 587이면 TLS 강제
    connectionTimeout: 15_000,
    socketTimeout: 15_000,
    greetingTimeout: 10_000,
    tls: { servername: SMTP_HOST },
    // logger: true,           // 필요시 잠깐 켜서 서버 로그 확인
    // debug: true,
  } as any);

  return _transport;
}

// 공용 헬퍼
function escapeHtml(s: string) {
  return String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function nl2br(s: string) { return String(s ?? "").replace(/\n/g, "<br/>"); }
function maskName(name: string) {
  const n = (name ?? "").trim();
  if (n.length <= 1) return n || "고객";
  if (n.length === 2) return n[0] + "*";
  return n[0] + "*".repeat(n.length - 2) + n[n.length - 1];
}

// 내부 운영팀 알림
export async function sendInternalMail(payload: {
  name: string; phone: string; email: string; message: string; docId: string;
}) {
  const { name, phone, email, message, docId } = payload;
  const subject = `📩 신규 상담 접수: ${name}`;
  const html = `
    <div style="font-family:system-ui,Apple SD Gothic Neo,Segoe UI,Roboto,sans-serif;">
      <h2>신규 상담이 접수되었습니다</h2>
      <p><b>이름:</b> ${escapeHtml(name)}</p>
      <p><b>전화:</b> ${escapeHtml(phone)}</p>
      <p><b>이메일:</b> ${escapeHtml(email)}</p>
      <p><b>메시지:</b><br/>${nl2br(escapeHtml(message))}</p>
      <hr/>
      <p><b>문서 ID:</b> ${escapeHtml(docId)}</p>
    </div>
  `;

  try {
    const info = await getTransport().sendMail({
      from: MAIL_FROM,
      to: MAIL_TO_INTERNAL,
      subject,
      html,
      replyTo: email,
    });
    console.log("[mail] internal sent:", info?.messageId);
    return info;
  } catch (e: any) {
    console.error("[mail] internal failed:", e?.message);
    throw e; // 반드시 위로 던짐
  }
}

// 고객 자동 회신
export async function sendCustomerAckMail(payload: { name: string; to: string; }) {
  const { name, to } = payload;
  const subject = `[Bunny Stock] 상담신청이 접수되었습니다`;
  const html = `
    <div style="font-family:system-ui,Apple SD Gothic Neo,Segoe UI,Roboto,sans-serif;">
      <p>${escapeHtml(maskName(name))}님, 문의 감사합니다.</p>
      <p>담당자가 확인 후 최대한 빠르게 연락드리겠습니다.</p>
      <p style="color:#6b7280;font-size:12px;">본 메일은 발신 전용입니다.</p>
    </div>
  `;

  try {
    const info = await getTransport().sendMail({
      from: MAIL_FROM,
      to,
      subject,
      html,
    });
    console.log("[mail] customer sent:", info?.messageId);
    return info;
  } catch (e: any) {
    console.error("[mail] customer failed:", e?.message);
    throw e;
  }
}
