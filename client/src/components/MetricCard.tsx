import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  colorClass?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon: Icon, trend, trendUp, colorClass = "text-agrigreen-400" }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg hover:shadow-agrigreen-900/20 transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <div className="flex items-baseline space-x-1 mt-2">
            <span className="text-3xl font-bold text-white">{value}</span>
            <span className="text-slate-400 font-medium">{unit}</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-slate-900 ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={trendUp ? 'text-green-400' : 'text-red-400'}>
            {trend}
          </span>
          <span className="text-slate-500 ml-2">vs last hour</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
