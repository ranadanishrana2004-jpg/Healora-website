"use client";

import { motion } from "motion/react";
import { process } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";

const glowColors = [
  "16, 185, 129", // step 1: emerald
  "6, 182, 212",  // step 2: cyan
  "99, 102, 241", // step 3: indigo
  "236, 72, 153", // step 4: pink
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden px-4 py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[140px]" />

      <SectionHeading
        eyebrow="How We Work"
        title={
          <>
            A proven path from{" "}
            <span className="text-gradient">idea to launch</span>
          </>
        }
        subtitle="A methodology refined to deliver on time, within budget, and beyond expectations."
      />

      <div className="relative mx-auto mt-16 max-w-5xl">
        {/* Animated Timeline Center Line */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 lg:block">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
            className="h-full w-full bg-gradient-to-b from-brand-400 via-aqua-400 to-transparent"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
          {process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative ${i % 2 === 1 ? "lg:mt-20" : ""}`}
            >
              <SpotlightCard
                glowColor={glowColors[i % glowColors.length]}
                className="p-7"
              >
                <span className="font-display text-5xl font-bold text-white/5 transition-colors group-hover:text-brand-400/20">
                  {p.step}
                </span>
                <h3 className="-mt-6 font-display text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  {p.blurb}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
