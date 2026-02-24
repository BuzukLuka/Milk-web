// src/components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./Container";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  title: string;
  subtitle?: string;
  ctaPrimary?: { href: string; label: string };
  ctaSecondary?: { href: string; label: string };
  img: string;
  overlay?: string;
};

const SLIDES: Slide[] = [
  {
    title: "Цагаан хувьсгал — Ногоон хөгжил",
    subtitle:
      "Дижитал, дэвшилтэт технологиор сүүний салбарын тогтвортой хөгжлийг хамтдаа.",
    ctaPrimary: { href: "/projects", label: "Төслүүд харах" },
    ctaSecondary: { href: "/about", label: "Бидний тухай" },
    img: "/hello1.png",
    overlay: "bg-gradient-to-r from-black/60 via-black/40 to-black/20",
  },
  {
    title: "Фермер төвтэй экосистем",
    subtitle:
      "Нэмүү өртгийн сүлжээ, стандарт, сургалтыг нэгтгэсэн бодлогын хэрэгжилт.",
    ctaPrimary: { href: "/about/strategy", label: "Стратеги" },
    ctaSecondary: { href: "/statistics", label: "Статистик" },
    img: "/farmer.jpg",
    overlay: "bg-gradient-to-r from-black/60 via-black/35 to-black/15",
  },
  {
    title: "Чанар ба аюулгүй байдал",
    subtitle:
      "Лабораторийн чадавх, хяналт, эрүүл ахуйн стандартуудыг төлөвлөж хэрэгжүүлнэ.",
    ctaPrimary: { href: "/projects", label: "Одоогийн төслүүд" },
    ctaSecondary: { href: "/contact", label: "Хамтрах" },
    img: "/quality.png",
    overlay: "bg-gradient-to-r from-black/65 via-black/40 to-black/20",
  },
];

const AUTOPLAY_MS = 6000;

// cubic-bezier easings
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const paginate = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((i) => (i + dir + total) % total);
    clearTimer(); // manual nav хиймэгц одоогийн timeout-ийг тасална
  };

  const goTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
    clearTimer();
  };

  // Autoplay with pause on hover/focus — 'next' функцийг ашиглахгүй
  useEffect(() => {
    if (paused) return;
    clearTimer();
    timer.current = setTimeout(() => {
      // дараагийн слайд руу автоматаар шилжинэ
      setDirection(1);
      setIndex((i) => (i + 1 + total) % total);
    }, AUTOPLAY_MS);

    return clearTimer;
  }, [index, paused, total]);

  const active = useMemo(() => SLIDES[index], [index]);

  const variants = {
    enter: (dir: 1 | -1) => ({
      x: dir * 40,
      opacity: 0,
      filter: "blur(2px)",
    }),
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
    exit: (dir: 1 | -1) => ({
      x: dir * -40,
      opacity: 0,
      filter: "blur(2px)",
      transition: { duration: 0.35, ease: EASE_IN },
    }),
  } as const;

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative h-[68vh] min-h-[420px] lg:h-[78vh]">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={active.img}
            className="absolute inset-0"
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            drag="x"
            dragElastic={0.06}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              const { offset, velocity } = info;
              if (offset.x < -60 || velocity.x < -250) paginate(1);
              else if (offset.x > 60 || velocity.x > 250) paginate(-1);
            }}
          >
            {/* Background with cinematic overlay */}
            <div className="absolute inset-0">
              <Image
                src={active.img}
                alt={active.title}
                fill
                priority
                className="object-cover will-change-transform scale-[1.02]"
              />
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 ${
                  active.overlay || "bg-black/25"
                }`}
              />
              {/* Bottom vignette for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Subtle blue accent glow */}
              <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-sky-600/10 to-transparent" />
            </div>

            {/* Content */}
            <Container className="relative h-full flex flex-col justify-center text-white">
              {/* Animated accent line */}
              <motion.div
                className="w-16 h-1 rounded-full mb-6"
                style={{ background: "linear-gradient(90deg, #38bdf8, #22c55e)" }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 64, opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.6, ease: EASE_OUT }}
              />

              <motion.h1
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,.3)" }}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.08,
                  duration: 0.5,
                  ease: [0.42, 0, 1, 1],
                }}
              >
                {active.title}
              </motion.h1>

              {active.subtitle && (
                <motion.p
                  className="mt-5 max-w-xl text-base sm:text-lg text-white/90 font-medium leading-relaxed"
                  style={{ textShadow: "0 1px 8px rgba(0,0,0,.2)" }}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.16,
                    duration: 0.5,
                    ease: [0.42, 0, 1, 1],
                  }}
                >
                  {active.subtitle}
                </motion.p>
              )}

              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.24,
                  duration: 0.5,
                  ease: [0.42, 0, 1, 1],
                }}
              >
                {active.ctaPrimary && (
                  <Link href={active.ctaPrimary.href} className="btn-primary">
                    {active.ctaPrimary.label}
                  </Link>
                )}
                {active.ctaSecondary && (
                  <Link href={active.ctaSecondary.href} className="btn-third">
                    {active.ctaSecondary.label}
                  </Link>
                )}
              </motion.div>
            </Container>
          </motion.div>
        </AnimatePresence>

        {/* Controls — glass-style arrows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="container-px mx-auto h-full flex items-center justify-between">
            <button
              aria-label="Previous slide"
              onClick={() => paginate(-1)}
              className="pointer-events-auto hidden sm:grid place-items-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 hover:border-white/40 focus:outline-none transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next slide"
              onClick={() => paginate(1)}
              className="pointer-events-auto hidden sm:grid place-items-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 hover:border-white/40 focus:outline-none transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Progress dots — modern pill style */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-auto flex items-center gap-2 rounded-full bg-black/20 backdrop-blur-sm px-3 py-1.5">
          {SLIDES.map((s, i) => {
            const isActive = i === index;
            return (
              <motion.button
                key={s.img}
                onClick={() => goTo(i)}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                aria-label={`Slide ${i + 1}`}
                aria-current={isActive ? "true" : "false"}
                className="h-2 rounded-full focus:outline-none"
                initial={false}
                animate={{
                  width: isActive ? 28 : 8,
                  backgroundColor: isActive
                    ? "#38bdf8"
                    : "rgba(255,255,255,0.5)",
                }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                style={{ borderRadius: 9999 }}
                title={`${i + 1}/${total}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
