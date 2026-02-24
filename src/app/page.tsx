"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

import { org } from "@/data/Content";

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
  ArrowRight,
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

  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);

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
      <Hero />

      {/* ── Counter section — dark gradient ── */}
      <section className="counter-section py-10">
        <Container>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px">
            {stats.map(({ k, v }) => (
              <div
                key={k}
                className="text-center py-6 px-4"
              >
                <CountUp
                  to={v}
                  className="block text-3xl sm:text-4xl font-extrabold tabular-nums text-white"
                />
                <div className="text-xs sm:text-sm font-medium tracking-wider text-sky-300/80 mt-2 uppercase">
                  {k}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Section: Mission ── */}
      <section className="pt-14 pb-4">
        <div className="flex justify-center">
          <h2 className="section-badge badge-green">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            БИДНИЙ ЭРХЭМ ЗОРИЛГО
          </h2>
        </div>
      </section>

      <div>
        <Container>
          <GoalsMarquee
            subtitle={org.slogan}
            goals={org.goals}
            icons={goalIcons}
          />
        </Container>
      </div>

      {/* ── Section: Key Works ── */}
      <section className="pt-14 pb-4">
        <div className="flex justify-center">
          <h2 className="section-badge badge-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            ГОЛ ХЭРЭГЖҮҮЛСЭН АЖЛУУД
          </h2>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Container className="py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal className="relative">
              <div className="grid grid-cols-2 gap-3 aspect-[5/3]">
                <div className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/namriinnogoon_udruud.png"
                    alt="World Milk Day"
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/temdeglesen (2016).png"
                    alt="Green Days"
                    fill
                    sizes="(max-width:1024px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/tsagaan_huvisgal.png"
                    alt="Training"
                    fill
                    sizes="(max-width:1024px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card p-6 sm:p-8 h-full flex flex-col">
                <ul className="space-y-3 list-none flex-1">
                  {org.keyWorks.map((k) => (
                    <li key={k} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{k}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a href="/projects" className="btn-primary inline-flex items-center gap-2">
                    Дэлгэрэнгүй
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Section: Activities ── */}
      <section className="pt-10 pb-4">
        <div className="flex justify-center">
          <h2 className="section-badge badge-green">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            ҮЙЛ АЖИЛЛАГААНЫ ЧИГЛЭЛ
          </h2>
        </div>
      </section>

      <ActivitiesSection />

      {/* ── News ── */}
      <section className="pt-10 pb-4">
        <div className="flex justify-center">
          <h2 className="section-badge badge-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            МЭДЭЭ МЭДЭЭЛЭЛ
          </h2>
        </div>
      </section>

      {loadingNews ? (
        <div className="mx-auto max-w-xl px-4 py-6">
          <div className="animate-pulse rounded-lg bg-gray-100 h-20" />
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

      {/* ── Section: Partners ── */}
      <section className="pt-14 pb-4">
        <div className="flex justify-center">
          <h2 className="section-badge badge-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            ДЭМЖИХ БАЙГУУЛЛАГУУД
          </h2>
        </div>
      </section>

      <NewsDialog
        open={open}
        onClose={() => setOpen(false)}
        item={modal || undefined}
      />

      <div className="mt-6">
        <PartnersPage />
      </div>
    </>
  );
}
