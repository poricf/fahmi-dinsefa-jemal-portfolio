import React from 'react';
import { ExternalLink, Trophy, Target, BarChart3, TrendingUp } from 'lucide-react';

export const AlgorithmsSection: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in duration-500">
      <div className="mb-12 border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-light text-white">Competitive Programming</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Clean Stats Profiles */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Profiles & Stats</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Codeforces */}
            <a 
              href="https://codeforces.com/profile/porcif" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-void-surface border border-void-border p-4 rounded-sm hover:border-zinc-700 transition-colors group flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 size={14} className="text-zinc-400" />
                  <span className="text-xs font-mono text-zinc-300">Codeforces</span>
                </div>
                <ExternalLink size={10} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>
              <div>
                <div className="text-lg font-mono text-white font-medium">Expert</div>
                <div className="text-[11px] text-zinc-500 font-mono">Max: 1687 · 740 Solved</div>
              </div>
            </a>

            {/* LeetCode */}
            <a 
              href="https://leetcode.com/u/porcif" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-void-surface border border-void-border p-4 rounded-sm hover:border-zinc-700 transition-colors group flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Trophy size={14} className="text-zinc-400" />
                  <span className="text-xs font-mono text-zinc-300">LeetCode</span>
                </div>
                <ExternalLink size={10} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>
              <div>
                <div className="text-lg font-mono text-white font-medium">Rating: 1549</div>
                <div className="text-[11px] text-zinc-500 font-mono">759 Solved</div>
              </div>
            </a>

            {/* Kattis */}
            <a 
              href="https://open.kattis.com/users/poricf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-void-surface border border-void-border p-4 rounded-sm hover:border-zinc-700 transition-colors group flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Target size={14} className="text-zinc-400" />
                  <span className="text-xs font-mono text-zinc-300">Kattis</span>
                </div>
                <ExternalLink size={10} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>
              <div>
                <div className="text-lg font-mono text-white font-medium">Score: 212</div>
                <div className="text-[11px] text-zinc-500 font-mono">Active Profile</div>
              </div>
            </a>

            {/* AtCoder */}
            <a 
              href="https://atcoder.jp/users/poricf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-void-surface border border-void-border p-4 rounded-sm hover:border-zinc-700 transition-colors group flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-zinc-400" />
                  <span className="text-xs font-mono text-zinc-300">AtCoder</span>
                </div>
                <ExternalLink size={10} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>
              <div>
                <div className="text-lg font-mono text-white font-medium">Profile</div>
                <div className="text-[11px] text-zinc-500 font-mono">@poricf</div>
              </div>
            </a>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Contest Highlights</h3>
          <div className="bg-void-surface border border-void-border p-6 rounded-sm h-[202px] flex flex-col justify-center">
            <ul className="space-y-4 text-zinc-300">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0"></span>
                <span className="font-mono text-sm">ACPC Finalist</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0"></span>
                <span className="font-mono text-sm">Top 4 Regional National CP Contest</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0"></span>
                <span className="font-mono text-sm">Rank 1 ASTU Team Contest</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};