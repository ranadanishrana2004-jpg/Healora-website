"use client";

import { useState } from "react";
import { Activity, Globe, Send, MessageCircle, ArrowRight } from "lucide-react";
import { nav } from "@/lib/site";

const serviceLinks = [
  "Web Development",
  "AI & Machine Learning",
  "Mobile Apps",
  "Cloud & DevOps",
  "Cybersecurity",
  "Workshops & Training",
  "Academic Collaborations",
  "Internship Programs",
];

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-white/10 px-4 pb-10 pt-16">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        {/* newsletter */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-panel/80 to-ink-soft/60 p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
          <div className="relative grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Stay in the loop
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Subscribe for the latest insights on AI, engineering, and
                product.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
                (e.target as HTMLFormElement).reset();
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-xl border border-white/10 bg-ink/80 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-brand-400/50 focus:ring-2 focus:ring-brand-400/20"
              />
              <button className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-brand-400 to-aqua-500 px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]">
                {subscribed ? "Subscribed ✓" : "Subscribe"}
                {!subscribed && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* links */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-aqua-500">
                <Activity className="h-5 w-5 text-ink" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold text-white">
                Heal<span className="text-gradient">ora</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Innovating digital solutions with care. We turn ideas into
              powerful software that drives growth.
            </p>
            <div className="mt-5 flex gap-2">
              {[Globe, Send, MessageCircle].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-brand-400/20 hover:text-brand-300"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Navigate" links={nav.map((n) => n.label)} hrefs={nav.map((n) => n.href)} />
          <FooterCol title="Services" links={serviceLinks} />
          <FooterCol
            title="Company"
            links={["About", "Careers", "Blog", "Contact"]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Healora. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with care
            <span className="text-brand-400">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  hrefs,
}: {
  title: string;
  links: string[];
  hrefs?: string[];
}) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l, i) => (
          <li key={l}>
            <a
              href={hrefs?.[i] ?? "/contact"}
              className="text-sm text-slate-400 transition-colors hover:text-brand-300"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
