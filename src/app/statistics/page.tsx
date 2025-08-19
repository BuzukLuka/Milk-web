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
  type YearRow,
  type DryMilkImportRow,
  type CoverageRow,
  type SupplyBySourceRow,
} from "@/data/Statistics";

export const metadata = { title: "Статистик" };

/* 1) Үйлдвэрлэлийн хүснэгт — бүх нэр төрөл */
const prodCols: TableCol<YearRow>[] = [
  {
    key: "year",
    label: "Үйлдвэрлэлийн хэмжээ, он",
    align: "center",
    noGroup: true,
    decimals: 0,
  },
  { key: "processedMilk", label: "Боловсруулсан шингэн сүү", align: "center" },
  { key: "cream", label: "Цөцгий", align: "center" },
  { key: "powder", label: "Хуурай сүү", align: "center" },
  { key: "yogurt", label: "Тараг", align: "center" },
  { key: "hoormog", label: "Хоормог", align: "center" },
  { key: "aaruul", label: "Ааруул", align: "center" },
  { key: "butter", label: "Цөцгийн тос", align: "center" },
  { key: "uroomZuuhi", label: "Өрөм, зөөхий", align: "center" },
  { key: "ghee", label: "Шар тос", align: "center" },
  { key: "thickCream", label: "Өтгөн цөцгий", align: "center" },
  { key: "cheese", label: "Бяслаг", align: "center" },
  { key: "aarts", label: "Аарц", align: "center" },
  { key: "icecream", label: "Зайрмаг", align: "center" },
  { key: "total", label: "Нийт дүн", align: "center" },
];

/* 2) Хэрэгцээ ба хангамж (custom head) */
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
      <th className="px-4 py-2"></th>
      <th className="px-4 py-2 text-center">2023 он</th>
      <th className="px-4 py-2 text-center">2024 он</th>
      <th className="px-4 py-2 text-center">2023 он</th>
      <th className="px-4 py-2 text-center">2024 он</th>
      <th className="px-4 py-2 text-center">2023 он</th>
      <th className="px-4 py-2 text-center">2024 он</th>
    </tr>
  </>
);

/* 3) Эх үүсвэрээр (2024*) */
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
        Хангамжийн хувь
      </th>
    </tr>
    <tr className="bg-gray-50 text-gray-600">
      <th className="px-4 py-2"></th>
      <th className="px-4 py-2 text-center"></th>
      <th className="px-4 py-2 text-center"></th>
      <th className="px-4 py-2 text-center"></th>
      <th className="px-4 py-2 text-center">Дотоодын үйлдвэрлэл, %</th>
      <th className="px-4 py-2 text-center">Импорт, %</th>
    </tr>
  </>
);

/* 4) Импортын хүснэгт */
const importCols: TableCol<DryMilkImportRow>[] = [
  { key: "year", label: "Он", align: "center", noGroup: true, decimals: 0 },
  { key: "quota", label: "Зөвшөөрөл", align: "center" },
  { key: "actual", label: "Гаалийн гүйцэтгэл", align: "center" },
];

export default function StatisticsPage() {
  return (
    <Container className="py-14 space-y-10">
      <SectionTitle
        title="Статистик"
        subtitle="Сүү, сүүн бүтээгдэхүүний үйлдвэрлэл, хангамж"
      />

      {/* 1 — БҮРЭН ҮЙЛДВЭРЛЭЛ */}
      {/* <StatTable
        caption="Сүү, сүүн бүтээгдэхүүний үйлдвэрлэл (мян. тн)"
        note="*"
        cols={prodCols}
        rows={productionByYear}
      /> */}

      <Container className="py-10 space-y-8">
        <div className="max-w-3xl">
          <p className="text-base text-muted-foreground">
            Сүү, сүүн бүтээгдэхүүний үйлдвэрлэл (мян. тн)
          </p>
        </div>

        <ProductionMixedChart rows={productionByYear} height={420} />
      </Container>

      {/* 2 — График + тайлбар */}
      <h2 className="text-2xl font-bold text-center mb-6">
        Сүү, сүүн бүтээгдэхүүний үйлдвэрлэл
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 items-center">
        <div className="flex justify-center">
          <div className="rounded-lg shadow-lg bg-white p-4 md:p-6 w-full">
            <MilkBarChart />
          </div>
        </div>
        <div>
          <p className="text-justify leading-relaxed mb-4">
            Манай улсын хүн ам сүү, сүүн бүтээгдэхүүнийг НҮБ-ийн Хүнс, хөдөө аж
            ахуйн байгууллага болон Дэлхийн эрүүл мэндийн байгууллагаас зөвлөмж
            болгож буй зохистой хэрэглээнээс доогуур хэрэглэж байгаа ба сүүлийн
            2 жилийн хэрэглээнээс үзэхэд сүүг зөвлөмж хэмжээнээс арваад хувиар
            (92.1%), сүүн бүтээгдэхүүнийг хорь шахуй (81.3%) хувиар доогуур
            хэрэглээтэй бөгөөд сүүний хэрэглээг дотоодын үйлдвэрлэлээр бүрэн
            хангаж, сүүн бүтээгдэхүүний 51.2%-ийг дотоодын үйлдвэрлэлээр,
            48.8%-ийг импортын бүтээгдэхүүнээр хангасан байна.
          </p>
          <p className="text-justify leading-relaxed">
            Сүү, сүүн бүтээгдэхүүний боловсруулалтын хэмжээ сүүлийн 3 жилд
            дунджаар 9% өсөж, 2024 онд 148.6 мян.тн болж, хөдөө аж ахуйгаас
            бэлтгэсэн сүүний 70 гаруй хувийг үйлдвэрийн аргаар боловсруулсан
            байна.
          </p>
        </div>
      </div>

      {/* 3 — Хэрэгцээ ба хангамж (2023/2024) */}
      <StatTable
        caption="Сүү, сүүн бүтээгдэхүүний хангамжийн түвшин"
        note="/Эх үүсвэр: Үндэсний статистикийн хороо/"
        head={coverageHead}
        cols={coverageCols}
        rows={coverageRows}
      />

      {/* 4 — Эх үүсвэрээр (2024*) */}
      <StatTable
        caption="Хүнсний хангамжийн хувь, эх үүсвэрээр (2024* урьдчилсан тооцоолол)"
        note="Эх үүсвэр: Үндэсний статистикийн хороо."
        head={supplyHead}
        cols={supplyCols}
        rows={supplyRows}
      />

      {/* 5 — Импорт */}
      <h3 className="text-2xl font-bold text-center mb-6">Сүүний импорт</h3>
      <p className="text-justify leading-relaxed">
        Хүн амын сүү, сүүн бүтээгдэхүүний хангамжийг нэмэгдүүлэх зорилгоор
        үйлдвэрлэгч ААН-үүдэд 2020–2025 онд хуурай сүү импортлох зөвшөөрөл
        олгосон.
      </p>
      <StatTable
        caption="Хуурай сүүний импортын зөвшөөрөл ба гүйцэтгэл (тн)"
        note="Эх үүсвэр: Гаалийн ерөнхий газар"
        cols={importCols}
        rows={dryMilkImport}
      />
    </Container>
  );
}
