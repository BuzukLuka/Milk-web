import "./globals.css";
import type { Metadata } from "next";
import { site } from "@/data/Site";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

export const metadata: Metadata = {
  title: `${site.name} — Албан ёсны веб`,
  description:
    "Сүүний салбарыг хөгжүүлэх үндэсний зөвлөлийн албан ёсны веб сайт.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
