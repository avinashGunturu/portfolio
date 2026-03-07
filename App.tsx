import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { PersistentLayout } from './components/Layout/PersistentLayout';
import Home from './pages/Home';
import Journey from './pages/Journey';
import Portfolio from './pages/Portfolio';
import Store from './pages/Store';
import Booking from './pages/Booking';
import Contact from './pages/Contact';

//   Component to force the app to always start at Home ('/'), 
// preventing deep linking or state persistence on reload for a fresh experience.
const AppEntryController: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // If we start at '/', we are ready. If not, we wait for the redirect.
  const [isReady, setIsReady] = useState(location.pathname === '/');
  // hello
  useEffect(() => {
    // If not at home on mount, redirect to home
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, []); // Run once on mount

  useEffect(() => {
    // Watch for location changes. Once we are at '/', we can render the app.
    // This handles the state update after the redirect above occurs.
    if (location.pathname === '/') {
      setIsReady(true);
    }
  }, [location.pathname]);

  // Don't render routes until we are definitely at Home to avoid
  // flashing other pages or triggering their camera transitions.
  if (!isReady) return null;

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppEntryController>
        <Routes>
          <Route element={<PersistentLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/store" element={<Store />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </AppEntryController>
    </BrowserRouter>
  );
};

export default App;