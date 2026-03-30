import React from "react";
import { motion } from "framer-motion";
import { Database, Zap, ShieldCheck, ArrowUpRight, Activity } from "lucide-react";

// Asset Imports
import sql from "../assets/database/mysql.png";
import mongodb from "../assets/database/mongodb.png";
import oracle from "../assets/database/oracle.png";
import postgre from "../assets/database/postgre.png";
import mariadb from "../assets/database/mariadb.png";

const DATA_MODULES = [
  { name: "PostgreSQL", src: postgre, tag: "Standard SQL", bg: "bg-indigo-50/40", border: "border-indigo-100/50", accent: "text-indigo-600", glow: "shadow-indigo-200/20" },
  { name: "MongoDB", src: mongodb, tag: "NoSQL Core", bg: "bg-emerald-50/40", border: "border-emerald-100/50", accent: "text-emerald-600", glow: "shadow-emerald-200/20" },
  { name: "MySQL", src: sql, tag: "Relational", bg: "bg-blue-50/40", border: "border-blue-100/50", accent: "text-blue-600", glow: "shadow-blue-200/20" },
  { name: "Oracle", src: oracle, tag: "Enterprise", bg: "bg-rose-50/40", border: "border-rose-100/50", accent: "text-rose-600", glow: "shadow-rose-200/20" },
  { name: "MariaDB", src: mariadb, tag: "Open Source", bg: "bg-sky-50/40", border: "border-sky-100/50", accent: "text-sky-600", glow: "shadow-sky-200/20" },
];

function Tools() {
  // Container variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Card reveal variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9, rotateX: -10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    },
  };

  return (
    <section className="py-32 bg-[#FAFAFB] relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-700">
      {/* --- BACKGROUND DECO: Animated Grid --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* --- REFINED HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div className="max-w-xl">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6 cursor-default"
            >
              <Activity size={12} className="text-indigo-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Intelligent Pipelines</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              Optimized for <br /> 
              <motion.span 
                className="text-indigo-600 font-medium italic font-serif tracking-normal inline-block"
                whileHover={{ skewX: -10, transition: { duration: 0.2 } }}
              >
                Your Ecosystem.
              </motion.span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm font-medium max-w-[280px] leading-relaxed">
            High-fidelity connectors engineered for data integrity and sub-second execution.
          </p>
        </motion.div>

        {/* --- VIBRANT LIGHT GRID --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
        >
          
          {/* Accent Card: Professional Slate */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10, rotateY: 5, rotateX: 2 }}
            className="p-10 rounded-[3rem] bg-white border border-slate-200 flex flex-col justify-between shadow-xl shadow-slate-100 relative overflow-hidden group"
          >
            <div className="space-y-4 relative z-10">
              <motion.div 
                whileHover={{ rotate: 180 }}
                className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 transition-colors group-hover:bg-indigo-600 group-hover:text-white"
              >
                <Zap size={24} />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">Native Neural <br/> Connectors.</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Automated dialect translation ensuring 100% precision across heterogeneous data sets.
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          {/* Database Module Cards */}
          {DATA_MODULES.map((db, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                rotateY: i % 2 === 0 ? -3 : 3,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className={`relative ${db.bg} border ${db.border} rounded-[3rem] p-10 flex flex-col justify-between group transition-all duration-500 shadow-sm hover:shadow-2xl ${db.glow} hover:bg-white`}
            >
              <div className="flex justify-between items-start relative">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-white shadow-lg shadow-slate-100 flex items-center justify-center p-4 border border-white z-20"
                >
                  <img 
                    src={db.src} 
                    alt={db.name} 
                    className="w-full h-full object-contain grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" 
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className={`p-3 rounded-xl bg-white shadow-sm border border-slate-100 ${db.accent}`}
                >
                    <ArrowUpRight size={18} />
                </motion.div>
              </div>

              <div className="mt-14 relative z-10">
                <motion.div 
                  className="flex items-center gap-2 mb-2"
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                >
                    <span className={`text-[10px] font-black uppercase tracking-widest ${db.accent} opacity-80`}>
                        {db.tag}
                    </span>
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`w-1.5 h-1.5 rounded-full ${db.accent.replace('text', 'bg')}`} 
                    />
                </motion.div>
                <h4 className="text-3xl font-bold text-slate-800 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {db.name}
                </h4>
              </div>

              {/* Floating Background Icon Parallax */}
              <motion.div 
                className="absolute bottom-6 right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
                whileHover={{ scale: 1.5, rotate: -15, x: -20, y: -20 }}
              >
                 <Database size={100} className={db.accent} />
              </motion.div>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
}

export default Tools;