import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

const DEFAULT_COLLECTION = process.env.NEXT_PUBLIC_CONSULTS_COLLECTION || "consults";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const hostHeader = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  const hostname = hostHeader.split(":")[0];

  const isDev = process.env.NODE_ENV !== "production";
  const isAdminHost =
    hostname === "admin.bunnystock.io" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1";

  if (!isDev && !isAdminHost) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const collection = searchParams.get("collection") || DEFAULT_COLLECTION;

  try {
    const { status } = await req.json();
    if (!["new", "in_progress", "done", "rejected"].includes(status)) {
      return NextResponse.json({ error: "invalid_status" }, { status: 400 });
    }

    await adminDb.collection(collection).doc(params.id).update({
      status,
      updatedAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "update_failed" }, { status: 500 });
  }
}
