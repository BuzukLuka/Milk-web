// components/ActivitiesSection.tsx
import Image from "next/image";

export default function ActivitiesSection() {
  const items = [
    {
      src: "/2613158.png", // эсвэл .png
      alt: "Судалгаа хөгжүүлэлт",
      label: "СУДАЛГАА ХӨГЖҮҮЛЭЛТ",
    },
    {
      src: "/stfu.png",
      alt: "Хамтын ажиллагаа, түншлэл",
      label: "ХАМТЫН АЖИЛЛАГАА, ТҮНШЛЭЛ",
    },
    {
      src: "/2.png",
      alt: "Сургалт чадавхжуулалт",
      label: "СУРГАЛТ ЧАДАВХЖУУЛАЛТ",
    },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          {items.map((it) => (
            <article
              key={it.label}
              className="group relative flex flex-col items-center text-center rounded-2xl bg-white border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden w-full"
            >
              {/* Decorative gradient circle behind icon */}
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-sky-100 to-blue-50 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
              <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-gradient-to-tr from-emerald-50 to-green-50 opacity-0 group-hover:opacity-60 transition-all duration-500" />

              <div className="relative h-24 w-24 sm:h-28 sm:w-28 mb-2">
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                  priority
                />
              </div>
              <h3 className="relative mt-4 text-sm sm:text-base font-bold tracking-wider text-gray-800 uppercase">
                {it.label}
              </h3>
              {/* Accent line */}
              <div className="mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 group-hover:w-16 transition-all duration-300" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
