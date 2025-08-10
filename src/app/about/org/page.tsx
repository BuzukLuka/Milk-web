// src/app/about/org/page.tsx
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { org } from "@/data/Content";
import {
  Layers,
  LineChart,
  ShieldCheck,
  Handshake,
  Presentation,
  Leaf,
} from "lucide-react";

const bullets = [
  {
    icon: LineChart,
    title: "Салбарын хөгжлийг дэмжих",
    desc: "Монгол улсын сүүний салбарын тогтвортой өсөлтийг бодлого, стандарт, хамтын ажиллагаагаар дэмжинэ.",
  },
  {
    icon: Layers,
    title: "Үнэ цэнийн сүлжээг бэхжүүлэх",
    desc: "Фермерээс үйлдвэр, хэрэглэгч хүртэлх гинжин хэлхээг холбож, үр ашигтай экосистем бүрдүүлнэ.",
  },
  {
    icon: ShieldCheck,
    title: "Эрүүл, аюулгүй хүнсний хангамж",
    desc: "Чанар, аюулгүй байдлын стандарт нэвтрүүлж, дотоодын хангамжийг нэмэгдүүлнэ.",
  },
  {
    icon: Handshake,
    title: "Түншлэл ба нэгдмэл тогтолцоо",
    desc: "Төр, хувийн хэвшил, фермэрүүд болон олон улсын байгууллагуудтай нэгдсэн зохион байгуулалтаар ажиллана.",
  },
  {
    icon: Presentation,
    title: "Сургалт, семинар",
    desc: "Чадавхжуулах сургалт, арга хэмжээ, хэлэлцүүлгийг тогтмол зохион байгуулна.",
  },
  {
    icon: Leaf,
    title: "Төсөл, хөтөлбөр",
    desc: "Уур амьсгалын тэсвэржилт, инноваци, дижитал шилжилтийн чиглэлийн төслүүдийг хэрэгжүүлнэ.",
  },
];

export default function OrgInfo() {
  return (
    <Container className="py-14 space-y-12">
      {/* Heading */}
      <SectionTitle
        title="Байгууллагын мэдээлэл"
        subtitle="Цагаан хувьсгал — Ногоон хөгжил"
      />

      {/* Intro card */}
      <section className="card p-8">
        <h3 className="font-display text-2xl font-bold mb-3 text-brand-primary">
          Бидний зорилго
        </h3>
        <p className="text-black/80 leading-relaxed">{org.intro}</p>

        {/* Your extra sentence as a highlighted strip */}
        <div className="mt-6 rounded-xl2 bg-brand-cream p-5 border border-black/5">
          <p className="font-medium">
            Монгол улсын сүүний салбарын хөгжлийг дэмжих, сүүний салбарын үнэ
            цэнийн сүлжээг тогтвортой хөгжүүлэх, нэгдмэл тогтолцоог бий болгох,
            эрүүл аюулгүй хүнсний хангамжийг нэмэгдүүлэх, ижил зорилготой
            байгууллагуудтай хамтран ажиллах, сургалт семинар зохион байгуулах,
            төсөл хөтөлбөр хэрэгжүүлэх
          </p>
        </div>
      </section>

      {/* Pillars grid */}
      <section>
        <h4 className="font-display text-xl font-semibold mb-4">
          Бидний гол чиглэлүүд
        </h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bullets.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="card p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-lg bg-brand-primary/10 grid place-items-center">
                  <Icon className="h-5 w-5 text-brand-primary" />
                </div>
                <h5 className="font-semibold">{title}</h5>
              </div>
              <p className="mt-3 text-black/70 leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Quick facts / KPIs — tweak numbers or wire to data later */}
      <section className="card p-6">
        <h4 className="font-display text-xl font-semibold mb-4">
          Богино танилцуулга (Quick Facts)
        </h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl2 border p-4">
            <div className="text-sm text-black/60">Үйл ажиллагааны чиглэл</div>
            <div className="text-2xl font-bold mt-1">{org.focus.length}+</div>
          </div>
          <div className="rounded-xl2 border p-4">
            <div className="text-sm text-black/60">Түнш байгууллага</div>
            <div className="text-2xl font-bold mt-1">
              {org.partners.length}+
            </div>
          </div>
          <div className="rounded-xl2 border p-4">
            <div className="text-sm text-black/60">Төслүүд</div>
            <div className="text-2xl font-bold mt-1">
              {org.projects.length}+
            </div>
          </div>
          <div className="rounded-xl2 border p-4">
            <div className="text-sm text-black/60">ТУЗ-ийн гишүүд</div>
            <div className="text-2xl font-bold mt-1">
              {org.board.members.length}
            </div>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="rounded-xl2 bg-white shadow-soft border p-6">
        <h4 className="font-display text-xl font-semibold mb-4">
          Бидний үнэт зүйлс
        </h4>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-black/80">
          <li className="flex gap-2">
            <span className="text-brand-primary mt-1">•</span> Тогтвортой хөгжил
            ба инноваци
          </li>
          <li className="flex gap-2">
            <span className="text-brand-primary mt-1">•</span> Нэгдмэл тогтолцоо
            ба тунгалаг байдал
          </li>
          <li className="flex gap-2">
            <span className="text-brand-primary mt-1">•</span> Чанар, аюулгүй
            байдал, стандарт
          </li>
          <li className="flex gap-2">
            <span className="text-brand-primary mt-1">•</span> Хамтын ажиллагаа
            ба түншлэл
          </li>
          <li className="flex gap-2">
            <span className="text-brand-primary mt-1">•</span> Нийгмийн
            хариуцлага
          </li>
          <li className="flex gap-2">
            <span className="text-brand-primary mt-1">•</span> Фермер төвтэй
            бодлого
          </li>
        </ul>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden rounded-xl2 border bg-brand-primary text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(600px_200px_at_10%_10%,#fff,transparent)]" />
        <div className="relative p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h5 className="font-display text-2xl font-bold">
              Нэгдэж хамтран ажиллая
            </h5>
            <p className="text-white/90 mt-1">
              Түнш байгууллага, фермерүүдтэй тогтвортой хөгжлийн төлөө хамтарч
              ажиллахад бид нээлттэй.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/contact"
              className="btn bg-white text-brand-primary hover:bg-brand-milk"
            >
              Холбоо барих
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100094122697534"
              target="_blank"
              className="btn-secondary bg-transparent border-white text-white hover:text-brand-ink hover:border-brand-accent"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
}
