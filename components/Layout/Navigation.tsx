import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Hexagon, ShoppingBag, Calendar, Briefcase, Mail, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Hexagon },
  { path: '/journey', label: 'Journey', icon: Compass },
  { path: '/portfolio', label: 'Work', icon: Briefcase },
  { path: '/store', label: 'Store', icon: ShoppingBag },
  { path: '/booking', label: 'Book', icon: Calendar },
  { path: '/contact', label: 'Contact', icon: Mail },
];

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-brand-dark/80 border border-white/10 backdrop-blur-md shadow-2xl relative">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300 pointer-events-auto z-10 ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {/* Active Background Pill (Water Effect) */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-white/15 border border-white/10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  style={{ borderRadius: 9999 }} // Ensure full rounded pill
                />
              )}
              
              <span className="relative z-10 flex items-center gap-2">
                <item.icon size={18} />
                <span className="text-sm font-medium hidden md:inline">{item.label}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};