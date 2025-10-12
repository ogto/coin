// app/api/consult/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";

import { adminDb } from "@/lib/firebaseAdmin";
import { sendInternalMail, sendCustomerAckMail } from "@/lib/mailer";

const COLLECTION = process.env.NEXT_PUBLIC_CONSULTS_COLLECTION || "consults";

export async function POST(req: Request) {
  const { name, phone, email, message, agree } = await req.json();

  // 최소 검증
  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const normPhone = (v: string) => String(v || "").replace(/[^\d]/g, "");
  if (!name?.trim() || normPhone(phone).length < 9 || !isEmail(email) || !message?.trim() || agree !== true) {
    return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
  }

  // 저장
  const docRef = await adminDb.collection(COLLECTION).add({
    name: name.trim(),
    phone: normPhone(phone),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    agree: true,
    status: "new",
    createdAt: Date.now(),
  });

  // 메일 2통(내부/고객) 병렬 발송 — 실패해도 응답은 성공
  await Promise.allSettled([
    sendInternalMail({ name, phone: normPhone(phone), email, message, docId: docRef.id }),
    sendCustomerAckMail({ name, to: email }),
  ]);

  return NextResponse.json({ ok: true, id: docRef.id });
}
