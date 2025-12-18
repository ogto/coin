"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

/* =========================
   Types
========================= */
type VideoItem = {
  url: string;            // https://www.youtube.com/watch?v=VIDEO_ID or youtu.be/VIDEO_ID or /shorts/VIDEO_ID
  title?: string;         // 카드 하단 타이틀(선택)
  thumbOverride?: string; // 썸네일 강제 지정(선택)
};

type YoutubeProps = {
  title?: string;
  subtitle?: string;
  channelLink?: string; // 채널 전체보기 버튼 링크(선택)
  videos: VideoItem[];
};

/* =========================
   Utils
========================= */
function getVideoId(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1);
    // 표준 watch
    const v = u.searchParams.get("v");
    if (v) return v;
    // shorts, embed 등 경로형
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.findIndex((p) => p === "shorts" || p === "embed" || p === "watch");
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
    // /VIDEO_ID 바로 오는 경우
    if (parts.length === 1) return parts[0];
    return "";
  } catch {
    return "";
  }
}

function getThumbs(id: string, override?: string) {
  const maxres = override ?? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const hq = override ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return { maxres, hq };
}

function YouTubeCard({ url, title }: VideoItem) {
  const [loaded, setLoaded] = useState(false);
  const id = useMemo(() => getVideoId(url), [url]);

  const params = [
    "autoplay=1",         // 클릭 후 자동재생
    "controls=1",         // 기본 컨트롤 보이기
    "fs=1",               // 전체화면 버튼 보이기
    "playsinline=1",      // iOS 인라인 재생
    "modestbranding=1",   // 로고 최소화
    "rel=0",              // 관련 동영상(동일 채널 우선)
  ].join("&");
  const embed = `https://www.youtube.com/embed/${id}?${params}`;

  const maxres = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const hq = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_8px_40px_rgba(8,15,40,0.08)]"
    >
      <div className="relative w-full aspect-video">
        {loaded ? (
          <iframe
            src={embed}
            title={title ?? `YouTube video ${id}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            frameBorder={0}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
          />
        ) : (
          <button
            onClick={() => setLoaded(true)}
            className="relative h-full w-full"
            aria-label="영상 재생"
          >
            <img
              src={maxres}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = hq; }}
              alt={title ?? "YouTube thumbnail"}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_40%,rgba(0,0,0,0.45)_100%)]" />
            <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/95 p-4 shadow-lg ring-1 ring-black/10 transition transform group-hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#10b981">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

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

/* =========================
   Section
========================= */
export default function Youtube({
  title = "유튜브",
  subtitle = "최신 인사이트 영상을 모았습니다.",
  channelLink,
  videos,
}: YoutubeProps) {
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
          <div className="text-[11px] tracking-[0.18em] text-black/45">Hae Gang MEDIA</div>
          <h2 className="text-3xl font-bold text-black sm:text-4xl">{title}</h2>
          <p className="max-w-2xl text-sm text-black/60 sm:text-base">{subtitle}</p>
        </div>

        {/* 가로 중앙 정렬: 콘텐츠 너비만큼만 inline-grid로 묶기 */}
        <div className="flex justify-center">
          <div
            className="
              grid
              w-full
              max-w-[1024px]
              gap-6
              grid-cols-1
              md:grid-cols-3
            "
          >
            {videos.map((v, i) => (
              <YouTubeCard key={`${v.url}-${i}`} {...v} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
