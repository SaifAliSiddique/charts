"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const OpenInterestCallsChart = () => {
  const data = {
    labels: ["ITM Calls", "OTM Calls"],
    datasets: [
      {
        data: [18460, 51078],
        backgroundColor: ["#00C9A7", "#18B893"],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // ❌ disable built-in legend
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.label}: ${ctx.raw?.toLocaleString()} (${(
              (Number(ctx.raw) /
                data.datasets[0].data.reduce((a, b) => a + b, 0)) *
              100
            ).toFixed(0)}%)`,
        },
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        width: "360px",
        fontFamily: "sans-serif",
        color: "#000000",
      }}
    >
      {/* Title */}
      <div style={{ fontWeight: "bold", fontSize: "14px", color: "#000" }}>
        Open Interest Calls:{" "}
        <span style={{ color: "#777", fontWeight: "normal" }}>2025-05-06</span>
      </div>

      {/* Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          marginTop: "10px",
          fontSize: "13px",
          rowGap: "4px",
        }}
      >
        <div>
          <strong>18,460</strong>
          <br />
          <span style={{ fontSize: "12px", color: "#555" }}>27% Calls ITM</span>
        </div>
        <div>
          <strong>51,078</strong>
          <br />
          <span style={{ fontSize: "12px", color: "#555" }}>73% Calls OTM</span>
        </div>
      </div>

      {/* Custom Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginTop: "12px",
          fontSize: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div
            style={{ width: "12px", height: "6px", background: "#00C9A7" }}
          />
          ITM Calls
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div
            style={{ width: "12px", height: "6px", background: "#18B893" }}
          />
          OTM Calls
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: "220px", marginTop: "12px" }}>
        <Chart
          type="pie"
          data={data}
          options={options}
          plugins={[ChartDataLabels]}
        />
      </div>
    </div>
  );
};

export default OpenInterestCallsChart;
