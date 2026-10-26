import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Footer } from './components/sections/Footer';
import { ResumeModal } from './components/ui/ResumeModal';
import { CaseStudyModal } from './components/ui/CaseStudyModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { EducationPage } from './pages/EducationPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fdfbf7] text-[#1e082b] selection:bg-[#3b0764] selection:text-[#faf8f5] flex flex-col justify-between relative">
        {/* Subtle warm ambient background glow */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-300/15 blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-violet-300/10 blur-[130px]" />
        </div>

        {/* Route scroll reset & custom animated cursor */}
        <ScrollToTop />
        <CustomCursor />

        {/* Global Multi-Page Navigation Header */}
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Dedicated Route Views */}
        <main className="flex-1 relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onOpenResume={() => setIsResumeOpen(true)}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route
              path="/projects"
              element={
                <ProjectsPage
                  onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
                />
              }
            />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route
              path="/experience"
              element={
                <ExperiencePage
                  onOpenResume={() => setIsResumeOpen(true)}
                />
              }
            />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Multi-Page Footer */}
        <Footer />

        {/* Global Modals */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        <CaseStudyModal
          isOpen={isCaseStudyOpen}
          onClose={() => setIsCaseStudyOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
