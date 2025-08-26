"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

export type NewsItem = {
  title: string;
  date: string;
  image?: string;
  body: string; // CKEditor 5 HTML
};

type Props = {
  open: boolean;
  onClose: () => void;
  item?: NewsItem | null;
};

export function NewsDialog({ open, onClose, item }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  // 1) backend origin for /media paths (strip /api if present)
  const BACKEND_ORIGIN = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
  ).replace(/\/api\/?$/, "");

  // 2) absolutize /media/... -> http://localhost:8000/media/...
  const preparedHtml = useMemo(() => {
    const raw = item?.body ?? "";
    return raw.replaceAll('src="/media/', `src="${BACKEND_ORIGIN}/media/`);
  }, [item?.body, BACKEND_ORIGIN]);

  // 3) sanitize with CKEditor 5-friendly allowlist
  const safeHtml = useMemo(
    () =>
      DOMPurify.sanitize(preparedHtml, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "b",
          "em",
          "i",
          "u",
          "s",
          "blockquote",
          "a",
          "hr",
          "ul",
          "ol",
          "li",
          "figure",
          "figcaption",
          "img",
          "span",
          "div",
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
        ],
        ALLOWED_ATTR: [
          "href",
          "target",
          "rel",
          "src",
          "alt",
          "width",
          "height",
          "style",
          "class",
          "colspan",
          "rowspan",
        ],
      }),
    [preparedHtml]
  );

  return (
    <AnimatePresence>
      {open && item && (
        <div className="fixed inset-0 z-[100]">
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

            <div className="p-5 sm:p-6 md:p-7 overflow-y-auto grow">
              <h2 className="text-xl sm:text-2xl font-bold">{item.title}</h2>
              <p className="text-sm text-black/60 mt-1">{item.date}</p>

              {/* CKEditor 5 HTML */}
              <div
                className="ck5-content prose max-w-none mt-4 prose-img:rounded prose-a:text-blue-600 hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: safeHtml }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
