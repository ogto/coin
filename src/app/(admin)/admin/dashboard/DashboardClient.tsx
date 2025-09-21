"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mail,
  Phone,
  User,
  Clock,
  Filter,
  X,
  ChevronDown,
  Check,
  Loader2,
} from "lucide-react";

// =============================================================================
// 타입/상수
// =============================================================================
type Status = "new" | "in_progress" | "done";

type Consultation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  channel?: string;
  status: Status;
  message: string;
  createdAt: number | null;
};

const STATUS_LABEL: Record<Status, string> = {
  new: "신규",
  in_progress: "진행중",
  done: "완료",
};

const STATUS_BADGE: Record<Status, string> = {
  new: "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/30",
  in_progress: "bg-amber-500/15 text-amber-300 ring-1 ring-inset ring-amber-400/30",
  done: "bg-cyan-500/15 text-cyan-300 ring-1 ring-inset ring-cyan-400/30",
};

const EASE = [0.16, 1, 0.3, 1] as const;
const COLLECTION = process.env.NEXT_PUBLIC_CONSULTS_COLLECTION || "consults";

// =============================================================================
// 페이지
// =============================================================================
export default function DashboardClient() {
  const [rows, setRows] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"" | Status>("");

  // 데이터 로드
  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`/api/consults?limit=200&collection=${encodeURIComponent(COLLECTION)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (!alive) return;
        const items = (json?.items ?? []) as Consultation[];
        setRows(items);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  // 검색/필터
  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return rows.filter((r) => {
      const passStatus = status ? r.status === status : true;
      if (!text) return passStatus;
      const hay = `${r.name} ${r.email} ${r.phone} ${r.channel ?? ""} ${r.message}`.toLowerCase();
      return passStatus && hay.includes(text);
    });
  }, [rows, q, status]);

  // 요약
  const summary = useMemo(() => {
    const total = rows.length;
    const newCnt = rows.filter((r) => r.status === "new").length;
    const ingCnt = rows.filter((r) => r.status === "in_progress").length;
    const doneCnt = rows.filter((r) => r.status === "done").length;
    return { total, newCnt, ingCnt, doneCnt };
  }, [rows]);

  // 상태 업데이트(낙관적)
async function updateStatus(id: string, next: Status): Promise<void> {
  const qs = new URLSearchParams({ collection: COLLECTION });
  const res = await fetch(`/api/consults/${id}/status?` + qs.toString(), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: next }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || "update_failed");
  }

  // 성공 시 로컬 반영
  setRows(prev => prev.map(r => (r.id === id ? { ...r, status: next } : r)));
}

  // 상세 모달
  const [active, setActive] = useState<Consultation | null>(null);

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      {/* 헤더 */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">대시보드</h1>
          <p className="mt-1 text-sm text-white/65">실시간 상담 신청 목록을 확인하고 검색/필터링할 수 있습니다.</p>
        </div>

        {/* 검색/필터 */}
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <Search className="h-4 w-4 text-white/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="이름, 이메일, 전화번호, 메모 검색"
              className="w-64 bg-transparent text-sm text-white placeholder-white/40 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <Filter className="h-4 w-4 text-white/50" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="bg-transparent text-sm text-white outline-none"
            >
              <option value="">전체 상태</option>
              <option value="new">신규</option>
              <option value="in_progress">진행중</option>
              <option value="done">완료</option>
            </select>
          </div>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <SummaryCard label="전체" value={summary.total} className="from-white/10 to-white/5" />
        <SummaryCard label="신규" value={summary.newCnt} className="from-emerald-400/20 to-emerald-400/10" />
        <SummaryCard label="진행중" value={summary.ingCnt} className="from-amber-400/20 to-amber-400/10" />
        <SummaryCard label="완료" value={summary.doneCnt} className="from-cyan-400/20 to-cyan-400/10" />
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
        <div className="max-h-[64vh] overflow-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 z-10 bg-[#0b1220]/90 backdrop-blur">
              <tr className="text-xs uppercase tracking-wider text-white/60">
                <th className="px-4 py-3 font-semibold">신청자</th>
                <th className="px-4 py-3 font-semibold">연락처</th>
                <th className="px-4 py-3 font-semibold">채널</th>
                <th className="px-4 py-3 font-semibold">상태</th>
                <th className="px-4 py-3 font-semibold">신청시간</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 py-4">
                      <Skeleton w="w-40" />
                    </td>
                    <td className="px-4 py-4">
                      <Skeleton w="w-36" />
                    </td>
                    <td className="px-4 py-4">
                      <Skeleton w="w-24" />
                    </td>
                    <td className="px-4 py-4">
                      <Skeleton w="w-16" />
                    </td>
                    <td className="px-4 py-4">
                      <Skeleton w="w-28" />
                    </td>
                  </tr>
                ))}

              {!loading &&
                filtered.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setActive(r)}
                    className="cursor-pointer bg-white/0 text-sm text-white/85 transition hover:bg-white/[0.06]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-white/50" />
                        <div className="truncate">{r.name || "-"}</div>
                        {r.email && (
                          <span className="ml-2 inline-flex items-center gap-1 text-xs text-white/55">
                            <Mail className="h-3.5 w-3.5" /> {r.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-white/50" />
                        <span>{r.phone || "-"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-lg bg-white/5 px-2 py-1 text-xs text-white/70 ring-1 ring-inset ring-white/10">
                        {r.channel || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <PopStatusMenu id={r.id} value={r.status} onChange={(next) => updateStatus(r.id, next)} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-white/75">
                        <Clock className="h-4 w-4 text-white/50" />
                        <TimeText ms={r.createdAt} />
                      </div>
                    </td>
                  </tr>
                ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-white/50">
                    검색 조건에 해당하는 항목이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 상세 모달 */}
      <DetailModal
        item={active}
        onClose={() => setActive(null)}
        onUpdateStatus={updateStatus} // 부모의 updater 전달
      />

    </main>
  );
}

// =============================================================================
// 컴포넌트
// =============================================================================
function SummaryCard({ label, value, className = "" }: { label: string; value: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`rounded-2xl border border-white/10 bg-gradient-to-br p-4 shadow-[0_8px_40px_rgba(0,0,0,.25)] ${className}`}
    >
      <div className="text-xs text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-extrabold text-white">{value.toLocaleString("ko-KR")}</div>
    </motion.div>
  );
}

function Skeleton({ w = "w-full", h = "h-4" }: { w?: string; h?: string }) {
  return <div className={`${w} ${h} rounded bg-white/10`} />;
}

function TimeText({ ms }: { ms: number | null }) {
  const [text, setText] = useState("-");
  useEffect(() => {
    if (!ms) return;
    const d = new Date(ms);
    setText(
      new Intl.DateTimeFormat("ko-KR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d),
    );
  }, [ms]);
  return <span>{text}</span>;
}

function DetailModal({ item, onClose, onUpdateStatus }: { item: Consultation | null; onClose: () => void; onUpdateStatus: (id: string, next: Status) => Promise<void>; }) {
  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed inset-x-0 bottom-0 z-[70] mx-auto w-[96%] max-w-2xl rounded-2xl border border-white/10 bg-[#0b1220] p-5 shadow-[0_40px_120px_rgba(0,0,0,.6)] sm:bottom-auto sm:top-24"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-lg font-bold text-white">상담 상세</div>
              <button
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
                onClick={onClose}
                aria-label="닫기"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-3">
              <Field label="신청자" icon={<User className="h-4 w-4" />} value={item.name || "-"} />
              <Field label="이메일" icon={<Mail className="h-4 w-4" />} value={item.email || "-"} />
              <Field label="전화" icon={<Phone className="h-4 w-4" />} value={item.phone || "-"} />
              <Field label="채널" value={item.channel || "-"} />
              <div className="flex items-center gap-2 text-sm">
                <div className="min-w-20 text-xs text-white/60">상태</div>
                <PopStatusMenu
                  id={item.id}
                  value={item.status}
                  onChange={async (next) => {
                    await onUpdateStatus(item.id, next);
                    // 성공해도 모달은 닫지 않음
                  }}
                />
              </div>

              <div>
                <div className="mb-1 text-xs text-white/60">메시지</div>
                <div
                  className="
                    rounded-xl border border-white/10 bg-white/[0.03] p-3
                    text-sm text-white/80 leading-6
                    whitespace-pre-wrap break-words   /* ← 개행/긴 단어 처리 */
                    max-h-60 overflow-auto            /* ← 길면 스크롤 */
                  "
                >
                  {item.message || "(내용 없음)"}
                </div>
              </div>
              <div className="text-xs text-white/50">
                <Clock className="mr-1 inline h-3.5 w-3.5" />
                <TimeText ms={item.createdAt} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="min-w-20 text-xs text-white/60">{label}</div>
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-white/85">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}

// =============================================================================
// 상태 팝업
// =============================================================================
function PopStatusMenu({
  id,
  value,
  onChange,
}: {
  id: string;
  value: Status;
  onChange: (next: Status) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<Status | null>(null);
  const [current, setCurrent] = useState<Status>(value);
  const ref = useRef<HTMLDivElement>(null);

  // 동기화
  useEffect(() => setCurrent(value), [value]);

  // 바깥 클릭 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!ref.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // ESC 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handle = async (next: Status) => {
    if (next === current) {
      setOpen(false);
      return;
    }
    setPending(next);
    try {
      await onChange(next);       // 실패 시 throw
      setCurrent(next);           // 성공 시 상태 반영
      setOpen(false);             // 성공 시에만 닫기
    } catch (e) {
      // 실패 → 메뉴는 열린 채 유지
      console.error(e);
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs ${STATUS_BADGE[current]}`}
      >
        {STATUS_LABEL[current]}
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 z-[50] mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#0b1220] shadow-[0_16px_60px_rgba(0,0,0,0.4)]"
          >
            {(["new", "in_progress", "done"] as Status[]).map((s) => (
              <button
                key={s}
                onClick={() => handle(s)}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-xs text-white/85 hover:bg-white/[0.06]"
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      s === "new" ? "bg-emerald-400" : s === "in_progress" ? "bg-amber-400" : "bg-cyan-400"
                    }`}
                  />
                  {STATUS_LABEL[s]}
                </span>

                {pending === s ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : current === s ? (
                  <Check className="h-3.5 w-3.5 text-white/70" />
                ) : null}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
