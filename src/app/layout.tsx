import "./globals.css";
import type { Metadata } from "next";
import { site } from "@/data/Site";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import Providers from "./providers";

export const metadata: Metadata = {
  title: `${site.name} — Албан ёсны веб`,
  description:
    "Сүүний салбарыг хөгжүүлэх үндэсний зөвлөлийн албан ёсны веб сайт.",
  icons: {
    icon: [
      { url: "/cchuz_logo.png", type: "image/png", sizes: "32x32" },
      { url: "/cchuz_logo.png", type: "image/png", sizes: "192x192" },
    ],
    apple: { url: "/cchuz_logo.png" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col relative">
        {/* Sitewide gradient + grid background */}
        <div aria-hidden className="fixed inset-0 -z-50 bg-mesh" />
        <div aria-hidden className="fixed inset-0 -z-40 bg-grid opacity-80" />
        <div
          aria-hidden
          className="fixed -z-30 inset-x-0 -top-24 h-48 blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(40% 50% at 50% 0%, rgba(180,225,255,.6), transparent 60%)",
          }}
        />

        <Header />
        <main className="flex-1">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
