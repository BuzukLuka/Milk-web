"use client";

import { ComponentType } from "react";
import { SectionTitle } from "@/components/SectionTitle";

type Props = {
  title?: string;
  subtitle?: string;
  goals: string[];
  icons: ComponentType<{ className?: string }>[];
  centerTitle?: boolean; // гарчгийг төвд байрлуулах эсэх
};

export function GoalsMarquee({
  title = "",
  subtitle,
  goals,
  icons,
  centerTitle = true,
}: Props) {
  const base = goals.slice(0, Math.max(6, goals.length));
  const duplicated = [...base, ...base];

  const Card = ({ text, idx }: { text: string; idx: number }) => {
    const Icon = icons[idx % icons.length];
    return (
      <article className="group/card relative flex-none w-[20rem] sm:w-[22rem] lg:w-[24rem] rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        {/* Top gradient accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 opacity-60 group-hover/card:opacity-100 transition-opacity" />
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl grid place-items-center shrink-0 bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100/50">
            <Icon className="h-6 w-6 text-sky-600" />
          </div>
          <div>
            <h3 className="font-display font-bold text-gray-900 mb-1.5">Зорилт</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{text}</p>
          </div>
        </div>
        {/* Bottom progress bar on hover */}
        <div className="mt-4 h-0.5 w-full rounded-full overflow-hidden bg-gray-100">
          <div className="h-full w-full bg-gradient-to-r from-sky-500 to-emerald-400 scale-x-0 origin-left transition-transform duration-500 group-hover/card:scale-x-100" />
        </div>
      </article>
    );
  };

  return (
    <section className="py-16">
      {/* centerTitle-г ашиглаж байна */}
      <div className={centerTitle ? "text-center" : undefined}>
        <SectionTitle title={title} subtitle={subtitle} />
      </div>

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
