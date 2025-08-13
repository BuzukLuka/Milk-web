"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";

import { org } from "@/data/Content";
import { NEWS } from "@/data/News";

import { NewsCarousel } from "@/components/NewsCarousel";
import { NewsDialog } from "@/components/NewsDialog";

import {
  Award,
  Leaf,
  ShieldCheck,
  Network,
  Target,
  LineChart,
} from "lucide-react";
import { GoalsMarquee } from "@/components/GoalsMarquee";
import PartnersPage from "./support/page";
import ActivitiesSection from "@/components/ActivitiesSection";

const goalIcons = [Target, Network, ShieldCheck, Award, LineChart, Leaf];

function formatDateMN(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* Parse values like "120+" */
function parseTarget(value: string | number): { end: number; suffix: string } {
  if (typeof value === "number") return { end: value, suffix: "" };
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { end: Number(value) || 0, suffix: "" };
  return { end: Number(match[1]) || 0, suffix: match[2] || "" };
}

/* CountUp when visible */
function CountUp({
  to,
  duration = 1400,
  className,
}: {
  to: string | number;
  duration?: number;
  className?: string;
}) {
  const { end, suffix } = useMemo(() => parseTarget(to), [to]);
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const start = () => {
      if (started.current) return;
      started.current = true;
      const startTime = performance.now();
      const from = 0;
      const animate = (t: number) => {
        const p = Math.min(1, (t - startTime) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(from + (end - from) * eased));
        if (p < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && (start(), io.disconnect())),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {val.toLocaleString("mn-MN")}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<{
    title: string;
    date: string;
    image?: string;
    body: string;
  } | null>(null);

  const carouselItems = useMemo(
    () =>
      NEWS.map((n) => ({
        id: n.slug,
        title: n.title,
        excerpt: n.excerpt,
        date: formatDateMN(n.date),
        image: n.image || "/news/placeholder.jpg",
        href: `/news/${n.slug}`,
        tag: "Мэдээ",
        modal: {
          title: n.title,
          date: formatDateMN(n.date),
          image: n.image || "/news/placeholder.jpg",
          body: n.body,
        },
      })),
    []
  );

  // Prefer live data lengths; fallback to defaults
  const members = org?.board?.members?.length ?? null;
  const projects = org?.projects?.length ?? null;
  const partners = org?.partners?.length ?? null;

  const stats = [
    { k: "Гишүүд", v: members ?? "120+" },
    { k: "Аймаг хамарсан", v: 21 },
    { k: "Төсөл", v: projects ?? "35+" },
    { k: "Хамтрагч", v: partners ?? "40+" },
  ];

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Mission / Goals */}
      <Container className="py-16">
        <GoalsMarquee
          title="Бидний эрхэм зорилго"
          subtitle={org.slogan}
          goals={org.goals}
          icons={goalIcons}
        />
      </Container>

      {/* Counter section */}
      <section className="bg-transparent">
        <Container className="py-2">
          <div className="card overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map(({ k, v }) => (
                <div
                  key={k}
                  className="p-6 sm:p-7 text-center relative after:absolute after:inset-y-4 after:right-0 after:w-px after:bg-black/5 md:after:block after:hidden last:after:hidden"
                >
                  <CountUp
                    to={v}
                    className="block text-3xl sm:text-4xl font-bold tabular-nums"
                  />
                  <div className="text-[11px] sm:text-xs tracking-wide text-black/60 mt-2">
                    {k}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Highlighted works */}
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 " />
        <Container className="py-16">
          <SectionTitle title="Гол хэрэгжүүлсэн ажлууд" />
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: image collage */}
            <Reveal className="relative">
              <div className="grid grid-cols-2 gap-4 aspect-[5/3]">
                <div className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden">
                  <Image
                    src="https://mobixsystemsinc.com/images/team/1.jpg"
                    alt="World Milk Day"
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://mobixsystemsinc.com/images/team/1.jpg"
                    alt="Green Days"
                    fill
                    sizes="(max-width:1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://mobixsystemsinc.com/images/team/1.jpg"
                    alt="Training"
                    fill
                    sizes="(max-width:1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>

            {/* Right: list + CTA */}
            <Reveal delay={0.1}>
              <div className="card p-6 sm:p-8 h-full flex flex-col">
                <ul className="space-y-3 list-none">
                  {org.keyWorks.map((k) => (
                    <li key={k} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--brand-primary)] shrink-0" />
                      <p className="text-black/80 leading-relaxed">{k}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a href="/projects" className="btn-primary">
                    Дэлгэрэнгүй
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
      <ActivitiesSection />

      {/* News carousel + modal */}
      <NewsCarousel
        items={carouselItems}
        onOpen={(payload) => {
          setModal(payload);
          setOpen(true);
        }}
      />
      <NewsDialog
        open={open}
        onClose={() => setOpen(false)}
        item={modal || undefined}
      />

      {/* Partners */}
      <div className="mt-10">
        <PartnersPage />
      </div>
    </>
  );
}
