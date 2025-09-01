import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { org } from "@/data/Content";

/** Parse "Name (Role)" → { name, role } */
function parseMember(s: string) {
  const m = s.match(/^(.+?)\s*\((.+)\)$/);
  return m
    ? { name: m[1].trim(), role: m[2].trim() }
    : { name: s.trim(), role: "" };
}

/** Known photo map. Put PNGs into /public exactly with these names. */
const PHOTO_MAP: Record<string, string> = {
  "Г.Энхбилэг": "/G.Enkhbileg.png", // chair (you said this exact filename)
  "Г.Баярмангай": "/G.Bayarmangai.png",
  "С.Цэцгээ": "/S.Tsetseg.png",
  "Б.Батбаатар": "/B.Batbaatar.png",
  "Т.Мөнхтөр": "/T.Munkhtur.png",
  "Б.Энхтуяа": "/B.Enkhtuyaa.png",
  "Б.Мөнхтамир": "/B.Munkhtamir.png",
  "Б.Баярмаа": "/bayrmaa.png",
  "Д.Бямбасайхан": "/D.Byambasaikhan.png",
  "Ц.Дэжидмаа": "/Ts.Dejidmaa.png",
  "Д.Наранцэцэг": "/D.Narantsetseg.png",
  "Б.Түвшинтөгс": "/tuvshintugs.png",
};

/** Render one member card */
function TeamCard({ full, small = false }: { full: string; small?: boolean }) {
  const { name, role } = parseMember(full);

  // try to find a photo by exact name (left part before parentheses)
  const photoSrc = PHOTO_MAP[name];
  const size = small ? 84 : 120;

  // Initials (for fallback avatar)
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className={`card p-5 flex ${
        small
          ? "flex-row items-center gap-4"
          : "flex-col items-center text-center"
      } h-full`}
    >
      {photoSrc ? (
        <Image
          src={photoSrc}
          alt={name}
          width={size}
          height={size}
          className="rounded-full ring-2 ring-brand-primary/20 shadow-soft object-cover"
        />
      ) : (
        <div
          className="rounded-full ring-2 ring-brand-primary/20 shadow-soft grid place-items-center bg-brand-cream text-brand-deep font-semibold"
          style={{ width: size, height: size }}
          aria-label={name}
        >
          {initials}
        </div>
      )}

      <div className={small ? "" : "mt-4"}>
        <div className="font-semibold">{name}</div>
        {role && <div className="text-sm text-black/60 mt-0.5">{role}</div>}
      </div>
    </div>
  );
}

export default function TUZ() {
  const chair = org.board.chair; // "Г.Энхбилэг"
  const members = org.board.members; // array of "Name (Role)" etc.
  const executives = org.board.executives; // array
  const advisors = org.board.advisors; // array

  return (
    <Container className="py-14 space-y-10">
      <SectionTitle title="Төлөөлөн удирдах зөвлөл (ТУЗ)" />

      {/* Chair highlight */}
      <div className="card p-6">
        <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
          <div className="w-full max-w-[220px] mx-auto md:mx-0">
            <TeamCard full={`${chair} (Удирдах зөвлөлийн дарга)`} />
          </div>
          <div>
            <p className="text-sm text-black/60 mb-2">
              УДИРДАХ ЗӨВЛӨЛИЙН ДАРГА
            </p>
            <h3 className="text-2xl font-bold mb-2">{chair}</h3>
            <p className="text-black/70">
              Төлөөлөн удирдах зөвлөлийг ахалж, салбарын бодлого, түншлэл,
              стратегийн хэрэгжилтийг удирдан зохицуулна.
            </p>
          </div>
        </div>
      </div>

      {/* Board members */}
      <section>
        <h4 className="font-semibold mb-4">Гишүүд</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((m) => (
            <TeamCard key={m} full={m} />
          ))}
        </div>
      </section>

      {/* Executives */}
      <section>
        <h4 className="font-semibold mb-4">Гүйцэтгэх баг</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {executives.map((e) => (
            <TeamCard key={e} full={e} />
          ))}
        </div>
      </section>

      {/* Advisors */}
      <section>
        <h4 className="font-semibold mb-4">Зөвлөхүүд</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advisors.map((a) => (
            <TeamCard key={a} full={a} small />
          ))}
        </div>
      </section>
    </Container>
  );
}
