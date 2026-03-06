import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import { AppRoute } from '../types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroTechStack } from '../components/HeroTechStack';

const Home: React.FC = () => {
  const setRoute = useAppStore((state) => state.setRoute);

  useEffect(() => {
    setRoute(AppRoute.HOME);
  }, [setRoute]);

  return (
    // UPDATED: Changed layout to start from top on mobile/tablet (justify-start) to reduce top spacing gap.
    // Desktop remains centered.
    <section className="min-h-screen flex flex-col justify-start pt-32 md:pt-40 lg:justify-center lg:pt-0 items-center pointer-events-none">
      <div className="text-center p-8 pointer-events-auto max-w-5xl w-full">
        <h1 className="text-5xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 tracking-tighter uppercase drop-shadow-lg">
          Avinash Gunturu
        </h1>
        
        {/* New Tech Stack HUD Component */}
        <HeroTechStack />

        {/* Short Bio Content */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 font-light leading-relaxed max-w-2xl mx-auto mt-8">
          I build high-performance web apps that scale. Turning complex ideas into clean, reliable software that looks great and drives real business growth.
        </p>
        
        <div className="flex flex-row gap-3 justify-center">
          <Link
            to="/portfolio"
            className="group relative px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm md:text-base whitespace-nowrap"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            // Updated: Enhanced hover effect to fill white and glow
            className="px-6 py-3 md:px-8 md:py-4 border border-white/20 text-white rounded-full font-bold transition-all backdrop-blur-sm hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] text-sm md:text-base whitespace-nowrap"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;