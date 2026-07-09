import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <div className="max-w-xl">
      <div className="mb-12 border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-light text-white">Contact</h2>
      </div>
      
      <p className="text-zinc-400 mb-8 font-light leading-relaxed">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
        Feel free to reach out via email or connect with me on professional networks.
      </p>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href = 'mailto:fahmidinsefa@gmail.com'; }}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full bg-void-surface border border-void-border rounded-sm px-4 py-3 text-zinc-300 focus:outline-none focus:border-signal/50 focus:ring-1 focus:ring-signal/50 transition-all font-light"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full bg-void-surface border border-void-border rounded-sm px-4 py-3 text-zinc-300 focus:outline-none focus:border-signal/50 focus:ring-1 focus:ring-signal/50 transition-all font-light"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Message</label>
            <textarea 
              id="message" 
              rows={4}
              className="w-full bg-void-surface border border-void-border rounded-sm px-4 py-3 text-zinc-300 focus:outline-none focus:border-signal/50 focus:ring-1 focus:ring-signal/50 transition-all font-light resize-none"
              placeholder="How can I help you?"
            ></textarea>
          </div>
        </div>

        <button 
          type="submit"
          className="group flex items-center justify-center gap-2 w-full sm:w-auto bg-zinc-100 text-void px-8 py-3 rounded-sm font-medium hover:bg-white transition-colors"
        >
          <span>Send Message</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
      
      <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col">
           <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Direct Email</span>
           <a href="mailto:fahmidinsefa@gmail.com" className="text-zinc-300 hover:text-signal transition-colors flex items-center gap-2">
             <Mail size={14} /> fahmidinsefa@gmail.com
           </a>
        </div>
      </div>
    </div>
  );
};
