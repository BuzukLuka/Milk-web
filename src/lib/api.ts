// src/lib/news.api.ts
import { http } from "./http";
import type { News, Paginated } from "@/types/news";

export type ListNewsParams = {
  page?: number;
  search?: string;
  ordering?: string;
};

function toPaginated<T>(data: any): Paginated<T> {
  if (Array.isArray(data)) {
    return { count: data.length, next: null, previous: null, results: data };
  }
  return data as Paginated<T>;
}

export async function listNews(params: ListNewsParams = {}) {
  const res = await http.get("/news/", { params });
  return toPaginated<News>(res.data);
}

export async function getNewsById(id: number) {
  const res = await http.get<News>(`/news/${id}/`);
  return res.data;
}
