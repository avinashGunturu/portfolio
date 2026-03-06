import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useAppStore } from '../store';
import { AppRoute, Service } from '../types';
import { SERVICES, SERVICE_CATEGORIES } from '../constants/services';
import { Clock, Check, Star, X, Calendar, ArrowRight, Zap } from 'lucide-react';

// --- COMPONENTS ---

// 1. Service Card Component
const ServiceCard: React.FC<{ service: Service; onClick: () => void }> = ({ service, onClick }) => {
  return (
    <motion.div
      layoutId={`service-card-${service.id}`}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full
        ${service.isPopular 
            ? 'bg-brand-surface/90 border-brand-primary/40 shadow-[0_0_30px_rgba(99,102,241,0.15)]' 
            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
        }
      `}
    >
        {/* Popular Badge */}
        {service.isPopular && (
            <div className="absolute top-0 right-0">
                <div className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-bl-xl flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> Popular
                </div>
            </div>
        )}

        <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-primary transition-colors">
                {service.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={14} />
                <span>{service.duration}</span>
            </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
            {service.description}
        </p>

        {/* Feature List */}
        <ul className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                    <Check size={12} className="text-green-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                </li>
            ))}
        </ul>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-lg font-bold text-white">{service.price}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Book Now <ArrowRight size={14} />
            </span>
        </div>
    </motion.div>
  );
};

// 2. Cal.com Modal Component
const BookingModal: React.FC<{ service: Service; onClose: () => void }> = ({ service, onClose }) => {
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md pointer-events-auto"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="w-full max-w-5xl h-[85vh] bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c0c0e]">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">{service.title}</h3>
                            <p className="text-xs text-gray-400">{service.duration} • {service.price}</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Iframe Container */}
                <div className="flex-1 bg-white relative">
                    <iframe 
                        src={`https://cal.com/${service.calHandle}/30min?embed=true`} // Mock URL structure, in prod use real handle
                        width="100%" 
                        height="100%" 
                        frameBorder="0"
                        title={`Book ${service.title}`}
                        className="absolute inset-0 w-full h-full"
                    />
                    {/* Placeholder for demo purposes since we don't have real cal handles configured */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[#09090b] text-center p-8 pointer-events-none">
                        <div>
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                <Zap size={32} className="text-brand-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Demo Mode</h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                In a production environment, this would load the Cal.com booking page for: <br />
                                <span className="text-brand-primary font-mono mt-2 block">cal.com/{service.calHandle}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

// --- MAIN PAGE ---

const Booking: React.FC = () => {
  const setRoute = useAppStore((state) => state.setRoute);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    setRoute(AppRoute.BOOKING);
  }, [setRoute]);

  // Group services by active view
  const displayCategories = useMemo(() => {
      if (activeTab === 'All') {
          return ['Clients', 'Developers'];
      }
      return [activeTab];
  }, [activeTab]);

  return (
    <>
        <div className="w-full min-h-screen pt-32 pb-20 px-4 flex flex-col items-center pointer-events-none">
            <div className="w-full max-w-6xl pointer-events-auto">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Availability</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Select a service below to schedule a time that works for you. 
                        Times are automatically converted to your local timezone.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md inline-flex">
                        {SERVICE_CATEGORIES.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                                    activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="booking-tab"
                                        className="absolute inset-0 bg-brand-primary shadow-lg rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dynamic Grid Sections */}
                <div className="space-y-16">
                    {displayCategories.map((category) => {
                        const categoryServices = SERVICES.filter(s => s.category === category);
                        
                        return (
                            <motion.div 
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Section Header (Only visible if showing 'All') */}
                                {activeTab === 'All' && (
                                    <div className="flex items-center gap-4 mb-8">
                                        <h3 className="text-2xl font-bold text-white">{category}</h3>
                                        <div className="h-px flex-1 bg-white/10" />
                                    </div>
                                )}

                                {/* Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categoryServices.map((service) => (
                                        <ServiceCard 
                                            key={service.id} 
                                            service={service} 
                                            onClick={() => setSelectedService(service)}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </div>

        {/* Modal Overlay */}
        <AnimatePresence>
            {selectedService && (
                <BookingModal 
                    service={selectedService} 
                    onClose={() => setSelectedService(null)} 
                />
            )}
        </AnimatePresence>
    </>
  );
};

export default Booking;