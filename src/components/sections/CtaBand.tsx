"use client";

import { motion } from "motion/react";
import { ArrowRight, Calendar } from "lucide-react";

export default function CtaBand() {
  return (
    <section className="px-4 py-12">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-500/15 via-panel to-aqua-500/10 px-6 py-16 text-center sm:px-12">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-500/20 blur-[100px]"
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-aqua-500/20 blur-[100px]"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to turn your idea into a{" "}
            <span className="text-gradient">powerful product?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
            Let&apos;s innovate, grow, and succeed together in the digital age.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-400 to-aqua-500 px-7 py-3.5 text-sm font-semibold text-ink shadow-xl shadow-brand-500/25 transition-transform hover:scale-[1.03] sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
              Start your project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10 sm:w-auto"
            >
              <Calendar className="h-4 w-4 text-brand-300" />
              Schedule a call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
