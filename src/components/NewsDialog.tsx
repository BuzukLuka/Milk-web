"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

export type NewsItem = {
  title: string;
  date: string;
  image?: string;
  body: string; // plain text or lightly formatted
};

type Props = {
  open: boolean;
  onClose: () => void;
  item?: NewsItem | null;
};

export function NewsDialog({ open, onClose, item }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // ESC to close + focus management
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // lock scroll
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    // focus close on mount
    setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && item && (
        <div className="fixed inset-0 z-[100]">
          {/* Overlay */}
          <motion.div
            ref={overlayRef}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === overlayRef.current) onClose();
            }}
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            className="absolute inset-x-3 sm:inset-x-8 md:inset-x-16 lg:inset-x-24 top-[6vh] bottom-[6vh] rounded-xl2 shadow-soft bg-white overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.25 },
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.98,
              transition: { duration: 0.2 },
            }}
          >
            {/* Header image */}
            <div className="relative h-40 sm:h-56 md:h-64 lg:h-72 w-full">
              <Image
                src={item.image || "/news/placeholder.jpg"}
                alt={item.title}
                fill
                className="object-cover"
                priority
              />
              <button
                ref={closeBtnRef}
                className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 hover:bg-white text-brand-ink grid place-items-center focus:outline-none focus:ring-2 focus:ring-brand-primary"
                onClick={onClose}
                aria-label="Хаах"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 md:p-7 overflow-y-auto grow">
              <h2 className="text-xl sm:text-2xl font-bold">{item.title}</h2>
              <p className="text-sm text-black/60 mt-1">{item.date}</p>
              <div className="mt-4 text-black/80 leading-relaxed whitespace-pre-line">
                {item.body}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
