import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/portfolioData';
import { TiltCard } from '../components/ui/TiltCard';
import { Project } from '../types/portfolio';
import {
  ExternalLink,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  Search
} from 'lucide-react';

interface ProjectsPageProps {
  onOpenCaseStudy?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Client Work', label: 'Client Work' },
    { id: 'Full Stack', label: 'Full Stack' },
    { id: 'AI / GenAI', label: 'AI & Three.js' },
    { id: 'Data Science / ML', label: 'ML & Security' }
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-purple-900/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-purple-900/15 text-xs font-mono text-[#581c87] mb-4 font-bold uppercase shadow-sm">
              <span>// 03 INDEX OF WORKS</span>
              <span>•</span>
              <span className="text-violet-600">PORTFOLIO</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-black text-[#180524] tracking-tight uppercase">
              Featured Projects
            </h1>
          </div>

          <p className="max-w-md text-sm sm:text-base text-purple-950/80 font-normal">
            Production full-stack web applications, international enterprise portals, generative AI interfaces, and machine learning telemetry models.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border whitespace-nowrap ${
                  filter === cat.id
                    ? 'bg-[#2e1065] text-white border-transparent font-bold shadow-sm'
                    : 'bg-white text-purple-950 border-purple-900/15 hover:bg-purple-50 font-medium'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#581c87] pointer-events-none" />
            <input
              type="text"
              placeholder="Search by tech or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-purple-900/20 text-xs font-mono text-purple-950 placeholder:text-purple-900/40 focus:outline-none focus:border-[#2e1065] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 p-8 shadow-sm">
            <p className="text-sm font-mono text-purple-900/70 mb-4">
              No projects found matching your criteria.
            </p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-xl bg-[#2e1065] text-white text-xs font-mono font-bold uppercase shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredProjects.map((project: Project, idx: number) => {
              const isNyxora = project.id === 'nyxora-ai';
              const isMLProject = project.id === 'wireless-network-vulnerability';
              const indexNumber = String(idx + 1).padStart(2, '0');

              return (
                <TiltCard
                  key={project.id}
                  maxTilt={6}
                  featured={isNyxora}
                  glowColor="rgba(124, 58, 237, 0.15)"
                  className="flex flex-col h-full rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm overflow-hidden hover:border-purple-600/35 transition-colors"
                >
                  {/* Card Header Bar */}
                  <div className="px-6 py-4 border-b border-purple-900/10 bg-purple-50/60 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-900/70 font-medium">
                      <span className="text-[#581c87] font-bold">#{indexNumber}</span>
                      <span>•</span>
                      <span className="uppercase text-purple-950 font-semibold">{project.category}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isNyxora && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-[#2e1065] border border-purple-200 text-[10px] font-mono font-bold uppercase shadow-sm">
                          <Sparkles className="w-3 h-3 text-violet-600" />
                          <span>3D &amp; AI</span>
                        </span>
                      )}
                      {isMLProject && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-100 text-violet-800 border border-violet-200 text-[10px] font-mono font-bold uppercase">
                          <span>Research</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Role & Metrics */}
                      <div className="flex items-center justify-between text-xs font-mono text-[#581c87] mb-3 font-medium">
                        <span>{project.role.toUpperCase()}</span>
                        {project.metrics && (
                          <span className="text-purple-900/70 truncate max-w-[170px] text-right font-normal">
                            {project.metrics}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <Link
                        to={`/projects/${project.id}`}
                        className="block font-heading font-black text-2xl text-[#180524] mb-3 hover:text-[#581c87] transition-colors uppercase tracking-tight"
                      >
                        {project.title}
                      </Link>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed mb-6 font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-7">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg text-[11px] font-mono font-medium bg-purple-50 text-purple-900 border border-purple-200/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="pt-5 border-t border-purple-900/10 flex flex-col gap-2.5">
                        <Link
                          to={`/projects/${project.id}`}
                          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2e1065] hover:bg-[#3b0764] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-white" />
                          <span>View Details &amp; Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white hover:bg-purple-50 border border-purple-900/20 text-[#2e1065] font-mono font-medium text-xs uppercase tracking-wider transition-all shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-[#581c87]" />
                            <span>Live Production URL</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#240733] text-[#faf8f5] border border-purple-900 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
              Have a project in mind?
            </h4>
            <p className="text-xs font-mono text-purple-200 mt-1">
              Let's collaborate on high-performance web applications, APIs, or database architecture.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-purple-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
