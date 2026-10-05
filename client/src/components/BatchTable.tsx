import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const mockBatches = [
  { id: '1', name: 'King Chilli', category: 'Spices', qty: 250, date: '2023-10-01', shelfLife: 14, status: 'stored' },
  { id: '2', name: 'Bamboo Shoots', category: 'Roots', qty: 120, date: '2023-10-03', shelfLife: 5, status: 'stored' },
  { id: '3', name: 'Local Cabbage', category: 'Leafy', qty: 500, date: '2023-09-25', shelfLife: 2, status: 'warning' },
];

const BatchTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-900/50 text-slate-300 border-b border-slate-700">
            <th className="p-4 font-semibold">Batch ID</th>
            <th className="p-4 font-semibold">Vegetable</th>
            <th className="p-4 font-semibold">Category</th>
            <th className="p-4 font-semibold">Qty (kg)</th>
            <th className="p-4 font-semibold">Harvest Date</th>
            <th className="p-4 font-semibold">Est. Shelf Life</th>
            <th className="p-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {mockBatches.map((batch) => (
            <tr key={batch.id} className="hover:bg-slate-700/30 transition-colors">
              <td className="p-4 text-slate-400">#{batch.id.padStart(4, '0')}</td>
              <td className="p-4 font-medium text-white">{batch.name}</td>
              <td className="p-4 text-slate-300">
                <span className="px-2 py-1 rounded bg-slate-700 text-xs">{batch.category}</span>
              </td>
              <td className="p-4 text-slate-300">{batch.qty}</td>
              <td className="p-4 text-slate-300">{batch.date}</td>
              <td className="p-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className={batch.shelfLife < 3 ? 'text-red-400 font-medium' : 'text-slate-300'}>
                    {batch.shelfLife} days
                  </span>
                </div>
              </td>
              <td className="p-4">
                {batch.status === 'stored' ? (
                  <span className="flex items-center space-x-1 text-green-400 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>Optimal</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 text-yellow-400 text-sm font-medium">
                    <AlertTriangle className="w-4 h-4" />
                    <span>At Risk</span>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatchTable;
