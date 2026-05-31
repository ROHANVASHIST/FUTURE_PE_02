import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductInput } from '../lib/prompts/hooks';
import { store } from '../lib/store';
import heroBanner from '../assets/images/ugc_hero_banner_1780186486003.png';

export function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ProductInput>>({});

  useEffect(() => {
    const settings = store.getSettings();
    setFormData({
      name: '',
      brand: settings.defaultBrand || '',
      category: settings.defaultCategory || 'Skincare',
      price: '',
      coreProblem: '',
      coreResult: '',
      keyIngredient: '',
      targetPersona: settings.defaultTargetPersona || '',
      platform: settings.defaultPlatform || 'instagram',
      tone: settings.defaultTone || 'relatable',
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const res = await fetch('/api/ugc/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to generate ad pack');
        }

        const data = await res.json();
        
        store.addHistory({
          id: Date.now().toString(),
          date: new Date().toISOString(),
          productName: formData.name || 'Untitled',
          productConfig: formData,
          adPack: data.adPack
        });

        navigate('/generate', { state: { adPack: data.adPack, product: formData } });
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
        setLoading(false);
    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 shadow-2xl rounded-2xl relative group overflow-hidden backdrop-blur-sm">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-550 to-indigo-800 z-10"></div>
           <div className="aspect-video w-full overflow-hidden relative border border-slate-800/60 bg-slate-900 rounded-xl">
             <img src={heroBanner} alt="Marketing Tech" className="w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-all duration-700 hover:scale-105 transform" referrerPolicy="no-referrer" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85"></div>
             <div className="absolute bottom-4 left-4 z-10">
                 <div className="bg-blue-600/95 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 inline-block mb-2 rounded-sm border border-blue-450/40">v1.1 Active</div>
                 <h2 className="text-xl font-bold tracking-tight text-white">Scale Global Engagement</h2>
             </div>
           </div>
        </div>
        
        <div className="bg-slate-950/50 border border-slate-800/80 p-6 shadow-2xl rounded-2xl relative backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-600 to-indigo-750 rounded-l-2xl"></div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-5 ml-2.5">Why UGC Frameworks Convert</h3>
            <div className="space-y-4 ml-2.5">
                <div className="flex items-start gap-4 p-2 hover:bg-slate-900/20 rounded-xl transition-all">
                    <span className="text-blue-400 font-mono font-bold bg-blue-500/5 px-2 py-1 rounded border border-blue-500/10">01</span>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-200">The 3-Second Hook</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Scroll-stopping pattern interrupts built on curated psychological triggers.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-2 hover:bg-slate-900/20 rounded-xl transition-all">
                    <span className="text-blue-400 font-mono font-bold bg-blue-500/5 px-2 py-1 rounded border border-blue-500/10">02</span>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-200">P.A.S.C. Structure</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Problem, Agitate, Solution, and Call-to-action. High-converting sequence.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-2 hover:bg-slate-900/20 rounded-xl transition-all">
                    <span className="text-blue-400 font-mono font-bold bg-blue-500/5 px-2 py-1 rounded border border-blue-500/10">03</span>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-200">Platform Optimized</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Preset durations and dynamic callouts for Reels, Shorts, and Feed ads.</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-slate-950/50 border border-slate-800/80 p-6 shadow-2xl rounded-2xl relative backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-600 to-indigo-750 rounded-l-2xl"></div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3.5 ml-2.5">⚡ Quick Setup Presets</h3>
            <p className="text-xs text-slate-500 ml-2.5 mb-4.5 font-mono">Instant-fill high performance schema examples:</p>
            <div className="flex flex-col gap-3 ml-2.5">
                {[
                  {
                    label: '✨ Glow Lab Serum',
                    desc: 'Skincare Formula',
                    data: {
                      name: 'GlowLab Vitamin C Serum',
                      brand: 'GlowLab',
                      category: 'Skincare',
                      price: '₹799',
                      coreProblem: 'Dull skin, visible spots, and dry texture.',
                      coreResult: 'Radiant hydration with an even glass-skin glow in 14 days.',
                      keyIngredient: '15% Vitamin C + Active Niacinamide',
                      targetPersona: 'Men & women, age 20-35, skin-conscious.',
                      platform: 'instagram',
                      tone: 'relatable'
                    }
                  },
                  {
                    label: '💪 Titan ISO Whey',
                    desc: 'Muscle supplementation',
                    data: {
                      name: 'ISO-Gold Muscle Recover',
                      brand: 'Titan Nutrition',
                      category: 'Fitness',
                      price: '$64.99',
                      coreProblem: 'Post-workout fatigue and slow muscle recovery.',
                      coreResult: 'Rapid muscle repair with zero bloating or chalky texture.',
                      keyIngredient: '28g Pure Protein Isolate + Essential EAAs',
                      targetPersona: 'Bodybuilders and fitness enthusiasts.',
                      platform: 'youtube_shorts',
                      tone: 'excited'
                    }
                  },
                  {
                    label: '📈 SyncTask Planner',
                    desc: 'Team Organization SaaS',
                    data: {
                      name: 'SyncTask Pro Platform',
                      brand: 'SyncTask Inc.',
                      category: 'SaaS',
                      price: '$15/seat monthly',
                      coreProblem: 'Disorganized chat channels, miscommunication, and missed milestones.',
                      coreResult: 'Centralize work schedules and increase output by 25%.',
                      keyIngredient: 'Auto Gantt charts and cross-app triggers.',
                      targetPersona: 'Engineering leads & Remote Project Managers.',
                      platform: 'meta_feed',
                      tone: 'educational'
                    }
                  }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData(preset.data)}
                    className="w-full text-left p-3.5 border border-slate-800/80 bg-slate-900/25 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all rounded-xl flex items-center justify-between group cursor-pointer shadow-sm"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-300 group-hover:text-blue-400 transition-colors">{preset.label}</div>
                      <div className="text-[10px] text-slate-550 mt-0.5 font-mono">{preset.desc}</div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 group-hover:text-blue-400 font-bold group-hover:border-blue-500/40 transition-all uppercase tracking-widest bg-slate-950/80 border border-slate-800/70 px-2.5 py-1 rounded-md">Apply</span>
                  </button>
                ))}
            </div>
        </div>

      </div>

      <div className="lg:col-span-7 bg-slate-950 border border-slate-800/80 p-8 rounded-2xl relative shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-800"></div>
        <div className="mb-8 border-b border-slate-800/60 pb-4">
          <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-widest text-[11px] mb-2">Create UGC Ad Pack</h2>
          <p className="text-xs font-mono text-slate-500">Define the product schema to generate multi-variant copy.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Name</label>
              <input required name="name" value={formData.name || ''} onChange={handleChange} placeholder="GlowLab Face Serum" className="w-full px-4 py-2.5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all placeholder:text-slate-700" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Brand Name</label>
              <input required name="brand" value={formData.brand || ''} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</label>
              <select name="category" value={formData.category || ''} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-905 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all cursor-pointer">
                <option className="bg-slate-950">Skincare</option>
                <option className="bg-slate-950">Fitness</option>
                <option className="bg-slate-950">Food</option>
                <option className="bg-slate-950">SaaS</option>
                <option className="bg-slate-950">Local Biz</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price (with currency)</label>
              <input required name="price" value={formData.price || ''} onChange={handleChange} placeholder="₹799" className="w-full px-4 py-2.5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all placeholder:text-slate-700" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Problem (Pain Point)</label>
            <textarea required name="coreProblem" value={formData.coreProblem || ''} onChange={handleChange} rows={2} placeholder="Dull, uneven skin tone; dark spots" className="w-full px-4 py-2.5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all placeholder:text-slate-700" />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Result (Benefit)</label>
            <textarea required name="coreResult" value={formData.coreResult || ''} onChange={handleChange} rows={2} placeholder="Visible glow in 14 days" className="w-full px-4 py-2.5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all placeholder:text-slate-700" />
          </div>

          <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Ingredient / Feature</label>
              <input required name="keyIngredient" value={formData.keyIngredient || ''} onChange={handleChange} placeholder="10% Vitamin C + Niacinamide" className="w-full px-4 py-2.5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all placeholder:text-slate-700" />
          </div>

          <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Persona</label>
              <input required name="targetPersona" value={formData.targetPersona || ''} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Platform</label>
                  <div className="flex gap-4">
                      {['instagram', 'youtube_shorts', 'meta_feed'].map(opt => (
                          <label key={opt} className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer group">
                              <input type="radio" name="platform" value={opt} checked={formData.platform === opt} onChange={handleChange} className="accent-blue-505" />
                              <span className="group-hover:text-blue-400 transition-colors">{opt.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                          </label>
                      ))}
                  </div>
              </div>
              
              <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tone</label>
                  <div className="flex gap-4 flex-wrap">
                      {['relatable', 'excited', 'educational', 'dramatic'].map(opt => (
                          <label key={opt} className="flex items-center gap-2 text-xs font-mono text-slate-300 capitalize cursor-pointer group">
                              <input type="radio" name="tone" value={opt} checked={formData.tone === opt} onChange={handleChange} className="accent-blue-505" />
                              <span className="group-hover:text-blue-400 transition-colors">{opt}</span>
                          </label>
                      ))}
                  </div>
              </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs rounded-xl mb-4">
              <span className="font-bold uppercase tracking-widest text-[10px] block mb-1 text-red-500">Execution Error</span>
              {error}
            </div>
          )}

          <div className="pt-6 border-t border-slate-800/60 mt-6 md:mt-10">
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 via-blue-550 to-indigo-700 text-white font-bold tracking-widest uppercase text-[10px] py-4 px-4 hover:shadow-lg hover:shadow-blue-500/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-blue-500/50 cursor-pointer rounded-xl"
            >
              {loading ? 'Compiling Ad Content Model...' : 'Execute Generation Sequence'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
