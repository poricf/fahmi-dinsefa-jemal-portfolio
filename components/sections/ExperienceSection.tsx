import React from 'react';
import { experiences } from '../../data';
import { ArrowUpRight } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-12 border-b border-zinc-800 pb-4 flex justify-between items-end">
        <h2 className="text-2xl font-light text-white">Experience</h2>
      </div>

      <div className="relative space-y-0">
        {/* Timeline Line */}
        <div className="absolute left-[7px] top-2 bottom-0 w-px bg-zinc-800 z-0"></div>

        {experiences.map((companyData, idx) => (
          <div key={idx} className="relative pl-10 pb-16 last:pb-0">
            {/* Git Node */}
            <div className="absolute left-0 top-2 w-[15px] h-[15px] bg-void border-2 border-zinc-700 rounded-full z-10 flex items-center justify-center">
               <div className="w-[5px] h-[5px] bg-zinc-500 rounded-full"></div>
            </div>
            
            {/* Content Card */}
            <div className="group">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                <div>
                   <div className="flex items-center gap-2">
                     {companyData.link ? (
                       <a 
                        href={companyData.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xl text-zinc-100 font-medium hover:text-signal transition-colors flex items-center gap-2"
                       >
                         {companyData.company}
                         <ArrowUpRight size={14} className="opacity-50" />
                       </a>
                     ) : (
                       <h3 className="text-xl text-zinc-100 font-medium">{companyData.company}</h3>
                     )}
                   </div>
                   <span className="font-mono text-xs text-signal mt-1 block">{companyData.location}</span>
                </div>
              </div>

              <div className="space-y-8">
                {companyData.roles.map((role, rIdx) => (
                  <div key={rIdx} className="relative bg-void-surface/50 border border-void-border p-6 rounded-sm hover:border-zinc-700 transition-colors">
                    {/* Hover Corners */}
                    <div className="corner-bracket tl"></div>
                    <div className="corner-bracket tr"></div>
                    <div className="corner-bracket bl"></div>
                    <div className="corner-bracket br"></div>

                    <div className="flex justify-between items-start mb-4">
                       <h4 className="text-zinc-200 font-medium">{role.title}</h4>
                       <span className="font-mono text-xs text-zinc-500 bg-void px-2 py-1 rounded border border-void-border">{role.period}</span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {role.description.map((item, i) => (
                        <li key={i} className="text-zinc-400 text-sm font-light leading-relaxed flex items-start">
                          <span className="mr-3 text-zinc-700 mt-1">::</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {role.tech && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/50">
                        {role.tech.map(t => (
                          <span key={t} className="text-[10px] font-mono text-zinc-500">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};