import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductInput } from '../lib/prompts/hooks';
import { store } from '../lib/store';
import { motion } from 'motion/react';
import { Sparkles, BarChart3, Target, Zap, ArrowRight, Play, ShieldCheck, Globe } from 'lucide-react';
import creatorHero from '../assets/images/ugc_creator_hero_1780446590855.png';
import conversionChart from '../assets/images/ugc_conversion_chart_1780446605566.png';
import { HowItWorks, ComparisonTable, Testimonials } from '../components/HomeSections';
import { Pricing } from '../components/Pricing';

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
    <div className="space-y-32 pb-24">
      {/* 1. HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">Next-Gen Content AI</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-sans font-black tracking-tighter text-slate-200 leading-[0.85]">
            YOUR PERSONAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-600">UGC FORGE.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-xl font-medium">
            Stop guessing what works. UGC Studio uses algorithmic copywriting frameworks to generate hooks and scripts that stop the scroll and drive conversion.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#generate" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-widest uppercase text-xs rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2">
              Start Generating <ArrowRight size={16} />
            </a>
            <button className="px-8 py-4 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 text-slate-300 font-bold tracking-widest uppercase text-xs rounded-2xl transition-all flex items-center gap-2 group">
              <Play size={14} className="group-hover:text-blue-400 transition-colors" /> View Framework
            </button>
          </div>
          <div className="flex items-center gap-12 pt-8 border-t border-slate-900">
            {[
              { val: '14k+', label: 'Ads Generated' },
              { val: '28%', label: 'Avg CTR Increase' },
              { val: '4.9/5', label: 'Creator Rating' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-black text-slate-200">{stat.val}</div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-slate-950 border border-slate-800/80 p-3 rounded-[3rem] shadow-2xl overflow-hidden backdrop-blur-sm">
            <div className="aspect-square relative rounded-[2.5rem] overflow-hidden group">
              <img src={creatorHero} alt="Creator Suite" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[2000ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-slate-950/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
                 <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-1.5 font-bold">Active Stream</p>
                      <h4 className="text-base font-bold text-slate-200 tracking-tight">AI Render Engine: Operational</h4>
                    </div>
                    <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
                      <Sparkles size={20} className="text-white" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. FEATURES GRID */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-500">The UGC Standard</h2>
          <h3 className="text-3xl md:text-6xl font-sans font-bold tracking-tighter text-slate-200">Built for High-Performance Teams.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { icon: Zap, title: '3-Second Hook Patterns', desc: 'Curated library of 100+ proven patterns built to stop the infinite scroll and trap attention.' },
             { icon: Target, title: 'Psychology Focused', desc: 'Scripts rooted in the Problem-Agitate-Solution-Call framework used by top direct-response copywriters.' },
             { icon: Globe, title: 'Multi-Platform Native', desc: 'Adjust styles for TikTok, Instagram Reels, and YouTube Shorts with a single execution run.' }
           ].map((item, i) => (
             <motion.div 
               key={i}
               whileHover={{ y: -8 }}
               className="p-10 bg-slate-950/50 border border-slate-800/80 rounded-[2.5rem] hover:bg-slate-900/40 transition-all group relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] group-hover:bg-blue-500/10 transition-all"></div>
                <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <item.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
                <p className="text-base text-slate-400 leading-relaxed font-medium">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <HowItWorks />

      {/* 4. DETAIL SHOWCASE SECTION */}
      <section className="bg-slate-950/50 border border-slate-800/80 rounded-[4rem] p-12 md:p-24 overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-950"></div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 relative z-10">
               <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-slate-200 leading-[1.1]">
                 Data-Driven <br /> <span className="text-blue-500 underline decoration-blue-500/20 decoration-8 underline-offset-8">Content Logic.</span>
               </h3>
               <p className="text-slate-400 leading-relaxed text-xl font-medium">
                 Our proprietary prompt architecture doesn't just write text; it constructs narrative arcs. Every script is timed to maintain engagement peaks and smooth transitions.
               </p>
               <ul className="space-y-6">
                 {[
                   { icon: ShieldCheck, text: 'Strict content safety Guardrails' },
                   { icon: BarChart3, text: 'Retention-optimized script pacing' },
                   { icon: Sparkles, text: 'Natural tone modeling for creators' }
                 ].map((li, i) => (
                   <li key={i} className="flex items-center gap-4 text-slate-200 font-bold text-base">
                     <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><li.icon size={18} /></div>
                     {li.text}
                   </li>
                 ))}
               </ul>
            </div>
            <div className="relative group">
               <img src={conversionChart} alt="Analytics" className="w-full rounded-[2rem] shadow-[0_40px_100px_-15px_rgba(37,99,235,0.2)] relative z-10 group-hover:rotate-2 transition-transform duration-1000" />
               <div className="absolute -inset-16 bg-blue-600/10 blur-[80px] rounded-full"></div>
            </div>
         </div>
      </section>

      {/* 5. COMPARISON & TESTIMONIALS */}
      <ComparisonTable />
      <Testimonials />

      {/* 6. PRICING SECTION */}
      <Pricing />

      {/* 7. THE GENERATION TOOL */}
      <section id="generate" className="pt-24 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-900 pb-12">
           <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-[0.6em] text-blue-500">Generator Interface</h2>
              <h3 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-slate-200">Start Your Campaign.</h3>
           </div>
           <p className="text-slate-500 text-sm font-mono max-w-sm leading-relaxed">Input your unit economics and product characteristics to engineer your high-converting copy set.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Quick Presets Side */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-950/50 border border-slate-800/80 p-10 rounded-[2.5rem] relative backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-blue-600 to-indigo-750 rounded-l-[2.5rem]"></div>
                <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-8 ml-3">⚡ Industry Presets</h3>
                <div className="flex flex-col gap-5 ml-3">
                    {[
                      {
                        label: '✨ Glow Lab Serum',
                        desc: 'D2C Skincare',
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
                        desc: 'Fitness Tech',
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
                        desc: 'B2B SaaS',
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
                        className="w-full text-left p-5 border border-slate-800/80 bg-slate-900/25 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all rounded-[1.5rem] flex items-center justify-between group cursor-pointer shadow-sm"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-300 group-hover:text-blue-400 transition-colors">{preset.label}</div>
                          <div className="text-[11px] text-slate-550 mt-1 font-mono tracking-tight font-medium uppercase">{preset.desc}</div>
                        </div>
                        <span className="text-[10px] font-black font-mono text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/40 transition-all uppercase tracking-widest bg-slate-950/80 border border-slate-800/70 px-4 py-2 rounded-xl">Load</span>
                      </button>
                    ))}
                </div>
            </div>

            <div className="bg-blue-600/5 border border-blue-500/10 p-10 rounded-[2.5rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[80px]"></div>
               <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6">Forge Insights</h4>
               <p className="text-slate-300 text-base italic leading-relaxed font-medium">
                 "Pattern interrupts aren't just visual glitches—they're semantic shifts that demand immediate cognitive processing. That's where we trap the attention."
               </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800/80 p-12 rounded-[3.5rem] relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-800"></div>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Name</label>
                  <input required name="name" value={formData.name || ''} onChange={handleChange} placeholder="GlowLab Face Serum" className="w-full px-6 py-5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-sans focus:outline-none focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5 rounded-2xl transition-all placeholder:text-slate-700" />
                </div>
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand Name</label>
                  <input required name="brand" value={formData.brand || ''} onChange={handleChange} className="w-full px-6 py-5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-sans focus:outline-none focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5 rounded-2xl transition-all" />
                </div>
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                  <select name="category" value={formData.category || ''} onChange={handleChange} className="w-full px-6 py-5 bg-slate-905 border border-slate-800 text-slate-300 text-sm font-sans focus:outline-none focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5 rounded-2xl transition-all cursor-pointer">
                    <option className="bg-slate-950">Skincare</option>
                    <option className="bg-slate-950">Fitness</option>
                    <option className="bg-slate-950">Food</option>
                    <option className="bg-slate-950">SaaS</option>
                    <option className="bg-slate-950">Local Biz</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Price (with currency)</label>
                  <input required name="price" value={formData.price || ''} onChange={handleChange} placeholder="₹799" className="w-full px-6 py-5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-sans focus:outline-none focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5 rounded-2xl transition-all placeholder:text-slate-700" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Problem (Pain Point)</label>
                <textarea required name="coreProblem" value={formData.coreProblem || ''} onChange={handleChange} rows={2} placeholder="Dull, uneven skin tone; dark spots" className="w-full px-6 py-5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-sans focus:outline-none focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5 rounded-2xl transition-all placeholder:text-slate-700 resize-none" />
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Result (Benefit)</label>
                <textarea required name="coreResult" value={formData.coreResult || ''} onChange={handleChange} rows={2} placeholder="Visible glow in 14 days" className="w-full px-6 py-5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-sans focus:outline-none focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5 rounded-2xl transition-all placeholder:text-slate-700 resize-none" />
              </div>

              <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Ingredient / Feature</label>
                  <input required name="keyIngredient" value={formData.keyIngredient || ''} onChange={handleChange} placeholder="10% Vitamin C + Niacinamide" className="w-full px-6 py-5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-sans focus:outline-none focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5 rounded-2xl transition-all placeholder:text-slate-700" />
              </div>

              <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Persona</label>
                  <input required name="targetPersona" value={formData.targetPersona || ''} onChange={handleChange} placeholder="Busy professionals age 25-40" className="w-full px-6 py-5 bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-sans focus:outline-none focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5 rounded-2xl transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                  <div className="space-y-6">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Platform</label>
                      <div className="flex flex-wrap gap-6">
                          {['instagram', 'youtube_shorts', 'meta_feed'].map(opt => (
                              <label key={opt} className="flex items-center gap-3 text-[12px] font-bold text-slate-300 cursor-pointer group whitespace-nowrap">
                                  <input type="radio" name="platform" value={opt} checked={formData.platform === opt} onChange={handleChange} className="w-4 h-4 accent-blue-500" />
                                  <span className="group-hover:text-blue-400 transition-colors uppercase tracking-widest">{opt.replace('_', ' ')}</span>
                              </label>
                          ))}
                      </div>
                  </div>
                  
                  <div className="space-y-6">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign Tone</label>
                      <div className="flex gap-6 flex-wrap">
                          {['relatable', 'excited', 'educational', 'dramatic'].map(opt => (
                              <label key={opt} className="flex items-center gap-3 text-[12px] font-bold text-slate-300 capitalize cursor-pointer group">
                                  <input type="radio" name="tone" value={opt} checked={formData.tone === opt} onChange={handleChange} className="w-4 h-4 accent-blue-500" />
                                  <span className="group-hover:text-blue-400 transition-colors uppercase text-[10px] tracking-widest">{opt}</span>
                              </label>
                          ))}
                      </div>
                  </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs rounded-[2rem] mb-4"
                >
                  <span className="font-black uppercase tracking-widest text-[9px] block mb-2 text-red-500">System Interruption</span>
                  {error}
                </motion.div>
              )}

              <div className="pt-10 border-t border-slate-800/60 mt-12">
                <button 
                  disabled={loading}
                  type="submit" 
                  className="group relative w-full bg-gradient-to-r from-blue-600 via-blue-550 to-indigo-700 text-slate-200 font-black tracking-[0.3em] uppercase text-xs py-7 px-4 hover:shadow-2xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-blue-500/50 cursor-pointer rounded-[2rem] active:scale-[0.97]"
                >
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    <Sparkles size={18} className="animate-pulse" />
                    {loading ? 'CALCULATING CONTENT VECTORS...' : 'ENGINEER AD CONTENT'}
                  </div>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

