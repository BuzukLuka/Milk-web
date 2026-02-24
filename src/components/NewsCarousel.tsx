"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Container } from "./Container";

export type NewsItem = {
  id: string | number;
  title: string;
  excerpt: string;
  dateText: string;
  dateTime?: string;
  href?: string;
  image?: string;
  tag?: string;
  modal?: {
    title: string;
    dateText: string;
    dateTime?: string;
    image?: string;
    body: string;
  };
};

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];

type Props = {
  items: NewsItem[];
  onOpen?: (payload: {
    title: string;
    dateText: string;
    dateTime?: string;
    image?: string;
    body: string;
  }) => void;
  autoplayMs?: number;
};

export function NewsCarousel({ items, onOpen, autoplayMs }: Props) {
  const total = items.length || 1;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const goto = useCallback(
    (i: number) => {
      const next = ((i % total) + total) % total;
      setDir(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, total]
  );

  const next = useCallback(() => goto(index + 1), [goto, index]);
  const prev = useCallback(() => goto(index - 1), [goto, index]);

  const active = useMemo(() => items[index] ?? items[0], [items, index]);

  useEffect(() => {
    if (!autoplayMs || total <= 1) return;
    const t = setInterval(() => goto(index + 1), autoplayMs);
    return () => clearInterval(t);
  }, [autoplayMs, goto, index, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

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
    <section className="relative overflow-x-hidden">
      <Container className="py-4">
        <div className="max-w-xl mx-auto">
          {/* Horizontal card: thumbnail left + text right */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="flex">
              {/* Thumbnail */}
              <div className="relative w-24 sm:w-28 shrink-0 overflow-hidden">
                <AnimatePresence custom={dir} mode="popLayout">
                  <motion.div
                    key={String(active?.id)}
                    className="absolute inset-0 will-change-transform"
                    custom={dir}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={variants}
                    drag="x"
                    dragElastic={0.02}
                    dragMomentum={false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      const { offset, velocity } = info;
                      if (offset.x < -60 || velocity.x < -250) next();
                      else if (offset.x > 60 || velocity.x > 250) prev();
                    }}
                  >
                    {active?.image ? (
                      <Image
                        src={active.image}
                        alt={active.title}
                        fill
                        priority
                        draggable={false}
                        className="select-none object-cover"
                        sizes="112px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-brand-primary/10" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Text content */}
              <div className="flex-1 px-3 py-2.5 flex flex-col justify-center min-w-0">
                {active?.tag && (
                  <span className="inline-flex w-fit rounded bg-brand-primary/10 text-brand-deep text-[9px] font-bold px-1.5 py-0.5 mb-1 uppercase tracking-wide">
                    {active.tag}
                  </span>
                )}

                <h3 className="font-display text-xs sm:text-sm font-bold leading-snug line-clamp-2">
                  {active?.title}
                </h3>

                <div className="mt-1.5 flex items-center gap-2">
                  {onOpen && active?.modal ? (
                    <button
                      onClick={() => onOpen(active.modal!)}
                      className="text-xs font-semibold text-brand-primary hover:text-brand-deep transition"
                      aria-label={`${active.title} — дэлгэрэнгүй`}
                    >
                      Дэлгэрэнгүй →
                    </button>
                  ) : active?.href ? (
                    <Link
                      href={active.href}
                      target={active.href?.startsWith("http") ? "_blank" : undefined}
                      className="text-xs font-semibold text-brand-primary hover:text-brand-deep transition inline-flex items-center gap-1"
                      aria-label={`${active.title} — дэлгэрэнгүй`}
                    >
                      Дэлгэрэнгүй →
                    </Link>
                  ) : null}

                  {active?.dateText && (
                    <span className="text-[10px] text-black/40">
                      <time dateTime={active.dateTime} suppressHydrationWarning>
                        {active.dateText}
                      </time>
                    </span>
                  )}
                </div>
              </div>

              {/* Nav arrows — vertical stack on right edge */}
              {total > 1 && (
                <div className="flex flex-col items-center justify-center gap-0.5 px-1.5 border-l border-gray-100">
                  <button
                    aria-label="Prev news"
                    onClick={prev}
                    className="grid place-items-center h-5 w-5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </button>
                  <span className="text-[9px] text-gray-400 tabular-nums font-medium">
                    {index + 1}/{total}
                  </span>
                  <button
                    aria-label="Next news"
                    onClick={next}
                    className="grid place-items-center h-5 w-5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
