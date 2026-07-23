import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sponsorGroups } from '../data/sponsorsData';

export const SponsorLogo = ({ partner, isGold }) => {
  const [imageError, setImageError] = useState(false);

  // Custom fallback renderers for when logoUrl is empty or fails to load
  const renderFallback = () => {
    switch (partner.id) {
      case 'wso2':
        return (
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white flex items-center justify-center">
              <span className="w-6 h-[3px] bg-white rotate-45"></span>
            </div>
            <span className="text-4xl md:text-6xl font-black text-white tracking-tighter">WSO</span>
            <span className="text-4xl md:text-6xl font-black text-[#F14E23] tracking-tighter">2</span>
          </div>
        );
      case 'prime1':
        return (
          <div className="flex items-center bg-[#18212f] text-white text-xl md:text-3xl font-bold rounded-xl overflow-hidden shadow-xl border border-white/10">
            <span className="px-6 py-3.5 tracking-wider">PRIME</span>
            <span className="bg-[#f97316] px-5 py-3.5 text-white font-extrabold">1</span>
          </div>
        );
      case 'gold-2':
        return (
          <div className="flex items-center gap-3">
            <div className={`${isGold ? 'w-16 h-16 md:w-20 md:h-20' : 'w-14 h-14 md:w-20 md:h-20'} rounded-full border-2 border-amber-400 flex items-center justify-center bg-amber-400/10 text-amber-400`}>
              <span className={`material-symbols-outlined ${isGold ? 'text-3xl md:text-4xl' : 'text-3xl md:text-4xl'}`}>school</span>
            </div>
            <div className={`${isGold ? 'text-lg md:text-xl' : 'text-base md:text-xl'} font-extrabold text-white uppercase leading-tight text-left`}>
              Master Lakhs<br />Campus
            </div>
          </div>
        );
      case 'sago':
        return (
          <div className="flex items-center gap-3">
            <div className={`${isGold ? 'w-16 h-16 md:w-18 md:h-18' : 'w-13 h-13 md:w-18 md:h-18'} rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400`}>
              <span className="material-symbols-outlined text-2xl md:text-3xl rotate-45">flight</span>
            </div>
            <div className="text-left leading-tight">
              <span className={`${isGold ? 'text-3xl md:text-4xl' : 'text-2xl md:text-4xl'} font-black text-amber-400 block`}>SAGO</span>
              <span className="text-xs md:text-sm font-bold text-gray-300 block tracking-wider">OVERSEAS EDUCATION</span>
            </div>
          </div>
        );
      case 'cognitix':
        return (
          <div className="flex items-center gap-3 font-black text-2xl md:text-4xl text-white">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center text-xl md:text-2xl font-mono font-bold">C</div>
            <span className="tracking-tight text-cyan-300">Cogntix</span>
          </div>
        );
      case 'vitalhub':
        return (
          <div className="text-left leading-tight">
            <div className="text-2xl md:text-4xl font-extrabold tracking-tight">
              <span className="text-[#38bdf8]">vital</span>
              <span className="text-slate-300">hub</span>
            </div>
            <span className="text-xs md:text-sm text-[#38bdf8] font-bold uppercase tracking-widest block">Innovations Lab</span>
          </div>
        );
      case 'cloudparallax':
        return (
          <div className="flex items-center gap-3 text-2xl md:text-4xl font-bold text-white">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-500 text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">cloud</span>
            </div>
            <span className="text-sky-300 font-extrabold">Cloud Parallax</span>
          </div>
        );
      default:
        return (
          <span className={`${isGold ? 'text-3xl md:text-4xl' : 'text-2xl md:text-4xl'} font-bold text-white tracking-tight`}>
            {partner.name}
          </span>
        );
    }
  };

  if (partner.logoUrl && !imageError) {
    return (
      <img
        src={partner.logoUrl}
        alt={partner.alt || partner.name}
        onError={() => setImageError(true)}
        className={
          isGold
            ? "h-36 sm:h-36 md:h-36 lg:h-40 max-h-48 w-auto max-w-[340px] sm:max-w-[420px] object-contain transition-transform duration-300 hover:scale-105 filter drop-shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
            : "h-24 sm:h-28 md:h-32 lg:h-36 max-h-40 w-auto max-w-[320px] md:max-w-[420px] object-contain transition-transform duration-300 hover:scale-105 filter drop-shadow-[0_4px_20px_rgba(255,255,255,0.05)]"
        }
      />
    );
  }

  return (
    <div className="transition-transform duration-300 hover:scale-105 flex items-center justify-center">
      {renderFallback()}
    </div>
  );
};

// Reusable Tier Section - Large uniform scaled layout per row
export const SponsorTierRow = ({ group }) => {
  const isGold = group.id === 'gold';
  return (
    <div className="space-y-6 py-6">
      {/* Title Header with clean line */}
      <div className="flex items-center gap-4">
        <h3 className="font-hanken text-2xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full bg-secondary"></span>
          {group.title}
        </h3>
        <div className="h-px flex-grow bg-white/10"></div>
      </div>

      {/* Clean Row of Uniformly Large Scaled Logos */}
      <div className={`py-6 flex flex-wrap items-center justify-start ${isGold ? 'gap-12 sm:gap-16 md:gap-20 lg:gap-24 min-h-[140px] md:min-h-[160px]' : 'gap-10 sm:gap-14 md:gap-20 lg:gap-24 min-h-[120px] md:min-h-[150px]'}`}>
        {group.partners.map((partner) => (
          <div key={partner.id} className={`flex items-center justify-center ${isGold ? 'min-h-[130px] md:min-h-[150px]' : 'min-h-[100px] md:min-h-[140px]'}`}>
            <SponsorLogo partner={partner} isGold={isGold} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Sponsors = () => {
  return (
    <section id="sponsors" className="py-20 md:py-28 bg-transparent relative overflow-hidden flex flex-col justify-center">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto relative z-10 w-full space-y-16">
        {sponsorGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <SponsorTierRow group={group} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
