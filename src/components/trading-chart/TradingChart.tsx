'use client';

import React, { useEffect, useRef } from 'react';
import {
  createChart,
  CandlestickData,
  LineData,
  HistogramData,
  Time,
  IChartApi,
  MouseEventParams,
  CrosshairMode,
} from 'lightweight-charts';

function EMA(period: number, prices: number[]): number[] {
  const k = 2 / (period + 1);
  const ema: number[] = [];
  let prevEma = prices[0];
  ema.push(prevEma);
  for (let i = 1; i < prices.length; i++) {
    const val = prices[i] * k + prevEma * (1 - k);
    ema.push(val);
    prevEma = val;
  }
  return ema;
}

function calculateMACD(candles: (CandlestickData & { time: Time })[]) {
  const closes = candles.map(c => c.close);
  const ema12 = EMA(12, closes);
  const ema26 = EMA(26, closes);
  const macd = ema12.map((val, i) => val - (ema26[i] || 0));
  const signal = EMA(9, macd);
  const histogram = macd.map((val, i) => val - (signal[i] || 0));
  return macd.map((val, i) => ({
    time: candles[i].time,
    macd: val,
    signal: signal[i] || 0,
    histogram: histogram[i] || 0,
  }));
}

function generateCustomCandles(count: number): (CandlestickData & { time: Time; volume: number })[] {
  const candles: (CandlestickData & { time: Time; volume: number })[] = [];
  let base = 200;
  for (let i = 0; i < count; i++) {
    const isLong = Math.random() < 0.4;
    const range = isLong ? 100 + Math.random() * 200 : 10 + Math.random() * 40;
    const isGreen = Math.random() > 0.5;
    const open = base;
    const close = isGreen ? base + range : base - range;
    const high = Math.max(open, close) + Math.random() * 10;
    const low = Math.min(open, close) - Math.random() * 10;
    const volume = Math.floor(100000 + Math.random() * 500000);
    candles.push({
      time: (Math.floor(Date.now() / 1000) + i * 60) as Time,
      open,
      high,
      low,
      close,
      volume,
    });
    base = close;
  }
  return candles;
}

