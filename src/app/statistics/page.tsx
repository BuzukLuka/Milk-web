// app/(routes)/statistics/page.tsx
import ProductionMixedChart from "@/components/charts/ProductionMixedChart";
import { Container } from "@/components/Container";
import MilkBarChart from "@/components/MilkBarChart";
import { SectionTitle } from "@/components/SectionTitle";
import { StatTable, type TableCol } from "@/components/StatTable";
import {
  productionByYear,
  dryMilkImport,
  coverageRows,
  supplyRows,
  type DryMilkImportRow,
  type CoverageRow,
  type SupplyBySourceRow,
} from "@/data/Statistics";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Table as TableIcon,
  Info,
} from "lucide-react";

/* ------------------------------ Page meta ------------------------------ */
export const metadata = { title: "Статистик" };

/* ------------------ Custom table headers + column defs ----------------- */
const coverageCols: TableCol<CoverageRow>[] = [
  { key: "item", label: "Гол нэр төрөл" },
  { key: "need2023", label: "2023 он", align: "center" },
  { key: "need2024", label: "2024* он", align: "center" },
  { key: "use2023", label: "2023 он", align: "center" },
  { key: "use2024", label: "2024* он", align: "center" },
  { key: "coverage2023", label: "2023 он", align: "center", asPercent: true },
  { key: "coverage2024", label: "2024* он", align: "center", asPercent: true },
];

const coverageHead = (
  <>
    <tr className="bg-gray-50/70 text-gray-600">
      <th className="px-4 py-2 align-bottom">Гол нэр төрөл</th>
      <th className="px-4 py-2 text-center" colSpan={2}>
        Жишсэн хүн амын жилийн хүнсний хэрэгцээ, мян. тн
      </th>
      <th className="px-4 py-2 text-center" colSpan={2}>
        Хэрэглээ, мян. тн
      </th>
      <th className="px-4 py-2 text-center" colSpan={2}>
        Хангамжийн түвшин, %
      </th>
    </tr>
    <tr className="bg-gray-50 text-gray-600">
      <th className="px-4 py-2" />
      <th className="px-4 py-2 text-center">2023 он</th>
      <th className="px-4 py-2 text-center">2024* он</th>
      <th className="px-4 py-2 text-center">2023 он</th>
      <th className="px-4 py-2 text-center">2024* он</th>
      <th className="px-4 py-2 text-center">2023 он</th>
      <th className="px-4 py-2 text-center">2024* он</th>
    </tr>
  </>
);

const supplyCols: TableCol<SupplyBySourceRow>[] = [
  { key: "item", label: "Бүтээгдэхүүний төрөл" },
  { key: "use", label: "Хэрэглээ, мян.тн", align: "center" },
  { key: "domestic", label: "Дотоодын үйлдвэрлэл, мян.тн", align: "center" },
  { key: "import", label: "Импорт, мян.тн", align: "center" },
  {
    key: "domesticPct",
    label: "Дотоодын үйлдвэрлэл, %",
    align: "center",
    asPercent: true,
  },
  { key: "importPct", label: "Импорт, %", align: "center", asPercent: true },
];

const supplyHead = (
  <>
    <tr className="bg-gray-50/70 text-gray-600">
      <th className="px-4 py-2 align-bottom">Бүтээгдэхүүний төрөл</th>
      <th className="px-4 py-2 text-center">Хэрэглээ, мян.тн</th>
      <th className="px-4 py-2 text-center">Дотоодын үйлдвэрлэл, мян.тн</th>
      <th className="px-4 py-2 text-center">Импорт, мян.тн</th>
      <th className="px-4 py-2 text-center" colSpan={2}>
        Хангамжийн хувь (2024*)
      </th>
    </tr>
    <tr className="bg-gray-50 text-gray-600">
      <th className="px-4 py-2" />
      <th className="px-4 py-2" />
      <th className="px-4 py-2" />
      <th className="px-4 py-2" />
      <th className="px-4 py-2 text-center">Дотоод</th>
      <th className="px-4 py-2 text-center">Импорт</th>
    </tr>
  </>
);

const importCols: TableCol<DryMilkImportRow>[] = [
  { key: "year", label: "Он", align: "center", noGroup: true, decimals: 0 },
  { key: "quota", label: "Зөвшөөрөл (тн)", align: "center" },
  { key: "actual", label: "Гүйцэтгэл (тн)", align: "center" },
];

/* --------------------------------- KPIs -------------------------------- */
function KPI({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      <div className="text-[11px] uppercase tracking-wide text-black/60">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      {hint ? <div className="mt-1 text-xs text-black/55">{hint}</div> : null}
    </div>
  );
}

