import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Search, 
  BarChart3, 
  Cpu, 
  Table as TableIcon,
  CheckCircle2, 
  Sparkles,
  Terminal,
  Layers
} from 'lucide-react';

const STEPS = [
  {
    id: 1,
    label: "Step 01",
    title: "Database Connection",
    desc: "Connecting via URI. Queryla performs a deep schema scan to map tables and foreign keys in real-time.",
    icon: <Database size={20} className="text-indigo-600" />,
    duration: 3500 
  },
  {
    id: 2,
    label: "Step 02",
    title: "Neural Intent Parsing",
    desc: "AI Engine (Llama-3) translates your natural language into an optimized, injection-safe SQL query.",
    icon: <Cpu size={20} className="text-violet-600" />,
    duration: 4000
  },
  {
    id: 3,
    label: "Step 03",
    title: "SQL Generation",
    desc: "The AI assistant outputs the precise SQL structure required to fetch your requested data.",
    icon: <Terminal size={20} className="text-blue-600" />,
    duration: 3500
  },
  {
    id: 4,
    label: "Step 04",
    title: "Raw Data Extraction",
    desc: "The engine executes the query and retrieves the 'Source Data' in a high-performance administrative table.",
    icon: <TableIcon size={20} className="text-amber-600" />,
    duration: 4000
  },
  {
    id: 5,
    label: "Step 05",
    title: "Visual Synthesis",
    desc: "Queryla automatically renders the best visualization—like a distribution pie chart—for boardroom insights.",
    icon: <BarChart3 size={20} className="text-emerald-600" />,
    duration: 4000
  }
];

const FullAutomationGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setCurrentStep(0); // Infinite Loop
      }
    }, STEPS[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <section className="py-24 bg-[#FCFCFD]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
            The Neural <span className="text-indigo-600 italic">Engine.</span>
          </h2>
          <p className="text-slate-500 font-medium">An automated walkthrough of the Queryla data-to-insight pipeline.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT: STEP DESCRIPTIONS --- */}
          <div className="lg:col-span-5 space-y-3">
            {STEPS.map((step, idx) => (
              <div 
                key={step.id}
                className={`p-6 rounded-[2rem] border transition-all duration-700 ${
                  currentStep === idx 
                  ? "bg-white border-slate-200 shadow-xl shadow-slate-200/40 scale-[1.02]" 
                  : "bg-transparent border-transparent opacity-20 grayscale"
                }`}
              >
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white shadow-sm border border-slate-100">
                    {step.icon}
                  </div>
                  <div>
                    <span className={`text-[9px] font-black uppercase tracking-widest mb-1 block ${currentStep === idx ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                    <h4 className="font-bold text-slate-900 text-md mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- RIGHT: THE INTERACTIVE MOCKUP (Video Reference) --- */}
          <div className="lg:col-span-7 sticky top-12">
            <div className="bg-slate-900 rounded-[3rem] p-3 shadow-2xl">
              <div className="bg-white rounded-[2.6rem] overflow-hidden min-h-[550px] flex flex-col">
                
                {/* Dashboard Top Nav Mock */}
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Queryla / AI Assistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-tighter">System Live</span>
                  </div>
                </div>

                {/* Main Viewport */}
                <div className="flex-1 p-8 flex flex-col justify-center relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    
                    {/* STEP 1: DB CONNECTION (Reference 00:04) */}
                    {currentStep === 0 && (
                      <motion.div key="s1" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-sm mx-auto space-y-4">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                          <Database size={18} className="text-indigo-600" />
                          <div className="font-mono text-[9px] text-slate-400 truncate">postgresql://yash_sawant:****@host.db:5432/main</div>
                        </div>
                        <div className="flex justify-center gap-2">
                           <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-bold border border-indigo-100">Ready to Query</span>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: SEARCH INPUT (Reference 00:33) */}
                    {currentStep === 1 && (
                      <motion.div key="s2" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-6">
                        <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-xl border-l-4 border-l-indigo-600">
                          <Search size={18} className="text-indigo-600" />
                          <span className="text-sm font-medium italic text-slate-600">"show me all the customers"</span>
                        </div>
                        <div className="flex justify-center items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                           <Sparkles size={12} className="animate-pulse text-indigo-500" /> AI Thinking...
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: GENERATED SQL (Reference 00:45) */}
                    {currentStep === 2 && (
                      <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                        <div className="bg-slate-900 p-6 rounded-2xl font-mono text-[11px] text-indigo-300 shadow-2xl leading-relaxed">
                           <p className="text-indigo-500/40 mb-2">-- Generated Query</p>
                           <span className="text-pink-400">SELECT</span> * <span className="text-pink-400">FROM</span> customers;
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: SOURCE DATA TABLE (Reference 00:24 & 01:00) */}
                    {currentStep === 3 && (
                      <motion.div key="s4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="w-full border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 text-[9px] font-black uppercase text-slate-400 tracking-tighter">Source Data</div>
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-white border-b border-slate-50 text-[9px] font-bold text-slate-500">
                              <th className="p-3">ID</th><th className="p-3">NAME</th><th className="p-3">CITY</th>
                            </tr>
                          </thead>
                          <tbody className="text-[9px] text-slate-600">
                            <tr className="border-b border-slate-50">
                              <td className="p-3">1</td><td className="p-3 font-bold text-slate-900">Rahul Sharma</td><td className="p-3">Mumbai</td>
                            </tr>
                            <tr>
                              <td className="p-3">2</td><td className="p-3 font-bold text-slate-900">Priya Patel</td><td className="p-3">Pune</td>
                            </tr>
                          </tbody>
                        </table>
                      </motion.div>
                    )}

                    {/* STEP 5: VISUAL INSIGHT (Reference 01:02) */}
                    {currentStep === 4 && (
                      <motion.div key="s5" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full flex flex-col items-center gap-8">
                         <div className="flex items-center justify-center gap-10 w-full">
                            {/* Simple Pie Chart Representation */}
                            <div className="w-36 h-36 rounded-full border-[14px] border-indigo-600 border-r-indigo-100 border-b-indigo-200 shadow-xl" />
                            <div className="space-y-3">
                               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-600" /><span className="text-[10px] font-bold">Mumbai (54%)</span></div>
                               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-200" /><span className="text-[10px] font-bold text-slate-400">Pune (22%)</span></div>
                               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-100" /><span className="text-[10px] font-bold text-slate-400">Other (24%)</span></div>
                            </div>
                         </div>
                         <div className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 flex items-center gap-2">
                            <Layers size={14} /> Neural Insight Ready
                         </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FullAutomationGuide;