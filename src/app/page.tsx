import ExpectedMoveChart from "@/components/ExpectedMoveChart";
import ExpectedGammaFlipChart from "@/components/ExpectedGammaFlipChart";
import NetGammaExposureChart from "@/components/NetGammaExposureChart";
import AbsoluteGammaStrikeChart from "@/components/AbsoluteGammaStrikeChart";
import MaxPainChart from "@/components/MaxPainChart";
import VolatilitySkewChart from "@/components/VolatilitySkewChart";
import NetNotionalDeltaChart from "@/components/NetNotionalDeltaChart";
import CallPutResistanceChart from "@/components/CallPutResistanceChart";

// Chart JS
import HorizontalBarChart from "@/components/chart/HorizontalBarChart";
import PieChart from "@/components/chart/PieChart";
import AllPremiumsChart from "@/components/chart/AllPremiumsChart";
import AllOpenInterestChart from "@/components/chart/AllOpenInterestChart";
import OpenInterestCallsChart from "@/components/chart/OpenInterestCallsChart";
import OpenInterestPutsChart from "@/components/chart/OpenInterestPutsChart";

export default function Home() {
  return (
    <main >
      <div className="flex justify-center items-center p-5 gap-3 flex-wrap">
        <ExpectedMoveChart />
        <ExpectedGammaFlipChart />
        <NetGammaExposureChart />
        <AbsoluteGammaStrikeChart />
        <MaxPainChart />
        <VolatilitySkewChart />
        <NetNotionalDeltaChart />
        <CallPutResistanceChart />
        <AllPremiumsChart />
        <AllOpenInterestChart />
        <OpenInterestCallsChart />
        <OpenInterestPutsChart />
      </div>
      <div className="flex justify-center items-center p-5 gap-3 flex-wrap">
      <div>
       <HorizontalBarChart />
      </div>
      <div>
       <PieChart />
      </div>
      </div>
    </main>
  );
}
