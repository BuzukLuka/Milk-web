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
    <footer className="relative mt-16 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 inset-x-0 h-10 bg-[radial-gradient(40%_12px_at_50%_0%,rgba(45,106,159,0.55),transparent)]"
      />
      <div className="absolute inset-0 bg-[#040f2e]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(600px_200px_at_10%_20%,#2D6A9F,transparent),radial-gradient(500px_220px_at_90%_10%,#6BBF59,transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.25))]" />

      <Container className="relative py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group"
              aria-label={site.name}
            >
              <span className="text-xl font-display font-semibold tracking-tight">
                {site.name}
              </span>
              <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <p className="text-white/80 leading-relaxed">
              Монгол Улсын сүүний салбарын тогтвортой хөгжилд.
            </p>

            <div className="flex gap-3 pt-2">
              <Link
                href={site.facebook}
                target="_blank"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
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
                className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
              />
              <button className="btn-primary whitespace-nowrap">Илгээх</button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/70">
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
