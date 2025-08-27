// src/lib/news.api.ts
import { http } from "./http";
import type { News, Paginated } from "@/types/news";

export type ListNewsParams = {
  page?: number;
  search?: string;
  ordering?: string;
};

// --- helpers: narrow unknown -> Paginated<T> ---
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

function toPaginated<T>(data: unknown): Paginated<T> {
  // API нь массив шууд буцаадаг тохиолдол
  if (Array.isArray(data)) {
    return {
      count: data.length,
      next: null,
      previous: null,
      results: data as T[],
    };
  }

  // Paginated-like объект
  if (isRecord(data) && "results" in data) {
    const rec = data as Record<string, unknown>;
    const results = Array.isArray(rec.results) ? (rec.results as T[]) : [];
    const count = typeof rec.count === "number" ? rec.count : results.length;
    const next =
      typeof rec.next === "string" || rec.next === null
        ? (rec.next as string | null)
        : null;
    const previous =
      typeof rec.previous === "string" || rec.previous === null
        ? (rec.previous as string | null)
        : null;

    return { count, next, previous, results };
  }

  // fallback: хоосон жагсаалт
  return { count: 0, next: null, previous: null, results: [] };
}

export async function listNews(
  params: ListNewsParams = {}
): Promise<Paginated<News>> {
  const res = await http.get("/news/", { params });
  return toPaginated<News>(res.data as unknown);
}

export async function getNewsById(id: number): Promise<News> {
  const res = await http.get<News>(`/news/${id}/`);
  return res.data;
}
