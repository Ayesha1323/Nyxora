import React from 'react';
import { EXPERIENCES } from '../../data/portfolioData';
import { TiltCard } from '../ui/TiltCard';
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Axevia Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 pb-8 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-4 font-semibold uppercase">
              <span>// 04</span>
              <span>PROFESSIONAL TIMELINE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight uppercase">
              Work Experience
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal">
            Proven track record of architecting, deploying, and securing web applications for global clients.
          </p>
        </div>

        {/* Vertical Timeline Axis Container */}
        <div className="relative">
          {/* Glowing central vertical timeline spine */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-violet-500 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.6)]" />

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
                  <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-20 items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-white text-slate-950 dark:text-white shadow-xl">
                    <Briefcase className="w-5 h-5 text-cyan-500" />
                  </div>

                  {/* Left / Right Card Container */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <TiltCard
                      maxTilt={5}
                      glowColor={isEven ? 'rgba(6, 182, 212, 0.3)' : 'rgba(139, 92, 246, 0.3)'}
                      className="p-8 sm:p-9 rounded-3xl bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl shadow-slate-200/40 dark:shadow-none"
                    >
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/30 text-xs font-mono text-cyan-800 dark:text-cyan-300 font-bold uppercase tracking-wider">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent px-3 py-1 rounded-xl font-bold">
                          {exp.type}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="font-heading font-extrabold text-2xl text-slate-950 dark:text-white mb-1.5 uppercase">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-cyan-700 dark:text-cyan-400 font-bold mb-6 font-mono">
                        <span>{exp.company}</span>
                        <span className="text-slate-400 dark:text-slate-600">•</span>
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 text-xs font-normal">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp.location}</span>
                        </span>
                      </div>

                      {/* Bullet Achievements */}
                      <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-8">
                        {exp.points.map((point, pIndex) => (
                          <li key={pIndex} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-normal">{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Pills */}
                      <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-3 font-bold">
                          // STACK EMPLOYED
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map(tech => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-white/5 font-semibold"
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
      </div>
    </section>
  );
};
