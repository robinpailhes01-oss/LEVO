"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid, Html, RoundedBox } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { WAYPOINTS, cameraParam, clamp01, local, presence, smooth } from "./track";

/* ──────────────────────────────────────────────────────────────────
   Le monde : une seule scène, une seule caméra qui voyage.
   Six lieux posés dans l'espace, la caméra glisse de l'un à l'autre
   selon la piste (track.ts). Rien ne s'épingle : la scène est fixe,
   le scroll ne déplace que la caméra et l'état des objets.

   Crème lumineux : le canvas est transparent sur la crème de la page,
   les objets sont bleu nuit et bleu électrique, la lumière est blanche.
   ────────────────────────────────────────────────────────────────── */

const INK = "#0d1117";
const ELECTRIC = "#1A3BFF";
const SOFT = "#4D8FFF";

export interface WorldProps {
  progress: MotionValue<number>;
  message: string;
  reduceMotion: boolean;
  mobile: boolean;
  /** Le prospect a validé son message : la bulle porte son texte. */
  sent: boolean;
}

const V = (a: [number, number, number]) => new THREE.Vector3(...a);

/* ── Caméra ────────────────────────────────────────────────────────── */
function Rig({ progress, reduceMotion, mobile }: Pick<WorldProps, "progress" | "reduceMotion" | "mobile">) {
  const { camera, pointer } = useThree();
  const targets = useMemo(() => WAYPOINTS.map((w) => V(w.pos)), []);
  const cams = useMemo(() => WAYPOINTS.map((w) => V(w.pos).add(V(w.cam))), []);
  const look = useRef(new THREE.Vector3());
  const tmpA = useRef(new THREE.Vector3());
  const tmpB = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const p = progress.get();
    const u = cameraParam(p);
    const i = Math.min(WAYPOINTS.length - 2, Math.floor(u));
    const t = u - i;
    const zmA = WAYPOINTS[i].zoomMobile ?? 1;
    const zmB = WAYPOINTS[i + 1].zoomMobile ?? 1;
    const zoom = mobile ? 1.45 * (zmA + (zmB - zmA) * t) : 1;

    /* Position : ligne entre deux stations, bombée vers le haut pour lire
       comme un survol, pas comme un rail. */
    tmpA.current.lerpVectors(cams[i], cams[i + 1], t);
    tmpA.current.y += Math.sin(t * Math.PI) * 2.2;
    /* Recul mobile : on écarte la caméra de sa cible pour garder le cadre. */
    tmpB.current.lerpVectors(targets[i], targets[i + 1], t);
    if (zoom !== 1) tmpA.current.sub(tmpB.current).multiplyScalar(zoom).add(tmpB.current);
    /* La visée laisse la place au texte : l'objet vit à côté, pas dessous. */
    const sa = mobile ? WAYPOINTS[i].sideMobile : WAYPOINTS[i].side;
    const sb = mobile ? WAYPOINTS[i + 1].sideMobile : WAYPOINTS[i + 1].side;
    tmpB.current.x -= sa[0] + (sb[0] - sa[0]) * t;
    tmpB.current.y -= sa[1] + (sb[1] - sa[1]) * t;

    /* Le cœur : dolly pendant la tenue, on s'approche en lisant. */
    const l2 = local(2, p);
    if (l2 > 0 && l2 < 1 && u === 2) {
      const dir = tmpA.current.clone().sub(targets[2]).normalize();
      tmpA.current.copy(targets[2]).add(dir.multiplyScalar(9 * zoom - smooth(l2) * 3 * zoom));
    }

    /* Parallaxe au curseur : le monde bouge, pas une carte. Une seule fois,
       et jamais sur mobile ni en mouvement réduit. */
    if (!reduceMotion && !mobile) {
      tmpA.current.x += pointer.x * 0.35;
      tmpA.current.y += pointer.y * 0.25;
    }

    camera.position.lerp(tmpA.current, Math.min(1, delta * 6));
    look.current.lerp(tmpB.current, Math.min(1, delta * 6));
    camera.lookAt(look.current);
  });
  return null;
}

