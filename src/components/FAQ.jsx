import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "Who can attend YarlInsight?",
    answer: "YarlInsight is open to undergraduates in computer science, engineering, and related fields. Professionals looking to update their skills are also welcome to attend."
  },
  {
    question: "What is the cost to attend?",
    answer: "The registration fee for IEEE student members is LKR 1,500 and for non-IEEE student members is LKR 2,000."
  },
  {
    question: "Will I receive a certificate?",
    answer: "Yes, all participants who attend both days will receive a certificate of participation from the IEEE Student Branch of the University of Jaffna."
  },
  {
    question: "Should I bring my personal laptop to the event?",
    answer: "No, you should not bring your personal laptop. The department will provide all necessary computer facilities for the hands-on workshops."
  },
  {
    question: "Is accommodation provided for participants?",
    answer: "No, accommodation is not provided for participants. Attendees are responsible for arranging their own accommodation if needed."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={onClick}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-primary' : 'text-white/80 group-hover:text-white'}`}>
          {question}
        </span>
        <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-white/20'}`}>
          expand_more
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/40 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-32 px-6 md:px-margin-desktop max-w-4xl mx-auto">
      <div className="space-y-4 mb-16 text-center">
        <h2 className="text-primary font-mono text-sm uppercase tracking-[0.3em]">Support</h2>
        <h3 className="font-hanken text-4xl md:text-5xl text-white font-bold">Frequently Asked Questions</h3>
      </div>

      <div className="glass-card rounded-3xl p-8 md:p-12 border-white/5">
        {faqData.map((faq, index) => (
          <FAQItem 
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
