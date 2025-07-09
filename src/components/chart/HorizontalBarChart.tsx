"use client";

import React, { useRef, useState } from "react";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { Chart as ChartJS } from "react-chartjs-2";

// Register Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

const HorizontalBarChart = () => {
  const chartRef = useRef(null);
  const [toggle, setToggle] = useState(false);

  const labels = [
    "XLK (Technology)",
    "XLV (Health Care)",
    "XLF (Financial)",
    "XLY (Consumer Discretionary)",
    "XLC (Communication)",
    "XLI (Industrial)",
    "XLP (Consumer Staples)",
    "XLE (Energy)",
    "XLRE (Real Estate)",
    "XLB (Materials)",
    "XLU (Utilities)",
  ];

  // Default values (toggle OFF)
  const valuesDefault = [0.5, -0.3, 0.3, -0.2, 0.9, -0.2, 0.3, -0.2, 1.1, -0.4, 0.4];

  // Toggled values (toggle ON — more red)
  const valuesToggled = [-2.0, -1.5, 0.6, 0.4, -1.2, -0.8, -1.0, -1.3, -1.4, -1.1, -0.9];

  const values = toggle ? valuesToggled : valuesDefault;

  const data = {
    labels,
    datasets: [
      {
        label: "Change",
        data: values, // ✅ Use signed values to allow left/right direction
        backgroundColor: values.map((v) => (v >= 0 ? "#00FFF7" : "#FF2E2E")),
        borderRadius: 0,
        barThickness: 18,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: toggle
          ? "S&P 500 Sector: Change from Yesterday's Close"
          : "S&P 500 Sector: Change from Open",
        color: "#FFFFFF",
        font: {
          size: 16,
          weight: "bold" as const,
        },
        align: "start" as const,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#333",
        titleColor: "#FFF",
        bodyColor: "#FFF",
        callbacks: {
          label: (context: TooltipItem<"bar">) =>
            `Change: ${Math.abs(values[context.dataIndex])}%`,
        },
      },
      datalabels: {
        display: false, // ✅ Hide numbers above bars
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 30,
        top: 10,
        bottom: 10,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#333",
          borderColor: "#777",
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "#333",
          borderColor: "#777",
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        width: "700px",
        height: "420px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Toggle Switch */}
      <div
        style={{
          position: "absolute",
          top: "18px",
          right: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => setToggle(!toggle)}
          style={{
            width: "40px",
            height: "20px",
            background: toggle ? "#00FFF7" : "#555",
            borderRadius: "999px",
            cursor: "pointer",
            position: "relative",
            transition: "background 0.3s",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "2px",
              left: toggle ? "22px" : "2px",
              width: "16px",
              height: "16px",
              background: "#fff",
              borderRadius: "50%",
              transition: "left 0.3s",
            }}
          />
        </div>
      </div>

      {/* Chart */}
      <ChartJS ref={chartRef} type="bar" data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
