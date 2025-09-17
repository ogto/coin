"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef, useState, MouseEvent } from "react";

function FloatingCoin({ idx = 0 }: { idx?: number }) {
  // 정확한 타입 지정 (지오메트리/머티리얼 제네릭은 옵션)
  const mesh = useRef<THREE.Mesh<THREE.TorusKnotGeometry, THREE.MeshStandardMaterial>>(null);

  const speed = useMemo(() => 0.3 + Math.random() * 0.6, []);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const radius = useMemo(() => 1.2 + Math.random() * 2.2, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + phase;
    const x = Math.cos(t) * radius;
    const y = Math.sin(t * 0.8) * 0.6 + Math.sin(t * 0.35) * 0.2;
    const z = Math.sin(t) * (radius * 0.3);

    const m = mesh.current;
    if (!m) return;

    m.position.set(x, y, z);
    m.rotation.x += 0.01;
    m.rotation.y -= 0.008;
  });

  return (
    <mesh ref={mesh} castShadow receiveShadow>
      <torusKnotGeometry args={[0.12 + Math.random() * 0.08, 0.035, 100, 8]} />
      <meshStandardMaterial
        metalness={0.85}
        roughness={0.15}
        color={idx % 2 ? "#00E5FF" : "#00F5A0"}
      />
    </mesh>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.15;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 3, 5]} intensity={0.8} />
      {Array.from({ length: 22 }).map((_, i) => (
        <FloatingCoin key={i} idx={i} />
      ))}
    </group>
  );
}

export default function CryptoInteractiveHero() {
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-75, 75], [8, -8]), {
    stiffness: 140,
    damping: 12,
  });
  const ry = useSpring(useTransform(x, [-75, 75], [-8, 8]), {
    stiffness: 140,
    damping: 12,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <div className="relative min-h-[92vh] w-full overflow-hidden bg-[#05070B] text-white">
      {/* Gradient + noise background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,245,160,0.15),transparent),radial-gradient(60%_50%_at_80%_30%,rgba(0,229,255,0.12),transparent)]" />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-30"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<?xml version=\"1.0\"?><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.35\"/></svg>')",
        }}
      />

      {/* WebGL background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 4], fov: 60 }} gl={{ antialias: true }}>
          <Scene />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-24 md:pt-28">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
            x.set(0);
            y.set(0);
          }}
          style={{ rotateX: rx as any, rotateY: ry as any }}
          className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur"
        >
          <motion.div
            animate={{ scale: hover ? 1.01 : 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs tracking-wide">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              REAL-TIME INSIGHTS
            </div>
            <h1 className="text-pretty text-3xl font-semibold leading-tight sm:text-5xl">
              코인 투자 인텔리전스의 새로운 기준
            </h1>
            <p className="text-balance text-sm/6 text-white/80 sm:text-base/7">
              온체인 데이터, 뉴스 시그널, 퀀트 인디케이터를 한 눈에. 신기술 감성의 인터랙션과 함께
              시장의 맥을 정확히 짚어주는 고급형 인트로 페이지.
            </p>
            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:gap-4">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-black shadow-md shadow-emerald-500/20"
              >
                데모 살펴보기
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                href="#"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
              >
                화이트페이퍼
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* KPI strip */}
        <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {["온체인", "뉴스", "퀀트", "커뮤니티"].map((k, i) => (
            <div
              key={k}
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-center text-xs text-white/75"
            >
              {k}
              <div className="mt-1 text-lg font-semibold text-white">
                {["12,457", "3.2ms", "+87%", "24/7"][i]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* bottom vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#05070B] to-transparent" />
    </div>
  );
}
