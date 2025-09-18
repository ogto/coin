"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

type VideoItem = {
  url: string;          // ex) https://www.youtube.com/watch?v=VIDEO_ID
  title?: string;       // 선택: 카드 하단 타이틀
};

function getVideoId(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v")!;
    // shorts 등 특수경로 처리
    const parts = u.pathname.split("/");
    const i = parts.findIndex((p) => p === "shorts");
    if (i >= 0 && parts[i + 1]) return parts[i + 1];
    return "";
  } catch {
    return "";
  }
}

function YouTubeCard({ url, title }: VideoItem) {
  const [play, setPlay] = useState(false);
  const id = useMemo(() => getVideoId(url), [url]);
  const embed = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;

  const maxres = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const hq = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_8px_40px_rgba(8,15,40,0.08)]"
    >
      <div className="relative aspect-video w-full">
        {play ? (
          <iframe
            src={embed}
            title={title ?? `YouTube video ${id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <button
            onClick={() => setPlay(true)}
            className="relative h-full w-full"
            aria-label="재생"
          >
            {/* 썸네일: maxres → 실패시 hq로 폴백 */}
            <img
              src={maxres}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = hq; }}
              alt={title ?? "YouTube thumbnail"}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
            {/* 그라데이션/글로우 */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_40%,rgba(0,0,0,0.45)_100%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -inset-4 bg-[radial-gradient(60%_40%_at_50%_50%,rgba(16,185,129,0.25),transparent)]" />
            </div>
            {/* 플레이 버튼 */}
            <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/95 p-4 shadow-lg ring-1 ring-black/10 transition transform group-hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#10b981"><path d="M8 5v14l11-7z"/></svg>
            </span>
          </button>
        )}
      </div>
      {/* 타이틀 바 */}
      {title && (
        <div className="flex items-start gap-2 px-4 py-3">
          <div className="mt-1 h-2 w-2 flex-none rounded-full bg-emerald-400" />
          <div className="line-clamp-2 text-sm font-medium text-black/80">
            {title}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function Youtube({
  title = "유튜브",
  subtitle = "최신 인사이트 영상을 모았습니다.",
  channelLink,
  videos,
}: {
  title?: string;
  subtitle?: string;
  channelLink?: string;   // 채널 전체보기 버튼 링크(선택)
  videos: VideoItem[];
}) {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* 부드러운 배경 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 50% at 50% 0%, rgba(16,185,129,0.10), transparent), radial-gradient(70% 40% at 80% 20%, rgba(56,189,248,0.10), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-20"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<?xml version=\"1.0\"?><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.75\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.35\"/></svg>')",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* 헤더 */}
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <div className="text-[11px] tracking-[0.18em] text-black/45">OGTO MEDIA</div>
          <h2 className="text-3xl font-bold text-black sm:text-4xl">{title}</h2>
          <p className="max-w-2xl text-sm text-black/60 sm:text-base">{subtitle}</p>

          {channelLink && (
            <a
              href={channelLink}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm hover:-translate-y-[1px] hover:shadow-md transition"
            >
              채널 전체보기
              <svg width="16" height="16" viewBox="0 0 24 24" className="-mr-1">
                <path fill="currentColor" d="M10 17l5-5-5-5v10z"/>
              </svg>
            </a>
          )}
        </div>

        {/* 그리드 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <YouTubeCard key={i} {...v} />
          ))}
        </div>
      </div>
    </section>
  );
}
