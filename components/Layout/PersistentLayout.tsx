import React, { Suspense, useRef, useEffect, ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from './Navigation';
import { Experience } from '../Scene/Experience';
import { CameraController } from '../Scene/CameraController';
import { useIsMobile } from '../../hooks/useIsMobile';

// Simple Error Boundary for the 3D Scene
interface SceneErrorBoundaryProps {
  children?: ReactNode;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends React.Component<SceneErrorBoundaryProps, SceneErrorBoundaryState> {
  constructor(props: SceneErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any): SceneErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("3D Scene Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; // Return null to render nothing in the canvas if critical error occurs
    }
    return this.props.children;
  }
}

export const PersistentLayout: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll Reset: Ensure we start at the top of the page when navigating
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="relative w-full h-screen bg-brand-dark text-white overflow-hidden">
      {/* 
        LAYER 1: 3D WORLD (Z-INDEX 0)
        Persistent: Does not unmount on route change.
      */}
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows={!isMobile} // Disable shadows on mobile for perf
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]} // Cap DPR on mobile
          gl={{ antialias: !isMobile }} // Optional: disable AA on mobile
        >
          <SceneErrorBoundary>
            <Suspense fallback={null}>
              <CameraController />
              <Experience />
            </Suspense>
          </SceneErrorBoundary>
        </Canvas>
      </div>

      {/* 
        LAYER 2: UI INTERFACE (Z-INDEX 10)
        pointer-events-none allows clicks to pass through to canvas.
        Interactive elements must re-enable pointer-events.
      */}
      <div className="relative z-10 h-full w-full flex flex-col pointer-events-none">
        <Navigation />

        {/* 
          Page Transition Wrapper 
          Using AnimatePresence to handle DOM exit animations.
          
          NOTE: Removed 'filter: blur()' transition to prevent rendering bugs with 
          backdrop-filter elements (Glassmorphism) in Chrome/Safari.
        */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="w-full min-h-full"
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile/Perf Indicator */}
      {/* <div className="fixed bottom-4 right-4 z-50 pointer-events-none text-[10px] text-white/20 uppercase tracking-widest font-mono">
        {isMobile ? 'Mobile Opt.' : 'High Perf'} :: WebGL Active
      </div> */}
    </div>
  );
};
