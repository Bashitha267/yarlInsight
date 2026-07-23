import React from 'react';
import { motion } from 'framer-motion';
import { SponsorTierRow } from '../components/Sponsors';
import { sponsorGroups } from '../data/sponsorsData';

const SponsorsPage = () => {
  // Ensure the page loads from the very top of the window on mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-transparent text-white font-inter min-h-screen pt-36 pb-24 px-6 md:px-margin-desktop max-w-container-max mx-auto relative overflow-hidden"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#1A56A6]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[450px] h-[450px] bg-[#F9A825]/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Page Header */}
        <header className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-[0.2em] text-white/60 uppercase shadow-inner"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Our Partners
          </motion.div>
          <h1 className="font-hanken text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-white">
            <span className="text-primary">YARL</span> <span className="text-secondary">INSIGHT</span> <span className="text-white">3.0</span> <span className="text-secondary italic">Sponsors</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-inter leading-relaxed">
            We are deeply grateful to the organizations that power our community vision, making YarlInsight 3.0 possible.
          </p>
        </header>

        {/* Section by Section Listing by Category Title (Borderless Scaled Rows) */}
        <div className="space-y-16">
          {sponsorGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SponsorTierRow group={group} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SponsorsPage;
