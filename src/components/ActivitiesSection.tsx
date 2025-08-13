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
      {/* дээд талын жижиг ногоон тууз */}
      <div className="h-4 bg-[#71c760]" />
      <div className="relative">
        <h2
          className="absolute left-1/2 -translate-x-1/2 -top-4
               w-fit rounded-full bg-[#71c760] px-6 py-2
               text-white font-bold tracking-wide"
        >
          ҮЙЛ АЖИЛЛАГАА
        </h2>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center ">
            {items.map((it) => (
              <article
                key={it.label}
                className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-110"
              >
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 ">
                  <Image
                    src={it.src}
                    alt={it.alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <h3 className="mt-5 text-lg sm:text-xl  tracking-wide">
                  {it.label}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
