import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import { AppRoute } from '../types';
import { Download, Calendar, Code } from 'lucide-react';

const TIMELINE_DATA = [
  {
    role: "Software Development Engineer - 2",
    company: "Upsure AI",
    companyUrl: "https://www.upsure.io/",
    date: "JUNE 2023 — PRESENT",
    bullets: [
      "Architected scalable full-stack InsurTech platforms (React, Node.js, PostgreSQL) for enterprise clients, including an RBAC system handling 50,000+ agents.",
      "Drove global delivery via a 2-month on-site deployment in Dubai, shipping features and integrating LLM & PDF APIs to automate internal workflows.",
      "Spearheaded legacy React upgrades resulting in ~40% bundle performance enhancements, and built custom UI libraries reducing new feature turnaround by 30%."
    ]
  },
  {
    role: "Front End Developer",
    company: "Itzeazy",
    companyUrl: "https://itzeazy.in/",
    date: "APRIL 2022 — JUNE 2023",
    bullets: [
      "Owned end-to-end frontend architecture of a pan-India driving school aggregator, designing intricate user flows in Figma and developing the engine in React.js.",
      "Integrated dynamic REST APIs, comprehensive admin dashboards, and robust payment gateways handling massive real-time booking operations.",
      "Boosted platform load performance by 50% through surgical component rendering optimizations, lazy-loading pipelines, and enforced cross-browser fidelity."
    ]
  }
];

const SKILL_LIST = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express.js",
  "NestJS", "Python", "Java", "C++", "MongoDB", "PostgreSQL", "Supabase", "Firebase",
  "HTML5", "CSS3", "Tailwind CSS", "Shadcn UI", "Three.js", "WebGL", "AWS", "GCP", "Netlify", "Docker", "REST APIs", "GraphQL",
  "JWT", "RBAC", "Razorpay",
  "Prisma", "Zustand", "Redux", "TanStack Query", "Vite", "Vitest", "Jest", "Playwright", "Storybook", "Postman", "Git", "Figma"
];

const Journey: React.FC = () => {
  const setRoute = useAppStore((state) => state.setRoute);

  useEffect(() => {
    setRoute(AppRoute.JOURNEY);
  }, [setRoute]);

  return (
    <div className="w-full min-h-screen pt-28 pb-10 px-4 md:px-12 flex items-center pointer-events-none">
      {/* 
        Changed grid breakpoint to lg (1024px) so tablets get the single-column full-width layout 
        similar to mobile.
      */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT COLUMN: Timeline Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto flex flex-col justify-center"
        >
          {/* Card Container matching screenshot */}
          <div className="bg-brand-surface/90 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl">

            {/* Header Section */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
              <div>
                <h2 className="text-4xl font-bold text-white mb-1">My Journey</h2>
                <p className="text-gray-400 text-sm">Professional History & Milestones</p>
              </div>
              <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-lg">
                <Download size={18} />
                {/* Updated text for better clarity and actionability */}
                <span>Download Resume</span>
              </button>
            </div>

            {/* Timeline Section */}
            <div className="relative pl-2">
              {/* Continuous vertical line background */}
              <div className="absolute top-2 bottom-0 left-[9px] w-[2px] bg-white/10" />

              <div className="space-y-10">
                {TIMELINE_DATA.map((item, index) => (
                  <div key={index} className="relative pl-10 group">
                    {/* Timeline Dot */}
                    <span className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-[3px] border-brand-primary bg-black z-10 group-hover:scale-110 group-hover:bg-brand-primary transition-all duration-300 shadow-[0_0_10px_rgba(99,102,241,0.3)]" />

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-1 sm:gap-4 items-baseline mb-2">
                      <h3 className="text-xl font-bold text-white">{item.role}</h3>
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-primary font-medium text-right sm:text-left hover:underline hover:text-white transition-colors"
                        >
                          {item.company}
                        </a>
                      ) : (
                        <span className="text-brand-primary font-medium text-right sm:text-left">{item.company}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono uppercase tracking-widest mb-3">
                      <Calendar size={12} />
                      {item.date}
                    </div>

                    <ul className="text-gray-400 text-[13px] sm:text-sm leading-relaxed max-w-md list-disc ml-4 space-y-1.5 opacity-90">
                      {item.bullets.map((bullet, bIndex) => (
                        <li key={bIndex} className="pl-1 marker:text-brand-primary">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 
              MOBILE/TABLET SKILLS SECTION 
              Visible on small screens and tablets (hidden on lg and up).
              Replaces the 3D sphere which is hidden on mobile/tablet.
            */}
            <div className="mt-12 pt-8 border-t border-white/10 lg:hidden">
              <div className="flex items-center gap-2 mb-4 text-brand-primary">
                <Code size={20} />
                <h3 className="text-xl font-bold text-white">Technical Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILL_LIST.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT COLUMN: Transparent for 3D View (Desktop Only) */}
        {/* The 3D scene (Skill Cloud) is positioned here via Camera Controller and Scene logic */}
        <div className="hidden lg:flex pointer-events-none" />

      </div>
    </div>
  );
};

export default Journey;