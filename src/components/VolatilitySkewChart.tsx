'use client';

import React, { useEffect, useRef } from 'react';
import {
  createChart,
  LineData,
  Time,
} from 'lightweight-charts';

const VolatilitySkewChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = createChart(chartRef.current!, {
      width: 300,
      height: 300,
      layout: {
        background: { color: '#0f172a' },
        textColor: '#fff',
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

    const lineSeries = chart.addLineSeries({
      color: '#3b82f6',
      lineWidth: 2,
    });

    // Sample skew data: time represents strike price mapped to timestamp
    const skewData: LineData<Time>[] = [
      { time: 1719273600 as Time, value: 25 },  // IV for strike 4300
      { time: 1719359999 as Time, value: 20 },  // IV for strike 4350
      { time: 1719446400 as Time, value: 18 },  // IV for strike 4400
      { time: 1719532800 as Time, value: 19 },  // IV for strike 4450
      { time: 1719619200 as Time, value: 22 },  // IV for strike 4500
    ];

    lineSeries.setData(skewData);

    return () => chart.remove();
  }, []);

  return (
    <div>
      <h2 className="text-center text-white mb-4">Volatility Skew</h2>
      <div ref={chartRef} />
    </div>
  );
};

export default VolatilitySkewChart;
