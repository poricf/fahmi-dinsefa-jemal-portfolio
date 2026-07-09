import React, { useState, useEffect } from 'react';
import { getFirestoreBlogs, getLocalBlogs } from '../../firebase';
import { BlogPost } from '../../types';
import { ArrowLeft, BookOpen, Search, X, Clock, Calendar, Hash, ChevronRight, AlignLeft, Terminal, Heart } from 'lucide-react';

// --- Utility: Generate ID from text ---
const generateId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// --- Dracula Theme Colors ---
const DRACULA = {
  bg: '#282a36',
  currentLine: '#44475a',
  foreground: '#f8f8f2',
  comment: '#6272a4',
  cyan: '#8be9fd',
  green: '#50fa7b',
  orange: '#ffb86c',
  pink: '#ff79c6',
  purple: '#bd93f9',
  red: '#ff5555',
  yellow: '#f1fa8c',
};

// --- Syntax Highlighter Component ---
const DraculaHighlighter: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const highlightCode = (input: string) => {
    if (!input) return null;
    const stringRegex = /(".*?")/g;
    const keywordRegex = /\b(fn|let|mut|if|else|return|pub|use|mod|struct|impl|match|for|in|while|loop|const)\b/g;
    const typeRegex = /\b(i32|u64|f64|bool|String|Option|Result|Vec|&str|u8|usize|u32)\b/g;
    const functionCallRegex = /\b([a-zA-Z0-9_]+)(?=\()/g;
    const macroRegex = /\b([a-zA-Z0-9_]+!)/g;

    return input.split('\n').map((line, i) => {
      let styledLine = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      if (styledLine.trim().startsWith('//')) {
         return <div key={i} style={{ color: DRACULA.comment }}>{styledLine}</div>;
      }

      styledLine = styledLine.replace(stringRegex, `<span style="color: ${DRACULA.yellow}">$1</span>`);
      styledLine = styledLine.replace(macroRegex, `<span style="color: ${DRACULA.pink}">$1</span>`);
      styledLine = styledLine.replace(keywordRegex, `<span style="color: ${DRACULA.pink}">$1</span>`);
      styledLine = styledLine.replace(typeRegex, `<span style="color: ${DRACULA.cyan}">$1</span>`);
      styledLine = styledLine.replace(functionCallRegex, (match) => {
         return `<span style="color: ${DRACULA.green}">${match}</span>`;
      });

      return <div key={i} dangerouslySetInnerHTML={{ __html: styledLine }} />;
    });
  };

  return (
    <div className="my-6 rounded-md overflow-hidden border border-zinc-700 shadow-2xl">
      <div className="bg-[#21222c] px-4 py-2 flex items-center gap-2 border-b border-[#6272a4]/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5555]"></div>
          <div className="w-3 h-3 rounded-full bg-[#f1fa8c]"></div>
          <div className="w-3 h-3 rounded-full bg-[#50fa7b]"></div>
        </div>
        <span className="ml-2 font-mono text-xs text-[#6272a4]">{language}</span>
      </div>
      <pre 
        className="p-4 overflow-x-auto text-sm md:text-base font-mono leading-relaxed" 
        style={{ backgroundColor: DRACULA.bg, color: DRACULA.foreground }}
      >
        <code>{highlightCode(code)}</code>
      </pre>
    </div>
  );
};

