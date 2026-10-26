import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { TiltCard } from '../ui/TiltCard';
import { Mail, Linkedin, Copy, Check, Send, User, AtSign, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email format';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a message or inquiry';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      console.log('=== Contact Submission for Ayesha Sahani ===');
      console.log('Timestamp:', new Date().toISOString());
      console.log('Name:', formData.name);
      console.log('Email:', formData.email);
      console.log('Subject:', formData.subject || 'General Inquiry');
      console.log('Message:', formData.message);
      console.log('============================================');

      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#8b5cf6', '#38bdf8', '#a855f7']
      });
    }, 600);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Axevia Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-4 font-semibold uppercase">
              <span>// 06</span>
              <span>START A CONVERSATION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight uppercase">
              Get in Touch
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal">
            Have an open role, engineering challenge, or collaboration proposal? Let's connect and build something extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <TiltCard
              maxTilt={4}
              glowColor="rgba(6, 182, 212, 0.3)"
              className="p-8 sm:p-10 rounded-3xl bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl shadow-slate-200/40 dark:shadow-none space-y-7"
            >
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-slate-950 dark:text-white mb-2 uppercase">
                  Direct Inquiries
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Always open to discussing new web architectures, technical opportunities, or contract positions.
                </p>
              </div>

              {/* Email Card with Quick Copy */}
              <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-slate-600 dark:text-slate-400 font-bold">Email Address</span>
                  <button
                    onClick={copyEmailToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono text-cyan-700 dark:text-cyan-400 transition-colors border border-slate-200 dark:border-transparent shadow-sm font-semibold"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-sm sm:text-base text-slate-950 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors block truncate font-bold"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* LinkedIn Link Card */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 hover:border-violet-500/40 transition-all flex items-center justify-between block"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-violet-100 dark:bg-violet-500/10 border border-violet-300 dark:border-violet-500/20 flex items-center justify-center text-violet-700 dark:text-violet-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-slate-950 dark:text-white group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors uppercase">
                      LinkedIn Network
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">Connect for professional inquiries</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-violet-600 dark:text-violet-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              {/* Location & Timezone info */}
              <div className="pt-5 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 font-mono">
                  <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-slate-900 dark:text-slate-200 font-bold">{PERSONAL_INFO.location}</span>
                </span>
                <span className="font-mono text-cyan-700 dark:text-cyan-300 font-bold">IST (UTC +5:30)</span>
              </div>
            </TiltCard>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={3}
              glowColor="rgba(139, 92, 246, 0.3)"
              className="p-8 sm:p-10 rounded-3xl bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl shadow-slate-200/40 dark:shadow-none"
            >
              {isSubmitted ? (
                <div className="py-12 px-4 text-center space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 className="w-8 h-8 text-cyan-500" />
                  </div>
                  <h3 className="font-heading font-extrabold text-3xl text-slate-950 dark:text-white uppercase">
                    Inquiry Transmitted!
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed font-normal">
                    Thank you for reaching out, <strong className="text-slate-950 dark:text-white">{formData.name}</strong>. Your message has been logged. I'll get back to you shortly!
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      Send Another Note
                    </button>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
                        formData.subject || 'Portfolio Inquiry'
                      )}&body=${encodeURIComponent(formData.message)}`}
                      className="px-6 py-3 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-md"
                    >
                      Open Email Client
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-2 font-bold">
                        Your Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Doe"
                          className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border ${
                            errors.name ? 'border-rose-500' : 'border-slate-300 dark:border-white/10'
                          } text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-all font-medium`}
                        />
                      </div>
                      {errors.name && <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-mono">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-2 font-bold">
                        Your Email *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <AtSign className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border ${
                            errors.email ? 'border-rose-500' : 'border-slate-300 dark:border-white/10'
                          } text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-all font-medium`}
                        />
                      </div>
                      {errors.email && <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-mono">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-2 font-bold">
                      Subject (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Full Stack Opportunity / Web Architecture Consultation"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-all font-medium"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-2 font-bold">
                      Message / Project Scope *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Ayesha, I saw your portfolio and would like to discuss..."
                      className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border ${
                        errors.message ? 'border-rose-500' : 'border-slate-300 dark:border-white/10'
                      } text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-all resize-none font-medium`}
                    />
                    {errors.message && <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-mono">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
