import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/skills', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/education', label: 'Education' },
    { path: '/contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-purple-950/10 shadow-sm'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-[#2e1065] border border-purple-900/40 group-hover:border-purple-600 flex items-center justify-center font-heading font-black text-sm tracking-wider text-[#faf8f5] shadow-md shadow-purple-950/20 group-hover:scale-105 transition-all">
              <span>AS</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a855f7] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-sm tracking-tight text-[#1e082b] group-hover:text-[#581c87] transition-colors uppercase">
                Ayesha Sahani
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-purple-900/70 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-ping" />
                <span>Available for hire</span>
              </div>
            </div>
          </Link>

          {/* Floating Center Navigation Pill */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-purple-900/15 shadow-sm">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                    active
                      ? 'bg-[#2e1065] text-white font-bold shadow-sm'
                      : 'text-purple-900/80 hover:text-[#2e1065] hover:bg-purple-100/50 font-medium'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-purple-50 text-[#2e1065] border border-purple-900/20 text-xs font-mono font-medium tracking-wider uppercase transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#581c87]" />
              <span>Resume</span>
            </button>

            {/* "Contact Me" CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#2e1065] hover:bg-[#3b0764] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md shadow-purple-950/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-purple-900/20 text-[#2e1065] shadow-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#581c87]" /> : <Menu className="w-5 h-5 text-[#2e1065]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#fdfbf7]/98 backdrop-blur-xl border-b border-purple-900/15 shadow-xl">
          <div className="flex flex-col gap-1.5 py-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                    active
                      ? 'bg-[#2e1065] text-white font-bold shadow-sm'
                      : 'text-purple-950 hover:bg-purple-100/50 font-medium'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-purple-900/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-purple-900/20 text-xs font-mono font-medium uppercase tracking-wider text-[#2e1065]"
            >
              <FileText className="w-4 h-4 text-[#581c87]" />
              <span>View Resume / CV</span>
            </button>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2e1065] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-md shadow-purple-950/20"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
