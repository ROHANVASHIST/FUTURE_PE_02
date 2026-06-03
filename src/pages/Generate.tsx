import { useLocation, Link, Navigate } from 'react-router-dom';
import { GeneratedAdPack } from '../lib/schemas/ugc-schema';
import { useState } from 'react';
import { Copy, Check, Sparkles, Clock, FileText, Download, Archive } from 'lucide-react';
import { downloadZipArchive, downloadPdfReport } from '../lib/exportUtils';
import { UGCPreview } from '../components/UGCPreview';

export function Generate() {
  const location = useLocation();
  const adPack: GeneratedAdPack = location.state?.adPack;
  const product = location.state?.product;
  
  const [activeTab, setActiveTab] = useState<'hooks' | 'script' | 'ctas' | 'captions'>('hooks');
  const [copied, setCopied] = useState(false);
  const [individualCopied, setIndividualCopied] = useState<string | null>(null);

  if (!adPack) {
    return <Navigate to="/" replace />;
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setIndividualCopied(id);
    setTimeout(() => setIndividualCopied(null), 2000);
  };

  const exportMarkdown = () => {
    const md = `
# Ad Pack for ${product.name}

## Hooks
${adPack.hooks.map((h, i) => `**${i + 1}. [${h.type}]**\n> ${h.text}\n*Why it works: ${h.rationale}*\n`).join('\n')}

## Script
**Hook:** ${adPack.script.hook}
**Problem:** ${adPack.script.problem}
**Agitate:** ${adPack.script.agitate}
**Solution:** ${adPack.script.solution}
**Proof:** ${adPack.script.proof}
**CTA:** ${adPack.script.cta}

### Full Script
${adPack.script.full_script}
*(~${adPack.script.estimated_duration_seconds}s, ${adPack.script.word_count} words)*

## CTAs
${adPack.ctas.map((c, i) => `**${i + 1}. [${c.stage}]** ${c.text}\n*Use case: ${c.use_case}*\n`).join('\n')}

## Captions
${adPack.captions.map((c, i) => `**${i + 1}. [${c.type}]**\n${c.text}\n\n${c.hashtags.join(' ')}\n`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 relative">
      {/* Absolute Toast Alert Box */}
      {copied && (
        <div className="fixed top-20 right-6 z-50 bg-blue-600 text-slate-200 font-mono text-xs px-4 py-3 rounded-xl shadow-xl border border-blue-400/30 flex items-center gap-2 animate-fade-in">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
          <span>Ad Pack Markdown copied to clipboard</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/60 p-6 border border-slate-800/80 rounded-2xl mb-2 relative backdrop-blur-sm shadow-xl">
         <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 rounded-l-2xl"></div>
         <div className="ml-2.5 md:ml-3.5">
            <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-widest text-[11px] mb-1">Campaign Generator Results</h2>
            <p className="text-xs font-mono text-slate-500">Structured asset pack compiled for <span className="text-blue-400 font-bold">{product.name}</span></p>
         </div>
         <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center">
            <button 
              onClick={exportMarkdown} 
              className="px-3.5 py-2 border border-slate-800 bg-slate-900/50 text-[10px] font-bold tracking-widest uppercase text-slate-300 hover:text-white hover:border-slate-500 transition-all flex items-center gap-1.5 cursor-pointer rounded-xl"
              title="Copy formatted markdown to clipboard"
            >
              <Copy size={11} />
              <span className="hidden sm:inline">Copy Markdown</span>
              <span className="sm:hidden">MD</span>
            </button>
            
            <button 
              onClick={() => downloadPdfReport(adPack, product)} 
              className="px-3.5 py-2 border border-slate-800 bg-slate-900/50 text-[10px] font-bold tracking-widest uppercase text-blue-400 hover:text-blue-300 hover:border-blue-500 transition-all flex items-center gap-1.5 cursor-pointer rounded-xl"
              title="Download high-contrast PDF campaign document"
            >
              <Download size={11} />
              <span>Export PDF</span>
            </button>

            <button 
              onClick={() => downloadZipArchive(adPack, product)} 
              className="px-3.5 py-2 border border-slate-800 bg-slate-900/50 text-[10px] font-bold tracking-widest uppercase text-emerald-400 hover:text-emerald-300 hover:border-emerald-500 transition-all flex items-center gap-1.5 cursor-pointer rounded-xl"
              title="Download organized text file bundle via ZIP"
            >
              <Archive size={11} />
              <span>Export ZIP</span>
            </button>

            <Link 
              to="/" 
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-slate-200 text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-1 rounded-xl shadow-md border border-blue-500/40"
            >
              <span>New Project</span>
            </Link>
         </div>
      </div>

      <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="flex border-b border-slate-800/60 overflow-x-auto bg-slate-900/40 p-2.5 gap-2">
            {['hooks', 'script', 'ctas', 'captions'].map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-xl cursor-pointer ${activeTab === tab ? 'bg-blue-600 text-slate-200 shadow-lg shadow-blue-600/10 border border-blue-550/45' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
               <div className="lg:col-span-8">
                  {activeTab === 'hooks' && (
                      <div className="space-y-6 animate-fade-in">
                          {adPack.hooks.map((hook, i) => {
                              const cellId = `hook-${i}`;
                              const isCopied = individualCopied === cellId;
                              return (
                                  <div key={i} className="p-6 border border-slate-800/70 bg-slate-900/10 hover:bg-slate-900/20 hover:border-blue-500/25 transition-all border-l-4 border-l-blue-500 group relative rounded-2xl shadow-md">
                                      <div className="flex justify-between items-center gap-4 mb-3.5">
                                          <span className="px-3 py-1 bg-blue-500/5 border border-blue-500/10 text-[9px] text-blue-400 font-mono uppercase tracking-wider rounded-lg font-bold">
                                              {hook.type.replace('_', ' ')}
                                          </span>
                                          <button
                                              onClick={() => copyToClipboard(hook.text, cellId)}
                                              className="p-1.5 border border-slate-800 hover:border-slate-655 bg-slate-950/50 rounded-lg hover:text-blue-400 text-slate-400 transition-all flex items-center justify-center cursor-pointer"
                                              title="Copy Hook Text"
                                          >
                                              {isCopied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                          </button>
                                      </div>
                                      <h3 className="text-base font-semibold text-slate-200 mb-4 select-all leading-snug pl-1">{hook.text}</h3>
                                      <div className="text-xs text-slate-405 font-mono bg-slate-950/80 p-4 border border-slate-900 rounded-xl leading-relaxed">
                                          <span className="text-blue-500 uppercase font-bold tracking-widest text-[9px] mr-2">Behavior Trigger:</span> {hook.rationale}
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  )}

                  {activeTab === 'script' && (
                      <div className="space-y-6 animate-fade-in">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/35 px-5 py-4 border border-slate-800/80 rounded-2xl gap-4">
                              <div className="flex gap-6 items-center">
                                  <div className="flex items-center space-x-2">
                                      <Clock size={13} className="text-blue-400" />
                                      <span className="text-slate-400 uppercase text-[9px] font-bold tracking-widest">Duration:</span>
                                      <span className="font-mono text-blue-400 text-xs font-bold">~{adPack.script.estimated_duration_seconds}s</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                      <FileText size={13} className="text-blue-400" />
                                      <span className="text-slate-400 uppercase text-[9px] font-bold tracking-widest">Length:</span>
                                      <span className="font-mono text-blue-400 text-xs font-bold">{adPack.script.word_count} words</span>
                                  </div>
                              </div>
                              <button
                                  onClick={() => copyToClipboard(adPack.script.full_script, 'full-script')}
                                  className="px-4 py-2 border border-slate-800 hover:border-slate-650 bg-slate-950/50 text-[9px] font-bold tracking-widest uppercase text-slate-300 hover:text-blue-400 transition-all rounded-xl flex items-center gap-1.5 cursor-pointer"
                              >
                                  {individualCopied === 'full-script' ? (
                                      <>
                                          <Check size={11} className="text-emerald-400" />
                                          <span>Script Copied</span>
                                      </>
                                  ) : (
                                      <>
                                          <Copy size={11} />
                                          <span>Copy Full Script</span>
                                      </>
                                  )}
                              </button>
                          </div>

                          <div className="space-y-0.5 border border-slate-850 rounded-2xl overflow-hidden divide-y divide-slate-900 bg-slate-950/10">
                              {[
                                  { label: '0-3s', title: 'HOOK', keyId: 'script-hook', content: adPack.script.hook },
                                  { label: '3-8s', title: 'PROBLEM', keyId: 'script-prob', content: adPack.script.problem },
                                  { label: '8-18s', title: 'AGITATE', keyId: 'script-agit', content: adPack.script.agitate },
                                  { label: '18-35s', title: 'SOLUTION', keyId: 'script-sol', content: adPack.script.solution },
                                  { label: '35-45s', title: 'PROOF', keyId: 'script-proof', content: adPack.script.proof },
                                  { label: '45-55s', title: 'CTA', keyId: 'script-cta', content: adPack.script.cta },
                              ].map((section, idx) => {
                                  const isSectionCopied = individualCopied === section.keyId;
                                  return (
                                      <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 transition-all bg-slate-950/20 hover:bg-slate-900/25 group relative">
                                          <div className="w-full sm:w-28 shrink-0 flex sm:flex-col justify-between items-start sm:justify-start gap-1">
                                              <div>
                                                  <div className="text-[10px] font-mono text-blue-400 font-bold">{section.label}</div>
                                                  <div className="text-[10px] font-bold text-slate-350 tracking-widest uppercase">{section.title}</div>
                                              </div>
                                              <button
                                                  onClick={() => copyToClipboard(section.content, section.keyId)}
                                                  className="p-1.5 border border-slate-800 hover:border-slate-650 bg-slate-900/50 rounded-lg hover:text-blue-400 text-slate-500 transition-all flex items-center justify-center cursor-pointer md:opacity-0 group-hover:opacity-100 mt-1"
                                                  title="Copy Beat"
                                              >
                                                  {isSectionCopied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                                              </button>
                                          </div>
                                          <div className="flex-1 text-slate-300 text-sm font-light leading-relaxed whitespace-pre-wrap select-all">
                                              {section.content}
                                          </div>
                                      </div>
                                  );
                              })}
                          </div>

                          <div className="pt-6 mt-6 border-t border-slate-800/60">
                              <div className="flex justify-between items-center mb-3">
                                  <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Full Continuous Copy (Teleprompter Ready)</h4>
                              </div>
                              <div className="p-6 bg-slate-900/15 border border-slate-850 border-l-4 border-l-blue-500 font-mono text-xs leading-relaxed text-slate-400 whitespace-pre-wrap select-all rounded-2xl shadow-inner">
                                  {adPack.script.full_script}
                              </div>
                          </div>
                      </div>
                  )}

                  {activeTab === 'ctas' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
                          {adPack.ctas.map((cta, i) => {
                              const cellId = `cta-${i}`;
                              const isCtaCopied = individualCopied === cellId;
                              return (
                                  <div key={i} className="p-6 border border-slate-800/80 hover:border-blue-500/25 bg-slate-900/15 hover:bg-slate-900/25 relative rounded-2xl shadow-md transition-all group overflow-hidden">
                                      <div className="absolute top-0 left-0 w-1 h-14 bg-gradient-to-b from-blue-500 to-transparent"></div>
                                      <div className="flex justify-between items-center mb-4 pl-1">
                                          <span className="inline-block px-2.5 py-0.5 bg-blue-500/5 border border-blue-500/10 text-[9px] text-blue-400 font-mono uppercase tracking-wider rounded-lg font-bold">
                                              Stage: {cta.stage.replace('_', ' ')}
                                          </span>
                                          <button
                                              onClick={() => copyToClipboard(cta.text, cellId)}
                                              className="p-1.5 border border-slate-805 hover:border-slate-650 bg-slate-950/50 rounded-lg hover:text-blue-400 text-slate-400 transition-all flex items-center justify-center cursor-pointer"
                                              title="Copy CTA Text"
                                          >
                                              {isCtaCopied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                                          </button>
                                      </div>
                                      <h3 className="text-sm font-semibold text-slate-200 mb-4 pl-1 select-all leading-relaxed">"{cta.text}"</h3>
                                      <div className="text-[11px] text-slate-400 border-t border-slate-900 pt-4 pl-1 font-mono leading-relaxed">
                                          <span className="text-blue-500 uppercase tracking-widest text-[9px] font-bold mr-2">Ideal Segment:</span> {cta.use_case}
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  )}

                  {activeTab === 'captions' && (
                      <div className="space-y-6 animate-fade-in">
                          {adPack.captions.map((caption, i) => {
                              const cellId = `caption-${i}`;
                              const isCaptionCopied = individualCopied === cellId;
                              return (
                                  <div key={i} className="p-6 border border-slate-800/85 hover:border-slate-700 bg-slate-900/15 hover:bg-slate-900/25 relative overflow-hidden rounded-2xl shadow-md transition-all group flex flex-col md:flex-row md:items-start gap-4">
                                      <div className="flex-1">
                                          <div className="flex justify-between items-center mb-4">
                                              <span className="inline-block px-3 py-0.5 bg-blue-500/5 border border-blue-500/10 text-[9px] text-blue-400 font-mono uppercase tracking-wider rounded-lg font-bold">
                                                  {caption.type.replace('-', ' ')}
                                              </span>
                                              <button
                                                  onClick={() => copyToClipboard(`${caption.text}\n\n${caption.hashtags.join(' ')}`, cellId)}
                                                  className="px-3.5 py-1.5 border border-slate-800 hover:border-slate-650 bg-slate-950/50 text-[9px] font-bold tracking-widest uppercase text-slate-400 hover:text-blue-400 transition-all rounded-xl flex items-center gap-1.5 cursor-pointer"
                                              >
                                                  {isCaptionCopied ? (
                                                      <>
                                                          <Check size={11} className="text-emerald-400" />
                                                          <span>Copied</span>
                                                      </>
                                                  ) : (
                                                      <>
                                                          <Copy size={11} />
                                                          <span>Copy Caption</span>
                                                      </>
                                                  )}
                                              </button>
                                          </div>
                                          <div className="text-slate-300 text-sm font-light leading-relaxed whitespace-pre-wrap mb-4 select-all">
                                              {caption.text}
                                          </div>
                                          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-900">
                                              {caption.hashtags.map((tag, j) => (
                                                  <span key={j} className="text-xs font-mono text-slate-550 hover:text-blue-400 transition-colors cursor-pointer">{tag.startsWith('#') ? tag : `#${tag}`}</span>
                                              ))}
                                          </div>
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  )}
               </div>

               <div className="lg:col-span-4 sticky top-32">
                  <UGCPreview 
                    hook={adPack.hooks[0]?.text || "Scroll Stopper Hook"} 
                    brand={product.brand || "UGC Studio"} 
                    platform={product.platform || "instagram"}
                  />
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
