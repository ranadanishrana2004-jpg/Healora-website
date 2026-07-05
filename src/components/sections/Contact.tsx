"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
} from "lucide-react";
import { contact } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

const info = [
  { icon: Mail, label: "Email us", value: contact.email },
  { icon: Phone, label: "Call us", value: contact.phone },
  { icon: Clock, label: "Business hours", value: contact.hours },
  { icon: MapPin, label: "Visit us", value: contact.address },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4500);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id="contact" className="relative px-4 py-24 sm:py-28">
      <SectionHeading
        eyebrow="Get In Touch"
        title={
          <>
            Let&apos;s build something{" "}
            <span className="text-gradient">remarkable</span>
          </>
        }
        subtitle="Ready to transform your ideas into powerful digital solutions? Tell us about your project — we reply within 24 hours."
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-5">
        {/* info column */}
        <div className="space-y-4 lg:col-span-2">
          {info.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.06}>
              <SpotlightCard
                glowColor="6, 182, 212"
                className="p-5 bg-panel/60"
                contentClassName="flex items-start gap-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400/20 to-aqua-500/20 ring-1 ring-white/10">
                  <it.icon className="h-5 w-5 text-brand-300" />
                </span>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    {it.label}
                  </div>
                  <div className="mt-1 text-sm font-medium text-white">
                    {it.value}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
          <Reveal delay={0.24}>
            <div className="rounded-2xl border border-brand-400/20 bg-gradient-to-br from-brand-500/10 to-aqua-500/5 p-5 text-sm text-brand-200">
              {contact.responseTime} ⚡
            </div>
          </Reveal>
        </div>

        {/* form */}
        <Reveal delay={0.12} className="lg:col-span-3">
          <SpotlightCard
            glowColor="16, 185, 129"
            className="p-7 sm:p-9 relative overflow-hidden bg-panel/60"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid place-items-center py-16 text-center"
                >
                  <CheckCircle2 className="h-14 w-14 text-brand-400" />
                  <h3 className="mt-4 font-display text-2xl font-bold text-white">
                    Message sent!
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Thanks for reaching out — we&apos;ll be in touch within 24
                    hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="relative space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your name" name="name" placeholder="Jane Doe" />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="jane@company.com"
                    />
                  </div>
                  <Field
                    label="Subject"
                    name="subject"
                    placeholder="What is this about?"
                  />
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-300">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your project or question..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-ink-soft/80 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-brand-400/50 focus:ring-2 focus:ring-brand-400/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-400 to-aqua-500 px-7 py-3.5 text-sm font-semibold text-ink shadow-xl shadow-brand-500/25 transition-transform hover:scale-[1.01]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
                    Send message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-ink-soft/80 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-brand-400/50 focus:ring-2 focus:ring-brand-400/20"
      />
    </div>
  );
}
