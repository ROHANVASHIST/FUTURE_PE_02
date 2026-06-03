import { motion } from 'motion/react';
import { Check, Zap, Sparkles, Target } from 'lucide-react';

export const Pricing = () => {
  const plans = [
    {
      name: 'Creator',
      price: 'Free',
      desc: 'Perfect for individual creators starting their UGC journey.',
      features: ['5 Generation Runs / day', 'P.A.S.C. Script Framework', 'Standard PDF Export', 'Community Discord Access'],
      cta: 'Current Plan',
      popular: false
    },
    {
      name: 'Agency Pro',
      price: '$49',
      period: '/mo',
      desc: 'Designed for scaling agencies and content houses.',
      features: ['Unlimited Generation Runs', 'Custom Brand Tone Modeling', 'Batch Campaign Generation', 'White-label PDF Reports', 'Priority AI Queue'],
      cta: 'Upgrade to Pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'Built for large D2C brands with custom API needs.',
      features: ['Custom AI Model Training', 'Dedicated Account Sync', 'Enterprise-grade Security', 'Custom API Integration', 'Team Workspace'],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section className="space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-500">Scalable Access</h2>
        <h3 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-slate-200 leading-tight">
          Pricing for Every <br /> Growth Stage.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className={`p-10 rounded-[3rem] border ${plan.popular ? 'bg-slate-900 border-blue-500/50 shadow-[0_30px_100px_-20px_rgba(37,99,235,0.25)] relative' : 'bg-slate-950 border-slate-800'} transition-all`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-slate-200 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-slate-200 mb-2">{plan.name}</h4>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-slate-200">{plan.price}</span>
                {plan.period && <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">{plan.period}</span>}
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{plan.desc}</p>
            </div>

            <div className="space-y-5 mb-10">
               {plan.features.map((feature, j) => (
                 <div key={j} className="flex items-center gap-3 text-[12px] font-bold text-slate-300">
                    <Check size={14} className={plan.popular ? 'text-blue-400' : 'text-slate-500'} />
                    {feature}
                 </div>
               ))}
            </div>

            <button className={`w-full py-4 px-6 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
              plan.popular 
                ? 'bg-blue-600 text-slate-200 hover:bg-blue-700 shadow-xl shadow-blue-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}>
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
