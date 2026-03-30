import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Phone, Globe, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import Nav from './Nav';

function Contact() {
  const contactDetails = [
    { 
      icon: <Building2 size={22} />, 
      label: "Organization", 
      value: "Innovative Solutions Inc.", 
      sub: "YashUno",
      theme: "indigo" 
    },
    { 
      icon: <Phone size={22} />, 
      label: "Direct Line", 
      value: "+91 9082258820", 
      sub: "Available 9am - 6pm",
      theme: "blue" 
    },
    { 
      icon: <Mail size={22} />, 
      label: "Support", 
      value: "yashsawan70@gmail.com", 
      sub: "Avg. response: 2h",
      theme: "cyan" 
    },
    { 
      icon: <Globe size={22} />, 
      label: "Digital", 
      value: "yashshankar.dev", 
      sub: "Main Portfolio",
      theme: "slate" 
    },
  ];

  // Refined Color Mapping
  const themeClasses = {
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    cyan: "text-cyan-600 bg-cyan-50 border-cyan-100",
    slate: "text-slate-600 bg-slate-50 border-slate-100"
  };

  return (
    <div className="bg-[#fcfcfd] min-h-screen selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      <Nav />
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-100/50 to-transparent -z-10" />

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Typography */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm"
            >
              <Sparkles size={12} className="text-indigo-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Contact Protocol</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.85]"
              >
                Let's build <br /> 
                <span className="text-indigo-600 font-serif italic font-medium tracking-normal">something</span> <br />
                unforgetable.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-sm"
              >
                Have an ambitious project? Reach out and let's turn the vision into reality.
              </motion.p>
            </div>

            {/* Availability Badge */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm inline-block"
            >
              <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Available for new projects
              </div>
            </motion.div>
          </div>

          {/* Right Side: Re-Colored Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
            {contactDetails.map((item, index) => (
              <motion.a
                key={index}
                href={item.label === 'Support' ? `mailto:${item.value}` : '#'}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
                className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(79,70,229,0.08)] hover:border-indigo-100 transition-all duration-500 relative overflow-hidden"
              >
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 ${themeClasses[item.theme]}`}>
                    {item.icon}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      {item.label}
                    </h3>
                    <p className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {item.value}
                    </p>
                    <p className="text-xs text-slate-400 font-semibold">{item.sub}</p>
                  </div>

                  <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-indigo-500">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>

                {/* Internal Card Glow */}
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.a>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Contact;