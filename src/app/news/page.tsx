// src/app/news/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { NewsCard } from "@/components/NewsCard";
import { NewsDialog } from "@/components/NewsDialog";
import { NEWS } from "@/data/News";

function formatDateMN(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsListPage() {
  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeItem = useMemo(
    () => NEWS.find((n) => n.slug === activeSlug) || null,
    [activeSlug]
  );

  return (
    <>
      <Container className="py-14 space-y-8">
        <SectionTitle
          title="Мэдээ мэдээлэл"
          subtitle="Сүү, сүүн бүтээгдэхүүний салбарын мэдээ"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS.map((n) => (
            <NewsCard
              key={n.slug}
              title={n.title}
              date={formatDateMN(n.date)}
              excerpt={n.excerpt}
              slug={n.slug}
              image={n.image}
              onReadMore={() => {
                setActiveSlug(n.slug);
                setOpen(true);
              } } humanDate={""}            />
          ))}
        </div>
      </Container>

      {/* Popup detail */}
      <NewsDialog
        open={open}
        onClose={() => setOpen(false)}
        item={
          activeItem
            ? {
                title: activeItem.title,
                date: formatDateMN(activeItem.date),
                image: activeItem.image,
                body: activeItem.body,
              }
            : undefined
        }
      />
    </>
  );
}
