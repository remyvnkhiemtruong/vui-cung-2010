'use client';

import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export default function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const petalColors = [
      'rgba(244, 63, 94, 0.45)', // Rose-500
      'rgba(251, 113, 133, 0.5)', // Rose-400
      'rgba(244, 114, 182, 0.4)', // Pink-400
      'rgba(253, 164, 175, 0.5)', // Rose-300
    ];

    const petalCount = Math.min(24, Math.floor(window.innerWidth / 45));
    const petals: Petal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 8,
      speedX: (Math.random() - 0.3) * 0.8,
      speedY: Math.random() * 0.8 + 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.4 + 0.3,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, p.size, p.size / 2);
      ctx.bezierCurveTo(p.size, p.size, 0, p.size * 1.2, 0, 0);
      ctx.fill();

      ctx.restore();
    };

    // If reduced motion is active: render once statically, do not loop requestAnimationFrame
    if (mediaQuery.matches) {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(drawPetal);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of petals) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
      aria-hidden="true"
    />
  );
}
