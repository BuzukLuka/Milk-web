// src/app/news/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { NewsCard } from "@/components/NewsCard";
import { NewsDialog } from "@/components/NewsDialog";
import { useInfiniteNews } from "@/hooks/useNews";
import type { News } from "@/types/news";

function formatDateMN(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function excerptFromHtml(html: string, maxLen = 160) {
  const text =
    typeof window !== "undefined"
      ? new DOMParser().parseFromString(html, "text/html").body.textContent ??
        ""
      : html.replace(/<[^>]*>/g, "");
  return text.length > maxLen ? text.slice(0, maxLen).trim() + "…" : text;
}

export default function NewsListPage() {
  const {
    data: items = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteNews({ search: "", ordering: "-published_at" });

  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeItem: News | undefined = useMemo(
    () => items.find((n) => n.slug === activeSlug),
    [items, activeSlug]
  );
  console.log(activeItem);

  return (
    <>
      <Container className="space-y-8 py-14">
        <SectionTitle
          title="Мэдээ мэдээлэл"
          subtitle="Сүү, сүүн бүтээгдэхүүний салбарын мэдээ"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <NewsCard
              key={n.slug}
              title={n.title}
              date={formatDateMN(n.published_at)}
              excerpt={excerptFromHtml(n.body)}
              slug={n.slug}
              image={n.cover ?? undefined}
              onReadMore={() => {
                setActiveSlug(n.slug);
                setOpen(true);
              }}
              humanDate={formatDateMN(n.published_at)}
            />
          ))}
        </div>

        {hasNextPage && (
          <div className="flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="rounded border px-4 py-2 disabled:opacity-50"
            >
              {isFetchingNextPage ? "Уншиж байна…" : "Дараагийнх"}
            </button>
          </div>
        )}
      </Container>

      <NewsDialog
        open={open}
        onClose={() => setOpen(false)}
        item={
          activeItem
            ? {
                title: activeItem.title,
                date: formatDateMN(activeItem.published_at),
                image: activeItem.cover ?? undefined,
                body: activeItem.body,
              }
            : undefined
        }
      />
    </>
  );
}
