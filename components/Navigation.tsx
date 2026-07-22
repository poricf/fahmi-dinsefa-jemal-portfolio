import React from 'react';
import { NavItem, SectionType } from '../types';
import { useLocation } from 'wouter';

interface NavigationProps {
  activeSection: string;
  onSelect: (section: string) => void;
}

const navItems: { id: string, label: string, isRoute?: boolean, subdomain?: 'blog' | 'ama' }[] = [
  { id: SectionType.INTRO, label: 'Home' },
  { id: SectionType.PROJECTS, label: 'Projects' },
  { id: SectionType.EXPERIENCE, label: 'Experience' },
  { id: SectionType.EDUCATION, label: 'Education' },
  { id: SectionType.ALGORITHMS, label: 'CP' },
  { id: SectionType.SYSTEMS, label: 'Skills' },
  { id: SectionType.ACHIEVEMENTS, label: 'Honors' },
  { id: SectionType.MENTORSHIP, label: 'Mentorship' },
  { id: SectionType.CONTACT, label: 'Contact' },
  { id: '/blog', label: 'Blog', isRoute: true, subdomain: 'blog' },
  { id: '/ama', label: 'AMA', isRoute: true, subdomain: 'ama' },
];

const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
const currentSubdomain: 'blog' | 'ama' | 'main' = hostname.startsWith('blog.')
  ? 'blog'
  : hostname.startsWith('ama.')
  ? 'ama'
  : 'main';

const SUBDOMAIN_URLS: Record<'blog' | 'ama', string> = {
  blog: 'https://blog.fahmidinsefa.com',
  ama: 'https://ama.fahmidinsefa.com',
};
const MAIN_SITE_URL = 'https://fahmidinsefa.com';

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onSelect }) => {
  const [location, setLocation] = useLocation();

  const handleSelect = (item: typeof navItems[0]) => {
    if (item.isRoute && item.subdomain) {
      // Blog/AMA each live on their own subdomain, so this is a real cross-domain navigation.
      if (currentSubdomain !== item.subdomain) window.location.href = SUBDOMAIN_URLS[item.subdomain];
      return;
    }
    if (currentSubdomain !== 'main') {
      // Sections only exist on the main site; send the browser there.
      window.location.href = MAIN_SITE_URL;
      return;
    }
    if (location !== '/') {
      setLocation('/');
      // Need a slight delay to allow rendering the home page before scrolling
      setTimeout(() => onSelect(item.id), 100);
    } else {
      onSelect(item.id);
    }
  };

  return (
    <nav className="flex flex-col space-y-1 relative">
      {/* Background Line */}
      <div className="absolute left-[5px] top-4 bottom-4 w-px bg-void-border z-0"></div>

      {navItems.map((item) => {
        const isActive = item.subdomain
          ? currentSubdomain === item.subdomain
          : (currentSubdomain === 'main' && location === '/' && activeSection === item.id);
        return (
          <button
            key={item.id}
            onClick={() => handleSelect(item)}
            className="group relative flex items-center space-x-4 py-2 z-10 w-full text-left focus:outline-none"
          >
            <div className={`
              w-[11px] h-[11px] rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-void
              ${isActive ? 'border-signal scale-110' : 'border-void-border group-hover:border-zinc-500'}
            `}>
              {isActive && <div className="w-[3px] h-[3px] bg-signal rounded-full"></div>}
            </div>
            
            <span className={`
              font-mono text-sm transition-colors duration-300
              ${isActive ? 'text-signal' : 'text-zinc-500 group-hover:text-zinc-300'}
            `}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};