import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SKILL_CATEGORIES, ALL_SKILLS } from '../data/portfolioData';
import { Skills3DUnique } from '../components/3d/Skills3DUnique';
import { TiltCard } from '../components/ui/TiltCard';
import { SkillItem } from '../types/portfolio';
import {
  Code,
  Server,
  Database,
  Cloud,
  Brain,
  Wrench,
  Sparkles,
  ArrowUpRight,
  Cpu
} from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return Code;
      case 'backend':
        return Server;
      case 'database':
        return Database;
      case 'cloud':
        return Cloud;
      case 'ai-genai':
        return Brain;
      case 'tools':
        return Wrench;
      default:
        return Cpu;
    }
  };

  const filteredCategories = selectedCategory === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-purple-900/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-purple-900/15 text-xs font-mono text-[#581c87] mb-4 font-bold uppercase shadow-sm">
              <span>// 02 TECHNICAL ARSENAL</span>
              <span>•</span>
              <span className="text-violet-600">PROFICIENCIES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-black text-[#180524] tracking-tight uppercase">
              Skills &amp; Technologies
            </h1>
          </div>

          <p className="max-w-md text-sm sm:text-base text-purple-950/80 font-normal">
            A comprehensive overview of frontend engineering, server-side architecture, relational data management, cloud DevOps, and generative AI integrations.
          </p>
        </div>

        {/* 3D Holographic Spatial Visualizer */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#581c87] font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>3D Spatial Technology Viewer</span>
            </div>
            <span className="text-xs font-mono text-purple-900/70">
              Drag to rotate 360° • Click or hover cards to inspect
            </span>
          </div>

          <Skills3DUnique
            selectedCategory={selectedCategory}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#2e1065] text-white border-transparent font-bold shadow-sm'
                : 'bg-white text-purple-950 border-purple-900/15 hover:bg-purple-50 font-medium'
            }`}
          >
            All Skills ({ALL_SKILLS.length})
          </button>

          {SKILL_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#2e1065] text-white border-transparent font-bold shadow-sm'
                    : 'bg-white text-purple-950 border-purple-900/15 hover:bg-purple-50 font-medium'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#581c87]" />
                <span>{cat.name} ({cat.skills.length})</span>
              </button>
            );
          })}
        </div>

        {/* Categorized Visual Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredCategories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            return (
              <TiltCard
                key={category.id}
                maxTilt={4}
                glowColor="rgba(124, 58, 237, 0.15)"
                className="flex flex-col h-full rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm p-7 hover:border-purple-600/35 transition-colors"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-purple-900/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#2e1065] shadow-sm">
                      <Icon className="w-5 h-5 text-[#2e1065]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-lg text-[#180524] uppercase tracking-tight">
                        {category.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[#581c87] font-medium">
                        {category.skills.length} core technologies
                      </span>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-600 shadow-[0_0_8px_#9333ea] animate-pulse" />
                </div>

                {/* Skill List with Proficiency Bars */}
                <div className="space-y-4 flex-1">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="group p-3 rounded-xl bg-purple-50/50 border border-purple-100 hover:border-purple-300 transition-all cursor-default"
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono font-medium text-purple-950 group-hover:text-[#2e1065] transition-colors">
                          {skill.name}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#581c87]">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-purple-200/60 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-[#2e1065] to-violet-600"
                          style={{
                            width: `${skill.level}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* CTA to Projects */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#240733] text-[#faf8f5] border border-purple-900 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
              See these technologies in action
            </h4>
            <p className="text-xs font-mono text-purple-200 mt-1">
              Explore real-world production projects deployed on AWS, Vercel, and Cloudflare.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-purple-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Explore Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
