import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

// ===== 환경설정 =====
const COLLECTION = process.env.NEXT_PUBLIC_CONSULTS_COLLECTION || "consults";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || ""; // 관리자 키(환경변수 필수)

// ===== 유틸 =====
function parseDateLoose(v?: string | null): Date | undefined {
  if (!v) return;
  const s = String(v).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const d = new Date(`${s}T00:00:00.000Z`);
    if (!Number.isNaN(d.getTime())) return d;
  }
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d;
}

function json(data: any, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "application/json",
    },
  });
}

// ===== GET (관리자용) =====
export async function GET(req: Request) {
  // --- 인증 ---
  const key = req.headers.get("x-admin-key") ?? "";
  if (!ADMIN_API_KEY || key !== ADMIN_API_KEY) {
    return json({ error: "unauthorized" }, 401);
  }

  const { searchParams } = new URL(req.url);

  // --- 파라미터 파싱 ---
  const limitParam = Number(searchParams.get("limit")) || 200;
  const limit = Math.min(Math.max(limitParam, 1), 500); // [1, 500]

  const statusParam = (searchParams.get("status") || "").trim(); // ex) new|in_progress|done
  const q = (searchParams.get("q") || "").trim();                 // 부분검색 (post-filter)
  const start = parseDateLoose(searchParams.get("start"));        // YYYY-MM-DD 또는 ISO
  const end = parseDateLoose(searchParams.get("end"));            // YYYY-MM-DD 또는 ISO

  // 커서: `${createdAtMs}__${docId}`
  const pageToken = searchParams.get("pageToken") || "";
  let afterCreatedAtMs: number | null = null;
  let afterId: string | null = null;
  if (pageToken.includes("__")) {
    const [ms, id] = pageToken.split("__");
    const n = Number(ms);
    if (!Number.isNaN(n) && id) {
      afterCreatedAtMs = n;
      afterId = id;
    }
  }

  try {
    // --- 기본 쿼리 (createdAt desc, __name__ desc) ---
    let qRef: FirebaseFirestore.Query = adminDb
      .collection(COLLECTION)
      .orderBy("createdAt", "desc")
      .orderBy("__name__", "desc");

    if (statusParam) qRef = qRef.where("status", "==", statusParam);
    if (start) qRef = qRef.where("createdAt", ">=", start);
    if (end) qRef = qRef.where("createdAt", "<", end);
    if (afterCreatedAtMs !== null && afterId) {
      qRef = qRef.startAfter(new Date(afterCreatedAtMs), afterId);
    }

    let snap: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;

    // createdAt 쿼리 실패 시 이름 기준 폴백
    try {
      snap = await qRef.limit(limit).get();
    } catch (err: any) {
      if (String(err?.message ?? "").includes("createdAt")) {
        let byName = adminDb.collection(COLLECTION).orderBy("__name__", "desc");
        if (statusParam) byName = byName.where("status", "==", statusParam);
        if (afterId) byName = byName.startAfter(afterId);
        // 폴백에서는 기간 필터 적용 불가(createdAt 미사용)
        snap = await byName.limit(limit).get();
      } else {
        throw err;
      }
    }

    // --- 결과 가공 (관리자용: phone/email/status 포함) ---
    let items = snap.docs.map((d) => {
      const x = d.data() as any;
      const createdAtIso =
        x?.createdAt?.toDate?.()?.toISOString?.() ??
        (x?.createdAt instanceof Date ? x.createdAt.toISOString() : new Date().toISOString());

      return {
        id: d.id,
        name: x.name ?? "",
        phone: x.phone ?? "",
        email: x.email ?? "",
        message: x.message ?? "",
        status: x.status ?? "new",
        createdAt: createdAtIso,
      };
    });

    // --- 검색(q) post-filter: name/phone/email/message 부분일치 ---
    if (q) {
      const qLower = q.toLowerCase();
      items = items.filter((it) =>
        [it.name, it.phone, it.email, it.message].some((v) => String(v).toLowerCase().includes(qLower)),
      );
    }

    // --- nextPageToken 계산 ---
    let nextPageToken: string | null = null;
    if (snap.docs.length === limit) {
      const last = snap.docs[snap.docs.length - 1];
      const x = last?.data() as any;

      const lastCreated =
        typeof x?.createdAt?.toDate === "function"
          ? x.createdAt.toDate()
          : x?.createdAt instanceof Date
          ? x.createdAt
          : null;

      if (last && lastCreated instanceof Date) {
        nextPageToken = `${lastCreated.getTime()}__${last.id}`;
      } else if (last) {
        nextPageToken = `0__${last.id}`;
      }
    }

    return json({ items, nextPageToken });
  } catch (e) {
    console.error("[admin consults GET] error", e);
    return json({ error: "failed_to_fetch" }, 500);
  }
}
