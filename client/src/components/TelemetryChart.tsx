import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const mockData = [
  { time: '08:00', temp: 5.2, humidity: 88, solar: 0.5 },
  { time: '09:00', temp: 4.8, humidity: 89, solar: 1.2 },
  { time: '10:00', temp: 4.5, humidity: 91, solar: 2.5 },
  { time: '11:00', temp: 4.2, humidity: 92, solar: 3.8 },
  { time: '12:00', temp: 4.0, humidity: 93, solar: 4.5 },
  { time: '13:00', temp: 4.3, humidity: 90, solar: 4.2 },
  { time: '14:00', temp: 4.5, humidity: 89, solar: 3.5 },
];

const TelemetryChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={mockData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
        <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} />
        <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
          itemStyle={{ color: '#f8fafc' }}
        />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="temp" name="Temp (°C)" stroke="#60a5fa" strokeWidth={2} dot={false} />
        <Line yAxisId="left" type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#2dd4bf" strokeWidth={2} dot={false} />
        <Line yAxisId="right" type="monotone" dataKey="solar" name="Solar (kW)" stroke="#facc15" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TelemetryChart;