/* ============================ PAGE COMPONENT ============================ */
export default function StatisticsPage() {
  const last = productionByYear[productionByYear.length - 1];
  const prev = productionByYear[productionByYear.length - 2];
  const growth =
    last && prev ? ((last.total - prev.total) / prev.total) * 100 : 0;

  return (
    <Container className="py-10 space-y-12">
      {/* ======= Header / Hero for the section ======= */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 text-brand-primary px-3 py-1 text-xs font-semibold">
          <TrendingUp className="h-4 w-4" />
          Салбарын тоон тойм
        </span>
        <SectionTitle
          title="Статистик"
          subtitle="Сүү, сүүн бүтээгдэхүүний үйлдвэрлэл, хангамж"
          center
          className="mt-3"
        />
      </div>

      {/* ======= Row A — Mixed chart + KPI cards ======= */}
      <section className="grid xl:grid-cols-[2.1fr_1fr] gap-6 items-start">
        {/* Big card: Mixed Chart */}
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-brand-primary" />
              <span>Үйлдвэрлэлийн бүтэц (мян. тн)</span>
            </div>
            <span className="text-xs text-black/60">2020–2024*</span>
          </div>
          <ProductionMixedChart rows={productionByYear} height={420} />
          {/* <div className="mt-3 text-[12px] text-black/60 flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5" />
            <p>
              Шугаман нь <b>нийт дүн</b>, баганууд нь нэр төрлөөрх үйлдвэрлэлийг
              илэрхийлнэ. 2024 он — урьдчилсан дүн.
            </p>
          </div> */}
        </div>

        {/* Side stack: KPI cards & mini notes */}
        <aside className="grid sm:grid-cols-2 xl:grid-cols-1 gap-4">
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <PieChart className="h-5 w-5 text-brand-primary" />
              <div className="font-semibold">Үзүүлэлт</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <KPI
                label="2024 — Нийт дүн"
                value={`${last.total.toLocaleString("mn-MN")} мян.тн`}
              />
              <KPI
                label="Өсөлт (’23 → ’24*)"
                value={`${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%`}
              />
              <KPI
                label="Боловсруулсан сүү"
                value={`${last.processedMilk.toLocaleString("mn-MN")} мян.тн`}
              />
              <KPI
                label="Тараг"
                value={`${last.yogurt.toLocaleString("mn-MN")} мян.тн`}
              />
            </div>
            <div className="mt-3 text-xs text-black/60">
              Урьдчилсан — тайлагналын шинэчлэлтээр өөрчлөгдөж болно.
            </div>
          </div>

          {/* <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold mb-2">Товч тайлбар</div>
            <ul className="space-y-2 text-sm text-black/75">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary" />
                2024* онд үйлдвэрийн боловсруулалт{" "}
                <b>{last.total.toLocaleString("mn-MN")}</b> мян.тн.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
                Шингэн сүү: <b>{last.processedMilk}</b>, тараг:{" "}
                <b>{last.yogurt}</b>, хуурай сүү: <b>{last.powder}</b> мян.тн.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Сүү–сүүн бүтээгдэхүүний боловсруулалт сүүлийн жилүүдэд өссөн.
              </li>
            </ul>
          </div> */}
        </aside>
      </section>

      {/* ======= Row B — Bar chart + narrative ======= */}
      <section className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-center">
        <div className="rounded-2xl border border-black/5 bg-white p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">(мян. тн)</div>
            <span className="text-xs text-black/60">2020–2024*</span>
          </div>
          <MilkBarChart />
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h3 className="font-display text-xl font-bold">
            Сүү, сүүн бүтээгдэхүүний үйлдвэрлэл
          </h3>
          <p className="text-black/75 leading-relaxed mt-3">
            Манай улсын хүн ам сүү, сүүн бүтээгдэхүүнийг НҮБ-ийн Хүнс, хөдөө аж
            ахуйн байгууллага болон ДЭМБ-аас зөвлөмж болгосон зохистой
            хэмжээнээс доогуур хэрэглэж байна. Сүүлийн 2 жилийн хэрэглээнээс
            үзэхэд сүүг <b>92.1%</b>, сүүн бүтээгдэхүүнийг <b>81.3%</b> түвшинд
            хэрэглэсэн бөгөөд сүүний хэрэглээг дотоодын үйлдвэрлэлээр бүрэн
            хангаж, сүүн бүтээгдэхүүний <b>51.2%</b>-ийг дотоодын үйлдвэрлэлээр,
            <b>48.8%</b>-ийг импортын бүтээгдэхүүнээр хангасан байна. Сүү, сүүн
            бүтээгдэхүүний боловсруулалтын хэмжээ сүүлийн 3 жилд дунджаар{" "}
            <b>9%</b> өсөж, 2024 онд 148.6 мян.тн болж, хөдөө аж ахуйгаас
            бэлтгэсэн сүүний 70 гаруй хувийг үйлдвэрийн аргаар боловсруулжээ.
          </p>
        </div>
      </section>

      {/* ======= Row C — Two tables side-by-side ======= */}
      <section className="grid lg:grid-cols-2 gap-6">
        <StatTable
          caption="Сүү, сүүн бүтээгдэхүүний хангамжийн түвшин (2023/2024*)"
          note="Эх үүсвэр: Үндэсний статистикийн хороо"
          head={coverageHead}
          cols={coverageCols}
          rows={coverageRows}
        />
        <StatTable
          caption="Хангамжийн хувь, эх үүсвэрээр (2024*)"
          note="Эх үүсвэр: Үндэсний статистикийн хороо"
          head={supplyHead}
          cols={supplyCols}
          rows={supplyRows}
        />
      </section>

      {/* ======= Row D — Import table (full width) ======= */}
      <section className="space-y-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 text-brand-deep px-3 py-1 text-xs font-semibold">
            <TableIcon className="h-4 w-4" />
            Импорт
          </span>
          <h3 className="font-display text-2xl font-bold mt-2">
            Сүүний импорт
          </h3>
          <p className="text-black/60 mt-1">
            Хүн амын сүү, сүүн бүтээгдэхүүний хангамжийг нэмэгдүүлэх зорилгоор
            үйлдвэрлэгч ААН-үүдэд 2020–2025 онд хуурай сүү импортлох зөвшөөрөл
            олгосон.
          </p>
        </div>
        <StatTable
          caption="Импортын зөвшөөрөл ба гүйцэтгэл (тн)"
          note="Эх үүсвэр: Гаалийн ерөнхий газар"
          cols={importCols}
          rows={dryMilkImport}
        />
      </section>
    </Container>
  );
}
