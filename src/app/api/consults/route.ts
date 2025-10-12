// app/api/consults/route.ts  (공개 조회용)
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLLECTION = process.env.NEXT_PUBLIC_CONSULTS_COLLECTION || "consults";

function json(data: any, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: { "Cache-Control": "no-store, max-age=0", "Content-Type": "application/json" },
  });
}
function maskName(name: string) {
  const n = (name ?? "").trim();
  if (n.length <= 1) return n || "고객";
  if (n.length === 2) return n[0] + "*";
  return n[0] + "*".repeat(n.length - 2) + n[n.length - 1];
}
// Timestamp/number/Date/ISO 모두 수용
function toDateAny(v: any): Date | null {
  if (!v) return null;
  if (typeof v?.toDate === "function") return v.toDate();
  if (typeof v === "number") { const d = new Date(v); return Number.isNaN(d.getTime()) ? null : d; }
  if (v instanceof Date) return Number.isNaN(v.getTime()) ? null : v;
  const d = new Date(v); return Number.isNaN(d.getTime()) ? null : d;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 10, 1), 10);
  const collection = searchParams.get("collection") || COLLECTION;

  try {
    let snap;
    // createdAt 정렬 시도 → 실패 시 __name__ 폴백
    try {
      snap = await adminDb.collection(collection).orderBy("createdAt", "desc").limit(limit).get();
    } catch {
      snap = await adminDb.collection(collection).orderBy("__name__", "desc").limit(limit).get();
    }

    const items = snap.docs.map((d) => {
      const v = d.data() as any;
      const created = toDateAny(v?.createdAt) ?? new Date();
      return {
        id: d.id,
        name: maskName(v?.name || "고객"),
        createdAt: created.toISOString(),
      };
    });

    return json({ ok: true, items });
  } catch (e) {
    console.error("[public consults GET] error", e);
    return json({ ok: false, error: "failed_to_fetch" }, 500);
  }
}
