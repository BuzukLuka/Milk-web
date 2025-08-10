// src/app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { MilkWave } from "@/components/MilkWave";
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

const goalIcons = [Target, Network, ShieldCheck, Award, LineChart, Leaf];

function formatDateMN(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function HomePage() {
  // Modal state for NewsDialog
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<{
    title: string;
    date: string;
    image?: string;
    body: string;
  } | null>(null);

  // Map NEWS -> NewsCarousel items (with modal payload)
  const carouselItems = NEWS.map((n) => ({
    id: n.slug,
    title: n.title,
    excerpt: n.excerpt,
    date: formatDateMN(n.date),
    image: n.image || "/news/placeholder.jpg",
    href: `/news/${n.slug}`, // fallback navigation if no popup
    tag: "Мэдээ",
    modal: {
      title: n.title,
      date: formatDateMN(n.date),
      image: n.image || "/news/placeholder.jpg",
      body: n.body,
    },
  }));

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Milk wave divider */}
      <MilkWave className="text-brand-milk -mt-10" />

      {/* Mission / Goals */}
      <Container className="py-16">
        <GoalsMarquee
          title="Бидний эрхэм зорилго"
          subtitle={org.slogan}
          goals={org.goals}
          icons={goalIcons}
        />
      </Container>

      {/* Highlighted Achievements (with imagery) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(700px_240px_at_10%_0%,#2D6A9F10,transparent)]" />
        <Container className="py-16">
          <SectionTitle title="Гол хэрэгжүүлсэн ажлууд" />
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: image collage */}
            <Reveal className="relative">
              <div className="grid grid-cols-2 gap-4 aspect-[5/3]">
                <div className="relative col-span-1 row-span-2 rounded-xl overflow-hidden">
                  <Image
                    src="https://mobixsystemsinc.com/images/team/1.jpg"
                    alt="World Milk Day"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src="https://mobixsystemsinc.com/images/team/1.jpg"
                    alt="Green Days"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src="https://mobixsystemsinc.com/images/team/1.jpg"
                    alt="Training"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>

            {/* Right: list with icons + CTA */}
            <Reveal delay={0.1}>
              <div className="card p-6 h-full flex flex-col">
                <ul className="space-y-3 list-none">
                  {org.keyWorks.map((k) => (
                    <li key={k} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-primary shrink-0" />
                      <p className="text-black/80 leading-relaxed">{k}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* News carousel (with popup) */}
      <NewsCarousel
        items={carouselItems}
        onOpen={(payload) => {
          setModal(payload);
          setOpen(true);
        }}
      />

      {/* News popup dialog */}
      <NewsDialog
        open={open}
        onClose={() => setOpen(false)}
        item={modal || undefined}
      />

      <PartnersPage />
    </>
  );
}
