import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST!;
const SMTP_PORT = Number(process.env.SMTP_PORT || "465");
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;
const MAIL_FROM = process.env.MAIL_FROM || `"Bunny Stock" <noreply@bunnystock.io>`;
const MAIL_TO_INTERNAL = process.env.MAIL_TO_INTERNAL || "info@bunnystock.io";

// 서버리스에서 커넥션 재활용을 위해 싱글톤 유지
let _transport: nodemailer.Transporter | null = null;
function getTransport() {
  if (_transport) return _transport;
  _transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
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
      <p><b>문서 ID:</b> ${docId}</p>
    </div>
  `;
  await getTransport().sendMail({
    from: MAIL_FROM,
    to: MAIL_TO_INTERNAL,
    subject,
    html,
    // 회신 시 상담자 메일로 바로 가도록
    replyTo: email,
  });
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
  await getTransport().sendMail({
    from: MAIL_FROM,
    to,
    subject,
    html,
  });
}
