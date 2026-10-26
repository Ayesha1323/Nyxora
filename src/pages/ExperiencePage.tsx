import React from 'react';
import { Link } from 'react-router-dom';
import { EXPERIENCES } from '../data/portfolioData';
import { TiltCard } from '../components/ui/TiltCard';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  FileText
} from 'lucide-react';

interface ExperiencePageProps {
  onOpenResume?: () => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ onOpenResume }) => {
  return (
    <div className="pt-28 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-purple-900/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-purple-900/15 text-xs font-mono text-[#581c87] mb-4 font-bold uppercase shadow-sm">
              <span>// 04 PROFESSIONAL TIMELINE</span>
              <span>•</span>
              <span className="text-violet-600">CAREER HISTORY</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-black text-[#180524] tracking-tight uppercase">
              Work Experience
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-purple-50 text-[#2e1065] text-xs font-mono font-bold uppercase tracking-wider border border-purple-900/20 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <FileText className="w-4 h-4 text-[#581c87]" />
                <span>View Full CV</span>
              </button>
            )}
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative mb-20">
          {/* Central Line - Glowing Purple Gradient */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#2e1065] via-violet-600 to-[#2e1065]" />

          {/* Timeline Nodes */}
          <div className="space-y-14 md:space-y-20">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-20 items-center justify-center w-11 h-11 rounded-2xl bg-[#2e1065] border-2 border-purple-800 text-white shadow-md">
                    <Briefcase className="w-5 h-5 text-violet-300" />
                  </div>

                  {/* Card Container */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <TiltCard
                      maxTilt={5}
                      glowColor="rgba(124, 58, 237, 0.15)"
                      className="p-8 sm:p-9 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm hover:border-purple-600/35 transition-colors"
                    >
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100 text-[#2e1065] border border-purple-200 text-xs font-mono font-medium uppercase tracking-wider">
                          <Calendar className="w-3.5 h-3.5 text-[#581c87]" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-purple-950 bg-purple-50 border border-purple-200 px-3 py-1 rounded-xl font-medium">
                          {exp.type}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h2 className="font-heading font-black text-2xl text-[#180524] mb-1.5 uppercase tracking-tight">
                        {exp.role}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-[#581c87] font-bold mb-6 font-mono">
                        <span>{exp.company}</span>
                        <span className="text-purple-300">•</span>
                        <span className="flex items-center gap-1 text-purple-900/70 text-xs font-normal">
                          <MapPin className="w-3.5 h-3.5 text-[#581c87]" />
                          <span>{exp.location}</span>
                        </span>
                      </div>

                      {/* Bullet Achievements */}
                      <ul className="space-y-3 text-xs sm:text-sm text-purple-950/85 mb-8">
                        {exp.points.map((point, pIndex) => (
                          <li key={pIndex} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#581c87] shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-normal">{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Employed */}
                      <div className="pt-6 border-t border-purple-900/10">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-purple-900/70 block mb-3 font-medium">
                          // TECHNOLOGIES &amp; METHODOLOGIES
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-lg text-xs font-mono bg-purple-50 text-purple-950 border border-purple-200 font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#240733] text-[#faf8f5] border border-purple-900 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
              Looking for full-stack engineering talent?
            </h4>
            <p className="text-xs font-mono text-purple-200 mt-1">
              Currently available for contract roles, distributed development, and cloud deployments.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-purple-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
