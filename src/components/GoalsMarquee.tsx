"use client";

import { ComponentType } from "react";
import { SectionTitle } from "@/components/SectionTitle";

type Props = {
  title?: string;
  subtitle?: string;
  goals: string[];
  icons: ComponentType<{ className?: string }>[];
  centerTitle?: boolean; // optional: center heading from here too
};

export function GoalsMarquee({
  title = "Бидний эрхэм зорилго",
  subtitle,
  goals,
  icons,
  centerTitle = true, // default to center title
}: Props) {
  const base = goals.slice(0, Math.max(6, goals.length));
  const duplicated = [...base, ...base]; // for seamless loop

  const Card = ({ text, idx }: { text: string; idx: number }) => {
    const Icon = icons[idx % icons.length];
    return (
      <article className="group/card flex-none w-[20rem] sm:w-[22rem] lg:w-[24rem] card p-6 border border-black/5 hover:shadow-lg transition">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-brand-primary/10 grid place-items-center shrink-0">
            <Icon className="h-6 w-6 text-brand-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold mb-2">Зорилт</h3>
            <p className="text-black/80 leading-relaxed">{text}</p>
          </div>
        </div>
        <div className="mt-4 h-1 w-full bg-brand-accent/70 rounded-full scale-x-0 origin-left transition-transform duration-300 group-hover/card:scale-x-100" />
      </article>
    );
  };

  return (
    <section className="py-16">
      {/* ✅ pass center prop to actually center the heading */}
      <SectionTitle title={title} subtitle={subtitle} />

      <div className="goals-marquee relative overflow-hidden">
        <div className="goals-track">
          {base.map((g, i) => (
            <Card key={`g1-${i}-${g}`} text={g} idx={i} />
          ))}
          {duplicated.slice(base.length).map((g, i) => (
            <Card key={`g2-${i}-${g}`} text={g} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
