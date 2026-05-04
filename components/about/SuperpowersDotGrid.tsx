"use client";

import type { RefObject } from "react";
import { useEffect, useRef } from "react";

const GRID = 28;
const R_DEFAULT = 0.8;
const R_HOVER = 2.5;
const RANGE = 120;

const COLOR_DEFAULT = { r: 0, g: 0, b: 0, a: 0.15 };
const COLOR_HOVER = { r: 0, g: 0, b: 0, a: 0.6 };

function smoothstep(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function SuperpowersDotGrid({ sectionRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const insideRef = useRef(false);
  const influenceRef = useRef(0);
  const posRef = useRef({ x: 0, y: 0 });
  const pointerFineRef = useRef(false);
  const rafRef = useRef(0);
  const loopActiveRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    pointerFineRef.current = window.matchMedia("(pointer: fine)").matches;

    const syncSize = () => {
      const w = section.clientWidth;
      const h = section.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const bw = Math.max(1, Math.floor(w * dpr));
      const bh = Math.max(1, Math.floor(h * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
      return { w, h, dpr };
    };

    const draw = () => {
      const { w, h, dpr } = syncSize();
      if (w < 1 || h < 1) return;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fine = pointerFineRef.current;
      let blend = 0;
      if (fine) {
        if (insideRef.current) {
          influenceRef.current = 1;
        } else {
          influenceRef.current *= 0.88;
          if (influenceRef.current < 0.008) influenceRef.current = 0;
        }
        blend = influenceRef.current;
      }

      const mx = posRef.current.x;
      const my = posRef.current.y;

      for (let gy = 0; gy <= h + GRID; gy += GRID) {
        for (let gx = 0; gx <= w + GRID; gx += GRID) {
          let t = 0;
          if (fine && blend > 0) {
            const d = Math.hypot(gx - mx, gy - my);
            if (d < RANGE) {
              const raw = (1 - d / RANGE) * blend;
              t = smoothstep(raw);
            }
          }

          if (t <= 0.001) {
            ctx.fillStyle = `rgba(${COLOR_DEFAULT.r},${COLOR_DEFAULT.g},${COLOR_DEFAULT.b},${COLOR_DEFAULT.a})`;
            ctx.beginPath();
            ctx.arc(gx, gy, R_DEFAULT, 0, Math.PI * 2);
            ctx.fill();
            continue;
          }

          const r = lerp(R_DEFAULT, R_HOVER, t);
          const cr = lerp(COLOR_DEFAULT.r, COLOR_HOVER.r, t);
          const cg = lerp(COLOR_DEFAULT.g, COLOR_HOVER.g, t);
          const cb = lerp(COLOR_DEFAULT.b, COLOR_HOVER.b, t);
          const ca = lerp(COLOR_DEFAULT.a, COLOR_HOVER.a, t);
          ctx.fillStyle = `rgba(${Math.round(cr)},${Math.round(cg)},${Math.round(cb)},${ca})`;
          ctx.beginPath();
          ctx.arc(gx, gy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const step = () => {
      draw();
      const fine = pointerFineRef.current;
      if (!fine) {
        loopActiveRef.current = false;
        return;
      }
      if (insideRef.current) {
        loopActiveRef.current = false;
        return;
      }
      if (influenceRef.current > 0.01) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        loopActiveRef.current = false;
      }
    };

    const startLoop = () => {
      cancelAnimationFrame(rafRef.current);
      loopActiveRef.current = true;
      rafRef.current = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      pointerFineRef.current = window.matchMedia("(pointer: fine)").matches;
      if (!pointerFineRef.current) return;
      const r = section.getBoundingClientRect();
      posRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      insideRef.current = true;
      influenceRef.current = 1;
      startLoop();
    };

    const onLeave = () => {
      if (!pointerFineRef.current) return;
      insideRef.current = false;
      startLoop();
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    const ro = new ResizeObserver(() => {
      pointerFineRef.current = window.matchMedia("(pointer: fine)").matches;
      draw();
      if (pointerFineRef.current && (insideRef.current || influenceRef.current > 0.01)) {
        startLoop();
      }
    });
    ro.observe(section);

    draw();

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
      loopActiveRef.current = false;
    };
  }, [sectionRef]);

  const fadeMask =
    "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)";

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      style={{
        WebkitMaskImage: fadeMask,
        maskImage: fadeMask,
      }}
      aria-hidden
    />
  );
}
