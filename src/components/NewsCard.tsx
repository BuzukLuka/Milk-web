import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  date: string; // ISO
  humanDate: string; // хүний унших формат
  excerpt: string;
  slug: string;
  image?: string;
  onReadMore?: () => void; // байвал картыг бүхэлд нь дарна
};

export function NewsCard({
  title,
  date,
  humanDate,
  excerpt,
  slug,
  image,
  onReadMore,
}: Props) {
  const clickable = Boolean(onReadMore);

  return (
    <article
      className={[
        "group overflow-hidden rounded-xl2 border bg-white shadow-soft hover:shadow-lg transition",
        clickable
          ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary"
          : "",
      ].join(" ")}
      onClick={onReadMore}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? `${title} — дэлгэрэнгүй унших` : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onReadMore?.();
              }
            }
          : undefined
      }
    >
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

        <p className="text-xs text-black/60 mt-1">
          <time dateTime={date}>{humanDate}</time>
        </p>

        <p className="mt-3 text-black/80 line-clamp-3">{excerpt}</p>

        <div className="mt-4 flex items-center justify-between">
          {onReadMore ? (
            // Картаар дардаг тул энэхүү текстэд дарсан ч мөн адил ажиллана.
            <span className="pointer-events-none inline-flex items-center gap-2 text-brand-primary font-medium underline-offset-2 group-hover:underline">
              Дэлгэрэнгүй <span aria-hidden>→</span>
            </span>
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
