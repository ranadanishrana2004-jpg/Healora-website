"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "motion/react";

type Props = {
  value: number;
  suffix?: string;
  duration?: number;
};

export default function Counter({ value, suffix = "", duration = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, mv]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
