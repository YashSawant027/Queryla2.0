import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from './lightswind/particles-background';
import quality from '../assets/no1.png'
import Nav from './Nav';
import Tools from './Tools';
import TutorialPage from './Tutorial'; // Ensure this matches your TutorialPage file
import Faqitems from './Faqitems';
import Review from './Review';
import Footer from './Footer';
import { AuthContext } from './Authprovider';
import { useNavigate } from 'react-router-dom';

function Practicals() {
  const { islogin } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleclick = () => {
    if (islogin) {
      navigate('/data')
    } else {
      navigate('/login')
    }
  }

  // Optimized Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly faster stagger for snappier feel
        delayChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <>
      <Nav />
      <ParticlesBackground
        colors={['#00ffff', '#ff00ff', '#ffaa00']}
        size={4}
        countDesktop={80}
        countTablet={60}
        countMobile={40}
        zIndex={-100}
        height="100vh"
      />
      
      <div className='min-h-screen w-full m-auto flex justify-center items-center md:px-0 px-5'>
        {/* Hero Section */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.img 
            variants={item}
            src={quality} 
            alt="no1" 
            className='w-[180px] md:w-[200px] h-auto object-cover mx-auto mb-6'
          />
          
          <motion.h1 
            variants={item}
            className='font-extrabold md:text-[55px] text-[32px] text-center leading-tight tracking-tight'
          >
            Welcome to Queryla <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              Search smarter. Understand faster.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className='text-center md:text-[18px] text-[16px] mt-4 text-gray-600 max-w-2xl mx-auto'
          >
            Queryla helps you run powerful searches, filter information, and visualize results 
            without any complicated setup or coding experience.
          </motion.p>
          
          <motion.button 
            variants={item}
            whileHover={{ scale: 1.05, backgroundColor: "#111" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleclick} 
            className='text-[16px] font-bold px-8 mx-auto block py-4 bg-black mt-8 cursor-pointer transition-all rounded-xl text-white shadow-xl' 
          >
            Try Now — It's Free
          </motion.button>
        </motion.div>
      </div>

      {/* Content Sections with Scroll Reveal */}
      <div className="relative z-10 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Tools />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        >
          <TutorialPage/>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Faqitems />
          <Review />
          <Footer />
        </motion.div>
      </div>
    </>
  )
}

export default Practicals;