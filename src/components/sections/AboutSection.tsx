import React, { useEffect, useState, useRef } from 'react';
import { PERSONAL_INFO, STATS } from '../../data/portfolioData';
import { TiltCard } from '../ui/TiltCard';
import { Layers, Zap, ShieldCheck, Code, Database, Sparkles, Terminal, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counterValues, setCounterValues] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const targets = STATS.map(s => s.value);
          const duration = 1800;
          const startTime = performance.now();

          const updateCounters = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounterValues(
              targets.map(target => {
                const val = target * easeProgress;
                return target % 1 === 0 ? Math.round(val) : parseFloat(val.toFixed(1));
              })
            );

            if (progress < 1) {
              requestAnimationFrame(updateCounters);
            }
          };

          requestAnimationFrame(updateCounters);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const statIcons = [Layers, Zap, ShieldCheck];

  return (
    <section id="about" ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Axevia Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-4 font-semibold uppercase">
              <span>// 01</span>
              <span>BIOGRAPHY &amp; CAPABILITIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight uppercase">
              Engineering Foundations
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal">
            Bridging frontend intuition with resilient relational backend architectures and automated cloud pipelines.
          </p>
        </div>

        {/* Bio Card & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Main Bio Card */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={4}
              glowColor="rgba(6, 182, 212, 0.25)"
              className="p-8 sm:p-10 rounded-3xl bg-white/95 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl shadow-slate-200/40 dark:shadow-none"
            >
              <div className="flex items-center gap-3.5 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-bold shadow-md">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
                    Full Stack Developer
                  </h3>
                  <p className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                    React.js • Node.js • PostgreSQL • Cloud Infrastructure
                  </p>
                </div>
              </div>

              {/* Exact bio statement */}
              <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed mb-8 font-normal">
                "{PERSONAL_INFO.bio}"
              </p>

              {/* Highlights checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-8 border-t border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span>Production deployments on AWS EC2 with Cloudflare SSL &amp; CDN</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span>REST API design with structured validation &amp; PostgreSQL indexing</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                  <span>Generative AI integrations via Google Gemini API</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                  <span>M.Sc. in Data Science with network traffic telemetry research</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Side Philosophy Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-7 rounded-3xl bg-white/90 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-lg shadow-slate-200/30 dark:shadow-none">
              <div className="flex items-center gap-2.5 mb-3 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Performance-Driven</span>
              </div>
              <h4 className="font-heading font-bold text-slate-900 dark:text-white text-lg mb-2">
                Speed, Isolation &amp; Reliability
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Clean code is only half the equation—the application must be lightning-fast, securely isolated, and cost-effective to deploy. From caching layers to database query optimization, I engineer end-to-end reliability.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white/90 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-lg shadow-slate-200/30 dark:shadow-none">
              <div className="flex items-center gap-2.5 mb-3 text-violet-600 dark:text-violet-400">
                <Database className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Data Architecture</span>
              </div>
              <h4 className="font-heading font-bold text-slate-900 dark:text-white text-lg mb-2">
                Relational Schemas &amp; Scalability
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Experience designing normalized schemas, foreign-key relationships, transactional boundaries, and performant indexes in PostgreSQL for multi-tenant and high-volume e-commerce systems.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Axevia Styled Stat Telemetry Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, index) => {
            const Icon = statIcons[index];
            const displayVal = hasAnimated ? counterValues[index] : 0;
            return (
              <TiltCard
                key={stat.label}
                maxTilt={5}
                glowColor={index === 0 ? 'rgba(6, 182, 212, 0.3)' : index === 1 ? 'rgba(139, 92, 246, 0.3)' : 'rgba(59, 130, 246, 0.3)'}
                className="p-8 rounded-3xl bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-lg shadow-slate-200/40 dark:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                      // METRIC 0{index + 1}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Number */}
                  <div className="font-heading font-extrabold text-5xl sm:text-6xl text-slate-950 dark:text-white tracking-tight mb-3">
                    <span className="text-gradient">
                      {displayVal}{stat.suffix}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-slate-100 mb-2">
                    {stat.label}
                  </h4>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-4 pt-4 border-t border-slate-200 dark:border-white/5 font-normal">
                  {stat.description}
                </p>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
