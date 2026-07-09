import React from 'react';
import { achievements } from '../../data';
import { ArrowUpRight } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-light text-white">Honors & Awards</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {achievements.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b border-zinc-900 hover:bg-void-surface transition-colors group">
             <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                   {item.link ? (
                     <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-medium text-zinc-200 group-hover:text-signal transition-colors hover:underline">
                       {item.title}
                       <ArrowUpRight size={12} className="opacity-50" />
                     </a>
                   ) : (
                     <h3 className="text-base font-medium text-zinc-200 group-hover:text-white transition-colors">{item.title}</h3>
                   )}
                   <span className="text-[9px] font-mono text-signal border border-signal/20 px-1 rounded uppercase">{item.category}</span>
                </div>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  {item.description}
                </p>
             </div>
             <div className="mt-2 md:mt-0 md:text-right shrink-0">
                <div className="font-mono text-xs text-zinc-400">{item.organization}</div>
                <div className="font-mono text-[10px] text-zinc-600">{item.date}</div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};