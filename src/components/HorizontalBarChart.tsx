"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Chart.js modules register karwana zaroori hai
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: "y" as const, // horizontal bar chart ke liye
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Sector Performance",
    },
  },
  scales: {
    x: {
      min: -100,
      max: 100,
    },
  },
};

const labels = [
  "XLK (Tech)",
  "XLV (Health)",
  "XLF (Finance)",
  "XLY (Consumer Disc.)",
  "XLC (Comms)",
  "XLI (Industrial)",
  "XLP (Staples)",
  "XLE (Energy)",
];

const data = {
  labels,
  datasets: [
    {
      label: "Change from Open",
      data: [30, -20, 10, 60, -25, 15, -10, 70],
      backgroundColor: (context: any) => {
        // red for negative, cyan for positive
        const value = context.raw;
        return value < 0 ? "#ff3d3d" : "#00ffd5";
      },
    },
  ],
};

export default function HorizontalBarChart() {
  return <Bar options={options} data={data} />;
}
