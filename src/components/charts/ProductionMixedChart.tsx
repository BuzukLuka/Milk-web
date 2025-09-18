// src/components/charts/ProductionMixedChart.tsx
"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type ScriptableContext,
  type Chart as ChartType,
  type ChartDataset,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { ChevronDown, Check, X, Search, SlidersHorizontal } from "lucide-react";
import type { YearRow } from "@/data/Statistics";

/* --------------------------- Chart.js register -------------------------- */
ChartJS.register(
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

/* ---------------------------- Product constants ------------------------- */
const PRODUCT_KEYS = [
  "processedMilk",
  "cream",
  "powder",
  "yogurt",
  "hoormog",
  "aaruul",
  "butter",
  "uroomZuuhi",
  "ghee",
  "thickCream",
  "cheese",
  "aarts",
  "icecream",
] as const;
type ProductKey = (typeof PRODUCT_KEYS)[number];

const PRODUCT_LABELS: Record<ProductKey, string> = {
  processedMilk: "Боловсруулсан шингэн сүү",
  cream: "Цөцгий",
  powder: "Хуурай сүү",
  yogurt: "Тараг",
  hoormog: "Хоормог",
  aaruul: "Ааруул",
  butter: "Цөцгийн тос",
  uroomZuuhi: "Өрөм, зөөхий",
  ghee: "Шар тос",
  thickCream: "Өтгөн цөцгий",
  cheese: "Бяслаг",
  aarts: "Аарц",
  icecream: "Зайрмаг",
};

const COLORS = [
  "#4A90E2",
  "#50E3C2",
  "#F5A623",
  "#7B7B7B",
  "#9B59B6",
  "#2ECC71",
  "#E74C3C",
  "#16A085",
  "#F39C12",
  "#2980B9",
  "#8E44AD",
  "#27AE60",
  "#D35400",
];

/* -------------------------------- Props --------------------------------- */
type Props = { rows: YearRow[]; height?: number };

/* ========================== MAIN COMPONENT ============================== */
export default function ProductionMixedChart({ rows, height = 420 }: Props) {
  const labels = useMemo(() => rows.map((r) => String(r.year)), [rows]);
  const canvasRef = useRef<ChartType<"bar" | "line"> | null>(null);

  // анх: юу ч сонгоогүй → зөвхөн "Нийт дүн"
  const [selectedKeys, setSelectedKeys] = useState<ProductKey[]>([]);
  const [showTotal, setShowTotal] = useState(true);

  // UI: popover + search
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  // click outside хаах
  const popoverRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const ALL_KEYS: ProductKey[] = [...PRODUCT_KEYS];

  const filteredKeys = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return ALL_KEYS;
    return ALL_KEYS.filter((k) =>
      PRODUCT_LABELS[k].toLowerCase().includes(query)
    );
  }, [q]);

  const toggleKey = (key: ProductKey) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };
  const selectAll = () => setSelectedKeys([...ALL_KEYS]);
  const clearAll = () => setSelectedKeys([]);

  const data = useMemo(() => {
    const barDatasets = selectedKeys.map((key) => {
      const idx = PRODUCT_KEYS.indexOf(key);
      const base = COLORS[idx % COLORS.length];
      return {
        type: "bar" as const,
        label: PRODUCT_LABELS[key],
        data: rows.map((r) => r[key] ?? 0),
        backgroundColor: () => hexWithAlpha(base, 0.7),
        borderColor: (ctx: ScriptableContext<"bar">) =>
          ctx?.active ? darken(base, 0.12) : base,
        borderWidth: (ctx: ScriptableContext<"bar">) => (ctx?.active ? 1.5 : 1),
        borderRadius: 6,
        stack: "prod",
        order: 2,
      };
    });

    const lineDataset = {
      type: "line" as const,
      label: "Нийт дүн",
      data: rows.map((r) => r.total),
      borderColor: "#F5A623",
      pointBackgroundColor: "#F5A623",
      pointBorderColor: "#F5A623",
      pointRadius: 4,
      pointHoverRadius: 5,
      tension: 0.35,
      fill: true,
      backgroundColor: (ctx: ScriptableContext<"line">) => {
        const { ctx: c, chartArea } = ctx.chart;
        if (!chartArea) return "rgba(245,166,35,0.18)";
        const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        g.addColorStop(0, "rgba(245,166,35,0.22)");
        g.addColorStop(1, "rgba(245,166,35,0.03)");
        return g;
      },
      order: 1,
      yAxisID: "y",
    };

    const datasets = showTotal ? [...barDatasets, lineDataset] : barDatasets;
    return { labels, datasets };
  }, [labels, rows, selectedKeys, showTotal]);

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        padding: 10,
        backgroundColor: "rgba(17,17,17,0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label(ctx) {
            const v = ctx.parsed.y;
            const name = ctx.dataset.label || "";
            return ` ${name}: ${fmt(v)}`;
          },
          footer(items) {
            const sum = items
              .filter(
                (i) =>
                  (i.dataset as ChartDataset<"bar" | "line">).type === "bar"
              )
              .reduce((acc, i) => acc + (i.parsed.y || 0), 0);
            return `Барааны нийлбэр: ${fmt(sum)}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 12, weight: "bold" } },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grace: "6%",
        grid: { color: "rgba(0,0,0,0.06)" },
        title: { display: true, text: "мянган тонн" },
        ticks: {
          padding: 6,
          font: { size: 11 },
          callback: (v) => fmt(Number(v)),
        },
      },
    },
  };

  return (
    <div className="w-full rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      {/* ===== Toolbar ===== */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {/* Products button */}
        <div className="relative" ref={popoverRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-black/5"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Бүтээгдэхүүн сонгох
            <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs">
              {selectedKeys.length}
            </span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </button>

          {/* Popover */}
          {open && (
            <div className="absolute z-20 mt-2 w-[320px] rounded-xl border border-black/10 bg-white shadow-lg">
              <div className="p-2 border-b border-black/10 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Хайх…"
                    className="w-full rounded-lg border border-black/10 pl-8 pr-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
                <button
                  className="text-xs rounded-md border border-black/10 px-2 py-1 hover:bg-black/5"
                  onClick={() => setQ("")}
                >
                  Арилгах
                </button>
              </div>

              <div className="max-h-72 overflow-auto p-2">
                {filteredKeys.map((key) => {
                  const idx = PRODUCT_KEYS.indexOf(key);
                  const color = COLORS[idx % COLORS.length];
                  const checked = selectedKeys.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleKey(key)}
                      role="option"
                      aria-selected={checked}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-black/5"
                    >
                      <span
                        className="inline-block h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="flex-1 text-left">
                        {PRODUCT_LABELS[key]}
                      </span>
                      {checked && (
                        <Check className="h-4 w-4 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
                {filteredKeys.length === 0 && (
                  <div className="py-6 text-center text-sm text-black/50">
                    Илэрц олдсонгүй
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-black/10 p-2">
                <div className="flex gap-2">
                  <button
                    onClick={selectAll}
                    className="rounded-md border border-black/10 px-2 py-1 text-xs hover:bg-black/5"
                  >
                    Бүгд
                  </button>
                  <button
                    onClick={clearAll}
                    className="rounded-md border border-black/10 px-2 py-1 text-xs hover:bg-black/5"
                  >
                    Цэвэрлэх
                  </button>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-black text-white px-3 py-1.5 text-xs hover:opacity-90"
                >
                  Хадгалах
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Selected chips */}
        <div className="flex min-h-[36px] flex-wrap items-center gap-1">
          {selectedKeys.map((k) => {
            const idx = PRODUCT_KEYS.indexOf(k);
            const color = COLORS[idx % COLORS.length];
            return (
              <span
                key={k}
                className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-xs"
              >
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {PRODUCT_LABELS[k]}
                <button
                  aria-label="remove"
                  onClick={() => toggleKey(k)}
                  className="ml-1 rounded-full p-0.5 hover:bg-black/10"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>

        {/* spacer */}
        <div className="flex-1" />

        {/* Total toggle */}
        <label className="flex select-none items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={showTotal}
            onChange={() => setShowTotal((v) => !v)}
          />
          Нийт дүн
        </label>
      </div>

      {/* Helpful hint */}
      <p className="mb-2 text-xs text-black/55">
        Зөвлөмж: <b>“Бүтээгдэхүүн сонгох”</b> дээр дарж харах хүссэн
        төрөл(үүд)-ээ идэвхжүүлээрэй. Юу ч сонгоогүй үед зөвхөн <b>Нийт дүн</b>{" "}
        харагдана.
      </p>

      {/* ===== Chart ===== */}
      <div className="w-full" style={{ height }}>
        <Chart ref={canvasRef} type="bar" data={data} options={options} />
      </div>
    </div>
  );
}

/* -------------------------------- helpers ------------------------------- */
function fmt(n: number) {
  return n.toLocaleString("mn-MN");
}
function hexWithAlpha(hex: string, alpha = 0.7) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function darken(hex: string, amount = 0.12) {
  const r = Math.round(parseInt(hex.slice(1, 3), 16) * (1 - amount));
  const g = Math.round(parseInt(hex.slice(3, 5), 16) * (1 - amount));
  const b = Math.round(parseInt(hex.slice(5, 7), 16) * (1 - amount));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
