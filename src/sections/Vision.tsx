"use client";

/**
 * Vision Section (Extended)
 * - 화면 전역으로 퍼지는 다양한 3D 심볼 (Icosa / Torus / Knot / Octa / Ring)
 * - InstancedMesh 성능 튜닝, 네온 팔레트, 환경광/림라이트, 패럴랙스
 * - 텍스트는 인용하되 전문 톤으로 다듬음
 * - 커스텀 파라미터로 빠르게 분위기/성능 조정
 */

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

/* ================================
   🔧 Tunables (한 곳에서 조정)
================================ */
const CFG = {
  // 밀도(개수)
  density: {
    icosa: 48,
    torus: 44,
    knot: 36,
    octa: 34,
    ring: 30,
  },

  // 분포 범위 (전역 퍼짐 정도)
  spread: { x: 15, y: 7, z: 12 },

  // 부유/회전/패럴랙스 강도
  drift: 0.38,
  rotMin: 0.45,
  rotMax: 1.05,
  parallax: 0.55,

  // 재질/광원
  material: {
    metalness: 0.55,
    roughness: 0.25,
    emissive: "#0f0f0f",
    emissiveIntensity: 0.3,
    envMapIntensity: 1.25,
  },

  // 오버레이(가독성)
  vignette: { inner: 0.02, outer: 0.42 },

  // 성능
  throttle: 1, // 1=매 프레임, 2=격프레임 업데이트
  autoRotate: 0.35, // OrbitControls autoRotate 속도 (0 비활성)
};

// 네온 계열 팔레트 (눈에 띄는 포인트)
const PALETTE = ["#00f5ff", "#00ff85", "#ff3cac", "#ffd60a", "#6ea8fe"];

/* ================================
   🔬 유틸
================================ */
const randIn = (min: number, max: number) => Math.random() * (max - min) + min;
const choose = <T,>(arr: T[]) => arr[(Math.random() * arr.length) | 0];

function makeAttributes(count: number) {
  // 위치/회전/속도/위상/스케일/색 저장
  const pos = new Float32Array(count * 3);
  const rot = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 3);
  const scale = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    // 위치
    pos[i * 3 + 0] = (Math.random() * 2 - 1) * CFG.spread.x;
    pos[i * 3 + 1] = (Math.random() * 2 - 1) * CFG.spread.y;
    pos[i * 3 + 2] = (Math.random() * 2 - 1) * CFG.spread.z;

    // 회전 기본값
    rot[i * 3 + 0] = Math.random() * Math.PI;
    rot[i * 3 + 1] = Math.random() * Math.PI;
    rot[i * 3 + 2] = Math.random() * Math.PI;

    // seed: 속도/위상/회전속도
    seeds[i * 3 + 0] = randIn(0.6, 1.6); // float speed
    seeds[i * 3 + 1] = Math.random() * Math.PI * 2; // phase
    seeds[i * 3 + 2] = randIn(CFG.rotMin, CFG.rotMax); // rot speed

    // 스케일
    scale[i] = randIn(0.45, 0.95);

    // per-instance color
    c.set(choose(PALETTE));
    colors[i * 3 + 0] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  return { pos, rot, seeds, scale, colors };
}

/* ================================
   🧩 공통 인스턴스 렌더러
================================ */
type InstancedProps = {
  geometry: THREE.BufferGeometry;
  count: number;
  mouse: React.MutableRefObject<THREE.Vector2>;
};

function InstancedField({ geometry, count, mouse }: InstancedProps) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { pos, rot, seeds, scale, colors } = useMemo(
    () => makeAttributes(count),
    [count]
  );

  // 인스턴스 컬러 적용
  useEffect(() => {
    if (!mesh.current) return;

    mesh.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const colorAttr = new THREE.InstancedBufferAttribute(colors, 3);
    mesh.current.instanceColor = colorAttr;

    const instColor = mesh.current.instanceColor;
    if (instColor) {
      instColor.needsUpdate = true;
    }
  }, [colors]);

  // 업데이트 스로틀
  const tick = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (++tick.current % CFG.throttle !== 0) return;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;

      // 패럴랙스 + 부유
      const fx = pos[ix + 0] + Math.sin(t * seeds[ix + 0] + seeds[ix + 1]) * CFG.drift + mouse.current.x * CFG.parallax * 0.4;
      const fy = pos[ix + 1] + Math.cos(t * seeds[ix + 0] * 0.8 + seeds[ix + 1]) * (CFG.drift * 0.7) + mouse.current.y * CFG.parallax * 0.32;
      const fz = pos[ix + 2] + Math.sin(t * seeds[ix + 0] * 0.9 + seeds[ix + 1]) * (CFG.drift * 0.8);

      dummy.position.set(fx, fy, fz);

      const r = seeds[ix + 2];
      dummy.rotation.set(
        rot[ix + 0] + t * (r * 0.9),
        rot[ix + 1] + t * (r * 0.7),
        rot[ix + 2] + t * (r * 1.1)
      );

      const s = scale[i] * (0.9 + Math.abs(Math.sin(t * 0.5 + seeds[ix + 1])) * 0.25);
      dummy.scale.setScalar(s);

      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined as any, count]}>
      <meshStandardMaterial
        color="#ffffff" // instance color와 곱연산 되므로 흰색
        metalness={CFG.material.metalness}
        roughness={CFG.material.roughness}
        vertexColors
        envMapIntensity={CFG.material.envMapIntensity}
        emissive={new THREE.Color(CFG.material.emissive)}
        emissiveIntensity={CFG.material.emissiveIntensity}
      />
    </instancedMesh>
  );
}

