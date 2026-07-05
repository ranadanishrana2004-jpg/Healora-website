"use client";

import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { stats } from "@/lib/site";
import Counter from "@/components/ui/Counter";
import InteractiveCanvas from "@/components/ui/InteractiveCanvas";
import Magnetic from "@/components/ui/Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden px-4 pb-20 pt-32 sm:pt-40"
    >
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg" />
        <InteractiveCanvas />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl text-center"
      >
        <motion.div variants={item} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand-300" />
            Software development & AI studio
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-7 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Innovating digital
          <br className="hidden sm:block" /> solutions with{" "}
          <span className="relative inline-block">
            <span className="text-gradient">care</span>
            <motion.span
              className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-brand-400 to-aqua-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8, ease }}
              style={{ transformOrigin: "left" }}
            />
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          We help businesses turn their ideas into powerful software — products
          that drive growth, delight users, and accelerate success. Where ideas
          come to life.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <a
              href="/contact"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-400 to-aqua-500 px-7 py-3.5 text-sm font-semibold text-ink shadow-xl shadow-brand-500/25 transition-transform hover:scale-[1.03] sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
              Start your project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="/work"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10 sm:w-auto"
            >
              <Play className="h-4 w-4 text-brand-300" />
              View our work
            </a>
          </Magnetic>
        </motion.div>

        {/* floating trust chips */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400"
        >
          <Chip icon={<ShieldCheck className="h-3.5 w-3.5 text-brand-300" />}>
            Enterprise-grade security
          </Chip>
          <Chip icon={<Zap className="h-3.5 w-3.5 text-aqua-400" />}>
            24/7 support
          </Chip>
          <Chip icon={<Sparkles className="h-3.5 w-3.5 text-iris-400" />}>
            AI-first engineering
          </Chip>
        </motion.div>
      </motion.div>

      {/* stat bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease }}
        className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl glass md:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="px-6 py-7 text-center">
            <div className="font-display text-3xl font-bold text-white sm:text-4xl">
              <span className="text-gradient">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function Chip({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur">
      {icon}
      {children}
    </span>
  );
}
