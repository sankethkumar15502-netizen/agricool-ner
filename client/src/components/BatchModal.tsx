import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

interface BatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BatchModal: React.FC<BatchModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      unitId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // Valid UUID v4 for dummy unit
      vegetableName: formData.get('vegetableName'),
      category: formData.get('category'),
      quantityKg: Number(formData.get('quantityKg')),
      harvestDate: formData.get('harvestDate'),
      targetMarket: formData.get('targetMarket'),
    };

    try {
      const res = await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        onClose();
        // You can trigger a refetch of inventory here
      } else {
        const errorData = await res.json();
        console.error('Failed to create batch:', errorData);
        alert('Failed to register batch. Check console for details.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error connecting to API');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Register New Batch</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 col-span-2">
              <label className="text-sm font-medium text-slate-300">Vegetable Type</label>
              <input required name="vegetableName" type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-agrigreen-500 focus:ring-1 focus:ring-agrigreen-500 transition-all" placeholder="e.g. King Chilli" />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Category</label>
              <select name="category" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-agrigreen-500 focus:ring-1 focus:ring-agrigreen-500 transition-all">
                <option>Leafy Greens</option>
                <option>Solanaceous</option>
                <option>Roots & Tubers</option>
                <option>Spices</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Quantity (kg)</label>
              <input required name="quantityKg" type="number" min="1" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-agrigreen-500 focus:ring-1 focus:ring-agrigreen-500 transition-all" placeholder="0.0" />
            </div>

            <div className="space-y-1 col-span-2">
              <label className="text-sm font-medium text-slate-300">Harvest Date</label>
              <input required name="harvestDate" type="date" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-agrigreen-500 focus:ring-1 focus:ring-agrigreen-500 transition-all" />
            </div>
            
            <div className="space-y-1 col-span-2">
              <label className="text-sm font-medium text-slate-300">Target Market (Optional)</label>
              <input name="targetMarket" type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-agrigreen-500 focus:ring-1 focus:ring-agrigreen-500 transition-all" placeholder="e.g. Guwahati" />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center justify-center space-x-2 bg-agrigreen-600 hover:bg-agrigreen-500 text-white px-6 py-2 rounded-lg transition-colors font-medium shadow-lg shadow-agrigreen-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Register & Analyze</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BatchModal;
