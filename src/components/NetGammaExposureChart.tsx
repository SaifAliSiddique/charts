'use client';

import React, { useEffect, useRef } from 'react';
import {
  createChart,
  LineData,
  LineStyle,
} from 'lightweight-charts';

const NetGammaExposureChart: React.FC = () => {
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
        vertLines: { color: '#333' },
        horzLines: { color: '#333' },
      },
      rightPriceScale: {
        borderColor: '#71649C',
      },
      timeScale: {
        borderColor: '#71649C',
      },
    });

    const lineSeries = chart.addLineSeries({
      color: '#00ffcc',
      lineWidth: 2,
    });

    const netGammaData: LineData[] = [
        { time: '2024-06-25', value: -1000 },
        { time: '2024-06-26', value: -500 },
        { time: '2024-06-27', value: 0 },
        { time: '2024-06-28', value: 300 },
        { time: '2024-06-29', value: 800 },
    ];
      

    lineSeries.setData(netGammaData);

    return () => chart.remove();
  }, []);

  return (
    <div>
      <h2 className="text-center text-white mb-4">
        Net Gamma Exposure
      </h2>
      <div ref={chartRef} />
    </div>
  );
};

export default NetGammaExposureChart;