// --- Markdown Renderer ---
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-4 text-lg leading-relaxed text-zinc-300">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.split('\n');
          const language = lines[0].replace('```', '').trim() || 'text';
          const code = lines.slice(1, -1).join('\n');
          return <DraculaHighlighter key={index} code={code} language={language} />;
        }

        const lines = part.split('\n');
        return lines.map((line, lineIndex) => {
           const trimmed = line.trim();
           if (!trimmed) return <div key={`${index}-${lineIndex}`} className="h-2"></div>;

           if (line.startsWith('# ')) {
             const text = line.replace('# ', '');
             const id = generateId(text);
             return (
               <h3 id={id} key={`${index}-${lineIndex}`} className="text-2xl text-white font-medium mt-12 mb-6 block border-l-2 border-signal pl-4 scroll-mt-32">
                 {text}
               </h3>
             );
           }
           
           if (line.startsWith('## ')) {
             const text = line.replace('## ', '');
             return (
               <h4 key={`${index}-${lineIndex}`} className="text-xl text-zinc-100 font-medium mt-8 mb-4">
                 {text}
               </h4>
             );
           }

           if (trimmed.startsWith('- ')) {
              const text = trimmed.replace('- ', '');
              return (
                <div key={`${index}-${lineIndex}`} className="flex items-start gap-3 ml-4 mb-2">
                  <span className="text-signal mt-2.5 w-1.5 h-1.5 rounded-full bg-signal shrink-0"></span>
                  <p dangerouslySetInnerHTML={{ 
                      __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-signal font-semibold">$1</strong>') 
                  }} />
                </div>
              );
           }
           
           // Ordered list rough detection
           if (/^\d+\.\s/.test(trimmed)) {
               return (
                  <div key={`${index}-${lineIndex}`} className="flex items-start gap-3 ml-4 mb-2">
                     <span className="font-mono text-signal text-sm mt-1">{trimmed.split('.')[0]}.</span>
                     <p dangerouslySetInnerHTML={{
                         __html: trimmed.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-signal font-semibold">$1</strong>')
                     }} />
                  </div>
               )
           }

           if (line.startsWith('> ')) {
             return (
                 <blockquote key={`${index}-${lineIndex}`} className="border-l-4 border-signal pl-4 py-2 my-6 italic text-zinc-400 bg-zinc-900/30 rounded-r-lg">
                     {line.replace('> ', '')}
                 </blockquote>
             )
           }

           return (
             <p key={`${index}-${lineIndex}`} className="mb-4" dangerouslySetInnerHTML={{
                __html: line
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-signal font-semibold">$1</strong>')
                  .replace(/`(.*?)`/g, '<code class="font-mono text-xs bg-zinc-800 text-signal px-1.5 py-0.5 rounded border border-zinc-700">$1</code>')
                  .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-signal underline hover:text-white transition-colors">$1</a>')
             }} />
           );
        });
      })}
    </div>
  );
};

