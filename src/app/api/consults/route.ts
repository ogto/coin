import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

const DEFAULT_COLLECTION = process.env.NEXT_PUBLIC_CONSULTS_COLLECTION || "consults";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const collection = searchParams.get("collection") || DEFAULT_COLLECTION;
  const limit = Number(searchParams.get("limit") || "200");

  try {
    // createdAt이 없는 문서가 섞여 있을 수도 있으니, 실패하면 id 기준으로 폴백
    let snap;
    try {
      snap = await adminDb.collection(collection)
        .orderBy("createdAt", "desc")
        .limit(limit)
        .get();
    } catch {
      snap = await adminDb.collection(collection)
        .orderBy("__name__", "desc")
        .limit(limit)
        .get();
    }

    const items = snap.docs.map((d) => {
      const x = d.data() as any;
      return {
        id: d.id,
        name: x.name ?? "",
        phone: x.phone ?? "",
        email: x.email ?? "",
        message: x.message ?? "",
        status: x.status ?? "new",
        createdAt: x.createdAt?.toDate?.()?.toISOString?.() ?? null,
      };
    });

    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json({ error: "failed_to_fetch" }, { status: 500 });
  }
}
