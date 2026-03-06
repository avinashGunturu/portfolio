import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import { AppRoute } from '../types';
import { Mail, Github, Linkedin, Twitter, Copy, Check, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const setRoute = useAppStore((state) => state.setRoute);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setRoute(AppRoute.CONTACT);
  }, [setRoute]);

  const handleCopyEmail = (e: React.MouseEvent) => {
      e.preventDefault();
      navigator.clipboard.writeText('hello@avinash.dev');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', username: '@avinash' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', username: '/in/avinash' },
    { icon: Twitter, label: 'Twitter', href: '#', username: '@avinash_dev' },
  ];

  return (
    // UPDATED: 
    // - Changed `justify-center` to `lg:justify-center` so mobile/tablet aligns to top (justify-start).
    // - Adjusted padding `pt-28` for mobile/tablet to reduce gap but clear navbar.
    <div className="w-full min-h-screen pt-28 lg:pt-32 pb-12 px-4 md:px-8 flex flex-col justify-start lg:justify-center pointer-events-none">
        
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT COLUMN: Empty Space for the 3D Satellite to be visible (Desktop Only) */}
            <div className="hidden lg:block" />

            {/* RIGHT COLUMN: UI Card */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                // Tablet/Mobile: Centered horizontally. Desktop: Aligned right.
                className="pointer-events-auto flex justify-center lg:justify-end w-full"
            >
                 {/* 
                    High Transparency Glass Card
                    bg-[#09090b]/30 -> 30% opacity
                    backdrop-blur-2xl -> "Frosted glass"
                 */}
                 <div className="w-full max-w-lg relative overflow-hidden bg-[#09090b]/30 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                     
                     {/* Gradient Glow Effect behind header */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px] -z-10 pointer-events-none" />

                     {/* Header Section - Compacted */}
                     <div className="mb-8">
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                            </span>
                            Open to Work
                        </div>
                        
                        <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
                            Let's Collaborate.
                        </h2>
                        
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Have a project in mind? I specialize in building high-performance 3D web experiences and scalable SaaS architectures.
                        </p>
                     </div>

                     {/* Compact Email Action */}
                     <div className="bg-black/40 border border-white/10 rounded-xl p-1.5 flex items-center gap-2 mb-6 shadow-inner">
                        <div className="h-10 w-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                            <Mail size={18} />
                        </div>
                        <input 
                            type="text" 
                            readOnly 
                            value="hello@avinash.dev"
                            className="bg-transparent border-none text-white text-sm font-mono flex-1 focus:ring-0 px-2 min-w-0"
                        />
                         <button 
                            onClick={handleCopyEmail}
                            className="h-10 px-4 bg-white text-black text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-lg shrink-0"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                     </div>

                     {/* Socials - Compact Row */}
                     <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Connect on Socials</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {socialLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center py-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                                >
                                    <link.icon size={20} className="mb-2 text-gray-400 group-hover:text-white transition-colors" />
                                    <span className="text-[10px] font-medium text-gray-500 group-hover:text-gray-300 uppercase">{link.label}</span>
                                </a>
                            ))}
                        </div>
                     </div>

                     {/* Footer Link */}
                     <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                         <span className="text-xs text-gray-500">Based in San Francisco</span>
                         <a href="mailto:hello@avinash.dev" className="text-xs text-white font-bold flex items-center gap-1 hover:text-brand-primary transition-colors">
                            Send direct email <ArrowRight size={12} />
                         </a>
                     </div>
                 </div>
            </motion.div>
        </div>
    </div>
  );
};

export default Contact;