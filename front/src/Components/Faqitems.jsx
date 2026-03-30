import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

function FAQItem({ question, answer, index, isOpen, onClick }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
      className={`group mb-3 overflow-hidden rounded-2xl border transition-all duration-500 ${
        isOpen 
          ? "border-indigo-200 bg-white shadow-[0_20px_50px_rgba(79,70,229,0.08)] scale-[1.01]" 
          : "border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200"
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 ${
            isOpen ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-slate-100 text-slate-400 group-hover:text-indigo-500"
          }`}>
            {isOpen ? <Sparkles size={18} /> : <HelpCircle size={18} />}
          </div>
          <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
            isOpen ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
          }`}>
            {question}
          </span>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={`transition-colors ${isOpen ? "text-indigo-600" : "text-slate-300"}`}
        >
          <ChevronDown size={22} strokeWidth={2.5} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-8 pl-[72px]">
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-base leading-relaxed text-slate-500"
              >
                {answer}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex gap-2"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-200" />
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-100" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faqitems() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What exactly is Queryla?",
      answer: "Queryla is an AI-driven data interface that allows anyone to talk to their database in plain English. We translate your natural language into high-performance SQL, giving you instant results without needing to write a single line of code."
    },
    {
      question: "How do I connect my database?",
      answer: "Simply provide your database credentials (Host, Port, User, Password) or a Connection String. We currently support MySQL, PostgreSQL, Oracle, and MariaDB. The connection is established via a secure, read-only protocol."
    },
    {
      question: "Is my data handled securely?",
      answer: "Security is our core priority. Queryla only requires read-level permissions. We never store your actual database records—we only process the schema structure to understand how to generate accurate queries."
    },
    {
      question: "Can I visualize the results?",
      answer: "Absolutely. Beyond SQL generation, Queryla identifies the best way to represent your data. It automatically generates bar charts, line graphs, and distribution maps based on the results of your query."
    },
    {
      question: "Who is this tool built for?",
      answer: "It’s built for product managers, business analysts, and developers who want to speed up their workflow. If you know what data you need but don't want to spend time debugging SQL joins, Queryla is for you."
    }
  ];

  return (
    <section className="bg-white py-32 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="container mx-auto max-w-4xl px-6">
        
        {/* --- HEADER --- */}
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tight text-slate-900"
          >
            Common <span className="text-indigo-600">Questions.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg font-medium text-slate-400"
          >
            Everything you need to know about the Queryla workflow.
          </motion.p>
        </div>

        {/* --- FAQ STACK --- */}
        <div className="relative">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        {/* --- SUPPORT CTA --- */}
        
      </div>
    </section>
  );
}