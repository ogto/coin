import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

type Status = "new" | "in_progress" | "done";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  // body 파싱
  let body: { status?: Status } = {};
  try {
    body = await req.json();
  } catch {
    // noop
  }
  const status = body.status;

  if (!id || !status) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // (선택) 간단한 접근 가드 — 로컬은 통과, 프로덕션은 admin 경로/도메인만 허용
  if (process.env.NODE_ENV !== "development") {
    const referer = req.headers.get("referer") || "";
    const allowed =
      referer.includes("/admin") ||
      (process.env.ADMIN_ORIGIN && referer.startsWith(process.env.ADMIN_ORIGIN));
    if (!allowed) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
  }

  const col = process.env.FIREBASE_ADMIN_CONSULTS_COLLECTION ?? "consults";
  await adminDb.collection(col).doc(id).update({ status });

  return NextResponse.json({ ok: true });
}
