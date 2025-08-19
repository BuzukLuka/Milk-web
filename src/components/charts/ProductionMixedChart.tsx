"use client";

import React, { useMemo, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ScriptableContext,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import type { YearRow } from "@/data/Statistics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

type Props = {
  rows: YearRow[];
  height?: number; // default 360
};

const PRODUCT_KEYS: (keyof YearRow)[] = [
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
];

const COLORS = [
  "#4A90E2", // blue
  "#50E3C2", // mint
  "#F5A623", // orange
  "#7B7B7B", // grey
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

export default function ProductionMixedChart({ rows, height = 360 }: Props) {
  const labels = useMemo(() => rows.map((r) => String(r.year)), [rows]);
  const canvasRef = useRef<any>(null);

  const data = useMemo(() => {
    const barDatasets = PRODUCT_KEYS.map((key, i) => {
      const base = COLORS[i % COLORS.length];
      return {
        type: "bar" as const,
        label: labelForKey(key),
        data: rows.map((r) => r[key] ?? 0),
        backgroundColor: (ctx: ScriptableContext<"bar">) =>
          hexWithAlpha(base, 0.7),
        borderColor: (ctx: ScriptableContext<"bar">) =>
          ctx?.active ? darken(COLORS[i % COLORS.length], 0.12) : base,
        borderWidth: (ctx: ScriptableContext<"bar">) => (ctx?.active ? 1.5 : 1),
        borderRadius: 6,
        stack: "prod",
        order: 2,
        // бага сүүдэр — Canvas гүйцэтгэл OK
        segment: {},
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
        const chart = ctx.chart;
        const { ctx: c, chartArea } = chart;
        if (!chartArea) return "rgba(245,166,35,0.18)";
        const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        g.addColorStop(0, "rgba(245,166,35,0.22)");
        g.addColorStop(1, "rgba(245,166,35,0.03)");
        return g;
      },
      order: 1,
      yAxisID: "y",
    };

    return { labels, datasets: [...barDatasets, lineDataset] };
  }, [labels, rows]);

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 8, right: 12, left: 6, bottom: 0 } },
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: "circle",
          font: { size: 11 },
        },
      },
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
              .filter((i) => (i.dataset as any).type === "bar")
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
        ticks: {
          font: { size: 12, weight: 600 },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grace: "6%",
        grid: { color: "rgba(0,0,0,0.06)" },
        ticks: {
          padding: 6,
          font: { size: 11 },
          callback: (v) => fmt(Number(v)),
        },
      },
    },
  };

  return (
    <div className="w-full rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
      <div className="h-px w-full bg-gradient-to-r from-black/10 via-black/5 to-transparent mb-2" />
      <div className="w-full" style={{ height }}>
        <Chart ref={canvasRef} type="bar" data={data} options={options} />
      </div>
    </div>
  );
}

/* === helpers === */
function fmt(n: number) {
  return n.toLocaleString("mn-MN");
}
function labelForKey(k: keyof YearRow) {
  switch (k) {
    case "processedMilk":
      return "Боловсруулсан шингэн сүү";
    case "cream":
      return "Цөцгий";
    case "powder":
      return "Хуурай сүү";
    case "yogurt":
      return "Тараг";
    case "hoormog":
      return "Хоормог";
    case "aaruul":
      return "Ааруул";
    case "butter":
      return "Цөцгийн тос";
    case "uroomZuuhi":
      return "Өрөм, зөөхий";
    case "ghee":
      return "Шар тос";
    case "thickCream":
      return "Өтгөн цөцгий";
    case "cheese":
      return "Бяслаг";
    case "aarts":
      return "Аарц";
    case "icecream":
      return "Зайрмаг";
    default:
      return String(k);
  }
}
function hexWithAlpha(hex: string, alpha = 0.7) {
  // #RRGGBB -> rgba
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
// энгийн "darken" (10–15% орчим)
function darken(hex: string, amount = 0.12) {
  const r = Math.round(parseInt(hex.slice(1, 3), 16) * (1 - amount));
  const g = Math.round(parseInt(hex.slice(3, 5), 16) * (1 - amount));
  const b = Math.round(parseInt(hex.slice(5, 7), 16) * (1 - amount));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
