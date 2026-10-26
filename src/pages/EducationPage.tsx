import React from 'react';
import { Link } from 'react-router-dom';
import { EDUCATION } from '../data/portfolioData';
import { TiltCard } from '../components/ui/TiltCard';
import {
  GraduationCap,
  Award,
  Calendar,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  Shield,
  Brain,
  Database,
  Code
} from 'lucide-react';

export const EducationPage: React.FC = () => {
  const certifications = [
    {
      title: 'Generative AI & LLM Systems Integration',
      issuer: 'Google Cloud & Developer Ecosystem',
      date: '2025',
      description: 'Hands-on integration with Google Gemini APIs, structured prompt design, streaming responses, and multimodal systems.',
      icon: Brain,
      color: '#7c3aed'
    },
    {
      title: 'Full Stack Web Architecture & REST Engineering',
      issuer: 'Production Enterprise Standards',
      date: '2024',
      description: 'Advanced state management, microservices routing, Node.js asynchronous I/O, and frontend performance budgeting.',
      icon: Code,
      color: '#581c87'
    },
    {
      title: 'Relational Database Design & Query Optimization',
      issuer: 'PostgreSQL Professional Guild',
      date: '2024',
      description: 'Schema normalization, B-tree indexes, execution query plans, concurrency locking, and connection pooling.',
      icon: Database,
      color: '#3b0764'
    },
    {
      title: 'Network Traffic Telemetry & Intrusion Assessment',
      issuer: 'Intrust Innovation Labs',
      date: '2024',
      description: 'Packet flow feature extraction, Wireshark packet capture, anomaly detection, and web security posture auditing.',
      icon: Shield,
      color: '#059669'
    }
  ];

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-purple-900/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-purple-900/15 text-xs font-mono text-[#581c87] mb-4 font-bold uppercase shadow-sm">
              <span>// 05 ACADEMIC FOUNDATION</span>
              <span>•</span>
              <span className="text-violet-600">DEGREES &amp; QUALIFICATIONS</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-black text-[#180524] tracking-tight uppercase">
              Education &amp; Qualifications
            </h1>
          </div>

          <p className="max-w-md text-sm sm:text-base text-purple-950/80 font-normal">
            Specialized collegiate education in computer science, distributed algorithms, data science methodologies, and security telemetry.
          </p>
        </div>

        {/* Academic Degrees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {EDUCATION.map((edu) => (
            <TiltCard
              key={edu.id}
              maxTilt={5}
              glowColor="rgba(124, 58, 237, 0.15)"
              className="p-8 sm:p-10 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm flex flex-col justify-between hover:border-purple-600/35 transition-colors"
            >
              <div>
                {/* Year Pill & Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-xs font-mono text-[#2e1065] font-medium uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-[#581c87]" />
                    <span>{edu.period}</span>
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#2e1065] shadow-sm">
                    <GraduationCap className="w-5 h-5 text-[#2e1065]" />
                  </div>
                </div>

                {/* Degree Title */}
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#180524] mb-2 uppercase tracking-tight">
                  {edu.degree}
                </h2>

                {/* Institution */}
                <p className="text-sm font-mono font-medium text-[#581c87] mb-6">
                  {edu.institution}
                </p>

                {/* Highlights */}
                {edu.highlights && (
                  <ul className="space-y-3 text-xs sm:text-sm text-purple-950/85 border-t border-purple-900/10 pt-6 font-normal">
                    {edu.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#581c87] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Coursework pill footer */}
              <div className="mt-8 pt-6 border-t border-purple-900/10 flex flex-wrap gap-2 text-xs font-mono text-purple-950 font-medium">
                {edu.id.includes('msc') ? (
                  <>
                    <span className="px-3 py-1 rounded-lg bg-purple-50 border border-purple-200">Machine Learning</span>
                    <span className="px-3 py-1 rounded-lg bg-purple-50 border border-purple-200">Big Data Architecture</span>
                    <span className="px-3 py-1 rounded-lg bg-purple-50 border border-purple-200">Distributed Systems</span>
                  </>
                ) : (
                  <>
                    <span className="px-3 py-1 rounded-lg bg-purple-50 border border-purple-200">Data Structures</span>
                    <span className="px-3 py-1 rounded-lg bg-purple-50 border border-purple-200">RDBMS &amp; SQL</span>
                    <span className="px-3 py-1 rounded-lg bg-purple-50 border border-purple-200">Computer Networks</span>
                  </>
                )}
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Certifications & Specialized Training */}
        <div className="mb-20">
          <div className="flex items-center gap-2 text-xs font-mono text-[#581c87] uppercase tracking-widest font-bold mb-6">
            <Award className="w-4 h-4 text-[#581c87]" />
            <span>// RELEVANT CERTIFICATIONS &amp; SPECIALIZATIONS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.title}
                  className="p-6 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm flex flex-col justify-between hover:border-purple-600/35 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#2e1065]">
                        <Icon className="w-5 h-5 text-[#2e1065]" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#581c87]">
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-base text-[#180524] mb-1.5 uppercase tracking-tight">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-mono font-medium text-purple-900/70 mb-3">
                      {cert.issuer}
                    </div>
                    <p className="text-xs text-purple-950/80 leading-relaxed font-normal">
                      {cert.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Research Showcase Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#240733] text-[#faf8f5] border border-purple-900 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase text-violet-400 font-bold block mb-1">
              // ACADEMIC THESIS &amp; RESEARCH HIGHLIGHT
            </span>
            <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-white mb-2">
              Wireless Network Vulnerability Prediction (87% Accuracy)
            </h3>
            <p className="text-xs font-mono text-purple-200 max-w-xl font-normal">
              Evaluated 100K+ PCAP packets using Scikit-learn and Random Forest models to predict network intrusions from packet entropy and inter-arrival intervals.
            </p>
          </div>
          <Link
            to="/projects/wireless-network-vulnerability"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-md shadow-purple-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Research Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
