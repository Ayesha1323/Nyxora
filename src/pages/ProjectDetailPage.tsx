import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../data/portfolioData';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Cpu,
  Database
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const projectIndex = PROJECTS.findIndex((p) => p.id === slug);
  const project = PROJECTS[projectIndex];

  if (!project) {
    return (
      <div className="pt-36 pb-24 min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#581c87] text-xs font-mono mb-4 font-bold border border-purple-900/15">
          404 NOT FOUND
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-[#180524] mb-4 uppercase">
          Project Not Found
        </h1>
        <p className="text-sm font-mono text-purple-950/70 font-normal mb-8 max-w-md">
          The requested project could not be located in the portfolio index.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2e1065] text-white text-xs font-mono font-bold uppercase shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-violet-300" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : PROJECTS[0];

  return (
    <div className="pt-28 pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-10 pb-6 border-b border-purple-900/15">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-900/70 hover:text-[#2e1065] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#581c87]" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-purple-900/70 font-medium">
            <span className="text-[#581c87]">PROJECT {String(projectIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(PROJECTS.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-purple-100 text-[#2e1065] border border-purple-200 text-xs font-mono font-bold uppercase shadow-sm">
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-violet-100 text-violet-800 border border-violet-200 text-xs font-mono font-bold uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                <span>3D &amp; AI Highlight</span>
              </span>
            )}
            {project.isCaseStudy && (
              <span className="px-3.5 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200 text-xs font-mono font-bold uppercase shadow-sm">
                Research Case Study
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-black text-[#180524] mb-6 uppercase tracking-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-purple-900/15 text-xs font-mono">
            <div>
              <span className="text-purple-900/70 font-medium block mb-1">ROLE</span>
              <span className="font-bold text-[#180524] uppercase">{project.role}</span>
            </div>
            <div>
              <span className="text-purple-900/70 font-medium block mb-1">STATUS</span>
              <span className="font-bold text-emerald-700 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
                Production Ready
              </span>
            </div>
            {project.metrics && (
              <div>
                <span className="text-purple-900/70 font-medium block mb-1">KEY PERFORMANCE</span>
                <span className="font-bold text-[#581c87] uppercase">{project.metrics}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2e1065] hover:bg-[#3b0764] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-purple-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Live</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Visual Terminal / Architecture Showcase Card */}
        <div className="rounded-3xl bg-[#240733] text-[#faf8f5] border border-purple-900 overflow-hidden shadow-2xl mb-14">
          {/* Terminal Window Header Bar */}
          <div className="px-5 py-3.5 bg-[#1b0429] border-b border-purple-900/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 font-mono text-xs text-purple-300">
                https://ayeshasahani.dev/projects/{project.id}
              </span>
            </div>
            <div className="font-mono text-[11px] text-violet-300 font-bold uppercase">
              DEPLOYED: SECURE SSL
            </div>
          </div>

          {/* Interactive Mockup Body */}
          <div className="p-8 sm:p-12 relative overflow-hidden bg-[#240733]/90">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold block mb-2">
                // SYSTEM OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-black uppercase mb-4 text-white">
                {project.title} Architecture
              </h2>
              <p className="text-sm sm:text-base text-purple-100 leading-relaxed font-normal mb-8">
                {project.longDescription || project.description}
              </p>

              {/* Quick Tech Pill Ribbon */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-950/80 border border-purple-800 text-xs font-mono text-violet-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive Section: Implementation & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          {/* Left Column: Implementation Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-[#581c87]">
                <Cpu className="w-5 h-5 text-[#581c87]" />
                <h3 className="font-heading font-black text-xl text-[#180524] uppercase tracking-tight">
                  Core Implementation Details
                </h3>
              </div>

              <div className="space-y-4">
                {project.highlights && project.highlights.length > 0 ? (
                  project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
                      <CheckCircle2 className="w-5 h-5 text-[#581c87] shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-purple-950 font-normal leading-relaxed">
                        {highlight}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-purple-950 font-normal">
                    Engineered using modern scalable architectural standards with high test coverage and modular components.
                  </p>
                )}
              </div>
            </div>

            {/* Architecture Rationale */}
            <div className="p-8 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-violet-700">
                <Database className="w-5 h-5 text-violet-700" />
                <h3 className="font-heading font-black text-xl text-[#180524] uppercase tracking-tight">
                  Database &amp; Infrastructure Decisions
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-normal mb-4">
                Data modeling emphasized relational integrity and query latency minimization. Utilizing PostgreSQL structured schemas, transactional isolation, and indexed lookups, the system maintains steady low response times even under concurrent load.
              </p>
              <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-normal">
                Deployments are configured with SSL certificate pinning, automated reverse proxy routing, and CDN edge asset caching on Cloudflare.
              </p>
            </div>
          </div>

          {/* Right Column: Tech Stack & Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm">
              <h3 className="font-heading font-black text-lg text-[#180524] uppercase tracking-tight mb-4">
                Technology Breakdown
              </h3>
              <div className="space-y-3">
                {project.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center justify-between p-3 rounded-xl bg-purple-50/60 border border-purple-100"
                  >
                    <span className="font-mono text-xs font-medium text-purple-950">
                      {tech}
                    </span>
                    <span className="text-[11px] font-mono text-[#581c87] font-bold">
                      VERIFIED STACK
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm">
              <h3 className="font-heading font-black text-lg uppercase tracking-tight mb-3 text-[#180524]">
                Live Deployment
              </h3>
              <p className="text-xs font-mono text-purple-950/70 mb-6 font-normal">
                This project is verified, hosted, and accessible publicly on production infrastructure.
              </p>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2e1065] hover:bg-[#3b0764] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Live Application</span>
                </a>
              ) : (
                <div className="w-full py-3 rounded-xl bg-purple-50 text-center font-mono text-xs text-[#581c87] font-medium border border-purple-200">
                  Proprietary / Research Model
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Pagination Controls */}
        <div className="pt-10 border-t border-purple-900/15 flex items-center justify-between gap-4">
          <Link
            to={`/projects/${prevProject.id}`}
            className="group inline-flex items-center gap-3 p-4 rounded-2xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm text-left hover:border-purple-600/40 transition-all max-w-[48%]"
          >
            <ArrowLeft className="w-4 h-4 text-[#581c87] group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[10px] font-mono uppercase text-[#581c87] font-bold block">
                PREVIOUS PROJECT
              </span>
              <span className="font-heading font-bold text-sm text-[#180524] truncate block">
                {prevProject.title}
              </span>
            </div>
          </Link>

          <Link
            to={`/projects/${nextProject.id}`}
            className="group inline-flex items-center gap-3 p-4 rounded-2xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm text-right hover:border-purple-600/40 transition-all max-w-[48%]"
          >
            <div>
              <span className="text-[10px] font-mono uppercase text-[#581c87] font-bold block">
                NEXT PROJECT
              </span>
              <span className="font-heading font-bold text-sm text-[#180524] truncate block">
                {nextProject.title}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#581c87] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
