// src/app/projects/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { site } from "@/data/Site";
import {
  Megaphone,
  Globe2,
  GraduationCap,
  Landmark,
  Handshake,
  Sprout,
  Leaf,
  BookOpen,
  Building2,
  ExternalLink,
} from "lucide-react";

// --- Featured achievements (Гол хэрэгжүүлсэн ажлуудаас) ---
const achievements = [
  {
    title: "Дэлхийн сүүний өдрийг Монголд анх удаа тэмдэглэсэн (2016)",
    desc: "“ЭХ ОРНЫ СҮҮ — ЭРҮҮЛ ХҮНС — АМЬДАРЛЫН БАТАЛГАА” уриан дор салбарын оролцогчидтой хамтран зохион байгуулсан.",
    icon: Globe2,
    img: "https://mobixsystemsinc.com/images/team/1.jpg",
  },
  {
    title: "“Намрын ногоон өдрүүд-2016” — “СҮҮ: ТӨГС ХҮНС” хэрэглэгчийн булан",
    desc: "Сүүн бүтээгдэхүүний зохистой хэрэглээг дэмжих уралдаан, үзэсгэлэн, хэрэглэгчийн буланг зохион байгуулсан.",
    icon: Megaphone,
    img: "https://mobixsystemsinc.com/images/team/1.jpg",
  },
  {
    title: "“Мах сүүний анхдугаар аян” цуврал хэлэлцүүлэг, сургалтууд",
    desc: "Төр, хувийн хэвшил, фермерүүдийн оролцоотой мэдлэг түгээх үйл ажиллагааг өрнүүлсэн.",
    icon: GraduationCap,
    img: "https://mobixsystemsinc.com/images/team/1.jpg",
  },
  {
    title: "БНЭУ — ССХҮЗ туршлага судлах аялал",
    desc: "Салбарын сайн туршлага, бодлого, хоршооллын загварыг судалж нутагшуулсан.",
    icon: BookOpen,
    img: "https://mobixsystemsinc.com/images/team/1.jpg",
  },
  {
    title: "Дэлхийн сүүний өдрийг хамтран зохион байгуулсан",
    desc: "Олон улсын түншлэл, хамтын ажиллагааг тэлж, салбарын нэр хүндийг өсгөсөн.",
    icon: Landmark,
    img: "https://mobixsystemsinc.com/images/team/1.jpg",
  },
  {
    title: "“ЦАГААН ХУВЬСГАЛ” санаачилга (2023.03)",
    desc: "“ХҮНСНИЙ ХУВЬСГАЛ” бодлогыг дэмжих хүрээнд дижитал, инновацын шийдлүүдийг дэвшүүлэв.",
    icon: Sprout,
    img: "https://mobixsystemsinc.com/images/team/1.jpg",
  },
];

// --- Strategic initiatives list (таны жагсаалтыг товчилж үзүүлэв) ---
const strategic = [
  { text: "Сүүний бодлогын зөвлөл", icon: Building2 },
  { text: "Нэмүү өртгийн сүлжээний стратеги", icon: LayersIcon },
  { text: "Эрчимжсэн жишиг ферм хөгжүүлэх", icon: Leaf },
  {
    text: "Анхан шатны боловсруулах үйлдвэрт татварын хөнгөлөлт",
    icon: Landmark,
  },
  { text: "Сүүний татаасын хугацааг нэмэгдүүлэх", icon: Sprout },
  { text: "Сүүний үнээний импортыг нэмэгдүүлэх", icon: Handshake },
  { text: "“Хүүхдийн сүү” хөтөлбөр хэрэгжүүлэх", icon: GraduationCap },
  {
    text: "Анхан шатны цэгт лаборатори, чанарын чадавхийг нэмэгдүүлэх",
    icon: Building2,
  },
];

// tiny alias because lucide doesn't have Layers default exported above
function LayersIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <path
        fill="currentColor"
        d="M12 2 1 7l11 5 9-4.09V14h2V7zM1 17l11 5 11-5v-2l-11 5L1 15v2z"
      />
    </svg>
  );
}

