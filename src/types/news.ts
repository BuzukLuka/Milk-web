// src/types/news.ts
export type News = {
  id: number;
  title: string;
  slug: string;
  body: string; // HTML from CKEditor 5
  cover: string | null; // absolute or relative URL
  is_published: boolean;
  published_at: string | null; // ISO
  author: number | null; // or expand if your serializer returns a nested object
  created_at: string; // ISO
  updated_at: string; // ISO
};

// DRF list response
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
