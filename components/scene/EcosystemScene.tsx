"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────
   EcosystemScene — prototype niveau 4 (WebGL réel).

   Un cœur sombre au centre (le métier du client), six satellites (les
   pièces de l'écosystème) qui arrivent de loin et se mettent en orbite
   à mesure qu'on défile, puis les liaisons se tracent entre eux. Une
   lumière suit le curseur. Aucune texture, aucun HDR : que des lumières
   et des matériaux, pour rester léger et hors réseau.

   `progress` (0 → 1) vient du scroll de la page hôte.
   ────────────────────────────────────────────────────────────────── */

interface SceneProps {
  progress: MotionValue<number>;
  reduceMotion: boolean;
}

const ELECTRIC = "#1A3BFF";
const INK = "#0d1117";

interface Satellite {
  label: string;
  /** Position finale sur l'orbite. */
  target: THREE.Vector3;
  /** Position de départ, dispersée loin du cœur. */
  start: THREE.Vector3;
  /** Décalage d'arrivée (0 → 1) pour que les pièces n'arrivent pas ensemble. */
  stagger: number;
}

const LABELS = ["WhatsApp", "Devis", "Relances", "CRM", "Contenu", "Rapports"];

function buildSatellites(): Satellite[] {
  const radius = 2.7;
  return LABELS.map((label, i) => {
    const angle = (i / LABELS.length) * Math.PI * 2 + 0.4;
    const y = Math.sin(i * 1.7) * 0.8;
    const target = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    const dir = target.clone().normalize();
    /* Départ : plus loin du cœur mais jamais entre lui et la caméra,
       sinon la pièce la plus proche remplit l'écran. */
    const start = dir.multiplyScalar(4.6 + (i % 3) * 0.6).add(new THREE.Vector3(0, (i % 2 ? 1 : -1) * 1.6, 0));
    return { label, target, start, stagger: i * 0.07 };
  });
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function Core({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const p = progress.get();
    const s = 0.55 + smooth(clamp01(p / 0.5)) * 0.45;
    if (group.current) group.current.scale.setScalar(s);
    if (wire.current) {
      wire.current.rotation.y = state.clock.elapsedTime * 0.12;
      wire.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });
  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={INK} metalness={0.65} roughness={0.28} />
      </mesh>
      <mesh ref={wire} scale={1.16}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color={ELECTRIC} wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function Satellites({ progress, satellites }: { progress: MotionValue<number>; satellites: Satellite[] }) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const lines = useRef<THREE.BufferGeometry | null>(null);

  /* Une géométrie unique pour toutes les liaisons : 6 segments cœur → satellite. */
  const positions = useMemo(() => new Float32Array(satellites.length * 2 * 3), [satellites.length]);

  useFrame(() => {
    const p = progress.get();
    satellites.forEach((s, i) => {
      const t = smooth(clamp01((p - s.stagger) / 0.55));
      const m = meshes.current[i];
      if (m) {
        m.position.lerpVectors(s.start, s.target, t);
        m.scale.setScalar(0.35 + t * 0.65);
      }
      const l = labels.current[i];
      if (l) l.style.opacity = String(clamp01((t - 0.75) / 0.25));
      /* Liaison : elle se trace du cœur vers le satellite entre 0.45 et 0.9. */
      const draw = smooth(clamp01((p - 0.45 - s.stagger * 0.6) / 0.4));
      const end = s.target.clone().multiplyScalar(draw);
      positions[i * 6 + 0] = 0;
      positions[i * 6 + 1] = 0;
      positions[i * 6 + 2] = 0;
      positions[i * 6 + 3] = end.x;
      positions[i * 6 + 4] = end.y;
      positions[i * 6 + 5] = end.z;
    });
    if (lines.current) {
      const attr = lines.current.getAttribute("position") as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
  });

  return (
    <>
      {satellites.map((s, i) => (
        <mesh
          key={s.label}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          position={s.start}
        >
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#ffffff" emissive={ELECTRIC} emissiveIntensity={0.35} metalness={0.2} roughness={0.35} />
          <Html center distanceFactor={8} position={[0, 0.5, 0]} style={{ pointerEvents: "none" }}>
            <div
              ref={(el) => {
                labels.current[i] = el;
              }}
              style={{
                opacity: 0,
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#111111",
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(17,17,17,0.10)",
                borderRadius: 999,
                padding: "4px 9px",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s",
              }}
            >
              {s.label}
            </div>
          </Html>
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry ref={lines}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={ELECTRIC} transparent opacity={0.55} />
      </lineSegments>
    </>
  );
}

/** Groupe qui tourne lentement et suit la caméra selon le scroll. */
function Rig({ progress, reduceMotion, children }: SceneProps & { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const { camera, pointer, viewport } = useThree();
  /* Portrait : on recule la caméra pour que l'orbite tienne dans la largeur. */
  const zoomOut = viewport.aspect < 0.7 ? 1.9 : viewport.aspect < 1 ? 1.6 : viewport.aspect < 1.3 ? 1.25 : 1;
  const targetZ = useRef(11 * zoomOut);

  useFrame((state, delta) => {
    const p = progress.get();
    if (group.current) {
      const idle = reduceMotion ? 0 : state.clock.elapsedTime * 0.08;
      group.current.rotation.y = idle + p * Math.PI * 0.6;
      group.current.rotation.x = 0.18 - p * 0.1;
      /* Paysage : la scène vit à droite du texte, pas dessous. */
      group.current.position.x = viewport.aspect > 1.3 ? 1.7 : 0;
    }
    /* Dolly : la caméra se rapproche quand l'écosystème s'assemble. */
    targetZ.current = (11 - smooth(p) * 4) * zoomOut;
    camera.position.z += (targetZ.current - camera.position.z) * Math.min(1, delta * 4);
    /* Lumière qui suit le curseur. */
    if (light.current) {
      light.current.position.x += (pointer.x * 4 - light.current.position.x) * Math.min(1, delta * 5);
      light.current.position.y += (pointer.y * 3 + 1 - light.current.position.y) * Math.min(1, delta * 5);
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <directionalLight position={[-5, -2, -4]} intensity={0.5} color="#b9c8ff" />
      <pointLight ref={light} position={[0, 1, 4]} intensity={18} color={ELECTRIC} distance={12} decay={2} />
      <group ref={group}>{children}</group>
    </>
  );
}

export default function EcosystemScene({ progress, reduceMotion }: SceneProps) {
  const satellites = useMemo(buildSatellites, []);
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 11], fov: 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Rig progress={progress} reduceMotion={reduceMotion}>
        <Core progress={progress} />
        <Satellites progress={progress} satellites={satellites} />
      </Rig>
    </Canvas>
  );
}
