import { marquee } from "@/lib/site";
import { Sparkles } from "lucide-react";

export default function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <section className="relative border-y border-white/5 bg-white/[0.012] py-8">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
        Technologies we master
      </p>
      <div className="mask-fade-x flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {row.map((t, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="whitespace-nowrap font-display text-xl font-semibold text-slate-500 transition-colors hover:text-brand-300 sm:text-2xl cursor-default">
                {t}
              </span>
              <Sparkles className="h-4 w-4 text-brand-500/20 shrink-0" />
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 animate-marquee items-center gap-10 pr-10"
        >
          {row.map((t, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="whitespace-nowrap font-display text-xl font-semibold text-slate-500 transition-colors hover:text-brand-300 sm:text-2xl cursor-default">
                {t}
              </span>
              <Sparkles className="h-4 w-4 text-brand-500/20 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
