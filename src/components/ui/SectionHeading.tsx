import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: Props) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse-glow" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
