import React, { useState, useEffect } from 'react';
import { UserSettings, store } from '../lib/store';
import { ProductInput } from '../lib/prompts/hooks';

export function Settings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(store.getSettings());
  }, []);

  if (!settings) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSettings(prev => prev ? { ...prev, [e.target.name]: e.target.value } : prev);
  };

  const handleToneChange = (opt: ProductInput['tone']) => {
    setSettings(prev => prev ? { ...prev, defaultTone: opt } : prev);
  }

  const handlePlatformChange = (opt: ProductInput['platform']) => {
    setSettings(prev => prev ? { ...prev, defaultPlatform: opt } : prev);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-950 p-8 border border-slate-800 relative shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-slate-800"></div>
      
      <div className="mb-8 border-b border-slate-800 pb-4">
        <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-widest text-[12px] mb-2">System Configuration</h2>
        <p className="text-xs font-mono text-slate-500">Set default parameters for the generation engine.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Default Brand Name</label>
            <input name="defaultBrand" value={settings.defaultBrand} onChange={handleChange} className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
        </div>
        
        <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Default Category</label>
            <select name="defaultCategory" value={settings.defaultCategory} onChange={handleChange} className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
              <option className="bg-slate-900">Skincare</option>
              <option className="bg-slate-900">Fitness</option>
              <option className="bg-slate-900">Food</option>
              <option className="bg-slate-900">SaaS</option>
              <option className="bg-slate-900">Local Biz</option>
            </select>
        </div>
        
        <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Default Target Persona</label>
            <input name="defaultTargetPersona" value={settings.defaultTargetPersona} onChange={handleChange} className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
        </div>

        <div className="space-y-2 pt-4">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Default Platform</label>
            <div className="flex gap-4">
                {(['instagram', 'youtube_shorts', 'meta_feed'] as const).map(opt => (
                    <label key={opt} className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer group">
                        <input type="radio" value={opt} checked={settings.defaultPlatform === opt} onChange={() => handlePlatformChange(opt)} className="accent-blue-500" />
                        <span className="group-hover:text-blue-400 transition-colors">{opt.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </label>
                ))}
            </div>
        </div>
        
        <div className="space-y-2 pb-4">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Default Tone</label>
            <div className="flex gap-4 flex-wrap">
                {(['relatable', 'excited', 'educational', 'dramatic'] as const).map(opt => (
                    <label key={opt} className="flex items-center gap-2 text-xs font-mono text-slate-300 capitalize cursor-pointer group">
                        <input type="radio" value={opt} checked={settings.defaultTone === opt} onChange={() => handleToneChange(opt)} className="accent-blue-500" />
                        <span className="group-hover:text-blue-400 transition-colors">{opt}</span>
                    </label>
                ))}
            </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <span className="text-emerald-400 font-mono text-xs opacity-0 transition-opacity" style={{ opacity: saved ? 1 : 0 }}>Config Saved</span>
            <button 
                type="submit" 
                className="bg-blue-600 text-white font-bold tracking-widest uppercase text-[10px] py-3 px-6 hover:bg-blue-700 transition-colors border border-blue-500"
            >
                Commit Changes
            </button>
        </div>
      </form>
    </div>
  );
}
