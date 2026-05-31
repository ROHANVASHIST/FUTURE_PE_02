import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Generate } from './pages/Generate';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Sun, Moon } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col border-8 border-slate-900 transition-colors duration-300">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 sm:px-8 bg-slate-900/50 sticky top-0 z-10 transition-colors duration-300">
          <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
             <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0 box-content">UGC</div>
             <span className="font-mono tracking-widest text-sm uppercase text-slate-400 truncate hidden sm:inline-block">Generator Hub / v1.0.0</span>
          </Link>
          <div className="flex space-x-6 items-center text-[10px] uppercase tracking-widest font-bold">
             <Link to="/" className="text-slate-500 hover:text-blue-400 hidden sm:inline-block">Home</Link>
             <Link to="/dashboard" className="text-slate-500 hover:text-blue-400 hidden sm:inline-block">Dashboard</Link>
             <Link to="/settings" className="text-slate-500 hover:text-blue-400">Settings</Link>
             <button onClick={toggleTheme} className="ml-4 p-2 rounded-full border border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-500 flex items-center justify-center transition-colors">
               {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
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
