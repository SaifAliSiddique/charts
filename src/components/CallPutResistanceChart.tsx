'use client';

import React, { useEffect, useRef } from 'react';
import {
  createChart,
  HistogramData,
  Time,
} from 'lightweight-charts';

const CallPutResistanceChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = createChart(chartRef.current!, {
      width: 300,
      height: 300,
      layout: {
        background: { color: '#0f172a' },
        textColor: '#ffffff',
      },
      grid: {
        vertLines: { color: '#334155' },
        horzLines: { color: '#334155' },
      },
      timeScale: {
        timeVisible: false,
      },
      rightPriceScale: {
        visible: true,
      },
    });

    const resistanceSeries = chart.addHistogramSeries({
      priceFormat: {
        type: 'price',
      },
      base: 0,
    });

    // Example: Strike price vs gamma exposure (use real data in live version)
    const data: HistogramData<Time>[] = [
      { time: 1 as Time, value: 5, color: '#22c55e' },   // Call Resistance
      { time: 2 as Time, value: 4.5, color: '#22c55e' },
      { time: 3 as Time, value: 4, color: '#22c55e' },
      { time: 4 as Time, value: -3.5, color: '#ef4444' }, // Put Support
      { time: 5 as Time, value: -4, color: '#ef4444' },
      { time: 6 as Time, value: -5, color: '#ef4444' },
    ];

    resistanceSeries.setData(data);

    return () => chart.remove();
  }, []);

  return (
    <div>
      <h2 className="text-white text-center mb-4">Call/Put Resistance Levels 1–5</h2>
      <div ref={chartRef} />
    </div>
  );
};

export default CallPutResistanceChart;
