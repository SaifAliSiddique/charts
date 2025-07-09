'use client';

import React, { useEffect, useRef } from 'react';
import {
  createChart,
  CrosshairMode,
  Time,
  CandlestickData,
  LineStyle,
} from 'lightweight-charts';

const ExpectedMoveChart: React.FC = () => {
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

    // ✅ 2 red + 4 blue candles
    const candleData: CandlestickData[] = [
      // 🔵 Blue candle 1
      { time: 1719273600 as Time, open: 4400, high: 4460, low: 4380, close: 4450 },
      // 🔵 Blue candle 2
      { time: 1719360000 as Time, open: 4450, high: 4470, low: 4430, close: 4465 },
      // 🔴 Red candle 1
      { time: 1719446400 as Time, open: 4465, high: 4480, low: 4435, close: 4440 },
      // 🔵 Blue candle 3
      { time: 1719532800 as Time, open: 4440, high: 4475, low: 4420, close: 4470 },
      // 🔴 Red candle 2
      { time: 1719619200 as Time, open: 4470, high: 4480, low: 4440, close: 4450 },
      // 🔵 Blue candle 4
      { time: 1719705600 as Time, open: 4450, high: 4490, low: 4440, close: 4485 },
    ];

    candleSeries.setData(candleData);

    // ✅ Mid Line
    candleSeries.createPriceLine({
      price: 4440,
      color: 'red',
      lineWidth: 2,
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: true,
      title: 'Mid',
    });

    // ✅ Sigma Levels
    const sigmaLevels = [
      { price: 4430, color: 'green', title: '1σ' },
      { price: 4450, color: 'green', title: '1σ' },
      { price: 4420, color: 'blue', title: '2σ' },
      { price: 4460, color: 'blue', title: '2σ' },
    ];

    sigmaLevels.forEach(({ price, color, title }) => {
      candleSeries.createPriceLine({
        price,
        color,
        lineWidth: 2,
        axisLabelVisible: true,
        title,
      });
    });

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div>
      <h2 className='text-center text-white mb-5'>
        Expected Move (0DTE / Weekly)
      </h2>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default ExpectedMoveChart;
