import React, { useState } from 'react';
import { Send, CheckCircle2, EyeOff } from 'lucide-react';
import { submitAmaQuestion, AMA_QUESTION_MAX_LENGTH } from '../../firebase';

const COOLDOWN_KEY = 'ama_last_submitted_at';
const COOLDOWN_MS = 30_000;

export const AMAPage: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lastSubmitted = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
    if (Date.now() - lastSubmitted < COOLDOWN_MS) {
      setStatus('error');
      setErrorMessage('Please wait a moment before sending another question.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    try {
      await submitAmaQuestion(question);
      localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      setQuestion('');
      setStatus('sent');
    } catch (err) {
      console.error('Failed to submit AMA question:', err);
      setStatus('error');
      setErrorMessage('Something went wrong sending your question. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-24 md:py-32 min-h-screen flex flex-col justify-center">
      <div className="mb-10">
        <div className="mb-6 flex items-center gap-4 opacity-50">
          <div className="h-px bg-zinc-800 w-16"></div>
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Ask Me Anything</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Ask me anything.
        </h1>
        <p className="text-zinc-400 font-light leading-relaxed flex items-start gap-2">
          <EyeOff size={16} className="mt-1 shrink-0 text-signal" />
          <span>
            Fully anonymous — I can't see who asked, and there's no way for anyone (including
            you) to read a question back once it's sent.
          </span>
        </p>
      </div>

      {status === 'sent' ? (
        <div className="border border-signal/30 bg-signal/5 rounded-sm p-6 flex items-start gap-3">
          <CheckCircle2 size={20} className="text-signal shrink-0 mt-0.5" />
          <div>
            <p className="text-zinc-200 font-medium mb-1">Sent.</p>
            <p className="text-zinc-400 text-sm font-light">
              Thanks for the question — I'll get to it.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 font-mono text-xs text-signal hover:text-white transition-colors"
            >
              Ask another →
            </button>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <textarea
              id="question"
              rows={5}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={AMA_QUESTION_MAX_LENGTH}
              required
              className="w-full bg-void-surface border border-void-border rounded-sm px-4 py-3 text-zinc-300 focus:outline-none focus:border-signal/50 focus:ring-1 focus:ring-signal/50 transition-all font-light resize-none"
              placeholder="What do you want to ask?"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-600">
                {question.length}/{AMA_QUESTION_MAX_LENGTH}
              </span>
              {status === 'error' && (
                <span className="font-mono text-[10px] text-red-400">{errorMessage}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting' || question.trim().length === 0}
            className="group flex items-center justify-center gap-2 w-full sm:w-auto bg-zinc-100 text-void px-8 py-3 rounded-sm font-medium hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>{status === 'submitting' ? 'Sending…' : 'Send Anonymously'}</span>
            <Send size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      )}
    </div>
  );
};
