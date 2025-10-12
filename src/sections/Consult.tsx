"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type PostItem = {
  id: string | number;
  title: string;
  date: string; // "YYYY.MM.DD"
  href?: string;
};

const COLLECTION = process.env.NEXT_PUBLIC_CONSULTS_COLLECTION ?? "consults";

/* ───── 유틸 ───── */
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const normPhone = (v: string) => String(v || "").replace(/[^\d]/g, "");
const maskName = (name: string) => {
  const n = (name ?? "").trim();
  if (n.length <= 1) return n || "고객";
  if (n.length === 2) return n[0] + "*";
  return n[0] + "*".repeat(n.length - 2) + n[n.length - 1];
};
const fmtDate = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

export default function Consult({ posts = [] }: { posts?: PostItem[] }) {
  /* ───── 상태 ───── */
  const [localPosts, setLocalPosts] = useState<PostItem[]>(posts);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", agree: false });
  const [submitting, setSubmitting] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /* ───── 초기 목록 조회 (공개 API) ───── */
  useEffect(() => {
    const ctl = new AbortController();
    (async () => {
      try {
        setLoadingList(true);
        const res = await fetch(
          `/api/consults?limit=20&collection=${encodeURIComponent(COLLECTION)}`,
          { cache: "no-store", signal: ctl.signal }
        );
        const ct = res.headers.get("content-type") || "";
        const data = ct.includes("application/json") ? await res.json() : { ok: false, items: [] };

        if (!res.ok || (data.ok === false && !Array.isArray(data.items))) return;

        const items: PostItem[] = Array.isArray(data.items)
          ? data.items.map((it: any) => ({
              id: it.id,
              title: `${maskName(it.name ?? "고객")}님의 상담신청이 접수되었습니다.`,
              date: it.createdAt ? fmtDate(new Date(it.createdAt)) : fmtDate(new Date()),
              href: undefined,
            }))
          : [];

        setLocalPosts(items);
      } catch {
        /* 네트워크 오류 등은 무시 */
      } finally {
        setLoadingList(false);
      }
    })();
    return () => ctl.abort();
  }, []);

  /* ───── 제출 ───── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    // 검증
    if (!form.name.trim()) return alert("이름을 입력하세요.");
    if (normPhone(form.phone).length < 9) return alert("전화번호를 확인하세요.");
    if (!isEmail(form.email)) return alert("이메일 형식을 확인하세요.");
    if (!form.message.trim()) return alert("문의 내용을 입력하세요.");
    if (!form.agree) return alert("개인정보 수집·이용에 동의가 필요합니다.");

    setSubmitting(true);
    setErrorMsg(null);
    try {
      // 서버가 Firestore 저장 + 내부/고객 메일 발송
      const res = await fetch(`/api/consult`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: normPhone(form.phone),
          email: form.email.trim(),
          message: form.message.trim(),
          agree: true,
        }),
      });

      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await res.json() : { ok: false, error: await res.text() };
      if (!res.ok || !data?.ok) throw new Error(data?.error || `HTTP ${res.status}`);

      // UI 즉시 반영 (중복 방지)
      const newItem: PostItem = {
        id: data.id as string,
        title: `${maskName(form.name)}님의 상담신청이 접수되었습니다.`,
        date: fmtDate(new Date()),
      };
      setLocalPosts((prev) => (prev.some((p) => p.id === newItem.id) ? prev : [newItem, ...prev]));

      alert("접수되었습니다. 담당자가 확인 후 연락드립니다.");
      setForm({ name: "", phone: "", email: "", message: "", agree: false });
    } catch (err: any) {
      console.log("[consult submit error]", err);
      setErrorMsg(err?.message ?? "접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      alert(errorMsg ?? "접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ───── UI ───── */
  return (
    <section id="consult" className="relative overflow-hidden bg-white py-24">
      {/* 부드러운 배경 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 15% 10%, rgba(16,185,129,0.10), transparent), radial-gradient(60% 50% at 85% 15%, rgba(56,189,248,0.10), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-15"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<?xml version=\"1.0\"?><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\" viewBox=\"0 0 160 160\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.35\"/></svg>')",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* 머리말 */}
        <div className="mb-12 text-center">
          <div className="text-[11px] tracking-[0.18em] text-black/45">BUNNY STOCK SERVICE</div>
          <h2 className="mt-1 text-3xl font-bold text-black sm:text-4xl">비대면으로 간편하게 상담을 신청하세요</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-black/60 sm:text-base">
            문의를 남겨주시면 담당자가 확인 후 연락드립니다.
          </p>
        </div>

        {/* 좌우 2컬럼 */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT: Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-black/10 bg-white/95 p-6 shadow-[0_10px_40px_rgba(8,15,40,0.08)] backdrop-blur"
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                무료 컨설팅
              </div>
              <h3 className="mt-3 text-xl font-semibold text-black">
                투자 관련 <span className="text-emerald-600">맞춤 상담</span>을 받아보세요
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs text-black/60">이름</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="홍길동"
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-3 text-sm outline-none ring-emerald-500/20 focus:ring"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-black/60">전화</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="010-0000-0000"
                    inputMode="tel"
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-3 text-sm outline-none ring-emerald-500/20 focus:ring"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-black/60">이메일</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  inputMode="email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-black/10 bg-white px-3 py-3 text-sm outline-none ring-emerald-500/20 focus:ring"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-black/60">문의 내용</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  placeholder="필요하신 상담 내용을 구체적으로 남겨주세요."
                  className="w-full resize-none rounded-lg border border-black/10 bg-white px-3 py-3 text-sm outline-none ring-emerald-500/20 focus:ring"
                  required
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <label className="inline-flex select-none items-center gap-2 text-xs text-black/70">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                    className="h-4 w-4 rounded border-black/20 text-emerald-600 focus:ring-emerald-500"
                    required
                  />
                  개인정보 수집·이용에 동의합니다.
                </label>
                <span className="text-xs text-black/40">*개인정보는 안전하게 보관됩니다.</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600 disabled:opacity-60"
                aria-busy={submitting}
              >
                {submitting ? "전송 중..." : "상담 신청 보내기"}
              </button>

              {errorMsg && (
                <p className="pt-2 text-sm text-red-600" role="alert" aria-live="polite">
                  {errorMsg}
                </p>
              )}
            </form>
          </motion.div>

          {/* RIGHT: 누적 현황 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-2xl border border-black/10 bg-white/95 p-6 shadow-[0_10px_40px_rgba(8,15,40,0.08)] backdrop-blur"
          >
            <div className="mb-5">
              <div className="text-xs tracking-wide text-black/50">크레딧·증거성</div>
              <h3 className="text-xl font-semibold text-black">상담신청 현황</h3>
              <p className="mt-1 text-xs text-black/50">
                최근 접수된 문의 내역입니다. 개인정보 보호를 위해 일부 정보는 마스킹됩니다.
              </p>
            </div>

            <ul className="divide-y divide-black/10">
              {loadingList ? (
                <li className="py-10 text-center text-sm text-black/45">불러오는 중…</li>
              ) : localPosts.length === 0 ? (
                <li className="py-10 text-center text-sm text-black/45">아직 표시할 내역이 없습니다.</li>
              ) : (
                localPosts.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                    <a href={p.href ?? "#"} className="line-clamp-1 text-sm text-black/80 hover:text-emerald-600">
                      {p.title}
                    </a>
                    <span className="whitespace-nowrap text-xs text-black/40">{p.date}</span>
                  </li>
                ))
              )}
            </ul>

            {/* <div className="mt-4 text-right">
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline"
              >
                더보기
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10 17l5-5-5-5v10z" />
                </svg>
              </a>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
