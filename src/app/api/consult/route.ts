import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { sendInternalMail, sendCustomerAckMail } from "@/lib/mailer";

export const runtime = "nodejs";        // ★★ 서버에서 필수
export const dynamic = "force-dynamic";

const COLLECTION = process.env.NEXT_PUBLIC_CONSULTS_COLLECTION || "consults";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, message, agree } = body || {};
    if (!name || !phone || !email || !message || !agree) {
      return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
    }

    const docRef = await adminDb.collection(COLLECTION).add({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
      agree: true,
      status: "new",
      createdAt: Date.now(),          // number(ms)로 통일
    });

    // 메일 2건 (하나라도 실패면 throw → 500 반환)
    await sendInternalMail({ name, phone, email, message, docId: docRef.id });
    await sendCustomerAckMail({ name, to: email });

    return NextResponse.json({ ok: true, id: docRef.id });
  } catch (e: any) {
    console.error("[consult POST] failed:", e?.message);
    return NextResponse.json({ ok: false, error: e?.message || "failed" }, { status: 500 });
  }
}
