"use client";

import React, { useState } from "react";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS } from "react-chartjs-2";

// Register chart plugins
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = () => {
  const [toggled, setToggled] = useState(false);

  // Dataset when toggle is OFF (more balanced)
  const valuesDefault = [10, -5, 8, -6, 7, -4, 6, -3, 5, -2];

  // Dataset when toggle is ON (more red)
  const valuesToggled = [5, -10, 4, -8, 3, -7, 2, -6, 1, -5];

  const values = toggled ? valuesToggled : valuesDefault;

  const data = {
    labels: values.map((v) => `${Math.abs(v)}%`),
    datasets: [
      {
        data: values.map(Math.abs),
        backgroundColor: values.map((v) => (v >= 0 ? "#00FFF7" : "#FF2E2E")),
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `Value: ${Math.abs(values[ctx.dataIndex])}%`,
        },
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold" as const,
          size: 12,
        },
        formatter: (value, ctx) => `${Math.abs(values[ctx.dataIndex])}%`,
      },
    },
  };

  return (
    <div
      style={{
        background: "#1a1a1a",
        padding: "20px",
        borderRadius: "16px",
        width: "280px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title with Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        <div>
          <span style={{ color: "#ffffff" }}>S&amp;P 500</span>{" "}
          <span style={{ color: toggled ? "#FF2E2E" : "#00FFF7" }}>
            {toggled ? "20.32%" : "60.68%"}
          </span>
        </div>

        {/* Toggle Switch */}
        <div
          onClick={() => setToggled(!toggled)}
          style={{
            width: "34px",
            height: "20px",
            background: toggled ? "#00FFF7" : "#555",
            borderRadius: "999px",
            position: "relative",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "2px",
              left: toggled ? "16px" : "2px",
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
      <div style={{ marginTop: "20px" }}>
        <ChartJS type="pie" data={data} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
};

export default PieChart;
