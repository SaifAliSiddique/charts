"use client";

import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const AllPremiumsChart = () => {
  const labels = ["OTM Calls", "ITM Calls", "OTM Puts", "ITM Puts"];
  const dataValues = [10269, 230541, 20631, 41389];
  const backgroundColors = ["#b0f0ec", "#3fcf8e", "#f8bd6d", "#f66e66"];

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        barThickness: 16,
        borderRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.raw?.toLocaleString()}`,
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#444",
          font: {
            size: 12,
            style: "normal",
          },
        },
        grid: {
          display: true,
          color: "#e5e5e5", // ✅ Light grey for boxes
          tickColor: "#ccc",
          drawTicks: true,
          lineWidth: 1,
        },
      },
      y: {
        ticks: {
          color: "#333",
          font: {
            size: 12,
            weight: "bold",
            style: "normal",
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        width: "360px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "10px" }}>
        <div style={{ fontWeight: "bold", fontSize: "14px", color: "#ccc" }}>
          All Premiums <span style={{ color: "#555" }}>2025-05-06</span>
        </div>

        {/* Summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            marginTop: "10px",
            rowGap: "6px",
            fontSize: "13px",
          }}
        >
          <div style={{ color: "#3fcf8e" }}>
            <strong>$230,541</strong>
            <br />
            <span style={{ fontSize: "12px", color: "#555" }}>96% Calls ITM</span>
          </div>
          <div style={{ color: "#f66e66" }}>
            <strong>$41,389</strong>
            <br />
            <span style={{ fontSize: "12px", color: "#555" }}>67% Puts ITM</span>
          </div>
          <div style={{ color: "#3fcf8e" }}>
            <strong>$10,269</strong>
            <br />
            <span style={{ fontSize: "12px", color: "#555" }}>4% Calls OTM</span>
          </div>
          <div style={{ color: "#f66e66" }}>
            <strong>$20,631</strong>
            <br />
            <span style={{ fontSize: "12px", color: "#555" }}>33% Puts OTM</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: "160px" }}>
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
};

export default AllPremiumsChart;
