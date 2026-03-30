import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  MessageSquare, 
  Play, 
  BarChart3, 
  ShieldCheck, 
  Search 
} from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    id: "01",
    title: "Ask in Plain English",
    subtitle: "Semantic Search",
    desc: "Type your question like you're talking to a colleague. Our AI understands your schema context and generates optimized, ready-to-run SQL in milliseconds.",
    icon: <MessageSquare className="text-indigo-600" />,
    color: "bg-indigo-50",
    visual: (
      <motion.div className="space-y-4">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3"
        >
          <Search size={16} className="text-indigo-500" />
          <span className="text-xs font-medium text-slate-400">"What was our churn rate last month?"</span>
        </motion.div>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900 rounded-xl p-5 font-mono text-[11px] leading-relaxed text-indigo-300 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <p className="text-indigo-500">SELECT</p> churn_rate <br/>
          <p className="text-indigo-500">FROM</p> analytics_overview <br/>
          <p className="text-indigo-500">WHERE</p> month = 'previous';
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-400 rounded-full" 
          />
        </motion.div>
      </motion.div>
    )
  },
  {
    id: "02",
    title: "Instant Execution",
    subtitle: "Real-time Processing",
    desc: "Don't just look at code—see the results. Execute queries directly to view live data in a high-performance, filterable administrative table.",
    icon: <Play className="text-slate-700" />,
    color: "bg-slate-100",
    visual: (
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
        </div>
        <table className="w-full text-[10px] text-slate-600">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200 font-bold uppercase tracking-wider text-slate-400">
              <th className="p-3 text-left">Metric</th>
              <th className="p-3 text-right">Value</th>
            </tr>
          </thead>
          <motion.tbody>
            {[
              { label: "Churn Rate", val: "2.4%" },
              { label: "Retained", val: "97.6%" }
            ].map((row, i) => (
              <motion.tr 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="p-3 font-medium">{row.label}</td>
                <td className="p-3 text-right font-bold text-slate-900">{row.val}</td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    )
  },
  {
    id: "03",
    title: "Visual Intelligence",
    subtitle: "Automated Insights",
    desc: "Rows are for machines, graphs are for humans. Queryla automatically renders the best chart for your result set, from trend lines to distribution maps.",
    icon: <BarChart3 className="text-indigo-600" />,
    color: "bg-indigo-50",
    visual: (
      <div className="bg-white rounded-xl p-6 shadow-xl border border-slate-200">
        <div className="flex items-end justify-around gap-2 h-32 w-full px-2">
          {[40, 70, 95].map((height, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${height}%` }}
              transition={{ duration: 1.2, ease: "circOut", delay: 0.2 * i }}
              className={`w-full rounded-t-md ${i === 2 ? 'bg-indigo-600 shadow-lg' : 'bg-indigo-100'}`} 
            />
          ))}
        </div>
        <div className="mt-4 flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
            <span>Jan</span><span>Feb</span><span>Mar</span>
        </div>
      </div>
    )
  }
];

export default function TutorialPage() {
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      
      {/* 1. Hero Section with Scroll Parallax */}
      <header className="pt-32 pb-20 px-6 text-center overflow-hidden">
        <motion.div style={{ y: titleY }} className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Ask. Execute. <br /> 
            <motion.span 
              animate={{ color: ["#4f46e5", "#818cf8", "#4f46e5"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="italic font-serif font-normal"
            >
              Visualize.
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Stop wrestling with syntax. Queryla turns your intent into insights 
            through an automated, end-to-end data pipeline.
          </motion.p>
        </motion.div>
      </header>

      {/* 2. Step-by-Step Flow */}
      <main className="max-w-6xl mx-auto px-6 pb-40 space-y-32">
        {TUTORIAL_STEPS.map((step, index) => (
          <StepRow key={step.id} step={step} index={index} />
        ))}
      </main>
    </div>
  );
}

// Sub-component for individual rows to keep logic clean
function StepRow({ step, index }) {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Text Block with Slide-in */}
      <motion.div 
        initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-6"
      >
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center shadow-sm border border-slate-200/50`}
        >
          {step.icon}
        </motion.div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-500">{step.subtitle}</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            {step.id}. {step.title}
          </h2>
        </div>
        <p className="text-base md:text-lg text-slate-500 leading-relaxed">
          {step.desc}
        </p>
        
        <div className="flex flex-wrap gap-3 pt-2">
          {['No Code', 'Real-time', 'Secure'].map((badge, i) => (
              <motion.div 
                key={badge} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg bg-slate-50 shadow-sm"
              >
                  <ShieldCheck size={12} className="text-indigo-500" /> {badge}
              </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Visual Block with 3D Tilt Effect on Hover */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, rotateY: index % 2 === 0 ? 15 : -15 }}
        whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 w-full relative group perspective-1000"
      >
        <motion.div 
          whileHover={{ 
            rotateX: 5, 
            rotateY: index % 2 === 0 ? 5 : -5,
            scale: 1.02
          }}
          className="relative z-10 p-8 md:p-12 bg-slate-50 border border-slate-200 rounded-[2.5rem] transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)]"
        >
          {step.visual}
        </motion.div>
        
        {/* Animated Background Aura */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0, 0.3, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className={`absolute -inset-4 ${step.color} blur-3xl -z-10`} 
        />
      </motion.div>
    </motion.section>
  );
}