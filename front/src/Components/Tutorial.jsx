import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Play, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';

const TUTORIAL_STEPS = [
  {
    id: "01",
    title: "Ask in Plain English",
    subtitle: "Natural Language to SQL",
    desc: "Type your question like you're talking to a colleague. Our AI understands your schema context and generates optimized, ready-to-run SQL in milliseconds.",
    icon: <MessageSquare className="text-cyan-500" />,
    color: "bg-cyan-500/10",
    visual: (
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
          <Search size={16} className="text-cyan-500" />
          <span className="text-xs italic text-slate-400">"Total revenue by region for Q1..."</span>
        </div>
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-[11px] text-cyan-400 border border-white/10 shadow-2xl relative overflow-hidden">
          <p className="text-pink-400">SELECT</p> region, <p className="text-pink-400">SUM</p>(sales)
          <p className="text-pink-400">FROM</p> global_orders
          <p className="text-pink-400">WHERE</p> quarter = 'Q1' <p className="text-pink-400">GROUP BY</p> 1;
          <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      </div>
    )
  },
  {
    id: "02",
    title: "Instant Execution",
    subtitle: "Live Data Output",
    desc: "Don't just look at code—see the results. Execute queries directly to view live data in a high-performance, filterable administrative table.",
    icon: <Play className="text-emerald-500" />,
    color: "bg-emerald-500/10",
    visual: (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-200" />
            <div className="w-2 h-2 rounded-full bg-slate-200" />
        </div>
        <table className="w-full text-[10px] text-slate-600">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 font-black uppercase tracking-widest text-slate-400">
              <th className="p-3 text-left">Region</th>
              <th className="p-3 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50">
              <td className="p-3 font-medium">North America</td>
              <td className="p-3 text-right font-black text-slate-900">$1.2M</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">Europe</td>
              <td className="p-3 text-right font-black text-slate-900">$0.8M</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  },
  {
    id: "03",
    title: "Visual Intelligence",
    subtitle: "Automated Graphing",
    desc: "Rows are for machines, graphs are for humans. Queryla automatically renders the best chart for your result set, from trend lines to distribution maps.",
    icon: <BarChart3 className="text-indigo-500" />,
    color: "bg-indigo-500/10",
    visual: (
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
        <div className="flex items-end justify-around gap-2 h-32 w-full px-2">
          <motion.div initial={{ height: 0 }} whileInView={{ height: '45%' }} transition={{ duration: 1 }} className="w-full bg-indigo-100 rounded-t-lg" />
          <motion.div initial={{ height: 0 }} whileInView={{ height: '85%' }} transition={{ duration: 1, delay: 0.2 }} className="w-full bg-indigo-300 rounded-t-lg" />
          <motion.div initial={{ height: 0 }} whileInView={{ height: '60%' }} transition={{ duration: 1, delay: 0.4 }} className="w-full bg-indigo-500 rounded-t-lg shadow-[0_0_20px_rgba(99,102,241,0.3)]" />
        </div>
        <div className="mt-4 flex justify-between text-[8px] font-black text-slate-300 uppercase tracking-widest">
            <span>Region A</span><span>Region B</span><span>Region C</span>
        </div>
      </div>
    )
  }
];

export default function TutorialPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-cyan-100 selection:text-cyan-900">
      

      {/* 1. Editorial Hero Section */}
      <header className="pt-40 pb-24 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          
          <h1 className="text-6xl md:text-8xl font-[900] text-slate-900 tracking-tighter leading-[0.9] mb-8">
            Ask. Execute. <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600 italic font-serif font-light">Visualize.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Stop wrestling with syntax. Queryla turns your intent into insights <br className="hidden md:block" /> 
            through an automated, end-to-end data pipeline.
          </p>
        </motion.div>
      </header>

      {/* 2. Step-by-Step Flow */}
      <main className="max-w-7xl mx-auto px-6 pb-40 space-y-32">
        {TUTORIAL_STEPS.map((step, index) => (
          <motion.section 
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col lg:flex-row items-center gap-20 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Text Block */}
            <div className="flex-1 space-y-8">
              <div className={`w-16 h-16 ${step.color} rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm transition-transform hover:scale-110 duration-500`}>
                {step.icon}
              </div>
              <div className="space-y-2">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-600">{step.subtitle}</h4>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                  {step.id}. {step.title}
                </h2>
              </div>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                {step.desc}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                {['No Code', 'Real-time', 'AI-Optimized'].map((badge) => (
                    <div key={badge} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 px-3 py-1 rounded-full bg-white">
                        <ShieldCheck size={12} className="text-emerald-500" /> {badge}
                    </div>
                ))}
              </div>
            </div>

            {/* Visual Block (The "Proof") */}
            <div className="flex-1 w-full relative group">
              <div className="relative z-10 p-10 bg-white border border-slate-100 rounded-[3.5rem] shadow-2xl shadow-slate-200/40 transition-all duration-700 group-hover:shadow-cyan-100 group-hover:-translate-y-2">
                {step.visual}
              </div>
              
              {/* Soft Background Aura */}
              <div className={`absolute -inset-6 ${step.color} blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10`} />
            </div>
          </motion.section>
        ))}
      </main>

      
    </div>
  );
}