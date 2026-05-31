import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Home } from './pages/Home';
import { Generate } from './pages/Generate';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Sun, Moon, Home as HomeIcon, LayoutDashboard, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col border-4 sm:border-8 border-slate-900 transition-colors duration-300">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 sm:px-8 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-95 transition-opacity">
             <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0 box-content rounded-sm shadow-md shadow-blue-500/20">
               <Sparkles size={14} className="animate-pulse" />
             </div>
             <div className="flex flex-col">
               <span className="font-mono tracking-widest text-[11px] uppercase text-slate-400 leading-none">UGC Studio</span>
               <span className="text-[9px] font-bold tracking-wider text-blue-500 uppercase">Generator Hub v1.1.0</span>
             </div>
          </Link>
          <div className="flex space-x-2 sm:space-x-4 items-center text-[10px] uppercase tracking-widest font-bold">
             <NavLink 
               to="/" 
               className={({ isActive }) => `flex items-center space-x-1.5 px-3 py-1.5 rounded-sm transition-all duration-200 ${
                 isActive 
                   ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20 shadow-sm shadow-blue-500/5' 
                   : 'text-slate-500 hover:text-slate-300 border border-transparent'
               }`}
             >
               <HomeIcon size={12} />
               <span className="hidden sm:inline">Home</span>
             </NavLink>
             <NavLink 
               to="/dashboard" 
               className={({ isActive }) => `flex items-center space-x-1.5 px-3 py-1.5 rounded-sm transition-all duration-200 ${
                 isActive 
                   ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20 shadow-sm shadow-blue-500/5' 
                   : 'text-slate-500 hover:text-slate-300 border border-transparent'
               }`}
             >
               <LayoutDashboard size={12} />
               <span>History</span>
             </NavLink>
             <NavLink 
               to="/settings" 
               className={({ isActive }) => `flex items-center space-x-1.5 px-3 py-1.5 rounded-sm transition-all duration-200 ${
                 isActive 
                   ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20 shadow-sm shadow-blue-500/5' 
                   : 'text-slate-500 hover:text-slate-300 border border-transparent'
               }`}
             >
               <SlidersHorizontal size={12} />
               <span>Settings</span>
             </NavLink>
             <button onClick={toggleTheme} className="ml-2 p-2 rounded-full border border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-500 flex items-center justify-center transition-all bg-slate-900/50 hover:bg-slate-900 shadow-sm">
               {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
             </button>
          </div>
        </header>
        <main className="flex-1 flex flex-col bg-slate-900/20 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
        <footer className="h-10 bg-blue-600 flex items-center px-4 sm:px-8 justify-between text-[10px] font-bold text-white uppercase tracking-[0.2em] shrink-0 transition-colors duration-300">
            <span>System Status: Optimal</span>
            <span className="hidden sm:inline-block">Uptime: 99.9%</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

