import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useAppStore } from '../store';
import { AppRoute, Product } from '../types';
import { Check, Sparkles, ArrowRight, ShoppingBag, X, Zap, Layers, Box } from 'lucide-react';

const PRODUCTS: Product[] = [
  { 
    id: '1', 
    title: 'Ultimate R3F Starter', 
    price: '$29', 
    description: 'Stop wasting time on configuration. This boilerplate gives you a production-ready React Three Fiber setup.',
    longDescription: 'The Ultimate R3F Starter is the result of 3 years of refining the perfect 3D web stack. It solves the common headaches developers face: reconciling the DOM with the Canvas, handling complex state management between Z-space and HTML, and optimizing performance for mobile devices. \n\nIdeally suited for creative developers who want to skip the 2-day setup process and jump straight into shader coding.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    tag: 'Template',
    includes: [
        'Next.js 14 + R3F Configured',
        'Pre-built Loading States',
        'Custom Camera Rig',
        'Performance Guide'
    ],
    features: [
      'Zero-config TypeScript setup',
      'Automatic GLTF compression pipeline',
      'SEO-friendly HTML overlays',
      'Post-processing effects pre-installed'
    ],
    techSpecs: ['React 18', 'Three.js r160+', 'Tailwind CSS', 'Framer Motion']
  },
  { 
    id: '2', 
    title: 'Shader Pack Vol. 1', 
    price: '$19', 
    description: 'Elevate your scenes with 10 high-quality, performant GLSL shaders. Drag and drop into any mesh.',
    longDescription: 'Shader Pack Vol. 1 is a curated collection of high-performance fragment shaders designed for sci-fi and cyberpunk aesthetics. Unlike standard materials, these are written in raw GLSL for maximum frame rate efficiency while delivering movie-quality visuals. \n\nEach shader exposes uniform variables for easy customization within React Three Fiber.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    tag: 'Asset',
    includes: [
        '10 Custom Fragment Shaders',
        'Holographic Effects',
        'Noise Texture Library',
        'TypeScript Types'
    ],
    features: [
      'Glitch & Distortion effects',
      'Hologram projectors',
      'Procedural terrain noise',
      'Interactive mouse uniforms'
    ],
    techSpecs: ['GLSL 3.0', 'TRESJS Compatible', 'Vanilla JS Compatible']
  },
  { 
    id: '3', 
    title: 'Portfolio System', 
    price: '$49', 
    description: 'The exact source code used to build this immersive portfolio. Learn how to manage 3D scenes.',
    longDescription: 'Get access to the full repository of this portfolio website. This includes the complex routing logic that keeps the 3D scene persistent while pages change, the camera rig system, and the custom asset loading strategies. \n\nThis is not just a template, but an educational resource on how to architect large-scale React Three Fiber applications.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    tag: 'Source Code',
    includes: [
        'Full React Source Code',
        'Blender Models (.glb)',
        'Zustand State Manager',
        'Tailwind Config'
    ],
    features: [
      'Persistent Layout Architecture',
      'Smooth Camera Transitions',
      'Mobile Performance Optimization',
      'Custom Lucide Icon Integration'
    ],
    techSpecs: ['Vite', 'React Router 6', 'Zustand', 'React Spring']
  },
];

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number] 
    } 
  }
};