// --- Table of Contents Component ---
const TableOfContents: React.FC<{ content: string }> = ({ content }) => {
    const headers = content.split('\n')
        .filter(line => line.startsWith('# '))
        .map(line => line.replace('# ', ''));

    if (headers.length === 0) return null;

    const handleScrollTo = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="hidden lg:block sticky top-24 w-64 shrink-0 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
            <div className="bg-void-surface/50 border border-void-border p-5 rounded-sm backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    <AlignLeft size={14} />
                    <span>On this page</span>
                </div>
                <ul className="space-y-3">
                    {headers.map((header, idx) => (
                        <li key={idx}>
                            <a 
                                href={`#${generateId(header)}`}
                                onClick={(e) => handleScrollTo(e, generateId(header))}
                                className="text-sm text-zinc-400 hover:text-signal transition-colors flex items-center gap-2 group cursor-pointer"
                            >
                                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-signal shrink-0" />
                                <span className="group-hover:translate-x-1 transition-transform duration-200 line-clamp-1">{header}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// --- SINGLE POST TEMPLATE (The "Template") ---
// This component acts as the standalone page for a blog post.
interface SinglePostTemplateProps {
    post: BlogPost;
    onClose: () => void;
    onNavigate: (postId: string) => void;
}

const SinglePostTemplate: React.FC<SinglePostTemplateProps> = ({ post, onClose, onNavigate }) => {
    const [scrollProgress, setScrollProgress] = useState(0);

    // Handle Scroll Progress specific to this view
    useEffect(() => {
        const handleScroll = () => {
            const container = document.getElementById('blog-reader-container');
            if (container) {
                const totalHeight = container.scrollHeight - container.clientHeight;
                const progress = (container.scrollTop / totalHeight) * 100;
                setScrollProgress(progress);
            }
        };
        
        const container = document.getElementById('blog-reader-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
            // Reset to top when post changes
            container.scrollTop = 0;
        }
        return () => container?.removeEventListener('scroll', handleScroll);
    }, [post]);

    // Lock background scroll when reading a post
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    // findPost is unused but kept as a stub for compatibility
    const findPost = (id: string) => undefined;

    return (
        <div id="blog-reader-container" className="fixed inset-0 z-[100] bg-void overflow-y-auto overflow-x-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-void to-void scroll-smooth">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-signal z-[110] transition-all duration-150" style={{ width: `${scrollProgress}%` }}></div>

            {/* Floating Close Button */}
            <button 
                onClick={onClose}
                className="fixed top-6 right-6 z-[110] p-2 bg-void/80 backdrop-blur border border-zinc-700 text-zinc-400 hover:text-white hover:border-signal rounded-full transition-all group"
            >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                {/* Header Area */}
                <div className="max-w-3xl mx-auto mb-16 animate-in slide-in-from-bottom-4 duration-700">
                    <button 
                        onClick={onClose}
                        className="mb-8 flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-signal transition-colors uppercase tracking-widest group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                        Back to Knowledge Base
                    </button>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <span className="px-2 py-1 bg-signal/10 border border-signal/20 text-signal text-xs font-mono rounded flex items-center gap-2">
                            <Hash size={12} /> {post.category}
                        </span>
                        <span className="px-2 py-1 bg-zinc-800/50 border border-zinc-800 text-zinc-400 text-xs font-mono rounded flex items-center gap-2">
                            <Calendar size={12} /> {post.date}
                        </span>
                         <span className="px-2 py-1 bg-zinc-800/50 border border-zinc-800 text-zinc-400 text-xs font-mono rounded flex items-center gap-2">
                            <Clock size={12} /> {post.readTime}
                        </span>
                         <span className="px-2 py-1 bg-zinc-800/50 border border-zinc-800 text-red-400 text-xs font-mono rounded flex items-center gap-2">
                            <Heart size={12} fill="currentColor" /> {post.likes}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        {post.title}
                    </h1>
                    
                    <p className="text-xl text-zinc-400 font-light leading-relaxed border-l-2 border-zinc-700 pl-6">
                        {post.summary}
                    </p>
                </div>

                {/* Content Grid */}
                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Main Article Content */}
                    <article className="flex-1 max-w-3xl mx-auto animate-in slide-in-from-bottom-8 duration-700 delay-100 pb-32">
                         <div className="prose prose-invert prose-lg max-w-none">
                            <MarkdownRenderer content={post.content} />
                         </div>

                        {/* Navigation Buttons (Prev / Next) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 pt-12 border-t border-zinc-800">
                          {/* PREVIOUS */}
                          <div className="flex justify-start">
                            {post.prevPost ? (
                              <button 
                                onClick={() => onNavigate(post.prevPost!.id)}
                                className="group text-left p-6 w-full border border-zinc-800 hover:border-zinc-600 bg-void-surface/30 hover:bg-void-surface rounded-sm transition-all"
                              >
                                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-3 group-hover:text-signal transition-colors">
                                  <ArrowLeft size={12} /> PREVIOUS
                                </div>
                                <div className="text-zinc-300 group-hover:text-white font-medium text-lg leading-tight">
                                  {post.prevPost.title}
                                </div>
                              </button>
                            ) : (
                              <div className="hidden md:block"></div>
                            )}
                          </div>

                          {/* NEXT */}
                          <div className="flex justify-end">
                            {post.nextPost ? (
                              <button 
                                onClick={() => onNavigate(post.nextPost!.id)}
                                className="group text-right p-6 w-full border border-zinc-800 hover:border-zinc-600 bg-void-surface/30 hover:bg-void-surface rounded-sm transition-all"
                              >
                                <div className="flex items-center justify-end gap-2 text-xs font-mono text-zinc-500 mb-3 group-hover:text-signal transition-colors">
                                  NEXT <ArrowLeft size={12} className="rotate-180"/>
                                </div>
                                <div className="text-zinc-300 group-hover:text-white font-medium text-lg leading-tight">
                                  {post.nextPost.title}
                                </div>
                              </button>
                            ) : (
                              <div className="hidden md:block"></div>
                            )}
                          </div>
                        </div>

                         {/* Article Tags Footer */}
                         <div className="mt-12 flex flex-wrap gap-2">
                            <span className="text-xs font-mono text-zinc-500 mr-2 mt-1">TAGS:</span>
                            {post.tags.map(tag => (
                                <span key={tag} className="text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded hover:border-zinc-600 transition-colors cursor-default">
                                    #{tag}
                                </span>
                            ))}
                         </div>
                    </article>

                    {/* Sidebar (TOC) - Only exists in this Template */}
                    <TableOfContents content={post.content} />
                </div>
            </div>
        </div>
    );
};

// --- MAIN BLOG SECTION ---
export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  useEffect(() => {
    let active = true;
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await getFirestoreBlogs();
        if (active) {
          setPosts(data);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Error fetching blogs from Firestore, falling back to local cache:', err);
        if (active) {
          const cachedBlogs = getLocalBlogs();
          setPosts(cachedBlogs);
          setLoading(false);
        }
      }
    };
    loadPosts();
    return () => {
      active = false;
    };
  }, []);

  const categories = ['All', 'System Design', 'CP', 'Mentorship', 'Life', 'Rust'];
  
  const filteredPosts = posts.filter(post => {
    const matchesCategory = filter === 'All' || post.category === filter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNavigate = (id: string) => {
      const post = posts.find(p => p.id === id);
      if (post) setSelectedPost(post);
  };

  // If a post is selected, render the Single Post Template on top
  if (selectedPost) {
    return (
        <SinglePostTemplate 
            post={selectedPost} 
            onClose={() => setSelectedPost(null)}
            onNavigate={handleNavigate}
        />
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl py-12 flex flex-col items-center justify-center gap-4 text-zinc-500">
        <div className="w-8 h-8 rounded-full border-2 border-zinc-700 border-t-signal animate-spin"></div>
        <p className="font-mono text-xs">Querying Firestore index...</p>
      </div>
    );
  }

  // Otherwise, render the Blog List (Gallery)
  return (
    <div className="max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-zinc-800 pb-6">
        <div>
          <h2 className="text-2xl font-light text-white flex items-center gap-3 mb-4">
            <BookOpen size={20} className="text-zinc-600"/>
            The Log
          </h2>
          
          <div className="relative group">
             <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 group-focus-within:text-signal transition-colors"/>
             <input 
              type="text" 
              placeholder="Search thoughts, tutorials, rants..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-void-surface border border-void-border rounded-sm py-2 pl-9 pr-4 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-signal w-full md:w-64 transition-all"
             />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-end">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-[10px] font-mono border transition-all rounded-sm uppercase tracking-wider
                ${filter === cat 
                  ? 'border-signal text-signal bg-signal/10' 
                  : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-void-surface'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => setSelectedPost(post)}
              className="group relative bg-void-surface border border-void-border p-8 cursor-pointer hover:border-zinc-700 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowLeft className="rotate-180 text-signal" size={20} />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] text-signal uppercase tracking-widest border border-signal/20 px-2 py-0.5 rounded-full bg-signal/5">
                    {post.category}
                </span>
                <span className="font-mono text-[10px] text-zinc-600">
                    {post.date} • {post.readTime} read
                </span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-zinc-600 ml-auto group-hover:text-red-400 transition-colors">
                    <Heart size={10} fill="currentColor" /> {post.likes}
                </span>
              </div>
              
              <h3 className="text-2xl font-medium text-zinc-100 group-hover:text-white mb-3 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-2xl mb-6 group-hover:text-zinc-300 transition-colors">
                {post.summary}
              </p>
              
              <div className="flex gap-2">
                 {post.tags.map(tag => (
                   <span key={tag} className="text-[10px] font-mono text-zinc-600">
                     #{tag}
                   </span>
                 ))}
              </div>
            </div>
          ))
        ) : (
          <div className="p-16 text-center bg-void-surface border border-dashed border-zinc-800 rounded-sm">
            <p className="text-zinc-500 font-mono text-sm">No posts found.</p>
            <button onClick={() => {setFilter('All'); setSearchQuery('');}} className="mt-4 text-signal text-xs hover:underline">
                Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};