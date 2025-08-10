"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const labels = ["2020", "2021", "2022", "2023", "2024*"];
const processed = [137.0, 152.5, 113.6, 126.8, 150.3];
const collected = [190.0, 177.7, 212.9, 174.5, 148.6];

export default function MilkBarChart() {
  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label:
          "Үйлдвэрийн аргаар боловсруулсан сүү, сүүн бүтээгдэхүүний хэмжээ, мян.тн",
        data: processed,
        backgroundColor: "rgba(59,130,246,0.80)",
        borderColor: "rgba(37,99,235,1)",
        borderWidth: 1,
        borderRadius: 6,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
      {
        label: "Хөдөө аж ахуйгаас бэлтгэсэн сүүний хэмжээ, мян.тн",
        data: collected,
        backgroundColor: "rgba(251,146,60,0.90)",
        borderColor: "rgba(234,88,12,1)",
        borderWidth: 1,
        borderRadius: 6,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 22,
          boxHeight: 14,
          padding: 18,
          font: { size: 13, weight: 600 },
        },
      },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"bar">) =>
            `${ctx.dataset.label}: ${ctx.parsed.y} мян.тн`,
        },
      },
      datalabels: {
        color: "#000",
        anchor: "end",
        align: "start",
        offset: -6,
        font: { weight: "bold", size: 13 },
        formatter: (value: number) => value.toFixed(1),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 240,
        grid: { color: "rgba(0,0,0,0.08)" },
        ticks: { font: { size: 12 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
    },
  };

  return (
    <div className="w-full h-[340px] md:h-[420px]">
      <Bar data={data} options={options} />
    </div>
  );
}
