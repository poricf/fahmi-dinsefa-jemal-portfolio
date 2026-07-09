import React, { useState } from 'react';
import { projects, projectLogs } from '../../data';
import { ArrowUpRight, Github, Terminal, Database, Lock, Unlock } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [showLogs, setShowLogs] = useState<boolean>(false);
  const categories = ['All', 'System', 'Web', 'Mobile'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="max-w-5xl">
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-light text-white">Projects</h2>
        <div className="flex gap-1 bg-void-surface p-1 rounded-sm border border-void-border">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider transition-all rounded-sm
                ${filter === cat 
                  ? 'bg-zinc-800 text-white shadow-sm' 
                  : 'text-zinc-600 hover:text-zinc-400'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {filteredProjects.map((project, idx) => (
          <div key={idx} className="group relative bg-void-surface border border-void-border p-6 min-h-[240px] flex flex-col justify-between hover:bg-zinc-900 transition-colors">
            {/* Corner Brackets on Hover */}
            <div className="corner-bracket tl"></div>
            <div className="corner-bracket tr"></div>
            <div className="corner-bracket bl"></div>
            <div className="corner-bracket br"></div>

            <div>
              <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-signal"/>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{project.category}</span>
                 </div>
                 <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.repo && <a href={project.repo} className="text-zinc-400 hover:text-white"><Github size={16}/></a>}
                    {project.link && <a href={project.link} className="text-zinc-400 hover:text-white"><ArrowUpRight size={16}/></a>}
                 </div>
              </div>
              
              <h3 className="text-xl text-zinc-100 font-medium mb-2">{project.title}</h3>
              <p className="text-xs text-zinc-500 font-mono mb-3">{project.subtitle}</p>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-2 mt-auto pt-4 border-t border-zinc-800/50">
              {project.tech.map((tech) => (
                <span key={tech} className="text-[10px] font-mono text-zinc-600 group-hover:text-signal transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* OTHER PROJECTS TOGGLE */}
      <div className="border-t border-dashed border-zinc-800 pt-8 pb-8">
        <button 
          onClick={() => setShowLogs(!showLogs)}
          className="w-full flex items-center justify-center gap-2 py-4 text-xs font-mono text-zinc-600 hover:text-signal transition-colors hover:bg-void-surface/50 border border-transparent hover:border-zinc-800"
        >
          {showLogs ? <Unlock size={14} /> : <Lock size={14} />}
          <span>{showLogs ? "Hide Experiments & Other Work" : "View Experiments & Other Work"}</span>
        </button>
      </div>

      {/* HIDDEN PROJECTS SECTION */}
      {showLogs && (
        <div className="animate-in slide-in-from-top-4 fade-in duration-500">
           <div className="flex items-center gap-2 mb-6 opacity-50">
             <Database size={14} className="text-signal" />
             <span className="font-mono text-xs text-signal uppercase tracking-widest">Experiments & Other Work</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectLogs.map((log, idx) => (
                <div key={idx} className="bg-void border border-zinc-900 p-4 opacity-75 hover:opacity-100 transition-opacity">
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-mono text-zinc-300">{log.title}</h4>
                      {log.repo && <a href={log.repo} className="text-zinc-600 hover:text-white"><Github size={12}/></a>}
                   </div>
                   <p className="text-[11px] text-zinc-500 leading-normal mb-3">{log.description}</p>
                   <div className="flex flex-wrap gap-1">
                      {log.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-[9px] text-zinc-700 font-mono border border-zinc-900 px-1">{t}</span>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};