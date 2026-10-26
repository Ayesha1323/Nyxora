import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { TiltCard } from '../ui/TiltCard';
import { Project } from '../../types/portfolio';
import { ExternalLink, Sparkles, FolderGit2, BookOpen, ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenCaseStudy: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenCaseStudy }) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Client Work', label: 'Client Work' },
    { id: 'AI / GenAI', label: 'AI & Three.js' },
    { id: 'Data Science / ML', label: 'ML & Security' }
  ];

  const filteredProjects = PROJECTS.filter(p => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Axevia Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-4 font-semibold uppercase">
              <span>// 03</span>
              <span>INDEX OF WORKS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight uppercase">
              Selected Projects
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 self-start md:self-end">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                  filter === cat.id
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white font-bold shadow-md'
                    : 'bg-white dark:bg-slate-900/70 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/25 hover:text-slate-950 dark:hover:text-white font-medium shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Axevia Projects Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: Project, idx: number) => {
            const isNyxora = project.id === 'nyxora-ai';
            const isMLProject = project.id === 'wireless-network-vulnerability';
            const indexNumber = String(idx + 1).padStart(2, '0');

            return (
              <TiltCard
                key={project.id}
                maxTilt={6}
                featured={isNyxora}
                glowColor={
                  isNyxora
                    ? 'rgba(168, 85, 247, 0.45)'
                    : isMLProject
                    ? 'rgba(16, 185, 129, 0.35)'
                    : 'rgba(6, 182, 212, 0.35)'
                }
                className="flex flex-col h-full rounded-3xl bg-white/95 dark:bg-slate-900/75 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden hover:border-cyan-500/50 dark:hover:border-cyan-400/40 transition-all duration-300"
              >
                {/* Axevia Project Card Top Bar */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-50/90 dark:bg-slate-950/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                    <span className="text-cyan-600 dark:text-cyan-400">#{indexNumber}</span>
                    <span>•</span>
                    <span className="uppercase">{project.category}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isNyxora && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/80 border border-violet-300 dark:border-violet-500/40 text-[10px] font-mono text-violet-800 dark:text-violet-300 font-bold uppercase">
                        <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-300" />
                        <span>3D Highlight</span>
                      </span>
                    )}
                    {isMLProject && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-[10px] font-mono text-emerald-800 dark:text-emerald-300 font-bold uppercase">
                        <span>Research</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Role & Metrics */}
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-700 dark:text-cyan-400 mb-3 font-semibold">
                      <span>{project.role.toUpperCase()}</span>
                      {project.metrics && (
                        <span className="text-slate-500 dark:text-slate-400 truncate max-w-[170px] text-right font-normal">
                          {project.metrics}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-extrabold text-2xl text-slate-950 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors uppercase">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-7">
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-xl text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Button: Live Demo or Case Study */}
                    <div className="pt-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                      {isMLProject ? (
                        <button
                          onClick={onOpenCaseStudy}
                          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-500/15 dark:hover:bg-emerald-500/25 border border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-300 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>View ML Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md ${
                            isNyxora
                              ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:scale-[1.02]'
                              : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-sm'
                          }`}
                        >
                          <span>Live Demonstration</span>
                          <ArrowUpRight className="w-4 h-4 text-cyan-500" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
