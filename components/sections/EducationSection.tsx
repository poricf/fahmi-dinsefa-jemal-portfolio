import React, { useState } from 'react';
import { education, educationHistory } from '../../data';
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="max-w-3xl">
      <div className="mb-12 border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-light text-white">Education</h2>
      </div>

      <div className="space-y-12">
        {education.map((edu, idx) => (
          <div key={idx} className="relative pl-8 border-l border-zinc-800">
             <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] bg-void border border-zinc-600 rounded-full"></div>
             
             <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                {edu.link ? (
                  <a href={edu.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg text-zinc-100 font-medium hover:text-signal transition-colors">
                    {edu.institution}
                    <ArrowUpRight size={14} className="opacity-50" />
                  </a>
                ) : (
                  <h3 className="text-lg text-zinc-100 font-medium">{edu.institution}</h3>
                )}
                <span className="font-mono text-xs text-zinc-500 mt-1 md:mt-0">{edu.period}</span>
             </div>
             
             <p className="text-signal text-sm mb-4 font-mono">{edu.degree}</p>
             
             <ul className="space-y-1">
               {edu.details.map((detail, i) => (
                 <li key={i} className="text-zinc-400 text-sm font-light">
                   {detail}
                 </li>
               ))}
             </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-dashed border-zinc-800">
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-signal transition-colors"
        >
          {showHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          <span>{showHistory ? "Hide Early Education" : "Show Early Education"}</span>
        </button>

        {showHistory && (
          <div className="mt-8 space-y-8 animate-in slide-in-from-top-4 fade-in duration-500">
             {educationHistory.map((edu, idx) => (
              <div key={idx} className="relative pl-8 border-l border-zinc-800/50">
                 <div className="absolute -left-[3px] top-2 w-[5px] h-[5px] bg-zinc-700 rounded-full"></div>
                 
                 <div className="flex flex-col md:flex-row justify-between items-start mb-1 opacity-75">
                    <h3 className="text-base text-zinc-300 font-medium">{edu.institution}</h3>
                    <span className="font-mono text-[10px] text-zinc-600">{edu.period}</span>
                 </div>
                 
                 <p className="text-zinc-500 text-xs mb-2 font-mono">{edu.degree}</p>
                 
                 <ul className="space-y-1">
                   {edu.details.map((detail, i) => (
                     <li key={i} className="text-zinc-600 text-xs font-light">
                       {detail}
                     </li>
                   ))}
                 </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};