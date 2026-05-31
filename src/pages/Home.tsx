import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductInput } from '../lib/prompts/hooks';
import { store } from '../lib/store';
import heroBanner from '../assets/images/ugc_hero_banner_1780186486003.png';

export function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
        alert(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-950 border border-slate-800 p-2 shadow-2xl relative group overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-slate-800 z-10"></div>
           <div className="aspect-video w-full overflow-hidden relative border border-slate-800 bg-slate-900">
             <img src={heroBanner} alt="Marketing Tech" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform" referrerPolicy="no-referrer" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
             <div className="absolute bottom-4 left-4">
                 <div className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 inline-block mb-1">v1.0 Ready</div>
                 <h2 className="text-xl font-light text-slate-200">Scale Engagement</h2>
             </div>
           </div>
        </div>
        
        <div className="bg-slate-950 border border-slate-800 p-6 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">Why UGC Frameworks Work</h3>
            <div className="space-y-4 ml-2">
                <div className="flex items-start gap-4">
                    <span className="text-blue-500 font-mono">01</span>
                    <div>
                        <h4 className="text-sm font-light text-slate-200">The 3-Second Hook</h4>
                        <p className="text-xs text-slate-500 mt-1">Scroll-stopping pattern interrupts built on psychological triggers.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <span className="text-blue-500 font-mono">02</span>
                    <div>
                        <h4 className="text-sm font-light text-slate-200">P.A.S.C. Structure</h4>
                        <p className="text-xs text-slate-500 mt-1">Problem, Agitate, Solution, Call-to-action. Consistent conversion.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <span className="text-blue-500 font-mono">03</span>
                    <div>
                        <h4 className="text-sm font-light text-slate-200">Platform Optimised</h4>
                        <p className="text-xs text-slate-500 mt-1">Tailored durations and CTA placements for Reels, Shorts, and Feed.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="lg:col-span-7 bg-slate-950 p-8 border border-slate-800 relative shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-slate-800"></div>
        <div className="mb-8 border-b border-slate-800 pb-4">
          <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-widest text-[12px] mb-2">Create UGC Ad Pack</h2>
          <p className="text-xs font-mono text-slate-500">Define the product schema to generate multi-variant copy.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Product Name</label>
              <input required name="name" value={formData.name || ''} onChange={handleChange} placeholder="GlowLab Face Serum" className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Brand Name</label>
              <input required name="brand" value={formData.brand || ''} onChange={handleChange} className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</label>
              <select name="category" value={formData.category || ''} onChange={handleChange} className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                <option className="bg-slate-900">Skincare</option>
                <option className="bg-slate-900">Fitness</option>
                <option className="bg-slate-900">Food</option>
                <option className="bg-slate-900">SaaS</option>
                <option className="bg-slate-900">Local Biz</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Price (with currency)</label>
              <input required name="price" value={formData.price || ''} onChange={handleChange} placeholder="₹799" className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Core Problem (Pain Point)</label>
            <textarea required name="coreProblem" value={formData.coreProblem || ''} onChange={handleChange} rows={2} placeholder="Dull, uneven skin tone; dark spots" className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Core Result (Benefit)</label>
            <textarea required name="coreResult" value={formData.coreResult || ''} onChange={handleChange} rows={2} placeholder="Visible glow in 14 days" className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
          </div>

          <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Key Ingredient / Feature</label>
              <input required name="keyIngredient" value={formData.keyIngredient || ''} onChange={handleChange} placeholder="10% Vitamin C + Niacinamide" className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
          </div>

          <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target Persona</label>
              <input required name="targetPersona" value={formData.targetPersona || ''} onChange={handleChange} className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Platform</label>
                  <div className="flex gap-4">
                      {['instagram', 'youtube_shorts', 'meta_feed'].map(opt => (
                          <label key={opt} className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer group">
                              <input type="radio" name="platform" value={opt} checked={formData.platform === opt} onChange={handleChange} className="accent-blue-500" />
                              <span className="group-hover:text-blue-400 transition-colors">{opt.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                          </label>
                      ))}
                  </div>
              </div>
              
              <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Tone</label>
                  <div className="flex gap-4 flex-wrap">
                      {['relatable', 'excited', 'educational', 'dramatic'].map(opt => (
                          <label key={opt} className="flex items-center gap-2 text-xs font-mono text-slate-300 capitalize cursor-pointer group">
                              <input type="radio" name="tone" value={opt} checked={formData.tone === opt} onChange={handleChange} className="accent-blue-500" />
                              <span className="group-hover:text-blue-400 transition-colors">{opt}</span>
                          </label>
                      ))}
                  </div>
              </div>
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6 md:mt-10">
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-blue-600 text-white font-bold tracking-widest uppercase text-[10px] py-4 px-4 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-blue-500"
            >
              {loading ? 'Compiling Ad Content Model...' : 'Execute Generation Sequence'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