/* ── Lieu 1 : le comptoir ──────────────────────────────────────────── */
function Comptoir({ progress }: { progress: MotionValue<number> }) {
  const w = WAYPOINTS[0];
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const l = local(0, progress.get());
    group.current.rotation.y = 0.32 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03 - l * 0.12;
    group.current.rotation.x = 0.08;
  });
  return (
    <group position={w.pos} ref={group}>
      <RoundedBox args={[1.3, 2.6, 0.12]} radius={0.14} smoothness={6}>
        <meshStandardMaterial color={INK} metalness={0.5} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[1.14, 2.4]} />
        <meshBasicMaterial color="#f7f6f2" />
      </mesh>
      {/* Fils de messages précédents : lignes grises sur l'écran */}
      {[-0.7, -0.42, -0.14, 0.14, 0.42].map((y, i) => (
        <mesh key={y} position={[i % 2 ? 0.2 : -0.2, y, 0.085]}>
          <planeGeometry args={[0.6, 0.12]} />
          <meshBasicMaterial color={i % 2 ? ELECTRIC : "#e4e1d8"} transparent opacity={i % 2 ? 0.85 : 1} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Lieu 2 : la coulée ────────────────────────────────────────────── */
function Coulee({ progress, reduceMotion, mobile }: Pick<WorldProps, "progress" | "reduceMotion" | "mobile">) {
  const w = WAYPOINTS[1];
  const count = mobile ? 140 : 320;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const cavity = useRef<THREE.Mesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cavityMap = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
      g.addColorStop(0, "rgba(13,17,23,1)");
      g.addColorStop(0.55, "rgba(13,17,23,0.85)");
      g.addColorStop(1, "rgba(13,17,23,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        a: (i / count) * Math.PI * 2 * 7.3,
        r: 0.8 + (i % 17) * 0.2,
        y: (i * 0.37) % 14,
        s: 0.7 + (i % 5) * 0.12,
        v: 0.6 + (i % 7) * 0.09,
        rot: (i % 9) * 0.1,
      })),
    [count],
  );

  useFrame((state) => {
    const p = progress.get();
    const pr = presence(1, p);
    const l = local(1, p);
    const t = reduceMotion ? 0 : state.clock.elapsedTime;
    if (mesh.current) {
      seeds.forEach((s, i) => {
        const fall = ((s.y + t * s.v + l * 6) % 14) - 7;
        dummy.position.set(Math.cos(s.a) * s.r, -fall, Math.sin(s.a) * s.r * 0.5 - 1.2);
        dummy.rotation.set(0, s.rot, 0);
        const fade = clamp01(1 - Math.abs(fall) / 7) * pr;
        dummy.scale.setScalar(s.s * (0.4 + fade * 0.6));
        dummy.updateMatrix();
        mesh.current!.setMatrixAt(i, dummy.matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
      (mesh.current.material as THREE.MeshStandardMaterial).opacity = 0.9 * pr;
    }
    if (cavity.current) {
      (cavity.current.material as THREE.MeshBasicMaterial).opacity = smooth(clamp01(l / 0.6)) * pr * 0.94;
    }
  });

  return (
    <group position={w.pos}>
      {/* La cavité : la lumière baisse quand on descend (dégradé radial, sans bord) */}
      <mesh ref={cavity} position={[0, -1, -6]}>
        <planeGeometry args={[18, 18]} />
        <meshBasicMaterial map={cavityMap} transparent opacity={0} depthWrite={false} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.4, 0.19, 0.05]} />
        <meshStandardMaterial color="#d7dbe4" transparent opacity={0} roughness={0.8} />
      </instancedMesh>
    </group>
  );
}

/* ── Lieu 3 : le cœur (pic) ─────────────────────────────────────────── */
const LABELS = ["WhatsApp", "Devis", "Relances", "CRM", "Contenu", "Rapports"];

function Coeur({ progress, reduceMotion, mobile }: Pick<WorldProps, "progress" | "reduceMotion" | "mobile">) {
  const w = WAYPOINTS[2];
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const sats = useRef<(THREE.Mesh | null)[]>([]);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const lines = useRef<THREE.BufferGeometry | null>(null);
  const { pointer } = useThree();

  const satellites = useMemo(() => {
    const radius = 2.9;
    return LABELS.map((label, i) => {
      const angle = (i / LABELS.length) * Math.PI * 2 + 0.4;
      const y = Math.sin(i * 1.7) * 0.9;
      const target = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      const start = target.clone().normalize().multiplyScalar(5 + (i % 3) * 0.7).add(new THREE.Vector3(0, (i % 2 ? 1 : -1) * 2, 0));
      return { label, target, start, stagger: i * 0.06 };
    });
  }, []);
  const positions = useMemo(() => new Float32Array(satellites.length * 6), [satellites.length]);

  useFrame((state) => {
    const p = progress.get();
    const pr = presence(2, p);
    const l = local(2, p);
    const t = reduceMotion ? 0 : state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.06 + l * 0.9;
    if (core.current) core.current.scale.setScalar(0.5 + smooth(clamp01(l / 0.45)) * 0.5);
    if (wire.current) {
      wire.current.rotation.y = t * 0.12;
      (wire.current.material as THREE.MeshBasicMaterial).opacity = 0.25 * pr;
    }
    satellites.forEach((s, i) => {
      const k = smooth(clamp01((l - 0.15 - s.stagger) / 0.5));
      const m = sats.current[i];
      if (m) {
        m.position.lerpVectors(s.start, s.target, k);
        m.scale.setScalar((0.3 + k * 0.7) * pr);
      }
      const el = labels.current[i];
      if (el) el.style.opacity = String(clamp01((k - 0.7) / 0.3) * pr);
      const draw = smooth(clamp01((l - 0.5 - s.stagger * 0.7) / 0.35));
      const end = s.target.clone().multiplyScalar(draw);
      positions.set([0, 0, 0, end.x, end.y, end.z], i * 6);
    });
    if (lines.current) (lines.current.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    if (light.current) {
      const px = reduceMotion || mobile ? 0 : pointer.x;
      const py = reduceMotion || mobile ? 0 : pointer.y;
      light.current.position.x += (px * 4 - light.current.position.x) * 0.08;
      light.current.position.y += (py * 3 + 1 - light.current.position.y) * 0.08;
      light.current.intensity = 26 * pr;
    }
  });

  return (
    <group position={w.pos}>
      <pointLight ref={light} position={[0, 1, 4]} intensity={0} color={ELECTRIC} distance={14} decay={2} />
      <group ref={group}>
        <group ref={core}>
          <mesh>
            <sphereGeometry args={[1.05, 64, 64]} />
            <meshStandardMaterial color={INK} metalness={0.65} roughness={0.28} />
          </mesh>
          <mesh ref={wire} scale={1.16}>
            <icosahedronGeometry args={[1.05, 2]} />
            <meshBasicMaterial color={ELECTRIC} wireframe transparent opacity={0} />
          </mesh>
        </group>
        {satellites.map((s, i) => (
          <mesh
            key={s.label}
            ref={(el) => {
              sats.current[i] = el;
            }}
            position={s.start}
          >
            <sphereGeometry args={[0.24, 32, 32]} />
            <meshStandardMaterial color="#ffffff" emissive={ELECTRIC} emissiveIntensity={0.3} metalness={0.2} roughness={0.35} />
            <Html center distanceFactor={8} position={[0, 0.55, 0]} style={{ pointerEvents: "none" }}>
              <div
                ref={(el) => {
                  labels.current[i] = el;
                }}
                className="rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em]"
                style={{ opacity: 0, background: "rgba(255,255,255,0.85)", border: "1px solid rgba(17,17,17,0.10)", color: "#111111", whiteSpace: "nowrap" }}
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
      </group>
    </group>
  );
}

/* ── Lieu 4 : l'atelier ────────────────────────────────────────────── */
function Atelier({ progress, reduceMotion }: Pick<WorldProps, "progress" | "reduceMotion">) {
  const w = WAYPOINTS[3];
  const flap = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const timer = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const TICKS = 40;

  useFrame((state) => {
    const p = progress.get();
    const l = local(3, p);
    const t = reduceMotion ? 0 : state.clock.elapsedTime;
    /* Le devis se plie : la moitié haute se rabat sur la basse */
    if (flap.current) flap.current.rotation.x = -Math.PI * smooth(clamp01((l - 0.1) / 0.45)) * 0.98;
    /* Le CRM tourne : quatre colonnes en carrousel */
    if (ring.current) ring.current.rotation.y = t * 0.15 + smooth(l) * Math.PI * 0.75;
    /* La relance s'arme : l'arc se remplit */
    if (timer.current) {
      const lit = Math.floor(smooth(clamp01((l - 0.3) / 0.6)) * TICKS);
      for (let i = 0; i < TICKS; i += 1) {
        const a = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
        dummy.position.set(Math.cos(a) * 1.1, Math.sin(a) * 1.1, 0);
        dummy.rotation.set(0, 0, a);
        dummy.scale.setScalar(i < lit ? 1 : 0.35);
        dummy.updateMatrix();
        timer.current.setMatrixAt(i, dummy.matrix);
      }
      timer.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={w.pos}>
      {/* Le devis : deux feuilles jointes */}
      <group position={[-3.6, 0, 0]} rotation={[-0.2, 0.3, 0]}>
        <mesh position={[0, -0.9, 0]}>
          <planeGeometry args={[2, 1.8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
        <group ref={flap} position={[0, 0, 0]}>
          <mesh position={[0, 0.9, 0]}>
            <planeGeometry args={[2, 1.8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} side={THREE.DoubleSide} />
          </mesh>
          {[0.5, 0.9, 1.3].map((y) => (
            <mesh key={y} position={[-0.3, y, 0.01]}>
              <planeGeometry args={[1.1, 0.07]} />
              <meshBasicMaterial color="#c9c5ba" side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
        <mesh position={[0.45, -1.5, 0.01]}>
          <planeGeometry args={[0.7, 0.09]} />
          <meshBasicMaterial color={ELECTRIC} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Le CRM : quatre colonnes en ronde */}
      <group ref={ring} position={[0.6, 0, 0]}>
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2;
          return (
            <group key={i} position={[Math.cos(a) * 1.7, 0, Math.sin(a) * 1.7]} rotation={[0, -a + Math.PI / 2, 0]}>
              <RoundedBox args={[1.1, 2.3, 0.1]} radius={0.08} smoothness={4}>
                <meshStandardMaterial color={i === 1 ? ELECTRIC : INK} metalness={0.4} roughness={0.4} />
              </RoundedBox>
              {[0.6, 0.15, -0.3].map((y, j) => (
                <mesh key={j} position={[0, y, 0.06]}>
                  <planeGeometry args={[0.8, 0.22]} />
                  <meshBasicMaterial color="#ffffff" transparent opacity={0.16 + j * 0.08} />
                </mesh>
              ))}
            </group>
          );
        })}
      </group>

      {/* La relance : un cadran qui se remplit */}
      <group position={[3.6, 0.2, 0]}>
        <mesh>
          <ringGeometry args={[0.98, 1.0, 64]} />
          <meshBasicMaterial color={INK} transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
        <instancedMesh ref={timer} args={[undefined, undefined, TICKS]}>
          <boxGeometry args={[0.1, 0.22, 0.06]} />
          <meshStandardMaterial color={ELECTRIC} />
        </instancedMesh>
        <mesh>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial color={INK} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Lieu 5 : le tableau ───────────────────────────────────────────── */
function Tableau({ progress }: { progress: MotionValue<number> }) {
  const w = WAYPOINTS[4];
  const panel = useRef<THREE.Group>(null);
  const kpis = useRef<HTMLDivElement>(null);
  useFrame(() => {
    const p = progress.get();
    const l = local(4, p);
    if (panel.current) panel.current.rotation.y = -0.18 + smooth(l) * 0.18;
    if (kpis.current) kpis.current.style.opacity = String(smooth(clamp01((l - 0.05) / 0.35)));
  });
  return (
    <group position={w.pos} ref={panel}>
      <RoundedBox args={[5.6, 3.3, 0.16]} radius={0.2} smoothness={6}>
        <meshStandardMaterial color={INK} metalness={0.5} roughness={0.35} />
      </RoundedBox>
      <Html transform position={[0, 0, 0.09]} distanceFactor={3.7} style={{ pointerEvents: "none" }}>
        <div ref={kpis} style={{ width: 560, opacity: 0 }} className="p-8">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.45)" }}>
              Harmonie Yacht · cas réel
            </p>
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "#2ECC71" }} />
              24/7
            </span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.08)" }}>
            {[
              ["40 h+", "rendues chaque mois"],
              ["3×", "plus de devis envoyés"],
              ["0", "demande oubliée"],
            ].map(([v, l]) => (
              <div key={l} className="px-4 py-4" style={{ background: INK }}>
                <p className="font-serif text-[2.4rem] font-medium italic leading-none text-white">{v}</p>
                <p className="mt-2 font-body text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {l}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 font-body text-[12px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            Un an d&apos;agents en production, chiffres du client.
          </p>
        </div>
      </Html>
    </group>
  );
}

/* ── Lieu 6 : l'arrivée ────────────────────────────────────────────── */
function Arrivee({ progress }: { progress: MotionValue<number> }) {
  const w = WAYPOINTS[5];
  const lamp = useRef<THREE.PointLight>(null);
  useFrame(() => {
    const l = local(5, progress.get());
    if (lamp.current) lamp.current.intensity = 6 + smooth(l) * 22;
  });
  return (
    <group position={w.pos}>
      <RoundedBox args={[9, 0.35, 5]} radius={0.12} smoothness={4} position={[0, -1.4, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </RoundedBox>
      <pointLight ref={lamp} position={[2.5, 3.5, 2]} intensity={6} color="#ffd9a8" distance={16} decay={2} />
      {/* Un carnet, un stylo : le bureau est habité, sans décor */}
      <RoundedBox args={[1.6, 0.06, 2.1]} radius={0.03} position={[-2.6, -1.19, 0.4]} rotation={[0, 0.25, 0]}>
        <meshStandardMaterial color={INK} roughness={0.6} />
      </RoundedBox>
      <mesh position={[-1.4, -1.18, 1.1]} rotation={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 12]} />
        <meshStandardMaterial color={ELECTRIC} metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ── La bulle du visiteur : le mouvement signature ─────────────────── */
function Bubble({ progress, message, sent }: Pick<WorldProps, "progress" | "message" | "sent">) {
  const carrier = useRef<THREE.Group>(null);
  const el = useRef<HTMLDivElement>(null);
  const keys = useMemo(() => {
    const W = WAYPOINTS.map((w) => V(w.pos));
    return [
      W[0].clone().add(new THREE.Vector3(1.15, 1.35, 0.5)), // au-dessus du téléphone
      W[1].clone().add(new THREE.Vector3(0, 2.6, 1.5)), // suspendue au-dessus de la coulée
      W[2].clone().add(new THREE.Vector3(0, 0, 1.4)), // dans le cœur
      W[3].clone().add(new THREE.Vector3(-3.6, -0.9, 0.4)), // sur le devis
      W[4].clone().add(new THREE.Vector3(-2.2, -2.3, 1.2)), // devant le tableau
      W[5].clone().add(new THREE.Vector3(0.8, -1.05, 0.6)), // posée sur le bureau
    ];
  }, []);
  const tmp = useRef(new THREE.Vector3());

  useFrame((state) => {
    const p = progress.get();
    const u = cameraParam(p);
    const i = Math.min(keys.length - 2, Math.floor(u));
    const t = u - i;
    tmp.current.lerpVectors(keys[i], keys[i + 1], t);
    /* Le trajet vers le cœur : la bulle plonge un peu plus vite que la caméra */
    if (i === 1) tmp.current.y -= Math.sin(t * Math.PI) * 1.5;
    /* Dans le cœur, elle orbite avec les satellites */
    const l2 = local(2, p);
    if (u === 2) {
      const a = state.clock.elapsedTime * 0.5 + l2 * 3;
      tmp.current.x += Math.cos(a) * 0.9 * smooth(clamp01(l2 / 0.3));
      tmp.current.z += Math.sin(a) * 0.9 * smooth(clamp01(l2 / 0.3));
    }
    if (carrier.current) carrier.current.position.lerp(tmp.current, 0.18);
    if (el.current) {
      const l0 = local(0, p);
      el.current.style.opacity = String(clamp01(l0 / 0.25));
      el.current.style.transform = `scale(${u === 5 ? 1.05 : 1})`;
    }
  });

  const text = sent && message.trim() ? message.trim() : "Bonsoir, vous avez de la place le 15 août pour 6 personnes ?";

  return (
    <group ref={carrier} position={keys[0]}>
      <Html center distanceFactor={5.2} style={{ pointerEvents: "none" }}>
        <div ref={el} className="w-[220px] rounded-2xl rounded-bl-[6px] px-4 py-3 shadow-[0_18px_40px_rgba(17,17,17,0.18)] transition-transform" style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.08)", opacity: 0 }}>
          <p className="font-body text-[13px] leading-snug" style={{ color: "#111111" }}>
            {text}
          </p>
          <p className="mt-1 font-mono text-[9px] tracking-[0.1em]" style={{ color: "rgba(17,17,17,0.4)" }}>
            22:47 · {sent ? "VOTRE DEMANDE" : "EXEMPLE"}
          </p>
        </div>
      </Html>
    </group>
  );
}

export default function World(props: WorldProps) {
  const { progress, reduceMotion, mobile } = props;
  const first = WAYPOINTS[0];
  return (
    <Canvas
      dpr={mobile ? [1, 1.25] : [1, 1.6]}
      camera={{ position: [first.pos[0] + first.cam[0], first.pos[1] + first.cam[1], first.pos[2] + first.cam[2]], fov: 38, near: 0.1, far: 120 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[8, 12, 10]} intensity={1.5} />
      <directionalLight position={[-6, -4, -8]} intensity={0.45} color="#b9c8ff" />
      <Grid
        position={[0, -17, -10]}
        args={[200, 200]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#d9d5ca"
        sectionSize={6}
        sectionThickness={1}
        sectionColor="#c9c4b6"
        fadeDistance={70}
        fadeStrength={1.4}
        infiniteGrid
      />
      <Rig progress={progress} reduceMotion={reduceMotion} mobile={mobile} />
      <Comptoir progress={progress} />
      <Coulee progress={progress} reduceMotion={reduceMotion} mobile={mobile} />
      <Coeur progress={progress} reduceMotion={reduceMotion} mobile={mobile} />
      <Atelier progress={progress} reduceMotion={reduceMotion} />
      <Tableau progress={progress} />
      <Arrivee progress={progress} />
      <Bubble progress={progress} message={props.message} sent={props.sent} />
    </Canvas>
  );
}
