// src/app/about/mission/page.tsx
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { org } from "@/data/Content";
import { Target, Layers, Network, ShieldCheck, Award } from "lucide-react";

// Pair each goal with an icon
const goalsWithIcons = [
  {
    icon: Target,
    text: "Монгол улсын сүүний салбарын системтэй хөгжлийг дэмжих",
  },
  {
    icon: Layers,
    text: "Нэгдмэл тогтолцоог бий болгох, үндэсний хэмжээнд салбарыг төлөөлөх",
  },
  {
    icon: Network,
    text: "Сүү үйлдвэрлэлийн гинжин хэлхээн дэх Төр ба Төрийн бус байгууллага, фермер, аж ахуй нэгжүүдийн харилцан ашигтай ажиллагааг бэхжүүлэх",
  },
  {
    icon: ShieldCheck,
    text: "Сүү, сүүн бүтээгдэхүүний чанар, аюулгүй байдлыг сайжруулах",
  },
  {
    icon: Award,
    text: "Гишүүдийнхээ нэгдмэл эрх ашгийг илэрхийлэх, хамгаалах, байнгын үйл ажиллагаатай, хараат бус олон нийтийн байгууллага болох",
  },
];

export default function Mission() {
  return (
    <Container className="py-14 space-y-12">
      <SectionTitle title="Эрхэм зорилго" subtitle="Алсын хараа ба зорилтууд" />

      {/* Vision Card */}
      <div className="card p-8 bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 border border-black/5">
        <h3 className="font-display text-2xl font-bold text-brand-primary mb-2">
          Алсын хараа
        </h3>
        <p className="text-black/80 leading-relaxed">{org.vision}</p>
        <div className="mt-4 inline-block bg-brand-accent/20 text-brand-deep px-4 py-2 rounded-full font-semibold">
          {org.slogan}
        </div>
      </div>

      {/* Goals Grid */}
      <section>
        <h4 className="font-display text-xl font-semibold mb-6">Зорилтууд</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goalsWithIcons.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="card p-6 flex flex-col items-start gap-3 hover:shadow-lg transition"
            >
              <div className="h-12 w-12 rounded-lg bg-brand-primary/10 grid place-items-center">
                <Icon className="h-6 w-6 text-brand-primary" />
              </div>
              <p className="text-black/80 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
