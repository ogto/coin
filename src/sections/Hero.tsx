"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

import SubtleGrid from "@/components/SubtleGrid";
import LightBlobs from "@/components/LightBlobs";


/**
 * Light Hero
 * - 다크모드 없음. 밝은 톤만 사용.
 * - A(신뢰/담백) + C(신기술) 카피 믹스.
 * - 인터랙티브 tilt + R3F 부유 오브젝트.
 */

type FloatingKnotProps = { idx?: number };

function FloatingKnot({ idx = 0 }: FloatingKnotProps) {
  const mesh = useRef<
    THREE.Mesh<THREE.TorusKnotGeometry, THREE.MeshStandardMaterial>
  >(null);

  const speed = useMemo(() => 0.3 + Math.random() * 0.6, []);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const radius = useMemo(() => 1.0 + Math.random() * 2.0, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + phase;
    const x = Math.cos(t) * radius;
    const y = Math.sin(t * 0.8) * 0.5 + Math.sin(t * 0.35) * 0.15;
    const z = Math.sin(t) * (radius * 0.25);

    const m = mesh.current;
    if (!m) return;

    m.position.set(x, y, z);
    m.rotation.x += 0.01;
    m.rotation.y -= 0.008;
  });

  return (
    <mesh ref={mesh} castShadow receiveShadow>
      <torusKnotGeometry args={[0.14, 0.04, 120, 10]} />
      <meshStandardMaterial
        metalness={0.6}
        roughness={0.35}
        color={idx % 2 === 0 ? "#22d3ee" : "#34d399"} // cyan-400 / emerald-400
      />
    </mesh>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.12;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={1.0} />
      <directionalLight position={[4, 3, 6]} intensity={1.0} color="#e8fbff" />
      {Array.from({ length: 48 }).map((_, i) => (
        <FloatingKnot key={i} idx={i} />
      ))}
    </group>
  );
}

export default function Hero() {
  const [hover, setHover] = useState(false);

  // Pointer → tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rxBase: MotionValue<number> = useSpring(
    useTransform(y, [-80, 80], [8, -8]),
    { stiffness: 140, damping: 12 }
  );
  const ryBase: MotionValue<number> = useSpring(
    useTransform(x, [-80, 80], [-8, 8]),
    { stiffness: 140, damping: 12 }
  );

  const rxDeg: MotionValue<string> = useTransform(rxBase, (v) => `${v}deg`);
  const ryDeg: MotionValue<string> = useTransform(ryBase, (v) => `${v}deg`);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <div className="relative min-h-[92vh] w-full overflow-hidden bg-[#f7fafc] text-[#0b1220]">
      {/* Soft pastel background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(125,211,252,0.45), transparent), radial-gradient(60% 50% at 80% 30%, rgba(134,239,172,0.38), transparent)",
        }}
      />
      <LightBlobs />
      <SubtleGrid />
      <div
        className="pointer-events-none absolute inset-0 opacity-15 mix-blend-multiply"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<?xml version=\"1.0\"?><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.35\"/></svg>')",
        }}
      />

      {/* WebGL */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 4], fov: 60 }} gl={{ antialias: true }}>
          <Scene />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
        </Canvas>
      </div>

      {/* Content card */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-24 md:pt-28">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
            x.set(0);
            y.set(0);
          }}
          style={{ rotateX: rxDeg, rotateY: ryDeg }}
          className="w-full max-w-3xl rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/90 p-8 shadow-[0_10px_40px_rgba(15,23,42,0.12)] backdrop-blur"
        >
          <motion.div
            animate={{ scale: hover ? 1.01 : 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="space-y-5"
          >
            {/* 라벨: C 톤 */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(34,211,238,0.35)] bg-[rgba(34,211,238,0.16)] px-3 py-1 text-xs tracking-wide text-[#0b1220]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22d3ee]" />
              NEXT-GEN INVESTING
            </div>

            {/* 헤드라인: A+C 합성 */}
            <h1 className="text-pretty text-3xl font-semibold leading-tight sm:text-5xl">
              신뢰로 완성하는, 데이터 기반 코인 투자
            </h1>

            {/* 서브/본문: A의 담백함 + C의 기술감 */}
            <p className="text-balance text-sm/6 text-[rgba(11,18,32,0.72)] sm:text-base/7">
              AI 시그널과 온체인 인텔리전스로 한발 앞서 시장을 읽습니다.
              정교한 분석과 체계적 리스크 관리로, 변동성 속에서도 흔들리지 않는 결정을 돕습니다.
            </p>

            {/* CTA */}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:gap-4">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#34d399] px-5 py-3 text-sm font-semibold text-[#0b1220] shadow-md"
              >
                바로 체험하기
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                href="#whitepaper"
                className="inline-flex items-center justify-center rounded-xl border border-[rgba(15,23,42,0.08)] bg-white/90 px-5 py-3 text-sm font-semibold"
              >
                인사이트 샘플 받기
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* KPI strip (밝은 surface) */}
        <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {["온체인", "뉴스", "퀀트", "커뮤니티"].map((k, i) => (
            <div
              key={k}
              className="rounded-xl border border-[rgba(15,23,42,0.08)] bg-white/80 px-4 py-3 text-center text-xs"
            >
              <div className="font-medium">{k}</div>
              <div className="mt-1 text-lg font-semibold">
                {["12,457", "3.2ms", "+87%", "24/7"][i]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* bottom vignette */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
        style={{ background: "linear-gradient(to top, rgba(255,255,255,0.95), transparent)" }}
      />
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
  <div className="flex items-center gap-2 text-xs text-[#0b1220]/55">
    <span>Scroll</span>
    <span className="relative inline-block h-5 w-3 rounded-full border border-[#0b1220]/25">
      <span className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 animate-bounce rounded-full bg-[#0b1220]/40" />
    </span>
  </div>
</div>
    </div>
  );
}
