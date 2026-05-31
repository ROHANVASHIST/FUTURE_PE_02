import { useLocation, Link, Navigate } from 'react-router-dom';
import { GeneratedAdPack } from '../lib/schemas/ugc-schema';
import { useState } from 'react';

export function Generate() {
  const location = useLocation();
  const adPack: GeneratedAdPack = location.state?.adPack;
  const product = location.state?.product;
  
  const [activeTab, setActiveTab] = useState<'hooks' | 'script' | 'ctas' | 'captions'>('hooks');

  if (!adPack) {
    return <Navigate to="/" replace />;
  }

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
    alert('Copied full ad pack as markdown to clipboard!');
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-center bg-slate-950 p-6 border border-slate-800 rounded-none mb-2 relative">
         <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
         <div className="ml-2">
            <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-widest text-[12px] mb-1">Generated Output</h2>
            <p className="text-xs font-mono text-slate-500 mt-2">Ad content pack for <span className="text-blue-400">{product.name}</span></p>
         </div>
         <div className="flex gap-4">
            <button onClick={exportMarkdown} className="px-4 py-2 border border-slate-700 bg-slate-900/50 text-[10px] font-bold tracking-widest uppercase text-slate-300 hover:text-white hover:border-slate-500 transition-colors">
                Copy as Markdown
            </button>
            <Link to="/" className="px-4 py-2 bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase hover:bg-blue-700 transition-colors border border-blue-500 flex items-center justify-center">
                New Project
            </Link>
         </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 overflow-hidden">
        <div className="flex border-b border-slate-800 overflow-x-auto bg-slate-900/30">
            {['hooks', 'script', 'ctas', 'captions'].map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        <div className="p-8">
            {activeTab === 'hooks' && (
                <div className="space-y-6">
                    {adPack.hooks.map((hook, i) => (
                        <div key={i} className="p-5 border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 transition-colors border-l-2 border-l-blue-600">
                            <div className="flex gap-2 items-center mb-4">
                                <span className="px-2 py-1 bg-slate-800 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                                    {hook.type.replace('_', ' ')}
                                </span>
                            </div>
                            <h3 className="text-base font-light text-slate-200 mb-4">{hook.text}</h3>
                            <p className="text-xs text-slate-400 font-mono bg-slate-950 p-3 border border-slate-800">
                                <span className="text-blue-500 uppercase tracking-widest text-[10px] mr-2">Why it works:</span> {hook.rationale}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'script' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-slate-900/30 p-4 border border-slate-800">
                        <div className="flex gap-6">
                            <div className="text-sm">
                                <span className="text-slate-500 uppercase text-[10px] tracking-widest">Duration:</span>
                                <span className="ml-2 font-mono text-blue-400 text-xs">~{adPack.script.estimated_duration_seconds}s</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-slate-500 uppercase text-[10px] tracking-widest">Words:</span>
                                <span className="ml-2 font-mono text-blue-400 text-xs">{adPack.script.word_count}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-0 border border-slate-800">
                        {[
                            { label: '0-3s', title: 'HOOK', content: adPack.script.hook },
                            { label: '3-8s', title: 'PROBLEM', content: adPack.script.problem },
                            { label: '8-18s', title: 'AGITATE', content: adPack.script.agitate },
                            { label: '18-35s', title: 'SOLUTION', content: adPack.script.solution },
                            { label: '35-45s', title: 'PROOF', content: adPack.script.proof },
                            { label: '45-55s', title: 'CTA', content: adPack.script.cta },
                        ].map((section, idx, arr) => (
                            <div key={idx} className={`flex gap-6 p-6 transition-colors bg-slate-950 hover:bg-slate-900/30 ${idx !== arr.length - 1 ? 'border-b border-slate-800' : ''}`}>
                                <div className="w-24 shrink-0 mt-1">
                                    <div className="text-[10px] font-mono text-blue-500 mb-1">{section.label}</div>
                                    <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{section.title}</div>
                                </div>
                                <div className="flex-1 text-slate-300 text-sm font-light leading-relaxed whitespace-pre-wrap">
                                    {section.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-800">
                        <h4 className="text-[10px] font-bold text-slate-500 mb-4 tracking-widest uppercase">Full Continuous Script</h4>
                        <div className="p-6 bg-slate-900/20 border-l-2 border-blue-600 font-mono text-xs leading-relaxed text-slate-400 whitespace-pre-wrap">
                            {adPack.script.full_script}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'ctas' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {adPack.ctas.map((cta, i) => (
                        <div key={i} className="p-5 border border-slate-800 bg-slate-900/20 relative">
                            <div className="absolute top-0 left-0 w-1 h-12 bg-blue-600"></div>
                            <span className="inline-block px-2 py-1 bg-slate-800 text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-4 ml-2">
                                Stage: {cta.stage}
                            </span>
                            <h3 className="text-sm font-light text-slate-200 mb-4 ml-2">"{cta.text}"</h3>
                            <p className="text-xs text-slate-500 border-t border-slate-800 pt-3 ml-2 font-mono">
                                <span className="text-blue-500 uppercase tracking-widest text-[10px] mr-2">Use case:</span> {cta.use_case}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'captions' && (
                <div className="space-y-6">
                    {adPack.captions.map((caption, i) => (
                        <div key={i} className="p-6 border border-slate-800 bg-slate-900/20 relative overflow-hidden">
                            <span className="inline-block px-2 py-1 bg-slate-800 text-[10px] text-blue-400 font-mono uppercase tracking-wider mb-4">
                                {caption.type.replace('-', ' ')}
                            </span>
                            <div className="text-slate-300 text-sm font-light leading-relaxed whitespace-pre-wrap mb-4">
                                {caption.text}
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                                {caption.hashtags.map((tag, j) => (
                                    <span key={j} className="text-xs font-mono text-slate-500">{tag.startsWith('#') ? tag : `#${tag}`}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
