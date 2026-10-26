import React from 'react';
import { X, Download, Printer, Mail, Linkedin, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, RESUME_DETAILS, PROJECTS } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const resumeContent = `AYESHA SAHANI - FULL STACK DEVELOPER
Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
Location: ${PERSONAL_INFO.location}

================================================================
PROFESSIONAL SUMMARY
${RESUME_DETAILS.summary}

================================================================
TECHNICAL SKILLS
• Languages: ${RESUME_DETAILS.technicalSkills.languages.join(', ')}
• Frameworks & Libraries: ${RESUME_DETAILS.technicalSkills.frameworksAndLibs.join(', ')}
• Databases: ${RESUME_DETAILS.technicalSkills.databases.join(', ')}
• Cloud & DevOps: ${RESUME_DETAILS.technicalSkills.cloudAndDevOps.join(', ')}
• Security & AI: ${RESUME_DETAILS.technicalSkills.securityAndAi.join(', ')}

================================================================
WORK EXPERIENCE
${EXPERIENCES.map(
  exp => `
${exp.role.toUpperCase()} | ${exp.company}
Period: ${exp.period} | Location: ${exp.location}
${exp.points.map(p => `  • ${p}`).join('\n')}
Technologies: ${exp.technologies.join(', ')}
`
).join('\n')}

================================================================
EDUCATION
${EDUCATION.map(
  edu => `
${edu.degree.toUpperCase()}
${edu.institution} (${edu.period})
${edu.highlights ? edu.highlights.map(h => `  • ${h}`).join('\n') : ''}
`
).join('\n')}

================================================================
FEATURED PROJECTS
${PROJECTS.map(
  p => `
${p.title.toUpperCase()} (${p.role})
Technologies: ${p.technologies.join(', ')}
${p.liveUrl ? `Live URL: ${p.liveUrl}` : 'Case Study'}
Overview: ${p.description}
`
).join('\n')}
`;

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ayesha_Sahani_Full_Stack_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#240733] text-[#faf8f5] border border-purple-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/50 bg-[#1b0429] sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/80 border border-purple-700 flex items-center justify-center text-violet-300 font-bold shadow-sm">
              <Briefcase className="w-5 h-5 text-violet-300" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white">Ayesha Sahani — Curriculum Vitae</h3>
              <p className="text-xs text-purple-300 font-medium">Full Stack Developer • Verified Portfolio Credentials</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-xs font-semibold text-purple-200 transition-colors border border-purple-700"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-300 hover:text-white transition-colors border border-purple-700"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Resume Header Info */}
          <div className="border-b border-purple-900/40 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-heading font-black text-white tracking-tight uppercase">Ayesha Sahani</h1>
                <p className="text-lg font-bold text-violet-300 mt-0.5">Full Stack Developer</p>
              </div>
              <div className="flex flex-col gap-1 text-xs text-purple-300 sm:text-right font-medium">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center sm:justify-end gap-1.5 hover:text-white transition-colors font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-violet-400" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center sm:justify-end gap-1.5 hover:text-white transition-colors font-medium"
                >
                  <Linkedin className="w-3.5 h-3.5 text-violet-400" />
                  <span>LinkedIn Profile</span>
                </a>
                <span className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>{PERSONAL_INFO.location}</span>
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm text-purple-100 leading-relaxed max-w-3xl font-normal">
              {RESUME_DETAILS.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-300 mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_#a855f7]" />
              Core Competencies &amp; Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-800">
                <span className="text-xs font-bold text-violet-300 block mb-1">Frontend Engineering</span>
                <p className="text-purple-100 font-normal">React.js, Next.js, HTML5, CSS3, Tailwind CSS, Responsive Design, Three.js</p>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-800">
                <span className="text-xs font-bold text-violet-300 block mb-1">Backend &amp; Database</span>
                <p className="text-purple-100 font-normal">Node.js, Express.js, REST APIs, PostgreSQL, SQL Optimization, Auth</p>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-800">
                <span className="text-xs font-bold text-violet-300 block mb-1">Cloud &amp; Infrastructure</span>
                <p className="text-purple-100 font-normal">AWS EC2, Cloudflare (DNS/SSL), Vercel, Docker, CI/CD, GitHub Actions</p>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-800">
                <span className="text-xs font-bold text-violet-300 block mb-1">Languages &amp; AI</span>
                <p className="text-purple-100 font-normal">TypeScript, JavaScript (ES6+), Python, Scikit-learn, Google Gemini API</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-300 mb-4 flex items-center gap-2 font-bold">
              <Briefcase className="w-3.5 h-3.5 text-violet-400" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {EXPERIENCES.map(exp => (
                <div key={exp.id} className="relative pl-5 border-l-2 border-violet-500/50">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-violet-400" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="font-heading font-black text-white text-base">{exp.role}</h3>
                    <span className="text-xs font-mono text-violet-300 font-medium">{exp.period}</span>
                  </div>
                  <div className="text-sm text-purple-300 font-medium mb-2">{exp.company} • {exp.location}</div>
                  <ul className="space-y-1.5 text-sm text-purple-100">
                    {exp.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-violet-400 mt-1 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-900 border border-purple-700 text-purple-200 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-300 mb-4 flex items-center gap-2 font-bold">
              <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
              Education &amp; Degrees
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDUCATION.map(edu => (
                <div key={edu.id} className="p-4 rounded-xl bg-purple-950/60 border border-purple-800">
                  <div className="flex items-center justify-between text-xs font-mono text-violet-300 mb-1 font-medium">
                    <span>{edu.period}</span>
                    <Award className="w-3.5 h-3.5 text-violet-400" />
                  </div>
                  <h3 className="font-heading font-black text-white text-sm">{edu.degree}</h3>
                  <p className="text-xs text-purple-300 mt-1 font-normal">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-purple-900/50 bg-[#1b0429] flex items-center justify-between text-xs text-purple-300 font-medium">
          <span>Available for Full-time roles &amp; Engineering contracts</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-white transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
