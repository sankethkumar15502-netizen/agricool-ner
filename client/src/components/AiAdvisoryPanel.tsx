import React from 'react';
import { Cpu, Thermometer, Droplets, ShieldAlert } from 'lucide-react';

interface AdisoryProps {
  isLoading: boolean;
  data: any;
}

const AiAdvisoryPanel: React.FC<AdisoryProps> = ({ isLoading, data }) => {
  if (isLoading) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 flex flex-col items-center justify-center min-h-[400px]">
        <Cpu className="w-12 h-12 text-agrigreen-500 animate-pulse mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">Analyzing Data with Gemini AI</h3>
        <p className="text-slate-400">Evaluating telemetry, weather forecasts, and batch profiles...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg animate-in fade-in duration-500">
      <div className="bg-slate-900/50 p-6 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-agrigreen-900/50 rounded-lg">
            <Cpu className="w-6 h-6 text-agrigreen-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Gemini Advisory Report</h2>
            <p className="text-sm text-slate-400">Generated just now</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${
          data.spoilageRisk === 'High' ? 'bg-red-900/50 text-red-400' :
          data.spoilageRisk === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
          'bg-green-900/50 text-green-400'
        }`}>
          <ShieldAlert className="w-4 h-4" />
          <span>Risk: {data.spoilageRisk}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
            <div className="flex items-center space-x-2 text-slate-400 mb-2">
              <Thermometer className="w-4 h-4" />
              <span className="text-sm font-medium">Optimal Temp</span>
            </div>
            <p className="text-2xl font-bold text-white">{data.optimalTempMin}°C - {data.optimalTempMax}°C</p>
          </div>
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
            <div className="flex items-center space-x-2 text-slate-400 mb-2">
              <Droplets className="w-4 h-4" />
              <span className="text-sm font-medium">Optimal Humidity</span>
            </div>
            <p className="text-2xl font-bold text-white">{data.optimalHumidityMin}% - {data.optimalHumidityMax}%</p>
          </div>
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
            <div className="flex items-center space-x-2 text-slate-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span className="text-sm font-medium">Est. Shelf Life</span>
            </div>
            <p className="text-2xl font-bold text-white">{data.predictedShelfLifeDays} days</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Operational Recommendations</h3>
          <ul className="space-y-3">
            {data.recommendations?.map((rec: string, i: number) => (
              <li key={i} className="flex items-start space-x-3 bg-slate-900/50 p-4 rounded-lg border border-slate-700/30">
                <div className="min-w-6 min-h-6 flex items-center justify-center rounded-full bg-agrigreen-900/30 text-agrigreen-400 text-sm font-bold mt-0.5">
                  {i + 1}
                </div>
                <p className="text-slate-300 leading-relaxed">{rec}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AiAdvisoryPanel;
