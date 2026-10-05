import { MapPin, Truck } from 'lucide-react';
import MarketInsightsCard from '../components/MarketInsightsCard';

const mockTrends = [
  { market: "Guwahati Hub", pricePerKg: 150, trend: "up" as const, vegetable: "King Chilli" },
  { market: "Shillong Market", pricePerKg: 85, trend: "stable" as const, vegetable: "Local Cabbage" },
  { market: "Imphal Central", pricePerKg: 120, trend: "down" as const, vegetable: "Bamboo Shoots" },
  { market: "Aizawl Fresh", pricePerKg: 180, trend: "up" as const, vegetable: "King Chilli" },
];

const MarketInsights = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">NER Market Intelligence</h1>
        <p className="text-slate-400 mt-1">Real-time regional pricing and optimal dispatch routing.</p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Current Price Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTrends.map((trend, i) => (
            <MarketInsightsCard key={i} data={trend} />
          ))}
        </div>
      </section>

      <section className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-6">Recommended Dispatch Routes</h2>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-900/50 border border-agrigreen-900/50 rounded-lg">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="p-3 bg-agrigreen-900/30 rounded-full text-agrigreen-400">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Batch #0001 - King Chilli</h3>
                <p className="text-sm text-slate-400">250kg ready for dispatch</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-slate-300 w-full md:w-auto">
              <div className="flex flex-col items-center flex-1 md:flex-none">
                <MapPin className="w-4 h-4 text-slate-500 mb-1" />
                <span className="text-xs">Current</span>
              </div>
              <div className="h-0.5 w-12 sm:w-24 bg-slate-700 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-agrigreen-400 bg-slate-900 px-2 font-medium">Optimal</div>
              </div>
              <div className="flex flex-col items-center flex-1 md:flex-none">
                <MapPin className="w-4 h-4 text-agrigreen-400 mb-1" />
                <span className="text-xs font-semibold text-agrigreen-400">Aizawl Fresh</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 text-right w-full md:w-auto">
              <p className="text-sm text-slate-400">Est. Revenue</p>
              <p className="text-lg font-bold text-green-400">₹45,000</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketInsights;
