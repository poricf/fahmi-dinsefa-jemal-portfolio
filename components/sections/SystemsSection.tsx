import React from 'react';
import { skillCategories } from '../../data';

export const SystemsSection: React.FC = () => {
  return (
    <div className="max-w-4xl">
       <div className="mb-12 border-b border-zinc-800 pb-4 flex justify-between items-end">
        <h2 className="text-2xl font-light text-white">Skills</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="bg-void-surface/50 border border-void-border p-6 font-mono text-sm">
            <div className="text-zinc-500 mb-4 text-xs uppercase tracking-widest border-b border-zinc-800 pb-2">
              {category.title}
            </div>
            <div className="space-y-2">
              {category.skills.map((skill) => (
                <div key={skill} className="flex items-center gap-3 group cursor-default">
                  <span className="text-zinc-700 group-hover:text-signal transition-colors">{'>'}</span>
                  <span className="text-zinc-300 group-hover:text-white transition-colors">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};