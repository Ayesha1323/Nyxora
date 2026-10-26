import React, { useState, useEffect } from 'react';
import { AxeviaHero3D } from '../3d/AxeviaHero3D';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { ArrowDownRight, Download, Mail, Linkedin, ExternalLink, Code, Layers, Zap } from 'lucide-react';

interface HeroSectionProps {
  theme?: 'dark' | 'light';
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ theme = 'dark', onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = PERSONAL_INFO.typingRoles;

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 35 : 75;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Axevia WebGL 3D Interactive Canvas with Mode Switcher */}
      <AxeviaHero3D theme={theme} />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Axevia Index Indicator Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-xs font-mono tracking-wider uppercase text-slate-800 dark:text-slate-300 backdrop-blur-md mb-8 shadow-sm">
          <span className="text-cyan-600 dark:text-cyan-400 font-bold">// 00</span>
          <span>CREATIVE ENGINEER &amp; CLOUD ARCHITECT</span>
        </div>

        {/* Large Name Display */}
        <h1 className="font-heading font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-slate-950 dark:text-white mb-6 uppercase leading-none drop-shadow-sm">
          Ayesha Sahani
        </h1>

        {/* Rotating Role Pill */}
        <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl mb-6 shadow-sm">
          <span className="font-heading font-bold text-lg sm:text-2xl md:text-3xl text-gradient">
            {displayText}
          </span>
          <span className="inline-block w-0.5 sm:w-1 h-6 sm:h-7 bg-cyan-500 ml-2 animate-pulse" />
        </div>

        {/* Short Statement */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-10 font-normal">
          Building resilient, high-performance web applications using{' '}
          <strong className="text-slate-950 dark:text-white font-semibold">React.js</strong>,{' '}
          <strong className="text-slate-950 dark:text-white font-semibold">Node.js</strong>, and{' '}
          <strong className="text-slate-950 dark:text-white font-semibold">PostgreSQL</strong>. Specializing in responsive interfaces, REST APIs, and automated cloud deployments with zero downtime.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
          <button
            onClick={scrollToProjects}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-mono font-bold text-xs tracking-widest uppercase transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            <span>Explore Works</span>
            <ArrowDownRight className="w-4 h-4 text-cyan-400 dark:text-cyan-600" />
          </button>

          <button
            onClick={onOpenResume}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-xs tracking-widest uppercase border border-slate-300 dark:border-white/15 backdrop-blur-md transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Download CV</span>
          </button>
        </div>

        {/* Direct Connect Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 hover:border-cyan-500/40 text-slate-800 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all shadow-sm"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{PERSONAL_INFO.email}</span>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 hover:border-violet-500/40 text-slate-800 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-all shadow-sm"
          >
            <Linkedin className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </section>
  );
};
