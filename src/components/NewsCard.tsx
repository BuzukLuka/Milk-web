import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  /** ISO date string (e.g. "2025-01-15" or "2025-01-15T00:00:00Z") */
  date: string;
  excerpt: string;
  slug: string;
  image?: string;
  onReadMore?: () => void;
  /** optionally override locale */
  locale?: string; // e.g. "mn-MN" | "en-CA"
};

export function NewsCard({
  title,
  date,
  excerpt,
  slug,
  image,
  onReadMore,
  locale = "mn-MN",
}: Props) {
  const human = formatDate(date, locale);

  return (
    <article className="group overflow-hidden rounded-xl2 border bg-white shadow-soft hover:shadow-lg transition">
      <div className="relative h-44">
        <Image
          src={image || "/news/placeholder.jpg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="font-semibold leading-snug line-clamp-2">{title}</h3>

        {/* Ижил текст хоёр талд гарахаар <time> ашиглая */}
        <p className="text-xs text-black/60 mt-1">
          <time dateTime={date}>{human}</time>
        </p>

        <p className="mt-3 text-black/80 line-clamp-3">{excerpt}</p>

        <div className="mt-4 flex items-center justify-between">
          {onReadMore ? (
            <button
              onClick={onReadMore}
              className="inline-flex items-center gap-2 text-brand-primary font-medium hover:underline"
              aria-label={`${title} — дэлгэрэнгүй унших`}
            >
              Дэлгэрэнгүй <span aria-hidden>→</span>
            </button>
          ) : (
            <Link
              href={`/news/${slug}`}
              className="inline-flex items-center gap-2 text-brand-primary font-medium hover:underline"
              aria-label={`${title} — дэлгэрэнгүй унших`}
            >
              Дэлгэрэнгүй <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
