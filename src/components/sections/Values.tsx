import { values, stats } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import Counter from "@/components/ui/Counter";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Values() {
  return (
    <section id="about" className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse-glow" />
              About Healora
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              A passionate team turning ideas into{" "}
              <span className="text-gradient">impact</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-base leading-relaxed text-slate-400">
              Healora was founded on a simple belief: great software should be
              built with genuine care. We&apos;re a team of innovators dedicated
              to transforming ideas into powerful digital solutions that drive
              business success and improve lives.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.slice(0, 2).map((s, i) => (
              <Reveal key={s.label} delay={0.2 + i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-panel/50 p-5">
                  <div className="font-display text-3xl font-bold text-gradient">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-slate-400">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <SpotlightCard
                glowColor="16, 185, 129"
                className="p-6 h-full w-full bg-panel/60"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-400/20 to-aqua-500/20 ring-1 ring-white/10 transition-transform group-hover:scale-110">
                  <Icon name={v.icon} className="h-5 w-5 text-brand-300" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-white">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {v.blurb}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
