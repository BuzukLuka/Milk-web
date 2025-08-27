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

  // зөвхөн shadow-т нөлөөлнө
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // route солигдоход хаах
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // body scroll lock (mobile menu)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // scroll/resize дээр drop-уудыг хаах
  useEffect(() => {
    const closeAll = () => {
      if (mobileOpen) setMobileOpen(false);
      if (activeDropdown) setActiveDropdown(null);
    };
    const onScroll = () => closeAll();
    const onResize = () => closeAll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen, activeDropdown]);

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
        "bg-white/80 backdrop-blur border-b border-black/5 overflow-visible",
        scrolled ? "shadow-[0_4px_16px_-8px_rgba(0,0,0,0.12)]" : "",
      ].join(" ")}
      style={{ top: "var(--stack-offset, 0px)" }}
    >
      <Container className="mx-auto h-16 px-4 md:px-6 lg:px-8 grid grid-cols-[auto,1fr,auto] items-center gap-3 overflow-visible">
        <div className="flex items-center min-w-0">
          <Link
            href="/"
            className="group flex items-center gap-3 whitespace-nowrap cursor-pointer"
          >
            <div
              className="h-9 w-12 rounded-xl overflow-hidden bg-transparent
                 transition-transform duration-300 ease-out
                 group-hover:scale-110 group-active:scale-95
                 focus-visible:outline-none"
            >
              <Image
                src="/cchuz_logo.png"
                alt="Logo"
                width={70}
                height={70}
                className="object-contain"
                priority
              />
            </div>
            <span
              className="font-display font-semibold tracking-tight transition-colors duration-300
                 group-hover:text-brand-primary"
            >
              {site.short}
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-1 h-10 overflow-visible">
          <div className="flex items-center gap-1 whitespace-nowrap">
            {centerItems.map((item) =>
              item.children?.length ? (
                <DesktopDropdown
                  key={item.label}
                  item={item}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
              ) : (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={pathname === item.href}
                />
              )
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center justify-end gap-2 h-10">
          {rightIconItems.map((item) => {
            const Icon = ICON_MAP[item.label];
            return (
              <IconNavLink
                key={item.href}
                href={item.href}
                title={item.label}
                active={pathname === item.href}
              >
                <Icon className="h-5 w-5" />
              </IconNavLink>
            );
          })}
        </div>

        <div className="md:hidden col-start-3 flex items-center justify-end">
          <button
            type="button"
            className="relative z-[170] inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm active:translate-y-[1px] pointer-events-auto"
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
            <span className="whitespace-nowrap">
              {mobileOpen ? "Хаах" : "Цэс"}
            </span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              className="md:hidden fixed inset-0 bg-black/20 z-[150]"
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
              className="md:hidden fixed left-0 right-0 top-16 z-[160] bg-white border-t"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <Container className="mx-auto px-4 md:px-6 lg:px-8">
                <div className="py-2 w-full flex flex-col items-center justify-center">
                  <div className="w-full max-w-screen-sm">
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

function IconNavLink({
  href,
  title,
  active,
  children,
}: {
  href: string;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={title}
      className={[
        "inline-flex items-center justify-center w-10 h-10 rounded-xl border",
        "transition shadow-sm hover:shadow-md active:translate-y-[1px]",
        active
          ? "border-brand-primary text-brand-primary"
          : "border-black/10 text-gray-700 hover:text-brand-primary",
      ].join(" ")}
      title={title}
    >
      {children}
    </Link>
  );
}

function NavLink({
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
        "group relative inline-flex items-center px-3 text-sm font-medium rounded-xl transition",
        "hover:text-brand-primary whitespace-nowrap",
        active ? "text-brand-primary" : "text-gray-800",
      ].join(" ")}
    >
      <span className="truncate">{label}</span>
      <span
        className={[
          "absolute left-2 right-2 -bottom-1 h-[2px] rounded-full",
          active
            ? "bg-brand-primary"
            : "bg-transparent group-hover:bg-brand-primary/60",
          "transition-colors",
        ].join(" ")}
      />
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
          "inline-flex items-center gap-1 px-3 text-sm font-medium rounded-xl h-10 whitespace-nowrap",
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
            isActive ? "rotate-180" : "rotate-0",
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

function MobileItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className="block py-3 text-base border-b last:border-b-0 hover:text-brand-primary text-center"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b last:border-b-0">
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
            <ul className="pb-2">
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
