import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Database, Globe, Cpu, Layers, Box, Terminal, FileJson, Zap, Cloud, Smartphone, Flame, FileCode, Hexagon, TestTube, Play, CloudLightning, Send } from 'lucide-react';

const TECH_ITEMS = [
  { icon: Code2, label: 'React' },
  { icon: Globe, label: 'Next.js' },
  { icon: FileCode, label: 'JavaScript' },
  { icon: Terminal, label: 'TypeScript' },
  { icon: Server, label: 'Node.js' },
  { icon: Server, label: 'Express.js' },
  { icon: Hexagon, label: 'NestJS' },
  { icon: FileCode, label: 'Python' },
  { icon: Database, label: 'MongoDB' },
  { icon: Database, label: 'PostgreSQL' },
  { icon: Zap, label: 'Supabase' },
  { icon: Flame, label: 'Firebase' },
  { icon: Layers, label: 'Tailwind CSS' },
  { icon: Box, label: 'Three.js' },
  { icon: Cpu, label: 'Docker' },
  { icon: FileJson, label: 'GraphQL' },
  { icon: Zap, label: 'Vite' },
  { icon: TestTube, label: 'Vitest' },
  { icon: Play, label: 'Playwright' },
  { icon: Cloud, label: 'AWS' },
  { icon: CloudLightning, label: 'GCP' },
  { icon: Smartphone, label: 'React Native' },
  { icon: Send, label: 'Postman' }
];

export const HeroTechStack: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 md:mb-10 flex flex-col items-center gap-6 md:gap-8">
      
      {/* Top Layer: Static Value Props */}
      {/* Updated: Reduced text size on mobile (text-xs) and gap for tighter layout */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs md:text-base font-medium text-indigo-200/80 uppercase tracking-widest text-center px-4">
        <span className="whitespace-nowrap">Full-Stack Architecture</span>
        <span className="text-white/10 text-[10px] hidden sm:inline text-xl leading-none">•</span>
        <span className="whitespace-nowrap">SaaS Product Development</span>
        <span className="text-white/10 text-[10px] hidden sm:inline text-xl leading-none">•</span>
        <span className="whitespace-nowrap">High-Performance UI</span>
      </div>

      {/* Bottom Layer: Glass Marquee */}
      {/* Container with Mask for Fading Edges */}
      <div 
        className="relative w-full max-w-3xl overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        {/* Glass Effect Background (HUD Style) */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-full z-0" />
        
        {/* Marquee Track - Reduced padding on mobile */}
        <div className="flex relative z-10 py-2 md:py-3">
             <MarqueeGroup />
             <MarqueeGroup />
        </div>
      </div>
    </div>
  );
};

const MarqueeGroup = () => (
    <motion.div 
        className="flex gap-8 md:gap-12 items-center flex-shrink-0 px-6" // Reduced gap on mobile
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        // Updated: Duration increased to 50 for slower, smoother scroll
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
        {TECH_ITEMS.map((item, index) => (
            <div key={index} className="flex items-center gap-2 md:gap-3 text-gray-300 group cursor-default">
                {/* Reduced icon size on mobile using Tailwind classes instead of size prop for responsiveness */}
                <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <span className="font-mono font-bold text-xs md:text-sm tracking-wide group-hover:text-white transition-colors">{item.label}</span>
            </div>
        ))}
    </motion.div>
);