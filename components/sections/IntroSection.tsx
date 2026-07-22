import React from 'react';
import { Mail, Linkedin, Github, Twitter, Send } from 'lucide-react';

export const IntroSection: React.FC = () => {
  const points = [
    <>Software Engineer with a strong focus on <span className="text-signal">scalable systems</span> and architecture.</>,
    <>Experienced in designing high-performance backend services and <span className="text-signal">infrastructure</span>.</>,
    <><span className="text-signal">Competitive Programmer</span>.</>,
    <>Committed to writing clean, maintainable code.</>,
  ];

  return (
    <div className="flex flex-col justify-center h-full max-w-4xl">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start mb-6">
          <img
            src="/mainpicfahmi-avatar.jpg"
            alt="Fahmi Dinsefa"
            className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border border-zinc-800 shadow-xl shrink-0 grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">
              Hi, I'm Fahmi.
            </h1>

            <div className="flex items-center justify-center md:justify-start gap-3 text-lg md:text-xl text-signal font-mono">
              <span className="text-zinc-500">{'>'}</span>
              <span>Software Engineer</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl text-zinc-200 font-medium mb-6">Professional Summary</h3>

        <ul className="space-y-4 text-zinc-300 text-base md:text-lg leading-relaxed font-light mb-10">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-4 group">
              {/* Shiny cyan bullet */}
              <span className="mt-2.5 w-2 h-2 rounded-full shrink-0 group-hover:scale-125 transition-transform duration-300 bg-zinc-500 group-hover:bg-signal"></span>
              <span className="group-hover:text-zinc-200 transition-colors">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 bg-zinc-900/30 border border-zinc-800 p-6 rounded-sm font-mono text-xs md:text-sm">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
              <div className="flex gap-4">
                 <span className="text-zinc-500 w-20 shrink-0">Focus</span>
                 <span className="text-signal">Systems & Backend</span>
              </div>
              <div className="flex gap-4">
                 <span className="text-zinc-500 w-20 shrink-0">Degree</span>
                 <span className="text-zinc-300">B.Sc. CSE & ECE</span>
              </div>
              <div className="flex gap-4">
                 <span className="text-zinc-500 w-20 shrink-0">Status</span>
                 <span className="text-zinc-300">Open to Work</span>
              </div>
           </div>
        </div>
        
        <div className="mt-8 flex flex-wrap gap-4">
           <a href="mailto:fahmidinsefa@gmail.com" className="flex items-center gap-2 text-zinc-500 hover:text-signal transition-colors text-sm font-mono px-4 py-2 border border-zinc-800 rounded-sm hover:border-signal/50">
              <Mail size={14} />
              <span>Email</span>
           </a>
           <a href="https://github.com/poricf" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-mono px-4 py-2 hover:bg-zinc-800/50 rounded-sm">
              <Github size={14} />
              <span>GitHub</span>
           </a>
           <a href="https://linkedin.com/in/porcif" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors text-sm font-mono px-4 py-2 hover:bg-zinc-800/50 rounded-sm">
              <Linkedin size={14} />
              <span>LinkedIn</span>
           </a>
           <a href="https://t.me/fahmi_dinsefa" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors text-sm font-mono px-4 py-2 hover:bg-zinc-800/50 rounded-sm">
              <Send size={14} />
              <span>Telegram</span>
           </a>
        </div>

      </div>
    </div>
  );
};