'use client';

import React, { useEffect, useRef } from 'react';
import {
  createChart,
  HistogramData,
  Time,
} from 'lightweight-charts';

const MaxPainChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = createChart(chartRef.current!, {
      width: 300,
      height: 300,
      layout: {
        background: { color: '#000' },
        textColor: '#fff',
      },
      grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: '#71649C',
      },
    });

    const histogramSeries = chart.addHistogramSeries({
      color: '#f39c12', // orange for visibility
      base: 0,
      priceFormat: {
        type: 'volume',
      },
    });

    // Dummy data: map strikes to timestamps
    const data: HistogramData<Time>[] = [
      { time: 1719273600 as Time, value: 1500 }, // Strike 4400
      { time: 1719359999 as Time, value: 3000 }, // Strike 4450 (Max Pain)
      { time: 1719446400 as Time, value: 1100 }, // Strike 4500
    ];

    histogramSeries.setData(data);

    return () => chart.remove();
  }, []);

  return (
    <div>
      <h2 className="text-center text-white mb-4">Max Pain Chart</h2>
      <div ref={chartRef} />
    </div>
  );
};

export default MaxPainChart;
