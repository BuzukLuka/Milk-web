"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./Container";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

export type NewsItem = {
  id: string | number;
  title: string;
  excerpt: string;
  date: string; // ISO or human
  href?: string; // internal/external
  image?: string; // /news/xxx.jpg
  tag?: string; // optional badge
  // Optional modal payload when opening as a popup:
  modal?: { title: string; date: string; image?: string; body: string };
};

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];

export function NewsCarousel({
  items,
  onOpen, // optional: (payload) => void
}: {
  items: NewsItem[];
  onOpen?: (payload: {
    title: string;
    date: string;
    image?: string;
    body: string;
  }) => void;
}) {
  const total = items.length || 1;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const goto = (i: number) => {
    const next = (i + total) % total;
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };
  const next = () => goto(index + 1);
  const prev = () => goto(index - 1);

  const active = useMemo(() => items[index] ?? items[0], [items, index]);

  const variants = {
    enter: (d: 1 | -1) => ({ x: d * 40, opacity: 0, filter: "blur(2px)" }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 110, damping: 18 },
        opacity: { duration: 0.45, ease: EASE_OUT },
        filter: { duration: 0.45, ease: EASE_OUT },
      },
    },
    exit: (d: 1 | -1) => ({
      x: d * -40,
      opacity: 0,
      filter: "blur(2px)",
      transition: { duration: 0.35, ease: EASE_IN },
    }),
  } as const;

  return (
    <section className="relative ">
      <Container className="py-16 ">
        <div className="relative overflow-hidden rounded-xl2 border bg-white shadow-soft">
          <div className="grid lg:grid-cols-2">
            {/* Visual */}
            <div className="relative h-64 sm:h-80 lg:h-[420px]">
              <AnimatePresence custom={dir} mode="popLayout">
                <motion.div
                  key={String(active?.id)}
                  className="absolute inset-0"
                  custom={dir}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  drag="x"
                  dragElastic={0.06}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    const { offset, velocity } = info;
                    if (offset.x < -60 || velocity.x < -250) next();
                    else if (offset.x > 60 || velocity.x > 250) prev();
                  }}
                >
                  {active?.image ? (
                    <>
                      <Image
                        src={active.image}
                        alt={active.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-brand-primary/10" />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Arrows */}
              {total > 1 && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
                  <button
                    aria-label="Prev news"
                    onClick={prev}
                    className="pointer-events-auto grid place-items-center h-10 w-10 rounded-full bg-white/90 text-brand-ink hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    aria-label="Next news"
                    onClick={next}
                    className="pointer-events-auto grid place-items-center h-10 w-10 rounded-full bg-white/90 text-brand-ink hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8 flex flex-col">
              {active?.tag && (
                <span className="inline-flex w-fit rounded-full bg-brand-primary/10 text-brand-deep text-xs font-semibold px-3 py-1 mb-3">
                  {active.tag}
                </span>
              )}
              <h3 className="font-display text-2xl font-bold leading-snug">
                {active?.title}
              </h3>
              <p className="mt-3 text-black/75 leading-relaxed">
                {active?.excerpt}
              </p>
              <div className="mt-3 text-sm text-black/60">{active?.date}</div>

              <div className="mt-6">
                {onOpen && active?.modal ? (
                  <button
                    onClick={() => onOpen(active.modal!)}
                    className="btn-secondary"
                    aria-label={`${active.title} — дэлгэрэнгүй унших`}
                  >
                    Дэлгэрэнгүй
                  </button>
                ) : active?.href ? (
                  <Link
                    href={active.href}
                    target={
                      active.href?.startsWith("http") ? "_blank" : undefined
                    }
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    Дэлгэрэнгүй
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>

              {/* Dots */}
              {total > 1 && (
                <div className="mt-6 flex gap-2">
                  {items.map((n, i) => (
                    <button
                      key={String(n.id)}
                      onClick={() => goto(i)}
                      aria-label={`News ${i + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        i === index
                          ? "w-8 bg-brand-primary"
                          : "w-2.5 bg-black/20 hover:bg-black/35"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
