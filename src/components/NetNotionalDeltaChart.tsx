'use client';

import React, { useEffect, useRef } from 'react';
import {
  createChart,
  HistogramData,
  Time,
} from 'lightweight-charts';

const NetNotionalDeltaChart: React.FC = () => {
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
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const histogramSeries = chart.addHistogramSeries({
      base: 0,
      priceFormat: {
        type: 'volume',
      },
    });

    const netDeltaData: HistogramData<Time>[] = [
      { time: 1719273600 as Time, value: 2000000, color: '#22c55e' },
      { time: 1719359999 as Time, value: -1500000, color: '#ef4444' },
      { time: 1719446400 as Time, value: 1000000, color: '#22c55e' },
      { time: 1719532800 as Time, value: -2500000, color: '#ef4444' },
      { time: 1719619200 as Time, value: 500000, color: '#22c55e' },
    ];

    histogramSeries.setData(netDeltaData);

    return () => chart.remove();
  }, []);

  return (
    <div>
      <h2 className="text-center text-white mb-4">Net Notional Delta</h2>
      <div ref={chartRef} />
    </div>
  );
};

export default NetNotionalDeltaChart;
