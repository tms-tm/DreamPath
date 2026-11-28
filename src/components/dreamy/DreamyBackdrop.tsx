'use client';

import React, { useEffect, useRef } from 'react';

export function DreamyBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Subtle twinkling stars
    const stars: Array<{ x: number; y: number; r: number; phase: number; speed: number }> = [];
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight * 0.65),
        r: 0.8 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0015 + Math.random() * 0.0025,
      });
    }

    let clock = 0;
    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      clock = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw subtle twinkling pastel sparkles
      ctx.fillStyle = '#94a3b8';
      stars.forEach((s) => {
        const opacity = 0.12 + 0.3 * Math.pow(0.5 + 0.5 * Math.sin(s.phase + clock * s.speed), 2);
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none">
      {/* Top Ambient Pastel Glow */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#CFE2FA]/40 via-[#CFE2FA]/12 to-transparent" />

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
        style={{ pointerEvents: 'none' }}
      />

      {/* Bottom Rolling Hills & Winding Path (Exact SVG Artwork from Stitch) */}
      <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back hill */}
          <path
            d="M-80 260 Q 220 80, 560 210 T 1180 180 Q 1340 140, 1520 260 Z"
            fill="#E6EEF7"
          />
          {/* Left main taller hill */}
          <path d="M-40 260 Q 140 30, 420 260 Z" fill="#DCE7F3" />
          {/* Secondary foreground rolling curve */}
          <path
            d="M360 260 Q 720 170, 1080 240 Q 1280 190, 1500 260 Z"
            fill="#E6EEF7"
            opacity="0.85"
          />

          {/* Winding dotted path to summit flag on left hill (summit around x=140, y=98) */}
          <path
            d="M 40 260 C 70 210, 80 190, 110 170 C 135 155, 115 130, 140 98"
            stroke="#9DB4D6"
            strokeWidth="2.5"
            strokeDasharray="4 6"
            fill="none"
          />

          {/* Flagpole and pink flag at summit (x=140, y=98) */}
          <line
            x1="140"
            y1="98"
            x2="140"
            y2="76"
            stroke="#9DB4D6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M 140 76 L 154 82 L 140 88 Z" fill="#F472B6" />
        </svg>
      </div>
    </div>
  );
}
