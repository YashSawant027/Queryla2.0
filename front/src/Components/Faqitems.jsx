import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import faqbg from "../assets/faqbg.avif";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4 transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-xl px-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left"
      >
        <h2 className="text-lg font-medium text-gray-800">{question}</h2>
        {open ? (
          <Minus size={20} className="cursor-pointer" />
        ) : (
          <Plus size={20} className="cursor-pointer" />
        )}
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          open ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-700 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

function Faqitems() {
  const faqs = [
    {
      question: "What is this AI SQL tool?",
      answer:
        "It’s an AI-powered platform that lets you query your database using plain English instead of writing SQL code. You can instantly get accurate SQL results and visual insights without technical expertise.",
    },
    {
      question: "How does it work?",
      answer:
        "Simply connect your database (MySQL, PostgreSQL, or SQL Server) using your connection string. The AI reads your database structure and turns your natural language queries into SQL automatically.",
    },
    {
      question: "Who can use this tool?",
      answer:
        "It's designed for beginners, business analysts, and non-technical users who need quick access to database insights without learning SQL syntax.",
    },
    {
      question: "Can it generate charts or visual reports?",
      answer:
        "Yes. The tool can create data visualizations like bar graphs, line charts, and pie charts based on your queries, making data analysis simple and clear.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Absolutely. All connections are encrypted, and your credentials or data are never stored without permission.",
    },
    {
      question: "Which databases are supported?",
      answer:
        "Currently, it supports MySQL, PostgreSQL, SQL Server, and SQLite, with more options coming soon.",
    },
    {
      question: "Do I need to know SQL to use it?",
      answer:
        "Not at all! You can just type questions in plain English like ‘Show all students with more than 80 marks,’ and the tool generates the SQL and results for you.",
    },
  ];

  return (
    <div
      className="w-full md:mt-10 mt-40 min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${faqbg})` }}
    >
      <div className="w-full max-w-2xl bg-white/60 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-gray-900">
          Frequently Asked Questions
        </h1>

        <div className="space-y-3">
          {faqs.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faqitems;
