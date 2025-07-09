'use client';

import React, { useEffect, useRef } from 'react';
import {
  createChart,
  CrosshairMode,
  Time,
  CandlestickData,
  LineStyle,
} from 'lightweight-charts';

const ExpectedGammaFlipChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current!, {
      width: 300,
      height: 300,
      layout: {
        background: { color: '#000000' },
        textColor: '#ffffff',
      },
      grid: {
        vertLines: { color: '#333' },
        horzLines: { color: '#333' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: '#71649C',
      },
      timeScale: {
        borderColor: '#71649C',
      },
    });

    const candleSeries = chart.addCandlestickSeries();

    const candleData: CandlestickData[] = [
      { time: 1719273600 as Time, open: 4430, high: 4460, low: 4410, close: 4440 },
      { time: 1719359999 as Time, open: 4440, high: 4470, low: 4430, close: 4450 },
      { time: 1719446400 as Time, open: 4450, high: 4480, low: 4440, close: 4460 },
      { time: 1719532800 as Time, open: 4460, high: 4475, low: 4420, close: 4430 },
      { time: 1719619200 as Time, open: 4430, high: 4440, low: 4400, close: 4410 },
      { time: 1719705600 as Time, open: 4410, high: 4425, low: 4395, close: 4400 },
    ];

    candleSeries.setData(candleData);

    // Gamma Flip Level
    const gammaFlipLevel = 4430;

    candleSeries.createPriceLine({
      price: gammaFlipLevel,
      color: 'red',
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: 'Gamma Flip',
    });

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div>
      <h2 className='text-center text-white mb-5'>
        Gamma Flip Level (0DTE / Weekly)
      </h2>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default ExpectedGammaFlipChart;
