import React from 'react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Mail, Linkedin, ArrowUp, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/skills', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/education', label: 'Education' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <footer className="relative border-t border-purple-900/30 bg-[#180524] text-[#faf8f5] pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pb-12 border-b border-purple-900/40">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold block mb-2">
              // LET'S COLLABORATE
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
              Ready to build?
            </h2>
            <p className="text-sm font-mono text-purple-200/80 mt-2">
              Available for full stack engineering &amp; cloud deployment contracts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-purple-950/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>Contact Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-950/70 border border-purple-800 hover:border-violet-400 text-purple-200 hover:text-white text-xs font-mono font-medium uppercase tracking-wider transition-all"
            >
              <Linkedin className="w-4 h-4 text-violet-400" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-purple-950/70 border border-purple-800 hover:border-violet-400 text-purple-300 hover:text-white transition-colors"
              title="Return to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Route Directory Navigation */}
        <div className="py-8 border-b border-purple-900/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-xs font-mono uppercase tracking-wider text-purple-300 hover:text-white transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-purple-300">
            <span>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-violet-300 hover:underline font-medium">{PERSONAL_INFO.email}</a></span>
          </div>
        </div>

        {/* Large Monogram Banner */}
        <div className="py-8 select-none overflow-hidden">
          <h1 className="font-heading font-extrabold text-[11vw] leading-none text-purple-900/20 uppercase tracking-tighter text-center">
            AYESHA SAHANI
          </h1>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-4 border-t border-purple-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-purple-300">
          <div>
            © {new Date().getFullYear()} Ayesha Sahani. Full Stack Developer Portfolio.
          </div>
          <div className="flex items-center gap-4">
            <span>Chennai, India</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              All Systems Nominal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