const TradingChart: React.FC = () => {
  const mainChartRef = useRef<HTMLDivElement>(null);
  const macdChartRef = useRef<HTMLDivElement>(null);
  const macdLabelRef = useRef<HTMLDivElement>(null);
  const candleLabelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const candles = generateCustomCandles(100);
    const chart = createChart(mainChartRef.current!, {
      height: 300,
      layout: { background: { color: '#000' }, textColor: '#fff' },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      rightPriceScale: { visible: true },
      timeScale: { visible: false },
      crosshair: { mode: CrosshairMode.Normal },
    });

    const macdChart = createChart(macdChartRef.current!, {
      height: 100,
      layout: { background: { color: '#000' }, textColor: '#fff' },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      rightPriceScale: { visible: true },
      timeScale: { timeVisible: true, borderColor: '#444' },
      crosshair: { mode: CrosshairMode.Normal },
    });

    const macdData = calculateMACD(candles);

    const candleDataWithMacdColor = candles.map((candle, i) => {
      const macdHist = macdData[i]?.histogram ?? 0;
      const macdColor = macdHist >= 0 ? '#70c8b7' : '#ec4c65';
      return {
        ...candle,
        color: macdColor,
        wickColor: macdColor,
        borderColor: macdColor,
      };
    });

    const candleSeries = chart.addCandlestickSeries({ borderVisible: false });
    candleSeries.setData(candleDataWithMacdColor);

    const emaLine = chart.addLineSeries({ color: '#f48fb1', lineWidth: 2 });
    const ema20 = EMA(20, candles.map(c => c.close));
    emaLine.setData(ema20.map((v, i) => ({ time: candles[i].time, value: v })));

    const histogram = macdChart.addHistogramSeries({ priceLineVisible: false });
    histogram.setData(macdData.map(d => ({
      time: d.time,
      value: d.histogram,
      color: d.histogram >= 0 ? '#70c8b7' : '#ec4c65',
    })));

    const macdLine = macdChart.addLineSeries({ color: '#5f68f0', lineWidth: 1 });
    macdLine.setData(macdData.map(d => ({ time: d.time, value: d.macd })));

    const signalLine = macdChart.addLineSeries({ color: '#e96c40', lineWidth: 1 });
    signalLine.setData(macdData.map(d => ({ time: d.time, value: d.signal })));

    macdChart.timeScale().fitContent();

    chart.subscribeCrosshairMove((param: MouseEventParams<Time>) => {
      if (!candleLabelRef.current) return;
      let candlePoint;
      if (param.time) {
        candlePoint = candles.find(d => d.time === param.time);
      } else {
        candlePoint = candles[candles.length - 1];
      }

      if (candlePoint) {
        const change = candlePoint.close - candlePoint.open;
        const pct = ((change / candlePoint.open) * 100).toFixed(2);
        candleLabelRef.current.innerHTML = `
          O: ${candlePoint.open.toFixed(2)} 
          H: ${candlePoint.high.toFixed(2)} 
          L: ${candlePoint.low.toFixed(2)} 
          C: ${candlePoint.close.toFixed(2)} 
          <span style="color:${change >= 0 ? '#70c8b7' : '#ec4c65'};">
            ${change >= 0 ? '+' : ''}${change.toFixed(2)} (${pct}%)
          </span> 
          Vol: ${(candlePoint.volume / 1000).toFixed(2)}K
        `;
      }
    });

    macdChart.subscribeCrosshairMove((param: MouseEventParams<Time>) => {
      if (!macdLabelRef.current) return;
      let macdPoint;
      if (param.time) {
        macdPoint = macdData.find(d => d.time === param.time);
      } else {
        macdPoint = macdData[macdData.length - 1];
      }

      if (macdPoint) {
        macdLabelRef.current.innerHTML = `
          <span style="color:#aaa;">MACD 12 26 close&nbsp;</span>
          <span style="color:${macdPoint.histogram >= 0 ? '#70c8b7' : '#ec4c65'};">${macdPoint.histogram.toFixed(4)}&nbsp;</span>
          <span style="color:#5f68f0;">${macdPoint.macd.toFixed(2)}&nbsp;</span>
          <span style="color:#e96c40;">${macdPoint.signal.toFixed(4)}</span>
        `;
      }
    });

    let isSyncing = false;
    const syncTimeRange = (source: IChartApi, target: IChartApi) => {
      if (isSyncing) return;
      isSyncing = true;
      const range = source.timeScale().getVisibleLogicalRange();
      if (range) target.timeScale().setVisibleLogicalRange(range);
      isSyncing = false;
    };

    chart.timeScale().subscribeVisibleLogicalRangeChange(() => {
      syncTimeRange(chart, macdChart);
    });
    macdChart.timeScale().subscribeVisibleLogicalRangeChange(() => {
      syncTimeRange(macdChart, chart);
    });

    const resize = () => {
      const width = mainChartRef.current!.clientWidth;
      chart.resize(width, 300);
      macdChart.resize(width, 150);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mainChartRef.current!);

    console.log(candles.map(c => c.time));

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      macdChart.remove();
    };
  }, []);

  return (
    <div>
      <div style={{ position: 'relative', width: '100%' }}>
        <div ref={mainChartRef} style={{ width: '100%' }} />
        <div
          ref={candleLabelRef}
          style={{
            position: 'absolute',
            top: '4px',
            left: '8px',
            fontSize: '12px',
            fontFamily: 'monospace',
            backgroundColor: 'transparent',
            color: '#fff',
            zIndex: 10,
            pointerEvents: 'none',
            lineHeight: 1.4,
            whiteSpace: 'nowrap',
          }}
        />
      </div>
      <div style={{ position: 'relative', width: '100%' }}>
        <div ref={macdChartRef} style={{ width: '100%', marginTop: '0px' }} />
        <div
          ref={macdLabelRef}
          style={{
            position: 'absolute',
            top: '4px',
            left: '8px',
            fontSize: '12px',
            fontFamily: 'monospace',
            backgroundColor: 'transparent',
            color: '#fff',
            zIndex: 10,
            pointerEvents: 'none',
            lineHeight: 1.4,
            whiteSpace: 'nowrap',
          }}
        />
      </div>
    </div>
  );
};

export default TradingChart;
