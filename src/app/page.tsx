"use client";

import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import Vision from "@/sections/Vision";
import Youtube from "@/sections/Youtube";
import Consult from "@/sections/Consult";

import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="flex flex-col bg-[#f7fafc] text-[#0b1220]">

      <Header />
      {/* HERO */}
      <Hero />
      {/* VISION */}
      <Vision />
      {/* YOUTUBE */}
      <Youtube
        title="유튜브"
        subtitle="데이터로 해석한 시장 관점과 전략을 영상으로 제공합니다."
        channelLink="https://www.youtube.com/@한방닥터이글스" // 선택
        videos={[
          { url: "https://www.youtube.com/watch?v=kPadF1XeVFo", title: "코인투자 어떻게 해야될까?" },
          { url: "https://www.youtube.com/watch?v=uq7w-UJF0sE&t=169s", title: "차트 보는방법" },
          { url: "https://www.youtube.com/watch?v=8iBS7INut8Y", title: "불장에 대처하기" },
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
