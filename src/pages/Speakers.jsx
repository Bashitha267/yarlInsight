import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { speakersData } from '../data/speakersData';

const Speakers = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-transparent text-white font-inter min-h-screen pt-36 pb-24 px-6 md:px-margin-desktop max-w-container-max mx-auto relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#1A56A6]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[450px] h-[450px] bg-[#F9A825]/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <header className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-[0.2em] text-white/60 uppercase shadow-inner"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Thought Leaders & Innovators
          </motion.div>
          <h1 className="font-hanken text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-white">
            <span className="text-primary">YARL</span> <span className="text-secondary">INSIGHT</span> <span className="text-white">Speakers</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-inter leading-relaxed">
            Meet the visionary industry leaders and keynote speakers inspiring the next generation of innovators.
          </p>
        </header>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakersData.map((speaker, index) => (
            <motion.div
              key={speaker.id || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group hover:border-secondary/40 hover:shadow-[0_0_30px_rgba(249,168,37,0.15)] transition-all duration-500 relative"
            >
              {/* Speaker Card Image */}
              <div className="w-full aspect-square max-w-[200px] rounded-2xl overflow-hidden border border-white/10 group-hover:border-secondary/60 transition-all duration-500 mb-5 relative shadow-lg bg-white/5 flex items-center justify-center p-2">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-72 h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Speaker Name */}
              <h2 className="text-lg font-black text-white group-hover:text-secondary transition-colors duration-300 leading-snug">
                {speaker.name}
              </h2>

              {/* Position */}
              {speaker.position && (
                <p className="text-xs font-mono font-medium text-secondary/90 mt-1.5 mb-3 leading-snug">
                  {speaker.position}
                </p>
              )}

              {/* Session Topic */}
              {speaker.topic && (
                <div className="mt-auto pt-3 border-t border-white/10 w-full text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
                    Keynote Topic
                  </span>
                  <p className="text-xs text-white/70 font-inter leading-relaxed italic">
                    "{speaker.topic}"
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Speakers;
