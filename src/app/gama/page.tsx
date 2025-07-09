import TotalGammaChart from "@/components/gama/TotalGammaChart";

const testCandles = [
  { time: 1719446400, open: 100, high: 110, low: 90, close: 105 },
  { time: 1719532800, open: 105, high: 115, low: 95, close: 110 },
  { time: 1719619200, open: 110, high: 120, low: 100, close: 115 },
];

const testVolumeProfile = [
  { price: 105, purpleVolume: 30, cyanVolume: 20 },
  { price: 110, purpleVolume: 40, cyanVolume: 25 },
];

export default function HomePage() {
  return (
    <main>
      <h1>Total Gamma Chart</h1>
      <TotalGammaChart
        candles={testCandles}
        g1={115}
        g2={100}
        zeroG={110}
        volumeProfile={testVolumeProfile}
      />
    </main>
  );
}