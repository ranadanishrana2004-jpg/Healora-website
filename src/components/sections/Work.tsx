"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";

const categories = ["All", "Web", "Mobile", "AI / ML"];

const projectGlowColors: Record<string, string> = {
  "AI Analytics Dashboard": "16, 185, 129", // emerald
  "E-Commerce Platform": "6, 182, 212",    // cyan
  "Healthcare Management System": "13, 148, 136", // teal
  "Food Delivery App": "245, 158, 11",     // amber
  "Mobile Banking App": "99, 102, 241",    // indigo
  "Smart Home IoT Platform": "132, 204, 22", // lime
};

export default function Work() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="relative px-4 py-24 sm:py-28">
      <SectionHeading
        eyebrow="Our Portfolio"
        title={
          <>
            Featured <span className="text-gradient">projects</span>
          </>
        }
        subtitle="A selection of products we've designed, built, and launched with our clients."
      />

      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${active === c ? "text-ink" : "text-slate-300 hover:text-white"
              }`}
          >
            {active === c && (
              <motion.span
                layoutId="work-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-400 to-aqua-500"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <SpotlightCard
                glowColor={projectGlowColors[p.title] || "16, 185, 129"}
                className="p-0 overflow-hidden h-full w-full bg-panel/50"
              >
                <div
                  className={`relative h-48 overflow-hidden bg-gradient-to-br ${p.gradient} group`}
                >
                  {/* Project Image */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay for card integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-panel/95 via-panel/40 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur z-10">
                    {p.category}
                  </span>
                  <motion.div
                    className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
                    aria-hidden
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-brand-300">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {p.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
