"use client";

import Hero from "@/sections/Hero";
import Vision from "@/sections/Vision";
import Youtube from "@/sections/Youtube";
import InsightCarouselSection from "@/sections/InsightCarousel";
import Consult from "@/sections/Consult";

import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="flex flex-col bg-[#f7fafc] text-[#0b1220]">

      {/* HERO */}
      <Hero />
      {/* VISION */}
      <Vision />
      <InsightCarouselSection />
      {/* YOUTUBE */}
      <Youtube
        title="유튜브"
        subtitle="데이터로 해석한 시장 관점과 전략을 영상으로 제공합니다."
        channelLink="https://www.youtube.com/@한방닥터이글스" // 선택
        videos={[
          { url: "https://youtu.be/1Ao6aXqO_ko?si=U8YOcc80SSQIh3nB", title: "" },
          { url: "https://youtu.be/x2YKREvhkVQ?si=08l4PNDP-zmcaoKp", title: "" },
          { url: "https://www.youtube.com/watch?v=9ByaU1_lut4&t=22s", title: "" },
          // { url: "https://www.youtube.com/watch?v=mVYv3PgPIIE&feature=youtu.be", title: "" },
          // 필요 개수만큼 추가
        ]}
      />
      {/* CONSULT */}
      <Consult
        posts={[
          { id: 1, title: "Jon***님의 상담신청이 접수되었습니다.", date: "2025.07.22" },
          { id: 2, title: "P***님의 상담신청이 접수되었습니다.", date: "2025.06.17" },
          { id: 3, title: "Mike S**n W***님의 상담신청이 접수되었습니다.", date: "2025.05.14" },
          { id: 4, title: "bar***님의 상담신청이 접수되었습니다.", date: "2025.05.13" },
          { id: 5, title: "배나**님의 상담신청이 접수되었습니다.", date: "2025.05.02" },
        ]}
      />
    </main>
  );
}
