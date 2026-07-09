import React from 'react';
import { BlogSection } from '../sections/BlogSection';

export const BlogPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 space-y-24 min-h-screen">
      <section className="mt-8">
        <div className="mb-12 flex items-center gap-4 opacity-50">
          <div className="h-px bg-zinc-800 w-16"></div>
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Technical Blog</span>
        </div>
        <BlogSection />
      </section>

      {/* Footer Mark */}
      <div className="mt-32 pt-12 border-t border-void-border flex justify-between items-end font-mono text-[10px] text-zinc-500">
        <div>
           <p>© {new Date().getFullYear()} FAHMI DINSEFA</p>
        </div>
        <div className="text-right flex flex-col items-end gap-2">
           <p>SOFTWARE ENGINEER</p>
        </div>
      </div>
    </div>
  );
};
