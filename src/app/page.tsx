"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
// import { SectionTitle } from "@/components/SectionTitle"; // ⛔️ хэрэггүй тул устгасан
import { Reveal } from "@/components/Reveal";

import { org } from "@/data/Content";
// import { NEWS } from "@/data/News";

import {
  NewsCarousel,
  type NewsItem as CarouselItem,
} from "@/components/NewsCarousel";
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

/* -------------------- helpers -------------------- */

const goalIcons = [Target, Network, ShieldCheck, Award, LineChart, Leaf];

function formatDateMN(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtmlToExcerpt(html: string, max = 160) {
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max).trim() + "…" : text;
}

function absolutize(url?: string | null, backendOrigin?: string) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  const base =
    backendOrigin ||
    (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(
      /\/api\/?$/,
      "",
    );
  return url.startsWith("/") ? `${base}${url}` : `${base}/${url}`;
}

/* -------------------- counter -------------------- */

function parseTarget(value: string | number): { end: number; suffix: string } {
  if (typeof value === "number") return { end: value, suffix: "" };
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { end: Number(value) || 0, suffix: "" };
  return { end: Number(match[1]) || 0, suffix: match[2] || "" };
}

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
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

/* -------------------- types -------------------- */

type ApiNews = {
  id: number;
  title: string;
  slug: string;
  body: string;
  cover: string | null;
  is_published: boolean;
  published_at: string | null;
};

/* -------------------- page -------------------- */

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<{
    title: string;
    date: string;
    image?: string;
    body: string;
  } | null>(null);

  // Backend-ээс сүүлийн 5 мэдээ татах
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(false); // ✅ UI-д ашиглана

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingNews(true);
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

        const res = await fetch(
          `${API_BASE}/news/?ordering=-published_at&page=1&page_size=5`,
          {
            credentials: "include",
            headers: { Accept: "application/json" },
          },
        );
        const json = await res.json();
        const rows: ApiNews[] = Array.isArray(json)
          ? json
          : (json.results ?? []);

        const backendOrigin = API_BASE.replace(/\/api\/?$/, "");
        const items: CarouselItem[] = rows.map((n) => {
          const dateText = formatDateMN(n.published_at);
          const dateTime = n.published_at ?? undefined;
          return {
            id: n.id,
            title: n.title,
            excerpt: stripHtmlToExcerpt(n.body),
            dateText,
            dateTime,
            href: `/news/${n.slug}`,
            image:
              absolutize(n.cover ?? undefined, backendOrigin) ||
              "/news/placeholder.jpg",
            tag: "Мэдээ",
            modal: {
              title: n.title,
              dateText,
              dateTime,
              image:
                absolutize(n.cover ?? undefined, backendOrigin) ||
                "/news/placeholder.jpg",
              body: n.body,
            },
          };
        });

        if (alive) setCarouselItems(items);
      } catch (e) {
        console.error("Failed to load latest news:", e);
        if (alive) setCarouselItems([]);
      } finally {
        if (alive) setLoadingNews(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // live data lengths; fallback to defaults
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

      <section className="relative">
        {/* Дээд тууз */}
        <div className="h-4 bg-[#71c760]" />

        {/* Pill гарчиг — absolute ашиглахгүй */}
        <div className="-mt-4 flex justify-center pb-2">
          <h2
            className="
              inline-flex items-center justify-center
              rounded-full bg-[#71c760] px-5 sm:px-6 py-2
              text-white font-bold tracking-wide text-[11px] sm:text-sm md:text-base
              text-center shadow
            "
          >
            БИДНИЙ ЭРХЭМ ЗОРИЛГО
          </h2>
        </div>
      </section>

      {/* Mission / Goals */}
      <div>
        <Container>
          <GoalsMarquee
            subtitle={org.slogan}
            goals={org.goals}
            icons={goalIcons}
          />
        </Container>
      </div>

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

      <section className="relative">
        {/* Дээд тууз */}
        <div className="h-4 bg-[#10a5dd]" />

        {/* Pill гарчиг — absolute ашиглахгүй */}
        <div className="-mt-4 flex justify-center pb-2">
          <h2
            className="
              inline-flex items-center justify-center
              rounded-full bg-[#10a5dd] px-5 sm:px-6 py-2
              text-white font-bold tracking-wide text-[11px] sm:text-sm md:text-base
              text-center shadow
            "
          >
            ГОЛ ХЭРЭГЖҮҮЛСЭН АЖЛУУД
          </h2>
        </div>
      </section>

      {/* Highlighted works */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 " />
        <Container className="py-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: image collage */}
            <Reveal className="relative">
              <div className="grid grid-cols-2 gap-4 aspect-[5/3]">
                <div className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden">
                  <Image
                    src="/namriinnogoon_udruud.png"
                    alt="World Milk Day"
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="/temdeglesen (2016).png"
                    alt="Green Days"
                    fill
                    sizes="(max-width:1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="/tsagaan_huvisgal.png"
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

      <section className="relative">
        {/* Дээд тууз */}
        <div className="h-4 bg-[#71c760]" />

        {/* Pill гарчиг — absolute ашиглахгүй */}
        <div className="-mt-4 flex justify-center pb-2">
          <h2
            className="
              inline-flex items-center justify-center
              rounded-full bg-[#71c760] px-5 sm:px-6 py-2
              text-white font-bold tracking-wide text-[11px] sm:text-sm md:text-base
              text-center shadow
            "
          >
            БИДНИЙ ЭРХЭМ ЗОРИЛГО 1
          </h2>
        </div>
      </section>

      <ActivitiesSection />

      {/* News: loading/ready хоёр төлөв */}
      {loadingNews ? (
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card p-4">
                <div className="h-40 bg-black/5 rounded-md mb-3" />
                <div className="h-4 bg-black/10 rounded w-3/4 mb-2" />
                <div className="h-3 bg-black/10 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NewsCarousel
          items={carouselItems}
          onOpen={(payload) => {
            setModal({
              title: payload.title,
              date: payload.dateText,
              image: payload.image,
              body: payload.body,
            });
            setOpen(true);
          }}
        />
      )}

      <section className="relative">
        {/* Дээд тууз */}
        <div className="h-4 bg-[#10a5dd]" />

        {/* Pill гарчиг — absolute ашиглахгүй */}
        <div className="-mt-4 flex justify-center pb-2">
          <h2
            className="
              inline-flex items-center justify-center
              rounded-full bg-[#10a5dd] px-5 sm:px-6 py-2
              text-white font-bold tracking-wide text-[11px] sm:text-sm md:text-base
              text-center shadow
            "
          >
            ДЭМЖИХ БАЙГУУЛЛАГУУД
          </h2>
        </div>
      </section>

      {/* Dialog & Partners */}
      <NewsDialog
        open={open}
        onClose={() => setOpen(false)}
        item={modal || undefined}
      />

      <div className="mt-10">
        <PartnersPage />
      </div>
    </>
  );
}
