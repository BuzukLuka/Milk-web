// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Container } from "../Container";
import { site } from "@/data/Site";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  BarChart3,
  Phone,
  Share2,
  Search,
  Globe,
} from "lucide-react";

type NavChild = { label: string; href: string; description?: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

function useHoverIntent(delayIn = 100, delayOut = 120) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const onEnter = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), delayIn);
  };
  const onLeave = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), delayOut);
  };
  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);
  return { open, setOpen, onEnter, onLeave } as const;
}

const dropVariants = {
  hidden: { opacity: 0, y: 8, pointerEvents: "none" as const },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto" as const,
    transition: {
      type: "spring" as const,
      stiffness: 340,
      damping: 26,
      mass: 0.6,
    },
  },
};
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.02 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

const ICON_MAP: Record<
  string,
  (p: { className?: string }) => React.JSX.Element
> = {
  Статистик: (p) => <BarChart3 {...p} />,
  "Холбоо барих": (p) => <Phone {...p} />,
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const nav = useMemo(() => site.nav as NavItem[], []);
  const centerItems = useMemo(
    () => nav.filter((i) => !ICON_MAP[i.label]),
    [nav]
  );
  const rightIconItems = useMemo(
    () => nav.filter((i) => !!ICON_MAP[i.label]),
    [nav]
  );

  return (
    <header
      className={[
        "sticky z-[100] transition-all duration-300",
        "bg-white/90 backdrop-blur border-b border-black/10",
        scrolled ? "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.12)]" : "",
      ].join(" ")}
      style={{ top: "var(--stack-offset, 0px)" }}
    >
      {/* Top bar — logo left, utilities right */}
      <Container className="mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0">
              <Image
                src="/cchuz_logo.png"
                alt="Logo"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
                priority
              />
            </div>

            {/* Organization text, smaller than logo */}
            <div className="leading-tight min-w-0">
              <span className="block text-sm md:text-base font-semibold bg-gradient-to-r from-[#1e90ff] to-[#0d47a1] bg-clip-text text-transparent">
                СҮҮНИЙ САЛБАРЫГ ХӨГЖҮҮЛЭХ
              </span>
              <span className="block text-sm md:text-base font-semibold bg-gradient-to-r from-[#1e90ff] to-[#0d47a1] bg-clip-text text-transparent">
                ҮНДЭСНИЙ ЗӨВЛӨЛ
              </span>
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="font-semibold tracking-tight truncate">
                {site.short}
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {rightIconItems.map((item) => {
              const Icon = ICON_MAP[item.label];
              return (
                <UtilityLink
                  key={item.href}
                  href={item.href}
                  ariaLabel={item.label}
                >
                  <Icon className="h-4 w-4" />
                </UtilityLink>
              );
            })}
          </div>

          {/* Mobile toggles */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm active:translate-y-[1px]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span>{mobileOpen ? "Хаах" : "Цэс"}</span>
            </button>
          </div>
        </div>
      </Container>

      {/* Second row — main nav */}
      <div className="border-t border-black/10">
        <Container className="mx-auto px-4 md:px-6 lg:px-8">
          <nav className="hidden md:flex h-12 items-center gap-1">
            {centerItems.map((item, idx) => (
              <div key={item.label} className="flex items-center">
                {item.children?.length ? (
                  <DesktopDropdown
                    item={item}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                ) : (
                  <TopNavLink
                    href={item.href}
                    label={item.label}
                    active={pathname === item.href}
                  />
                )}
                {/* subtle divider between items */}
                {idx !== centerItems.length - 1 && (
                  <span className="mx-1 h-5 w-px bg-black/10" aria-hidden />
                )}
              </div>
            ))}
          </nav>
        </Container>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              className="md:hidden fixed inset-0 bg-black/25 z-[150]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu overlay"
            />
            <motion.div
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              className="md:hidden fixed left-0 right-0 top-[56px] z-[160] bg-white border-t"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <Container className="mx-auto px-4 md:px-6 lg:px-8">
                <div className="py-2 w-full flex flex-col items-center justify-center">
                  <div className="w-full max-w-screen-sm divide-y">
                    {(site.nav as NavItem[]).map((item) => (
                      <MobileItem key={item.label} item={item} />
                    ))}
                  </div>
                </div>
              </Container>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ========== small UI bits ========== */
function UtilityButton({
  ariaLabel,
  children,
}: {
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-black/10 hover:border-black/20 text-gray-700 hover:text-brand-primary transition"
    >
      {children}
    </button>
  );
}

function UtilityLink({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-black/10 hover:border-black/20 text-gray-700 hover:text-brand-primary transition"
    >
      {children}
    </Link>
  );
}

function LangSwitcher() {
  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-2 h-9 rounded-lg border border-black/10 px-3 text-sm text-gray-700 hover:text-brand-primary hover:border-black/20 transition"
        aria-haspopup="listbox"
        aria-expanded="false"
      >
        <Globe className="h-4 w-4" />
        English
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ========== nav links ========== */
function TopNavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[15px] font-medium",
        "hover:text-brand-primary",
        active ? "text-brand-primary" : "text-gray-800",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

function DesktopDropdown({
  item,
  activeDropdown,
  setActiveDropdown,
}: {
  item: NavItem;
  activeDropdown: string | null;
  setActiveDropdown: (k: string | null) => void;
}) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { open, setOpen, onEnter, onLeave } = useHoverIntent();
  const isActive = activeDropdown === item.label || open;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const next = isActive ? null : item.label;
    setActiveDropdown(next);
    setOpen(!isActive);
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => {
        setActiveDropdown(item.label);
        onEnter();
      }}
      onMouseLeave={() => {
        onLeave();
        setActiveDropdown(null);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isActive}
        onClick={handleClick}
        className={[
          "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[15px] font-medium",
          isActive
            ? "text-brand-primary"
            : "text-gray-800 hover:text-brand-primary",
          "transition",
        ].join(" ")}
      >
        {item.label}
        <ChevronDown
          className={[
            "h-4 w-4 transition-transform",
            isActive ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      <DropdownPortal open={isActive} anchorRef={triggerRef}>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={dropVariants}
          className="min-w-[280px] rounded-2xl border bg-white shadow-xl z-[9999] pointer-events-auto"
          role="menu"
        >
          <motion.ul variants={listVariants} className="p-2">
            {item.children?.map((c) => (
              <motion.li key={c.href} variants={itemVariants}>
                <Link
                  href={c.href}
                  className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm hover:bg-brand-cream"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium group-hover:text-brand-primary transition-colors truncate">
                      {c.label}
                    </span>
                    {c.description ? (
                      <span className="text-xs text-gray-500 line-clamp-1">
                        {c.description}
                      </span>
                    ) : null}
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </DropdownPortal>
    </div>
  );
}

function DropdownPortal({
  open,
  anchorRef,
  children,
}: {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  const compute = () => {
    const el = anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ top: rect.bottom + 8, left: rect.left, width: rect.width });
  };

  useLayoutEffect(() => {
    if (!open) return;
    compute();
    const onScroll = () => compute();
    const onResize = () => compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      if (
        !panel.contains(e.target as Node) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        anchorRef.current?.dispatchEvent(
          new Event("mouseleave", { bubbles: true })
        );
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open, anchorRef]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        maxWidth: `min(92vw, 480px)`,
      }}
      className="z-[9999]"
    >
      {children}
    </div>,
    document.body
  );
}

/* ========== mobile ========== */
function MobileItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className="block px-1 py-3 text-base hover:text-brand-primary text-center"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="py-1">
      <button
        onClick={() => setOpen((v) => !v)}
        className="grid grid-cols-[1fr_auto_1fr] items-center w-full py-3 text-base"
        aria-expanded={open}
        type="button"
      >
        <span className="col-start-2 justify-self-center text-center">
          {item.label}
        </span>
        <ChevronDown
          className={[
            "col-start-3 justify-self-end h-5 w-5 transition-transform",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="pb-2 space-y-1">
              {item.children.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-brand-cream text-center"
                  >
                    <div className="font-medium">{c.label}</div>
                    {c.description ? (
                      <div className="text-xs text-gray-500">
                        {c.description}
                      </div>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
