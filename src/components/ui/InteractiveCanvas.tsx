"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      // Support high DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Adjust density based on viewport width
      const area = width * height;
      const densityFactor = 12000; // Pixels per particle
      const particleCount = Math.min(Math.floor(area / densityFactor), 80);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          radius: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.4 + 0.25,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const maxDistConnection = 110;
      const maxDistMouse = 180;

      // Update and draw particles
      particles.forEach((p) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha})`; // Brand emerald text color
        ctx.fill();

        // Connect particles to each other
        particles.forEach((p2) => {
          if (p === p2) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistConnection) {
            const alpha = (1 - dist / maxDistConnection) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });

        // Connect particle to mouse
        if (mouse.x > -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistMouse) {
            const alpha = (1 - dist / maxDistMouse) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            // Draw gradient lines towards mouse for premium look
            const grad = ctx.createLinearGradient(p.x, p.y, mouse.x, mouse.y);
            grad.addColorStop(0, `rgba(52, 211, 153, ${alpha * 0.6})`);
            grad.addColorStop(1, `rgba(34, 211, 238, ${alpha})`); // cyan
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Attract particles slightly to mouse
            const force = (maxDistMouse - dist) / maxDistMouse;
            p.x -= dx * force * 0.015;
            p.y -= dy * force * 0.015;
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Start animation loop
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  );
}