/* ================================
   🎛️ 모양 묶음
================================ */
function ShapesField() {
  const mouse = useRef(new THREE.Vector2(0, 0));

  // 마우스 패럴랙스
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // 공유 지오메트리
  const geo = useMemo(
    () => ({
      icosa: new THREE.IcosahedronGeometry(0.7, 0),
      torus: new THREE.TorusGeometry(0.6, 0.18, 16, 90),
      knot: new THREE.TorusKnotGeometry(0.55, 0.14, 120, 10),
      octa: new THREE.OctahedronGeometry(0.7, 0),
      ring: new THREE.RingGeometry(0.42, 0.6, 48),
    }),
    []
  );

  return (
    <>
      <InstancedField geometry={geo.icosa} count={CFG.density.icosa} mouse={mouse} />
      <InstancedField geometry={geo.torus} count={CFG.density.torus} mouse={mouse} />
      <InstancedField geometry={geo.knot} count={CFG.density.knot} mouse={mouse} />
      <InstancedField geometry={geo.octa} count={CFG.density.octa} mouse={mouse} />
      <InstancedField geometry={geo.ring} count={CFG.density.ring} mouse={mouse} />
    </>
  );
}

/* ================================
   🌌 섹션
================================ */
export default function Vision() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] text-white">
      {/* Canvas 배경 */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          {/* 배경색 (순수 블랙보다 약간 밝게) */}
          <color attach="background" args={["#0a0a0a"]} />

          {/* 조명 */}
          <hemisphereLight intensity={0.9} groundColor={"#0a0a0a"} />
          <directionalLight position={[6, 5, 7]} intensity={1.55} color="#ffffff" />
          <directionalLight position={[-6, -3, -5]} intensity={0.6} color="#66ccff" />

          {/* 환경 HDR (반사 하이라이트) */}
          <Environment preset="city" />

          {/* 심볼 필드 */}
          <ShapesField />

          {/* 관찰자 회전 (원하면 0으로 꺼도 됨) */}
          {CFG.autoRotate > 0 && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate
              autoRotateSpeed={CFG.autoRotate}
            />
          )}
        </Canvas>
      </div>

      {/* 가독성 오버레이: 중앙 가볍게, 가장자리 어둡게 */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(60% 40% at 50% 42%, rgba(0,0,0,${CFG.vignette.inner}), rgba(0,0,0,${CFG.vignette.outer}))`,
          }}
        />
      </div>

      {/* 텍스트 컨텐츠 */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-28 text-center sm:py-36">
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-6 text-3xl font-bold sm:text-5xl"
          style={{ textShadow: "0 20px 45px rgba(0,0,0,.5), 0 6px 16px rgba(0,0,0,.35)" }}
        >
          데이터를 읽고, 원칙으로 운용하는
          <br className="hidden sm:block" />
          <span className="text-[#00ff85]"> 고도화된 분석 서비스</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg"
          style={{ textShadow: "0 12px 30px rgba(0,0,0,.45), 0 3px 8px rgba(0,0,0,.35)" }}
        >
          “깊이 있는 시장 분석과 최신 기술 트렌드를 바탕으로 자산을 안전하게 관리하며,
          <span className="text-white"> 리스크를 최소화하면서도</span> 높은 성과를 지향한다”는 원칙을 인용해
          BUNNY STOCK의 표준으로 재정의했습니다. 신호와 노이즈를 분리하고, 데이터가 말하는 근거로 전략을 설계합니다.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          viewport={{ once: true }}
          className="mx-auto mt-5 max-w-2xl text-sm text-white/70"
        >
          투명한 커뮤니케이션과 반복 가능한 프로세스로 신뢰를 축적합니다.
          장기 성장과 안정적 자산 증대를 위한 파트너십을 약속합니다.
        </motion.p>

        {/* 로딩 시 살짝 페이드 (Canvas 초기 깜빡임 완화) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </section>
  );
}
