import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { Navigation } from './components/Navigation';
import { IntroSection } from './components/sections/IntroSection';
import { SystemsSection } from './components/sections/SystemsSection';
import { AlgorithmsSection } from './components/sections/AlgorithmsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { MentorshipSection } from './components/sections/MentorshipSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { ContactSection } from './components/sections/ContactSection';
import { BlogPage } from './components/pages/BlogPage';
import { AMAPage } from './components/pages/AMAPage';
import { AIChat } from './components/AIChat';
import { SectionType } from './types';
import { Menu, X, Github, Linkedin, Twitter, Send } from 'lucide-react';

const HomePage = () => (
  <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 space-y-48">
    <section id={SectionType.INTRO} className="min-h-[80vh] flex flex-col justify-center scroll-mt-24">
      <IntroSection />
    </section>
    
    <section id={SectionType.PROJECTS} className="scroll-mt-24">
      <div className="mb-12 flex items-center gap-4 opacity-50">
        <span className="font-mono text-xs text-signal">01</span>
        <div className="h-px bg-zinc-800 w-16"></div>
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Projects</span>
      </div>
      <ProjectsSection />
    </section>

    <section id={SectionType.EXPERIENCE} className="scroll-mt-24">
      <div className="mb-12 flex items-center gap-4 opacity-50">
        <span className="font-mono text-xs text-signal">02</span>
        <div className="h-px bg-zinc-800 w-16"></div>
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Experience</span>
      </div>
      <ExperienceSection />
    </section>

    <section id={SectionType.EDUCATION} className="scroll-mt-24">
      <div className="mb-12 flex items-center gap-4 opacity-50">
        <span className="font-mono text-xs text-signal">03</span>
        <div className="h-px bg-zinc-800 w-16"></div>
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Education</span>
      </div>
      <EducationSection />
    </section>

    <section id={SectionType.ALGORITHMS} className="scroll-mt-24">
      <div className="mb-12 flex items-center gap-4 opacity-50">
        <span className="font-mono text-xs text-signal">04</span>
        <div className="h-px bg-zinc-800 w-16"></div>
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">CP</span>
      </div>
      <AlgorithmsSection />
    </section>

    <section id={SectionType.SYSTEMS} className="scroll-mt-24">
      <div className="mb-12 flex items-center gap-4 opacity-50">
        <span className="font-mono text-xs text-signal">05</span>
        <div className="h-px bg-zinc-800 w-16"></div>
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Skills</span>
      </div>
      <SystemsSection />
    </section>

    <section id={SectionType.ACHIEVEMENTS} className="scroll-mt-24">
      <div className="mb-12 flex items-center gap-4 opacity-50">
        <span className="font-mono text-xs text-signal">06</span>
        <div className="h-px bg-zinc-800 w-16"></div>
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Honors</span>
      </div>
      <AchievementsSection />
    </section>

    <section id={SectionType.MENTORSHIP} className="scroll-mt-24">
      <div className="mb-12 flex items-center gap-4 opacity-50">
        <span className="font-mono text-xs text-signal">07</span>
        <div className="h-px bg-zinc-800 w-16"></div>
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Mentorship</span>
      </div>
      <MentorshipSection />
    </section>

    <section id={SectionType.CONTACT} className="scroll-mt-24">
      <div className="mb-12 flex items-center gap-4 opacity-50">
        <span className="font-mono text-xs text-signal">08</span>
        <div className="h-px bg-zinc-800 w-16"></div>
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Contact</span>
      </div>
      <ContactSection />
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

const isBlogHost = typeof window !== 'undefined' && window.location.hostname.startsWith('blog.');
const isAmaHost = typeof window !== 'undefined' && window.location.hostname.startsWith('ama.');

function App() {
  const [activeSection, setActiveSection] = useState<string>(SectionType.INTRO);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  // Intersection Observer for updating active section on scroll
  useEffect(() => {
    if (location !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the intersection entry that is most visible
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio to get the most visible element
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      { threshold: [0.2, 0.5] }
    );

    Object.values(SectionType).forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location]);

  const handleNavSelect = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-void text-zinc-300 font-sans selection:bg-signal/20 selection:text-signal">
      <div className="bg-noise"></div>
      
      {/* Top Status Bar (Mobile & Desktop) */}
      <div className="fixed top-0 left-0 right-0 h-12 border-b border-void-border bg-void/80 backdrop-blur-sm z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 select-none">
            <div className="w-2 h-2 bg-signal rounded-full animate-pulse"></div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Fahmi Dinsefa</span>
          </div>
        </div>
        <div className="flex items-center gap-4 md:hidden">
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
           </button>
        </div>
        <div className="hidden md:flex items-center gap-6 font-mono text-[10px] text-zinc-600">
        </div>
      </div>

      <div className="flex pt-12 min-h-screen">
        {/* Left Sidebar (Console Navigation) */}
        <aside className={`
          fixed inset-y-0 left-0 w-64 bg-void border-r border-void-border z-40 transform transition-transform duration-300 pt-12 md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-8 h-full overflow-y-auto pb-32">
            <h1 
              className="text-xl font-bold text-white tracking-tight mb-1 select-none"
              title="Fahmi Dinsefa"
            >
              Fahmi Dinsefa
            </h1>
            <p 
              className="text-xs font-mono text-zinc-500 mb-8 select-none"
            >
              Software Engineer
            </p>
            <Navigation 
              activeSection={activeSection} 
              onSelect={handleNavSelect} 
            />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-void-border bg-void">
            <div className="flex gap-6 text-zinc-600">
               <a href="https://github.com/poricf" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={18} /></a>
               <a href="https://linkedin.com/in/porcif" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><Linkedin size={18} /></a>
               <a href="https://x.com/fahmi_khandro" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Twitter size={18} /></a>
               <a href="https://t.me/fahmi_dinsefa" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><Send size={18} /></a>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 relative w-full">
          <Switch>
            {isBlogHost ? (
              // blog.fahmidinsefa.com serves the blog at its root
              <Route component={BlogPage} />
            ) : isAmaHost ? (
              // ama.fahmidinsefa.com serves the AMA form at its root
              <Route component={AMAPage} />
            ) : (
              <>
                <Route path="/blog" component={BlogPage} />
                <Route path="/" component={HomePage} />
                {/* Catch-all */}
                <Route component={HomePage} />
              </>
            )}
          </Switch>
        </main>
      </div>

      {/* AI Chatbot Overlay */}
      <AIChat />
    </div>
  );
}

export default App;