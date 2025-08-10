// data/Statistics.ts
export type YearRow = {
  year: number;
  processedMilk: number; // Боловсруулсан шингэн сүү
  cream: number; // Цөцгий
  powder: number; // Хуурай сүү
  yogurt: number; // Тараг
  hoormog: number; // Хоормог
  aaruul: number; // Ааруул
  butter: number; // Цөцгийн тос
  uroomZuuhi: number; // Өрөм, зөөхий
  ghee: number; // Шар тос
  thickCream: number; // Өтгөн цөцгий
  cheese: number; // Бяслаг
  aarts: number; // Аарц
  icecream: number; // Зайрмаг
  total: number; // Нийт дүн
};

export const productionByYear: YearRow[] = [
  {
    year: 2020,
    processedMilk: 45.0,
    cream: 0.0,
    powder: 43.5,
    yogurt: 21.0,
    hoormog: 0.0,
    aaruul: 1.5,
    butter: 2.0,
    uroomZuuhi: 4.5,
    ghee: 0.4,
    thickCream: 4.0,
    cheese: 0.9,
    aarts: 3.8,
    icecream: 10.3,
    total: 137.0,
  },
  {
    year: 2021,
    processedMilk: 53.6,
    cream: 0.2,
    powder: 43.0,
    yogurt: 25.2,
    hoormog: 0.0,
    aaruul: 1.9,
    butter: 2.0,
    uroomZuuhi: 4.0,
    ghee: 0.1,
    thickCream: 3.9,
    cheese: 0.1,
    aarts: 3.9,
    icecream: 14.5,
    total: 152.5,
  },
  {
    year: 2022,
    processedMilk: 45.9,
    cream: 0.1,
    powder: 16.5,
    yogurt: 19.4,
    hoormog: 0.1,
    aaruul: 2.0,
    butter: 2.6,
    uroomZuuhi: 5.3,
    ghee: 0.1,
    thickCream: 5.6,
    cheese: 0.2,
    aarts: 4.9,
    icecream: 10.9,
    total: 113.6,
  },
  {
    year: 2023,
    processedMilk: 54.4,
    cream: 0.1,
    powder: 19.7,
    yogurt: 19.8,
    hoormog: 0.1,
    aaruul: 2.9,
    butter: 2.0,
    uroomZuuhi: 1.9,
    ghee: 0.2,
    thickCream: 7.0,
    cheese: 0.3,
    aarts: 5.6,
    icecream: 12.9,
    total: 126.8,
  },
  {
    year: 2024,
    processedMilk: 59.6,
    cream: 0.0,
    powder: 30.0,
    yogurt: 23.2,
    hoormog: 0.2,
    aaruul: 2.7,
    butter: 1.7,
    uroomZuuhi: 2.7,
    ghee: 0.2,
    thickCream: 7.7,
    cheese: 0.7,
    aarts: 6.3,
    icecream: 15.1,
    total: 150.3,
  },
];

// Хэрэгцээ/хангамж (2 мөртэй хүснэгт)
export type CoverageRow = {
  item: string;
  need2023: number;
  need2024: number;
  use2023: number;
  use2024: number;
  coverage2023: number; // %
  coverage2024: number; // %
};
export const coverageRows: CoverageRow[] = [
  {
    item: "Сүү",
    need2023: 161.7,
    need2024: 161.7,
    use2023: 160.2,
    use2024: 148.9,
    coverage2023: 99.8,
    coverage2024: 92.1,
  },
  {
    item: "Сүүн бүтээгдэхүүн",
    need2023: 181.9,
    need2024: 181.9,
    use2023: 134.2,
    use2024: 147.9,
    coverage2023: 73.8,
    coverage2024: 81.3,
  },
];

// Эх үүсвэрээр (2024*)
export type SupplyBySourceRow = {
  item: string;
  use: number;
  domestic: number;
  import: number;
  domesticPct: number; // %
  importPct: number; // %
};
export const supplyRows: SupplyBySourceRow[] = [
  {
    item: "Сүү",
    use: 160.2,
    domestic: 160.0,
    import: 0.3,
    domesticPct: 99.8,
    importPct: 0.2,
  },
  {
    item: "Сүүн бүтээгдэхүүн",
    use: 134.2,
    domestic: 68.8,
    import: 65.5,
    domesticPct: 51.2,
    importPct: 48.8,
  },
];

// Импорт
export type DryMilkImportRow = { year: number; quota: number; actual?: number };
export const dryMilkImport: DryMilkImportRow[] = [
  { year: 2020, quota: 6000, actual: 4801 },
  { year: 2021, quota: 8835, actual: 5449 },
  { year: 2022, quota: 12110, actual: 4289 },
  { year: 2023, quota: 4000, actual: 3444 },
  { year: 2024, quota: 6000, actual: 4407 },
  { year: 2025, quota: 3000, actual: undefined }, // урьдчилсан
];