// --- Ongoing projects (ХЭРЭГЖҮҮЛЖ БУЙ ТӨСЛҮҮД) ---
const ongoing = [
  {
    title: "FAO/EBRD: Strengthening Climate Resilience in Dairy Farming",
    desc: "Уур амьсгалын өөрчлөлтөнд дасан зохицох чадварыг бэхжүүлж, ирээдүйн хүнсний тогтвортой байдлыг хангах техникийн туслалцааны төсөл.",
    img: "https://mobixsystemsinc.com/images/team/1.jpg",
    tags: ["Climate Resilience", "Capacity Building", "Policy"],
  },
  {
    title:
      "“Монголын хувийн секторт гарах боломжууд” уулзалт (EBRD, FAO хамтран)",
    desc: "Сүү, сүүн бүтээгдэхүүний салбарт хувийн хэвшлийн оролцоог нэмэгдүүлэх хэлэлцүүлэг, шийдэл.",
    img: "https://mobixsystemsinc.com/images/team/1.jpg",
    tags: ["Investment", "Dialogue"],
  },
  {
    title: "Фермерүүдийн чадавхижуулах сургалт (НҮБ-ын ХХААБ + АПУ Дэйри)",
    desc: "Технологи, чанар, эрүүл ахуйн стандарт, менежментийн сургалтууд.",
    img: "https://mobixsystemsinc.com/images/team/1.jpg",
    tags: ["Training", "Quality", "Standards"],
  },
];

export default function Projects() {
  return (
    <>
      {/* Hero header */}
      <div className="relative h-[200px] sm:h-[260px] lg:h-[320px] w-full overflow-hidden">
        <Image
          src="https://mobixsystemsinc.com/images/team/1.jpg"
          alt="Хэрэгжүүлж буй төслүүд"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center">
          <Container>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow">
              Хэрэгжүүлж буй төслүүд
            </h1>
            <p className="mt-2 max-w-2xl text-white/90">
              Олон улсын түншлэл, бодлого, сургалт, инновацад суурилсан
              тогтвортой өсөлт.
            </p>
          </Container>
        </div>
      </div>

      <Container className="py-14 space-y-12">
        {/* Featured achievements */}
        <SectionTitle
          title="Гол хэрэгжүүлсэн ажлууд"
          subtitle="Highlights & Milestones"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map(({ title, desc, icon: Icon, img }) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-xl2 border bg-white shadow-soft"
            >
              <div className="relative h-44">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-brand-primary/10 grid place-items-center">
                    <Icon className="h-5 w-5 text-brand-primary" />
                  </div>
                  <h3 className="font-semibold leading-snug">{title}</h3>
                </div>
                <p className="text-black/70">{desc}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-accent scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </article>
          ))}
        </div>

        {/* Strategic initiatives strip */}
        <section className="card p-6">
          <h3 className="font-display text-xl font-semibold mb-4">
            Стратегийн санаачилгууд
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strategic.map(({ text, icon: Icon }) => (
              <div
                key={text}
                className="flex items-start gap-3 rounded-xl2 border p-4 bg-white hover:shadow-lg transition"
              >
                <div className="h-10 w-10 rounded-lg bg-brand-accent/30 grid place-items-center">
                  <Icon className="h-5 w-5 text-brand-deep" />
                </div>
                <p className="text-black/80">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ongoing projects */}
        <SectionTitle
          title="Хэрэгжүүлж буй төслүүд"
          subtitle="Current Programs & Partnerships"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ongoing.map((p) => (
            <article key={p.title} className="group card overflow-hidden p-0">
              <div className="relative h-40">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="mt-2 text-black/70">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-brand-primary/10 text-brand-deep"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="h-px bg-black/10" />
                <div className="pt-4 flex items-center gap-2 text-brand-primary">
                  <ExternalLink className="h-4 w-4" />
                  <Link
                    href={site.facebook}
                    target="_blank"
                    className="hover:underline"
                  >
                    Дэлгэрэнгүй шинэчлэл (Facebook)
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-xl2 border bg-brand-primary text-white">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(600px_200px_at_10%_10%,#fff,transparent)]" />
          <div className="relative p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h5 className="font-display text-2xl font-bold">
                Хамтран хэрэгжүүлье
              </h5>
              <p className="text-white/90 mt-1">
                Бодлого, сургалт, хөрөнгө оруулалт, стандартын чиглэлд хамтран
                ажиллах байгууллагуудыг урьж байна.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="btn-third bg-white text-brand-primary hover:bg-brand-milk"
              >
                Холбоо барих
              </Link>
              <Link
                href={site.facebook}
                target="_blank"
                className="btn-primary bg-transparent border-white text-white hover:text-brand-ink hover:border-brand-accent"
              >
                Facebook
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
