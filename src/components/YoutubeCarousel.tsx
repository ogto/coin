// components/YoutubeCarousel.tsx
"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export type YtItem = {
  id: string;
  title: string;
  publishedAt: string;
  url: string;
  thumb: string;
};

export default function YoutubeCarousel({ items }: { items: YtItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const delta = (el.clientWidth * 0.9) * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* 좌/우 네비 */}
      <button
        aria-label="prev"
        onClick={() => scrollBy("left")}
        className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-black/15 bg-white/90 p-2 shadow-md backdrop-blur sm:block hover:bg-white"
      >
        ‹
      </button>
      <button
        aria-label="next"
        onClick={() => scrollBy("right")}
        className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-black/15 bg-white/90 p-2 shadow-md backdrop-blur sm:block hover:bg-white"
      >
        ›
      </button>

      {/* 트랙 */}
      <div
        ref={ref}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 py-2"
      >
        {items.map((v) => (
          <motion.a
            key={v.id}
            href={v.url}
            target="_blank"
            rel="noreferrer"
            className="group w-[280px] flex-none snap-start"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={v.thumb}
                  alt={v.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <span className="absolute left-2 top-2 rounded-md bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  YouTube
                </span>
              </div>
              <div className="p-3">
                <div className="line-clamp-2 text-[13px] font-semibold leading-snug text-black/90">
                  {v.title}
                </div>
                <div className="mt-1 text-xs text-black/45">
                  {new Date(v.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
