"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type PostItem = {
  id: string | number;
  title: string; // 예: "J***님의 상담신청이 접수되었습니다."
  date: string;  // 예: "2025.07.22"
  href?: string; // 선택
};

export default function Consult({
  posts = [],
}: {
  posts?: PostItem[];
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    agree: false,
  });

  return (
    <section className="relative overflow-hidden bg-white py-24">
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
          <div className="text-[11px] tracking-[0.18em] text-black/45">OGTO SERVICE</div>
          <h2 className="mt-1 text-3xl font-bold text-black sm:text-4xl">
            비대면으로 간편하게 상담을 신청하세요
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-black/60 sm:text-base">
            문의를 남겨주시면 담당자가 확인 후 연락드립니다. (기능 연결은 내일 진행)
          </p>
        </div>

        {/* 좌우 2컬럼 */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT: Form (UI만) */}
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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("[UI Only] submit payload:", form);
                alert("지금은 화면만 구현 상태입니다. 내일 DB 연결 예정 ⚡️");
              }}
              className="space-y-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs text-black/60">이름</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="홍길동"
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-3 text-sm outline-none ring-emerald-500/20 focus:ring"
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
                  className="w-full rounded-lg border border-black/10 bg-white px-3 py-3 text-sm outline-none ring-emerald-500/20 focus:ring"
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
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <label className="inline-flex select-none items-center gap-2 text-xs text-black/70">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                    className="h-4 w-4 rounded border-black/20 text-emerald-600 focus:ring-emerald-500"
                  />
                  개인정보 수집·이용에 동의합니다.
                </label>
                <span className="text-xs text-black/40">* 실제 전송은 비활성</span>
              </div>

              <button
                type="submit"
                className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
              >
                문의 신청 보내기
              </button>
            </form>
          </motion.div>

          {/* RIGHT: 접수 현황 (UI) */}
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
              {posts.length === 0 ? (
                <li className="py-10 text-center text-sm text-black/45">
                  아직 표시할 내역이 없습니다.
                </li>
              ) : (
                posts.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                    <a
                      href={p.href ?? "#"}
                      className="line-clamp-1 text-sm text-black/80 hover:text-emerald-600"
                    >
                      {p.title}
                    </a>
                    <span className="whitespace-nowrap text-xs text-black/40">{p.date}</span>
                  </li>
                ))
              )}
            </ul>

            <div className="mt-4 text-right">
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline"
              >
                더보기
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10 17l5-5-5-5v10z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
