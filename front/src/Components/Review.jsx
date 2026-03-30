import React from 'react';
import { motion } from 'framer-motion'; 
import { TicketCheck, Quote } from 'lucide-react';

// User Assets
import user1 from '../assets/user/1.png';
import user2 from '../assets/user/2.png';
import user3 from '../assets/user/3.png';
import user4 from '../assets/user/4.png';
import user5 from '../assets/user/5.png';
import user6 from '../assets/user/6.png';
import user7 from '../assets/user/7.png';
import user8 from '../assets/user/8.png';
import user9 from '../assets/user/9.png';

function Review() {
  // 1. Container Variants for a "Springy" Staggered Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // 2. Individual Item Variants with 3D Rotation on Entry
  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    },
  };

  // 3. Advanced Hover Effect (3D Tilt & Lift)
  const hoverEffect = {
    y: -12,
    rotateX: 5,
    rotateY: -2,
    scale: 1.02,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    },
  };

  return (
    <section className="w-full min-h-screen py-20 px-6 bg-[#fcfcfc] overflow-hidden">
      <div className="max-w-6xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl text-center md:text-6xl font-black text-gray-900 mb-3 tracking-tighter uppercase">
            Hear It from Our Users
          </h2>
          <p className="text-center mt-5 text-gray-500 text-lg md:text-xl font-medium">
            Discover what industry leaders say about{" "}
            <span className="font-bold text-indigo-600">Queryla</span>:
          </p>
        </motion.div>

        {/* --- MASONRY GRID (Preserved Layout) --- */}
        <motion.div 
          className="md:mt-20 mt-10 grid md:grid-flow-col grid-rows-7 gap-6 perspective-1000"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ perspective: "1200px" }} // Enables 3D rotation depth
        >
          
          {/* Card 1 */}
          <motion.div 
            variants={itemVariants} 
            whileHover={hoverEffect}
            whileTap={{ scale: 0.98 }}
            className="row-span-3 bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-8 rounded-3xl flex justify-center items-center cursor-default group relative overflow-hidden"
          >
            <Quote className="absolute top-6 right-8 text-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity" size={40} />
            <div className="relative z-10">
              <h2 className="text-lg md:text-xl font-medium leading-relaxed text-slate-700">"SQL is hard. Giving context to the AI of your schemas and what database you're working with has given me excellent results. Love to see this being automated by Queryla AI.”</h2>
              <div className="flex gap-4 mt-6 items-center">
                <img src={user1} alt="" className="w-14 h-14 rounded-full border-4 border-slate-50" />
                <div>
                  <div className="flex items-center justify-start gap-2">
                    <p className="font-bold text-slate-900">Guillermo Rauch</p>
                    <TicketCheck size={16} className="text-blue-600 fill-blue-50" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium italic">CEO of Vercel</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <ReviewCard variants={itemVariants} hover={hoverEffect} quote="En scrollant sur mon Instagram, je suis tombée sur Queryla AI: la plateforme AI qui permet de rédiger des requêtes SQL via le langage naturel.”" user={user2} name="Jilda Joseph-Angélique" title="Data Analyst" span="row-span-2" />

          {/* Card 3 */}
          <ReviewCard variants={itemVariants} hover={hoverEffect} quote="Why get scared of AI? In fact, leverage it. Queryla AI is the holy grail of 'all things data' — getting insights in seconds is amazing 🚀”" user={user3} name="Neema Madayi Veetil" title="Analytics" span="row-span-2" />

          {/* Card 4 */}
          <ReviewCard variants={itemVariants} hover={hoverEffect} quote="If you’re bored of typing SQL queries manually, you must try Queryla AI! It saves time and helps you focus on insights." user={user4} name="Dheeraj Tuteja" title="Data Vis Lead" span="row-span-2" />

          {/* Card 5 */}
          <ReviewCard variants={itemVariants} hover={hoverEffect} quote="Queryla AI is a powerful tool to generate SQL in minutes. I love how I don’t need to spend hours anymore 😄" user={user5} name="Vibhu Sagar" title="AI Tools Expert" span="row-span-2" />

          {/* Card 6 */}
          <ReviewCard variants={itemVariants} hover={hoverEffect} quote="Transforming natural language questions into SQL queries has never been easier. Thanks to Queryla AI!" user={user6} name="M. Nasir Yousufzai" title="Cloud Native Engineer" span="row-span-2" />

          {/* Card 7 */}
          <ReviewCard variants={itemVariants} hover={hoverEffect} quote="Ready to level up your SQL skills? Text2SQL: Embrace AI to generate SQL queries ➡️ Queryla AI. Happy learning!”" user={user7} name="Sadie St. Lawrence" title="Founder/CEO" span="row-span-2" />

          {/* Card 8 */}
          <ReviewCard variants={itemVariants} hover={hoverEffect} quote="Je viens de découvrir un outil incroyable appelé Queryla qui utilise l'IA pour convertir le langage naturel en SQL.”" user={user8} name="Cédric Cazal" title="NoCode Builder" span="row-span-2" />

          {/* Card 9 */}
          <ReviewCard variants={itemVariants} hover={hoverEffect} quote="Gone are the days of struggling with complex SQL syntax! With Queryla, writing SQL queries has become a breeze”" user={user9} name="Ankit pangas" title="Senior Software Engineer" span="row-span-2" />
        </motion.div>
      </div>
    </section>
  );
}

// Sub-component to clean up the code while keeping your exact layout
function ReviewCard({ variants, hover, quote, user, name, title, span }) {
  return (
    <motion.div 
      variants={variants} 
      whileHover={hover} 
      whileTap={{ scale: 0.98 }} 
      className={`${span} bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.08)] p-6 rounded-3xl cursor-default transition-shadow duration-500`}
    >
      <h2 className="text-sm md:text-base font-medium text-slate-600 leading-relaxed italic">"{quote}"</h2>
      <div className="flex gap-4 mt-6 items-center">
        <img src={user} alt="" className="w-12 h-12 rounded-full border-2 border-slate-50 shadow-sm" />
        <div>
          <div className="flex items-center justify-start gap-1">
            <p className="font-bold text-slate-800 text-sm">{name}</p>
            <TicketCheck size={14} className="text-blue-500" />
          </div>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default Review;