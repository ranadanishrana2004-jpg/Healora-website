import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Testimonials() {
  return (
    <section className="relative px-4 py-24 sm:py-28">
      <SectionHeading
        eyebrow="Client Stories"
        title={
          <>
            What our clients <span className="text-gradient">say</span>
          </>
        }
        subtitle="We measure our success by the success of the people we build for."
      />

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <SpotlightCard
              glowColor="6, 182, 212"
              className="p-7 h-full bg-panel/60"
              contentClassName="flex flex-col h-full"
            >
              <figure className="flex flex-col h-full">
                <Quote className="h-8 w-8 text-brand-400/40" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-aqua-500 font-display text-sm font-bold text-ink">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {t.name}
                    </span>
                    <span className="block text-xs text-slate-400">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
