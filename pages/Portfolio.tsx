import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { AppRoute, Project } from '../types';
import { X, ExternalLink, Github, Layers, Zap, ArrowRight, Code2 } from 'lucide-react';

// --- DATA ---
const PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'Nebula Dashboard', 
    category: 'SaaS Platform', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    descriptionShort: 'A high-performance analytics dashboard for visualizing real-time cloud infrastructure data.',
    descriptionLong: 'Nebula is a comprehensive SaaS solution designed for DevOps teams to monitor distributed systems. It aggregates logs, metrics, and traces into a single pane of glass. We focused heavily on rendering performance using WebGL for charts to handle millions of data points without lag.',
    techStack: ['React', 'TypeScript', 'WebGL', 'Node.js', 'Socket.io'],
    features: ['Real-time WebSocket updates', 'Custom WebGL Data Visualization', 'Role-based Access Control', 'Dark/Light Mode support'],
    links: { demo: '#', repo: '#' }
  },
  { 
    id: '2', 
    title: 'Quantum E-com', 
    category: 'E-Commerce', 
    image: 'https://images.unsplash.com/photo-1620912189865-1e8a33fc4d55?q=80&w=1000&auto=format&fit=crop',
    descriptionShort: 'Headless e-commerce storefront offering a seamless shopping experience with 3D product previews.',
    descriptionLong: 'Quantum redefines the shopping experience by integrating 3D product configurators directly into the PDP. Built on a headless architecture, it ensures lightning-fast page loads and SEO optimization while providing a rich, app-like feel.',
    techStack: ['Next.js', 'Three.js', 'Shopify API', 'Tailwind CSS', 'Prisma'],
    features: ['3D Product Configurator', 'Server-side Rendering', 'Stripe Integration', 'AI-powered Recommendations'],
    links: { demo: '#', repo: '#' }
  },
  { 
    id: '3', 
    title: 'Zenith Finance', 
    category: 'FinTech App', 
    image: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=1000&auto=format&fit=crop',
    descriptionShort: 'Personal finance tracker with AI-driven budget forecasting and investment insights.',
    descriptionLong: 'Zenith helps users take control of their financial health. By connecting to banking APIs via Plaid, it automatically categorizes transactions. The core value proposition is the AI forecasting engine which predicts future spending habits based on historical data.',
    techStack: ['React Native', 'Firebase', 'Python', 'TensorFlow', 'Plaid API'],
    features: ['Bank Account Sync', 'Recurring Subscription Detection', 'Spending Heatmaps', 'Goal Tracking'],
    links: { demo: '#', repo: '#' }
  },
  { 
    id: '4', 
    title: 'Aether Social', 
    category: 'Mobile App', 
    image: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1000&auto=format&fit=crop',
    descriptionShort: 'Decentralized social network focusing on privacy and content ownership.',
    descriptionLong: 'Aether is a proof-of-concept social platform built on the lens protocol. It allows creators to own their social graph and monetize content directly without platform intermediaries. The UI is designed to be familiar yet distinct from Web2 counterparts.',
    techStack: ['Flutter', 'GraphQL', 'Solidity', 'IPFS', 'Web3.js'],
    features: ['Wallet-based Login', 'NFT Profile Pictures', 'On-chain Content Storage', 'Direct Tipping'],
    links: { demo: '#', repo: '#' }
  },
];

// --- COMPONENTS ---

