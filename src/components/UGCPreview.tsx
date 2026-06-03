import { motion } from 'motion/react';
import { Play, Heart, MessageCircle, Send, Bookmark, MoreVertical, Music, User } from 'lucide-react';

interface UGCPreviewProps {
  hook: string;
  brand: string;
  platform: string;
}

export const UGCPreview = ({ hook, brand, platform }: UGCPreviewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Live Simulation</h4>
        <p className="text-xs text-slate-500 font-mono">Real-time overlay on {platform.replace('_', ' ')} feed.</p>
      </div>

      <div className="relative mx-auto w-full max-w-[320px] aspect-[9/16] bg-slate-900 rounded-[3rem] border-8 border-slate-950 shadow-2xl overflow-hidden ring-1 ring-slate-800">
        {/* Mock Video Content (Static representation) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                <Play className="text-white opacity-20 fill-current" size={32} />
            </div>
            <div className="absolute inset-0 bg-slate-950/20"></div>
        </div>

        {/* Top Navbar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-slate-950/40 to-transparent">
           <div className="flex gap-4 text-[11px] font-black text-white/40 tracking-widest uppercase">
              <span className="text-white">Following</span>
              <span>For You</span>
           </div>
           <MoreVertical size={16} className="text-white/60" />
        </div>

        {/* Hook Overlay - This is the central feature */}
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="bg-yellow-400 text-slate-950 p-4 rounded-xl font-sans font-black text-lg leading-tight shadow-[0_10px_40px_rgba(0,0,0,0.5)] rotate-[-2deg]"
           >
             {hook}
           </motion.div>
        </div>

        {/* Bottom UI */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950/80 to-transparent">
           <div className="flex items-end justify-between gap-4">
              <div className="space-y-3 flex-1">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white border border-white/20">
                       <User size={14} />
                    </div>
                    <span className="text-xs font-bold text-white">@{brand.toLowerCase().replace(/\s/g, '')}</span>
                 </div>
                 <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed">
                   Generating high-converting UGC for {brand}. Check out this scroll-stopping hook! #UGC #AdCreative
                 </p>
                 <div className="flex items-center gap-2 text-[10px] text-white/60 font-mono">
                    <Music size={10} />
                    <span>Original Audio - {brand} Official</span>
                 </div>
              </div>

              <div className="flex flex-col gap-5 items-center">
                 <div className="flex flex-col items-center gap-1">
                    <Heart size={24} className="text-white drop-shadow-lg" />
                    <span className="text-[9px] font-black text-white tracking-widest uppercase">12.4K</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <MessageCircle size={24} className="text-white drop-shadow-lg" />
                    <span className="text-[9px] font-black text-white tracking-widest uppercase">482</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <Bookmark size={24} className="text-white drop-shadow-lg" />
                    <span className="text-[9px] font-black text-white tracking-widest uppercase">2.1K</span>
                 </div>
                 <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center">
                    <Send size={14} className="text-white" />
                 </div>
              </div>
           </div>

           {/* Progress Bar */}
           <div className="mt-6 h-0.5 w-full bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="h-full bg-white"
              />
           </div>
        </div>
      </div>
    </div>
  );
};
