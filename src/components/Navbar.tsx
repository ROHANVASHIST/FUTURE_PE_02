import { Link, NavLink } from 'react-router-dom';
import { Sparkles, LayoutDashboard, SlidersHorizontal, Home as HomeIcon, Sun, Moon, UserCircle } from 'lucide-react';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <header className="h-20 border-b border-slate-800/60 flex items-center justify-between px-6 sm:px-12 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center space-x-3.5 hover:opacity-90 transition-all group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white text-xs rounded-xl shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Sparkles size={18} className="animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-black tracking-tight text-xl text-slate-200 leading-none">UGC STUDIO</span>
            <span className="text-[9px] font-mono tracking-[0.2em] text-blue-400 uppercase mt-0.5 opacity-80">AI Content Forge</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center ml-8 space-x-8">
          {[
            { to: '/', icon: HomeIcon, label: 'Creator' },
            { to: '/dashboard', icon: LayoutDashboard, label: 'Analytics' },
            { to: '/settings', icon: SlidersHorizontal, label: 'Presets' },
            { to: '/profile', icon: UserCircle, label: 'Profile' }
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `text-[11px] font-bold uppercase tracking-widest transition-all hover:text-blue-400 flex items-center gap-2 ${
                isActive ? 'text-blue-400' : 'text-slate-400'
              }`}
            >
              <item.icon size={13} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center space-x-6">
        <button 
          onClick={toggleTheme} 
          className="p-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 flex items-center justify-center transition-all bg-slate-900/40 hover:bg-slate-900 shadow-sm"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        
        <Link 
          to="/" 
          className="hidden sm:flex px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          Generate Ad
        </Link>
      </div>
    </header>
  );
}
