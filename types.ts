import React from 'react';

export enum SectionType {
  INTRO = 'INTRO',
  PROJECTS = 'PROJECTS',
  EXPERIENCE = 'EXPERIENCE',
  EDUCATION = 'EDUCATION',
  ALGORITHMS = 'ALGORITHMS',
  SYSTEMS = 'SYSTEMS',
  ACHIEVEMENTS = 'ACHIEVEMENTS',
  MENTORSHIP = 'MENTORSHIP',
  WRITING = 'WRITING',
  CONTACT = 'CONTACT'
}

export interface NavItem {
  id: SectionType;
  label: string;
  icon: React.ElementType;
}

export interface ExperienceRole {
  title: string;
  period: string;
  description: string[];
  tech?: string[];
}

export interface ExperienceItem {
  company: string;
  link?: string;
  location: string;
  roles: ExperienceRole[];
}

export interface EducationItem {
  institution: string;
  link?: string;
  degree: string;
  period: string;
  details: string[];
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
  category?: 'System' | 'Web' | 'AI' | 'Mobile' | 'Blockchain';
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface AchievementItem {
  title: string;
  organization: string;
  date: string;
  description: string;
  category: 'Competition' | 'Education' | 'Award';
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string; // Markdown-like text
  tags: string[];
  likes: number;
  nextPost?: { id: string; title: string };
  prevPost?: { id: string; title: string };
}

export interface MentorshipItem {
  id: string;
  organization: string;
  link?: string;
  role: string;
  description: string;
  stats?: { label: string; value: string }[];
}