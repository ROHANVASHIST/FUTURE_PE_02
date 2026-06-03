import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Generate } from './pages/Generate';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Navbar } from './components/Navbar';
import { Sparkles, Globe, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col transition-colors duration-300">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-1 flex flex-col bg-slate-950 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 py-12 w-full flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10 px-6 sm:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="space-y-6">
                <div className="flex items-center space-x-3.5 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white text-xs rounded-xl shadow-lg shadow-blue-500/25">
                    <Sparkles size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-black tracking-tight text-xl text-white leading-none">UGC STUDIO</span>
                    <span className="text-[9px] font-mono tracking-[0.2em] text-blue-400 uppercase mt-0.5 opacity-80">AI Content Forge</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">
                  The world's most advanced AI-driven copywriting forge for creators and brands. Built on performance logic.
                </p>
                <div className="flex gap-4">
                  {[Globe, ShieldCheck, Zap].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-400 border border-slate-800 transition-all cursor-pointer">
                      <Icon size={18} />
                    </div>
                  ))}
                </div>
              </div>

              {[
                { title: 'Forge', links: ['Generation Engine', 'Campaign Models', 'Frameworks', 'Prompt Logs'] },
                { title: 'Resources', links: ['Direct Response 101', 'UGC Benchmarks', 'Creator Guides', 'API Access'] },
                { title: 'Company', links: ['Vision', 'Careers', 'Brand Assets', 'Legal & Privacy'] }
              ].map((column, i) => (
                <div key={i} className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">{column.title}</h4>
                  <ul className="space-y-4">
                    {column.links.map((link, j) => (
                      <li key={j}>
                        <a href="#" className="text-slate-500 hover:text-blue-400 text-sm font-medium transition-colors">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="max-w-7xl mx-auto pt-10 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>System Status: Optimal</span>
                  </div>
                  <span className="hidden sm:inline-block">Network Uptime: 99.99%</span>
                </div>
                <span>© 2024 UGC STUDIO FORGE • V1.2.0-STABLE</span>
            </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

