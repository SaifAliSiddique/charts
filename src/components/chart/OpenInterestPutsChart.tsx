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

const OpenInterestPutsChart = () => {
  const data = {
    labels: ["ITM Puts", "OTM Puts"],
    datasets: [
      {
        data: [8284, 82510],
        backgroundColor: ["#D9534F", "#F5A623"],
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
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw?.toLocaleString()}`,
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
        Open Interest Puts:{" "}
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
          <strong>8,284</strong>
          <br />
          <span style={{ fontSize: "12px", color: "#555" }}>9% Puts ITM</span>
        </div>
        <div>
          <strong>82,510</strong>
          <br />
          <span style={{ fontSize: "12px", color: "#555" }}>91% Puts OTM</span>
        </div>
      </div>

      {/* Legend */}
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
          <div style={{ width: "12px", height: "6px", background: "#D9534F" }} />
          ITM Puts
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ width: "12px", height: "6px", background: "#F5A623" }} />
          OTM Puts
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          width: "220px",
          margin: "12px auto 0",
        }}
      >
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

export default OpenInterestPutsChart;
