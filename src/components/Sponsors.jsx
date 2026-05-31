import React from 'react';
import { motion } from 'framer-motion';

const Sponsors = () => {
  // Sponsor configuration data
  const sponsorsList = [
    {
      name: 'Aravanai',
      tier: 'Gold',
      logoUrl: 'https://res.cloudinary.com/dnfbik3if/image/upload/v1780118625/05_kd5xjn.png',
      badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      borderColor: 'group-hover:border-amber-400/80 border-white/5',
      logoBg: 'bg-amber-500/5 group-hover:bg-amber-500/10 border-white/5 group-hover:border-amber-400/40',
      shadowGlow: 'hover:shadow-[0_0_50px_rgba(245,158,11,0.25)]',
      textColor: 'text-amber-400',
      icon: 'emoji_events', // Trophy
      iconColor: 'text-amber-400'
    },
    {
      name: 'WSO2',
      tier: 'Silver',
      logoUrl: '', // Fallback styled logo text is used if empty
      badgeColor: 'text-slate-300 border-slate-500/30 bg-slate-500/10',
      borderColor: 'group-hover:border-[#F14E23]/80 border-white/5',
      logoBg: 'bg-slate-500/5 group-hover:bg-orange-500/10 border-white/5 group-hover:border-[#F14E23]/40',
      shadowGlow: 'hover:shadow-[0_0_50px_rgba(241,78,35,0.25)]',
      textColor: 'text-[#F14E23]',
      icon: 'workspace_premium', // Medal
      iconColor: 'text-slate-300'
    },
    {
      name: 'Prime1',
      tier: 'Bronze',
      logoUrl: 'https://res.cloudinary.com/dnfbik3if/image/upload/v1780118625/Prime1_yhmkdt.png',
      badgeColor: 'text-orange-400 border-orange-700/30 bg-orange-700/10',
      borderColor: 'group-hover:border-orange-500/80 border-white/5',
      logoBg: 'bg-orange-950/5 group-hover:bg-orange-950/20 border-white/5 group-hover:border-orange-500/30',
      shadowGlow: 'hover:shadow-[0_0_40px_rgba(234,88,12,0.2)]',
      textColor: 'text-orange-500',
      icon: 'military_tech', // Rank Badge
      iconColor: 'text-orange-500'
    }
  ];

  return (
    <section id="sponsors" className="min-h-screen py-32 bg-transparent border-t border-white/5 relative overflow-hidden flex flex-col justify-center">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#1A56A6]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[450px] h-[450px] bg-[#F9A825]/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-[0.2em] text-white/60 uppercase shadow-inner"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Collaborations
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-hanken text-4xl md:text-6xl text-white font-extrabold tracking-tight leading-none"
          >
            <span className="text-primary">YARL</span> <span className="text-secondary">INSIGHT</span><span className="text-white"> 3.0</span> <span className="text-secondary italic">Sponsors</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-inter"
          >
            We are honored to have the backing of forward-thinking brands driving local technical ecosystem growth.
          </motion.p>
        </div>

        {/* Sponsors Grid - Uniform size, highly animated cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 items-stretch max-w-6xl mx-auto pt-6">
          {sponsorsList.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={{ 
                y: -15,
                scale: 1.025,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              className={`group relative bg-[#0a0a0a]/60 backdrop-blur-2xl border rounded-[2.5rem] p-12 md:p-14 flex flex-col items-center justify-center transition-all duration-500 w-full cursor-default ${sponsor.borderColor} ${sponsor.shadowGlow} transform-gpu`}
              style={{
                boxShadow: `0 0 40px rgba(0, 0, 0, 0.6)`,
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
              }}
            >
              <div className="w-full flex flex-col items-center space-y-8 relative z-10">
                {/* Badge Header */}
                <div className={`flex items-center gap-2 py-1.5 px-4.5 rounded-full border text-[10px] font-mono font-bold tracking-widest uppercase shadow-md ${sponsor.badgeColor}`}>
                  <span className={`material-symbols-outlined text-sm ${sponsor.iconColor}`}>
                    {sponsor.icon}
                  </span>
                  <span>{sponsor.tier} Sponsor</span>
                </div>

                {/* Logo Display area */}
                <div className={`w-full h-44 flex items-center justify-center rounded-[2rem] bg-black/60 border relative overflow-hidden transition-all duration-300 group-hover:bg-black/80 ${sponsor.logoBg}`}>
                  {sponsor.logoUrl ? (
                    <motion.img 
                      src={sponsor.logoUrl} 
                      alt={`${sponsor.name} Logo`} 
                      className="max-w-[75%] max-h-[75%] object-contain filter group-hover:brightness-110 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    />
                  ) : (
                    <div className="text-center p-4">
                      {sponsor.name === 'WSO2' ? (
                        <div className="flex items-center justify-center gap-0.5 group-hover:scale-105 transition-transform duration-300">
                          <span className="text-5xl font-black tracking-tighter text-white">
                            WSO
                          </span>
                          <span className="text-5xl font-black tracking-tighter text-[#F14E23]">
                            2
                          </span>
                        </div>
                      ) : (
                        <span className={`text-4xl font-black tracking-tight ${sponsor.textColor}`}>
                          {sponsor.name}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Styled Sponsor Name */}
                <div className="space-y-2 text-center w-full">
                  <h4 className="text-3xl font-extrabold text-white tracking-tight group-hover:text-white/80 transition-all duration-300">
                    {sponsor.name}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
