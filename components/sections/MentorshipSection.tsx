import React from 'react';
import { mentorship } from '../../data';
import { ArrowUpRight, Calendar } from 'lucide-react';

export const MentorshipSection: React.FC = () => {
  return (
    <div className="max-w-4xl">
      <div className="mb-16 border-l-2 border-signal pl-6 py-2">
        <h2 className="text-2xl font-light text-white mb-4">Sharing Knowledge</h2>
        <p className="text-zinc-400 font-light max-w-2xl leading-relaxed">
          I think the best way to prove you understand something is to explain it simply. I try to help students learn by doing, keeping standards high but making it safe to fail and learn.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-16">
        {mentorship.map((item, idx) => (
          <div key={idx} className="group flex flex-col md:flex-row gap-6 p-6 border border-transparent hover:border-zinc-800 hover:bg-void-surface transition-all rounded-sm">
             <div className="w-full md:w-1/3 shrink-0">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg text-zinc-200 font-medium hover:text-signal transition-colors mb-1">
                    {item.organization}
                    <ArrowUpRight size={14} className="opacity-50" />
                  </a>
                ) : (
                  <h3 className="text-lg text-zinc-200 font-medium mb-1">{item.organization}</h3>
                )}
                
                <span className="font-mono text-xs text-signal block">{item.role}</span>
                {item.stats && (
                  <div className="mt-4 flex gap-4">
                    {item.stats.map((stat, s) => (
                      <div key={s}>
                         <div className="text-xl font-light text-white">{stat.value}</div>
                         <div className="text-[9px] font-mono text-zinc-600 uppercase">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
             </div>
             
             <div className="flex-1 border-l border-zinc-800 md:border-l-0 md:pl-0 pl-4">
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {item.description}
                </p>
             </div>
          </div>
        ))}
      </div>

      {/* Calendly Section (Full Width / Centered Focus) */}
      <div className="border-t border-dashed border-zinc-800 pt-16 flex justify-center">
        <div className="max-w-2xl w-full">
            <div className="bg-void-surface border border-zinc-800 p-8 rounded-sm hover:border-zinc-700 transition-colors flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="shrink-0 bg-zinc-900/50 p-4 rounded-full border border-zinc-800">
                    <Calendar size={32} className="text-zinc-500" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg text-white font-medium mb-2">Schedule 1:1 Meeting</h3>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                        Want to discuss a project, get career advice, or just chat about technology? 
                        You can schedule a specific time slot directly on my calendar.
                    </p>
                    
                    <a 
                        href="https://calendly.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-mono text-signal border-b border-signal/30 pb-0.5 hover:border-signal transition-all"
                    >
                        View Available Times <ArrowUpRight size={12} />
                    </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};