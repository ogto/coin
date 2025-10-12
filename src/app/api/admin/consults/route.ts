// app/api/admin/consults/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLLECTION =
  process.env.FIREBASE_ADMIN_CONSULTS_COLLECTION ||
  process.env.NEXT_PUBLIC_CONSULTS_COLLECTION ||
  "consults";

function toDateAny(v: any): Date | null {
  if (!v) return null;
  if (typeof v?.toDate === "function") return v.toDate(); // Firestore Timestamp
  if (typeof v === "number") {
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (v instanceof Date) return Number.isNaN(v.getTime()) ? null : v;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function GET(req: NextRequest) {
  // 운영에서는 /admin 페이지/도메인에서만 호출 허용
  if (process.env.NODE_ENV !== "development") {
    const referer = req.headers.get("referer") || "";
    const ok =
      referer.includes("/admin") ||
      (process.env.ADMIN_ORIGIN && referer.startsWith(process.env.ADMIN_ORIGIN!));
    if (!ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 200, 1), 500);
  const collection = searchParams.get("collection") || COLLECTION;

  try {
    let snap;
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
        name: v?.name ?? "",
        email: v?.email ?? "",
        phone: v?.phone ?? "",
        channel: v?.channel ?? "",
        status: (v?.status ?? "new") as "new" | "in_progress" | "done",
        message: v?.message ?? "",
        createdAt: created.getTime(), // ← 관리자 대시보드가 쓰는 ms 숫자
      };
    });

    return NextResponse.json({ ok: true, items });
  } catch (e) {
    console.error("[admin consults GET] error", e);
    return NextResponse.json({ ok: false, error: "failed_to_fetch" }, { status: 500 });
  }
}
