import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import AiAdvisory from './pages/AiAdvisory';
import MarketInsights from './pages/MarketInsights';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        <Navbar />
        <main className="container mx-auto p-4 pb-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/ai-advisory" element={<AiAdvisory />} />
            <Route path="/market-insights" element={<MarketInsights />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
