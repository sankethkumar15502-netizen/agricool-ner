import React from 'react';
import { TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react';

interface MarketData {
  market: string;
  pricePerKg: number;
  trend: 'up' | 'down' | 'stable';
  vegetable: string;
}

interface MarketInsightsCardProps {
  data: MarketData;
}

const MarketInsightsCard: React.FC<MarketInsightsCardProps> = ({ data }) => {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-lg hover:border-agrigreen-500/50 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2 text-slate-300">
          <MapPin className="w-5 h-5 text-slate-400" />
          <span className="font-semibold">{data.market}</span>
        </div>
        <div className={`p-2 rounded-lg ${
          data.trend === 'up' ? 'bg-green-900/30 text-green-400' :
          data.trend === 'down' ? 'bg-red-900/30 text-red-400' :
          'bg-slate-700 text-slate-400'
        }`}>
          {data.trend === 'up' && <TrendingUp className="w-5 h-5" />}
          {data.trend === 'down' && <TrendingDown className="w-5 h-5" />}
          {data.trend === 'stable' && <Minus className="w-5 h-5" />}
        </div>
      </div>
      
      <div>
        <p className="text-sm text-slate-400 mb-1">{data.vegetable}</p>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-white">₹{data.pricePerKg}</span>
          <span className="text-slate-500 text-sm">/kg</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <button className="w-full py-2 text-sm font-medium text-agrigreen-400 hover:text-agrigreen-300 transition-colors">
          View Route Details →
        </button>
      </div>
    </div>
  );
};

export default MarketInsightsCard;
