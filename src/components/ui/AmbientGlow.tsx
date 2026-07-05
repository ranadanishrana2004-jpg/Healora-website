"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

type GlowConfig = {
  color1: string;
  color2: string;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
};

const configs: Record<string, GlowConfig> = {
  home: {
    color1: "rgba(16, 185, 129, 0.16)", // Emerald
    color2: "rgba(34, 211, 238, 0.12)", // Cyan
    x1: "25vw", y1: "20vh",
    x2: "75vw", y2: "45vh",
  },
  services: {
    color1: "rgba(6, 182, 212, 0.15)",  // Cyan
    color2: "rgba(99, 102, 241, 0.12)", // Indigo
    x1: "70vw", y1: "30vh",
    x2: "20vw", y2: "60vh",
  },
  work: {
    color1: "rgba(99, 102, 241, 0.16)", // Indigo
    color2: "rgba(236, 72, 153, 0.1)",  // Pink
    x1: "20vw", y1: "40vh",
    x2: "80vw", y2: "20vh",
  },
  process: {
    color1: "rgba(13, 148, 136, 0.15)", // Teal
    color2: "rgba(16, 185, 129, 0.12)", // Emerald
    x1: "75vw", y1: "60vh",
    x2: "30vw", y2: "30vh",
  },
  team: {
    color1: "rgba(139, 92, 246, 0.15)", // Violet
    color2: "rgba(6, 182, 212, 0.12)",  // Cyan
    x1: "30vw", y1: "50vh",
    x2: "70vw", y2: "70vh",
  },
  contact: {
    color1: "rgba(16, 185, 129, 0.18)", // Emerald
    color2: "rgba(99, 102, 241, 0.12)", // Indigo
    x1: "65vw", y1: "70vh",
    x2: "25vw", y2: "35vh",
  },
};

export default function AmbientGlow() {
  const [activeSection, setActiveSection] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const sections = ["home", "services", "work", "process", "team", "contact"];
    
    // Observer for detecting active sections
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.2, rootMargin: "-10% 0px -40% 0px" }
      );

      observer.observe(el);
      return { observer, el };
    });

    // Mouse movement drift
    const handleMouseMove = (e: MouseEvent) => {
      // Gentle drift: -20 to 20 pixels
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 45,
        y: (e.clientY / window.innerHeight - 0.5) * 45,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const config = configs[activeSection] || configs.home;

  return (
    <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
      {/* Glow Blob 1 */}
      <motion.div
        animate={{
          backgroundColor: config.color1,
          left: config.x1,
          top: config.y1,
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 24, mass: 1.5 }}
        className="absolute h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      {/* Glow Blob 2 */}
      <motion.div
        animate={{
          backgroundColor: config.color2,
          left: config.x2,
          top: config.y2,
          x: -mousePos.x * 1.2,
          y: -mousePos.y * 1.2,
        }}
        transition={{ type: "spring", stiffness: 35, damping: 26, mass: 1.8 }}
        className="absolute h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
      />
    </div>
  );
}
