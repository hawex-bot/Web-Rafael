import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import Home from '@/pages/Home';
import MateriDetail from '@/pages/MateriDetail';
import { motionTransition } from '@/lib/motion';

function AnimatedRoutes() {
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="mx-auto max-w-[68ch] px-6 py-12 md:px-16 md:py-20"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: motionTransition(reduce, 0.26) }}
        exit={{ opacity: 0, transition: motionTransition(reduce, 0.18) }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/materi/:slug" element={<MateriDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <main className="md:pl-[260px]">
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  );
}
