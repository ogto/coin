"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const CFG = {
  density: { icosa: 48, torus: 44, knot: 36, octa: 34, ring: 30 },
  spread: { x: 15, y: 7, z: 12 },
  drift: 0.38,
  rotMin: 0.45,
  rotMax: 1.05,
  parallax: 0.55,
  material: {
    metalness: 0.55,
    roughness: 0.25,
    emissive: "#0f0f0f",
    emissiveIntensity: 0.3,
    envMapIntensity: 1.25,
  },
  vignette: { inner: 0.02, outer: 0.42 },
  throttle: 1,
  autoRotate: 0.35,
};

const PALETTE = ["#00f5ff", "#00ff85", "#ff3cac", "#ffd60a", "#6ea8fe"];

const randIn = (min: number, max: number) => Math.random() * (max - min) + min;
const choose = <T,>(arr: T[]) => arr[(Math.random() * arr.length) | 0];

function makeAttributes(count: number) {
  const pos = new Float32Array(count * 3);
  const rot = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 3);
  const scale = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const c = new THREE.Color();

  for (let i = 0; i < count; i++) {
    pos[i * 3 + 0] = (Math.random() * 2 - 1) * CFG.spread.x;
    pos[i * 3 + 1] = (Math.random() * 2 - 1) * CFG.spread.y;
    pos[i * 3 + 2] = (Math.random() * 2 - 1) * CFG.spread.z;
    rot[i * 3 + 0] = Math.random() * Math.PI;
    rot[i * 3 + 1] = Math.random() * Math.PI;
    rot[i * 3 + 2] = Math.random() * Math.PI;
    seeds[i * 3 + 0] = randIn(0.6, 1.6);
    seeds[i * 3 + 1] = Math.random() * Math.PI * 2;
    seeds[i * 3 + 2] = randIn(CFG.rotMin, CFG.rotMax);
    scale[i] = randIn(0.45, 0.95);
    c.set(choose(PALETTE));
    colors[i * 3 + 0] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  return { pos, rot, seeds, scale, colors };
}

function InstancedField({ geometry, count, mouse }: any) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { pos, rot, seeds, scale, colors } = useMemo(() => makeAttributes(count), [count]);

  useEffect(() => {
    if (!mesh.current) return;
    mesh.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const colorAttr = new THREE.InstancedBufferAttribute(colors, 3);
    mesh.current.instanceColor = colorAttr;
    mesh.current.instanceColor!.needsUpdate = true;
  }, [colors]);

  const tick = useRef(0);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (++tick.current % CFG.throttle !== 0) return;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const fx =
        pos[ix + 0] +
        Math.sin(t * seeds[ix + 0] + seeds[ix + 1]) * CFG.drift +
        mouse.current.x * CFG.parallax * 0.4;
      const fy =
        pos[ix + 1] +
        Math.cos(t * seeds[ix + 0] * 0.8 + seeds[ix + 1]) * CFG.drift * 0.7 +
        mouse.current.y * CFG.parallax * 0.32;
      const fz =
        pos[ix + 2] +
        Math.sin(t * seeds[ix + 0] * 0.9 + seeds[ix + 1]) * CFG.drift * 0.8;
      dummy.position.set(fx, fy, fz);
      const r = seeds[ix + 2];
      dummy.rotation.set(
        rot[ix + 0] + t * r * 0.9,
        rot[ix + 1] + t * r * 0.7,
        rot[ix + 2] + t * r * 1.1
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
        color="#ffffff"
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

function ShapesField() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
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
          <color attach="background" args={["#0a0a0a"]} />
          <hemisphereLight intensity={0.9} groundColor={"#0a0a0a"} />
          <directionalLight position={[6, 5, 7]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-6, -3, -5]} intensity={0.6} color="#66ccff" />
          <Environment preset="city" />
          <ShapesField />
          {CFG.autoRotate > 0 && (
            <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={CFG.autoRotate} />
          )}
        </Canvas>
      </div>

      {/* 비네팅(시인성) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(60% 40% at 50% 42%, rgba(0,0,0,${CFG.vignette.inner}), rgba(0,0,0,${CFG.vignette.outer}))`,
          }}
        />
      </div>

      {/* 텍스트 컨텐츠 (가독성 강화) */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-6 text-3xl font-bold sm:text-5xl text-white"
          style={{
            textShadow: "0 20px 45px rgba(0,0,0,.55), 0 6px 16px rgba(0,0,0,.4)",
          }}
        >
          데이터를 읽고, 원칙으로 운용하는
          <br className="hidden sm:block" />
          <span className="text-[#00ff85] font-extrabold"> 고도화된 분석 서비스</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl mt-6 text-lg font-medium leading-relaxed text-white/95 sm:text-xl"
          style={{ textShadow: "0 12px 30px rgba(0,0,0,.5), 0 3px 8px rgba(0,0,0,.4)" }}
        >
          깊이 있는 시장 분석과 최신 기술 트렌드를 기반으로 데이터 중심의 인사이트를 제공합니다.
          Hae Gang은 신호와 노이즈를 구분하고, 데이터가 말하는 근거 위에서 전략적 판단을 설계합니다.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-2xl text-base font-medium text-white/85 leading-relaxed"
        >
          투명한 커뮤니케이션과 반복 가능한 프로세스를 통해 지속 가능한 성장과 신뢰를 쌓아갑니다.<br />
          장기적인 목표 달성을 위한 전문 파트너십을 약속합니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </section>
  );
}
