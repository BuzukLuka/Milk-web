// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { Container } from "../Container";
import { site } from "@/data/Site";
import {
  Facebook,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

type NavChild = { label: string; href: string; description?: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

export function Footer() {
  const nav = site.nav as NavItem[];
  const flatNav = nav.filter((n) => !n.children || n.children.length === 0);

  return (
    <footer className="relative mt-20 text-white">
      {/* Gradient transition from page bg to footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 inset-x-0 h-20 bg-gradient-to-b from-transparent to-[#0a1628]"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0a1628 0%, #0d1f3c 40%, #0a1930 100%)" }} />
      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(800px 400px at 15% 30%, rgba(2,132,199,.3), transparent), radial-gradient(600px 300px at 85% 70%, rgba(34,197,94,.15), transparent)" }} />
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <Container className="relative py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              aria-label={site.name}
            >
              <span className="text-xl font-display font-bold tracking-tight bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                {site.name}
              </span>
              <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 text-sky-400" />
            </Link>
            <p className="text-white/60 leading-relaxed text-sm">
              Монгол Улсын сүүний салбарын тогтвортой хөгжилд.
            </p>

            <div className="flex gap-3 pt-3">
              <Link
                href={site.facebook}
                target="_blank"
                className="group/icon inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/30 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white/70 group-hover/icon:text-sky-400 transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Цэс</h5>
            <ul className="space-y-2">
              {flatNav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="group inline-flex items-center gap-2 text-white/80 hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4 opacity-60 -ml-1 transition-transform group-hover:translate-x-1" />
                    <span className="relative">
                      {n.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/70 transition-all group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Холбоо барих</h5>
            <ul className="space-y-3 text-white/85">
              {site.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 opacity-80" />
                  <span>{site.address}</span>
                </li>
              )}
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 opacity-80" />
                <a
                  href={`mailto:${site.email || "info@example.mn"}`}
                  className="hover:underline"
                >
                  {site.email || "info@example.mn"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 opacity-80" />
                <a
                  href={`tel:${(site.phone || "+976 xxxx xxxx").replace(
                    /\s/g,
                    ""
                  )}`}
                  className="hover:underline"
                >
                  {site.phone || "+976 xxxx xxx"}
                </a>
              </li>
            </ul>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex items-center gap-2"
            >
              <input
                type="email"
                placeholder="Имэйл хаяг"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/30 transition-all"
              />
              <button className="btn-primary whitespace-nowrap !py-2.5 !px-5 !text-xs">Илгээх</button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>
            © {new Date().getFullYear()} {site.short}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white">
              Нууцлал
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/terms" className="hover:text-white">
              Үйлчилгээний нөхцөл
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
