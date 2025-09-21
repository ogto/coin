"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT },
};
const VIEWPORT = { once: true, amount: 0.2, margin: "64px 0px -8% 0px" } as const;

function prettify(slug: string) {
  if (!slug) return "";
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function Page({
  params,
}: {
  // ⬇️ Next 15: params가 Promise
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);           // ✅ Promise 언랩
  const title = prettify(category);

  return (
    <main className="relative min-h-screen bg-[#0b1220]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 35% at 0% 0%, rgba(16,185,129,.14), transparent), radial-gradient(50% 30% at 100% 0%, rgba(56,189,248,.12), transparent)",
        }}
      />

      <section className="relative mx-auto max-w-7xl px-6 pt-20 sm:pt-24">
        <motion.h1
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={fadeUp.transition}
          className="text-3xl font-extrabold leading-tight text-white sm:text-4xl"
        >
          {title || "카테고리"}
        </motion.h1>
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={VIEWPORT}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
          className="mt-2 h-1 w-28 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"
        />
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 sm:p-8"
        >
          <div className="grid place-items-center rounded-xl border border-dashed border-white/15 bg-white/2 px-6 py-16 text-center">
            <Inbox className="mb-3 h-6 w-6 text-white/60" />
            <div className="text-sm font-semibold text-white/80">표시할 내용이 없습니다.</div>
            <p className="mt-1 text-xs text-white/50">해당 카테고리에 등록된 콘텐츠가 없어요.</p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
