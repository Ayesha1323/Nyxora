import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO, STATS } from '../data/portfolioData';
import { TiltCard } from '../components/ui/TiltCard';
import {
  Code,
  Database,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  Briefcase,
  Target
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counterValues, setCounterValues] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    setHasAnimated(true);
    const targets = STATS.map((s) => s.value);
    const duration = 1600;
    const startTime = performance.now();

    const updateCounters = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setCounterValues(
        targets.map((target) => {
          const val = target * easeProgress;
          return target % 1 === 0 ? Math.round(val) : parseFloat(val.toFixed(1));
        })
      );

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      }
    };

    requestAnimationFrame(updateCounters);
  }, []);

  const statIcons = [Layers, Zap, ShieldCheck];

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-purple-900/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-purple-900/15 text-xs font-mono text-[#581c87] mb-4 font-bold uppercase shadow-sm">
              <span>// 01 BIOGRAPHY</span>
              <span>•</span>
              <span className="text-violet-600">ABOUT AYESHA</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-black text-[#180524] tracking-tight uppercase">
              About &amp; Overview
            </h1>
          </div>

          <p className="max-w-md text-sm sm:text-base text-purple-950/80 font-normal">
            Bridging responsive frontend engineering with resilient relational backend architectures, automated cloud deployments, and generative AI integrations.
          </p>
        </div>

        {/* Section 1: Main Bio & Technical Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Bio Card */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={4}
              glowColor="rgba(124, 58, 237, 0.15)"
              className="p-8 sm:p-10 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm"
            >
              <div className="flex items-center gap-3.5 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-[#2e1065] font-black shadow-sm">
                  <Code className="w-6 h-6 text-[#2e1065]" />
                </div>
                <div>
                  <h2 className="font-heading font-black text-2xl text-[#180524]">
                    Full Stack Developer
                  </h2>
                  <p className="text-xs font-mono text-[#581c87] font-semibold mt-0.5">
                    React.js • Node.js • PostgreSQL • Cloud Infrastructure
                  </p>
                </div>
              </div>

              {/* Exact bio statement */}
              <p className="text-base sm:text-lg text-purple-950/90 leading-relaxed mb-8 font-normal">
                "{PERSONAL_INFO.bio}"
              </p>

              {/* Highlights checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-8 border-t border-purple-900/10 text-xs text-purple-900/80 font-medium">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#581c87] shrink-0 mt-0.5" />
                  <span>Production deployments on AWS EC2 with Cloudflare SSL &amp; CDN</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#581c87] shrink-0 mt-0.5" />
                  <span>REST API design with structured validation &amp; PostgreSQL indexing</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                  <span>Generative AI integrations via Google Gemini API</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                  <span>M.Sc. in Data Science with network traffic telemetry research</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Side Focus Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 text-[#581c87]">
                <Sparkles className="w-4 h-4 text-[#581c87]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Engineering Focus</span>
              </div>
              <h3 className="font-heading font-black text-[#180524] text-lg mb-2">
                Speed, Isolation &amp; Reliability
              </h3>
              <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-normal">
                Clean code is only half the equation—the application must be lightning-fast, securely isolated, and cost-effective to deploy. From caching layers to database query optimization, I engineer end-to-end reliability.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 text-violet-700">
                <Database className="w-4 h-4 text-violet-700" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Data Architecture</span>
              </div>
              <h3 className="font-heading font-black text-[#180524] text-lg mb-2">
                Relational Schemas &amp; Scalability
              </h3>
              <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-normal">
                Experience designing normalized schemas, foreign-key relationships, transactional boundaries, and performant indexes in PostgreSQL for multi-tenant and high-volume e-commerce systems.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: 3 Animated Stat Telemetry Counters */}
        <div className="mb-20">
          <div className="text-xs font-mono text-[#581c87] uppercase tracking-widest font-bold mb-4">
            // KEY PERFORMANCE METRICS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, index) => {
              const Icon = statIcons[index];
              const displayVal = hasAnimated ? counterValues[index] : 0;
              return (
                <TiltCard
                  key={stat.label}
                  maxTilt={5}
                  glowColor="rgba(124, 58, 237, 0.15)"
                  className="p-8 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#581c87] font-bold">
                      STAT #{String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-[#581c87]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="font-heading font-black text-5xl sm:text-6xl text-[#2e1065] mb-2 tracking-tight">
                    {displayVal}
                    <span className="text-violet-600 ml-1">{stat.suffix}</span>
                  </div>

                  <div className="font-heading font-bold text-base text-[#180524] mb-2">
                    {stat.label}
                  </div>

                  <p className="text-xs text-purple-950/70 font-normal leading-relaxed">
                    {stat.description}
                  </p>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* Section 3: Career Background & Experience Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="p-8 sm:p-10 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm">
            <div className="flex items-center gap-3 mb-6 text-[#581c87]">
              <Briefcase className="w-5 h-5 text-[#581c87]" />
              <h3 className="font-heading font-black text-xl text-[#180524] uppercase tracking-tight">
                Career Background
              </h3>
            </div>
            <p className="text-sm text-purple-950/85 leading-relaxed mb-6 font-normal">
              Throughout my journey as a Full Stack Developer, I have partnered with international and local enterprises to turn complex specifications into resilient digital products. At <strong className="text-[#2e1065]">CloudNex, Chennai</strong>, I led full-stack delivery across e-commerce, corporate, and client web apps from initial architecture through production deployment on AWS EC2 and Cloudflare.
            </p>
            <p className="text-sm text-purple-950/85 leading-relaxed font-normal">
              My foundational background as a <strong className="text-violet-700">Network Security Intern at Intrust Innovation Labs</strong> instilled a security-first mindset: strict data validation, attack surface minimization, and network traffic monitoring are baked into every API and database schema I create.
            </p>
            <div className="mt-6 pt-6 border-t border-purple-900/10 flex items-center justify-between">
              <span className="text-xs font-mono text-purple-900/70">
                Want to see the complete timeline?
              </span>
              <Link
                to="/experience"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#581c87] hover:text-[#2e1065] uppercase"
              >
                <span>Timeline</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm">
            <div className="flex items-center gap-3 mb-6 text-violet-700">
              <Target className="w-5 h-5 text-violet-700" />
              <h3 className="font-heading font-black text-xl text-[#180524] uppercase tracking-tight">
                Professional Interests &amp; Goals
              </h3>
            </div>
            <ul className="space-y-4 text-sm text-purple-950/85 font-normal">
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#581c87] mt-1.5 shrink-0 shadow-[0_0_8px_#581c87]" />
                <span>
                  <strong className="text-[#180524] font-semibold">Generative AI Integration:</strong> Architecting hybrid applications that leverage modern LLM APIs (Google Gemini) for real-time semantic analysis, automated content generation, and conversational workflows.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-600 mt-1.5 shrink-0 shadow-[0_0_8px_#7c3aed]" />
                <span>
                  <strong className="text-[#180524] font-semibold">PostgreSQL &amp; Data Engineering:</strong> Crafting high-performance schemas, indexes, query optimizations, and connection pooling to keep mission-critical workloads sub-millisecond.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 mt-1.5 shrink-0 shadow-[0_0_8px_#059669]" />
                <span>
                  <strong className="text-[#180524] font-semibold">Cloud Infrastructure &amp; CI/CD:</strong> Building zero-downtime automated deployment pipelines on AWS EC2, Cloudflare, and Docker for scalable, distributed applications.
                </span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-purple-900/10 flex items-center justify-between">
              <span className="text-xs font-mono text-purple-900/70">
                Explore technical proficiencies
              </span>
              <Link
                to="/skills"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-violet-700 hover:text-violet-900 uppercase"
              >
                <span>Skills Matrix</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-[#240733] text-[#faf8f5] border border-purple-900 shadow-xl">
          <div>
            <h4 className="font-heading font-black text-2xl text-white">
              Ready to explore my work?
            </h4>
            <p className="text-xs font-mono text-purple-200 mt-1">
              Browse deployed client platforms, AI prototypes, and data science research.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/skills"
              className="px-6 py-3 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-xs font-mono font-medium uppercase tracking-wider text-purple-200 hover:text-white transition-colors"
            >
              Explore Skills
            </Link>
            <Link
              to="/projects"
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-md shadow-purple-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
