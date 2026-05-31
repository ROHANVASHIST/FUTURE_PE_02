import React, { useState, useEffect } from 'react';
import { HistoryItem, store } from '../lib/store';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(store.getHistory());
  }, []);

  const handleClear = () => {
    store.clearHistory();
    setHistory([]);
  };

  return (
    <div className="bg-slate-950 p-8 border border-slate-800 relative shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-slate-800"></div>
      
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-widest text-[12px] mb-2">Generation History</h2>
          <p className="text-xs font-mono text-slate-500">Review your past UGC ad models and exports.</p>
        </div>
        {history.length > 0 && (
            <button onClick={handleClear} className="px-4 py-2 border border-slate-700 bg-slate-900/50 text-[10px] font-bold tracking-widest uppercase text-red-400 hover:text-red-300 hover:border-red-500 transition-colors">
              Clear Logs
            </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-800 bg-slate-900/20">
          <p className="text-slate-500 font-mono text-sm mb-4">No data generated yet.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white font-bold tracking-widest uppercase text-[10px] py-3 px-6 hover:bg-blue-700 transition-colors">
            Start New Project
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="p-5 border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 transition-colors flex items-center justify-between group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-700 group-hover:bg-blue-500 transition-colors"></div>
                <div className="ml-2">
                    <h3 className="text-sm font-semibold text-slate-200 mb-1">{item.productName}</h3>
                    <p className="text-xs text-slate-500 font-mono">{new Date(item.date).toLocaleString()} • {item.adPack.script.word_count} words</p>
                </div>
                <Link to="/generate" state={{ adPack: item.adPack, product: item.productConfig }} className="px-4 py-2 border border-slate-700 text-[10px] font-bold tracking-widest uppercase text-blue-400 hover:bg-blue-900/20 transition-colors z-10 relative">
                    View Data
                </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
