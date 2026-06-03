import React, { useState, useEffect } from 'react';
import { UserSettings, store } from '../lib/store';
import { ProductInput } from '../lib/prompts/hooks';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, Shield, Zap, Globe, Save, RefreshCw } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto space-y-10 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-900 pb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <SettingsIcon size={12} className="text-blue-400" />
            <span className="text-[9px] font-black tracking-widest text-blue-400 uppercase">System Parameters</span>
          </div>
          <h1 className="text-4xl font-sans font-black tracking-tight text-slate-200 uppercase leading-none">Forge Config.</h1>
          <p className="text-slate-500 text-sm font-mono max-w-lg leading-relaxed">
            Tune the underlying algorithmic weighting and default execution flags.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Navigation / Info Column */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-8 bg-slate-950 border border-slate-800 rounded-[2.5rem] space-y-8">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Active Engine</h4>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                  <Zap size={14} className="text-blue-500" />
                  P.A.S.C. v2.4-Stable
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Data Protection</h4>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                  <Shield size={14} className="text-emerald-500" />
                  Local-First Encryption
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Reach</h4>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                  <Globe size={14} className="text-indigo-500" />
                  Multichannel Native
                </div>
              </div>
           </div>

           <div className="p-8 bg-blue-600/5 border border-blue-500/10 rounded-[2.5rem]">
              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                Changing these defaults will influence how the Forge initializes every new generation script.
              </p>
           </div>
        </div>

        {/* Main Settings Form */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="bg-slate-950/50 border border-slate-800/80 p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-800"></div>
            
            <div className="space-y-10">
               {/* Identity Section */}
               <div className="space-y-8">
                 <h3 className="text-xs font-black text-blue-500 uppercase tracking-widest border-l-2 border-blue-500 pl-4">Core Identity</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Default Brand Name</label>
                        <input name="defaultBrand" value={settings.defaultBrand} onChange={handleChange} className="w-full px-5 py-4 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-sans focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all" />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Default Category</label>
                        <select name="defaultCategory" value={settings.defaultCategory} onChange={handleChange} className="w-full px-5 py-4 bg-slate-900 border border-slate-800 text-slate-300 text-sm font-sans focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all cursor-pointer">
                          <option className="bg-slate-950">Skincare</option>
                          <option className="bg-slate-950">Fitness</option>
                          <option className="bg-slate-950">Food</option>
                          <option className="bg-slate-950">SaaS</option>
                          <option className="bg-slate-950">Local Biz</option>
                        </select>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Persona Mapping</label>
                    <input name="defaultTargetPersona" value={settings.defaultTargetPersona} onChange={handleChange} className="w-full px-5 py-4 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-sans focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all" />
                 </div>
               </div>

               {/* Engine Presets Section */}
               <div className="space-y-8">
                  <h3 className="text-xs font-black text-indigo-500 uppercase tracking-widest border-l-2 border-indigo-500 pl-4">Engine Defaults</h3>
                  <div className="space-y-6">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Priority Output Channel</label>
                      <div className="flex flex-wrap gap-6">
                          {(['instagram', 'youtube_shorts', 'meta_feed'] as const).map(opt => (
                              <label key={opt} className="flex items-center gap-3 text-[12px] font-bold text-slate-300 cursor-pointer group">
                                  <input type="radio" value={opt} checked={settings.defaultPlatform === opt} onChange={() => handlePlatformChange(opt)} className="w-4 h-4 accent-indigo-500" />
                                  <span className="group-hover:text-indigo-400 transition-colors uppercase tracking-widest">{opt.replace('_', ' ')}</span>
                              </label>
                          ))}
                      </div>
                  </div>
                  
                  <div className="space-y-6">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Baseline Psychological Tone</label>
                      <div className="flex gap-6 flex-wrap">
                          {(['relatable', 'excited', 'educational', 'dramatic'] as const).map(opt => (
                              <label key={opt} className="flex items-center gap-3 text-[12px] font-bold text-slate-300 capitalize cursor-pointer group">
                                  <input type="radio" value={opt} checked={settings.defaultTone === opt} onChange={() => handleToneChange(opt)} className="w-4 h-4 accent-indigo-500" />
                                  <span className="group-hover:text-indigo-400 transition-colors uppercase text-[10px] tracking-widest">{opt}</span>
                              </label>
                          ))}
                      </div>
                  </div>
               </div>

               {/* Advanced Section (Simulated/Future) */}
               <div className="space-y-8 opacity-40">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-2 border-slate-700 pl-4">Advanced Flags [Pro Only]</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="p-6 border border-slate-800 rounded-2xl flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Deep Synthesis Mode</span>
                        <div className="w-10 h-5 bg-slate-800 rounded-full"></div>
                     </div>
                     <div className="p-6 border border-slate-800 rounded-2xl flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Multi-variant Hooking</span>
                        <div className="w-10 h-5 bg-slate-800 rounded-full"></div>
                     </div>
                  </div>
               </div>

               <div className="pt-10 border-t border-slate-800/60 flex items-center justify-between">
                  {saved ? (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                      <RefreshCw size={14} className="animate-spin" /> Data Committed
                    </motion.div>
                  ) : <div />}
                  
                      <button 
                          type="submit" 
                          className="group flex items-center gap-3 bg-blue-600 text-slate-200 font-black tracking-[0.3em] uppercase text-[10px] py-4 px-8 hover:bg-blue-700 transition-all rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 border border-blue-500/50"
                      >
                      Save Configuration <Save size={14} />
                  </button>
               </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
