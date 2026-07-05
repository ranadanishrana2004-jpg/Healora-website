"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  range?: number; // The distance threshold in pixels to start pulling
  strength?: number; // How strongly the element is pulled (0 to 1)
};

export default function Magnetic({ children, range = 60, strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    
    // Center point of the element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Distance from cursor to center point
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < range) {
      // Pull element towards cursor with attenuation
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      // Return to center
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
