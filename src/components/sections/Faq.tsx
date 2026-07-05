"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative px-4 py-24 sm:py-28">
      <SectionHeading
        eyebrow="FAQ"
        title={
          <>
            Frequently asked <span className="text-gradient">questions</span>
          </>
        }
        subtitle="Quick answers about how we work and what to expect."
      />

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className="overflow-hidden rounded-2xl border border-white/10 bg-panel/50 transition-colors hover:border-white/20"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-base font-semibold text-white sm:text-lg">
                  {f.q}
                </span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-brand-300 transition-transform duration-300 ${
                    isOpen ? "rotate-45 bg-brand-400/20" : ""
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-slate-400">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
