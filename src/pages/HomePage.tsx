import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AxeviaHero3D } from '../components/3d/AxeviaHero3D';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, FolderGit2, Mail, Linkedin, Sparkles } from 'lucide-react';

interface HomePageProps {
  onOpenResume?: () => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = PERSONAL_INFO.typingRoles;

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 30 : 65;
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

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center pt-24 pb-16 overflow-hidden">
      {/* 3D WebGL Background Scene */}
      <AxeviaHero3D />

      {/* Main Home Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-purple-900/15 text-xs font-mono tracking-wider uppercase text-[#2e1065] shadow-sm mb-8 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping shadow-[0_0_8px_#059669]" />
          <span className="text-[#581c87] font-bold">// 00</span>
          <span className="font-semibold text-purple-950">AVAILABLE FOR NEW OPPORTUNITIES</span>
        </div>

        {/* Profile Avatar with Dark Purple Halo Frame */}
        <div className="relative mb-8 group">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-br from-[#2e1065] to-[#581c87] border border-purple-800 shadow-xl shadow-purple-950/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-[20px] bg-[#240733] flex flex-col items-center justify-center relative overflow-hidden text-white border border-purple-700/50">
              <div className="font-heading font-black text-3xl sm:text-4xl tracking-tighter text-[#faf8f5]">
                AS
              </div>
              <span className="text-[10px] font-mono tracking-widest text-violet-300 uppercase mt-0.5 font-bold">
                DEV
              </span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-white border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-700 shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>ONLINE</span>
          </div>
        </div>

        {/* Name */}
        <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#180524] mb-4 uppercase leading-none drop-shadow-sm">
          Ayesha Sahani
        </h1>

        {/* Professional Title with Typing Animation */}
        <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-[#2e1065] border border-purple-900 shadow-lg shadow-purple-950/15 mb-6">
          <span className="font-heading font-extrabold text-lg sm:text-2xl text-[#faf8f5]">
            {displayText}
          </span>
          <span className="inline-block w-1 sm:w-1.5 h-5 sm:h-6 bg-violet-400 ml-2 animate-pulse" />
        </div>

        {/* Short Introduction (2-3 lines max) */}
        <p className="max-w-xl text-base sm:text-lg text-purple-950/80 font-normal leading-relaxed mb-10">
          Full Stack Developer specializing in <strong className="text-[#2e1065] font-semibold underline decoration-purple-400 decoration-2">React.js</strong>,{' '}
          <strong className="text-[#2e1065] font-semibold underline decoration-purple-400 decoration-2">Node.js</strong>, and{' '}
          <strong className="text-[#2e1065] font-semibold underline decoration-purple-400 decoration-2">PostgreSQL</strong>. I engineer responsive web applications, secure REST APIs, and automated cloud deployments with high uptime.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#2e1065] hover:bg-[#3b0764] text-white font-mono font-bold text-xs tracking-widest uppercase transition-all shadow-md shadow-purple-950/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <FolderGit2 className="w-4 h-4 text-violet-300" />
            <span>View Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white hover:bg-purple-50 text-[#2e1065] font-mono font-bold text-xs tracking-widest uppercase border border-purple-900/20 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="w-4 h-4 text-[#581c87]" />
            <span>Contact Me</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#2e1065] border border-purple-900/15 shadow-sm hover:bg-purple-50 transition-colors font-medium"
          >
            <Mail className="w-3.5 h-3.5 text-[#581c87]" />
            <span>Email</span>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#2e1065] border border-purple-900/15 shadow-sm hover:bg-purple-50 transition-colors font-medium"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#581c87]" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#2e1065] border border-purple-900/15 shadow-sm hover:bg-purple-50 transition-colors font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#581c87]" />
            <span>About Me</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </Link>
        </div>
      </div>
    </div>
  );
};