// --- PRODUCT MODAL COMPONENT ---
// This handles the "Page Level Content" view
const ProductModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return createPortal(
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
    >
        <motion.div
            layoutId={`product-${product.id}`}
            className="w-full max-w-6xl h-[85vh] bg-[#09090b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
            onClick={handleContentClick}
        >
             {/* Close Button */}
             <button 
                onClick={onClose}
                className="absolute top-5 right-5 z-50 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors border border-white/10"
            >
                <X size={20} />
            </button>

            {/* Left: Image / Visuals */}
            <div className="w-full md:w-[40%] h-[30vh] md:h-full relative bg-black border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8 right-8">
                     <span className="px-3 py-1 bg-brand-primary/20 text-brand-primary border border-brand-primary/20 text-xs font-bold uppercase tracking-widest rounded-lg mb-4 inline-block">
                        {product.tag}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{product.title}</h2>
                    <p className="text-xl text-brand-primary font-mono">{product.price}</p>
                </div>
            </div>

            {/* Right: Page Level Content */}
            <div className="w-full md:w-[60%] h-full overflow-y-auto custom-scrollbar bg-[#0c0c0e]">
                <div className="p-8 md:p-12">
                    
                    {/* Main Description */}
                    <div className="mb-10">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                           <Sparkles size={16} /> Overview
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                           {product.longDescription || product.description}
                        </p>
                    </div>

                    <div className="h-px bg-white/5 w-full mb-10" />

                    {/* Technical Specs & Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                         <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                               <Zap size={16} /> Features
                            </h3>
                            <ul className="space-y-3">
                                {product.features?.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                        <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                                        <span>{feat}</span>
                                    </li>
                                )) || product.includes.map((inc, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                      <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                                      <span>{inc}</span>
                                  </li>
                                ))}
                            </ul>
                         </div>
                         
                         <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                               <Box size={16} /> Tech Stack
                            </h3>
                             <div className="flex flex-wrap gap-2">
                                {product.techSpecs?.map((tech, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-indigo-200">
                                        {tech}
                                    </span>
                                ))}
                             </div>
                         </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="sticky bottom-0 bg-[#0c0c0e]/95 backdrop-blur-lg border-t border-white/10 -mx-8 -mb-12 p-8 flex items-center justify-between gap-4">
                        <div className="hidden md:block">
                            <span className="block text-xs text-gray-500 uppercase">Total Price</span>
                            <span className="text-2xl font-bold text-white">{product.price}</span>
                        </div>
                        <button className="flex-1 md:flex-none md:w-1/2 py-4 bg-white hover:bg-brand-primary text-black hover:text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3">
                            <ShoppingBag size={20} /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    </motion.div>,
    document.body
  );
};

const Store: React.FC = () => {
  const setRoute = useAppStore((state) => state.setRoute);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setRoute(AppRoute.STORE);
  }, [setRoute]);

  return (
    <>
      <div className="w-full min-h-screen pt-32 pb-20 px-4 md:px-8 pointer-events-none flex flex-col items-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl w-full mx-auto pointer-events-auto"
        >
          
          {/* Header - Aligned Right */}
          <motion.div
            variants={itemVariants}
            className="mb-12 flex flex-col items-end text-right gap-6"
          >
            <div className="flex flex-col items-end gap-4 max-w-2xl relative z-10">
              <div className="flex items-center justify-end gap-3 flex-row-reverse">
                  <div className="p-3 bg-brand-primary/10 rounded-xl border border-brand-primary/20 text-brand-primary backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                      <Sparkles size={24} />
                  </div>
                  <h2 className="text-5xl font-bold text-white tracking-tight drop-shadow-lg">Digital Assets</h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed drop-shadow-md">
                Premium tools and production-ready assets to accelerate your creative workflow.
              </p>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-end gap-4 relative z-10">
              <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-gray-300 backdrop-blur-sm">
                  <Check size={14} className="text-green-400" /> Instant Delivery
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-gray-300 backdrop-blur-sm">
                  <Check size={14} className="text-green-400" /> Lifetime Updates
              </span>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => setSelectedProduct(product)} 
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedProduct && (
            <ProductModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
            />
        )}
      </AnimatePresence>
    </>
  );
};

// --- PRODUCT CARD (The "Teaser") ---
const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => {
    return (
        <motion.div
            layoutId={`product-${product.id}`}
            variants={itemVariants}
            onClick={onClick}
            className="group relative flex flex-col h-full bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-brand-primary/40 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.2)] hover:-translate-y-1 cursor-pointer"
        >
            {/* Image Area */}
            <div className="relative h-52 overflow-hidden bg-black">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] to-transparent z-10 opacity-80" />
                
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                />
                
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-md shadow-lg">
                        {product.tag}
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-1 relative z-20 -mt-2 text-left">
                
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-brand-primary transition-colors">
                        {product.title}
                    </h3>
                    <span className="text-lg font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                        {product.price}
                    </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {product.description}
                </p>

                {/* Features Compact List */}
                <div className="mb-6 space-y-2.5">
                    {product.includes.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-gray-400">
                             <div className="w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0" />
                             <span>{item}</span>
                        </div>
                    ))}
                    {product.includes.length > 3 && (
                         <div className="text-[10px] text-gray-500 pl-4">+ {product.includes.length - 3} more items</div>
                    )}
                </div>

                {/* Buy Button (Now acts as "View Details" visually, but functionally opens modal) */}
                <div className="mt-auto">
                    <button className="relative w-full py-3.5 bg-white group-hover:bg-brand-primary text-black group-hover:text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg">
                        <ShoppingBag size={18} />
                        <span>View Details</span>
                        <ArrowRight size={18} className="opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default Store;