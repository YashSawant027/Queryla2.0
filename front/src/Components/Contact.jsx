import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Phone, Globe, Mail, ArrowUpRight } from 'lucide-react';
import Nav from './Nav';

function Contact() {
  const contactDetails = [
    { 
      icon: <Building2 size={24} />, 
      label: "Company", 
      value: "Innovative Solutions Inc.", 
      sub: "YashUno",
      color: "text-blue-600",
      bg: "bg-blue-50" 
    },
    { 
      icon: <Phone size={24} />, 
      label: "Phone", 
      value: "+91 9082258820", 
      sub: "Mon - Fri, 9am - 6pm",
      color: "text-emerald-600",
      bg: "bg-emerald-50" 
    },
    { 
      icon: <Mail size={24} />, 
      label: "Email", 
      value: "yashsawan70@gmail.com", 
      sub: "Online Support",
      color: "text-purple-600",
      bg: "bg-purple-50" 
    },
    { 
      icon: <Globe size={24} />, 
      label: "Website", 
      value: "yashshankar.dev", 
      sub: "Portfolio & Projects",
      color: "text-cyan-600",
      bg: "bg-cyan-50" 
    },
  ];

  return (
    <div className="bg-[#fdfdfb] min-h-screen">
      <Nav />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Heavy Typography */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest">Get in touch</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-[900] text-slate-900 tracking-tighter leading-none">
              Let's build <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 italic font-serif font-light">
                something
              </span> <br />
              great together.
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md">
              Have a project in mind or just want to say hi? Reach out through any of these channels.
            </p>
          </motion.div>

          {/* Right Side: Contact Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactDetails.map((item, index) => (
              <motion.a
                href={item.label === 'Email' ? `mailto:${item.value}` : '#'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                key={index}
                className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 relative overflow-hidden"
              >
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                      {item.label}
                    </h3>
                    <p className="text-lg font-bold text-slate-900 mb-1">{item.value}</p>
                    <p className="text-sm text-slate-400 font-medium">{item.sub}</p>
                  </div>

                  <div className="absolute top-8 right-8 text-slate-200 group-hover:text-blue-500 transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                {/* Subtle Background Accent */}
                <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${item.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              </motion.a>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Contact;