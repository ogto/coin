export const runtime = "nodejs"; // Edge 금지
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

const mask = (name: string) => {
  const n = (name || "").trim();
  if (n.length <= 1) return n;
  if (n.length === 2) return n[0] + "*";
  return n[0] + "*".repeat(n.length - 2) + n[n.length - 1];
};

const fmt = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limitN = Number(searchParams.get("limit") || 20);

  const snap = await adminDb
    .collection("consults")
    .orderBy("createdAt", "desc")
    .limit(limitN)
    .get();

  const items = snap.docs.map((doc) => {
    const d: any = doc.data();
    const created: Date = d?.createdAt?.toDate?.() ?? new Date();
    return {
      id: doc.id,
      title: `${mask(d?.name || "")}님의 상담신청이 접수되었습니다.`,
      date: fmt(created),
    };
  });

  return NextResponse.json({ items });
}
