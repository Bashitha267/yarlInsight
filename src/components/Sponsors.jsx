import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sponsorGroups } from '../data/sponsorsData';

export const SponsorLogo = ({ partner, isCompact = false }) => {
  const [imageError, setImageError] = useState(false);

  // Custom fallback renderers for when logoUrl is empty or fails to load
  const renderFallback = () => {
    switch (partner.id) {
      case 'wso2':
        return (
          <div className="flex items-center gap-2">
            <div className={`${isCompact ? 'w-8 h-8 md:w-10 md:h-10' : 'w-10 h-10 md:w-12 md:h-12'} rounded-full border-2 border-white flex items-center justify-center`}>
              <span className={`${isCompact ? 'w-4 h-[2px]' : 'w-5 h-[3px]'} bg-white rotate-45`}></span>
            </div>
            <span className={`${isCompact ? 'text-3xl md:text-5xl' : 'text-4xl md:text-6xl'} font-black text-white tracking-tighter`}>WSO</span>
            <span className={`${isCompact ? 'text-3xl md:text-5xl' : 'text-4xl md:text-6xl'} font-black text-[#F14E23] tracking-tighter`}>2</span>
          </div>
        );
      case 'prime1':
        return (
          <div className={`flex items-center bg-[#18212f] text-white ${isCompact ? 'text-sm md:text-xl' : 'text-lg md:text-2xl'} font-bold rounded-lg overflow-hidden shadow-lg border border-white/10`}>
            <span className={`${isCompact ? 'px-4 py-2' : 'px-5 py-3'} tracking-wider`}>PRIME</span>
            <span className={`bg-[#f97316] ${isCompact ? 'px-3 py-2' : 'px-4 py-3'} text-white font-extrabold`}>1</span>
          </div>
        );
      case 'gold-2':
        return (
          <div className="flex items-center gap-2.5">
            <div className={`${isCompact ? 'w-10 h-10 md:w-13 md:h-13' : 'w-12 h-12 md:w-16 md:h-16'} rounded-full border-2 border-amber-400 flex items-center justify-center bg-amber-400/10 text-amber-400`}>
              <span className={`material-symbols-outlined ${isCompact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>school</span>
            </div>
            <div className={`${isCompact ? 'text-xs md:text-sm' : 'text-sm md:text-base'} font-extrabold text-white uppercase leading-tight text-left`}>
              Master Lakhs<br />Campus
            </div>
          </div>
        );
      case 'sago':
        return (
          <div className="flex items-center gap-2.5">
            <div className={`${isCompact ? 'w-9 h-9 md:w-12 md:h-12' : 'w-11 h-11 md:w-14 md:h-14'} rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400`}>
              <span className={`material-symbols-outlined ${isCompact ? 'text-base md:text-lg' : 'text-lg md:text-xl'} rotate-45`}>flight</span>
            </div>
            <div className="text-left leading-tight">
              <span className={`${isCompact ? 'text-base md:text-xl' : 'text-lg md:text-2xl'} font-black text-amber-400 block`}>SAGO</span>
              <span className={`${isCompact ? 'text-[8px] md:text-[10px]' : 'text-[9px] md:text-xs'} font-bold text-gray-300 block tracking-wider`}>OVERSEAS EDUCATION</span>
            </div>
          </div>
        );
      case 'cognitix':
        return (
          <div className={`flex items-center gap-2.5 font-black ${isCompact ? 'text-lg md:text-2xl' : 'text-xl md:text-3xl'} text-white`}>
            <div className={`${isCompact ? 'w-9 h-9 text-sm md:text-base' : 'w-10 h-10 md:w-14 md:h-14 text-lg md:text-xl'} rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center font-mono font-bold`}>C</div>
            <span className="tracking-tight text-cyan-300">Cogntix</span>
          </div>
        );
      case 'vitalhub':
        return (
          <div className="text-left leading-tight">
            <div className={`${isCompact ? 'text-lg md:text-2xl' : 'text-xl md:text-3xl'} font-extrabold tracking-tight`}>
              <span className="text-[#38bdf8]">vital</span>
              <span className="text-slate-300">hub</span>
            </div>
            <span className={`${isCompact ? 'text-[9px] md:text-[10px]' : 'text-[10px] md:text-xs'} text-[#38bdf8] font-bold uppercase tracking-widest block`}>Innovations Lab</span>
          </div>
        );
      case 'cloudparallax':
        return (
          <div className={`flex items-center gap-2.5 ${isCompact ? 'text-lg md:text-2xl' : 'text-xl md:text-3xl'} font-bold text-white`}>
            <div className={`${isCompact ? 'w-9 h-9 text-sm' : 'w-10 h-10 md:w-14 md:h-14 text-lg md:text-xl'} rounded-full bg-orange-500 text-white flex items-center justify-center`}>
              <span className="material-symbols-outlined text-base">cloud</span>
            </div>
            <span className="text-sky-300 font-extrabold">Cloud Parallax</span>
          </div>
        );
      default:
        return (
          <span className={`${isCompact ? 'text-base md:text-xl' : 'text-lg md:text-2xl'} font-bold text-white tracking-tight`}>
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
        className={`${
          isCompact
            ? 'h-14 sm:h-16 md:h-20 max-h-24 max-w-[220px] sm:max-w-[260px] md:max-w-[300px]'
            : 'h-20 sm:h-24 md:h-28 lg:h-32 max-h-36 max-w-[280px] md:max-w-[360px]'
        } w-auto object-contain transition-transform duration-300 hover:scale-105 filter drop-shadow-[0_4px_20px_rgba(255,255,255,0.05)]`}
      />
    );
  }

  return (
    <div className="transition-transform duration-300 hover:scale-105 flex items-center justify-center">
      {renderFallback()}
    </div>
  );
};

// Reusable Tier Section - Clean borderless layout per row
export const SponsorTierRow = ({ group, isCompact = false }) => {
  return (
    <div className={`space-y-4 ${isCompact ? 'py-3' : 'py-4'}`}>
      {/* Title Header with clean line */}
      <div className="flex items-center gap-4">
        <h3 className={`font-hanken ${isCompact ? 'text-xl md:text-2xl font-extrabold' : 'text-2xl md:text-4xl font-extrabold'} text-white tracking-tight flex items-center gap-2.5`}>
          <span className={`${isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} rounded-full bg-secondary`}></span>
          {group.title}
        </h3>
        <div className="h-px flex-grow bg-white/10"></div>
      </div>

      {/* Clean Row of Logos */}
      <div className={`py-4 flex flex-wrap items-center justify-start ${isCompact ? 'gap-8 sm:gap-12 md:gap-16 min-h-[90px]' : 'gap-10 sm:gap-14 md:gap-20 lg:gap-24 min-h-[120px]'}`}>
        {group.partners.map((partner) => (
          <div key={partner.id} className={`flex items-center justify-center ${isCompact ? 'min-h-[70px] md:min-h-[90px]' : 'min-h-[90px] md:min-h-[120px]'}`}>
            <SponsorLogo partner={partner} isCompact={isCompact} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Sponsors = () => {
  return (
    <section id="sponsors" className="py-16 md:py-24 bg-transparent relative overflow-hidden flex flex-col justify-center">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto relative z-10 w-full space-y-14">
        {sponsorGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <SponsorTierRow group={group} isCompact={true} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
