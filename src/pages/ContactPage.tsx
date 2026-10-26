import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TiltCard } from '../components/ui/TiltCard';
import {
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  User,
  AtSign,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  Clock
} from 'lucide-react';

export const ContactPage: React.FC = () => {
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
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2e1065', '#581c87', '#7c3aed', '#a855f7', '#d8b4fe']
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
    <div className="pt-28 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-purple-900/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-purple-900/15 text-xs font-mono text-[#581c87] mb-4 font-bold uppercase shadow-sm">
              <span>// 06 START A CONVERSATION</span>
              <span>•</span>
              <span className="text-violet-600">INQUIRIES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-black text-[#180524] tracking-tight uppercase">
              Contact &amp; Connect
            </h1>
          </div>

          <p className="max-w-md text-sm sm:text-base text-purple-950/80 font-normal">
            Have an open full-stack role, technical consulting opportunity, or project proposal? Send a message and let's discuss details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Direct Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <TiltCard
              maxTilt={4}
              glowColor="rgba(124, 58, 237, 0.15)"
              className="p-8 sm:p-10 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm space-y-7"
            >
              <div>
                <h2 className="font-heading font-black text-2xl text-[#180524] mb-2 uppercase tracking-tight">
                  Direct Inquiries
                </h2>
                <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-normal">
                  Always open to discussing new web architectures, technical challenges, or full-stack engineering roles.
                </p>
              </div>

              {/* Email Card with Copy Button */}
              <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-purple-900/70 font-medium">Email Address</span>
                  <button
                    onClick={copyEmailToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-purple-100 text-xs font-mono text-[#581c87] transition-colors border border-purple-200 font-medium shadow-sm"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-sm sm:text-base text-[#581c87] hover:text-[#2e1065] transition-colors block truncate font-semibold"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* LinkedIn Link Card */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-purple-50/60 border border-purple-100 hover:border-purple-300 transition-all flex items-center justify-between block"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-[#2e1065] group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#180524] group-hover:text-[#581c87] transition-colors uppercase">
                      LinkedIn Network
                    </h3>
                    <p className="text-xs text-purple-900/70 font-normal">Connect for professional inquiries</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#581c87] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              {/* GitHub Link Card */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-purple-50/60 border border-purple-100 hover:border-violet-300 transition-all flex items-center justify-between block"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-800 group-hover:scale-105 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#180524] group-hover:text-violet-700 transition-colors uppercase">
                      GitHub Repositories
                    </h3>
                    <p className="text-xs text-purple-900/70 font-normal">Source code &amp; open experiments</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-violet-700 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              {/* Location & Timezone info */}
              <div className="pt-5 border-t border-purple-900/10 flex items-center justify-between text-xs text-purple-950 font-medium">
                <span className="flex items-center gap-1.5 font-mono text-purple-900/70">
                  <MapPin className="w-4 h-4 text-[#581c87]" />
                  <span>{PERSONAL_INFO.location}</span>
                </span>
                <span className="flex items-center gap-1.5 font-mono text-purple-900/70">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>IST (UTC+5:30)</span>
                </span>
              </div>
            </TiltCard>
          </div>

          {/* Validated Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={3}
              glowColor="rgba(124, 58, 237, 0.15)"
              className="p-8 sm:p-10 rounded-3xl bg-white text-[#1e082b] border border-purple-900/15 shadow-sm"
            >
              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-5">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center shadow-md animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#180524] uppercase mb-2">
                      Message Dispatched!
                    </h3>
                    <p className="text-sm font-mono text-purple-950/80 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out, <span className="font-bold text-[#2e1065]">{formData.name}</span>. I have logged your transmission and will review your note promptly.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-xl bg-[#2e1065] hover:bg-[#3b0764] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#581c87] font-bold block mb-1">
                      // DIRECT DISPATCH
                    </span>
                    <h3 className="font-heading font-black text-2xl text-[#180524] uppercase">
                      Send a Message
                    </h3>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-purple-950 font-semibold mb-2">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-900/50">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Jane Doe"
                        className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-purple-50/40 border text-purple-950 placeholder:text-purple-900/40 text-sm font-normal focus:outline-none transition-all ${
                          errors.name
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-purple-200/80 focus:border-[#2e1065] focus:ring-1 focus:ring-[#2e1065]/30'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-rose-600 font-mono mt-1.5">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-purple-950 font-semibold mb-2">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-900/50">
                        <AtSign className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. jane@company.com"
                        className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-purple-50/40 border text-purple-950 placeholder:text-purple-900/40 text-sm font-normal focus:outline-none transition-all ${
                          errors.email
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-purple-200/80 focus:border-[#2e1065] focus:ring-1 focus:ring-[#2e1065]/30'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-rose-600 font-mono mt-1.5">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-purple-950 font-semibold mb-2">
                      Subject / Project Scope
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Full Stack Developer Opportunity"
                      className="w-full px-4 py-3.5 rounded-xl bg-purple-50/40 border border-purple-200/80 text-purple-950 placeholder:text-purple-900/40 text-sm font-normal focus:outline-none focus:border-[#2e1065] transition-all"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-purple-950 font-semibold mb-2">
                      Your Message <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, architecture, or role..."
                      className={`w-full p-4 rounded-xl bg-purple-50/40 border text-purple-950 placeholder:text-purple-900/40 text-sm font-normal focus:outline-none transition-all resize-none ${
                        errors.message
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-purple-200/80 focus:border-[#2e1065] focus:ring-1 focus:ring-[#2e1065]/30'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-600 font-mono mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-[#2e1065] hover:bg-[#3b0764] text-white font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-purple-950/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </TiltCard>
          </div>
        </div>
      </div>
    </div>
  );
};
