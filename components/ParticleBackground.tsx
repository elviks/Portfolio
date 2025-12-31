'use client';

import { useEffect, useRef, useState } from 'react';

type Bubble = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  drift: number;
  phase: number;

  seed: number;
  up: number;

  popping: boolean;
  popT: number;

  hintUntil: number;
  hintText: string;
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [poppedCount, setPoppedCount] = useState(0);

  // avoid stale state in the click handler
  const poppedRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    let raf = 0;

    const bubbles: Bubble[] = [];
    const sparks: Spark[] = [];

    const state = { w: 0, h: 0, t: 0 };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    let nextHintAt = 0;

    const spawnBubble = (x?: number, y?: number) => {
      const r = rand(12, 30);
      bubbles.push({
        x: x ?? Math.random() * state.w,
        y: y ?? Math.random() * state.h,
        vx: rand(-0.16, 0.16),
        vy: rand(-0.22, -0.08),
        r,
        drift: rand(0.3, 1.0),
        phase: rand(0, Math.PI * 2),

        seed: rand(0, 1000),
        up: rand(-0.06, -0.02),

        popping: false,
        popT: 0,

        hintUntil: 0,
        hintText: 'pop'
      });
    };

    const spawnPop = (x: number, y: number, r: number) => {
      const count = Math.floor(clamp(r * 0.8, 8, 16));
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const s = rand(0.6, 2.2);
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          r: rand(0.8, 2.2),
          life: 1
        });
      }
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      state.w = w;
      state.h = h;

      canvas.width = w;
      canvas.height = h;

      bubbles.length = 0;
      sparks.length = 0;

      const count = Math.min(70, Math.max(30, Math.floor(w / 26)));
      for (let i = 0; i < count; i++) spawnBubble();

      nextHintAt = performance.now() + 800;
    };

    const onClick = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        if (b.popping) continue;

        const dx = b.x - mx;
        const dy = b.y - my;
        if (dx * dx + dy * dy <= b.r * b.r) {
          b.popping = true;
          b.popT = 0;
          b.hintUntil = 0;
          spawnPop(b.x, b.y, b.r);

          // ✅ increment counter immediately when pop starts
          poppedRef.current += 1;
          setPoppedCount(poppedRef.current);
          break;
        }
      }
    };

    const drawBubble = (b: Bubble) => {
      const { x, y, r } = b;

      const rim = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.2, x, y, r);
      rim.addColorStop(0, 'rgba(240,255,248,0.22)');
      rim.addColorStop(0.6, 'rgba(200,255,225,0.08)');
      rim.addColorStop(1, 'rgba(180,255,220,0.03)');

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      const tint = ctx.createRadialGradient(x, y, 0, x, y, r);
      tint.addColorStop(0, 'rgba(34,197,94,0.08)');
      tint.addColorStop(1, 'rgba(34,197,94,0.0)');

      ctx.beginPath();
      ctx.arc(x, y, r * 0.98, 0, Math.PI * 2);
      ctx.fillStyle = tint;
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(x - r * 0.25, y - r * 0.35, r * 0.22, r * 0.12, -0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245,255,250,0.26)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(200,255,230,0.14)';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawHintText = (b: Bubble, now: number) => {
      if (b.hintUntil <= now) return;
      if (b.r < 18) return;

      const t = clamp((b.hintUntil - now) / 300, 0, 1);
      const alpha = 0.85 * t;

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const fontSize = Math.max(10, Math.min(16, b.r * 0.75));
      ctx.font = `600 ${fontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;

      ctx.fillStyle = `rgba(0,0,0,${0.35 * alpha})`;
      ctx.fillText(b.hintText, b.x + 0.8, b.y + 0.8);

      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillText(b.hintText, b.x, b.y);

      ctx.restore();
    };

    const tick = () => {
      state.t += 1 / 60;
      ctx.clearRect(0, 0, state.w, state.h);

      const now = performance.now();

      // ✅ multiple "pop" hints
      if (now >= nextHintAt && bubbles.length > 0) {
        const howMany = Math.floor(rand(2, 4)); // 2–3 bubbles
        let shown = 0;
        let attempts = 0;

        while (shown < howMany && attempts < 30) {
          attempts++;
          const b = bubbles[(Math.random() * bubbles.length) | 0];
          if (!b || b.popping) continue;
          if (b.r < 16) continue;
          if (b.hintUntil > now) continue;

          b.hintUntil = now + rand(2000, 3000);
          shown++;
        }

        nextHintAt = now + rand(2200, 3200);
      }

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];

        if (b.popping) {
          b.popT += 0.08;
          const t = Math.min(b.popT, 1);

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r * (1 + t), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(220,255,235,${(1 - t) * 0.35})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          if (b.popT >= 1) {
            bubbles.splice(i, 1);
            spawnBubble(undefined, state.h + 40);
          }
          continue;
        }

        const tt = state.t;
        const n1 = Math.sin(tt * 0.9 + b.seed) + Math.cos(tt * 0.55 + b.seed * 1.7);
        const n2 = Math.cos(tt * 0.75 + b.seed * 0.8) - Math.sin(tt * 0.62 + b.seed * 1.2);

        b.vx += n1 * 0.012 * b.drift;
        b.vy += n2 * 0.006 * b.drift;

        if (Math.random() < 0.012) {
          b.vx += rand(-0.08, 0.08);
          b.vy += rand(-0.03, 0.03);
        }

        b.vx *= 0.985;
        b.vy *= 0.99;

        b.vy = Math.min(b.vy, b.up);

        const sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy) || 1;
        const maxSp = 1.35;
        if (sp > maxSp) {
          const s = maxSp / sp;
          b.vx *= s;
          b.vy *= s;
        }

        b.x += b.vx;
        b.y += b.vy;

        if (b.x < -b.r) b.x = state.w + b.r;
        if (b.x > state.w + b.r) b.x = -b.r;

        if (b.y < -b.r * 2) {
          b.y = state.h + b.r * 2;
          b.x = Math.random() * state.w;
          b.vx = rand(-0.16, 0.16);
          b.vy = rand(-0.22, -0.08);
          b.up = rand(-0.06, -0.02);
          b.seed = rand(0, 1000);
          b.phase = rand(0, Math.PI * 2);
          b.hintUntil = 0;
        }

        drawBubble(b);
        drawHintText(b, now);
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life -= 0.04;

        s.vx *= 0.98;
        s.vy *= 0.98;
        s.vy += 0.02;

        s.x += s.vx;
        s.y += s.vy;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,255,245,${s.life * 0.8})`;
        ctx.fill();

        if (s.life <= 0) sparks.splice(i, 1);
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('click', onClick);

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* ✅ Counter overlay */}
      <div className="fixed right-4 top-4 z-20 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
        Bubbles popped: <span className="text-emerald-300">{poppedCount}</span>
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none opacity-80"
      />
    </>
  );
}
