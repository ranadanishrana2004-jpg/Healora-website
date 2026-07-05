"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import SpotlightCard from "@/components/ui/SpotlightCard";

const glowColors = [
  "16, 185, 129", // emerald
  "6, 182, 212",  // cyan
  "99, 102, 241", // indigo
  "14, 165, 233", // sky
  "236, 72, 153", // pink
  "168, 85, 247", // purple
  "251, 191, 36", // amber  – Workshops
  "52, 211, 153", // emerald – Collaborations
  "34, 211, 238", // cyan    – Internships
];

export default function Services() {
  return (
    <section id="services" className="relative px-4 py-24 sm:py-28">
      <SectionHeading
        eyebrow="Our Expertise"
        title={
          <>
            Everything you need to{" "}
            <span className="text-gradient">ship great software</span>
          </>
        }
        subtitle="Comprehensive software development and digital transformation services, tailored to your unique business needs."
      />

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={s.span ?? ""}
          >
            <SpotlightCard
              glowColor={glowColors[i % glowColors.length]}
              className="h-full w-full p-7"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-400/20 to-aqua-500/20 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon name={s.icon} className="h-6 w-6 text-brand-300" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-300" />
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                {s.blurb}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
