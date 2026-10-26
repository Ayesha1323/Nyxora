export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  role: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  isCaseStudy?: boolean;
  category: 'Full Stack' | 'AI / GenAI' | 'Data Science / ML' | 'Client Work';
  metrics?: string;
  highlights?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  category: string;
  iconName?: string;
  experience?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  type: string;
  points: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  highlights?: string[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: string;
}
