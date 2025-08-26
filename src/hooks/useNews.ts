// src/hooks/useNews.ts
import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { getNewsById, listNews, type ListNewsParams } from "@/lib/api";
import type { News, Paginated } from "@/types/news";

const qk = {
  newsList: (p: ListNewsParams) => ["news", "list", p] as const,
  newsDetail: (id: number) => ["news", "detail", id] as const,
};

// Paged list (classic ?page=X)
export function useNewsList(params: ListNewsParams) {
  return useQuery({
    queryKey: qk.newsList(params),
    queryFn: () => listNews(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

// Infinite list (auto-load next via `next` URL’s page param)
// tiny helper to read ?page= from DRF `next` URL
function nextPageFrom(urlStr: string | null): number | undefined {
  if (!urlStr) return undefined;
  try {
    const url = new URL(
      urlStr,
      typeof window !== "undefined" ? window.location.origin : "http://x.local"
    );
    const p = url.searchParams.get("page");
    return p ? Number(p) : undefined;
  } catch {
    return undefined;
  }
}

export function useInfiniteNews(params: Omit<ListNewsParams, "page">) {
  return useInfiniteQuery<
    Paginated<News>, // server page shape
    Error,
    News[], // <-- what `data` will be after `select`
    [string, string, Omit<ListNewsParams, "page">],
    number
  >({
    queryKey: ["news", "infinite", params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => listNews({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => nextPageFrom(lastPage.next),
    getPreviousPageParam: (lastPage) => nextPageFrom(lastPage.previous),
    staleTime: 30_000,
    // Flatten pages -> News[]
    select: (infinite) => infinite.pages.flatMap((p) => p.results),
  });
}

// Detail
export function useNewsDetail(id: number) {
  return useQuery<News>({
    queryKey: qk.newsDetail(id),
    queryFn: () => getNewsById(id),
    staleTime: 60_000,
  });
}
