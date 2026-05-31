import React, { useState, useEffect } from 'react';
import { HistoryItem, store } from '../lib/store';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Tv, Mic, ChevronRight, AlertCircle } from 'lucide-react';

export function Dashboard() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(store.getHistory());
  }, []);

  const handleClear = () => {
    store.clearHistory();
    setHistory([]);
  };

  const totalPacks = history.length;
  const totalWords = history.reduce((sum, item) => sum + (item.adPack?.script?.word_count || 0), 0);
  
  // Platform count
  const platformCounts: { [key: string]: number } = {};
  history.forEach(item => {
    const plat = item.productConfig?.platform || 'instagram';
    platformCounts[plat] = (platformCounts[plat] || 0) + 1;
  });
  let primaryPlatform = 'N/A';
  let maxPlatCount = 0;
  Object.entries(platformCounts).forEach(([plat, count]) => {
    if (count > maxPlatCount) {
      maxPlatCount = count;
      primaryPlatform = plat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  });

  // Tone count
  const toneCounts: { [key: string]: number } = {};
  history.forEach(item => {
    const tone = item.productConfig?.tone || 'relatable';
    toneCounts[tone] = (toneCounts[tone] || 0) + 1;
  });
  let primaryTone = 'N/A';
  let maxToneCount = 0;
  Object.entries(toneCounts).forEach(([tone, count]) => {
    if (count > maxToneCount) {
      maxToneCount = count;
      primaryTone = tone.replace(/\b\w/g, l => l.toUpperCase());
    }
  });

  return (
    <div className="space-y-8">
      {/* Analytics stats row */}
      {history.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          {[
            { label: 'UGC Project Runs', val: totalPacks, icon: Sparkles, color: 'text-blue-400 border-blue-500/20' },
            { label: 'Total Words Drafted', val: totalWords.toLocaleString(), icon: BookOpen, color: 'text-emerald-400 border-emerald-500/20' },
            { label: 'Primary Platform', val: primaryPlatform, icon: Tv, color: 'text-amber-400 border-amber-500/20' },
            { label: 'Dominant Tone', val: primaryTone, icon: Mic, color: 'text-purple-400 border-purple-500/20' }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-950/60 p-5 border border-slate-800/80 flex items-center justify-between shadow-xl relative group rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all"></div>
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{stat.label}</p>
                <p className="text-sm sm:text-base font-mono font-bold text-slate-200 mt-1">{stat.val}</p>
              </div>
              <stat.icon size={16} className={`${stat.color.split(' ')[0]} opacity-80 group-hover:scale-110 transition-transform`} />
            </div>
          ))}
        </div>
      )}

      <div className="bg-slate-950/60 p-8 border border-slate-800/80 relative shadow-2xl rounded-2xl backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-550 to-indigo-850 rounded-t-2xl"></div>
        
        <div className="flex justify-between items-center mb-8 border-b border-slate-800/60 pb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-widest text-[11px] mb-2">Campaign Generation Logs</h2>
            <p className="text-xs font-mono text-slate-500">Review your past UGC ad models and exports.</p>
          </div>
          {history.length > 0 && (
              <button onClick={handleClear} className="px-4 py-2 border border-slate-800 bg-slate-900/50 text-[10px] font-bold tracking-widest uppercase text-red-500 hover:text-red-450 hover:border-red-500/30 transition-all cursor-pointer rounded-xl">
                Clear Logs
              </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-slate-800/60 bg-slate-905/30 rounded-2xl">
            <AlertCircle size={32} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 font-mono text-sm mb-5">No campaign models compiled yet.</p>
            <Link to="/" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold tracking-widest uppercase text-[10px] py-3.5 px-7 hover:opacity-95 transition-opacity rounded-xl shadow-md border border-blue-550/40">
              Start Generation Sequence
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="p-5 border border-slate-800/70 bg-slate-900/10 hover:bg-slate-900/25 hover:border-blue-500/15 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between group relative overflow-hidden gap-4">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-900 group-hover:bg-blue-550 transition-colors"></div>
                  <div className="ml-2.5">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="text-sm font-semibold text-slate-200">{item.productName}</h3>
                        {item.productConfig?.brand && (
                          <span className="text-[9px] font-mono font-bold bg-blue-550/5 text-blue-400 border border-blue-550/15 px-2 py-0.5 rounded-lg">
                            {item.productConfig.brand}
                          </span>
                        )}
                        {item.productConfig?.platform && (
                          <span className="text-[9px] font-mono font-bold bg-slate-900 text-slate-400 border border-slate-800/80 px-2 py-0.5 rounded-lg uppercase">
                            {item.productConfig.platform.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-mono">
                        {new Date(item.date).toLocaleString()} • {item.adPack.script.word_count} words ({item.productConfig?.tone || 'relatable'} tone)
                      </p>
                  </div>
                  <Link to="/generate" state={{ adPack: item.adPack, product: item.productConfig }} className="px-4 py-2.5 border border-slate-800 text-[10px] font-bold tracking-widest uppercase text-blue-400 hover:text-blue-300 hover:border-blue-500/40 hover:bg-blue-600/5 transition-all z-10 relative flex items-center gap-2.5 shrink-0 rounded-xl">
                      <span>View Campaign Data</span>
                      <ChevronRight size={11} />
                  </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

