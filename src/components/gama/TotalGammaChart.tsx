// components/TotalGammaChart.tsx
"use client";

import {
  createChart,
  ColorType,
  CrosshairMode,
  LineStyle,
  IChartApi,
} from "lightweight-charts";
import React, { useEffect, useRef } from "react";

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface VolumeProfileBar {
  price: number;
  purpleVolume: number;
  cyanVolume: number;
}

interface TotalGammaChartProps {
  candles: Candle[];
  g1: number;
  g2: number;
  zeroG: number;
  volumeProfile: VolumeProfileBar[];
}

const CHART_HEIGHT = 600;
const CHART_WIDTH = 900; // Set a fixed width for the chart

const TotalGammaChart: React.FC<TotalGammaChartProps> = ({
  candles,
  g1,
  g2,
  zeroG,
  volumeProfile,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<any | null>(null);

  // Helper: convert unix seconds to YYYY-MM-DD
  const toChartTime = (t: number) =>
    new Date(t * 1000).toISOString().slice(0, 10);

  // Chart setup
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#0f172a" },
        textColor: "white",
      },
      width: chartContainerRef.current.clientWidth,
      height: CHART_HEIGHT,
      rightPriceScale: { visible: true, borderVisible: false },
      leftPriceScale: { visible: false },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      grid: {
        vertLines: { color: "#334155" },
        horzLines: { color: "#334155" },
      },
    });
    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeriesRef.current = candlestickSeries;
    candlestickSeries.setData(
      (candles || []).map((c) => ({
        time: toChartTime(c.time),
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      }))
    );

    chart.addLineSeries({
      color: "#991b1b",
      lineWidth: 2,
      priceLineVisible: false,
    }).setData((candles || []).map((c) => ({ time: toChartTime(c.time), value: g1 })));

    chart.addLineSeries({
      color: "#15803d",
      lineWidth: 2,
      priceLineVisible: false,
    }).setData((candles || []).map((c) => ({ time: toChartTime(c.time), value: g2 })));

    chart.addLineSeries({
      color: "#2563eb",
      lineWidth: 2,
      lineStyle: LineStyle.Dotted,
      priceLineVisible: false,
    }).setData((candles || []).map((c) => ({ time: toChartTime(c.time), value: zeroG })));

    // Redraw overlay on chart events
    const redrawOverlay = () => drawOverlay();
    chart.timeScale().subscribeVisibleTimeRangeChange(redrawOverlay);
    chart.timeScale().subscribeVisibleLogicalRangeChange(redrawOverlay);
    chart.subscribeCrosshairMove(redrawOverlay);

    // Initial draw
    drawOverlay();

    // Cleanup
    return () => {
      chart.remove();
    };
    // eslint-disable-next-line
  }, [candles, g1, g2, zeroG, volumeProfile]);

  // Overlay drawing function
  const drawOverlay = () => {
    const chart = chartRef.current;
    const canvas = overlayRef.current;
    const candlestickSeries = candlestickSeriesRef.current;
    if (!chart || !canvas || !candlestickSeries) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;

    // Get chart area right edge (before price scale)
    const priceScaleWidth = chart.priceScale('right').width?.() || 60;
    const chartRightEdge = width - priceScaleWidth;

    // Price to Y
    const priceToY = (price: number) => {
      if (!candlestickSeries) return 0;
      const y = candlestickSeries.priceToCoordinate(price);
      return y !== null && y !== undefined ? y : 0;
    };

    // Volume Profiles (Purple & Cyan)
    // (volumeProfile || []).forEach((vp) => {
    //   const y = priceToY(vp.price);
    //   if (!y) return;
    //
    //   ctx.fillStyle = "#9333ea";
    //   ctx.fillRect(width - 90, y - 2, vp.purpleVolume, 4);
    //
    //   ctx.fillStyle = "#06b6d4";
    //   ctx.fillRect(width - 30, y - 2, vp.cyanVolume, 4);
    // });
  };

  // Redraw overlay on resize
  useEffect(() => {
    const handleResize = () => {
      if (overlayRef.current && chartContainerRef.current) {
        overlayRef.current.width = chartContainerRef.current.clientWidth;
        overlayRef.current.height = CHART_HEIGHT;
        drawOverlay();
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  // Redraw overlay when data changes
  useEffect(() => {
    drawOverlay();
    // eslint-disable-next-line
  }, [candles, g1, g2, zeroG, volumeProfile]);

  return (
    <div
      style={{
        position: "relative",
        width: CHART_WIDTH,
        height: CHART_HEIGHT,
        background: "#0f172a",
      }}
    >
      {/* Chart */}
      <div
        ref={chartContainerRef}
        style={{
          width: "100%",
          height: "100%",
          minWidth: 0,
          minHeight: 0,
        }}
      />
      {/* Overlay */}
      <canvas
        ref={overlayRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
        width={CHART_WIDTH}
        height={CHART_HEIGHT}
      />
    </div>
  );
};

export default TotalGammaChart;
