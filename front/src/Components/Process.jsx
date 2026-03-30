import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Search, 
  Filter, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Zap 
} from 'lucide-react'; // Using Lucide Icons
import Nav from './Nav';
import Footer from './Footer';

const ProcessPage = () => {
  const steps = [
    {
      id: "01",
      title: "Data Integration",
      subtitle: "Connect your ecosystem",
      description: "Securely sync your existing data sources. Queryla acts as a unified intelligence layer over your SQL, NoSQL, and Cloud storage without moving your data.",
      icon: <Database className="w-6 h-6 stroke-[1.5px]" />,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: "02",
      title: "Semantic Search",
      subtitle: "Natural language processing",
      description: "Ask complex questions in plain English. Our AI-driven parser translates your intent into precise queries, eliminating the need for technical syntax.",
      icon: <Search className="w-6 h-6 stroke-[1.5px]" />,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: "03",
      title: "Smart Filtering",
      subtitle: "Precision at scale",
      description: "Drill down into millions of records instantly. Apply multi-dimensional filters and logic gates to isolate the exact information you need.",
      icon: <Filter className="w-6 h-6 stroke-[1.5px]" />,
      color: "bg-violet-50 text-violet-600 border-violet-100",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: "04",
      title: "Visual Synthesis",
      subtitle: "Insightful reporting",
      description: "Transform query results into boardroom-ready visualizations. Export to CSV, PDF, or live-syncing dashboards with a single click.",
      icon: <BarChart3 className="w-6 h-6 stroke-[1.5px]" />,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <Nav />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 mb-6">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">How it works</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              From raw data to <br />
              <span className="text-slate-400 font-medium italic">clarity</span> in seconds.
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We’ve removed the friction between you and your insights. 
              Discover the four-step workflow that powers Queryla.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- PROCESS STEPS --- */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-40">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}
              >
                {/* Content Side */}
                <div className="flex-1">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${step.color} mb-8 shadow-sm`}>
                    {step.icon}
                  </div>
                  <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{step.subtitle}</span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 tracking-tight">
                    <span className="text-slate-300 font-mono text-2xl mr-3 font-normal">{step.id}.</span>
                    {step.title}
                  </h2>
                  <p className="text-slate-500 text-lg leading-relaxed mb-8">
                    {step.description}
                  </p>
                  
                  <div className="space-y-4">
                    {['Zero latency processing', 'End-to-end encryption'].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 stroke-[2px]" />
                        <span className="text-sm font-semibold">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Side */}
                <div className="flex-1 w-full">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-slate-100 rounded-[2.5rem] -z-10 rotate-1" />
                    <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl bg-white p-3">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover rounded-xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CALL TO ACTION --- */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Experience the workflow <br /> firsthand.
              </h2>
              <p className="text-slate-400 mb-10 max-w-md mx-auto">
                Join 10,000+ teams searching smarter with Queryla. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all">
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl border border-slate-700 hover:bg-slate-700 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[grid-white-pattern] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProcessPage;