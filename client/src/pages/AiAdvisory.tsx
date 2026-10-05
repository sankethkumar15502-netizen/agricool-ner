import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import AiAdvisoryPanel from '../components/AiAdvisoryPanel';

const AiAdvisory = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [advisoryData, setAdvisoryData] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simulate API call to /api/ai/advisory
    setTimeout(() => {
      setAdvisoryData({
        optimalTempMin: 8,
        optimalTempMax: 10,
        optimalHumidityMin: 85,
        optimalHumidityMax: 90,
        predictedShelfLifeDays: 12,
        spoilageRisk: 'Medium',
        recommendations: [
          'Run high-draw cooling cycle now to pre-cool before afternoon cloud cover reduces solar output.',
          'Slightly increase ventilation to mitigate condensation risks from high ambient NER humidity.',
          'Prioritize King Chilli dispatch within the next 4 days to capture peak Shillong market prices.'
        ]
      });
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-agrigreen-900/30 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-agrigreen-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">Gemini AI Assistant</h1>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
          Ask questions about batch preservation, energy management, or get predictive insights based on live telemetry and NER market conditions.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. 'How should I adjust cooling for tomorrow's heavy monsoon forecast?'"
          className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl pl-6 pr-16 py-4 text-white text-lg shadow-lg focus:outline-none focus:border-agrigreen-500 focus:ring-4 focus:ring-agrigreen-900/30 transition-all placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="absolute right-2 top-2 bottom-2 bg-agrigreen-600 hover:bg-agrigreen-500 text-white rounded-lg px-4 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      <div className="pt-4">
        {isLoading || advisoryData ? (
          <AiAdvisoryPanel isLoading={isLoading} data={advisoryData} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {['Optimize current battery usage against forecast', 'Check spoilage risk for Bamboo Shoots', 'Recommend market routing for King Chilli'].map((suggestion, i) => (
              <button
                key={i}
                onClick={() => setQuery(suggestion)}
                className="text-left p-4 bg-slate-800/50 border border-slate-700 hover:border-agrigreen-500/50 rounded-xl transition-all text-slate-300 hover:text-white"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAdvisory;
