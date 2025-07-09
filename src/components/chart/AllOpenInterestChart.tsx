"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // ✅ import kiya
import { Chart } from "react-chartjs-2";

// ✅ Register everything
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const AllOpenInterestChart = () => {
  const data = {
    labels: ["OTM Calls", "ITM Calls", "OTM Puts", "ITM Puts"],
    datasets: [
      {
        data: [73, 27, 91, 9],
        backgroundColor: ["#00C9A7", "#2BC8A0", "#F5A623", "#D9534F"],
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
          label: (ctx) => `${ctx.label}: ${ctx.raw}%`,
        },
      },
      datalabels: {
        display: false, // ✅ plugin active hai lekin label dikhaye nahi ja rahe
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
        All Open Interest:{" "}
        <span style={{ color: "#555", fontWeight: "normal" }}>2025-05-06</span>
      </div>

      {/* Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          marginTop: "10px",
          fontSize: "13px",
          rowGap: "4px",
          color: "#000",
        }}
      >
        <div>
          <strong>27%</strong> Calls ITM
        </div>
        <div>
          <strong>9%</strong> Puts ITM
        </div>
        <div>
          <strong>73%</strong> Calls OTM
        </div>
        <div>
          <strong>91%</strong> Puts OTM
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
          color: "#000",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ width: "12px", height: "6px", background: "#00C9A7" }} />
          OTM Calls
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ width: "12px", height: "6px", background: "#2BC8A0" }} />
          ITM Calls
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ width: "12px", height: "6px", background: "#F5A623" }} />
          OTM Puts
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ width: "12px", height: "6px", background: "#D9534F" }} />
          ITM Puts
        </div>
      </div>

      {/* Pie Chart */}
      <div style={{ height: "220px", marginTop: "12px" }}>
        <Chart type="pie" data={data} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
};

export default AllOpenInterestChart;
