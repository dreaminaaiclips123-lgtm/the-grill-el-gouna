"use client";

import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  life: number;
  maxLife: number;
  wobble: number;
};

export function EmberField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      // Static ambient glow, no animation loop.
      const gradient = ctx.createRadialGradient(
        width * 0.7,
        height * 0.8,
        0,
        width * 0.7,
        height * 0.8,
        Math.max(width, height) * 0.6
      );
      gradient.addColorStop(0, "rgba(220, 120, 60, 0.18)");
      gradient.addColorStop(1, "rgba(220, 120, 60, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      return () => window.removeEventListener("resize", resize);
    }

    const embers: Ember[] = Array.from({ length: 34 }, () => spawn());

    function spawn(): Ember {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 80,
        r: 0.8 + Math.random() * 2.2,
        speed: 0.25 + Math.random() * 0.55,
        drift: (Math.random() - 0.5) * 0.4,
        life: 0,
        maxLife: 260 + Math.random() * 260,
        wobble: Math.random() * Math.PI * 2,
      };
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
      pointer.current.active = true;
    }
    function onPointerLeave() {
      pointer.current.active = false;
    }
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    let raf = 0;
    function tick() {
      ctx!.clearRect(0, 0, width, height);

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life += 1;
        e.wobble += 0.02;

        let dx = Math.sin(e.wobble) * e.drift;
        let dy = -e.speed;

        if (pointer.current.active) {
          const px = pointer.current.x - e.x;
          const py = pointer.current.y - e.y;
          const dist = Math.sqrt(px * px + py * py);
          if (dist < 160 && dist > 0.01) {
            const force = (1 - dist / 160) * 0.6;
            dx -= (px / dist) * force;
            dy -= (py / dist) * force;
          }
        }

        e.x += dx;
        e.y += dy;

        const lifeRatio = e.life / e.maxLife;
        const fade =
          lifeRatio < 0.15
            ? lifeRatio / 0.15
            : lifeRatio > 0.7
              ? 1 - (lifeRatio - 0.7) / 0.3
              : 1;

        if (e.life > e.maxLife || e.y < -20) {
          embers[i] = spawn();
          continue;
        }

        const alpha = Math.max(0, Math.min(1, fade)) * 0.85;
        const glow = ctx!.createRadialGradient(
          e.x,
          e.y,
          0,
          e.x,
          e.y,
          e.r * 6
        );
        glow.addColorStop(0, `rgba(255, 158, 87, ${alpha})`);
        glow.addColorStop(1, "rgba(255, 158, 87, 0)");
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.r * 6, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = `rgba(255, 200, 150, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-auto"
      aria-hidden="true"
    />
  );
}
