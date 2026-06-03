import React, { useState, useEffect } from 'react';
import { HistoryItem, store } from '../lib/store';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, BookOpen, Tv, Mic, ChevronRight, AlertCircle, BarChart3, TrendingUp, Filter, Download, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export function Dashboard() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(store.getHistory());
  }, []);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all generation logs? This action is irreversible.')) {
      store.clearHistory();
      setHistory([]);
    }
  };

  const totalPacks = history.length;
  const totalWords = history.reduce((sum, item) => sum + (item.adPack?.script?.word_count || 0), 0);
  
  // Platform data for charts
  const platformDataMap: { [key: string]: number } = {};
  history.forEach(item => {
    const plat = item.productConfig?.platform || 'instagram';
    platformDataMap[plat] = (platformDataMap[plat] || 0) + 1;
  });

  const chartData = Object.entries(platformDataMap).map(([name, value]) => ({
    name: name.replace('_', ' ').toUpperCase(),
    value
  }));

  // Activity over time (Mocking for visual effect since we don't have historical day granularity)
  const activityData = history.slice(-7).map((item, i) => ({
    day: new Date(item.date).toLocaleDateString([], { weekday: 'short' }),
    count: i + 1,
    words: (item.adPack?.script?.word_count || 0) / 10
  }));

  return (
    <div className="space-y-12 pb-24">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-900 pb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <BarChart3 size={12} className="text-indigo-400" />
            <span className="text-[9px] font-black tracking-widest text-indigo-400 uppercase">Performance Dashboard</span>
          </div>
          <h1 className="text-4xl font-sans font-black tracking-tight text-slate-200 uppercase">Campaign Intelligence.</h1>
          <p className="text-slate-500 text-sm font-mono max-w-lg leading-relaxed">
            Real-time telemetry and project logs for your AI-engineered high-converting content packs.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
            <Filter size={14} /> Filter 
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Analytics stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'UGC Project Runs', val: totalPacks, icon: Sparkles, color: 'text-blue-400', bg: 'bg-blue-400/5', border: 'border-blue-500/20' },
          { label: 'Words Drafted', val: totalWords.toLocaleString(), icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-400/5', border: 'border-emerald-500/20' },
          { label: 'Avg ROAS Predict', val: '4.2x', icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-400/5', border: 'border-amber-500/20' },
          { label: 'Generation Health', val: 'Optimal', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/5', border: 'border-purple-500/20' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`p-8 border ${stat.border} ${stat.bg} rounded-[2.5rem] relative group overflow-hidden transition-all hover:bg-slate-900/40`}
          >
            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="p-3 w-12 h-12 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <stat.icon size={22} className={stat.color} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-3xl font-sans font-black text-slate-200">{stat.val}</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
          </motion.div>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-slate-950 border border-slate-800/80 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-300">Campaign Activity Density</h3>
               <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
               </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData.length > 0 ? activityData : [{ day: 'Mon', count: 0 }, { day: 'Tue', count: 0 }]}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-slate-950)', border: '1px solid var(--color-slate-800)', borderRadius: '12px' }}
                    itemStyle={{ color: '#60a5fa', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-slate-950 border border-slate-800/80 p-10 rounded-[3rem] shadow-xl relative overflow-hidden flex flex-col">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-300 mb-10">Platform Distribution</h3>
            <div className="h-[240px] w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.length > 0 ? chartData : [{ name: 'EMPTY', value: 0 }]}>
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#2563eb', '#6366f1', '#a855f7'][index % 3]} />
                    ))}
                  </Bar>
                  <XAxis dataKey="name" hide />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ backgroundColor: 'var(--color-slate-950)', border: '1px solid var(--color-slate-800)', borderRadius: '12px' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
               {chartData.map((d, i) => (
                 <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ['#2563eb', '#6366f1', '#a855f7'][i % 3] }}></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{d.name}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Generation Logs */}
      <div className="bg-slate-950 border border-slate-800/80 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
          <div>
            <h2 className="text-xl font-sans font-black text-slate-200 uppercase tracking-tight">Generation Sequence History</h2>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Immutable archive of all creative executions.</p>
          </div>
          {history.length > 0 && (
              <button 
                onClick={handleClear} 
                className="px-6 py-3 border border-red-500/30 bg-red-500/5 text-[9px] font-black tracking-widest uppercase text-red-500 hover:bg-red-500/10 transition-all rounded-2xl active:scale-95"
              >
                Purgate Logic Cache
              </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-32 bg-slate-900/10 border border-dashed border-slate-800 rounded-[3rem]">
            <AlertCircle size={48} className="text-slate-800 mx-auto mb-6" />
            <p className="text-slate-400 font-bold text-lg mb-8 uppercase tracking-tight">No Campaign Signals Found.</p>
            <Link to="/" className="inline-flex items-center gap-3 bg-blue-600 text-white font-black tracking-[0.2em] uppercase text-[10px] py-4 px-8 hover:bg-blue-700 transition-all rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95">
              Initialize Project <Sparkles size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {history.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="p-8 border border-slate-800/60 bg-slate-950 hover:bg-slate-900/30 hover:border-blue-500/20 rounded-[2.5rem] transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between group relative overflow-hidden gap-8"
              >
                  <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-slate-900 border border-white/5 rounded-[1.5rem] flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-colors">
                          {item.productConfig?.platform === 'instagram' ? <Tv size={24} /> : <Sparkles size={24} />}
                      </div>
                      <div>
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-slate-200 tracking-tight">{item.productName}</h3>
                            <span className="text-[9px] font-black bg-blue-500/10 text-blue-400 border border-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest font-mono">
                               {item.productConfig?.brand || 'Generic'}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                            {new Date(item.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} • {item.adPack.script.word_count} Output Characters • {item.productConfig?.platform?.replace('_', ' ')}
                          </p>
                      </div>
                  </div>
                  <Link to="/generate" state={{ adPack: item.adPack, product: item.productConfig }} className="px-8 py-3.5 bg-slate-900 border border-slate-800 group-hover:border-blue-500/30 text-[10px] font-black tracking-widest uppercase text-slate-400 group-hover:text-blue-400 transition-all rounded-2xl flex items-center gap-3 active:scale-95 shadow-xl">
                      <span>Recall Data</span>
                      <ChevronRight size={14} />
                  </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

