// src/app/about/strategy/page.tsx
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import {
  Landmark,
  Layers,
  Factory,
  BadgePercent,
  TimerReset,
  Truck,
  Baby,
  FlaskConical,
  CheckCircle2,
} from "lucide-react";

const strategies = [
  {
    icon: Landmark,
    text: "Сүүний бодлогын зөвлөл байгуулж нэгдсэн бодлого хэрэгжүүлэх",
  },
  { icon: Layers, text: "Нэмүү өртгийн сүлжээний стратеги боловсруулах" },
  { icon: Factory, text: "Эрчимжсэн жишиг ферм хөгжүүлэх" },
  {
    icon: BadgePercent,
    text: "Анхан шатны боловсруулах үйлдвэрт татварын хөнгөлөлт",
  },
  { icon: TimerReset, text: "Сүүний татаасын хугацааг нэмэгдүүлэх" },
  { icon: Truck, text: "Сүүний үнээний импортыг нэмэгдүүлэх" },
  { icon: Baby, text: "“Хүүхдийн сүү” хөтөлбөр хэрэгжүүлэх" },
  {
    icon: FlaskConical,
    text: "Анхан шатны цэгийн лаборатори, чанарын чадавх сайжруулах",
  },
];

const milestones = [
  {
    title: "2025 Q3",
    points: [
      "Бодлогын зөвлөлийн дүрэм, бүрэлдэхүүн батлах",
      "Салбарын оролцогчдын зөвлөлдөх уулзалтууд",
    ],
  },
  {
    title: "2025 Q4",
    points: [
      "Нэмүү өртгийн сүлжээний зураглал, индикаторууд",
      "Жишиг фермүүдийн техникийн үзүүлэлт, шаардлага",
    ],
  },
  {
    title: "2026 H1",
    points: [
      "Татварын хөнгөлөлтийн саналын төсөл",
      "“Хүүхдийн сүү” хөтөлбөрийн туршилт 2-3 сургууль/цэцэрлэгт",
    ],
  },
  {
    title: "2026 H2",
    points: [
      "Импортын үнээ/үржлийн материалын шугам нээх",
      "Анхан шатны лаборатори 10+ цэгт",
    ],
  },
];

export default function Strategy() {
  return (
    <>
      {/* Hero */}
      <div className="relative h-[220px] sm:h-[280px] lg:h-[360px] w-full overflow-hidden">
        <Image
          src="/strategy.png"
          alt="Стратеги төлөвлөгөө — сүүний салбарын хөгжил"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center">
          <Container>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow">
              Стратеги төлөвлөгөө
            </h1>
            <p className="mt-3 max-w-2xl text-white/90">
              Салбарын үнэ цэнийн сүлжээ, бодлого ба стандарт, жишиг ферм болон
              хүний нөөцийн чадавхийг шат дараатайгаар бэхжүүлэх замаар
              тогтвортой өсөлтийг хангана.
            </p>
          </Container>
        </div>
      </div>

      <Container className="py-14 space-y-12">
        <SectionTitle
          title="Гол чиглэлүүд"
          subtitle="Эрэмбэлсэн зорилтууд ба хэрэгжүүлэх арга хэмжээнүүд"
        />

        {/* Strategy grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map(({ icon: Icon, text }) => (
            <article key={text} className="card p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-brand-primary/10 grid place-items-center">
                  <Icon className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="font-semibold">Стратеги</h3>
              </div>
              <p className="mt-3 text-black/80 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>

        {/* Roadmap / Timeline */}
        <section className="mt-4">
          <h3 className="font-display text-xl font-semibold mb-6">
            Хэрэгжилтийн зам (Roadmap)
          </h3>

          <div className="relative">
            {/* vertical line for lg+ */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent" />

            <div className="space-y-8">
              {milestones.map((m, idx) => (
                <div
                  key={m.title}
                  className={`grid lg:grid-cols-2 gap-6 items-stretch ${
                    idx % 2 === 0 ? "" : "lg:[&>*:first-child]:order-2"
                  }`}
                >
                  <div className="card p-6 border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-brand-accent/30 grid place-items-center">
                        <span className="text-sm font-bold text-brand-deep">
                          {idx + 1}
                        </span>
                      </div>
                      <h4 className="font-semibold">{m.title}</h4>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {m.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-brand-secondary mt-0.5" />
                          <span className="text-black/80">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Decorative image / info block */}
                  <div className="card p-0 overflow-hidden border">
                    <div className="relative h-48 sm:h-56 w-full">
                      <Image
                        src="/strategy.png"
                        alt="Strategy visual"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                    <div className="p-5">
                      <p className="text-black/70">
                        Хугацааны төлөвлөлттэй уялдуулан бодлого, стандарт,
                        чадавхжуулалт, санхүүжилтийн хэрэгслүүдийг нэг дор
                        зангидаж, үр дүнг хэмжих индикаторуудыг тогтооно.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-xl2 border bg-white">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(500px_160px_at_15%_20%,#2D6A9F,transparent)]" />
          <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h4 className="font-display text-2xl font-bold text-brand-primary">
                Хамтран хэрэгжүүлье
              </h4>
              <p className="text-black/80 mt-1">
                Жишиг ферм, лаборатори, хөтөлбөрүүдэд хамтрах байгууллагуудыг
                бид урьж байна.
              </p>
            </div>
            <div className="flex gap-3">
              <a href="/contact" className="btn-primary">
                Холбоо барих
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100094122697534"
                target="_blank"
                className="btn-secondary"
              >
                Facebook
              </a>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