const ProjectCard: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to rotation (simulating 3D tilt)
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);

  // Smooth out the movement
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      style={{ perspective: 1000 }} // Kept perspective on wrapper
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group cursor-pointer h-full"
    >
      <motion.div
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          // Removed transformStyle: "preserve-3d" to avoid conflict with overflow: hidden
        }}
        className="relative h-full bg-brand-surface/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group-hover:border-brand-primary/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] flex flex-col"
      >
        {/* Image Section */}
        <div className="relative aspect-[16/9] overflow-hidden bg-black">
           <div className="absolute inset-0 bg-brand-primary/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
           <motion.img 
             layoutId={`img-${project.id}`}
             src={project.image} 
             alt={project.title} 
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
           />
           
           {/* Overlay Button */}
           <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
             <span className="flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-full bg-brand-primary shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                View Details <ArrowRight size={16} />
             </span>
           </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1">
          {/* Removed translateZ logic to ensure visibility on all browsers */}
          <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{project.title}</h3>
                <p className="text-xs text-brand-primary font-mono uppercase tracking-wider mt-1">{project.category}</p>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {project.descriptionShort}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300">
                        {tech}
                    </span>
                ))}
                {project.techStack.length > 3 && (
                    <span className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-500">
                        +{project.techStack.length - 3}
                    </span>
                )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    // Prevent click propagation to close modal when clicking inside content
    const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

    // Fix: Use Portal to render the modal outside of the parent's Stacking Context (transforms/filters)
    // This ensures position: fixed works relative to the viewport, not the container.
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md pointer-events-auto"
            onClick={onClose}
        >
            <motion.div
                layoutId={`modal-${project.id}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-7xl h-[92vh] bg-[#09090b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative group"
                onClick={handleContentClick}
            >
                {/* Close Button - Positioned absolutely to the top-right of the modal container */}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 z-50 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors border border-white/10"
                >
                    <X size={20} />
                </button>

                {/* LEFT COLUMN: IMAGE HERO */}
                {/* On Mobile: Top 35% height. On Desktop: Left 45% width, Full Height */}
                <div className="w-full h-[35vh] md:w-[45%] md:h-full relative flex-shrink-0 bg-black overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
                     <motion.img 
                        layoutId={`img-${project.id}`}
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Gradient Overlays for aesthetics */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#09090b]/80 opacity-60" />
                </div>

                {/* RIGHT COLUMN: SCROLLABLE CONTENT */}
                <div className="w-full md:w-[55%] h-full overflow-y-auto custom-scrollbar bg-[#09090b] flex flex-col">
                    <div className="p-6 md:p-10 md:pt-14 relative">
                        
                        {/* Header Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest rounded-full border border-brand-primary/20">
                                    {project.category}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                                {project.title}
                            </h2>

                            {/* Action Buttons */}
                             {/* UPDATED: Changed flex layout for mobile optimization. 
                                 Used flex-row and flex-1 to keep buttons side-by-side with equal width on small screens.
                                 Reduced padding and font size for mobile breakpoints. 
                             */}
                             <div className="flex flex-row gap-3">
                                <a 
                                    href={project.links.demo} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex-1 sm:flex-none px-4 py-3 sm:px-8 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-white/5 text-sm sm:text-base whitespace-nowrap"
                                >
                                    <ExternalLink size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" /> Live Demo
                                </a>
                                <a 
                                    href={project.links.repo} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex-1 sm:flex-none px-4 py-3 sm:px-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
                                >
                                    <Github size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" /> Source Code
                                </a>
                             </div>
                        </div>

                        <div className="h-px bg-white/10 w-full mb-8" />

                        {/* Description */}
                        <div className="mb-10">
                             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Layers size={16} /> Overview
                             </h3>
                             <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                {project.descriptionLong}
                             </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-10">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Code2 size={16} /> Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 bg-brand-surface border border-white/10 hover:border-brand-primary/50 transition-colors text-indigo-200 text-sm rounded-lg">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Zap size={16} /> Key Features
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {project.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                                        <span className="text-gray-300 text-sm leading-snug">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

// --- MAIN PAGE ---

const Portfolio: React.FC = () => {
  const setRoute = useAppStore((state) => state.setRoute);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setRoute(AppRoute.PORTFOLIO);
  }, [setRoute]);

  return (
    <>
      <div className="w-full min-h-screen pt-32 pb-20 px-4 md:px-20 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Selected Works</h2>
                <p className="text-gray-400 text-lg">
                    A collection of scalable architectures and immersive experiences.
                </p>
            </div>
            <div className="h-px bg-white/10 flex-1 ml-8 hidden md:block mb-4" />
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 md:gap-10">
            {PROJECTS.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
            <ProjectModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;