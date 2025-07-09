import { CandlestickData, Time } from 'lightweight-charts';

export function EMA(period: number, prices: number[]): number[] {
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

export function calculateMACD(candles: (CandlestickData & { time: Time })[]) {
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

export function generateCustomCandles(count: number): (CandlestickData & { time: Time; volume: number })[] {
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
