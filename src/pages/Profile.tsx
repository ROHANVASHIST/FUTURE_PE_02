import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Briefcase, Building, Download, Upload, Trash2, Award, Target, Sparkles, Sliders, ChevronRight, FileText, LayoutGrid, List } from 'lucide-react';
import { store, HistoryItem } from '../lib/store';
import { Link } from 'react-router-dom';

interface UserInfo {
  name: string;
  email: string;
  role: string;
  company: string;
  bio: string;
}

const DEFAULT_USER: UserInfo = {
  name: 'Creative Director',
  email: 'creator@ugcforge.ai',
  role: 'UGC Content Strategist',
  company: 'Forge Agency',
  bio: 'Leveraging AI frameworks to engineer high-converting social collateral.'
};

export function Profile() {
  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    const saved = localStorage.getItem('ugc_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setHistory(store.getHistory());
  }, []);

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ugc_user_profile', JSON.stringify(userInfo));
    setIsEditing(false);
  };

  const exportData = () => {
    const data = {
      profile: userInfo,
      history: history,
      settings: store.getSettings(),
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ugc-studio-backup-${new Date().getTime()}.json`;
    a.click();
  };

  const filteredHistory = history.filter(item => 
    item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.productConfig?.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Creative Packs', value: history.length, icon: FileText, color: 'text-blue-400' },
    { label: 'Conversion Logic', value: 'Level 12', icon: Award, color: 'text-amber-400' },
    { label: 'Platform Mastery', value: '4 Native', icon: Target, color: 'text-emerald-400' },
    { label: 'Aura Score', value: '98%', icon: Sparkles, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-12 pb-32">
      {/* Header / Intro */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="relative group">
          <div className="w-40 h-40 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white p-1 shadow-2xl relative z-10">
            <div className="w-full h-full rounded-[2.8rem] bg-slate-950 flex items-center justify-center overflow-hidden border border-white/10 group-hover:bg-slate-900 transition-all">
                <User size={64} className="text-slate-700" />
            </div>
          </div>
          <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full z-0 opacity-50 group-hover:opacity-75 transition-opacity"></div>
          {isEditing ? (
             <button onClick={() => setIsEditing(false)} className="absolute bottom-4 right-4 w-10 h-10 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all z-20">
                <Trash2 size={16} />
             </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="absolute bottom-4 right-4 w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg z-20 hover:scale-105 active:scale-95 transition-all">
               <Sliders size={16} />
            </button>
          )}
        </div>

        <div className="flex-1 space-y-6 pt-2">
           <AnimatePresence mode="wait">
            {!isEditing ? (
               <motion.div 
                 key="info-view"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-4"
               >
                  <div className="space-y-2">
                    <h1 className="text-5xl font-sans font-black tracking-tight text-slate-200 uppercase">{userInfo.name}</h1>
                    <p className="text-blue-500 font-mono text-[11px] font-black uppercase tracking-[0.4em]">{userInfo.role} @ {userInfo.company}</p>
                  </div>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">{userInfo.bio}</p>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-xs text-slate-300">
                      <Mail size={14} className="text-slate-500" /> {userInfo.email}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-xs text-slate-300">
                      <Briefcase size={14} className="text-slate-500" /> {userInfo.role}
                    </div>
                  </div>
               </motion.div>
            ) : (
              <motion.form 
                key="edit-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={saveProfile} 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 bg-slate-950 border border-slate-800 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
              >
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Full Name</label>
                    <input required value={userInfo.name} onChange={e => setUserInfo({...userInfo, name: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Email Address</label>
                    <input type="email" required value={userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Role</label>
                    <input required value={userInfo.role} onChange={e => setUserInfo({...userInfo, role: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Company</label>
                    <input required value={userInfo.company} onChange={e => setUserInfo({...userInfo, company: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm" />
                 </div>
                 <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Creative Bio</label>
                    <textarea rows={3} value={userInfo.bio} onChange={e => setUserInfo({...userInfo, bio: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm resize-none" />
                 </div>
                 <div className="md:col-span-2 pt-4 flex gap-4">
                    <button type="submit" className="px-8 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all active:scale-95">Save Profile</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-3 bg-slate-900 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-white transition-all border border-slate-800">Cancel</button>
                 </div>
              </motion.form>
            )}
           </AnimatePresence>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="p-8 bg-slate-950/50 border border-slate-800/80 rounded-[2.5rem] flex flex-col items-center text-center space-y-4 hover:bg-slate-900/40 transition-all"
          >
            <div className={`p-4 rounded-2xl bg-slate-900 border border-white/5 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-sans font-black text-slate-200">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Creative Forge Feed */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-slate-900 pb-10">
          <div className="space-y-2">
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500">Creative Archive</h2>
            <h3 className="text-3xl font-sans font-black text-slate-200 uppercase tracking-tight">Project Portfolio.</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
             <div className="relative w-full sm:w-64 group">
                <input 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Filter by product..." 
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:border-blue-500 outline-none transition-all group-hover:border-slate-700" 
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600">
                  <LayoutGrid size={14} />
                </div>
             </div>
             
             <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-2xl">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                   onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <List size={16} />
                </button>
             </div>

             <button onClick={exportData} className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:text-white transition-all shadow-xl active:scale-95">
                <Download size={14} /> Export All
             </button>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="py-32 text-center bg-slate-900/10 border border-dashed border-slate-800 rounded-[3rem]">
            <p className="text-slate-500 font-bold uppercase tracking-tight">No Creative Signals Captured.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHistory.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-slate-950 border border-slate-800/80 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-blue-500/30 transition-all shadow-xl"
              >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                  <div className="p-8 flex-1 space-y-6">
                     <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-60">Sequence #{history.length - i}</span>
                        <div className="flex gap-1.5">
                           {(['instagram', 'youtube', 'tiktok'][i % 3]).split('').map((_, j) => (
                             <div key={j} className="w-1 h-3 bg-blue-500/20 rounded-full"></div>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-xl font-bold text-slate-200 tracking-tight uppercase group-hover:text-blue-400 transition-colors">{item.productName}</h4>
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest font-mono">{item.productConfig?.brand || 'Indie'}</p>
                     </div>
                     <p className="text-slate-400 text-sm italic font-medium line-clamp-3 leading-relaxed">
                        "{item.adPack.hooks[0]?.text}"
                     </p>
                  </div>
                  <Link 
                    to="/generate" 
                    state={{ adPack: item.adPack, product: item.productConfig }} 
                    className="p-6 bg-slate-900/50 border-t border-slate-800 group-hover:bg-blue-600 transition-all flex items-center justify-between group-hover:text-white text-slate-500"
                  >
                     <span className="text-[9px] font-black uppercase tracking-widest">Review Execution</span>
                     <ChevronRight size={14} />
                  </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
             {filteredHistory.map((item, i) => (
               <div key={item.id} className="p-8 bg-slate-950 border border-slate-800 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-blue-500/20 transition-all">
                  <div className="flex items-center gap-8">
                     <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-all">
                        <FileText size={24} />
                     </div>
                     <div>
                        <h4 className="text-lg font-bold text-slate-200 uppercase tracking-tight">{item.productName}</h4>
                        <div className="flex gap-4 mt-1">
                          <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{item.productConfig?.brand}</span>
                          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono">{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-6">
                     <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Platform</span>
                        <span className="text-xs font-bold text-slate-200 uppercase">{item.productConfig?.platform?.replace('_', ' ')}</span>
                     </div>
                     <Link 
                        to="/generate" 
                        state={{ adPack: item.adPack, product: item.productConfig }} 
                        className="px-8 py-3 bg-slate-900 border border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-2xl group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all active:scale-95"
                     >
                        Recall Data
                     </Link>
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>

      {/* Persistence Note */}
      <div className="p-12 bg-slate-950 border-2 border-slate-900 border-dashed rounded-[4rem] text-center space-y-4 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <Upload size={120} className="text-blue-500" />
         </div>
         <h4 className="text-xl font-sans font-black text-slate-200 uppercase tracking-tight">Persistence & Sovereignty.</h4>
         <p className="text-slate-500 text-sm font-medium max-w-xl mx-auto leading-relaxed">
            Your creative data is stored exclusively in your local environment. We do not transmit or cache your campaigns on central servers. For permanent preservation, utilize the high-fidelity JSON export utility.
         </p>
         <div className="pt-6">
            <button onClick={() => {
              if (window.confirm('IRREVERSIBLE ACTION: Are you sure you want to purge all local creative history and profile data?')) {
                store.clearHistory();
                localStorage.removeItem('ugc_user_profile');
                window.location.reload();
              }
            }} className="text-red-500/50 hover:text-red-500 text-[9px] font-black uppercase tracking-widest transition-all">
              Initiate Hard Purgatory Sequence
            </button>
         </div>
      </div>
    </div>
  );
}
