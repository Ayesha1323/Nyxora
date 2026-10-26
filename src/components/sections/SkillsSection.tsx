import React, { useState } from 'react';
import { SKILL_CATEGORIES, ALL_SKILLS } from '../../data/portfolioData';
import { Skills3DUnique } from '../3d/Skills3DUnique';
import { TiltCard } from '../ui/TiltCard';
import { SkillItem } from '../../types/portfolio';
import { Layers, LayoutGrid, CheckCircle2, Sparkles, SlidersHorizontal } from 'lucide-react';

interface SkillsSectionProps {
  theme?: 'dark' | 'light';
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ theme = 'dark' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);
  const [activeSkillModal, setActiveSkillModal] = useState<SkillItem | null>(ALL_SKILLS[0]);

  const filterTabs = [
    { id: 'all', name: 'All Skills', count: ALL_SKILLS.length },
    ...SKILL_CATEGORIES.map(c => ({ id: c.id, name: c.name, count: c.skills.length }))
  ];

  return (
    <section id="skills" className="relative py-28 sm:py-36 bg-slate-100/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Axevia Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-4 font-semibold uppercase">
              <span>// 02</span>
              <span>TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight uppercase">
              Skills &amp; Specializations
            </h2>
          </div>

          {/* View Mode Toggle Pill */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm self-start md:self-end">
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                viewMode === '3d'
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Spatial View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Matrix Grid</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterTabs.map(tab => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`shrink-0 px-5 py-2.5 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                  isSelected
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white font-bold shadow-md'
                    : 'bg-white dark:bg-slate-900/70 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/25 hover:text-slate-950 dark:hover:text-slate-200 font-medium shadow-sm'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isSelected
                    ? 'bg-white/20 dark:bg-black/15 text-white dark:text-slate-950'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Display: 3D Spatial Canvas or Categorized Matrix */}
        {viewMode === '3d' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D Canvas (8 cols) */}
            <div className="lg:col-span-8">
              <Skills3DUnique
                theme={theme}
                selectedCategory={selectedCategory}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                onSelectSkill={(skill) => {
                  if (skill) setActiveSkillModal(skill);
                }}
              />
            </div>

            {/* Inspection Card (4 cols) */}
            <div className="lg:col-span-4">
              <div className="p-7 rounded-3xl bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl shadow-slate-200/40 dark:shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-4 font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>// INSPECTED SPECIFICATION</span>
                </div>

                {activeSkillModal || hoveredSkill ? (
                  (() => {
                    const skill = hoveredSkill || activeSkillModal!;
                    const categoryObj = SKILL_CATEGORIES.find(c => c.name === skill.category);
                    return (
                      <div className="space-y-5">
                        <div>
                          <h3 className="font-heading font-extrabold text-3xl text-slate-950 dark:text-white">
                            {skill.name}
                          </h3>
                          <span
                            className="inline-block px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase mt-2"
                            style={{
                              backgroundColor: `${categoryObj?.color || '#06b6d4'}20`,
                              color: categoryObj?.color || '#06b6d4',
                              border: `1px solid ${categoryObj?.color || '#06b6d4'}40`
                            }}
                          >
                            {skill.category}
                          </span>
                        </div>

                        {/* Proficiency Bar */}
                        <div>
                          <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-2 font-mono font-semibold">
                            <span>PROFICIENCY LEVEL</span>
                            <span className="font-bold text-cyan-600 dark:text-cyan-400">{skill.level}%</span>
                          </div>
                          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-300 dark:border-white/5">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${skill.level}%`,
                                background: `linear-gradient(90deg, #06b6d4, ${categoryObj?.color || '#8b5cf6'})`
                              }}
                            />
                          </div>
                        </div>

                        {/* Practical Context */}
                        <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2.5 pt-4 border-t border-slate-200 dark:border-white/10 font-normal leading-relaxed">
                          <p>
                            Deployed across production web architectures, real-time client systems, and high-uptime cloud deployments.
                          </p>
                          <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300 font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Verified in client deliverables &amp; research projects</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Hover over or click any 3D slab in the matrix to view detailed proficiency metrics.
                  </p>
                )}

                {/* Engine Spec Footer */}
                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>3D Layout Engine</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold uppercase">WebGL 2.0 Physical</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Matrix Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.filter(c => selectedCategory === 'all' || c.id === selectedCategory).map(category => (
              <TiltCard
                key={category.id}
                maxTilt={5}
                glowColor={`${category.color}35`}
                className="p-7 rounded-3xl bg-white/95 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-lg shadow-slate-200/40 dark:shadow-none"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-3.5 h-3.5 rounded-full shadow-sm"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="font-heading font-extrabold text-xl text-slate-950 dark:text-white uppercase">
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1.5 font-mono">
                        <span className="text-slate-800 dark:text-slate-200 font-bold">{skill.name}</span>
                        <span className="text-slate-500 dark:text-slate-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: category.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
