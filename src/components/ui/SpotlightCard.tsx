"use client";

import React, { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  glowColor?: string; // RGB values like '16, 185, 129' or '34, 211, 238'
};

export default function SpotlightCard({
  children,
  className = "p-7",
  contentClassName = "",
  glowColor = "16, 185, 129",
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-panel/60 transition-colors duration-300 hover:border-white/15 ${className}`}
      style={
        {
          "--glow-color": glowColor,
        } as React.CSSProperties
      }
    >
      {/* Background radial spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(var(--glow-color), 0.08), transparent 80%)`,
        }}
      />

      {/* Border spotlight glow (requires border on parent and this overlay to blend) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[inherit]"
        style={{
          border: `1.5px solid transparent`,
          backgroundImage: `radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(var(--glow-color), 0.45), transparent 75%)`,
          backgroundOrigin: "border-box",
          backgroundClip: "border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />

      {/* Content wrapper to ensure children sit on top of background glows */}
      <div className={`relative z-20 h-full w-full ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
