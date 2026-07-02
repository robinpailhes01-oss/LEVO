"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useInView,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
  /** Reflet lumineux qui suit le curseur (desktop). */
  glare?: boolean;
  /** Balayage lumineux joué une fois quand la card entre à l'écran (visible mobile). */
  sweep?: boolean;
  /** Tilt au gyroscope sur mobile (demande la permission iOS au premier toucher). */
  gyro?: boolean;
}

export function TiltCard({
  children,
  className,
  style,
  intensity = 8,
  glare = false,
  sweep = false,
  gyro = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const glareSpringO = useSpring(glareOpacity, { stiffness: 200, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-intensity, intensity]);

  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.55), rgba(255,255,255,0.10) 45%, transparent 70%)`;

  // ── Gyroscope (mobile) ────────────────────────────────────────────
  const gyroHandler = useRef<((e: DeviceOrientationEvent) => void) | null>(null);
  const gyroArmed = useRef(false);

  function attachGyro() {
    if (gyroHandler.current) return;
    const handler = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // gauche/droite (−90 → 90)
      const beta = e.beta ?? 0; // avant/arrière ; ~40° = tenue naturelle
      x.set(Math.max(-0.5, Math.min(0.5, gamma / 60)));
      y.set(Math.max(-0.5, Math.min(0.5, (beta - 40) / 60)));
    };
    gyroHandler.current = handler;
    window.addEventListener("deviceorientation", handler);
  }

  function enableGyro() {
    if (!gyro || gyroArmed.current) return;
    gyroArmed.current = true;
    const DOE = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof DOE?.requestPermission === "function") {
      // iOS 13+ : permission requise, déclenchée par le geste de l'utilisateur
      DOE.requestPermission()
        .then((state) => {
          if (state === "granted") attachGyro();
        })
        .catch(() => {
          /* refusé : on reste sans gyro */
        });
    } else {
      attachGyro();
    }
  }

  useEffect(() => {
    return () => {
      if (gyroHandler.current) {
        window.removeEventListener("deviceorientation", gyroHandler.current);
      }
    };
  }, []);

  // ── Souris (desktop) ──────────────────────────────────────────────
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchStart={enableGyro}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        position: "relative",
        ...style,
      }}
      className={className}
    >
      {children}

      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: glareBackground,
            opacity: glareSpringO,
            borderRadius: "inherit",
            mixBlendMode: "soft-light",
            zIndex: 2,
          }}
        />
      )}

      {sweep && inView && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ borderRadius: "inherit", zIndex: 2 }}
        >
          <motion.div
            className="absolute inset-y-0 w-1/3"
            style={{
              background:
                "linear-gradient(100deg, transparent, rgba(255,255,255,0.45) 50%, transparent)",
              filter: "blur(2px)",
              mixBlendMode: "soft-light",
            }}
            initial={{ x: "-150%" }}
            animate={{ x: "450%" }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
          />
        </div>
      )}
    </motion.div>
  );
}
