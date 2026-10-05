import { useState } from 'react';
import { Plus } from 'lucide-react';
import BatchTable from '../components/BatchTable';
import BatchModal from '../components/BatchModal';

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Batch Inventory</h1>
          <p className="text-slate-400 mt-1">Manage stored vegetables and track shelf-life.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-agrigreen-600 hover:bg-agrigreen-500 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-lg shadow-agrigreen-900/20"
        >
          <Plus className="w-5 h-5" />
          <span>New Batch</span>
        </button>
      </header>

      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
        <BatchTable />
      </div>

      <BatchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Inventory;
