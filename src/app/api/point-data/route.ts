import { NextRequest, NextResponse } from 'next/server';

// Dummy/mock data (replace with your real data source if needed)
import { generateCustomCandles, calculateMACD } from '@/components/trading-chart/TradingChartData'; // You may need to move these functions to a shared file

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { open, close } = body;

  // Generate the same candles and macdData as your chart
  const candles = generateCustomCandles(100);
  const macdData = calculateMACD(candles);

  // Helper to find candle and macd by time
  function getPointData(time: number) {
    const candle = candles.find(c => c.time === time);
    const macd = macdData.find(m => m.time === time);
    if (!candle || !macd) return null;
    return {
      ...candle,
      macd: {
        macd: macd.macd,
        signal: macd.signal,
        histogram: macd.histogram,
      },
    };
  }

  const openData = getPointData(open?.time);
  const closeData = getPointData(close?.time);

  return NextResponse.json({
    open: openData,
    close: closeData,
  });
}
