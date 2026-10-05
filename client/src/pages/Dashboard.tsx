import { useState, useEffect } from 'react';
import { Thermometer, Droplets, SunMedium, BatteryMedium } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import TelemetryChart from '../components/TelemetryChart';

const Dashboard = () => {
  const [telemetry, setTelemetry] = useState({
    internalTemp: 4.5,
    humidity: 92,
    solarGenKw: 4.2,
    batterySoc: 85,
    compressorActive: true
  });

  // Mocking real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        internalTemp: +(prev.internalTemp + (Math.random() * 0.2 - 0.1)).toFixed(1),
        humidity: Math.min(100, Math.max(0, Math.round(prev.humidity + (Math.random() * 2 - 1)))),
        solarGenKw: +(Math.max(0, prev.solarGenKw + (Math.random() * 0.4 - 0.2))).toFixed(1),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Live Operations</h1>
        <p className="text-slate-400 mt-1">Real-time monitoring of your solar cold storage unit.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Internal Temp"
          value={telemetry.internalTemp}
          unit="°C"
          icon={Thermometer}
          trend="-0.2°C"
          trendUp={true}
          colorClass="text-blue-400"
        />
        <MetricCard
          title="Relative Humidity"
          value={telemetry.humidity}
          unit="%"
          icon={Droplets}
          trend="+1%"
          trendUp={true}
          colorClass="text-teal-400"
        />
        <MetricCard
          title="Solar Generation"
          value={telemetry.solarGenKw}
          unit="kW"
          icon={SunMedium}
          trend="+0.4kW"
          trendUp={true}
          colorClass="text-yellow-400"
        />
        <MetricCard
          title="Battery SoC"
          value={telemetry.batterySoc}
          unit="%"
          icon={BatteryMedium}
          trend="-2%"
          trendUp={false}
          colorClass="text-green-400"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Environmental Telemetry</h2>
          <div className="h-[300px] w-full">
            <TelemetryChart />
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-300">Compressor</span>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${telemetry.compressorActive ? 'bg-green-900/50 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                {telemetry.compressorActive ? 'ACTIVE' : 'IDLE'}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-300">Grid Status</span>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-red-900/50 text-red-400">
                OFF-GRID
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-300">Defrost Cycle</span>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-slate-700 text-slate-400">
                INACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
