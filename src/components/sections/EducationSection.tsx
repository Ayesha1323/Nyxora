import React from 'react';
import { EDUCATION } from '../../data/portfolioData';
import { TiltCard } from '../ui/TiltCard';
import { GraduationCap, Award, Calendar, CheckCircle2 } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="relative py-28 sm:py-36 bg-slate-100/50 dark:bg-slate-950/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Axevia Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-4 font-semibold uppercase">
              <span>// 05</span>
              <span>ACADEMIC FOUNDATION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight uppercase">
              Education &amp; Degrees
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal">
            Specialized collegiate education in computer science, distributed algorithms, and data science methodologies.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EDUCATION.map((edu, idx) => (
            <TiltCard
              key={edu.id}
              maxTilt={5}
              glowColor={idx === 0 ? 'rgba(139, 92, 246, 0.35)' : 'rgba(6, 182, 212, 0.35)'}
              className="p-8 sm:p-10 rounded-3xl bg-white/95 dark:bg-slate-900/75 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col justify-between"
            >
              <div>
                {/* Year Pill & Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 border border-violet-300 dark:border-violet-500/30 text-xs font-mono text-violet-800 dark:text-violet-300 font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                </div>

                {/* Degree Title */}
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950 dark:text-white mb-2 uppercase">
                  {edu.degree}
                </h3>

                {/* Institution */}
                <p className="text-sm font-mono font-bold text-cyan-700 dark:text-cyan-400 mb-8">
                  {edu.institution}
                </p>

                {/* Highlights */}
                {edu.highlights && (
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-white/10 pt-6 font-normal">
                    {edu.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Coursework pill footer */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 flex flex-wrap gap-2 text-xs font-mono text-slate-700 dark:text-slate-400">
                {idx === 0 ? (
                  <>
                    <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-transparent font-medium">Machine Learning</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-transparent font-medium">Big Data Architecture</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-transparent font-medium">Distributed Systems</span>
                  </>
                ) : (
                  <>
                    <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-transparent font-medium">Data Structures</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-transparent font-medium">RDBMS &amp; SQL</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-transparent font-medium">Computer Networks</span>
                  </>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
