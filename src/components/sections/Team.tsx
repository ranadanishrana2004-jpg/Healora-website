"use client";

import { motion } from "motion/react";
import { Globe, Send, MessageCircle } from "lucide-react";
import { team } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";

const memberGlowColors: Record<string, string> = {
  "Bilal Khalid": "16, 185, 129", // emerald
  "Danish Shafique": "6, 182, 212", // cyan
  "Dania Arshad": "6, 182, 212",  // cyan
  "Muhammad Wahaj Yasin": "99, 102, 241", // indigo
  "Syed Moosa Ali": "20, 184, 166", // teal
  "Safura Kasu": "139, 92, 246",  // violet
  "Muhammad Imran": "245, 158, 11", // amber
  "Waleed Ahmed": "244, 63, 94",  // rose
  "Rida Batool": "217, 70, 239",  // fuchsia
};

export default function Team() {
  return (
    <section id="team" className="relative px-4 py-24 sm:py-28">
      <SectionHeading
        eyebrow="Meet Our Team"
        title={
          <>
            The people behind the{" "}
            <span className="text-gradient">work</span>
          </>
        }
        subtitle="A diverse group of experts with decades of combined experience in technology, design, and strategy."
      />

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <SpotlightCard
              glowColor={memberGlowColors[m.name] || "16, 185, 129"}
              className="p-6 text-center h-full w-full"
            >
              <div className="relative mx-auto h-24 w-24">
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${m.accent} opacity-30 blur-md transition-opacity group-hover:opacity-60`}
                />
                <div
                  className={`relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br ${m.accent} font-display text-2xl font-bold text-ink ring-4 ring-white/10`}
                >
                  {m.initials}
                </div>
              </div>

              <h3 className="mt-5 font-display text-lg font-semibold text-white">
                {m.name}
              </h3>
              <p className="text-sm font-medium text-brand-300">{m.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {m.blurb}
              </p>

              <div className="mt-5 flex justify-center gap-2">
                {[Globe, Send, MessageCircle].map((I, idx) => (
                  <span
                    key={idx}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-brand-400/20 hover:text-brand-300"
                  >
                    <I className="h-4 w-4" />
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
