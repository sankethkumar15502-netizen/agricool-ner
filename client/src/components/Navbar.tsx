import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Cpu, TrendingUp, User, Sun } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Inventory', path: '/inventory', icon: Package },
    { name: 'AI Advisory', path: '/ai-advisory', icon: Cpu },
    { name: 'Market Insights', path: '/market-insights', icon: TrendingUp },
  ];

  return (
    <nav className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sun className="text-agrigreen-500 h-8 w-8" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-agrigreen-400 to-green-600">
            AgriCool-NER
          </span>
        </div>
        
        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-agrigreen-900/50 text-agrigreen-400'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-slate-300">UNIT-NER-01</span>
          </div>
          <button className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors">
            <User className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
