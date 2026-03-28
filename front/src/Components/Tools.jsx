import React from "react";
import { motion } from "framer-motion"; // 1. Import motion
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "./lightswind/3d-scroll-trigger";
import sql from "../assets/database/mysql.png";
import mongodb from "../assets/database/mongodb.png";
import oracle from "../assets/database/oracle.png";
import postgre from "../assets/database/postgre.png";
import mariadb from "../assets/database/mariadb.png";

function Tools() {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="py-10 md:py-20 w-full max-w-[1220px] mx-auto mt-32 shadow-2xl px-6 sm:px-10 md:px-20 rounded-[10px]">
      <ThreeDScrollTriggerContainer>
        {/* Heading Section - Animated */}
        <motion.div 
          className="w-full text-center mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h1 variants={fadeInUp} className="text-[22px] md:text-[25px] font-medium text-gray-800">
            Our SQL AI supports
          </motion.h1>
          <motion.h2 variants={fadeInUp} className="text-[26px] sm:text-[30px] md:text-[35px] font-bold text-gray-900 leading-tight">
            All Major SQL and NoSQL Databases <br className="hidden md:block" />
            for AI Query Generation
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[14px] sm:text-[16px] text-gray-600 mt-2">
            Just describe what you need — our AI will generate the correct  <br className="hidden sm:block" />
            query for your database automatically.
          </motion.p>
        </motion.div>

        {/* Logos Section */}
        <ThreeDScrollTriggerRow
          baseVelocity={5}
          direction={1}
          className="gap-10 overflow-hidden w-full bg-white flex flex-wrap justify-center items-center py-10"
        >
          {[sql, mongodb, postgre, oracle, mariadb].map((db, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, y: -5 }} // Add a nice hover effect
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="px-4 py-2 shadow-lg text-white rounded-lg ml-4 sm:ml-8 md:ml-12 lg:ml-24"
            >
              <img
                src={db}
                alt="database-logo"
                className="w-[60px] sm:w-20 md:w-[100px] h-auto object-contain"
              />
            </motion.div>
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>
    </div>
  );
}

export default Tools;