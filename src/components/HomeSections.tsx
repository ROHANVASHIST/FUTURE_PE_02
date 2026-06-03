import { motion } from 'motion/react';
import { Check, X, Star, Quote, Zap, Target, Search, Edit3, Send } from 'lucide-react';
import testimonialImg from '../assets/images/ugc_testimonial_1_1780446834322.png';
import processImg from '../assets/images/ugc_ai_process_1780446851791.png';

export const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Define Persona',
      desc: 'Input your product logic, target audience pain points, and core benefits into our forge mapping interface.',
      color: 'blue'
    },
    {
      icon: Edit3,
      title: 'AI Scripting',
      desc: 'Our P.A.S.C. engine generates multi-variant scripts, 5+ scroll-stopping hooks, and platform-specific CTAs.',
      color: 'indigo'
    },
    {
      icon: Send,
      title: 'Deploy & Scale',
      desc: 'Export high-fidelity campaign models as structured PDF reports or raw TXT bundles for immediate production.',
      color: 'blue'
    }
  ];

  return (
    <section className="space-y-16 py-12">
      <div className="max-w-3xl">
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-500 mb-4">The Workflow</h2>
        <h3 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-slate-200 mb-6">From Concept to Campaign in 60 Seconds.</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6 group"
            >
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <step.icon size={20} />
                </div>
                {i < steps.length - 1 && <div className="w-px h-full bg-slate-800 mt-4"></div>}
              </div>
              <div className="pb-8">
                <h4 className="text-lg font-bold text-slate-200 mb-2">{step.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="lg:col-span-7 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl"
          >
            <img src={processImg} alt="AI Processing" className="w-full h-[450px] object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl max-w-xs">
               <div className="flex items-center gap-2 mb-3">
                 <Zap size={14} className="text-blue-400" />
                 <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Neural Mapping</span>
               </div>
               <p className="text-xs text-slate-300 font-medium leading-relaxed">
                 Algorithms analyzing over 10,000 top-performing UGC ads to identify conversion triggers.
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const ComparisonTable = () => {
  return (
    <section className="space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-500">ROI Focused</h2>
        <h3 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-slate-200 italic">UGC Studio vs. The "Average" Method</h3>
      </div>

      <div className="overflow-x-auto rounded-[2rem] border border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-500">Feature Comparison</th>
              <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-300 bg-slate-900/30">Manual Drafting</th>
              <th className="p-8 text-[11px] font-black uppercase tracking-widest text-blue-400">UGC Studio Forge</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {[
              { f: 'Drafting Time', m: '4-6 Hours', s: '60 Seconds' },
              { f: 'Hook Variability', m: 'Limited (1-2)', s: 'Unlimited (5+ Variants)' },
              { f: 'Copy Frameworks', m: 'Ad-hoc / Basic', s: 'Scientific P.A.S.C.' },
              { f: 'Platform Support', m: 'One-off', s: 'Omnichannel Native' },
              { f: 'Cost per Script', m: '~$150 (Freelance)', s: '$0 (Unlimited)' }
            ].map((row, i) => (
              <tr key={i} className="border-b border-slate-900/50 hover:bg-slate-900/20 transition-colors group">
                <td className="p-8 text-slate-200">{row.f}</td>
                <td className="p-8 space-x-2 text-slate-500">
                   <div className="flex items-center gap-2">
                     <X size={14} className="text-red-500/50" />
                     {row.m}
                   </div>
                </td>
                <td className="p-8 bg-blue-600/5 text-blue-100 font-bold">
                   <div className="flex items-center gap-2">
                     <Check size={16} className="text-blue-400" />
                     {row.s}
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  return (
    <section className="space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-500">Social Logic</h2>
        <h3 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-slate-200 leading-tight">
          Used by 5,000+ <br /> Creators & Brands.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-10 bg-slate-950 border border-slate-800 rounded-[2.5rem] relative group"
        >
          <Quote className="absolute top-10 right-10 text-slate-800 group-hover:text-blue-500/20 transition-colors" size={60} />
          <div className="flex items-center gap-4 mb-8">
             <img src={testimonialImg} alt="Creator" className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500/20 shadow-xl" />
             <div>
                <h4 className="text-slate-200 font-bold">Sarah Jenks</h4>
                <p className="text-[10px] uppercase font-black tracking-widest text-blue-500">D2C Content Strategist</p>
             </div>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed italic mb-8">
            "We used to spend days arguing over hooks. Now, we run our product specs through UGC Studio and get high-converting scripts in minutes. Our CTR improved by 22% in the first week."
          </p>
          <div className="flex gap-1 text-amber-500">
             {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="p-10 bg-slate-900/30 border border-slate-800 rounded-[2.5rem] relative group border-dashed"
        >
           <div className="h-full flex flex-col justify-center items-center text-center space-y-6">
              <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                 <Target size={32} />
              </div>
              <h4 className="text-2xl font-bold text-slate-200 leading-tight">Ready to join the elite <br /> 1% of advertisers?</h4>
              <button className="px-8 py-3 bg-slate-200 text-slate-950 text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all active:scale-95">
                Join the Forge
              </button>
           </div>
        </motion.div>
      </div>
    </section>
  );
};
