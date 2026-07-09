import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Minimize2, AlertTriangle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { getPortfolioContext } from '../data';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello. I'm Fahmi's portfolio AI. How can I assist you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Exposed function for external trigger "Contact me" etc.
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || import.meta.env.VITE_GEMINI_API_KEY });
      
      const portfolioContext = getPortfolioContext();

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            ...messages.map(m => ({ 
                role: m.role, 
                parts: [{ text: m.text }] 
            })),
            { role: 'user', parts: [{ text: userMessage }]}
        ],
        config: {
          systemInstruction: `You are the AI assistant for Fahmi Dinsefa Jemal's portfolio website.
          
          PORTFOLIO DATA:
          ${portfolioContext}

          CORE RULES:
          1. Answer questions based on the PORTFOLIO DATA provided.
          2. Be helpful, professional, yet a bit witty (aligning with Fahmi's style).
          3. If someone asks for contact info, provide his email (fahmidinsefa@gmail.com) and LinkedIn link.
          4. Keep answers concise and strictly relevant to his professional expertise (Systems, Backend, CP, etc.).
          5. Do not repeat facts excessively. Make responses engaging. 
          6. If a question goes beyond the provided data, specify that you only have information on his professional portfolio.`,
        }
      });

      const text = response.text;
      if (text) {
          setMessages(prev => [...prev, { role: 'model', text: text }]);
      } else {
          setMessages(prev => [...prev, { role: 'model', text: "Hmm, I didn't get that. Could you rephrase?" }]);
      }

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to AI backend. Please try again later or contact Fahmi directly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(prev => !prev)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 group
          ${isOpen 
            ? 'bg-zinc-800 text-zinc-400 rotate-90' 
            : 'bg-void-surface border border-signal/20 text-signal hover:border-signal hover:shadow-signal/20'
          }`}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="group-hover:animate-pulse" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[500px] bg-void border border-void-border shadow-2xl rounded-sm z-50 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-void-border bg-void-surface/50">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-signal/80 rounded-full animate-pulse"></div>
               <span className="font-mono text-sm text-zinc-400">Assistant (AI)</span>
             </div>
             <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
               <Minimize2 size={16} />
             </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 text-sm rounded-sm leading-relaxed whitespace-pre-wrap
                  ${msg.role === 'user' 
                    ? 'bg-zinc-800 text-zinc-200 border border-zinc-700' 
                    : 'bg-void-surface text-zinc-300 border border-void-border'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-void-surface border border-void-border p-3 rounded-sm">
                    <Loader2 size={16} className="animate-spin text-zinc-600" />
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-void-border bg-void-surface/30">
            <div className="flex gap-2">
               <input 
                 type="text" 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 placeholder="Ask me something..."
                 className="flex-1 bg-void border border-void-border p-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
               />
               <button 
                 onClick={handleSend}
                 disabled={isLoading || !input.trim()}
                 className="p-2 bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 disabled:opacity-50 transition-colors border border-zinc-700 rounded-sm"
               >
                 <Send size={18} />
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};