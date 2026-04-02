import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from './Authprovider';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  PlayCircle 
} from 'lucide-react';

// Component Imports
import Nav from './Nav';
import Tools from './Tools';
import TutorialPage from './Tutorial';
import Faqitems from './Faqitems';
import Review from './Review';
import Footer from './Footer';

const Practicals = () => {
  const { islogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleclick = () => {
    islogin ? navigate('/data') : navigate('/login');
  };

  // Ultra-smooth easing for a high-end feel
  const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className="bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 min-h-screen antialiased">
      <Nav />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-12 md:pt-40 md:pb-20 overflow-hidden">
        {/* Subtle Background Detail */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-50/40 via-white to-white -z-10" />
        
        <div className="container mx-auto px-6 text-center">
          {/* Replaced Image with Lucide Sparkles + Premium Text */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-50/50 border border-indigo-100/50 mb-10 shadow-sm"
          >
            <Sparkles size={14} className="text-indigo-600 animate-pulse" />
            <span className="text-[12px] font-bold text-indigo-700 tracking-wider uppercase">
              Talk to your data
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.05]"
          >
            Search refined. <br />
            <span className="text-indigo-600">Intelligence defined.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Queryla is the intuitive search layer for your data. Extract insights, 
            filter through noise, and visualize results in a clean, unified interface.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={handleclick} 
              className="group px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-indigo-200 hover:-translate-y-0.5 flex items-center gap-2"
            >
              Start for free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT WRAPPER --- */}
      <div className="bg-white relative z-10">
        
        {/* Features Section - Reduced Padding */}
        <SectionWrapper>
          <div className="py-12 md:py-16 border-t border-slate-50">
            <Tools />
          </div>
        </SectionWrapper>

        {/* Tutorial Section - Reduced Padding */}
        <SectionWrapper>
          <div className="py-12 md:py-16 bg-slate-50/50 border-y border-slate-100">
            <div className="container mx-auto px-6">
                <TutorialPage />
            </div>
          </div>
        </SectionWrapper>

        {/* FAQ & Reviews - Tightened Spacing */}
        <SectionWrapper>
          <div className="py-12 md:py-16 container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Faqitems />
            </div>
            
            {/* Reduced mt gap between FAQ and Reviews */}
            <div className="mt-16 md:mt-24">
              <Review />
            </div>
          </div>
        </SectionWrapper>

      </div>

      <Footer />
    </div>
  );
};

/**
 * Reusable Scroll Reveal with Tightened "Slide-up" effect
 */
const SectionWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Practicals;